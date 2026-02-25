"use client";

import * as React from "react";
import { Search, ChevronDown, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  className?: string;
  onSearch: (query: string) => void;
  onFilterChange: (category: string, subcategory?: string) => void;
  initialCategory?: string | null;
  initialSubcategory?: string;
}

const CATEGORIES = [
  {
    id: "automotiva",
    label: "Automotiva",
    subcategories: [
      "Adesivos",
      "Complementos",
      "Primer e Verniz",
      "Tinta Poliester",
      "Tinta PU",
      "Esmalte Sintético",
      "Massa Poliéster",
      "Massa Rápida",
      "Removedor",
    ],
  },
  {
    id: "imobiliaria",
    label: "Imobiliária",
    subcategories: [
      "Acabamentos",
      "Complementos",
      "Esmaltes",
      "Massas",
      "Texturas",
      "Tintas",
      "Vernizes",
    ],
  },
  {
    id: "industrial",
    label: "Industrial",
    subcategories: [
      "Anticorrosivos",
      "Demarcação Viária",
      "Epóxi",
      "Esmaltes",
      "Primers",
      "Tintas",
    ],
  },
  {
    id: "impermeabilizantes",
    label: "Impermeabilizantes",
    subcategories: [
      "Mantas Líquidas",
      "Aditivos",
      "Complementos",
      "Fitas",
      "Mantas Asfálticas",
    ],
  },
];

export function FilterSidebar({ 
  className, 
  onSearch, 
  onFilterChange,
  initialCategory,
  initialSubcategory 
}: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openSection, setOpenSection] = React.useState<string | null>("automotiva");
  const [activeFilter, setActiveFilter] = React.useState<{ category: string; subcategory?: string } | null>(null);

  React.useEffect(() => {
    if (initialCategory) {
      setOpenSection(initialCategory);
      if (initialSubcategory) {
        setActiveFilter({ category: initialCategory, subcategory: initialSubcategory });
      } else {
         // If only category is provided, maybe we don't select a subcategory yet, 
         // or we select the first one if implied? 
         // The user said "filtrando pela primeira sessão". 
         // The parent component passes the first subcategory. 
         // So if initialSubcategory is passed, we use it.
      }
    }
  }, [initialCategory, initialSubcategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleFilterClick = (category: string, subcategory?: string) => {
    setActiveFilter({ category, subcategory });
    onFilterChange(category, subcategory);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    onFilterChange("");
  };

  return (
    <aside className={cn("flex flex-col gap-8 w-full max-w-[300px]", className)}>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative w-full">
        <div className="relative flex items-center w-full h-12 rounded-full border border-[#E2E8F0] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#B11116] transition-all">
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-6 pr-12 text-sm text-[#1C1C1C] placeholder:text-[#94A3B8] outline-none bg-transparent"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 aspect-square flex items-center justify-center rounded-full bg-[#B11116] hover:bg-[#8B0D11] text-white transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Active Filter Display */}
      {activeFilter && (
        <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
          <span className="text-xs font-medium text-[#64748B]">
            Filtrando por: <span className="text-[#1C1C1C]">{activeFilter.subcategory || activeFilter.category}</span>
          </span>
          <button onClick={clearFilter} className="ml-auto text-[#94A3B8] hover:text-[#EF4444]">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Categories Accordion */}
      <div className="flex flex-col w-full border-t border-[#E2E8F0]">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="border-b border-[#E2E8F0]">
            <button
              onClick={() => toggleSection(category.id)}
              className="flex items-center justify-between w-full py-4 text-left group"
            >
              <span className={cn(
                "font-bold text-lg transition-colors",
                openSection === category.id ? "text-[#B11116]" : "text-[#1C1C1C] group-hover:text-[#B11116]"
              )}>
                {category.label}
              </span>
              <ChevronDown 
                className={cn(
                  "w-5 h-5 text-[#94A3B8] transition-transform duration-300",
                  openSection === category.id ? "rotate-180 text-[#B11116]" : ""
                )} 
              />
            </button>
            
            <AnimatePresence>
              {openSection === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pb-4 pl-4">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleFilterClick(category.id, sub)}
                        className={cn(
                          "flex items-center gap-2 text-sm transition-colors text-left",
                          activeFilter?.subcategory === sub 
                            ? "text-[#B11116] font-medium" 
                            : "text-[#64748B] hover:text-[#1C1C1C]"
                        )}
                      >
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full transition-colors",
                          activeFilter?.subcategory === sub ? "bg-[#B11116]" : "bg-[#E2E8F0]"
                        )} />
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </aside>
  );
}
