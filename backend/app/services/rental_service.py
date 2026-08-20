import uuid
from datetime import date, timedelta
from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.helpers import append_timestamped_note, generate_reference_code
from app.models.rental_request import (
    RentalPaymentStatus,
    RentalRequest,
    RentalRequestStatus,
)
from app.models.rental_request_item import RentalRequestItem
from app.schemas.rental_request import (
    DayAvailability,
    ProductAvailabilityResponse,
    RentalRequestCreate,
)
from app.services.product_service import ProductService

# Active statuses that hold calendar reservations
ACTIVE_RENTAL_STATUSES = {
    RentalRequestStatus.PENDING,
    RentalRequestStatus.CONTACTED,
    RentalRequestStatus.CONFIRMED,
}

# State Machine Transition Matrix
VALID_RENTAL_TRANSITIONS: dict[RentalRequestStatus, set[RentalRequestStatus]] = {
    RentalRequestStatus.PENDING: {
        RentalRequestStatus.CONTACTED,
        RentalRequestStatus.CONFIRMED,
        RentalRequestStatus.REJECTED,
        RentalRequestStatus.CANCELLED,
    },
    RentalRequestStatus.CONTACTED: {
        RentalRequestStatus.CONFIRMED,
        RentalRequestStatus.REJECTED,
        RentalRequestStatus.CANCELLED,
    },
    RentalRequestStatus.CONFIRMED: {
        RentalRequestStatus.COMPLETED,
        RentalRequestStatus.CANCELLED,
    },
    RentalRequestStatus.REJECTED: set(),
    RentalRequestStatus.CANCELLED: set(),
    RentalRequestStatus.COMPLETED: set(),
}


class RentalService:
    @staticmethod
    def get_tier_discount_multiplier(days: int) -> Decimal:
        """
        Tiered duration discount:
        1-2d: 0% | 3-6d: 10% | 7-29d: 20% | >=30d: 35%
        """
        if days <= 2:
            return Decimal("1.00")
        elif days <= 6:
            return Decimal("0.90")
        elif days <= 29:
            return Decimal("0.80")
        return Decimal("0.65")

    @classmethod
    def check_and_get_booked_quantities(
        cls,
        product_id: UUID,
        start_date: date,
        end_date: date,
        db: Session,
        exclude_request_id: UUID | None = None,
    ) -> dict[date, int]:
        """
        Calculate day-by-day booked quantities across active rental requests.
        """
        stmt = (
            select(RentalRequestItem, RentalRequest)
            .join(RentalRequest, RentalRequestItem.rental_request_id == RentalRequest.id)
            .where(
                RentalRequestItem.product_id == product_id,
                RentalRequest.status.in_(ACTIVE_RENTAL_STATUSES),
                RentalRequest.start_date <= end_date,
                RentalRequest.end_date >= start_date,
            )
        )
        if exclude_request_id:
            stmt = stmt.where(RentalRequest.id != exclude_request_id)

        overlapping_rows = db.execute(stmt).all()

        day_booked_map: dict[date, int] = {}
        curr = start_date
        while curr <= end_date:
            day_booked_map[curr] = 0
            curr += timedelta(days=1)

        for item, req in overlapping_rows:
            overlap_start = max(start_date, req.start_date)
            overlap_end = min(end_date, req.end_date)
            d = overlap_start
            while d <= overlap_end:
                day_booked_map[d] = day_booked_map.get(d, 0) + item.quantity
                d += timedelta(days=1)

        return day_booked_map

    @classmethod
    def get_product_availability(
        cls,
        product_id: UUID,
        start_date: date,
        end_date: date,
        db: Session,
    ) -> ProductAvailabilityResponse:
        """
        Get availability calendar for a product across a date range.
        """
        product = ProductService.get_active_rental_product(db, product_id)
        booked_map = cls.check_and_get_booked_quantities(product.id, start_date, end_date, db)

        calendar_days: list[DayAvailability] = []
        curr = start_date
        while curr <= end_date:
            booked = booked_map.get(curr, 0)
            avail = max(0, product.stock_quantity - booked)
            calendar_days.append(
                DayAvailability(
                    date=curr,
                    total_stock=product.stock_quantity,
                    booked_count=booked,
                    available_count=avail,
                )
            )
            curr += timedelta(days=1)

        return ProductAvailabilityResponse(
            product_id=product.id,
            product_name=product.name,
            total_stock=product.stock_quantity,
            calendar=calendar_days,
        )

    @classmethod
    def create_rental_request(
        cls,
        payload: RentalRequestCreate,
        user_id: UUID,
        db: Session,
    ) -> RentalRequest:
        """
        Create rental request with date collision verification and tiered pricing.
        """
        if payload.end_date < payload.start_date:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ngày trả nhạc cụ phải sau hoặc bằng ngày nhận",
            )
        if payload.start_date < date.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ngày nhận nhạc cụ không được ở trong quá khứ",
            )

        rental_days = (payload.end_date - payload.start_date).days + 1
        tier_multiplier = cls.get_tier_discount_multiplier(rental_days)

        rental_req_id = uuid.uuid4()
        rental_total = Decimal("0.00")
        total_deposit = Decimal("0.00")
        request_items: list[RentalRequestItem] = []

        for item_in in payload.items:
            product = ProductService.get_active_rental_product(db, item_in.product_id)

            # 1. Date Collision Check
            booked_map = cls.check_and_get_booked_quantities(
                product.id, payload.start_date, payload.end_date, db
            )
            for d, booked_qty in booked_map.items():
                available = product.stock_quantity - booked_qty
                if item_in.quantity > available:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=(
                            f"Nhạc cụ '{product.name}' không đủ số lượng khả dụng vào ngày {d.strftime('%d/%m/%Y')}. "
                            f"Yêu cầu: {item_in.quantity}, còn trống: {max(0, available)}."
                        ),
                    )

            # 2. Tiered Pricing & Deposit
            base_daily_rate = (
                item_in.daily_rate
                if item_in.daily_rate > 0
                else (product.rental_price or Decimal("0.00"))
            )
            discounted_daily_rate = base_daily_rate * tier_multiplier
            line_rental_total = discounted_daily_rate * rental_days * item_in.quantity

            deposit_unit = (product.sale_price or (base_daily_rate * 5)) * Decimal("0.30")
            line_deposit = deposit_unit * item_in.quantity

            rental_total += line_rental_total
            total_deposit += line_deposit

            request_items.append(
                RentalRequestItem(
                    id=uuid.uuid4(),
                    rental_request_id=rental_req_id,
                    product_id=product.id,
                    product_name=product.name,
                    quantity=item_in.quantity,
                    rental_price=discounted_daily_rate,
                    number_of_days=rental_days,
                    subtotal=line_rental_total,
                )
            )

        # Assemble notes
        info_parts = [
            f"Họ tên: {payload.customer_name}" if payload.customer_name else None,
            f"SĐT: {payload.customer_phone}" if payload.customer_phone else None,
            f"Email: {payload.customer_email}" if payload.customer_email else None,
            f"Ghi chú: {payload.note or payload.customer_note}" if (payload.note or payload.customer_note) else None,
        ]
        customer_note_str = " | ".join([p for p in info_parts if p]) or None
        pickup_loc = payload.delivery_address or payload.pickup_location or "Showroom VanBass - Đà Nẵng"

        rental_req = RentalRequest(
            id=rental_req_id,
            user_id=user_id,
            request_number=generate_reference_code("RENT"),
            status=RentalRequestStatus.PENDING,
            payment_status=RentalPaymentStatus.UNPAID,
            start_date=payload.start_date,
            end_date=payload.end_date,
            rental_total=rental_total,
            deposit_amount=total_deposit,
            currency="VND",
            pickup_location=pickup_loc,
            customer_note=customer_note_str,
            items=request_items,
        )

        db.add(rental_req)
        db.commit()
        db.refresh(rental_req)

        return rental_req

    @classmethod
    def update_rental_status(
        cls,
        request_id: UUID,
        db: Session,
        new_status: RentalRequestStatus | None = None,
        new_payment_status: RentalPaymentStatus | None = None,
        admin_note: str | None = None,
    ) -> RentalRequest:
        """
        Advance rental status and/or deposit/payment status following state machine rules.
        """
        rental_req = db.get(RentalRequest, request_id)
        if not rental_req:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Không tìm thấy yêu cầu thuê nhạc cụ",
            )

        if new_status is not None and new_status != rental_req.status:
            allowed_next = VALID_RENTAL_TRANSITIONS.get(rental_req.status, set())
            if new_status not in allowed_next:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=(
                        f"Không thể chuyển trạng thái yêu cầu thuê từ '{rental_req.status.value}' "
                        f"sang '{new_status.value}'. Quy trình hợp lệ: "
                        f"{', '.join([s.value for s in allowed_next]) or 'Không thể thay đổi (trạng thái cuối)'}"
                    ),
                )
            rental_req.status = new_status

        if new_payment_status is not None:
            rental_req.payment_status = new_payment_status

        if admin_note:
            rental_req.admin_note = append_timestamped_note(rental_req.admin_note, admin_note)

        db.commit()
        db.refresh(rental_req)
        return rental_req

    @classmethod
    def cancel_rental_request(
        cls,
        request_id: UUID,
        current_user_id: UUID | None,
        is_admin: bool,
        reason: str | None,
        db: Session,
    ) -> RentalRequest:
        """
        Cancel rental request and free calendar slots.
        """
        rental_req = db.get(RentalRequest, request_id)
        if not rental_req:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Không tìm thấy yêu cầu thuê",
            )

        if not is_admin:
            if rental_req.user_id != current_user_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Bạn không có quyền hủy yêu cầu thuê này",
                )
            if rental_req.status not in {RentalRequestStatus.PENDING, RentalRequestStatus.CONTACTED}:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Yêu cầu thuê đang ở trạng thái '{rental_req.status.value}', không thể tự hủy.",
                )

        actor = "Admin" if is_admin else "Khách hàng"
        cancel_note = f"Hủy bởi {actor}" + (f": {reason.strip()}" if reason and reason.strip() else "")

        return cls.update_rental_status(
            request_id=request_id,
            db=db,
            new_status=RentalRequestStatus.CANCELLED,
            admin_note=cancel_note,
        )
