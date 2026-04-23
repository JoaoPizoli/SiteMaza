"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const detailCards = [
  {
    title: "Acabamento",
    icon: Sparkles,
    key: "finish",
  },
  {
    title: "Aplicacao",
    icon: Layers3,
    key: "application",
  },
] as const;

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-40">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="surface-panel-dark relative overflow-hidden p-8 md:p-10"
          >
            <div className="outline-grid absolute inset-0 opacity-25" />
            <div className="relative z-10">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  {product.lineLabel}
                </span>
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/74">
                  {product.subcategory}
                </span>
              </div>

              <h1 className="mt-6 max-w-[12ch] font-display text-4xl leading-[1.02] text-white md:text-[4rem]">
                {product.title}
              </h1>

              <p className="mt-5 max-w-[58ch] text-base leading-8 text-white/76">
                {product.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {detailCards.map((card) => {
                  const Icon = card.icon;
                  const content = product[card.key];

                  return (
                    <div
                      key={card.title}
                      className="rounded-[26px] border border-white/10 bg-white/8 p-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/12 text-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-4 font-display text-xl text-white">
                        {card.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-white/72">
                        {content}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-[#111826]/92 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/14 text-gold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Destaques do produto
                    </p>
                    <p className="text-sm text-white/54">
                      Argumentos comerciais para apresentacao e especificacao.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {product.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/76"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/onde-encontrar">Encontrar um consultor</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/8 text-white hover:bg-white/12"
                >
                  <Link href="/produtos">Voltar ao catalogo</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="surface-panel overflow-hidden p-0"
          >
            <div className="relative min-h-[620px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.04)_0%,rgba(18,22,32,0.32)_100%)]" />

              <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/70 bg-white/82 p-5 backdrop-blur-xl">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand/70">
                  Descricao estendida
                </span>
                <p className="mt-3 text-sm leading-7 text-stone">
                  {product.longDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 md:mt-20"
        >
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <span className="section-tag">Relacionados</span>
              <h2 className="section-title mt-5 max-w-[12ch]">
                Continue navegando por linhas complementares.
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                image={relatedProduct.image}
                lineLabel={relatedProduct.lineLabel}
                category={relatedProduct.category}
                subcategory={relatedProduct.subcategory}
                title={relatedProduct.title}
                description={relatedProduct.description}
                href={relatedProduct.href}
              />
            ))}
          </div>
        </motion.section>

        <div className="mt-10 flex items-center gap-3 rounded-[24px] border border-[#171d29]/8 bg-white/70 px-5 py-4 text-sm text-stone shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <CheckCircle2 className="h-5 w-5 text-brand" />
          Visual, conteudo e navegacao alinhados para uma apresentacao de
          produto mais premium e mais objetiva.
        </div>
      </div>
    </main>
  );
}
