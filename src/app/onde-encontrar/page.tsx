"use client";

import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Store,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LocationType = "representative" | "store";

interface LocationEntry {
  id: number;
  type: LocationType;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

const locations: LocationEntry[] = [
  {
    id: 1,
    type: "representative",
    name: "Farini Representacao Comercial",
    email: "diretoria@amazonfortimp.com.br",
    phone: "(19) 99159-4165",
    address: "Rua Dona Inacia, 35 - Pocos de Caldas/MG - CEP 37704-365",
    city: "Pocos de Caldas",
    state: "MG",
  },
  {
    id: 2,
    type: "store",
    name: "Casa do Pintor Premium",
    email: "contato@casadopintorpremium.com.br",
    phone: "(11) 3258-4100",
    address: "Av. Paulista, 920 - Sao Paulo/SP - CEP 01310-100",
    city: "Sao Paulo",
    state: "SP",
  },
  {
    id: 3,
    type: "representative",
    name: "Norte Tintas Consultoria",
    email: "vendas@nortetintas.com.br",
    phone: "(92) 98415-2201",
    address: "Rua Rio Madeira, 210 - Manaus/AM - CEP 69053-020",
    city: "Manaus",
    state: "AM",
  },
  {
    id: 4,
    type: "store",
    name: "Rede Acabamento Sul",
    email: "sac@acabamentosul.com.br",
    phone: "(51) 3024-1880",
    address: "Rua Marcilio Dias, 480 - Porto Alegre/RS - CEP 90130-000",
    city: "Porto Alegre",
    state: "RS",
  },
];

export default function FindUsPage() {
  const [selectedType, setSelectedType] =
    React.useState<LocationType>("representative");
  const [selectedState, setSelectedState] = React.useState("Todos");
  const [selectedCity, setSelectedCity] = React.useState("Todas");

  const availableStates = ["Todos", ...new Set(locations.map((item) => item.state))];

  const availableCities = [
    "Todas",
    ...new Set(
      locations
        .filter((item) => selectedState === "Todos" || item.state === selectedState)
        .map((item) => item.city),
    ),
  ];

  const filteredLocations = locations.filter((item) => {
    const matchesType = item.type === selectedType;
    const matchesState = selectedState === "Todos" || item.state === selectedState;
    const matchesCity = selectedCity === "Todas" || item.city === selectedCity;

    return matchesType && matchesState && matchesCity;
  });

  const clearFilters = () => {
    setSelectedType("representative");
    setSelectedState("Todos");
    setSelectedCity("Todas");
  };

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-40">
      <div className="site-container">
        <section className="surface-panel-dark relative overflow-hidden px-8 py-10 md:px-10 md:py-12">
          <div className="absolute inset-0">
            <Image
              src="/assets/lojas/hero-bg.png"
              alt="Rede de lojas e representantes"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(10,14,22,0.9)_0%,rgba(10,14,22,0.72)_100%)]" />
          </div>

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <span className="section-tag">Onde encontrar</span>
              <h1 className="mt-5 max-w-[10ch] font-display text-4xl leading-[1.02] text-white md:text-[4.1rem]">
                Presenca comercial organizada para gerar conversao.
              </h1>
              <p className="mt-5 max-w-[58ch] text-base leading-8 text-white/74">
                A area de localizacao foi redesenhada para guiar melhor o usuario
                entre lojas e representantes, com filtros claros, visual mais
                premium e leitura muito mais objetiva.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Cobertura ativa
                </p>
                <p className="mt-3 font-display text-4xl text-white">
                  {filteredLocations.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  registros visiveis conforme a selecao atual.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Tipo selecionado
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {selectedType === "representative"
                    ? "Representantes"
                    : "Lojas fisicas"}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Alterne entre suporte comercial e ponto de venda.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">
          <div className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <div className="surface-panel p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70">
                Tipo de atendimento
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  { key: "representative", label: "Representantes", icon: UserRound },
                  { key: "store", label: "Lojas fisicas", icon: Store },
                ].map((option) => {
                  const Icon = option.icon;
                  const isActive = selectedType === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setSelectedType(option.key as LocationType)}
                      className={cn(
                        "flex items-center gap-3 rounded-[22px] border px-4 py-4 text-left transition-all",
                        isActive
                          ? "border-brand/14 bg-brand text-white shadow-[0_18px_34px_rgba(170,27,31,0.22)]"
                          : "border-[#171d29]/8 bg-white text-ink hover:border-brand/14",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-2xl",
                          isActive ? "bg-white/14" : "bg-gold/14 text-brand",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="surface-panel p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70">
                Filtros geograficos
              </p>

              <div className="mt-4 grid gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-ink">Estado</span>
                  <select
                    value={selectedState}
                    onChange={(event) => {
                      setSelectedState(event.target.value);
                      setSelectedCity("Todas");
                    }}
                    className="h-14 w-full rounded-[20px] border border-[#171d29]/10 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-brand/20"
                  >
                    {availableStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-ink">Cidade</span>
                  <select
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                    className="h-14 w-full rounded-[20px] border border-[#171d29]/10 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-brand/20"
                  >
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>

                <Button onClick={clearFilters} variant="outline" size="lg">
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel flex items-center justify-between gap-4 p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70">
                  Resultado atual
                </p>
                <p className="mt-2 text-sm leading-7 text-stone">
                  {selectedState === "Todos"
                    ? "Exibindo cobertura comercial nacional."
                    : `Exibindo resultados para ${selectedState}${selectedCity !== "Todas" ? `, ${selectedCity}` : ""}.`}
                </p>
              </div>
              <span className="rounded-full border border-[#171d29]/10 bg-white px-4 py-3 text-sm font-semibold text-ink">
                {filteredLocations.length} registros
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredLocations.map((location, index) => (
                <motion.article
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="surface-panel flex h-full flex-col gap-5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="rounded-full border border-gold/30 bg-gold-soft px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                        {location.type === "representative"
                          ? "Representante"
                          : "Loja fisica"}
                      </span>
                      <h2 className="mt-4 font-display text-2xl leading-[1.08] text-ink">
                        {location.name}
                      </h2>
                    </div>
                    <span className="rounded-full border border-[#171d29]/8 bg-sand/70 px-3 py-2 text-sm font-medium text-stone">
                      {location.city}/{location.state}
                    </span>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/8 text-brand">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                          E-mail
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink">
                          {location.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/8 text-brand">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                          Telefone
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink">
                          {location.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/8 text-brand">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                          Endereco
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="surface-panel relative overflow-hidden p-0">
              <div className="relative min-h-[320px]">
                <Image
                  src="/assets/lojas/map-placeholder.png"
                  alt="Mapa de cobertura comercial da Maza"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.08)_0%,rgba(18,22,32,0.26)_100%)]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/70 bg-white/82 p-5 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-ink">
                    Visual comercial mais claro
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone">
                    A pagina agora combina filtros reais, cards mais legiveis e
                    um bloco visual de mapa para reforcar cobertura e proximidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
