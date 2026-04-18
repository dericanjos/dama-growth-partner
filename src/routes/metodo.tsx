import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método D.A.M.A | Diagnosticar, Atrair, Marcar, Acompanhar — Grupo DAMA" },
      {
        name: "description",
        content:
          "O Método D.A.M.A é a filosofia proprietária do Grupo DAMA. Quatro pilares que transformam consultórios em operações previsíveis.",
      },
      { property: "og:title", content: "Método D.A.M.A | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Diagnosticar, Atrair, Marcar, Acompanhar — a filosofia que guia a operação DAMA.",
      },
    ],
  }),
  component: MethodSoonPage,
});

function MethodSoonPage() {
  return (
    <section className="surface-dark min-h-[80vh] pt-32">
      <div className="container-dama max-w-2xl py-20 text-center">
        <span className="eyebrow">Método D.A.M.A</span>
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
