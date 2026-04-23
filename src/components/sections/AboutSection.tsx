"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Sparkles, Target } from "lucide-react";

const pillars = [
  {
    title: "Visao",
    icon: Eye,
    text: "Ser referencia no segmento com uma marca reconhecida por consistencia, proximidade comercial e acabamento superior.",
  },
  {
    title: "Valores",
    icon: Sparkles,
    text: "Trabalho serio, parceria duradoura e evolucao constante para atender clientes, obras e revendas com mais clareza.",
  },
  {
    title: "Missao",
    icon: Target,
    text: "Entregar solucoes confiaveis que elevam a experiencia do aplicador e fortalecem a competitividade de nossos parceiros.",
  },
];

const stats = [
  { value: "+27", label: "anos de mercado" },
  { value: "+600", label: "cargas expedidas por mes" },
  { value: "+85", label: "transportadoras parceiras" },
];

export function AboutSection() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="surface-panel p-8 md:p-10"
          >
            <span className="section-tag">Sobre a Maza</span>
            <h2 className="section-title mt-5 max-w-[11ch]">
              Marca forte, portfolio amplo e cultura de qualidade.
            </h2>
            <p className="section-copy mt-5">
              Ha 27 anos, a Maza vem consolidando sua presenca em diferentes
              segmentos com investimento constante em tecnologia, portfolio e
              padrao de atendimento. O redesenho do site reforca exatamente essa
              mesma mensagem: uma empresa madura, confiavel e pronta para crescer
              com seus parceiros.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-[#171d29]/10 bg-sand/60 p-4"
                >
                  <p className="font-display text-3xl text-brand">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="grid gap-6"
          >
            <div className="surface-panel relative overflow-hidden p-0">
              <div className="relative min-h-[420px]">
                <Image
                  src="/assets/home/hero-bg.png"
                  alt="Estrutura e presenca de mercado da Maza"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.12)_0%,rgba(18,22,32,0.74)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold">
                      Presenca nacional
                    </p>
                    <p className="mt-3 max-w-[44ch] text-sm leading-7 text-white/80">
                      Da fabrica em Mococa ao suporte para diferentes mercados,
                      a Maza avanca combinando estrutura, distribuicao e
                      posicionamento profissional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    className="surface-panel flex h-full flex-col gap-4 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-display text-xl text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-stone">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
