"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Search, ChevronDown, Store, Users } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type EntryType = "representative" | "store";

interface Entry {
  type: EntryType;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const MOCK_ENTRIES: Entry[] = [
  {
    type: "representative",
    name: "Ricardo S. Farini — Farini Representação Comercial Ltda.",
    email: "diretoria@amazonfortimp.com.br",
    phone: "(19) 99159 4165",
    address: "Rua XXX, 35 — Poços de Caldas/MG — CEP 37704-365",
  },
  {
    type: "store",
    name: "Loja Maza — Centro Mococa",
    email: "contato@tintasmaza.com.br",
    phone: "(19) 3656 1234",
    address: "Av. Principal, 1200 — Mococa/SP — CEP 13730-000",
  },
  {
    type: "representative",
    name: "Representante Norte — Distribuidora MG Ltda.",
    email: "comercial@distribuidoramg.com.br",
    phone: "(31) 3333 5566",
    address: "Rua das Acácias, 80 — Belo Horizonte/MG — CEP 30130-100",
  },
  {
    type: "store",
    name: "Loja Maza — Franca",
    email: "franca@tintasmaza.com.br",
    phone: "(16) 3700 1122",
    address: "Av. Brasil, 2500 — Franca/SP — CEP 14400-000",
  },
];

export default function FindUsPage() {
  const [selectedType, setSelectedType] = useState<EntryType>("representative");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const entries = MOCK_ENTRIES.filter((e) => e.type === selectedType);

  return (
    <main className="w-full bg-white font-roboto">
      {/* HERO sem imagem */}
      <section className="relative w-full pt-[160px] pb-20 px-6 xl:px-10 overflow-hidden isolate">
        {/* Fundo base */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #B11116 0%, #7a0b0f 60%, #4a0608 100%)",
          }}
        />
        {/* Blobs */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-55 animate-maza-mesh -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.5) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-1/4 -right-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-45 animate-maza-mesh -z-10"
          style={{
            animationDelay: "-6s",
            background:
              "radial-gradient(circle, rgba(255,70,90,0.5) 0%, transparent 65%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-maza-grid opacity-30" />

        <motion.div
          className="w-full max-w-[1440px] mx-auto flex flex-col gap-6 max-w-[780px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md w-fit">
              <span className="text-[11px] tracking-[0.14em] font-black text-[#FBB943]">
                LOJAS & REPRESENTANTES MAZA
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-white font-bold text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]"
          >
            Presença em todos os <span className="text-[#FBB943]">estados</span> do Brasil.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-white/85 text-[17px] leading-[1.6] max-w-[560px]"
          >
            Localize o ponto de venda ou representante mais próximo de você.
          </motion.p>
        </motion.div>
      </section>

      {/* FORMULÁRIO + RESULTADOS */}
      <section className="w-full max-w-[1440px] mx-auto px-6 xl:px-10 py-16 lg:py-20 flex flex-col gap-12">
        {/* Form */}
        <motion.div
          className="relative -mt-24 z-10 bg-white rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] border border-black/5 p-6 md:p-10 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="relative flex items-center h-14 px-5 rounded-full border border-[#EBEBEB] bg-[#FCFCF7] hover:border-[#B11116] focus-within:border-[#B11116] transition-colors">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] text-[#1C1C1C] appearance-none pr-6 cursor-pointer"
                aria-label="Selecione o estado"
              >
                <option value="">Selecione o seu estado</option>
                <option>SP</option>
                <option>MG</option>
                <option>RJ</option>
                <option>PR</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#5F5F5A] pointer-events-none absolute right-5" aria-hidden />
            </label>

            <label className="relative flex items-center h-14 px-5 rounded-full border border-[#EBEBEB] bg-[#FCFCF7] hover:border-[#B11116] focus-within:border-[#B11116] transition-colors">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] text-[#1C1C1C] appearance-none pr-6 cursor-pointer"
                aria-label="Selecione a cidade"
              >
                <option value="">Selecione a sua cidade</option>
                <option>Mococa</option>
                <option>Franca</option>
                <option>Poços de Caldas</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#5F5F5A] pointer-events-none absolute right-5" aria-hidden />
            </label>
          </div>

          {/* Toggle de tipo */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#F1F1EA] w-fit mx-auto">
            {(["representative", "store"] as const).map((t) => {
              const active = selectedType === t;
              const Icon = t === "representative" ? Users : Store;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
                    active
                      ? "bg-[#B11116] text-white shadow-[0_10px_20px_-10px_rgba(177,17,22,0.6)]"
                      : "text-[#5F5F5A] hover:text-[#1C1C1C]"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                  {t === "representative" ? "Representante" : "Loja física"}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="group inline-flex items-center gap-2 px-8 h-14 rounded-full bg-[#B11116] text-white font-semibold text-[15px] tracking-[0.03em] shadow-[0_20px_40px_-15px_rgba(177,17,22,0.6)] hover:bg-[#A00010] hover:-translate-y-0.5 transition-all"
            >
              <Search className="w-4 h-4" aria-hidden />
              <span>PESQUISAR</span>
            </button>
          </div>
        </motion.div>

        {/* Resultados */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {entries.map((entry, i) => (
            <motion.article
              key={i}
              variants={itemVariants}
              className="group flex flex-col gap-5 p-6 bg-white border border-[#EBEBEB] rounded-2xl hover:border-[#B11116]/30 hover:shadow-[0_20px_50px_-20px_rgba(177,17,22,0.2)] hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black tracking-[0.14em] ${
                      entry.type === "store"
                        ? "bg-[#FBB943]/20 text-[#B11116]"
                        : "bg-[#B11116]/10 text-[#B11116]"
                    }`}
                  >
                    {entry.type === "store" ? (
                      <Store className="w-3 h-3" aria-hidden />
                    ) : (
                      <Users className="w-3 h-3" aria-hidden />
                    )}
                    {entry.type === "store" ? "LOJA" : "REPRESENTANTE"}
                  </span>
                  <h3 className="font-bold text-[17px] leading-snug text-[#1C1C1C] group-hover:text-[#B11116] transition-colors">
                    {entry.name}
                  </h3>
                </div>
              </div>

              <ul className="flex flex-col gap-3 border-t border-[#F1F1EA] pt-4">
                <li className="flex items-start gap-3 text-[14px] text-[#5F5F5A]">
                  <Mail className="w-4 h-4 text-[#B11116] mt-0.5 flex-shrink-0" aria-hidden />
                  <a href={`mailto:${entry.email}`} className="hover:text-[#B11116] transition-colors break-all">
                    {entry.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#5F5F5A]">
                  <Phone className="w-4 h-4 text-[#B11116] mt-0.5 flex-shrink-0" aria-hidden />
                  <a href={`tel:${entry.phone.replace(/\D/g, "")}`} className="hover:text-[#B11116] transition-colors">
                    {entry.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#5F5F5A]">
                  <MapPin className="w-4 h-4 text-[#B11116] mt-0.5 flex-shrink-0" aria-hidden />
                  <span>{entry.address}</span>
                </li>
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Mapa ilustrativo */}
      <section className="w-full max-w-[1440px] mx-auto px-6 xl:px-10 pb-24">
        <div className="w-full h-[320px] md:h-[500px] relative rounded-3xl overflow-hidden border border-[#EBEBEB] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(177,17,22,0.08) 0%, transparent 70%), linear-gradient(135deg, #FCFCF7 0%, #F1F1EA 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/assets/lojas/map-placeholder.png')] bg-cover bg-center opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center px-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B11116] text-white shadow-xl mb-4">
                <MapPin className="w-7 h-7" aria-hidden />
              </div>
              <p className="text-[#1C1C1C] font-semibold text-[18px]">
                Mapa interativo em breve.
              </p>
              <p className="text-[#5F5F5A] text-[14px] mt-1">
                Use o formulário acima para encontrar uma loja ou representante.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

