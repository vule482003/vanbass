import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import { fetchProducts, fetchCategories } from "../lib/api";

import { CATEGORY_GROUPS, getSubcategoryDisplayName } from "../lib/category-hierarchy";

export const revalidate = 60;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn").replace(/\/+$/, "");

  const rawPage = parseInt(resolvedParams.page || "1", 10);
  const page = !isNaN(rawPage) && rawPage > 1 ? rawPage : 1;
  const category = resolvedParams.category?.trim();
  const group = resolvedParams.group?.trim();
  const search = resolvedParams.search?.trim();

  // 1. Search Query: Noindex, canonical fallback to clean /products
  if (search) {
    return {
      title: `Tìm kiếm: "${search}" | VanBass Music Center`,
      description: `Kết quả tìm kiếm thiết bị âm thanh & DJ cho từ khóa "${search}" tại VanBass Music Center.`,
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: "/products",
      },
    };
  }

  // 2. Specific Category
  if (category && category !== "all") {
    const subName = getSubcategoryDisplayName(category, "vi");
    const canonicalPath = page > 1
      ? `/products?category=${encodeURIComponent(category)}&page=${page}`
      : `/products?category=${encodeURIComponent(category)}`;

    const pageSuffix = page > 1 ? ` - Trang ${page}` : "";
    return {
      title: `${subName} Chính Hãng Giá Tốt Nhất${pageSuffix} | VanBass`,
      description: `Tổng hợp thiết bị ${subName.toLowerCase()} chính hãng mới 100% & like new tại Đà Nẵng, Huế & Miền Trung. Bảo hành 12-24T, trả góp 0%, test máy trực tiếp.`,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: `${subName} Chính Hãng Giá Tốt Nhất${pageSuffix} | VanBass`,
        description: `Tổng hợp thiết bị ${subName.toLowerCase()} chính hãng tại VanBass Music Center.`,
        url: `${baseUrl}${canonicalPath}`,
      },
    };
  }

  // 3. Category Group (/products?group=dj)
  if (group && group !== "all") {
    const grp = CATEGORY_GROUPS.find((g) => g.id === group);
    const grpName = grp ? grp.nameVi : group.toUpperCase();
    const canonicalPath = page > 1
      ? `/products?group=${encodeURIComponent(group)}&page=${page}`
      : `/products?group=${encodeURIComponent(group)}`;

    const pageSuffix = page > 1 ? ` - Trang ${page}` : "";
    return {
      title: `${grpName} Chính Hãng${pageSuffix} | VanBass Music Center`,
      description: `Phân phối & cho thuê thiết bị ${grpName.toLowerCase()} chính hãng tại Đà Nẵng, Huế & Miền Trung. Bán & cho thuê giá tốt nhất, bảo hành 12-24 tháng.`,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: `${grpName} Chính Hãng${pageSuffix} | VanBass`,
        description: `Tổng hợp thiết bị ${grpName.toLowerCase()} chính hãng tại Đà Nẵng & Huế.`,
        url: `${baseUrl}${canonicalPath}`,
      },
    };
  }

  // 4. Base Pagination (/products?page=2)
  if (page > 1) {
    const canonicalPath = `/products?page=${page}`;
    return {
      title: `Kho Thiết Bị DJ & Âm Thanh Pro Chính Hãng - Trang ${page} | VanBass`,
      description: `Phân phối & cho thuê thiết bị DJ, Bàn DJ Pioneer DJ, AlphaTheta, Loa Pro, Mixer, Đèn sân khấu chính hãng - Trang ${page}.`,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: `Kho Thiết Bị DJ & Âm Thanh Pro Chính Hãng - Trang ${page} | VanBass`,
        description: `Kho thiết bị DJ và âm thanh chuyên nghiệp VanBass Music Center - Trang ${page}.`,
        url: `${baseUrl}${canonicalPath}`,
      },
    };
  }

  // 5. Default base /products
  return {
    title: "Kho Thiết Bị DJ & Âm Thanh Pro Chính Hãng | VanBass",
    description:
      "Phân phối & cho thuê thiết bị DJ, Bàn DJ Pioneer DJ, AlphaTheta, Loa Pro, Mixer, Đèn sân khấu chính hãng tại Đà Nẵng, Huế & Miền Trung. Bảo hành 12-24 tháng, trả góp 0%.",
    alternates: {
      canonical: "/products",
    },
    openGraph: {
      title: "Kho Thiết Bị DJ & Âm Thanh Pro Chính Hãng | VanBass",
      description:
        "Phân phối & cho thuê thiết bị DJ, Bàn DJ Pioneer DJ, AlphaTheta, Loa Pro, Mixer, Đèn sân khấu chính hãng tại Đà Nẵng, Huế & Miền Trung.",
      url: `${baseUrl}/products`,
    },
  };
}

interface PageProps {
  searchParams?: Promise<{
    page?: string;
    category?: string;
    group?: string;
    mode?: string;
    type?: string;
    filter?: string;
    search?: string;
    brand?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};

  // Fetch real data on server from FastAPI/PostgreSQL with graceful mock fallback
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#060709",
            color: "#fff",
          }}
        >
          Đang tải danh mục thiết bị VanBass...
        </div>
      }
    >
      <ProductsClient
        initialProducts={products}
        initialCategories={categories}
        initialSearchParams={resolvedParams}
        baseCatalogPath="/products"
      />
    </Suspense>
  );
}
