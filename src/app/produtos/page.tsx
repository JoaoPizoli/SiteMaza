"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, FolderSearch } from "lucide-react";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSort } from "@/components/products/ProductSort";
import { Button } from "@/components/ui/button";
import {
  filterProducts,
  getProductLine,
  type ProductLineId,
} from "@/lib/products";

function sortProducts(products: ReturnType<typeof filterProducts>, option: string) {
  const sorted = [...products];

  if (option === "Nome (A-Z)") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (option === "Nome (Z-A)") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (option === "Linha (A-Z)") {
    sorted.sort((a, b) => a.lineLabel.localeCompare(b.lineLabel));
  }

  return sorted;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeLine, setActiveLine] = React.useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = React.useState<string | null>(
    null,
  );
  const [sortOption, setSortOption] = React.useState("Mais relevantes");

  React.useEffect(() => {
    setActiveLine(searchParams.get("category"));
    setActiveSubcategory(searchParams.get("subcategory"));
  }, [searchParams]);

  const filteredProducts = sortProducts(
    filterProducts({
      search: searchQuery,
      line: activeLine,
      subcategory: activeSubcategory,
    }),
    sortOption,
  );

  const activeLineData = activeLine
    ? getProductLine(activeLine as ProductLineId)
    : null;

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveLine(null);
    setActiveSubcategory(null);
    setSortOption("Mais relevantes");
  };

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-40">
      <div className="site-container">
        <section className="surface-panel-dark relative overflow-hidden p-8 md:p-10">
          <div className="outline-grid absolute inset-0 opacity-25" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div>
              <span className="section-tag">Catalogo Maza</span>
              <h1 className="mt-5 max-w-[10ch] font-display text-4xl leading-[1.02] text-white md:text-[4.25rem]">
                Produtos organizados para uma navegacao mais profissional.
              </h1>
              <p className="mt-5 max-w-[58ch] text-base leading-8 text-white/74">
                O catalogo agora reforca hierarquia, leitura de linha,
                argumentos comerciais e direcionamento rapido para as categorias
                certas.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Resultados
                </p>
                <p className="mt-3 font-display text-4xl text-white">
                  {filteredProducts.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/64">
                  produtos apresentados com filtro e ordenacao.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Linha ativa
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {activeLineData?.label ?? "Todas as linhas"}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/64">
                  {activeLineData?.description ??
                    "Explore todo o portfolio Maza com uma vitrine mais refinada."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[320px_1fr]">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <FilterSidebar
              onSearch={setSearchQuery}
              onFilterChange={(category, subcategory) => {
                setActiveLine(category || null);
                setActiveSubcategory(subcategory ?? null);
              }}
              initialCategory={activeLine}
              initialSubcategory={activeSubcategory}
              searchValue={searchQuery}
            />
          </div>

          <div className="space-y-6">
            <div className="surface-panel flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70">
                  Visao do catalogo
                </p>
                <p className="mt-2 text-sm leading-7 text-stone">
                  {activeSubcategory
                    ? `Subcategoria selecionada: ${activeSubcategory}.`
                    : "Apresentacao limpa e organizada para facilitar decisao e especificacao."}
                </p>
              </div>

              <ProductSort onSortChange={setSortOption} value={sortOption} />
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    lineLabel={product.lineLabel}
                    category={product.category}
                    subcategory={product.subcategory}
                    title={product.title}
                    description={product.description}
                    href={product.href}
                  />
                ))}
              </div>
            ) : (
              <div className="surface-panel flex flex-col items-center justify-center gap-5 px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/8 text-brand">
                  <FolderSearch className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="font-display text-3xl text-ink">
                    Nenhum produto encontrado
                  </h2>
                  <p className="mt-3 max-w-[44ch] text-sm leading-7 text-stone">
                    Limpe os filtros para voltar ao portfolio completo ou ajuste
                    a busca para encontrar outra linha.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={clearAllFilters} size="lg">
                    Limpar filtros
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/produtos">
                      Atualizar catalogo
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
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
