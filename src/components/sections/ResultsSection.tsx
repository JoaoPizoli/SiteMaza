"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Paintbrush, ShieldHalf } from "lucide-react";

const showcases = [
  {
    title: "Acabamento com leitura premium",
    text: "Apresentacao mais sofisticada para demonstrar qualidade visual e confianca de aplicacao.",
    image: "/assets/home/results/results-placeholder.png",
    metric: "Cobertura uniforme",
  },
  {
    title: "Linha industrial com mais autoridade",
    text: "Cards e destaques reposicionados para comunicar tecnica, resistencia e desempenho.",
    image: "/assets/figma/industrial.png",
    metric: "Protecao duradoura",
  },
  {
    title: "Fluxo automotivo mais comercial",
    text: "Acesso a categorias, beneficios e detalhes com muito mais clareza de navegacao.",
    image: "/assets/figma/automotivo.png",
    metric: "Secagem controlada",
  },
];

const benefits = [
  {
    title: "Mais premium",
    icon: Paintbrush,
    text: "Paleta, tipografia e espacamento agora reforcam uma percepcao mais madura de marca.",
  },
  {
    title: "Mais claro",
    icon: BadgeCheck,
    text: "CTAs, seções e navegação foram reorganizados para destacar o que realmente importa.",
  },
  {
    title: "Mais confiavel",
    icon: ShieldHalf,
    text: "A linguagem visual ficou mais consistente em todas as paginas do site.",
  },
];

export function ResultsSection() {
  return (
    <section className="pb-10 md:pb-16">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]"
        >
          <div className="surface-panel p-8 md:p-10">
            <span className="section-tag">Performance visual</span>
            <h2 className="section-title mt-5 max-w-[11ch]">
              Um site mais profissional tambem vende percepcao.
            </h2>
            <p className="section-copy mt-5 max-w-[56ch]">
              O novo desenho organiza melhor a narrativa da marca, melhora o
              ritmo visual e transforma seções antes genéricas em uma
              apresentacao mais forte, mais atual e mais comercial.
            </p>

            <div className="mt-8 grid gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 rounded-[24px] border border-[#171d29]/10 bg-sand/55 p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-display text-xl text-ink">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-stone">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            {showcases.map((showcase) => (
              <div
                key={showcase.title}
                className="group surface-panel relative overflow-hidden p-0"
              >
                <div className="grid min-h-[218px] gap-0 md:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative min-h-[220px]">
                    <Image
                      src={showcase.image}
                      alt={showcase.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.04)_0%,rgba(18,22,32,0.34)_100%)]" />
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <span className="rounded-full border border-brand/12 bg-brand/8 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                        {showcase.metric}
                      </span>
                      <h3 className="mt-4 font-display text-2xl text-ink">
                        {showcase.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-stone">
                        {showcase.text}
                      </p>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                      Visual renovado
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
