import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const VERTICAIS = [
  {
    title: "DAMA Estratégica",
    text: "A operação comercial estratégica dentro do consultório do médico parceiro.",
    to: "/dama-estrategica",
  },
  {
    title: "DAMA Escola",
    text: "A vertical educacional, que forma profissionais de atendimento do mercado médico.",
    to: "/escola",
  },
  {
    title: "DAMA Tech",
    text: "A plataforma que sustenta a operação por dentro.",
    to: "/dama-tech",
  },
];

export function VerticalsOverview() {
  return (
    <section className="bg-[var(--cream)] py-24 md:py-32">
      <div className="container-dama">
        <Reveal className="max-w-2xl">
          <div className="badge-pill-light">
            <span className="badge-pill-dot" />
            Verticais
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.5rem]">
            Três verticais, públicos diferentes.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VERTICAIS.map((v, i) => (
            <Reveal
              key={v.to}
              delay={i * 90}
              className="card-dama flex flex-col p-7"
            >
              <h3 className="font-serif text-xl text-[var(--navy)]">{v.title}</h3>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                {v.text}
              </p>
              <Link
                to={v.to}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] underline-offset-4 hover:underline"
              >
                Conhecer {v.title} <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
