// Conteúdo central do site Lucravie Finanças.
// Edite aqui textos, imagens e contatos sem mexer nos componentes.

export const BRAND = {
  name: "Lucravie",
  full: "Lucravie Finanças",
  tagline: "Gestão Financeira para Empresas",
  founder: "Tawana Silva",
  whatsapp: "https://wa.me/5500000000000", // TODO: trocar pelo número real
  instagram: "https://www.instagram.com/lucraviefinancas",
  email: "contato@lucraviefinancas.com.br", // TODO: confirmar e-mail real
};

export const SERVICES = [
  {
    id: "bpo",
    title: "BPO Financeiro",
    subtitle: "Terceirização Financeira",
    description:
      "Cuidamos de contas a pagar e receber, conciliação bancária, fluxo de caixa e relatórios — sua rotina financeira organizada de ponta a ponta.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    id: "consultoria",
    title: "Consultoria Financeira",
    subtitle: "Diagnóstico & Estratégia",
    description:
      "Analisamos os números do seu negócio e desenhamos um plano claro para reduzir custos, precificar certo e aumentar a lucratividade.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    id: "treinamentos",
    title: "Treinamentos",
    subtitle: "Capacitação de Times",
    description:
      "Workshops e mentorias para que você e sua equipe dominem a gestão financeira e tomem decisões com segurança.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    id: "planejamento",
    title: "Planejamento & Fluxo de Caixa",
    subtitle: "Previsibilidade",
    description:
      "Estruturamos orçamento, metas e projeções para você enxergar o futuro do caixa e crescer sem sustos.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
  },
];

export const POSTS = [
  {
    title: "Pró-labore: como separar o dinheiro da empresa do seu",
    slug: "conteudo/pro-labore/",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=600&q=80",
    read: "4 min",
    date: "Mai 2026",
  },
  {
    title: "Fluxo de caixa: o termômetro que todo dono precisa ler",
    slug: "conteudo/fluxo-de-caixa/",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    read: "5 min",
    date: "Abr 2026",
  },
  {
    title: "Precificação: por que vender mais nem sempre dá lucro",
    slug: "conteudo/precificacao/",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=600&q=80",
    read: "6 min",
    date: "Abr 2026",
  },
  {
    title: "BPO financeiro: quando terceirizar passa a valer a pena",
    slug: "conteudo/bpo-financeiro/",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    read: "3 min",
    date: "Mar 2026",
  },
];

export const METHOD = [
  { step: "01", title: "Diagnóstico", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80" },
  { step: "02", title: "Organização", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" },
  { step: "03", title: "Controle", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80" },
  { step: "04", title: "Estratégia", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
  { step: "05", title: "Acompanhamento", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" },
  { step: "06", title: "Crescimento", image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80" },
];

// Indicadores de proposta de valor (ajuste conforme a realidade da marca).
export const STATS = [
  { value: "100%", label: "Sob medida para o seu negócio" },
  { value: "3", label: "Frentes: BPO, Consultoria e Treinamento" },
  { value: "+R$", label: "Foco em aumentar a sua lucratividade" },
];
