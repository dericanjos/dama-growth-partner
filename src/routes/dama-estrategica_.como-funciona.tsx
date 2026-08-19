import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ORGANIZACAO } from "@/config/organizacao";

const PARENT_URL = `${ORGANIZACAO.site}/dama-estrategica`;
const PAGE_URL = `${PARENT_URL}/como-funciona`;

const TITLE = "Como funciona a implantação | DAMA Estratégica";
const DESCRIPTION =
  "Do contrato ao go-live: briefing, diagnóstico, kickoff, construção e o checklist que libera o tráfego. Cada etapa com dono, prazo e critério de pronto.";

const WEBPAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${PARENT_URL}#service` },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${ORGANIZACAO.site}/` },
    { "@type": "ListItem", position: 2, name: "O que fazemos", item: `${ORGANIZACAO.site}/solucao` },
    { "@type": "ListItem", position: 3, name: "DAMA Estratégica", item: PARENT_URL },
    { "@type": "ListItem", position: 4, name: "Como funciona a implantação", item: PAGE_URL },
  ],
};

export const Route = createFileRoute("/dama-estrategica_/como-funciona")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(WEBPAGE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(BREADCRUMB_JSONLD) },
    ],
  }),
  component: ComoFuncionaPage,
});

function Bloco({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="mt-16">
      <h2 className="heading-display text-[24px] leading-[1.25] text-[var(--navy)] md:text-[34px]">
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
        {children}
      </div>
    </Reveal>
  );
}

function ComoFuncionaPage() {
  return (
    <>
      <section className="surface-dark relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-3xl">
          <nav aria-label="Trilha de navegação" className="text-xs text-white/60">
            <ol className="flex list-none flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link to="/solucao" className="hover:text-white">
                  O que fazemos
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link to="/dama-estrategica" className="hover:text-white">
                  DAMA Estratégica
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-white/80">Como funciona a implantação</li>
            </ol>
          </nav>

          <h1 className="heading-display mt-8 text-[30px] leading-[1.15] text-white md:text-[46px]">
            Do contrato ao go-live, com dono e prazo em cada etapa.
          </h1>
          <p className="mt-7 text-[16px] leading-[1.85] text-white/75 md:text-[17px]">
            A implantação da operação segue um cronograma de dezessete marcos, do M0 ao
            M16, cada um com responsável, prazo padrão e dependência declarada. Atraso
            vira sinal interno, e o sinal vale para os dois lados. O que está abaixo é o
            processo real, não uma versão simplificada dele.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 md:py-24">
        <div className="container-dama mx-auto max-w-3xl">
          <Bloco title="Semana 1 · antes de a DAMA assumir qualquer coisa">
            <p>
              <strong className="text-[var(--navy)]">O briefing de entrada.</strong>{" "}
              Cinquenta e cinco perguntas, todas obrigatórias, respondidas em ambiente
              próprio. Elas vão da tese do médico e do paciente ideal até ticket por
              procedimento, as cinco maiores objeções que ele mais ouve, o no-show
              estimado, a origem dos pacientes em percentual, o que já foi tentado em
              marketing e por que parou. Prazo de três dias úteis. Se travar, a DAMA
              preenche por chamada.
            </p>
            <p>
              <strong className="text-[var(--navy)]">O diagnóstico de partida.</strong>{" "}
              Uma auditoria de catorze páginas em sete dimensões, cada uma com nota de
              zero a dez: credenciais e autoridade, reputação e Google Meu Negócio,
              audiência social, site institucional, atendimento, prova social e captura,
              e mídia paga.
            </p>
            <p>
              <strong className="text-[var(--navy)]">O cliente oculto.</strong> O
              atendimento do consultório é testado como paciente, no WhatsApp real,{" "}
              <strong className="text-[var(--navy)]">
                sempre antes de a DAMA assumir
              </strong>
              . Essa janela existe uma única vez. É o "antes" oficial contra o qual toda
              a evolução vai ser medida depois, e por isso não pode ser feito depois.
            </p>
          </Bloco>

          <Bloco title="Semana 1 · o kickoff">
            <p>Quarenta e cinco minutos, gravado, com sete tempos definidos.</p>
            <p>
              O que se levanta ali, junto com o médico, e não por estimativa: a jornada
              do paciente hoje, quem responde, por onde e em quanto tempo, quanto leva do
              primeiro contato até a consulta, quem apresenta valores, qual o protocolo
              de retorno. Depois os números: o CAC calculado na reunião, as conversões de
              contato para agendamento, de agendamento para comparecimento e de
              comparecimento para fechamento, o LTV montado ali, a capacidade real da
              agenda e a sazonalidade.
            </p>
            <p>
              E uma pergunta que costuma mudar a conversa: se a agenda dobrar em noventa
              dias, o que quebra primeiro.
            </p>
            <p>
              O kickoff termina com os marcos de construção definidos com o médico e
              lançados no sistema no mesmo dia. Sem marcos lançados, o kickoff não conta
              como feito.
            </p>
          </Bloco>

          <Bloco title="Semanas 2 e 3 · a estratégia e o documento de comunicação">
            <p>
              <strong className="text-[var(--navy)]">A estratégia de crescimento</strong>{" "}
              vem em duas peças. Uma interna, que não sai da casa, com metas, baseline,
              fases, riscos e plano B. Uma externa, o Plano de Crescimento, com nove
              seções: onde você está, o que buscamos juntos, o que vamos construir, as
              estratégias de funis, a ordem de construção, o seu papel e como você
              acompanha. Nada da fase seguinte começa sem esse plano aceito.
            </p>
            <p>
              <strong className="text-[var(--navy)]">O documento de comunicação</strong>{" "}
              é o documento-mãe do médico, com dez blocos: a tese dele, a crença e o que
              ele combate, os diferenciais, o paciente ideal, o sentimento que a jornada
              deve produzir, a arquitetura arquetípica, o tom de voz com frases literais
              dele num quadro de "fala assim" e "não fala assim", as mensagens-chave, a
              direção visual e as regras inegociáveis de conformidade.
            </p>
            <p>Nenhum criativo, legenda ou anúncio nasce sem ele.</p>
          </Bloco>

          <Bloco title="A construção">
            <p>
              <strong className="text-[var(--navy)]">Estratégia de funis.</strong> Três
              funis com ficha própria: intenção, tráfego pago e orgânico. Todos terminam
              no mesmo lugar, a conversa entregue ao atendimento. Painel único, da
              impressão ao fechamento, com dono por etapa e leitura semanal conjunta.
            </p>
            <p>
              <strong className="text-[var(--navy)]">Presença digital.</strong> Página
              sob medida com abordagem sintoma-primeiro, credenciais com CRM e RQE, sem
              preço e sem promessa, e{" "}
              <strong className="text-[var(--navy)]">
                o domínio sempre em nome do médico
              </strong>
              . Google Meu Negócio com ficha reivindicada, dados consistentes e protocolo
              ético de avaliações: pedido no pós-consulta, nunca compra, nunca desconto.
              Instagram e WhatsApp comercial organizados.
            </p>
            <p>
              <strong className="text-[var(--navy)]">Tráfego pago.</strong> Estrutura
              decidida por árvore registrada e justificada, e regras de operação por
              escrito: sete dias de aprendizado sem mexer, escala em degraus, pausa de
              criativo por frequência e custo, log obrigatório com data e motivo, uma
              variável por vez.
            </p>
            <p>
              <strong className="text-[var(--navy)]">Conteúdo e orgânico.</strong>{" "}
              Esteira mensal de referência, com uma única sessão de gravação em lote por
              mês, roteiros aprovados com antecedência. O mês inteiro agendado antes do
              dia 1.
            </p>
            <p>
              <strong className="text-[var(--navy)]">Reativação e indicados.</strong>{" "}
              Seis segmentos de base, régua de no máximo três toques com pausa de trinta
              dias. Um princípio que não se negocia:{" "}
              <strong className="text-[var(--navy)]">
                para o paciente, o motivo do chamado é clínico, nunca promocional.
              </strong>{" "}
              E indicação sem recompensa condicionada, porque isso é vedado pelas normas
              do CFM.
            </p>
            <p>
              <strong className="text-[var(--navy)]">Protocolos de oferta.</strong> Os
              tratamentos organizados com o nome do próprio médico, em duas versões: uma
              de consulta com valores, uma pública sem valores. A DAMA dá a referência de
              preço. <strong className="text-[var(--navy)]">Quem define o preço é o médico.</strong>
            </p>
            <p>
              <strong className="text-[var(--navy)]">Retorno e recorrência.</strong>{" "}
              Pós-consulta em quarenta e oito horas, retorno agendado na saída da consulta
              como prescrição do médico, lembretes programados, e a métrica que interessa:
              taxa de retorno dentro do prazo clínico.
            </p>
          </Bloco>

          <Bloco title="O go-live tem um gate, e ele reprova">
            <p>
              Nenhum real de tráfego sai antes do checklist de go-live aprovado. É regra,
              sem exceção.
            </p>
            <p>
              Uma sessão de sessenta a noventa minutos, oito seções verificadas{" "}
              <strong className="text-[var(--navy)]">com evidência</strong>, print ou
              teste feito na hora: presença digital de pé, rastreamento testado de
              verdade, página testada ponta a ponta em celular real, atendimento
              respondendo a um teste real, operação alinhada, criativos aprovados pelo
              médico, revisão de conformidade peça a peça, e o médico ciente com resposta
              registrada.
            </p>
            <p>
              <strong className="text-[var(--navy)]">
                Um único item reprovado trava o go-live até a correção.
              </strong>{" "}
              A aprovação vale por sete dias.
            </p>
          </Bloco>

          <Bloco title="Depois do go-live">
            <p>
              A operação passa a ter ritual: leitura semanal dos números, marco de trinta
              dias, tradução de valor aos noventa, projeção do ciclo seguinte entre cento
              e cinquenta e cento e oitenta dias.
            </p>
            <p>
              O relatório mensal não é uma tabela. É a leitura do que aconteceu, com a
              conta feita: quantos pacientes entraram na agenda, quantos teriam se
              perdido sem a operação, e o que ficou pendente de cada lado.
            </p>
          </Bloco>

          <Reveal className="mt-16">
            <p className="font-serif text-[19px] leading-[1.65] text-[var(--navy)] md:text-[21px]">
              Nenhuma dessas etapas tem data de resultado prometida. O que tem data é a
              construção.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-dark relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <Reveal>
            <a
              href="https://comercial.grupodamahealth.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Solicitar diagnóstico da operação <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
