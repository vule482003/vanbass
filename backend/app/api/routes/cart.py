from uuid import UUID

<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.dependencies import get_current_user, get_db
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import (
    CartItemCreate,
    CartItemResponse,
    CartItemUpdate,
    CartResponse,
)

=======
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_cart_id, get_current_user, get_db
from app.models.user import User
from app.schemas.cart import CartItemAdd, CartItemUpdate, CartResponse
from app.services.cart_service import CartService
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102

router = APIRouter(
    prefix="/cart",
    tags=["Cart"],
)


<<<<<<< HEAD
def get_or_create_cart(
    user_id: UUID,
    db: Session,
) -> Cart:
    cart = db.execute(
        select(Cart)
        .options(selectinload(Cart.items))
        .where(Cart.user_id == user_id)
    ).scalar_one_or_none()

    if cart is None:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    return cart


@router.get(
    "",
    response_model=CartResponse,
)
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Cart:
    return get_or_create_cart(current_user.id, db)
=======
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
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


@router.post(
    "/items",
<<<<<<< HEAD
    response_model=CartItemResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_cart_item(
    data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CartItem:
    product = db.get(Product, data.product_id)

    if product is None or not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if not product.sale_enabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product is not available for sale",
        )

    if product.stock_quantity < data.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient product stock",
        )

    cart = get_or_create_cart(current_user.id, db)

    item = db.execute(
        select(CartItem).where(
            CartItem.cart_id == cart.id,
            CartItem.product_id == data.product_id,
        )
    ).scalar_one_or_none()

    if item is not None:
        new_quantity = item.quantity + data.quantity

        if new_quantity > product.stock_quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient product stock",
            )

        item.quantity = new_quantity
    else:
        item = CartItem(
            cart_id=cart.id,
            product_id=data.product_id,
            quantity=data.quantity,
        )
        db.add(item)

    db.commit()
    db.refresh(item)

    return item


@router.put(
    "/items/{item_id}",
    response_model=CartItemResponse,
)
def update_cart_item(
    item_id: UUID,
    data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CartItem:
    item = db.execute(
        select(CartItem)
        .join(Cart)
        .join(Product)
        .where(
            CartItem.id == item_id,
            Cart.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found",
        )

    product = db.get(Product, item.product_id)

    if product is None or not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if not product.sale_enabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product is not available for sale",
        )

    if data.quantity > product.stock_quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient product stock",
        )

    item.quantity = data.quantity

    db.commit()
    db.refresh(item)

    return item


@router.delete(
    "/items/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_cart_item(
    item_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    item = db.execute(
        select(CartItem)
        .join(Cart)
        .where(
            CartItem.id == item_id,
            Cart.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found",
        )

    db.delete(item)
    db.commit()
=======
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
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
<<<<<<< HEAD
)
def clear_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    cart = db.execute(
        select(Cart).where(Cart.user_id == current_user.id)
    ).scalar_one_or_none()

    if cart is None:
        return

    db.query(CartItem).filter(
        CartItem.cart_id == cart.id
    ).delete(synchronize_session=False)

    db.commit()
=======
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
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
