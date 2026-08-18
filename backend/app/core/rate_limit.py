import time
from collections import defaultdict
from threading import Lock

from fastapi import HTTPException, Request, status

from app.core.redis import redis_client


class RedisDistributedRateLimiter:
    """
    Distributed sliding window rate limiter backed by Redis ZSET.
    Falls back gracefully to in-memory sliding window if Redis is temporarily unreachable.
    """

    def __init__(self, requests_limit: int, window_seconds: int, prefix: str = "rl"):
        self.limit = requests_limit
        self.window = window_seconds
        self.prefix = prefix
        self._fallback_records: dict[str, list[float]] = defaultdict(list)
        self._fallback_lock = Lock()

    def _redis_is_rate_limited(self, key: str) -> bool:
        redis_key = f"{self.prefix}:{key}"
        now = time.time()
        window_start = now - self.window
        member = f"{now}:{time.time_ns()}"

        pipe = redis_client.pipeline(transaction=True)
        # 1. Remove timestamps outside the sliding window
        pipe.zremrangebyscore(redis_key, "-inf", window_start)
        # 2. Count requests in current window
        pipe.zcard(redis_key)
        # 3. Add current timestamp
        pipe.zadd(redis_key, {member: now})
        # 4. Set TTL slightly longer than window
        pipe.expire(redis_key, self.window + 10)

        results = pipe.execute()
        current_count = results[1]  # result of zcard before adding current request

        return current_count >= self.limit

    def _fallback_is_rate_limited(self, key: str) -> bool:
        now = time.time()
        window_start = now - self.window
        with self._fallback_lock:
            valid_timestamps = [t for t in self._fallback_records[key] if t > window_start]
            if len(valid_timestamps) >= self.limit:
                self._fallback_records[key] = valid_timestamps
                return True
            valid_timestamps.append(now)
            self._fallback_records[key] = valid_timestamps
            return False

    def is_rate_limited(self, key: str) -> bool:
        try:
            return self._redis_is_rate_limited(key)
        except Exception:
            # Graceful in-memory fallback
            return self._fallback_is_rate_limited(key)


# Pre-configured Distributed Rate Limiters
auth_rate_limiter = RedisDistributedRateLimiter(requests_limit=15, window_seconds=60, prefix="rl:auth")
order_rate_limiter = RedisDistributedRateLimiter(requests_limit=20, window_seconds=60, prefix="rl:order")
rental_rate_limiter = RedisDistributedRateLimiter(requests_limit=20, window_seconds=60, prefix="rl:rental")
public_rate_limiter = RedisDistributedRateLimiter(requests_limit=150, window_seconds=60, prefix="rl:public")


def get_client_ip(request: Request) -> str:
    """
    Extract the real client IP, respecting proxy headers.
    """
    cf_connecting_ip = request.headers.get("CF-Connecting-IP")
    if cf_connecting_ip:
        return cf_connecting_ip.strip()

    x_real_ip = request.headers.get("X-Real-IP")
    if x_real_ip:
        return x_real_ip.strip()

    x_forwarded_for = request.headers.get("X-Forwarded-For")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()

    return request.client.host if request.client else "127.0.0.1"


def rate_limit_auth(request: Request) -> None:
    ip = get_client_ip(request)
    if auth_rate_limiter.is_rate_limited(ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Quá nhiều yêu cầu đăng nhập/đăng ký. Vui lòng thử lại sau 1 phút.",
            headers={"Retry-After": "60"},
        )


def rate_limit_order(request: Request) -> None:
    ip = get_client_ip(request)
    if order_rate_limiter.is_rate_limited(ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Quá nhiều yêu cầu đặt hàng. Vui lòng chờ 1 phút trước khi thử lại.",
            headers={"Retry-After": "60"},
        )


def rate_limit_rental(request: Request) -> None:
    ip = get_client_ip(request)
    if rental_rate_limiter.is_rate_limited(ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Quá nhiều yêu cầu thuê nhạc cụ. Vui lòng chờ 1 phút trước khi thử lại.",
            headers={"Retry-After": "60"},
        )
