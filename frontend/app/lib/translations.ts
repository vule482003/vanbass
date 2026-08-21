export interface TranslationSchema {
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
  };
  header: {
    search_placeholder: string;
    search_empty: string;
    search_view_all: string;
    contact_price: string;
    admin_panel: string;
    admin_short: string;
    my_account: string;
    logout: string;
    login: string;
    login_register: string;
    cart: string;
  };
}

export const translations: Record<"vi" | "en", TranslationSchema> = {
  vi: {
    nav: {
      home: "Trang chủ",
      products: "Sản phẩm",
      about: "Về VanBass",
      contact: "Liên hệ",
    },
    header: {
      search_placeholder: "Tìm kiếm thiết bị DJ, mixer, loa...",
      search_empty: "Không tìm thấy thiết bị nào phù hợp với",
      search_view_all: "Xem tất cả kết quả cho",
      contact_price: "Liên hệ",
      admin_panel: "Bảng Quản Trị Admin",
      admin_short: "Quản Trị",
      my_account: "Tài khoản của tôi",
      logout: "Đăng xuất",
      login: "Đăng nhập",
      login_register: "Đăng nhập / Đăng ký",
      cart: "Giỏ hàng",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About Us",
      contact: "Contact",
    },
    header: {
      search_placeholder: "Search DJ gear, mixers, speakers...",
      search_empty: "No products found for",
      search_view_all: "View all results for",
      contact_price: "Contact",
      admin_panel: "Admin Dashboard",
      admin_short: "Admin",
      my_account: "My Account",
      logout: "Logout",
      login: "Login",
      login_register: "Login / Register",
      cart: "Cart",
    },
  },
};

export type Language = keyof typeof translations;