import time
from collections import defaultdict
from threading import Lock

from fastapi import HTTPException, Request, status


class SlidingWindowRateLimiter:
    def __init__(self, requests_limit: int, window_seconds: int):
        self.limit = requests_limit
        self.window = window_seconds
        self.records: dict[str, list[float]] = defaultdict(list)
        self.lock = Lock()

    def is_rate_limited(self, key: str) -> bool:
        now = time.time()
        window_start = now - self.window

        with self.lock:
            # Filter timestamps older than the window
            valid_timestamps = [t for t in self.records[key] if t > window_start]
            if len(valid_timestamps) >= self.limit:
                self.records[key] = valid_timestamps
                return True

            valid_timestamps.append(now)
            self.records[key] = valid_timestamps
            return False


# Pre-configured Rate Limiters
auth_rate_limiter = SlidingWindowRateLimiter(requests_limit=15, window_seconds=60)  # 15 req/min for auth
order_rate_limiter = SlidingWindowRateLimiter(requests_limit=20, window_seconds=60)  # 20 req/min for orders
public_rate_limiter = SlidingWindowRateLimiter(requests_limit=150, window_seconds=60)  # 150 req/min for public


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "127.0.0.1"


def rate_limit_auth(request: Request) -> None:
    ip = get_client_ip(request)
    if auth_rate_limiter.is_rate_limited(f"auth:{ip}"):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Quá nhiều yêu cầu đăng nhập/đăng ký. Vui lòng thử lại sau 1 phút.",
            headers={"Retry-After": "60"},
        )


def rate_limit_order(request: Request) -> None:
    ip = get_client_ip(request)
    if order_rate_limiter.is_rate_limited(f"order:{ip}"):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Quá nhiều yêu cầu đặt hàng/thuê máy. Vui lòng chờ 1 phút trước khi thử lại.",
            headers={"Retry-After": "60"},
        )
