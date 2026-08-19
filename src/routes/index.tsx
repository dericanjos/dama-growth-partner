import { createFileRoute } from "@tanstack/react-router";
import { organizationSchema } from "@/config/organizacao";
import { Hero } from "@/components/home/Hero";
import { WhoWeAreShort } from "@/components/home/WhoWeAreShort";
import { SolutionOverview } from "@/components/home/SolutionOverview";
import { MethodOverview } from "@/components/home/MethodOverview";
import { VerticalsOverview } from "@/components/home/VerticalsOverview";
import { BlogHighlights } from "@/components/home/BlogHighlights";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  ...organizationSchema({
    description:
      "Operação Comercial Estratégica para Médicos. O Grupo DAMA Health estrutura a frente comercial de consultórios particulares com método, pessoas, tecnologia e dados.",
    founder: { "@type": "Person", name: "Jéssica Anjos" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://grupodamahealth.com.br/contato",
      availableLanguage: "Portuguese",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
  }),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grupo DAMA | Solução Completa para Médicos" },
      {
        name: "description",
        content:
          "Operação Comercial Estratégica para Médicos. O Grupo DAMA Health estrutura a frente comercial de consultórios particulares com método, pessoas, tecnologia e dados.",
      },
      { property: "og:title", content: "Grupo DAMA | Solução Completa para Médicos" },
      {
        property: "og:description",
        content:
          "Operação Comercial Estratégica para Médicos. O Grupo DAMA Health estrutura a frente comercial de consultórios particulares com método, pessoas, tecnologia e dados.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Grupo DAMA | Solução Completa para Médicos" },
      {
        name: "twitter:description",
        content:
          "Operação Comercial Estratégica para Médicos. O Grupo DAMA Health estrutura a frente comercial de consultórios particulares com método, pessoas, tecnologia e dados.",
      },
      { property: "og:url", content: "https://grupodamahealth.com.br/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Grupo DAMA" },
      { property: "og:locale", content: "pt_BR" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAreShort />
      <SolutionOverview />
      <MethodOverview />
      <VerticalsOverview />
      <BlogHighlights />
      <ClosingCTA />
    </>
  );
}
