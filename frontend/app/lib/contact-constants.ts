// Centralized Contact Configuration for VanBass Music Center
// Verified Phone Numbers:
// - Mr. Tuyến — 0905614566
// - Mr. Tuấn — 0944498987
// - Mr. Vân — 0706067799

export interface ContactPerson {
  name: string;
  phone: string;
  phoneDisplay: string;
  telHref: string;
  zaloHref: string;
  roleVi: string;
  roleEn: string;
  labelVi: string;
  locationVi: string;
}

export const CONTACTS = {
  tuyen: {
    name: "Mr. Tuyến",
    phone: "0905614566",
    phoneDisplay: "0905 614 566",
    telHref: "tel:0905614566",
    zaloHref: "https://zalo.me/0905614566",
    roleVi: "Tư Vấn Mua Bán Thiết Bị & Đào Tạo",
    roleEn: "Equipment Sales & Training Consultant",
    labelVi: "Mr. Tuyến — 0905 614 566",
    locationVi: "Đà Nẵng & Toàn quốc",
  },
  tuan: {
    name: "Mr. Tuấn",
    phone: "0944498987",
    phoneDisplay: "0944 498 987",
    telHref: "tel:0944498987",
    zaloHref: "https://zalo.me/0944498987",
    roleVi: "Tư Vấn Cho Thuê & Setup Sự Kiện",
    roleEn: "Rental & Event Setup Consultant",
    labelVi: "Mr. Tuấn — 0944 498 987",
    locationVi: "Đà Nẵng & Huế",
  },
  van: {
    name: "Mr. Vân",
    phone: "0706067799",
    phoneDisplay: "0706 067 799",
    telHref: "tel:0706067799",
    zaloHref: "https://zalo.me/0706067799",
    roleVi: "Hotline Kỹ Thuật & Sửa Chữa",
    roleEn: "Technical Support & Repair Hotline",
    labelVi: "Mr. Vân — 0706 067 799",
    locationVi: "Đà Nẵng & Huế",
  },
} as const;

export const CONTACT_LIST = [
  CONTACTS.tuyen,
  CONTACTS.tuan,
  CONTACTS.van,
];

export const PRIMARY_CONTACT = CONTACTS.van;

export const ALL_CONTACT_PHONES = ["0905614566", "0944498987", "0706067799"];
export const ALL_CONTACT_PHONES_INTL = ["+84905614566", "+84944498987", "+84706067799"];

// Official Business Addresses (Updated post-administrative reorganization)
export const BUSINESS_ADDRESS = "77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng";
export const BUSINESS_ADDRESS_SHORT = "77 Nguyễn Tất Thành, Hải Châu, Đà Nẵng";
export const BUSINESS_ADDRESS_STREET = "77 Nguyễn Tất Thành";
export const BUSINESS_ADDRESS_WARD = "phường Hải Châu";
export const BUSINESS_ADDRESS_CITY = "thành phố Đà Nẵng";
export const BUSINESS_ADDRESS_EN = "77 Nguyen Tat Thanh, Hai Chau Ward, Da Nang City";
export const BUSINESS_ADDRESS_HUE = "442 Chi Lăng, thành phố Huế";

