MESSAGES = {
    "vi": {
        "session_expired": "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.",
        "user_not_found": "Không tìm thấy người dùng.",
        "account_inactive": "Tài khoản của bạn đã bị vô hiệu hóa.",
        "admin_required": "Yêu cầu quyền quản trị viên.",
        "auth_failed": "Email hoặc mật khẩu không chính xác.",
        "not_found": "Không tìm thấy dữ liệu yêu cầu.",
        "rate_limited": "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.",
    },
    "en": {
        "session_expired": "Session expired or invalid. Please login again.",
        "user_not_found": "User not found.",
        "account_inactive": "Your account is inactive.",
        "admin_required": "Admin access required.",
        "auth_failed": "Invalid email or password.",
        "not_found": "Requested resource not found.",
        "rate_limited": "Too many requests. Please try again later.",
    },
}


def translate(key: str, lang: str = "vi") -> str:
    return MESSAGES.get(lang, MESSAGES["vi"]).get(key, key)