from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class StoreSettingsUpdate(BaseModel):
    store_name: str | None = Field(default=None, min_length=1, max_length=255)
    phone: str | None = Field(default=None, min_length=1, max_length=30)
    rental_phone: str | None = Field(default=None, max_length=30)
    email: str | None = Field(default=None, max_length=255)
    rental_email: str | None = Field(default=None, max_length=255)
    address: str | None = Field(default=None, min_length=1, max_length=500)
    city: str | None = Field(default=None, max_length=100)
    country: str | None = Field(default=None, max_length=100)
    business_hours: str | None = Field(default=None, max_length=500)
    rental_information: str | None = None


class StoreSettingsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    store_name: str
    phone: str
    rental_phone: str | None
    email: str | None
    rental_email: str | None
    address: str
    city: str
    country: str
    business_hours: str | None
    rental_information: str | None
    updated_by: UUID | None
    updated_at: datetime