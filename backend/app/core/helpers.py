import random
import string
from datetime import datetime, timezone


def generate_reference_code(prefix: str, random_digits: int = 4) -> str:
    """
    Generate a standardized tracking/reference code.
    Example: VB-20260818-4821 or RENT-20260818-9102
    """
    now_str = datetime.now(timezone.utc).strftime("%Y%m%d")
    rand_chars = "".join(random.choices(string.digits, k=random_digits))
    return f"{prefix}-{now_str}-{rand_chars}"


def clean_phone_number(phone: str) -> str:
    """
    Sanitize phone numbers by removing spaces, dashes, and converting +84 to 0.
    """
    cleaned = phone.replace(" ", "").replace("-", "").replace(".", "").strip()
    if cleaned.startswith("+84"):
        cleaned = "0" + cleaned[3:]
    return cleaned


def append_timestamped_note(existing_notes: str | None, new_note: str | None) -> str | None:
    """
    Append an audit/admin note with a UTC timestamp.
    """
    if not new_note or not new_note.strip():
        return existing_notes

    timestamp = datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M")
    entry = f"[{timestamp}] {new_note.strip()}"

    if existing_notes and existing_notes.strip():
        return f"{existing_notes.strip()}\n{entry}"
    return entry
