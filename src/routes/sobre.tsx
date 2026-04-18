import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos | Grupo DAMA — Operação Comercial para Médicos" },
      {
        name: "description",
        content:
          "Conheça a história do Grupo DAMA, fundado por Jéssica Anjos. De atendimento comercial a uma operação integrada para mais de 90 médicos em 16 estados.",
      },
      { property: "og:title", content: "Quem Somos | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "A história do Grupo DAMA e da fundadora Jéssica Anjos.",
      },
    ],
  }),
  component: AboutSoonPage,
});

function AboutSoonPage() {
  return (
    <section className="surface-dark min-h-[80vh] pt-32">
      <div className="container-dama max-w-2xl py-20 text-center">
        <span className="eyebrow">Quem Somos</span>
        <h1 className="heading-display mt-4 text-4xl text-white md:text-5xl">
          Em breve.
        </h1>
        <p className="mt-5 text-white/60">
          Esta página está sendo construída. Volte em instantes ou fale conosco.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--navy)] hover:bg-[var(--gold-light)]"
        >
          Voltar ao início <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
