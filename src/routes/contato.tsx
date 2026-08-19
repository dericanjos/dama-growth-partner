import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CheckCircle2, HelpCircle, Instagram, Mail, Phone } from "lucide-react";
import { ASSUNTOS, enviarContato } from "@/lib/contato.functions";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Grupo DAMA Health" },
      {
        name: "description",
        content:
          "Canal institucional do Grupo DAMA Health. Fale com a gente sobre imprensa, parcerias, a DAMA Escola, a operação comercial ou qualquer outro assunto.",
      },
      { property: "og:title", content: "Contato | Grupo DAMA Health" },
      { property: "og:description", content: "Canal institucional do Grupo DAMA Health." },
      { property: "og:url", content: "https://grupodamahealth.com.br/contato" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/contato" }],
  }),
  component: ContactPage,
});

const WA_URL =
  "https://wa.me/5521959214292?text=" +
  encodeURIComponent("Olá, vim do site do Grupo DAMA Health. Gostaria de falar com a equipe.");

const ATALHOS: Array<{ to: string; label: string; text: string }> = [
  { to: "/metodo", label: "/metodo", text: "Como funciona o método D.A.M.A, etapa por etapa." },
  { to: "/solucao", label: "/solucao", text: "As três verticais do Grupo DAMA Health." },
  { to: "/faq", label: "/faq", text: "As perguntas que mais recebemos, respondidas." },
  { to: "/glossario", label: "/glossario", text: "Vinte termos do mercado médico, explicados." },
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[color-mix(in_oklab,var(--navy)_18%,transparent)] bg-white px-3.5 py-2.5 text-[15px] text-[var(--navy)] outline-none transition-colors focus:border-[var(--gold)]";
const labelClass = "block text-[13px] font-medium text-[var(--navy)]";

function ContatoForm() {
  const enviar = useServerFn(enviarContato);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [erro, setErro] = useState<string | null>(null);
  const [mensagemOk, setMensagemOk] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setErro(null);
    try {
      const res = await enviar({
        data: {
          nome: String(fd.get("nome") ?? ""),
          email: String(fd.get("email") ?? ""),
          assunto: String(fd.get("assunto") ?? "") as (typeof ASSUNTOS)[number],
          mensagem: String(fd.get("mensagem") ?? ""),
          origem: "site/contato",
          consentimento: true as const,
        },
      });
      if (res.ok) {
        setMensagemOk(res.message);
        setStatus("done");
        form.reset();
      } else {
        setErro(res.message);
        setStatus("idle");
      }
    } catch {
      setErro("Não conseguimos registrar agora. Tente novamente ou chame no WhatsApp.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold-soft)] p-6">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[var(--gold-deep)]" />
        <p className="text-[15.5px] leading-[1.75] text-[var(--navy)]">{mensagemOk}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className={labelClass} htmlFor="nome">
          Nome
        </label>
        <input id="nome" name="nome" required maxLength={160} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={255}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="assunto">
          Assunto
        </label>
        <select id="assunto" name="assunto" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecione
          </option>
          {ASSUNTOS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="mensagem">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          maxLength={2000}
          className={inputClass}
        />
      </div>
      <label className="flex items-start gap-3 text-[13.5px] leading-[1.6] text-[var(--text-secondary)]">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--gold-deep)]" />
        <span>
          Autorizo o Grupo DAMA Health a entrar em contato e tratar meus dados conforme a{" "}
          <Link to="/privacidade" className="text-[var(--navy)] underline underline-offset-4">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {erro ? <p className="text-[13.5px] text-red-700">{erro}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full justify-center disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}

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
            Este é o canal institucional do Grupo DAMA Health. Use para falar com a gente sobre
            qualquer assunto.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 md:py-24">
        <div className="container-dama grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[34px]">
              Canais diretos
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Para conversar com nossa equipe, use os canais abaixo.
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
                  <div className="font-medium text-[var(--navy)]">(21) 95921-4292</div>
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
                  <div className="font-medium text-[var(--navy)]">@damacomercialmedico</div>
                </div>
              </a>
            </div>

            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Já é médico parceiro e precisa falar com a operação? Use o mesmo WhatsApp e informe
              seu nome no primeiro contato.
            </p>

            <div className="mt-10">
              <h3 className="font-serif text-[20px] text-[var(--navy)]">
                Procurando algo específico?
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-[1.75] text-[var(--text-secondary)]">
                <li>
                  Conhecer a operação comercial para consultórios{" "}
                  <a
                    href="https://comercial.grupodamahealth.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
                  >
                    comercial.grupodamahealth.com.br
                  </a>
                </li>
                <li>
                  Conhecer a DAMA Escola{" "}
                  <Link
                    to="/escola"
                    className="text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
                  >
                    /escola
                  </Link>
                </li>
                <li>
                  Ler o que publicamos sobre o mercado médico{" "}
                  <Link
                    to="/noticias"
                    className="text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
                  >
                    /noticias
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="card-dama p-8">
            <h2 className="font-serif text-2xl text-[var(--navy)]">Formulário</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Preencha abaixo e nossa equipe responde por e-mail.
            </p>
            <div className="mt-7">
              <ContatoForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] pb-24 md:pb-28">
        <div className="container-dama mx-auto max-w-3xl">
          <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[34px]">
            Antes de escrever, talvez já esteja respondido
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ATALHOS.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="card-dama flex items-start gap-4 p-5 transition-colors hover:border-[var(--gold)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[var(--navy)]">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <span className="text-sm">
                  <strong className="block font-serif text-[var(--navy)]">{a.label}</strong>
                  <span className="mt-1 block text-[var(--text-secondary)]">{a.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
