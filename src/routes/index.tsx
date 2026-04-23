import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { WhoWeAreShort } from "@/components/home/WhoWeAreShort";
import { SolutionOverview } from "@/components/home/SolutionOverview";
import { MethodOverview } from "@/components/home/MethodOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogHighlights } from "@/components/home/BlogHighlights";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grupo DAMA",
  description: "Operação comercial estratégica para médicos",
  url: "https://grupodamahealth.com.br",
  telephone: "+5521959214292",
  email: "contato@grupodamahealth.com.br",
  sameAs: ["https://www.instagram.com/damacomercialmedico"],
  founder: { "@type": "Person", name: "Jéssica Anjos" },
  areaServed: { "@type": "Country", name: "BR" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grupo DAMA | Operação Comercial Estratégica para Médicos" },
      {
        name: "description",
        content:
          "O Grupo DAMA integra time comercial, growth marketing e marketing 360 para médicos que querem crescer com previsibilidade. Presente em 16+ estados com 90+ médicos parceiros.",
      },
      { property: "og:title", content: "Grupo DAMA | Operação Comercial para Médicos" },
      {
        property: "og:description",
        content:
          "Time comercial, growth marketing e marketing 360 em uma operação só. 90+ médicos parceiros em 16+ estados.",
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
      <StatsBand />
      <WhoWeAreShort />
      <SolutionOverview />
      <MethodOverview />
      <Testimonials />
      <BlogHighlights />
      <ClosingCTA />
    </>
  );
}
