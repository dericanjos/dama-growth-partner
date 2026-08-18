import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Mail } from "lucide-react";
import { subscribeNewsletter } from "@/lib/newsletter.functions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterSignup({ origem, className = "" }: { origem: string; className?: string }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    if (nome.trim().length < 2) {
      setErro("Informe seu nome.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }
    if (!consentimento) {
      setErro("É necessário concordar com o uso dos dados.");
      return;
    }

    setStatus("sending");
    try {
      const res = await subscribeNewsletter({
        data: {
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          especialidade: especialidade.trim() || null,
          origem,
          consentimento: true,
        },
      });
      if (res.ok) {
        setMensagem(res.message);
        setStatus("done");
      } else {
        setErro(res.message);
        setStatus("idle");
      }
    } catch {
      setErro("Não conseguimos registrar agora. Tente novamente.");
      setStatus("idle");
    }
  }

  return (
    <section
      aria-labelledby={`newsletter-title-${origem}`}
      className={`rounded-[14px] border border-[var(--border)] bg-white p-6 md:p-8 ${className}`}
    >
      <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
        <Mail className="h-3.5 w-3.5" aria-hidden /> Newsletter DAMA
      </div>
      <h2
        id={`newsletter-title-${origem}`}
        className="font-serif text-[21px] font-semibold leading-[1.3] text-[var(--navy)] md:text-[24px]"
      >
        O que muda no mercado médico, direto no seu e-mail.
      </h2>
      <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--text-secondary)]">
        Uma análise por semana sobre regulação, convênio e operação de consultório. Sem promessa
        de resultado, sem venda.
      </p>

      {status === "done" ? (
        <p
          role="status"
          className="mt-6 flex items-start gap-2 rounded-[10px] border border-[color-mix(in_oklab,var(--gold)_45%,var(--border))] bg-[var(--cream)] p-4 text-[14.5px] text-[var(--navy)]"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-deep)]" aria-hidden />
          {mensagem}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Nome
              </span>
              <input
                type="text"
                name="nome"
                autoComplete="name"
                required
                maxLength={120}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3 py-2.5 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                E-mail
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3 py-2.5 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Especialidade (opcional)
            </span>
            <input
              type="text"
              name="especialidade"
              maxLength={120}
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3 py-2.5 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
            />
          </label>

          <label className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--text-secondary)]">
            <input
              type="checkbox"
              required
              checked={consentimento}
              onChange={(e) => setConsentimento(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--gold-deep)]"
            />
            <span>
              Concordo com o uso dos meus dados para receber a newsletter, conforme a{" "}
              <Link to="/privacidade" className="font-medium text-[var(--gold-deep)] underline underline-offset-2">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>

          {erro && (
            <p role="alert" className="text-[13.5px] font-medium text-[#B42318]">
              {erro}
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className="btn-gold disabled:opacity-60">
            {status === "sending" ? "Enviando..." : "Quero receber"}
          </button>
        </form>
      )}
    </section>
  );
}
