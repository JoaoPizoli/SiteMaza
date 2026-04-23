"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const productLines = [
  {
    title: "Imobiliaria",
    description:
      "Tintas, massas e acabamentos para obras que pedem cobertura, leitura visual e rendimento comercial.",
    image: "/assets/figma/imobiliaria.png",
    href: "/produtos?category=imobiliaria",
  },
  {
    title: "Automotiva",
    description:
      "Preparacao, repintura e protecao com foco em acabamento consistente e produtividade de oficina.",
    image: "/assets/figma/automotivo.png",
    href: "/produtos?category=automotiva",
  },
  {
    title: "Industrial",
    description:
      "Solucoes para manutencao, estruturas e areas produtivas com resistencia e desempenho tecnico.",
    image: "/assets/figma/industrial.png",
    href: "/produtos?category=industrial",
  },
  {
    title: "Impermeabilizantes",
    description:
      "Protecao contra umidade e infiltracao para obras que nao podem abrir mao de seguranca estrutural.",
    image: "/assets/figma/impermeabilizantes.png",
    href: "/produtos?category=impermeabilizantes",
  },
];

const certificates = [
  "/assets/certificates/certificate-1.png",
  "/assets/certificates/certificate-2.png",
  "/assets/certificates/certificate-3.png",
  "/assets/certificates/certificate-4.png",
  "/assets/certificates/certificate-5.png",
];

export function ProductsSection() {
  return (
    <section className="py-24 md:py-32">
      <motion.div
        className="site-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={itemVariants} className="surface-panel p-8 md:p-10">
            <span className="section-tag">Linhas de produtos</span>
            <h2 className="section-title mt-5 max-w-[11ch]">
              Um portfolio desenhado para vender melhor.
            </h2>
            <p className="section-copy mt-5 max-w-[55ch]">
              Reorganizamos a apresentacao das linhas para destacar aplicacao,
              desempenho e direcionamento comercial. O resultado e uma vitrine
              mais premium, mais facil de navegar e muito mais profissional.
            </p>

            <div className="mt-8 space-y-4 rounded-[28px] border border-[#171d29]/10 bg-sand/70 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Certificados e processos em destaque
                  </p>
                  <p className="text-sm leading-6 text-stone">
                    Apresentacao mais institucional para reforcar percepcao de
                    qualidade e confiabilidade.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {certificates.map((certificate, index) => (
                  <div
                    key={certificate}
                    className="flex h-[92px] items-center justify-center rounded-[22px] border border-[#171d29]/8 bg-white"
                  >
                    <div className="relative h-12 w-16">
                      <Image
                        src={certificate}
                        alt={`Certificado ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild size="lg" className="mt-8">
              <Link href="/produtos">Ver catalogo completo</Link>
            </Button>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {productLines.map((line) => (
              <motion.div key={line.title} variants={itemVariants}>
                <Link
                  href={line.href}
                  className="group relative block min-h-[340px] overflow-hidden rounded-[32px] border border-white/40 bg-ink"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={line.image}
                      alt={line.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.06)_0%,rgba(18,22,32,0.84)_100%)]" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-white/12 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
                        Linha especializada
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition-transform duration-300 group-hover:-translate-y-1">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-display text-3xl text-white">
                        {line.title}
                      </h3>
                      <p className="max-w-[28ch] text-sm leading-7 text-white/74">
                        {line.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                        Ver produtos
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
