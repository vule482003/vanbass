from functools import lru_cache
import redis
from app.core.config import settings


@lru_cache
def get_redis_client() -> redis.Redis:
    return redis.from_url(
        settings.redis_url,
        decode_responses=True,
        socket_timeout=0.5,
        socket_connect_timeout=0.5,
        retry_on_timeout=False,
    )

redis_client = get_redis_client()

