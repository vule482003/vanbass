import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CategoryGrid from "./components/CategoryGrid";
import RentalSection from "./components/RentalSection";
import IntroSection from "./components/IntroSection";
import LocalCTA from "./components/LocalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* 1. Hero Banner */}
        <Hero />

        {/* 2. Thiết bị nổi bật (Khối thứ 2 theo yêu cầu) */}
        <ProductGrid />

        {/* 3. Danh mục sản phẩm */}
        <CategoryGrid />

        {/* 4. Dịch vụ cho thuê thiết bị */}
        <RentalSection />

        {/* 5. Giới thiệu VanBass */}
        <IntroSection />

        {/* 6. Kêu gọi hành động & Showroom */}
        <LocalCTA />
      </main>

      <Footer />
    </>
  );
}