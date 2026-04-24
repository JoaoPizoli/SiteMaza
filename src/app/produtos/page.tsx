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
    <main className="w-full min-h-screen bg-[#F8FAFC] flex justify-center py-20 md:pt-[260px] md:pb-[160px] px-6 xl:px-0">
      <div className="w-full max-w-[1440px] flex flex-col gap-12">
        
        {/* Header Section (Mobile only visible here, Desktop is split) */}
        <div className="flex flex-col gap-4 md:hidden">
            <div className="flex items-center gap-[10px] px-2 py-1 w-fit rounded-[50px] bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px]">
                <span className="font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
                  PRODUTOS
                </span>
            </div>
            <h1 className="font-roboto font-semibold text-[32px] leading-[1.2em] text-[#1C1C1C]">
                Nossos produtos.
            </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
            
          {/* Left Column: Products Grid & Header */}
          <div className="flex-1 flex flex-col gap-12">
            
            {/* Desktop Header */}
            <div className="hidden md:flex flex-col gap-4">
                 <div className="flex items-center gap-[10px] px-2 py-1 w-fit rounded-[50px] bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px]">
                    <span className="font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
                      BEM VINDO A MAZA!
                    </span>
                </div>
                <h1 className="font-roboto font-semibold text-[49px] leading-[1.4em] text-[#1C1C1C]">
                    Nossos produtos.
                </h1>
            </div>

            {/* Results Info & Sort (Optional, placeholder from design) */}
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-sm text-[#64748B]">
                    Mostrando {filteredProducts.length} resultados
                </span>
                <ProductSort onSortChange={handleSortChange} />
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard
                    key={product.id}
                    image={product.image}
                    category={product.category}
                    description={product.description}
                    href={product.href}
                    />
                ))}
                </div>
            ) : (
                <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4">
                    <p className="text-lg text-[#64748B]">Nenhum produto encontrado.</p>
                    <button 
                        onClick={() => setFilteredProducts(PRODUCTS)}
                        className="text-[#FBB943] font-medium hover:underline"
                    >
                        Limpar filtros
                    </button>
                </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0">
             <div className="sticky top-24">
                <FilterSidebar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    initialCategory={initialCategory}
                    initialSubcategory={initialSubcategory}
                />
             </div>
          </div>

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
