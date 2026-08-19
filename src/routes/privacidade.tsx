import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Grupo DAMA" },
      {
        name: "description",
        content: "Política de Privacidade e tratamento de dados do Grupo DAMA, em conformidade com a LGPD.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/privacidade" }],
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
          <p>Coletamos apenas o que você nos fornece voluntariamente.</p>
          <p>
            <strong className="text-[var(--navy)]">No formulário de contato:</strong>{" "}
            nome, e-mail, assunto e mensagem.
          </p>
          <p>
            <strong className="text-[var(--navy)]">No cadastro da newsletter:</strong>{" "}
            nome, e-mail e, opcionalmente, especialidade.
          </p>
          <p>
            Não coletamos dado sensível, não compramos lista e não coletamos dado
            de paciente. Também coletamos dados de navegação anônimos (cookies
            técnicos e analíticos).
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">2. Finalidade</h2>
          <p>
            Utilizamos seus dados exclusivamente para responder ao seu contato,
            entender o interesse em nossos serviços e melhorar a experiência do
            site. Não vendemos nem compartilhamos dados com terceiros para fins
            comerciais.
          </p>
          <p>
            <strong className="text-[var(--navy)]">Newsletter.</strong> Se você se
            cadastrar, usamos seu nome e e-mail para enviar a análise semanal sobre
            o mercado médico, e a especialidade, quando informada, apenas para
            tornar o conteúdo mais relevante. Você pode cancelar a qualquer momento,
            sem custo, pelo link no rodapé de qualquer envio.
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
            contato@grupodamahealth.com.br.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">5. Cookies</h2>
          <p>
            Utilizamos cookies para garantir o funcionamento do site e medir
            audiência. Você pode desativá-los nas configurações do seu navegador.
          </p>

          <h2 className="font-serif text-xl text-[var(--navy)]">6. Encarregado de Dados (DPO)</h2>
          <p>
            Para questões relativas à LGPD, fale com nosso encarregado pelo
            e-mail contato@grupodamahealth.com.br.
          </p>
        </div>
      </div>
    </section>
  );
}
