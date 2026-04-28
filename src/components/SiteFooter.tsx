import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="surface-darker pt-16 pb-10">
      <div className="container-dama">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl font-semibold text-white">DAMA</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
              Grupo DAMA
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Operação Comercial Estratégica para Médicos.
            </p>
          </div>

          <FooterCol title="Navegação">
            <FooterLink to="/">Início</FooterLink>
            <FooterLink to="/sobre">Quem Somos</FooterLink>
            <FooterLink to="/solucao">Nossa Solução</FooterLink>
            <FooterLink to="/metodo">Método</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/glossario">Glossário</FooterLink>
            <FooterLink to="/noticias">Notícias Médicas</FooterLink>
            <FooterLink to="/contato">Contato</FooterLink>
          </FooterCol>

          <FooterCol title="Contato">
            <a
              href="https://wa.me/5521959214292"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-[var(--gold)]" />
              (21) 95921-4292
            </a>
            <a
              href="mailto:contato@grupodamahealth.com.br"
              className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[var(--gold)]" />
              contato@grupodamahealth.com.br
            </a>
            <a
              href="https://instagram.com/damacomercialmedico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
            >
              <Instagram className="h-3.5 w-3.5 text-[var(--gold)]" />
              @damacomercialmedico
            </a>
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink to="/termos">Termos de Uso</FooterLink>
            <FooterLink to="/privacidade">Política de Privacidade</FooterLink>
          </FooterCol>
        </div>

        <div
          className="mt-14 h-px hairline-gold"
          aria-hidden
        />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Grupo DAMA. Todos os direitos reservados.</p>
          <p>CNPJ · Operação 100% conforme as normas do CFM.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow mb-4 text-white/85" style={{ color: "var(--gold)" }}>
        {title}
      </h4>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm text-white/65 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}
