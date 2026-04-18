import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Grupo DAMA" },
      {
        name: "description",
        content: "Política de Privacidade e tratamento de dados do Grupo DAMA, em conformidade com a LGPD.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://grupodama.com.br/privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="bg-[var(--cream)] pt-32 pb-20">
      <div className="container-dama max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="heading-display mt-4 text-3xl md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <p>
            O Grupo DAMA respeita sua privacidade e está comprometido com a
            proteção dos seus dados pessoais, em conformidade com a Lei Geral de
            Proteção de Dados (Lei 13.709/2018 — LGPD).
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">1. Dados que coletamos</h2>
          <p>
            Coletamos apenas dados fornecidos voluntariamente por você ao
            preencher formulários de contato: nome, e-mail, telefone, assunto e
            mensagem. Também coletamos dados de navegação anônimos (cookies
            técnicos e analíticos).
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">2. Finalidade</h2>
          <p>
            Utilizamos seus dados exclusivamente para responder ao seu contato,
            entender o interesse em nossos serviços e melhorar a experiência do
            site. Não vendemos nem compartilhamos dados com terceiros para fins
            comerciais.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">3. Armazenamento</h2>
          <p>
            Os dados são armazenados em servidores seguros pelo tempo necessário
            ao atendimento da sua solicitação ou conforme exigido por lei.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">4. Seus direitos</h2>
          <p>
            Você pode, a qualquer momento, solicitar acesso, correção, portabilidade
            ou exclusão dos seus dados pessoais escrevendo para
            contato@grupodama.com.br.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">5. Cookies</h2>
          <p>
            Utilizamos cookies para garantir o funcionamento do site e medir
            audiência. Você pode desativá-los nas configurações do seu navegador.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">6. Encarregado de Dados (DPO)</h2>
          <p>
            Para questões relativas à LGPD, fale com nosso encarregado pelo
            e-mail contato@grupodama.com.br.
          </p>
        </div>
      </div>
    </section>
  );
}
