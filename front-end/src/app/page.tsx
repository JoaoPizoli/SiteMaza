import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

const ProductsSection = dynamic(() =>
  import("@/components/sections/ProductsSection").then((mod) => mod.ProductsSection)
);
const AboutSection = dynamic(() =>
  import("@/components/sections/AboutSection").then((mod) => mod.AboutSection)
);
const FindUsSection = dynamic(() =>
  import("@/components/sections/FindUsSection").then((mod) => mod.FindUsSection)
);
const ResultsSection = dynamic(() =>
  import("@/components/sections/ResultsSection").then((mod) => mod.ResultsSection)
);

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
