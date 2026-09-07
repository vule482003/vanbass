import { Category, Product } from "./types";
export const MOCK_CATEGORIES: Category[] = [
  {
    "slug": "all-in-one-dj-systems",
    "name": "Hệ Thống DJ All-in-One",
    "description": "Bàn DJ độc lập All-in-One tích hợp màn hình cảm ứng, biểu diễn chuyên nghiệp không cần máy tính.",
    "id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "number": "01"
  },
  {
    "slug": "dj-controllers",
    "name": "DJ Controllers",
    "description": "Bàn điều khiển DJ kết nối máy tính chuyên nghiệp từ AlphaTheta và Pioneer DJ.",
    "id": "61665041-da23-529e-b915-fde3e0904e96",
    "number": "02"
  },
  {
    "slug": "dj-player",
    "name": "Đầu Phát DJ (Players)",
    "description": "Đầu phát đa phương tiện DJ chuyên nghiệp chuẩn club quốc tế CDJ-3000, CDJ-1500X.",
    "id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "number": "03"
  },
  {
    "slug": "turntables",
    "name": "Mâm Đĩa Than (Turntables)",
    "description": "Mâm xoay đĩa than vinyl chuyên nghiệp cho DJ scratch và người chơi đĩa than cao cấp.",
    "id": "c204eee4-e914-5d7c-9c2a-9fa66383eb61",
    "number": "04"
  },
  {
    "slug": "dj-mixers",
    "name": "Mixer DJ Chuyên Nghiệp",
    "description": "Bàn trộn âm thanh DJ từ 2 kênh đến 6 kênh cao cấp Pioneer DJM, Euphonia.",
    "id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "number": "05"
  },
  {
    "slug": "dj-sampler",
    "name": "DJ Sampler & Remix",
    "description": "Thiết bị lấy mẫu âm thanh Sampler và Remix Stations biểu diễn live độc đáo.",
    "id": "1642bf81-abd9-5f68-940e-b0b53a902eba",
    "number": "06"
  },
  {
    "slug": "dj-software-interfaces",
    "name": "DJ Software & Audio Interfaces",
    "description": "Hộp giải mã DVS, card âm thanh và phụ kiện phần mềm rekordbox, Serato DJ.",
    "id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "number": "07"
  },
  {
    "slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer - Bàn Trộn Âm Thanh",
    "description": "Bàn trộn âm thanh sân khấu Analog & Digital chuyên nghiệp Mackie, Behringer, Marani.",
    "id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "number": "08"
  },
  {
    "slug": "loa-roi",
    "name": "Loa Rời & Củ Treble",
    "description": "Củ loa rời, loa bass rời 2 tấc đến 5 tấc và củ treble B&C Speakers Italy, P.Audio.",
    "id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "number": "09"
  },
  {
    "slug": "phu-kien-loa-roi",
    "name": "Phụ Kiện Loa Rời",
    "description": "Họng kèn loa treble, màng loa thay thế diaphragm và phụ kiện củ loa rời.",
    "id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "number": "10"
  },
  {
    "slug": "loa-thung-pro-audio",
    "name": "Loa Thùng & Sân Khấu Pro Audio",
    "description": "Hệ thống loa thùng biểu diễn sân khấu, loa cột PA, loa Line Array và Subwoofer công suất lớn.",
    "id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "number": "11"
  },
  {
    "slug": "loa-kiem-am",
    "name": "Loa Kiểm Âm (Monitor Speakers)",
    "description": "Loa kiểm âm phòng thu Studio Monitor và loa kiểm âm sân khấu độ chính xác cao.",
    "id": "073e7144-f976-58b1-8311-78fcd610548d",
    "number": "12"
  },
  {
    "slug": "amplifier-cong-suat",
    "name": "Amplifier - Cục Đẩy Công Suất",
    "description": "Cục đẩy công suất âm thanh nguồn xung và nguồn xuyến chuyên nghiệp cho hệ thống âm thanh lớn.",
    "id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "number": "13"
  },
  {
    "slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "description": "Bộ xử lý tín hiệu kỹ thuật số DSP Marani, Crossover, Equalizer, Compressor tối ưu âm thanh.",
    "id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "number": "14"
  },
  {
    "slug": "may-tao-khoi",
    "name": "Máy Tạo Khói & Sương Sân Khấu",
    "description": "Máy tạo khói sân khấu, máy khói lạnh, máy tạo sương Haze, máy tạo bong bóng Antari Châu Âu.",
    "id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "number": "15"
  },
  {
    "slug": "dung-dich-tao-khoi",
    "name": "Dung Dịch & Nước Tạo Khói",
    "description": "Nước tạo khói tiêu chuẩn, dung dịch khói nhẹ Haze, nước bong bóng, nước tuyết và tinh dầu tạo hương.",
    "id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "number": "16"
  },
  {
    "slug": "quat-dieu-huong",
    "name": "Quạt Điều Hướng Sân Khấu",
    "description": "Quạt gió chuyên dụng khuếch tán khói và tạo hiệu ứng gió sân khấu biểu diễn.",
    "id": "09ce254c-668c-512f-b949-23137ef21f75",
    "number": "17"
  },
  {
    "slug": "micro-khong-day",
    "name": "Micro Không Dây Chuyên Nghiệp",
    "description": "Hệ thống micro không dây UHF cao cấp Sennheiser EW-D, micro cài áo, micro gài đầu, anten thu sóng.",
    "id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "number": "18"
  },
  {
    "slug": "micro-co-day",
    "name": "Micro Có Dây & Phòng Thu",
    "description": "Micro có dây dynamic cho ca sĩ, micro thu âm condenser phòng thu, micro nhạc cụ chuyên nghiệp.",
    "id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "number": "19"
  },
  {
    "slug": "headphones-dj",
    "name": "Tai Nghe DJ & Kiểm Âm",
    "description": "Tai nghe DJ chuyên nghiệp cách âm đỉnh cao AlphaTheta, Sennheiser HD 25, Pioneer DJ.",
    "id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "number": "20"
  },
  {
    "slug": "day-tin-hieu-day-loa",
    "name": "Dây Tín Hiệu - Dây Loa",
    "description": "Dây cáp tín hiệu âm thanh Klotz AIS Germany, dây loa đồng nguyên chất chống nhiễu tuyệt đối.",
    "id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "number": "21"
  },
  {
    "slug": "nhac-cu",
    "name": "Nhạc Cụ & Trống Jazz",
    "description": "Nhạc cụ biểu diễn, bộ trống Jazz, trống điện tử, máy tạo nhịp Drum Machine.",
    "id": "83773903-f971-5813-a96e-e645ad96a66a",
    "number": "22"
  },
  {
    "slug": "phu-kien-nhac-cu",
    "name": "Phụ Kiện Nhạc Cụ",
    "description": "Phụ kiện dùi trống, chân đế, bao đàn, phụ kiện nhạc cụ biểu diễn.",
    "id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "number": "23"
  },
  {
    "slug": "phu-kien",
    "name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "description": "Giá treo loa, tủ rack, module điều khiển, phụ kiện Sennheiser và thiết bị âm thanh tổng hợp.",
    "id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "number": "24"
  }
];
export const MOCK_PRODUCTS: Product[] = [
  {
    "id": "2ab0bfe1-82e3-56bc-9bcc-9acb3fba5fa8",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE200 – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de200",
    "sku": "DE200",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE200 – CỦ TREBLE HỌNG 1 INCH EXIT B&C Speakers DE200 là compression driver phiên bản 8 Ω với đầu ra 1 inch exit, công suất danh định 50 W , công suất chương trình liên tục 100 W và độ nhạy 106 dB . Model sử dụng voice coil Nhôm 44 mm (1.7 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C SPEAKERS DE200 Công suất chương trình liên tục 100 W Đường kính họng kèn 1' Voice coil Nhôm 44 mm (1.7 in) Màng rung Titanium Dải tần đáp ứng ",
    "sale_enabled": true,
    "sale_price": 4186080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de200.png",
    "images": [
      {
        "id": "img-1076327121",
        "image_url": "/images/products/cu-treble-bc-speakers-de200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e1073507-f5c6-5bdc-842e-f906d47b427f",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18SW115 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-sub-roi-bc-speakers-5-tac-18sw115",
    "sku": "18SW115",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18SW115 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18SW115 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1700 W , công suất chương trình liên tục 3400 W , độ nhạy 97 dB và dải tần 35 Hz - 1500 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18SW115 Công suất chương trình liên tục 3400 W Voice coil Đồng 116 mm (4.5 in) kiểu quấn chia cuộn Dải tần đáp ứng 35 - 1500 Hz Độ nhạy 97 dB Dây dẫn được tối ưu cho hành trì",
    "sale_enabled": true,
    "sale_price": 24931800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18sw115.jpg",
    "images": [
      {
        "id": "img-1076320652",
        "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18sw115.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "934a61d1-04a6-5c20-be33-8c102fe5c8ed",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18PS100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-sub-roi-bc-speakers-5-tac-18ps100",
    "sku": "18PS100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18PS100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18PS100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 95.5 dB và dải tần 30 Hz - 1000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18PS100 Công suất chương trình liên tục 1400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 30 - 1000 Hz Độ nhạy 95.5 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ư",
    "sale_enabled": true,
    "sale_price": 9583920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18ps100.jpg",
    "images": [
      {
        "id": "img-1076320651",
        "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18ps100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "49166289-0cf7-5c96-b6ff-c84aacf8ef99",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18NW100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-sub-roi-bc-speakers-5-tac-18nw100",
    "sku": "18NW100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18NW100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18NW100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1200 W , công suất chương trình liên tục 2400 W , độ nhạy 98 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18NW100 Công suất chương trình liên tục 2400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 98 dB Cụm nam châm Neodymium được tối ưu bằng FEA Nhện loa đ",
    "sale_enabled": true,
    "sale_price": 14761440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18nw100.jpg",
    "images": [
      {
        "id": "img-1076320650",
        "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18nw100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "96f9a3ed-ae27-501d-9e2d-ca7089e2eff6",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18NBX100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-sub-roi-bc-speakers-5-tac-18nbx100",
    "sku": "18NBX100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18NBX100 – CỦ LOA WOOFER 18 INCH B&C Speakers 18NBX100 là củ loa woofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1200 W , công suất chương trình liên tục 2400 W , độ nhạy 96.5 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18NBX100 Công suất chương trình liên tục 2400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 96.5 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ư",
    "sale_enabled": true,
    "sale_price": 14761440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18nbx100.jpg",
    "images": [
      {
        "id": "img-1076320649",
        "image_url": "/images/products/loa-sub-roi-bc-speakers-5-tac-18nbx100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7a3797b9-6cfc-50ba-9c19-80cabc976619",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18TBW100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-sub-roi-bc-speakers-18tbw100",
    "sku": "18TBW100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18TBW100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18TBW100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1500 W , công suất chương trình liên tục 3000 W , độ nhạy 96 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18TBW100 Công suất chương trình liên tục 3000 W Voice coil Đồng 100 mm (4 in) kiểu quấn chia cuộn Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 96 dB Dây dẫn được tối ưu cho hành trìn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-bc-speakers-18tbw100.jpg",
    "images": [
      {
        "id": "img-1076320647",
        "image_url": "/images/products/loa-sub-roi-bc-speakers-18tbw100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "66cfce78-5b7d-5c5a-adc8-a932c4796fff",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "ME90 – Họng kèn B&C Speakers",
    "slug": "hong-ken-loa-treble-bc-speakers-me90",
    "sku": "ME90",
    "brand": "B&C SPEAKERS",
    "description": "HỌNG KÈN B&C SPEAKERS ME90 – ĐẦU VÀO 1.4 INCH EXIT B&C Speakers ME90 là họng kèn dành cho compression driver có đầu ra 1.4 inch exit. Sản phẩm có góc phủ 80 ° × 60 ° , tần số cutoff 0.9 kHz và thân họng bằng Nhôm đúc , phù hợp cho các thiết kế loa PA chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C ME90 Đường kính đầu vào 1.4\" Góc phủ danh định 80° x 60° Thiết kế kiểm soát hướng tính Constant Directivity Khả năng tải tốt xuống đến 900 Hz KIỂM SOÁT GÓC PHỦ Góc phủ 80 ° × 60 ° giúp xác định khu vực bao phủ của",
    "sale_enabled": true,
    "sale_price": 3291840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hong-ken-loa-treble-bc-speakers-me90.png",
    "images": [
      {
        "id": "img-1076320626",
        "image_url": "/images/products/hong-ken-loa-treble-bc-speakers-me90.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "13d494db-42f6-5c5c-b052-03e66134452b",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "ME45 – Họng kèn B&C Speakers",
    "slug": "hong-ken-loa-treble-bc-speakers-me45",
    "sku": "ME45",
    "brand": "B&C SPEAKERS",
    "description": "HỌNG KÈN B&C SPEAKERS ME45 – ĐẦU VÀO 1 INCH EXIT B&C Speakers ME45 là họng kèn dành cho compression driver có đầu ra 1 inch exit. Sản phẩm có góc phủ 90 ° × 40 ° , tần số cutoff 1 kHz và thân họng bằng Nhôm đúc , phù hợp cho các thiết kế loa PA chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C ME45 Đường kính đầu vào 1\" Góc phủ danh định 90° x 40° Biên dạng kèn Exponential Khả năng tải tốt xuống đến 1 kHz KIỂM SOÁT GÓC PHỦ Góc phủ 90 ° × 40 ° giúp xác định khu vực bao phủ của dải cao. Khi thiết kế hệ thống, c",
    "sale_enabled": true,
    "sale_price": 2190240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hong-ken-loa-treble-bc-speakers-me45.png",
    "images": [
      {
        "id": "img-1076320617",
        "image_url": "/images/products/hong-ken-loa-treble-bc-speakers-me45.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f7d195fa-8611-5956-8756-0803a5b2b40f",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "ME20 – Họng kèn B&C Speakers",
    "slug": "hong-ken-loa-treble-bc-speakers-me20",
    "sku": "ME20",
    "brand": "B&C SPEAKERS",
    "description": "HỌNG KÈN B&C SPEAKERS ME20 – ĐẦU VÀO 1 INCH EXIT B&C Speakers ME20 là họng kèn dành cho compression driver có đầu ra 1 inch exit. Sản phẩm có góc phủ 90 ° × 60 ° , tần số cutoff 1.5 kHz và thân họng bằng Nhôm đúc , phù hợp cho các thiết kế loa PA chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C ME20 Đường kính đầu vào 1\" Góc phủ danh định 90° x 60° Biên dạng kèn Exponential Khả năng tải tốt xuống đến 1.5 kHz KIỂM SOÁT GÓC PHỦ Góc phủ 90 ° × 60 ° giúp xác định khu vực bao phủ của dải cao. Khi thiết kế hệ thốn",
    "sale_enabled": true,
    "sale_price": 895860,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hong-ken-loa-treble-bc-speakers-me20.png",
    "images": [
      {
        "id": "img-1076320614",
        "image_url": "/images/products/hong-ken-loa-treble-bc-speakers-me20.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "064ff457-5e86-53be-b107-538783204d29",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE90TN – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de90tn",
    "sku": "DE90TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE90TN – CỦ TREBLE HỌNG 1.4 INCH EXIT B&C Speakers DE90TN là compression driver phiên bản 8 Ω với đầu ra 1.4 inch exit, công suất danh định 110 W , công suất chương trình liên tục 220 W và độ nhạy 107.5 dB . Model sử dụng voice coil Nhôm 75 mm (3 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C DE90TN Công suất chương trình liên tục 220 W Đường kính họng kèn 1.4\" Voice coil Nhôm 75 mm (3 in) Màng rung Titanium Dải tần đáp ứng 5",
    "sale_enabled": true,
    "sale_price": 9736200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de90tn.png",
    "images": [
      {
        "id": "img-1076320598",
        "image_url": "/images/products/cu-treble-bc-speakers-de90tn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3eeebffa-0947-501d-81b6-771978f7c8ec",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE82TN – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de82tn",
    "sku": "DE82TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE82TN – CỦ TREBLE HỌNG 1.4 INCH EXIT B&C Speakers DE82TN là compression driver phiên bản 8 Ω với đầu ra 1.4 inch exit, công suất danh định 110 W , công suất chương trình liên tục 220 W và độ nhạy 106.5 dB . Model sử dụng voice coil Nhôm 75 mm (3 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C DE82TN Công suất chương trình liên tục 220 W Đường kính họng kèn 1.4' Voice coil Nhôm 75 mm (3 in) Màng rung Titanium Dải tần đáp ứng 5",
    "sale_enabled": true,
    "sale_price": 9736200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de82tn.png",
    "images": [
      {
        "id": "img-1076320595",
        "image_url": "/images/products/cu-treble-bc-speakers-de82tn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4b36c637-ebe1-540a-94b8-ee90d9396f0d",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE60TN – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de60tn",
    "sku": "DE60TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE60TN – CỦ TREBLE HỌNG 1.4 INCH EXIT B&C Speakers DE60TN là compression driver phiên bản 8 Ω với đầu ra 1.4 inch exit, công suất danh định 110 W , công suất chương trình liên tục 220 W và độ nhạy 107 dB . Model sử dụng voice coil Nhôm 75 mm (3 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C DE60TN Công suất chương trình liên tục 220 W Đường kính họng kèn 1.4\" Voice coil Nhôm 75 mm (3 in) Dải tần đáp ứng 1000 - 18000 Hz Độ nhạ",
    "sale_enabled": true,
    "sale_price": 10238400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de60tn.png",
    "images": [
      {
        "id": "img-1076320591",
        "image_url": "/images/products/cu-treble-bc-speakers-de60tn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "352ec66a-26a4-545f-b3f8-2eaaf01caea8",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE400TN – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de400tn",
    "sku": "DE400TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE400TN – CỦ TREBLE HỌNG 1 INCH EXIT B&C Speakers DE400TN là compression driver phiên bản 8 Ω với đầu ra 1 inch exit, công suất danh định 50 W , công suất chương trình liên tục 100 W và độ nhạy 106 dB . Model sử dụng voice coil Nhôm 44 mm (1.7 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C SPEAKERS DE400TN Công suất chương trình liên tục 100 W Đường kính họng kèn 1' Voice coil Nhôm 44 mm (1.7 in) Màng rung Titanium Dải tần đá",
    "sale_enabled": true,
    "sale_price": 5329800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de400tn.png",
    "images": [
      {
        "id": "img-1076320582",
        "image_url": "/images/products/cu-treble-bc-speakers-de400tn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "88c24337-c9e8-52be-8c86-9f66b9c95e1b",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE250TN – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de250tn",
    "sku": "DE250TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE250TN – CỦ TREBLE HỌNG 1 INCH EXIT B&C Speakers DE250TN là compression driver phiên bản 8 Ω với đầu ra 1 inch exit, công suất danh định 60 W , công suất chương trình liên tục 120 W và độ nhạy 106 dB . Model sử dụng voice coil Nhôm 44 mm (1.7 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C DE250TN Công suất chương trình liên tục 120 W Đường kính họng kèn 1\" Voice coil Nhôm 44 mm (1.7 in) Màng rung Titanium Dải tần đáp ứng 100",
    "sale_enabled": true,
    "sale_price": 4406400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de250tn.png",
    "images": [
      {
        "id": "img-1076320578",
        "image_url": "/images/products/cu-treble-bc-speakers-de250tn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "96bcd5be-47c3-5f6f-b7eb-67d37781cd63",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE180 – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de180",
    "sku": "DE180",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE180 – CỦ TREBLE HỌNG 1 INCH EXIT B&C Speakers DE180 là compression driver phiên bản 8 Ω với đầu ra 1 inch exit, công suất danh định 60 W , công suất liên tục 120 W và độ nhạy 106.5 dB . Model sử dụng voice coil Nhôm 44 mm (1.7 in) cùng màng rung Polyimide, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C SPEAKERS DE180 Công suất chương trình liên tục 120 W Đường kính họng kèn 1' Voice coil Nhôm 44 mm (1.7 in) Màng rung Polyimide Dải tần đáp ứng 1000 - 17",
    "sale_enabled": true,
    "sale_price": 4075920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de180.png",
    "images": [
      {
        "id": "img-1076320575",
        "image_url": "/images/products/cu-treble-bc-speakers-de180.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f8550ee5-dce6-5bc9-89b3-90fdb01b77a4",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE14TN – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de14tn",
    "sku": "DE14TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE14TN – CỦ TREBLE HỌNG 1 INCH EXIT B&C Speakers DE14TN là compression driver phiên bản 8 Ω với đầu ra 1 inch exit, công suất danh định 30 W , công suất chương trình liên tục 60 W và độ nhạy 105 dB . Model sử dụng voice coil Nhôm 36 mm (1.4 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C DE14TN Công suất chương trình liên tục 60 W Đường kính họng kèn 1\" Voice coil Nhôm 36 mm (1.4 in) Màng rung Titanium Dải tần đáp ứng 1500 - 1",
    "sale_enabled": true,
    "sale_price": 2520720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de14tn.png",
    "images": [
      {
        "id": "img-1076320573",
        "image_url": "/images/products/cu-treble-bc-speakers-de14tn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ea248178-906a-5e92-8778-105e9a4c7585",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE10 – Củ loa treble B&C Speakers",
    "slug": "cu-treble-bc-speakers-de10",
    "sku": "DE10",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE10 – CỦ TREBLE HỌNG 1 INCH EXIT B&C Speakers DE10 là compression driver phiên bản 8 Ω với đầu ra 1 inch exit, công suất danh định 20 W , công suất chương trình liên tục 40 W và độ nhạy 107 dB . Model sử dụng voice coil Nhôm 25 mm (1 in) cùng màng rung Mylar, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C SPEAKERS DE10 Công suất chương trình liên tục 40 W Đường kính họng kèn 1\" Voice coil Nhôm 25 mm (1 in) Màng rung Polyester Dải tần đáp ứng 1500 - 1800",
    "sale_enabled": true,
    "sale_price": 1777140,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-bc-speakers-de10.png",
    "images": [
      {
        "id": "img-1076320570",
        "image_url": "/images/products/cu-treble-bc-speakers-de10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "742acca4-3d0b-5da4-85bb-05cf82c70ff4",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer Mackie ProFX16v3",
    "slug": "ban-mixer-mackie-profx16v3-16-kenh",
    "sku": "ProFX16v3",
    "brand": "Mackie",
    "description": "1. Ưu điểm nổi bật của Mixer Mackie ProFX16v3 Cắm cùng lúc 11 Micro – Tiếng hát to rõ, sạch sẽ, không rè Mackie ProFX16v3 trang bị sẵn 11 cổng cắm micro độc lập sử dụng công nghệ mạch khuếch đại Onyx Mic Preamp độc quyền của hãng. Giúp kích âm lượng micro lên mức chuẩn một cách mạnh mẽ (tăng cường âm lượng lên đến 60dB). Âm thanh thu vào cực kỳ chi tiết, trong trẻo, loại bỏ tối đa tạp âm và tiếng xì rè nền, kể cả khi bạn sử dụng các loại micro đòi hỏi công suất lớn. Rất lý tưởng cho các ban n",
    "sale_enabled": true,
    "sale_price": 18900000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ban-mixer-mackie-profx16v3-16-kenh.jpg",
    "images": [
      {
        "id": "img-1076252569",
        "image_url": "/images/products/ban-mixer-mackie-profx16v3-16-kenh.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "87475574-5f5a-5281-95b5-74ec11b9dc6d",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "Tai nghe kiểm âm Sennheiser HD 25 Plus – Tai nghe chuyên nghiệp dành cho DJ và kỹ thuật âm thanh",
    "slug": "tai-nghe-sennheiser-hd-25-plus",
    "sku": "HD25PLUS",
    "brand": "SENNHEISER",
    "description": "Sennheiser HD 25 Plus là tai nghe kiểm âm chuyên nghiệp dạng closed-back, on-ear , được thiết kế cho DJ, kỹ thuật viên âm thanh, phát thanh – truyền hình, ghi hình hiện trường và các công việc monitoring chuyên nghiệp. Với trọng lượng nhẹ, khả năng giảm tiếng ồn môi trường tốt và khả năng xử lý mức áp suất âm thanh cao, HD 25 Plus đặc biệt phù hợp để làm việc trong những môi trường có mức âm lượng lớn. Phiên bản HD 25 Plus sử dụng nền tảng của HD 25 nhưng được cung cấp thêm bộ phụ kiện gồm cáp x",
    "sale_enabled": true,
    "sale_price": 5830000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/tai-nghe-sennheiser-hd-25-plus.png",
    "images": [
      {
        "id": "img-1076060741",
        "image_url": "/images/products/tai-nghe-sennheiser-hd-25-plus.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e99acfc9-9b93-5cf9-8b9c-9fa7c183502c",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Tinh dầu máy khuếch tán Antari ESS-01-W - Jade Pine",
    "slug": "tinh-dau-may-khuech-tan-antari-ess-01-w-jade-pine",
    "sku": "VB-1075632060",
    "brand": "Antari",
    "description": "Tinh dầu máy khuếch tán Antari ESS-01-W Jade Pine 125ml Antari ESS-01-W Jade Pine là tinh dầu chuyên dụng dành cho hệ thống khuếch tán hương Antari, mang đến hương thơm lấy cảm hứng từ những khu rừng núi cao của Đài Loan. Sự kết hợp giữa Juniperus squamata var. morrisonicola và Chamaecyparis formosensis (Hinoki) tạo nên tầng hương gỗ tự nhiên, tươi mát và sâu lắng, phù hợp để xây dựng không gian thư giãn và trải nghiệm hương thơm chuyên nghiệp. Với dung tích 125 ml , tinh dầu Antari ESS-01-W Jad",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-w-jade-pine.png",
    "images": [
      {
        "id": "img-1075632060",
        "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-w-jade-pine.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cb1abe70-dc14-5751-aec6-9336cce0daea",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Tinh dầu máy khuếch tán Antari ESS-01-CW - Citrus Veil",
    "slug": "tinh-dau-may-khuech-tan-antari-ess-01-cw-citrus-veil",
    "sku": "VB-1075632059",
    "brand": "Antari",
    "description": "Tinh dầu máy khuếch tán Antari ESS-01-CW Citrus Veil 125ml Tinh dầu máy khuếch tán Antari ESS-01-CW Citrus Veil là dòng tinh dầu chuyên dụng dành cho hệ thống khuếch tán hương Antari, được phát triển để mang đến trải nghiệm hương thơm tươi sáng, thanh mát nhưng vẫn có chiều sâu và cảm giác cân bằng. Citrus Veil mở đầu bằng sự tươi mới của Pink Grapefruit – bưởi hồng và Lime – chanh xanh , tiếp nối với nét mát lạnh, trong trẻo của Camphor , trước khi lắng lại bằng lớp hương gỗ ấm áp của Rosewood ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-cw-citrus-veil.png",
    "images": [
      {
        "id": "img-1075632059",
        "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-cw-citrus-veil.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "27f97fb6-a51d-529e-93a2-b2dce0788203",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Tinh dầu máy khuếch tán Antari ESS-01-CFW - Tropical Breeze",
    "slug": "tinh-dau-may-khuech-tan-antari-ess-01-cfw-tropical-breeze",
    "sku": "VB-1075632057",
    "brand": "Antari",
    "description": "Tinh dầu máy khuếch tán Antari ESS-01-CFW Tropical Breeze 125ml Tinh dầu máy khuếch tán Antari ESS-01-CFW Tropical Breeze là dòng tinh dầu chuyên dụng dành cho hệ thống khuếch tán hương Antari, được phát triển để tạo nên trải nghiệm mùi hương tươi mới, thư giãn và cân bằng cho nhiều loại không gian khác nhau. Tropical Breeze gợi lên cảm giác của một sườn đồi ngập nắng, nơi hương citrus tươi sáng hòa cùng các tầng hương thảo mộc và sắc thái gỗ nhẹ nhàng. Mùi hương mở đầu với Sweet Orange – cam ng",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-cfw-tropical-breeze.png",
    "images": [
      {
        "id": "img-1075632057",
        "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-cfw-tropical-breeze.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "dfdef466-01e0-5d41-b2c0-bd5153b54082",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Tinh dầu máy khuếch tán Antari ESS-01-CFE - Whisper Forest",
    "slug": "tinh-dau-may-khuech-tan-antari-ess-01-cfe-whisper-forest",
    "sku": "VB-1075632056",
    "brand": "Antari",
    "description": "Tinh dầu máy khuếch tán Antari ESS-01-CFE Whisper Forest 125ml Tinh dầu máy khuếch tán Antari ESS-01-CFE Whisper Forest là hỗn hợp tinh dầu chuyên dụng dành cho hệ thống khuếch tán hương Antari, được phát triển để mang đến trải nghiệm mùi hương tự nhiên, tĩnh lặng và có chiều sâu. Whisper Forest lấy cảm hứng từ hình ảnh một khu rừng yên tĩnh thức giấc vào lúc bình minh, khi những tia nắng đầu tiên xuyên qua màn sương và không khí hòa quyện giữa hương citrus, thảo mộc cùng sắc thái gỗ và đất ấm á",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-cfe-whisper-forest.png",
    "images": [
      {
        "id": "img-1075632056",
        "image_url": "/images/products/tinh-dau-may-khuech-tan-antari-ess-01-cfe-whisper-forest.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5f93b88a-4f7c-5bd6-b1c7-77feac3d2ab6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Module điều khiển không dây Antari WTR-20",
    "slug": "module-dieu-khien-khong-day-antari-wtr-20",
    "sku": "VB-1075632020",
    "brand": "Antari",
    "description": "Bộ điều khiển không dây Antari WTR-20 – Wireless Remote cho thiết bị Antari tương thích Antari WTR-20 Wireless Remote là bộ phụ kiện điều khiển không dây dành cho các thiết bị hiệu ứng Antari tương thích, giúp người vận hành kích hoạt và điều khiển thiết bị từ xa mà không cần đứng trực tiếp bên cạnh máy. Bộ WTR-20 bao gồm đầy đủ: W-2 Wireless Transmitter x 1 – bộ phát điều khiển không dây. W-2 Wireless Receiver x 1 – bộ thu tín hiệu không dây. Khi được sử dụng với thiết bị tương thích, WTR-20 gi",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/module-dieu-khien-khong-day-antari-wtr-20.png",
    "images": [
      {
        "id": "img-1075632020",
        "image_url": "/images/products/module-dieu-khien-khong-day-antari-wtr-20.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f1fd2f92-36a7-5536-9922-4bb7fa81949e",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo bong bóng Antari W-101",
    "slug": "may-tao-bong-bong-antari-w-101",
    "sku": "VB-1075631973",
    "brand": "Antari",
    "description": "Máy tạo bong bóng Antari W-101 – Điều khiển không dây tiện lợi cho sân khấu và sự kiện Máy tạo bong bóng Antari W-101 là dòng máy tạo bong bóng không dây – Wireless Bubble Machine của Antari, được thiết kế cho các chương trình cần hiệu ứng bong bóng sinh động kết hợp khả năng vận hành linh hoạt từ xa. Máy sử dụng hệ thống Double Bubble Wheel , hỗ trợ tạo dòng bong bóng liên tục và được trang bị sẵn bộ phát không dây W-1 Wireless Transmitter . Người vận hành có thể lựa chọn giữa chế độ Manual trự",
    "sale_enabled": true,
    "sale_price": 5022000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/may-tao-bong-bong-antari-w-101.png",
    "images": [
      {
        "id": "img-1075631973",
        "image_url": "/images/products/may-tao-bong-bong-antari-w-101.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3d1670a0-a18a-5ce3-98a8-71301d03624b",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy khuếch tán hương Antari SCN-600",
    "slug": "may-khuech-tan-huong-antari-scn-600",
    "sku": "VB-1075631968",
    "brand": "Antari",
    "description": "Máy khuếch tán hương Antari SCN-600 – Giải pháp tạo hương chuyên nghiệp cho mọi không gian Máy khuếch tán hương Antari SCN-600 là thiết bị tạo hương chuyên nghiệp thuộc dòng SCN Series của Antari, được phát triển nhằm mang đến trải nghiệm hương thơm đồng đều và có kiểm soát cho nhiều loại không gian khác nhau. Với thiết kế hiện đại, khả năng vận hành êm ái và nhiều phương thức điều khiển linh hoạt, SCN-600 phù hợp cho các ứng dụng thương mại, chuyên nghiệp và không gian trải nghiệm cần xây dựng ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/may-khuech-tan-huong-antari-scn-600.png",
    "images": [
      {
        "id": "img-1075631968",
        "image_url": "/images/products/may-khuech-tan-huong-antari-scn-600.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c39b5726-d710-5fdc-82cf-f16c80dc0c04",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Giá treo Antari B-200-HB",
    "slug": "gia-treo-antari-b-200-hb",
    "sku": "VB-1075631949",
    "brand": "Antari",
    "description": "Giá treo Antari B-200-HB – Phụ kiện dành cho máy tạo bong bóng B-200 Giá treo Antari B-200-HB là phụ kiện lắp đặt được thiết kế dành cho máy tạo bong bóng Antari B-200 , hỗ trợ cố định và bố trí thiết bị tại vị trí phù hợp trong hệ thống sân khấu, sự kiện và các ứng dụng hiệu ứng chuyên nghiệp. Theo danh mục chính thức của Antari, B-200-HB thuộc nhóm Bracket Set và model tương thích được hãng công bố là Antari B-200 Bubble Effects . Vì vậy, đây là phụ kiện cần được lựa chọn đúng theo model máy, ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/gia-treo-antari-b-200-hb.png",
    "images": [
      {
        "id": "img-1075631949",
        "image_url": "/images/products/gia-treo-antari-b-200-hb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2fe1f6e7-e8b8-5eaf-872b-c470ba38dae6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Giá treo Antari B-100-HB",
    "slug": "gia-treo-antari-b-100-hb",
    "sku": "VB-1075631948",
    "brand": "Antari",
    "description": "Giá treo Antari B-100-HB – Phụ kiện dành riêng cho máy tạo bong bóng B-100 Giá treo Antari B-100-HB là phụ kiện lắp đặt được thiết kế dành riêng cho máy tạo bong bóng Antari B-100 , hỗ trợ cố định và bố trí thiết bị tại vị trí phù hợp trong các hệ thống sân khấu, sự kiện và không gian giải trí. Việc sử dụng đúng bộ giá treo theo model giúp quá trình lắp đặt B-100 thuận tiện hơn, đồng thời đảm bảo sự phù hợp về kích thước và kết cấu cơ khí so với việc tự chế hoặc sử dụng giá treo không đúng thiết",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/gia-treo-antari-b-100-hb.png",
    "images": [
      {
        "id": "img-1075631948",
        "image_url": "/images/products/gia-treo-antari-b-100-hb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bf8d9502-d0a9-533f-92a3-6ef39b1081ee",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Bộ phát không dây Antari W-1",
    "slug": "bo-phat-khong-day-antari-w-1",
    "sku": "VB-1075631896",
    "brand": "Antari",
    "description": "Bộ phát không dây Antari W-1 – Wireless Transmitter cho thiết bị Antari tương thích Bộ phát không dây Antari W-1 là phụ kiện điều khiển từ xa không dây dành cho một số thiết bị hiệu ứng Antari tương thích. Với thiết kế nhỏ gọn và thao tác đơn giản, W-1 giúp người vận hành chủ động kích hoạt hoặc dừng hiệu ứng từ xa mà không cần đứng trực tiếp bên cạnh thiết bị. Theo thông tin chính thức từ Antari, W-1 Wireless Transmitter có hai phiên bản tần số 315 MHz hoặc 433 MHz và phạm vi hoạt động lên đến ",
    "sale_enabled": true,
    "sale_price": 557000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/bo-phat-khong-day-antari-w-1.png",
    "images": [
      {
        "id": "img-1075631896",
        "image_url": "/images/products/bo-phat-khong-day-antari-w-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2d5c1314-72c5-5c62-84e0-07a829dbfa64",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "MÁY DJ ALPHATHETA XDJ-AN",
    "slug": "alphatheta-xdj-an",
    "sku": "XDJAN",
    "brand": "AlphaTheta",
    "description": "AlphaTheta XDJ-AN – Thiết bị DJ All-in-One nhỏ gọn cho thế hệ DJ mới XDJ-AN là máy DJ All-in-One 2 kênh mới nhất của AlphaTheta , hướng đến những DJ cần một thiết bị độc lập, gọn nhẹ nhưng vẫn đảm bảo trải nghiệm biểu diễn chuyên nghiệp. Thay vì tập trung vào số lượng nút điều khiển, AlphaTheta lựa chọn một hướng tiếp cận mới: đơn giản hóa thao tác vật lý, tăng cường khả năng điều khiển qua màn hình cảm ứng và giữ lại workflow quen thuộc của hệ sinh thái CDJ/XDJ . Thiết kế gọn gàng, tối ưu cho k",
    "sale_enabled": true,
    "sale_price": 37227600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/alphatheta-xdj-an.png",
    "images": [
      {
        "id": "img-1075496082",
        "image_url": "/images/products/alphatheta-xdj-an.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "58903264-1fd4-5378-94ab-a1069f6541c1",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ ALPHATHETA CDJ-1500X",
    "slug": "cdj-1500x-chinh-hang-alphatheta",
    "sku": "CDJ1500X",
    "brand": "AlphaTheta",
    "description": "AlphaTheta CDJ-1500X – DJ Player chuyên nghiệp trong thiết kế nhỏ gọn Sau thành công của CDJ-3000X, AlphaTheta tiếp tục mở rộng dòng CDJ với CDJ-1500X – mẫu DJ Player được phát triển dành cho những không gian cần một hệ thống biểu diễn chuyên nghiệp nhưng không có quá nhiều diện tích lắp đặt. Giữ lại nhiều công nghệ từ dòng đầu bảng, CDJ-1500X mang đến trải nghiệm quen thuộc của hệ sinh thái CDJ trong một thiết kế gọn hơn, nhẹ hơn và linh hoạt hơn. Đây là lựa chọn phù hợp cho quầy bar, lounge, n",
    "sale_enabled": true,
    "sale_price": 49680000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cdj-1500x-chinh-hang-alphatheta.png",
    "images": [
      {
        "id": "img-1075355900",
        "image_url": "/images/products/cdj-1500x-chinh-hang-alphatheta.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c1931e26-3b35-55de-9b99-87b730f90c2b",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ TWINPATCH TP414 (balanced stereo patch cable compact construction - PVC)",
    "slug": "klotz-twin-patch-tp414",
    "sku": "TP414",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ TWINPATCH TP414 (balanced stereo patch cable compact construction - PVC)",
    "sale_enabled": true,
    "sale_price": 103032,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/klotz-twin-patch-tp414.png",
    "images": [
      {
        "id": "img-1075102906",
        "image_url": "/images/products/klotz-twin-patch-tp414.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f88b572e-7d32-5633-a623-bc1d09f94b68",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "10BG76 – Loa bass rời B&C Speakers 2 tấc rưỡi 10 inch",
    "slug": "bc-speakers-10bg76",
    "sku": "10BG76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 10BG76 – CỦ LOA SUBWOOFER GÂN CAO SU 10 INCH B&C Speakers 10BG76 là củ loa subwoofer gân cao su 10 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 500 W , công suất chương trình liên tục 1000 W , độ nhạy 91.5 dB và dải tần 49 Hz - 800 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 10BG76 Công suất chương trình liên tục 1000 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 49 - 800 Hz Độ nhạy 91.5 dB Dây dẫn được tối ưu cho hành trình ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/bc-speakers-10bg76.jpg",
    "images": [
      {
        "id": "img-1073435271",
        "image_url": "/images/products/bc-speakers-10bg76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b79f5514-bbbf-5d26-b944-9a6163364c20",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJM-V5",
    "slug": "mixer-djm-v5",
    "sku": "DJMV5",
    "brand": "AlphaTheta",
    "description": "DJM-V5 – Mixer DJ 3 kênh thế hệ mới từ AlphaTheta DJM-V5 là mẫu mixer DJ 3 kênh thế hệ mới đến từ AlphaTheta , được phát triển dành cho DJ hiện đại – những người cần một mixer gọn gàng, dễ kiểm soát nhưng vẫn đủ chiều sâu để biểu diễn chuyên nghiệp . DJM-V5 không đi theo hướng “nhiều tính năng cho đủ”, mà tập trung vào trải nghiệm thao tác, độ ổn định và chất lượng âm thanh , đúng tinh thần mixer dùng để chơi nhạc mỗi ngày và chạy show thực tế. DJM-V5 sinh ra để làm gì? DJM-V5 được thiết kế cho ",
    "sale_enabled": true,
    "sale_price": 67200000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mixer-djm-v5.png",
    "images": [
      {
        "id": "img-1072711065",
        "image_url": "/images/products/mixer-djm-v5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "35ad4b28-d2de-5a61-9b7f-c5e6fe2fd711",
    "category_id": "09ce254c-668c-512f-b949-23137ef21f75",
    "category_name": "Quạt Điều Hướng Sân Khấu",
    "category_slug": "quat-dieu-huong",
    "name": "Quạt hiệu ứng chống nước Antari AF-14",
    "slug": "antari-af-14c",
    "sku": "AF14C",
    "brand": "Antari",
    "description": "Quạt hiệu ứng chống nước Antari AF-14C – Giải pháp hiệu ứng chuyên nghiệp cho sân khấu và sự kiện Nếu đang tìm kiếm quạt hiệu ứng Antari AF-14C cho sân khấu, sự kiện hoặc hệ thống lắp đặt, Quạt hiệu ứng chống nước Antari AF-14C là model đáng cân nhắc trong danh mục Antari. Thiết bị hướng đến khả năng tạo hiệu ứng rõ ràng, hỗ trợ quá trình triển khai và đồng bộ tốt hơn với hệ thống trình diễn. Với từ khóa chính quạt hiệu ứng Antari AF-14C , người dùng thường quan tâm đến ba vấn đề: hiệu ứng có ph",
    "sale_enabled": true,
    "sale_price": 39744000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/antari-af-14c.png",
    "images": [
      {
        "id": "img-1072704322",
        "image_url": "/images/products/antari-af-14c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c25be7fb-defe-5105-8644-d444cd08a4a3",
    "category_id": "1642bf81-abd9-5f68-940e-b0b53a902eba",
    "category_name": "DJ Sampler & Remix",
    "category_slug": "dj-sampler",
    "name": "RMX Ignite Effector",
    "slug": "rmx-ignite-effector",
    "sku": "IGNITE",
    "brand": "AlphaTheta",
    "description": "RMX Ignite Effector – Bộ hiệu ứng DJ thế hệ mới từ AlphaTheta RMX Ignite Effector là sản phẩm effector controller mới nhất từ AlphaTheta , được phát triển dành cho DJ hiện đại – những người không chỉ mix nhạc, mà còn muốn can thiệp sâu vào cảm xúc và cao trào của set diễn thông qua hiệu ứng. Khác với các hiệu ứng tích hợp sẵn trên mixer, RMX Ignite Effector tập trung vào điều khiển bằng tay theo thời gian thực , giúp DJ tạo hiệu ứng đúng khoảnh khắc, đúng nhịp, và đúng ý đồ biểu diễn. RMX Ignite",
    "sale_enabled": true,
    "sale_price": 39800000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rmx-ignite-effector.png",
    "images": [
      {
        "id": "img-1072653137",
        "image_url": "/images/products/rmx-ignite-effector.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4af75487-c4a3-59ad-a766-10ac27e0fad8",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "NEXO NanoNXAMP4",
    "slug": "nexo-nanonxamp4",
    "sku": "NANONXAMP4",
    "brand": "NEXO",
    "description": "NEXO NanoNXAMP4 – Sức mạnh khuếch đại trong tầm tay NEXO NanoNXAMP4 – bộ khuếch đại công suất tích hợp DSP thế hệ mới, nhỏ gọn nhưng mạnh mẽ, mang đến hiệu suất âm thanh đỉnh cao cho mọi không gian biểu diễn và lắp đặt. #### Trong thế giới âm thanh chuyên nghiệp, NEXO luôn được nhắc đến như biểu tượng của hiệu suất và độ chính xác. Tiếp nối thành công từ dòng NXAMP MK2 , hãng vừa ra mắt NanoNXAMP4 – một ampli 4 kênh tích hợp DSP mạnh mẽ, được thiết kế cho những hệ thống yêu cầu chất lượng cao tr",
    "sale_enabled": true,
    "sale_price": 77921352,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/nexo-nanonxamp4.png",
    "images": [
      {
        "id": "img-1071134625",
        "image_url": "/images/products/nexo-nanonxamp4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "11a0be12-f8d6-5669-a56a-0dd07bed8d91",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "CDJ-3000X",
    "slug": "cdj-3000x",
    "sku": "CDJ3000X",
    "brand": "AlphaTheta",
    "description": "CDJ-3000X – thiết bị player DJ chuyên nghiệp thế hệ tiếp theo đến từ AlphaTheta Tự do sáng tạo – Kết nối không giới hạn với Cloud & Streaming Kết nối linh hoạt – Mở rộng không gian sáng tạo Với khả năng truy cập vào kho lưu trữ nhạc từ cloud và các dịch vụ streaming, CDJ-3000X mang đến sự linh hoạt tối đa cho DJ trong mọi tình huống. Wi-Fi® tích hợp: kết nối internet dễ dàng, không cần dây LAN – tiết kiệm thời gian set up. NFC touchpoint ngay mặt trước: chỉ cần chạm smartphone, bạn có thể truy c",
    "sale_enabled": true,
    "sale_price": 89910000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cdj-3000x.png",
    "images": [
      {
        "id": "img-1069921758",
        "image_url": "/images/products/cdj-3000x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8248f031-279a-5493-be4e-3edd26308f5a",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI PAUDIO 4 TẤC C15-400B",
    "slug": "loa-roi-paudio-4-tac-c15-400b",
    "sku": "C15400B",
    "brand": "P.AUDIO",
    "description": "ĐVT: CẶP Loa bass 4 tấc Paudio C15-400B Đường kính định mức: 381mm Công suất định mức: 400W Công suất tối đa: 1600W Trở kháng định mức: 8Ohms Độ nhạy: 96dB Đáp tuyến tần số: 55Hz~22KHz Đường kính họng loa: 76mm Kích thước hộp: 430 x 430 x 230mm Trọng lượng: 10Kg",
    "sale_enabled": true,
    "sale_price": 7819200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-paudio-4-tac-c15-400b.jpg",
    "images": [
      {
        "id": "img-1069342948",
        "image_url": "/images/products/loa-roi-paudio-4-tac-c15-400b.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "26def6ac-1a30-5de6-99e3-8c31e6788cdf",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI PAUDIO 4 TẤC C15-300MB",
    "slug": "loa-roi-paudio-4-tac-c15-300mb",
    "sku": "C15300MB",
    "brand": "P.AUDIO",
    "description": "ĐVT: CẶP Loa rời C15-300MB Công suất 300watts Độ nhạy: 98.6dB Đáp tuyến: 35Hz - 3.2kHz Trọng lượng: 7.15 kg Vỏ nhôm đúc Nam châm: Ferrite Voice Coil Dây nhôm mạ đồng",
    "sale_enabled": true,
    "sale_price": 7452000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-paudio-4-tac-c15-300mb.jpg",
    "images": [
      {
        "id": "img-1069342916",
        "image_url": "/images/products/loa-roi-paudio-4-tac-c15-300mb.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f80e1b76-a9d9-5d68-bd7a-2336771d1791",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "CỦ TREBLE P.AUDIO BM-D750 2016",
    "slug": "cu-treble-p-audio-bm-d750-2016",
    "sku": "BMD7502016",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO BM-D750 2016 ĐVT: CẶP Nam châm Ferrite Voice Coil: 72.2 Dây Coil nhôm Độ nhạy 108 db. Công suất 110 W (AES) Trở kháng 8 Ω Độ nhạy 108 dB Dãy tần số 1000 - 20kHz Nam châm Ferrite Khối lượng tịnh 4,8 kg",
    "sale_enabled": true,
    "sale_price": 4298400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-p-audio-bm-d750-2016.jpg",
    "images": [
      {
        "id": "img-1069342694",
        "image_url": "/images/products/cu-treble-p-audio-bm-d750-2016.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cc2791c2-f96a-5fc3-a25b-f4779f5df055",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "CỦ TREBLE P.AUDIO BM-D750",
    "slug": "cu-treble-p-audio-bm-d750",
    "sku": "BMD750",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO BM-D750 ĐVT: CẶP Nam châm Ferrite Voice Coil: 76.2 Dây Coil nhôm Độ nhạy 112 db. Công suất 100 W (AES) Trở kháng 8 Ω Độ nhạy 112 dB Dãy tần số 1200 - 30kHz Nam châm Ferrite Khối lượng tịnh 4,9 kg",
    "sale_enabled": true,
    "sale_price": 4168800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-p-audio-bm-d750.jpg",
    "images": [
      {
        "id": "img-1069342644",
        "image_url": "/images/products/cu-treble-p-audio-bm-d750.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "18fc3997-ad98-5e08-bf44-fa4dc7cb828a",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "SanDisk® DJ Flash Drive - Ổ USB Chuyên Nghiệp Cho DJ",
    "slug": "sandisk-dj-flash-drive",
    "sku": "SANDISK512GB",
    "brand": "Sandisk",
    "description": "Tốc độ đọc/ghi siêu nhanh đến 1.000/900 MB/s, dùng được cả USB-A và USB-C, tương thích toàn diện với thiết bị Pioneer DJ/AlphaTheta. Thiết kế siêu nhẹ, hỗ trợ tối đa cho bộ sưu tập nhạc và công việc biểu diễn của bạn. SanDisk® DJ Flash Drive – Ổ USB Chuyên Nghiệp Cho DJ Tổng quan sản phẩm SanDisk® DJ Flash Drive là sản phẩm đồng phát triển giữa SanDisk và AlphaTheta – được tối ưu hoàn toàn cho hệ sinh thái Pioneer DJ/AlphaTheta và phần mềm rekordbox. Đây là lựa chọn lưu trữ tốc độ cao, bền bỉ, l",
    "sale_enabled": true,
    "sale_price": 3762000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/sandisk-dj-flash-drive.jpg",
    "images": [
      {
        "id": "img-1069341916",
        "image_url": "/images/products/sandisk-dj-flash-drive.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f1960c2d-a970-5eec-8e74-07fd2e7bb818",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E 865",
    "slug": "micro-co-day-sennheiser-e-865",
    "sku": "E865",
    "brand": "SENNHEISER",
    "description": "Sennheiser e 865 – Micro condenser cầm tay dành cho sân khấu Micro có dây Sennheiser e 865 là mẫu micro condenser cầm tay cao cấp đến từ thương hiệu Đức Sennheiser , được thiết kế tối ưu cho biểu diễn live và sân khấu chuyên nghiệp. Với khả năng tái tạo âm thanh chi tiết, độ nhạy cao và thiết kế chống hú hiệu quả, e 865 là lựa chọn lý tưởng cho ca sĩ, MC, nghệ sĩ biểu diễn trong nhà hát, sân khấu lớn hoặc không gian âm thanh khó kiểm soát. Vì sao nên chọn e 865 thay vì mic thông thường? Âm t",
    "sale_enabled": true,
    "sale_price": 6750000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/micro-co-day-sennheiser-e-865.png",
    "images": [
      {
        "id": "img-1069210119",
        "image_url": "/images/products/micro-co-day-sennheiser-e-865.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1003c936-bcc0-5385-a010-9303ba89375b",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "DDJ-FLX4-W",
    "slug": "ddj-flx4-w",
    "sku": "DDJFLX4W",
    "brand": "Pioneer DJ",
    "description": "The DDJ-FLX4 is a 2-channel controller with a simple, user-friendly design and a professional feel. KEY FEATURES rekordbox and Serato compatibility Bạn có thể sử dụng rekordbox và Serato DJ Lite chỉ cần kết nối DDJ-FLX4 với PC/Mac. Nếu bạn muốn sử dụng DDJ-FLX4 cùng Serato DJ Pro, bạn có thể mua license key hoặc đăng ký subscription của Serato DJ Pro. Multi-device support Cho dù bạn đang sử dụng PC, Mac, Iphone, IPad hay Android phone/tablet, DDJ-FLX4 đều có thể sử dụng được. Ngoài ra, DDJ-FLX4 ",
    "sale_enabled": true,
    "sale_price": 12270000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-flx4-w.png",
    "images": [
      {
        "id": "img-1067516568",
        "image_url": "/images/products/ddj-flx4-w.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "12dc58b9-bc7c-5232-a439-ea32d34b25dc",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Dung dịch tạo khói Antari FLC-5",
    "slug": "nuoc-khoi-antari-flc-5",
    "sku": "FLC-5",
    "brand": "Antari",
    "description": "Dung dịch tạo khói Antari FLC-5 – Dung dịch hiệu ứng chính hãng Antari Dung dịch tạo khói Antari FLC-5 thuộc nhóm dung dịch tạo khói của Antari, được phát triển để tạo khói sân khấu theo đặc tính độ dày và thời gian lưu khác nhau. Khi tìm kiếm dung dịch tạo khói Antari FLC-5 , người dùng không chỉ cần đúng loại hiệu ứng mà còn phải kiểm tra khả năng tương thích với máy, điều kiện vận hành và mật độ hiệu ứng mong muốn. Dung dịch là một phần của hệ thống tạo hiệu ứng, không phải vật tư có thể thay",
    "sale_enabled": true,
    "sale_price": 678240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/nuoc-khoi-antari-flc-5.png",
    "images": [
      {
        "id": "img-1066945265",
        "image_url": "/images/products/nuoc-khoi-antari-flc-5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7fc7f727-beb4-5f54-beb4-bb65eb07be84",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA FULL 2 TẤC GM-814FG",
    "slug": "loa-full-2-tac-gm814fg",
    "sku": "GM814FG",
    "brand": "G.Music",
    "description": "ĐVT: CẶP Loa Point Source GM-814FG Một lựa chọn lý tưởng cho phòng thu, sân khấu, dàn âm thanh gia đình và nhiều ứng dụng âm thanh chuyên nghiệp khác. Với thiết kế tối ưu và công nghệ âm thanh tiên tiến, loa Point Source GM-814FG sẽ mang lại trải nghiệm âm nhạc tuyệt vời nhất mà bạn từng mong đợi. Loa Point Source GM-814FG – Sự Kết Hợp Hoàn Hảo Giữa Loa Rời B&C Speakers 8FG51 và Củ Treble DE14TN Bạn đang tìm kiếm một hệ thống loa Point Source mạnh mẽ, chất lượng cao với âm thanh chân thực và chi",
    "sale_enabled": true,
    "sale_price": 26881200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-full-2-tac-gm814fg.png",
    "images": [
      {
        "id": "img-1064118050",
        "image_url": "/images/products/loa-full-2-tac-gm814fg.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2ec87aa9-e2ed-5c25-88ad-8cecc4ade477",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Tinh dầu tạo hương Antari P-Series cho máy khói",
    "slug": "tinh-dau-thom-antari",
    "sku": "APPLE",
    "brand": "Antari",
    "description": "Tinh dầu tạo hương Antari P-Series cho máy khói – Dung dịch hiệu ứng chính hãng Antari Tinh dầu tạo hương Antari P-Series cho máy khói thuộc nhóm tinh dầu hiệu ứng của Antari, được phát triển để bổ sung mùi hương cho hệ thống tạo khói hoặc máy khuếch tán hương tương thích. Khi tìm kiếm tinh dầu tạo hương Antari P-Series , người dùng không chỉ cần đúng loại hiệu ứng mà còn phải kiểm tra khả năng tương thích với máy, điều kiện vận hành và mật độ hiệu ứng mong muốn. Dung dịch là một phần của hệ thố",
    "sale_enabled": true,
    "sale_price": 233280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/tinh-dau-thom-antari.png",
    "images": [
      {
        "id": "img-1063690526",
        "image_url": "/images/products/tinh-dau-thom-antari.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "100c216d-2aed-5c09-ac9b-841b6a067d91",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "EW-D EM",
    "slug": "ew-d-em",
    "sku": "EW-D EM",
    "brand": "SENNHEISER",
    "description": "EW-D EM",
    "sale_enabled": true,
    "sale_price": 9210000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-d-em.png",
    "images": [
      {
        "id": "img-1063683626",
        "image_url": "/images/products/ew-d-em.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e4912a14-feb3-507c-abfc-cb7828b84977",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "EW-D SKM-S",
    "slug": "ew-d-skm-s",
    "sku": "EW-D SKM-S",
    "brand": "SENNHEISER",
    "description": "EW-D SKM-S",
    "sale_enabled": true,
    "sale_price": 9050000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-d-skm-s.png",
    "images": [
      {
        "id": "img-1063683463",
        "image_url": "/images/products/ew-d-skm-s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1dd17110-6e93-5d8e-b149-48e72516d083",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "Thiết bị xử lý âm thanh NEXO DME10",
    "slug": "thiet-bi-xu-ly-am-thanh-nexo-dme10",
    "sku": "DME10",
    "brand": "NEXO",
    "description": "NEXO DME10 là bộ xử lý immersive tiên tiến, được xây dựng trên nền tảng DME của Yamaha, nhưng mở rộng đáng kể về khả năng tùy chỉnh và hiệu suất. Với kiến trúc mở 256 x 256 kênh , DME10 cho phép người dùng toàn quyền kiểm soát hệ thống âm thanh, tạo ra các thiết kế âm thanh phức tạp và gần như không giới hạn . DME10 đi kèm với 32 đầu vào đối tượng (object inputs) và 16 đầu ra loa (speaker outputs) theo mặc định, nhưng có thể mở rộng lên đến 128 object inputs và 64 speaker outputs thông qua cấp p",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/thiet-bi-xu-ly-am-thanh-nexo-dme10.png",
    "images": [
      {
        "id": "img-1063502932",
        "image_url": "/images/products/thiet-bi-xu-ly-am-thanh-nexo-dme10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "50c00613-f2d7-5bdf-8ea9-d090dd0373b3",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA NEXO B218",
    "slug": "loa-nexo-b218",
    "sku": "B218",
    "brand": "NEXO",
    "description": "Loa NEXO B218 là mô-đun bass mạnh mẽ thuộc hệ thống Alpha+ , mang đến khả năng tái tạo âm trầm cực kỳ mạnh mẽ và chính xác. Sử dụng hai củ loa neodymium 18” kết hợp trong một khoang cộng hưởng chung với họng bass đối xứng , B218 mang lại hiệu suất tối đa với độ méo cực thấp , ngay cả ở mức âm lượng cao. Với thiết kế vỏ thùng loa bằng ván gỗ bạch dương có độ bền cao cùng trọng lượng 77 kg , loa NEXO B218 đạt SPL cực đại lên đến 146 dB , là sự lựa chọn lý tưởng cho hệ thống âm thanh biểu diễn chuy",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-nexo-b218.png",
    "images": [
      {
        "id": "img-1063502892",
        "image_url": "/images/products/loa-nexo-b218.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2cc1fefa-5e67-558a-9026-99575b9a27db",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA NEXO M210",
    "slug": "loa-nexo-m210",
    "sku": "NEXO_M210",
    "brand": "NEXO",
    "description": "Loa NEXO M210 là mô-đun Main hai đường tiếng trong hệ thống Alpha+ , mang đến hiệu suất âm thanh đỉnh cao với độ nhạy cao , khả năng định hướng linh hoạt , cùng thiết kế nhẹ và bền . Với công suất cực đại lên đến 148 dB SPL , loa M210 là lựa chọn lý tưởng cho các hệ thống âm thanh biểu diễn chuyên nghiệp , sân khấu , sự kiện trực tiếp và các ứng dụng âm thanh yêu cầu độ phủ rộng . Loa NEXO M210 – Hệ thống Main module mạnh mẽ cho âm thanh chuyên nghiệp Đặc điểm nổi bật của loa NEXO M210 Công su",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-nexo-m210.png",
    "images": [
      {
        "id": "img-1063502650",
        "image_url": "/images/products/loa-nexo-m210.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "52f7e590-1bab-5ccc-b367-c8a3abb6c6ce",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "Loa Sub Rời B&C Speakers 5 tấc 18SW115",
    "slug": "loa-sub-roi-b-c-speakers-5-tac-18sw115",
    "sku": "VB-1063451476",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18SW115 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18SW115 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1700 W , công suất chương trình liên tục 3400 W , độ nhạy 97 dB và dải tần 35 Hz - 1500 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18SW115 Công suất chương trình liên tục 3400 W Voice coil Đồng 116 mm (4.5 in) kiểu quấn chia cuộn Dải tần đáp ứng 35 - 1500 Hz Độ nhạy 97 dB Dây dẫn được tối ưu cho hành trì",
    "sale_enabled": true,
    "sale_price": 24931800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18sw115.jpg",
    "images": [
      {
        "id": "img-1063451476",
        "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18sw115.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c680f5eb-f299-5381-97a3-e675455d8770",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "Loa Sub Rời B&C SPEAKERS 5 tấc 18TBW100",
    "slug": "loa-sub-roi-b-c-speakers-18tbw100",
    "sku": "VB-1063450990",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18TBW100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18TBW100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1500 W , công suất chương trình liên tục 3000 W , độ nhạy 96 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18TBW100 Công suất chương trình liên tục 3000 W Voice coil Đồng 100 mm (4 in) kiểu quấn chia cuộn Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 96 dB Dây dẫn được tối ưu cho hành trìn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-b-c-speakers-18tbw100.jpg",
    "images": [
      {
        "id": "img-1063450990",
        "image_url": "/images/products/loa-sub-roi-b-c-speakers-18tbw100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9a65c238-7861-5d44-bfc5-2c93d6056706",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy phun khói và sương Antari F-7X Smaze",
    "slug": "may-khoi-antari-f-7x-s",
    "sku": "F7XS",
    "brand": "Antari",
    "description": "Máy phun khói và sương Antari F-7X Smaze – Giải pháp hiệu ứng chuyên nghiệp cho sân khấu và sự kiện Máy phun khói và sương Antari F-7X Smaze là giải pháp thuộc hệ sinh thái hiệu ứng sân khấu Antari, được định hướng cho các đơn vị cần tạo màn sương mỏng, đồng đều để làm rõ tia sáng mà không che khuất sân khấu. Sản phẩm phù hợp để xây dựng hệ thống hiệu ứng có tính đồng bộ, dễ vận hành và thuận tiện khi kết hợp với ánh sáng, âm thanh cũng như kịch bản trình diễn. Với từ khóa chính máy Faze Antari ",
    "sale_enabled": true,
    "sale_price": 56721600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/may-khoi-antari-f-7x-s.png",
    "images": [
      {
        "id": "img-1062278655",
        "image_url": "/images/products/may-khoi-antari-f-7x-s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ea6b2b3c-cabc-5f02-8f11-181008f5333c",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói Antari M-10",
    "slug": "may-khoi-antari-m-10",
    "sku": "M10",
    "brand": "Antari",
    "description": "Máy tạo khói Antari M-10 – Giải pháp hiệu ứng chuyên nghiệp cho sân khấu và sự kiện Máy tạo khói Antari M-10 là giải pháp thuộc hệ sinh thái hiệu ứng sân khấu Antari, được định hướng cho các đơn vị cần tạo lớp khói dày để làm nổi bật chùm sáng và tăng chiều sâu không gian. Sản phẩm phù hợp để xây dựng hệ thống hiệu ứng có tính đồng bộ, dễ vận hành và thuận tiện khi kết hợp với ánh sáng, âm thanh cũng như kịch bản trình diễn. Với từ khóa chính máy tạo khói Antari M-10 , người dùng thường quan tâm",
    "sale_enabled": true,
    "sale_price": 26676000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/may-khoi-antari-m-10.png",
    "images": [
      {
        "id": "img-1062278191",
        "image_url": "/images/products/may-khoi-antari-m-10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4f6c6e1b-93de-56d8-b568-9b24ed6524ac",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "HEADPHONE HDJ-CUE1BT-R",
    "slug": "headphone-hdj-cue1bt-r",
    "sku": "HDJ-CUE1BTR",
    "brand": "Pioneer DJ",
    "description": "HEADPHONE HDJ-CUE1BT-R Tai nghe HDJ-CUE1BT là một sản phẩm tai nghe lý tưởng dành cho những người mới bắt đầu với bộ môn DJ. Sản phẩm sở hữu một thiết kế chuyên nghiệp, một chất âm sâu lắng cùng một chất lượng hoàn thiện cao – tất cả gói gọn trong một mức giá hợp lý. Tai nghe HDJ-CUE1BT là phiên bản có Bluetooth® để có thể thoải mái hơn trong việc sử dụng tai nghe. Tai nghe HDJ-CUE1BT s ử dụng chung driver với dòng sản phẩm tai nghe chuyên nghiệp HDJ-X5 , sản phẩm tai nghe HDJ-CUE1BT đã được tin",
    "sale_enabled": true,
    "sale_price": 3780000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/headphone-hdj-cue1bt-r.png",
    "images": [
      {
        "id": "img-1062048693",
        "image_url": "/images/products/headphone-hdj-cue1bt-r.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7d659d6e-7206-545d-826c-34035bf460c0",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE KHÔNG DÂY ALPHATHETA HDJ-F10",
    "slug": "tai-nghe-khong-day-alphatheta-hdj-f10",
    "sku": "HDJ-F10",
    "brand": "AlphaTheta",
    "description": "TAI NGHE KHÔNG DÂY HDJ-F10 Professional wireless DJ headphones Giới thiệu tai nghe DJ không dây chuyên nghiệp HDJ-F10, được thiết kế để mang lại những buổi biểu diễn liền mạch và không cần dây cáp nhờ các tính năng tiên tiến: Chơi nhạc cực thoải mái với kết nối không dây độ trễ cực thấp thông qua SonicLink Âm lượng lớn và cách âm tốt cho việc nghe nhạc chính xác trong mọi môi trường Âm bass mạnh mẽ và âm thanh đa dạng Độ bền phù hợp cho nhu cầu sử dụng chuyên nghiệp Kết nối Bluetooth và chế độ K",
    "sale_enabled": true,
    "sale_price": 11772000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/tai-nghe-khong-day-alphatheta-hdj-f10.png",
    "images": [
      {
        "id": "img-1062024670",
        "image_url": "/images/products/tai-nghe-khong-day-alphatheta-hdj-f10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d317c9a2-a590-5be0-be95-713e28546a92",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA KIỂM ÂM PIONEER DJ DM-40BT-W",
    "slug": "loa-kiem-am-pioneer-dj-dm-40bt-w",
    "sku": "DM-40BT-W",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-40BT-W ĐVT: CẶP Loa kiểm âm DM-40BT nhỏ gọn hứa hẹn mang lại một chất lượng âm thanh tuyệt vời cho setup tại nhà của bạn. Loa thừa kế những gì tuyệt vời nhất từ dòng S-DJX và Pro Audio chuyên nghiệp của hãng Pioneer DJ, bao gồm một âm bass trầm ấm và công nghệ DECO ( Diffusion Effectual Convexity ) bởi Olson. Tất cả các tính năng này được tích hợp trong một thiết kế nhỏ gọn. DM-40BT chính là sự lựa chọn hoàn hảo cho việc mix nhạc, producing và thậm chí là tận hưởng âm n",
    "sale_enabled": true,
    "sale_price": 7214400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 9,
    "is_active": true,
    "image_url": "/images/products/loa-kiem-am-pioneer-dj-dm-40bt-w.png",
    "images": [
      {
        "id": "img-1061897681",
        "image_url": "/images/products/loa-kiem-am-pioneer-dj-dm-40bt-w.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2dff0db8-d415-5e0b-9c8f-11f9dbcc29cd",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ AYU4",
    "slug": "ayu4",
    "sku": "AYU4",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ AYU4",
    "sale_enabled": true,
    "sale_price": 260000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ayu4.png",
    "images": [
      {
        "id": "img-1061894833",
        "image_url": "/images/products/ayu4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "11034f47-9aa3-5361-bc47-27f8ec425bcf",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ AYS4",
    "slug": "ays4",
    "sku": "AYS4",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ AYS4",
    "sale_enabled": true,
    "sale_price": 260000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ays4.png",
    "images": [
      {
        "id": "img-1061894595",
        "image_url": "/images/products/ays4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "190c78b0-b3e6-5d7b-b36b-2a5ea1c1bcb9",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ AUMF0150",
    "slug": "aumf0150",
    "sku": "AUMF0150",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ AUMF0150",
    "sale_enabled": true,
    "sale_price": 780000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/aumf0150.png",
    "images": [
      {
        "id": "img-1061894539",
        "image_url": "/images/products/aumf0150.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "92e75719-032d-57b5-88e9-4f87ca14c4b7",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ ASMJ0060",
    "slug": "asmj0060",
    "sku": "ASMJ0060",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ ASMJ0060",
    "sale_enabled": true,
    "sale_price": 280000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/asmj0060.png",
    "images": [
      {
        "id": "img-1061894476",
        "image_url": "/images/products/asmj0060.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8c0295ab-5c0e-530e-8fec-40f98941652a",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ ABJJ 0060",
    "slug": "abjj-0060",
    "sku": "ABJJ 0060",
    "brand": "KLOTZ",
    "description": "- Chiều dài dây: 0.6m - Jack: TRS (1/4\") stereo - TRS (1/4\") stereo * 2 sợi - Hãng sản xuất: KLOTZ - Xuất xứ: Đức - Model: ABJJ 0060",
    "sale_enabled": true,
    "sale_price": 384000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/abjj-0060.png",
    "images": [
      {
        "id": "img-1061894407",
        "image_url": "/images/products/abjj-0060.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d05243bc-680b-5011-ae93-907a12ac51a9",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CÀI ÁO KHÔNG DÂY SENNHEISER EW 112-G2",
    "slug": "ew-112-g2",
    "sku": "EW 112-G2",
    "brand": "SENNHEISER",
    "description": "Micro Không Dây Sennheiser Evolution EW 112 G2 - Giải Pháp Âm Thanh Chuyên Nghiệp Cho Thuyết Trình Và Biểu Diễn SẢN PHẨM NGƯNG SẢN XUẤT VÀ HIỆN ĐƯỢC THAY THẾ BỞI DÒNG SẢN PHẨM MICRO KHÔNG DÂY GÀI ÁO SENNHEISER EW-D ME2 MICRO GÀI ÁO KHÔNG DÂY SENNHEISER EW 112 G2 Tổng Quan Về Sản Phẩm EW 112 G2 Sennheiser Evolution EW 112 G2 là hệ thống micro không dây lý tưởng cho các ứng dụng thuyết trình, sân khấu, hội nghị và biểu diễn. Với thiết kế nhỏ gọn, hiệu suất âm thanh vượt trội và dễ dàng sử dụng, EW",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-112-g2.png",
    "images": [
      {
        "id": "img-1061890162",
        "image_url": "/images/products/ew-112-g2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c6980e71-0581-5e70-886e-103636a129f1",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ PHÁT KHÔNG DÂY SONIC LINK ALPHATHETA HP-TX01",
    "slug": "bo-phat-khong-day-sonic-link-alphatheta-hp-tx01",
    "sku": "HPTX01",
    "brand": "AlphaTheta",
    "description": "Bộ phát chuyên dụng cho phép kết nối SonicLink BỘ PHÁT KHÔNG DÂY SONIC LINK ALPHATHETA HP-TX01 Bộ phát HP-TX01 chuyên dụng ngay lập tức truyền âm thanh đến HDJ-F10 qua kết nối không dây độ trễ cực thấp chỉ bằng cách kết nối với mixer DJ. Bất kỳ mixer DJ nào được trang bị cổng PHONE hoặc giắc cắm stereo mini 3.5 mm đều có thể sử dụng với HDJ-F10. Nó nhỏ gọn, nhẹ và dễ dàng mang theo cùng với thiết bị của bạn. *HP-TX01 không hỗ trợ kết nối không dây với loa DJ không dây WAVE-EIGHT. THÔNG SỐ KỸ THU",
    "sale_enabled": true,
    "sale_price": 4276800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/bo-phat-khong-day-sonic-link-alphatheta-hp-tx01.png",
    "images": [
      {
        "id": "img-1058077023",
        "image_url": "/images/products/bo-phat-khong-day-sonic-link-alphatheta-hp-tx01.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3fe9e758-1a7b-5643-b8e2-e294feed04f9",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "Ăng-ten Định Hướng Sennheiser ADP-UHF",
    "slug": "ang-ten-dinh-huong-sennheiser-adp-uhf",
    "sku": "ADP_UHF",
    "brand": "SENNHEISER",
    "description": "Sennheiser ADP-UHF Ăng-ten Định Hướng Thụ Động Cho Hệ Thống Evolution Wireless Digital ADP UHF của Sennheiser là bộ phụ kiện tối ưu hóa dành cho các hệ thống micro không dây chuyên nghiệp, đặc biệt trong môi trường đòi hỏi tính linh hoạt và độ ổn định cao. Sản phẩm này hỗ trợ truyền tải tín hiệu UHF một cách rõ ràng, mạnh mẽ và ổn định, giúp duy trì chất lượng âm thanh tốt nhất ngay cả trong các khu vực có tín hiệu dày đặc. ADP UHF là giải pháp lý tưởng cho các sự kiện trực tiếp, nhà hát, hội ng",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ang-ten-dinh-huong-sennheiser-adp-uhf.png",
    "images": [
      {
        "id": "img-1057905533",
        "image_url": "/images/products/ang-ten-dinh-huong-sennheiser-adp-uhf.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c3cecbf1-c26b-56a5-8165-3fc929f22d5d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "NEXO P18",
    "slug": "nexo-p18",
    "sku": "P18",
    "brand": "NEXO",
    "description": "Loa NEXO P18: Đỉnh Cao Công Nghệ Âm Thanh Chuyên Nghiệp Loa NEXO P18 là minh chứng cho sự tinh tế và đẳng cấp mà thương hiệu NEXO mang đến trong lĩnh vực âm thanh chuyên nghiệp. Được chế tạo dành riêng cho các sự kiện lớn, sân khấu biểu diễn, và những dự án lắp đặt cố định đòi hỏi âm thanh mạnh mẽ, loa NEXO P18 hứa hẹn sẽ nâng tầm trải nghiệm âm thanh của bạn. Hãy cùng khám phá những điểm nổi bật về thiết kế, tính năng kỹ thuật và những ứng dụng phong phú của dòng sản phẩm loa NEXO P18 , qua đó ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/nexo-p18.png",
    "images": [
      {
        "id": "img-1057868793",
        "image_url": "/images/products/nexo-p18.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1f817e72-a074-52a0-bbf9-a5dfcc291cc0",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER ALPHATHETA DDJ-FLX2",
    "slug": "alphatheta-ddj-flx2",
    "sku": "DDJ-FLX2",
    "brand": "AlphaTheta",
    "description": "DDJ-FLX2 là controller DJ nhẹ nhất và nhỏ gọn nhất của chúng tôi. Thiết bị chạy bằng nguồn USB bus, nên không cần nguồn điện ngoài khi kết nối với PC/Mac hoặc thiết bị di động* qua USB Type-C. Bạn có thể dễ dàng bắt đầu DJ bằng cách phát nhạc qua loa tích hợp của PC/Mac/thiết bị di động. Hoặc, nếu kết nối loa vào cổng đầu ra âm thanh của DDJ-FLX2, bạn có thể tổ chức bữa tiệc sôi động với bạn bè. *Trừ một số thiết bị Android. DJ CONTROLLER ALPHATHETA DDJ-FLX2 Bạn có nghĩ DJing trông có vẻ khó khô",
    "sale_enabled": true,
    "sale_price": 6393600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/alphatheta-ddj-flx2.png",
    "images": [
      {
        "id": "img-1057852619",
        "image_url": "/images/products/alphatheta-ddj-flx2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d9d16d59-f521-528b-84db-fdf2b3b10aea",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "Controller DDJ-REV7",
    "slug": "controller-ddj-rev7",
    "sku": "DDJ_REV7",
    "brand": "Pioneer DJ",
    "description": "Pioneer DJ Controller DDJ-REV7 Thiết bị DDJ-REV7 được thiết kế để hỗ trợ bạn khai thác tối đa hiệu suất của phần mềm Serato DJ Pro và rekordbox, với thiết kế hoàn toàn mới bao gồm các jog wheel lớn, có động cơ cùng với màn hình On Jog Display , mang đến sự kết nối xúc giác giữa bạn và âm nhạc. Bố cục của thiết bị 2 kênh này mô phỏng một thiết lập chuyên nghiệp gồm mixer DJM-S và turntable PLX, đồng thời tích hợp các tính năng chuyên biệt dành cho DJ chơi nhạc open-format và kỹ thuật scratch. Các",
    "sale_enabled": true,
    "sale_price": 64692000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/controller-ddj-rev7.png",
    "images": [
      {
        "id": "img-1057753943",
        "image_url": "/images/products/controller-ddj-rev7.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "702a03a5-1c91-592d-9464-44ea180c7bcd",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CẦN MICRO CỔ NGỖNG SENNHEISER MZH 3062",
    "slug": "can-micro-co-ngong-sennheiser-mzh-3062",
    "sku": "MZH3062",
    "brand": "SENNHEISER",
    "description": "CẦN MICRO CỔ NGỖNG SENNHEISER MZH 3062 Cần micro MZH 3062 của Sennheiser là sản phẩm lý tưởng dành cho các không gian đòi hỏi sự chuyên nghiệp cao như phòng hội nghị, giảng đường, nhà thờ, hay các phòng thu phát thanh, truyền hình. Đây là phụ kiện hoàn hảo cho các viên micro dòng ME, với khả năng linh hoạt cao, độ bền bỉ vượt trội và chất lượng âm thanh tinh tế, mang lại những trải nghiệm âm thanh sống động và rõ nét cho người dùng. Thiết Kế Vượt Trội Với Cổ Ngỗng Kim Loại Sennheiser MZH 3062 đư",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/can-micro-co-ngong-sennheiser-mzh-3062.png",
    "images": [
      {
        "id": "img-1057639730",
        "image_url": "/images/products/can-micro-co-ngong-sennheiser-mzh-3062.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "637a7c81-5039-5f00-93c8-4ff1dba5933e",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói di động Antari MB-1",
    "slug": "may-khoi-antari-mb-1",
    "sku": "MB1",
    "brand": "Antari",
    "description": "Máy tạo khói di động Antari MB-1 – Giải pháp hiệu ứng chuyên nghiệp cho sân khấu và sự kiện Trong một hệ thống sân khấu chuyên nghiệp, hiệu ứng chỉ phát huy giá trị khi được lựa chọn đúng loại thiết bị và bố trí đúng vị trí. Máy tạo khói di động Antari MB-1 được phát triển cho nhu cầu tạo khói tại các vị trí khó kéo nguồn hoặc cần thay đổi điểm đặt nhanh, giúp đội kỹ thuật chủ động hơn khi thiết kế không gian và lập cue cho chương trình. Với từ khóa chính máy tạo khói di động Antari MB-1 , người",
    "sale_enabled": true,
    "sale_price": 16135200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/may-khoi-antari-mb-1.png",
    "images": [
      {
        "id": "img-1057427046",
        "image_url": "/images/products/may-khoi-antari-mb-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "99c8b7d2-7e4f-53cc-a851-ca70080250ee",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "Bàn DJ AlphaTheta XDJ-AZ",
    "slug": "ban-dj-alphatheta-xdj-az",
    "sku": "XDJ-AZ",
    "brand": "AlphaTheta",
    "description": "Cân nặng : 13.5 kg Kích thước ( Dài x Rộng x Cao) : 895 × 504.1 × 133.4 mm Đầu ra: Cổng Master × 2 (XLR × 1, RCA × 1) , Cổng BOOTH × 1 (1/4” TRS jack) , Cổng PHONES × 2 (1/4” stereo jack × 1, 3.5 mm stereo mini jack × 1) Đầu vào: Line/ PHONO (2 cổng RCA), MIC (2 cổng XLR & 1/4” TRS jack) Cổng USB: 2 cổng USB type A, Type C Số kênh : 4 kênh độc lập Nút hiệu ứng: 6 hiệu ứng Color FX 13 hiệu ứng Beat FX Trong hộp có gì : Dây nguồn Hướng dẫn sử dụng Cảnh báo khio sử dụng Bảo hành Đặc điểm nổi bật XD",
    "sale_enabled": true,
    "sale_price": 105150000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ban-dj-alphatheta-xdj-az.png",
    "images": [
      {
        "id": "img-1057422257",
        "image_url": "/images/products/ban-dj-alphatheta-xdj-az.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5c0bbf0f-77c5-5fa4-a877-c6d4c4452408",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER ALPHATHETA DDJ-GRV6",
    "slug": "may-dj-controller-alphatheta-ddj-grv6",
    "sku": "DDJ-GRV6",
    "brand": "AlphaTheta",
    "description": "MÁY DJ CONTROLLER ALPHATHETA DDJ-GRV6 FIND YOUR GROOVE Controller 4 kênh thế hệ mới đến từ AlphaTheta nổi bật với GROOVE CIRCUIT, cho phép thao tác phần Trống và tạo ra những giai điệu mà các controller khác không làm được. GROOVE CIRCUIT: thao tác tự do các phần Trống và tạo ra các bản remix, mashup live Bố cục theo kiểu CDJ + DJM (Jogwheel lớn, Beat FX từ DJM-A9) Nút xoay chọn bài thông minh hơn, giúp nhanh chóng tìm kiếm bản nhạc bạn muốn từ thư viện Tương thích với rekordbox & Serato DJ Pro ",
    "sale_enabled": true,
    "sale_price": 25596000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/may-dj-controller-alphatheta-ddj-grv6.png",
    "images": [
      {
        "id": "img-1057398024",
        "image_url": "/images/products/may-dj-controller-alphatheta-ddj-grv6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1978a8bd-8566-5c6e-a614-0c1611fd2eda",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE KHÔNG DÂY ALPHATHETA HDJ-F10TX (BAO GỒM BỘ PHÁT KHÔNG DÂY SONIC LINK)",
    "slug": "hdj-f10",
    "sku": "HDJ-F10TX",
    "brand": "AlphaTheta",
    "description": "TAI NGHE KHÔNG DÂY HDJ-F10TX Professional wireless DJ headphones Giới thiệu tai nghe DJ không dây chuyên nghiệp HDJ-F10, được thiết kế để mang lại những buổi biểu diễn liền mạch và không cần dây cáp nhờ các tính năng tiên tiến: Chơi nhạc cực thoải mái với kết nối không dây độ trễ cực thấp thông qua SonicLink Âm lượng lớn và cách âm tốt cho việc nghe nhạc chính xác trong mọi môi trường Âm bass mạnh mẽ và âm thanh đa dạng Độ bền phù hợp cho nhu cầu sử dụng chuyên nghiệp Kết nối Bluetooth và chế độ",
    "sale_enabled": true,
    "sale_price": 15692400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/hdj-f10.png",
    "images": [
      {
        "id": "img-1057195458",
        "image_url": "/images/products/hdj-f10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5d37226b-0c2b-5a82-aee7-923fcdbce83a",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ANTEN SENNHEISER SPECTERA ADA",
    "slug": "anten-sennheiser-spectera-ada",
    "sku": "ADA",
    "brand": "SENNHEISER",
    "description": "ANTEN SENNHEISER SPECTERA ADA The transceiving Spectera Digital Antenna Directional (DAD) manages IEM signals, mic/line signals and data simultaneously. It provides continuous interference management and remote control, and is equipped with a rugged RJ45 connector, IP54 protection and PoE. Variants include UHF (470–608 MHz and 630–698 MHz) or 1G4 (1350–1400 MHz and 1435–1525 MHz). Features Transceiving antenna manages IEM signals, mic/line signals, and data simultaneously Available variant: UHF ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/anten-sennheiser-spectera-ada.png",
    "images": [
      {
        "id": "img-1057069177",
        "image_url": "/images/products/anten-sennheiser-spectera-ada.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "84b9abb3-a100-533d-aa3c-8a81b016ba48",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ THU PHÁT TÍN HIỆU KHÔNG DÂY DI ĐỘNG SENNHEISER SPECTERA SEK",
    "slug": "bo-thu-phat-tin-hieu-khong-day-di-dong-spectera-sek",
    "sku": "SEK",
    "brand": "SENNHEISER",
    "description": "BỘ THU PHÁT TÍN HIỆU KHÔNG DÂY DI ĐỘNG SENNHEISER SPECTERA SEK Each bidirectional Spectera SEK body pack manages both an IEM/IFB and a mic/line stream simultaneously. Plus, they allow for full remote control and monitoring, via identical RF connection, of IEM volume, audio level and settings, RF health, battery status, and more via LinkDesk software. Variants include UHF (470–608 MHz and 630–698 MHz) or 1G4 (1350–1400 MHz and 1435–1525 MHz). Spectera SEK body packs feature an impedance matching ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/bo-thu-phat-tin-hieu-khong-day-di-dong-spectera-sek.png",
    "images": [
      {
        "id": "img-1057069023",
        "image_url": "/images/products/bo-thu-phat-tin-hieu-khong-day-di-dong-spectera-sek.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "788e4fd9-3baa-5d7d-bdbb-d2544a84d747",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ THU PHÁT TÍN HIỆU KHÔNG DÂY CỐ ĐỊNH SENNHEISER SPECTERA BASE STATION",
    "slug": "bo-thu-phat-tin-hieu-khong-day-co-dinh-spectera-base-station",
    "sku": "SPECBASE",
    "brand": "SENNHEISER",
    "description": "BỘ THU PHÁT TÍN HIỆU KHÔNG DÂY CỐ ĐỊNH SENNHEISER SPECTERA BASE STATION The Spectera Base Station is a 1RU hardware device that provides up to 64 channels (32 in/32 out) and utilizes up to two wideband RF carriers to accommodate all of the unit’s wireless transmission. It features redundant Dante and optional redundant Madi, assuring seamless integration into your audio network. Additional antennas can be added for redundancy, extended zone coverage, or additional spectrum capacity. The Spectera",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/bo-thu-phat-tin-hieu-khong-day-co-dinh-spectera-base-station.png",
    "images": [
      {
        "id": "img-1057068880",
        "image_url": "/images/products/bo-thu-phat-tin-hieu-khong-day-co-dinh-spectera-base-station.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "75b81314-91b2-57d8-88c4-085af8b1957f",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EW-DP EK",
    "slug": "bo-thu-tin-hieu-khong-day-ew-dp-ek",
    "sku": "EWDPEK",
    "brand": "SENNHEISER",
    "description": "BỘ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EW-DP EK Portable digital UHF receiver for use with EW-D SK bodypack, EW-D SKM-S handheld, or EW-DP SKP plug-on transmitters. Go Beyond Content If you want to stand apart from the content creation crowd, quality is key. Especially for filmmakers. Because anyone can create content, but not everyone can create art. Many of the wireless audio products for solo and freelance filmmakers operate in the crowded 2.4 GHz band, making them unreliable and prone to dropo",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/bo-thu-tin-hieu-khong-day-ew-dp-ek.png",
    "images": [
      {
        "id": "img-1057023040",
        "image_url": "/images/products/bo-thu-tin-hieu-khong-day-ew-dp-ek.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d9a92421-c8d9-59e1-8457-c2d20dfa30f1",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW-DP ENG SET",
    "slug": "micro-khong-day-ew-dp-eng-set",
    "sku": "EWDPENG",
    "brand": "SENNHEISER",
    "description": "MICRO KHÔNG DÂY SENNHEISER EW-DP ENG SET Ideal for interviews and outside broadcast set-ups. It includes EW-DP EK digital single-channel receiver, EW-D SK digital bodypack transmitter, ME 2 omnidirectional lavalier, SKP plug-on transmitter, mounting components (including cheese plate and cold shoe), rechargeable battery, and accessories Using the stable and reliable UHF connection, the EW-DP digital wireless microphone system gives filmmakers professional quality audio without the complexity. It",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-ew-dp-eng-set.png",
    "images": [
      {
        "id": "img-1057021980",
        "image_url": "/images/products/micro-khong-day-ew-dp-eng-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "974150d7-a2e3-5606-a8e4-3dfc6ef6a89f",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW-DP ME 4 SET",
    "slug": "micro-khong-day-ew-dp-me-4-set",
    "sku": "EWDPME4",
    "brand": "SENNHEISER",
    "description": "MICRO KHÔNG DÂY SENNHEISER EW-DP ME 4 SET Great for educational settings, conferences and live presentations. It includes EW-DP EK digital portable single-channel receiver, EW-D SK digital bodypack transmitter, ME 4 cardioid lavalier, mounting components (including cheese plate and cold shoe), rechargeable battery, and accessories Using the stable and reliable UHF connection, the EW-DP digital wireless microphone system gives filmmakers professional quality audio without the complexity. It’s the",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-ew-dp-me-4-set.png",
    "images": [
      {
        "id": "img-1057021267",
        "image_url": "/images/products/micro-khong-day-ew-dp-me-4-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f6250612-fbb7-55ef-8e5d-a7f109b13069",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW-DP ME 2 SET",
    "slug": "micro-khong-day-ew-dp-me-2-set",
    "sku": "EWDPME2",
    "brand": "SENNHEISER",
    "description": "MICRO KHÔNG DÂY SENNHEISER EW-DP ME 2 SET Perfect for interviews, documentaries and broadcast settings. It includes EW-DP EK digital portable single-channel receiver, EW-D SK digital bodypack transmitter, ME 2 omnidirectional lavalier, mounting kit (including cheese plate and cold shoe), rechargeable battery, and accessories Using the stable and reliable UHF connection, the EW-DP digital wireless microphone system gives filmmakers professional quality audio without the complexity. It’s the perfe",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-ew-dp-me-2-set.png",
    "images": [
      {
        "id": "img-1056957244",
        "image_url": "/images/products/micro-khong-day-ew-dp-me-2-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6ae3c01a-aa78-504f-a529-6df16ddd7abc",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW-DP 835 SET",
    "slug": "micro-khong-day-ew-dp-835-set",
    "sku": "EWDP835",
    "brand": "SENNHEISER",
    "description": "MICRO KHÔNG DÂY SENNHEISER EW-DP 835 SET Designed for live performances and presentations. It includes EW-DP EK digital single-channel receiver, SKM-S handheld transmitter, mounting components (including cheese plate and cold shoe), rechargeable battery, and accessories Using the stable and reliable UHF connection, the EW-DP digital wireless microphone system gives filmmakers professional quality audio without the complexity. It’s the perfect choice for those looking to upgrade to a portable wir",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-ew-dp-835-set.png",
    "images": [
      {
        "id": "img-1056955118",
        "image_url": "/images/products/micro-khong-day-ew-dp-835-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2f16ec58-9b2b-5d0d-83d5-53d7fd1a9f83",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO SNII-15LF",
    "slug": "loa-roi-p-audio-snii-15lf",
    "sku": "SNII-15LF",
    "brand": "P.AUDIO",
    "description": "SNII-15LF tái tạo âm thanh trong dải từ 55 - 1500Hz, rất phù hợp cho việc tái tạo âm bass và giọng hát trong các hệ thống âm thanh chuyên nghiệp hai chiều. Vật liệu của loa đã được tối ưu hóa để bền bỉ hơn và hiệu suất âm thanh vượt trội hơn trong dải tần giọng hát. ĐVT: CẶP LOA RỜI P.AUDIO SNII-15LF Dòng sản phẩm SN Series II của P Audio sử dụng nam châm Neodymium có hiệu suất và giá trị cao. Loa rời 4 tấc mã SNII-15LF là một ví dụ cho thiết kế hiệu suất cao của P Audio. Loa này có khung đường ",
    "sale_enabled": true,
    "sale_price": 11664000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-snii-15lf.jpg",
    "images": [
      {
        "id": "img-1056100069",
        "image_url": "/images/products/loa-roi-p-audio-snii-15lf.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a26a0195-bd0a-5e37-b9ab-39f94cb3ae3d",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "ĂNG-TEN SENNHEISER AB 4",
    "slug": "ab-4",
    "sku": "AB4",
    "brand": "SENNHEISER",
    "description": "SENNHEISER AB 4 SẢN PHẨM NGỪNG KINH DOANH VÀ ĐƯỢC THAY THẾ BẰNG SẢN PHẨM EW-D AB SẢN PHẨM NGỪNG KINH DOANH VÀ ĐƯỢC THAY THẾ BẰNG SẢN PHẨM EW-D AB Dải tần số AB 4-Aw+ : 470 - 558 MHz AB 4-Gw : 558 - 626 MHz (includes Gw1: 558 - 608 MHz) AB 4-GBw : 606 - 678 MHz AB 4-Bw : 626 - 698 MHz AB 4-Cw : 718 - 790 MHz AB 4-Dw : 790 - 865 MHz Độ lợi - Gain 12 dB Nguồn đầu vào 12 V DC (10 - 18 V DC) / tối đa 65 mA@12V cấp nguồn qua cáp ăng-ten (tối đa 180 mA); tiếp điểm trung tâm + IIP3 > 25 dBm Công suất đầ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ab-4.png",
    "images": [
      {
        "id": "img-1056000581",
        "image_url": "/images/products/ab-4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7378a64e-cde5-5897-bb4f-4ad262872019",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER EUPHONIA",
    "slug": "euphonia",
    "sku": "EUPHONIA",
    "brand": "AlphaTheta",
    "description": "MIXER EUPHONIA Mixer EUPHONIA là một sản phẩm đột phá của AlphaTheta, được thiết kế đặc biệt cho các DJ chuyên nghiệp và những người yêu thích âm nhạc muốn có trải nghiệm mix mượt mà và tự nhiên. Với sự kết hợp hoàn hảo giữa chất lượng âm thanh kỹ thuật số rõ ràng và độ tinh tế của âm thanh analog, EUPHONIA mang đến một trải nghiệm âm thanh độc đáo chưa từng có. Âm thanh tuyệt vời với độ rõ nét kỹ thuật số và sự phong phú của analog từ bộ biến áp Rupert Neve Designs Mixer EUPHONIA tạo ra âm than",
    "sale_enabled": true,
    "sale_price": 117612000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/euphonia.png",
    "images": [
      {
        "id": "img-1055504791",
        "image_url": "/images/products/euphonia.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "80a5ff6a-b6c5-59e4-aab2-64c0f118b137",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA DI ĐỘNG KHÔNG DÂY ALPHATHETA WAVE-EIGHT",
    "slug": "wave-eight",
    "sku": "VB-1054262942",
    "brand": "AlphaTheta",
    "description": "Bất cứ khi nào, bất cứ nơi đâu. Loa DJ không dây WAVE-EIGHT kết hợp công nghệ không dây SonicLink cải tiến với âm thanh mạnh mẽ, thiết kế chống nước IPX4 và pin 8 giờ để mang lại trải nghiệm độc đáo cho bữa tiệc của bạn. Công nghệ không dây có độ trễ siêu thấp SonicLink để chơi DJ không cần dây kết nối. Chất lượng âm thanh chuyên nghiệp với amply Class D và Vortex Bass Accelerator. Tùy chọn thiết lập đa năng với các chế độ dễ sử dụng bao gồm Mono, Stereo và Subwoofer. Thiết kế lưu động có tích h",
    "sale_enabled": true,
    "sale_price": 26881200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wave-eight.png",
    "images": [
      {
        "id": "img-1054262942",
        "image_url": "/images/products/wave-eight.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "099e1ebf-fff0-5fe5-acff-0882a6351c8e",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "Bàn DJ ALPHATHETA OMNIS DUO",
    "slug": "ban-dj-alpha-theta-omnis-duo",
    "sku": "OMNISDUO",
    "brand": "AlphaTheta",
    "description": "Cân nặng: 4.6 kg Kích thước ( Dài x Cao x Rộng) : 498 × 57 × 306 mm Pin : Pin sạc Lithium tích hợp sẵn - thời gian sử dụng lên đến 5 giờ Đầu vào : 2 cổng cho micro, 1 cổng dành cho Bluetooth Đầu ra: đa dạng với 1 XLR, 1 RCA, 1 Bluetooth, 1 đầu ra cho tai nghe Cổng USB: Có cổng USB và cổng USB dành cho điện thoại và máy tính Màu : Indigo Màn hình: 7.1' inch cảm ứng Số kênh : Bàn DJ 2 kênh độc lập không cần máy tính Nút hiệu ứng : 6 nút sound colour FX 8 nút hot cues / kênh Nút Beat Jump Xem nhanh",
    "sale_enabled": true,
    "sale_price": 45252000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ban-dj-alpha-theta-omnis-duo.png",
    "images": [
      {
        "id": "img-1052862579",
        "image_url": "/images/products/ban-dj-alpha-theta-omnis-duo.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d51c211c-4354-53b0-9c1f-1bfc4cdbad1a",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE SENNHEISER HD 490 PRO",
    "slug": "hd-490-pro",
    "sku": "HD-490-PRO",
    "brand": "SENNHEISER",
    "description": "TAI NGHE SENNHEISER HD 490 PRO Trải nghiệm sự kết hợp hoàn hảo giữa sự rõ ràng, sự thoải mái và độ tin cậy. Tai nghe c huyên nghiệp HD 490 PRO được chế tạo để xử lý mọi sự phức tạp của quá trình sản xuất âm nhạc ngày nay. Với thiết kế mở phía sau mang lại sân khấu âm thanh đa chiều, cực kỳ rộng và khả năng tái tạo âm thanh cực kỳ chính xác, tai nghe phòng thu HD 490 PRO mang đến cho bạn sự rõ ràng mà bạn cần để nghe quan trọng, để bạn có thể tự tin đưa ra các quyết định phối âm quan trọng. Được ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hd-490-pro.png",
    "images": [
      {
        "id": "img-1052837504",
        "image_url": "/images/products/hd-490-pro.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f38e71b4-7219-5726-98ec-52b535b032a6",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "Effect guitar 2100",
    "slug": "effect-guitar-2100",
    "sku": "EFFECT2100",
    "brand": "ZOOM",
    "description": "EFFECT GUITAR 2100 Zoom 2100 là pedal hiệu ứng guitar đa năng với hơn 100 hiệu ứng khác nhau, bao gồm overdrive, distortion, delay, reverb, chorus, flanger, phaser,... Sản phẩm phù hợp với mọi thể loại nhạc, từ rock, metal, blues, jazz đến acoustic. Zoom 2100 là pedal hiệu ứng guitar đa năng được sản xuất bởi thương hiệu Zoom của Nhật Bản. Sản phẩm được trang bị hơn 100 hiệu ứng khác nhau, bao gồm: * Overdrive: Tạo âm thanh overdrive/distortion cổ điển, phù hợp với các thể loại rock, metal. * Di",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/effect-guitar-2100.png",
    "images": [
      {
        "id": "img-1051354005",
        "image_url": "/images/products/effect-guitar-2100.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0074c7d0-d8df-5df3-a0df-3621f2673273",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "Hyper Lead HL-01",
    "slug": "hyper-lead-hl-01",
    "sku": "HL01",
    "brand": "ZOOM",
    "description": "HL-01 Hyper Lead Zoom HL-01 Hyper Lead là một pedal distortion analog versatile và mạnh mẽ, được phát triển với sự tham gia của các nhạc sĩ chuyên nghiệp hàng đầu trên toàn thế giới. Nó phản ánh chuyên môn dày dặn của Zoom về mạch analog và có nhiều tính năng hấp dẫn. Các tính năng nổi bật: Mạch distortion analog triple gain mới được phát triển, lý tưởng cho nhiều phong cách chơi và ứng dụng khác nhau, từ lead guitar đến backing. Distortion tự nhiên và mượt mà ở dải trung âm tạo ra âm thanh guit",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hyper-lead-hl-01.png",
    "images": [
      {
        "id": "img-1051353346",
        "image_url": "/images/products/hyper-lead-hl-01.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3a27fcac-ad8a-5181-afb5-abd7add29952",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "Mixer DJ Behringer NOX303",
    "slug": "nox303",
    "sku": "NOX303",
    "brand": "BEHRINGER",
    "description": "Mixer DJ Behringer NOX303 Mixer DJ Behringer NOX303 là thiết bị trộn âm chuyên nghiệp dành cho DJ, được trang bị đầy đủ các tính năng cần thiết để tạo ra những bản mix tuyệt vời. Với 3 kênh đầu vào, 12 hiệu ứng kỹ thuật số có thể đồng bộ theo nhịp, và kết nối USB, NOX303 là lựa chọn lý tưởng cho các DJ ở mọi cấp độ. Mixer DJ Behringer NOX303 là sản phẩm thuộc dòng mixer DJ NOX của Behringer. Dòng mixer này được thiết kế để đáp ứng nhu cầu của các DJ ở mọi cấp độ, từ người mới bắt đầu đến chuyên ",
    "sale_enabled": true,
    "sale_price": 6825600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/nox303.png",
    "images": [
      {
        "id": "img-1051320470",
        "image_url": "/images/products/nox303.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b721beb7-1683-597e-bd12-3f8f63fa7a2f",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "Mixer DJ Behringer DDM4000",
    "slug": "ddm4000",
    "sku": "DDM4000",
    "brand": "BEHRINGER",
    "description": "Mixer DJ Behringer DDM4000 Behringer DDM4000 là bộ trộn DJ kỹ thuật số 5 kênh, 32 bit hiện đại, mang đến cho bạn mọi thứ bạn cần để tạo ra những bản mix tuyệt vời. Mixer này được trang bị các tính năng cao cấp như bộ lấy mẫu nhịp được đồng bộ hóa, 4 phần đa FX, 2 bộ đếm BPM, một Ultracurve Crossfader kỹ thuật số và bộ điều khiển MIDI. Behringer DDM4000 là bộ trộn DJ kỹ thuật số 5 kênh, 32 bit được thiết kế cho các DJ chuyên nghiệp. Bộ trộn này được trang bị các tính năng cao cấp như: Bộ lấy mẫu ",
    "sale_enabled": true,
    "sale_price": 11715840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddm4000.png",
    "images": [
      {
        "id": "img-1051319270",
        "image_url": "/images/products/ddm4000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4acd516b-56fe-5796-8d67-9b9b51a2f764",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Đầu Microphone Sennheiser MME 865-1 BK",
    "slug": "dau-microphone-sennheiser-mme-865-1-bk",
    "sku": "MME865-1BK",
    "brand": "SENNHEISER",
    "description": "Đầu Micro Sennheiser MME 865-1 BK Đầu Micro Condenser Cao Cấp Cho Âm Thanh Chi Tiết Và Trung Thực Sennheiser MME 865-1 BK là đầu micro condenser chất lượng cao, được thiết kế đặc biệt để tái tạo âm thanh rõ ràng, chi tiết cho giọng hát và phát biểu trong các buổi biểu diễn trực tiếp và sự kiện chuyên nghiệp. Với hướng thu supercardioid, MME 865-1 BK giúp loại bỏ các âm thanh không mong muốn từ bên ngoài, tập trung vào nguồn âm chính, giúp giọng hát hoặc phát biểu nổi bật trong bất kỳ không gian ",
    "sale_enabled": true,
    "sale_price": 6720000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dau-microphone-sennheiser-mme-865-1-bk.png",
    "images": [
      {
        "id": "img-1050839217",
        "image_url": "/images/products/dau-microphone-sennheiser-mme-865-1-bk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b7d1d924-d56e-51ec-93e8-a8f04e9f9858",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Đầu Microphone Sennheiser MMD 935-1BK",
    "slug": "dau-microphone-sennheiser-mmd-935-1bk",
    "sku": "MMD935-1BK",
    "brand": "SENNHEISER",
    "description": "Đầu Micro Sennheiser MMD 935-1BK Đầu Micro Dynamic Chuyên Nghiệp Cho Âm Thanh Rõ Ràng, Sắc Nét Sennheiser MMD 935-1BK là đầu micro dynamic chất lượng cao, được thiết kế tối ưu để tái tạo giọng hát trung thực và mạnh mẽ trong các buổi biểu diễn trực tiếp, sân khấu, hội thảo, và các sự kiện chuyên nghiệp. Với hướng thu cardioid, MMD 935-1BK loại bỏ các tạp âm ngoài vùng thu, tập trung vào âm thanh chính phía trước, giúp giọng hát trở nên nổi bật và rõ ràng trong bất kỳ không gian nào. Đặc Điểm Nổi",
    "sale_enabled": true,
    "sale_price": 5590000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dau-microphone-sennheiser-mmd-935-1bk.png",
    "images": [
      {
        "id": "img-1050839164",
        "image_url": "/images/products/dau-microphone-sennheiser-mmd-935-1bk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "56f1ede1-5f2c-5f41-ac8f-ade64dee4977",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Đầu Microphone Sennheiser MMK 965-1BK",
    "slug": "dau-microphone-sennheiser-mmk-965-1bk",
    "sku": "MMK965-1BK",
    "brand": "SENNHEISER",
    "description": "Đầu Micro Sennheiser MMK 965-1BK Đầu Micro Condenser Chuyên Nghiệp Cho Hiệu Suất Âm Thanh Tối Ưu Đầu micro Sennheiser MMK 965-1BK là sản phẩm cao cấp thuộc dòng đầu micro condenser chuyên nghiệp, được thiết kế đặc biệt để đáp ứng nhu cầu âm thanh cao cấp trong các không gian biểu diễn trực tiếp, sân khấu và phòng thu chuyên nghiệp. Với tính năng chuyển đổi giữa hai hướng thu đa năng cardioid và supercardioid, MMK 965-1BK mang đến khả năng thu âm linh hoạt và tối ưu hóa chất lượng âm thanh, giúp ",
    "sale_enabled": true,
    "sale_price": 16750000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dau-microphone-sennheiser-mmk-965-1bk.png",
    "images": [
      {
        "id": "img-1050838993",
        "image_url": "/images/products/dau-microphone-sennheiser-mmk-965-1bk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9a00bade-2371-54d2-b2c8-a28037a5c572",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Đầu Microphone Sennheiser MMD 945-1BK",
    "slug": "dau-microphone-sennheiser-mmd-945-1bk",
    "sku": "MMD945-1BK",
    "brand": "SENNHEISER",
    "description": "Đầu Micro Sennheiser MMD 945-1BK Đầu Micro Dynamic Chuyên Nghiệp Cho Hiệu Suất Biểu Diễn Tối Ưu Sennheiser MMD 945-1BK là đầu micro dynamic cao cấp được thiết kế để tối ưu hóa âm thanh cho các buổi biểu diễn trực tiếp và các sự kiện chuyên nghiệp. Được trang bị hướng thu supercardioid, MMD 945-1BK giúp lọc tạp âm từ hai bên và phía sau, tập trung vào giọng hát với chất lượng âm thanh rõ ràng và mạnh mẽ. Đây là lựa chọn hoàn hảo cho các nghệ sĩ và người dẫn chương trình cần âm thanh trung thực và",
    "sale_enabled": true,
    "sale_price": 5130000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dau-microphone-sennheiser-mmd-945-1bk.png",
    "images": [
      {
        "id": "img-1050838965",
        "image_url": "/images/products/dau-microphone-sennheiser-mmd-945-1bk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9437f2dd-7abc-589d-9d34-7612e25a8328",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "Micro Không Dây PHONIC PR-900",
    "slug": "pr-901",
    "sku": "PR900",
    "brand": "PHONIC",
    "description": "Micro Không Dây PHONIC PR-900 Hệ thống micrô không dây kênh đôi Phonic PR-900 mới là đỉnh cao của nhiều năm kinh nghiệm trong cả công nghệ có dây và không dây. Hãy giảm bớt cơn đau đầu khi thiết lập trực tiếp của bạn bằng cách kết hợp một trong những hệ thống micrô không dây cực kỳ đơn giản này. Mỗi hệ thống đều cung cấp các công tắc mức cho phép tạo đường viền tín hiệu đầu ra tới các thiết bị bên ngoài, cho dù chúng là bảng điều khiển trộn chuyên nghiệp hay sản phẩm ghi âm cấp tiêu dùng. Sử dụn",
    "sale_enabled": true,
    "sale_price": 7257600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pr-901.png",
    "images": [
      {
        "id": "img-1050635455",
        "image_url": "/images/products/pr-901.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "151b8bc9-44e4-5bf8-b0e2-78416d112437",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "DE780TN – Củ loa treble B&C Speakers",
    "slug": "loa-treble-bc-speakers-de780tn",
    "sku": "DE780TN",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS DE780TN – CỦ TREBLE HỌNG 1.4 INCH EXIT B&C Speakers DE780TN là compression driver phiên bản 8 Ω với đầu ra 1.4 inch exit, công suất danh định 110 W , công suất chương trình liên tục 220 W và độ nhạy 108 dB . Model sử dụng voice coil Nhôm 75 mm (3 in) cùng màng rung Titanium, phù hợp cho loa PA và hệ thống âm thanh chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C DE780TN Công suất chương trình liên tục 220 W Đường kính họng kèn 1.4\" Voice coil Nhôm 75 mm (3 in) Màng rung Titanium Dải tần đáp ứng ",
    "sale_enabled": true,
    "sale_price": 9612000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/loa-treble-bc-speakers-de780tn.jpg",
    "images": [
      {
        "id": "img-1050239247",
        "image_url": "/images/products/loa-treble-bc-speakers-de780tn.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8d954e3e-038d-5083-a93a-cbb2d378cea3",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18DS100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-roi-bc-speakers-18ds100",
    "sku": "18DS100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18DS100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18DS100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1500 W , công suất chương trình liên tục 3000 W , độ nhạy 97.5 dB và dải tần 34 Hz - 1000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18DS100 Công suất chương trình liên tục 3000 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 34 - 1000 Hz Độ nhạy 97.5 dB Dây dẫn được tối ưu cho hành trình lớn và dệt xuyê",
    "sale_enabled": true,
    "sale_price": 17258400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-18ds100.jpg",
    "images": [
      {
        "id": "img-1050239134",
        "image_url": "/images/products/loa-roi-bc-speakers-18ds100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0ed77f05-1da0-5ad9-8bd3-6fbbf611c403",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "12NDL88 – Loa bass rời B&C Speakers 3 tấc 12 inch",
    "slug": "loa-roi-bc-speakers-12ndl88",
    "sku": "12NDL88",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 12NDL88 – CỦ LOA WOOFER 12 INCH B&C Speakers 12NDL88 là củ loa woofer 12 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 98 dB và dải tần 50 Hz - 3000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 12NDL88 Công suất chương trình liên tục 1400 W Voice coil Nhôm 88 mm (3.5 in) Dải tần đáp ứng 50 - 3000 Hz Độ nhạy 98 dB Vòng khử từ bằng nhôm giúp giảm méo tín hiệu Nhện loa đôi xử",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 8,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-12ndl88.jpg",
    "images": [
      {
        "id": "img-1050238957",
        "image_url": "/images/products/loa-roi-bc-speakers-12ndl88.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2ce2be4b-6937-5518-8810-35a299f1409f",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG SABIAN B8 Rock Set W/Case 45009C",
    "slug": "b8-rock-set-w-case-45009c",
    "sku": "45009C",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG SABIAN B8 Rock Set W/Case 45009C",
    "sale_enabled": true,
    "sale_price": 10309680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/b8-rock-set-w-case-45009c.png",
    "images": [
      {
        "id": "img-1050086950",
        "image_url": "/images/products/b8-rock-set-w-case-45009c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e340ec88-0031-5bd2-b1d9-92005164c4fc",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG SABIAN B8 Perf Set Plus 45003XG",
    "slug": "b8-perf-set-plus-45003xg",
    "sku": "45003XG",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG SABIAN B8 Perf Set Plus 45003XG",
    "sale_enabled": true,
    "sale_price": 10829160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/b8-perf-set-plus-45003xg.jpg",
    "images": [
      {
        "id": "img-1050086745",
        "image_url": "/images/products/b8-perf-set-plus-45003xg.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3e73f97b-5172-5aba-8358-1dbc6c08c9e2",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG SABIAN B8 Pro Perf Set 35003B-18",
    "slug": "b8-pro-perf-set-35003b",
    "sku": "35003B-18",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG SABIAN B8 Pro Perf Set 35003B-18",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/b8-pro-perf-set-35003b.jpeg",
    "images": [
      {
        "id": "img-1050086616",
        "image_url": "/images/products/b8-pro-perf-set-35003b.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e32180f0-d949-5c1a-9116-1cc51eaeb6e2",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "RACK MIXER DIGITAL MARANI M16",
    "slug": "m16",
    "sku": "M16_MARANI",
    "brand": "MARANI",
    "description": "RACK MIXER DIGITAL MARANI M16 RACK MIXER DIGITAL M16 là sản phẩm rack mixer kỹ thuật số cao cấp của hãng Marani, được thiết kế dành cho các ứng dụng âm thanh chuyên nghiệp như thu âm, biểu diễn live, hay phát thanh truyền hình. M16 sở hữu nhiều tính năng ưu việt như: 16 kênh đầu vào linh hoạt, hỗ trợ nhiều loại nguồn âm thanh khác nhau Bộ xử lý DSP mạnh mẽ, cung cấp nhiều hiệu ứng âm thanh và công cụ xử lý tín hiệu Chức năng ghi âm và phát lại USB Giao diện người dùng trực quan, dễ sử dụng Thiết",
    "sale_enabled": true,
    "sale_price": 17776800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/m16.png",
    "images": [
      {
        "id": "img-1050075869",
        "image_url": "/images/products/m16.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "242b0d43-78e1-5f08-b9fb-9bcdec5187fc",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU MARANI MIR260A",
    "slug": "bo-xu-ly-tin-hieu-marani-mir260",
    "sku": "MIR260A",
    "brand": "MARANI",
    "description": "Marani MIR260A – Bộ xử lý tín hiệu số 2 In 6 Out chuyên nghiệp Marani MIR260A là bộ xử lý tín hiệu âm thanh kỹ thuật số chuyên nghiệp thuộc dòng MIR-A Series của Marani Pro Audio , được thiết kế với cấu hình 2 ngõ vào analog và 6 ngõ ra analog . Thiết bị kết hợp nền tảng DSP mạnh mẽ, bộ chuyển đổi A/D và D/A hoạt động ở tần số lấy mẫu 96 kHz , cùng hệ thống xử lý tín hiệu toàn diện nhằm đáp ứng nhiều yêu cầu của hệ thống âm thanh chuyên nghiệp. Với noise floor thấp, dynamic range cao và khả năng",
    "sale_enabled": true,
    "sale_price": 18381600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/bo-xu-ly-tin-hieu-marani-mir260.png",
    "images": [
      {
        "id": "img-1050075764",
        "image_url": "/images/products/bo-xu-ly-tin-hieu-marani-mir260.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "283a3ae5-f0d9-54a6-90ea-35586c78bb7b",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU MARANI MIR260E",
    "slug": "mir-260-e",
    "sku": "MIR260E",
    "brand": "MARANI",
    "description": "MARANI MIR 260 E MIR-E series is a more cost-effective Audio processor newly created by MARANI Pro Audio for market demand.It has the basic performance comparable to MIR-A series, excellent background noise as low as -91dBu, combined with high dynamic range and powerful internal DSP calculation.So that it can cover a wider range of audio usage scenarios. The series comes in four models:MIR260E(2 in 6 out)、MIR360E(3 in 6 out)、MIR440E(4 in 4 out)、MIR480E(4 in 8 out0.) In addition to conventional a",
    "sale_enabled": true,
    "sale_price": 13240800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/mir-260-e.png",
    "images": [
      {
        "id": "img-1050075358",
        "image_url": "/images/products/mir-260-e.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "219bc578-19b0-5b35-ab6a-c2e1e94e9334",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-800",
    "slug": "ddj-1001",
    "sku": "DDJ800",
    "brand": "Pioneer DJ",
    "description": "Với DDJ-800, bạn có thể trình diễn đến bất cứ đâu. Controller DJ 2 kênh, nhỏ gọn mới, để sử dụng chuyên dụng với ứng dụng hiệu suất chuyên nghiệp của Pioneer - Rekordbox DJ. Thiết kế mới giúp bạn tận dụng tối đa các tính năng mới tương thích với phiên bản Rekordbox ver 5.5.0. Kế thừa thiết kế bố trí từ sản phẩm DDJ-1000, vốn nổi tiếng với các DJ chuyên nghiệp biểu diễn tại những sự kiện bên ngoài môi trường Clubs. Thân máy nhỏ gọn, nhẹ, di động hơn. - Thiết kế trên DDJ-800 di động và nhỏ hơn DDJ",
    "sale_enabled": true,
    "sale_price": 24544000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ddj-1001.png",
    "images": [
      {
        "id": "img-1049863704",
        "image_url": "/images/products/ddj-1001.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8491c274-c049-5480-a524-082921ef49a4",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói Antari Z-800III",
    "slug": "z-800iii",
    "sku": "Z-800III",
    "brand": "Antari",
    "description": "Máy tạo khói Antari Z-800III – Thiết kế nhỏ gọn, làm nóng nhanh cho sân khấu và sự kiện Máy tạo khói Antari Z-800III là model Fog Machine nhỏ gọn thuộc Z Series của Antari , được thiết kế để tạo hiệu ứng khói cho sân khấu, sự kiện, biểu diễn và nhiều ứng dụng giải trí chuyên nghiệp. Với công suất 800 W , thời gian làm nóng khoảng 2 phút , bình chứa dung dịch 0,8 lít và mức tiêu thụ khoảng 13 ml/phút ở mức đầu ra 100% , Z-800III mang đến một giải pháp tạo khói gọn nhẹ, dễ triển khai cho những chư",
    "sale_enabled": true,
    "sale_price": 5194800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/z-800iii.png",
    "images": [
      {
        "id": "img-1049798675",
        "image_url": "/images/products/z-800iii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "17bfee61-8d5d-522a-9900-77441bb9c138",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "8NDL51 – Loa bass rời B&C Speakers 2 tấc 8 inch",
    "slug": "loa-roi-bc-speakers-8ndl51",
    "sku": "8NDL51",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 8NDL51 – CỦ LOA WOOFER 8 INCH B&C Speakers 8NDL51 là củ loa woofer 8 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 200 W , công suất chương trình liên tục 400 W , độ nhạy 94 dB và dải tần 65 Hz - 3000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 8NDL51 Voice coil Đồng 51 mm (2 in) Dải tần đáp ứng 65 - 3000 Hz Độ nhạy 94 dB Nam châm Neodymium giúp cụm từ nhẹ nhưng vẫn tạo lực mạnh Chụp đồng giảm cảm kháng, hỗ trợ mở rộng dải cao ",
    "sale_enabled": true,
    "sale_price": 5389200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-8ndl51.jpg",
    "images": [
      {
        "id": "img-1049293698",
        "image_url": "/images/products/loa-roi-bc-speakers-8ndl51.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9f226d11-dba6-5cca-96fa-e65d8a840a50",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "10NDL64 – Loa bass rời B&C Speakers 2 tấc rưỡi 10 inch",
    "slug": "loa-roi-bc-speakers-10ndl64",
    "sku": "10NDL64",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 10NDL64 – CỦ LOA WOOFER 10 INCH B&C Speakers 10NDL64 là củ loa woofer 10 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 250 W , công suất chương trình liên tục 500 W , độ nhạy 97 dB và dải tần 50 Hz - 3000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 10NDL64 Công suất chương trình liên tục 500 W Voice coil Nhôm 64 mm (2.5 in) Dải tần đáp ứng 50 - 3000 Hz Độ nhạy 97 dB Nam châm Neodymium giúp cụm từ nhẹ nhưng vẫn tạo lực mạnh Khe ",
    "sale_enabled": true,
    "sale_price": 7376400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-10ndl64.jpg",
    "images": [
      {
        "id": "img-1049287614",
        "image_url": "/images/products/loa-roi-bc-speakers-10ndl64.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "83ed2c50-7aaa-5052-90e3-c1ca9664a542",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "HEADPHONE HDJ-CUE1BT",
    "slug": "hdj-cue1bt",
    "sku": "HDJ-CUE1BT",
    "brand": "Pioneer DJ",
    "description": "HEADPHONE HDJ-CUE1BT Tai nghe HDJ-CUE1BT là một sản phẩm tai nghe lý tưởng dành cho những người mới bắt đầu với bộ môn DJ. Sản phẩm sở hữu một thiết kế chuyên nghiệp, một chất âm sâu lắng cùng một chất lượng hoàn thiện cao – tất cả gói gọn trong một mức giá hợp lý. Tai nghe HDJ-CUE1BT là phiên bản có Bluetooth® để có thể thoải mái hơn trong việc sử dụng tai nghe. Tai nghe HDJ-CUE1BT s ử dụng chung driver với dòng sản phẩm tai nghe chuyên nghiệp HDJ-X5 , sản phẩm tai nghe HDJ-CUE1BT đã được tinh ",
    "sale_enabled": true,
    "sale_price": 3780000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hdj-cue1bt.png",
    "images": [
      {
        "id": "img-1049177213",
        "image_url": "/images/products/hdj-cue1bt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a93803e7-488d-508a-bf07-733d686c0aee",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA MONITOR ACTIVE RM-07",
    "slug": "rm-07",
    "sku": "RM-07",
    "brand": "Pioneer DJ",
    "description": "LOA MONITOR ACTIVE RM-07 ĐVT: CÁI Loa monitor Active RM-07 của hãng Pioneer Dj được thiết kế với cấu trúc đồng trục. Với tín hiệu từ tweeter và woofer phát ra từ cùng một điểm, do đó loa Monitor RM-07 đảm bảo âm thanh được phân phối đều và chính xác, mang lại trải nghiệm nghe nhạc vô cùng chân thực và sống động. Bạn đang tìm kiếm một dòng loa monitor Active chất lượng, đẳng cấp để nâng tầm trải nghiệm âm nhạc của mình? Không cần tìm đâu xa, loa monitor Active RM-07 của Pioneer DJ chính là sự lựa",
    "sale_enabled": true,
    "sale_price": 26308800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rm-07.png",
    "images": [
      {
        "id": "img-1049164582",
        "image_url": "/images/products/rm-07.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "eb73c6d6-c18c-505f-a6fd-7704c6c0146f",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-REV5",
    "slug": "ddj-rev5",
    "sku": "DDJREV5",
    "brand": "Pioneer DJ",
    "description": "Large jog wheels and MAGVEL FADER Scratch-style layout for open-format DJs Dedicated Stems control for live remixing Auto BPM Transition for easy mixing over wide BPM shifts Piano Play mimics a keyboard across Performance Pads Serato DJ Pro and rekordbox compatibility Large jog wheels and MAGVEL FADER for dynamic scratching Jog Wheels lớn tăng độ phản ứng nhanh, chắc chắn và dễ sử dụng – tạo cảm giác như đang sử dụng thiết bị CDJ - được trang bị thêm màn hình hiển thị ngay phía trên để nắm bắt b",
    "sale_enabled": true,
    "sale_price": 34927200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ddj-rev5.png",
    "images": [
      {
        "id": "img-1049023655",
        "image_url": "/images/products/ddj-rev5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a7b02252-9b39-511f-b9f2-64e8c6b4e814",
    "category_id": "c204eee4-e914-5d7c-9c2a-9fa66383eb61",
    "category_name": "Mâm Đĩa Than (Turntables)",
    "category_slug": "turntables",
    "name": "MÁY DJ TURNTABLE PLX-CRSS12",
    "slug": "plx-crss12",
    "sku": "PLXCRSS12",
    "brand": "Pioneer DJ",
    "description": "PLX-CRSS12 professional digital-analog hybrid turntable . Turntable đầu tiên trên thế giới cung cấp khả năng analog playback và tone-arm-free DVS control. Tone-arm-free DVS control eliminates skipping in digital playback Dù cho bạn scratch mạnh như nào, bạn sẽ không bao giờ gặp phải tình trạng needle skipping khi sử dụng PLX-CRSS12 ở chế độ Digital Vinyl. Nhờ vào tone-arm-free system MAGVEL CLAMP giữ chính xác tại điểm mà bạn tiếp xúc, cho phép điều khiển trực tiếp trên bài nhạc, mang lại cảm gi",
    "sale_enabled": true,
    "sale_price": 51753600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/plx-crss12.png",
    "images": [
      {
        "id": "img-1048764602",
        "image_url": "/images/products/plx-crss12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "930eb334-386b-56ea-b877-e2b6fa5019d7",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói Antari Z-1000III",
    "slug": "z-1000iii",
    "sku": "Z-1000III",
    "brand": "Antari",
    "description": "Máy tạo khói Antari Z-1000III – Fog Machine 1000W tích hợp DMX cho sân khấu và sự kiện Máy tạo khói Antari Z-1000III là model Fog Machine thuộc Z Series của Antari, được thiết kế cho các ứng dụng sân khấu, sự kiện, biểu diễn và không gian giải trí cần một hệ thống tạo khói chuyên nghiệp với khả năng điều khiển linh hoạt. Sở hữu công suất 1000 W , bình chứa dung dịch 1,7 lít , thời gian làm nóng khoảng 6 phút và mức tiêu thụ dung dịch khoảng 60 ml/phút ở 100% output , Z-1000III phù hợp với các ch",
    "sale_enabled": true,
    "sale_price": 9882000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/z-1000iii.png",
    "images": [
      {
        "id": "img-1048428465",
        "image_url": "/images/products/z-1000iii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "203222e1-4b6c-5e17-8737-46cb5706a9d4",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói Antari Z-1200III",
    "slug": "z-1200iii",
    "sku": "Z-1200III",
    "brand": "Antari",
    "description": "Máy tạo khói Antari Z-1200III – Fog Machine 1200W tích hợp LCD, DMX512 và RDM Máy tạo khói Antari Z-1200III là model Fog Machine chuyên nghiệp thuộc Z Series của Antari , được thiết kế cho sân khấu, sự kiện, nhà hát, club và các hệ thống production cần khả năng tạo khói mạnh mẽ kết hợp điều khiển linh hoạt. Z-1200III được trang bị bộ gia nhiệt 1200 W , bình chứa dung dịch 2,5 lít , mức tiêu thụ tối đa khoảng 85 ml/phút và thời gian làm nóng khoảng 11 phút . Điểm nổi bật của model này là màn hình",
    "sale_enabled": true,
    "sale_price": 13770000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/z-1200iii.png",
    "images": [
      {
        "id": "img-1048346286",
        "image_url": "/images/products/z-1200iii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1b2b45fe-6f02-51e1-a82c-a5208c9114f6",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói Antari Z-1500III",
    "slug": "z-1500iii",
    "sku": "Z-1500III",
    "brand": "Antari",
    "description": "Máy tạo khói Antari Z-1500III – Fog Machine 1500W chuyên nghiệp cho sân khấu và sự kiện Máy tạo khói Antari Z-1500III là dòng Fog Machine công suất cao thuộc Z Series của Antari , được thiết kế cho sân khấu, sự kiện, nhà hát, club và các hệ thống production chuyên nghiệp cần khả năng tạo khói mạnh kết hợp khả năng kiểm soát linh hoạt. Với công suất 1500 W , bình chứa dung dịch lớn 6 lít , mức tiêu thụ tối đa khoảng 150 ml/phút ở 100% output và thời gian làm nóng khoảng 9 phút , Z-1500III phù hợp",
    "sale_enabled": true,
    "sale_price": 17031600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/z-1500iii.png",
    "images": [
      {
        "id": "img-1048316261",
        "image_url": "/images/products/z-1500iii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b95fbb20-c5d4-5a70-a8bb-65867880b9f8",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo khói Antari Z-3000III",
    "slug": "z-3000iii",
    "sku": "Z-3000III",
    "brand": "Antari",
    "description": "Máy tạo khói Antari Z-3000III – Fog Machine công suất cao cho sân khấu và sự kiện chuyên nghiệp Máy tạo khói Antari Z-3000III là dòng Fog Machine công suất cao thuộc Z Series của Antari , được phát triển cho sân khấu, concert, nhà hát, club, sự kiện và các hệ thống rental/production cần khả năng tạo lượng fog lớn cùng hệ thống điều khiển chuyên nghiệp. Z-3000III được trang bị bộ gia nhiệt công suất 2500 W , bình chứa dung dịch 6 lít , mức tiêu thụ tối đa khoảng 250 ml/phút ở 100% output và thời ",
    "sale_enabled": true,
    "sale_price": 20919600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/z-3000iii.png",
    "images": [
      {
        "id": "img-1048286348",
        "image_url": "/images/products/z-3000iii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ad338840-0db5-5a99-85a4-0712ff01134d",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-FLX10",
    "slug": "ddj-flx10",
    "sku": "DDJ-FLX10",
    "brand": "Pioneer DJ",
    "description": "DDJ-FLX10 4-channel DJ performance controller for multiple DJ applications (Black) DDJ-FLX10 là DJ Controller 4 kênh, sử dụng được với rekordbox và Serato DJ Pro. Nó được tích hợp tính năng mới bao gồm cả công nghệ Track Separation cho phép bạn thực hiện dễ dàng các bản mash-up một cách nhanh chóng mà không cần chuẩn bị trước. Track Separation for innovative performances including live mashups Load một bài nhạc thông thường từ thư viện nhạc của bạn và tạo nên những bản remixes hay mash-ups nhanh",
    "sale_enabled": true,
    "sale_price": 46656000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-flx10.png",
    "images": [
      {
        "id": "img-1045802439",
        "image_url": "/images/products/ddj-flx10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "24d17343-fe01-5410-a0d7-43cd35b5affd",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-FLX6-GT",
    "slug": "ddj-flx6-gt",
    "sku": "DDJ-FLX6-GT",
    "brand": "Pioneer DJ",
    "description": "DDJ-FLX6-GT Một DJ Controller 4 kênh, có thể sử dụng được rekordbox và Serato DJ Pro. Dễ dàng để có thể mixing những bài nhạc khác gerne và tạo ra những đoạn drop, scratch,….. một cách đơn giản nhất. Điều khiển đám đông một cách đơn giản với thiết bị DJ Controller đến từ Pioneer DJ : DDJ-FLX6-GT. Với những tính năng hoàn toàn mới cùng với 4 chanel được tích hợp, bạn có thể dễ dàng mixing những bài nhạc khác gerne và khác tempo với nhau. Ngoài ra bạn còn có thể dễ dàng tạo thêm màu sắc cho set nh",
    "sale_enabled": true,
    "sale_price": 19044000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ddj-flx6-gt.png",
    "images": [
      {
        "id": "img-1045799430",
        "image_url": "/images/products/ddj-flx6-gt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cd903058-d323-5f66-92b7-34bb649ad139",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "PROFILE STREAMING SET",
    "slug": "sennheiser-profile-streaming-set",
    "sku": "Profile_usb_micro_streaming_set",
    "brand": "SENNHEISER",
    "description": "PROFILE STREAMING SET Sản phẩm Profile USB Microphone chuyên dụng cho những khách hàng là người sáng tạo nội dung số hoặc nhu cầu sử dụng thu âm chuyên nghiệp. Sản phẩm Profile USB Microphone sử dụng cổng kết nối USB-C và tương thích hoàn hảo với MacOS, iPadOS, Windows và Android, sở hữu thiết kế đầu thu kiểu Cardioid Condenser giống như trên các dòng sản phẩm micro chuyên dụng cho phòng thu giúp hạn chế tiếng ồn xung quanh và khả năng xoay chuyển linh hoạt để bắt âm tốt hơn. CÁC TÍNH NĂNG CỦA P",
    "sale_enabled": true,
    "sale_price": 6469200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 3,
    "is_active": true,
    "image_url": "/images/products/sennheiser-profile-streaming-set.png",
    "images": [
      {
        "id": "img-1045731308",
        "image_url": "/images/products/sennheiser-profile-streaming-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2025aba5-621c-5f64-bfcc-3d8289a2316e",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "PROFILE USB MICROPHONE",
    "slug": "sennheiser-profile-usb-microphone",
    "sku": "Profile_usb_micro",
    "brand": "SENNHEISER",
    "description": "SENNHEISER PROFILE USB MICROPHONE SENNHEISER Profile USB không chỉ là một micro thông thường; nó là sự kết hợp hoàn hảo giữa công nghệ tiên tiến và thiết kế thông minh, đảm bảo rằng mọi giọng nói đều được truyền tải một cách rõ ràng và tự nhiên nhất. Với sự ra đời của sản phẩm này, SENNHEISER đã đặt ra một tiêu chuẩn mới trong ngành công nghiệp micro, làm hài lòng cả những người dùng khó tính nhất. Giới thiệu về Micro Livestream Profile USB Trong thế giới ngày càng phát triển của các hoạt động t",
    "sale_enabled": true,
    "sale_price": 4309200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 3,
    "is_active": true,
    "image_url": "/images/products/sennheiser-profile-usb-microphone.png",
    "images": [
      {
        "id": "img-1045719352",
        "image_url": "/images/products/sennheiser-profile-usb-microphone.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8f64885a-8471-532c-b041-f19c4f478c7a",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "Bàn DJ PioneerDJ OPUS-QUAD",
    "slug": "ban-dj-pioneerdj-opus-quad",
    "sku": "OPUS-QUAD",
    "brand": "Pioneer DJ",
    "description": "OPUS-QUAD là bàn DJ có thiết kế thắng giải ở rất nhiều cuộc thi lớn như iF Design Award 2024 ( Đức, 2024), Red Dot Design Award 2024 ( Singapore, 2024) , và 2023 Chicago Good Design Awards. Cân nặng: 13.2 kg Kích thước ( Dài x Rộng x Cao): 925.7 mm x 925.7 mm x 142 mm Đầu ra: 2 LINE (RCA), 2 PHONO (RCA), 2 MIC (XLR connector & 1/4 inch TRS jack) Đầu vào: 1 MASTER (XLR), 1 MASTER (RCA), 1 ZONE (XLR), 1 monitor BOOTH (1/4 inch TRS Jack), 1 PHONES (1/4 inch stereo phone Jack), 1 PHONES (3.5-mm ster",
    "sale_enabled": true,
    "sale_price": 93366000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ban-dj-pioneerdj-opus-quad.png",
    "images": [
      {
        "id": "img-1045352689",
        "image_url": "/images/products/ban-dj-pioneerdj-opus-quad.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2bb3f62c-77e3-513b-9777-7793f5c66e31",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ DJM-A9",
    "slug": "djm-a9",
    "sku": "DJM-A9",
    "brand": "Pioneer DJ",
    "description": "DJ MIXER DJM-A9 Mixer DJM-A9 4 kênh - thiết bị giúp cho các cuộc chơi nâng thêm một tầm cao mới, tự hào với những nâng cấp lớn so với người tiền nhiệm của nó, mixer DJM-900NXS2 – với chất lượng âm thanh rõ ràng tuyệt vời, khả năng chơi và khả năng kết nối nâng cao cũng như một loạt các tính năng mới giúp cho các DJ thực hiện biểu diễn lên cấp độ tiếp theo. Mixer DJM-A9 cũng đã được cải tiến như một nhạc cụ để mang đến những buổi biểu diễn giàu cảm xúc và năng động hơn, trong khi vẫn giữ nguyên c",
    "sale_enabled": true,
    "sale_price": 81648000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djm-a9.png",
    "images": [
      {
        "id": "img-1045186597",
        "image_url": "/images/products/djm-a9.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c9d381bb-4cb2-5347-869c-6e94f744b052",
    "category_id": "09ce254c-668c-512f-b949-23137ef21f75",
    "category_name": "Quạt Điều Hướng Sân Khấu",
    "category_slug": "quat-dieu-huong",
    "name": "Quạt hiệu ứng sân khấu Antari AF-6",
    "slug": "af-6",
    "sku": "AF-6",
    "brand": "Antari",
    "description": "Quạt hiệu ứng sân khấu Antari AF-6 – Giải pháp hiệu ứng chuyên nghiệp cho sân khấu và sự kiện Quạt hiệu ứng sân khấu Antari AF-6 là giải pháp thuộc hệ sinh thái hiệu ứng sân khấu Antari, được định hướng cho các đơn vị cần điều hướng khói, haze, tuyết hoặc tạo luồng gió phục vụ thiết kế hiệu ứng sân khấu. Sản phẩm phù hợp để xây dựng hệ thống hiệu ứng có tính đồng bộ, dễ vận hành và thuận tiện khi kết hợp với ánh sáng, âm thanh cũng như kịch bản trình diễn. Với từ khóa chính quạt hiệu ứng Antari ",
    "sale_enabled": true,
    "sale_price": 65674800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/af-6.jpg",
    "images": [
      {
        "id": "img-1045026777",
        "image_url": "/images/products/af-6.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e9f38642-4e49-5b48-aad5-0c15b6fb8489",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CÀI ÁO KHÔNG DÂY SENNHEISER XSW-D LAVALIER SET",
    "slug": "xsw-d-lavalier-set",
    "sku": "XSW-D VOCAL SET",
    "brand": "SENNHEISER",
    "description": "HỆ THỐNG KHÔNG DÂY SENNHEISER XSW-D LAVALIER SET Hệ thống không dây kỹ thuật số XSW-D XSW-D LAVALIER SET với micro gài áo ME2-II đầu omni nổi tiếng của Sennheiser là hệ thống không dây cho phép bạn thêm tự do trong việc sáng tạo. Hệ thống không dây kỹ thuật số XSW-D LAVALIER SET dễ sử dụng với thao tác kết nối đơn giản chỉ với một chạm, hệ thống sử dụng đường truyền kỹ thuật số để liên kết liền mạch các nguồn âm thanh. Được trang bị micro gài áo ME2-II, giải pháp thanh lịch này giúp cho việc diễ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xsw-d-lavalier-set.png",
    "images": [
      {
        "id": "img-1044957880",
        "image_url": "/images/products/xsw-d-lavalier-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cf2b03d6-72d9-5822-bbe5-d429ed6fd37c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PASSIVE NEXO STM S118",
    "slug": "stm-s118",
    "sku": "STM S118",
    "brand": "NEXO",
    "description": "LOA NEXO STM S118 LOA SUB NEXO STM S118 sử dụng loa rời 5 tấc Neodymium công suất 3000W . Cấu tạo thùng loa đảm bảo đầu ra SPL tương đương với các loa Sub đôi 5 tấc thông thường. Có cùng chiều rộng, nhưng chiều cao thì gấp đôi loa NEXO STM M46 , nên LOA SUB NEXO STM S118 có thể được dùng để treo theo hoặc xếp chồng lên nhau trên mặt đất. Có thể chạy ở chế độ OMNI đa hướng hoặc CARDIOID SUB MOD E . LOA SUB NEXO STM S118 có tính năng kết nối PistonRigTM và REDLockTM sáng tạo, cho phép một người có",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/stm-s118.png",
    "images": [
      {
        "id": "img-1044759723",
        "image_url": "/images/products/stm-s118.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "820e5b10-7480-519d-9918-671fd6d4487b",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO STM M46",
    "slug": "stm-m46",
    "sku": "STM M46",
    "brand": "NEXO",
    "description": "LOA NEXO STM M46 Loa NEXO STM M46 công suất cao được đúc với các thành phần cải tiến để nâng cao hiệu suất. Loa rời sử dụng màng phẳng đảm bảo độ phủ hoàn toàn đồng đều và toàn dải trên toàn bộ phân tán ngang 90°. Dải tần số HF vẫn hoàn toàn tuyến tính, sử dụng màng chắn Ketone Polymer giúp tăng cường phản ứng âm và ném xa. Loa NEXO STM M46 có tính năng kết nối PistonRig TM và REDLock TM cải tiến, cho phép một người có thể treo an toàn mọi kích thước của hệ thống. Tay cầm REDLock TM khóa các điể",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/stm-m46.png",
    "images": [
      {
        "id": "img-1044759722",
        "image_url": "/images/products/stm-m46.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "22cbf7b0-c78a-5406-ac4f-c5609902a8ac",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO STM M28",
    "slug": "stm-m28",
    "sku": "STM M28",
    "brand": "NEXO",
    "description": "LOA NEXO STM M28 OMNI Thùng loa NEXO STM M28 đa năng sử dụng vỏ khuôn đúc phun, giúp vai trò của bộ giảm âm được hoàn thành tốt hơn, loa NEXO STM M28 cung cấp độ phủ âm phân tán ngang 90°/120° và góc phủ phân tán từ 0° đến 15° giữa các loa với nhau. Loa NEXO STM M28 có cùng chiều rộng với loa NEXO STM M46, chiều cao bằng 2/3, Loa NEXO STM M28 cũng có thể được sử dụng độc lập với NEXO STM M46 hoặc NEXO STM B112 để tạo ra các hệ thống Linearray nhỏ gọn. Loa NEXO STM M28 có tính năng kết nối Piston",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/stm-m28.png",
    "images": [
      {
        "id": "img-1044759705",
        "image_url": "/images/products/stm-m28.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "08491aa4-68df-573a-98e2-270bc0367b4c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB LINE ARRAY NEXO STM B112",
    "slug": "stm-b112",
    "sku": "STM B112",
    "brand": "NEXO",
    "description": "LOA NEXO STM B112 Thùng loa bass NEXO STM B112 vỏ khuôn được đúc phun, sử dụng loa bass 3 tấc 12″ từ Neodymium công suất 3000W với coil loa lớn 4”. Loa bass NEXO STM B112 có cùng định dạng - kích thước, trọng lượng, trọng tâm - như loa NEXO STM M46 . Thiết kế có họng kết hợp tối đa hóa hiệu quả của loa rời, cung cấp nhiều hơn 6dB so với loa rời tiêu chuẩn trong dải tần số này. Loa NEXO STM B112 có tính năng kết nối PistonRig TM và REDLock TM cải tiến, cho phép một người có thể treo an toàn mọi k",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/stm-b112.png",
    "images": [
      {
        "id": "img-1044759680",
        "image_url": "/images/products/stm-b112.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1dbb507a-6104-59fc-9f74-a8bc646475bc",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB ĐÔI NEXO RS18",
    "slug": "rs18",
    "sku": "RS18",
    "brand": "NEXO",
    "description": "LOA NEXO RS18 Loa NEXO RS18 áp dụng Công nghệ RAY SUB đang chờ cấp bằng sáng chế của NEXO ở dạng loa subwoofer đôi 2 x 18\"(5 tấc). Công nghệ RAY SUB tối ưu hóa các mối quan hệ định vị và PHASE của các bề mặt bức xạ trong các thùng loa có lỗ thông hơi, cho phép khoảng cách âm thanh từ phía sau đến phần trước tăng khi tần số giảm. Tổng hợp hiệu quả trên băng thông loa subwoofer, cho phép đạt được trung bình 5db từ phần phía sau theo hướng về phía trước và triệt tiêu theo hướng phía sau. Loa NEXO R",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/rs18.png",
    "images": [
      {
        "id": "img-1044759638",
        "image_url": "/images/products/rs18.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "103c4b62-3bf6-565b-a174-532b8e899b20",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO PS8",
    "slug": "ps8",
    "sku": "PS8",
    "brand": "NEXO",
    "description": "LOA NEXO PS8 - Loa NEXO PS8 là một trong những sản phẩm nổi tiếng về hiệu suất và độ tin cậy của thương hiệu NEXO - thương hiệu được bình chọn nằm trong top 5 hãng sản xuất loa có chất lượng tốt nhất thế giới.Với nhiều phản hồi từ khách hàng về việc biểu diễn thâu đêm suốt sáng trong hơn một thập kỷ mà không gặp một vấn đề nào. - Loa NEXO PS8 được NEXO xây dựng tại cơ sở sản xuất hiện đại và thiết kế ngay từ đầu để có tuổi thọ lâu dài, không gặp sự cố.Với âm thanh tuyệt hảo, hoạt động bền bỉ, đá",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ps8.png",
    "images": [
      {
        "id": "img-1044759565",
        "image_url": "/images/products/ps8.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2326adf0-3de9-54a7-9a0e-dd65bc4cd1ad",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO PS15-R2",
    "slug": "ps15-r2",
    "sku": "PS15-R2",
    "brand": "NEXO",
    "description": "LOA NEXO PS15-R2 - Loa NEXO PS15-R2 là một trong những sản phẩm nổi tiếng về hiệu suất và độ tin cậy của thương hiệu NEXO - thương hiệu được bình chọn nằm trong top 5 hãng sản xuất loa có chất lượng tốt nhất thế giới.Với nhiều phản hồi từ khách hàng về việc biểu diễn thâu đêm suốt sáng trong hơn một thập kỷ mà không gặp một vấn đề nào. - Loa NEXO PS15-R2 được NEXO xây dựng tại cơ sở sản xuất hiện đại và thiết kế ngay từ đầu để có tuổi thọ lâu dài, không gặp sự cố.Với âm thanh tuyệt hảo, hoạt độn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ps15-r2.png",
    "images": [
      {
        "id": "img-1044759494",
        "image_url": "/images/products/ps15-r2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "918ee405-4bb7-5015-8bec-c108002e3692",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO PS10-R2",
    "slug": "ps10-r2",
    "sku": "PS10-R2",
    "brand": "NEXO",
    "description": "LOA NEXO PS10-R2 - Loa NEXO PS10-R2 là một trong những sản phẩm nổi tiếng về hiệu suất và độ tin cậy của thương hiệu NEXO - thương hiệu được bình chọn nằm trong top 5 hãng sản xuất loa có chất lượng tốt nhất thế giới.Với nhiều phản hồi từ khách hàng về việc biểu diễn thâu đêm suốt sáng trong hơn một thập kỷ mà không gặp một vấn đề nào. - Loa NEXO PS10-R2 được NEXO xây dựng tại cơ sở sản xuất hiện đại và thiết kế ngay từ đầu để có tuổi thọ lâu dài, không gặp sự cố.Với âm thanh tuyệt hảo, hoạt độn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ps10-r2.png",
    "images": [
      {
        "id": "img-1044759458",
        "image_url": "/images/products/ps10-r2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6a7e3aa4-e578-59d7-b5a8-528bbe30032d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO P8",
    "slug": "p8",
    "sku": "P8",
    "brand": "NEXO",
    "description": "LOA NEXO P 8 - Nhà sản xuất âm thanh hàng đầu NEXO luôn nổi tiếng với các dòng loa point source đa năng nhỏ gọn mà rất mạnh mẽ, lý tưởng cho các ứng dụng FOH và WEDGE . Và với tất cả những chuyên môn đó đã được áp dụng cho dòng loa point source mới nhất của hãng - Loa NEXO P8 . - Công nghệ tiên tiến nhất mà NEXO áp dụng cho loa NEXO P8 chính là thùng loa sử dụng vỏ ván ép uốn cong tùy chỉnh dày 15 mm, với lớp VENEER cho các lớp bên trong và lớp bạch dương ở bên ngoài. Kết quả là tạo ra một thùng",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/p8.png",
    "images": [
      {
        "id": "img-1044759424",
        "image_url": "/images/products/p8.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0a89bc12-c114-5620-aeaf-6db6442db4d8",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO P15",
    "slug": "p15",
    "sku": "P15",
    "brand": "NEXO",
    "description": "LOA NEXO P15 - Nhà sản xuất âm thanh hàng đầu NEXO luôn nổi tiếng với các dòng loa point source đa năng nhỏ gọn mà rất mạnh mẽ, lý tưởng cho các ứng dụng FOH và WEDGE . Và với tất cả những chuyên môn đó đã được áp dụng cho dòng loa point source mới nhất của hãng - Loa NEXO P15 . - Công nghệ tiên tiến nhất mà NEXO áp dụng cho loa NEXO P15 chính là thùng loa sử dụng vỏ ván ép uốn cong tùy chỉnh dày 15 mm , với lớp VENEER cho các lớp bên trong và lớp bạch dương ở bên ngoài. Kết quả là tạo ra một th",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/p15.png",
    "images": [
      {
        "id": "img-1044759389",
        "image_url": "/images/products/p15.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0a07f6b1-24ea-5dec-9e22-9008cd31d940",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO P12",
    "slug": "p12",
    "sku": "P12",
    "brand": "NEXO",
    "description": "Loa NEXO P12 - Nhà sản xuất âm thanh hàng đầu NEXO luôn nổi tiếng với các dòng loa point source đa năng nhỏ gọn mà rất mạnh mẽ, lý tưởng cho các ứng dụng FOH và WEDGE . Và với tất cả những chuyên môn đó đã được áp dụng cho dòng loa point source mới nhất của hãng - Loa NEXO P12 . - Công nghệ tiên tiến nhất mà NEXO áp dụng cho loa NEXO P12 chính là thùng loa sử dụng vỏ ván ép uốn cong tùy chỉnh dày 15 mm , với lớp VENEER cho các lớp bên trong và lớp bạch dương ở bên ngoài. Kết quả là tạo ra một th",
    "sale_enabled": true,
    "sale_price": 107572212,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/p12.png",
    "images": [
      {
        "id": "img-1044759353",
        "image_url": "/images/products/p12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "54487998-4fa4-5413-9315-2cc55fbc407d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO P10",
    "slug": "p10",
    "sku": "P10",
    "brand": "NEXO",
    "description": "Loa NEXO P10 - Nhà sản xuất âm thanh hàng đầu NEXO luôn nổi tiếng với các dòng loa point source đa năng nhỏ gọn mà rất mạnh mẽ, lý tưởng cho các ứng dụng FOH và WEDGE . Và với tất cả những chuyên môn đó đã được áp dụng cho dòng loa point source mới nhất của hãng - Loa NEXO P10 . - Công nghệ tiên tiến nhất mà NEXO áp dụng cho loa NEXO P10 chính là thùng loa sử dụng vỏ ván ép uốn cong tùy chỉnh dày 15 mm, với lớp VENEER cho các lớp bên trong và lớp bạch dương ở bên ngoài. Kết quả là tạo ra một thù",
    "sale_enabled": true,
    "sale_price": 75742128,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/p10.png",
    "images": [
      {
        "id": "img-1044759315",
        "image_url": "/images/products/p10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4e0f135a-9bdd-5b2e-a414-915f3b5a943c",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CARD KẾT NỐI MẠNG NEXO NXES104",
    "slug": "nxes104",
    "sku": "NXES104",
    "brand": "NEXO",
    "description": "THIẾT BỊ KẾT NỐI NEXO NXES104 Thiết bị kết nối NEXO NXES104 là card kết nối mạng EtherSound™ chuyên dụng cho tất cả amply NEXO NXAMP. CÁC TÍNH NĂNG CHÍNH THIẾT BỊ KẾT NỐI NEXO NXES104 Trích xuất 4 luồng âm thanh ( 24bit/48KHz ) trong số 2x64 kênh của luồng ES100 EtherSound™ . Cổng IN và OUT cho chuỗi daisy đơn giản mà không cần công tắc bên ngoài. Cổng Ethernet thứ 3 để điều khiển từ xa toàn bộ mạng từ bất kỳ Card NXES104 nào và ASIO streaming. THÔNG SỐ KỸ THUẬT THIẾT BỊ KẾT NỐI NEXO NXES104 ĐỊN",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxes104.png",
    "images": [
      {
        "id": "img-1044759301",
        "image_url": "/images/products/nxes104.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6d1bac39-171d-5b76-ad08-e5d9497e3805",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CARD KẾT NỐI MẠNG DANTE NEXO NXDT104 MK2",
    "slug": "nxdt104-mk2",
    "sku": "NXDT104 MK2",
    "brand": "NEXO",
    "description": "THIẾT BỊ KẾT NỐI NEXO NXDT104 MK2 Thiết bị kết nối NEXO NXDT104 MK2 là card kết nối mạng DANTE™ chuyên dụng cho tất cả amply NEXO NXAMP. CÁC TÍNH NĂNG CHÍNH THIẾT BỊ KẾT NỐI NEXO NXDT104 MK2 Nhận 4 luồng âm thanh ( 24bit/44.1 - 96 kHz ) ở định dạng DANTE™ Điều khiển từ xa từ bất kỳ máy tính nào trong mạng cục bộ bằng các lệnh TCP / IP. Thiết kế 3 cổng độc đáo có thể được sử dụng: Làm công tắc gigabit 3 cổng tích hợp. Làm hai cổng dự phòng DANTE™ với cổng thứ 3 tùy chọn để điều khiển từ xa bổ sun",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxdt104-mk2.png",
    "images": [
      {
        "id": "img-1044759290",
        "image_url": "/images/products/nxdt104-mk2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6512cb1b-cd30-5234-bcec-c2d83cc1ede2",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO NXAMP4X4MK2",
    "slug": "nxamp4x4mk2",
    "sku": "NXAMP4X4MK2",
    "brand": "NEXO",
    "description": "AMPLY NEXO NXAMP4X4MK2 Amply NEXO NXAMP4X4MK2 kết hợp xử lý tín hiệu tiên tiến với bốn bộ khuếch đại Class D hiện đại để tạo ra giải pháp điều khiển và cấp nguồn linh hoạt ở mức 4 X 4500 Watts/Kênh , trọng lượng nhẹ cho hệ thống loa NEXO . Amply NEXO NXAMP4X4MK2 lý tưởng để sử dụng trong các cài đặt cố định và các chuyến lưu diễn, các bộ điều khiển được hỗ trợ này dễ cài đặt và triển khai nhanh chóng, với tất cả các thông số thiết yếu có thể truy cập dễ dàng thông qua màn hình cảm ứng màu lớn tr",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxamp4x4mk2.png",
    "images": [
      {
        "id": "img-1044759267",
        "image_url": "/images/products/nxamp4x4mk2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "29395f0b-08e3-58cc-8d7b-0474e80087cf",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO NXAMP4X4",
    "slug": "nxamp4x4c",
    "sku": "NXAMP4X4C",
    "brand": "NEXO",
    "description": "AMPLY NEXO NXAMP4X4 Amply NEXO NXAMP4X4 là bộ khuếch đại công suất và bộ điều khiển loa đi kèm được thiết kế tinh vi. Những cải tiến đáng kể của DSP trên amply NEXO NXAMP4X4 cho phép nhiều đường cảm biến kỹ thuật số bảo vệ đồng thời Amply và loa được kết nối. Đầu tiên, amply NEXO NXAMP4X4 sử dụng một dây nguồn kép độc đáo, cung cấp nguồn điện với công suất gần gấp đôi so với hầu hết các Amply đang có trên thị trường hiện nay, vẫn cực kỳ dễ dàng kết nối với bất kỳ nguồn điện một hoặc nhiều pha. Đ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxamp4x4c.png",
    "images": [
      {
        "id": "img-1044759231",
        "image_url": "/images/products/nxamp4x4c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e852da3c-3283-56b9-b44a-86dbd3451f7f",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO NXAMP4X2MK2",
    "slug": "nxamp4x2mk2",
    "sku": "NXAMP4X2MK2",
    "brand": "NEXO",
    "description": "AMPLY NEXO NXAMP4X2MK2 Amply NEXO NXAMP4X2MK2 kết hợp xử lý tín hiệu tiên tiến với bốn bộ khuếch đại Class D hiện đại để tạo ra giải pháp điều khiển và cấp nguồn linh hoạt ở mức 4 X 2500 Watts/Kênh , trọng lượng nhẹ cho hệ thống loa NEXO . Amply NEXO NXAMP4X2MK2 lý tưởng để sử dụng trong các cài đặt cố định và các chuyến lưu diễn, các bộ điều khiển được hỗ trợ này dễ cài đặt và triển khai nhanh chóng, với tất cả các thông số thiết yếu có thể truy cập dễ dàng thông qua màn hình cảm ứng màu lớn tr",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxamp4x2mk2.png",
    "images": [
      {
        "id": "img-1044759212",
        "image_url": "/images/products/nxamp4x2mk2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "79a58342-fba2-54e9-8fbc-0727a3aa86ef",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO NXAMP4X1MK2",
    "slug": "nxamp4x1mk2",
    "sku": "NXAMP4X1MK2",
    "brand": "NEXO",
    "description": "AMPLY NEXO NXAMP4X1MK2 Amply NEXO NXAMP4X1MK2 kết hợp xử lý tín hiệu tiên tiến với bốn bộ khuếch đại Class D hiện đại để tạo ra giải pháp điều khiển và cấp nguồn linh hoạt ở mức 4 X 1300 Watts/Kênh , trọng lượng nhẹ cho hệ thống loa NEXO . Amply NEXO NXAMP4X1MK2 lý tưởng để sử dụng trong các cài đặt cố định và các chuyến lưu diễn, các bộ điều khiển được hỗ trợ này dễ cài đặt và triển khai nhanh chóng, với tất cả các thông số thiết yếu có thể truy cập dễ dàng thông qua màn hình cảm ứng màu lớn tr",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxamp4x1mk2.png",
    "images": [
      {
        "id": "img-1044759184",
        "image_url": "/images/products/nxamp4x1mk2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9484cc3f-12fa-59cc-a67b-a7cea5ab1002",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CARD KẾT NỐI MẠNG NEXO NXAE104",
    "slug": "nxae104",
    "sku": "NXAE104",
    "brand": "NEXO",
    "description": "THIẾT BỊ KẾT NỐI NEXO NXAE104 Thiết bị kết nối NEXO NXES104 là card kết nối mạng AES/EBU chuyên dụng cho tất cả amply NEXO NXAMP. CÁC TÍNH NĂNG CHÍNH THIẾT BỊ KẾT NỐI NEXO NXAE104 Trích xuất 4 luồng âm thanh ( 24bit/44,1 - 96kHz) ở định dạng AES/EBU. 2 x đầu vào AES/EBU trên XLR (Jack Canon) và một đầu ra XLR (Jack canon). 2 x cổng mạng Lan RJ45 cho điều khiển từ xa và chuỗi liên kết của các thiết bị. THÔNG SỐ KỸ THUẬT THIẾT BỊ KẾT NỐI NEXO NXAE104 ĐỊNH DẠNG ÂM THANH KỸ THUẬT S Ố Loại âm thanh k",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nxae104.png",
    "images": [
      {
        "id": "img-1044759167",
        "image_url": "/images/products/nxae104.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9f53ecb9-6994-5f37-80a7-3e1c3605ee0f",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO NUAR",
    "slug": "nuar",
    "sku": "NUAR",
    "brand": "NEXO",
    "description": "TỦ AMPLY CÔNG SUẤT NEXO NUAR Tủ amply công suất NEXO Universal Amp Rack (NUAR) cung cấp cho người dùng xử dụng hệ thống âm thanh NEXO với giải pháp \" PLUG & PLAY \", có thể mở rộng với sức mạnh và tính linh hoạt vô song. Hệ thống dù ở bất kỳ cấu hình nào cũng có thể được cài đặt dễ dàng bằng cách lựa chọn các channel của bất kỳ Loa NEXO bằng phần mềm kỹ thuật số NEMO. Tủ amply công suất NEXO NUAR bao gồm 2 amply công suất NEXO NXAMP4X4 , 2 thiết bị đo đầu vào kỹ thuật số DMU , và 2 thiết bị đầu r",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/nuar.png",
    "images": [
      {
        "id": "img-1044759093",
        "image_url": "/images/products/nuar.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "af38fb5d-fd01-535b-aef3-7a238bf54b68",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO MSUB18-I",
    "slug": "msub18-i",
    "sku": "MSUB18-I",
    "brand": "NEXO",
    "description": "MSUB18-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/msub18-i.jpg",
    "images": [
      {
        "id": "img-1044759085",
        "image_url": "/images/products/msub18-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a232a168-fbb8-513b-8dc1-4367d771f85c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO MSUB18",
    "slug": "msub18",
    "sku": "MSUB18",
    "brand": "NEXO",
    "description": "Nexo cho ra mắt dòng loa sub MSUB18 nổi bật với việc sử dụng linh hoạt. Người dùng có thể sử dụng riêng lẻ hoặc ghép với những thiết bị khác để cấu hình lên hệ thống line array. Với kích thước 701mm rộng x 525mm x sâu 704mm và nặng 55 kg, MSUB18 có cùng chiều rộng với tủ chính GEO M12 và cao hơn 41%. Các ngăn tủ được làm từ lớp bạch dương Baltic với các thanh cản lớn bằng composite ở các góc và có tính năng lắp ghép. Sử dụng một trình điều khiển Neodymium cuộn dây thoại đường kính 18 inch duy nh",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/msub18.jpg",
    "images": [
      {
        "id": "img-1044759075",
        "image_url": "/images/products/msub18.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ff11fe05-7860-554c-a9fd-459089a88007",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO MSUB15-I",
    "slug": "msub15-i",
    "sku": "MSUB15-I",
    "brand": "NEXO",
    "description": "MSUB15-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/msub15-i.png",
    "images": [
      {
        "id": "img-1044759061",
        "image_url": "/images/products/msub15-i.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "29d8e063-583f-592f-9325-6e1f844a8135",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO MSUB15",
    "slug": "msub15",
    "sku": "MSUB15",
    "brand": "NEXO",
    "description": "MSUB15",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/msub15.jpg",
    "images": [
      {
        "id": "img-1044759054",
        "image_url": "/images/products/msub15.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4ca6208b-0519-5849-97a4-d11596385797",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO MSUB12",
    "slug": "msub12",
    "sku": "MSUB12",
    "brand": "NEXO",
    "description": "MSUB12",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/msub12.jpg",
    "images": [
      {
        "id": "img-1044759047",
        "image_url": "/images/products/msub12.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9bd1c086-0cc2-5b80-8dbb-5e681bdd7d89",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO LS18E",
    "slug": "ls18e",
    "sku": "LS18E",
    "brand": "NEXO",
    "description": "LS18E",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ls18e.jpg",
    "images": [
      {
        "id": "img-1044759034",
        "image_url": "/images/products/ls18e.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a3429291-2c9c-5de0-9637-9e34d83defc1",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO LS18",
    "slug": "ls18",
    "sku": "LS18",
    "brand": "NEXO",
    "description": "LS18",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ls18.jpg",
    "images": [
      {
        "id": "img-1044759029",
        "image_url": "/images/products/ls18.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cdf4a742-944b-5a20-895c-d1d1813ce12c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO L18",
    "slug": "l18",
    "sku": "L18",
    "brand": "NEXO",
    "description": "Loa NEXO L18 Loa Subwoofer NEXO L18 – Sự Bổ Trợ Hoàn Hảo Cho Hệ Thống Loa Chuyên Nghiệp NEXO L18 là một trong những sản phẩm loa subwoofer chuyên nghiệp hàng đầu được thiết kế để hoạt động hiệu quả nhất cùng với dòng loa NEXO P15 . Với thiết kế vững chắc, hiệu suất âm trầm mạnh mẽ và khả năng lắp đặt linh hoạt, L18 không chỉ là một lựa chọn tuyệt vời cho các không gian âm thanh lớn mà còn đáp ứng nhu cầu âm thanh tinh tế cho các sự kiện đòi hỏi chất lượng âm thanh cao. Được chế tạo với vật liệu ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/l18.png",
    "images": [
      {
        "id": "img-1044759026",
        "image_url": "/images/products/l18.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "589a64d9-bae4-5656-95d7-81c6bc911c7e",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO L15",
    "slug": "l15",
    "sku": "L15",
    "brand": "NEXO",
    "description": "Với kích thước 550mm rộng x 439mm x sâu 650mm và nặng 35Kg, chiếc phụ L15 sử dụng trình điều khiển du ngoạn dài 15 inch trong tủ gỗ dán bạch dương / dương Baltic có chèn ren để gắn phụ kiện và giá đỡ M20. Với dải tần từ 40Hz-120Hz và SPL Đỉnh 139dB, L15 được thiết kế đặc biệt để phù hợp với P12, khiến nó trở thành đối tác hoàn hảo trong các ứng dụng bay và sử dụng làm trống. Với kích thước 550mm rộng x 439mm x sâu 650mm và nặng 35Kg, chiếc phụ L15 sử dụng trình điều khiển du ngoạn dài 15 inch tr",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/l15.jpg",
    "images": [
      {
        "id": "img-1044759025",
        "image_url": "/images/products/l15.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "22831dd2-4414-5688-b510-2a2b9524de57",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS312-TIS",
    "slug": "ids312-tis",
    "sku": "IDS312-TIS",
    "brand": "NEXO",
    "description": "IDS312-TIS",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids312-tis.jpg",
    "images": [
      {
        "id": "img-1044759024",
        "image_url": "/images/products/ids312-tis.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8556d03d-c441-5af1-a205-cabe5e247779",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS312-T",
    "slug": "ids312-t",
    "sku": "IDS312-T",
    "brand": "NEXO",
    "description": "IDS312-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids312-t.jpg",
    "images": [
      {
        "id": "img-1044759023",
        "image_url": "/images/products/ids312-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "51ee7b8c-d981-5235-99e8-1a57da95cc4a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS312-I",
    "slug": "ids312-i",
    "sku": "IDS312-I",
    "brand": "NEXO",
    "description": "IDS312-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids312-i.jpg",
    "images": [
      {
        "id": "img-1044759021",
        "image_url": "/images/products/ids312-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b2d41f41-e006-5368-b56e-34e6baedd07a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS210-T",
    "slug": "ids210-t",
    "sku": "IDS210-T",
    "brand": "NEXO",
    "description": "IDS210-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids210-t.jpg",
    "images": [
      {
        "id": "img-1044759020",
        "image_url": "/images/products/ids210-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a73b0ba4-76a0-54fb-82f8-e4f3436b588b",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB ĐÔI NEXO IDS210-E",
    "slug": "ids210-e",
    "sku": "IDS210-E",
    "brand": "NEXO",
    "description": "IDS210-E",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids210-e.jpg",
    "images": [
      {
        "id": "img-1044759018",
        "image_url": "/images/products/ids210-e.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6264d094-7a42-54aa-b72a-e4cdaf8ee7bc",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS110-T",
    "slug": "ids110-t",
    "sku": "IDS110-T",
    "brand": "NEXO",
    "description": "IDS110-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids110-t.jpg",
    "images": [
      {
        "id": "img-1044759017",
        "image_url": "/images/products/ids110-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2d690e66-fa6d-52d0-be17-f152a695ef45",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS110-E",
    "slug": "ids110-e",
    "sku": "IDS110-E",
    "brand": "NEXO",
    "description": "IDS110-E",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids110-e.jpg",
    "images": [
      {
        "id": "img-1044759016",
        "image_url": "/images/products/ids110-e.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "18f70b35-bbd6-5eaa-a398-19ca3f54dfaa",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS108-T",
    "slug": "ids108-t",
    "sku": "IDS108-T",
    "brand": "NEXO",
    "description": "Với kích thước chỉ 305mm x 305mm x 305mm (12,0 ”x 12,0” x 12,0 ”) và trọng lượng chỉ 8 kg (17,6 lbs), sub tương thích cho ID14 sử dụng thiết kế phản xạ âm trầm hiệu quả cao sử dụng độ rải dài 8 inch Neodymium driver. Phiên bản lắp đặt sẵn với các màu đen, trắng hoặc tùy chỉnh theo yêu cầu. Kết nối được thực hiện thông qua đệm cáp và hai sợi cáp cố định, đảm bảo bảo vệ IP54, trong khi mặt trước được bao phủ bởi một lớp vải cách âm. Với kích thước chỉ 305mm x 305mm x 305mm (12,0 ”x 12,0” x 12,0 ”)",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids108-t.jpg",
    "images": [
      {
        "id": "img-1044759015",
        "image_url": "/images/products/ids108-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "14d95d27-532c-5ef8-b16b-1e00797991d2",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO IDS108-I",
    "slug": "ids108-i",
    "sku": "IDS108-I",
    "brand": "NEXO",
    "description": "IDS108-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/ids108-i.jpg",
    "images": [
      {
        "id": "img-1044759014",
        "image_url": "/images/products/ids108-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d3326cac-05a6-5e37-ab1e-dcb918dfa730",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA CỘT NEXO ID84L-TIS",
    "slug": "id84l-tis",
    "sku": "ID84L-TIS",
    "brand": "NEXO",
    "description": "ID84L-TIS",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id84l-tis.jpg",
    "images": [
      {
        "id": "img-1044759013",
        "image_url": "/images/products/id84l-tis.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "931debf5-ff18-58be-ac1f-03ddfe4cc532",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA CỘT NEXO ID84L-T",
    "slug": "id84l-t",
    "sku": "ID84L-T",
    "brand": "NEXO",
    "description": "ID84L-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id84l-t.jpg",
    "images": [
      {
        "id": "img-1044759012",
        "image_url": "/images/products/id84l-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d4e897b0-5a1c-5e69-885b-2ed27693d5db",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA CỘT NEXO ID84L-I",
    "slug": "id84l-i",
    "sku": "ID84L-I",
    "brand": "NEXO",
    "description": "ID84L-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id84l-i.jpg",
    "images": [
      {
        "id": "img-1044759011",
        "image_url": "/images/products/id84l-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a5991dfb-25bd-5df2-b5e1-4299b1e1ff45",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA CỘT NEXO ID84-TIS",
    "slug": "id84-tis",
    "sku": "ID84-TIS",
    "brand": "NEXO",
    "description": "ID84-TIS",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id84-tis.jpg",
    "images": [
      {
        "id": "img-1044759010",
        "image_url": "/images/products/id84-tis.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c670b4a9-0067-56ca-a09d-f4699283a26c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA CỘT NEXO ID84-T",
    "slug": "id84-t",
    "sku": "ID84-T",
    "brand": "NEXO",
    "description": "ID84-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id84-t.jpg",
    "images": [
      {
        "id": "img-1044759009",
        "image_url": "/images/products/id84-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9f1c78ff-8c45-5a49-9549-39e7f6ab7e76",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA CỘT NEXO ID84-I",
    "slug": "id84-i",
    "sku": "ID84-I",
    "brand": "NEXO",
    "description": "ID84-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id84-i.jpg",
    "images": [
      {
        "id": "img-1044759008",
        "image_url": "/images/products/id84-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6296f56d-e6a1-5eae-bba2-4c021f80fd19",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ID24-T",
    "slug": "id24-t",
    "sku": "ID24-T",
    "brand": "NEXO",
    "description": "ID24-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id24-t.jpg",
    "images": [
      {
        "id": "img-1044759007",
        "image_url": "/images/products/id24-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "daeaf4b6-0715-5b35-b664-9a5234144863",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ID24-I",
    "slug": "id24-i",
    "sku": "ID24-I",
    "brand": "NEXO",
    "description": "ID24-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id24-i.jpg",
    "images": [
      {
        "id": "img-1044759006",
        "image_url": "/images/products/id24-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "69e9b5fd-2ade-595e-ae10-e0fc378f3807",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ID24-C",
    "slug": "id24-c",
    "sku": "ID24-C",
    "brand": "NEXO",
    "description": "ID24-C",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id24-c.jpg",
    "images": [
      {
        "id": "img-1044759005",
        "image_url": "/images/products/id24-c.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e4e5ed23-516b-5f93-b31b-7fcffa6f6d96",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ID14-T",
    "slug": "id14-t",
    "sku": "ID14-T",
    "brand": "NEXO",
    "description": "ID14-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id14-t.jpg",
    "images": [
      {
        "id": "img-1044759004",
        "image_url": "/images/products/id14-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ef152c43-da6b-5073-afd1-7bd39d8ea850",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ID14-I",
    "slug": "id14-i",
    "sku": "ID14-I",
    "brand": "NEXO",
    "description": "Loa công suất lớn nhỏ gọn phiên bản có sẵn với các màu đen, trắng hoặc màu RAL tùy chỉnh và có lớp vải cách âm phía trước lưới tản nhiệt và kết nối cáp 2 lõi cố định. Nhờ thiết kế hoàn toàn đối xứng của chúng, không có phiên bản bên trái hoặc bên phải của ID14, vì vậy tất cả các loa có thể giống nhau để đảm bảo tính linh hoạt tối đa, ID14 có thể được chỉ định với độ phân tán 100 ° x 100 ° hoặc 90 ° x 140 ° HF. CÁC TÍNH NĂNG CHÍNH Loa công suất lớn nhỏ gọn. dải tần lên tới 116 dB SPL Có kích thướ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/id14-i.jpg",
    "images": [
      {
        "id": "img-1044759003",
        "image_url": "/images/products/id14-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a5311d5f-5456-5bc5-8e2d-3bef58c1375c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEOS1230ST-EN54",
    "slug": "geos1230st-en54",
    "sku": "GEOS1230ST-EN54",
    "brand": "NEXO",
    "description": "GEOS1230ST-EN54",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geos1230st-en54.jpg",
    "images": [
      {
        "id": "img-1044759001",
        "image_url": "/images/products/geos1230st-en54.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4b9e7d24-a109-535d-abb5-09dfb2201b0a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEOS1230-EN54",
    "slug": "geos1230-en54",
    "sku": "GEOS1230-EN54",
    "brand": "NEXO",
    "description": "GEOS1230-EN54",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geos1230-en54.jpg",
    "images": [
      {
        "id": "img-1044759000",
        "image_url": "/images/products/geos1230-en54.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "700a300d-eda3-5139-b622-fcb1fdf25472",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEOS1210ST-EN54",
    "slug": "geos1210st-en54",
    "sku": "GEOS1210ST-EN54",
    "brand": "NEXO",
    "description": "GEOS1210ST-EN54",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geos1210st-en54.jpg",
    "images": [
      {
        "id": "img-1044758999",
        "image_url": "/images/products/geos1210st-en54.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b0fdf230-b087-5aa1-a9b9-71c280a726ca",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEOS1210-EN54",
    "slug": "geos1210-en54",
    "sku": "GEOS1210-EN54",
    "brand": "NEXO",
    "description": "GEOS1210-EN54",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geos1210-en54.jpg",
    "images": [
      {
        "id": "img-1044758998",
        "image_url": "/images/products/geos1210-en54.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f6934610-5acd-5cad-a541-f4e9c65029ee",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO S1230-ST",
    "slug": "geo-s1230-st",
    "sku": "GEO S1230-ST",
    "brand": "NEXO",
    "description": "GEO S1230-ST",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/placeholder.jpg",
    "images": [
      {
        "id": "img-1044758997",
        "image_url": "/images/placeholder.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c96197c4-0f84-5d40-bfb1-54afb31eee9e",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO S1230",
    "slug": "geo-s1230",
    "sku": "GEO S1230",
    "brand": "NEXO",
    "description": "GEO S1230",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-s1230.jpg",
    "images": [
      {
        "id": "img-1044758996",
        "image_url": "/images/products/geo-s1230.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c948378a-266e-5116-af69-897caaae55f7",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO S1210-ST",
    "slug": "geo-s1210-st",
    "sku": "GEO S1210-ST",
    "brand": "NEXO",
    "description": "GEO S1210-ST",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/placeholder.jpg",
    "images": [
      {
        "id": "img-1044758995",
        "image_url": "/images/placeholder.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "67ed4e86-2a69-5580-9e57-03d206611e0c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO S1210",
    "slug": "geo-s1210",
    "sku": "GEO S1210",
    "brand": "NEXO",
    "description": "GEO S1210",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-s1210.jpg",
    "images": [
      {
        "id": "img-1044758994",
        "image_url": "/images/products/geo-s1210.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2563bce0-2150-5ddc-90eb-cd443b53735d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M6B",
    "slug": "geo-m6b",
    "sku": "GEO M6B",
    "brand": "NEXO",
    "description": "GEO M6B",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m6b.jpg",
    "images": [
      {
        "id": "img-1044758993",
        "image_url": "/images/products/geo-m6b.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2f33efbd-eaee-5db4-901d-4191065f53e1",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M620",
    "slug": "geo-m620",
    "sku": "GEO M620",
    "brand": "NEXO",
    "description": "GEO M620",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m620.jpg",
    "images": [
      {
        "id": "img-1044758992",
        "image_url": "/images/products/geo-m620.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4d299612-0121-5348-8bfe-33c22ee41d87",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1220-I",
    "slug": "geo-m1220-i",
    "sku": "GEO M1220-I",
    "brand": "NEXO",
    "description": "GEO M1220-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1220-i.jpg",
    "images": [
      {
        "id": "img-1044758989",
        "image_url": "/images/products/geo-m1220-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ed1b0f59-4637-58f6-8f07-c34504e83aae",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1220",
    "slug": "geo-m1220",
    "sku": "GEO M1220",
    "brand": "NEXO",
    "description": "GEO M1220",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1220.jpg",
    "images": [
      {
        "id": "img-1044758988",
        "image_url": "/images/products/geo-m1220.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3fdceba8-e723-5a96-9a6c-33ab41765a7f",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1210-I",
    "slug": "geo-m1210-i",
    "sku": "GEO M1210-I",
    "brand": "NEXO",
    "description": "GEO M1210-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1210-i.jpg",
    "images": [
      {
        "id": "img-1044758987",
        "image_url": "/images/products/geo-m1210-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d856b7ab-6927-53e9-8b93-9def9c34e8a6",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1210",
    "slug": "geo-m1210",
    "sku": "GEO M1210",
    "brand": "NEXO",
    "description": "GEO M1210 là phần tử mảng dòng thụ động hoặc chủ động 2 chiều với các trình điều khiển HF 12 ″ LF và 3 ″ voice coil / 1.4 ″ họng. Với kích thước rộng 700mm x cao 370mm x sâu 446mm và nặng 34kg, GEO M1220 là phiên bản lưu diễn của GEOM12 với độ phân tán thẳng đứng 10 °. Tủ loa có thể được thiết lập để phân tán ngang 80 ° hoặc 120 ° bằng cách sử dụng mặt bích từ tính trong ống dẫn sóng mà không cần dụng cụ. Các ngăn tủ được làm từ vật liệu đồng polyme urethane có cấu trúc tổ ong và có tính năng lắ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1210.jpg",
    "images": [
      {
        "id": "img-1044758986",
        "image_url": "/images/products/geo-m1210.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3d4775e8-1987-58ed-a5a3-5a328f59848c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1025-I",
    "slug": "geo-m1025-i",
    "sku": "GEO M1025-I",
    "brand": "NEXO",
    "description": "GEO M1025-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1025-i.jpg",
    "images": [
      {
        "id": "img-1044758985",
        "image_url": "/images/products/geo-m1025-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f7a6283a-d82a-5c0e-8060-287b30b2fc3d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1025",
    "slug": "geo-m1025",
    "sku": "GEO M1025",
    "brand": "NEXO",
    "description": "GEO M1025",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1025.jpg",
    "images": [
      {
        "id": "img-1044758984",
        "image_url": "/images/products/geo-m1025.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c9566cf9-7a4d-5fae-8f40-315f65659ab2",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1012-I",
    "slug": "geo-m1012-i",
    "sku": "GEO M1012-I",
    "brand": "NEXO",
    "description": "GEO M1012-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1012-i.jpg",
    "images": [
      {
        "id": "img-1044758983",
        "image_url": "/images/products/geo-m1012-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d3a62403-632d-55b7-8834-dcce89f8d53d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG LINE ARRAY NEXO GEO M1012",
    "slug": "geo-m1012",
    "sku": "GEO M1012",
    "brand": "NEXO",
    "description": "GEO M1012",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/geo-m1012.jpg",
    "images": [
      {
        "id": "img-1044758982",
        "image_url": "/images/products/geo-m1012.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "02b7187f-5ac7-54f8-8b85-016328c40d6f",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ePS8",
    "slug": "eps8",
    "sku": "ePS8",
    "brand": "NEXO",
    "description": "ePS8",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/eps8.jpg",
    "images": [
      {
        "id": "img-1044758981",
        "image_url": "/images/products/eps8.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bb054846-c5c8-55df-ab5b-16c178183401",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG NEXO ePS6",
    "slug": "eps6",
    "sku": "ePS6",
    "brand": "NEXO",
    "description": "ePS6",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/eps6.jpg",
    "images": [
      {
        "id": "img-1044758980",
        "image_url": "/images/products/eps6.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4c2e609e-fb10-581f-b4aa-c58394f9fe3a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA THÙNG PASSIVE NEXO ePS10",
    "slug": "eps10",
    "sku": "ePS10",
    "brand": "NEXO",
    "description": "ePS10",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/eps10.jpg",
    "images": [
      {
        "id": "img-1044758979",
        "image_url": "/images/products/eps10.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1bf59089-324e-5266-96e5-8b1e9869f453",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO eLS600",
    "slug": "els600",
    "sku": "eLS600",
    "brand": "NEXO",
    "description": "eLS600",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/els600.jpg",
    "images": [
      {
        "id": "img-1044758978",
        "image_url": "/images/products/els600.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3647cc92-e816-50b7-8cfe-e6258feb1894",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA SUB NEXO eLS400",
    "slug": "els400",
    "sku": "eLS400",
    "brand": "NEXO",
    "description": "eLS400",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/els400.jpg",
    "images": [
      {
        "id": "img-1044758976",
        "image_url": "/images/products/els400.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0aedea67-5bdc-52df-8002-1013610de40a",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO DTDAMP4X1.3",
    "slug": "dtdamp4x1-3",
    "sku": "DTDAMP4X1.3",
    "brand": "NEXO",
    "description": "DTDAMP bao gồm hai mẫu bộ khuếch đại bốn kênh được đặt trong giá đỡ 1U và trọng lượng chỉ 7,5 Kg. Bộ điều khiển DTD cung cấp một giải pháp rất hiệu quả để xử lý hầu hết các Loa Nexo, từ dòng ID đến PS15 nổi tiếng thế giới. Khi được sử dụng với DTDAMP, bạn chắc chắn có được tất cả công suất cần thiết cho loa NEXO của mình, đồng thời bộ kết hợp này vừa mang lại vẻ ngoài mạch lạc vừa dễ sử dụng. TÍNH NĂNG CHÍNH Hai mẫu bộ khuếch đại bốn kênh công suất cao, nhẹ Kết hợp hoàn hảo cho loa NEXO được hỗ ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/dtdamp4x1-3.jpg",
    "images": [
      {
        "id": "img-1044758975",
        "image_url": "/images/products/dtdamp4x1-3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6146d93b-56c0-5a37-ac71-6e76841ac61b",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NEXO DTDAMP4X0.7",
    "slug": "dtdamp4x0-7",
    "sku": "DTDAMP4X0.7",
    "brand": "NEXO",
    "description": "DTDAMP4X0.7",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/dtdamp4x0-7.jpg",
    "images": [
      {
        "id": "img-1044758974",
        "image_url": "/images/products/dtdamp4x0-7.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ac065c13-399a-5fba-8cb4-0998336c94f6",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "THIẾT BỊ XỬ LÝ TÍN HIỆU NEXO DTD-T",
    "slug": "dtd-t",
    "sku": "DTD-T",
    "brand": "NEXO",
    "description": "DTD-T",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/dtd-t.jpg",
    "images": [
      {
        "id": "img-1044758973",
        "image_url": "/images/products/dtd-t.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1bd01af0-e3d7-5d46-af71-5cd622a22cb3",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "THIẾT BỊ XỬ LÝ TÍN HIỆU DTD-I",
    "slug": "dtd-i",
    "sku": "DTD-I",
    "brand": "NEXO",
    "description": "DTD-I",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/dtd-i.jpg",
    "images": [
      {
        "id": "img-1044758972",
        "image_url": "/images/products/dtd-i.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "28d866e7-354b-51ab-b340-be67a97bf287",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "THIẾT BỊ XỬ LÝ TÍN HIỆU NEXO DPU",
    "slug": "dpu",
    "sku": "DPU",
    "brand": "NEXO",
    "description": "DPU",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/dpu.jpg",
    "images": [
      {
        "id": "img-1044758970",
        "image_url": "/images/products/dpu.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e134856a-9958-57a3-9f0e-2100501fe430",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "THIẾT BỊ XỬ LÝ TÍN HIỆU NEXO DMU",
    "slug": "dmu",
    "sku": "DMU",
    "brand": "NEXO",
    "description": "DMU",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/dmu.jpg",
    "images": [
      {
        "id": "img-1044758969",
        "image_url": "/images/products/dmu.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d2d97eaa-679f-5233-a3dd-12ebc54ae2e5",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA MONITOR NEXO 45N12",
    "slug": "45n12",
    "sku": "45N12",
    "brand": "NEXO",
    "description": "45N12",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/45n12.jpg",
    "images": [
      {
        "id": "img-1044758968",
        "image_url": "/images/products/45n12.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "06532119-bad0-536f-a425-881fb07ed869",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ SUBWOOFER ACTIVE XPRS1182S",
    "slug": "xprs1182s",
    "sku": "XPRS1182S",
    "brand": "Pioneer DJ",
    "description": "LOA SUBWOOFER ACTIVE XPRS1182S Loa subwoofer active XPRS1152S sử dụng một loa bass từ Ferrite 4 tấc (15”) với coil loa 76mm (3”) với hành trình dài cho ra tần số thấp với độ chính xác cao nhất. Hãng Pioneer DJ giới thiệu dòng loa XPRS2 với hai loa full range (toàn dải) và hai loa subwoofer (siêu trầm) active mới, hoàn chỉnh với các thành phần hiệu suất cao và cài đặt DSP chuyên dụng để người dùng có trải nghiệm nghe đắm chìm trong âm nhạc. Dòng loa XPRS2 kết hợp tính linh hoạt và tính di động củ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/xprs1182s.png",
    "images": [
      {
        "id": "img-1044750559",
        "image_url": "/images/products/xprs1182s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b89e22f0-a107-58f5-a5f6-1eb53fb74c3f",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ SUBWOOFER ACTIVE XPRS1152S",
    "slug": "xprs1152s",
    "sku": "XPRS1152S",
    "brand": "Pioneer DJ",
    "description": "LOA SUBWOOFER ACTIVE XPRS1152S Loa subwoofer active XPRS1152S sử dụng một loa bass từ Ferrite 4 tấc (15”) với coil loa 76mm (3”) với hành trình dài cho ra tần số thấp với độ chính xác cao nhất. Hãng Pioneer DJ giới thiệu dòng loa XPRS2 với hai loa full range (toàn dải) và hai loa subwoofer (siêu trầm) active mới, hoàn chỉnh với các thành phần hiệu suất cao và cài đặt DSP chuyên dụng để người dùng có trải nghiệm nghe đắm chìm trong âm nhạc. Dòng loa XPRS2 kết hợp tính linh hoạt và tính di động củ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/xprs1152s.png",
    "images": [
      {
        "id": "img-1044733175",
        "image_url": "/images/products/xprs1152s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bd8bbab7-1ff7-5336-979f-94d142f7efba",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ FULL RANGE XPRS122",
    "slug": "xprs122",
    "sku": "XPRS122",
    "brand": "Pioneer DJ",
    "description": "LOA FULL RANGE XPRS122 Loa full range XPRS122 là phiên bản loa full ranger lớn hơn trong dòng loa XPRS2 của Pioneer DJ . Với loa bass 3 tấc (12\") với coil loa 76mm (3\") và loa treble 450mm với họng thoát âm 25mm, loa mang đến vùng phủ sóng âm thanh toàn diện cho khán giả và địa điểm tổ chức từ trung bình đến lớn. Tự hào với dải tần đáp ứng từ 48 Hz - 20 kHz và mức áp suất âm thanh đầu ra tối đa (SPL) tối đa là 131 dB , Loa full range XPRS122 linh hoạt mang đến âm thanh mạnh mẽ được thiết kế để p",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/xprs122.png",
    "images": [
      {
        "id": "img-1044725128",
        "image_url": "/images/products/xprs122.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "71ae3cdd-c49e-5a6c-8f7b-c65fcbce43f6",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ FULL RANGE ACTIVE XPRS102",
    "slug": "xprs102",
    "sku": "XPRS102",
    "brand": "Pioneer DJ",
    "description": "LOA FULL RANGE XPRS102 Loa full range XPRS102 kết hợp một loa bass rời 2 tấc rưỡi (10\") với coil loa 64mm và củ loa treble 450mm với họng thoát âm 25mm để mang lại hiệu suất âm thanh nguyên sơ. Hoàn thiện với mức áp suất âm thanh đầu ra tối đa (SPL) là 129 dB và đáp ứng tần số từ 50 Hz - 20 kHz , loa full range XPRS102 giúp đảm bảo việc tái tạo âm nhạc và lời nói chính xác và hoạt động như mong muốn. Hãng Pioneer DJ giới thiệu dòng loa XPRS2 với hai loa full range (toàn dải) và hai loa subwoofer",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/xprs102.png",
    "images": [
      {
        "id": "img-1044723913",
        "image_url": "/images/products/xprs102.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "87e83ac8-1917-5a21-9e9e-5a193769f14c",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CỔ NGỖNG OPTIMUS ME-F45D",
    "slug": "me-f45d",
    "sku": "ME-F45D",
    "brand": "OPTIMUS",
    "description": "MICRO CỔ NGỖNG OPTIMUS ME-F45D Micrô cổ ngỗng OPTIMUS ME-F45D linh hoạt với đầu nối XLR để cắm vào đế. Chiều dài thân micro 45mm Thích hợp cho các hội nghị, phòng họp, nhà thờ v.v.. THÔNG SỐ KỸ THUẬT MICRO CỔ NGỖNG OPTIMUS ME-F45D Đầu Micro Condenser electret Cardioide Nguồn ảo 9 - 52V Trở kháng đầu ra 1.000 ohms, cân bằng Đáp ứng tần số 150 ~ 16.000 Hz Độ nhạy đầu ra - 30 dB kết nối XLR Kích thước (mm) Ø 8 x 25, thân cổ ngỗng dài 450 Trọng lượng 170g Vỏ kim loại, màu đen",
    "sale_enabled": true,
    "sale_price": 6080400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/me-f45d.png",
    "images": [
      {
        "id": "img-1044598717",
        "image_url": "/images/products/me-f45d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1a8bc1e8-3220-545a-a2ba-c52e4f3efd69",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "ĐẾ MICRO CỔ NGỖNG OPTIMUS B-F 50XS",
    "slug": "b-f-50xs",
    "sku": "B-F 50XS",
    "brand": "OPTIMUS",
    "description": "ĐẾ MICRO CỔ NGỖNG OPTIMUS B-F 50XS Đế Micro Tụ Điện Cổ ngỗng OPTIMUS B-F 50XS sử dụng đầu nối XLR, công tắc bật/tắt dạng trượt và đèn LED để chỉ báo micro đang hoạt động. Hỗ trợ Micro cổ ngỗng dynamic, mciro cỗ ngỗng condenser electret unbalanced (sử dụng nguồn pin AA) và mciro cỗ ngỗng condenser electret balanced (sử dụng nguồn pin AA hoặc nguồn phantom). THÔNG SỐ KỸ THUẬT ĐẾ MICRO CỔ NGỖNG OPTIMUS B-F 50XS Đáp ứng tần số : 20 ~ 20.000 Hz Kết nối đầu vào : XLR Cái kết nối đầu ra : XLR Đực Nguồn",
    "sale_enabled": true,
    "sale_price": 2791800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/b-f-50xs.png",
    "images": [
      {
        "id": "img-1044598708",
        "image_url": "/images/products/b-f-50xs.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1485a8cf-8163-5c31-a55f-8b2ccea38a61",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPRT",
    "slug": "kik3-opprt",
    "sku": "KIK3.OPPRT",
    "brand": "KLOTZ",
    "description": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPRT 3M Dây cáp tín hiệu kết nối đàn organ và đàn guitar KIK thuộc dòng entry-level của KLOTZ được biết đến là loại cáp vừa tốt vừa rẻ. Kỹ thuật gia công đặc biệt bằng cách hàn và tạo nếp gấp được phát triển bởi KLOTZ, làm cho mối liên kết giữa cáp và đầu nối gần như không thể phá hủy. Đầu nối KIK có sẵn bằng đồng thau mạ niken hoặc đầu mạ vàng và do đó đảm bảo tuổi thọ sử dụng lâu dài. Cáp có tiết diện 0,22 mm² được che chắn kép bởi một lớp vật liệu nhựa và ",
    "sale_enabled": true,
    "sale_price": 500000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/kik3-opprt.png",
    "images": [
      {
        "id": "img-1043843580",
        "image_url": "/images/products/kik3-opprt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0d4b4eb9-a04b-5ec6-b950-494c1a3d6ef8",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPGN",
    "slug": "kik3-oppgn",
    "sku": "KIK3.OPPGN",
    "brand": "KLOTZ",
    "description": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPGN 3M Dây cáp tín hiệu kết nối đàn organ và đàn guitar KIK thuộc dòng entry-level của KLOTZ được biết đến là loại cáp vừa tốt vừa rẻ. Kỹ thuật gia công đặc biệt bằng cách hàn và tạo nếp gấp được phát triển bởi KLOTZ, làm cho mối liên kết giữa cáp và đầu nối gần như không thể phá hủy. Đầu nối KIK có sẵn bằng đồng thau mạ niken hoặc đầu mạ vàng và do đó đảm bảo tuổi thọ sử dụng lâu dài. Cáp có tiết diện 0,22 mm² được che chắn kép bởi một lớp vật liệu nhựa và ",
    "sale_enabled": true,
    "sale_price": 500000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/kik3-oppgn.png",
    "images": [
      {
        "id": "img-1043843577",
        "image_url": "/images/products/kik3-oppgn.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a56b4376-1153-59dc-8aa5-69422ac1daad",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPGE",
    "slug": "kik3-oppge",
    "sku": "KIK3.OPPGE",
    "brand": "KLOTZ",
    "description": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPGE 3M Dây cáp tín hiệu kết nối đàn organ và đàn guitar KIK thuộc dòng entry-level của KLOTZ được biết đến là loại cáp vừa tốt vừa rẻ. Kỹ thuật gia công đặc biệt bằng cách hàn và tạo nếp gấp được phát triển bởi KLOTZ, làm cho mối liên kết giữa cáp và đầu nối gần như không thể phá hủy. Đầu nối KIK có sẵn bằng đồng thau mạ niken hoặc đầu mạ vàng và do đó đảm bảo tuổi thọ sử dụng lâu dài. Cáp có tiết diện 0,22 mm² được che chắn kép bởi một lớp vật liệu nhựa và ",
    "sale_enabled": true,
    "sale_price": 500000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/kik3-oppge.png",
    "images": [
      {
        "id": "img-1043843567",
        "image_url": "/images/products/kik3-oppge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f05e1d4d-2013-5e2f-beda-135a42196ca2",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPBL",
    "slug": "kik3-oppbl",
    "sku": "KIK3.OPPBL",
    "brand": "KLOTZ",
    "description": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPBL 3M Dây cáp tín hiệu kết nối đàn organ và đàn guitar KIK thuộc dòng entry-level của KLOTZ được biết đến là loại cáp vừa tốt vừa rẻ. Kỹ thuật gia công đặc biệt bằng cách hàn và tạo nếp gấp được phát triển bởi KLOTZ, làm cho mối liên kết giữa cáp và đầu nối gần như không thể phá hủy. Đầu nối KIK có sẵn bằng đồng thau mạ niken hoặc đầu mạ vàng và do đó đảm bảo tuổi thọ sử dụng lâu dài. Cáp có tiết diện 0,22 mm² được che chắn kép bởi một lớp vật liệu nhựa và ",
    "sale_enabled": true,
    "sale_price": 550000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/kik3-oppbl.png",
    "images": [
      {
        "id": "img-1043843555",
        "image_url": "/images/products/kik3-oppbl.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e779ac02-3909-51d3-a76e-ec39da375513",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPSW",
    "slug": "kik3-oppsw",
    "sku": "KIK3.OPPSW",
    "brand": "KLOTZ",
    "description": "DÂY CÁP TÍN HIỆU NHẠC CỤ KLOTZ KIK3.OPPSW 3M Dây cáp tín hiệu kết nối đàn organ và đàn guitar KIK thuộc dòng entry-level của KLOTZ được biết đến là loại cáp vừa tốt vừa rẻ. Kỹ thuật gia công đặc biệt bằng cách hàn và tạo nếp gấp được phát triển bởi KLOTZ, làm cho mối liên kết giữa cáp và đầu nối gần như không thể phá hủy. Đầu nối KIK có sẵn bằng đồng thau mạ niken hoặc đầu mạ vàng và do đó đảm bảo tuổi thọ sử dụng lâu dài. Cáp có tiết diện 0,22 mm² được che chắn kép bởi một lớp vật liệu nhựa và ",
    "sale_enabled": true,
    "sale_price": 500000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/kik3-oppsw.png",
    "images": [
      {
        "id": "img-1043843500",
        "image_url": "/images/products/kik3-oppsw.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "54b4b5cc-8a21-5331-b5e0-593f8da65f85",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY FOX AUDIO X7",
    "slug": "x7",
    "sku": "X7",
    "brand": "FOX",
    "description": "MICRO KHÔNG DÂY FOX AUDIO X7 Micro không dây X7 có kiểu dáng thiết kế tinh tế cùng chất lượng âm thanh trong treo, công suất hoạt động tốt đáp ưng nhu cầu sử dụng từ các phòng karaoke gia đình đến các sân khấu biểu diễn lớn, phát thanh truyền hình hay hội nghị. Micro không dây X7 có khả năng chống hú rít tốt đảm bảo an toàn khi sử dụng, ngay khi bạn đứng gần loa hay sử dụng nhiều micro cùng lúc cũng không phải lo lắng hú rít.Đầu mic có độ nhạy cao bắt âm mạnh hỗ trợ những ai có giọng yếu hoặc há",
    "sale_enabled": true,
    "sale_price": 7538400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/x7.png",
    "images": [
      {
        "id": "img-1043828228",
        "image_url": "/images/products/x7.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ac2d99ed-1809-532d-9e00-00ab39eb8923",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY FOX AUDIO X6",
    "slug": "x6",
    "sku": "X6",
    "brand": "FOX",
    "description": "MICRO KHÔNG DÂY FOX AUDIO X6 Micro không dây X6 có kiểu dáng thiết kế tinh tế cùng chất lượng âm thanh trong treo, công suất hoạt động tốt đáp ưng nhu cầu sử dụng từ các phòng karaoke gia đình đến các sân khấu biểu diễn lớn, phát thanh truyền hình hay hội nghị. Micro không dây X6 có khả năng chống hú rít tốt đảm bảo an toàn khi sử dụng, ngay khi bạn đứng gần loa hay sử dụng nhiều micro cùng lúc cũng không phải lo lắng hú rít.Đầu mic có độ nhạy cao bắt âm mạnh hỗ trợ những ai có giọng yếu hoặc há",
    "sale_enabled": true,
    "sale_price": 3078000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/x6.png",
    "images": [
      {
        "id": "img-1043828204",
        "image_url": "/images/products/x6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b21dc06f-c7d2-5e3f-be29-cd23ffe92495",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "Loa Sub Rời  B&C SPEAKERS 5 tấc  18NW100",
    "slug": "loa-sub-roi-b-c-speakers-5-tac-18nw100",
    "sku": "VB-1043780809",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18NW100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18NW100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1200 W , công suất chương trình liên tục 2400 W , độ nhạy 98 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18NW100 Công suất chương trình liên tục 2400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 98 dB Cụm nam châm Neodymium được tối ưu bằng FEA Nhện loa đ",
    "sale_enabled": true,
    "sale_price": 14761440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18nw100.jpg",
    "images": [
      {
        "id": "img-1043780809",
        "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18nw100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e8713ba7-3fce-5d1b-a658-3f8fe65ba0ed",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "HỆ THỐNG KHÔNG DÂY CHO NHẠC CỤ SENNHEISER EW-D Ci1 SET",
    "slug": "ew-d-ci1-set",
    "sku": "EW-D Ci1 SET",
    "brand": "SENNHEISER",
    "description": "EW-D CI1 SET Dòng sản phẩm không dây Sennheiser EVOLUTION WIRELESS DIGITAL là giải pháp kết nối không dây kỹ thuật số kỷ nguyên 4.0 với yếu tố đầu vào #highestdynamicrange cao nhất và với độ trễ tín hiệu #lowestlatency 1.9ms thấp nhất so với bất kỳ hệ thống không dây kỹ thuật số nào trên thị trường. Dòng sản phẩm EVOLUTION WIRELESS DIGITAL #EWD của #Sennheiser tự động đảm bảo tín hiệu đáng tin cậy nhất trong vòng vài giây và có thể mở rộng lên đến 90 kênh. Tính năng điều khiển mới giúp người dùn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-d-ci1-set.png",
    "images": [
      {
        "id": "img-1043739229",
        "image_url": "/images/products/ew-d-ci1-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "37d846ae-fcc6-5d59-9214-cc48c07852a6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ TRUYỀN PHÁT KHÔNG DÂY SENNHEISER EW-D SKM-S BASE SET",
    "slug": "bo-truyen-phat-khong-day-sennheiser-ew-d-skm-s-base-set",
    "sku": "EW-D-SKM-S-BASE-SET",
    "brand": "SENNHEISER",
    "description": "Micro Không Dây Sennheiser EW-D SKM-S Base Set Hệ Thống Micro Cầm Tay Chuyên Nghiệp Cho Âm Thanh Đỉnh Cao Sennheiser EW-D SKM-S Base Set là hệ thống micro không dây cao cấp được thiết kế để mang lại âm thanh trung thực và ổn định trong các buổi biểu diễn trực tiếp, hội nghị, sự kiện và chương trình truyền hình. Bộ sản phẩm này bao gồm bộ phát cầm tay SKM-S và bộ nhận tín hiệu, sử dụng công nghệ không dây kỹ thuật số của Sennheiser, đảm bảo tín hiệu âm thanh rõ ràng, không nhiễu và khả năng kết n",
    "sale_enabled": true,
    "sale_price": 16500000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/bo-truyen-phat-khong-day-sennheiser-ew-d-skm-s-base-set.png",
    "images": [
      {
        "id": "img-1043738686",
        "image_url": "/images/products/bo-truyen-phat-khong-day-sennheiser-ew-d-skm-s-base-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cc905547-b13d-574c-94e0-6f7b8b9a60ea",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ PHÁT VÀ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EW-D SK SET",
    "slug": "ew-d-sk-set",
    "sku": "EWDSK",
    "brand": "SENNHEISER",
    "description": "EW-D SK BASE SET Dòng sản phẩm không dây Sennheiser EVOLUTION WIRELESS DIGITAL là giải pháp kết nối không dây kỹ thuật số kỷ nguyên 4.0 với yếu tố đầu vào #highestdynamicrange cao nhất và với độ trễ tín hiệu #lowestlatency 1.9ms thấp nhất so với bất kỳ hệ thống không dây kỹ thuật số nào trên thị trường. Dòng sản phẩm EVOLUTION WIRELESS DIGITAL #EWD của #Sennheiser tự động đảm bảo tín hiệu đáng tin cậy nhất trong vòng vài giây và có thể mở rộng lên đến 90 kênh. Tính năng điều khiển mới giúp người",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ew-d-sk-set.png",
    "images": [
      {
        "id": "img-1043738336",
        "image_url": "/images/products/ew-d-sk-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "02969417-2103-5795-806d-282fc7a517c4",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW-D ME2 / 835-S COMBO SET",
    "slug": "micro-khong-day-sennheiser-ew-d-me2-835-s-combo-set",
    "sku": "EWDME2835S",
    "brand": "SENNHEISER",
    "description": "Micro Không Dây Sennheiser EW-D ME2 / 835-S Combo Set Hệ Thống Kết Hợp Đa Năng Cho Âm Thanh Chuyên Nghiệp Sennheiser EW-D ME2 / 835-S Combo Set là hệ thống micro không dây chuyên nghiệp, kết hợp giữa micro cài áo ME2 và micro cầm tay 835-S, mang đến sự linh hoạt và tiện lợi tối đa cho người dùng. Đây là lựa chọn lý tưởng cho các diễn giả, nghệ sĩ, và những người dẫn chương trình cần khả năng di chuyển tự do mà vẫn đảm bảo chất lượng âm thanh rõ ràng, sắc nét. Với công nghệ không dây kỹ thuật số ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-sennheiser-ew-d-me2-835-s-combo-set.png",
    "images": [
      {
        "id": "img-1043737237",
        "image_url": "/images/products/micro-khong-day-sennheiser-ew-d-me2-835-s-combo-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "806f0a35-9d5a-53c6-9228-f2415525460c",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY GÀI ÁO SENNHEISER EW-D ME4 SET",
    "slug": "ew-d-me-4-set",
    "sku": "EWDME4",
    "brand": "SENNHEISER",
    "description": "EW-D ME4 SET Dòng sản phẩm không dây Sennheiser EVOLUTION WIRELESS DIGITAL là giải pháp kết nối không dây kỹ thuật số kỷ nguyên 4.0 với yếu tố đầu vào #highestdynamicrange cao nhất và với độ trễ tín hiệu #lowestlatency 1.9ms thấp nhất so với bất kỳ hệ thống không dây kỹ thuật số nào trên thị trường. Dòng sản phẩm EVOLUTION WIRELESS DIGITAL #EWD của #Sennheiser tự động đảm bảo tín hiệu đáng tin cậy nhất trong vòng vài giây và có thể mở rộng lên đến 90 kênh. Tính năng điều khiển mới giúp người dùn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/ew-d-me-4-set.png",
    "images": [
      {
        "id": "img-1043736642",
        "image_url": "/images/products/ew-d-me-4-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "aa6940a6-4a54-505e-9630-9f76d9eaaa92",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY GÀI ÁO SENNHEISER EW-D ME2 SET",
    "slug": "ew-d-me-2-set",
    "sku": "EW_D_ME2_SET",
    "brand": "SENNHEISER",
    "description": "MICRO KHÔNG DÂY GÀI ÁO SENNHEISER EW-D ME2 SET Dòng sản phẩm không dây Sennheiser EVOLUTION WIRELESS DIGITAL là giải pháp kết nối không dây kỹ thuật số kỷ nguyên 4.0 với yếu tố đầu vào #highestdynamicrange cao nhất và với độ trễ tín hiệu #lowestlatency 1.9ms thấp nhất so với bất kỳ hệ thống không dây kỹ thuật số nào trên thị trường. Dòng sản phẩm EVOLUTION WIRELESS DIGITAL #EWD của #Sennheiser tự động đảm bảo tín hiệu đáng tin cậy nhất trong vòng vài giây và có thể mở rộng lên đến 90 kênh. Tính ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ew-d-me-2-set.png",
    "images": [
      {
        "id": "img-1043736176",
        "image_url": "/images/products/ew-d-me-2-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3bfe05b5-ace6-5208-9b78-dd9030d318be",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-FLX4",
    "slug": "ddj-flx4",
    "sku": "DDJ-FLX4",
    "brand": "Pioneer DJ",
    "description": "DJ CONTROLLER DDJ-FLX4 DDJ FLX4 là bộ điều khiển controller 2 kênh phân khúc giá rẻ với thiết kế đơn giản, thân thiện với người dùng nhưng vẫn tạo cho người sử dụng cảm giác chuyên nghiệp. Bạn có thể sử dụng rekordbox và Serato DJ Lite chỉ cần kết nối DDJ-FLX4 với PC/Mac TÍNH NĂNG DJ CONTROLLER DDJ-FLX4 Tương Thích Với Cả Rekordbox DJ Và Serato DJ Bạn có thể sử dụng rekordbox và Serato DJ Lite chỉ cần kết nối DDJ-FLX4 với PC/Mac. Nếu bạn muốn sử dụng DDJ-FLX4 cùng Serato DJ Pro, bạn có thể mua l",
    "sale_enabled": true,
    "sale_price": 11650000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-flx4.png",
    "images": [
      {
        "id": "img-1043499095",
        "image_url": "/images/products/ddj-flx4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4373c38c-dade-5bb0-8e18-9ed15ff5ed17",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "Tai nghe Sennheiser HD 25",
    "slug": "tai-nghe-sennheiser-hd-25",
    "sku": "HD25",
    "brand": "SENNHEISER",
    "description": "HEADPHONE SENNHEISER HD 25 Được coi là \"Tiêu chuẩn công nghiệp\" dành cho DJ, HD 25 có thể được tìm thấy tại các DJ Booth trên toàn thế giới. Hoạt động cực kỳ tốt trong môi trường ồn ào. Do trọng lượng nhẹ và có thể nghe bằng một bên tai, tai nghe HD 25 là thiết bị tai nghe di động không thể thiếu. Tai nghe HD25 là tai nghe kiểm âm chuyên nghiệp được thiết kế riêng, có khả năng giảm tiếng ồn nền cao. Có khả năng xử lý mức áp suất âm thanh rất cao và cấu trúc cực kỳ chắc chắn, những chiếc tai nghe",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 7,
    "is_active": true,
    "image_url": "/images/products/tai-nghe-sennheiser-hd-25.png",
    "images": [
      {
        "id": "img-1043347109",
        "image_url": "/images/products/tai-nghe-sennheiser-hd-25.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "84e99c7c-947f-5877-8e64-3b5c2fda6019",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY GÀI ĐẦU SENNHEISER EW-D ME3 SET",
    "slug": "micro-khong-day-gai-dau-sennheiser-ew-d-me3-set",
    "sku": "EW-D ME3 SET",
    "brand": "SENNHEISER",
    "description": "Micro Không Dây Sennheiser EW-D ME3 SET (Micro Cài Đầu Cardioid – Digital UHF) Âm Thanh Chuyên Nghiệp Đỉnh Cao Cho Biểu Diễn Và Thuyết Trình Bạn cần giọng nói rõ – đứng “trước mix” – rảnh tay để dẫn chương trình, dạy học/HLV, biểu diễn hay nhạc kịch? Sennheiser EW-D ME3 SET là bộ micro cài đầu (headset) digital UHF đi kèm ME 3 cardioid giúp tăng độ rõ, hạn chế hú rít và giữ tín hiệu ổn định khi di chuyển. Điểm nổi bật khiến EW-D ME3 SET “đáng tiền” cho sân khấu & thuyết trình 1) Digital UHF: sạc",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-gai-dau-sennheiser-ew-d-me3-set.png",
    "images": [
      {
        "id": "img-1043186161",
        "image_url": "/images/products/micro-khong-day-gai-dau-sennheiser-ew-d-me3-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3e1e20ed-8954-5f27-bcc1-b3e054ed9252",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA MONITOR BEHRINGER EUROLIVE B205D",
    "slug": "b205d",
    "sku": "B205D",
    "brand": "BEHRINGER",
    "description": "LOA MONITOR BEHRINGER EUROLIVE B205D Loa monitor Behringer Eurolive B205D siêu nhỏ gọn tích hợp công suất 150 Watts Class-D tuyệt vời vào một hệ thống loa rất nhẹ, bạn có thể gắn nó lên giá đỡ micro và hướng nó ngay vào tai - để làm loa monitor cá nhân hoàn hảo. Nhưng đừng để kích thước nhỏ đánh lừa bạn - Loa monitor Behringer Eurolive B205D tạo ra âm thanh chất lượng cao, đủ để phục vụ như một hệ thống PA cho các buổi biểu diễn nhỏ và cuộc họp thân mật hơn của bạn ! Nhờ công suất khuếch đại Cla",
    "sale_enabled": true,
    "sale_price": 5907600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 3,
    "is_active": true,
    "image_url": "/images/products/b205d.png",
    "images": [
      {
        "id": "img-1043108419",
        "image_url": "/images/products/b205d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "18f2079e-0531-51e8-85fd-90f47636aadc",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG MIDAS VF32",
    "slug": "vf32",
    "sku": "VF32",
    "brand": "MIDAS",
    "description": "MIXER ANALOG MIDAS VF32 MIXER MIDAS VF32 là nền tảng để Mix âm thanh, ghi và xử lý tín hiệu hoàn toàn nhờ tích hợp giao diện âm thanh kỹ thuật số FireWire có khả năng hỗ trợ lên đến 32 x 32 kênh âm thanh 24 bit chất lượng cao. MIXER MIDAS VF32 hybrid thu hẹp khoảng cách giữa bảng điều khiển âm thanh analog và kỹ thuật số, đồng thời cung cấp cho người dùng sự dễ sử dụng, cảm giác và độ trễ bằng không của tín hiệu tương tự, kết hợp với sức mạnh, sự lựa chọn và tính linh hoạt của xử lý kỹ thuật số ",
    "sale_enabled": true,
    "sale_price": 172245960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 4,
    "is_active": true,
    "image_url": "/images/products/vf32.png",
    "images": [
      {
        "id": "img-1043087780",
        "image_url": "/images/products/vf32.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3b8d0fdc-b977-5e30-962d-dd8fa2d63724",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG MIDAS VF24",
    "slug": "vf24",
    "sku": "VF24",
    "brand": "MIDAS",
    "description": "MIXER ANALOG MIDAS VF24 MIXER MIDAS VF24 không chỉ là một bảng điều khiển âm thanh trực tiếp nhỏ gọn, còn là nền tảng để Mix âm thanh, ghi và xử lý tín hiệu hoàn toàn nhờ tích hợp giao diện âm thanh kỹ thuật số FireWire có khả năng hỗ trợ lên đến 24 x 24 kênh âm thanh 24 bit chất lượng cao. MIXER MIDAS VF24 hybrid thu hẹp khoảng cách giữa bảng điều khiển âm thanh analog và kỹ thuật số, đồng thời cung cấp cho người dùng sự dễ sử dụng, cảm giác và độ trễ bằng không của tín hiệu tương tự, kết hợp v",
    "sale_enabled": true,
    "sale_price": 137346840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vf24.png",
    "images": [
      {
        "id": "img-1043083603",
        "image_url": "/images/products/vf24.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cc1a87ba-8aac-5702-90d6-49d1097da1e4",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW-D 835-S",
    "slug": "micro-khong-day-sennheiser-ew-d-835-s",
    "sku": "EW-D-835-S Set",
    "brand": "SENNHEISER",
    "description": "Micro Không Dây Sennheiser EW-D 835-S SET Hệ Thống Âm Thanh Chuyên Nghiệp Với Công Nghệ Không Dây Kỹ Thuật Số Sennheiser EW-D 835-S SET là hệ thống micro không dây kỹ thuật số cao cấp, được thiết kế để mang đến âm thanh rõ ràng, ổn định trong các buổi biểu diễn trực tiếp, hội thảo, sự kiện và chương trình truyền hình. Bộ sản phẩm bao gồm bộ phát cầm tay với đầu micro MMD 835 và bộ nhận cố định, hỗ trợ ứng dụng EW-D Smart Assist để điều khiển từ xa. Với chất lượng âm thanh đỉnh cao, khả năng chốn",
    "sale_enabled": true,
    "sale_price": 19090000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-sennheiser-ew-d-835-s.png",
    "images": [
      {
        "id": "img-1042638685",
        "image_url": "/images/products/micro-khong-day-sennheiser-ew-d-835-s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1ad409a2-a9b2-53e5-a4db-cc7e8f692df6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Túi Pioneer DJ",
    "slug": "tui-pioneer-dj",
    "sku": "TUIDJ",
    "brand": "Pioneer DJ",
    "description": "TÚI ĐỰNG CONTROLLER DJ Túi đựng thiết bị controller Dj phù hợp cho các bạn chơi DJ dễ dàng mang thiết bị đi làm hoặc di chuyển bên ngoài cần mang theo thiết bị. Túi đựng thiết bị controller Dj. Ưu điểm của sản phẩm: Túi đựng thiết bị controller Dj được làm bằng vải bên ngoài chống nước bền cũng như bảo vệ bên trong đệm mềm. Đệm bảo vệ bên trong ngăn đựng thiết bị với lớp lót mềm mịn để bảo vệ tốt hơn, chống sốc tối ưu hơn. Túi đựng thiết bị controller Dj có thể xách túi bằng tay cầm cũng có thể ",
    "sale_enabled": true,
    "sale_price": 950000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/tui-pioneer-dj.png",
    "images": [
      {
        "id": "img-1041216687",
        "image_url": "/images/products/tui-pioneer-dj.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a83af8d9-9b4f-5e91-a4fc-e7165bfc5103",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZEDI10FX",
    "slug": "zedi10fx",
    "sku": "ZEDI10FX",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZEDI10FX Mixer analog Allen & Heath ZEDI10FX là lựa chọn đáng cân nhắc khi người dùng cần một mixer analog có định hướng chuyên nghiệp và khả năng phối hợp đồng bộ trong hệ sinh thái Allen & Heath. Model này được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Giá trị của ZEDi10FX thể hiện rõ khi hệ thống được thiết kế đồng bộ từ nguồn tín hiệu, điều khiển, xử lý đ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zedi10fx.jpeg",
    "images": [
      {
        "id": "img-1040556356",
        "image_url": "/images/products/zedi10fx.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f0531559-4bca-50be-a2ef-a08f334efda4",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZEDI10",
    "slug": "zedi10",
    "sku": "ZEDI10",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZEDI10 Trong các hệ thống âm thanh cần độ ổn định và workflow rõ ràng, Mixer analog Allen & Heath ZEDI10 được định vị như một mixer analog phục vụ đúng vai trò của dòng ZED / MixWizard / XB. Thiết bị được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Khi được lựa chọn đúng theo quy mô hệ thống, ZEDi10 giúp giảm các bước xử lý rời rạc, tạo luồng vận hành thống nhấ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zedi10.jpeg",
    "images": [
      {
        "id": "img-1040556355",
        "image_url": "/images/products/zedi10.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5b892263-60fc-5fff-8713-b9993bb2a219",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZEDI8",
    "slug": "zedi8",
    "sku": "ZEDI8",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZEDI8 Mixer analog Allen & Heath ZEDI8 thuộc danh mục ZED / MixWizard / XB của Allen & Heath, phù hợp với người dùng đang tìm kiếm một mixer analog có thể triển khai lâu dài trong hệ thống âm thanh. Sản phẩm được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Điểm quan trọng không chỉ nằm ở từng thông số riêng lẻ mà còn ở cách thiết bị hỗ trợ kỹ sư tổ chức tín hiệ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zedi8.jpeg",
    "images": [
      {
        "id": "img-1040556354",
        "image_url": "/images/products/zedi8.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ee758d49-9f63-5a18-a375-1d750cba29af",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer digital Allen & Heath Qu-SB",
    "slug": "qu-sb",
    "sku": "QUSB",
    "brand": "Allen & Heath",
    "description": "Mixer digital Allen & Heath QU-SB Được phát triển cho nhu cầu âm thanh chuyên nghiệp, Mixer digital Allen & Heath QU-SB là mixer digital hướng đến khả năng vận hành thực tế, mở rộng hệ thống và quản lý tín hiệu thuận tiện. Sản phẩm thuộc dòng Qu Classic, nổi bật nhờ workflow trực quan, khả năng lưu cấu hình và sự linh hoạt cho biểu diễn, nhà thờ, hội trường cũng như ghi âm. Điểm quan trọng không chỉ nằm ở từng thông số riêng lẻ mà còn ở cách thiết bị hỗ trợ kỹ sư tổ chức tín hiệu, rút ngắn thời ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/qu-sb.jpeg",
    "images": [
      {
        "id": "img-1040556341",
        "image_url": "/images/products/qu-sb.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c18d1af6-8b98-583d-96bb-8918c4b261ca",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer digital Allen & Heath Qu-Pac",
    "slug": "qu-pac",
    "sku": "QUPAC",
    "brand": "Allen & Heath",
    "description": "Mixer digital Allen & Heath QU-PAC Mixer digital Allen & Heath QU-PAC là lựa chọn đáng cân nhắc khi người dùng cần một mixer digital có định hướng chuyên nghiệp và khả năng phối hợp đồng bộ trong hệ sinh thái Allen & Heath. Thiết bị thuộc dòng Qu Classic, nổi bật nhờ workflow trực quan, khả năng lưu cấu hình và sự linh hoạt cho biểu diễn, nhà thờ, hội trường cũng như ghi âm. Khi được lựa chọn đúng theo quy mô hệ thống, QU-PAC giúp giảm các bước xử lý rời rạc, tạo luồng vận hành thống nhất và thu",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/qu-pac.jpeg",
    "images": [
      {
        "id": "img-1040556340",
        "image_url": "/images/products/qu-pac.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c766e60b-407d-593f-a367-4b890c68550e",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer digital Allen & Heath Qu-24",
    "slug": "qu-24",
    "sku": "VB-1040556338",
    "brand": "Allen & Heath",
    "description": "Mixer digital Allen & Heath QU-24 Được phát triển cho nhu cầu âm thanh chuyên nghiệp, Mixer digital Allen & Heath QU-24 là mixer digital hướng đến khả năng vận hành thực tế, mở rộng hệ thống và quản lý tín hiệu thuận tiện. Sản phẩm thuộc dòng Qu Classic, nổi bật nhờ workflow trực quan, khả năng lưu cấu hình và sự linh hoạt cho biểu diễn, nhà thờ, hội trường cũng như ghi âm. Điểm quan trọng không chỉ nằm ở từng thông số riêng lẻ mà còn ở cách thiết bị hỗ trợ kỹ sư tổ chức tín hiệu, rút ngắn thời ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/qu-24.jpeg",
    "images": [
      {
        "id": "img-1040556338",
        "image_url": "/images/products/qu-24.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "502bb040-07af-54a2-b0e6-6862f3f72d6b",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer digital Allen & Heath SQ-5",
    "slug": "sq-5",
    "sku": "MIXER_ALLEN&HEATH",
    "brand": "Allen & Heath",
    "description": "Mixer digital Allen & Heath SQ-5 Được phát triển cho nhu cầu âm thanh chuyên nghiệp, Mixer digital Allen & Heath SQ-5 là mixer digital 96 kHz hướng đến khả năng vận hành thực tế, mở rộng hệ thống và quản lý tín hiệu thuận tiện. Thiết bị thuộc dòng SQ của Allen & Heath, hướng đến live sound, ghi âm, streaming và lắp đặt cần chất lượng xử lý 96 kHz trong một thiết kế gọn, dễ triển khai. Khi được lựa chọn đúng theo quy mô hệ thống, SQ-5 giúp giảm các bước xử lý rời rạc, tạo luồng vận hành thống nhấ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/sq-5.jpeg",
    "images": [
      {
        "id": "img-1040556323",
        "image_url": "/images/products/sq-5.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bfa32e86-690a-521d-b41e-017593361bb8",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-REV1",
    "slug": "ddj-rev1",
    "sku": "VB-1040510122",
    "brand": "Pioneer DJ",
    "description": "JOIN THE REVOLUTION DDJ-REV1 kết hợp hoàn hảo với phần mềm Serato DJ Lite, với bố cục mang phong cách battle hoàn toàn mới, dễ sử dụng và hoàn hảo để chơi như một DJ chuyên nghiệp. Thiết kế của bộ DJ Controller này mô phỏng set up turntable DJM-S + PLX chuyên nghiệp, bao gồm các tính năng chuyên biệt dành cho open format DJ. KEY FEATURES Brand new battle-style layout Với giao diện được thiết kế để mô phỏng turntable 2 x PLX và mixer DJM-S - series được sử dụng bởi các DJ chuyên nghiệp. Có nhiều ",
    "sale_enabled": true,
    "sale_price": 9440000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-rev1.png",
    "images": [
      {
        "id": "img-1040510122",
        "image_url": "/images/products/ddj-rev1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8545770c-73b4-5b95-9a6c-67f56d723f9b",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZED-22FX",
    "slug": "zed-22fx",
    "sku": "VB-1040390776",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZED-22FX Mixer analog Allen & Heath ZED-22FX là lựa chọn đáng cân nhắc khi người dùng cần một mixer analog có định hướng chuyên nghiệp và khả năng phối hợp đồng bộ trong hệ sinh thái Allen & Heath. Model này được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Giá trị của ZED-22FX thể hiện rõ khi hệ thống được thiết kế đồng bộ từ nguồn tín hiệu, điều khiển, xử lý đ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zed-22fx.jpeg",
    "images": [
      {
        "id": "img-1040390776",
        "image_url": "/images/products/zed-22fx.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f0a45268-14aa-5737-97db-74f40c2e2497",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZED-16FX",
    "slug": "zed-16fx",
    "sku": "VB-1040390746",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZED-16FX Được phát triển cho nhu cầu âm thanh chuyên nghiệp, Mixer analog Allen & Heath ZED-16FX là mixer analog hướng đến khả năng vận hành thực tế, mở rộng hệ thống và quản lý tín hiệu thuận tiện. Sản phẩm được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Điểm quan trọng không chỉ nằm ở từng thông số riêng lẻ mà còn ở cách thiết bị hỗ trợ kỹ sư tổ chức tín hiệ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zed-16fx.jpeg",
    "images": [
      {
        "id": "img-1040390746",
        "image_url": "/images/products/zed-16fx.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6f3ee7bd-f15a-5f41-bdd8-e9efae786229",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZED-12FX",
    "slug": "zed-12fx",
    "sku": "VB-1040390517",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZED-12FX Trong các hệ thống âm thanh cần độ ổn định và workflow rõ ràng, Mixer analog Allen & Heath ZED-12FX được định vị như một mixer analog phục vụ đúng vai trò của dòng ZED / MixWizard / XB. Sản phẩm được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Điểm quan trọng không chỉ nằm ở từng thông số riêng lẻ mà còn ở cách thiết bị hỗ trợ kỹ sư tổ chức tín hiệu, r",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zed-12fx.jpeg",
    "images": [
      {
        "id": "img-1040390517",
        "image_url": "/images/products/zed-12fx.jpeg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2bed7aac-d89b-53c4-8629-5b75cced8bb6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐĨA TIME CODE PIONEER DJ RB-VD-1W",
    "slug": "rb-vd-1w",
    "sku": "VB-1040261602",
    "brand": "Pioneer DJ",
    "description": "Pair the lightweight RB-VD1 Control Vinyl with the rekordbox dvs Plus Pack to have smooth, low-latency scratching at your fingertips and choose from transparent, black, white, blue and red versions to match the colour of your gear or style.",
    "sale_enabled": true,
    "sale_price": 1620000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rb-vd-1w.png",
    "images": [
      {
        "id": "img-1040261602",
        "image_url": "/images/products/rb-vd-1w.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "91578fe7-6b31-5b22-af2d-c3e19edda332",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐĨA TIME CODE PIONEER DJ RB-VD-1",
    "slug": "rb-vd-1k",
    "sku": "VB-1040261567",
    "brand": "Pioneer DJ",
    "description": "Với đĩa điều khiển vinyl RB-VS1-K và gói Rekordbox DVS Plus Pack, bạn có thể sử dụng chúng để chơi và scratching các bài nhạc kĩ thuật số khi dùng chung với thiết bị Turntable như PLX-500 hay PLX-1000 kết hợp với mixer. Ngoài màu đen thì còn những màu như đỏ, xanh dương, trắng và xám. Bạn có thể tùy ý chọn màu cho phù hợp với phong cách, sở thích riêng mình.",
    "sale_enabled": true,
    "sale_price": 1620000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rb-vd-1k.png",
    "images": [
      {
        "id": "img-1040261567",
        "image_url": "/images/products/rb-vd-1k.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4694ac2b-b1b6-58f8-80d3-f314529ab8ac",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-S5",
    "slug": "djm-s5",
    "sku": "VB-1040242575",
    "brand": "Pioneer DJ",
    "description": "DJM-S5 là sản phẩm lý tưởng nếu bạn đã thử nghiệm qua battle mixing, scratching và muốn mở rộng kỹ năng của mình hoặc nếu bạn hoàn toàn mới làm quen và muốn tham gia vào lĩnh vực turntablism. Performance Pads Sáng tạo và trải nghiệm với 13 pad modes bao gồm Hot Cue và Sampler. 4 Performance Pads trên từng kênh với kích thước 20.6mm x 20.6mm, bạn có thể kích hoạt Samples và nhiều cách để có thể \"remix\" track nhạc của bạn Scratch Cutter Bắt đầu việc scratching ngay lập tức - ngay cả khi bạn chưa b",
    "sale_enabled": true,
    "sale_price": 23971680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djm-s5.png",
    "images": [
      {
        "id": "img-1040242575",
        "image_url": "/images/products/djm-s5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1ef6cb92-22fe-50fa-ad86-db6926a9d92a",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-CX",
    "slug": "hdj-cx",
    "sku": "VB-1040242368",
    "brand": "Pioneer DJ",
    "description": "ESSENTIAL AUDIO Tai nghe on-ear HDJ-CX nhẹ đến mức bạn có thể quên rằng mình đang đeo chúng. Được thiết kế đặc biệt để tạo sự thoải mái tuyệt đối và được điều chỉnh để mang lại chất lượng âm thanh vượt trội cho việc mixing và monitoring. Đây cũng là chiếc headphone được chế tạo nhằm mang đến độ bền cao. Với thiết kế tối giản nhưng mạnh mẽ, mang đến âm thanh rộng và chặt chẽ. HDJ-CX hoàn toàn khác với các tai nghe thuộc HDJ-X Series. HDJ-CX có thể mang đến cho bạn trải nghiệm đặc biệt, thâm chí c",
    "sale_enabled": true,
    "sale_price": 4638600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hdj-cx.png",
    "images": [
      {
        "id": "img-1040242368",
        "image_url": "/images/products/hdj-cx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "67c39209-845b-597c-a1be-8380254216b0",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA KIỂM ÂM PIONEER DJ DM-50D-BT",
    "slug": "dm-50d-bt",
    "sku": "DM-50D-BT",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-50D-BT ĐVT: CẶP Loa kiểm âm Pioneer DJ DM-50D-BT là cặp loa nhỏ gọn được thiết kế với thiết lập linh hoạt nhằm tạo ra âm thanh lý tưởng cho việc sản xuất nhạc, chơi nhạc DJ hay thưởng thức âm nhạc ngay tại nhà. Loa kiểm âm Pioneer DM-50D-BT sử dụng công nghệ không dây Bluetooth® chuyên nghiệp cung cấp cho bạn khả năng phát bài hát ngay từ điện thoại thông minh hay thậm chí máy tính bảng không dây. Loa kiểm âm DM-50D-BT mang lại âm bass cân bằng, mạnh mẽ và chúng có thể ",
    "sale_enabled": true,
    "sale_price": 8553600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dm-50d-bt.png",
    "images": [
      {
        "id": "img-1040241928",
        "image_url": "/images/products/dm-50d-bt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7a0bd240-3ac9-58e2-8bf3-b1664eab6046",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA KIỂM ÂM PIONEER DJ DM-40D-BT",
    "slug": "dm40dbt",
    "sku": "DM-40D-BT",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-40D-BT ĐVT: CẶP Khám phá âm thanh tuyệt vời của thế hệ mới ! Bạn đam mê âm nhạc và mong muốn trải nghiệm những giai điệu tuyệt vời trong cuộc sống hàng ngày? Pioneer DJ DM-40BT là sự lựa chọn hoàn hảo dành cho bạn. Với thiết kế tinh tế, chất lượng âm thanh vượt trội và khả năng kết nối không dây, chiếc loa này sẽ mang đến cho bạn những trải nghiệm âm nhạc tuyệt vời như chưa từng có. Thiết kế hiện đại và tinh tế: Pioneer DJ DM-40BT là sự kết hợp hoàn hảo giữa vẻ đẹp hiện",
    "sale_enabled": true,
    "sale_price": 7290000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/dm40dbt.png",
    "images": [
      {
        "id": "img-1040241751",
        "image_url": "/images/products/dm40dbt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4cb2d012-3113-5e1e-ad39-1f28cfa27d46",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA KIỂM ÂM PIONEER DJ DM-40D",
    "slug": "dm-40d",
    "sku": "DM-40D",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-40D ĐVT: CẶP Với âm thanh mạnh mẽ, chất lượng hoàn thiện cao, hoàn hảo để chơi nhạc DJ hoặc làm nhạc tại nhà, loa kiểm âm DM-40D với loa bass 4 inch và thiết kế mới kết hợp các yếu tố chính từ loa DM-40 để tạo ra âm thanh mạnh mẽ hơn và chất lượng cao hơn. Được bán với các cặp màu đen hoặc trắng, loa dễ lắp đặt, điều chỉnh và sử dụng khiến chúng trở nên lý tưởng cho nhiều mục đích khác nhau. Cho dù bạn muốn chơi nhạc hay làm nhạc, loa kiểm âm DM-40D đều mang đến âm than",
    "sale_enabled": true,
    "sale_price": 5659200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/dm-40d.png",
    "images": [
      {
        "id": "img-1040241325",
        "image_url": "/images/products/dm-40d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "07225de2-c754-5440-a2b6-04870fa2d650",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "TÚI PIONEER DJ DJC-SC3",
    "slug": "djc-sc3",
    "sku": "VB-1040241201",
    "brand": "Pioneer DJ",
    "description": "The perfect size for the XDJ-R1 , the DJC-SC3 has protective cushions to prevent damage on the move. The bag is highly versatile, with pockets at the front, a laptop section, and the option to carry it on the shoulder (vertically and horizontally) or as a backpack.",
    "sale_enabled": true,
    "sale_price": 5540400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djc-sc3.png",
    "images": [
      {
        "id": "img-1040241201",
        "image_url": "/images/products/djc-sc3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "39a4c778-4ac7-5e21-8d2f-04ce187b9366",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PASSIVE PIONEER DJ CSX 080",
    "slug": "csx-080",
    "sku": "VB-1040241048",
    "brand": "Pioneer DJ",
    "description": "Mạch Network chất lượng cao với chất lượng âm thanh tuyệt đỉnh, giọng hát rõ ràng. Crossover cân bằng dải tần tối ưu giữa loa treble và bass giúp âm thanh giọng hát mượt mà hơn. Thiết Kế Đối Xứng Và Bố Trí Loa Treble Đặc Biệt Cho Góc Phủ Âm Thanh Rộng Loa treble được thiết kế góc 30 độ giúp góc phủ rộng và tạo ra âm thanh với sự cân bằng tuyệt vời ngay cả khi đặt tại những không gian rộng lớn như phòng tiệc. Công Suất Mạnh Mẽ Và Âm Lượng Lớn Những loa CS-X này được đánh giá khá cao với công suất",
    "sale_enabled": true,
    "sale_price": 16729200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/csx-080.png",
    "images": [
      {
        "id": "img-1040241048",
        "image_url": "/images/products/csx-080.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3ae642c5-be17-5699-828c-0ab15d069f2c",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "GHẾ TRỐNG DIXON THRONE",
    "slug": "throne",
    "sku": "VB-1039663667",
    "brand": "DIXON",
    "description": "SEAT SIZE 13″ SEAT THICKNESS 3.5″ SEAT Memory foam with cloth top HEIGHT ADJUSTMENT Sturdy threaded shaft with memory lock HEIGHT RANGE 18″-25″ RUBBER FEET Sturdy rubber feet WEIGHT 5.5 kg",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/throne.png",
    "images": [
      {
        "id": "img-1039663667",
        "image_url": "/images/products/throne.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4fc2214e-0131-5304-9efa-0621281e4faa",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG DIXON PODSK522MBK",
    "slug": "podsk522mbk",
    "sku": "VB-1039663663",
    "brand": "DIXON",
    "description": "DIXON SPARK SERIES 5PC DRUMSET MISTY BLACK PVC ALL POPLAR SHELL (6PLY) HARDWARE : CYMBAL BOOM STAND, CYMBAL STAND, HI-HAT STAND, SNARE STAND, PEDAL & THRONE",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/podsk522mbk.png",
    "images": [
      {
        "id": "img-1039663663",
        "image_url": "/images/products/podsk522mbk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2437bdc3-9210-5637-89eb-9034c067c519",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG DIXON PODSK522CSV",
    "slug": "podsk522csv",
    "sku": "VB-1039663662",
    "brand": "DIXON",
    "description": "Dixon SPARK is a compete drum having 6-Ply hardwood drum shells wrapped in a unique Dixon Cyclone finish, deliver great sound and stunning looks while a sturdy set of deluxe, double-braced hardware and sticks fully equips drummers for long term learning, performing or just letting loose. Features - Drum Configuration: 9\"x12\" Tom, 10\"x13\" Tom, 16\"x16\" Floor Tom, 16\"x22\" Bass Drum, 5.5\"x14\" Matching Snare, Mounted",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/podsk522csv.png",
    "images": [
      {
        "id": "img-1039663662",
        "image_url": "/images/products/podsk522csv.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "77649e31-c013-579e-aeee-6d5beebf03ba",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG DIXON PODRT522DB",
    "slug": "podrt522bd",
    "sku": "VB-1039663657",
    "brand": "DIXON",
    "description": "BỘ TRỐNG DIXON PODRT522DB",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/podrt522bd.png",
    "images": [
      {
        "id": "img-1039663657",
        "image_url": "/images/products/podrt522bd.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ab7f14d7-cd3c-5a03-be90-27caf961c113",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "PEDAL DIXON",
    "slug": "pedal",
    "sku": "PEDAL",
    "brand": "DIXON",
    "description": "PEDAL DIXON",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pedal.png",
    "images": [
      {
        "id": "img-1039663656",
        "image_url": "/images/products/pedal.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "360ff94d-9f42-5838-8614-1d9344013070",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHÂN HIHATSTAND DIXON",
    "slug": "hihatstand",
    "sku": "VB-1039663654",
    "brand": "DIXON",
    "description": "Rotatable pedal frame and third leg for preferred pedal position",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hihatstand.png",
    "images": [
      {
        "id": "img-1039663654",
        "image_url": "/images/products/hihatstand.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0bd6f729-9011-5fe1-8f61-0873308f984f",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHÂN SNARE DIXON",
    "slug": "chansnare",
    "sku": "VB-1039663653",
    "brand": "DIXON",
    "description": "CHÂN SNARE DIXON",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/chansnare.png",
    "images": [
      {
        "id": "img-1039663653",
        "image_url": "/images/products/chansnare.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "490aa6bd-7880-56e6-a40f-ae8662cdd5f1",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHÂN BOOMSTAND DIXON",
    "slug": "boomstand",
    "sku": "VB-1039663652",
    "brand": "DIXON",
    "description": "Hide-away boom w/ memory lock",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/boomstand.png",
    "images": [
      {
        "id": "img-1039663652",
        "image_url": "/images/products/boomstand.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d37885c1-d33a-5ad8-9298-dd38fbc43eb5",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG PEARL VML 925SP/C #803",
    "slug": "vml-925sp-c-803",
    "sku": "VB-1039663536",
    "brand": "PEARL",
    "description": "BỘ TRỐNG PEARL VML 925SP/C #803",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vml-925sp-c-803.png",
    "images": [
      {
        "id": "img-1039663536",
        "image_url": "/images/products/vml-925sp-c-803.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e63da711-db91-524e-a568-670e92c2936c",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG PEARL VML 925SP/C #368",
    "slug": "vml-925sp-c-368",
    "sku": "VB-1039663535",
    "brand": "PEARL",
    "description": "BỘ TRỐNG PEARL VML 925SP/C #368",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vml-925sp-c-368.png",
    "images": [
      {
        "id": "img-1039663535",
        "image_url": "/images/products/vml-925sp-c-368.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fcfc7a26-ac38-5892-bbf4-ce55ed6fe577",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘTRỐNG PEARL VBL925230",
    "slug": "vbl925230",
    "sku": "VB-1039663534",
    "brand": "PEARL",
    "description": "BỘTRỐNG PEARL VBL925230",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vbl925230.png",
    "images": [
      {
        "id": "img-1039663534",
        "image_url": "/images/products/vbl925230.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2a126cff-321a-5a3a-9440-4532f8cae6f0",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "ỐC TRỐNG PEARL TLT 100/C",
    "slug": "tlt-100-c",
    "sku": "VB-1039663533",
    "brand": "PEARL",
    "description": "ỐC TRỐNG PEARL TLT 100/C",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/tlt-100-c.png",
    "images": [
      {
        "id": "img-1039663533",
        "image_url": "/images/products/tlt-100-c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9e6ddf21-cc9d-532d-9ac0-2885b9aca291",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "ỐC TRỐNG PEARL TLS 55/C",
    "slug": "tls-55-c",
    "sku": "VB-1039663532",
    "brand": "PEARL",
    "description": "ỐC TRỐNG PEARL TLS 55/C",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/tls-55-c.png",
    "images": [
      {
        "id": "img-1039663532",
        "image_url": "/images/products/tls-55-c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f40b181b-fe58-5252-99f3-f1153315fd39",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "ỐC TRỐNG PEARL TLB 300/C",
    "slug": "tlb-300-c",
    "sku": "VB-1039663531",
    "brand": "PEARL",
    "description": "ỐC TRỐNG PEARL TLB 300/C",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/tlb-300-c.png",
    "images": [
      {
        "id": "img-1039663531",
        "image_url": "/images/products/tlb-300-c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "42befaa7-827f-54e5-be8c-c10b8764d610",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "ỐC TRỐNG PEARL T 061L/6",
    "slug": "t-061l-6",
    "sku": "VB-1039663530",
    "brand": "PEARL",
    "description": "ỐC TRỐNG PEARL T 061L/6",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/t-061l-6.png",
    "images": [
      {
        "id": "img-1039663530",
        "image_url": "/images/products/t-061l-6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8c2fd3f8-cc87-5da8-ac36-b91a8b9dfe64",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ BASS PEARL SD 50",
    "slug": "sd-50",
    "sku": "VB-1039663529",
    "brand": "PEARL",
    "description": "BỘ BASS PEARL SD 50",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sd-50.png",
    "images": [
      {
        "id": "img-1039663529",
        "image_url": "/images/products/sd-50.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d57e78ec-e3cd-56f7-80aa-b756172ca4ef",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHÂN SNARE PEARL S 790",
    "slug": "s-790",
    "sku": "VB-1039663528",
    "brand": "PEARL",
    "description": "CHÂN SNARE PEARL S 790",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/s-790.png",
    "images": [
      {
        "id": "img-1039663528",
        "image_url": "/images/products/s-790.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ddb9157d-7978-54db-9889-a04481902218",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHÂN SNARE PEARL S 70W",
    "slug": "s-70w",
    "sku": "VB-1039663527",
    "brand": "PEARL",
    "description": "CHÂN SNARE PEARL S 70W",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/s-70w.png",
    "images": [
      {
        "id": "img-1039663527",
        "image_url": "/images/products/s-70w.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f5844f87-9f96-5b3f-afe7-c7172b7b2bb9",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "PAD GIẢM ÂM LƯỢNG PEARL RP 50",
    "slug": "rp-50",
    "sku": "VB-1039663525",
    "brand": "PEARL",
    "description": "PAD GIẢM ÂM LƯỢNG PEARL RP 50",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rp-50.png",
    "images": [
      {
        "id": "img-1039663525",
        "image_url": "/images/products/rp-50.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e60d3a3d-50c8-5591-981e-447a144ad3b7",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "PAD GIẢM ÂM LƯỢNG TRỐNG PEARL RP 40C",
    "slug": "rp-40c",
    "sku": "VB-1039663524",
    "brand": "PEARL",
    "description": "PAD GIẢM ÂM LƯỢNG TRỐNG PEARL RP 40C",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rp-40c.png",
    "images": [
      {
        "id": "img-1039663524",
        "image_url": "/images/products/rp-40c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "343d4966-3774-5da0-bcb6-46634e555d00",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "NIỀN TRỐNG 16\" 6 LỖ ỐC PEARL RIM 1606",
    "slug": "rim-1606",
    "sku": "VB-1039663523",
    "brand": "PEARL",
    "description": "NIỀN TRỐNG 16\" 6 LỖ ỐC PEARL RIM 1606",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rim-1606.png",
    "images": [
      {
        "id": "img-1039663523",
        "image_url": "/images/products/rim-1606.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0a205012-6300-5cde-87b3-686517eecb08",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "NIỀN TRỐNG 14\" 10 LỖ ỐC PEARL RIM 1410S",
    "slug": "rim-1410s",
    "sku": "VB-1039663522",
    "brand": "PEARL",
    "description": "NIỀN TRỐNG 14\" 10 LỖ ỐC PEARL RIM 1410S",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rim-1410s.png",
    "images": [
      {
        "id": "img-1039663522",
        "image_url": "/images/products/rim-1410s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "551f57c0-20e9-5c09-92ba-980cf738e8fe",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "NIỀN TRỐNG 14\" 8 LỖ ỐC PEARL RIM 1408S",
    "slug": "rim-1408s",
    "sku": "VB-1039663521",
    "brand": "PEARL",
    "description": "NIỀN TRỐNG 14\" 8 LỖ ỐC PEARL RIM 1408S",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rim-1408s.png",
    "images": [
      {
        "id": "img-1039663521",
        "image_url": "/images/products/rim-1408s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "12b18d06-1b22-501f-9dfc-6277b00021c1",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "NIỀN TRỐNG 13\" 6 LỖ ỐC PEARL RIM 1306",
    "slug": "rim-1306",
    "sku": "VB-1039663520",
    "brand": "PEARL",
    "description": "NIỀN TRỐNG 13\" 6 LỖ ỐC PEARL RIM 1306",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rim-1306.png",
    "images": [
      {
        "id": "img-1039663520",
        "image_url": "/images/products/rim-1306.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7dde5870-892e-57da-8aea-79f8652c7aa5",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "NIỀN TRỐNG 12\" 6 LỖ ỐC PEARL RIM 1206",
    "slug": "rim-1206",
    "sku": "VB-1039663519",
    "brand": "PEARL",
    "description": "NIỀN TRỐNG 12\" 6 LỖ ỐC PEARL RIM 1206",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rim-1206.png",
    "images": [
      {
        "id": "img-1039663519",
        "image_url": "/images/products/rim-1206.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3c94e713-2413-54d8-b23c-16ef7ec8991e",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHUÔNG GIÓ PEARL PWCH 3220G",
    "slug": "pwch-3220g",
    "sku": "VB-1039663518",
    "brand": "PEARL",
    "description": "CHUÔNG GIÓ PEARL PWCH 3220G",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pwch-3220g.png",
    "images": [
      {
        "id": "img-1039663518",
        "image_url": "/images/products/pwch-3220g.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1df1c149-eb8a-5925-8ad6-84b2779f0975",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "TRỐNG CONGA PEARL PWC 202DX #521",
    "slug": "pwc-202dx-521",
    "sku": "VB-1039663517",
    "brand": "PEARL",
    "description": "TRỐNG CONGA PEARL PWC 202DX #521",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pwc-202dx-521.png",
    "images": [
      {
        "id": "img-1039663517",
        "image_url": "/images/products/pwc-202dx-521.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1b593461-24c4-5f56-9ae0-494e6810f266",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "TRỐNG CONGA PEARL PWC 100#511",
    "slug": "pwc-100-511",
    "sku": "VB-1039663516",
    "brand": "PEARL",
    "description": "TRỐNG CONGA PEARL PWC 100#511",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pwc-100-511.png",
    "images": [
      {
        "id": "img-1039663516",
        "image_url": "/images/products/pwc-100-511.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "39f79c1c-8e3f-54e7-bf6a-b8b880c8b34a",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MẶT TRỐNG PEARL PTH22PL",
    "slug": "pth22pl",
    "sku": "VB-1039663515",
    "brand": "PEARL",
    "description": "MẶT TRỐNG PEARL PTH22PL",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pth22pl.png",
    "images": [
      {
        "id": "img-1039663515",
        "image_url": "/images/products/pth22pl.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8508af4b-7f23-5694-86a4-09d28f2da64b",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MẶT TRỐNG PEARL PTH 22CEQ",
    "slug": "pth-22ceq",
    "sku": "VB-1039663514",
    "brand": "PEARL",
    "description": "MẶT TRỐNG PEARL PTH 22CEQ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pth-22ceq.png",
    "images": [
      {
        "id": "img-1039663514",
        "image_url": "/images/products/pth-22ceq.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8793e8b0-5658-5267-b4c9-f48222ab296f",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MẶT TRỐNG PEARL PTH 16C",
    "slug": "pth-16c",
    "sku": "VB-1039663513",
    "brand": "PEARL",
    "description": "MẶT TRỐNG PEARL PTH 16C",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pth-16c.png",
    "images": [
      {
        "id": "img-1039663513",
        "image_url": "/images/products/pth-16c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f89de420-d963-500e-b5f3-93d352325746",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MẶT TRỐNG PEARL PTH 16 ''",
    "slug": "pth-16",
    "sku": "VB-1039663512",
    "brand": "PEARL",
    "description": "MẶT TRỐNG PEARL PTH 16 ''",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pth-16.png",
    "images": [
      {
        "id": "img-1039663512",
        "image_url": "/images/products/pth-16.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "aadfde9b-df69-5989-941e-55643a96e28a",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MẶT TRỐNG PEARL PTH 13''",
    "slug": "pth-13",
    "sku": "VB-1039663511",
    "brand": "PEARL",
    "description": "MẶT TRỐNG PEARL PTH 13''",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pth-13.png",
    "images": [
      {
        "id": "img-1039663511",
        "image_url": "/images/products/pth-13.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c45029be-3fb2-5719-bb50-0de8948c2b2d",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MẶT TRỐNG PEARL PTH 12''",
    "slug": "pth-12",
    "sku": "VB-1039663510",
    "brand": "PEARL",
    "description": "MẶT TRỐNG PEARL PTH 12''",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pth-12.png",
    "images": [
      {
        "id": "img-1039663510",
        "image_url": "/images/products/pth-12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "26e1496f-a80c-5302-908b-af16662d9af0",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "TREO CHUÔNG GIÓ PEARL PTC 300",
    "slug": "ptc-300",
    "sku": "VB-1039663508",
    "brand": "PEARL",
    "description": "TREO CHUÔNG GIÓ PEARL PTC 300",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ptc-300.png",
    "images": [
      {
        "id": "img-1039663508",
        "image_url": "/images/products/ptc-300.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "eda8544c-2edf-5cd3-9233-aadcf165a23b",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "KẸP PEARL PTC 10",
    "slug": "ptc-10",
    "sku": "VB-1039663507",
    "brand": "PEARL",
    "description": "KẸP PEARL PTC 10",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ptc-10.png",
    "images": [
      {
        "id": "img-1039663507",
        "image_url": "/images/products/ptc-10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f801dd83-55bf-5c7f-90b0-a1086db1468c",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "Shaker Pearl PSK10",
    "slug": "psk10",
    "sku": "VB-1039663506",
    "brand": "PEARL",
    "description": "Pearl PSK10 Fiberglass Shekere Trong thế giới nhạc cụ, đặc biệt là các loại nhạc cụ gõ, Shekere đã trở thành một cái tên quen thuộc với những ai yêu thích âm nhạc truyền thống và hiện đại. Trong đó, Pearl PSK10 Fiberglass Shekere nổi bật với thiết kế chắc chắn, âm thanh độc đáo và tính linh hoạt vượt trội. Hãy cùng khám phá chi tiết về sản phẩm này để hiểu vì sao nó được nhiều nghệ sĩ tin dùng. #### Pearl PSK10 - Sự Kết Hợp Hoàn Hảo Giữa Độ Bền và Âm Thanh 1. Thiết Kế Chắc Chắn và Bền Bỉ Pearl P",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/psk10.png",
    "images": [
      {
        "id": "img-1039663506",
        "image_url": "/images/products/psk10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a0aa8840-3d9d-563d-ac8e-603ad969eaf2",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ CỐ ĐỊNH PEDAL PEARL PS 85",
    "slug": "ps-85",
    "sku": "VB-1039663504",
    "brand": "PEARL",
    "description": "BỘ CỐ ĐỊNH PEDAL PEARL PS 85",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ps-85.png",
    "images": [
      {
        "id": "img-1039663504",
        "image_url": "/images/products/ps-85.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3dfe232d-811d-5311-9b1f-0421c4731a13",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "ĐẾ GẮN COWBELL PEARL PPS 20",
    "slug": "pps-20",
    "sku": "VB-1039663502",
    "brand": "PEARL",
    "description": "ĐẾ GẮN COWBELL PEARL PPS 20",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pps-20.png",
    "images": [
      {
        "id": "img-1039663502",
        "image_url": "/images/products/pps-20.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5f38b3ff-867f-5b1d-8661-fef5f96f327b",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "SHAKER PEARL PGA 20",
    "slug": "pga-20",
    "sku": "VB-1039663501",
    "brand": "PEARL",
    "description": "SHAKER PEARL PGA 20",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pga-20.png",
    "images": [
      {
        "id": "img-1039663501",
        "image_url": "/images/products/pga-20.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "372125f4-99d0-5def-aae2-d52ccd07b9a0",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "TRỐNG CONGA PEARL PFC 202DX #626",
    "slug": "pfc-202dx-626",
    "sku": "VB-1039663498",
    "brand": "PEARL",
    "description": "TRỐNG CONGA PEARL PFC 202DX #626",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pfc-202dx-626.png",
    "images": [
      {
        "id": "img-1039663498",
        "image_url": "/images/products/pfc-202dx-626.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1b19a09a-4e5a-5bce-8468-ebff52705f54",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ GÕ PEARL PET 80",
    "slug": "pet-80",
    "sku": "VB-1039663497",
    "brand": "PEARL",
    "description": "BỘ GÕ PEARL PET 80",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pet-80.png",
    "images": [
      {
        "id": "img-1039663497",
        "image_url": "/images/products/pet-80.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "44b7a39a-df72-5ebd-a6aa-6d43b49f2c40",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ GÕ PEARL PET 60",
    "slug": "pet-60",
    "sku": "VB-1039663496",
    "brand": "PEARL",
    "description": "BỘ GÕ PEARL PET 60",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pet-60.png",
    "images": [
      {
        "id": "img-1039663496",
        "image_url": "/images/products/pet-60.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fe7dcec0-f34b-58bc-a117-c631a813cf1e",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ GÕ PEARL PET 100",
    "slug": "pet-100",
    "sku": "VB-1039663495",
    "brand": "PEARL",
    "description": "BỘ GÕ PEARL PET 100",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pet-100.png",
    "images": [
      {
        "id": "img-1039663495",
        "image_url": "/images/products/pet-100.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "561019f6-efc8-54cb-bd61-6f134a8bc67a",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ GÕ TRỨNG PEARL PEC 1/3",
    "slug": "pec-1-3",
    "sku": "VB-1039663494",
    "brand": "PEARL",
    "description": "BỘ GÕ TRỨNG PEARL PEC 1/3",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pec-1-3.png",
    "images": [
      {
        "id": "img-1039663494",
        "image_url": "/images/products/pec-1-3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d85fcfe2-87e9-5de6-9fc8-ff8ec4ca45d8",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "MÕ PEARL PCWB 30",
    "slug": "pcwb-30",
    "sku": "VB-1039663493",
    "brand": "PEARL",
    "description": "MÕ PEARL PCWB 30",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pcwb-30.png",
    "images": [
      {
        "id": "img-1039663493",
        "image_url": "/images/products/pcwb-30.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e11cdc85-b194-579f-8c68-313df63e841a",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CÙM TREO COWBELL PCS 10",
    "slug": "pcs-10",
    "sku": "VB-1039663492",
    "brand": "PEARL",
    "description": "CÙM TREO COWBELL PCS 10",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pcs-10.png",
    "images": [
      {
        "id": "img-1039663492",
        "image_url": "/images/products/pcs-10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "81816724-2e17-5ef6-83c3-2de842942844",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CÙM KHUNG TREO TRỐNG PEARL PC 50",
    "slug": "pc-50",
    "sku": "VB-1039663491",
    "brand": "PEARL",
    "description": "CÙM KHUNG TREO TRỐNG PEARL PC 50",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pc-50.png",
    "images": [
      {
        "id": "img-1039663491",
        "image_url": "/images/products/pc-50.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4f4be4b9-900c-5621-a78d-bb0ad61dd848",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "CHÂN TRỐNG CONGA PEARL PC 200W",
    "slug": "pc-200w",
    "sku": "VB-1039663490",
    "brand": "PEARL",
    "description": "#### Pearl Twin Conga Stand PC-200W",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pc-200w.png",
    "images": [
      {
        "id": "img-1039663490",
        "image_url": "/images/products/pc-200w.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "aa63804c-cd43-5d51-82f9-3c51c4c19594",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "PEDAL PEARL P900",
    "slug": "p900",
    "sku": "VB-1039663489",
    "brand": "PEARL",
    "description": "PEDAL PEARL P900",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p900.png",
    "images": [
      {
        "id": "img-1039663489",
        "image_url": "/images/products/p900.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cdc7c34b-d447-5b65-af58-25a779175da4",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "PEDAL PEARL P890",
    "slug": "p890",
    "sku": "VB-1039663488",
    "brand": "PEARL",
    "description": "PEDAL PEARL P890",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p890.png",
    "images": [
      {
        "id": "img-1039663488",
        "image_url": "/images/products/p890.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e422cc26-56e9-51b1-b0ce-8213dadc94c0",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "PEDAL ĐÔI PEARL P 902",
    "slug": "p-902",
    "sku": "VB-1039663487",
    "brand": "PEARL",
    "description": "PEDAL ĐÔI PEARL P 902",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p-902.png",
    "images": [
      {
        "id": "img-1039663487",
        "image_url": "/images/products/p-902.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b9706c85-c468-5b78-a296-3f40b8b32481",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG PEARL MCX 924XSP/C #805",
    "slug": "mcx-924xsp-c-805",
    "sku": "VB-1039663485",
    "brand": "PEARL",
    "description": "BỘ TRỐNG PEARL MCX 924XSP/C #805",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mcx-924xsp-c-805.png",
    "images": [
      {
        "id": "img-1039663485",
        "image_url": "/images/products/mcx-924xsp-c-805.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9d90ae2f-dadf-5799-8dcb-3b654815ac72",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ TRỐNG PEARL MCX 924XSP/C #363",
    "slug": "mcx-924xsp-c-363",
    "sku": "VB-1039663484",
    "brand": "PEARL",
    "description": "BỘ TRỐNG PEARL MCX 924XSP/C #363",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mcx-924xsp-c-363.png",
    "images": [
      {
        "id": "img-1039663484",
        "image_url": "/images/products/mcx-924xsp-c-363.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1ed1ae76-0deb-5642-a7ec-426c56c17dd5",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "TRỐNG PEARL MCX 1455S/C #363",
    "slug": "mcx-1455s-c-363",
    "sku": "VB-1039663480",
    "brand": "PEARL",
    "description": "#### Pearl MCX1455S/C/Black Sparkle Fade (363) Snare Drum MCX 14inch x 5.5inch",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mcx-1455s-c-363.png",
    "images": [
      {
        "id": "img-1039663480",
        "image_url": "/images/products/mcx-1455s-c-363.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "901587c7-a996-5328-bdde-c383f2fc379a",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN B8X PERFORMANCE - 45003X",
    "slug": "cymbal-sabian-b8x-performance",
    "sku": "45003X",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN B8X PERFORMANCE - 45003X",
    "sale_enabled": true,
    "sale_price": 8949960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cymbal-sabian-b8x-performance.png",
    "images": [
      {
        "id": "img-1039648853",
        "image_url": "/images/products/cymbal-sabian-b8x-performance.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "23c04052-f2cf-5433-86de-5d7f34591c96",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN B8X FIRST PACK 45011X",
    "slug": "b8x-first-pack-1",
    "sku": "45011X",
    "brand": "SABIAN",
    "description": "CYMBAL B8X FIRST PACK 45011X #### Sabian 45011X B8X First Pack bao gồm Hi-Hats B8 14\" và Crash B8 16\". Series B8X được thiết kế để có âm thanh trong trẻo và rõ ràng. Sabian 45011X B8X First Pack là một bộ Cymbal hoàn hảo đầu tiên cho người mới bắt đầu nghiêm túc và sáng suốt. Được tạo hình, rèn và tiện chính xác để tạo ra âm thanh trong trẻo, chặt chẽ về mặt âm sắc … với mức giá thấp giúp cho lần đầu tiên người chơi tiếp cận với kim loại quý này trở nên dễ dàng. ĐẶC ĐIỂM BỘ CYMBAL B8X FIRST PACK",
    "sale_enabled": true,
    "sale_price": 5412960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/b8x-first-pack-1.png",
    "images": [
      {
        "id": "img-1039648852",
        "image_url": "/images/products/b8x-first-pack-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c77596d0-3a9c-55ca-994b-3a9fd07a93b8",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN B8X COMPLETE SET 45006X",
    "slug": "b8x-complete-set",
    "sku": "45006X",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN B8X COMPLETE SET 45006X",
    "sale_enabled": true,
    "sale_price": 16022880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/b8x-complete-set.png",
    "images": [
      {
        "id": "img-1039648851",
        "image_url": "/images/products/b8x-complete-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "66f863f6-25f6-5c4b-ba79-e99338bba8c0",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN BASEMENTMIX BP5003",
    "slug": "cymbal-sabian-basementmix",
    "sku": "BP5003",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN BASEMENTMIX BP5003",
    "sale_enabled": true,
    "sale_price": 11238480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cymbal-sabian-basementmix.png",
    "images": [
      {
        "id": "img-1039648850",
        "image_url": "/images/products/cymbal-sabian-basementmix.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3b5215f6-7273-5a71-a584-fd2dc3fe8d4e",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN GARAGEMIX BX5003",
    "slug": "cymbal-sabian-garagemix",
    "sku": "BX5003",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN GARAGEMIX BX5003",
    "sale_enabled": true,
    "sale_price": 12353040,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cymbal-sabian-garagemix.png",
    "images": [
      {
        "id": "img-1039648849",
        "image_url": "/images/products/cymbal-sabian-garagemix.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5c704fbd-587f-578d-9038-c60f6441969b",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN GIGMIX PX5003",
    "slug": "cymbal-sabian-gigmix",
    "sku": "PX5003",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN GIGMIX PX5003",
    "sale_enabled": true,
    "sale_price": 13467600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cymbal-sabian-gigmix.png",
    "images": [
      {
        "id": "img-1039648848",
        "image_url": "/images/products/cymbal-sabian-gigmix.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b021c98b-3637-58f2-be2c-91076643e8cb",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN B8 2 PACK 45002-14",
    "slug": "b8-2-pack-14-hats",
    "sku": "45002-14",
    "brand": "SABIAN",
    "description": "SABIAN B8 2 PACK 45002-14 #### SABIAN 2 PACK 45002-14 là set cymbal khởi động tuyệt vời với tính linh hoạt bổ sung của Crash Ride. Sản phẩm bao gồm 2 lá 14″ hiaht, một lá 14\" thin crash và 1 lá 18″ Crash Ride.",
    "sale_enabled": true,
    "sale_price": 5294160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/b8-2-pack-14-hats.png",
    "images": [
      {
        "id": "img-1039648844",
        "image_url": "/images/products/b8-2-pack-14-hats.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0a8a52c0-5c77-58d2-a4de-15ff91775b0d",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN PARAGON PERFORMANCE SET NP5005NNB",
    "slug": "paragon-performance-set",
    "sku": "NP5005NNB",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN PARAGON PERFORMANCE SET NP5005NNB",
    "sale_enabled": true,
    "sale_price": 21594600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/paragon-performance-set.png",
    "images": [
      {
        "id": "img-1039648839",
        "image_url": "/images/products/paragon-performance-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "86e66643-6071-56c7-900d-af29654ce6f1",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "LÁ TRỐNG (CYMBAL) SABIAN AAX 25005XXP",
    "slug": "aax-stage-performance-set",
    "sku": "25005XXP",
    "brand": "SABIAN",
    "description": "LÁ TRỐNG (CYMBAL) SABIAN AAX 25005XXP",
    "sale_enabled": true,
    "sale_price": 20688480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/aax-stage-performance-set.jpg",
    "images": [
      {
        "id": "img-1039648836",
        "image_url": "/images/products/aax-stage-performance-set.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "463b86ec-5028-5f73-b6c7-9db9051d22ca",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "ZOOM DRUM MACHINE MRT3",
    "slug": "zoom-drum-machine-mrt3",
    "sku": "MRT3",
    "brand": "ZOOM",
    "description": "#### Máy tạo nhịp tinh vi kết hợp 199 trống siêu thực và bộ gõ âm thanh trong một cơ thể nhỏ gọn đáng kinh ngạc. Một đầy đủ 396 mẫu đặt trước chứa nhiều loại nhịp điệu được lập trình trước. 99 mẫu bổ sung có thểđược lập trình và lưu trữ bởi người dùng. ● Tạo chuỗi sao lưu (bài hát) với tối đa 99 mẫu. Có đến 99 như vậy bài hát có thể được lưu trữ để sử dụng ngay lập tức bất cứ lúc nào. ● Tấm đệm chiếu sáng bên trong cho phép bạn theo dõi mẫu nhịp điệu một cách trực quan trong suốt bài hát phát lạ",
    "sale_enabled": true,
    "sale_price": 3682800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zoom-drum-machine-mrt3.png",
    "images": [
      {
        "id": "img-1039648832",
        "image_url": "/images/products/zoom-drum-machine-mrt3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b8642869-6c56-527a-ba38-40c0666baed3",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "Máy ghi âm ZOOM H5/EQ",
    "slug": "may-ghi-am-zoom-h5-eq",
    "sku": "H5EQ",
    "brand": "ZOOM",
    "description": "Máy ghi âm cầm tay Zoom H5 nhỏ gọn, linh hoạt và mạnh mẽ, cung cấp mọi thứ bạn cần. Zoom H5 tạo các bản ghi đa âm thanh cho việc dựng video và casting, phát thanh truyền hình và thu âm tin tức điện tử hiện đại,... trở nên chuyên nghiệp hơn. #### Thiết kế Chiếc máy ghi âm Zoom này được làm vuông vức, nhưng vẫn sẽ bo tròn ở những điểm phù hợp tạo cho người dùng cảm giác cầm nắm thoải mái, không hề bị cấn hay là khó cầm vì quá to. Phía trên đỉnh máy ghi âm Zoom H5 là phần mic có thể tháo rời, trên ",
    "sale_enabled": true,
    "sale_price": 6620400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/may-ghi-am-zoom-h5-eq.png",
    "images": [
      {
        "id": "img-1039648829",
        "image_url": "/images/products/may-ghi-am-zoom-h5-eq.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2b755a5f-79ce-5cf5-96b3-e9dc30f2d8fd",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "Guitar Effect ZOOM GM200",
    "slug": "zoom-gm200",
    "sku": "GM-200",
    "brand": "ZOOM",
    "description": "#### Line 6 clearly started something when they released their innovative Pod desktop guitar amp modeller because this year sees a number of similar products hot on its tail. Direct competition for the Pod is provided by the Johnson J Station (see review starting on page 100), while Zoom have chosen to target their amp modeller towards the lower end of the market. The result is the GM200, a very low‑cost guitar preamp with switchable amp modelling, a choice of output characteristics and some bas",
    "sale_enabled": true,
    "sale_price": 3186000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zoom-gm200.png",
    "images": [
      {
        "id": "img-1039648826",
        "image_url": "/images/products/zoom-gm200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5b361952-2073-50e4-8784-b70b84f09e6e",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "PEDAL GUITAR EFFECT ZOOM G9.2TT",
    "slug": "zoom-effect-guitar-g92tt",
    "sku": "G92TT",
    "brand": "ZOOM",
    "description": "G9.2tt G9.2tt là Guitar Effect Console đa năng của ZOOM, mang đến cho bạn khả năng tạo ra những âm thanh guitar độc đáo và ấn tượng. Với 120 hiệu ứng khác nhau, 10 mô-đun hiệu ứng, 200 bản patch và 10 hiệu ứng đồng thời, bạn có thể thỏa sức sáng tạo và thể hiện phong cách âm nhạc của mình. #### G9.2tt là sản phẩm Guitar Effect Console cao cấp của ZOOM, được thiết kế để đáp ứng nhu cầu của các nghệ sĩ guitar chuyên nghiệp và nghiệp dư. Sản phẩm sở hữu nhiều tính năng vượt trội, bao gồm: 120 hiệu ",
    "sale_enabled": true,
    "sale_price": 10497600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zoom-effect-guitar-g92tt.png",
    "images": [
      {
        "id": "img-1039648824",
        "image_url": "/images/products/zoom-effect-guitar-g92tt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "40a06570-6ab6-5319-8ed3-55538991b30b",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "PEDAL GUITAR EFFECT ZOOM G7.1UT",
    "slug": "zoom-effect-guitar-g7-1ut",
    "sku": "G71UT",
    "brand": "ZOOM",
    "description": "G7.1UT G7.1UT là pedal hiệu ứng guitar đa năng từ thương hiệu ZOOM, được thiết kế với 70 hiệu ứng âm thanh khác nhau, bao gồm các hiệu ứng amp, overdrive, distortion, modulation, delay, reverb, và hơn thế nữa. Pedal có kích thước nhỏ gọn, dễ dàng mang theo và sử dụng. #### G7.1UT là pedal hiệu ứng guitar đa năng được thiết kế với 70 hiệu ứng âm thanh khác nhau, bao gồm: 10 hiệu ứng amp: từ amp cổ điển đến amp hiện đại 15 hiệu ứng overdrive và distortion 20 hiệu ứng modulation: chorus, flanger, v",
    "sale_enabled": true,
    "sale_price": 7506000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/zoom-effect-guitar-g7-1ut.png",
    "images": [
      {
        "id": "img-1039648823",
        "image_url": "/images/products/zoom-effect-guitar-g7-1ut.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "50fc3c44-c657-5a28-a180-63a5629a16fc",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "ZOOM BASS EFFECT B1X",
    "slug": "zoom-bass-effect-b1x",
    "sku": "B1X",
    "brand": "ZOOM",
    "description": "Zoom B1X B1X là bộ xử lý đa hiệu ứng (multi effect), phơ guitar bass với hơn 70 hiệu ứng và mô hình amp, looper và phần nhịp điệu tích hợp, B1X đưa bạn lên một tầm cao mới. #### Bass luôn là những âm thanh thầm lặng, lắng chìm ở những dãy tần thấp nhưng lại vô cùng quan trọng. Và Phơ bàn Zoom B1X chính là một công cụ thiết yếu để tôn lên vẻ đẹp của những nốt trầm. Bạn có thể truy cập tư viện các hiệu ứng Zoom Guitar Lab và tải xuống các hiệu ứng yêu thích cho Phơ bàn Zoom B1X. Zoom Guitar Lab cu",
    "sale_enabled": true,
    "sale_price": 1998000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/zoom-bass-effect-b1x.png",
    "images": [
      {
        "id": "img-1039648821",
        "image_url": "/images/products/zoom-bass-effect-b1x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "67e65809-5118-5d40-9e92-e7d7a86f306a",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "Micro Không Dây PHONIC PCT-1000M",
    "slug": "pct-1000",
    "sku": "PCT1000",
    "brand": "PHONIC",
    "description": "Micro Không Dây PHONIC PCT-1000M PCT-1000M PCT-1000 là hệ thống Micro không dây Dual-Channel giải pháp tốt nhất cho các ứng dụng như thuyết trình, diễn thuyết, kịch nghệ hoặc biểu diễn trực tiếp, nơi có hai diễn giả hoặc giảng viên. PCT-1000 cung cấp thiết lập một chạm linh hoạt, cho phép các thiết bị phát và bộ thu được kết nối trong vài giây. Với 16 kênh cài sẵn, PCT-1000 có thể cung cấp hiệu suất hoàn hảo ngay cả trong điều kiện khắc nghiệt nhất. Thiết kế plug-and-play đơn giản cho hoạt động ",
    "sale_enabled": true,
    "sale_price": 8967240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pct-1000.png",
    "images": [
      {
        "id": "img-1039648819",
        "image_url": "/images/products/pct-1000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4b99f760-4dd0-5f87-9b27-6754a26b0bcc",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU PHONIC GEQ1502",
    "slug": "geq1502",
    "sku": "GEQ1502",
    "brand": "PHONIC",
    "description": "#### 15-band Stereo Graphic Equalizer Low cut filter to remove unwanted low frequency sounds Extremely accurate 4-segment LED level meter and input gain control Balanced XLR and 1/4\" TRS inputs and outputs Mono subwoofer output with adjustable crossover frequency Shielded toroidal power transformer for ultra low-noise Sturdy all-metal chassis",
    "sale_enabled": true,
    "sale_price": 3651480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/geq1502.png",
    "images": [
      {
        "id": "img-1039648817",
        "image_url": "/images/products/geq1502.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ba4c2017-bfcb-5b42-b5c3-e46ec1a5019f",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU PHONIC PCL 2700",
    "slug": "pcl-2700",
    "sku": "PCL2700",
    "brand": "PHONIC",
    "description": "#### The Phonic PCL2700 is a powerful yet user friendly dynamic processor with expander, gate, compressor, and limiter. Phonic’s custom circuitry combines the advantages of hard- and soft-knee compression in a single dynamic function to deliver natural, transparent results. Also equipped with fully automatic and manually adjustable attack and release times, IGC peak-limiting circuit, selectable dual-mono or stereo, 12-segment display, switchable sidechain input with sidechain monitor function, a",
    "sale_enabled": true,
    "sale_price": 4344840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pcl-2700.png",
    "images": [
      {
        "id": "img-1039648816",
        "image_url": "/images/products/pcl-2700.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "43eeb5d2-6a64-55e9-a82f-c116e7a69a2e",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU PCL 4700",
    "slug": "pcl-4700",
    "sku": "PCL4700",
    "brand": "PHONIC",
    "description": "#### The Phonic PCL4700 is a powerful yet user friendly 4-channel dynamic processor with expander, gate, compressor, and limiter. Phonic’s custom circuitry combines the advantages of hard- and soft-knee compression in a single dynamic function to deliver natural, transparent results. Also equipped with fully automatic and manually adjustable attack and release times, IGC peak-limiting circuit, selectable dual-mono or stereo, 12-segment display, switchable sidechain input with sidechain monitor f",
    "sale_enabled": true,
    "sale_price": 5003640,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pcl-4700.png",
    "images": [
      {
        "id": "img-1039648815",
        "image_url": "/images/products/pcl-4700.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "70d24026-e403-5586-b44a-987eaebed07b",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 15A JNR",
    "slug": "jubi-15a-jnr",
    "sku": "15AJNR",
    "brand": "PHONIC",
    "description": "#### Dòng loa Jubi thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 320W, sử dụng công nghệ Class D cung cấp 123 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đáng",
    "sale_enabled": true,
    "sale_price": 7846200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-15a-jnr.png",
    "images": [
      {
        "id": "img-1039648814",
        "image_url": "/images/products/jubi-15a-jnr.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4db8f27b-2f29-5318-bfcd-99ea6f4f2d62",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 15A Lite",
    "slug": "jubi-15a-lite",
    "sku": "15ALITE",
    "brand": "PHONIC",
    "description": "#### Dòng loa Jubi thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 320W, sử dụng công nghệ Class D cung cấp 96 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đáng ",
    "sale_enabled": true,
    "sale_price": 8401320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-15a-lite.png",
    "images": [
      {
        "id": "img-1039648813",
        "image_url": "/images/products/jubi-15a-lite.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a2f8f6c5-0028-583b-a801-100864a98521",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 15A DSP",
    "slug": "jubi-15a-dsp",
    "sku": "15ADSP",
    "brand": "PHONIC",
    "description": "#### Dòng loa Jubi thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 700W, sử dụng công nghệ Class D cung cấp 126 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đáng",
    "sale_enabled": true,
    "sale_price": 12920040,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-15a-dsp.png",
    "images": [
      {
        "id": "img-1039648812",
        "image_url": "/images/products/jubi-15a-dsp.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7e6e5e27-052a-5d60-aad1-0b8a81bc35ca",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi15AR",
    "slug": "jubi15ar",
    "sku": "15AR",
    "brand": "PHONIC",
    "description": "#### Phonic's Jubi 15AR establishes a new paradigm for molded powered speakers. Jubi's 700 Watt (continuous) amplifier uses Class AB and D technology to produce a shattering 126 dB maximum SPL, providing enough power for a wide range of venue types and sizes. A lightweight design and rugged pole mounts make the Jubi the most versatile, portable active loudspeaker today. Phonic engineers designed a high BL force factor woofer and a 1\" compression tweeter to achieve the Jubi's astonishingly wide s",
    "sale_enabled": true,
    "sale_price": 10538640,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi15ar.png",
    "images": [
      {
        "id": "img-1039648811",
        "image_url": "/images/products/jubi15ar.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "95efcee9-0a72-501a-b67c-7d2cc14b5f3a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 15A",
    "slug": "jubi-15a",
    "sku": "15A",
    "brand": "PHONIC",
    "description": "LOA PHONIC Jubi 15A",
    "sale_enabled": true,
    "sale_price": 9603360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-15a.png",
    "images": [
      {
        "id": "img-1039648810",
        "image_url": "/images/products/jubi-15a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "24d14471-129d-5e65-b67c-5b36d7e5b536",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 15",
    "slug": "jubi-15",
    "sku": "JUBI15",
    "brand": "PHONIC",
    "description": "LOA PHONIC Jubi 15",
    "sale_enabled": true,
    "sale_price": 6147360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-15.png",
    "images": [
      {
        "id": "img-1039648809",
        "image_url": "/images/products/jubi-15.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1235f8f7-372b-5e07-aca5-1ad66b502d27",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 12A JNR",
    "slug": "jubi-12a-jnr",
    "sku": "12AJNR",
    "brand": "PHONIC",
    "description": "#### Loa Jubi 12A JNR thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 320W, sử dụng công nghệ Class D cung cấp 123 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đ",
    "sale_enabled": true,
    "sale_price": 6402240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-12a-jnr.png",
    "images": [
      {
        "id": "img-1039648808",
        "image_url": "/images/products/jubi-12a-jnr.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2701ebdf-d915-59d8-9cbd-98f5c17a8dd2",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 12A Lite",
    "slug": "jubi-12a-lite",
    "sku": "12ALITE",
    "brand": "PHONIC",
    "description": "#### Loa Jubi 12AR thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 700W, sử dụng công nghệ Class D cung cấp 126 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đáng",
    "sale_enabled": true,
    "sale_price": 6899040,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-12a-lite.png",
    "images": [
      {
        "id": "img-1039648807",
        "image_url": "/images/products/jubi-12a-lite.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f05a445e-919f-5503-bd19-03ed33770508",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 12A DSP",
    "slug": "jubi-12a-dsp",
    "sku": "12ADSP",
    "brand": "PHONIC",
    "description": "#### Loa Jubi 12A DSP thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 700W, sử dụng công nghệ Class D cung cấp 126 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đ",
    "sale_enabled": true,
    "sale_price": 10608840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-12a-dsp.png",
    "images": [
      {
        "id": "img-1039648806",
        "image_url": "/images/products/jubi-12a-dsp.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "43801539-8aca-5845-a793-7bd1171bc8bc",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 12AR",
    "slug": "jubi-12ar",
    "sku": "12AR",
    "brand": "PHONIC",
    "description": "#### Loa Jubi 12AR thiết lập một mô hình mới cho loa có công suất (Powered Speaker) của PHONIC. Bộ khuếch đại 700W, sử dụng công nghệ Class D cung cấp 126 dB SPL tối đa , đủ năng lượng, đáp ứng tốt cho các loại địa điểm và kích cỡ không gian cài đặt. Được thiết kế gọn nhẹ, tích hợp lỗ gắn chân loa chắc chắn khiến loa JuBi đạt tính linh hoạt khá cao, phù hợp với các định dạng di động ngày nay. Các kỹ sư PHONIC thiết kế một loa Bass uy lực và một loa treble 1” nén đạt được chất lượng âm thanh đáng",
    "sale_enabled": true,
    "sale_price": 8725320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-12ar.png",
    "images": [
      {
        "id": "img-1039648805",
        "image_url": "/images/products/jubi-12ar.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7ba5f46a-0ac2-5f72-9e30-114a7dadd16a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 12A",
    "slug": "jubi-12a",
    "sku": "12A",
    "brand": "PHONIC",
    "description": "#### ĐÁNH GIÁ CHUNG Loa Phonic’s Jubi 12A và Jubi 15A đánh dấu một chuẩn mực mới cho dòng loa có công suất. Amply công suất 490 Watt (RMS) của Jubi sử dụng công nghệ Class D tạo ra âm thanh nén cực đại mãnh liệt ở mức 126 tới 129dB, cung cấp đủ công suất cần thiết cho hàng loạt các địa điểm, quy mô khác nhau. Thiết kế nhẹ và móc treo khỏe, Jubi trở thành loại loa xách tay có công suất tiện lợi nhất hiện nay. Các kỹ sư âm thanh của Phonic đã thiết kế tích hợp loa trầm có từ tính mạnh và loa trebl",
    "sale_enabled": true,
    "sale_price": 7996320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-12a.png",
    "images": [
      {
        "id": "img-1039648804",
        "image_url": "/images/products/jubi-12a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "abbf1eca-4900-5b4c-b4ce-e29addd67402",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Jubi 12",
    "slug": "jubi-12",
    "sku": "JUBI12",
    "brand": "PHONIC",
    "description": "LOA PHONIC Jubi 12",
    "sale_enabled": true,
    "sale_price": 4645080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/jubi-12.png",
    "images": [
      {
        "id": "img-1039648803",
        "image_url": "/images/products/jubi-12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9284165d-2ee7-50a9-ac3b-f038e64c9a2e",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 18SBA Deluxe",
    "slug": "isk-18sba-deluxe",
    "sku": "18SBADELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK tích hợp công suất được thiết kế với dáng cong đứng, lưới loa dày 1.6mm , và tay cầm bằng kim loại. Sử dụng họng Wing-Guide 18\" giúp loa có dài tần thấp hơn các dòng loa khác trên thị trường. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK thực sự trở thành chuẩn mực mới trong phân khúc loa chuyên nghiệp hiện nay.",
    "sale_enabled": true,
    "sale_price": 17565120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-18sba-deluxe.png",
    "images": [
      {
        "id": "img-1039648802",
        "image_url": "/images/products/isk-18sba-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0b5b1f28-d394-5615-814f-9997243642d3",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 215A Deluxe",
    "slug": "isk-215a-deluxe",
    "sku": "215ADELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK được thiết kế với dáng cong đứng, lưới tản nhiệt dày, và tay cầm bằng kim loại. Sử dụng loa treble nén 1.8 '' bằng titan nguyên chất với dải tần lên tới 22kHz và loa trầm có dài tần thấp hơn các dòng loa khác trên thị trường. Seri ISK là dòng loa linh hoạt, sử dụng góc kép 45 ° với các model (iSK8 / 12/15) phù hợp cho ứng dụng loa monitor sân khấu. Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK t",
    "sale_enabled": true,
    "sale_price": 18061920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-215a-deluxe.png",
    "images": [
      {
        "id": "img-1039648801",
        "image_url": "/images/products/isk-215a-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "354b93b7-7283-5536-967b-59336ad291a8",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 15A Deluxe",
    "slug": "isk-15a-deluxe",
    "sku": "15ADELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK tích hợp công suất được thiết kế với dáng cong đứng, lưới tản nhiệt dày. Seri ISK là dòng loa linh hoạt, góc phủ rộng 90° x 70°. Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK thực sự trở thành chuẩn mực mới trong phân khúc loa chuyên nghiệp hiện nay.",
    "sale_enabled": true,
    "sale_price": 13370400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-15a-deluxe.png",
    "images": [
      {
        "id": "img-1039648800",
        "image_url": "/images/products/isk-15a-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "32a25138-94a7-5e6d-a7fd-0642f1a34b8f",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 12A Deluxe",
    "slug": "isk-12a-deluxe",
    "sku": "12ADELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK tích hợp công suất được thiết kế với dáng cong đứng, lưới tản nhiệt dày. Seri ISK là dòng loa linh hoạt, góc phủ rộng 90° x 70°. Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK thực sự trở thành chuẩn mực mới trong phân khúc loa chuyên nghiệp hiện nay.",
    "sale_enabled": true,
    "sale_price": 11799000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-12a-deluxe.png",
    "images": [
      {
        "id": "img-1039648799",
        "image_url": "/images/products/isk-12a-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4304eebb-aa48-597c-91fd-a03692f6d334",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 10A Deluxe",
    "slug": "isk-10a-deluxe",
    "sku": "10ADELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK tích hợp công suất được thiết kế với dáng cong đứng, iSK10 sử dụng lưới tản nhiệt dày 1.3mm, vơi góc phủ rộng 70° x 70°, loa treble nén 1'' bằng titan nguyên chất với dải tần lên tới 22kHz . Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK thực sự trở thành chuẩn mực mới trong phân khúc loa chuyên nghiệp hiện nay.",
    "sale_enabled": true,
    "sale_price": 11637000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-10a-deluxe.png",
    "images": [
      {
        "id": "img-1039648798",
        "image_url": "/images/products/isk-10a-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8e4cd196-1ee3-505f-8a20-f197629638bd",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 8A Deluxe",
    "slug": "isk-8a-deluxe",
    "sku": "8ADELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK tích hợp công suất được thiết kế với dáng cong đứng, iSK8 sử dụng lưới tản nhiệt dày 1.3mm, vơi góc phủ rộng 70° x 70°, loa treble nén 1'' bằng titan nguyên chất với dải tần lên tới 22kHz . Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm",
    "sale_enabled": true,
    "sale_price": 9313920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-8a-deluxe.png",
    "images": [
      {
        "id": "img-1039648797",
        "image_url": "/images/products/isk-8a-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b81c1c91-16b2-5b02-b3ef-b7f85a510226",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 18SB Deluxe",
    "slug": "isk-18sb-deluxe",
    "sku": "18SBDELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK được thiết kế với dáng cong đứng, lưới tản nhiệt dày, và tay cầm bằng kim loại. Sử dụng loa treble nén 1.8 '' bằng titan nguyên chất với dải tần lên tới 22kHz và loa trầm có dài tần thấp hơn các dòng loa khác trên thị trường. Seri ISK là dòng loa linh hoạt, sử dụng góc kép 45 ° với các model (iSK8 / 12/15) phù hợp cho ứng dụng loa monitor sân khấu. Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK t",
    "sale_enabled": true,
    "sale_price": 12549600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-18sb-deluxe.png",
    "images": [
      {
        "id": "img-1039648796",
        "image_url": "/images/products/isk-18sb-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6183d4af-ee56-5f48-b530-f0e0c3937b99",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 215 Deluxe",
    "slug": "isk-215-deluxe",
    "sku": "215DELUXE",
    "brand": "PHONIC",
    "description": "LOA PHONIC iSK 215 Deluxe",
    "sale_enabled": true,
    "sale_price": 13080960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-215-deluxe.png",
    "images": [
      {
        "id": "img-1039648795",
        "image_url": "/images/products/isk-215-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "462c9fd0-066a-5db5-8247-50a5da3a050d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 15 Deluxe",
    "slug": "isk-15-deluxe",
    "sku": "15DELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK được thiết kế với dáng cong đứng, lưới tản nhiệt dày, và tay cầm bằng kim loại. Sử dụng loa treble nén 1.8 '' bằng titan nguyên chất với dải tần lên tới 22kHz và loa trầm có dài tần thấp hơn các dòng loa khác trên thị trường. Seri ISK là dòng loa linh hoạt, sử dụng góc kép 45 ° với các model (iSK8 / 12/15) phù hợp cho ứng dụng loa monitor sân khấu. Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK t",
    "sale_enabled": true,
    "sale_price": 8910000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-15-deluxe.png",
    "images": [
      {
        "id": "img-1039648794",
        "image_url": "/images/products/isk-15-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ab148d59-c3a4-5f26-b3ba-b966d4a28dfd",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 12 Deluxe",
    "slug": "isk-12-deluxe",
    "sku": "12DELUXE",
    "brand": "PHONIC",
    "description": "LOA PHONIC iSK 12 Deluxe",
    "sale_enabled": true,
    "sale_price": 7523280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-12-deluxe.png",
    "images": [
      {
        "id": "img-1039648793",
        "image_url": "/images/products/isk-12-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f3a6cded-a3f1-535e-93ce-6a2bb97032e5",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 10 Deluxe",
    "slug": "isk-10-deluxe",
    "sku": "10DELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK tích hợp công suất được thiết kế với dáng cong đứng, iSK10 sử dụng lưới tản nhiệt dày 1.3mm, vơi góc phủ rộng 70° x 70°, loa treble nén 1'' bằng titan nguyên chất với dải tần lên tới 22kHz . Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK thực sự trở thành chuẩn mực mới trong phân khúc loa chuyên nghiệp hiện nay.",
    "sale_enabled": true,
    "sale_price": 7442280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-10-deluxe.png",
    "images": [
      {
        "id": "img-1039648792",
        "image_url": "/images/products/isk-10-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "336a9662-e610-5533-92e5-d897e7d515b7",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 8 Deluxe",
    "slug": "isk-8-deluxe",
    "sku": "8DELUXE",
    "brand": "PHONIC",
    "description": "#### Seri iSK được thiết kế với dáng cong đứng, lưới tản nhiệt dày, và tay cầm bằng kim loại. Sử dụng loa treble nén 1.8 '' bằng titan nguyên chất với dải tần lên tới 22kHz và loa trầm có dài tần thấp hơn các dòng loa khác trên thị trường. Seri ISK là dòng loa linh hoạt, sử dụng góc kép 45 ° với các model (iSK8 / 12/15) phù hợp cho ứng dụng loa monitor sân khấu. Lớp sơn được xử lý bằng công nghệ cao chống xước tốt. Với chất lượng âm thanh vượt trội, dẽ dàng kết nối trong hệ thống âm thanh, ISK t",
    "sale_enabled": true,
    "sale_price": 4668840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-8-deluxe.png",
    "images": [
      {
        "id": "img-1039648791",
        "image_url": "/images/products/isk-8-deluxe.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "80d9df36-4b00-5be0-8547-5855e9a4ad23",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 18SB",
    "slug": "isk-18sb",
    "sku": "18SB",
    "brand": "PHONIC",
    "description": "#### With its signature vertical curvatures, thick foamed grille, and ergonomic metal handles, the studio-tuned iSK establishes itself as the new segment benchmark. The iSK’s new 1.8’’ pure titanium compression tweeters gracefully extends beyond 22kHz and long-throw woofers reaches lower F0’s than other woofers on the market. The iSK series is the most versatile in its class, dual angle pole-mounts (iSK8/12/15), and a 45° floor monitor position for two-way models. Finally, the iSKs are incredibl",
    "sale_enabled": true,
    "sale_price": 9660600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-18sb.png",
    "images": [
      {
        "id": "img-1039648790",
        "image_url": "/images/products/isk-18sb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cbc145cf-1def-5c61-9238-00238bfa4ec0",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 215",
    "slug": "isk-215",
    "sku": "ISK215",
    "brand": "PHONIC",
    "description": "LOA PHONIC iSK 215",
    "sale_enabled": true,
    "sale_price": 10041840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-215.png",
    "images": [
      {
        "id": "img-1039648789",
        "image_url": "/images/products/isk-215.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f57c33f7-c800-5003-b5ee-90a73f80c421",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 15",
    "slug": "isk-15",
    "sku": "ISK15",
    "brand": "PHONIC",
    "description": "#### With its signature vertical curvatures, thick foamed grille, and ergonomic metal handles, the studio-tuned iSK establishes itself as the new segment benchmark. The iSK’s new 1.8’’ pure titanium compression tweeters gracefully extends beyond 22kHz and long-throw woofers reaches lower F0’s than other woofers on the market. The iSK series is the most versatile in its class, dual angle pole-mounts (iSK8/12/15), and a 45° floor monitor position for two-way models. Finally, the iSKs are incredibl",
    "sale_enabled": true,
    "sale_price": 6240240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-15.png",
    "images": [
      {
        "id": "img-1039648788",
        "image_url": "/images/products/isk-15.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6972e3b2-a1aa-5434-b5aa-573bd3ac697c",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC iSK 12",
    "slug": "isk-12",
    "sku": "ISK12",
    "brand": "PHONIC",
    "description": "#### With its signature vertical curvatures, thick foamed grille, and ergonomic metal handles, the studio-tuned iSK establishes itself as the new segment benchmark. The iSK’s new 1.8’’ pure titanium compression tweeters gracefully extends beyond 22kHz and long-throw woofers reaches lower F0’s than other woofers on the market. The iSK series is the most versatile in its class, dual angle pole-mounts (iSK8/12/15), and a 45° floor monitor position for two-way models. Finally, the iSKs are incredibl",
    "sale_enabled": true,
    "sale_price": 5650560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/isk-12.png",
    "images": [
      {
        "id": "img-1039648787",
        "image_url": "/images/products/isk-12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "48de7a80-c400-5dbd-8e40-8e43a646c95f",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC ASK 18SB",
    "slug": "ask-18sb",
    "sku": "ASK18SB",
    "brand": "PHONIC",
    "description": "LOA PHONIC ASK 18SB",
    "sale_enabled": true,
    "sale_price": 8031960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ask-18sb.png",
    "images": [
      {
        "id": "img-1039648786",
        "image_url": "/images/products/ask-18sb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f50527c0-6869-5226-9b0c-54c5dbb9f02a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC ASK 215",
    "slug": "ask-215",
    "sku": "ASK215",
    "brand": "PHONIC",
    "description": "LOA PHONIC ASK 215",
    "sale_enabled": true,
    "sale_price": 8158320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ask-215.png",
    "images": [
      {
        "id": "img-1039648785",
        "image_url": "/images/products/ask-215.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "470f3403-3327-5faa-bf0b-16b9aea7f959",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC ASK 15",
    "slug": "ask-15",
    "sku": "ASK15",
    "brand": "PHONIC",
    "description": "LOA PHONIC ASK 15",
    "sale_enabled": true,
    "sale_price": 4888080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ask-15.png",
    "images": [
      {
        "id": "img-1039648784",
        "image_url": "/images/products/ask-15.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c8268c24-5dfb-503f-ad5a-97bdbed2be68",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC ASK 12",
    "slug": "ask-12",
    "sku": "ASK12",
    "brand": "PHONIC",
    "description": "LOA PHONIC ASK 12",
    "sale_enabled": true,
    "sale_price": 4229280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ask-12.png",
    "images": [
      {
        "id": "img-1039648783",
        "image_url": "/images/products/ask-12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a86bf5a0-69bb-5575-b7d6-a7aae61b1617",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SK 10",
    "slug": "ask-10",
    "sku": "SK10",
    "brand": "PHONIC",
    "description": "LOA PHONIC SK 10",
    "sale_enabled": true,
    "sale_price": 3132000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ask-10.png",
    "images": [
      {
        "id": "img-1039648782",
        "image_url": "/images/products/ask-10.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6e830b01-a897-5b71-9a21-06a71b0fa4a9",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SEM715",
    "slug": "sem715",
    "sku": "SEM715",
    "brand": "PHONIC",
    "description": "#### The SEM 715 2-way Stage/Floor Speaker displays a power handling ability of up to 400 Watts (program). The SEM 715 incorporates a 15\" heavy duty woofer with a piezo tweeter, and partners well with Phonic´s Powerpod 740 Plus, and Powerpod 1062 Plus, as well as the more powerful Powerpod 1860 Plus, due to their capability to handle more power.",
    "sale_enabled": true,
    "sale_price": 3454920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sem715.png",
    "images": [
      {
        "id": "img-1039648781",
        "image_url": "/images/products/sem715.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c1d6fba1-a038-5de5-a1b4-57b97e3d2517",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SEM712",
    "slug": "sem712",
    "sku": "SEM712",
    "brand": "PHONIC",
    "description": "#### The SEM 712 Plus gives you more power for your money. This starter unit features a 12\" heavy duty woofer and piezo tweeter, with power handling reaching 340 Watts (Program) or 170 Watts (RMS). The SEM 712 Plus Speakers complement the Powerpods 620 and 740 Plus perfectly to form a cost-effective audio solution for FOH application.",
    "sale_enabled": true,
    "sale_price": 2704320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sem712.png",
    "images": [
      {
        "id": "img-1039648780",
        "image_url": "/images/products/sem712.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9bfd8ec7-a9e6-5b42-b3f0-a78feb293c7b",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SEM710",
    "slug": "sem710",
    "sku": "SEM710",
    "brand": "PHONIC",
    "description": "#### The SEM 710 gives you more power for your money. This starter unit features a 10\" heavy duty woofer and piezo tweeter, with power handling reaching 160 Watts (Program) or 80 Watts (RMS). The SEM 710 Speakers complement the Powerpods 410 and 620 Plus perfectly to form a cost-effective audio solution for FOH application.",
    "sale_enabled": true,
    "sale_price": 2010960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sem710.png",
    "images": [
      {
        "id": "img-1039648779",
        "image_url": "/images/products/sem710.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "124148b7-a1b9-5e97-9fbf-bdef4f742b9d",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU PHONIC PowerPack 750",
    "slug": "powerpack-750",
    "sku": "PowerPack 750",
    "brand": "PHONIC",
    "description": "#### Since its introduction in 1998, the Powerpod740 (previously called Powerpod7) has proved to be an excellent choice for musicians and venues alike. The Powerpod740 offers power and flexibility that can withstand ‘life on the road’. Two separate 200 watt amplifiers enable the user to configure the output in three different ways, either Main + Main, Main + Monitor or Main only (Bridged operation, 400W). The Powerpod740 has all the patching necessary to connect you to more amplifiers and an ext",
    "sale_enabled": true,
    "sale_price": 18582480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpack-750.png",
    "images": [
      {
        "id": "img-1039648778",
        "image_url": "/images/products/powerpack-750.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "937a5b72-bf0e-59b4-bcb9-e1d6f36faaa6",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU PHONIC PowerPack 630",
    "slug": "powerpack-630",
    "sku": "PowerPack 630",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod 630 RW powered mixer is a versatile front of house PA mixer built into a compact and durable molded cabinet. Each Powerpod 630 RW has a built-in stereo amplifier which is bridgeable and patchable. Super Hi-Z inputs allow for the addition of guitars and other instruments. A USB recorder/player is also incorporated into the unit, allowing the main mix to be captured onto any standard USB storage device. The units also offer high definition digital effects with 16 preset pr",
    "sale_enabled": true,
    "sale_price": 15115680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpack-630.png",
    "images": [
      {
        "id": "img-1039648777",
        "image_url": "/images/products/powerpack-630.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4e82e3ca-7cf8-5477-9a9a-1a10f9895829",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "BỘ XỬ LÝ TÍN HIỆU PHONIC PowerPack 415",
    "slug": "powerpack-415",
    "sku": "PowerPack 415",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod Series are powered mixers in a compact and durable design. The Powerpod 415RW has four Mic/Line input channels and a built-in 150 Watt amplifier, as well as onboard USB module for recording and playback and Bluetooth Module for wireless audio streaming. The 2-band EQ on every channel gives you maximum control over […]",
    "sale_enabled": true,
    "sale_price": 5374080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpack-415.png",
    "images": [
      {
        "id": "img-1039648776",
        "image_url": "/images/products/powerpack-415.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "efefc854-92ed-5c09-98fa-7a0521f50e28",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NGUỒN XUYẾN PHONIC ICON 700",
    "slug": "icon-700",
    "sku": "ICON 700",
    "brand": "PHONIC",
    "description": "#### ICON Series power amplifiers are designed with the needs of sound contractors in mind. Barrier strip outputs enable 25V, 70V and 100V Line operation. As well as the connection to standard low impedance speakers. Each amplifier channel has a separate toroidal secondary transformer that provides full electrical isolation and ensures maximum audio separation. Features like power up muting, full short-circuit, temperature, DC offset protection and a built-in 45 Hz subsonic filter, combine to ma",
    "sale_enabled": true,
    "sale_price": 19414080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/icon-700.png",
    "images": [
      {
        "id": "img-1039648766",
        "image_url": "/images/products/icon-700.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "59559a7d-ee7a-54b3-8f09-95b049586758",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NGUỒN XUYẾN PHONIC ICON 300",
    "slug": "icon-300",
    "sku": "ICON 300",
    "brand": "PHONIC",
    "description": "#### ICON series power amplifiers are designed with the needs of sound contractors in mind. Barrier strip outputs enable 25V, 70V and 100V Line operation. As well as the connection to standard low impedance speakers. Each amplifier channel has a separate toroidal secondary transformer that provides full electrical isolation and ensures maximum audio separation. Features like power up muting, full short-circuit, temperature, DC offset protection and a built-in 45 Hz subsonic filter, combine to ma",
    "sale_enabled": true,
    "sale_price": 14929920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/icon-300.png",
    "images": [
      {
        "id": "img-1039648765",
        "image_url": "/images/products/icon-300.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4ec1d4a8-05c3-5e6a-8f19-b235bc3af088",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NGUỒN XUYẾN PHONIC XP 6000",
    "slug": "xp-6000",
    "sku": "XP 6000",
    "brand": "PHONIC",
    "description": "#### Phonic's XP series of power amplifiers delivers from 1120 to 6000 Watts of power in two to three rack spaces. Built around robust and advanced toroidal transformers, they deliver clean power on demand. The advanced protection circuitry guards against short circuit and open circuit, and also protects against ultrasonic and RF interference. A high current power supply increases reliability and performance. Other features include center-detented gain controls, input peak limiter, selectable hi",
    "sale_enabled": true,
    "sale_price": 37337760,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xp-6000.png",
    "images": [
      {
        "id": "img-1039648764",
        "image_url": "/images/products/xp-6000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ffbf95ca-6835-53bf-8747-33e5e74fb7d2",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NGUỒN XUYẾN PHONIC XP 5000",
    "slug": "xp-5000",
    "sku": "XP 5000",
    "brand": "PHONIC",
    "description": "#### Seri amply XP của Phonic cung cấp công suất từ 1120-5000 Watt . Trang bị cơ chế bảo vệ chống ngắn mạch, và tính năng bảo vệ chống sự can thiệp của siêu âm và RF. Công suất cao, tăng độ tin cậy và hiệu suất hoạt động. Trang bị các quạt với tốc độ cao hiệu quả trong việc làm mát amp và bảo vệ chống quá nóng. Cổng Input với chuẩn kết nối XLR hoặc 1/4 \", Output có thể dùng Speakon hoặc Giắc bông chuối. Phonic XP được thiết kế đặc biệt cho các các ứng dụng cần công suất cao, âm thanh rõ ràng, độ",
    "sale_enabled": true,
    "sale_price": 29872800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xp-5000.png",
    "images": [
      {
        "id": "img-1039648763",
        "image_url": "/images/products/xp-5000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a7676fd1-39e6-56db-aaae-609087af447e",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NGUỒN XUYẾN PHONIC XP 3000",
    "slug": "xp-3000",
    "sku": "XP 3000",
    "brand": "PHONIC",
    "description": "#### Phonic's XP series of power amplifiers delivers from 1120 to 5000 Watts of power in two to three rack spaces. Built around robust and advanced toroidal transformers, they deliver clean power on demand. The advanced protection circuitry guards against short circuit and open circuit, and also protects against ultrasonic and RF interference. A high current power supply increases reliability and performance. Other features include center-detented gain controls, input peak limiter, selectable hi",
    "sale_enabled": true,
    "sale_price": 20904480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xp-3000.png",
    "images": [
      {
        "id": "img-1039648762",
        "image_url": "/images/products/xp-3000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bad41cef-11b6-5327-a817-0eaaced2c0a1",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY NGUỒN XUYẾN PHONIC XP 2000",
    "slug": "xp-2000",
    "sku": "XP 2000",
    "brand": "PHONIC",
    "description": "#### Phonic's XP series power amplifiers deliver from 1120 to 5000 Watts of power in two to three rack spaces. Built around robust and advanced toroidal transformers, they deliver clean power on demand. The advanced protection circuitry guards against short circuit and open circuit, and also protects against ultrasonic and RF interference. A high current power supply increases reliability and performance. Other features include center-detented gain controls, input peak limiter, selectable high p",
    "sale_enabled": true,
    "sale_price": 17021880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xp-2000.png",
    "images": [
      {
        "id": "img-1039648761",
        "image_url": "/images/products/xp-2000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9e215c2f-9b3f-5b6a-8563-4ad70783c196",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Smartman700WPC",
    "slug": "smartman700wpc",
    "sku": "Smartman700WPC",
    "brand": "PHONIC",
    "description": "LOA PHONIC Smartman700WPC",
    "sale_enabled": true,
    "sale_price": 1629720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/smartman700wpc.png",
    "images": [
      {
        "id": "img-1039648758",
        "image_url": "/images/products/smartman700wpc.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "96f57990-17df-5fad-934b-8697e962dc0e",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Smartman 708A",
    "slug": "smartman-708a",
    "sku": "Smartman 708A",
    "brand": "PHONIC",
    "description": "#### You don't have to be college educated to be a smart man, as long as you know the new Phonic Smartman is the smart choice in audio systems. Smartman combines the convenience of active speakers - combining loudspeaker and amplifier technologies - with digital mixing and signal processing. Built-in WiFi allows wireless connection to your tablet allowing control of levels, equalizers, dynamics and digital effects. A USB port has been included for recording and playback of digital audio to and f",
    "sale_enabled": true,
    "sale_price": 22811760,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/smartman-708a.png",
    "images": [
      {
        "id": "img-1039648757",
        "image_url": "/images/products/smartman-708a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e4c49b1a-5ab0-5257-9fe2-81f341528f79",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Smartman 703A",
    "slug": "smartman-703a",
    "sku": "Smartman 703A",
    "brand": "PHONIC",
    "description": "#### The Phonic Smartman 703A 1100w All-in-one Audio System is a convenient PA speaker with an integrated mixer and digital media player. Combining a loudpseaker with digital mixing and signal processing, the Phonic Smartman gives you the ultimate flexibility from a PA speaker. The Smartman 703A PA speaker features built in WiFi functionality that allows you to connect wireless devices, including smartphones and tablets to control levels, equalizers, dynamics and digital effects. The UHF capabil",
    "sale_enabled": true,
    "sale_price": 21828960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/smartman-703a.png",
    "images": [
      {
        "id": "img-1039648756",
        "image_url": "/images/products/smartman-703a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e835b4b2-4be5-5dc6-8095-8750b152f293",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Smartman 700A",
    "slug": "smartman-700a",
    "sku": "Smartman 700A",
    "brand": "PHONIC",
    "description": "#### Phonic Smartman 700A Active Loudspeaker Smartman active expansion speaker uses Class D to provide sufficient power for a wide range of venues, large and small. Its stylish polymer enclosure also improves acoustical accuracy by minimizing distortion and diffraction. Finally, reliability and durability was the paramount factor throughout the Smartman's development. Smartman active expansion speaker is designed uniquely to work with Smartman Integrated Audio System. By chaining together, Smart",
    "sale_enabled": true,
    "sale_price": 16293960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/smartman-700a.png",
    "images": [
      {
        "id": "img-1039648755",
        "image_url": "/images/products/smartman-700a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2b0328e2-105a-5a4f-9b0a-14da8cfa4ba2",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Smartman 303A",
    "slug": "smartman-303a",
    "sku": "Smartman 303A",
    "brand": "PHONIC",
    "description": "#### Phonic Smartman 303A Active Loudspeaker You don't have to be college educated to be a smart man, as long as you know the new Phonic Smartman is the smart choice in audio systems. Smartman combines the convenience of active speakers - combining loudspeaker and amplifier technologies - with digital mixing and signal processing. Built-in WiFi allows wireless connection to your tablet allowing control of levels, equalizers, dynamics and digital effects. A USB port has been included for recordin",
    "sale_enabled": true,
    "sale_price": 15312240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/smartman-303a.png",
    "images": [
      {
        "id": "img-1039648754",
        "image_url": "/images/products/smartman-303a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e3b64db0-b3f4-5d55-947c-db2f2b273138",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC Smartman 300A",
    "slug": "smartman-300a",
    "sku": "Smartman 300A",
    "brand": "PHONIC",
    "description": "#### Phonic Smartman 300A Active Loudspeaker Smartman active expansion speaker uses Class D to provide sufficient power for a wide range of venues, large and small. Its stylish polymer enclosure also improves acoustical accuracy by minimizing distortion and diffraction. Finally, reliability and durability was the paramount factor throughout the Smartman's development. Smartman active expansion speaker is designed uniquely to work with Smartman Integrated Audio System. By chaining together, Smart",
    "sale_enabled": true,
    "sale_price": 9776160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/smartman-300a.png",
    "images": [
      {
        "id": "img-1039648753",
        "image_url": "/images/products/smartman-300a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0e4e6221-91c2-5faf-9cae-6992bbface7e",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "THIẾT BỊ ĐO ÂM THANH PHONIC PAA6",
    "slug": "paa6",
    "sku": "PAA6",
    "brand": "PHONIC",
    "description": "#### Essential tools, such as the Phonic PAA6 Professional Audio Assistant generally wind up at the bottom of pro audio wishlists after esoteric preamps, compressors, and EQs. But more often than not, the key to great sound lies in the utilitarian gear, particularly, the Phonic PAA6 audio analyzer. If you want to get the most out of your studio equipment or PA system, the PAA6 should be at the top of your bucket list. A highly accurate measurement tool, the elegant touch screen interface of the ",
    "sale_enabled": true,
    "sale_price": 36932760,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/paa6.png",
    "images": [
      {
        "id": "img-1039648752",
        "image_url": "/images/products/paa6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0f34ed6e-94fc-5f1a-b442-ef69f11645df",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "THIẾT BỊ ĐO ÂM THANH PHONIC PAA3X",
    "slug": "paa3x",
    "sku": "PAA3X",
    "brand": "PHONIC",
    "description": "#### The PAA3X is a highly accurate handheld audio analyzer that gives sound engineers a rich array of sound analysis tools. The system features both 61-band and 31-band real time spectrum analysis, RT60 reverb time measurement, SPL and line meter, internal signal generator, EQ setting program, microphone calibration and speaker phase checking abilities. All functions and menus can be accessed through a central jog dial, leaving your other hand free to adjust audio settings. The large color LCD ",
    "sale_enabled": true,
    "sale_price": 20361240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/paa3x.png",
    "images": [
      {
        "id": "img-1039648751",
        "image_url": "/images/products/paa3x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "925e55f0-c0f7-52ce-a724-14e724299263",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 2000WPC",
    "slug": "safari-2000wpc",
    "sku": "2000WPC",
    "brand": "PHONIC",
    "description": "#### Phonic Safari là hệ thống âm thanh di động, sử dụng một loa trầm chất lượng, một treble hiệu suất cao và sự tích hợp của amply class D mạnh mẽ, hệ thống âm thanh di động Safari đạt độ tin cậy và hoạt động bền vững ở nhiều loại môi trường. Với một loạt các thành phần tùy chọn, Safari cung cấp nhiều tiện ích cho người dùng bao gồm máy nghe đĩa CD với MP3, micro không dây . Safari phù hợp với các buổi thuyết giảng ngoài trời - trong nhà , hội trường vừa và nhỏ, du lịch, các ứng dụng âm thanh c",
    "sale_enabled": true,
    "sale_price": 901800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-2000wpc.png",
    "images": [
      {
        "id": "img-1039648750",
        "image_url": "/images/products/safari-2000wpc.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "46f20e3d-62b6-5d02-bb5b-d3009370cd5d",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 2000DC",
    "slug": "safari-2000dc",
    "sku": "2000DC",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 2000DC",
    "sale_enabled": true,
    "sale_price": 1340280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-2000dc.png",
    "images": [
      {
        "id": "img-1039648749",
        "image_url": "/images/products/safari-2000dc.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "38ad42c1-a02a-5032-b51f-02b04f600f24",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 3000DC",
    "slug": "safari-3000dc",
    "sku": "3000DC",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 3000DC",
    "sale_enabled": true,
    "sale_price": 358560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-3000dc.png",
    "images": [
      {
        "id": "img-1039648748",
        "image_url": "/images/products/safari-3000dc.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f4cb5a3b-32c4-5011-ad2c-7ee4539761bf",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WH-1",
    "slug": "wh-1",
    "sku": "PHONIC WH-1",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WH-1",
    "sale_enabled": true,
    "sale_price": 4784400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wh-1.png",
    "images": [
      {
        "id": "img-1039648747",
        "image_url": "/images/products/wh-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bef5711e-e888-5e78-b8e6-2cce6b4761b4",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY CÀI ÁO PHONIC WL-1",
    "slug": "wl-1",
    "sku": "PHONIC WL-1",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY CÀI ÁO PHONIC WL-1",
    "sale_enabled": true,
    "sale_price": 3882600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wl-1.png",
    "images": [
      {
        "id": "img-1039648746",
        "image_url": "/images/products/wl-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6e60a239-2e6b-55f9-820c-9f424cdab114",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY CẦM TAY PHONIC WM-1",
    "slug": "wm-1",
    "sku": "PHONIC WM-1",
    "brand": "PHONIC",
    "description": "#### The WM-1S, WL-1S, and WH-1S are wireless microphone systems designed exclusively for Phonic's Safari all-in-one mobile solutions and Smartman intelligent audio solutions. Phonic's new wireless system has state-of-the-art technology including one-touch frequency autoscan and hardware/software noise elimination. All systems feature a long-lasting power system that can operate over 8 hours on a pair of AA Alkaline batteries. With these and many other advanced features, it is easier than ever t",
    "sale_enabled": true,
    "sale_price": 3223800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wm-1.png",
    "images": [
      {
        "id": "img-1039648745",
        "image_url": "/images/products/wm-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4d56b7b8-528c-5434-aea8-4520d6810648",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY CẦM TAY PHONIC WML-2S",
    "slug": "wml-2s",
    "sku": "PHONIC WML-2S",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY CẦM TAY PHONIC WML-2S",
    "sale_enabled": true,
    "sale_price": 9857160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wml-2s.png",
    "images": [
      {
        "id": "img-1039648742",
        "image_url": "/images/products/wml-2s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3a50b63a-2db5-5c98-9d80-ee2ed314bb14",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WH-2S",
    "slug": "wh-2s",
    "sku": "PHONIC WH-2S",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WH-2S",
    "sale_enabled": true,
    "sale_price": 10458720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wh-2s.png",
    "images": [
      {
        "id": "img-1039648741",
        "image_url": "/images/products/wh-2s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "275f72db-987e-5d92-8a6d-c20d5d46bd89",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY CÀI ÁO PHONIC WL-2S",
    "slug": "wl-2s",
    "sku": "PHONIC WL-2S",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY CÀI ÁO PHONIC WL-2S",
    "sale_enabled": true,
    "sale_price": 10157400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wl-2s.png",
    "images": [
      {
        "id": "img-1039648740",
        "image_url": "/images/products/wl-2s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8a940b3b-7c98-551a-96e6-ff7c93ac734c",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WM-2S",
    "slug": "wm-2s",
    "sku": "PHONIC WM-2S",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WM-2S",
    "sale_enabled": true,
    "sale_price": 9556920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wm-2s.png",
    "images": [
      {
        "id": "img-1039648739",
        "image_url": "/images/products/wm-2s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b4f91df0-dc0f-5ffa-8adb-1d11c80e5bb0",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WH-1S",
    "slug": "wh-1s",
    "sku": "PHONIC WH-1S",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY GÀI ĐẦU PHONIC WH-1S",
    "sale_enabled": true,
    "sale_price": 6876360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wh-1s.png",
    "images": [
      {
        "id": "img-1039648738",
        "image_url": "/images/products/wh-1s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bbedd599-9cec-56ae-b902-0f394aa002f3",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MICRO KHÔNG DÂY CÀI ÁO PHONIC WL-1S",
    "slug": "wl-1s",
    "sku": "PHONIC WL-1S",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MICRO KHÔNG DÂY CÀI ÁO PHONIC WL-1S",
    "sale_enabled": true,
    "sale_price": 6876360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/wl-1s.png",
    "images": [
      {
        "id": "img-1039648737",
        "image_url": "/images/products/wl-1s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "44a39ad1-ef11-5f19-9904-69cdf6bab7bb",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MỞ RỘNG KẾT NỐI LOA DI ĐỘNG PHONIC USBR-1",
    "slug": "usbr-1",
    "sku": "PHONIC USBR-1",
    "brand": "PHONIC",
    "description": "PHỤ KIỆN MỞ RỘNG KẾT NỐI LOA DI ĐỘNG PHONIC USBR-1",
    "sale_enabled": true,
    "sale_price": 3258360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/usbr-1.png",
    "images": [
      {
        "id": "img-1039648735",
        "image_url": "/images/products/usbr-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2428419e-1597-56ce-bd74-96218e9167b0",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN MỞ RỘNG KẾT NỐI LOA DI ĐỘNG PHONIC SAFARI CD/USB",
    "slug": "safari-cd-usb",
    "sku": "SAFARI CD/USB",
    "brand": "PHONIC",
    "description": "#### Play audio CDs Play digital audio files from CDs, USB flash drives or SD cards Includes infrared remote control Record audio to USB drives or SD cards Optional accessory only",
    "sale_enabled": true,
    "sale_price": 6274800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-cd-usb.png",
    "images": [
      {
        "id": "img-1039648734",
        "image_url": "/images/products/safari-cd-usb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ed347a51-9256-5eaa-8510-cf0d34269278",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 1000Lite",
    "slug": "safari-1000lite",
    "sku": "SAFARI 1000Lite",
    "brand": "PHONIC",
    "description": "#### The Phonic Safari 1000 Lite is an all-in-one, battery-powered PA system designed for portability. Featuring a lightweight (at 3.7 lb) and ergonomic design with rounded corners, a shoulder strap, a 50W Class-D amplifier, and a wired microphone, it allows guides, teachers, or announcers to comfortably carry the unit around while reaching crowds up to 100",
    "sale_enabled": true,
    "sale_price": 4403160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-1000lite.png",
    "images": [
      {
        "id": "img-1039648733",
        "image_url": "/images/products/safari-1000lite.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3067a5b4-741a-53b9-ac8c-0e2801cdde41",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 1000D",
    "slug": "safari-1000d",
    "sku": "SAFARI 1000D",
    "brand": "PHONIC",
    "description": "#### Safari 100 M là dòng sản phẩm \"tất cả trong một\" mới nhất của PHONIC. Đây là giải pháp âm thanh sử dụng pin sạc hoàn hảo, với công suất 50W, đủ sử dụng cho khoảng 100 người. Thiết kế nhỏ gọn, có tay cầm và khối lượng chỉ 1.9kg giúp bạn dễ dàng sách bên tay khi di chuyển, trong các chuyến đi, du lịch hay sinh hoạt hội nhóm",
    "sale_enabled": true,
    "sale_price": 12214800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-1000d.png",
    "images": [
      {
        "id": "img-1039648732",
        "image_url": "/images/products/safari-1000d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3cf48651-b10d-5b04-9f30-0112183236f8",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 1000M",
    "slug": "safari-1000m",
    "sku": "SAFARI 1000M",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 1000M",
    "sale_enabled": true,
    "sale_price": 10585080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-1000m.png",
    "images": [
      {
        "id": "img-1039648731",
        "image_url": "/images/products/safari-1000m.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "de7b135d-c452-5567-85c4-4843ef78c511",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 1500D",
    "slug": "safari-1500d",
    "sku": "SAFARI 1500D",
    "brand": "PHONIC",
    "description": "#### Phonic Safari 1500D - Amplified Nomad speaker - Power: 60 W Peak / 30 W RMS - Inputs: 1 XLR combo / 6.35 mm Jack + 6.35 mm TS Jack + RCA - Voice Priority function - 2 WR-1 + 2 wireless receiver modules Wireless microphones: - 16 Channels - Bandwidth: 25 MHz - Frequency response: 50 Hz // 16 kHz - Scan / ACT sync function: automatic frequency scanning - USB player / recorder module with LCD screen - 2.4 GHz Bluetooth connectivity - Adjusting independent volumes + general volume © SonoVente.c",
    "sale_enabled": true,
    "sale_price": 16293960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-1500d.png",
    "images": [
      {
        "id": "img-1039648730",
        "image_url": "/images/products/safari-1500d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9426e951-b948-53ab-a63b-a05723c0740a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 1500M",
    "slug": "safari-1500m",
    "sku": "SAFARI 1500M",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 1500M",
    "sale_enabled": true,
    "sale_price": 14387760,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-1500m.png",
    "images": [
      {
        "id": "img-1039648729",
        "image_url": "/images/products/safari-1500m.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "298e53ce-6157-5992-ae30-7bce7beeb439",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 2000P",
    "slug": "safari-2000p",
    "sku": "SAFARI 2000P",
    "brand": "PHONIC",
    "description": "#### PHONIC Safari 2000 là hệ thống âm thanh di động, sử dụng một loa trầm chất lượng, một treble hiệu suất cao và sự tích hợp của amply class D mạnh mẽ, hệ thống âm thanh di động Safari đạt độ tin cậy và hoạt động bền vững ở nhiều loại môi trường. Với một loạt các thành phần tùy chọn, Safari cung cấp nhiều tiện ích cho người dùng bao gồm máy nghe đĩa CD với MP3, micro không dây Safari phù hợp với các buổi thuyết giảng ngoài trời - trong nhà , hội trường vừa và nhỏ, du lịch, các ứng dụng âm than",
    "sale_enabled": true,
    "sale_price": 5431320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-2000p.png",
    "images": [
      {
        "id": "img-1039648728",
        "image_url": "/images/products/safari-2000p.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3bb6ca77-e5f1-5354-876b-cb23c0da38b0",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 2000SYS2",
    "slug": "safari-2000sys2",
    "sku": "SAFARI 2000SYS2",
    "brand": "PHONIC",
    "description": "#### PHONIC - SAFARI 2000 SYS 2 - Portable sound system In addition to amplifying you during your speeches or presentations, even outdoors, and with the wireless microphone provided! The Safari 2000 sys 2 also offers you the possibility to keep track of your performances, thanks to its USB reader/recorder.",
    "sale_enabled": true,
    "sale_price": 19010160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-2000sys2.png",
    "images": [
      {
        "id": "img-1039648727",
        "image_url": "/images/products/safari-2000sys2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "11013c6d-5540-5cb9-98c6-a1b198085495",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 2000SYS1",
    "slug": "safari-2000sys1",
    "sku": "SAFARI 2000SYS1",
    "brand": "PHONIC",
    "description": "#### The Phonic Safari portable audio system is the ultimate in on-the-go and hit-the-road audio. Offering users a quality woofer and a high performance tweeter matched with a powerful class D power amplifier built-in, the Safari portable audio systems provide reliability and rugged operation at all times. With a host of optional components, including CD player with MP3 playback and wireless microphones, the Safari offers all the trimmings with none of the fat. Whether a professional musician, b",
    "sale_enabled": true,
    "sale_price": 21725280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-2000sys1.png",
    "images": [
      {
        "id": "img-1039648726",
        "image_url": "/images/products/safari-2000sys1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f1922ee1-8e76-516f-af72-469ef22d63bd",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 2000",
    "slug": "safari-2000",
    "sku": "SAFARI 2000",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 2000",
    "sale_enabled": true,
    "sale_price": 10041840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-2000.png",
    "images": [
      {
        "id": "img-1039648725",
        "image_url": "/images/products/safari-2000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d08c13d0-2b64-5650-b39d-e9db8939f99b",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 3000P",
    "slug": "safari-3000p",
    "sku": "SAFARI 3000P",
    "brand": "PHONIC",
    "description": "#### Phonic Safari 3000P 10\" passive expansion speaker is designed uniquely for working with the Safari 3000 system, it features 320 Watt power handling (peak), 8 ohm nominal impedance, Inputs & outputs: parallel speak on, Retractable handle & wheels.",
    "sale_enabled": true,
    "sale_price": 8956440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-3000p.png",
    "images": [
      {
        "id": "img-1039648724",
        "image_url": "/images/products/safari-3000p.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c432a791-8dc8-5110-abd4-8d34e41286bd",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 3000SYS2",
    "slug": "safari-3000sys2",
    "sku": "SAFARI 3000SYS2",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 3000SYS2",
    "sale_enabled": true,
    "sale_price": 29052000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-3000sys2.png",
    "images": [
      {
        "id": "img-1039648723",
        "image_url": "/images/products/safari-3000sys2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d2b7b9bb-4989-54e5-b612-34560343824a",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 3000SYS1",
    "slug": "safari-3000sys1",
    "sku": "SAFARI 3000SYS1",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 3000SYS1",
    "sale_enabled": true,
    "sale_price": 32044680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-3000sys1.png",
    "images": [
      {
        "id": "img-1039648722",
        "image_url": "/images/products/safari-3000sys1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d5578767-6d55-596d-8aca-a94ff5ad56b0",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PHONIC SAFARI 3000",
    "slug": "safari-3000",
    "sku": "SAFARI 3000",
    "brand": "PHONIC",
    "description": "LOA PHONIC SAFARI 3000",
    "sale_enabled": true,
    "sale_price": 20361240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/safari-3000.png",
    "images": [
      {
        "id": "img-1039648721",
        "image_url": "/images/products/safari-3000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "61d44460-05f4-55a2-9ab8-fffaee1250ec",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER PHONIC MX300",
    "slug": "mx300",
    "sku": "PHONIC MX300",
    "brand": "PHONIC",
    "description": "MIXER PHONIC MX300",
    "sale_enabled": true,
    "sale_price": 4275720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mx300.png",
    "images": [
      {
        "id": "img-1039648719",
        "image_url": "/images/products/mx300.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2bb5a9ce-a147-54e9-b4b9-ba6b285de015",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "GEQ3102F",
    "slug": "geq3102f",
    "sku": "GEQ3102F",
    "brand": "PHONIC",
    "description": "#### Phonic's GEQ3102F is the authentic soundman's choice of EQ - a dual channel 31-band equalizer, offering 6 or 12 dB of cut or boost on standard ISO center frequencies between 20 Hz and 20 KHz. The GEQ3102F is 2-rack space units high and accepts both 1/4\" TRS phone jacks and XLR connectors, making it ideal for any studio or live venue setup.",
    "sale_enabled": true,
    "sale_price": 5966136,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/geq3102f.jpg",
    "images": [
      {
        "id": "img-1039648717",
        "image_url": "/images/products/geq3102f.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5a7924ec-acb7-51e5-8590-2c52d96aedb3",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC Helix Board 32i",
    "slug": "helixboard-32i",
    "sku": "Helix Board 32i",
    "brand": "PHONIC",
    "description": "#### A defining moment in Phonic’s history was the release – and inevitable success – of the Helix Board series of mixers with built-in recording interface. The entire series received glowing reviews and accolades from numerous publications and gained an impressive reputation in the audio community. Phonic hopes to continue in that great legacy with the release of the Helix Board 32i, a 32 channel digital mixer with integrated recording interface. The Helix Board 32i offers amazingly low-noise i",
    "sale_enabled": true,
    "sale_price": 57710880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/helixboard-32i.png",
    "images": [
      {
        "id": "img-1039648716",
        "image_url": "/images/products/helixboard-32i.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b5f77ce6-ef10-56c1-abbe-698773424ba9",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC V16.2",
    "slug": "v16-2",
    "sku": "PHONIC V16.2",
    "brand": "PHONIC",
    "description": "MIXER ANALOG PHONIC V16.2",
    "sale_enabled": true,
    "sale_price": 33940080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/v16-2.png",
    "images": [
      {
        "id": "img-1039648714",
        "image_url": "/images/products/v16-2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3c71f92e-c995-51b7-8af1-828d17e50533",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC V8.2",
    "slug": "v8-2",
    "sku": "PHONIC V8.2",
    "brand": "PHONIC",
    "description": "MIXER ANALOG PHONIC V8.2",
    "sale_enabled": true,
    "sale_price": 20361240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/v8-2.png",
    "images": [
      {
        "id": "img-1039648713",
        "image_url": "/images/products/v8-2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "09982538-26c7-5b9b-bc0b-cee745596b71",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ER-12GE",
    "slug": "er-12ge",
    "sku": "VB-1039648710",
    "brand": "PHONIC",
    "description": "ER-12GE",
    "sale_enabled": true,
    "sale_price": 599000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/er-12ge.png",
    "images": [
      {
        "id": "img-1039648710",
        "image_url": "/images/products/er-12ge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ba619f7c-8c33-5125-be0f-9c912fd9bc2d",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM14GE",
    "slug": "am14ge",
    "sku": "PHONIC AM14GE",
    "brand": "PHONIC",
    "description": "#### Six Mic/Line Neutrik \"Combo\" inputs with inserts, compressors, 3-band EQ and phantom power Two stereo channels with Neutrik XLR inputs, plus two stereo line inputs Stereo USB audio interface for PC and Mac computers (24-bit, 48 KHz) Playback of MP3, WAV and FLAC files from TransFlash media Internal TransFlash module for high quality stereo recording in WAV or MP3 formats 2.4GHz Bluetooth connectivity for streaming digital audio from smart-devices 3-band, swept-mid EQ plus low cut on each mo",
    "sale_enabled": true,
    "sale_price": 16975440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am14ge.png",
    "images": [
      {
        "id": "img-1039648708",
        "image_url": "/images/products/am14ge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f82bb84a-664a-5c6f-a729-ffea07ded6f5",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM12GE",
    "slug": "am12ge",
    "sku": "PHONIC AM12GE",
    "brand": "PHONIC",
    "description": "#### bộ trộn 12 đầu vào, 8 kênh được trang bị các tính năng tư duy về phía trước như hiệu ứng kỹ thuật số, phát trực tuyến Bluetooth không dây, giao diện âm thanh USB stereo và máy ghi âm TF tíc...",
    "sale_enabled": true,
    "sale_price": 12561480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am12ge.png",
    "images": [
      {
        "id": "img-1039648707",
        "image_url": "/images/products/am12ge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0e7e3370-6108-5f7a-b2d4-614618994f30",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM8GE",
    "slug": "am8ge",
    "sku": "PHONIC AM8GE",
    "brand": "PHONIC",
    "description": "#### Building upon the classic AM-Series mixers, the updated Phonic AM8GE Gold Edition is an 8-input, 6-channel mixer equipped with forward thinking features such as digital effects, Bluetooth wireless streaming, a stereo USB audio interface, and an integrated TF recorder. The mixer is well-suited for podcasters, web conferencing, project studios, and live sound reinforcement.",
    "sale_enabled": true,
    "sale_price": 7464960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am8ge.png",
    "images": [
      {
        "id": "img-1039648706",
        "image_url": "/images/products/am8ge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1d0a023d-773a-5234-a2ac-3843e23a2ecc",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM6GE",
    "slug": "am6ge",
    "sku": "PHONIC AM6GE",
    "brand": "PHONIC",
    "description": "#### Building upon the classic AM-Series mixers, the updated Phonic AM6GE Gold Edition is a 6-input, 4-channel mixer equipped with forward thinking features such as Bluetooth wireless streaming, a stereo USB audio interface, and an integrated TF recorder. The mixer is well-suited for podcasters, live streaming, web conferencing, project studios, and live",
    "sale_enabled": true,
    "sale_price": 4587840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am6ge.png",
    "images": [
      {
        "id": "img-1039648705",
        "image_url": "/images/products/am6ge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "90df301a-e083-5644-b1d9-a6b66733bed3",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM5GE",
    "slug": "am5ge",
    "sku": "PHONIC AM5GE",
    "brand": "PHONIC",
    "description": "#### Phonic's all-new Gold Editions of the classic AM series of mixers offer more ways to record your audio than ever before. We begin with a stereo USB interface for sending audio to and from any modern PC or Mac computer. This allows recording and/or playback of digital audio in quality far superior to the average compact disc (24-bit, 48 KHz). A superior onboard module is also included, offering both TransFlash (TF) recording and playback in addition to BT connectivity. The TF portion allows ",
    "sale_enabled": true,
    "sale_price": 3397680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am5ge.png",
    "images": [
      {
        "id": "img-1039648704",
        "image_url": "/images/products/am5ge.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0bf3ae55-ba87-5869-84a0-e11ead839a55",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC CELEUS800",
    "slug": "celeus800",
    "sku": "PHONIC CELEUS800",
    "brand": "PHONIC",
    "description": "#### Mixer Celeus mang đến một diện mạo hoàn toàn mới trong chuỗi mixer analog của Phonic. Với cấu trúc bằng nhựa đúc, Celeus cung cấp một mức độ mới trong phong cách thiết kế cũng như độ bền tối ưu của sản phẩm. Mixer Phonic Celeus còn là sự kết tinh đầy đủ các tính năng ưu việt của các dòng mixer analog trước đó. Như tiếng ồn thấp, chất lượng âm thanh chân thật với 3 - 4 band EQ. Đặc biệt hơn công nghệ kết nối Blue Tooth và USB module đảm bảo các model của Celeus sẽ chạm đến một kỷ nguyên mới ",
    "sale_enabled": true,
    "sale_price": 12237480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/celeus800.png",
    "images": [
      {
        "id": "img-1039648703",
        "image_url": "/images/products/celeus800.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "135e61a8-f9c0-5447-a9ed-9a35672bb6a9",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC CELEUS600",
    "slug": "celeus600",
    "sku": "PHONIC CELEUS600",
    "brand": "PHONIC",
    "description": "#### Mixer Celeus mang đến một diện mạo hoàn toàn mới trong chuỗi mixer analog của Phonic. Với cấu trúc bằng nhựa đúc, Celeus cung cấp một mức độ mới trong phong cách thiết kế cũng như độ bền tối ưu của sản phẩm. Mixer Phonic Celeus còn là sự kết tinh đầy đủ các tính năng ưu việt của các dòng mixer analog trước đó. Như tiếng ồn thấp, chất lượng âm thanh chân thật với 3 - 4 band EQ. Đặc biệt hơn công nghệ kết nối Blue Tooth và USB module đảm bảo các model của Celeus sẽ chạm đến một kỷ nguyên mới ",
    "sale_enabled": true,
    "sale_price": 10053720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/celeus600.png",
    "images": [
      {
        "id": "img-1039648702",
        "image_url": "/images/products/celeus600.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "51c61bee-42d0-5f0b-8954-f57bd7d363d3",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC CELEUS400",
    "slug": "celeus400",
    "sku": "PHONIC CELEUS400",
    "brand": "PHONIC",
    "description": "#### Mixer Celeus mang đến một diện mạo hoàn toàn mới trong chuỗi mixer analog của Phonic. Với cấu trúc bằng nhựa đúc, Celeus cung cấp một mức độ mới trong phong cách thiết kế cũng như độ bền tối ưu của sản phẩm. Mixer Phonic Celeus còn là sự kết tinh đầy đủ các tính năng ưu việt của các dòng mixer analog trước đó. Như tiếng ồn thấp, chất lượng âm thanh chân thật với 3 - 4 band EQ. Đặc biệt hơn công nghệ kết nối Blue Tooth và USB module đảm bảo các model của Celeus sẽ chạm đến một kỷ nguyên mới ",
    "sale_enabled": true,
    "sale_price": 5038200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/celeus400.png",
    "images": [
      {
        "id": "img-1039648701",
        "image_url": "/images/products/celeus400.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "337a66cc-633c-5a33-b37d-3eaa8896ec05",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM3242FX",
    "slug": "am3242fx",
    "sku": "PHONIC AM3242FX",
    "brand": "PHONIC",
    "description": "#### The Phonic AM 3242FX Analog Mixer is a 32 channel mixer with 24 mic/line and 4 stereo inputs. Featuring a 9-band stereo graphic EQ and full-featured talkback section, the AM3242FX is the ideal mixing solution for any professional studio environment in need of a large amount of channels for larger recording projects. The 3-band EQ plus switchable low-cut filters on all mono channels ensure you have increased control over your inputs. Also featured within this unit is a 40-bit digital stereo ",
    "sale_enabled": true,
    "sale_price": 25388640,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am3242fx.png",
    "images": [
      {
        "id": "img-1039648699",
        "image_url": "/images/products/am3242fx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2eb4de42-33c5-54cc-a9e7-19faff220fd0",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM2442FX",
    "slug": "am2442fx",
    "sku": "PHONIC AM2442FX",
    "brand": "PHONIC",
    "description": "#### The Phonic AM2442FX 24-channel mixing console features a built-in effect engine, a 9-band graphic EQ, and is ideal for use in home recording studios or for a plethora of live sound reinforcement applications ranging from live bands and DJs to lecturers and presenters. With sixteen, low-noise mic preamps, per channel 3-band EQ, four aux sends,",
    "sale_enabled": true,
    "sale_price": 20788920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am2442fx.png",
    "images": [
      {
        "id": "img-1039648698",
        "image_url": "/images/products/am2442fx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "870464b7-0ec5-5280-87a3-54f086d89f1d",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM2421X",
    "slug": "am2421x",
    "sku": "PHONIC AM2421X",
    "brand": "PHONIC",
    "description": "#### Original by Phonic Garansi 1 Tahun Service Distributor Description : - 26 quality mic preamps - Mono channels are loaded with 3-band swept-mid EQs, 75Hz (18 dB/octave) low-cut filters and phantom power",
    "sale_enabled": true,
    "sale_price": 22106520,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am2421x.png",
    "images": [
      {
        "id": "img-1039648697",
        "image_url": "/images/products/am2421x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8b3ac927-d9cb-571a-bfed-1d06a609678f",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM1621X",
    "slug": "am1621x",
    "sku": "PHONIC AM1621X",
    "brand": "PHONIC",
    "description": "#### The AM 1621X is an easy-to-use mixing console that provides all the features you need for the project studio and live sound reinforcement. It has 18 ultra-quiet Mic preamps with high headroom and phantom power, and two stereo line channels. Mono channels feature inserts or PAD control. A 3-band EQ with swept-mid on mono channels and 4-band EQ on stereo channels gives you greater control over your mix. Four Aux sends and two stereo Aux returns can be used to connect a variety of outboard Sig",
    "sale_enabled": true,
    "sale_price": 17449560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am1621x.png",
    "images": [
      {
        "id": "img-1039648696",
        "image_url": "/images/products/am1621x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8581bf5c-84ea-52a3-8fbe-980b336480ad",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM1221X",
    "slug": "am1221x",
    "sku": "PHONIC AM1221X",
    "brand": "PHONIC",
    "description": "#### The AM X mixers are easy-to-use mixing consoles that provide all the features you need for the project studio and live sound reinforcement. With numerous ultra-quiet Mic preamps with high headroom and phantom power, and two stereo line channels. All mono channels feature inserts and lowcut switches. A 3-band EQ with swept-mid on mono channels and 4-band EQ on stereo channels gives you greater control over your mix. Four Aux sends and two stereo Aux returns can be used to connect a variety o",
    "sale_enabled": true,
    "sale_price": 14433120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am1221x.png",
    "images": [
      {
        "id": "img-1039648695",
        "image_url": "/images/products/am1221x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e9ccad45-df99-5730-983d-f3b988fbaa00",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM821X",
    "slug": "am821x",
    "sku": "VB-1039648694",
    "brand": "PHONIC",
    "description": "#### The AM 821X is an easy-to-use mixing console that provides all the features you need for the project studio and live sound reinforcement. It has 10 ultra-quiet Mic preamps with high headroom and phantom power, and two stereo line channels. Mono channels feature inserts or PAD control. A 3-band EQ with swept-mid on mono channels and 4-band EQ on stereo channels gives you greater control over your mix. Four Aux sends and two stereo Aux returns can be used to connect a variety of outboard Sign",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am821x.png",
    "images": [
      {
        "id": "img-1039648694",
        "image_url": "/images/products/am821x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b928643c-30eb-52f2-9168-d4d976be777a",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM1204FX RW",
    "slug": "am1204fx-rw",
    "sku": "PHONIC AM1204FX RW",
    "brand": "PHONIC",
    "description": "#### Number of Microphone Input Ports: 4 Number of Input Ports: 8 Number of AUX: 2 Number of Subgroups: 0 Inserts: 0 Direct Out: 0 Microphone Channel EQ: 3 Bands 19” Rack Compatible: No Multi-Effect: Yes Compressor: Yes FW: No USB: Yes",
    "sale_enabled": true,
    "sale_price": 6840720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am1204fx-rw.png",
    "images": [
      {
        "id": "img-1039648693",
        "image_url": "/images/products/am1204fx-rw.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "844ab977-4e34-5ca6-8dcb-f9eb1150b65a",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM1204FX",
    "slug": "am1204fx",
    "sku": "PHONIC AM1204FX",
    "brand": "PHONIC",
    "description": "#### Mixer Phonic AM 1204FX thiết kế nhỏ gọn bao gồm 4 kênh mono input cho microphone / line kết hợp với hai kênh input stereo. Mỗi kênh trang bị 3-band EQ, và được cung cấp chức năng lọc 75Hz giúp loại bỏ các loại âm thanh tần số thấp không mong muốn. Mixer Phonic AM 1204FX có bộ xử lý Effect 32-bit DFX với 16 hiệu ứng cài sẵn. Một bộ nguồn đa năng cho phép sử dụng điện áp AC từ 100V đến 240V, đảm bảo có thể được sử dụng trên toàn cầu.",
    "sale_enabled": true,
    "sale_price": 5789880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am1204fx.png",
    "images": [
      {
        "id": "img-1039648692",
        "image_url": "/images/products/am1204fx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a2bc57ca-c25b-5629-aa2e-7142e395f34f",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM105FX",
    "slug": "am105fx",
    "sku": "PHONIC AM105FX",
    "brand": "PHONIC",
    "description": "#### Phonic’s entry-level AM series of mixers are compact and versatile with anywhere between 1 and 4 mono Mic/Line and 2 to 4 stereo line inputs. Ultra low-noise pre-amps ensure high quality sound when used in project studios or in sound reinforcement. The multi-band EQ on mono channels gives you total control over your mix. Each model offers a high volume headphone output with independent level control. The AM series makes monitoring the mix even easier with dual multi-segment LED level meters",
    "sale_enabled": true,
    "sale_price": 2866320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am105fx.png",
    "images": [
      {
        "id": "img-1039648691",
        "image_url": "/images/products/am105fx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6ddc7212-5d27-524d-9226-fa9570223278",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM85",
    "slug": "am85",
    "sku": "PHONIC AM85",
    "brand": "PHONIC",
    "description": "#### 2 mic/line inputs with 3-band EQ and 2 stereo inputs Post-fader EFX send on every input; stereo aux return 2T RTN assignable individually to Main or Control Room Global 48V phantom power 1/4″ TS stereo master output",
    "sale_enabled": true,
    "sale_price": 2357640,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am85.png",
    "images": [
      {
        "id": "img-1039648690",
        "image_url": "/images/products/am85.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b37d0af4-54c4-577a-ac03-8de59e0a083f",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM55",
    "slug": "am55",
    "sku": "PHONIC AM55",
    "brand": "PHONIC",
    "description": "#### Compact analog mixer 1 mic/line and 2 stereo channels; 2-band EQ on mono input channel 2-Track RTN & 2-Track REC for CD or tape recorder Dual 4-segment master level meter; Peak LED on mono input channel 1/4″ TS master output; headphones output with volume control",
    "sale_enabled": true,
    "sale_price": 1617840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am55.png",
    "images": [
      {
        "id": "img-1039648689",
        "image_url": "/images/products/am55.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9f97b23c-a8c8-5927-af9b-9ba769b8557b",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM844D USB",
    "slug": "am844d-usb",
    "sku": "PHONIC AM844D USB",
    "brand": "PHONIC",
    "description": "#### In this digital age, the ability to record each and every thing you do is a valuable commodity. Whether it's a quick and dirty demo, a shiny new live recording or just some quick licks you've come up with on the fly, recording has never been as easy as it is with an AM USB mixer. The AM442D USB, AM642D USB and AM844D USB are new members of the AM family of mixing consoles, exhibiting the same awesome features and classic analog feel that these units display, but with a few fantastic additio",
    "sale_enabled": true,
    "sale_price": 14572440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am844d-usb.png",
    "images": [
      {
        "id": "img-1039648688",
        "image_url": "/images/products/am844d-usb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "606ff5a4-f632-51bf-9b3e-ea4c718654a5",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM844D",
    "slug": "am844d",
    "sku": "PHONIC AM844D",
    "brand": "PHONIC",
    "description": "#### Dòng mixer AM của Phonic được thiết kế nhỏ gọn và đa năng, phù hợp với nhiều ứng dụng. Xử lý tạp âm tốt, đảm bảo âm thanh chất lượng cao khi sử dụng trong studio hoặc trong những hệ thống âm thanh sự kiện. Dòng Mixer Phonic AM được sử dụng Led báo tín hiệu dễ dàng để kiểm tra, kiểm soát tín hiệu. Những Model tích hợp FX cho phép các tùy chỉnh effect tiện lợi.",
    "sale_enabled": true,
    "sale_price": 13439520,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am844d.png",
    "images": [
      {
        "id": "img-1039648687",
        "image_url": "/images/products/am844d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8978226d-4407-5198-9fdd-272c8f1c1c23",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM642D USB",
    "slug": "am642d-usb",
    "sku": "PHONIC AM642D USB",
    "brand": "PHONIC",
    "description": "#### Trong thời đại kỹ thuật số, bổ sung các tính năng thu âm cho Mixer thực sự là cần thiết, cho dù đó là một bản demo nhanh chóng chưa chỉnh chu hay một bản ghi âm trực tiếp. Công việc ghi âm trở nên dễ dàng hơn bao giờ hết với các dòng sản phẩm tích hợp USB của seri AM. Các model AM442D USB, AM642D và AM844D USB là những thành viên mới của gia đình AM , trưng bày các tính năng bổ sung tuyệt vời . Được xây dựng tính năng nén đa năng ngay trên các kênh mono cho âm thanh mịn hơn khi xử lý giọng ",
    "sale_enabled": true,
    "sale_price": 12492360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am642d-usb.png",
    "images": [
      {
        "id": "img-1039648686",
        "image_url": "/images/products/am642d-usb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f9017bc3-8e25-57d5-9a5d-5ed0176f638a",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM642DP",
    "slug": "am642dp",
    "sku": "PHONIC AM642DP",
    "brand": "PHONIC",
    "description": "#### Mic/Line channels with inserts and phantom power USB playback of MP3 and WAV files from any USB flash drive 4 stereo channels with 4-band EQ 3-band EQ with swept mid-range plus low cut on each mono channel 3 AUX sends, one with Pre/Post switch 32/40-bit digital stereo multi-effect processor with 16 + tap delay plus foot switch Stereo 9-band graphic EQ, assignable to main mix or aux 1 send 2 true subgroups with main L and R routing switches 2 stereo aux returns with effect to monitor level c",
    "sale_enabled": true,
    "sale_price": 12307680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am642dp.png",
    "images": [
      {
        "id": "img-1039648685",
        "image_url": "/images/products/am642dp.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "13f22441-e5b0-53de-9d45-777ba4856b5e",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM642D",
    "slug": "am642d",
    "sku": "PHONIC AM642D",
    "brand": "PHONIC",
    "description": "#### Trong thời đại kỹ thuật số, bổ sung các tính năng thu âm cho Mixer thực sự là cần thiết, cho dù đó là một bản demo nhanh chóng chưa chỉnh chu hay một bản ghi âm trực tiếp. Công việc ghi âm trở nên dễ dàng hơn bao giờ hết với các dòng sản phẩm tích hợp USB của seri AM. Các model AM442D USB, AM642D và AM844D USB là những thành viên mới của gia đình AM , trưng bày các tính năng bổ sung tuyệt vời . Được xây dựng tính năng nén đa năng ngay trên các kênh mono cho âm thanh mịn hơn khi xử lý giọng ",
    "sale_enabled": true,
    "sale_price": 11533320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am642d.png",
    "images": [
      {
        "id": "img-1039648684",
        "image_url": "/images/products/am642d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f9c4ab38-ae71-5130-ab78-637c377cd4af",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM442D",
    "slug": "am442d",
    "sku": "PHONIC AM442D",
    "brand": "PHONIC",
    "description": "#### Trong thời đại kỹ thuật số, bổ sung các tính năng thu âm cho Mixer thực sự là cần thiết, cho dù đó là một bản demo nhanh chóng chưa chỉnh chu hay một bản ghi âm trực tiếp. Công việc ghi âm trở nên dễ dàng hơn bao giờ hết với các dòng sản phẩm tích hợp USB của seri AM. Các model AM442D USB, AM642D và AM844D USB là những thành viên mới của gia đình AM , trưng bày các tính năng bổ sung tuyệt vời . Được xây dựng tính năng nén đa năng ngay trên các kênh mono cho âm thanh mịn hơn khi xử lý giọng ",
    "sale_enabled": true,
    "sale_price": 8967240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am442d.png",
    "images": [
      {
        "id": "img-1039648682",
        "image_url": "/images/products/am442d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fa90e10a-838e-5c66-8203-04fd17ffc986",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM440DP",
    "slug": "am440dp",
    "sku": "PHONIC AM440DP",
    "brand": "PHONIC",
    "description": "#### The Phonic AM4400DP Analog Mixer With DFX and USB Playback is a compact and versatile mixer with 4 mono mic/line and 2 stereo channel inputs. This expanded version of the AM440D features USB playback and a 32/40 bit digital stereo multi-effect processor with 100 and tap delay programs each with its own adjustable parameter. The pre-amps feature ultra low noise technology to ensure a professional and quality sound when used for recording. Mono channels have low-cut filters to eliminate any u",
    "sale_enabled": true,
    "sale_price": 4715280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am440dp.png",
    "images": [
      {
        "id": "img-1039648681",
        "image_url": "/images/products/am440dp.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1d7d2a0a-8f6f-568f-b30d-58fae15db441",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM440D",
    "slug": "am440d",
    "sku": "PHONIC AM440D",
    "brand": "PHONIC",
    "description": "#### 4-Mic/Line 4-Stereo Input Compact Mixer with DFX 4 mono mic/line channels 4 stereo channels 32/40-bit digital stereo multi-effect processor with 100 programs + tap delay AUX sends on each channel 75Hz low-cut filter on mono channel 3-band EQ on each channel +48V phantom power on mic channels Control Room/Phones source matrix for maximum monitor flexibility EFX/AUX send cue for monitoring individual channel Balanced main outputs with 60mm fader",
    "sale_enabled": true,
    "sale_price": 4125600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am440d.png",
    "images": [
      {
        "id": "img-1039648680",
        "image_url": "/images/products/am440d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "17856f66-442e-55c4-a701-0012f92f9013",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM440",
    "slug": "am440",
    "sku": "PHONIC AM440",
    "brand": "PHONIC",
    "description": "#### The AM series of analog mixers are compact and versatile with anywhere between 5 and 24 mono Mic/Line and stereo inputs. Ultra low noise pre-amps ensure high quality sound when used in project studios or sound reinforcement. Low-cut filters on mono channels eliminate unwanted sounds like stage rumble, P-pops, wind noise and low frequency recording studio room resonances. The multi-band EQ on mono channels gives you total control over your mix. The AM series also makes monitoring the mix eas",
    "sale_enabled": true,
    "sale_price": 3166560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am440.png",
    "images": [
      {
        "id": "img-1039648679",
        "image_url": "/images/products/am440.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "103d9f5c-cdf9-5dcc-96c0-1111ae3c60d4",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM240D",
    "slug": "am240d",
    "sku": "PHONIC AM240D",
    "brand": "PHONIC",
    "description": "#### The AM Series Mixers are compact and versatile with anywhere between 5 and 24 mono Mic/Line and stereo inputs. Ultra low noise pre-amps ensure high quality sound when used in project studios or sound reinforcement. Low-cut filters on mono channels eliminate unwanted sounds like stage rumble, P-pops, wind noise and low frequency recording studio room resonances. The multi-band EQ on mono channels gives you total control over your mix. The AM series also makes monitoring the mix easy with its",
    "sale_enabled": true,
    "sale_price": 3489480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am240d.png",
    "images": [
      {
        "id": "img-1039648678",
        "image_url": "/images/products/am240d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "442e30d4-2939-5845-a694-1c783201f267",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM220P",
    "slug": "am220p",
    "sku": "PHONIC AM220P",
    "brand": "PHONIC",
    "description": "#### The AM Series Mixers are compact and versatile with anywhere between 5 and 24 mono Mic/Line and stereo inputs. Ultra low noise pre-amps ensure high quality sound when used in project studios or sound reinforcement. Low-cut filters on mono channels eliminate unwanted sounds like stage rumble, P-pops, wind noise and low frequency recording studio room resonances. The multi-band EQ on mono channels gives you total control over your mix. The 'P' models in the AM series offer onboard USB playbac",
    "sale_enabled": true,
    "sale_price": 3073680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am220p.png",
    "images": [
      {
        "id": "img-1039648677",
        "image_url": "/images/products/am220p.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5981e836-1bef-519e-8e8f-c77e3f3ec2d9",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG PHONIC AM220",
    "slug": "am220",
    "sku": "PHONIC AM220",
    "brand": "PHONIC",
    "description": "#### 2 balanced Mic/Line inputs and 2 stereo inputs; 3-band EQ on every channel Post-fader EFX send on every input; 1 stereo AUX return Global 48V phantom power 2T RTN assignable individually to Main or Control room Stereo AUX send cue for ease of monitoring individual channel",
    "sale_enabled": true,
    "sale_price": 2392200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/am220.png",
    "images": [
      {
        "id": "img-1039648676",
        "image_url": "/images/products/am220.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "032d0c8b-0598-5937-a437-e01d76afc937",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY PHONIC iAMP 3020DSP",
    "slug": "iamp-3020dsp",
    "sku": "PHONIC iAMP 3020DSP",
    "brand": "PHONIC",
    "description": "#### The Phonic iAMP offers digital amplification at its finest, providing 1600 to 3000 Watts of sheer power into loads as low as 2 ohms. The high-speed, high resolution class D circuitry works with the low-weight construct to create an amplifier strong enough for permanent installations yet light enough for portable sound purposes. Input to the iAMP is flexible, with the unit accepting both XLR and 1/4\" balanced inputs via the onboard combo jacks, and Speakon jacks are provided for output to sp",
    "sale_enabled": true,
    "sale_price": 13116600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/iamp-3020dsp.png",
    "images": [
      {
        "id": "img-1039648675",
        "image_url": "/images/products/iamp-3020dsp.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "266b76ba-a201-591d-8f14-7e82dd409f67",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY PHONIC iAMP 3020",
    "slug": "iamp-3020",
    "sku": "PHONIC iAMP 3020",
    "brand": "PHONIC",
    "description": "#### The Phonic iAMP offers digital amplification at its finest, providing 1600 to 3000 Watts of sheer power into loads as low as 2 ohms. The high-speed, high resolution class D circuitry works with the low-weight construct to create an amplifier strong enough for permanent installations yet light enough for portable sound purposes. Input to the iAMP is flexible, with the unit accepting both XLR and 1/4\" balanced inputs via the onboard combo jacks, and Speakon jacks are provided for output to sp",
    "sale_enabled": true,
    "sale_price": 11290320,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/iamp-3020.png",
    "images": [
      {
        "id": "img-1039648674",
        "image_url": "/images/products/iamp-3020.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f5a20a46-1a8b-5295-8910-05cc887e89e3",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY PHONIC MAX 500",
    "slug": "max-500",
    "sku": "PHONIC MAX 500",
    "brand": "PHONIC",
    "description": "#### Phonic's MAX 500 Power Amplifier provides 120 Watts of power per channel at 4 ohms in a single rack space - ideal for medium-size venues and for monitoring purposes. MAX 500 features ground switches, and the option to choose between stereo or parallel operating modes. Input to the MAX 500 amp is achieved via XLR or phone jack, and output is achieved through binding posts, making the MAX series of amplifiers ideal for real world application.",
    "sale_enabled": true,
    "sale_price": 6899040,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/max-500.png",
    "images": [
      {
        "id": "img-1039648673",
        "image_url": "/images/products/max-500.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6c1f71bc-f53d-5927-82e5-0033a123233a",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD K-12",
    "slug": "powerpod-k-12",
    "sku": "PHONIC POWERPOD K-12",
    "brand": "PHONIC",
    "description": "#### Phonic's Powerpod K12 Plus powered mixer features a grand total of 12 input channels – each offering 3-band swept-mid EQ, gain control, and more – as well as a built-in power amplifier outputting up to a staggering 1000 Watts of shear power. Encompassing two built-in digital effect processors, each featuring 16 mind-blowing effects, the K12 also offers a sturdy yet light-weight construction due to the switch from heavy transformers. Moreover, it features a protective cover – protecting the ",
    "sale_enabled": true,
    "sale_price": 20847240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-k-12.png",
    "images": [
      {
        "id": "img-1039648672",
        "image_url": "/images/products/powerpod-k-12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5cb00f65-04b4-556b-99e4-f2cc9e9320ee",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 1860",
    "slug": "powerpod-1860",
    "sku": "PHONIC POWERPOD 1860",
    "brand": "PHONIC",
    "description": "#### 2 x 400W / 4 ohms stereo power amplifier (bridgeable and patchable) Eight balanced mic/line input channels with inserts Two stereo line input channels with additional stereo RCA jacks 3-band EQ on all input channels Stereo 7-band graphic EQ assignable to main or aux 1 32-bit digital effect processor with 100 preset programs plus tap delay effects, test tones and foot switch jack Four AUX sends (AUX 1/2 are pre-fader and EFX 1/2 are post-fader) Two stereo AUX returns, each can be routed to A",
    "sale_enabled": true,
    "sale_price": 18396720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-1860.png",
    "images": [
      {
        "id": "img-1039648671",
        "image_url": "/images/products/powerpod-1860.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "613347f9-90ff-53f8-a08d-eb8f1950d06c",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 1082R",
    "slug": "powerpod-1082r",
    "sku": "PHONIC POWERPOD 1082R",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod 1082 R powered mixer is a versatile front of house PA mixer built into a compact and durable molded cabinet. Each Powerpod 1082 R has a built-in stereo amplifier which is bridgeable and patchable. Super Hi-Z inputs allow for the addition of guitars and other instruments. A USB recorder is also incorporated into the unit, allowing the main mix to be captured onto any standard USB storage device. The units also offer high definition digital effects with 16 preset programs,",
    "sale_enabled": true,
    "sale_price": 14491440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-1082r.png",
    "images": [
      {
        "id": "img-1039648670",
        "image_url": "/images/products/powerpod-1082r.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "301d7ab5-9424-5d2f-a699-89f4d3d0d54e",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 1062R",
    "slug": "powerpod-1062r",
    "sku": "PHONIC POWERPOD 1062R",
    "brand": "PHONIC",
    "description": "#### Trong 15 năm qua, Phonic đã tạo ra các chuẩn mực về thiết bị tích hợp chất lượng cao, Mixer tích hợp công suất đã trở thành tiêu chuẩn công nghiệp cho các dự án trực tuyến. Được thiêt kế với độ bền cao và chi phí phải chăng, Phonic Powerpods là giải pháp đơn giản sử dụng cho các quán ăn, các không gian - sự kiện nhỏ hoặc các ban nhạc mới bắt đầu. Sự thành công của Powerpods không chỉ dừng lại ở tính năng và kinh phí đầu tư, nó còn được đầu tư khá nghiêm túc như các dòng Mixer chuyên nghiệp ",
    "sale_enabled": true,
    "sale_price": 13982760,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-1062r.png",
    "images": [
      {
        "id": "img-1039648669",
        "image_url": "/images/products/powerpod-1062r.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cdc71457-8517-5575-a542-b76a4ac76eac",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 750RW",
    "slug": "powerpod-750rw",
    "sku": "PHONIC POWERPOD 750RW",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod RW series of mixers are powered mixers built into a compact and durable molded cabinet. Each Powerpod RW has a built-in stereo amplifier which is bridgeable and patchable. Super Hi-Z inputs allow for the addition of guitars and other instruments. A USB recorder is also incorporated into the unit, allowing the main mix to be captured onto any standard USB storage device. The units also offer high definition digital effects with 16 preset programs, each with it's own user-",
    "sale_enabled": true,
    "sale_price": 11590560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-750rw.png",
    "images": [
      {
        "id": "img-1039648668",
        "image_url": "/images/products/powerpod-750rw.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "59b52b0c-b42d-5d76-a6d0-c383bfa1959b",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 630RW",
    "slug": "powerpod-630rw",
    "sku": "PHONIC POWERPOD 630RW",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod 630 RW powered mixer is a versatile front of house PA mixer built into a compact and durable molded cabinet. Each Powerpod 630 RW has a built-in stereo amplifier which is bridgeable and patchable. Super Hi-Z inputs allow for the addition of guitars and other instruments. A USB recorder/player is also incorporated into the unit, allowing the main mix to be captured onto any standard USB storage device. The units also offer high definition digital effects with 16 preset pr",
    "sale_enabled": true,
    "sale_price": 9141120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-630rw.png",
    "images": [
      {
        "id": "img-1039648667",
        "image_url": "/images/products/powerpod-630rw.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6c7c607e-751b-5a69-b96a-c836016d6657",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 740R",
    "slug": "powerpod-740r",
    "sku": "PHONIC POWERPOD 740R",
    "brand": "PHONIC",
    "description": "#### The Powerpod 740 R from Phonic is a powered 7-channel mixer that offers quality audio in a compact design. Ideal for front-of-house applications, the mixer is bridgeable and patchable and features an integrated handle and 4 durable feet to isolate the mixer from vibrations. Dual internal amplifiers each provide 220W of output power for a strong",
    "sale_enabled": true,
    "sale_price": 10331280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-740r.png",
    "images": [
      {
        "id": "img-1039648665",
        "image_url": "/images/products/powerpod-740r.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ad69195e-77a0-57f3-a31b-9d998a1ae81d",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 620R",
    "slug": "powerpod-620r",
    "sku": "PHONIC POWERPOD 620R",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod 620 R powered mixer is a versatile front of house PA mixer built into a compact and durable molded cabinet. Each Powerpod 620 R has a built-in stereo amplifier which is bridgeable and patchable. Super Hi-Z inputs allow for the addition of guitars and other instruments. A USB recorder is also incorporated into the unit, allowing the main mix to be captured onto any standard USB storage device. The units also offer high definition digital effects with 16 preset programs, e",
    "sale_enabled": true,
    "sale_price": 8308440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-620r.png",
    "images": [
      {
        "id": "img-1039648664",
        "image_url": "/images/products/powerpod-620r.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5d550d2d-ffca-5533-99c6-6ca7b6e78b81",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER PHONIC POWERPOD 410R",
    "slug": "powerpod-410r",
    "sku": "PHONIC POWERPOD 410R",
    "brand": "PHONIC",
    "description": "#### The Phonic Powerpod Series are powered mixers in a compact and durable design. The Powerpod 410 R has four Mic/Line input channels and a built-in 100 Watt amplifier, as well as onboard USB module for recording and playback. The 2-band EQ on every channel gives you maximum control over your mix, and the Powerpod 410 R's built-in variable digital delay allows users to better tweak their mix. Powerpod Series Powered Mixers are great all-in-one mixer/amplifiers for bands, traveling musicians, s",
    "sale_enabled": true,
    "sale_price": 4841640,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/powerpod-410r.png",
    "images": [
      {
        "id": "img-1039648663",
        "image_url": "/images/products/powerpod-410r.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "12c60462-e847-5e94-b0a3-f3f7cffded52",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ OT2000.100 (high‐flex AES/EBU DMX cable, PVC black)",
    "slug": "ot2000-100-high-flex-aes-ebu-dmx-cable-pvc-black",
    "sku": "VB-1039648658",
    "brand": "KLOTZ",
    "description": "#### Cond. construction: stranded tinned copper, 7 x 0.20 mm (AWG 24/7) Cond. cross section: 0.22 mm2 Insulation: Foam-Skin PE Core arrangement: 2 cores twisted to a pair Shielding: tinned copper spiral shield, 95% coverage Outer jacket: PVC, matt Overall diameter: 6.5 mm Min. bending radius: 35 mm Working temperature: -20°C / +70°C Conductor resistance: 80 Ω/km Shield resistance: 30 Ω/km Capacitance: cond./cond. 52 pF/m haracteristic impedance: 110 Ω Attenuation [dB/100m]: 1 MHz 2.1 3 MHz 5.2 1",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ot2000-100-high-flex-aes-ebu-dmx-cable-pvc-black.png",
    "images": [
      {
        "id": "img-1039648658",
        "image_url": "/images/products/ot2000-100-high-flex-aes-ebu-dmx-cable-pvc-black.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e6d6c2aa-1b5e-58ca-9e92-da49efd58bc5",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY LOA KLOTZ LYP025x.100 (2x 2.5mm² parallel HiFi speaker cable)",
    "slug": "lyp025x-100-2x-2-5mm-parallel-hifi-speaker-cable",
    "sku": "VB-1039648656",
    "brand": "KLOTZ",
    "description": "DÂY LOA KLOTZ LYP025x.100 (2x 2.5mm² parallel HiFi speaker cable)",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/lyp025x-100-2x-2-5mm-parallel-hifi-speaker-cable.png",
    "images": [
      {
        "id": "img-1039648656",
        "image_url": "/images/products/lyp025x-100-2x-2-5mm-parallel-hifi-speaker-cable.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "98babf63-0c6b-5da7-b26b-b21626950df2",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY LOA KLOTZ LYP015x.100 (2x 1.5mm² parallel HiFi speaker cable)",
    "slug": "lyp015x-100-2x-1-5mm-parallel-hifi-speaker-cable",
    "sku": "VB-1039648655",
    "brand": "KLOTZ",
    "description": "DÂY LOA KLOTZ LYP015x.100 (2x 1.5mm² parallel HiFi speaker cable)",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/lyp015x-100-2x-1-5mm-parallel-hifi-speaker-cable.png",
    "images": [
      {
        "id": "img-1039648655",
        "image_url": "/images/products/lyp015x-100-2x-1-5mm-parallel-hifi-speaker-cable.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c674418f-79cf-54d3-b3d2-25ee76429863",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY LOA KLOTZ LSC440YS.100 (4x 4.0mm² PVC speaker cable, black)",
    "slug": "lsc440ys-100-4x-4-0mm-pvc-speaker-cable-black",
    "sku": "VB-1039648652",
    "brand": "KLOTZ",
    "description": "DÂY LOA KLOTZ LSC440YS.100 (4x 4.0mm² PVC speaker cable, black)",
    "sale_enabled": true,
    "sale_price": 308880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/lsc440ys-100-4x-4-0mm-pvc-speaker-cable-black.png",
    "images": [
      {
        "id": "img-1039648652",
        "image_url": "/images/products/lsc440ys-100-4x-4-0mm-pvc-speaker-cable-black.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0c2a7317-9866-5a66-be0f-81de52b7b365",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY LOA KLOTZ LSC425YS",
    "slug": "klotz-lsc425ys",
    "sku": "VB-1039648651",
    "brand": "KLOTZ",
    "description": "DÂY LOA KLOTZ LSC425YS",
    "sale_enabled": true,
    "sale_price": 172260,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/klotz-lsc425ys.png",
    "images": [
      {
        "id": "img-1039648651",
        "image_url": "/images/products/klotz-lsc425ys.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "543749fa-dd23-5a6a-a68a-b9edc4c09354",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY LOA KLOTZ LY225S",
    "slug": "day-loa-klotz-ly225s",
    "sku": "VB-1039648650",
    "brand": "KLOTZ",
    "description": "DÂY LOA KLOTZ LY225S Sự lựa chọn hoàn hảo cho âm thanh chuyên nghiệp Trong lĩnh vực âm thanh chuyên nghiệp, việc lựa chọn dây loa chất lượng là yếu tố quan trọng giúp đảm bảo hiệu suất tối ưu của hệ thống âm thanh. Dây loa Klotz LY225S là một trong những lựa chọn hàng đầu, đáp ứng đầy đủ các yêu cầu về độ bền, hiệu suất truyền tải và khả năng chống nhiễu. Với thiết kế tối ưu và sử dụng vật liệu cao cấp, sản phẩm này đã và đang được các chuyên gia âm thanh đánh giá cao. Hãy cùng khám phá các đặc ",
    "sale_enabled": true,
    "sale_price": 87912,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/day-loa-klotz-ly225s.png",
    "images": [
      {
        "id": "img-1039648650",
        "image_url": "/images/products/day-loa-klotz-ly225s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0d365eeb-595a-5bad-b7e6-deb9ba0b5999",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY LOA KLOTZ LY215S.100 (2x 1.5mm² PVC twinax speaker cable, black)",
    "slug": "ly215s-100-2x-1-5mm-pvc-twinax-speaker-cable-black",
    "sku": "VB-1039648649",
    "brand": "KLOTZ",
    "description": "#### Loại Cáp Cáp cho Loa Dây dẫn Đồng nguyên chất 30 x 0,25 mm Mặt cắt ngang 1,5 mm² Vỏ bọc ngoài PVC, matt Đường kính tổng thể 7.0 mm Nhiệt độ chịu đựng -20 oC/ +70 oC Trọng lượng 75g/m Trọng lượng dây đồng 30g/m Màu sắc đen",
    "sale_enabled": true,
    "sale_price": 61776,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ly215s-100-2x-1-5mm-pvc-twinax-speaker-cable-black.png",
    "images": [
      {
        "id": "img-1039648649",
        "image_url": "/images/products/ly215s-100-2x-1-5mm-pvc-twinax-speaker-cable-black.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "febc1805-7b88-5a02-a191-0d043555c03c",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ MC2000SW.100 (Superior mic cable, PVC black)",
    "slug": "mc2000sw-100-superior-mic-cable-pvc-black",
    "sku": "VB-1039648648",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ MC2000SW.100 (Superior mic cable, PVC black)",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mc2000sw-100-superior-mic-cable-pvc-black.png",
    "images": [
      {
        "id": "img-1039648648",
        "image_url": "/images/products/mc2000sw-100-superior-mic-cable-pvc-black.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c4f7ca60-a8c7-5bea-947a-657330161292",
    "category_id": "604c2630-486a-5628-bc9e-67bd0170e7e4",
    "category_name": "Dây Tín Hiệu - Dây Loa",
    "category_slug": "day-tin-hieu-day-loa",
    "name": "DÂY TÍN HIỆU KLOTZ MY206",
    "slug": "klotz-my206",
    "sku": "VB-1039648646",
    "brand": "KLOTZ",
    "description": "DÂY TÍN HIỆU KLOTZ MY206",
    "sale_enabled": true,
    "sale_price": 50328,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/klotz-my206.png",
    "images": [
      {
        "id": "img-1039648646",
        "image_url": "/images/products/klotz-my206.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "372883c6-d71e-5269-b94e-3b6a638c41ce",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY FOX UG 9X",
    "slug": "ug-9x",
    "sku": "UG 9X",
    "brand": "FOX",
    "description": "#### Micro không dây UG9X có kiểu dáng thiết kế tinh tế cùng chất lượng âm thanh trong treo, công suất hoạt động tốt đáp ưng nhu cầu sử dụng từ các phòng karaoke gia đình đến các sân khấu biểu diễn lớn, phát thanh truyền hình hay hội nghị. Micro không dây UG9X có khả năng chống hú rít tốt đảm bảo an toàn khi sử dụng, ngay khi bạn đứng gần loa hay sử dụng nhiều micro cùng lúc cũng không phải lo lắng hú rít.Đầu mic có độ nhạy cao bắt âm mạnh hỗ trợ những ai có giọng yếu hoặc hát những bài có âm vự",
    "sale_enabled": true,
    "sale_price": 4827600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ug-9x.png",
    "images": [
      {
        "id": "img-1039648641",
        "image_url": "/images/products/ug-9x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d26e5d35-8cee-56e1-a157-ec2eed03616a",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY FOX UR 12D",
    "slug": "ur-12d",
    "sku": "UR 12D",
    "brand": "FOX",
    "description": "#### Micro không dây UR12D có kiểu dáng thiết kế tinh tế cùng chất lượng âm thanh trong treo, công suất hoạt động tốt đáp ưng nhu cầu sử dụng từ các phòng karaoke gia đình đến các sân khấu biểu diễn lớn, phát thanh truyền hình hay hội nghị. Micro không dây UR12D có khả năng chống hú rít tốt đảm bảo an toàn khi sử dụng, ngay khi bạn đứng gần loa hay sử dụng nhiều micro cùng lúc cũng không phải lo lắng hú rít. Đầu mic có độ nhạy cao bắt âm mạnh hỗ trợ những ai có giọng yếu hoặc hát những bài có âm",
    "sale_enabled": true,
    "sale_price": 6285600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ur-12d.png",
    "images": [
      {
        "id": "img-1039648639",
        "image_url": "/images/products/ur-12d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "62bedbb4-5728-532a-830c-7ac63d83db16",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX DX-1804",
    "slug": "dx-1804",
    "sku": "DX-1804",
    "brand": "FOX",
    "description": "AMPLY 4 KÊNH NGUỒN XUNG FOX AUDIO DX-1804 #### Amply 4 kênh nguồn xung Fox Audio DX-1804 với mặt trước được thiết kế mới lạ, hài hòa bằng nhôm xước gia công CNC tinh xảo, cùng 4 nút vặn điều chỉnh kênh và các đèn tín hiệu nổi bật tạo cảm giác thu hút, bắt mắt người dùng. Mặt sau được thiết kế một cách khoa học với các cổng kết nối input bằng canon cho thiết bị xử lý âm thanh và đẩu ra loa bằng jack speakon . Cả 2 mặt đều bố trí lỗ thoát hơi cùng hệ thống tản nhiệt làm mát, giúp cục đẩy hoạt động",
    "sale_enabled": true,
    "sale_price": 37584000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dx-1804.png",
    "images": [
      {
        "id": "img-1039648636",
        "image_url": "/images/products/dx-1804.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "80d1d72b-e557-501e-b0c3-f0cd9657d7b0",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX DX-1304",
    "slug": "dx-1304",
    "sku": "DX-1304",
    "brand": "FOX",
    "description": "AMPLY 4 KÊNH NGUỒN XUNG FOX AUDIO DX-1304 #### Amply 4 kênh nguồn xung Fox Audio DX-1304 với mặt trước được thiết kế mới lạ, hài hòa bằng nhôm xước gia công CNC tinh xảo, cùng 4 nút vặn điều chỉnh kênh và các đèn tín hiệu nổi bật tạo cảm giác thu hút, bắt mắt người dùng. Mặt sau được thiết kế một cách khoa học với các cổng kết nối input bằng canon cho thiết bị xử lý âm thanh và đẩu ra loa bằng jack speakon . Cả 2 mặt đều bố trí lỗ thoát hơi cùng hệ thống tản nhiệt làm mát, giúp cục đẩy hoạt động",
    "sale_enabled": true,
    "sale_price": 32389200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dx-1304.png",
    "images": [
      {
        "id": "img-1039648635",
        "image_url": "/images/products/dx-1304.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "27a46141-41bd-5ce1-bd7d-98cff535aab0",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX FP 9X",
    "slug": "fp-9x",
    "sku": "FP 9X",
    "brand": "FOX",
    "description": "#### Various operation modules: stereo, linkage, connecting single audio, with ouput of filtrate wave (30-120Hz). 3 select sensitivity: 0.775V, 1V, 1.5V 2 level adjustable speed of fan, good to reduce the noise of fan having led adjustable fer 4 step in the panel, over loading input signal display, output filtrate wave display and protection display",
    "sale_enabled": true,
    "sale_price": 21675600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/fp-9x.png",
    "images": [
      {
        "id": "img-1039648634",
        "image_url": "/images/products/fp-9x.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6ffa3d12-6ba7-566b-91de-ba491ebb477e",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX RX 1800",
    "slug": "rx-1800",
    "sku": "RX 1800",
    "brand": "FOX",
    "description": "AMPLY FOX RX 1800",
    "sale_enabled": true,
    "sale_price": 27928800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rx-1800.png",
    "images": [
      {
        "id": "img-1039648633",
        "image_url": "/images/products/rx-1800.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9b68a52f-f5ca-5e9c-bc9c-91a641563431",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX RX 1500",
    "slug": "rx-1500",
    "sku": "RX 1500",
    "brand": "FOX",
    "description": "AMPLY FOX RX 1500",
    "sale_enabled": true,
    "sale_price": 21297600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rx-1500.png",
    "images": [
      {
        "id": "img-1039648632",
        "image_url": "/images/products/rx-1500.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "20e36fa5-2e5c-559d-b01d-73291b5aece6",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX RX 1300",
    "slug": "rx-1300",
    "sku": "RX 1300",
    "brand": "FOX",
    "description": "AMPLY FOX RX 1300",
    "sale_enabled": true,
    "sale_price": 18867600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rx-1300.png",
    "images": [
      {
        "id": "img-1039648631",
        "image_url": "/images/products/rx-1300.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0294f18d-67e3-5c7b-bf6f-3f09cba59874",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX XLS 1502",
    "slug": "xls-1502",
    "sku": "XLS 1502",
    "brand": "FOX",
    "description": "AMPLY FOX XLS 1502",
    "sale_enabled": true,
    "sale_price": 20822400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xls-1502.png",
    "images": [
      {
        "id": "img-1039648630",
        "image_url": "/images/products/xls-1502.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3364af34-3a40-5fe6-85fa-bd548c8802e2",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX XLS 9002",
    "slug": "xls-9002",
    "sku": "XLS 9002",
    "brand": "FOX",
    "description": "AMPLY FOX AUDIO XLS9002 Trong thị trường âm thanh chuyên nghiệp, việc lựa chọn một amplifier chất lượng cao là điều cần thiết để đảm bảo hiệu suất âm thanh tối ưu. Với sự ra đời của AMPLY FOX AUDIO XLS9002, người dùng sẽ có trong tay một thiết bị âm thanh mạnh mẽ, đáng tin cậy, và phù hợp với nhiều ứng dụng âm thanh từ các sự kiện lớn đến các không gian âm nhạc chuyên nghiệp. #### Tổng Quan Về FOX AUDIO và Sản Phẩm XLS9002 FOX AUDIO là một thương hiệu nổi tiếng đến từ Đài Loan, chuyên sản xuất c",
    "sale_enabled": true,
    "sale_price": 15109200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xls-9002.png",
    "images": [
      {
        "id": "img-1039648629",
        "image_url": "/images/products/xls-9002.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6a3ee318-10e1-5e94-b070-4ecc451757e3",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX PRO 9200",
    "slug": "pro-9200",
    "sku": "PRO 9200",
    "brand": "FOX",
    "description": "#### Pro series amplifiers are high performance and high efficiency’s top quality amplifiers. For the purposes of getting high quality sound, it adopts TOSHIBA big power valve covered with metal, and that make the sound quality can reach higher levels. 1. Power ON/OFF transient, prevent the surge assault 2. Thermal cut off protection, the amplifier will cut off the link with speakers when the temperature is more than 85­ C 3. Short circuit current limited protection. 4. The muting circuit preven",
    "sale_enabled": true,
    "sale_price": 18478800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pro-9200.png",
    "images": [
      {
        "id": "img-1039648628",
        "image_url": "/images/products/pro-9200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a441ec18-842a-5625-838f-f9b2e7950bf2",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX PRO 7200",
    "slug": "pro-7200",
    "sku": "PRO 7200",
    "brand": "FOX",
    "description": "#### Pro series amplifiers are high performance and high efficiency’s top quality amplifiers. For the purposes of getting high quality sound, it adopts TOSHIBA big power valve covered with metal, and that make the sound quality can reach higher levels. 1. Power ON/OFF transient, prevent the surge assault. 2. Thermal cut off protection, the amplifier will cut off the link with speakers when the temperature is more than 85 C. 3. Short circuit current limited protection. 4. The muting circuit preen",
    "sale_enabled": true,
    "sale_price": 14666400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pro-7200.png",
    "images": [
      {
        "id": "img-1039648627",
        "image_url": "/images/products/pro-7200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2699c75e-0992-57d0-9375-f1f9823ce3b4",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX P-7200",
    "slug": "p-7200",
    "sku": "P-7200",
    "brand": "FOX",
    "description": "AMPLY FOX P-7200",
    "sale_enabled": true,
    "sale_price": 15854400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p-7200.png",
    "images": [
      {
        "id": "img-1039648626",
        "image_url": "/images/products/p-7200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "75ace01a-ad2f-56d4-91e9-cd8a2143650b",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX P-3600",
    "slug": "p-3600",
    "sku": "P-3600",
    "brand": "FOX",
    "description": "AMPLY FOX P-3600",
    "sale_enabled": true,
    "sale_price": 14461200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p-3600.png",
    "images": [
      {
        "id": "img-1039648625",
        "image_url": "/images/products/p-3600.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a3cf2731-7f37-5b1f-a17d-dbfa3361dedd",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX P-2400",
    "slug": "p-2400",
    "sku": "P2400",
    "brand": "FOX",
    "description": "AMPLY FOX P-2400",
    "sale_enabled": true,
    "sale_price": 10724400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p-2400.png",
    "images": [
      {
        "id": "img-1039648623",
        "image_url": "/images/products/p-2400.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "857c04c8-bb0b-536a-987b-09b5d36b1089",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX P-1200",
    "slug": "p-1200",
    "sku": "P1200",
    "brand": "FOX",
    "description": "AMPLY FOX P-1200",
    "sale_enabled": true,
    "sale_price": 8845200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/p-1200.png",
    "images": [
      {
        "id": "img-1039648622",
        "image_url": "/images/products/p-1200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "94dc8a0a-9884-5c15-b419-17b7b8ca98e5",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX MA 12",
    "slug": "ma-12",
    "sku": "MA12",
    "brand": "FOX",
    "description": "MA Series Amplifier is a kind of professional amplifier with high power multi-function, high quality, beautiful tone and stabile performance for indoor and outdoor performance. in order to achieve recognition structure, circuit design and tone expression. The outstanding tone analysis and expression performance of the product remain leading in profession, and is capable of comparing with imported famous brand amplifiers",
    "sale_enabled": true,
    "sale_price": 12528000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ma-12.png",
    "images": [
      {
        "id": "img-1039648621",
        "image_url": "/images/products/ma-12.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "10cc792e-cfd9-5e1a-955f-21955488032d",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX MA 9",
    "slug": "ma-9",
    "sku": "MA9",
    "brand": "FOX",
    "description": "MA Series Amplifier is a kind of professional amplifier with high power multi-function, high quality, beautiful tone and stabile performance for indoor and outdoor performance. in order to achieve recognition structure, circuit design and tone expression. The outstanding tone analysis and expression performance of the product remain leading in profession, and is capable of comparing with imported famous brand amplifiers",
    "sale_enabled": true,
    "sale_price": 10767600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ma-9.png",
    "images": [
      {
        "id": "img-1039648620",
        "image_url": "/images/products/ma-9.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "67d08a34-2f65-5d34-86c2-7998afc1165c",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX MA 6",
    "slug": "ma-6",
    "sku": "MA6",
    "brand": "FOX",
    "description": "MA Series Amplifier is a kind of professional amplifier with high power multi-function, high quality, beautiful tone and stabile performance for indoor and outdoor performance. in order to achieve recognition structure, circuit design and tone expression. The outstanding tone analysis and expression performance of the product remain leading in profession, and is capable of comparing with imported famous brand amplifiers",
    "sale_enabled": true,
    "sale_price": 9072000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ma-6.png",
    "images": [
      {
        "id": "img-1039648619",
        "image_url": "/images/products/ma-6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ff748c1f-0d25-513a-91d9-107ea72f2427",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX KA 350-UB",
    "slug": "ka-350-ub",
    "sku": "KA350UB",
    "brand": "FOX",
    "description": "#### 8 Ω rated output power 350W x2 4 Ω rated output power 450W x2 Frequency Response 20Hz ~ 20KHz Turn&Noise (“A”weighted) 70dB Microphone protection Direct-current overload temperature Squeal Microphone balanced dB TREBLE ± 6dB MID ± 6dB BASS ± 6dB Music balanced dB TREBLE ± 10dB MID ± 10dB BASS ± 10dB Gross Weight 17kg Dimension 53x50x22cm",
    "sale_enabled": true,
    "sale_price": 10033200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ka-350-ub.png",
    "images": [
      {
        "id": "img-1039648618",
        "image_url": "/images/products/ka-350-ub.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "dc8546bd-c983-50b4-bbda-38df142818cb",
    "category_id": "87271e2f-ce60-503b-85b8-7924a2a88838",
    "category_name": "Amplifier - Cục Đẩy Công Suất",
    "category_slug": "amplifier-cong-suat",
    "name": "AMPLY FOX KA 250-UB",
    "slug": "ka-250-ub",
    "sku": "KA250UB",
    "brand": "FOX",
    "description": "#### Kế thừa những ưu điểm của vang số như, khả năng chống hú cực kỳ tốt, đứng hát quay ngược micro về loa cách loa khoảng 50cm tuy nhiên không hề có tiếng hú nào xảy ra Tiếng Echo cực hay, mềm, thanh thót, cảm giác hát cũng nhẹ hơn so với Amply cơ Tùy chỉnh dễ dàng, không như vang số phải chỉnh bằng phần mềm trên máy tính, Amply liền vang dễ dàng chỉnh âm thanh qua các nút tùy chỉnh phía trước Amply, ưu điểm nữa là những nút này tùy chỉnh rất chính xác, độ nhạy cao, giúp bạn dễ dàng chỉnh được ",
    "sale_enabled": true,
    "sale_price": 9028800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ka-250-ub.png",
    "images": [
      {
        "id": "img-1039648617",
        "image_url": "/images/products/ka-250-ub.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a26c9c03-5c50-5243-9331-b421524b4506",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "MÁY KHÓI ANTARI Z-800II",
    "slug": "z-800ii",
    "sku": "Z800II",
    "brand": "ANTARI",
    "description": "#### Z-800II, một công nghệ tiên tiến được thiết kế bởi Antari nhằm đáp ứng các nhu cầu về tính di động và linh động. Một dòng máy khói lý tưởng cho các hoạt động tại các địa điểm nhỏ, beerclub hoặc bar, club dạng vừa . Z-800II có thể hoạt động với chế độ mặc định, bộ đếm thời gian hoặc các chế độ độc lập. Z 800II có thời gian khởi động (làm nóng)nhanh hơn 100 giây và ổn định hơn, khói có thể phát ra ngắt quãng theo ý bạn mà không cần thời gian hâm nóng ở giữa chu kỳ. Z-800II bao gồm tất cả các ",
    "sale_enabled": true,
    "sale_price": 4212000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/z-800ii.png",
    "images": [
      {
        "id": "img-1039648614",
        "image_url": "/images/products/z-800ii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a2c4ed77-c155-5c85-8f61-7328fcf6ae7d",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Bộ điều khiển/remote Antari Z-50",
    "slug": "z-50",
    "sku": "REMOTEZ50",
    "brand": "Antari",
    "description": "Bộ điều khiển/remote Antari Z-50 – Phụ kiện Antari dành cho hệ thống hiệu ứng chuyên nghiệp Bộ điều khiển/remote Antari Z-50 là bộ điều khiển/remote trong hệ sinh thái Antari, được sử dụng để điều khiển thiết bị Antari thuận tiện hơn theo chức năng của từng model. Phụ kiện đúng mã giúp hệ thống giữ được tính đồng bộ về kết nối, cơ khí và cách vận hành; đồng thời hạn chế rủi ro phát sinh khi dùng sản phẩm không tương thích. Khi tìm kiếm remote Antari Z-50 , yếu tố quan trọng nhất không phải chỉ l",
    "sale_enabled": true,
    "sale_price": 1386000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/z-50.png",
    "images": [
      {
        "id": "img-1039648613",
        "image_url": "/images/products/z-50.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d20a3de0-00cc-500c-86c7-6f32a38b5d50",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "MÁY KHÓI ANTARI Z-1000 II XR",
    "slug": "z-1000-ii-xr",
    "sku": "Z-1000IIXR",
    "brand": "ANTARI",
    "description": "MÁY TẠO KHÓI ANTARI Z-1000II XR ANTARI tự hào giới thiệu đến bạn sản phẩm máy tạo khói Z-1000II của hãng. Một trong những thiết bị tạo khói chất lượng hàng đầu trên thị trường hiện nay. Với công nghệ tiên tiến và hiệu suất vượt trội, máy tạo khói Z-1000II đã được thiết kế để mang đến trải nghiệm ánh sáng và khói tuyệt vời cho các buổi biểu diễn, sự kiện và buổi trình diễn chuyên nghiệp. #### Một trong những đặc điểm nổi bật của máy tạo khói Z-1000II là khả năng tạo ra một lượng khói lớn và mịn m",
    "sale_enabled": true,
    "sale_price": 7879680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/z-1000-ii-xr.png",
    "images": [
      {
        "id": "img-1039648611",
        "image_url": "/images/products/z-1000-ii-xr.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "27f97ae3-b48e-5815-96bc-5388dcefd03a",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Dung dịch tạo tuyết Antari SL-5",
    "slug": "sl-5",
    "sku": "SL5",
    "brand": "Antari",
    "description": "Dung dịch tạo tuyết Antari SL-5 – Dung dịch hiệu ứng chính hãng Antari Dung dịch tạo tuyết Antari SL-5 thuộc nhóm dung dịch tạo tuyết của Antari, được phát triển để tạo bọt tuyết nhân tạo với đặc tính hiệu ứng khác nhau theo từng công thức. Khi tìm kiếm dung dịch tạo tuyết Antari SL-5 , người dùng không chỉ cần đúng loại hiệu ứng mà còn phải kiểm tra khả năng tương thích với máy, điều kiện vận hành và mật độ hiệu ứng mong muốn. Dung dịch là một phần của hệ thống tạo hiệu ứng, không phải vật tư c",
    "sale_enabled": true,
    "sale_price": 501120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sl-5.png",
    "images": [
      {
        "id": "img-1039648610",
        "image_url": "/images/products/sl-5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "84622de9-c0bb-55fe-b61b-d18d3ba36ddd",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "MÁY KHÓI ANTARI S-200 Silent Snow Machine",
    "slug": "s-200-silent-snow-machine",
    "sku": "S200SILENT",
    "brand": "ANTARI",
    "description": "#### Máy tạo tuyết S-200X hoạt động với mức độ tiếng ồn rất thấp, không làm ảnh hưởng tới không gian sân khấu",
    "sale_enabled": true,
    "sale_price": 17074800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/s-200-silent-snow-machine.png",
    "images": [
      {
        "id": "img-1039648609",
        "image_url": "/images/products/s-200-silent-snow-machine.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6324de91-0551-50b8-b9e8-9ed01549d7e9",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Dung dịch Haze Antari HZL-5",
    "slug": "hzl-5",
    "sku": "HZL5",
    "brand": "Antari",
    "description": "Dung dịch Haze Antari HZL-5 – Haze Fluid chính hãng Antari Dung dịch Haze Antari HZL-5 là dung dịch chuyên dụng thuộc dòng Haze Fluid của Antari , được phát triển để sử dụng với các hệ thống máy tạo haze tương thích. Sản phẩm hỗ trợ tạo lớp sương hiệu ứng phân bố trong không gian, giúp tăng khả năng quan sát của chùm sáng sân khấu, moving head, beam và laser trong các chương trình biểu diễn chuyên nghiệp. Khác với dung dịch tạo khói fog thông thường, haze thường được sử dụng để duy trì một lớp s",
    "sale_enabled": true,
    "sale_price": 2076800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hzl-5.png",
    "images": [
      {
        "id": "img-1039648608",
        "image_url": "/images/products/hzl-5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8285a199-6790-5fe3-8a60-9e098f3c85ce",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Dung dịch Haze Antari HZL-1",
    "slug": "hzl-1",
    "sku": "HZL1",
    "brand": "Antari",
    "description": "Dung dịch Haze Antari HZL-1 – Haze Fluid chính hãng Antari Dung dịch Haze Antari HZL-1 là dung dịch chuyên dụng thuộc dòng Haze Fluid của Antari , được phát triển cho các hệ thống tạo haze tương thích nhằm tạo lớp sương hiệu ứng trong không gian biểu diễn và các ứng dụng hiệu ứng đặc biệt. Khác với dung dịch tạo khói fog thông thường, haze thường được sử dụng để duy trì một lớp sương nhẹ trong không gian, giúp các chùm sáng sân khấu, moving head, beam và laser trở nên rõ nét hơn mà không tạo thà",
    "sale_enabled": true,
    "sale_price": 543400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hzl-1.png",
    "images": [
      {
        "id": "img-1039648607",
        "image_url": "/images/products/hzl-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b2265c4c-445d-5c83-a9bd-60681b46b820",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo Haze Antari HZ-350",
    "slug": "hz-350-haze-maching",
    "sku": "HZ-350",
    "brand": "Antari",
    "description": "Máy tạo haze Antari HZ-350 – Vận hành tức thời, DMX và điều khiển không dây Máy tạo haze Antari HZ-350 là dòng Hazer chuyên nghiệp thuộc HZ Series, được phát triển từ nền tảng HZ-100 với khả năng tạo lượng haze lớn hơn, đồng thời bổ sung màn hình LCD, điều khiển không dây và nhiều phương thức vận hành phù hợp cho sân khấu, sự kiện, nhà hát và hệ thống ánh sáng chuyên nghiệp. HZ-350 tạo lớp haze trong, mỏng và có khả năng duy trì trong không gian, giúp các chùm sáng từ moving head, beam hoặc lase",
    "sale_enabled": true,
    "sale_price": 21870000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hz-350-haze-maching.png",
    "images": [
      {
        "id": "img-1039648606",
        "image_url": "/images/products/hz-350-haze-maching.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "afd59a94-0dde-503d-a3fc-21f76f486a1d",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo Haze Antari HZ-500",
    "slug": "hz-500-silent-hazer-on-flight-case",
    "sku": "HZ-500",
    "brand": "Antari",
    "description": "Máy tạo Haze Antari HZ-500 – Giải pháp hiệu ứng chuyên nghiệp cho sân khấu và sự kiện Nếu đang tìm kiếm máy tạo haze Antari HZ-500 cho sân khấu, sự kiện hoặc hệ thống lắp đặt, Máy tạo Haze Antari HZ-500 là model đáng cân nhắc trong danh mục Antari. Thiết bị hướng đến khả năng tạo hiệu ứng rõ ràng, hỗ trợ quá trình triển khai và đồng bộ tốt hơn với hệ thống trình diễn. Với từ khóa chính máy tạo haze Antari HZ-500 , người dùng thường quan tâm đến ba vấn đề: hiệu ứng có phù hợp không gian hay không",
    "sale_enabled": true,
    "sale_price": 42368400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 2,
    "is_active": true,
    "image_url": "/images/products/hz-500-silent-hazer-on-flight-case.png",
    "images": [
      {
        "id": "img-1039648605",
        "image_url": "/images/products/hz-500-silent-hazer-on-flight-case.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "34554aa4-b4ce-5223-b2b6-1b5baebde563",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo Haze Antari HZ-400",
    "slug": "hz-400-dmx-haze-machine",
    "sku": "HZ-400",
    "brand": "Antari",
    "description": "Máy tạo haze Antari HZ-400 – Đầu phun kép, điều hướng linh hoạt cho sân khấu chuyên nghiệp Máy tạo haze Antari HZ-400 là dòng Hazer chuyên nghiệp thuộc HZ Series, được phát triển cho sân khấu, concert, nhà hát, club, sự kiện và hệ thống production cần duy trì lớp haze ổn định để làm rõ beam, moving head, laser và các hiệu ứng ánh sáng trong không gian. Điểm khác biệt nổi bật của HZ-400 là thiết kế Dual Haze Nozzle – đầu phun haze kép kết hợp Adjustable Diverter – bộ điều hướng có thể điều chỉnh ",
    "sale_enabled": true,
    "sale_price": 32810400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hz-400-dmx-haze-machine.png",
    "images": [
      {
        "id": "img-1039648604",
        "image_url": "/images/products/hz-400-dmx-haze-machine.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "64416071-c7a0-5ec5-ac23-d41395fc3c4e",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Dung dịch tạo khói Antari FLR-5",
    "slug": "flr-5",
    "sku": "FLR5",
    "brand": "Antari",
    "description": "Dung dịch tạo khói Antari FLR-5 – Fog Fluid chính hãng Antari Dung dịch tạo khói Antari FLR-5 thuộc dòng Fog Fluid chuyên dụng của Antari, được phát triển để tạo hiệu ứng khói dày nhưng tan cực nhanh – Extra Dense & Extremely Fast Dissipating . Đặc tính này phù hợp với những ứng dụng cần một lượng khói rõ ràng, mạnh mẽ tại thời điểm kích hoạt nhưng muốn hiệu ứng nhanh chóng phân tán sau đó. So với các loại dung dịch tạo khói có thời gian lưu dài, Antari FLR hướng đến hiệu ứng tức thời và linh ho",
    "sale_enabled": true,
    "sale_price": 767880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/flr-5.png",
    "images": [
      {
        "id": "img-1039648603",
        "image_url": "/images/products/flr-5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bcf7e6bb-62df-546d-b149-9c51a1fee07b",
    "category_id": "b49418bb-e8d5-582a-abee-771256611e4e",
    "category_name": "Dung Dịch & Nước Tạo Khói",
    "category_slug": "dung-dich-tao-khoi",
    "name": "Dung dịch tạo khói Antari FLG-5",
    "slug": "flg-5",
    "sku": "FLG-5",
    "brand": "Antari",
    "description": "Dung dịch tạo khói Antari FLG-5 5L – Fog Fluid chính hãng Antari Dung dịch tạo khói Antari FLG-5 là dung dịch chuyên dụng dành cho các hệ thống máy tạo khói Antari, được phát triển để tạo hiệu ứng khói có mật độ tiêu chuẩn và tốc độ tan tiêu chuẩn – Regular Dense & Regular Dissipating Fog Fluid . Đây là lựa chọn phù hợp cho nhiều ứng dụng sân khấu, biểu diễn, sự kiện và hệ thống hiệu ứng cần lớp khói cân bằng giữa khả năng hiển thị và thời gian tồn tại trong không gian. Với quy cách 5 lít , Anta",
    "sale_enabled": true,
    "sale_price": 849960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 40,
    "is_active": true,
    "image_url": "/images/products/flg-5.png",
    "images": [
      {
        "id": "img-1039648602",
        "image_url": "/images/products/flg-5.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8e386ac6-8290-5e3a-b352-627739ce4e8a",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo bong bóng Antari B-200",
    "slug": "b-200-bcr1-big-bubble",
    "sku": "B200",
    "brand": "Antari",
    "description": "Máy tạo bong bóng Antari B-200 – Công suất cao, điều khiển không dây linh hoạt Máy tạo bong bóng Antari B-200 là giải pháp hiệu ứng bong bóng công suất cao dành cho sân khấu, sự kiện, tiệc cưới, chương trình giải trí và các không gian cần tạo lượng bong bóng lớn, liên tục. B-200 được Antari định vị là High Output Bubble Machine , nổi bật với thiết kế 3 cụm Double Bubble Wheel , giúp tạo ra lượng bong bóng mạnh mẽ hơn để nhanh chóng phủ hiệu ứng trong không gian. Thiết bị hỗ trợ nhiều phương thức",
    "sale_enabled": true,
    "sale_price": 13975200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/b-200-bcr1-big-bubble.png",
    "images": [
      {
        "id": "img-1039648601",
        "image_url": "/images/products/b-200-bcr1-big-bubble.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ffd0ea2d-cfbe-51ae-8de9-8e79d05ceded",
    "category_id": "92e3abdb-fea7-5244-be2f-32b62f0d7e8b",
    "category_name": "Máy Tạo Khói & Sương Sân Khấu",
    "category_slug": "may-tao-khoi",
    "name": "Máy tạo bong bóng Antari B-100",
    "slug": "b-100-bubble-machine",
    "sku": "B100",
    "brand": "Antari",
    "description": "Máy tạo bong bóng Antari B-100 – Hiệu ứng bong bóng cho sân khấu và sự kiện Máy tạo bong bóng Antari B-100 là thiết bị hiệu ứng bong bóng nhỏ gọn thuộc B Series của Antari, được thiết kế để tạo ra luồng bong bóng liên tục cho các chương trình biểu diễn, sự kiện, tiệc, hoạt động giải trí và nhiều không gian cần tăng thêm cảm giác vui nhộn, sinh động. B-100 sử dụng thiết kế Double Bubble Wheel – bánh xe tạo bong bóng kép , kết hợp cùng quạt tích hợp để liên tục đưa bong bóng ra khỏi máy. Cách vận ",
    "sale_enabled": true,
    "sale_price": 3445200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/b-100-bubble-machine.png",
    "images": [
      {
        "id": "img-1039648600",
        "image_url": "/images/products/b-100-bubble-machine.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "41ff870a-bc84-500e-afd8-8587fd3400c1",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PEDAL GUITAR BLUETOOTH ZOOM MS 100BT",
    "slug": "ms-100bt",
    "sku": "MS100BT",
    "brand": "ZOOM",
    "description": "#### BLUETOOTH STOMPBOX ĐẦU TIÊN THẾ GIỚI MS-100BT Bàn đạp ghi-ta MultiStomp có Bluetooth® Hãy tưởng tượng một hộp đàn ghita mạnh mẽ, dễ sử dụng được tải với 100 mẫu amp và hiệu ứng phổ biến nhất trên thế giới. Sau đó, hãy tưởng tượng bạn có thể tải xuống ngay lập tức nhiều hiệu ứng và mô hình khác trực tiếp từ iPhone, iPad hoặc iPod Touch của bạn. Đó là Zoom MS-100BT: Bàn đạp đa hiệu ứng đầu tiên trên thế giới kết hợp công nghệ Bluetooth®. Cùng với ứng dụng StompShare miễn phí của Zoom (có sẵn ",
    "sale_enabled": true,
    "sale_price": 3477600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ms-100bt.png",
    "images": [
      {
        "id": "img-1039645526",
        "image_url": "/images/products/ms-100bt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c1a1e2a9-bcb4-53d8-948f-1753635e99bc",
    "category_id": "83773903-f971-5813-a96e-e645ad96a66a",
    "category_name": "Nhạc Cụ & Trống Jazz",
    "category_slug": "nhac-cu",
    "name": "BỘ GÕ ĐIỆN TỬ ZOOM RT-223",
    "slug": "rt-223",
    "sku": "RT223",
    "brand": "ZOOM",
    "description": "#### The Zoom RT-223 Rhythm Trak is the perfect accompanist for every kind of performer: singer/songwriters, solo artists, DJs and bands looking for extra percussion effects. It provides 70 drum kits and 12 bass sounds, along with an intuitive user interface that makes programming easy. The RT-223 is small enough to fit in your guitar case or gig bag yet it's loaded with advanced features such as a line-level input, control footswitch input and MIDI IN, plus DSP effects like multi-band compressi",
    "sale_enabled": true,
    "sale_price": 5322240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rt-223.png",
    "images": [
      {
        "id": "img-1039645514",
        "image_url": "/images/products/rt-223.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f180e15d-f810-53da-8ff5-4121a5dac07c",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "MÁY GHI ÂM CẦM TAY ZOOM Q2HD",
    "slug": "q2hd",
    "sku": "VB-1039645506",
    "brand": "ZOOM",
    "description": "#### Máy thu âm cầm tay ZOOM Q2HD – Hàng Chính Hãng thiết bị mới 100%. sẽ được đóng gói và gửi cho đơn vị vận chuyển ngay sau khi nhận được đơn hàng Bạn có thể tin tưởng vào Q2HD của mình để cung cấp video chất lượng cao và âm thanh nguyên bản mọi lúc mọi nơi. Đây chỉ là một số cách bạn có thể sử dụng: Ghi âm và phát trực tiếp các buổi hòa nhạc, độc tấu, thử giọng và biên tập Quay phim chụp ảnh Thực hiện các bài học qua video — hoàn hảo để thể hiện ngón tay, bowling và các kỹ thuật chơi khác Nắm",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/q2hd.png",
    "images": [
      {
        "id": "img-1039645506",
        "image_url": "/images/products/q2hd.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d652d6e2-27e0-5e79-933c-a200d8ba61db",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "MÁY GHI ÂM CẦM TAY ZOOM HS 1",
    "slug": "hs-1",
    "sku": "HS1",
    "brand": "ZOOM",
    "description": "With the HS-1, you can attach your Handy Recorder to any DSLR video camera equipped with a standard Hot Shoe mount. Now you can have both your video and audio controls right at your fingertips, and your microphone right at the action.",
    "sale_enabled": true,
    "sale_price": 464400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hs-1.png",
    "images": [
      {
        "id": "img-1039645503",
        "image_url": "/images/products/hs-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "56e02655-d699-5bd8-8bb0-68d8b7b41907",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "MÁY GHI ÂM ZOOM iQ 6",
    "slug": "iq-6",
    "sku": "IQ6",
    "brand": "ZOOM",
    "description": "#### Zoom iQ6 một sản phẩm ghi âm dành riêng cho điện thoại với những tiện ích nổi bật và hiện đại nhất. Biến thiết bị iOS của bạn thành máy ghi bằng cách cắm Zoom iQ6 — micrô X / Y âm thanh nổi có đầu nối Lightning đủ nhỏ để bỏ được vào túi của bạn. Ghi lại âm thanh của các buổi hòa nhạc, phỏng vấn, cuộc họp và bài giảng với độ chính xác, trung thực đầy đủ, sau đó chia sẻ với mọi người. Ghi lại khoảnh khắc Zoom iQ6 thiết kế nhỏ gọn và nhẹ cho phép bạn tạo bản ghi âm chất lượng cao ở mọi nơi bạn",
    "sale_enabled": true,
    "sale_price": 2856600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/iq-6.png",
    "images": [
      {
        "id": "img-1039645501",
        "image_url": "/images/products/iq-6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c3411f49-d549-5233-8ec8-a13782d0d0f3",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "PEDAL ZOOM B2.1/220BX",
    "slug": "b2-1-220bx",
    "sku": "B21220BX",
    "brand": "ZOOM",
    "description": "#### Zoom B2.1U Features: 40 preset effects patches 40 programmable memory patches 7 effect modules with 45 effect types 32-bit processing, 96kHz sampling rate 24-bit A/D, D/A converters Ultra wide frequency response:20Hz - 40kHz Built-in drum machine with 40 rhythm patterns Integrated chromatic tuner Sturdy metal chassis with rubber side-guard shells Operates on 4 AA batteries, or AC power adapter (included) USB Interface Built In Expression Pedal Steinberg Cubase LE software included",
    "sale_enabled": true,
    "sale_price": 4082400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/b2-1-220bx.png",
    "images": [
      {
        "id": "img-1039645479",
        "image_url": "/images/products/b2-1-220bx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "440ff755-02e3-5296-b507-b9b371bce2e8",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "MIXER ANALOG BEHRINGER XENYX 1622FX",
    "slug": "behringer-xenyx-1622fx",
    "sku": "VB-1039591982",
    "brand": "BEHRINGER",
    "description": "#### he 16-input XENYX 1622FX is an analog mixer that brings together old-school feel, onboard digital effects the endless possibilities of digital recording. Superior Mic Preamps The BEHRINGER XENYX 1622FX represents a significant milestone in the development of mixer technology. Equipped with our premium XENYX mic preamps, it can easily hold its own against expensive stand-alone mic pres, both in terms of sound quality and available headroom. XENYX preamps offer a staggering 130 dB of dynamic ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-xenyx-1622fx.png",
    "images": [
      {
        "id": "img-1039591982",
        "image_url": "/images/products/behringer-xenyx-1622fx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cc43a854-e28d-5575-bd17-43e1f1b6d89d",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "PEDAL EFFECT BEHRINGER VT999",
    "slug": "behringer-vt999",
    "sku": "VT999",
    "brand": "BEHRINGER",
    "description": "#### VINTAGE TUBE MONSTER VT999 The VINTAGE TUBE MONSTER VT999 effects pedal has that full-tone roar of a tube engine under its hood, letting you take off with anything from warm blues overdrive to heavy distortion. Add to this the excellent build quality and true-bypass wiring, and you begin to see just how monstrous this pedal really is!",
    "sale_enabled": true,
    "sale_price": 1776600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-vt999.png",
    "images": [
      {
        "id": "img-1039591981",
        "image_url": "/images/products/behringer-vt999.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d1d0b3e4-64ac-5a66-b35f-80c2f14ada44",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "PEDAL EFFECT BEHRINGER VT911",
    "slug": "behringer-vt911",
    "sku": "VT911",
    "brand": "BEHRINGER",
    "description": "#### VINTAGE TUBE OVERDRIVE VT911 With the VINTAGE TUBE OVERDRIVE VT911 effects pedal, you get distortion with the distinctive tonal quality that only a real tube can deliver, bringing vintage sound back to life. Get a whole tube amp in a pedal and take off with anything from warm blues overdrive to heavy distortion! You Can Have it All Virtually all of the most-desired distortion tones can be found in the VINTAGE TUBE OVERDRIVE VT911 pedal. This high-quality classic tube overdrive is based on a",
    "sale_enabled": true,
    "sale_price": 1197720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-vt911.png",
    "images": [
      {
        "id": "img-1039591980",
        "image_url": "/images/products/behringer-vt911.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "44dd04ec-a883-515f-9820-52db22305120",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "GUITAR EFFECT BEHRINGER VAMP3",
    "slug": "behringer-vamp3",
    "sku": "VB-1039591979",
    "brand": "BEHRINGER",
    "description": "#### V-AMP 3 Now you can have a veritable truckload of classic guitar amps and speaker cabinets (480 virtual combos) at your beck and call, thanks to the incredible V-AMP 3 – and you won’t need a truck to take it with you! Loaded with 32 amplifier and 15 speaker cabinet models, plus 16 classic stereo effects, the V-AMP 3 puts out so much authentic sound, that you can almost feel the heat from the glowing tubes. And if you play multiple instruments, such as bass, guitar and keyboards, the V-AMP 3",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-vamp3.png",
    "images": [
      {
        "id": "img-1039591979",
        "image_url": "/images/products/behringer-vamp3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4225002c-5090-5861-854d-389402c030fc",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "GUITAR EFFECT BEHRINGER VAMP2",
    "slug": "behringer-vamp2",
    "sku": "VB-1039591978",
    "brand": "BEHRINGER",
    "description": "#### V-AMP 2 If a lack of money and floor space is all that's been standing between you and a roomful of vintage guitar amps and effects pedals, get ready to love the V-AMP 2. It comes loaded with 32 amp models, 15 speaker cabinet models and 16 classic effects. Any Classic You Like The V-AMP 2's 32 amp models are organized into four groups: CLEAN, BLUES, METAL and ROCK. Just twist the dedicated dial to plug into unbelievably authentic simulations of the greatest British and American tube amps fr",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-vamp2.png",
    "images": [
      {
        "id": "img-1039591978",
        "image_url": "/images/products/behringer-vamp2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "df586f50-e265-549e-b73d-1a40631f6bca",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "MIDI CONTROLLER BEHRINGER UMX490",
    "slug": "behringer-umx490",
    "sku": "UMX490",
    "brand": "BEHRINGER",
    "description": "#### U-CONTROL UMX490 The U-CONTROL UMX490 is an extremely versatile, 49-Key USB/ MIDI master keyboard controller that is ideally-suited for a wide range of performance and recording applications. Need independent control of hardware synthesizers or general MIDI sound modules? How about control over effects devices? Maybe you just want to operate sequencing software, or computer plug-ins from a more convenient remote location? The UMX490 provides total flexibility and tremendous ease of use, tha",
    "sale_enabled": true,
    "sale_price": 4231440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-umx490.png",
    "images": [
      {
        "id": "img-1039591977",
        "image_url": "/images/products/behringer-umx490.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c73f4d09-aea0-5012-a363-250cb74e4f1d",
    "category_id": "56511d7f-1231-5f06-8a74-5bcd4984aed0",
    "category_name": "Phụ Kiện Nhạc Cụ",
    "category_slug": "phu-kien-nhac-cu",
    "name": "MIDI CONTROLLER BEHRINGER UMA25S",
    "slug": "behringer-uma25s",
    "sku": "UMA25S",
    "brand": "BEHRINGER",
    "description": "#### U-CONTROL UMA25S The U-CONTROL UMA25S is an extremely versatile, 25-Key USB/ MIDI master keyboard controller that is ideally-suited for a wide range of performance and recording applications. Need independent control of hardware synthesizers or general MIDI sound modules? How about control over effects devices? Maybe you just want to operate sequencing software, or computer plug-ins from a more convenient remote location? The UMA25S provides total flexibility and tremendous ease of use, tha",
    "sale_enabled": true,
    "sale_price": 4051080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-uma25s.png",
    "images": [
      {
        "id": "img-1039591976",
        "image_url": "/images/products/behringer-uma25s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9dd3e8f2-dde1-5683-a85f-9703af24df49",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA BEHRINGER Ultrabass BA410 Cabinet",
    "slug": "behringer-ultrabass-ba410-cabinet",
    "sku": "VB-1039591975",
    "brand": "BEHRINGER",
    "description": "#### ULTRABASS BA410 Tap into 1,000 Watts of power delivered by a four pack of 10\" BUGERA alu cone speakers augmented by a 1\" horn driver. Ample power handling and loads of headroom. Get awesome, hard attack with smooth, direct and amazingly rich response.",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-ultrabass-ba410-cabinet.png",
    "images": [
      {
        "id": "img-1039591975",
        "image_url": "/images/products/behringer-ultrabass-ba410-cabinet.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b91f93b0-aae6-5ead-9b03-e1391eb8b23f",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO DÂY BEHRINGER T1",
    "slug": "behringer-t1",
    "sku": "BEHRINGER T1",
    "brand": "BEHRINGER",
    "description": "#### STUDIO CONDENSER MICROPHONE T-1 Since the early days of recording, sound engineers have been searching for the best-sounding mics for recording acoustic instruments and the human voice. The resounding choice of professional recordists around the globe has been the tube condenser microphone. Why? Because nothing compares to the sound captured by a good tube condenser microphone – so open, warm and full of character. But buying a tube mic can wipe out a home-recording budget faster than you c",
    "sale_enabled": true,
    "sale_price": 5667840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-t1.png",
    "images": [
      {
        "id": "img-1039591974",
        "image_url": "/images/products/behringer-t1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5b29b296-53bf-513a-8aab-0b4961145c46",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU BEHRINGER MIC2200",
    "slug": "behringer-mic2200",
    "sku": "MIC2200",
    "brand": "BEHRINGER",
    "description": "#### ULTRAGAIN PRO MIC2200 Tubes can really warm up a signal fast, giving it increased depth and character. Though transistors have succeeded the technology, many musicians agree that tubes deliver a far superior sound. A true audiophile 2-channel Mic/Line preamplifier, the ULTRA GAIN PRO MIC2200’s hand selected 12AX7 vacuum tube gives everything from microphones to acoustic or bass guitars that vintage tube vibe in a dependable and highly-affordable package. The onboard fully parametric EQs pro",
    "sale_enabled": true,
    "sale_price": 2754000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/behringer-mic2200.png",
    "images": [
      {
        "id": "img-1039591970",
        "image_url": "/images/products/behringer-mic2200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8fcece03-1154-5445-9653-cad83e12b6d0",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ BEHRINGER DJX900USB",
    "slug": "behringer-djx900usb",
    "sku": "DJX900USB",
    "brand": "BEHRINGER",
    "description": "MIXER DJ Behringer DJX900USB Behringer DJX900USB là bộ trộn DJ 5 kênh chuyên nghiệp với hiệu ứng kỹ thuật số tích hợp. Bộ trộn này được thiết kế để cung cấp âm thanh rõ ràng, trong trẻo và hiệu suất đáng tin cậy cho các DJ chuyên nghiệp và nghiệp dư. #### Đặc điểm nổi bật: 5 kênh: Bộ trộn DJX900USB có 5 kênh, cho phép bạn kết nối tối đa 5 nguồn âm thanh khác nhau. Crossfader quang học Infinium: Crossfader quang học Infinium của DJX900USB cho phép bạn pha trộn các bản nhạc một cách mượt mà và chí",
    "sale_enabled": true,
    "sale_price": 8002800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-djx900usb.png",
    "images": [
      {
        "id": "img-1039591960",
        "image_url": "/images/products/behringer-djx900usb.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "32596f1c-07ef-50f9-b564-88434cfc454c",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU BEHRINGER DI4000",
    "slug": "behringer-di4000",
    "sku": "DI4000",
    "brand": "BEHRINGER",
    "description": "ULTRA-DI PRO DI 4000 ULTRA-DI PRO DI4000 cung cấp cho bạn 4 kênh DI hạng nhất trong một không gian giá duy nhất. Mỗi kênh được trang bị hai Đầu vào (XLR và ¼\" TRS), một Đầu ra XLR cân bằng – và một đầu ra Liên kết ¼\" để kết nối với bộ khuếch đại hoặc bảng điều khiển màn hình của bạn. Thêm vào đó, DI4000 được thiết kế để phù hợp với hầu hết mọi tín hiệu đầu vào, độ suy giảm đầu vào có thể chuyển đổi lên đến 40 dB và độ khuếch đại lên đến 20 dB, trong khi các biến áp đầu ra OT-1 được đánh giá cao ",
    "sale_enabled": true,
    "sale_price": 2754000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-di4000.png",
    "images": [
      {
        "id": "img-1039591957",
        "image_url": "/images/products/behringer-di4000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d5ac50df-376b-5730-baf5-cb7aa53e8a9b",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU BEHRINGER BTR 2000",
    "slug": "behringer-btr-2000",
    "sku": "BTR2000",
    "brand": "BEHRINGER",
    "description": "#### RACKTUNER BTR2000 A multi-functional, auto-chromatic digital tuner with a standard ¼ \" TS input for electronic instruments and a built-in mic for acoustic instruments, the RACKTUNER BTR2000 also features a versatile metronome with sound output and visual feedback – plus integrated rack lights and much more. When you absolutely need to be in-tune, either in the studio or on the stage – nothing beats the professional-grade RACKTUNER BTR2000!",
    "sale_enabled": true,
    "sale_price": 1995840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-btr-2000.png",
    "images": [
      {
        "id": "img-1039591952",
        "image_url": "/images/products/behringer-btr-2000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fb3c91d2-b9b1-522d-9ade-ca0ea20f7f1b",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU BEHRINGER BCR2000",
    "slug": "behringer-bcr2000",
    "sku": "BCR2000",
    "brand": "BEHRINGER",
    "description": "#### B-CONTROL ROTARY BCR2000 The total-recall B-CONTROL BCR2000 USB/MIDI Controller combines the unlimited versatility of today’s audio software with the feel of real handson controls. With the BCR2000 you can move real high-resolution encoders to control all of your computerbased virtual gear in Cubase®, Cakewalk®, Logic® Audio, Ableton® – and many other popular DAWs (Digital Audio Workstations). Want to control your synth, mixer, effects or signal processor with real controls? It's amazingly ",
    "sale_enabled": true,
    "sale_price": 5189400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-bcr2000.png",
    "images": [
      {
        "id": "img-1039591951",
        "image_url": "/images/products/behringer-bcr2000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c3b027f8-010c-58a0-bbd6-24fedc2494aa",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "DJ CONTROLLER BEHRINGER BCD3000",
    "slug": "behringer-bcd3000",
    "sku": "BCD3000",
    "brand": "BEHRINGER",
    "description": "#### B-CONTROL DEEJAY—the Hottest Hands-On DJ Mixer from BEHRINGER It’s everything you ever wanted in a DJ production tool. It’s gorgeous, you can put your hands on it and the software is simply irresistible. The B-CONTROL DEEJAY BCD3000 DJ mixer lets you play, mix and scratch any MP3, WAV or other audio format with a real vinyl feel. Packed with mind-blowing features such as mixer, dual-player, effects, mic/phono preamps and a full-fledged monitor section, this 4-channel USB audio interface per",
    "sale_enabled": true,
    "sale_price": 5189400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/behringer-bcd3000.png",
    "images": [
      {
        "id": "img-1039591949",
        "image_url": "/images/products/behringer-bcd3000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "94b023a4-901e-5fc5-a575-dd0f54aa89a0",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU MARANI KD1550P",
    "slug": "kd-1550p",
    "sku": "KD1550P",
    "brand": "MARANI",
    "description": "VANG SỐ KARAOKE MARANI KD1550P Giải pháp Xử Lý Âm Thanh Kỹ Thuật Số Cao Cấp Cho Karaoke Và Biểu Diễn Marani KD1550P là bộ xử lý âm thanh kỹ thuật số cao cấp được thiết kế đặc biệt để đáp ứng nhu cầu khắt khe của hệ thống karaoke chuyên nghiệp, biểu diễn trực tiếp và phòng thu âm. Với khả năng kiểm soát độc lập toàn diện các tín hiệu âm thanh từ micro, nhạc nền và hiệu ứng, KD1550P mang đến chất lượng âm thanh vượt trội cùng khả năng tùy chỉnh linh hoạt. #### Tính Năng Nổi Bật Của Vang số Karaoke",
    "sale_enabled": true,
    "sale_price": 13831171,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/kd-1550p.png",
    "images": [
      {
        "id": "img-1038591737",
        "image_url": "/images/products/kd-1550p.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fe99cbf6-b3cf-5335-bb3c-30a886bb209e",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU MARANI DEF220P",
    "slug": "def220p",
    "sku": "DEF220P",
    "brand": "MARANI",
    "description": "DEF220P #### TỔNG QUAN DEF220P là một bộ xử lý hiệu ứng kỹ thuật số được đóng gói trong một vỏ tủ rackmount 1U 19 inch. Giao diện Người dùng đã được thiết kế cẩn thận để thân thiện với người dùng và bao gồm một bộ mã hóa quay trung tâm cho mục đích điều hướng, một chiết áp để cài đặt thông số, với ba chiết áp khác để điều khiển các mức INPUT, OUTPUT và MIX. DEF220P có màn hình chữ và số LCD 2x20 để dễ dàng truy cập và thiết lập, cũng như chỉ báo LED trên CLIP, MUTE và đèn LED báo thời gian TAP. ",
    "sale_enabled": true,
    "sale_price": 8445600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/def220p.jpg",
    "images": [
      {
        "id": "img-1038587341",
        "image_url": "/images/products/def220p.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f0a4fbda-bc6e-5c2f-96b0-77fd05ae3758",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU MARANI DPA360A",
    "slug": "dpa360a",
    "sku": "DPA360A",
    "brand": "MARANI",
    "description": "MARANI DPA360A Thiết bị xử lý tín hiệu DPA360A của hãng MARANI - Giải pháp hoàn hảo cho âm thanh chuyên nghiệp Thiết bị xử lý tín hiệu (DSP) là một thiết bị điện tử sử dụng phần mềm để xử lý tín hiệu âm thanh. DSP có thể được sử dụng để thực hiện nhiều nhiệm vụ khác nhau, bao gồm cân bằng âm thanh, loại bỏ tiếng ồn, tạo hiệu ứng âm thanh và điều khiển loa. DPA360A là một thiết bị xử lý tín hiệu kỹ thuật số cao cấp của hãng Marani. Với 3 đầu vào analog và 6 đầu ra analog, DPA360A cung cấp khả năn",
    "sale_enabled": true,
    "sale_price": 19375200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/dpa360a.png",
    "images": [
      {
        "id": "img-1038576197",
        "image_url": "/images/products/dpa360a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e49c87b5-a00d-50b1-9b34-f64ff3a29c28",
    "category_id": "eba9ed8b-fcc7-5bec-97a7-3a42ef8598c6",
    "category_name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
    "category_slug": "thiet-bi-xu-ly-tin-hieu",
    "name": "BỘ XỬ LÝ TÍN HIỆU MARANI DPA260A",
    "slug": "marani-dpa260a",
    "sku": "DPA260A",
    "brand": "MARANI",
    "description": "MARANI DPA26A Thiết bị xử lý tín hiệu DPA260A của hãng MARANI - Mang đến trải nghiệm âm thanh chuyên nghiệp DPA260A là thiết bị xử lý tín hiệu ( DSP-Digital Signal Processing ) âm thanh chuyên nghiệp , được thiết kế để mang đến chất lượng âm thanh tuyệt hảo và tính linh hoạt cao. Với 2 kênh đầu vào analog và 6 kênh đầu ra analog, DPA260A phù hợp với nhiều ứng dụng khác nhau, bao gồm âm thanh trực tiếp và âm thanh cố định. #### Đặc điểm nổi bật của thiết bị xử lý tín hiệu DPA260A Khả năng xử lý t",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/marani-dpa260a.png",
    "images": [
      {
        "id": "img-1038575997",
        "image_url": "/images/products/marani-dpa260a.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "692060d1-0cc6-5958-ae8a-78c4d06fa70d",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E 602-II",
    "slug": "e-602-ii",
    "sku": "VB-1038482543",
    "brand": "SENNHEISER",
    "description": "Micrô nhạc cụ Cardioid đặc biệt thích hợp để sử dụng với trống bass, ca-bin guitar bass và tubas. Rắn, nhẹ và dễ định vị. Dành cho phòng thu, câu lạc bộ, phòng tập, hợp đồng biểu diễn nhỏ hơn hoặc để thu âm tại nhà. #### Micrô nhạc cụ Cardioid đặc biệt thích hợp để sử dụng với trống bass, ca-bin guitar bass và tubas. Rắn, nhẹ và dễ định vị. Dành cho phòng thu, câu lạc bộ, phòng tập, hợp đồng biểu diễn nhỏ hơn hoặc để thu âm tại nhà. Cảm nhận nhiều âm trầm hơn. Đừng chỉ nghe nó. Cảm nhận nó. Đột ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e-602-ii.png",
    "images": [
      {
        "id": "img-1038482543",
        "image_url": "/images/products/e-602-ii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6ff803d7-2016-5ef1-b754-f3a1eefac054",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ XPRS-215S",
    "slug": "xprs-215s",
    "sku": "XPRS-215S",
    "brand": "Pioneer DJ",
    "description": "#### Subwoofer XPRS-215S cung cấp cho bạn một âm bass trầm ấm và mạnh mẽ. Với củ loa (horn) được tích hợp và Driver LF lõi kép cao cấp 15 inch, cung cấp các dải tần số thấp, mạnh mẽ. Các công tắc chuyển (Crossover) và Phase cho phép bạn dễ dàng điều khiển bộ xử lý tín hiệu (Digital Signal Processor) một cách dễ dàng. Các module AMP Class D của Powersoft tạo đầu ra 2400W (cao nhất) hoặc 1200W (liên tục). Hiệu chỉnh hệ số công suất (PFC)",
    "sale_enabled": true,
    "sale_price": 62335440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xprs-215s.jpg",
    "images": [
      {
        "id": "img-1038469819",
        "image_url": "/images/products/xprs-215s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b56e7889-f83d-520b-9a91-3315d805f6d4",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ XPRS-15",
    "slug": "xprs-15",
    "sku": "XPRS-15",
    "brand": "Pioneer DJ",
    "description": "#### XPRS Series là dòng thiết bị loa PA Active mang lại âm thanh sống động tự nhiên. Công nghệ AFAST độc quyền của Pioneer Pro Audio tạo nên chất lượng âm thanh vượt trội, sống động và tiết kiệm năng lượng, phù hợp với mọi thể loại âm nhạc và môi trường. #### Main Features What's in the Box XPRS 15 x 1 Powerd cord Installation and Operation Manual Important Safety Precautions Specifications Supported voltages 100 V (50 Hz/60 Hz) 110 V to 240 V (50 Hz/",
    "sale_enabled": true,
    "sale_price": 50587200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xprs-15.jpg",
    "images": [
      {
        "id": "img-1038469813",
        "image_url": "/images/products/xprs-15.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e9f638ff-f24e-5a23-9552-b1f980580b86",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ XPRS-12",
    "slug": "xprs-12",
    "sku": "XPRS-12",
    "brand": "Pioneer DJ",
    "description": "#### XPRS Series là dòng thiết bị loa PA Active mang lại âm thanh sống động tự nhiên. Công nghệ AFAST độc quyền của Pioneer Pro Audio tạo nên chất lượng âm thanh vượt trội, sống động và tiết kiệm năng lượng, phù hợp với mọi thể loại âm nhạc và môi trường. #### Main Features What's in the Box XPRS 12 x 1 Powerd cord Installation and Operation Manual Important Safety Precautions Specifications Supported voltages 100 V (50 Hz/60 Hz) 110 V to 240 V (50 Hz/",
    "sale_enabled": true,
    "sale_price": 46675440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xprs-12.jpg",
    "images": [
      {
        "id": "img-1038469805",
        "image_url": "/images/products/xprs-12.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0f332a38-4ac6-5377-9352-1c85cbba4960",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ XPRS-115S",
    "slug": "xprs-115s",
    "sku": "XPRS-115S",
    "brand": "Pioneer DJ",
    "description": "#### Subwoofer XPRS-115S được trang bị một driver 15 inch tần số thấp với âm bass trầm, ấm và mạnh mẽ, được thiết kế nằm riêng trên vỏ loa, bộ subwoofer 15 inch này có Crossover Switch ( công tắc chuyển ) giúp bạn nhanh chóng điều chỉnh các dải tần số cut-off ở các dải tần khác nhau giữa 80Hz và 150Hz. #### Main Features What's in the Box XPRS 115S x 1 Powerd cord Installation and Operation Manual Important Safety Precautions Specifications Width 480 m",
    "sale_enabled": true,
    "sale_price": 47355840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xprs-115s.jpg",
    "images": [
      {
        "id": "img-1038469797",
        "image_url": "/images/products/xprs-115s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5d3c87a5-88c4-5e8a-ba1f-8b3e5b86cbef",
    "category_id": "7ba17331-105e-5eed-9ef9-3353cefe18b4",
    "category_name": "Loa Thùng & Sân Khấu Pro Audio",
    "category_slug": "loa-thung-pro-audio",
    "name": "LOA PIONEER DJ XPRS-10",
    "slug": "xprs-10",
    "sku": "XPRS-10",
    "brand": "Pioneer DJ",
    "description": "#### XPRS Series là dòng thiết bị loa PA Active mang lại âm thanh sống động tự nhiên. Công nghệ AFAST độc quyền của Pioneer Pro Audio tạo nên chất lượng âm thanh vượt trội, sống động và tiết kiệm năng lượng, phù hợp với mọi thể loại âm nhạc và môi trường. #### Main Features What's in the Box XPRS 10 x 1 Powerd cord Installation and Operation Manual Important Safety Precautions Specifications Width 320 mm Height 520 mm Depth 374 mm Weight 18.9 kg Freque",
    "sale_enabled": true,
    "sale_price": 44248680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xprs-10.jpg",
    "images": [
      {
        "id": "img-1038469790",
        "image_url": "/images/products/xprs-10.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f47a8f33-2e11-59db-a583-d44aa65e1c1d",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "MÁY DJ PIONEER DJ XDJ-XZ-N",
    "slug": "xdj-xz-n",
    "sku": "VB-1038469785",
    "brand": "Pioneer DJ",
    "description": "#### XDJ-XZ sẽ là sản phẩm hoản hảo cho các lựa chọn đấy. Với thiết kế chuyên nghiệp và bố cục tiêu chuẩn cho Club, chơi trên thiết bị All-in-one mới nhất này sẽ đem lại cảm giác phấn khích giống như khi sử dụng CDJ-2000NXS2 và DJM-900NXS2 . Hãy chọn cách mà bạn muốn sử dụng bằng cách analyzed track trong Rekordbox ra USB sử dụng cho channels 1 và 2 trên XDJ-XZ hoặc kết nối với laptop bằng Rekordbox DJ hoặc Link Export. với 2 channel còn lại các bạn có thể sử dụng thêm thiết bị như Turntables . ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/xdj-xz-n.jpg",
    "images": [
      {
        "id": "img-1038469785",
        "image_url": "/images/products/xdj-xz-n.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a5bbef80-95dd-5d7d-b336-9f37256975a3",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "MÁY DJ PIONEER DJ XDJ-XZ",
    "slug": "xdj-xz",
    "sku": "XDJ-XZ",
    "brand": "Pioneer DJ",
    "description": "#### XDJ-XZ sẽ là sản phẩm hoản hảo cho các lựa chọn đấy. Với thiết kế chuyên nghiệp và bố cục tiêu chuẩn cho Club, chơi trên thiết bị All-in-one mới nhất này sẽ đem lại cảm giác phấn khích giống như khi sử dụng CDJ-2000NXS2 và DJM-900NXS2 . Hãy chọn cách mà bạn muốn sử dụng bằng cách analyzed track trong Rekordbox ra USB sử dụng cho channels 1 và 2 trên XDJ-XZ hoặc kết nối với laptop bằng Rekordbox DJ hoặc Link Export. với 2 channel còn lại các bạn có thể sử dụng thêm thiết bị như Turntables . ",
    "sale_enabled": true,
    "sale_price": 73546920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/xdj-xz.png",
    "images": [
      {
        "id": "img-1038469777",
        "image_url": "/images/products/xdj-xz.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ad0f029e-93d7-5a75-a9e3-5aa4be9614ef",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "MÁY DJ PIONEER DJ XDJ-RX3",
    "slug": "xdj-rx3",
    "sku": "XDJ-RX3",
    "brand": "Pioneer DJ",
    "description": "XDJ-RX3: Thiết bị DJ Đa Năng với Hiệu Năng Vượt Trội Nếu bạn đam mê âm nhạc và muốn trở thành một DJ chuyên nghiệp, thiết bị XDJ-RX3 là sự lựa chọn hoàn hảo cho bạn. Với sự kết hợp tuyệt vời giữa công nghệ và tính năng tiên tiến, XDJ-RX3 mang đến cho bạn một trải nghiệm DJ chất lượng cao mà bạn không thể bỏ qua. Với XDJ-RX3 , bạn không cần phải lo lắng về việc kết nối với máy tính hoặc sử dụng nhiều thiết bị khác nhau. Với màn hình cảm ứng mượt mà và giao diện người dùng thân thiện, bạn có thể d",
    "sale_enabled": true,
    "sale_price": 61506000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xdj-rx3.png",
    "images": [
      {
        "id": "img-1038469766",
        "image_url": "/images/products/xdj-rx3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "89db7d2b-925b-5943-948a-0831a5b68a6a",
    "category_id": "31042f34-c3c9-59e6-820d-8e5518ba453b",
    "category_name": "Hệ Thống DJ All-in-One",
    "category_slug": "all-in-one-dj-systems",
    "name": "MÁY DJ PIONEER DJ XDJ-RR",
    "slug": "xdj-rr",
    "sku": "XDJ-RR",
    "brand": "Pioneer DJ",
    "description": "2-channel all-in-one DJ system Bedroom to main room Đưa màn trình diễn của bạn lên một tầm cao mới với XDJ-RR thiết bị ALL-IN-ONE DJ System sử dụng cùng rekordbox. XDJ-RR là thiết bị 2 channel được kế thừa các đặc điểm thiết kế và các tính năng ưu việt từ set up NXS2 chuyên nghiệp và tất cả được tích hợp vào trong 1 thiết bị gọn nhẹ, di động. #### Play your own way XDJ-RR là thiết bị độc lập và bạn có thể chơi nhạc trực tiếp trên XDJ-RR thông qua cổng USB, kết nối Link Export hoặc sử dụng Perfor",
    "sale_enabled": true,
    "sale_price": 32832000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xdj-rr.jpg",
    "images": [
      {
        "id": "img-1038469752",
        "image_url": "/images/products/xdj-rr.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c5608878-db92-5597-aa1a-0708b52e7da2",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ PIONEER DJ XDJ-1000MK2",
    "slug": "xdj-700",
    "sku": "XDJ-1000MK2",
    "brand": "Pioneer DJ",
    "description": "XDJ-1000MK2 được hỗ trợ bởi phần mềm quản lý nhạc đa năng Rekordbox. Lấy cảm hứng từ CDJ-2000NXS2, thiết bị sở hữu mâm xoay lớn, màn hình cảm ứng 7-inch, hiển thị màu sắc trực quan, và bộ đọc cấu trúc bài nhạc nhanh và mạnh mẽ. #### CDJ-style design XDJ-1000MK2 có jog wheel và màn hình cảm ứng 7-inch LCD, được thừa hưởng từ CDJ-2000NXS2 sẽ giúp bạn có thể dễ dàng theo dõi và kiểm soát set nhạc của mình. High-resolution audio Bên cạnh MP3, AAC, WAV and AIFF",
    "sale_enabled": true,
    "sale_price": 38755800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xdj-700.jpg",
    "images": [
      {
        "id": "img-1038469743",
        "image_url": "/images/products/xdj-700.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4e5537eb-45eb-5370-abaf-150b6774edf6",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ PIONEER DJ XDJ-700",
    "slug": "xdj-1000mk2",
    "sku": "XDJ-700",
    "brand": "Pioneer DJ",
    "description": "#### XDJ-700 được thiết kế với màn hình lớn, layout quen thuộc, thừa hưởng rất nhiều tính năng từ XDJ-1000. Thiết kế nhỏ gọn, dễ dàng di chuyển tiện lợi cho những thiết lập đơn giản và nhanh chóng. Large touch screen màn hình cảm ứng 7-inch LCD, được thừa hưởng từ CDJ-2000NXS2 sẽ giúp bạn có thể dễ dàng theo dõi và kiểm soát set nhạc của mình. Faster browsing Dễ dàng tìm kiếm playlist của bạn nhờ vào núm xoay Browser hoặc bạn có thể tìm trực tiếp bài nhạc bằng bà",
    "sale_enabled": true,
    "sale_price": 20968200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xdj-1000mk2.jpg",
    "images": [
      {
        "id": "img-1038469736",
        "image_url": "/images/products/xdj-1000mk2.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "be289c16-38f6-5977-8226-a5e62e903f46",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Vòng tay PIONEER DJ",
    "slug": "vong-tay",
    "sku": "VB-1038469724",
    "brand": "Pioneer DJ",
    "description": "Vòng tay PIONEER DJ bằng nhựa là phụ kiện nhỏ gọn, nổi bật và dễ sử dụng, phù hợp cho fan DJ, người yêu nhạc điện tử, sự kiện âm nhạc, workshop, party hoặc làm quà tặng kèm khi mua thiết bị DJ. Sản phẩm có thiết kế đơn giản, trẻ trung, mang phong cách DJ hiện đại. Chất liệu nhựa nhẹ, dễ đeo, phù hợp sử dụng hằng ngày hoặc trong các chương trình quảng bá thương hiệu, sự kiện âm thanh – ánh sáng. Đặc điểm nổi bật Thiết kế phong cách PIONEER DJ, phù hợp với cộng đồng DJ và người yêu âm nhạc. Chất l",
    "sale_enabled": true,
    "sale_price": 29000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vong-tay.png",
    "images": [
      {
        "id": "img-1038469724",
        "image_url": "/images/products/vong-tay.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "203748cb-a163-5289-955d-e0123fee889f",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA PIONEER DJ VM-80",
    "slug": "vm-80",
    "sku": "VM-80",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM ACTIVE VM-80 Loa kiểm âm active Pioneer VM-80 là lựa chọn hoàn hảo cho các studio thu âm, phòng mix nhạc và DJ. Với thiết kế hiện đại, cấu trúc âm học tối ưu và khả năng tái tạo âm thanh chất lượng cao, VM-80 mang đến trải nghiệm nghe tuyệt vời cho mọi người. Loa kiểm âm active Pioneer VM-80 là mẫu loa kiểm âm hai đường tiếng, được trang bị loa woofer 8 inch và loa tweeter 1 inch. Loa được thiết kế với mục đích tái tạo âm thanh chân thực và chính xác, phù hợp với nhu cầu của các stud",
    "sale_enabled": true,
    "sale_price": 19450800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vm-80.png",
    "images": [
      {
        "id": "img-1038469715",
        "image_url": "/images/products/vm-80.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "451123ce-47ec-5cba-98cd-9993b829bfa1",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA PIONEER DJ VM-70",
    "slug": "vm-70",
    "sku": "VM-70",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM ACTIVE VM-70 Loa kiểm âm active Pioneer VM-70 là lựa chọn hoàn hảo cho các studio thu âm, phòng mix nhạc và DJ. Với thiết kế hiện đại, cấu trúc âm học tối ưu và khả năng tái tạo âm thanh chất lượng cao, VM-70 mang đến trải nghiệm nghe tuyệt vời cho mọi người. Loa kiểm âm active Pioneer VM-70 là mẫu loa kiểm âm hai đường tiếng, được trang bị loa woofer 6.5 inch và loa tweeter 1 inch. Loa được thiết kế với mục đích tái tạo âm thanh chân thực và chính xác, phù hợp với nhu cầu của các st",
    "sale_enabled": true,
    "sale_price": 15444000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vm-70.png",
    "images": [
      {
        "id": "img-1038469704",
        "image_url": "/images/products/vm-70.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c60fa7cf-15f2-55cf-ba67-a47d2d5e3181",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA PIONEER DJ VM-50",
    "slug": "vm-50",
    "sku": "VM-50",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM ACTIVE VM-50 Loa kiểm âm active Pioneer VM-50 là lựa chọn hoàn hảo cho các studio thu âm, phòng mix nhạc và DJ. Với thiết kế hiện đại, cấu trúc âm học tối ưu và khả năng tái tạo âm thanh chất lượng cao, VM-50 mang đến trải nghiệm nghe tuyệt vời cho mọi người. Loa kiểm âm active Pioneer VM-50 là mẫu loa kiểm âm hai đường tiếng, được trang bị loa woofer 5 inch và loa tweeter 1 inch. Loa được thiết kế với mục đích tái tạo âm thanh chân thực và chính xác, phù hợp với nhu cầu của các stud",
    "sale_enabled": true,
    "sale_price": 11437200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/vm-50.png",
    "images": [
      {
        "id": "img-1038469686",
        "image_url": "/images/products/vm-50.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2a75d92d-6400-5d07-be8f-a2177f196c53",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "MÁY DJ PIONEER DJ TORAIZ-SQUID",
    "slug": "toraiz-squid",
    "sku": "TORAIZ-SQUID",
    "brand": "Pioneer DJ",
    "description": "#### Với thiết bị SQUID chúng ta có thể dễ đàng điều khiển và truyền cảm hứng vào âm nhạc The SQUID ( SeQUencer Inspirational Device ) Được đặt tên như một sự pha trộn giữa chức năng và sáng tạo mà thiêt bị cung cấp, là một thiết bị hoàn toàn mới trong loạt sản phẩm nhạc cụ và thiết bị sản xuất âm thanh của TORAIZ series. Bạn có thể dễ dàng kết nối tất cả thiết bị nhạc cụ vào SQUID như thiết bị trung tâm điều khiển trong Studio hoăc trình diễn trực tiếp. Đồng thời SQUID có thể điều khiển lên tới",
    "sale_enabled": true,
    "sale_price": 16330000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/toraiz-squid.jpg",
    "images": [
      {
        "id": "img-1038469675",
        "image_url": "/images/products/toraiz-squid.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2156ad30-ba7c-5380-aa11-2b3e5a6d2c0a",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "MÁY DJ PIONEER DJ TORAIZ SP-16",
    "slug": "toraiz-sp-16",
    "sku": "TSP-16",
    "brand": "Pioneer DJ",
    "description": "#### Bố cục sử dụng đơn giản của TORAIZ SP-16 và màn hình cảm ứng lớn giúp cho việc sản xuất âm nhạc, hoặc sử dụng như một đơn vị độc lập trong set-up DJ để tăng cường hiệu suất. Chỉ cần thêm sample, tạo các khuôn patterns và thêm vài hiệu ứng FX hay Loop, biến đổi tham số để tạo ra âm nhạc của riêng mình. #### Specifications Width 436.5 mm Height 74.3 mm Depth 261.2 mm Weight 3.2 kg Terminals Inputs 2 LINE (L/MONO & R, 1/4 inch TS Jack) 1 M",
    "sale_enabled": true,
    "sale_price": 40748000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/toraiz-sp-16.png",
    "images": [
      {
        "id": "img-1038469666",
        "image_url": "/images/products/toraiz-sp-16.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4d154dff-e59f-52fc-ace5-73e51a22d0e2",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "MÁY DJ PIONEER DJ TORAIZ AS-1",
    "slug": "toraiz-as-1",
    "sku": "TORAIZ AS-1",
    "brand": "Pioneer DJ",
    "description": "AS-1 là một bộ monophonic analog synthesizer mang lại khả năng sáng tạo mới cho phòng khu và sân khấu. Thiết kế điều khiển trực quan thực hiện các thay đổi tinh tế và ấn tượng cho những giai điệu âm nhạc nhằm tạo những âm thanh riêng. Thiết bị sử dụng touchpad và slider để điều chỉnh âm thanh khi biểu diễn. #### Collaboration with Dave Smith Làm việc chặt chẽ với Dave Smith, chúng tôi đã cùng nhau tạo ra một Synthesizer với âm thanh analogue mạnh mẽ",
    "sale_enabled": true,
    "sale_price": 13600000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/toraiz-as-1.jpg",
    "images": [
      {
        "id": "img-1038469660",
        "image_url": "/images/products/toraiz-as-1.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fb0bff6d-b8b0-5a33-86e2-734e07ab7b6f",
    "category_id": "1642bf81-abd9-5f68-940e-b0b53a902eba",
    "category_name": "DJ Sampler & Remix",
    "category_slug": "dj-sampler",
    "name": "THIẾT BỊ TẠO HIỆU ỨNG ÂM THANH PIONEER DJ RMX-500",
    "slug": "rmx-500",
    "sku": "RMX-500",
    "brand": "Pioneer DJ",
    "description": "THIẾT BỊ TẠO HIỆU ỨNG ÂM THANH DJ RMX-500 #### RHYTHM FX: Rhythm FX của thiết bị RMX-500 có 5 effects: Roll, Trans, Add, Rev Delay, Offset dùng để cắt giảm và điều khiển các phần của bài nhạc đang chơi từ đó tạo ra những giai điệu mới. Các effects có thể tăng hoặc giảm bằng cách vặn hay nhấn nút vặn xuống. Bên dưới 5 effects là 5 phím nhạc cụ: Kick, Snare, Clap, Hi hat, Cymbal. Mỗi phím có 6 kiểu sound mà bạn có thể thêm vào chỉ với một cái chạm. Phía bên trái là chức năng 4-Beat Sequencer với m",
    "sale_enabled": true,
    "sale_price": 11869308,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rmx-500.png",
    "images": [
      {
        "id": "img-1038469625",
        "image_url": "/images/products/rmx-500.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3ecb53d1-c06e-5738-80b7-f9c1115c7cd2",
    "category_id": "1642bf81-abd9-5f68-940e-b0b53a902eba",
    "category_name": "DJ Sampler & Remix",
    "category_slug": "dj-sampler",
    "name": "THIẾT BỊ TẠO HIỆU ỨNG ÂM THANH PIONEER DJ RMX-1000",
    "slug": "rmx-1000",
    "sku": "RMX-1000",
    "brand": "Pioneer DJ",
    "description": "Beyond your standard effector #### RMX-1000 có một hướng đi hoàn toàn mới so với các Effector và Sampler mang đến một hệ thống 3 trong 1 bao gồm phần mềm chỉnh sửa, phần cứng và các VST/AU/RTAS plug-ins. Thỏa sức sáng tạo cùng tất cả các khả nâng của RMX-1000. Được kế thừa những tính năng ưu việc từ các Mixer và Effector như Isolator của DJM-2000, X-Pad của DJM-900NXS và Multi-FX đến từ EFX-1000. Ngoài ra, RMX-1000 còn cho phép bạn tùy chỉnh những setting của riêng mình. Bạn có thể tùy chỉnh từn",
    "sale_enabled": true,
    "sale_price": 23972220,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rmx-1000.jpg",
    "images": [
      {
        "id": "img-1038469617",
        "image_url": "/images/products/rmx-1000.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d07c44bb-6ae6-5221-b122-9d8be2a11651",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA PIONEER DJ RM-05",
    "slug": "rm-05",
    "sku": "RM-05",
    "brand": "Pioneer DJ",
    "description": "LOA MONITOR ACTIVE RM-05 ĐVT: CÁI Loa monitor Active RM-05 của hãng Pioneer Dj được thiết kế với cấu trúc đồng trục. Với tín hiệu từ tweeter và woofer phát ra từ cùng một điểm, do đó loa Monitor RM-05 đảm bảo âm thanh được phân phối đều và chính xác, mang lại trải nghiệm nghe nhạc vô cùng chân thực và sống động. #### Bạn đang tìm kiếm một dòng loa monitor Active chất lượng, đẳng cấp để nâng tầm trải nghiệm âm nhạc của mình? Không cần tìm đâu xa, loa monitor Active RM-05 của Pioneer DJ chính là s",
    "sale_enabled": true,
    "sale_price": 21427200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/rm-05.png",
    "images": [
      {
        "id": "img-1038469609",
        "image_url": "/images/products/rm-05.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5381984e-d28c-51ef-a113-c40310f6bd56",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "PHẦN MỀM REKORDBOX",
    "slug": "rekordbox",
    "sku": "REKORDBOX",
    "brand": "Pioneer DJ",
    "description": "Rekordbox là phần mềm giúp bạn quản lý nhạc, chuẩn bị set nhạc, chỉnh sửa danh sách (playlist) và đánh giá hiệu suất set nhạc của bạn. Rekordbox có vai trò như một người bạn thân thiết của DJ: Giúp phân tích BPM, vị trí beat, thông tin về key, để bạn có thể tạo các playlist riêng của mình và thêm các cue hoặc Quantized Loops tùy thích. Sau đó chỉ cần export bài nhạc vào USB, cắm vào CDJ hay XDJ và chơi nhạc. Rekordbox DJ giúp bạn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rekordbox.jpg",
    "images": [
      {
        "id": "img-1038469602",
        "image_url": "/images/products/rekordbox.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "90bd1b1a-7485-5107-89c8-36848820aaf6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐĨA TIME CODE PIONEER DJ RB-VS1-K",
    "slug": "rb-vs1-k-time-code-rekordbox",
    "sku": "RB-VS1-K",
    "brand": "Pioneer DJ",
    "description": "#### Với đĩa điều khiển vinyl RB-VS1-K và gói Rekordbox DVS Plus Pack, bạn có thể sử dụng chúng để chơi và scratching các bài nhạc kĩ thuật số khi dùng chung với thiết bị Turntable như PLX-500 hay PLX-1000 kết hợp với mixer. Ngoài màu đen thì còn những màu như đỏ, xanh dương, trắng và xám. Bạn có thể tùy ý chọn màu cho phù hợp với phong cách, sở thích riêng mình.",
    "sale_enabled": true,
    "sale_price": 928800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rb-vs1-k-time-code-rekordbox.jpg",
    "images": [
      {
        "id": "img-1038469594",
        "image_url": "/images/products/rb-vs1-k-time-code-rekordbox.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "45fe0e19-4fcd-53fd-b10a-49ca9676fdb3",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "RB - DMX1",
    "slug": "rb-dmx1",
    "sku": "RB - DMX1",
    "brand": "Pioneer DJ",
    "description": "#### Khi kết nối PC/ Mac bằng cách sử dụng cáp USB, RB-DMX1 có thể kiểm soát bộ DMX512 – hỗ trợ trình chiếu ánh sáng, bằng cách chuyển đổi thông tin trong chế độ Lighting mode tới DMX512. #### General Specifications DMX channels: 1universe (512 ch) DMX output terminal: XLR connector (3 pin) x 1 Main Features What's in the Box USB cable Operating Instructions (Warranty) Specifications Width 90 mm Height 90 mm Depth 41.5 mm Weight 0.3 kg Power Supply AC adaptor (DC 5 V) T",
    "sale_enabled": true,
    "sale_price": 10303200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/rb-dmx1.jpg",
    "images": [
      {
        "id": "img-1038469587",
        "image_url": "/images/products/rb-dmx1.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4a4f5bee-dd27-5768-91ac-7c29ccafcfcd",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "PRO DJ LINK BRIDGE",
    "slug": "pro-dj-link-bridge",
    "sku": "VB-1038469584",
    "brand": "Pioneer DJ",
    "description": "#### Pro DJ Link Bridge is an application that enables you to synchronize lighting, video displays and pyrotechnics with audio played on our professional DJ set-up when using certified products from licensed companies. Pro DJ Link Bridge helps the Pro DJ Link network system to run smoothly and ensures seamless syncing between visual effects and DJ performances. By connecting software and hardware, DJs, event producers, lighting designers, LJs, video creators and VJs can bring shows to life with ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pro-dj-link-bridge.jpg",
    "images": [
      {
        "id": "img-1038469584",
        "image_url": "/images/products/pro-dj-link-bridge.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e861a43d-9cab-596e-8a1c-56e4d91933f9",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PN-X10",
    "slug": "pn-x10",
    "sku": "PN-X10",
    "brand": "Pioneer DJ",
    "description": "Stylus PN-X10 là đầu kim thay thế dành cho Cartridge PC-X10.",
    "sale_enabled": true,
    "sale_price": 1576800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pn-x10.jpg",
    "images": [
      {
        "id": "img-1038469580",
        "image_url": "/images/products/pn-x10.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f45f5eae-1001-53b1-b832-ceb40e49faef",
    "category_id": "c204eee4-e914-5d7c-9c2a-9fa66383eb61",
    "category_name": "Mâm Đĩa Than (Turntables)",
    "category_slug": "turntables",
    "name": "MÁY DJ PIONEER DJ PLX-500",
    "slug": "plx-500",
    "sku": "PLX-500",
    "brand": "Pioneer DJ",
    "description": "#### PLX-500 sử dụng bố cục của Turntable chuyên nghiệp PLX-1000. Là sự lựa chọn hoàn hảo cho những ai mới bắt đầu chơi vinyl hay nghe nhạc bằng đĩa than. Thiết kế chắc chắn, khả năng tái tạo âm thanh một cách chuẩn xác, Turntable này còn có thêm 1 cổng USB để thực hiện các bản ghi kỹ thuật số với phần mềm Rekordbox. #### Main Features What's in the Box PLX-500 Power cord USB cable Slip mat Dust cover Adapter for EP records Head shell (with cartr",
    "sale_enabled": true,
    "sale_price": 15672960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/plx-500.jpg",
    "images": [
      {
        "id": "img-1038469573",
        "image_url": "/images/products/plx-500.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f6828363-5d65-58d5-9ee7-1de5c90538b4",
    "category_id": "c204eee4-e914-5d7c-9c2a-9fa66383eb61",
    "category_name": "Mâm Đĩa Than (Turntables)",
    "category_slug": "turntables",
    "name": "MÁY DJ PIONEER DJ PLX-1000",
    "slug": "plx-1000",
    "sku": "PLX-1000",
    "brand": "Pioneer DJ",
    "description": "PLX-1000 là sự lựa chọn chính xác cho những ai thích scratching hay muốn chơi nhạc với một chút cổ điển, với hơn 50 năm kinh nghiệm thiết kế turntable cao cấp. với thiết kế cao cấp này, Rubber-lined, S-shaped giúp cải thiện và ngăn ngừa phản hồi không chính xác. Thiết kế cứng cáp cho việc chống rung một cách tuyệt vời. #### TURN THE TABLE Với cần kim xoay ổn định và chính xác – đạt đến 33⅓ rpm chỉ trong 0,3s. THIẾT KẾ ÂM THANH TUYỆT VỜI Với thiết kế chắc chắn và có phần tương đối nặng, PLX-1000 ",
    "sale_enabled": true,
    "sale_price": 26408160,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/plx-1000.jpg",
    "images": [
      {
        "id": "img-1038469568",
        "image_url": "/images/products/plx-1000.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cc0581fa-ee2c-5e0b-8409-1d2b080068d7",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PC-X10",
    "slug": "pc-x10",
    "sku": "PC-X10",
    "brand": "Pioneer DJ",
    "description": "#### Handmade for turntable DJs Designed for the PLX-1000 direct drive professional turntable in partnership with leading manufacturer Nagaoka, the hardy PC-X10 cartridge delivers high-quality analogue sound, excellent skip resistance and reliable performances with both vinyl and software (using DVS control). The PC-X10 cartridge comes with the replaceable PN-X10 stylus in the package, but you can also buy the stylus separately. The PC-X10 is only available online. Được thiết kế cho Turntable PL",
    "sale_enabled": true,
    "sale_price": 4147200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/pc-x10.jpg",
    "images": [
      {
        "id": "img-1038469564",
        "image_url": "/images/products/pc-x10.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ba3852ba-31ec-5cfa-b95b-0468fcd72681",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "INTERFACE 2",
    "slug": "interface-2",
    "sku": "INTERFACE 2",
    "brand": "Pioneer DJ",
    "description": "#### INTERFACE2 cung cấp Rekordbox DVS cho bất kì ai, ở nơi đâu và bất kì setup DJ nào. Thiết bị Audio Interface hai kênh này cho phép scratch và điều khiển các bài nhạc từ thư viện Rekordbox thông qua thiết bị DJ ưa thích. Kết nối cục kì đơn giản và vô cùng nhanh chóng #### Main Features DVS Control rekordbox USB Bus Powered Yes What's in the Box Power cord AC adaptor USB cable Quick Start Guide 4 Audio cables 4 Rubber feet 2 Control Vinyl Specifications W",
    "sale_enabled": true,
    "sale_price": 9244800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/interface-2.png",
    "images": [
      {
        "id": "img-1038469555",
        "image_url": "/images/products/interface-2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c146e400-73ea-5e96-b150-aa427cadec1d",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-X7",
    "slug": "hdj-x7",
    "sku": "HDJ-X7",
    "brand": "Pioneer DJ",
    "description": "#### Headphone HDJ-X7 được thiết kế dựa trên mẫu tai nghe flagship trước của chúng tôi là HDJ- 2000MK2, và được trang bị một dòng driver hoàn toàn mới. Bên cạnh đó, HDJ-X7 cũng kế thừa thiết kế âm thanh chất lượng cao từ HDJ-2000MK2, mang lại cho bạn một khả năng theo dõi âm thanh chuẩn xác dù ở âm lượng cao. #### Main Features Type Closed, dynamic Driver Units 50 mm dome type Cable 1.2 m coiled cable (3 m extended length) 1.6 m straight cable Wha",
    "sale_enabled": true,
    "sale_price": 5828760,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hdj-x7.jpg",
    "images": [
      {
        "id": "img-1038469547",
        "image_url": "/images/products/hdj-x7.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "39218799-e4fa-5cfc-ad34-0cfeaec9c788",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-X5BT",
    "slug": "hdj-x5bt",
    "sku": "HDJ-X5-BT",
    "brand": "Pioneer DJ",
    "description": "#### Chúng tôi đã nâng cấp tai nghe HDJ-X5 với công nghệ không dây Bluetooth® để tạo ra HDJ-X5BT. Tai nghe DJ over – ear là tai nghe lý tưởng cho DJ trong club và dễ dàng chuẩn bị nhạc ở mọi nơi, mọi lúc thông qua công nghệ Bluetooth®. Với chất lượng âm thanh sống động và trong trẻo giúp bạn có cảm giác thoải mái khi sử dụng. Có ba màu: HDJ- X5BT-K (màu đen kim loại), HDJ-X5BT-R (màu đỏ kim loại) và HDJ-X5BT-W (màu trắng bóng) #### Main ",
    "sale_enabled": true,
    "sale_price": 5083560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hdj-x5bt.jpg",
    "images": [
      {
        "id": "img-1038469540",
        "image_url": "/images/products/hdj-x5bt.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d3ae13b7-441c-55b9-a814-72f494af45e0",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-X5",
    "slug": "hdj-x5",
    "sku": "HDJ-X5",
    "brand": "Pioneer DJ",
    "description": "#### Tai nghe Pioneer HDJ-X5 được thiết kế dựa trên cảm hứng mang lại những trải nghiệm đỉnh cao và trung thực của DJ và chắc chắn nó cũng là sự lựa chọn lý tưởng cho các DJ chuyên nghiệp. Với dải tần số đầy đủ, chất lượng âm thanh ngoài mong đợi, vẻ ngoài bắt mắt và thiết kế chắc chắn, tai nghe Pioneer HDJ-X5 hứa hẹn sẽ mang đến cho bạn những phút giây nghe nhạc tuyệt vời nhất. #### Main Features Type Closed, dynamic Driver Units 40 mm dome type Cable 1.2 m short coiled cable (1.8 m extended le",
    "sale_enabled": true,
    "sale_price": 3436560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hdj-x5.jpg",
    "images": [
      {
        "id": "img-1038469533",
        "image_url": "/images/products/hdj-x5.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3964c5e0-90aa-595b-8e00-2d9ab54f2ec9",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-X10",
    "slug": "hdj-x10",
    "sku": "HDJ-X10",
    "brand": "Pioneer DJ",
    "description": "#### Nhờ sở hữu các driver HD 50mm hoàn toàn mới, headphone HDJ-X10 là một trong những headphone DJ đầu tiên trên thế giới có khả năng tái tạo một âm thanh chất lượng cao với tần số dao động từ 5Hz cho đến 40kHz. Đặc biệt, khi được kết nối với set-up TOUR1 đỉnh cao hoặc set-up NXS2, bạn có thể được trải nghiệm một chất âm 96kHz/24-bit chất lượng rất cao và vô cùng rõ ràng, tách bạch. Và hơn thế nữa, earpad và headband cua HDJ-X10 có khả năng chống mồ hôi và bụi bặm nhờ vào một lớp nano coating ",
    "sale_enabled": true,
    "sale_price": 10110960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hdj-x10.jpg",
    "images": [
      {
        "id": "img-1038469514",
        "image_url": "/images/products/hdj-x10.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e4f43222-bc81-528d-bedc-ccfc781d7f60",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-S7",
    "slug": "hdj-s7",
    "sku": "HDJ-S7",
    "brand": "Pioneer DJ",
    "description": "#### Sau khi lắng nghe và nhận phản hồi từ những DJ trên thế giới, Pioneer DJ đã thiết kế và đem đến “hạm đội” tai nghe chuyên nghiệp HDJ. Tiếp nối bộ ba HDJ-X10, X7, X5 được ra mắt trước đó, “HDJ-S7- Professional on-ear DJ Headphones” sẽ chính thức phát hành khắp toàn cầu. HDJ-S7 – Deeper Connection, tai nghe on-ear đầu tiên trên thế giới được trang bị HD driver 40mm, như vậy sẽ đảm bảo việc kiểm soát rõ ràng các dải âm thanh từ âm bass sâu và mạnh mẽ đến các tần số mid-to-high. Được thiết kế v",
    "sale_enabled": true,
    "sale_price": 5840000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hdj-s7.jpg",
    "images": [
      {
        "id": "img-1038469507",
        "image_url": "/images/products/hdj-s7.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0a23e2f2-b666-5a06-a4af-e45b4a3c4f2e",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE PIONEER DJ HDJ-CUE1",
    "slug": "hdj-cue1",
    "sku": "HDJ-CUE1",
    "brand": "Pioneer DJ",
    "description": "HEADPHONE HDJ-CUE1 Bắt đầu hành trình DJ của bạn với sản phẩm tai nghe HDJ-CUE1. Với 4 màu sắc trẻ trung, những chiếc tai nghe này sở hữu nhiều tính năng táo bạo cùng một mức giá vô cùng phải chăng. ##### HDJ-CUE1 là một sản phẩm tai nghe lý tưởng dành cho những người mới bắt đầu với bộ môn DJ. Sản phẩm sở hữu một thiết kế chuyên nghiệp, một chất âm sâu lắng cùng một chất lượng hoàn thiện cao – tất cả gói gọn trong một mức giá hợp lý. Bạn muốn cơ động hơn trong việc nghe nhạc? Hãy chọn phiên bản",
    "sale_enabled": true,
    "sale_price": 2532000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hdj-cue1.jpg",
    "images": [
      {
        "id": "img-1038469501",
        "image_url": "/images/products/hdj-cue1.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "71f01e48-2fa5-537e-9d14-3ee8544c12bf",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN ĐỆM TAI NGHE HDJ-X10 PIONEER DJ HCEP0501",
    "slug": "hcep0501",
    "sku": "HCEP0501",
    "brand": "Pioneer DJ",
    "description": "PHỤ KIỆN ĐỆM TAI NGHE HDJ-X10 PIONEER DJ HCEP0501",
    "sale_enabled": true,
    "sale_price": 1231200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hcep0501.jpg",
    "images": [
      {
        "id": "img-1038469497",
        "image_url": "/images/products/hcep0501.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "eeb62e61-b699-5d7c-9f7a-a54d26a88436",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "PHỤ KIỆN TAI NGHE HDJ-CUE1 PIONEER DJ HCCP08",
    "slug": "hccp08",
    "sku": "HCCP08",
    "brand": "Pioneer DJ",
    "description": "My Style, My Cue Find your style and personalize your HDJ-CUE1s by switching the cable and earpads on your DJ headphones with one of five brightly colored replacements available in the HC-CP08 accessory pack. It includes two replacement ear pads and a detachable coiled cable. Available in orange, yellow, green, blue, and pink. Short coiled cable \\nLength (Europe) : 1.2 m/ 47.24” coiled (extended length 1.8 m /70.87”) Plug : L-type mini-jack Leather ear pads Material : Polyurethane leather",
    "sale_enabled": true,
    "sale_price": 1231200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hccp08.jpg",
    "images": [
      {
        "id": "img-1038469494",
        "image_url": "/images/products/hccp08.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "75b9ef90-e525-5573-adbf-721aa5cc8779",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA PIONEER DJ DM-50D",
    "slug": "dm-50d",
    "sku": "DM-50D",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-50D ĐVT: CẶP Với âm thanh mạnh mẽ, chất lượng hoàn thiện cao, hoàn hảo để chơi nhạc DJ hoặc làm nhạc tại nhà, loa kiểm âm DM-50D với loa bass 5 inch và thiết kế mới kết hợp các yếu tố chính từ loa DM-50 để tạo ra âm thanh mạnh mẽ hơn và chất lượng cao hơn. Được bán với các cặp màu đen hoặc trắng, loa dễ lắp đặt, điều chỉnh và sử dụng khiến chúng trở nên lý tưởng cho nhiều mục đích khác nhau. Cho dù bạn muốn chơi nhạc hay làm nhạc, loa kiểm âm DM-50D đều mang đến âm than",
    "sale_enabled": true,
    "sale_price": 8240400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/dm-50d.png",
    "images": [
      {
        "id": "img-1038469484",
        "image_url": "/images/products/dm-50d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "642c4a3f-287f-5d55-be67-057ba8afa04c",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA KIỂM ÂM PIONEER DJ DM-40BT",
    "slug": "dm-40bt",
    "sku": "DM-40BT",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-40BT ĐVT: CẶP Loa kiểm âm DM-40BT nhỏ gọn hứa hẹn mang lại một chất lượng âm thanh tuyệt vời cho setup tại nhà của bạn. Loa thừa kế những gì tuyệt vời nhất từ dòng S-DJX và Pro Audio chuyên nghiệp của hãng Pioneer DJ, bao gồm một âm bass trầm ấm và công nghệ DECO ( Diffusion Effectual Convexity ) bởi Olson. Tất cả các tính năng này được tích hợp trong một thiết kế nhỏ gọn. DM-40BT chính là sự lựa chọn hoàn hảo cho việc mix nhạc, producing và thậm chí là tận hưởng âm nhạ",
    "sale_enabled": true,
    "sale_price": 7214400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/dm-40bt.png",
    "images": [
      {
        "id": "img-1038469471",
        "image_url": "/images/products/dm-40bt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c35f1924-467f-5935-bb89-e8ed67e291e2",
    "category_id": "073e7144-f976-58b1-8311-78fcd610548d",
    "category_name": "Loa Kiểm Âm (Monitor Speakers)",
    "category_slug": "loa-kiem-am",
    "name": "LOA KIỂM ÂM PIONEER DJ DM-40",
    "slug": "dm-40",
    "sku": "DM-40",
    "brand": "Pioneer DJ",
    "description": "LOA KIỂM ÂM PIONEER DJ DM-40 ĐVT: CẶP Loa kiểm âm DM-40 nhỏ gọn hứa hẹn mang lại một chất lượng âm thanh tuyệt vời cho setup tại nhà của bạn. Loa thừa kế những gì tuyệt vời nhất từ dòng S-DJX và Pro Audio chuyên nghiệp của hãng Pioneer DJ, bao gồm một âm bass trầm ấm và công nghệ DECO ( Diffusion Effectual Convexity ) bởi Olson. Tất cả các tính năng này được tích hợp trong một thiết kế nhỏ gọn. Loa kiểm âm DM-40 chính là sự lựa chọn hoàn hảo cho việc mix nhạc, producing và thậm chí là tận hưởng ",
    "sale_enabled": true,
    "sale_price": 5346000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/dm-40.png",
    "images": [
      {
        "id": "img-1038469463",
        "image_url": "/images/products/dm-40.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ab76631f-2f4d-5863-ba74-81103e038ef4",
    "category_id": "1642bf81-abd9-5f68-940e-b0b53a902eba",
    "category_name": "DJ Sampler & Remix",
    "category_slug": "dj-sampler",
    "name": "MÁY DJ PIONEER DJ DJS-1000",
    "slug": "djs-1000",
    "sku": "DJS-1000",
    "brand": "Pioneer DJ",
    "description": "#### Được mô tả là thiết bị Sampler chuyên nghiệp, DJS-1000 được thiết kế với vẻ ngoài tương tự dòng sản phẩm CDJ, nhưng sử dụng hệ thống Pads Performance thay cho Jog Wheel ( mâm xoay ). Thiết bị cũng được tích hợp sẵn hơn 2500 âm thanh khác nhau từ nguồn Loopmasters, ngoài ra vẫn có thể sử dụng các sampler bên ngoài thông qua cổng USB. #### Main Features What's in the Box Power cord LAN cable USB cable RCA pin cable Operating instructions Spe",
    "sale_enabled": true,
    "sale_price": 34149600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djs-1000.png",
    "images": [
      {
        "id": "img-1038469457",
        "image_url": "/images/products/djs-1000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8e125e2d-8f2a-5d7a-ba47-db2727a9a616",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-V10",
    "slug": "djm-v10",
    "sku": "DJM-V10",
    "brand": "Pioneer DJ",
    "description": "DJM-V10 Mixer DJ 6 kênh chuyên nghiệp - Âm thanh đỉnh cao, hiệu ứng sáng tạo DJM-V10 là thiết bị Mixer DJ 6 kênh chuyên nghiệp mới nhất đến từ thương hiệu Pioneer DJ. Sản phẩm được trang bị nhiều tính năng và công nghệ tiên tiến, mang đến cho người dùng trải nghiệm âm thanh đỉnh cao và khả năng sáng tạo vô hạn. Được sinh ra với một thiết kế mới, DJM-V10 là một 1 mixer kiểu mới với 6 channel cùng nhiều tính năng nổi trội . Với việc có thể tạo ra âm thanh ấm và giàu năng lượng, các bạn có thể kiểm",
    "sale_enabled": true,
    "sale_price": 99948600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-v10.jpg",
    "images": [
      {
        "id": "img-1038469449",
        "image_url": "/images/products/djm-v10.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9789557f-b357-5b26-8824-a701b8bb4174",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM - TOUR 1",
    "slug": "djm-tour-1",
    "sku": "DJM - TOUR 1",
    "brand": "Pioneer DJ",
    "description": "#### DJM-TOUR1 được thiết kế để phục vụ cho các lễ hội âm nhạc lớn. Soundcard cao cấp của mixer mang lại âm thanh chất lượng tuyệt đỉnh và thêm các tính năng trình diễn chuyên nghiệp đáp ứng tốt cho các lễ hội âm nhạc. #### Main Features MIDI Control Full assignable MIDI controls ProDJ Link Yes P-Lock Fader Caps Yes Auto Standby Yes DVS Control rekordbox (Core plan or above) What's in the Box DJM-TOUR1 Power cord USB cable Display shade Operating Instructio",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djm-tour-1.jpg",
    "images": [
      {
        "id": "img-1038469442",
        "image_url": "/images/products/djm-tour-1.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "982980e5-0ebc-5387-8f93-4ee202c39d78",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM - S9",
    "slug": "djm-s9",
    "sku": "DJM - S9",
    "brand": "Pioneer DJ",
    "description": "DJM-S9 thể hiện sức mạnh của một mixer chuyên nghiệp. Nhanh, chính xác, khả năng điều chỉnh Crossfader, cộng với Performance Pads và các nút FX tùy chỉnh là các cụm từ có thể dùng để diễn tả cho DJM-S9. Với tính năng “ plug-and-play “ với 4 channels trên Serato DJ, hỗ trợ DVS, đi cùng Beat FX và 2 card âm thanh kết nối cổng USB, DJM-S9 được thiết kể để làm hài lòng những DJ khó tính và khắt khe nhất. #### Magvel Fader Pro Crossfader từ tí",
    "sale_enabled": true,
    "sale_price": 50146560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-s9.jpg",
    "images": [
      {
        "id": "img-1038469435",
        "image_url": "/images/products/djm-s9.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "dfda0b0d-7437-5fd5-ae72-fa32c9adceef",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-S7",
    "slug": "djm-s7",
    "sku": "DJM-S7",
    "brand": "Pioneer DJ",
    "description": "Open format DJs là những người nghệ sĩ có thể biến tấu và thay đổi liên tục phong cách âm nhạc của mình. Và trong những giải đấu đầy cạnh tranh, DJs luôn mong muốn tìm cho mình một thiết bị có thể giúp họ sáng tạo, linh hoạt và thu hút được nhiều sự quan tâm của khán giả hơn. Và DJM-S7 được thiết kế để mọi thứ trở nên dễ dàng hơn. #### Nếu bạn đã từng sử dụng qua DJM-S11 , bạn sẽ cảm thấy cực kì quen thuộc với bố cục gọn gàng của DJM-S7. Load button to và 16 Performance Pads (8 Pads mỗi bên) giú",
    "sale_enabled": true,
    "sale_price": 42504480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-s7.png",
    "images": [
      {
        "id": "img-1038469425",
        "image_url": "/images/products/djm-s7.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "262a87fc-36c2-5028-b5d0-817a8700b1e7",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-S3",
    "slug": "djm-s3",
    "sku": "DJM-S3",
    "brand": "Pioneer DJ",
    "description": "DJM-S3 có tích hợp card âm thanh, mixer 2 channels này sử dụng Serato DJ và Serato DVS. #### Built-in sound card Kết nối với PC/Mac chỉ với cổng kết nối USB. Sử dụng cùng phần mềm Serato DJ Pro để mix và scratch trên turntable với Serato DVS Control Vinyl hoặc Player. Magvel crossfader Scratching một cách đơn giản cùng với Magvel Crossfader giống như DJM-900NXS2. Fader chính xác, mượt mà và bền bỉ cho hơn 10 triệu chuyển động khi scratching. Independent channel filters Mỗi channel được t",
    "sale_enabled": true,
    "sale_price": 15239880,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-s3.jpg",
    "images": [
      {
        "id": "img-1038469418",
        "image_url": "/images/products/djm-s3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "010ac4a6-1e4e-5d63-901c-4a402d7be1fe",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-S11",
    "slug": "djm-s11",
    "sku": "DJM-S11",
    "brand": "Pioneer DJ",
    "description": "DJM-S11 được xây dựng dựa trên sự thành công của người đàn anh DJM-S9 , tích hợp 2 chanel có thể điều khiển 4 desk và có thể sử dụng được cho Serato DJ Pro và rekordbox . #### Pioneer DJ Vietnam xin giới thiệu một thiết bị mà chắc chắn những turntablist không thể nào bỏ qua, DJM-S11 . Một DJM chuyên nghiệp dành cho các turntablist. DJM-S11 được xây dựng dựa trên sự thành công của người đàn anh DJM-S9 , tích hợp 2 chanel có thể điều khiển 4 desk và có thể sử dụng được cho Serato DJ Pro và rekordb",
    "sale_enabled": true,
    "sale_price": 60625800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djm-s11.png",
    "images": [
      {
        "id": "img-1038469408",
        "image_url": "/images/products/djm-s11.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "74a4693b-d2ab-53ae-8c89-8ebfe0a8077d",
    "category_id": "c05d9eac-5e99-5121-9cf2-e2e6cbd61cad",
    "category_name": "DJ Software & Audio Interfaces",
    "category_slug": "dj-software-interfaces",
    "name": "PHẦN MỀM THU ÂM DJM - REC",
    "slug": "djm-rec",
    "sku": "VB-1038469402",
    "brand": "Pioneer DJ",
    "description": "DJM-REC là phần mềm thu âm trên mixer thông qua Ipad và Iphone. Cài đặt DJM- REC vào Iphone hoặc Ipad, sau đó chỉ cần đơn giản kết nối với bất kì Mixer nào có cổng Send/ Return bằng dây USB là bạn đã có thể thu lại set nhạc của mình DJM-REC is available in the App store",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djm-rec.jpg",
    "images": [
      {
        "id": "img-1038469402",
        "image_url": "/images/products/djm-rec.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f787bfac-4647-58ab-a265-8cb8710edb5a",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-900NXS2-W",
    "slug": "djm-900nxs2-w",
    "sku": "DJM-900NXS2-W",
    "brand": "Pioneer DJ",
    "description": "#### Với tín hiệu âm thanh chất lượng studio 96 kHz/64-bit, giúp tang cường chấp lượng âm thanh tối đa, và thêm 1 đồng hồ đo low-filter để mang lại chất lượng âm thanh trầm ấm và tự nhiên hơn. SOUND COLOR FX 6 FX với chất lượng studio – Sweep, Filter, Crush, Dub Echo, Noise & Space – đều có thể thoải mái sử dụng trên từng kênh, sử dụng Parameter để điều chỉnh thông số của FX. BEAT FX Sử dụng bộ X-Pad cỡ lớn, sử dụng lên tới 14 loại beat FX khác nhau & điều chỉnh parameter chỉ với cử chỉ đơn giản",
    "sale_enabled": true,
    "sale_price": 54270000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-900nxs2-w.jpg",
    "images": [
      {
        "id": "img-1038469394",
        "image_url": "/images/products/djm-900nxs2-w.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7a57a28f-77b1-5f03-8cec-90da2dc2eaee",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-900 NXS2",
    "slug": "djm-900-nxs2",
    "sku": "DJM-900 NXS2",
    "brand": "Pioneer DJ",
    "description": "DJM-900NXS2 sẽ đưa phần trình diễn của bạn lên một tầm cao mới, với bộ xử lý mixing 64-bit đầu tiên đến từ Pioneer DJ. Mixer hứa hẹn sẽ đem lại âm thanh nhiều sắc thái. Fader & EQ cũng được điều chỉnh giúp cho bạn thêm nhiều lựa chọn trong khi chơi nhạc. #### Professional sound design Với tín hiệu âm thanh chất lượng studio 96 kHz/64-bit, giúp tăng cường chấp lượng âm thanh tối đa. Sử dụng công nghệ enhanced dithering technology và xung nhịp thấp, mang lại chất lượng âm thanh trầm ấm và tự nhiê",
    "sale_enabled": true,
    "sale_price": 71706600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-900-nxs2.jpg",
    "images": [
      {
        "id": "img-1038469381",
        "image_url": "/images/products/djm-900-nxs2.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1d44a459-7c21-503b-bb31-c5cd3c48b0eb",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM - 750MK2",
    "slug": "djm-750mk2",
    "sku": "DJM-750MK2",
    "brand": "Pioneer DJ",
    "description": "#### Mixer DJM-750MK2 là bản nâng cấp của các mixer DJM-750 và DJM-850. Thiết bị sở hữu layout 4 channels, trang bị Crossfader Magvel, 4 Sound Color FX, 11 Beat FX và màn hình hiển thị độ phân giải cao giống với DJM-900NXS2. Tính năng đặc biệt khác của DJM-750MK2 là khả năng phát và nhận USB effects. #### Main Features DVS Control rekordbox What's in the Box DJM-750MK2 Power cord USB cable Operating Instructions (Quick Start Guide) Warranty Specifications Sampli",
    "sale_enabled": true,
    "sale_price": 39211560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-750mk2.jpg",
    "images": [
      {
        "id": "img-1038469375",
        "image_url": "/images/products/djm-750mk2.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "897afd44-9c67-5756-ae0f-639189df08f7",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-450",
    "slug": "djm-450",
    "sku": "DJM-450",
    "brand": "Pioneer DJ",
    "description": "Công nghệ Crossfader Magvel mang đến độ chính xác cao trong những kỹ thuật mixing phức tạp. Sound Color FX và Beat FX cho phép bạn thỏa sức sáng tạo với bản mix của mình. Bên cạnh đó, thiết bị được trang bị bộ xử lý tín hiệu 64-bit cho ra âm thanh chất lượng cao và Soundcard tích hợp cho phép bạn kết nối với máy tính bằng cáp USB và sử dụng ứng dụng DVS Rekordbox (kèm theo) để chơi trên các thiết bị Turntable. ### Professional layout Thi",
    "sale_enabled": true,
    "sale_price": 22626000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-450.jpg",
    "images": [
      {
        "id": "img-1038469367",
        "image_url": "/images/products/djm-450.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7cc38ae7-19be-52b5-9376-fd6c5a254d43",
    "category_id": "1b9d8451-b503-5949-9a0d-6846da8e262a",
    "category_name": "Mixer DJ Chuyên Nghiệp",
    "category_slug": "dj-mixers",
    "name": "MIXER DJ PIONEER DJ DJM-350",
    "slug": "djm-350",
    "sku": "DJM-350",
    "brand": "Pioneer DJ",
    "description": "DJM-350 là mixer entry-level hoàn hảo, có đầy đủ các tính năng từ các mixer hàng đầu của Pioneer DJ bao gồm: Effects, khả năng ghi âm USB và đầu vào Mic với EQ 2 băng tần. #### Record directly to USB Thu âm trực tiếp vào USB và add track marks trực tiếp vào file để bạn có thể dễ dàng quản lí và edit set nhạc. Energetic FX Sử dụng các điều khiển trực quan để thêm FX bao gồm Crush, Jet, Gate và sử dụng bộ lọc High / Low-pass để thay đổi các thông số của chúng. EQ isolator o",
    "sale_enabled": true,
    "sale_price": 16396560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/djm-350.jpg",
    "images": [
      {
        "id": "img-1038469359",
        "image_url": "/images/products/djm-350.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "620bd64b-2030-5f32-b431-c17b0bb2755f",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "DJC-WeCAi",
    "slug": "djc-wecai",
    "sku": "VB-1038469340",
    "brand": "Pioneer DJ",
    "description": "Sử dụng cáp WeCAi để kết nối DDJ-WeGO hoặc DDJ-ERGO với thư viện iTunes của bạn trên thiết bị di động chạy ứng dụng Algorridim’s djay 2. Hoặc mixing videos bằng VJay của Algorridim. Nguồn điện USB WeCAi bao gồm kết nối USB để cung cấp điện cho WeGO / ERGO thông qua bộ chuyển đổi nguồn USB tiêu chuẩn hoặc pin sạc dự phòng, vì vậy bạn có thể phát ngay cả ở những nơi không thể tiếp cận các nguồn điện truyền thống.",
    "sale_enabled": true,
    "sale_price": 918000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djc-wecai.png",
    "images": [
      {
        "id": "img-1038469340",
        "image_url": "/images/products/djc-wecai.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d8a2b2d3-f1ea-5ec8-bc55-d47bf35a2c55",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CHÂN ĐẾ PIONEER DJ DJC - STS1",
    "slug": "djc-sts1",
    "sku": "DJC - STS1",
    "brand": "Pioneer DJ",
    "description": "#### Nâng cao sự thoải mái của bạn bằng cách dùng chân stand cứng cáp. Điều này rất lý tưởng để giữ DDJ- XP1, TORAIZ SP-16, RMX-1000, hay Laptop. Chân stand có thể tăng, giảm được chiều cao",
    "sale_enabled": true,
    "sale_price": 3985200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/djc-sts1.png",
    "images": [
      {
        "id": "img-1038469336",
        "image_url": "/images/products/djc-sts1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "194773d8-29c2-5f0d-a183-08c2b21fb78c",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-XP2",
    "slug": "ddj-xp2",
    "sku": "DDJ-XP2",
    "brand": "Pioneer DJ",
    "description": "#### Controller DDJ-XP2 DJ mới dành cho rekordbox dj và Serato DJ Pro. Đây là thiết bị controller mạnh mẽ cùng độ trễ thấp giúp bạn có thể sử dụng tối đa các phiên bản mới của cả hai ứng dụng DJ trên. Nâng cấp cuộc chơi với DDJ-XP2. Dù bạn có dùng chung XP2 với rekordbox dj hay Serato DJ Pro thì bạn vẫn hoàn toàn có thể sử dụng được đầy đủ các tính năng của cả 2 phần mềm DJ này. DDJ-XP2 đã cập nhật rất nhiều tính năng trên phiên bản tiền nhiệm của nó là DDJ-XP1, nhưng vẫn giữ cho mình được chất ",
    "sale_enabled": true,
    "sale_price": 9187560,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-xp2.png",
    "images": [
      {
        "id": "img-1038469329",
        "image_url": "/images/products/ddj-xp2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "af876064-c12a-53ea-9c90-6de5b9d92ae2",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLEER PIONEER DJ DDJ-XP1",
    "slug": "ddj-xp1",
    "sku": "DDJ-XP1",
    "brand": "Pioneer DJ",
    "description": "#### DDJ-XP1 sở hữu 32 Pads nhiều màu sắc và khả năng điều khiển các Hot Cues, FX, Beat Jump, Sampler, Key Shift và nhiều chức năng khác. Được thiết kế để sử dụng cùng với thiết lập DVS ( Digital Vinyl Systems ). DJ Controller hay chế độ HID ( Hardware Interface Device ) thông qua phần mềm Rekordbox DJ #### Main Features Compatible DJ Software rekordbox Software System Requirements Compatible OS (Windows): Windows 10/ 8.1/ 7 (latest service pack) Compatible OS (MA",
    "sale_enabled": true,
    "sale_price": 8209080,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-xp1.png",
    "images": [
      {
        "id": "img-1038469321",
        "image_url": "/images/products/ddj-xp1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "51a4abef-5602-5d40-8451-2b1bed6504a0",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-WEGO 3",
    "slug": "ddj-wego-3",
    "sku": "DDJ-WEGO 3",
    "brand": "Pioneer DJ",
    "description": "Freedom to mix. #### DDJ-WeGO3 mang đến cho bạn sự lựa chọn âm nhạc không giới hạn. Tích hợp cùng ứng dụng Algoriddim’s djay 2 trên IOS để sử dụng các tính năng như Jog Wheel, các nút bấm và sử dụng thư viện Spotify hoặc iTunes của bạn. Hoặc kết nối với PC / Mac và kết hợp với phần mềm DJ khác, bao gồm djay (chỉ dành cho Mac) hoặc Virtual DJ 8 Limited Edition.",
    "sale_enabled": true,
    "sale_price": 9094000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-wego-3.png",
    "images": [
      {
        "id": "img-1038469318",
        "image_url": "/images/products/ddj-wego-3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0d7f84f4-c5e9-51fd-9a88-b118e5287a9e",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-WEGO",
    "slug": "ddj-wego",
    "sku": "DDJ-WEGO",
    "brand": "Pioneer DJ",
    "description": "Mix it up with the DDJ-WeGo! #### Compact, easy-to-carry Rộng 38 cm, chỉ nặng 1,6 kg, bạn có thể mang DDJ-WeGo đến bất cứ nơi đâu mà mình muốn. Multi-coloured LED JOG lights Bên cạnh 5 màu cơ thể có sẵn, bạn cũng có thể tùy chỉnh màu sắc của JOG theo sở thích của mình. Pioneer Quality hardware Trong một gói phần mềm mạnh mẽ, DDJ-WeGo cung cấp cho bạn bất kỳ nút chức năng nào mà bạn cần để bắt đầu Djing. Virtual DJ Software included “Virtual DJ Limited Edition” được tặng kèm. Ngoài ra, bạn có thể",
    "sale_enabled": true,
    "sale_price": 6110000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-wego.png",
    "images": [
      {
        "id": "img-1038469316",
        "image_url": "/images/products/ddj-wego.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "59258fcb-0d3d-57f1-b486-cc1468815671",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-SP1",
    "slug": "ddj-sp1",
    "sku": "DDJ-SP1",
    "brand": "Pioneer DJ",
    "description": "DJ CONTROLLER DDJ-SP1 #### Thiết bị controller DDJ-SP1 (Serato Dj) nhỏ gọn nối tiếng với khả năng sử dụng tốt cùng kiểu dáng tối ưu để dễ dàng sắp đặt tại mọi không gian âm nhạc mà bạn tham gia. Thiết bị controller DDJ-SP1 (Serato Dj) là bản sao đầy mạnh mẽ từ DJM-900SRT huyền thoại nhưng mới mẻ nhờ việc tích hợp hệ thống MIDI hiện đại. Đây cũng được xem như là một sản phẩm hỗ trợ cho bộ thiết bị DJ của một hệ thống chuyên nghiệp mà bạn đang hướng đến trong tương lai. Theo lời khuyên của những ",
    "sale_enabled": true,
    "sale_price": 9733000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-sp1.png",
    "images": [
      {
        "id": "img-1038469287",
        "image_url": "/images/products/ddj-sp1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "00b05325-fef5-51e4-95dd-bb6985112854",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-SB3",
    "slug": "ddj-sb3",
    "sku": "DDJ-SB3",
    "brand": "Pioneer DJ",
    "description": "#### DDJ-SB3 là phiên bản nâng cấp của DDJ-SB2, một trong những controller nổi tiếng nhất của hãng Pioneer DJ nhờ vào các tính năng chuyên nghiệp và độ linh động dễ dàng di chuyển của nó. Các điểm nổi bật: Được thiết kế dành cho phần mềm Serato DJ Lite. Các nút CUE/PLAY/SYNC/SHIFT riêng biệt 16 PAD dùng cho hot cue, loop,… Tính năng PAD SCRATCH và FX FADE hoàn toàn mới. Không cần phải cài thêm driver trên máy tính để có thể sử dụng #### Main Features Compatible DJ Software Unlocks Ser",
    "sale_enabled": true,
    "sale_price": 8559000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ddj-sb3.png",
    "images": [
      {
        "id": "img-1038469267",
        "image_url": "/images/products/ddj-sb3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1633aa08-7f77-5d7f-8904-bc33d54c4a22",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-RZ",
    "slug": "ddj-rz",
    "sku": "DDJ-RZ",
    "brand": "Pioneer DJ",
    "description": "DDJ-RZ là thiết bị Controller chuyên nghiệp đầu tiên tương thích với phần mềm Rekordbox DJ, tạo cho bạn sự thoải mái hơn trong việc chuẩn bị nhạc trước với phần mềm Rekordbox, sau đó kết nối thiết bị và mix nhạc trực tiếp từ laptop của bạn. #### CÁC TÍNH NĂNG CHÍNH: GIAO DIỆN TRỰC QUAN Bố cục của DDJ-RZ được thiết kế theo phong cách \"Gương phản chiếu\" GUI của phần mềm, cho phép bạn kiểm soát các tính năng bao gồm Hot Cues, Sampler, Slicer, Sound Color FX, Beat FX, Beat Jump và Pad FX. DJ REKORDB",
    "sale_enabled": true,
    "sale_price": 59201280,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ddj-rz.png",
    "images": [
      {
        "id": "img-1038469250",
        "image_url": "/images/products/ddj-rz.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c8c8d83d-aa8f-58a3-917f-a8a16336d8d1",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-FLX6",
    "slug": "ddj-flx6",
    "sku": "DDJ-FLX6",
    "brand": "Pioneer DJ",
    "description": "DJ CONTROLLER DDJ-FLX6 Một DJ Controller 4 kênh, có thể sử dụng được rekordbox và Serato DJ Pro. Dễ dàng để có thể mixing những bài nhạc khác gerne và tạo ra những đoạn drop, scratch,….. một cách đơn giản nhất. Điều khiển đám đông một cách đơn giản với thiết bị DJ Controller đến từ Pioneer DJ: DDJ-FLX6. Với những tính năng hoàn toàn mới cùng với 4 chanel được tích hợp, bạn có thể dễ dàng mixing những bài nhạc khác gerne và khác tempo với nhau. Ngoài ra bạn còn có thể dễ dàng tạo thêm màu sắc cho",
    "sale_enabled": true,
    "sale_price": 17726000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/ddj-flx6.png",
    "images": [
      {
        "id": "img-1038469176",
        "image_url": "/images/products/ddj-flx6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f9e26b8d-1ee7-527a-9347-534ee0fa9c53",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-ERGO V",
    "slug": "ddj-ergo",
    "sku": "DDJ-ERGO V",
    "brand": "Pioneer DJ",
    "description": "#### DDJ-ERGO (archived) DJ controller for Virtual DJ DDJ-ERGO mang đến sự đơn giản trong cả thiết lập và hiệu suất mà không ảnh hưởng đến chất lượng hoặc tính năng âm thanh. Kích thước di động và kiểu dáng sắc nét, được kết nối và cấp nguồn trực tiếp từ laptop của bạn. #### Main Features Software System Requirements Windows Windows XP (SP3)/Vista/7 Intel Pentium 4 or AMD Athlon XP, 512 MB RAM or more Mac OS X 10.5/10.6/10.7 Intel processor platform 1024 MB RAM or more 50 MB or more free disk sp",
    "sale_enabled": true,
    "sale_price": 14883000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-ergo.png",
    "images": [
      {
        "id": "img-1038469171",
        "image_url": "/images/products/ddj-ergo.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0830216b-ddb5-5533-bfed-d950edeb37d5",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-200",
    "slug": "ddj-200",
    "sku": "DDJ-200",
    "brand": "Pioneer DJ",
    "description": "Stream, Create, Experience Bắt đầu chơi DJ với DDJ-200. Nhẹ và nhỏ gọn với bố cục theo phong cách chuyên nghiệp, DDJ-200 sẽ giúp bạn học cách mix nhạc và nếu bạn muốn phát triển DJ từ sở thích thành một thứ gì đó khác. Hãy biến tấu âm nhạc của riêng của bạn khi chơi nhạc cho bạn bè trong các bữa tiệc. #### Compatible apps Kết nối với smartphone, tablet, PC/Mac và bắt đầu trải nghiệm DDJ-200 cùng nhiều phần mềm được tích hợp như WeDJ, eding mix, djay của Algoriddim hoặc rekordbox. Đặc biệt, khi b",
    "sale_enabled": true,
    "sale_price": 5397000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-200.png",
    "images": [
      {
        "id": "img-1038469125",
        "image_url": "/images/products/ddj-200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0f04d0b3-35a1-5cf9-b41a-5cdc7489b33e",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-1000 SRT",
    "slug": "ddj-1000-srt",
    "sku": "DDJ-1000 SRT",
    "brand": "Pioneer DJ",
    "description": "#### DDJ-1000SRT – Controller 4 channel dành riêng cho Serato DJ Pro ra mắt người dùng. Nếu bạn là một người thích phần mềm Serato và controller DDJ-1000 thì đây quả thật là tin không thể vui hơn dành cho các bạn. Là phiên bản dành riêng cho phần mềm Serato DJ Pro, controller 4 chanel DDJ-1000SRT có thiết kế bố cục tương tự DDJ-1000, mang lại cho bạn cảm giác quen thuộc với set-up CDJ +DJM tiêu chuẩn dành các club. Các tính năng trên DDJ-1000SRT cũng tương tự như trên DDJ-1000, gồm Jog wheels fu",
    "sale_enabled": true,
    "sale_price": 38470000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-1000-srt.png",
    "images": [
      {
        "id": "img-1038469117",
        "image_url": "/images/products/ddj-1000-srt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "70e359bc-d126-50ab-9710-445a0e7c2e78",
    "category_id": "61665041-da23-529e-b915-fde3e0904e96",
    "category_name": "DJ Controllers",
    "category_slug": "dj-controllers",
    "name": "MÁY DJ CONTROLLER PIONEER DJ DDJ-1000",
    "slug": "ddj-1000",
    "sku": "DDJ-1000",
    "brand": "Pioneer DJ",
    "description": "#### DDJ-1000 kế thừa các tính năng từ các thiết bị CDJ/DJM NXS2, với thiết kế nhỏ gọn, dễ di chuyển. DDJ-1000 có màn hình LCD độ nét cao hoàn toàn mới trên bề mặt mâm xoay, mang lại sự tinh tế, sáng tạo cho màn trình diễn của bạn với 14 Beat FX – thêm vào 4 tính năng mới, 16 Performance Pads đa sắc sẽ kích hoạt ngay Hot Cues, Loops, và nhiều tính năng khác. #### Main Features Compatible DJ Software rekordbox VirtualDJ 2021 DVS Control rekordb",
    "sale_enabled": true,
    "sale_price": 35720000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ddj-1000.png",
    "images": [
      {
        "id": "img-1038469109",
        "image_url": "/images/products/ddj-1000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8988dea5-c055-5e48-bb9a-eff452f0b338",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "Dây đeo cổ PIONEER DJ",
    "slug": "day-deo-co",
    "sku": "VB-1038469106",
    "brand": "Pioneer DJ",
    "description": "Dây đeo cổ PIONEER DJ",
    "sale_enabled": true,
    "sale_price": 139000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/day-deo-co.png",
    "images": [
      {
        "id": "img-1038469106",
        "image_url": "/images/products/day-deo-co.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fe1707d2-fb7e-5728-a751-951efd308ad6",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "DÂY TÍN HIỆU CANON PIONEER DJ DAS-XLR030",
    "slug": "das-xlr030",
    "sku": "DAS-XLR030",
    "brand": "Pioneer DJ",
    "description": "#### High durability XLR connection for the booth or studio DAS là series được thiết kế với mục đích sử dụng chuyên nghiệp. Kết cấu cáp có độ mềm dẻo cao giúp giảm áp lực trên các mối nối và thêm tính linh hoạt. Lưới cáp bảo vệ khỏi hư hỏng với lớp cách điện bên ngoài. Tất cả các đầu jack đều được mạ niken để có độ cứng cao và chống hư hỏng. Cấu trúc của cáp giúp loại bỏ nhiễu và cho phép đáp ứng tần số thấp một cách nhanh chóng mà các DJ và Producer cần.",
    "sale_enabled": true,
    "sale_price": 4579200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/das-xlr030.png",
    "images": [
      {
        "id": "img-1038469101",
        "image_url": "/images/products/das-xlr030.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8b4dbcf8-0cf4-55ec-8fa8-d27db569f35f",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "DÂY TÍN HIỆU ANALOG RCA PIONEER DJ DAS-RCA020",
    "slug": "das-rca020",
    "sku": "DAS-RCA020",
    "brand": "Pioneer DJ",
    "description": "#### Durable analogue connection for the booth or studio. DAS là series được thiết kế với mục đích sử dụng chuyên nghiệp. Kết cấu cáp có độ mềm dẻo cao giúp giảm áp lực trên các mối nối và thêm tính linh hoạt. Lưới cáp bảo vệ khỏi hư hỏng với lớp cách điện bên ngoài. Tất cả các đầu jack đều được mạ niken để có độ cứng cao và chống hư hỏng. Cấu trúc của cáp giúp loại bỏ nhiễu và cho phép đáp ứng tần số thấp một cách nhanh chóng mà các DJ và Producer cần.",
    "sale_enabled": true,
    "sale_price": 3963600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/das-rca020.png",
    "images": [
      {
        "id": "img-1038469096",
        "image_url": "/images/products/das-rca020.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ef453a7c-d6d6-505d-b08e-86aac6a0988d",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "DÂY TÍN HIỆU COAXIAL DIGITAL PIONEER DJ DAS-DGC020",
    "slug": "das-dgc020",
    "sku": "DAS-DGC020",
    "brand": "Pioneer DJ",
    "description": "#### Durable analogue connection for the booth or studio. DAS là series được thiết kế với mục đích sử dụng chuyên nghiệp. Kết cấu cáp có độ mềm dẻo cao giúp giảm áp lực trên các mối nối và thêm tính linh hoạt. Lưới cáp bảo vệ khỏi hư hỏng với lớp cách điện bên ngoài. Tất cả các đầu jack đều được mạ niken để có độ cứng cao và chống hư hỏng. Cấu trúc của cáp giúp loại bỏ nhiễu và cho phép đáp ứng tần số thấp một cách nhanh chóng mà các DJ và Producer cần.",
    "sale_enabled": true,
    "sale_price": 2516400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/das-dgc020.png",
    "images": [
      {
        "id": "img-1038469090",
        "image_url": "/images/products/das-dgc020.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e3801584-39ad-509e-9278-cf9c3e1590e9",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ PIONEER DJ CDJ - TOUR 1",
    "slug": "cdj-tour-1",
    "sku": "CDJ - TOUR 1",
    "brand": "Pioneer DJ",
    "description": "#### CDJ-Tour1 : là một thiết bị được nâng cấp lên từ CDJ-2000 Nexus 2 có cải tiến từ âm thanh cho đến màn hình cảm ứng lớn để kiểm soát hiệu quả hơn .CDJ-Tour1 cung cấp chất lượng âm thanh chuyên nghiệp – các thành phần chức năng mở rộng , đáp ứng đầy đủ các yếu tố cho Festival âm nhạc , Ultra , Tommorowland,….. Large fold-out touch screen Tiếp nối màn hình 7-inch, CDJ-TOUR1 mang đến cho bạn một màn hình khủng lên đến 13-inch. Đây là màn hình cảm ứng và bạn có thể gập lại hoặc thay đổi độ nghiê",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cdj-tour-1.png",
    "images": [
      {
        "id": "img-1038469081",
        "image_url": "/images/products/cdj-tour-1.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "dd02525e-5e44-5382-bdf3-f3afa04ad1b8",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ PIONEER DJ CDJ - 350",
    "slug": "cdj-350",
    "sku": "VB-1038469057",
    "brand": "Pioneer DJ",
    "description": "#### CDJ-350 mang trong mình nhiều đặc tính từ hệ thống Pro DJ Link, chất lượng âm thanh chuyên nghiệp, chơi được đĩa CD, các thiết bị USB, kết nối với PC/Laptop thông qua tính năng của phần mềm quản lý nhạc tương thích. USB playback Bạn vẫn có thể sử dụng các định dạng đa dạng như MP3, AAC, WAV và AIFF được lưu trữ trong USB. Be prepared Hỗ trợ toàn phần với phần mềm rekordbox. Bạn có thể quản lý và sắp xếp playlist của mình trên phần mềm rekordbox một cách đơn giản và dễ dàng. Download now ##",
    "sale_enabled": true,
    "sale_price": 14893000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/cdj-350.png",
    "images": [
      {
        "id": "img-1038469057",
        "image_url": "/images/products/cdj-350.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0e8be0cc-73a1-5283-996b-9005fd72b08e",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ PIONEER DJ CDJ-3000",
    "slug": "cdj-3000",
    "sku": "VB-1038469034",
    "brand": "Pioneer DJ",
    "description": "CDJ-3000 Máy chơi nhạc DJ chuyên nghiệp CDJ-3000 là thiết bị chơi nhạc DJ chuyên nghiệp mới nhất của hãng Pioneer DJ. Sản phẩm được trang bị những công nghệ và tính năng tiên tiến nhất, mang đến cho người dùng trải nghiệm chơi nhạc DJ đỉnh cao. #### CDJ-3000 là thiết bị chơi nhạc DJ chuyên nghiệp mới nhất của hãng Pioneer DJ, kế thừa những thành công của dòng CDJ-2000NXS2. Sản phẩm được trang bị những công nghệ và tính năng tiên tiến nhất, mang đến cho người dùng trải nghiệm chơi nhạc DJ đỉnh ca",
    "sale_enabled": true,
    "sale_price": 75456360,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/cdj-3000.png",
    "images": [
      {
        "id": "img-1038469034",
        "image_url": "/images/products/cdj-3000.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9e37b3b5-916f-5a5e-b350-ea034c51c4e1",
    "category_id": "a98b8bbc-94d4-5fc9-9c64-2e7760a7cd4a",
    "category_name": "Đầu Phát DJ (Players)",
    "category_slug": "dj-player",
    "name": "MÁY DJ PIONEER DJ CDJ - 2000NXS2",
    "slug": "cdj-2000-nxs2",
    "sku": "VB-1038469026",
    "brand": "Pioneer DJ",
    "description": "#### CDJ-2000NXS2 được thừa hưởng tất cả tính năng cao cấp nhất từ thiết bị tiền nhiệm CDJ-2000NXS và mang đến nhiều đột phát mới cho dòng sản phẩm CDJ. Pioneer DJ đã thêm vào một màn hình cảm ứng đa sắc lớn, tích hợp bàn phím QWERTY, bộ lọc tìm kiếm giúp cho người dùng tìm kiếm nhanh gọn và dễ dàng hơn #### Main Features File Formats ALAC AAC AIFF FLAC MP3 WAV File Systems FAT FAT32 HFS+ MIDI Control Yes Pro DJ Link Yes KUVO ready Yes Auto S",
    "sale_enabled": true,
    "sale_price": 52410000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/cdj-2000-nxs2.png",
    "images": [
      {
        "id": "img-1038469026",
        "image_url": "/images/products/cdj-2000-nxs2.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "991517c2-722c-57f6-983b-ee65d7dc72de",
    "category_id": "36d56d0b-d0ba-5fa5-af2f-da477fec8282",
    "category_name": "Mixer - Bàn Trộn Âm Thanh",
    "category_slug": "mixer-ban-tron-am-thanh",
    "name": "Mixer analog Allen & Heath ZED-10FX",
    "slug": "allen-heath-zed-10fx",
    "sku": "VB-1038429204",
    "brand": "Allen & Heath",
    "description": "Mixer analog Allen & Heath ZED-10FX Được phát triển cho nhu cầu âm thanh chuyên nghiệp, Mixer analog Allen & Heath ZED-10FX là mixer analog hướng đến khả năng vận hành thực tế, mở rộng hệ thống và quản lý tín hiệu thuận tiện. Model này được xây dựng cho người dùng ưu tiên thao tác trực tiếp, đường tín hiệu rõ ràng và khả năng xử lý nhanh trong biểu diễn, phòng tập, phòng thu hoặc phát thanh. Giá trị của ZED-10FX thể hiện rõ khi hệ thống được thiết kế đồng bộ từ nguồn tín hiệu, điều khiển, xử lý ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/allen-heath-zed-10fx.jpg",
    "images": [
      {
        "id": "img-1038429204",
        "image_url": "/images/products/allen-heath-zed-10fx.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ba2713d7-457f-59a3-b207-07eb5e9415ed",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO 2 TẤC SN8-250CX",
    "slug": "loa-roi-paudio-sn8-250cx",
    "sku": "SN8-250CX",
    "brand": "P.AUDIO",
    "description": "LOA RỜI PAUDIO SN8-250CX ĐVT: CẶP #### Voice Coil 2.38” Công suất đỉnh (Peak Power Handling) 1000 Watts Nam châm Neodymium Loa kết hợp củ treble và loa bass. Khung loa được đúc bằng nhôm cứng. Tham khảo thông số tại : http://paudiothailand.com/uploads/pdf/products/SN8-250CX4.pdf #### Công suất 250 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 60-20000 Hz Khung Nhôm Nam châm Neodymium Khối lượng tịnh 4.1 kg Kích thước 225 x 225 x 150 mm",
    "sale_enabled": true,
    "sale_price": 15692400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-paudio-sn8-250cx.png",
    "images": [
      {
        "id": "img-1038353463",
        "image_url": "/images/products/loa-roi-paudio-sn8-250cx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a84cb11f-fc16-5306-bc89-4255b7d5ef79",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO 4 TẤC SN15-500CX",
    "slug": "loa-roi-p-audio-sn15-500cx",
    "sku": "SN15-500CX",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO SN15-500CX ĐVT: CẶP #### Voice Coil 3.25” Công suất đỉnh (Peak Power Handling) 2400 Watts Nam châm Neodymium Loa kết hợp củ treble và loa bass. Khung loa được đúc bằng nhôm cứng. Tham khảo thông số tại : http://paudiothailand.com/uploads/pdf/products/SN15-500CX6.pdf #### Công suất 600 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 55-20000 Hz Khung Nhôm Nam châm Neodymium Khối lượng tịnh 7.2 kg Kích thước 430 x 430 x 250 mm",
    "sale_enabled": true,
    "sale_price": 19504800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-sn15-500cx.png",
    "images": [
      {
        "id": "img-1038353462",
        "image_url": "/images/products/loa-roi-p-audio-sn15-500cx.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "28802e27-36ce-5612-87e7-ce58c6fe9597",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO P180/2241",
    "slug": "loa-roi-p-audio-p180-2241",
    "sku": "P180/2241",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO P180/2241 #### Voice coil khổ lớn (4”) Công suất đỉnh (Peak Power Handling): 4000 W Hệ thống làm mát có chức năng giải nhiệt, bảo vệ loa an toàn và đạt công suất cao. Voice coil dây cạnh vuông giúp cải thiện hiệu suất chuyển đổi và giải nhiệt tốt. Mạng nhện đôi Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/P180-2241.pdf #### Công suất 1000 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 30-500 Hz Khung ",
    "sale_enabled": true,
    "sale_price": 4207680,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-p180-2241.png",
    "images": [
      {
        "id": "img-1038353454",
        "image_url": "/images/products/loa-roi-p-audio-p180-2241.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "827413d0-935c-5338-8362-2b3445e41e75",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO P150/2226",
    "slug": "loa-roi-p-audio-p150-2226",
    "sku": "P150/2226",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO P150/2226 #### Voice coil khổ lớn (4”) Công suất đỉnh (Peak Power Handling): 4000 W Hệ thống làm mát có chức năng giải nhiệt, bảo vệ loa an toàn và đạt công suất cao. Voice coil dây cạnh vuông giúp cải thiện hiệu suất chuyển đổi và giải nhiệt tốt. Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/P150-22262.pdf #### Công suất 1000 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 40-2000 Hz Khung Nhôm Nam châ",
    "sale_enabled": true,
    "sale_price": 3682260,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-p150-2226.png",
    "images": [
      {
        "id": "img-1038353451",
        "image_url": "/images/products/loa-roi-p-audio-p150-2226.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "91c334d4-0146-529a-98bf-f41696c7a06c",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO P12N",
    "slug": "loa-roi-p-audio-p12n",
    "sku": "P12N",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO P12N ĐVT: CẶP #### 4000 W công suất đỉnh Nam châm Neodymium Voice Coil lớn 3.9\" Dây coil nhôm cuốn trong/ngoài. Khung nhôm đúc Triple Aluminium Demodulation Rings Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/P-12N3.pdf #### Công suất 1000 W (AES) Trở kháng 8 Ω Độ nhạy 96 dB Dãy tần số 60-3000 Hz Khung Nhôm Nam châm Neodymium Khối lượng tịnh 6.5 kg Kích thước 355 x 355 x 200 mm",
    "sale_enabled": true,
    "sale_price": 10756800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-p12n.png",
    "images": [
      {
        "id": "img-1038353450",
        "image_url": "/images/products/loa-roi-p-audio-p12n.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "429d67e8-ff57-5f68-9770-8a69d1098ad6",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO GST151200",
    "slug": "loa-roi-p-audio-gst151200",
    "sku": "GST151200",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO GST151200 ĐVT: CẶP #### Voice coil khổ lớn 4” Công suất đỉnh (Peak Power Handling): 4800 W Hệ thống làm mát có chức năng giải nhiệt, bảo vệ loa an toàn và đạt công suất cao. Mạng nhện đôi Voice coil dây nhôm cuốn trong-ngoài (inside/outside) giúp cải thiện hiệu suất chuyển đổi và giải nhiệt tốt. Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://www.paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20GST-1512003.pdf #### Công suất 1200 W (AES)",
    "sale_enabled": true,
    "sale_price": 8834400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-gst151200.png",
    "images": [
      {
        "id": "img-1038353447",
        "image_url": "/images/products/loa-roi-p-audio-gst151200.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0c987396-ec33-53b1-92c9-428dd49e9063",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO GM18-100F",
    "slug": "loa-roi-p-audio-gm18-100f",
    "sku": "GM18-100F",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO GM18-100F ĐVT: CẶP #### 4800 W công suất đỉnh Nam châm Ferrite Voice Coil lớn 4\" Độ nhạy 97 db Dây coil cuốn trong/ngoài. Khung nhôm đúc Cone (nón loa) chống thấm nước hiệu quả. Triple Aluminium Demodulation Rings Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20GM18-100F.pdf #### Công suất 1200 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 30-200 Hz Khung Nhôm Nam châm Ferrite Khối lượng tịnh 10.3 kg Kích thước 505 x 505 x",
    "sale_enabled": true,
    "sale_price": 13100400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-gm18-100f.png",
    "images": [
      {
        "id": "img-1038353444",
        "image_url": "/images/products/loa-roi-p-audio-gm18-100f.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "21ede0b7-6775-5a7f-b254-c048f9f0030f",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO GM15-100N",
    "slug": "loa-roi-p-audio-gm15-100n",
    "sku": "GM15-100N",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO GM15-100N ĐVT: CẶP #### 4000 W công suất đỉnh Nam châm Neodymium Voice Coil lớn 4\" Độ nhạy 98 db Dây coil cuốn trong/ngoài. Khung nhôm đúc Cone (nón loa) chống thấm nước hiệu quả. Triple Aluminium Demodulation Rings Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20GM15-100N.pdf #### Công suất 1000 W (AES) Trở kháng 8 Ω Độ nhạy 98 dB Dãy tần số 50-2000 Hz Khung Nhôm Nam châm Neodymium Khối lượng tịnh 8.1 kg Kích thước 415 x 4",
    "sale_enabled": true,
    "sale_price": 13024800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-gm15-100n.png",
    "images": [
      {
        "id": "img-1038353439",
        "image_url": "/images/products/loa-roi-p-audio-gm15-100n.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "23d5ac56-68cc-5223-8508-3617b30e6cc6",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO GM15-100F",
    "slug": "loa-roi-p-audio-gm15-100f",
    "sku": "GM15-100F",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO GM15-100F ĐVT: CẶP #### 4000 W công suất đỉnh Nam châm Ferrite Voice Coil lớn 4\" Độ nhạy 98 db Dây coil cuốn trong/ngoài. Khung nhôm đúc Cone (nón loa) chống thấm nước hiệu quả. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20GM15-100F.pdf #### Công suất 1000 W (AES) Trở kháng 8 Ω Độ nhạy 98 dB Dãy tần số 50-2000 Hz Khung Nhôm Nam châm Ferrite Khối lượng tịnh 12 kg Kích thước 415 x 415 x 230 mm",
    "sale_enabled": true,
    "sale_price": 9547200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-gm15-100f.png",
    "images": [
      {
        "id": "img-1038353438",
        "image_url": "/images/products/loa-roi-p-audio-gm15-100f.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e7aea44b-adee-5514-8424-e415283bbbd1",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO GM12-100N",
    "slug": "loa-roi-p-audio-gm12-100n",
    "sku": "GM12-100N",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO GM12-100N ĐVT: CẶP #### 3600 W công suất đỉnh Nam châm Neodymium Voice Coil lớn 4\" Dây Coil nhôm mạ đồng Độ nhạy 98 db Dây coil cuốn trong/ngoài. Khung nhôm đúc Cone (nón loa) chống thấm nước hiệu quả. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20GM12-100N.pdf #### Công suất 800 W (AES) Trở kháng 8 Ω Độ nhạy 98 dB Dãy tần số 60-2500 Hz Khung Nhôm Nam châm Neodymium Khối lượng tịnh 7.3 kg Kích thước 355 x 355 x 190 mm",
    "sale_enabled": true,
    "sale_price": 9687600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-gm12-100n.png",
    "images": [
      {
        "id": "img-1038353435",
        "image_url": "/images/products/loa-roi-p-audio-gm12-100n.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cf998eb0-d0db-5992-a18e-893a4f1201f1",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO GM12-100F",
    "slug": "loa-roi-p-audio-gm12-100f",
    "sku": "GM12-100F",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO GM12-100F ĐVT: CẶP #### Voice coil khổ lớn 4” Công suất đỉnh (Peak Power Handling): 3200 W Hệ thống làm mát có chức năng giải nhiệt, bảo vệ loa an toàn và đạt công suất cao. Mạng nhện đơn tẩm keo Silicon Voice coil dây nhôm cuốn trong-ngoài (inside/outside) giúp cải thiện hiệu suất chuyển đổi và giải nhiệt tốt. Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20GM12-100F.pdf #### Công suất 80",
    "sale_enabled": true,
    "sale_price": 8683200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-gm12-100f.png",
    "images": [
      {
        "id": "img-1038353434",
        "image_url": "/images/products/loa-roi-p-audio-gm12-100f.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e39659f8-00af-5e74-ad29-d0a2c2ab15aa",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO EM18-LB600",
    "slug": "loa-roi-p-audio-em18-lb600",
    "sku": "EM18-LB600",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO EM18-LB600 ĐVT: CẶP #### Voice coil khổ lớn 3.5” Công suất đỉnh (Peak Power Handling): 2400 W Hệ thống làm mát có chức năng giải nhiệt, bảo vệ loa an toàn và đạt công suất cao. Mạng nhện đơn tẩm keo Silicon Voice coil dây đồng cuốn trong-ngoài (inside/outside) giúp cải thiện hiệu suất chuyển đổi và giải nhiệt tốt. Khung loa được đúc bằng sắt cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/DATA%20SHEET%20EM18-LB600.pdf #### Công suất",
    "sale_enabled": true,
    "sale_price": 7117200,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-em18-lb600.png",
    "images": [
      {
        "id": "img-1038353433",
        "image_url": "/images/products/loa-roi-p-audio-em18-lb600.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c58a9aff-e47d-5b5e-ae06-844b8d63564a",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO E15-300S",
    "slug": "loa-roi-p-audio-e15-300s",
    "sku": "E15-300S",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO E15-300S ĐVT: CẶP #### Voice coil 3” Công suất đỉnh (Peak Power Handling): 1200 W Dây cone tròn. Khung loa bằng thép. Tham khảo thêm thông số tại : http://paudiothailand.com/uploads/pdf/products/E15-300S2.pdf #### Công suất 300 W(AES) Trở kháng 8 Ω Độ nhạy 99 dB Dãy tần số 40-2000 Hz Nam châm Ferrite Khối lượng tịnh 7,3 kg Kích thước 430 x 430 x 210 mm",
    "sale_enabled": true,
    "sale_price": 5032800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-e15-300s.png",
    "images": [
      {
        "id": "img-1038353423",
        "image_url": "/images/products/loa-roi-p-audio-e15-300s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "96a9556d-b57a-5df5-b51b-e653db225a0a",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO 15BM-500B",
    "slug": "loa-roi-p-audio-15bm-500b",
    "sku": "15BM-500B",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO 15BM-500B #### Voice coil 3.25” Công suất đỉnh (Peak Power Handling): 2000 W Mạng nhện đơn Voice coil dây đồng cuốn trong-ngoài (inside/outside) giúp cải thiện hiệu suất chuyển đổi và giải nhiệt tốt. Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/15BM-500B5.pdf #### Công suất 500 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 45-3500 Hz Khung Nhôm Nam châm Ferrite Khối lượng tịnh 10.2 kg Kích thước 430 ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-15bm-500b.png",
    "images": [
      {
        "id": "img-1038353415",
        "image_url": "/images/products/loa-roi-p-audio-15bm-500b.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fa03557c-88d0-507e-96dd-99d12a001fe0",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO 15BM-300B",
    "slug": "loa-roi-p-audio-15bm-300b",
    "sku": "15BM-300B",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO 15BM-300B ĐVT: CẶP #### Voice coil 3” Công suất đỉnh (Peak Power Handling): 1200 W Mạng nhện đơn Voice coil dây đồng Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/15BM-300B3.pdf #### Công suất 300 W (AES) Trở kháng 8 Ω Độ nhạy 97 dB Dãy tần số 45-3500 Hz Khung Nhôm Nam châm Ferrite Khối lượng tịnh 8 kg Kích thước 430 x 430 x 220 mm",
    "sale_enabled": true,
    "sale_price": 5799600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-15bm-300b.png",
    "images": [
      {
        "id": "img-1038353414",
        "image_url": "/images/products/loa-roi-p-audio-15bm-300b.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c37c846e-663b-5c47-a736-8c41fe633815",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "LOA RỜI P.AUDIO 12BM-300B",
    "slug": "loa-roi-p-audio-12bm-300b",
    "sku": "12BM-300B",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO 12BM-300B #### Voice coil 3” Công suất đỉnh (Peak Power Handling): 1200 W Mạng nhện đơn Voice coil dây đồng Khung loa được đúc bằng nhôm cứng. Thông số chi tiết xin tham khảo thêm tại : http://paudiothailand.com/uploads/pdf/products/12BM-300B1.pdf #### Công suất 300 W(AES) Trở kháng 8 Ω Độ nhạy 95 dB Dãy tần số 45-3000 Hz Nam châm Ferrite Khối lượng tịnh 7.4 Kg Kích thước 355 x 355 x 195 mm",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-p-audio-12bm-300b.png",
    "images": [
      {
        "id": "img-1038353413",
        "image_url": "/images/products/loa-roi-p-audio-12bm-300b.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f3a1000f-1cc5-59e6-abf4-56336f00c518",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "8FG51 – Loa bass rời B&C Speakers 2 tấc 8 inch",
    "slug": "loa-roi-bc-speakers-8fg51",
    "sku": "8FG51",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 8FG51 – CỦ LOA WOOFER 8 INCH B&C Speakers 8FG51 là củ loa woofer 8 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 250 W , công suất chương trình liên tục 500 W , độ nhạy 93 dB và dải tần 50 Hz - 4000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 8FG51 Công suất chương trình liên tục 500 W Voice coil Đồng 51 mm (2 in) Dải tần đáp ứng 50 - 4000 Hz Độ nhạy 93 dB Chụp đồng giảm cảm kháng, hỗ trợ mở rộng dải cao Khe voice coil thông gió ",
    "sale_enabled": true,
    "sale_price": 4626720,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-8fg51.jpg",
    "images": [
      {
        "id": "img-1038353411",
        "image_url": "/images/products/loa-roi-bc-speakers-8fg51.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8516faab-0865-5338-8186-9e1fe9016cd6",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18TBX100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-roi-bc-speakers-18tbx100",
    "sku": "18TBX100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18TBX100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18TBX100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1200 W , công suất chương trình liên tục 2400 W , độ nhạy 97 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18TBX100 Công suất chương trình liên tục 2400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 97 dB Vòng khử từ bằng nhôm giúp giảm méo tín hiệu Nhện loa",
    "sale_enabled": true,
    "sale_price": 12916260,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-18tbx100.jpg",
    "images": [
      {
        "id": "img-1038353410",
        "image_url": "/images/products/loa-roi-bc-speakers-18tbx100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "69ae201e-73ce-5be7-b6b9-d7b64bdc5350",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18RBX100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-roi-bc-speakers-18rbx100",
    "sku": "18RBX100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18RBX100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18RBX100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1000 W , công suất chương trình liên tục 2000 W , độ nhạy 97 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18RBX100 Công suất chương trình liên tục 2000 W Voice coil 100 mm (4 in) Dải tần 35 Hz - 1000 Hz Độ nhạy 97 dB HIỆU SUẤT VÀ KHẢ NĂNG CHỊU CÔNG SUẤT Với công suất danh định 10",
    "sale_enabled": true,
    "sale_price": 11485800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-18rbx100.jpg",
    "images": [
      {
        "id": "img-1038353409",
        "image_url": "/images/products/loa-roi-bc-speakers-18rbx100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2c3a7d35-c581-554d-93a0-0ef3d45a716b",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "18PZB100 – Loa bass rời B&C Speakers 5 tấc 18 inch",
    "slug": "loa-roi-bc-speakers-18pzb100",
    "sku": "18PZB100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18PZB100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18PZB100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 97 dB và dải tần 40 Hz - 2000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18PZB100 Công suất chương trình liên tục 1400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 40 - 2000 Hz Độ nhạy 97 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ưu",
    "sale_enabled": true,
    "sale_price": 12022020,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-18pzb100.jpg",
    "images": [
      {
        "id": "img-1038353408",
        "image_url": "/images/products/loa-roi-bc-speakers-18pzb100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "15e315df-9809-5065-827d-d379ec078f31",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "Loa sub rời B&C Speakers 5 tấc 18PS100",
    "slug": "loa-sub-roi-b-c-speakers-5-tac-18ps100",
    "sku": "VB-1038353407",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18PS100 – CỦ LOA SUBWOOFER 18 INCH B&C Speakers 18PS100 là củ loa subwoofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 95.5 dB và dải tần 30 Hz - 1000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 18PS100 Công suất chương trình liên tục 1400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 30 - 1000 Hz Độ nhạy 95.5 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ư",
    "sale_enabled": true,
    "sale_price": 9583920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18ps100.jpg",
    "images": [
      {
        "id": "img-1038353407",
        "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18ps100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "62ab532f-5010-50a9-bf60-3fa775ff06ba",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "Loa Sub Rời B&C Speakers 5 tấc 18NBX100",
    "slug": "loa-sub-roi-b-c-speakers-5-tac-18nbx100",
    "sku": "VB-1038353404",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 18NBX100 – CỦ LOA WOOFER 18 INCH B&C Speakers 18NBX100 là củ loa woofer 18 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1200 W , công suất chương trình liên tục 2400 W , độ nhạy 96.5 dB và dải tần 35 Hz - 1000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 18NBX100 Công suất chương trình liên tục 2400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 35 - 1000 Hz Độ nhạy 96.5 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ư",
    "sale_enabled": true,
    "sale_price": 14761440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18nbx100.jpg",
    "images": [
      {
        "id": "img-1038353404",
        "image_url": "/images/products/loa-sub-roi-b-c-speakers-5-tac-18nbx100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0bef49dd-b818-5c1d-b20a-5441e842f871",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15RBX100 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15rbx100",
    "sku": "15RBX100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15RBX100 – CỦ LOA SUBWOOFER 15 INCH B&C Speakers 15RBX100 là củ loa subwoofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 1000 W , công suất chương trình liên tục 2000 W , độ nhạy 95 dB và dải tần 40 Hz - 3000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 15RBX100 Công suất chương trình liên tục 2000 W Voice coil 100 mm (4 in) Dải tần 40 Hz - 3000 Hz Độ nhạy 95 dB HIỆU SUẤT VÀ KHẢ NĂNG CHỊU CÔNG SUẤT Với công suất danh định 10",
    "sale_enabled": true,
    "sale_price": 11801700,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15rbx100.jpg",
    "images": [
      {
        "id": "img-1038353403",
        "image_url": "/images/products/loa-roi-bc-speakers-15rbx100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a3099d77-eda3-5b92-a06f-0b737c172f38",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15PZB100 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15pzb100",
    "sku": "15PZB100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15PZB100 – CỦ LOA SUBWOOFER 15 INCH B&C Speakers 15PZB100 là củ loa subwoofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 97 dB và dải tần 40 Hz - 2000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 15PZB100 Công suất chương trình liên tục 1400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 40- 2000 Hz Độ nhạy 97 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ưu ",
    "sale_enabled": true,
    "sale_price": 10594800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15pzb100.jpg",
    "images": [
      {
        "id": "img-1038353402",
        "image_url": "/images/products/loa-roi-bc-speakers-15pzb100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7d752a3e-2f7f-5c84-85c5-3fe12ebcf67f",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15PS76 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15ps76",
    "sku": "15PS76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15PS76 – CỦ LOA WOOFER 15 INCH B&C Speakers 15PS76 là củ loa woofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 550 W , công suất chương trình liên tục 1100 W , độ nhạy 99 dB và dải tần 40 Hz - 2000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 15PS76 Công suất chương trình liên tục 1100 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 40 - 2000 Hz Độ nhạy 99 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ưu HIỆU SUẤT VÀ",
    "sale_enabled": true,
    "sale_price": 7698240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15ps76.jpg",
    "images": [
      {
        "id": "img-1038353401",
        "image_url": "/images/products/loa-roi-bc-speakers-15ps76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "aa0c0725-1646-5a4a-8c61-7713a4744858",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15PS100 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15ps100",
    "sku": "15PS100",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15PS100 – CỦ LOA SUBWOOFER 15 INCH B&C Speakers 15PS100 là củ loa subwoofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 95 dB và dải tần 35 Hz - 1500 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 15PS100 Công suất chương trình liên tục 1400 W Voice coil Đồng 100 mm (4 in) Dải tần đáp ứng 35 - 1500 Hz Độ nhạy 95 dB Nhện loa đôi xử lý silicone với độ đàn hồi được tối ưu HI",
    "sale_enabled": true,
    "sale_price": 8949960,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15ps100.jpg",
    "images": [
      {
        "id": "img-1038353399",
        "image_url": "/images/products/loa-roi-bc-speakers-15ps100.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "178b60ec-7c74-5446-8fca-a0f69368f2fe",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15PLB76 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15plb76",
    "sku": "15PLB76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15PLB76 – CỦ LOA WOOFER 15 INCH B&C Speakers 15PLB76 là củ loa woofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 400 W , công suất chương trình liên tục 800 W , độ nhạy 100 dB và dải tần 40 Hz - 2000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 15PLB76 Công suất chương trình liên tục 800 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 40 - 2000 Hz Độ nhạy 100 dB HIỆU SUẤT VÀ KHẢ NĂNG CHỊU CÔNG SUẤT Với công suất danh định 400",
    "sale_enabled": true,
    "sale_price": 7876440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15plb76.jpg",
    "images": [
      {
        "id": "img-1038353398",
        "image_url": "/images/products/loa-roi-bc-speakers-15plb76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a4f369ef-c9ed-500c-8c10-4086dabaf185",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15NDL88 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15ndl88",
    "sku": "15NDL88",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15NDL88 – CỦ LOA WOOFER 15 INCH B&C Speakers 15NDL88 là củ loa woofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 700 W , công suất chương trình liên tục 1400 W , độ nhạy 99 dB và dải tần 45 Hz - 3000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 15NDL88 Công suất chương trình liên tục 1400 W Voice coil Nhôm 88 mm (3.5 in) Dải tần đáp ứng 45 - 3000 Hz Độ nhạy 99 dB Khe voice coil thông gió giúp hạn chế hiện tượng nén công su",
    "sale_enabled": true,
    "sale_price": 11197440,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15ndl88.jpg",
    "images": [
      {
        "id": "img-1038353397",
        "image_url": "/images/products/loa-roi-bc-speakers-15ndl88.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6c569d35-53d3-5e62-b9fa-29f5f9f6c268",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15NDL76 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15ndl76",
    "sku": "15NDL76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15NDL76 – CỦ LOA WOOFER 15 INCH B&C Speakers 15NDL76 là củ loa woofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 500 W , công suất chương trình liên tục 1000 W , độ nhạy 99.5 dB và dải tần 40 Hz - 2000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 15NDL76 Công suất chương trình liên tục 1000 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 40 - 2000 Hz Độ nhạy 99.5 dB Nam châm Neodymium giúp cụm từ nhẹ nhưng vẫn tạo lực mạnh ",
    "sale_enabled": true,
    "sale_price": 8331660,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15ndl76.jpg",
    "images": [
      {
        "id": "img-1038353396",
        "image_url": "/images/products/loa-roi-bc-speakers-15ndl76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6564139f-d713-580a-8a6f-a0b6e14887a8",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15CL76 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-roi-bc-speakers-15cl76",
    "sku": "15CL76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15CL76 – CỦ LOA WOOFER 15 INCH B&C Speakers 15CL76 là củ loa woofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 400 W , công suất chương trình liên tục 800 W , độ nhạy 98.5 dB và dải tần 40 Hz - 3000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 15CL76 Công suất chương trình liên tục 800 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 40 - 3000 Hz Độ nhạy 98.5 dB Khe voice coil thông gió giúp hạn chế hiện tượng nén công suất ",
    "sale_enabled": true,
    "sale_price": 6396300,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-15cl76.jpg",
    "images": [
      {
        "id": "img-1038353395",
        "image_url": "/images/products/loa-roi-bc-speakers-15cl76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9362ed32-55d3-593f-af80-4fa8e18ca073",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "12PLB76 – Loa bass rời B&C Speakers 3 tấc 12 inch",
    "slug": "loa-roi-bc-speakers-12plb76",
    "sku": "12PLB76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 12PLB76 – CỦ LOA WOOFER 12 INCH B&C Speakers 12PLB76 là củ loa woofer 12 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 350 W , công suất chương trình liên tục 700 W , độ nhạy 99 dB và dải tần 50 Hz - 2000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 12PLB76 Công suất chương trình liên tục 700 W Voice coil Nhôm 76 mm (3 in) Dải tần đáp ứng 50 - 2000 Hz Độ nhạy 99 dB HIỆU SUẤT VÀ KHẢ NĂNG CHỊU CÔNG SUẤT Với công suất danh định 350 W",
    "sale_enabled": true,
    "sale_price": 6927120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-12plb76.jpg",
    "images": [
      {
        "id": "img-1038353394",
        "image_url": "/images/products/loa-roi-bc-speakers-12plb76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8a8f8a44-9e5d-5e90-be3f-da772ed97789",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "12MH32 – Loa bass rời B&C Speakers 3 tấc 12 inch",
    "slug": "loa-roi-bc-speakers-12mh32",
    "sku": "12MH32",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 12MH32 – CỦ LOA MID-BASS 12 INCH B&C Speakers 12MH32 là củ loa mid-bass 12 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 400 W , công suất chương trình liên tục 800 W , độ nhạy 101 dB và dải tần 50 Hz - 3000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 12MH32 Công suất chương trình liên tục 800 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 50 - 3000 Hz Độ nhạy 101 dB Vòng khử từ bằng nhôm giúp giảm méo tín hiệu HIỆU SUẤT VÀ KHẢ N",
    "sale_enabled": true,
    "sale_price": 6413040,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-12mh32.jpg",
    "images": [
      {
        "id": "img-1038353393",
        "image_url": "/images/products/loa-roi-bc-speakers-12mh32.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3b5cb889-f3d4-5aa5-a601-5cd9435b601f",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "12FW76 – Loa bass rời B&C Speakers 3 tấc 12 inch",
    "slug": "loa-roi-bc-speakers-12fw76",
    "sku": "12FW76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 12FW76 – CỦ LOA WOOFER 12 INCH B&C Speakers 12FW76 là củ loa woofer 12 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 500 W , công suất chương trình liên tục 1000 W , độ nhạy 100 dB và dải tần 55 Hz - 3000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 12FW76 Công suất chương trình liên tục 1000 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 55 - 3000 Hz Độ nhạy 100 dB Vòng khử từ bằng nhôm giúp giảm méo tín hiệu HIỆU SUẤT VÀ KHẢ NĂN",
    "sale_enabled": true,
    "sale_price": 7215480,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-12fw76.jpg",
    "images": [
      {
        "id": "img-1038353392",
        "image_url": "/images/products/loa-roi-bc-speakers-12fw76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "451a47ad-c156-5b95-a47c-c510944146f7",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "12CL76 – Loa bass rời B&C Speakers 3 tấc 12 inch",
    "slug": "loa-roi-bc-speakers-12cl76",
    "sku": "12CL76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 12CL76 – CỦ LOA WOOFER 12 INCH B&C Speakers 12CL76 là củ loa woofer 12 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 350 W , công suất chương trình liên tục 700 W , độ nhạy 98.5 dB và dải tần 45 Hz - 3000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 12CL76 Công suất chương trình liên tục 700 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 45 - 3000 Hz Độ nhạy 98.5 dB Khe voice coil thông gió giúp hạn chế hiện tượng nén công suất ",
    "sale_enabled": true,
    "sale_price": 5880600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-12cl76.jpg",
    "images": [
      {
        "id": "img-1038353391",
        "image_url": "/images/products/loa-roi-bc-speakers-12cl76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "50d95a4f-a300-567e-834f-37a69affcfd4",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "10FW64 – Loa bass rời B&C Speakers 2 tấc rưỡi 10 inch",
    "slug": "loa-roi-bc-speakers-10fw64",
    "sku": "10FW64",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 10FW64 – CỦ LOA WOOFER 10 INCH B&C Speakers 10FW64 là củ loa woofer 10 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 250 W , công suất chương trình liên tục 500 W , độ nhạy 98 dB và dải tần 65 Hz - 3000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 10FW64 Công suất chương trình liên tục 500 W Voice coil Nhôm 64 mm (2.5 in) Dải tần đáp ứng 65 - 3000 Hz Độ nhạy 98 dB HIỆU SUẤT VÀ KHẢ NĂNG CHỊU CÔNG SUẤT Với công suất danh định 250 W ",
    "sale_enabled": true,
    "sale_price": 5550120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 10,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-10fw64.jpg",
    "images": [
      {
        "id": "img-1038353390",
        "image_url": "/images/products/loa-roi-bc-speakers-10fw64.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d8b5bc47-29b0-5fe2-b8a7-9c3ea3f5a5b7",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "8MDN51 – Loa bass rời B&C Speakers 2 tấc 8 inch",
    "slug": "loa-roi-bc-speaker-8mdn51",
    "sku": "8MDN51",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 8MDN51 – CỦ LOA MID-BASS 8 INCH B&C Speakers 8MDN51 là củ loa mid-bass 8 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 200 W , công suất chương trình liên tục 400 W , độ nhạy 97 dB và dải tần 70 Hz - 4000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 8MDN51 Công suất chương trình liên tục 400 W Voice coil Nhôm 51 mm (2 in) Dải tần đáp ứng 70 - 4000 Hz Độ nhạy 97 dB Cụm nam châm Neodymium dạng vòng Khe voice coil thông gió giúp hạ",
    "sale_enabled": true,
    "sale_price": 6100920,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speaker-8mdn51.jpg",
    "images": [
      {
        "id": "img-1038353389",
        "image_url": "/images/products/loa-roi-bc-speaker-8mdn51.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "510f6b6d-1fce-56c0-90c5-695f93410d9b",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "15FW76 – Loa bass rời B&C Speakers 4 tấc 15 inch",
    "slug": "loa-bc-speakers-15fw76",
    "sku": "15FW76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 15FW76 – CỦ LOA WOOFER 15 INCH B&C Speakers 15FW76 là củ loa woofer 15 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 500 W , công suất chương trình liên tục 1000 W , độ nhạy 100 dB và dải tần 40 Hz - 2000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 15FW76 Công suất chương trình liên tục 1000 W Voice coil Đồng 76 mm (3 in) Dải tần đáp ứng 40 - 2000 Hz Độ nhạy 100 dB Vòng khử từ bằng nhôm giúp giảm méo tín hiệu Nhện loa đôi xử lý s",
    "sale_enabled": true,
    "sale_price": 8399700,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-bc-speakers-15fw76.jpg",
    "images": [
      {
        "id": "img-1038353388",
        "image_url": "/images/products/loa-bc-speakers-15fw76.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "475c936b-4912-55b3-8f4f-0cf8cb2864df",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "12NDL76 – Loa bass rời B&C Speakers 3 tấc 12 inch",
    "slug": "loa-bc-speakers-12ndl6",
    "sku": "12NDL76",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 12NDL76 – CỦ LOA WOOFER 12 INCH B&C Speakers 12NDL76 là củ loa woofer 12 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 400 W , công suất chương trình liên tục 800 W , độ nhạy 100 dB và dải tần 50 Hz - 2000 Hz , kết hợp cụm nam châm Neodymium . ĐIỂM NỔI BẬT CỦA B&C 12NDL76 Công suất chương trình liên tục 800 W Voice coil Nhôm 76 mm (3 in) Dải tần đáp ứng 50 - 2000 Hz Độ nhạy 100 dB Nam châm Neodymium giúp cụm từ nhẹ nhưng vẫn tạo lực mạnh Khe ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/loa-bc-speakers-12ndl6.png",
    "images": [
      {
        "id": "img-1038353387",
        "image_url": "/images/products/loa-bc-speakers-12ndl6.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ef539cd7-694e-5526-b256-d55ec0ac686e",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "Họng loa Treble B&C SPEAKERS ME90",
    "slug": "hong-ken-loa-treble-b-c-speakers-me90",
    "sku": "VB-1038353386",
    "brand": "B&C SPEAKERS",
    "description": "HỌNG KÈN B&C SPEAKERS ME90 – ĐẦU VÀO 1.4 INCH EXIT B&C Speakers ME90 là họng kèn dành cho compression driver có đầu ra 1.4 inch exit. Sản phẩm có góc phủ 80 ° × 60 ° , tần số cutoff 0.9 kHz và thân họng bằng Nhôm đúc , phù hợp cho các thiết kế loa PA chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C ME90 Đường kính đầu vào 1.4\" Góc phủ danh định 80° x 60° Thiết kế kiểm soát hướng tính Constant Directivity Khả năng tải tốt xuống đến 900 Hz KIỂM SOÁT GÓC PHỦ Góc phủ 80 ° × 60 ° giúp xác định khu vực bao phủ của",
    "sale_enabled": true,
    "sale_price": 3291840,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hong-ken-loa-treble-b-c-speakers-me90.png",
    "images": [
      {
        "id": "img-1038353386",
        "image_url": "/images/products/hong-ken-loa-treble-b-c-speakers-me90.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "05a72076-0aa0-526f-b94a-8d92f37cb9cf",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "Họng Loa Treble B&C SPEAKERS ME45",
    "slug": "hong-loa-treble-b-c-speakers-me45",
    "sku": "VB-1038353385",
    "brand": "B&C SPEAKERS",
    "description": "HỌNG KÈN B&C SPEAKERS ME45 – ĐẦU VÀO 1 INCH EXIT B&C Speakers ME45 là họng kèn dành cho compression driver có đầu ra 1 inch exit. Sản phẩm có góc phủ 90 ° × 40 ° , tần số cutoff 1 kHz và thân họng bằng Nhôm đúc , phù hợp cho các thiết kế loa PA chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C ME45 Đường kính đầu vào 1\" Góc phủ danh định 90° x 40° Biên dạng kèn Exponential Khả năng tải tốt xuống đến 1 kHz KIỂM SOÁT GÓC PHỦ Góc phủ 90 ° × 40 ° giúp xác định khu vực bao phủ của dải cao. Khi thiết kế hệ thống, c",
    "sale_enabled": true,
    "sale_price": 2190240,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hong-loa-treble-b-c-speakers-me45.png",
    "images": [
      {
        "id": "img-1038353385",
        "image_url": "/images/products/hong-loa-treble-b-c-speakers-me45.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e4f35715-e0d8-5526-b512-d3280dd81d7c",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "HỌNG LOA TREBLE B&C SPEAKERS ME20",
    "slug": "hong-loa-treble-b-c-speakers-me20",
    "sku": "VB-1038353383",
    "brand": "B&C SPEAKERS",
    "description": "HỌNG KÈN B&C SPEAKERS ME20 – ĐẦU VÀO 1 INCH EXIT B&C Speakers ME20 là họng kèn dành cho compression driver có đầu ra 1 inch exit. Sản phẩm có góc phủ 90 ° × 60 ° , tần số cutoff 1.5 kHz và thân họng bằng Nhôm đúc , phù hợp cho các thiết kế loa PA chuyên nghiệp. ĐIỂM NỔI BẬT CỦA B&C ME20 Đường kính đầu vào 1\" Góc phủ danh định 90° x 60° Biên dạng kèn Exponential Khả năng tải tốt xuống đến 1.5 kHz KIỂM SOÁT GÓC PHỦ Góc phủ 90 ° × 60 ° giúp xác định khu vực bao phủ của dải cao. Khi thiết kế hệ thốn",
    "sale_enabled": true,
    "sale_price": 895860,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/hong-loa-treble-b-c-speakers-me20.png",
    "images": [
      {
        "id": "img-1038353383",
        "image_url": "/images/products/hong-loa-treble-b-c-speakers-me20.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "391b6b60-d52f-5cfe-af9b-78cbdc5f1375",
    "category_id": "8ce0d4fb-2b1a-562f-b551-d92841a1f1a9",
    "category_name": "Phụ Kiện Loa Rời",
    "category_slug": "phu-kien-loa-roi",
    "name": "DIAPHRAGM P.AUDIO DP450",
    "slug": "diaphragm-dp450",
    "sku": "DP-450",
    "brand": "P.AUDIO",
    "description": "DIAPHRAGM DP450 #### Diaphragm dành cho củ treble BM-D450S chính hãng P.AUDIO",
    "sale_enabled": true,
    "sale_price": 788400,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/diaphragm-dp450.png",
    "images": [
      {
        "id": "img-1038353379",
        "image_url": "/images/products/diaphragm-dp450.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "95e755f7-6ef2-5747-9ee9-ffe919acb6c5",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "CỦ TREBLE P.AUDIO SD-75BF",
    "slug": "cu-treble-p-audio-sd-75bf",
    "sku": "SD-75BF",
    "brand": "P.AUDIO",
    "description": "CỦ TREBLE P.AUDIO SD-75BF ĐVT: CẶP #### Băng tần rộng. Đường kính ngõ ra 1.4” Công suất đỉnh: 400W Diaphragm titanium đường kính 3” bảo đảm loa đạt công suất cao và cung cấp đáp tuyến băng tần tốt hơn. Khung loa được bắt bulông Nam châm Ferrite #### Công suất 100W Trở kháng 8 Ω Độ nhạy 108 dB Dãy tần số 800-20000 Hz Nam châm Ferrite Khối lượng tịnh 2.8 kg Kích thước 356 x 356 x 250 mm",
    "sale_enabled": true,
    "sale_price": 6501222,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/cu-treble-p-audio-sd-75bf.png",
    "images": [
      {
        "id": "img-1038353376",
        "image_url": "/images/products/cu-treble-p-audio-sd-75bf.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a2bf2531-119b-520f-b930-141a5e00cdd2",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "CỦ TREBLE P.AUDIO BM-D460",
    "slug": "bm-d460",
    "sku": "BM-D460",
    "brand": "P.AUDIO",
    "description": "LOA RỜI P.AUDIO BM-D460 ĐVT: CẶP #### Nam châm Ferrite Voice Coil: 44 Dây Coil nhôm Độ nhạy 108 db. #### Công suất 80 W (AES) Trở kháng 8 Ω Độ nhạy 108 dB Dãy tần số 1500 - 18kHz Nam châm Ferrite Khối lượng tịnh 2,5 kg",
    "sale_enabled": true,
    "sale_price": 3088800,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/bm-d460.png",
    "images": [
      {
        "id": "img-1038353361",
        "image_url": "/images/products/bm-d460.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "182da50c-b22c-5169-85d1-7eccc1067ed2",
    "category_id": "f55f5e66-3505-5e00-a0ba-97b0b5a3f5fb",
    "category_name": "Loa Rời & Củ Treble",
    "category_slug": "loa-roi",
    "name": "8FW51 – Loa bass rời B&C Speakers 2 tấc 8 inch",
    "slug": "loa-roi-bc-speakers-8fw51",
    "sku": "8FW51",
    "brand": "B&C SPEAKERS",
    "description": "B&C SPEAKERS 8FW51 – CỦ LOA WOOFER 8 INCH B&C Speakers 8FW51 là củ loa woofer 8 inch phiên bản 8 Ω dành cho hệ thống PA chuyên nghiệp. Sản phẩm có công suất danh định 200 W , công suất chương trình liên tục 400 W , độ nhạy 97 dB và dải tần 70 Hz - 5000 Hz , kết hợp cụm nam châm Ferrite . ĐIỂM NỔI BẬT CỦA B&C 8FW51 Công suất chương trình liên tục 400 W Voice coil Đồng 51 mm (2 in) Dải tần đáp ứng 70 - 5000 Hz Độ nhạy 97 dB Chụp đồng giảm cảm kháng, hỗ trợ mở rộng dải cao Khe voice coil thông gió ",
    "sale_enabled": true,
    "sale_price": 5550120,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/loa-roi-bc-speakers-8fw51.jpg",
    "images": [
      {
        "id": "img-1038353360",
        "image_url": "/images/products/loa-roi-bc-speakers-8fw51.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "82f59192-af02-58cd-b293-fbc9b67adf02",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "Micro Thu Âm SENNHEISER MK4",
    "slug": "micro-thu-am-sennheiser-mk4",
    "sku": "Sennheiser_MK4",
    "brand": "SENNHEISER",
    "description": "Micro thu âm Sennheiser MK 4 – Micro condenser màng lớn cho Vocal và Studio Sennheiser MK 4 là micro true condenser màng lớn được phát triển cho nhu cầu thu âm vocal, nhạc cụ, project studio và home studio. Sản phẩm sử dụng capsule 1 inch, hướng thu cardioid, độ nhạy cao 25 mV/Pa và mức self-noise chỉ 10 dB(A), cho phép ghi lại những chi tiết nhỏ của giọng hát và nhạc cụ với độ rõ cao. Khác với các micro USB all-in-one, Sennheiser MK 4 sử dụng kết nối XLR và nguồn phantom 48V , phù hợp với người",
    "sale_enabled": true,
    "sale_price": 10260000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/micro-thu-am-sennheiser-mk4.png",
    "images": [
      {
        "id": "img-1038092803",
        "image_url": "/images/products/micro-thu-am-sennheiser-mk4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "df4f9220-81cc-5473-bc2b-a2c8481d884e",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "GIÁ ĐỠ BỘ THU KHÔNG DÂY SENNHEISER GA 3",
    "slug": "ga-3",
    "sku": "VB-1038092802",
    "brand": "SENNHEISER",
    "description": "Bộ giá đỡ 19 \"cho bộ thu không dây G3 / G4 cố định. #### Bộ giá đỡ 19 \"cho bộ thu không dây G3 / G4 cố định.",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ga-3.png",
    "images": [
      {
        "id": "img-1038092802",
        "image_url": "/images/products/ga-3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c24b3529-cb4e-5027-82cb-715964f185e9",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐẦU MICRO SENNHEISER MMD 845-1BK",
    "slug": "dau-micro-sennheiser-mmd-845-1bk",
    "sku": "VB-1038092800",
    "brand": "SENNHEISER",
    "description": "Đầu Micro Sennheiser MMD 845-1 BK Đầu Micro Dynamic Chuyên Nghiệp Cho Âm Thanh Mạnh Mẽ, Chi Tiết Sennheiser MMD 845-1 BK là đầu micro dynamic cao cấp được thiết kế để mang đến âm thanh rõ ràng, mạnh mẽ cho các buổi biểu diễn trực tiếp và các sự kiện chuyên nghiệp. Với hướng thu supercardioid, MMD 845-1 BK tập trung vào giọng hát từ phía trước, đồng thời loại bỏ tạp âm từ hai bên và phía sau, tạo ra chất lượng âm thanh trong trẻo và sắc nét, phù hợp cho các không gian biểu diễn lớn và môi trường ",
    "sale_enabled": true,
    "sale_price": 2560000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dau-micro-sennheiser-mmd-845-1bk.png",
    "images": [
      {
        "id": "img-1038092800",
        "image_url": "/images/products/dau-micro-sennheiser-mmd-845-1bk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cbc92dde-5fd0-5a7b-8bbc-fafd935ee224",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐẦU MICRO SENNHEISER MMD 835-1BK",
    "slug": "dau-micro-sennheiser-mmd-835-1bk",
    "sku": "VB-1038092799",
    "brand": "SENNHEISER",
    "description": "Đầu Micro Sennheiser MMD 835-1 BK Đầu Micro Dynamic Đa Năng Cho Âm Thanh Rõ Ràng, Ấm Áp Sennheiser MMD 835-1 BK là đầu micro dynamic chất lượng cao, được thiết kế để đáp ứng nhu cầu thu âm chuyên nghiệp trong các buổi biểu diễn trực tiếp, hội nghị và các sự kiện. Với hướng thu cardioid, MMD 835-1 BK giúp tập trung vào âm thanh từ nguồn phía trước và giảm thiểu các tạp âm từ hai bên và phía sau. Đầu micro này là lựa chọn lý tưởng cho các nghệ sĩ, diễn giả và những người cần giọng nói rõ ràng, tru",
    "sale_enabled": true,
    "sale_price": 2720000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/dau-micro-sennheiser-mmd-835-1bk.png",
    "images": [
      {
        "id": "img-1038092799",
        "image_url": "/images/products/dau-micro-sennheiser-mmd-835-1bk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fe36081e-f78f-50f9-beb7-e95de8a0c0aa",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "GIÁ ĐỠ BỘ THU KHÔNG DÂY SENNHEISER GA 4",
    "slug": "ga-4",
    "sku": "VB-1038092797",
    "brand": "SENNHEISER",
    "description": "Rackmount Thiết lập cho bộ thu tĩnh không dây D1 EM tiến hóa và SpeechLine Digital Wireless. #### Rackmount Thiết lập cho bộ thu tĩnh không dây D1 EM tiến hóa và SpeechLine Digital Wireless.",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ga-4.png",
    "images": [
      {
        "id": "img-1038092797",
        "image_url": "/images/products/ga-4.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ce0125e3-7edc-5a66-88e9-700c2c7fc5a0",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER ME 3 II",
    "slug": "me-3-ii",
    "sku": "VB-1038092796",
    "brand": "SENNHEISER",
    "description": "Headmic với đầu mic cardioid để sử dụng với hệ thống không dây. #### Headmic với đầu mic cardioid để sử dụng với hệ thống không dây. #### Microphone pre-polarized condenser Max. sound pressure level 150 dB SPL Pick-up pattern cardioid Sensitivity 1.6 mV/Pa",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/me-3-ii.png",
    "images": [
      {
        "id": "img-1038092796",
        "image_url": "/images/products/me-3-ii.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4b5f64c8-7ecd-5190-9a16-8f8647542428",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER ew D1-845S-NH-NT",
    "slug": "ew-d1-845s-nh-nt",
    "sku": "VB-1038092785",
    "brand": "SENNHEISER",
    "description": "Evolution không dây D1 Vocal-Set với viên nang siêu cardioid Evolution e845 huyền thoại và công tắc tắt tiếng để sử dụng trên sân khấu trực tiếp. #### Evolution không dây D1 Vocal-Set với viên nang siêu cardioid Evolution e845 huyền thoại và công tắc tắt tiếng để sử dụng trên sân khấu trực tiếp. Evolution không dây D1 là một hệ thống truyền âm thanh kỹ thuật số không có sự thỏa hiệp về độ tin cậy, chất lượng âm thanh hoặc sự thân thiện với người dùng. ew D1 là số một cho mọi buổi biểu diễn và sự",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-d1-845s-nh-nt.png",
    "images": [
      {
        "id": "img-1038092785",
        "image_url": "/images/products/ew-d1-845s-nh-nt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "aa4831b6-1e6a-5c0f-9a77-c663c827e60b",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER ew D1-ME2-NH-NT",
    "slug": "ew-d1-me2-nh-nt",
    "sku": "VB-1038092781",
    "brand": "SENNHEISER",
    "description": "Tiến hóa không dây D1 Lavalier-Set với micrô lavalier ME 2 để sử dụng trên sân khấu trực tiếp. #### Tiến hóa không dây D1 Lavalier-Set với micrô lavalier ME 2 để sử dụng trên sân khấu trực tiếp. Evolution không dây D1 là một hệ thống truyền âm thanh kỹ thuật số không có sự thỏa hiệp về độ tin cậy, chất lượng âm thanh hoặc sự thân thiện với người dùng. ew D1 là số một cho mọi buổi biểu diễn và sự kiện trực tiếp khi bạn chỉ cần dựa vào sự sáng chói thuần túy. Nó có thể chạy song song tới 15 đường ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-d1-me2-nh-nt.png",
    "images": [
      {
        "id": "img-1038092781",
        "image_url": "/images/products/ew-d1-me2-nh-nt.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f58d02dd-c1b6-5d86-8f35-4b3943277ee7",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E965",
    "slug": "sennheiser-e965",
    "sku": "VB-1038092780",
    "brand": "SENNHEISER",
    "description": "MICRO CÓ DÂY SENNHEISER E965 Micro có dây Sennheiser e965 là sự lựa chọn hoàn hảo cho các nghệ sĩ và chuyên gia âm thanh yêu cầu chất lượng âm thanh vượt trội. Được thiết kế cho các buổi biểu diễn trực tiếp và thu âm chuyên nghiệp, e965 mang đến âm thanh trung thực, chi tiết và mạnh mẽ, đảm bảo mỗi nốt nhạc và sắc thái giọng hát đều được tái hiện một cách sống động nhất. Đặc Điểm Nổi Bật của Sennheiser e965 Hai Mô Hình Thu Linh Hoạt (Cardioid và Supercardioid): Dễ dàng chuyển đổi giữa hai mô hìn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheiser-e965.png",
    "images": [
      {
        "id": "img-1038092780",
        "image_url": "/images/products/sennheiser-e965.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "e28947d7-cc22-5b4c-a4c4-719cbe579096",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E945",
    "slug": "sennheiser-e945",
    "sku": "VB-1038092779",
    "brand": "SENNHEISER",
    "description": "MICRO DÂY SENNHEISER E945 Micro Sennheiser e945 là micro dynamic Super-cardioid giúp thu âm tốt và cắt được âm lượng lớn trên sân khấu. Micro Sennheiser e 945 giúp giảm hiện tượng hú (feedback) lý tưởng cho các buổi thuyết trình, hội nghị, hợp xướng, phòng tập và sân khấu. Dễ dàng loại bỏ tiếng ồn xung quanh. Tái tạo tần số cao tuyệt vời. #### TÍNH NĂNG, ĐẶC ĐIỂM MICRO DÂY CẦM TAY SENNHEISER E945 Micro dynamic super-cardioid cho giọng nói và giọng hát. Cắt được âm lượng lớn trên sân khấu Giúp th",
    "sale_enabled": true,
    "sale_price": 4540000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheiser-e945.png",
    "images": [
      {
        "id": "img-1038092779",
        "image_url": "/images/products/sennheiser-e945.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3b7e5f5e-7e7e-5a5c-a41f-4726bf76f377",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E935",
    "slug": "sennheiser-e935",
    "sku": "E935",
    "brand": "SENNHEISER",
    "description": "MICRO DÂY SENNHEISER e935 Micro Sennheiser e935 là micro dynamic cardioid giúp thu âm tốt và cắt được âm lượng lớn trên sân khấu. Micro Sennheiser e 935 giúp giảm hiện tượng hú (feedback) lý tưởng cho các buổi thuyết trình, hội nghị, hợp xướng, phòng tập và sân khấu. Dễ dàng loại bỏ tiếng ồn xung quanh. Tái tạo tần số cao tuyệt vời. #### Micro Sennheiser e935 đáp ứng tần số cao mở rộng và với đầu thu cardioid cho đầu ra tín hiệu cao hơn, cắt giảm các mức âm thanh cao trên sân khấu. Phản ứng âm s",
    "sale_enabled": true,
    "sale_price": 4540000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheiser-e935.png",
    "images": [
      {
        "id": "img-1038092778",
        "image_url": "/images/products/sennheiser-e935.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a38d8a8b-f24d-55e7-9555-4850ca3079c7",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E914",
    "slug": "e914",
    "sku": "VB-1038092777",
    "brand": "SENNHEISER",
    "description": "Micrô ngưng tụ cardioid cao cấp dành cho các ứng dụng đòi hỏi khắt khe. Đặc tính âm thanh vượt trội cho các ứng dụng phức tạp như guitar acoustic, chũm chọe, bộ gõ, overhead, dàn nhạc và đại dương cầm. #### Micrô ngưng tụ cardioid cao cấp dành cho các ứng dụng đòi hỏi khắt khe. Đặc tính âm thanh vượt trội cho các ứng dụng phức tạp như guitar acoustic, chũm chọe, bộ gõ, overhead, dàn nhạc và đại dương cầm. E 914 là micrô tụ điện cao cấp dành cho các ứng dụng đòi hỏi khắt khe. Đặc tính âm thanh nổ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e914.png",
    "images": [
      {
        "id": "img-1038092777",
        "image_url": "/images/products/e914.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "56591c76-64d3-5ed3-a20e-1929faae6f61",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO ĐỂ BÀN SENNHEISER E912",
    "slug": "e912-sbk",
    "sku": "4",
    "brand": "SENNHEISER",
    "description": "Micro Sennheiser e912 – Giải Pháp Thu Âm Tối Ưu Cho Hội Trường, Sân Khấu và Hội Nghị Sennheiser là thương hiệu nổi tiếng toàn cầu trong lĩnh vực thiết bị âm thanh, với các sản phẩm chất lượng cao phục vụ cho cả ngành công nghiệp giải trí và nhu cầu cá nhân. Một trong những sản phẩm nổi bật của Sennheiser là micro e912, dòng micro boundary chuyên dụng với khả năng thu âm tuyệt vời, phù hợp cho các hội nghị, sân khấu biểu diễn, nhà thờ, và các không gian lớn yêu cầu chất lượng âm thanh cao. #### 1",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e912-sbk.png",
    "images": [
      {
        "id": "img-1038092776",
        "image_url": "/images/products/e912-sbk.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8a3438d1-8f8a-5d72-86be-1f79610b0206",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E908 D",
    "slug": "e908-d",
    "sku": "VB-1038092774",
    "brand": "SENNHEISER",
    "description": "Bộ ngưng tụ cardioid cổ ngỗng chuyên nghiệp cho độ nét tuyệt vời. Đối với nhạc cụ hơi, congas, trống có hệ thống treo nổi tự do. Dễ dàng gắn / định vị. Preamp thông minh cho cáp. Điện ma. Kiểm tra mức độ. #### Bộ ngưng tụ cardioid cổ ngỗng chuyên nghiệp cho độ nét tuyệt vời. Đối với nhạc cụ hơi, congas, trống có hệ thống treo nổi tự do. Dễ dàng gắn / định vị. Preamp thông minh cho cáp. Điện ma. Kiểm tra mức độ. Micrô nhạc cụ Evolution e 908 có sẵn trong bốn biến thể: như e 908 D cho trống và bộ ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e908-d.png",
    "images": [
      {
        "id": "img-1038092774",
        "image_url": "/images/products/e908-d.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "baec468c-ab6d-527b-8d40-e29013f1fa45",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E908 BEW",
    "slug": "e908-bew",
    "sku": "VB-1038092773",
    "brand": "SENNHEISER",
    "description": "Bộ ngưng tụ cardioid cổ ngỗng chuyên nghiệp cho độ nét tuyệt vời. Đối với nhạc cụ hơi, congas, trống có hệ thống treo nổi tự do. Dễ dàng gắn / định vị. Preamp thông minh cho cáp. Điện ma. Kiểm tra mức độ. #### Bộ ngưng tụ cardioid cổ ngỗng chuyên nghiệp cho độ nét tuyệt vời. Đối với nhạc cụ hơi, congas, trống có hệ thống treo nổi tự do. Dễ dàng gắn / định vị. Preamp thông minh cho cáp. Điện ma. Kiểm tra mức độ. Micrô nhạc cụ Evolution e 908 có sẵn trong bốn biến thể: như e 908 D cho trống và bộ ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e908-bew.png",
    "images": [
      {
        "id": "img-1038092773",
        "image_url": "/images/products/e908-bew.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c0f2cce3-6336-53ac-8802-62f9016e0267",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E908B",
    "slug": "e908b",
    "sku": "VB-1038092772",
    "brand": "SENNHEISER",
    "description": "Bộ ngưng tụ cardioid cổ ngỗng chuyên nghiệp cho độ nét tuyệt vời. Đối với nhạc cụ hơi, congas, trống có hệ thống treo nổi tự do. Dễ dàng gắn / định vị. Preamp thông minh cho cáp. Điện ma. Kiểm tra mức độ. #### Bộ ngưng tụ cardioid cổ ngỗng chuyên nghiệp cho độ nét tuyệt vời. Đối với nhạc cụ hơi, congas, trống có hệ thống treo nổi tự do. Dễ dàng gắn / định vị. Preamp thông minh cho cáp. Điện ma. Kiểm tra mức độ. Micrô nhạc cụ Evolution e 908 có sẵn trong bốn biến thể: như e 908 D cho trống và bộ ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e908b.png",
    "images": [
      {
        "id": "img-1038092772",
        "image_url": "/images/products/e908b.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1e7d6db3-15c5-5706-920c-9e7507469d65",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E906",
    "slug": "e906",
    "sku": "VB-1038092771",
    "brand": "SENNHEISER",
    "description": "Micrô công cụ năng động, siêu cardioid chuyên nghiệp với bộ lọc hiện diện có thể chuyển đổi. Đa năng để xử lý trống, bộ gõ và bộ khuếch đại guitar. #### Micrô công cụ năng động, siêu cardioid chuyên nghiệp với bộ lọc hiện diện có thể chuyển đổi. Đa năng để xử lý trống, bộ gõ và bộ khuếch đại guitar. Micrô nhạc cụ cardioid e 906 được thiết kế đặc biệt cho amply guitar và cũng rất tuyệt vời cho bộ gõ và kèn. Âm thanh sống động, đầy đủ Tấn công rất nhanh Hình dạng phẳng là lý tưởng để tạo khuôn mặt",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e906.png",
    "images": [
      {
        "id": "img-1038092771",
        "image_url": "/images/products/e906.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "74db227e-7ea0-5f68-b0f4-672e9cdf72be",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E904",
    "slug": "e904",
    "sku": "VB-1038092769",
    "brand": "SENNHEISER",
    "description": "Micrr Sennheiser e904: Microphone Dynamic Chuyên Dụng Cho Trống và Bộ Gõ Sennheiser e 904 là một microphone động nổi bật, được thiết kế đặc biệt cho việc thu âm trống và bộ gõ với âm thanh sống động và chi tiết. Được tin dùng bởi các nhạc sĩ và kỹ sư âm thanh chuyên nghiệp, e 904 mang lại khả năng thu âm mạnh mẽ với thiết kế nhỏ gọn và bền bỉ. #### Tính Năng Nổi Bật Âm Thanh Ấn Tượng : Tái hiện âm trống và bộ gõ đầy đủ, chi tiết, và sống động. Độ Nhạy Phản Hồi Cao : Tấn công nhanh chóng, ghi lại",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e904.png",
    "images": [
      {
        "id": "img-1038092769",
        "image_url": "/images/products/e904.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9f806e0b-a58a-5184-ba1c-fb3e495666fd",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E902",
    "slug": "e902",
    "sku": "VB-1038092768",
    "brand": "SENNHEISER",
    "description": "Micrô nhạc cụ bass cardioid năng động với giá đỡ tích hợp. Được thiết kế cho các tần số sâu như trống kick, amp guitar bass và tuba. Giảm âm trung để làm nổi bật âm cao cấp và âm trầm. Nhà ở chắc chắn. #### Micrô nhạc cụ bass cardioid năng động với giá đỡ tích hợp. Được thiết kế cho các tần số sâu như trống kick, amp guitar bass và tuba. Giảm âm trung để làm nổi bật âm cao cấp và âm trầm. Nhà ở chắc chắn. Cardioid e 902 là một micro nhạc cụ động được thiết kế đặc biệt cho các nhạc cụ có tần số t",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e902.png",
    "images": [
      {
        "id": "img-1038092768",
        "image_url": "/images/products/e902.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "af612df8-98d2-58bb-8a8d-2fa461798af8",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E901",
    "slug": "e901",
    "sku": "VB-1038092767",
    "brand": "SENNHEISER",
    "description": "Micrô là Mic Condenser Boundary dành cho bộ trống hoặc những nhạc cụ có tần số thấp. Half-cardioid cho âm thanh chính xác, nhanh và trung thực từ trống kick. Ngoài ra cho bàn hội nghị, bục, bàn thờ, sân khấu, đàn piano, bộ gõ. Phản ứng toàn thân. #### Micrô là Mic Condenser Boundary dành cho bộ trống hoặc những nhạc cụ có tần số thấp. Half-cardioid cho âm thanh chính xác, nhanh và trung thực từ trống kick. Ngoài ra cho bàn hội nghị, bục, bàn thờ, sân khấu, đàn piano, bộ gõ. Phản ứng toàn thân. B",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e901.png",
    "images": [
      {
        "id": "img-1038092767",
        "image_url": "/images/products/e901.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9b004b04-e110-5a52-8c26-e6ebfbab35cf",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E 865-S",
    "slug": "sennheiser-e865s",
    "sku": "e865S",
    "brand": "SENNHEISER",
    "description": "MICRO SENNHEISER e 865-S Micro dây Sennheiser e 865-S là dòng micro condenser chuyên dụng cho vocal, giọng hát trình diễn live trên sân khấu cũng như các phòng thu, đảm bảo sự chính xác về âm sắc để các soundman và kỹ thuật viên âm thanh cân chỉnh tối ưu nhất. #### Bên cạnh các model phổ biến được sử dụng nhiều như Micro dây Sennheiser e835S, e845S... thì model Micro dây Sennheiser E865S cũng là lựa chọn rất tốt dành cho các vocal của các band nhạc, các hệ thống âm thanh phòng trà, phòng thu giọ",
    "sale_enabled": true,
    "sale_price": 5706000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheiser-e865s.png",
    "images": [
      {
        "id": "img-1038092766",
        "image_url": "/images/products/sennheiser-e865s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b98dd544-edcb-59b3-83c9-52751d3e7f9a",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E 845-S",
    "slug": "sennheiser-e845s",
    "sku": "E845S",
    "brand": "SENNHEISER",
    "description": "MICRO SENNHEISER e 845-S Micro Sennheiser e 845 là micro dynamic Super-cardioid giúp thu âm tốt và cắt được âm lượng lớn trên sân khấu. Micro Sennheiser e 845 giúp giảm hiện tượng hú (feedback) lý tưởng cho các buổi thuyết trình, hội nghị, hợp xướng, phòng tập và sân khấu. Dễ dàng loại bỏ tiếng ồn xung quanh. Tái tạo tần số cao tuyệt vời. #### Micro Sennheiser e 845 đáp ứng tần số cao mở rộng và với đầu thu super cardioid cho đầu ra tín hiệu cao hơn, cắt giảm các mức âm thanh cao trên sân khấu. ",
    "sale_enabled": true,
    "sale_price": 2300000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheiser-e845s.png",
    "images": [
      {
        "id": "img-1038092765",
        "image_url": "/images/products/sennheiser-e845s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "4b777dfa-b988-5cd2-adf3-e1cf11e28632",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO CÓ DÂY SENNHEISER E 835-S",
    "slug": "sennheise-e835s",
    "sku": "e835S",
    "brand": "SENNHEISER",
    "description": "MICRO SENNHEISER e 835-S Micro Sennheiser e835 là micro dynamic cardioid giúp thu âm tốt và cắt được âm lượng lớn trên sân khấu. Micro Sennheiser e835 chuyên dụng cho việc thu âm tại nhà, hát karaoke, sử dụng trong nhà thờ, chùa chiềng, sử dụng trong phòng thu bán chuyên nghiệp hoặc hát trực tiếp trên sân khấu. #### Micro e 835-S của Sennheiser là lựa chọn hoàn hảo cho các nghệ sĩ và nhà sản xuất âm nhạc chuyên nghiệp. Với thiết kế cardioid dynamic, e 835-S giúp tái tạo âm thanh rõ ràng, chân th",
    "sale_enabled": true,
    "sale_price": 2300000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheise-e835s.png",
    "images": [
      {
        "id": "img-1038092764",
        "image_url": "/images/products/sennheise-e835s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "501eb5fb-dc98-5e0c-b6cf-c1a911dd7284",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E614",
    "slug": "e614",
    "sku": "VB-1038092760",
    "brand": "SENNHEISER",
    "description": "Micrô ngưng tụ điện tử siêu tim mạch cho các bản ghi âm nhạc cụ đòi hỏi và các buổi biểu diễn tạo ra tần số mở rộng, xử lý SPL cao và phản hồi thoáng qua. Đối với gió, dây và ghi âm tại nhà. #### Micrô ngưng tụ điện tử siêu tim mạch cho các bản ghi âm nhạc cụ đòi hỏi và các buổi biểu diễn tạo ra tần số mở rộng, xử lý SPL cao và phản hồi thoáng qua. Đối với gió, dây và ghi âm tại nhà. E 614 là một micrô tụ điện siêu cardioid, được thiết kế để ghi âm nhạc cụ và trình diễn đòi hỏi đáp ứng tần số mở",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e614.jpg",
    "images": [
      {
        "id": "img-1038092760",
        "image_url": "/images/products/e614.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f71c22b6-69ff-557b-bc96-e154261d1d0d",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E609",
    "slug": "e609",
    "sku": "VB-1038092759",
    "brand": "SENNHEISER",
    "description": "Micrô nhạc cụ siêu cardioid màu bạc được thiết kế để đánh ca-bin ghi-ta trực diện và cực kỳ gần với nguồn phát. Cung cấp khả năng cách ly khỏi các tín hiệu trên sân khấu khác. Cũng thích hợp cho việc đúc trống, đặc biệt là toms. #### Micrô nhạc cụ siêu cardioid màu bạc được thiết kế để đánh ca-bin ghi-ta trực diện và cực kỳ gần với nguồn phát. Cung cấp khả năng cách ly khỏi các tín hiệu trên sân khấu khác. Cũng thích hợp cho việc đúc trống, đặc biệt là toms. Ngựa làm việc chắc chắn với hình dạng",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e609.jpg",
    "images": [
      {
        "id": "img-1038092759",
        "image_url": "/images/products/e609.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "b666878e-ef14-584d-86ba-3e3958331b4e",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E608",
    "slug": "e608",
    "sku": "VB-1038092758",
    "brand": "SENNHEISER",
    "description": "Sennheiser e 608 Dynamic Instrument Microphone là một micro thu nhỏ chuyên dùng để chụp các nhạc cụ gió, đồng thau, bộ gõ và trống. E 608 có phần tử siêu nhỏ, được gắn trên cổ ngỗng có thể điều chỉnh được. Các cổ ngỗng gắn kết cho phép vị trí kín đáo trên các công cụ và điều chỉnh vị trí dễ dàng. #### Sennheiser e 608 Dynamic Instrument Microphone là một micro thu nhỏ chuyên dùng để chụp các nhạc cụ gió, đồng thau, bộ gõ và trống. E 608 có phần tử siêu nhỏ, được gắn trên cổ ngỗng có thể điều chỉ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e608.png",
    "images": [
      {
        "id": "img-1038092758",
        "image_url": "/images/products/e608.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "42264817-c8c0-5031-9d9e-0f5b84397d23",
    "category_id": "bad94544-008b-5cda-9cf1-3163e9a8407a",
    "category_name": "Micro Có Dây & Phòng Thu",
    "category_slug": "micro-co-day",
    "name": "MICRO NHẠC CỤ SENNHEISER E604",
    "slug": "e604",
    "sku": "VB-1038092755",
    "brand": "SENNHEISER",
    "description": "Micrô nhạc cụ cardioid động nhỏ gọn tương thích với toms, snares và bộ gõ. Clips-on nhanh chóng và dễ dàng ở bất cứ đâu bạn chọn. #### Micrô nhạc cụ cardioid động nhỏ gọn tương thích với toms, snares và bộ gõ. Clips-on nhanh chóng và dễ dàng ở bất cứ đâu bạn chọn. Đáp ứng tần số và kiểu thu nạp cardioid được tối ưu hóa cho bộ trống và chế tạo nhạc cụ gõ khác, đồng thời tạo ra kết quả đặc biệt trên tất cả các dạng đồng thau và gió gỗ. Chân đế tích hợp vít gắn trực tiếp vào chân đế mic và kẹp kèm ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/e604.png",
    "images": [
      {
        "id": "img-1038092755",
        "image_url": "/images/products/e604.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fd0b1af4-5710-5753-be06-6939db77e134",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE SENNHEISER HD 650",
    "slug": "hd-650",
    "sku": "VB-1038092748",
    "brand": "SENNHEISER",
    "description": "HD 650 - Một chuẩn mực cho âm thanh đắm chìm toàn diện, HD 650 tái tạo các chi tiết tinh tế trong âm nhạc của bạn với sự tự tin như những điểm nổi bật. Với một chữ ký linh hoạt được điều chỉnh trong nhiều giờ nghe không mệt mỏi, đây là tai nghe phù hợp để sử dụng khi âm nhạc quan trọng nhất. #### HD 650 - Một chuẩn mực cho âm thanh đắm chìm toàn diện, HD 650 tái tạo các chi tiết tinh tế trong âm nhạc của bạn với sự tự tin như những điểm nổi bật. Với một chữ ký linh hoạt được điều chỉnh trong nhi",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hd-650.jpg",
    "images": [
      {
        "id": "img-1038092748",
        "image_url": "/images/products/hd-650.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5cf67639-461f-5874-87e7-f396c210a4c2",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE SENNHEISER HD 280 PRO",
    "slug": "hd-280-pro",
    "sku": "VB-1038092747",
    "brand": "SENNHEISER",
    "description": "Tai nghe ôm sát, kín nhất của Sennheiser sẽ được giới thiệu trong nhiều năm. Được thiết kế để đáp ứng nhu cầu của môi trường chuyên nghiệp. #### „The sound is perfect. I mean, absolutely.“ Tai nghe ôm sát, kín nhất của Sennheiser sẽ được giới thiệu trong nhiều năm. Được thiết kế để đáp ứng nhu cầu của môi trường chuyên nghiệp. HD 280 Pro là tai nghe ôm sát, kín đáo nhất của Sennheiser sẽ được giới thiệu trong nhiều năm. Được thiết kế để đáp ứng nhu cầu của môi trường chuyên nghiệp, HD 280 Pro tự",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/hd-280-pro.jpg",
    "images": [
      {
        "id": "img-1038092747",
        "image_url": "/images/products/hd-280-pro.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fd5f844e-3525-54af-827d-edaacfdb9d3a",
    "category_id": "177b625b-6fcf-5842-8370-bb96fa37c8c6",
    "category_name": "Tai Nghe DJ & Kiểm Âm",
    "category_slug": "headphones-dj",
    "name": "TAI NGHE SENNHEISER EH 250",
    "slug": "eh-250",
    "sku": "VB-1038092739",
    "brand": "SENNHEISER",
    "description": "Với tai nghe eH 250, Sennheiser cung cấp một lựa chọn tai nghe chất lượng cao với sự thoải mái trong tâm trí. Tai nghe đệm này mang lại hình ảnh âm thanh cân bằng với sự nhấn mạnh tinh tế vào phản ứng âm trầm, khiến chúng trở thành lựa chọn tuyệt vời để sử dụng cho DJ và cũng phù hợp với việc sản xuất bài hát. #### Với tai nghe eH 250, Sennheiser cung cấp một lựa chọn tai nghe chất lượng cao với sự thoải mái trong tâm trí. Tai nghe đệm này mang lại hình ảnh âm thanh cân bằng với sự nhấn mạnh tin",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/eh-250.png",
    "images": [
      {
        "id": "img-1038092739",
        "image_url": "/images/products/eh-250.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0003a59b-1520-5616-8027-0d5202f26638",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "MICRO GÀI ĐẦU SENNHEISER HSP 2 EW",
    "slug": "micro-gai-dau-sennheiser-hsp-2-ew",
    "sku": "VB-1038092735",
    "brand": "SENNHEISER",
    "description": "Micro Gài Đầu Sennheiser HSP 2-ew-3 Micro Condenser Độ Nhạy Cao Cho Âm Thanh Chuyên Nghiệp Sennheiser HSP 2-ew-3 là micro gài đầu cao cấp, được thiết kế cho các ứng dụng yêu cầu âm thanh rõ nét, độ nhạy cao và tính di động. Với thiết kế nhỏ gọn và khả năng gài đầu tiện lợi, HSP 2-ew-3 là lựa chọn lý tưởng cho các buổi thuyết trình, biểu diễn sân khấu, hội nghị, và các chương trình truyền hình. Sản phẩm này mang đến chất lượng âm thanh condenser tuyệt vời và loại bỏ hiệu quả tạp âm xung quanh, ch",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/micro-gai-dau-sennheiser-hsp-2-ew.png",
    "images": [
      {
        "id": "img-1038092735",
        "image_url": "/images/products/micro-gai-dau-sennheiser-hsp-2-ew.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f71fd675-9860-590c-b2af-1299e26c173c",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CẦN MICRO CỔ NGỖNG SENNHEISER MZH 3042",
    "slug": "can-micro-co-ngong-sennheiser-mzh-3042",
    "sku": "MZH 3042",
    "brand": "SENNHEISER",
    "description": "Sennheiser MZH 3042 Cần Microphone Gooseneck Cho Ứng Dụng Chuyên Nghiệp MZH 3042 là cần micro chuyên dụng từ Sennheiser, được thiết kế dành riêng cho các viên micro ME 34, ME 35 và ME 36. Với chiều dài 400 mm, thiết kế linh hoạt và khả năng định vị chính xác, sản phẩm này đáp ứng tốt nhu cầu âm thanh cho các không gian chuyên nghiệp như hội nghị, phòng họp, giảng đường, và phòng thu. Được làm từ kim loại bền bỉ cùng lớp phủ đen mờ sang trọng, MZH 3042 không chỉ đảm bảo độ bền lâu dài mà còn mang",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/can-micro-co-ngong-sennheiser-mzh-3042.png",
    "images": [
      {
        "id": "img-1038092730",
        "image_url": "/images/products/can-micro-co-ngong-sennheiser-mzh-3042.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "6c54a414-e1df-56f9-94ef-64f016f51b43",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CẦN MICRO CỔ NGỖNG SENNHEISER MZH 3015 L",
    "slug": "mzh-3015-l",
    "sku": "VB-1038092729",
    "brand": "SENNHEISER",
    "description": "Cổ ngỗng để sử dụng với ME 34, ME 35 và ME 36 với chiều dài 15 cm. Biến thể có một phần linh hoạt và đi kèm với kết nối XLR-3. Sản phẩm có 2 màu đen và trắng. #### Cổ ngỗng để sử dụng với ME 34, ME 35 và ME 36 với chiều dài 15 cm. Biến thể có một phần linh hoạt và đi kèm với kết nối XLR-3. Sản phẩm có 2 màu đen và trắng. MZH 3015 là một cổ ngỗng bằng kim loại để sử dụng với các đầu micrô ME 34, ME 35 và ME 36. Cổ ngỗng chắc chắn được trang bị đầu ra XLR-3 cân bằng, nổi, cho phép micrô được cấp n",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mzh-3015-l.png",
    "images": [
      {
        "id": "img-1038092729",
        "image_url": "/images/products/mzh-3015-l.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "56619613-116b-56a2-b334-c99987352ec2",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CHÂN MICRO SENNHEISER MZFS 80",
    "slug": "mzfs-80",
    "sku": "VB-1038092726",
    "brand": "SENNHEISER",
    "description": "Giá đỡ sàn 80 cm được sơn đen mờ tương thích với cổ ngỗng Sennheiser MZH. Nếu cần giải pháp không dây, chân đế có thể được kết hợp với bộ phát đa năng SKP 500 G4. Sự kết hợp này thể hiện một giải pháp rất linh hoạt cho nhiều tình huống. #### Giá đỡ sàn 80 cm được sơn đen mờ tương thích với cổ ngỗng Sennheiser MZH. Nếu cần giải pháp không dây, chân đế có thể được kết hợp với bộ phát đa năng SKP 500 G4. Sự kết hợp này thể hiện một giải pháp rất linh hoạt cho nhiều tình huống",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mzfs-80.jpg",
    "images": [
      {
        "id": "img-1038092726",
        "image_url": "/images/products/mzfs-80.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "83ff996e-bda5-5ebc-a84a-e13a19ec8779",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CHÂN MICRO SENNHEISER MZFS 60",
    "slug": "mzfs-60",
    "sku": "VB-1038092725",
    "brand": "SENNHEISER",
    "description": "Giá đỡ sàn 60 cm được sơn đen mờ tương thích với cổ ngỗng Sennheiser MZH. Nếu cần giải pháp không dây, chân đế có thể được kết hợp với bộ phát đa năng SKP 500 G4. Sự kết hợp này thể hiện một giải pháp rất linh hoạt cho nhiều tình huống. #### Giá đỡ sàn 60 cm được sơn đen mờ tương thích với cổ ngỗng Sennheiser MZH. Nếu cần giải pháp không dây, chân đế có thể được kết hợp với bộ phát đa năng SKP 500 G4. Sự kết hợp này thể hiện một giải pháp rất linh hoạt cho nhiều tình huống",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mzfs-60.png",
    "images": [
      {
        "id": "img-1038092725",
        "image_url": "/images/products/mzfs-60.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0f1dca87-e4e0-57b1-838e-53cdcbd47ca1",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "CHÂN MICRO SENNHEISER MZFS 30",
    "slug": "mzfs-30",
    "sku": "VB-1038092724",
    "brand": "SENNHEISER",
    "description": "Giá đỡ sàn 30 cm được sơn đen mờ tương thích với cổ ngỗng Sennheiser MZH. Nếu cần giải pháp không dây, chân đế có thể được kết hợp với bộ phát đa năng SKP 500 G4. Sự kết hợp này thể hiện một giải pháp rất linh hoạt cho nhiều tình huống. #### Giá đỡ sàn 30 cm được sơn đen mờ tương thích với cổ ngỗng Sennheiser MZH. Nếu cần giải pháp không dây, chân đế có thể được kết hợp với bộ phát đa năng SKP 500 G4. Sự kết hợp này thể hiện một giải pháp rất linh hoạt cho nhiều tình huống",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/mzfs-30.jpg",
    "images": [
      {
        "id": "img-1038092724",
        "image_url": "/images/products/mzfs-30.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7f4a0fe3-9e99-508b-8174-65bf95a9f29f",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐẦU MICRO SHOTGUN SENNHEISER ME 36",
    "slug": "dau-micro-shotgun-sennheiser-me-36",
    "sku": "ME36",
    "brand": "SENNHEISER",
    "description": "Senheiser ME36 Viên Micro Định Hướng Chính Xác Cho Chất Lượng Âm Thanh Chuyên Nghiệp ME 36 là viên micro định hướng siêu nhỏ gọn của Sennheiser, được thiết kế tối ưu cho các không gian chuyên nghiệp đòi hỏi chất lượng âm thanh cao, bao gồm hội nghị, giảng đường, và phòng thu. Đây là viên micro lý tưởng dành cho những môi trường cần sự tập trung âm thanh cao độ, loại bỏ tạp âm từ bên ngoài, đảm bảo âm thanh trung thực và rõ nét nhất. ME 36 có thể kết hợp hoàn hảo với các cần micro dòng MZH như MZ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/dau-micro-shotgun-sennheiser-me-36.png",
    "images": [
      {
        "id": "img-1038092722",
        "image_url": "/images/products/dau-micro-shotgun-sennheiser-me-36.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "1f1edc97-87a8-571d-bb49-c064cb11d24e",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐẦU MICRO SENNHEISER ME 35",
    "slug": "dau-micro-sennheiser-me-35",
    "sku": "ME35",
    "brand": "SENNHEISER",
    "description": "Sennheiser ME 35 Viên Micro Định Hướng Đa Năng Cho Âm Thanh Chuyên Nghiệp Sennheiser ME 35 là viên micro định hướng được thiết kế dành riêng cho các nhu cầu thu âm chuyên nghiệp, đáp ứng tốt trong các buổi hội nghị, hội thảo, giảng dạy và thậm chí là trong phòng thu. Sản phẩm này là một phần của dòng micro MZH từ Sennheiser, với khả năng thu âm vượt trội, giúp tối ưu hóa chất lượng âm thanh và giảm thiểu tối đa các tạp âm không mong muốn. Được thiết kế để đi cùng các cần micro linh hoạt như MZH ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 5,
    "is_active": true,
    "image_url": "/images/products/dau-micro-sennheiser-me-35.png",
    "images": [
      {
        "id": "img-1038092721",
        "image_url": "/images/products/dau-micro-sennheiser-me-35.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a5807c7a-e75c-5773-adc5-8cf76ad74a75",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐẾ MICRO SENNHEISER MAT 133 B",
    "slug": "de-micro-sennheiser-mat-133b",
    "sku": "VB-1038092719",
    "brand": "SENNHEISER",
    "description": "Chân Đế Micro Sennheiser MAT 133 B - Giải Pháp Chuyên Nghiệp Cho Hội Nghị Và Sự Kiện Sennheiser MAT 133 B là chân đế micro chất lượng cao, được thiết kế để mang lại sự ổn định và tiện lợi cho các hệ thống micro cổ ngỗng XLR-3 trong môi trường hội nghị và họp mặt chuyên nghiệp. Với khả năng kết nối nhanh chóng và thiết kế bền bỉ, MAT 133 B giúp tối ưu hóa chất lượng âm thanh và mang lại sự tiện lợi tối đa trong quá trình sử dụng. Sản phẩm này có màu đen mờ sang trọng, phù hợp với mọi không gian h",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/de-micro-sennheiser-mat-133b.png",
    "images": [
      {
        "id": "img-1038092719",
        "image_url": "/images/products/de-micro-sennheiser-mat-133b.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "dc79cba6-27f4-544a-92e5-6ac50dd4f07d",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "ĐẾ MICRO SENNHEISER MAT 133-S B",
    "slug": "de-micro-sennheiser-mat-133-s-b",
    "sku": "VB-1038092718",
    "brand": "SENNHEISER",
    "description": "Chân Đế Micro Sennheiser MAT 133-S B Chân Đế Micro Chuyên Nghiệp Với Tính Năng Tắt/Mở Tiện Lợi Sennheiser MAT 133-S B là phiên bản nâng cấp của chân đế micro MAT 133, được trang bị thêm nút tắt/mở giúp người dùng điều khiển âm thanh linh hoạt và tiện lợi hơn. Được thiết kế cho các môi trường chuyên nghiệp như hội nghị, phòng họp và sân khấu biểu diễn, MAT 133-S B mang đến khả năng kết nối tối ưu cho các micro cổ ngỗng XLR-3, đảm bảo tín hiệu âm thanh ổn định và chất lượng cao. Với thiết kế chắc ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/de-micro-sennheiser-mat-133-s-b.png",
    "images": [
      {
        "id": "img-1038092718",
        "image_url": "/images/products/de-micro-sennheiser-mat-133-s-b.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9fb2feed-64b5-5091-b71f-278cc181c548",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "XSW 65-C",
    "slug": "xsw-65-c",
    "sku": "VB-1038092713",
    "brand": "SENNHEISER",
    "description": "Hệ thống cầm tay bao gồm một đầu micro tụ điện siêu phân cực trước phân cực giúp ghi lại mọi chi tiết trong giọng nói của bạn. Máy phát có nút tắt tiếng được chiếu sáng, 10 giờ hoạt động và 960 tần số có thể điều chỉnh. #### Hệ thống cầm tay bao gồm một đầu micro tụ điện siêu phân cực trước phân cực giúp ghi lại mọi chi tiết trong giọng nói của bạn. Máy phát có nút tắt tiếng được chiếu sáng, 10 giờ hoạt động và 960 tần số có thể điều chỉnh. Bộ thu True Diversity hoàn toàn bằng kim loại cung cấp ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xsw-65-c.png",
    "images": [
      {
        "id": "img-1038092713",
        "image_url": "/images/products/xsw-65-c.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "7edaa7cc-3121-56ea-9cbb-67f624c74167",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "XSW 35-B",
    "slug": "xsw-35-b",
    "sku": "XSW 35-B",
    "brand": "SENNHEISER",
    "description": "Chắc chắn, đáng tin cậy và dễ sử dụng, XS Wireless mang âm thanh Sennheiser nổi tiếng đến các địa điểm nhỏ, phòng hội nghị hoặc nhà thờ cúng. #### Chắc chắn, đáng tin cậy và dễ sử dụng, XS Wireless mang âm thanh Sennheiser nổi tiếng đến các địa điểm nhỏ, phòng hội nghị hoặc nhà thờ cúng. Hệ thống cầm tay, có đầu micro e835 nổi tiếng để loại bỏ phản hồi tuyệt vời. Máy phát cầm tay có nút tắt tiếng được chiếu sáng, 10 giờ hoạt động và 960 tần số có thể điều chỉnh. Bộ thu True Diversity hoàn toàn b",
    "sale_enabled": true,
    "sale_price": 10497600,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xsw-35-b.jpg",
    "images": [
      {
        "id": "img-1038092707",
        "image_url": "/images/products/xsw-35-b.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "cfee8ed6-8477-5ac0-8b04-8228bda9cb8c",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EK 100 G3",
    "slug": "ek-100-g3",
    "sku": "VB-1038092669",
    "brand": "SENNHEISER",
    "description": "Các thành phần di động luôn hoạt động dễ dàng nhất khi bạn không cần phải suy nghĩ về chúng. Đây là cơ sở mà EK 100 G3 được phát triển. #### Các thành phần di động luôn hoạt động dễ dàng nhất khi bạn không cần phải suy nghĩ về chúng. Đây là cơ sở mà EK 100 G3 được phát triển. Công nghệ đa dạng thích ứng của nó cung cấp khả năng tiếp nhận tuyệt vời mọi lúc. Bộ thu này được thiết kế để gắn chắc chắn vào giày của máy ảnh bằng giá kẹp. EK 100 G3 cũng có thể đồng bộ hóa với máy phát G3 chỉ bằng một n",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ek-100-g3.jpg",
    "images": [
      {
        "id": "img-1038092669",
        "image_url": "/images/products/ek-100-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "830cad11-d6c0-50bc-9e73-97bdf08263fe",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EM 100 G3",
    "slug": "em-100-g3",
    "sku": "VB-1038092668",
    "brand": "SENNHEISER",
    "description": "EM 100 G3 với thiết kế cải tiến và các tính năng mới, bộ thu giá đỡ G3 chắc chắn này đã sẵn sàng lên đường với độ tin cậy truyền dẫn đã được chứng minh và tính linh hoạt đầy cảm hứng. #### EM 100 G3 với thiết kế cải tiến và các tính năng mới, bộ thu giá đỡ G3 chắc chắn này đã sẵn sàng lên đường với độ tin cậy truyền dẫn đã được chứng minh và tính linh hoạt đầy cảm hứng Chế độ kiểm tra âm thanh cho phép bạn kiểm tra âm thanh và tín hiệu RF bất kỳ lúc nào trong quá trình thiết lập. 20 ngân hàng tầ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/em-100-g3.jpg",
    "images": [
      {
        "id": "img-1038092668",
        "image_url": "/images/products/em-100-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2479245d-6e7e-5aaa-807a-6a590762c1e7",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "THIẾT BỊ CHUYỂN TÍN HIỆU KHÔNG DÂY SENNHEISER SKP 100 G3",
    "slug": "skp-100-g3",
    "sku": "VB-1038092667",
    "brand": "SENNHEISER",
    "description": "SKP 100 G3 điều chỉnh công nghệ không dây G3 với thế giới có dây. #### SKP 100 G3 điều chỉnh công nghệ không dây G3 với thế giới có dây. Hãy tưởng tượng sử dụng một micrô có dây và biến nó thành một micrô không dây chỉ bằng cách cắm SKP 100 G3 vào cổng XLR của nó. Có thể bạn muốn gửi tín hiệu từ bảng điều khiển trộn đến bộ thu Sennheiser Evolution G3 xuyên phòng? Không có gì. Với các nâng cấp của G3 như đồng bộ hóa bộ phát không dây và menu dễ điều hướng, SKP 100 G3 đã sẵn sàng để cắm và chạy th",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/skp-100-g3.jpg",
    "images": [
      {
        "id": "img-1038092667",
        "image_url": "/images/products/skp-100-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8b89ffed-62b1-5473-b1da-a474c0f32d24",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER SKM 100-865 G3",
    "slug": "skm-100-865-g3",
    "sku": "VB-1038092666",
    "brand": "SENNHEISER",
    "description": "Kết hợp các tính năng công nghệ cao với thiết lập dễ dàng, SKM 100-865 G3 có một viên nang ngưng tụ tiến hóa cùng với tất cả các lợi ích được nâng cấp của dòng G3. #### Kết hợp các tính năng công nghệ cao với thiết lập dễ dàng, SKM 100-865 G3 có một viên nang ngưng tụ tiến hóa cùng với tất cả các lợi ích được nâng cấp của dòng G3. Chức năng đồng bộ không dây cho phép bộ phát đồng bộ với bộ thu G3 chỉ bằng một nút nhấn đơn giản, giúp việc thiết lập trở nên đơn giản. Đáp ứng tần số mở rộng có nghĩ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/skm-100-865-g3.jpg",
    "images": [
      {
        "id": "img-1038092666",
        "image_url": "/images/products/skm-100-865-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "64983dd4-603c-501e-b3c6-dae25a8278d3",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER SKM 100-845 G3",
    "slug": "skm-100-845-g3",
    "sku": "VB-1038092665",
    "brand": "SENNHEISER",
    "description": "SKM100-845 G3 nâng tầm với chức năng đồng bộ không thể thiếu. #### SKM100-845 G3 nâng tầm với chức năng đồng bộ không thể thiếu. Máy phát tự động điều chỉnh để phù hợp với máy thu G3 tương ứng chỉ bằng một lần nhấn nút đồng bộ của máy thu. Vỏ ngoài dựa trên dòng Evolution 800, cung cấp âm thanh phong phú đồng thời giảm thiểu nguy cơ phản hồi. Khả năng định hướng của micrô tái tạo giọng nói rõ ràng đồng thời loại bỏ tiếng ồn xung quanh; điều này làm cho nó trở thành một lựa chọn tuyệt vời trong đ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/skm-100-845-g3.jpg",
    "images": [
      {
        "id": "img-1038092665",
        "image_url": "/images/products/skm-100-845-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3fdcfe86-09fc-556c-afdd-9d7d3afa0c45",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER SKM 100-835 G3",
    "slug": "skm-100-835-g3",
    "sku": "VB-1038092664",
    "brand": "SENNHEISER",
    "description": "Giờ đây, với chức năng đồng bộ hồng ngoại, SKM100-835 G3 có thể điều chỉnh đến bộ thu G3 chỉ với một nút nhấn đơn giản. #### Giờ đây, với chức năng đồng bộ hồng ngoại, SKM100-835 G3 có thể điều chỉnh đến bộ thu G3 chỉ với một nút nhấn đơn giản. Tương thích với bất kỳ bộ thu không dây phát triển nào và mọi phong cách giọng hát, sự kết hợp bộ phát / micrô cầm tay này mang đến sự tự do không dây cho cả người biểu diễn và người thuyết trình. Với thiết kế chắc chắn và âm thanh mạnh mẽ, nó rất lý tưởn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/skm-100-835-g3.jpg",
    "images": [
      {
        "id": "img-1038092664",
        "image_url": "/images/products/skm-100-835-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3e97e225-0988-5d24-a7f1-79aace95c6d1",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ PHÁT TÍN HIỆU KHÔNG DÂY SENNHEISER SK 100 G3",
    "slug": "sk-100-g3",
    "sku": "VB-1038092663",
    "brand": "SENNHEISER",
    "description": "Tiêu chuẩn thân máy không dây thậm chí còn tốt hơn bao giờ hết. Sennheiser đã đóng gói nhiều tính năng hữu ích trong trọng lượng 158g của SK 100 G3. SK 100 G3 có màn hình đồ họa dễ đọc, đồng bộ hồng ngoại, danh bạ sạc, giả lập cáp, tắt tiếng RF. menu trực quan và hơn thế nữa. #### Tiêu chuẩn thân máy không dây thậm chí còn tốt hơn bao giờ hết. Sennheiser đã đóng gói nhiều tính năng hữu ích trong trọng lượng 158g của SK 100 G3. SK 100 G3 có màn hình đồ họa dễ đọc, đồng bộ hồng ngoại, danh bạ sạc,",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sk-100-g3.jpg",
    "images": [
      {
        "id": "img-1038092663",
        "image_url": "/images/products/sk-100-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a3f8386b-7165-5279-a484-d0585e64fa3c",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 135-P-G3",
    "slug": "ew-135-p-g3",
    "sku": "VB-1038092661",
    "brand": "SENNHEISER",
    "description": "Một hệ thống cầm tay được thiết kế để vận hành tại hiện trường: EW 135-p G3 là sự lựa chọn hoàn hảo cho các chuyên gia ENG. Micrô không dây cardioid cầm tay chắc chắn cung cấp chất lượng âm thanh chuyên nghiệp cho các cuộc phỏng vấn và báo cáo, ngay cả trong những điều kiện không thuận lợi. Ở cuối đường dẫn tín hiệu không dây của camera là bộ thu phân tập đa dạng thích ứng EK 100 G3 di động và đáng tin cậy. #### Một hệ thống cầm tay được thiết kế để vận hành tại hiện trường: EW 135-p G3 là sự lự",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-135-p-g3.png",
    "images": [
      {
        "id": "img-1038092661",
        "image_url": "/images/products/ew-135-p-g3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9cab191b-53f3-5831-9f1c-1815c379e2c2",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW 165-G3",
    "slug": "ew-165-g3",
    "sku": "VB-1038092657",
    "brand": "SENNHEISER",
    "description": "Công nghệ micrô ngưng tụ được thiết kế cho sân khấu: Vỏ micrô của hệ thống này dựa trên bộ ngưng tụ Evolution e 865 nổi tiếng. Với đáp tuyến tần số rộng và độ nhạy cao, đây là mẫu máy cầm tay ưu tú trong dòng G3 100. #### Công nghệ micrô ngưng tụ được thiết kế cho sân khấu: Vỏ micrô của hệ thống này dựa trên bộ ngưng tụ Evolution e 865 nổi tiếng. Với đáp tuyến tần số rộng và độ nhạy cao, đây là mẫu máy cầm tay ưu tú trong dòng G3 100. Với âm thanh tuyệt vời và cách vận hành đơn giản, hệ thống nà",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-165-g3.png",
    "images": [
      {
        "id": "img-1038092657",
        "image_url": "/images/products/ew-165-g3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "30656e8e-5554-5e2b-bda9-7049e0f8fac6",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER EW 145-G3",
    "slug": "ew-145-g3",
    "sku": "VB-1038092656",
    "brand": "SENNHEISER",
    "description": "Âm thanh tinh khiết: Hệ thống không dây cầm tay có SKM100 G3 được trang bị viên nang siêu cardioid e845 thu được nhiều âm thanh bạn cần hơn trong khi loại bỏ tiếng ồn ngoài trục. Bao gồm kẹp mic và bộ thu True Diversity có thể gắn trên giá đỡ EM100 G3. #### Âm thanh tinh khiết: Hệ thống không dây cầm tay có SKM100 G3 được trang bị viên nang siêu cardioid e845 thu được nhiều âm thanh bạn cần hơn trong khi loại bỏ tiếng ồn ngoài trục. Bao gồm kẹp mic và bộ thu True Diversity có thể gắn trên giá đỡ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-145-g3.jpg",
    "images": [
      {
        "id": "img-1038092656",
        "image_url": "/images/products/ew-145-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "320e827c-5af2-535a-b7cf-707883a0f10d",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 135-G3",
    "slug": "ew-135-g3",
    "sku": "VB-1038092655",
    "brand": "SENNHEISER",
    "description": "Bạn có thể tin tưởng vào một màn trình diễn tuyệt vời với hệ thống vocal ew 135 G3. #### Bạn có thể tin tưởng vào một màn trình diễn tuyệt vời với hệ thống vocal ew 135 G3. Hệ thống không dây cầm tay có SKM 100 G3 được trang bị viên nang năng động tim mạch e835 nổi tiếng. Bao gồm kẹp mic và bộ thu True Diversity có thể gắn trên giá đỡ EM100 với chức năng quét trực quan và đồng bộ hóa để đảm bảo hoạt động không gặp sự cố. #### Frequency range 606...648 Mhz 925...937.5 MHz / Korea 823...865 MHz / ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-135-g3.png",
    "images": [
      {
        "id": "img-1038092655",
        "image_url": "/images/products/ew-135-g3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "dbcd5225-36db-5de2-9a3b-11487cafcf82",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY EW 122-G3",
    "slug": "ew-122-g3",
    "sku": "VB-1038092652",
    "brand": "SENNHEISER",
    "description": "Rời tiếng và dễ dàng trên giọng nói: micrô kẹp cardioid nhỏ gọn trong hệ thống này loại bỏ tiếng ồn phát ra từ bên cạnh. #### Rời tiếng và dễ dàng trên giọng nói: micrô kẹp cardioid nhỏ gọn trong hệ thống này loại bỏ tiếng ồn phát ra từ bên cạnh, đồng nghĩa với việc ít rủi ro phản hồi hơn. Không cần phải nói rất to, giọng nói của người thuyết trình được truyền tải một cách phong phú và đầy đủ. Bộ phát bodypack có các điểm tiếp xúc sạc cho pin sạc tùy chọn. Đồng bộ không dây bodypack với bộ thu b",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-122-g3.jpg",
    "images": [
      {
        "id": "img-1038092652",
        "image_url": "/images/products/ew-122-g3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9f372a37-f7ab-5e0e-bcce-d8a1007fbc41",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CÀI ÁO KHÔNG DÂY SENNHEISER EW 112-G3",
    "slug": "ew-112-g3",
    "sku": "VB-1038092651",
    "brand": "SENNHEISER",
    "description": "Làm cho bài thuyết trình của bạn trở nên sống động. #### Làm cho bài thuyết trình của bạn trở nên sống động. Micrô đa hướng đi kèm cung cấp khả năng tái tạo giọng nói tự nhiên trong khi vẫn nhỏ đến mức khó tin. Bộ phát bodypack có tùy chọn pin sạc để bạn có thể tập trung vào bài thuyết trình của mình - không phải mua pin. Yêu cầu tốt nhất trong công nghệ trình chiếu không dây với thiết lập nhanh chóng, hoạt động thân thiện với người dùng và độ tin cậy tuyệt đối do bộ thu phân tập thực sự. Giờ đâ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-112-g3.png",
    "images": [
      {
        "id": "img-1038092651",
        "image_url": "/images/products/ew-112-g3.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "c3fc313f-c73a-52eb-93b3-9ce718336266",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER XSW 1-835 DUAL",
    "slug": "xsw-1-835-dual",
    "sku": "XSW1835DUALA",
    "brand": "SENNHEISER",
    "description": "Hệ thống không dây 2 kênh cho ca sĩ và người thuyết trình. Băng tần UHF ổn định, ăng-ten tích hợp và giao diện sắp xếp hợp lý với âm thanh sống động tuyệt vời. #### Hệ thống không dây 2 kênh cho ca sĩ và người thuyết trình. Băng tần UHF ổn định, ăng-ten tích hợp và giao diện sắp xếp hợp lý với âm thanh sống động tuyệt vời. XS Wireless 1 DUAL là hệ thống không dây 2 kênh dành cho ca sĩ và người thuyết trình. Được thiết kế để dễ sử dụng, các hệ thống UHF tương tự này có bộ thu kênh đôi kiểu dáng đ",
    "sale_enabled": true,
    "sale_price": 17523000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xsw-1-835-dual.jpg",
    "images": [
      {
        "id": "img-1038092650",
        "image_url": "/images/products/xsw-1-835-dual.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "3c4d2b02-a30e-52a0-a1f3-43ee6e51a3c0",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER XSW 1-825 DUAL",
    "slug": "xsw-1-825-dual",
    "sku": "XSW1825DUALB",
    "brand": "SENNHEISER",
    "description": "Hệ thống không dây 2 kênh cho ca sĩ và người thuyết trình. Băng tần UHF ổn định, ăng-ten tích hợp và giao diện sắp xếp hợp lý với âm thanh sống động tuyệt vời. Hệ thống không dây 2 kênh cho ca sĩ và người thuyết trình. Băng tần UHF ổn định, ăng-ten tích hợp và giao diện sắp xếp hợp lý với âm thanh sống động tuyệt vời. XS Wireless 1 DUAL là hệ thống không dây 2 kênh dành cho ca sĩ và người thuyết trình. Được thiết kế để dễ sử dụng, các hệ thống UHF tương tự này có bộ thu kênh đôi kiểu dáng đẹp vớ",
    "sale_enabled": true,
    "sale_price": 16660000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xsw-1-825-dual.jpg",
    "images": [
      {
        "id": "img-1038092649",
        "image_url": "/images/products/xsw-1-825-dual.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "031094e9-f471-5941-8160-b92bfeb758ff",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER XSW-D VOCAL SET",
    "slug": "micro-khong-day-sennheiser-xsw-d-vocal-set",
    "sku": "VB-1038092648",
    "brand": "SENNHEISER",
    "description": "Sennheiser XSW-D Vocal Hệ Thống Micro Không Dây Đa Năng Cho Hiệu Suất Âm Thanh Đỉnh Cao Hệ thống micro không dây Sennheiser XSW-D Vocal là giải pháp âm thanh tiên tiến dành cho các nhu cầu biểu diễn trực tiếp, hội thảo, và các sự kiện chuyên nghiệp. Với khả năng kết nối một chạm và thiết kế tối giản, XSW-D Vocal giúp tối ưu hóa sự linh hoạt và tiện lợi cho người dùng. Đây là sản phẩm lý tưởng cho các nghệ sĩ, người dẫn chương trình, và diễn giả cần âm thanh không dây trung thực và ổn định mà khô",
    "sale_enabled": true,
    "sale_price": 10380000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/micro-khong-day-sennheiser-xsw-d-vocal-set.png",
    "images": [
      {
        "id": "img-1038092648",
        "image_url": "/images/products/micro-khong-day-sennheiser-xsw-d-vocal-set.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5d84a232-1bc2-5a84-a521-5c8cf98c3c2b",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO KHÔNG DÂY SENNHEISER XSW 1-835",
    "slug": "xsw-1-835",
    "sku": "XSW1835A",
    "brand": "SENNHEISER",
    "description": "XSW 1-835 là một hệ thống không dây chính hãng Sennheiser, được trang bị công nghệ không dây tiên tiến để cung cấp âm thanh rõ ràng và chất lượng cao. Hệ thống này bao gồm một micro cầm tay và một bộ thu không dây, tạo điều kiện thuận lợi cho việc di chuyển và sử dụng trong mọi môi trường, từ sân khấu lớn đến phòng họp nhỏ. #### Micro Không Dây Chuyên Nghiệp Sennheiser XSW 1-835 - Giải Pháp Âm Thanh Với Giá Thành Hợp Lý Khám Phá Chất Lượng Vượt Trội với Micro Không Dây Chính Hãng Sennheiser Khám",
    "sale_enabled": true,
    "sale_price": 9630000,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/xsw-1-835.png",
    "images": [
      {
        "id": "img-1038092646",
        "image_url": "/images/products/xsw-1-835.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "95b70b86-5c28-552e-b3a9-1bbe225822e3",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "ANTEN KÍCH SÓNG SENNHEISER A 2003 UHF",
    "slug": "a-2003-uhf",
    "sku": "VB-1038092645",
    "brand": "SENNHEISER",
    "description": "Anten định hướng thụ động. Anten truyền và nhận. #### Anten định hướng thụ động. Anten truyền và nhận. #### Impedance 50 Ohm Connector BNC Pick-up pattern directional Frequency range 450 - 960 MHz Antenna gain 4 dBi Opening angle * +- 50 degrees",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/a-2003-uhf.png",
    "images": [
      {
        "id": "img-1038092645",
        "image_url": "/images/products/a-2003-uhf.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9d03458f-fff8-5766-ad40-63f0f3b7bde4",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "Bộ Khuếch Đại Ăng-ten Sennheisser EW-D AB",
    "slug": "sennheisser-ew-d-ab",
    "sku": "VB-1038092644",
    "brand": "SENNHEISER",
    "description": "Sennheiser EW-D AB Bộ Khuếch Đại Ăng-ten Cho Hệ Thống Evolution Wireless Digital Sennheiser EW-D AB là bộ khuếch đại tín hiệu ăng-ten chuyên nghiệp, thiết kế đặc biệt để tối ưu hóa hiệu suất cho các hệ thống micro không dây EW-D của Sennheiser. Sản phẩm này giúp tăng cường tín hiệu UHF, giữ cho âm thanh rõ ràng và ổn định, ngay cả trong các môi trường đòi hỏi cao như sự kiện trực tiếp, hội nghị và sân khấu biểu diễn lớn. Với EW-D AB, bạn có thể đảm bảo rằng chất lượng âm thanh sẽ luôn ở mức tốt ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheisser-ew-d-ab.png",
    "images": [
      {
        "id": "img-1038092644",
        "image_url": "/images/products/sennheisser-ew-d-ab.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fc5c5eb7-a68e-5eef-8168-88e6371c2d28",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ CHIA ANTENNA SENNHEISER EW-D ASA",
    "slug": "sennheiser-ew-d-asa",
    "sku": "EW-D_ASA",
    "brand": "SENNHEISER",
    "description": "Sennheiser EW-D ASA Bộ Phụ Kiện Tối Ưu Cho Hệ Thống Micro Không Dây Chuyên Nghiệp Sennheiser EW-D ASA là bộ chia tín hiệu ăng-ten chuyên nghiệp được thiết kế để tối ưu hóa hiệu suất của các hệ thống micro không dây, đặc biệt là trong các không gian biểu diễn lớn và môi trường hội nghị. EW-D ASA giúp giảm thiểu nhiễu, ổn định tín hiệu và mở rộng phạm vi phủ sóng cho các thiết bị không dây, đảm bảo chất lượng âm thanh tốt nhất. Đây là lựa chọn lý tưởng cho các sự kiện chuyên nghiệp đòi hỏi độ ổn đ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/sennheiser-ew-d-asa.png",
    "images": [
      {
        "id": "img-1038092643",
        "image_url": "/images/products/sennheiser-ew-d-asa.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "0a833ca4-beb2-5b10-b775-b0c33f665aa6",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW IEM G4-TWIN",
    "slug": "ew-iem-g4-twin",
    "sku": "VB-1038092642",
    "brand": "SENNHEISER",
    "description": "Được thiết kế cho âm thanh sống động chuyên nghiệp: Hệ thống giám sát không dây tất cả trong một chắc chắn cho các ứng dụng trong tai. #### Được thiết kế cho âm thanh sống động chuyên nghiệp: Hệ thống giám sát không dây tất cả trong một chắc chắn cho các ứng dụng trong tai. Toàn quyền kiểm soát hiệu suất của bạn - mọi nơi, mọi ngày. Bộ theo dõi trong tai G4 giúp buổi biểu diễn của bạn trở thành trải nghiệm đặc biệt - không chỉ cho khán giả mà còn cho bạn! Được thiết kế cho âm thanh sống động chu",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-iem-g4-twin.jpg",
    "images": [
      {
        "id": "img-1038092642",
        "image_url": "/images/products/ew-iem-g4-twin.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "abc4998c-564e-5d6c-9ae4-6369fbb73f7b",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW IEM G4",
    "slug": "ew-iem-g4",
    "sku": "VB-1038092641",
    "brand": "SENNHEISER",
    "description": "Nghe ở bất cứ đâu trên sân khấu và biến buổi biểu diễn của bạn thành một trải nghiệm đặc biệt - không chỉ cho khán giả mà còn cho bạn. Được thiết kế cho âm thanh sống động chuyên nghiệp. #### Nghe ở bất cứ đâu trên sân khấu và biến buổi biểu diễn của bạn thành một trải nghiệm đặc biệt - không chỉ cho khán giả mà còn cho bạn. Được thiết kế cho âm thanh sống động chuyên nghiệp. Toàn quyền kiểm soát hiệu suất của bạn - mọi nơi, mọi ngày. Bộ theo dõi trong tai G4 giúp buổi biểu diễn của bạn trở thàn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-iem-g4.jpg",
    "images": [
      {
        "id": "img-1038092641",
        "image_url": "/images/products/ew-iem-g4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d5b2beb8-ccc1-5b8f-ba1a-b47e4151cae4",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 500 G4-965",
    "slug": "ew-500-g4-965",
    "sku": "VB-1038092639",
    "brand": "SENNHEISER",
    "description": "Đối với các buổi biểu diễn trực tiếp chuyên nghiệp, bộ này bao gồm 1 thiết bị cầm tay SKM 500 G4, 1 viên ngưng tụ cardioid / supercardioid MMK 965-1, 1 bộ thu rackmount 300-500 G4 em, 1 bộ giá đỡ GA3 và 1 mic kẹp #### Đối với các buổi biểu diễn trực tiếp chuyên nghiệp, bộ này bao gồm 1 thiết bị cầm tay SKM 500 G4, 1 viên ngưng tụ cardioid / supercardioid MMK 965-1, 1 bộ thu rackmount 300-500 G4 em, 1 bộ giá đỡ GA3 và 1 mic kẹp Các kỹ sư âm thanh nổi tiếng tin tưởng vào tính linh hoạt của ew 500 ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-500-g4-965.jpg",
    "images": [
      {
        "id": "img-1038092639",
        "image_url": "/images/products/ew-500-g4-965.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "04f2a8b6-eb4c-55f6-87c6-e351a0341995",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 500 G4-945",
    "slug": "ew-500-g4-945",
    "sku": "VB-1038092638",
    "brand": "SENNHEISER",
    "description": "Đối với các buổi biểu diễn trực tiếp chuyên nghiệp, bộ này bao gồm 1 thiết bị cầm tay SKM 500 G4, 1 MICRO động siêu cấp MMD 945, 1 bộ thu rackmount 300-500 G4 em, 1 bộ giá đỡ GA3 và 1 mic kẹp #### Đối với các buổi biểu diễn trực tiếp chuyên nghiệp, bộ này bao gồm 1 thiết bị cầm tay SKM 500 G4, 1 MICRO động siêu cấp MMD 945, 1 bộ thu rackmount 300-500 G4 em, 1 bộ giá đỡ GA3 và 1 mic kẹp Các kỹ sư âm thanh nổi tiếng tin tưởng vào tính linh hoạt của ew 500 G4, đặc biệt là khi xử lý các cài đặt đa k",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-500-g4-945.jpg",
    "images": [
      {
        "id": "img-1038092638",
        "image_url": "/images/products/ew-500-g4-945.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9ff66416-5f6a-5192-a176-e420c40b034b",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 500 G4-935",
    "slug": "ew-500-g4-935",
    "sku": "VB-1038092637",
    "brand": "SENNHEISER",
    "description": "Đối với Biểu diễn Trực tiếp Chuyên nghiệp, bộ này bao gồm 1 thiết bị cầm tay SKM 500 G4, 1 viên nang động Cardioid MMD 935-1, 1 bộ thu rackmount 300-500 G4 em, 1 bộ giá đỡ GA3 và 1 mic kẹp. #### Đối với Biểu diễn Trực tiếp Chuyên nghiệp, bộ này bao gồm 1 thiết bị cầm tay SKM 500 G4, 1 viên nang động Cardioid MMD 935-1, 1 bộ thu rackmount 300-500 G4 em, 1 bộ giá đỡ GA3 và 1 mic kẹp. Các kỹ sư âm thanh nổi tiếng tin tưởng vào tính linh hoạt của ew 500 G4, đặc biệt là khi xử lý các cài đặt đa kênh ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-500-g4-935.jpg",
    "images": [
      {
        "id": "img-1038092637",
        "image_url": "/images/products/ew-500-g4-935.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "25383278-7a8c-5efa-97e6-cb40fb252f7b",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 300 G4-HEADMIC1-RC",
    "slug": "ew-300-g4-headmic1-rc",
    "sku": "VB-1038092636",
    "brand": "SENNHEISER",
    "description": "Bộ Headmic không dây bao gồm 1 bộ phát bodypack SK 300 G4 RC, 1 SL Headmic 1, 1 bộ thu rackmount EM 300-500 và 1 bộ giá đỡ GA3. #### Bộ Headmic không dây bao gồm 1 bộ phát bodypack SK 300 G4 RC, 1 SL Headmic 1, 1 bộ thu rackmount EM 300-500 và 1 bộ giá đỡ GA3. Sự lựa chọn tốt nhất cho doanh nghiệp của bạn, đứng đầu sử dụng trong mảng giáo dục. Dòng G4 300 sử dụng sức mạnh của băng thông chuyển mạch tăng lên đến 88 MHz. Các dải tần số mới cho phép vận hành các thiết lập đa kênh với hàng chục kênh",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-300-g4-headmic1-rc.jpg",
    "images": [
      {
        "id": "img-1038092636",
        "image_url": "/images/products/ew-300-g4-headmic1-rc.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "86900a13-0658-56f0-a189-a31748aa4cc0",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 300 G4-ME2-RC",
    "slug": "ew-300-g4-me2-rc",
    "sku": "VB-1038092635",
    "brand": "SENNHEISER",
    "description": "Bộ micrô lavalier không dây bao gồm 1 bộ phát bodypack không dây SK 300 G4 RC, 1 ME 2-II Lavalier, 1 bộ thu rackmount 300-500 G4 và 1 bộ giá đỡ GA3. #### Bộ micrô lavalier không dây bao gồm 1 bộ phát bodypack không dây SK 300 G4 RC, 1 ME 2-II Lavalier, 1 bộ thu rackmount 300-500 G4 và 1 bộ giá đỡ GA3. Sự lựa chọn tốt nhất cho doanh nghiệp của bạn, đứng hàng đầu trong mảng giác dục. Dòng G4 300 sử dụng sức mạnh của băng thông chuyển mạch tăng lên đến 88 MHz. Các dải tần số mới cho phép vận hành c",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-300-g4-me2-rc.jpg",
    "images": [
      {
        "id": "img-1038092635",
        "image_url": "/images/products/ew-300-g4-me2-rc.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8177fddb-6a14-5662-9733-68235c3da0e9",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 300 G4-865-S",
    "slug": "ew-300-g4-865-s",
    "sku": "VB-1038092634",
    "brand": "SENNHEISER",
    "description": "Hoàn hảo cho Người thuyết trình, bộ sản phẩm này bao gồm 1 thiết bị cầm tay SKM 300 G4-S với công tắc tắt tiếng, 1 đầu mic MME 865-1 (supercardioid, tụ điện), 1 bộ thu gắn trên giá đỡ EM 300-500, 1 bộ giá đỡ GA3 và 1 kẹp mic. #### Hoàn hảo cho Người thuyết trình, bộ sản phẩm này bao gồm 1 thiết bị cầm tay SKM 300 G4-S với công tắc tắt tiếng, 1 đầu mic MME 865-1 (supercardioid, tụ điện), 1 bộ thu gắn trên giá đỡ EM 300-500, 1 bộ giá đỡ GA3 và 1 kẹp mic. Sự lựa chọn tốt nhất cho doanh nghiệp của b",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-300-g4-865-s.jpg",
    "images": [
      {
        "id": "img-1038092634",
        "image_url": "/images/products/ew-300-g4-865-s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "a8cde0d1-60f8-5163-ad4d-2d7a238f0ea4",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EM 300-500 G4",
    "slug": "em-300-500-g4",
    "sku": "VB-1038092633",
    "brand": "SENNHEISER",
    "description": "Bộ thu nửa giá đỡ đa dạng vỏ kim loại hoàn toàn với màn hình OLED trực quan để kiểm soát toàn bộ với băng thông và công suất truyền tăng lên, sẵn sàng tham gia các sân khấu trực tiếp lớn nhất thế giới. Đối với hệ thống G4 300/500 Series không dây. #### Bộ thu nửa giá đỡ đa dạng vỏ kim loại hoàn toàn với màn hình OLED trực quan để kiểm soát toàn bộ với băng thông và công suất truyền tăng lên, sẵn sàng tham gia các sân khấu trực tiếp lớn nhất thế giới. Đối với hệ thống G4 300/500 Series không dây.",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/em-300-500-g4.jpg",
    "images": [
      {
        "id": "img-1038092633",
        "image_url": "/images/products/em-300-500-g4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "8f410fb5-7cbf-5266-9b2b-8fff48d912f6",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 512P G4",
    "slug": "ew-512p-g4",
    "sku": "VB-1038092632",
    "brand": "SENNHEISER",
    "description": "Hệ thống không dây tất cả trong một chắc chắn cho các buổi phỏng vấn và ghi âm chuyên nghiệp. Bộ sản phẩm gồm 1 bodypack SK 500 G4, 1 mic MKE 2 Gold Lavalier, 1 đầu thu máy ảnh cầm tay EK 500 G4, dây cáp và đế gắn máy ảnh. #### Hệ thống không dây tất cả trong một chắc chắn cho các buổi phỏng vấn và ghi âm chuyên nghiệp. Bộ sản phẩm gồm 1 bodypack SK 500 G4, 1 mic MKE 2 Gold Lavalier, 1 đầu thu máy ảnh cầm tay EK 500 G4, dây cáp và đế gắn máy ảnh. Giải pháp hoàn hảo cho các nhà làm phim, hoạt độn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-512p-g4.jpg",
    "images": [
      {
        "id": "img-1038092632",
        "image_url": "/images/products/ew-512p-g4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "5c55636d-4c44-54c9-9c4d-ce5acbfeaa13",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 135P G4",
    "slug": "ew-135p-g4",
    "sku": "VB-1038092631",
    "brand": "SENNHEISER",
    "description": "Hệ thống không dây tất cả trong một chắc chắn với độ linh hoạt cao cho âm thanh chất lượng phát sóng. Bộ sản phẩm gồm 1 micro cầm tay SKM 100 G4, 1 MMD 835-1 (cardioid, dynamic), 1 đầu thu cầm tay EK 100 G4, các loại cáp đầu ra, giá gắn camera. #### Hệ thống không dây tất cả trong một chắc chắn với độ linh hoạt cao cho âm thanh chất lượng phát sóng. Bộ sản phẩm gồm 1 micro cầm tay SKM 100 G4, 1 MMD 835-1 (cardioid, dynamic), 1 đầu thu cầm tay EK 100 G4, các loại cáp đầu ra, giá gắn camera. Một g",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-135p-g4.jpg",
    "images": [
      {
        "id": "img-1038092631",
        "image_url": "/images/products/ew-135p-g4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "ad700481-6821-5266-b644-51318d6f49ba",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 122P G4",
    "slug": "ew-122p-g4",
    "sku": "VB-1038092630",
    "brand": "SENNHEISER",
    "description": "Một giải pháp âm thanh phát sóng chất lượng. Mang lại sự linh hoạt cao nhất cho các buổi ghi hình ngoài trời và ghi hình hiện trường. Hệ thống micrô không dây mạnh mẽ cung cấp chất lượng âm thanh tuyệt vời, lắp đặt đơn giản và dễ sử dụng. #### Hệ thống không dây tất cả trong một chắc chắn với độ linh hoạt cao cho âm thanh chất lượng phát sóng. Bộ sản phẩm gồm 1 bodypack không dây SK 100 G4, 1 micro lavalier ME 4, 1 đầu thu di động EK 100 G4, dây cáp đầu ra, giá gắn camera. Một giải pháp âm thanh",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-122p-g4.jpg",
    "images": [
      {
        "id": "img-1038092630",
        "image_url": "/images/products/ew-122p-g4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "d02ff570-9039-507e-a607-48d09070587a",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "BỘ MICRO KHÔNG DÂY SENNHEISER EW 112P G4",
    "slug": "ew-112p-g4",
    "sku": "VB-1038092629",
    "brand": "SENNHEISER",
    "description": "Một giải pháp âm thanh phát sóng chất lượng. Mang lại sự linh hoạt cao nhất cho các buổi ghi hình ngoài trời và ghi hình hiện trường. Hệ thống micrô không dây mạnh mẽ cung cấp chất lượng âm thanh tuyệt vời, lắp đặt đơn giản và dễ sử dụng. #### Một giải pháp âm thanh phát sóng chất lượng. Mang lại sự linh hoạt cao nhất cho các buổi ghi hình ngoài trời và ghi hình hiện trường. Hệ thống micrô không dây mạnh mẽ cung cấp chất lượng âm thanh tuyệt vời, lắp đặt đơn giản và dễ sử dụng. Hệ thống không dâ",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-112p-g4.jpg",
    "images": [
      {
        "id": "img-1038092629",
        "image_url": "/images/products/ew-112p-g4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "f62b464f-23d6-571f-9793-d1e18cc4af5f",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 100 G4-ME2/835-S",
    "slug": "ew-100-g4-me2-835-s",
    "sku": "VB-1038092628",
    "brand": "SENNHEISER",
    "description": "Bộ không dây kỹ thuật số cầm tay và gài áo chuyên nghiệp Sennheiser dành cho diễn giả hoặc ca sĩ, năng động. Đầu micro e835 với ME2 nổi tiếng của Sennheiser với âm thanh trung thực. #### Bộ không dây kỹ thuật số cầm tay và gài áo chuyên nghiệp Sennheiser dành cho diễn giả hoặc ca sĩ, năng động. Đầu micro e835 với ME2 nổi tiếng của Sennheiser với âm thanh trung thực. Bộ không dây kỹ thuật số Sennheiser EW-D ME2/835-S đa năng và giàu tính năng dành cho những ca sĩ, diển giả hoặc thuyết trình cho p",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-me2-835-s.jpg",
    "images": [
      {
        "id": "img-1038092628",
        "image_url": "/images/products/ew-100-g4-me2-835-s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "fb8d3172-5811-5490-8404-c31406d05ddd",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 100 G4-945-S",
    "slug": "ew-100-g4-945-s",
    "sku": "VB-1038092627",
    "brand": "SENNHEISER",
    "description": "Hệ thống micro không dây chuyên nghiệp tất cả trong một chắc chắn cho ca sĩ và người thuyết trình. Bộ sản phẩm gồm 1 thiết bị cầm tay SKM 100 G4-S với công tắc tắt tiếng, 1 đầu micro MMD 945-1 (supercardioid, dynamic), 1 bộ thu rackmount EM 100 G4, 1 bộ giá đỡ, 1 cáp nối RJ10 và 1 kẹp mic. #### Hệ thống micro không dây chuyên nghiệp tất cả trong một chắc chắn cho ca sĩ và người thuyết trình. Bộ sản phẩm gồm 1 thiết bị cầm tay SKM 100 G4-S với công tắc tắt tiếng, 1 đầu micro MMD 945-1 (supercardi",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-945-s.png",
    "images": [
      {
        "id": "img-1038092627",
        "image_url": "/images/products/ew-100-g4-945-s.png",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "538e74a9-6661-5746-abd2-50c8b6a58235",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 100 G4-935-S",
    "slug": "ew-100-g4-935-s",
    "sku": "VB-1038092626",
    "brand": "SENNHEISER",
    "description": "Giờ đây, thậm chí còn đơn giản, linh hoạt và đáng tin cậy hơn: Dòng 100 đã trở thành sự lựa chọn hàng đầu cho cả nhà thiết kế âm thanh và người dùng không thường xuyên vì khái niệm vận hành đơn giản - và vì hệ thống không gây ảnh hưởng đến âm thanh sống động. #### Giờ đây, thậm chí còn đơn giản, linh hoạt và đáng tin cậy hơn: Dòng 100 đã trở thành sự lựa chọn hàng đầu cho cả nhà thiết kế âm thanh và người dùng không thường xuyên vì khái niệm vận hành đơn giản - và vì hệ thống không gây ảnh hưởng",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-935-s.jpg",
    "images": [
      {
        "id": "img-1038092626",
        "image_url": "/images/products/ew-100-g4-935-s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "17983efc-f53f-51dc-86c7-52330bbb12c5",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 100 G4-865-S",
    "slug": "ew-100-g4-865-s",
    "sku": "VB-1038092625",
    "brand": "SENNHEISER",
    "description": "Giờ đây, thậm chí còn đơn giản, linh hoạt và đáng tin cậy hơn: Series 100 đã trở thành sự lựa chọn hàng đầu cho cả nhà thiết kế âm thanh và người dùng vì khái niệm vận hành đơn giản - và hệ thống không gây ảnh hưởng đến âm thanh sống động. #### Giờ đây, thậm chí còn đơn giản, linh hoạt và đáng tin cậy hơn: Series 100 đã trở thành sự lựa chọn hàng đầu cho cả nhà thiết kế âm thanh và người dùng vì khái niệm vận hành đơn giản - và hệ thống không gây ảnh hưởng đến âm thanh sống động. Được thiết kế c",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-865-s.jpg",
    "images": [
      {
        "id": "img-1038092625",
        "image_url": "/images/products/ew-100-g4-865-s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "015b5fe9-df7b-5bad-8ec7-8e02199f444c",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 100 G4-845-S",
    "slug": "ew-100-g4-845-s",
    "sku": "VB-1038092624",
    "brand": "SENNHEISER",
    "description": "Hệ thống không dây tất cả trong một chắc chắn cho ca sĩ và người thuyết trình. Bộ sản phẩm gồm 1 thiết bị cầm tay SKM 100 G4 với công tắc tắt tiếng, 1 đầu micro MMD 845-1 (supercardioid, Dynamic), 1 bộ thu rackmount EM 100 G4, 1 bộ giá đỡ, 1 đầu nối RJ10 và kẹp mic. #### Hệ thống không dây tất cả trong một chắc chắn cho ca sĩ và người thuyết trình. Bộ sản phẩm gồm 1 thiết bị cầm tay SKM 100 G4 với công tắc tắt tiếng, 1 đầu micro MMD 845-1 (supercardioid, Dynamic), 1 bộ thu rackmount EM 100 G4, 1",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-845-s.jpg",
    "images": [
      {
        "id": "img-1038092624",
        "image_url": "/images/products/ew-100-g4-845-s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "bd691621-f49d-510a-b0ad-15cda455ced0",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CẦM TAY KHÔNG DÂY SENNHEISER EW 100 G4-835-S",
    "slug": "ew-100-g4-835-s",
    "sku": "VB-1038092623",
    "brand": "SENNHEISER",
    "description": "Giờ đây, thậm chí còn đơn giản, linh hoạt và đáng tin cậy hơn. Dòng Micro 100 của Sennhesier đã trở thành sự lựa chọn hàng đầu cho cả nhà thiết kế âm thanh và người dùng không thường xuyên vì khái niệm vận hành đơn giản. #### Giờ đây, thậm chí còn đơn giản, linh hoạt và đáng tin cậy hơn. Dòng Micro 100 của Sennhesier đã trở thành sự lựa chọn hàng đầu cho cả nhà thiết kế âm thanh và người dùng không thường xuyên vì khái niệm vận hành đơn giản. Được thiết kế cho âm thanh sống động chuyên nghiệp: H",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-835-s.jpg",
    "images": [
      {
        "id": "img-1038092623",
        "image_url": "/images/products/ew-100-g4-835-s.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "2c1df9a1-0f66-5309-9f4f-b54743169f72",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ PHÁT VÀ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EW 100 G4-CI1",
    "slug": "ew-100-g4-ci1",
    "sku": "VB-1038092622",
    "brand": "SENNHEISER",
    "description": "Được thiết kế cho âm thanh sống động chuyên nghiệp: Hệ thống không dây tất cả trong một chắc chắn cho guitar và bass. Bộ phát bodypack mạnh mẽ và cáp thiết bị Ci1 để sử dụng hàng ngày trên sân khấu. #### Được thiết kế cho âm thanh sống động chuyên nghiệp: Hệ thống không dây tất cả trong một chắc chắn cho guitar và bass. Bộ phát bodypack mạnh mẽ và cáp thiết bị Ci1 để sử dụng hàng ngày trên sân khấu. Được thiết kế cho âm thanh sống động chuyên nghiệp: Hệ thống không dây tất cả trong một chắc chắn",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-ci1.jpg",
    "images": [
      {
        "id": "img-1038092622",
        "image_url": "/images/products/ew-100-g4-ci1.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "9a6b2fe6-5490-53a8-a47e-74f28de83b08",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO GÀI ĐẦU KHÔNG DÂY SENNHEISER EW 100 G4-ME3",
    "slug": "ew-100-g4-me3",
    "sku": "VB-1038092621",
    "brand": "SENNHEISER",
    "description": "Sự lựa chọn hoàn hảo cho người ca sĩ và người thuyết trình: Bộ sản phẩm gồm 1 bodypack không dây SK 100 G4, 1 Mic đầu ME 3-II, 1 bộ thu rackmout EM 100 G4, 1 bộ giá đỡ và 1 cáp liên kết RJ10.. #### Sự lựa chọn hoàn hảo cho người ca sĩ và người thuyết trình: Bộ sản phẩm gồm 1 bodypack không dây SK 100 G4, 1 Mic đầu ME 3-II, 1 bộ thu rackmout EM 100 G4, 1 bộ giá đỡ và 1 cáp liên kết RJ10.. Được thiết kế cho âm thanh sống động chuyên nghiệp: Hệ thống không dây tất cả trong một chắc chắn cho người t",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-me3.jpg",
    "images": [
      {
        "id": "img-1038092621",
        "image_url": "/images/products/ew-100-g4-me3.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "89255ade-a95c-5b17-bf43-fe9694b0839c",
    "category_id": "ffaaf0d4-f0cc-5ba5-97be-8909a31cc4df",
    "category_name": "Phụ Kiện Âm Thanh Tổng Hợp",
    "category_slug": "phu-kien",
    "name": "BỘ PHÁT VÀ THU TÍN HIỆU KHÔNG DÂY SENNHEISER EW 100 G4-ME4",
    "slug": "ew-100-g4-me4",
    "sku": "VB-1038092620",
    "brand": "SENNHEISER",
    "description": "Hệ thống không dây đa năng dành cho những ca sĩ, người thuyết trình hoặc chơi nhạc cụ với băng thông điều chỉnh lên đến 42 MHz trong dải UHF ổn định và thiết lập nhanh chóng, đồng thời lên đến 12 hệ thống được liên kết. #### Hệ thống không dây đa năng dành cho những ca sĩ, người thuyết trình hoặc chơi nhạc cụ với băng thông điều chỉnh lên đến 42 MHz trong dải UHF ổn định và thiết lập nhanh chóng, đồng thời lên đến 12 hệ thống được liên kết. Sự lựa chọn hoàn hảo cho người kiểm duyệt và người thuy",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-me4.jpg",
    "images": [
      {
        "id": "img-1038092620",
        "image_url": "/images/products/ew-100-g4-me4.jpg",
        "sort_order": 0
      }
    ]
  },
  {
    "id": "51ac4c4b-edbb-5778-9819-63f1c15a321c",
    "category_id": "22d83ac8-236e-53d6-ac7e-0292aa9919f0",
    "category_name": "Micro Không Dây Chuyên Nghiệp",
    "category_slug": "micro-khong-day",
    "name": "MICRO CÀI ÁO KHÔNG DÂY SENNHEISER EW 100 G4-ME2",
    "slug": "ew-100-g4-me2",
    "sku": "VB-1038092619",
    "brand": "SENNHEISER",
    "description": "Sự lựa chọn hoàn hảo cho người kiểm duyệt và người thuyết trình: Bộ phát bodypack mạnh mẽ và micrô kẹp sẵn ME 2-II (đa hướng) hoặc ME 4 (cardioid) với độ rõ giọng nói cao để dễ dàng thao tác rảnh tay trên bất kỳ giai đoạn nào. #### Sự lựa chọn hoàn hảo cho người kiểm duyệt và người thuyết trình: Bộ phát bodypack mạnh mẽ và micrô kẹp sẵn ME 2-II (đa hướng) hoặc ME 4 (cardioid) với độ rõ giọng nói cao để dễ dàng thao tác rảnh tay trên bất kỳ giai đoạn nào. Được thiết kế cho âm thanh sống động chuy",
    "sale_enabled": false,
    "sale_price": null,
    "rental_enabled": false,
    "rental_price": null,
    "stock_quantity": 1,
    "is_active": true,
    "image_url": "/images/products/ew-100-g4-me2.png",
    "images": [
      {
        "id": "img-1038092619",
        "image_url": "/images/products/ew-100-g4-me2.png",
        "sort_order": 0
      }
    ]
  }
];
