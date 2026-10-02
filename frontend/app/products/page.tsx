import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import { fetchProducts, fetchCategories } from "../lib/api";

export const metadata: Metadata = {
  title: "Kho Thiết Bị DJ & Âm Thanh Pro Chính Hãng | VanBass",
  description:
    "Phân phối & cho thuê thiết bị DJ, Bàn DJ Pioneer DJ, AlphaTheta, Loa Pro, Mixer, Đèn sân khấu chính hãng tại Đà Nẵng, Huế & Miền Trung. Bảo hành 12-24 tháng, trả góp 0%.",
  alternates: {
    canonical: "/products",
  },
};

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
