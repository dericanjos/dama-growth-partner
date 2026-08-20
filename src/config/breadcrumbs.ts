const SITE = "https://grupodamahealth.com.br";

/** BreadcrumbList de 2 níveis: Início > [Página] */
export function breadcrumbJsonLd(name: string, path: string) {
  const url = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}
