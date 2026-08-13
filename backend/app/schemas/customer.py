from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CustomerProfileRequest(BaseModel):
    full_name: str = Field(min_length=1, max_length=255)
    phone: str = Field(min_length=1, max_length=30)
    country: str = Field(min_length=1, max_length=100)
    city: str = Field(min_length=1, max_length=100)
    ward: str | None = Field(default=None, max_length=100)
    address: str = Field(min_length=1, max_length=500)


class CustomerProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    full_name: str
    phone: str
    country: str
    city: str
    ward: str | None
    address: str
    created_at: datetime
    updated_at: datetime


class CustomerProfileStatusResponse(BaseModel):
    profile_completed: bool
    profile: CustomerProfileResponse | None = None