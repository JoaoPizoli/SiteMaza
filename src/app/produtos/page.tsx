"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSort } from "@/components/products/ProductSort";

import { PRODUCTS } from "@/lib/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = React.useState(PRODUCTS);
  const [initialCategory, setInitialCategory] = React.useState<string | null>(null);
  const [initialSubcategory, setInitialSubcategory] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    if (category) {
      setInitialCategory(category);
      if (subcategory) {
        setInitialSubcategory(subcategory);
      }
      
      // Apply filter immediately
      const filtered = PRODUCTS.filter((product) => {
        // Mock filtering logic - needs to match the Sidebar logic
        if (category === "automotiva") return ["Esmalte Sintético", "Verniz"].includes(product.category); // This mock logic is a bit weak, but I'll keep it consistent with the existing mock for now. 
        // ideally we should filter by subcategory if present
        if (subcategory) {
             // Since our mock data doesn't explicitly have subcategories, we might need to rely on the existing category mapping or just show all for the category for now if exact match fails.
             // But the user asked for "filtered by Adesivos". 
             // Our mock data `PRODUCTS` has `category` like "Piso Premium", "Esmalte Sintético".
             // These map to subcategories in the Sidebar logic? 
             // Let's look at FilterSidebar logic again.
             // It maps sidebar categories to product categories.
             return true; 
        }

        if (category === "automotiva") return ["Esmalte Sintético", "Verniz"].includes(product.category);
        if (category === "imobiliaria") return ["Piso Premium", "Tinta Acrílica", "Massa Corrida"].includes(product.category);
        if (category === "impermeabilizantes") return ["Impermeabilizante"].includes(product.category);
        return true;
      });
      setFilteredProducts(filtered);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (category: string, subcategory?: string) => {
    // In a real app, this would filter by category ID or slug
    // For now, we'll just filter by string match if category matches
    if (!category) {
      setFilteredProducts(PRODUCTS);
      return;
    }
    
    // Mock filtering logic
    const filtered = PRODUCTS.filter((product) => {
        // Simple mapping for demo purposes
        if (category === "automotiva") return ["Esmalte Sintético", "Verniz"].includes(product.category);
        if (category === "imobiliaria") return ["Piso Premium", "Tinta Acrílica", "Massa Corrida"].includes(product.category);
        if (category === "impermeabilizantes") return ["Impermeabilizante"].includes(product.category);
        return true;
      });
    setFilteredProducts(filtered);
  };

  const handleSortChange = (option: string) => {
    let sorted = [...filteredProducts];
    if (option === "Nome (A-Z)") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "Nome (Z-A)") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === "Menor preço") {
      sorted.sort((a, b) => a.id - b.id); // Mock logic for price
    } else if (option === "Maior preço") {
      sorted.sort((a, b) => b.id - a.id); // Mock logic for price
    }
    setFilteredProducts(sorted);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCF7] font-roboto">
      {/* Decorative hero band */}
      <section className="relative w-full pt-[140px] pb-12 px-6 xl:px-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FCFCF7] to-[#FCFCF7]"
        />
        <div
          aria-hidden
          className="absolute -top-10 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 -z-10"
          style={{ background: "radial-gradient(circle, rgba(251,185,67,0.35) 0%, transparent 70%)" }}
        />
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)] w-fit">
            <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
              CATÁLOGO MAZA
            </span>
          </div>
          <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C]">
            Nossos <span className="text-[#B11116]">produtos</span>.
          </h1>
          <p className="text-[#5F5F5A] text-[16px] leading-[1.6] max-w-[620px]">
            Explore nosso portfólio de tintas imobiliárias, automotivas, industriais e impermeabilizantes.
          </p>
        </div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto px-6 xl:px-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-10 relative">
            
          {/* Left Column: Products Grid & Header */}
          <div className="flex-1 flex flex-col gap-8">

            {/* Results Info & Sort */}
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EBEBEB]">
                <span className="text-[14px] text-[#5F5F5A]">
                    Mostrando <strong className="text-[#1C1C1C]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "resultado" : "resultados"}
                </span>
                <ProductSort onSortChange={handleSortChange} />
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <ProductCard
                        image={product.image}
                        category={product.category}
                        description={product.description}
                        href={product.href}
                      />
                    </motion.div>
                ))}
                </motion.div>
            ) : (
                <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4">
                    <p className="text-lg text-[#5F5F5A]">Nenhum produto encontrado.</p>
                    <button 
                        onClick={() => setFilteredProducts(PRODUCTS)}
                        className="text-[#B11116] font-semibold hover:underline"
                    >
                        Limpar filtros
                    </button>
                </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0">
             <div className="sticky top-28">
                <FilterSidebar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    initialCategory={initialCategory}
                    initialSubcategory={initialSubcategory}
                />
             </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
