"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Leaf, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Visao",
    icon: Eye,
    text: "Ser percebida como uma industria confiavel, atual e tecnicamente preparada para diferentes mercados.",
  },
  {
    title: "Valores",
    icon: Leaf,
    text: "Valorizacao de pessoas, responsabilidade na entrega e compromisso com relacoes duradouras.",
  },
  {
    title: "Missao",
    icon: Target,
    text: "Oferecer produtos com qualidade constante, suporte comercial e desempenho que fortalecem nossos parceiros.",
  },
];

const stats = [
  { value: "+27", label: "anos de historia" },
  { value: "+600", label: "cargas expedidas por mes" },
  { value: "+85", label: "transportadoras parceiras" },
];

const certificates = [
  "/assets/certificates/certificate-1.png",
  "/assets/certificates/certificate-2.png",
  "/assets/certificates/certificate-3.png",
  "/assets/certificates/certificate-4.png",
  "/assets/certificates/certificate-5.png",
];

export default function AboutPage() {
  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-40">
      <div className="site-container">
        <section className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="surface-panel-dark relative overflow-hidden p-8 md:p-10"
          >
            <div className="outline-grid absolute inset-0 opacity-25" />
            <div className="relative z-10">
              <span className="section-tag">Quem somos</span>
              <h1 className="mt-5 max-w-[10ch] font-display text-4xl leading-[1.02] text-white md:text-[4.15rem]">
                Uma historia construida com qualidade e consistencia.
              </h1>
              <p className="mt-5 max-w-[58ch] text-base leading-8 text-white/76">
                Com fabrica instalada em Mococa - SP, a Maza cresce apoiada em
                tecnologia, portfolio amplo e relacoes comerciais de longo
                prazo. O novo desenho do site reforca essa maturidade com uma
                apresentacao mais elegante, clara e institucional.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-white/10 bg-white/8 p-4"
                  >
                    <p className="font-display text-3xl text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/64">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/produtos">Conhecer linhas</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/8 text-white hover:bg-white/12"
                >
                  <Link href="/onde-encontrar">Falar com a rede comercial</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="surface-panel relative overflow-hidden p-0"
          >
            <div className="relative min-h-[620px]">
              <Image
                src="/assets/home/hero-bg.png"
                alt="Estrutura de producao e presenca da Maza"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.04)_0%,rgba(18,22,32,0.32)_100%)]" />

              <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/70 bg-white/82 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Compromisso com resultado
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone">
                      A Maza segue investindo em tecnologia, atendimento e
                      evolucao de portfolio para entregar mais seguranca tecnica
                      e mais valor de marca aos seus parceiros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="surface-panel flex h-full flex-col gap-4 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-ink">
                    {value.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-stone">
                    {value.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-8 surface-panel p-8 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-tag">Certificados</span>
              <h2 className="section-title mt-5 max-w-[10ch]">
                Reforco institucional para uma marca mais confiavel.
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-7 text-stone">
              A apresentacao de certificados e processos foi redesenhada para
              agregar credibilidade sem poluir a leitura do restante da pagina.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {certificates.map((certificate, index) => (
              <div
                key={certificate}
                className="flex min-h-[132px] items-center justify-center rounded-[28px] border border-[#171d29]/8 bg-white"
              >
                <div className="relative h-16 w-20">
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
        </section>
      </div>
    </main>
  );
}
