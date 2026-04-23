export type ProductLineId =
  | "imobiliaria"
  | "automotiva"
  | "industrial"
  | "impermeabilizantes";

export interface ProductFilter {
  id: ProductLineId;
  label: string;
  description: string;
  subcategories: string[];
}

export interface Product {
  id: number;
  line: ProductLineId;
  lineLabel: string;
  subcategory: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  href: string;
  slug: string;
  finish: string;
  application: string;
  highlights: string[];
}

export const PRODUCT_FILTERS: ProductFilter[] = [
  {
    id: "automotiva",
    label: "Automotiva",
    description: "Solucoes para reparacao, acabamento e protecao automotiva.",
    subcategories: [
      "Adesivos",
      "Complementos",
      "Primer e Verniz",
      "Tinta Poliester",
      "Tinta PU",
      "Esmalte Sintetico",
      "Massa Poliester",
      "Massa Rapida",
      "Removedor",
    ],
  },
  {
    id: "imobiliaria",
    label: "Imobiliaria",
    description: "Tinta, massa e acabamento para obra residencial e comercial.",
    subcategories: [
      "Acabamentos",
      "Complementos",
      "Esmaltes",
      "Massas",
      "Texturas",
      "Tintas",
      "Vernizes",
    ],
  },
  {
    id: "industrial",
    label: "Industrial",
    description: "Protecao de alto desempenho para estruturas e linhas produtivas.",
    subcategories: [
      "Anticorrosivos",
      "Demarcacao Viaria",
      "Epoxi",
      "Esmaltes",
      "Primers",
      "Tintas",
    ],
  },
  {
    id: "impermeabilizantes",
    label: "Impermeabilizantes",
    description: "Blindagem contra umidade e infiltracao em diferentes superficies.",
    subcategories: [
      "Mantas Liquidas",
      "Aditivos",
      "Complementos",
      "Fitas",
      "Mantas Asfalticas",
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    line: "imobiliaria",
    lineLabel: "Imobiliaria",
    subcategory: "Acabamentos",
    category: "Piso premium",
    title: "Tinta Piso Premium Grafeno",
    description:
      "Alta resistencia para pisos cimentados com cobertura uniforme, secagem equilibrada e durabilidade para areas internas e externas.",
    longDescription:
      "A Tinta Piso Premium Grafeno foi desenvolvida para obras que pedem acabamento limpo, resistencia superior e excelente custo operacional. A formulacao entrega boa aderencia, acabamento consistente e desempenho confiavel em ambientes residenciais, comerciais e de alto fluxo.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/tinta-piso-premium-grafeno",
    slug: "tinta-piso-premium-grafeno",
    finish: "Acabamento acetinado de alta cobertura",
    application: "Pisos cimentados, garagens, calcadas e areas de servico",
    highlights: ["Alta resistencia", "Otima cobertura", "Aplicacao uniforme"],
  },
  {
    id: 2,
    line: "imobiliaria",
    lineLabel: "Imobiliaria",
    subcategory: "Tintas",
    category: "Tinta acrilica",
    title: "Acrilica Fachada Total",
    description:
      "Formula premium para fachadas e paredes com otima retencao de cor, rendimento elevado e protecao contra intemperies.",
    longDescription:
      "Acrilica Fachada Total combina acabamento refinado, boa lavabilidade e alta estabilidade de cor. E uma solucao pensada para construtoras, revendas e aplicadores que buscam confianca na entrega final.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/acrilica-fachada-total",
    slug: "acrilica-fachada-total",
    finish: "Fosco elegante com excelente nivelamento",
    application: "Paredes externas, fachadas e superficies de alvenaria",
    highlights: ["Protecao UV", "Boa lavabilidade", "Rendimento profissional"],
  },
  {
    id: 3,
    line: "imobiliaria",
    lineLabel: "Imobiliaria",
    subcategory: "Massas",
    category: "Massa corrida",
    title: "Massa Corrida PVA Pro",
    description:
      "Correcao e nivelamento de superficies internas com lixamento facil e preparo rapido para pintura final.",
    longDescription:
      "Massa Corrida PVA Pro foi pensada para agilizar o canteiro de obras com boa espalhabilidade, enchimento consistente e acabamento uniforme antes da pintura.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/massa-corrida-pva-pro",
    slug: "massa-corrida-pva-pro",
    finish: "Superficie lisa e pronta para acabamento",
    application: "Paredes internas de alvenaria, gesso e drywall",
    highlights: ["Lixamento facil", "Boa aderencia", "Acabamento fino"],
  },
  {
    id: 4,
    line: "automotiva",
    lineLabel: "Automotiva",
    subcategory: "Primer e Verniz",
    category: "Primer PU",
    title: "Primer PU Alta Performance",
    description:
      "Preparacao de superficie com aderencia confiavel, excelente enchimento e base tecnica para repintura automotiva.",
    longDescription:
      "Primer PU Alta Performance oferece estabilidade no processo de reparacao e acabamento, com boa ancoragem e excelente resposta em oficinas e centros tecnicos.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/primer-pu-alta-performance",
    slug: "primer-pu-alta-performance",
    finish: "Base uniforme para lixamento e pintura final",
    application: "Preparacao de chapas, pecas e repintura automotiva",
    highlights: ["Enchimento tecnico", "Boa ancoragem", "Secagem controlada"],
  },
  {
    id: 5,
    line: "automotiva",
    lineLabel: "Automotiva",
    subcategory: "Esmalte Sintetico",
    category: "Esmalte sintetico",
    title: "Esmalte Sintetico Standard",
    description:
      "Acabamento resistente para pecas metalicas e superficies que exigem protecao, brilho uniforme e boa cobertura.",
    longDescription:
      "Esmalte Sintetico Standard une praticidade de aplicacao, boa formacao de filme e acabamento duradouro para reparos e projetos automotivos diversos.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/esmalte-sintetico-standard",
    slug: "esmalte-sintetico-standard",
    finish: "Brilho uniforme com boa resistencia superficial",
    application: "Pecas metalicas, estruturas leves e reparos em oficina",
    highlights: ["Brilho constante", "Boa cobertura", "Protecao duradoura"],
  },
  {
    id: 6,
    line: "automotiva",
    lineLabel: "Automotiva",
    subcategory: "Adesivos",
    category: "Adesivo estrutural",
    title: "Adesivo Estrutural Flex",
    description:
      "Fixacao e vedacao com boa elasticidade, alta aderencia e desempenho para processos automotivos de precisao.",
    longDescription:
      "Adesivo Estrutural Flex foi pensado para operacoes que pedem confianca na adesao, acomodacao de movimento e acabamento limpo em diferentes substratos.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/adesivo-estrutural-flex",
    slug: "adesivo-estrutural-flex",
    finish: "Cordao regular com acabamento limpo",
    application: "Vedacao, colagem tecnica e montagem automotiva",
    highlights: ["Alta adesao", "Flexibilidade", "Aplicacao precisa"],
  },
  {
    id: 7,
    line: "industrial",
    lineLabel: "Industrial",
    subcategory: "Epoxi",
    category: "Fundo epoxi",
    title: "Fundo Epoxi 4300",
    description:
      "Protecao anticorrosiva de alto desempenho para ambientes industriais, estruturas metalicas e manutencao pesada.",
    longDescription:
      "Fundo Epoxi 4300 entrega resistencia quimica, aderencia superior e confiabilidade operacional para projetos industriais que pedem desempenho tecnico consistente.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/fundo-epoxi-4300",
    slug: "fundo-epoxi-4300",
    finish: "Filme protetivo de alta resistencia",
    application: "Estruturas metalicas, equipamentos e areas industriais",
    highlights: ["Protecao anticorrosiva", "Resistencia quimica", "Alta aderencia"],
  },
  {
    id: 8,
    line: "industrial",
    lineLabel: "Industrial",
    subcategory: "Demarcacao Viaria",
    category: "Sinalizacao",
    title: "Demarcacao Viaria Pro",
    description:
      "Tinta de alta visibilidade para sinalizacao horizontal com secagem eficiente e otimo desempenho em trafego intenso.",
    longDescription:
      "Demarcacao Viaria Pro foi formulada para entregar leitura visual, resistencia e produtividade em obras de sinalizacao urbana, condominios e areas logisticas.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/demarcacao-viaria-pro",
    slug: "demarcacao-viaria-pro",
    finish: "Filme opaco com forte contraste visual",
    application: "Estacionamentos, vias internas, galpoes e areas logisticas",
    highlights: ["Alta visibilidade", "Secagem eficiente", "Boa resistencia ao trafego"],
  },
  {
    id: 9,
    line: "impermeabilizantes",
    lineLabel: "Impermeabilizantes",
    subcategory: "Mantas Liquidas",
    category: "Manta liquida",
    title: "Manta Liquida Flex",
    description:
      "Blindagem contra infiltracoes com elasticidade, cobertura uniforme e alto desempenho em lajes e coberturas.",
    longDescription:
      "Manta Liquida Flex combina protecao, rendimento e aplicacao pratica para obras que precisam de impermeabilizacao confiavel sem abrir mao de produtividade.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/manta-liquida-flex",
    slug: "manta-liquida-flex",
    finish: "Membrana elastica de alta cobertura",
    application: "Lajes, telhados, marquises e areas molhadas",
    highlights: ["Elasticidade", "Vedacao eficiente", "Facil manutencao"],
  },
  {
    id: 10,
    line: "impermeabilizantes",
    lineLabel: "Impermeabilizantes",
    subcategory: "Aditivos",
    category: "Selador hidro",
    title: "Hydroblock Selador Acrilico",
    description:
      "Preparacao e selagem de superficies com reforco de impermeabilizacao para obras residenciais e comerciais.",
    longDescription:
      "Hydroblock Selador Acrilico ajuda a estabilizar a base, reduzir absorcao e preparar a superficie para sistemas de impermeabilizacao mais seguros e duradouros.",
    image: "/assets/products/DiretoFerrugem.png",
    href: "/produto/hydroblock-selador-acrilico",
    slug: "hydroblock-selador-acrilico",
    finish: "Base selada com absorcao controlada",
    application: "Paredes, muros, fachadas e areas sujeitas a umidade",
    highlights: ["Preparacao confiavel", "Menor absorcao", "Melhor desempenho do sistema"],
  },
];

export function getProductLine(id: ProductLineId) {
  return PRODUCT_FILTERS.find((line) => line.id === id);
}

export function filterProducts({
  search,
  line,
  subcategory,
}: {
  search?: string;
  line?: string | null;
  subcategory?: string | null;
}) {
  const normalizedSearch = search?.trim().toLowerCase();

  return PRODUCTS.filter((product) => {
    const matchesSearch = normalizedSearch
      ? [product.title, product.description, product.category, product.lineLabel]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      : true;

    const matchesLine = line ? product.line === line : true;
    const matchesSubcategory = subcategory
      ? product.subcategory === subcategory
      : true;

    return matchesSearch && matchesLine && matchesSubcategory;
  });
}
