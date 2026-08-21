from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_optional_current_user, require_admin
from app.core.rate_limit import rate_limit_order
from app.models.order import Order, OrderStatus
from app.models.user import User, UserRole
from app.schemas.order import (
    OrderCancelRequest,
    OrderCreateRequest,
    OrderListResponse,
    OrderResponse,
    OrderStatusUpdate,
)
from app.services.order_service import OrderService
from app.services.user_service import UserService

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit_order)],
)
def create_order(
    payload: OrderCreateRequest,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    user_id = UserService.resolve_user_id(
        db=db,
        current_user=current_user,
        phone=payload.shipping_phone,
    )
    return OrderService.create_order(payload=payload, user_id=user_id, db=db)


@router.get("", response_model=OrderListResponse)
def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status_filter: OrderStatus | None = Query(None, alias="status"),
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> OrderListResponse:
    query = select(Order)
    if status_filter:
        query = query.where(Order.status == status_filter)

    orders = (
        db.execute(query.order_by(Order.created_at.desc()).offset(skip).limit(limit))
        .scalars()
        .all()
    )
    return OrderListResponse(items=list(orders), total=len(orders))


@router.get("/me", response_model=OrderListResponse)
def list_my_orders(
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> OrderListResponse:
    if not current_user:
        return OrderListResponse(items=[], total=0)

    query = (
        select(Order)
        .where(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
    )
    orders = db.execute(query).scalars().all()
    return OrderListResponse(items=list(orders), total=len(orders))


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: UUID,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng",
        )

    if (
        current_user
        and current_user.role != UserRole.ADMIN
        and order.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xem đơn hàng này",
        )

    return order


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: UUID,
    payload: OrderStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Order:
    return OrderService.update_order_status(
        order_id=order_id,
        db=db,
        new_status=payload.status,
        new_payment_status=payload.payment_status,
        admin_note=payload.note,
    )


@router.post(
    "/{order_id}/cancel",
    response_model=OrderResponse,
    dependencies=[Depends(rate_limit_order)],
)
def cancel_order(
    order_id: UUID,
    payload: OrderCancelRequest | None = None,
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    is_admin = current_user.role == UserRole.ADMIN if current_user else False
    current_user_id = current_user.id if current_user else None
    reason = payload.reason if payload else None

    return OrderService.cancel_order(
        order_id=order_id,
        current_user_id=current_user_id,
        is_admin=is_admin,
        reason=reason,
        db=db,
    )
