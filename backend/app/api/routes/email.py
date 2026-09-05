from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.services.email_service import EmailService

router = APIRouter(prefix="/email", tags=["Email Notifications"])


class TestEmailRequest(BaseModel):
    to_email: str


@router.post("/test")
def test_send_email(payload: TestEmailRequest):
    """
    Test sending an email via Gmail SMTP or verify mock email dispatcher.
    """
    if not payload.to_email or "@" not in payload.to_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Địa chỉ email không hợp lệ",
        )

    result = EmailService.send_test_email(to_email=payload.to_email)
    return result
