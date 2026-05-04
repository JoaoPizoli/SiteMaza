"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, FileText, ShieldCheck, Droplets, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import type { PRODUCTS } from "@/lib/products";

type Product = typeof PRODUCTS[0];

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const FEATURES = [
  { icon: ShieldCheck, label: "Alta cobertura" },
  { icon: Droplets, label: "Resistente à umidade" },
  { icon: Sparkles, label: "Acabamento uniforme" },
];

const SPECS: { label: string; value: string }[] = [
  { label: "Diluição", value: "Até 10% com água" },
  { label: "Rendimento", value: "Até 300 m²/demão" },
  { label: "Secagem ao toque", value: "30 minutos" },
  { label: "Repintura", value: "4 horas" },
  { label: "Embalagens", value: "3,6L e 18L" },
  { label: "Validade", value: "36 meses" },
];

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  return (
    <div className="w-full font-roboto bg-white">
      {/* Top gradient band */}
      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FCFCF7] via-white to-white"
        />
        <div
          aria-hidden
          className="absolute -top-10 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 -z-10"
          style={{ background: "radial-gradient(circle, rgba(251,185,67,0.35) 0%, transparent 70%)" }}
        />

        <div className="w-full max-w-[1440px] mx-auto px-6 xl:px-10 pt-[140px] pb-16">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[13px] text-[#5F5F5A] mb-8">
            <Link href="/" className="hover:text-[#B11116] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
            <Link href="/produtos" className="hover:text-[#B11116] transition-colors">Produtos</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
            <span className="text-[#1C1C1C] font-medium truncate">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#F1F1EA] to-white border border-[#EBEBEB] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={75}
                  className="object-contain p-8"
                  priority
                  fetchPriority="high"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-[#B11116]/5 via-transparent to-[#FBB943]/10 pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)] w-fit">
                <span className="font-black text-[11px] tracking-[0.14em] text-[#B11116]">
                  {product.category.toUpperCase()}
                </span>
              </div>

              <h1 className="font-bold text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.02em] text-[#1C1C1C]">
                {product.title}
              </h1>

              <p className="text-[#5F5F5A] text-[16px] leading-[1.7]">
                {product.description}
              </p>

              {/* Features */}
              <ul className="flex flex-wrap gap-2 pt-2">
                {FEATURES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#FCFCF7] border border-[#EBEBEB] text-[13px] text-[#1C1C1C]"
                  >
                    <Icon className="w-4 h-4 text-[#B11116]" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  href="/onde-encontrar"
                  className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#B11116] text-white font-semibold text-[14px] tracking-[0.03em] shadow-[0_20px_40px_-15px_rgba(177,17,22,0.6)] hover:bg-[#A00010] hover:-translate-y-0.5 transition-all"
                >
                  <MapPin className="w-4 h-4" aria-hidden />
                  ONDE ENCONTRAR
                </Link>
                <a
                  href="#ficha-tecnica"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[#1C1C1C] text-[#1C1C1C] font-semibold text-[14px] tracking-[0.03em] hover:bg-[#1C1C1C] hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4" aria-hidden />
                  FICHA TÉCNICA
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <section id="ficha-tecnica" className="w-full max-w-[1440px] mx-auto px-6 xl:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)] w-fit mb-4">
              <span className="font-black text-[11px] tracking-[0.14em] text-[#B11116]">
                ESPECIFICAÇÕES
              </span>
            </div>
            <h2 className="font-bold text-[30px] md:text-[36px] leading-[1.1] tracking-[-0.02em] text-[#1C1C1C]">
              Ficha técnica resumida.
            </h2>
            <p className="text-[#5F5F5A] text-[15px] leading-[1.6] mt-4 max-w-[420px]">
              Consulte a ficha técnica completa junto ao nosso representante para obter
              orientações de aplicação e condições específicas de uso.
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#EBEBEB] border border-[#EBEBEB] rounded-2xl overflow-hidden">
            {SPECS.map((s) => (
              <div key={s.label} className="bg-white p-5 flex flex-col gap-1">
                <dt className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
                  {s.label.toUpperCase()}
                </dt>
                <dd className="text-[15px] text-[#1C1C1C] font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="w-full bg-[#FCFCF7] py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[1440px] mx-auto px-6 xl:px-10 flex flex-col gap-10"
          >
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)] w-fit">
                  <span className="font-black text-[11px] tracking-[0.14em] text-[#B11116]">
                    TAMBÉM RECOMENDAMOS
                  </span>
                </div>
                <h2 className="font-bold text-[30px] md:text-[38px] leading-[1.1] tracking-[-0.02em] text-[#1C1C1C]">
                  Produtos <span className="text-[#B11116]">relacionados</span>.
                </h2>
              </div>
              <Link
                href="/produtos"
                className="text-[14px] font-semibold text-[#B11116] hover:underline"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * index }}
                >
                  <ProductCard
                    image={relatedProduct.image}
                    category={relatedProduct.category}
                    description={relatedProduct.description}
                    href={relatedProduct.href}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
