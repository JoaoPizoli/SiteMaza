"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, MapPinned, Store, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const coverageItems = [
  {
    title: "Cobertura nacional",
    text: "Mais presenca comercial para facilitar especificacao, reposicao e atendimento regional.",
    icon: Building2,
  },
  {
    title: "Representantes especializados",
    text: "Encontre suporte comercial alinhado ao segmento e ao ritmo do seu negocio.",
    icon: Users2,
  },
  {
    title: "Pontos de venda",
    text: "Localize onde comprar e compare as linhas ideais para cada aplicacao.",
    icon: Store,
  },
];

export function FindUsSection() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="surface-panel-dark relative overflow-hidden p-8 md:p-10">
            <div className="outline-grid absolute inset-0 opacity-25" />
            <div className="relative z-10">
              <span className="section-tag">Onde encontrar</span>
              <h2 className="mt-5 max-w-[11ch] font-display text-[2.3rem] leading-[1.05] text-white md:text-[3.4rem]">
                Sua proxima compra Maza pode estar mais perto do que voce imagina.
              </h2>
              <p className="mt-5 max-w-[56ch] text-base leading-8 text-white/74">
                Reestruturamos essa area para valorizar o acesso rapido a lojas,
                representantes e cobertura nacional. O objetivo e reduzir atrito
                e transformar busca em conversao.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/onde-encontrar">
                    <MapPinned className="h-4 w-4" />
                    Ver mapa comercial
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/8 text-white hover:bg-white/12"
                >
                  <Link href="/produtos">Explorar linhas</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="surface-panel relative overflow-hidden p-0">
              <div className="relative min-h-[248px]">
                <Image
                  src="/assets/lojas/map-placeholder.png"
                  alt="Mapa de pontos de venda Maza"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.08)_0%,rgba(18,22,32,0.3)_100%)]" />
                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/70 bg-white/78 px-4 py-3 shadow-[0_16px_36px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                    <MapPinned className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Rede comercial mais visivel
                    </p>
                    <p className="text-sm text-stone">
                      Navegacao clara para lojas e representantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {coverageItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="surface-panel flex h-full flex-col gap-4 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-stone">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
