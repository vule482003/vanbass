from functools import lru_cache
import redis
from app.core.config import settings


@lru_cache
def get_redis_client() -> redis.Redis:
    """
    Get a singleton Redis client instance with decode_responses=True.
    """
    return redis.from_url(
        settings.redis_url,
        decode_responses=True,
        socket_timeout=5,
        socket_connect_timeout=5,
    )


redis_client = get_redis_client()
