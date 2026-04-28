"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { type LucideIcon, Eye, Target, Heart, Leaf } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type Pillar = { icon: LucideIcon; title: string; text?: string; items?: string[] };

const PILLARS: Pillar[] = [
  {
    icon: Eye,
    title: "Visão",
    text: "Ser uma das principais organizações no segmento atuante, com reconhecimento pela excelência em qualidade e ser referência em produtos com qualidade.",
  },
  {
    icon: Heart,
    title: "Valores",
    items: [
      "Pessoas — responsabilidade e confiança, contribuindo para o sucesso da organização.",
      "Clientes — razão das nossas operações. Nosso sucesso depende do sucesso dos clientes.",
      "Qualidade — responsabilidade de todos para aumentar a satisfação dos nossos clientes.",
      "Trabalho em equipe — incentivado para o crescimento pessoal e da organização.",
    ],
  },
  {
    icon: Target,
    title: "Missão",
    text: "A Maza Produtos Químicos, fabricante de tintas e vernizes, busca oferecer produtos de qualidade que satisfaçam as necessidades e as expectativas dos nossos clientes.",
  },
];

const STATS = [
  { value: "+27", label: "Anos no mercado" },
  { value: "+600", label: "Cargas por mês" },
  { value: "+85", label: "Transportadoras parceiras" },
  { value: "4", label: "Linhas de produtos" },
];

const TIMELINE = [
  { year: "1997", title: "Fundação", desc: "Início das operações em Mococa-SP com foco em tintas imobiliárias." },
  { year: "2008", title: "Expansão", desc: "Chegada das linhas automotiva e industrial ao portfólio." },
  { year: "2016", title: "Inovação", desc: "Investimento em tecnologia e novos produtos com responsabilidade ambiental." },
  { year: "Hoje", title: "Presença nacional", desc: "Mais de 85 transportadoras e distribuição em todo o Brasil." },
];

const CERTIFICATES = [
  {
    src: "/assets/certificates/iso.png", w: 85, h: 96,
    name: "ISO 9001",
    desc: "Seguimos a norma ISO 9001, garantindo um bom desenvolvimento na fabricação e comercialização de tintas, vernizes e solventes.",
  },
  {
    src: "/assets/certificates/tintaDeQualidade.png", w: 99, h: 100,
    name: "Tinta de Qualidade",
    desc: "Empresa certificada e associada à ABRAFATI — Associação Brasileira dos Fabricantes de Tintas, garantindo qualidade e seriedade com o consumidor.",
  },
  {
    src: "/assets/certificates/certificate-3.png", w: 86, h: 56,
    name: "Coatings Care",
    desc: "Programa internacional de compromisso com saúde, segurança e não agressão ao meio ambiente na cadeia produtiva de tintas, adotado em diversos países.",
  },
  {
    src: "/assets/certificates/certificate-4.png", w: 110, h: 59,
    name: "PBQP-H",
    desc: "Programa Brasileiro da Qualidade e Produtividade do Habitat — instrumento do Governo Federal para melhoria da qualidade e modernização na construção civil.",
  },
  {
    src: "/assets/certificates/certificate-5.png", w: 110, h: 55,
    name: "Petrobras CRCC",
    desc: "Empresa cadastrada no CRCC Petrobras e apta a fornecer bens, podendo ser convidada a participar de licitações via Petronect.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-white font-roboto">
      {/* HERO */}
      <section className="relative isolate flex min-h-[780px] w-full items-center overflow-hidden px-6 py-24 pt-[160px] xl:px-10">
        <Image
          src="/assets/about/fabrica.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,28,28,0.72)_0%,rgba(28,28,28,0.48)_46%,rgba(28,28,28,0.18)_100%)]"
        />

        <motion.div
          className="mx-auto w-full max-w-[1440px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex w-full justify-start">
            <div className="flex w-full max-w-[690px] flex-col gap-8 rounded-3xl bg-white p-6 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.55)] md:p-10 lg:p-12">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)] w-fit">
                  <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                    QUEM SOMOS
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-bold text-[44px] md:text-[60px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C]"
              >
                Conheça a <span className="text-[#B11116]">Maza</span>.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-[#5F5F5A] text-[16px] lg:text-[17px] leading-[1.7] max-w-[590px]"
              >
                Há 27 anos no mercado a Tintas Maza se destaca na fabricação de tintas
                imobiliárias, automotivas, industriais e solventes. Com sua fábrica instalada
                na cidade de Mococa-SP, a Maza cada vez mais investe em novas tecnologias e
                inovações, para entregar aos seus consumidores e clientes produtos com qualidade
                garantida, responsabilidade ambiental e serviços excelentes.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-[#5F5F5A] text-[16px] leading-[1.7] max-w-[590px]"
              >
                Sempre buscando diferenciais, a Maza tem um dos maiores portfolios de tintas do
                mercado para todos os fins. É assim com muito trabalho, pessoas comprometidas,
                produtos de qualidade e compromisso com o sucesso de nossos clientes que
                continuamos a nossa história...
              </motion.p>

              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#EBEBEB]">
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <span className="font-bold text-[28px] lg:text-[34px] leading-none text-[#B11116]">
                      {s.value}
                    </span>
                    <span className="text-[12px] text-[#5F5F5A] leading-snug">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PILARES */}
      <section className="w-full py-20 lg:py-24 px-6 xl:px-10 bg-[#FCFCF7]">
        <motion.div
          className="w-full max-w-[1440px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
              <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                NOSSOS PILARES
              </span>
            </div>
            <h2 className="font-bold text-[36px] md:text-[46px] leading-[1.1] tracking-[-0.02em] text-[#1C1C1C]">
              O que nos <span className="text-[#B11116]">move</span>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, text, items }, i) => (
              <motion.article
                key={title}
                variants={itemVariants}
                className="group relative flex flex-col gap-5 p-8 bg-white border border-[#EBEBEB] rounded-2xl hover:border-[#B11116]/30 hover:shadow-[0_20px_60px_-30px_rgba(177,17,22,0.3)] hover:-translate-y-1 transition-all duration-500"
              >
                <span className="absolute top-5 right-5 font-bold text-[48px] text-[#F1F1EA] leading-none select-none">
                  0{i + 1}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-[#B11116] grid place-items-center shadow-[0_10px_30px_-10px_rgba(177,17,22,0.5)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Icon className="w-7 h-7 text-white" aria-hidden />
                </div>
                <h3 className="font-bold text-[22px] text-[#1C1C1C]">{title}</h3>
                {text && <p className="text-[#5F5F5A] text-[15px] leading-[1.6]">{text}</p>}
                {items && (
                  <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#5F5F5A] leading-[1.5]">
                        <span aria-hidden className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#B11116] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="w-full py-20 lg:py-24 px-6 xl:px-10">
        <motion.div
          className="w-full max-w-[1440px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
              <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                NOSSA JORNADA
              </span>
            </div>
            <h2 className="font-bold text-[36px] md:text-[46px] leading-[1.1] tracking-[-0.02em] text-[#1C1C1C]">
              Quase 3 décadas de história.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Linha conectora */}
            <div aria-hidden className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B11116]/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  variants={itemVariants}
                  className="relative flex flex-col items-start gap-3"
                >
                  <div className="relative">
                    <span className="block w-12 h-12 rounded-full bg-[#B11116] text-white font-bold grid place-items-center shadow-[0_10px_30px_-10px_rgba(177,17,22,0.5)] relative z-10">
                      {i + 1}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[#B11116]/30 animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                  </div>
                  <span className="text-[22px] font-bold text-[#1C1C1C]">{t.year}</span>
                  <h3 className="font-semibold text-[16px] text-[#B11116]">{t.title}</h3>
                  <p className="text-[14px] text-[#5F5F5A] leading-[1.6]">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SUSTENTABILIDADE */}
      <section className="w-full py-20 lg:py-24 px-6 xl:px-10 bg-gradient-to-br from-[#1C1C1C] to-[#2a2a2a] relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-maza-grid opacity-10" />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(177,17,22,0.5) 0%, transparent 70%)" }}
        />
        <motion.div
          className="w-full max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit">
              <Leaf className="w-3.5 h-3.5 text-[#FBB943]" aria-hidden />
              <span className="font-black text-[12px] tracking-[0.14em] text-[#FBB943]">
                SUSTENTABILIDADE
              </span>
            </div>
            <h2 className="font-bold text-[36px] md:text-[46px] leading-[1.1] tracking-[-0.02em] text-white">
              Compromisso com o <span className="text-[#FBB943]">planeta</span>.
            </h2>
            <p className="text-white/75 text-[16px] leading-[1.7]">
              A Maza não gera nenhum resíduo em seu processo de fabricação e seleciona somente
              fornecedores com certificados e cultura de proteção ambiental.
            </p>
            <p className="text-white/75 text-[16px] leading-[1.7]">
              Temos também, em âmbito regional, ações sociais e culturais. É assim, com foco
              em processos e produtos cada vez mais sustentáveis, que conduzimos nossa
              política ambiental.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Zero resíduos", desc: "Nosso processo produtivo não gera nenhum resíduo." },
              { title: "Fornecedores certificados", desc: "Selecionamos apenas parceiros com cultura ambiental." },
              { title: "Ações sociais", desc: "Projetos regionais de impacto social e cultural." },
              { title: "Política ambiental", desc: "Foco em processos e produtos cada vez mais sustentáveis." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-[15px] text-white">{item.title}</h3>
                <p className="text-[13px] text-white/60 leading-[1.5]">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CERTIFICADOS */}
      <section className="w-full pt-16 lg:pt-20 pb-24 lg:pb-32 px-6 xl:px-10">
        <motion.div
          className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
              <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                CERTIFICADOS
              </span>
            </div>
            <h2 className="font-bold text-[28px] md:text-[34px] text-[#1C1C1C]">
              Reconhecimento e confiança
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {CERTIFICATES.map((c, i) => (
              <div
                key={i}
                className="group flex flex-col gap-4 p-6 bg-[#FCFCF7] border border-[#EBEBEB] rounded-2xl hover:border-[#B11116]/30 hover:shadow-[0_20px_50px_-20px_rgba(177,17,22,0.2)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative flex-shrink-0" style={{ width: c.w, height: c.h }}>
                  <Image src={c.src} alt={c.name} fill sizes={`${c.w}px`} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-[#EBEBEB]">
                  <h3 className="font-bold text-[15px] text-[#1C1C1C]">{c.name}</h3>
                  <p className="text-[13px] text-[#5F5F5A] leading-[1.5]">{c.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

