from fastapi import APIRouter, Depends

from app.api.dependencies import require_admin
from app.models.user import User


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get("/me")
def get_admin_me(
    current_user: User = Depends(require_admin),
) -> dict[str, str]:
    return {
        "message": "Admin access granted",
        "email": current_user.email,
        "role": current_user.role.value,
    }