"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CarFront,
  Factory,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const productLines = [
  {
    title: "Imobiliaria",
    image: "/assets/figma/imobiliaria.png",
    icon: Building2,
  },
  {
    title: "Automotiva",
    image: "/assets/figma/automotivo.png",
    icon: CarFront,
  },
  {
    title: "Industrial",
    image: "/assets/figma/industrial.png",
    icon: Factory,
  },
  {
    title: "Impermeabilizantes",
    image: "/assets/figma/impermeabilizantes.png",
    icon: Waves,
  },
];

const trustItems = [
  { value: "27+", label: "anos construindo confianca" },
  { value: "600+", label: "cargas expedidas por mes" },
  { value: "85+", label: "transportadoras parceiras" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 text-white md:pb-24 md:pt-40">
      <div className="absolute inset-0">
        <Image
          src="/assets/home/hero-bg.png"
          alt="Linhas de tintas Maza"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(10,14,22,0.92)_0%,rgba(10,14,22,0.74)_45%,rgba(10,14,22,0.5)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,152,57,0.22),transparent_28%),radial-gradient(circle_at_75%_22%,rgba(170,27,31,0.22),transparent_30%)]" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="site-container relative z-10"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                <ShieldCheck className="h-4 w-4" />
                Paixao por qualidade e resultado
              </span>

              <h1 className="display-title max-w-[12ch] text-white">
                Tintas com presenca forte, acabamento premium e desempenho real.
              </h1>

              <p className="max-w-[58ch] text-base leading-8 text-white/76 md:text-lg">
                Da obra ao processo industrial, a Maza organiza um portfolio
                completo para quem precisa vender melhor, especificar com
                seguranca e entregar um resultado profissional em cada projeto.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button asChild size="xl">
                <Link href="/produtos">
                  Explorar catalogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/12 bg-white/8 text-white hover:bg-white/12"
              >
                <Link href="/onde-encontrar">Encontrar representante</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid gap-3 sm:grid-cols-3"
            >
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-xl"
                >
                  <p className="font-display text-3xl text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <div className="surface-panel-dark relative overflow-hidden p-6 md:p-8">
              <div className="outline-grid absolute inset-0 opacity-30" />
              <div className="relative z-10">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                      Mapa de portfolio
                    </span>
                    <h2 className="mt-3 max-w-[10ch] font-display text-3xl leading-[1.05] text-white">
                      Quatro linhas com linguagem visual consistente.
                    </h2>
                  </div>

                  <p className="max-w-[26ch] text-sm leading-6 text-white/62">
                    Cada segmento foi reorganizado para apresentar melhor as
                    solucoes, os acessos e a confianca da marca.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {productLines.map((line) => {
                    const Icon = line.icon;

                    return (
                      <div
                        key={line.title}
                        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-4"
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={line.image}
                            alt={line.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,22,0.06)_0%,rgba(10,14,22,0.76)_100%)]" />
                        </div>

                        <div className="relative z-10 flex min-h-[172px] flex-col justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/14 bg-white/12 backdrop-blur-sm">
                            <Icon className="h-5 w-5 text-gold" />
                          </div>

                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
                              Linha especializada
                            </span>
                            <h3 className="mt-2 font-display text-2xl text-white">
                              {line.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
