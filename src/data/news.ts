export type NewsCategory = "Regulamentação" | "Congressos" | "Pesquisa" | "Mercado";

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  category: NewsCategory;
  date: string; // ISO yyyy-mm-dd
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  "Regulamentação",
  "Congressos",
  "Pesquisa",
  "Mercado",
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    title: "CFM publica novas diretrizes sobre publicidade médica em redes sociais",
    summary:
      "O Conselho Federal de Medicina atualizou as regras para uso de redes sociais por médicos, ampliando o que é permitido em conteúdo educativo.",
    source: "CFM",
    url: "https://portal.cfm.org.br",
    category: "Regulamentação",
    date: "2026-04-16",
  },
  {
    title: "Congresso Brasileiro de Clínica Médica acontece em agosto em São Paulo",
    summary:
      "O CBCM 2026 reunirá especialistas de todo o país para discutir avanços em diagnóstico e tratamento. Inscrições abertas.",
    source: "SBCM",
    url: "https://www.sbcm.org.br",
    category: "Congressos",
    date: "2026-04-14",
  },
  {
    title: "Estudo aponta que telemedicina cresceu 340% no Brasil desde 2020",
    summary:
      "Pesquisa publicada na Revista Brasileira de Medicina mostra adoção crescente de teleconsultas entre médicos de todas as especialidades.",
    source: "Revista Brasileira de Medicina",
    url: "https://www.rbm.org.br",
    category: "Pesquisa",
    date: "2026-04-11",
  },
  {
    title: "ANS reajusta teto de planos de saúde individuais em 6,91% para 2026",
    summary:
      "O reajuste autorizado pela Agência Nacional de Saúde Suplementar entra em vigor em maio e impacta contratos individuais e familiares.",
    source: "ANS",
    url: "https://www.gov.br/ans",
    category: "Regulamentação",
    date: "2026-04-08",
  },
  {
    title: "Mercado de saúde privada movimenta R$320 bilhões no Brasil em 2025",
    summary:
      "Dados do IESS mostram crescimento de 12% em relação ao ano anterior, com destaque para consultas particulares e procedimentos eletivos.",
    source: "IESS",
    url: "https://www.iess.org.br",
    category: "Mercado",
    date: "2026-04-05",
  },
];
