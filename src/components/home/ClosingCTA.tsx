import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const WA_URL =
  "https://wa.me/5521959214292?text=" +
  encodeURIComponent(
    "Olá, Jessica! Vim do site do Grupo DAMA e gostaria de saber mais sobre os serviços e como funciona a parceria."
  );

export function ClosingCTA() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-dama relative max-w-3xl text-center">
        <Reveal>
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Crescimento previsível exige mais do que marketing.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
            Exige uma operação estratégica comprometida com o seu resultado. Conheça os critérios da parceria com o Grupo DAMA.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex items-center justify-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Falar com um especialista <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
