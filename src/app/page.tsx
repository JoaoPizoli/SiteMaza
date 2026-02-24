import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { FindUsSection } from "@/components/sections/FindUsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <FindUsSection />
      <ResultsSection />
    </main>
  );
}
