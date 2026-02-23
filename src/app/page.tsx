import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
    </main>
  );
}
