from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_cart_id, get_current_user, get_db
from app.models.user import User
from app.schemas.cart import CartItemAdd, CartItemUpdate, CartResponse
from app.services.cart_service import CartService

router = APIRouter(
    prefix="/cart",
    tags=["Cart"],
)


@router.get(
    "",
    response_model=CartResponse,
    summary="Get current cart",
)
def get_cart(
    cart_id: str = Depends(get_cart_id),
    db: Session = Depends(get_db),
) -> CartResponse:
    """
    Retrieve current shopping cart items, prices, and subtotal.
    Supports authenticated users (JWT) and guest sessions (X-Session-ID header).
    """
    return CartService.get_cart(cart_id, db)


@router.post(
    "/items",
    response_model=CartResponse,
    status_code=status.HTTP_200_OK,
    summary="Add item to cart",
)
def add_item_to_cart(
    item_in: CartItemAdd,
    cart_id: str = Depends(get_cart_id),
    db: Session = Depends(get_db),
) -> CartResponse:
    """
    Add a product to cart with specified quantity.
    Validates product availability and stock quantity.
    """
    return CartService.add_item(
        cart_id=cart_id,
        product_id=item_in.product_id,
        quantity=item_in.quantity,
        db=db,
    )


@router.put(
    "/items/{product_id}",
    response_model=CartResponse,
    summary="Update item quantity in cart",
)
def update_cart_item(
    product_id: UUID,
    item_in: CartItemUpdate,
    cart_id: str = Depends(get_cart_id),
    db: Session = Depends(get_db),
) -> CartResponse:
    """
    Update quantity of a specific item in cart.
    Setting quantity to 0 removes the item.
    """
    return CartService.update_item(
        cart_id=cart_id,
        product_id=product_id,
        quantity=item_in.quantity,
        db=db,
    )


@router.delete(
    "/items/{product_id}",
    response_model=CartResponse,
    summary="Remove item from cart",
)
def remove_cart_item(
    product_id: UUID,
    cart_id: str = Depends(get_cart_id),
    db: Session = Depends(get_db),
) -> CartResponse:
    """
    Remove an item completely from the cart.
    """
    return CartService.remove_item(
        cart_id=cart_id,
        product_id=product_id,
        db=db,
    )


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Clear all items in cart",
)
def clear_cart(
    cart_id: str = Depends(get_cart_id),
) -> None:
    """
    Clear all items in the current cart.
    """
    CartService.clear_cart(cart_id)


@router.post(
    "/merge",
    response_model=CartResponse,
    summary="Merge guest cart into user cart upon login",
)
def merge_guest_cart(
    x_session_id: str = Header(..., alias="X-Session-ID", description="Guest session ID to merge from"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CartResponse:
    """
    Merge items from guest cart into logged-in user cart.
    """
    if not x_session_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Session ID header X-Session-ID is required for merging",
        )
    CartService.merge_guest_cart(x_session_id.strip(), current_user.id, db)
    return CartService.get_cart(f"user:{current_user.id}", db)
