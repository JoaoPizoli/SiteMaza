"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import { PRODUCT_FILTERS } from "@/lib/products";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  className?: string;
  onSearch: (query: string) => void;
  onFilterChange: (category: string, subcategory?: string) => void;
  initialCategory?: string | null;
  initialSubcategory?: string | null;
  searchValue?: string;
}

export function FilterSidebar({
  className,
  onSearch,
  onFilterChange,
  initialCategory,
  initialSubcategory,
  searchValue,
}: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openSection, setOpenSection] = React.useState<string | null>(
    initialCategory ?? PRODUCT_FILTERS[0]?.id ?? null,
  );
  const [activeFilter, setActiveFilter] = React.useState<{
    category: string;
    subcategory?: string;
  } | null>(
    initialCategory
      ? { category: initialCategory, subcategory: initialSubcategory ?? undefined }
      : null,
  );

  React.useEffect(() => {
    if (initialCategory) {
      setOpenSection(initialCategory);
      setActiveFilter({
        category: initialCategory,
        subcategory: initialSubcategory ?? undefined,
      });
      return;
    }

    setActiveFilter(null);
  }, [initialCategory, initialSubcategory]);

  React.useEffect(() => {
    setSearchQuery(searchValue ?? "");
  }, [searchValue]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterClick = (category: string, subcategory?: string) => {
    setActiveFilter({ category, subcategory });
    onFilterChange(category, subcategory);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setSearchQuery("");
    onSearch("");
    onFilterChange("");
  };

  return (
    <aside className={cn("flex w-full flex-col gap-5", className)}>
      <div className="surface-panel p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand/70">
          Busca rapida
        </span>

        <form onSubmit={handleSearch} className="mt-4">
          <div className="relative flex items-center rounded-full border border-[#171d29]/10 bg-white px-4 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <Search className="h-4 w-4 text-brand" />
            <input
              type="text"
              placeholder="Buscar produto"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-11 w-full bg-transparent pl-3 pr-12 text-sm text-ink outline-none placeholder:text-stone"
            />
            <button
              type="submit"
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-strong"
              aria-label="Pesquisar"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm leading-6 text-stone">
          Filtre por linha ou subcategoria para apresentar o portfolio certo
          com mais rapidez.
        </p>
      </div>

      {activeFilter ? (
        <div className="surface-panel flex items-start gap-3 p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70">
              Filtro ativo
            </p>
            <p className="mt-2 text-sm text-ink">
              {activeFilter.subcategory ?? activeFilter.category}
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilter}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#171d29]/10 bg-sand/60 text-stone transition-colors hover:border-brand/20 hover:text-brand"
            aria-label="Limpar filtros"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="surface-panel p-3">
        {PRODUCT_FILTERS.map((category, index) => {
          const isOpen = openSection === category.id;

          return (
            <div
              key={category.id}
              className={cn(
                "overflow-hidden rounded-[24px] border border-transparent transition-colors",
                index > 0 && "mt-3",
                isOpen ? "border-brand/10 bg-brand/4" : "hover:border-[#171d29]/8",
              )}
            >
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : category.id)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <div>
                  <p
                    className={cn(
                      "text-base font-semibold transition-colors",
                      isOpen ? "text-brand" : "text-ink",
                    )}
                  >
                    {category.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone">
                    {category.description}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-stone transition-transform duration-300",
                    isOpen && "rotate-180 text-brand",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 px-4 pb-4">
                      <button
                        type="button"
                        onClick={() => handleFilterClick(category.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-[18px] px-4 py-3 text-sm font-medium transition-all",
                          activeFilter?.category === category.id &&
                            !activeFilter?.subcategory
                            ? "bg-brand text-white shadow-[0_14px_28px_rgba(170,27,31,0.2)]"
                            : "bg-white text-ink hover:bg-sand/80",
                        )}
                      >
                        <span>Todos da linha</span>
                        <span className="text-[11px] uppercase tracking-[0.2em]">
                          Ver
                        </span>
                      </button>

                      <div className="grid gap-2">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={() =>
                              handleFilterClick(category.id, subcategory)
                            }
                            className={cn(
                              "rounded-[18px] border px-4 py-3 text-left text-sm transition-all",
                              activeFilter?.subcategory === subcategory
                                ? "border-brand/20 bg-brand/8 text-brand"
                                : "border-[#171d29]/8 bg-white/70 text-stone hover:border-brand/14 hover:text-ink",
                            )}
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
