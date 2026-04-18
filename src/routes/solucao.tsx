import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solucao")({
  head: () => ({
    meta: [
      { title: "Nossa Solução | Grupo DAMA — Time Comercial, Growth Marketing, Marketing 360" },
      {
        name: "description",
        content:
          "Conheça a operação integrada do Grupo DAMA: time comercial estratégico, growth marketing orientado por dados e marketing 360 para consultórios médicos.",
      },
      { property: "og:title", content: "Nossa Solução | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Time comercial + growth marketing + marketing 360 em uma operação integrada.",
      },
    ],
  }),
  component: SolutionSoonPage,
});

function SolutionSoonPage() {
  return (
    <section className="bg-[var(--cream)] min-h-[80vh] pt-32">
      <div className="container-dama max-w-2xl py-20 text-center">
        <span className="eyebrow">Nossa Solução</span>
        <h1 className="heading-display mt-4 text-4xl md:text-5xl">Em breve.</h1>
        <p className="mt-5 text-[var(--text-secondary)]">
          Esta página está sendo construída. Volte em instantes ou fale conosco.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-[var(--navy)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--navy-light)]"
        >
          Voltar ao início <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
