import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Grupo DAMA — Fale Conosco" },
      {
        name: "description",
        content: "Entre em contato com o Grupo DAMA. WhatsApp, e-mail e Instagram.",
      },
      { property: "og:title", content: "Contato | Grupo DAMA" },
      { property: "og:description", content: "Fale com o Grupo DAMA." },
      { property: "og:url", content: "https://grupodamahealth.com.br/contato" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/contato" }],
  }),
  component: ContactPage,
});

const WA_URL =
  "https://wa.me/5521959214292?text=" +
  encodeURIComponent(
    "Olá, sou médico(a) e vim do site do Grupo DAMA. Gostaria de saber mais."
  );

function ContactPage() {
  return (
    <>
      <section className="surface-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama max-w-3xl">
          <span className="eyebrow">Contato</span>
          <h1 className="heading-display mt-4 text-4xl text-white md:text-5xl">
            Fale com o Grupo DAMA.
          </h1>
          <p className="mt-5 max-w-xl text-white/65">
            Dúvidas, sugestões ou interesse em parceria — estamos aqui.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 md:py-24">
        <div className="container-dama grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-serif text-2xl text-[var(--navy)]">
              Canais diretos
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Para conversar com nossa equipe, use os canais abaixo. Para
              parcerias comerciais, conheça também o portal de parceria.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card-dama flex items-center gap-4 p-5 transition-all hover:[&]:[transform:translateY(-2px)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[var(--navy)]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    WhatsApp
                  </div>
                  <div className="font-medium text-[var(--navy)]">
                    (21) 95921-4292
                  </div>
                </div>
              </a>

              <a
                href="mailto:contato@grupodamahealth.com.br"
                className="card-dama flex items-center gap-4 p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[var(--navy)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    E-mail
                  </div>
                  <div className="font-medium text-[var(--navy)]">
                    contato@grupodamahealth.com.br
                  </div>
                </div>
              </a>

              <a
                href="https://instagram.com/damacomercialmedico"
                target="_blank"
                rel="noopener noreferrer"
                className="card-dama flex items-center gap-4 p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[var(--navy)]">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Instagram
                  </div>
                  <div className="font-medium text-[var(--navy)]">
                    @damacomercialmedico
                  </div>
                </div>
              </a>
            </div>

            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Para parcerias comerciais, acesse{" "}
              <a
                href="https://parceria.grupodama.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--navy)] underline-offset-4 hover:underline"
              >
                parceria.grupodama.com.br
              </a>
              .
            </p>
          </div>

          <div className="card-dama p-8">
            <h2 className="font-serif text-2xl text-[var(--navy)]">
              Formulário de contato
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Em construção. Será conectado ao e-mail corporativo do Grupo DAMA
              em breve. Por ora, use o WhatsApp ou envie diretamente para{" "}
              <a
                href="mailto:contato@grupodamahealth.com.br"
                className="text-[var(--navy)] underline-offset-4 hover:underline"
              >
                contato@grupodamahealth.com.br
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
