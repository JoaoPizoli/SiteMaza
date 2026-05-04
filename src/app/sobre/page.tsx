"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  type LucideIcon,
  Eye,
  Target,
  Heart,
  Leaf,
  Award,
  Recycle,
  TreePine,
  HandHeart,
  ShieldCheck,
} from "lucide-react";

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

const SUSTAINABILITY = [
  { icon: Recycle, title: "Zero resíduos", desc: "Nosso processo produtivo não gera nenhum resíduo." },
  { icon: ShieldCheck, title: "Fornecedores certificados", desc: "Selecionamos apenas parceiros com cultura ambiental." },
  { icon: HandHeart, title: "Ações sociais", desc: "Projetos regionais de impacto social e cultural." },
  { icon: TreePine, title: "Política ambiental", desc: "Foco em processos e produtos cada vez mais sustentáveis." },
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

function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  const [litCount, setLitCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const timelineDuration = 3.6;

  // Detecta breakpoint md (768px+)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Ilumina os marcos acompanhando o preenchimento da linha.
  useEffect(() => {
    if (!inView) return;
    const timeouts: number[] = [];
    const startDelay = isDesktop ? 420 : 400;
    const stepDelay = isDesktop
      ? (timelineDuration * 1000) / TIMELINE.length
      : 500;

    TIMELINE.forEach((_, i) => {
      timeouts.push(
        window.setTimeout(
          () => setLitCount((c) => Math.max(c, i + 1)),
          startDelay + i * stepDelay,
        ),
      );
    });
    return () => timeouts.forEach(clearTimeout);
  }, [inView, isDesktop, timelineDuration]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-24 lg:py-32 xl:px-10"
    >
      <motion.div
        className="mx-auto w-full max-w-[1440px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="mb-20 flex flex-col items-center gap-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5">
            <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
              NOSSA JORNADA
            </span>
          </div>
          <h2 className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[52px]">
            Quase 3 décadas de <span className="text-[#B11116]">história</span>.
          </h2>
          <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#5F5F5A]">
            De um sonho em Mococa-SP a uma operação que entrega tintas para todo o
            Brasil — uma trajetória construída a cada camada.
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha base esmaecida (desktop) */}
          <div
            aria-hidden
            className="absolute top-[26px] left-7 right-7 hidden h-1 rounded-full bg-[#1C1C1C]/[0.06] md:block"
          />

          {/* Linha colorida que se preenche durante a animacao */}
          <motion.div
            aria-hidden
            className="maza-timeline-paint-line absolute top-[22px] left-7 right-7 hidden origin-left md:block"
            initial={{ scaleX: 0 }}
            animate={inView && isDesktop ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: timelineDuration,
              ease: "easeInOut",
              delay: 0.2,
              times: [0, 0.14, 0.4, 0.62, 0.86, 1],
            }}
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {TIMELINE.map((t, i) => {
              const isLit = i < litCount;
              return (
                <motion.div
                  key={t.year}
                  variants={itemVariants}
                  className="group relative flex flex-col items-start gap-4"
                >
                  {/* Marcador */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative h-14 w-14">
                      <span
                        className={`relative z-10 grid h-14 w-14 place-items-center rounded-2xl text-[16px] font-extrabold ring-4 ring-white transition-all duration-500 ${
                          isLit
                            ? "scale-100 bg-gradient-to-br from-[#B11116] to-[#7a0b0f] text-white shadow-[0_15px_40px_-10px_rgba(177,17,22,0.55)]"
                            : "scale-90 bg-[#1C1C1C]/[0.07] text-[#1C1C1C]/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {isLit && (
                        <span
                          aria-hidden
                          className="absolute inset-0 animate-ping rounded-2xl bg-[#B11116]/25"
                          style={{ animationDuration: "3s" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-[40px] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-500 ${
                        isLit ? "text-[#1C1C1C]" : "text-[#1C1C1C]/30"
                      }`}
                    >
                      {t.year}
                    </span>
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors duration-500 ${
                        isLit
                          ? "bg-[#B11116]/[0.1] text-[#B11116]"
                          : "bg-[#1C1C1C]/[0.05] text-[#1C1C1C]/35"
                      }`}
                    >
                      {t.title}
                    </span>
                    <p
                      className={`mt-1 text-[14px] leading-[1.6] transition-colors duration-500 ${
                        isLit ? "text-[#5F5F5A]" : "text-[#1C1C1C]/30"
                      }`}
                    >
                      {t.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

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
          quality={65}
          fetchPriority="high"
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
      <section className="relative w-full overflow-hidden bg-[#FCFCF7] px-6 py-24 lg:py-32 xl:px-10">
        <div
          aria-hidden
          className="absolute -top-40 -right-32 -z-0 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.25) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1440px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-col items-center gap-4 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5">
              <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
                NOSSOS PILARES
              </span>
            </div>
            <h2 className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[52px]">
              O que nos <span className="text-[#B11116]">move</span>.
            </h2>
            <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#5F5F5A]">
              Os princípios que sustentam cada decisão, cada produto e cada relacionamento
              construído ao longo de quase três décadas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, text, items }) => (
              <motion.article
                key={title}
                variants={itemVariants}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B11116]/30 hover:shadow-[0_30px_70px_-30px_rgba(177,17,22,0.35)]"
              >
                {/* Gradiente decorativo no topo */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#B11116] via-[#FBB943] to-[#B11116] transition-transform duration-500 group-hover:scale-x-100"
                />

                <Icon className="h-8 w-8 text-[#B11116] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                <h3 className="text-[24px] font-bold tracking-[-0.01em] text-[#1C1C1C]">
                  {title}
                </h3>
                {text && (
                  <p className="text-[15px] leading-[1.65] text-[#5F5F5A]">{text}</p>
                )}
                {items && (
                  <ul className="flex flex-col gap-2.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-[#5F5F5A]"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#B11116]"
                        />
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
      <TimelineSection />


      {/* SUSTENTABILIDADE */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1C1C1C] via-[#232323] to-[#1C1C1C] px-6 py-24 lg:py-32 xl:px-10">
        <div aria-hidden className="absolute inset-0 bg-maza-grid opacity-10" />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 h-[560px] w-[560px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(177,17,22,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.35) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
              <Leaf className="h-3.5 w-3.5 text-[#FBB943]" aria-hidden />
              <span className="text-[12px] font-black tracking-[0.14em] text-[#FBB943]">
                SUSTENTABILIDADE
              </span>
            </div>
            <h2 className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-[52px]">
              Compromisso com o{" "}
              <span className="bg-gradient-to-r from-[#FBB943] via-[#FFD996] to-[#FBB943] bg-clip-text text-transparent">
                planeta
              </span>
              .
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/75 lg:text-[17px]">
              A Maza não gera nenhum resíduo em seu processo de fabricação e seleciona
              somente fornecedores com certificados e cultura de proteção ambiental.
            </p>
            <p className="text-[15px] leading-[1.7] text-white/65">
              Em âmbito regional, mantemos ações sociais e culturais. É assim, com foco em
              processos e produtos cada vez mais sustentáveis, que conduzimos nossa
              política ambiental.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {SUSTAINABILITY.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#FBB943]/30 hover:bg-white/[0.07]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#FBB943] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#FBB943]/12 ring-1 ring-[#FBB943]/25 transition-colors duration-300 group-hover:bg-[#FBB943]/20">
                  <Icon className="h-5 w-5 text-[#FBB943]" aria-hidden />
                </div>
                <h3 className="text-[16px] font-bold text-white">{title}</h3>
                <p className="text-[13px] leading-[1.55] text-white/60">{desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CERTIFICADOS */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#FCFCF7] px-6 pt-20 pb-28 lg:pt-24 lg:pb-32 xl:px-10">
        <motion.div
          className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5">
              <Award className="h-3.5 w-3.5 text-[#B11116]" aria-hidden />
              <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
                CERTIFICADOS
              </span>
            </div>
            <h2 className="text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[44px]">
              Reconhecimento e <span className="text-[#B11116]">confiança</span>.
            </h2>
            <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#5F5F5A]">
              Selos e certificações que comprovam o compromisso da Maza com qualidade,
              segurança e responsabilidade ambiental.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CERTIFICATES.map((c, i) => (
              <div
                key={i}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#B11116]/30 hover:shadow-[0_25px_60px_-25px_rgba(177,17,22,0.25)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#B11116] to-[#FBB943] transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex h-[110px] items-center">
                  <div
                    className="relative flex-shrink-0"
                    style={{ width: c.w, height: c.h }}
                  >
                    <Image
                      src={c.src}
                      alt={c.name}
                      fill
                      sizes={`${c.w}px`}
                      quality={75}
                      loading="lazy"
                      className="object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-[#EBEBEB] pt-4">
                  <h3 className="text-[16px] font-bold text-[#1C1C1C]">{c.name}</h3>
                  <p className="text-[13px] leading-[1.55] text-[#5F5F5A]">{c.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
