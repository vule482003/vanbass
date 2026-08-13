import Header from "./components/Header";
import Hero from "./components/Hero";
import IntroSection from "./components/IntroSection";
import CategoryGrid from "./components/CategoryGrid";
import RentalSection from "./components/RentalSection";
import ProductGrid from "./components/ProductGrid";
import LocalCTA from "./components/LocalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <IntroSection />
        <CategoryGrid />
        <RentalSection />
        <ProductGrid />
        <LocalCTA />
      </main>

      <Footer />
    </>
  );
}