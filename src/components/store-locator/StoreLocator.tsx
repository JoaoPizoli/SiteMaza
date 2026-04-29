"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Search,

  Store,
  Users,
} from "lucide-react";
import { geolocateByIp } from "@/lib/ip-location";
import { geocodeCepWithNominatim, type GeocodedCep } from "@/lib/nominatim";
import {

  MOCK_REPRESENTATIVES,
  MOCK_STORES,
  formatCep,
  formatDistance,
  getRepresentativeCities,
  getRepresentativeStates,
  getRepresentativesByLocation,
  getStoresByDistance,
  isValidCep,
  normalizeCep,
  type GeoPoint,
  type RepresentativeLocation,
  type StoreWithDistance,
} from "@/lib/store-locator";
import type { StoreLocatorMapProps } from "./StoreLocatorMap";

const LazyStoreLocatorMap = dynamic<StoreLocatorMapProps>(
  () => import("./StoreLocatorMap").then((module) => module.StoreLocatorMap),
  {
    ssr: false,
    loading: () => <MapLoadingState />,
  },
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export type LocatorMode = "stores" | "representatives";
type SearchStatus = "idle" | "loading" | "success" | "error";
type LocationContext = {
  source: "cep" | "ip";
  label: string;
};

type StoreLocatorProps = {
  initialMode?: LocatorMode;
};

function MapLoadingState() {
  return (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center bg-[#F1F1EA]">
      <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1C1C1C] shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]">
        <Loader2 className="h-4 w-4 animate-spin text-[#B11116]" aria-hidden />
        Carregando mapa
      </div>
    </div>
  );
}



function SelectShell({
  children,
  disabled,
}: Readonly<{
  children: ReactNode;
  disabled?: boolean;
}>) {
  return (
    <div
      className={`relative flex h-14 items-center rounded-[8px] border bg-[#FCFCF7] px-4 transition-colors focus-within:border-[#B11116] ${
        disabled ? "border-[#ECECE4] opacity-60" : "border-[#DEDED6]"
      }`}
    >
      {children}
      <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-[#5F5F5A]" aria-hidden />
    </div>
  );
}

function StoreCard({
  index,
  isActive,
  onSelect,
  store,
}: Readonly<{
  index: number;
  isActive: boolean;
  onSelect: () => void;
  store: StoreWithDistance;
}>) {
  return (
    <article
      className={`rounded-[8px] border bg-white p-4 transition-all ${
        isActive
          ? "border-[#B11116]/45 shadow-[0_20px_55px_-35px_rgba(177,17,22,0.8)]"
          : "border-[#E7E7DE] hover:border-[#B11116]/25"
      }`}
    >
      <button className="flex w-full items-start gap-3 text-left" onClick={onSelect} type="button">
        <span
          className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
            isActive ? "bg-[#B11116] text-white" : "bg-[#F1F1EA] text-[#B11116]"
          }`}
        >
          {index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span
              aria-label="Loja física"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FBB943]/20 text-[#7A0B0F]"
            >
              <Store className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-xs font-bold text-[#B11116]">{formatDistance(store.distanceKm)}</span>
          </span>
          <strong className="mt-2 block text-base leading-snug text-[#1C1C1C]">{store.name}</strong>
          <span className="mt-1 block text-sm leading-relaxed text-[#5F5F5A]">
            {store.address}, {store.city} - {store.state}
          </span>
        </span>
      </button>

      <div className="mt-4 grid gap-2 border-t border-[#F1F1EA] pt-4 text-sm text-[#5F5F5A]">
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#B11116]" aria-hidden />
          {store.hours}
        </span>
        <a className="flex items-center gap-2 transition-colors hover:text-[#B11116]" href={`tel:${store.phone.replace(/\D/g, "")}`}>
          <Phone className="h-4 w-4 text-[#B11116]" aria-hidden />
          {store.phone}
        </a>
        <a className="flex items-center gap-2 break-all transition-colors hover:text-[#B11116]" href={`mailto:${store.email}`}>
          <Mail className="h-4 w-4 shrink-0 text-[#B11116]" aria-hidden />
          {store.email}
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="inline-flex items-center gap-2 rounded-full bg-[#B11116] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_26px_-16px_rgba(177,17,22,0.7)] transition-colors hover:bg-[#A00010]"
          href={`https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`}
          rel="noreferrer"
          target="_blank"
        >
          <Navigation className="h-3.5 w-3.5" aria-hidden />
          Rota
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[#E7E7DE] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#1C1C1C] transition-colors hover:border-[#B11116]/40 hover:text-[#B11116]"
          href={`https://wa.me/${store.whatsapp}`}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </article>
  );
}

function RepresentativeCard({ representative }: Readonly<{ representative: RepresentativeLocation }>) {
  return (
    <article className="rounded-[8px] border border-[#E7E7DE] bg-white p-5 transition-all hover:border-[#B11116]/25 hover:shadow-[0_20px_55px_-38px_rgba(177,17,22,0.75)]">
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#B11116]/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#B11116]">
          <Users className="h-3.5 w-3.5" aria-hidden />
          Representante
        </span>

        <div>
          <h3 className="text-lg font-bold leading-snug text-[#1C1C1C]">{representative.name}</h3>
          <p className="mt-1 text-sm font-semibold text-[#5F5F5A]">{representative.company}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 border-t border-[#F1F1EA] pt-4 text-sm text-[#5F5F5A]">
        <span className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B11116]" aria-hidden />
          {representative.address}
        </span>
        <a
          className="flex items-center gap-2 transition-colors hover:text-[#B11116]"
          href={`tel:${representative.phone.replace(/\D/g, "")}`}
        >
          <Phone className="h-4 w-4 text-[#B11116]" aria-hidden />
          {representative.phone}
        </a>
        <a className="flex items-center gap-2 break-all transition-colors hover:text-[#B11116]" href={`mailto:${representative.email}`}>
          <Mail className="h-4 w-4 shrink-0 text-[#B11116]" aria-hidden />
          {representative.email}
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {representative.productLines.map((line) => (
          <span className="rounded-full bg-[#F1F1EA] px-3 py-1.5 text-xs font-bold text-[#5F5F5A]" key={line}>
            {line}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1C] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#B11116]"
          href={`https://wa.me/${representative.whatsapp}`}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </article>
  );
}

export function StoreLocator({ initialMode = "stores" }: Readonly<StoreLocatorProps>) {
  const [activeMode, setActiveMode] = useState<LocatorMode>(initialMode);
  const [cep, setCep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [representativeCity, setRepresentativeCity] = useState("");
  const [representativeState, setRepresentativeState] = useState("");

  const [selectedStoreId, setSelectedStoreId] = useState(MOCK_STORES[0]?.id);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [userLocation, setUserLocation] = useState<GeoPoint | undefined>();
  const [locationContext, setLocationContext] = useState<LocationContext>();
  const [isDetectingIpLocation, setIsDetectingIpLocation] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const ipLocationAbortRef = useRef<AbortController | null>(null);
  const hasManualLocationSearchRef = useRef(false);
  const cacheRef = useRef(new Map<string, GeocodedCep>());

  useEffect(() => {
    setActiveMode(initialMode);
  }, [initialMode]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    ipLocationAbortRef.current = controller;
    setIsDetectingIpLocation(true);

    void geolocateByIp(controller.signal)
      .then((result) => {
        if (!isActive || controller.signal.aborted || hasManualLocationSearchRef.current) {
          return;
        }

        const storesByDistance = getStoresByDistance(result.coordinates);

        setUserLocation(result.coordinates);
        setLocationContext({ source: "ip", label: result.label });
        setSelectedStoreId(storesByDistance[0]?.id);
      })
      .catch(() => {
        // IP-based geolocation is only a convenience; CEP search remains available.
      })
      .finally(() => {
        if (!isActive || ipLocationAbortRef.current !== controller) {
          return;
        }

        ipLocationAbortRef.current = null;
        setIsDetectingIpLocation(false);
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const rankedStores = useMemo<StoreWithDistance[]>(() => {
    if (!userLocation) {
      return MOCK_STORES;
    }

    return getStoresByDistance(userLocation);
  }, [userLocation]);

  const visibleStores = useMemo(() => {
    if (!userLocation) {
      return rankedStores;
    }

    return rankedStores.slice(0, 6);
  }, [rankedStores, userLocation]);

  const representativeStates = useMemo(() => getRepresentativeStates(), []);
  const representativeCities = useMemo(() => getRepresentativeCities(representativeState), [representativeState]);
  const representatives = useMemo(
    () => getRepresentativesByLocation(representativeState, representativeCity),
    [representativeCity, representativeState],
  );
  const selectedStore = visibleStores.find((store) => store.id === selectedStoreId) ?? visibleStores[0];
  const storeSearchHint = useMemo(() => {
    if (status === "loading") {
      return "Buscando o CEP informado para refinar as lojas mais próximas.";
    }

    if (isDetectingIpLocation) {
      return "Detectando sua localização aproximada pelo IP. Digite o CEP se quiser uma busca mais certeira.";
    }

    if (locationContext?.source === "ip") {
      return `Lojas ordenadas pela localização aproximada de ${locationContext.label}. Digite o CEP para refinar.`;
    }

    if (locationContext?.source === "cep") {
      return "Lojas ordenadas pelo CEP informado.";
    }

    return "Busque por CEP para ordenar lojas por distância.";
  }, [isDetectingIpLocation, locationContext, status]);

  async function runSearch(rawCep: string) {
    const normalizedCep = normalizeCep(rawCep);

    hasManualLocationSearchRef.current = true;
    ipLocationAbortRef.current?.abort();
    ipLocationAbortRef.current = null;
    setIsDetectingIpLocation(false);

    if (!isValidCep(normalizedCep)) {
      setStatus("error");
      setErrorMessage("Digite um CEP válido com 8 números.");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setErrorMessage("");
    setCep(normalizedCep);

    try {
      const cachedResult = cacheRef.current.get(normalizedCep);
      const result = cachedResult ?? (await geocodeCepWithNominatim(normalizedCep, controller.signal));

      if (!cachedResult) {
        cacheRef.current.set(normalizedCep, result);
      }

      const storesByDistance = getStoresByDistance(result.coordinates);
      setUserLocation(result.coordinates);
      setLocationContext({ source: "cep", label: result.label });

      setSelectedStoreId(storesByDistance[0]?.id);
      setStatus("success");
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      const message = error instanceof Error ? error.message : "Não foi possível localizar esse CEP agora.";
      setStatus("error");
      setErrorMessage(message);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  }

  function handleStoreSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(cep);
  }

  return (
    <section id="localizador" className="w-full scroll-mt-28 bg-[#FCFCF7] px-6 py-12 lg:py-16 xl:px-10">
      <motion.div
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <motion.div
          className="relative z-10 -mt-28 rounded-[8px] border border-black/5 bg-white p-5 shadow-[0_30px_90px_-45px_rgba(28,28,28,0.45)] md:p-6 lg:p-8"
          variants={itemVariants}
        >
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-full bg-[#F1F1EA] p-1.5">
              {(["stores", "representatives"] as const).map((mode) => {
                const isActive = activeMode === mode;
                const Icon = mode === "stores" ? Store : Users;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-black transition-all ${
                      isActive
                        ? "bg-[#B11116] text-white shadow-[0_14px_26px_-16px_rgba(177,17,22,0.9)]"
                        : "text-[#5F5F5A] hover:text-[#1C1C1C]"
                    }`}
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    type="button"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {mode === "stores" ? "Loja física" : "Representantes"}
                  </button>
                );
              })}
            </div>

            <p className="text-sm font-semibold text-[#5F5F5A]">
              {activeMode === "stores"
                ? storeSearchHint
                : "Selecione estado e cidade para encontrar o representante."}
            </p>
          </div>

          {activeMode === "stores" ? (
            <form className="flex flex-col gap-3" onSubmit={handleStoreSubmit}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1C1C1C]">Digite seu CEP</span>
                <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                  <div className="flex h-14 flex-1 items-center gap-3 rounded-[8px] border border-[#DEDED6] bg-[#FCFCF7] px-4 transition-colors focus-within:border-[#B11116] md:min-w-[280px]">
                    <MapPin className="h-5 w-5 text-[#B11116]" aria-hidden />
                    <input
                      autoComplete="postal-code"
                      className="h-full min-w-0 flex-1 bg-transparent text-lg font-bold tracking-[0.08em] text-[#1C1C1C] outline-none placeholder:text-[#8C8C84]"
                      inputMode="numeric"
                      maxLength={9}
                      onChange={(event) => setCep(normalizeCep(event.target.value))}
                      pattern="[0-9]{5}-?[0-9]{3}"
                      placeholder="00000-000"
                      type="text"
                      value={formatCep(cep)}
                    />
                  </div>

                  <button
                    className="inline-flex h-12 w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-[#B11116] px-5 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_20px_45px_-22px_rgba(177,17,22,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#A00010] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0 md:h-14 md:w-auto md:px-6 md:text-sm"
                    disabled={status === "loading"}
                    type="submit"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Search className="h-4 w-4" aria-hidden />
                    )}
                    Localizar
                  </button>
                </div>
              </label>
            </form>
          ) : (
            <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1C1C1C]">Estado</span>
                <SelectShell>
                  <select
                    aria-label="Selecione o estado"
                    className="h-full w-full appearance-none bg-transparent pr-8 text-base font-bold text-[#1C1C1C] outline-none"
                    onChange={(event) => {
                      setRepresentativeState(event.target.value);
                      setRepresentativeCity("");
                    }}
                    value={representativeState}
                  >
                    <option value="">Selecione o estado</option>
                    {representativeStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </SelectShell>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1C1C1C]">Cidade</span>
                <SelectShell disabled={!representativeState}>
                  <select
                    aria-label="Selecione a cidade"
                    className="h-full w-full appearance-none bg-transparent pr-8 text-base font-bold text-[#1C1C1C] outline-none disabled:cursor-not-allowed"
                    disabled={!representativeState}
                    onChange={(event) => setRepresentativeCity(event.target.value)}
                    value={representativeCity}
                  >
                    <option value="">Todas as cidades</option>
                    {representativeCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </SelectShell>
              </label>

              <button
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#B11116] px-7 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_20px_45px_-22px_rgba(177,17,22,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#A00010] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
                disabled={!representativeState}
                type="button"
              >
                <Search className="h-4 w-4" aria-hidden />
                Filtrar
              </button>
            </div>
          )}
        </motion.div>

        {activeMode === "stores" ? (
          <motion.div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]" variants={itemVariants}>
            <aside className="order-2 flex flex-col gap-4 lg:order-1">
              {status === "error" ? (
                <div
                  aria-live="polite"
                  className="rounded-[8px] border border-[#B11116]/25 bg-[#B11116]/10 p-4 text-sm font-semibold text-[#B11116]"
                >
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex flex-col gap-3">
                {visibleStores.map((store, index) => (
                  <StoreCard
                    index={index}
                    isActive={store.id === selectedStore?.id}
                    key={store.id}
                    onSelect={() => setSelectedStoreId(store.id)}
                    store={store}
                  />
                ))}
              </div>
            </aside>

            <div className="relative z-0 isolate order-1 min-h-[520px] overflow-hidden rounded-[8px] border border-[#DADAD1] bg-white shadow-[0_30px_90px_-55px_rgba(28,28,28,0.65)] lg:sticky lg:top-28 lg:order-2 lg:h-[calc(100vh-8rem)]">
              <LazyStoreLocatorMap
                onSelectStore={setSelectedStoreId}
                selectedStoreId={selectedStore?.id}
                stores={visibleStores}
                userLocation={userLocation}
                userLocationLabel={locationContext?.label}
                userLocationSource={locationContext?.source}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]" variants={itemVariants}>
            <div className="grid gap-4 md:grid-cols-2">
              {representatives.length > 0 ? (
                representatives.map((representative) => (
                  <RepresentativeCard key={representative.id} representative={representative} />
                ))
              ) : (
                <div className="rounded-[8px] border border-[#E7E7DE] bg-white p-6 text-sm font-semibold text-[#5F5F5A] md:col-span-2">
                  Nenhum representante encontrado para essa combinação de estado e cidade.
                </div>
              )}
            </div>

            <aside className="flex h-fit flex-col gap-4 rounded-[8px] border border-[#E7E7DE] bg-white p-5 lg:sticky lg:top-28">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#B11116]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#B11116]">
                <Users className="h-3.5 w-3.5" aria-hidden />
                Representantes
              </span>
              <div>
                <strong className="block text-3xl text-[#1C1C1C]">{representatives.length}</strong>
                <p className="mt-1 text-sm leading-relaxed text-[#5F5F5A]">
                  {representativeState
                    ? `Resultado para ${representativeCity || `todas as cidades de ${representativeState}`}.`
                    : "Selecione um estado para refinar a busca."}
                </p>
              </div>
              <div className="grid gap-2 border-t border-[#F1F1EA] pt-4 text-sm text-[#5F5F5A]">
                <span className="flex justify-between gap-3">
                  <span>Total mockado</span>
                  <strong className="text-[#1C1C1C]">{MOCK_REPRESENTATIVES.length}</strong>
                </span>
                <span className="flex justify-between gap-3">
                  <span>Estados atendidos</span>
                  <strong className="text-[#1C1C1C]">{representativeStates.length}</strong>
                </span>
                <span className="flex justify-between gap-3">
                  <span>Cidades no filtro</span>
                  <strong className="text-[#1C1C1C]">{representativeCities.length || "--"}</strong>
                </span>
              </div>
            </aside>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
