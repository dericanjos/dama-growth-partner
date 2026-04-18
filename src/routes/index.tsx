import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { WhoWeAreShort } from "@/components/home/WhoWeAreShort";
import { SolutionOverview } from "@/components/home/SolutionOverview";
import { MethodOverview } from "@/components/home/MethodOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCTA } from "@/components/home/ClosingCTA";

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
      { property: "og:type", content: "website" },
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
      <ClosingCTA />
    </>
  );
}
