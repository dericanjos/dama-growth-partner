import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Grupo DAMA" },
      { name: "description", content: "Termos de uso do site do Grupo DAMA." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/termos" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="bg-[var(--cream)] pt-32 pb-20">
      <div className="container-dama max-w-3xl prose-dama">
        <span className="eyebrow">Legal</span>
        <h1 className="heading-display mt-4 text-3xl md:text-4xl">Termos de Uso</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <p>
            Bem-vindo ao site institucional do Grupo DAMA (“DAMA”, “nós”). Ao
            navegar por grupodamahealth.com.br, você concorda com os termos abaixo.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">1. Objeto</h2>
          <p>
            Este site tem caráter exclusivamente institucional e informativo.
            Não constitui oferta, contratação ou prestação direta de serviços.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">2. Propriedade Intelectual</h2>
          <p>
            Todos os conteúdos, marcas, logotipos, textos e identidade visual
            pertencem ao Grupo DAMA e são protegidos por lei. É proibida a
            reprodução sem autorização prévia e por escrito.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">3. Links Externos</h2>
          <p>
            O site pode conter links para domínios de terceiros, incluindo
            parceria.grupodama.com.br. Não nos responsabilizamos pelo conteúdo
            de páginas externas.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">4. Uso Permitido</h2>
          <p>
            O usuário se compromete a utilizar o site de boa-fé, sem prejudicar
            seu funcionamento, sua segurança ou terceiros.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">5. Alterações</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento. Recomendamos
            consulta periódica.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">6. Contato</h2>
          <p>
            Dúvidas: contato@grupodamahealth.com.br · (21) 95921-4292.
          </p>
        </div>
      </div>
    </section>
  );
}
