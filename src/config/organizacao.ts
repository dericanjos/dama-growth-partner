/**
 * Fonte única de verdade dos dados institucionais do Grupo DAMA.
 *
 * CAMPOS AINDA NÃO FORNECIDOS (preencher quando o dado oficial chegar):
 *   - logradouro, numero, complemento, bairro, cep
 *     (endereço de registro é residencial; aguardando assinatura da sede física)
 *   - fundacao: data de fundação pendente de definição.
 *     Candidatas: "2021-03-27" (início de atividade no CNPJ) e "2022" (narrativa institucional atual).
 *
 * Regra: campo vazio nunca é renderizado na interface nem emitido no JSON-LD.
 */
export const ORGANIZACAO = {
  razaoSocial: "41.374.506 Jéssica Anjos dos Reis Botelho",
  nomeFantasia: "Grupo DAMA Health",
  cnpj: "41.374.506/0001-48",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "Rio de Janeiro",
  uf: "RJ",
  cep: "",
  telefone: "+5521959214292",
  telefoneExibicao: "(21) 95921-4292",
  email: "contato@grupodamahealth.com.br",
  site: "https://grupodamahealth.com.br",
  logo: "https://grupodamahealth.com.br/logo.png",
  fundacao: "",
  metricasAtualizadasEm: "agosto de 2026",
  perfisSociais: [
    "https://www.instagram.com/damacomercialmedico",
    "https://www.instagram.com/grupodamahealth",
    "https://www.instagram.com/dericanjos/",
  ],
} as const;


const notEmpty = (value: string) => value.trim().length > 0;

/** PostalAddress apenas com os campos preenchidos. Retorna undefined se não houver dado. */
export function buildPostalAddress() {
  const street = [
    ORGANIZACAO.logradouro,
    ORGANIZACAO.numero,
    ORGANIZACAO.complemento,
    ORGANIZACAO.bairro,
  ]
    .filter(notEmpty)
    .join(", ");
  const address: Record<string, string> = { "@type": "PostalAddress", addressCountry: "BR" };
  if (notEmpty(street)) address.streetAddress = street;

  if (notEmpty(ORGANIZACAO.cidade)) address.addressLocality = ORGANIZACAO.cidade;
  if (notEmpty(ORGANIZACAO.uf)) address.addressRegion = ORGANIZACAO.uf;
  if (notEmpty(ORGANIZACAO.cep)) address.postalCode = ORGANIZACAO.cep;
  return address;
}

/** Schema Organization canônico, sem nenhum campo em branco. */
export function organizationSchema(extra: Record<string, unknown> = {}) {
  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${ORGANIZACAO.site}/#organization`,
    name: ORGANIZACAO.nomeFantasia,
    alternateName: "DAMA",
    url: ORGANIZACAO.site,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZACAO.logo,
      width: 600,
      height: 180,
    },
    email: ORGANIZACAO.email,
    telephone: ORGANIZACAO.telefone,
    areaServed: { "@type": "Country", name: "BR" },
    sameAs: [...ORGANIZACAO.perfisSociais],
    address: buildPostalAddress(),
    ...extra,
  };
  if (notEmpty(ORGANIZACAO.fundacao)) org.foundingDate = ORGANIZACAO.fundacao;
  if (notEmpty(ORGANIZACAO.razaoSocial)) org.legalName = ORGANIZACAO.razaoSocial;
  if (notEmpty(ORGANIZACAO.cnpj)) org.taxID = ORGANIZACAO.cnpj;
  return org;
}

/** Publisher enxuto para NewsArticle / BlogPosting. */
export const PUBLISHER_SCHEMA = {
  "@type": "Organization",
  "@id": `${ORGANIZACAO.site}/#organization`,
  name: ORGANIZACAO.nomeFantasia,
  url: ORGANIZACAO.site,
  logo: {
    "@type": "ImageObject",
    url: ORGANIZACAO.logo,
    width: 600,
    height: 180,
  },
} as const;
