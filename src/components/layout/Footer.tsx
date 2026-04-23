"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_FILTERS } from "@/lib/products";

const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre", label: "Sobre a Maza" },
  { href: "/produtos", label: "Catalogo completo" },
  { href: "/onde-encontrar", label: "Onde encontrar" },
];

const supportPoints = [
  "Portfolio amplo para diferentes segmentos.",
  "Atendimento consultivo para revendas e obras.",
  "Distribuicao com foco em escala e confianca.",
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0d1119] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,152,57,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(170,27,31,0.26),transparent_32%),linear-gradient(180deg,#101521_0%,#0b0f16_100%)]" />
      <div className="outline-grid absolute inset-0 opacity-25" />

      <div className="site-container relative z-10 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 grid gap-6 rounded-[36px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl md:grid-cols-[1.4fr_0.9fr] md:p-8"
        >
          <div>
            <span className="section-tag">Vamos conversar</span>
            <h2 className="mt-5 max-w-[14ch] font-display text-3xl leading-[1.05] text-white md:text-[3.1rem]">
              Pronto para elevar o acabamento dos seus projetos?
            </h2>
            <p className="mt-4 max-w-[60ch] text-sm leading-7 text-white/72 md:text-base">
              A Maza combina tecnologia, portfolio amplo e presenca nacional
              para atender obras, revendas e aplicacoes tecnicas com mais
              seguranca comercial.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-white/10 bg-[#111826]/92 p-5">
            <div className="space-y-3">
              {supportPoints.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm leading-6 text-white/74">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="sm:flex-1">
                <Link href="/onde-encontrar">
                  <MapPinned className="h-4 w-4" />
                  Encontrar ponto de venda
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-white/10 bg-white/6 text-white hover:bg-white/12 sm:flex-1"
              >
                <Link href="/produtos">
                  Ver produtos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 rounded-[36px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl lg:grid-cols-[1.1fr_0.7fr_0.8fr_1fr] lg:p-8">
          <div className="space-y-5">
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-3 w-fit">
              <Image
                src="/assets/navbar/logo-maza.png"
                alt="Tintas Maza"
                width={122}
                height={68}
                className="h-auto w-[110px]"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/40">
                Fabrica em Mococa - SP
              </p>
              <p className="max-w-[34ch] text-sm leading-7 text-white/72">
                Solucoes em tintas e revestimentos com foco em desempenho,
                consistencia visual e confianca para cada etapa da aplicacao.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">
              Navegacao
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/72 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">
              Linhas
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {PRODUCT_FILTERS.map((line) => (
                <Link
                  key={line.id}
                  href={`/produtos?category=${line.id}`}
                  className="text-sm text-white/72 transition-colors hover:text-white"
                >
                  {line.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#111826]/88 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">
              Diferenciais
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Acabamento
                </span>
                <p className="mt-2 text-sm leading-6 text-white/74">
                  Formulacoes pensadas para consistencia, cobertura e leitura de
                  marca no ponto de venda e na obra.
                </p>
              </div>

              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Performance
                </span>
                <p className="mt-2 text-sm leading-6 text-white/74">
                  Portfolio preparado para aplicacoes imobiliarias, automotivas,
                  industriais e de impermeabilizacao.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <span>Politica de privacidade</span>
          <span>Tintas Maza. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
