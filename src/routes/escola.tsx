import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

const ESCOLA_JSONLD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://grupodamahealth.com.br/escola#organization",
  name: "DAMA Escola",
  url: "https://grupodamahealth.com.br/escola",
  description:
    "Vertical educacional do Grupo DAMA Health, dedicada à formação de profissionais de atendimento do mercado médico.",
  parentOrganization: {
    "@type": "Organization",
    "@id": "https://grupodamahealth.com.br/#organization",
  },
  sameAs: ["https://escola.grupodamahealth.com.br"],
};

const ESCOLA_SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://grupodamahealth.com.br/escola#service",
  name: "DAMA Escola",
  url: "https://grupodamahealth.com.br/escola",
  provider: { "@id": "https://grupodamahealth.com.br/#organization" },
  description:
    "Formação Secretária D.A.M.A: formação de profissionais de atendimento do mercado médico com o método D.A.M.A.",
  areaServed: { "@type": "Country", name: "BR" },
  serviceType: "Formação de profissionais de atendimento do mercado médico",
  audience: {
    "@type": "Audience",
    audienceType:
      "Profissionais de saúde com consultório particular e profissionais de atendimento da saúde privada",
  },
};


const TITLE = "DAMA Escola | A vertical educacional do Grupo DAMA Health";
const DESCRIPTION =
  "A DAMA Escola forma a secretária de consultório médico com o método D.A.M.A. Conheça a vertical educacional do Grupo DAMA Health.";

export const Route = createFileRoute("/escola")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://grupodamahealth.com.br/escola" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/escola" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ESCOLA_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(ESCOLA_SERVICE_JSONLD) },
    ],
  }),
  component: EscolaPage,
});

const STEPS = [
  {
    title: "Diagnosticar",
    text: "reconhecer os perfis comportamentais de pacientes: quem é, o que sente e o que precisa ouvir",
  },
  {
    title: "Atrair",
    text: "conduzir com comunicação humanizada, que gera confiança desde a primeira mensagem",
  },
  {
    title: "Marcar",
    text: "conduzir a conversa até a agenda, sem pressão e sem deixar o paciente no vácuo",
  },
  { title: "Acompanhar", text: "seguir até a consulta e até o retorno" },
];

const MODULOS = [
  {
    title: "Primeiros Passos",
    text: "como estudar, como aplicar, e o que depende da formação e o que depende da aluna.",
  },
  {
    title: "Tabuleiro da Clínica",
    text: "a posição da profissional dentro da saúde privada, os dez princípios da conduta D.A.M.A, as cinco peças que determinam o crescimento de um consultório e o marketing sensorial da experiência presencial.",
  },
  {
    title: "Método B.E., o Banco Emocional D.A.M.A",
    text: "os perfis comportamentais do paciente, leitura de linguagem não verbal, psicologia da primeira impressão, as sete técnicas de comunicação envolvente e o que destrói confiança antes mesmo da consulta.",
  },
  {
    title: "Funil D.A.M.A",
    text: "o que é e o que não é vender na saúde, princípios da venda humanizada, os gatilhos que reduzem medo e dúvida em vez de manipular, o funil aplicado na prática e o atendimento a objeções.",
  },
  {
    title: "Jornada do Paciente",
    text: "confirmação e redução de falta, follow-up de quem não respondeu, fidelização, e recuperação de pacientes que pararam de voltar.",
  },
];

const H2 = "heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]";
const BODY = "mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]";

function EscolaPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Vertical Educacional
          </span>
          <h1 className="heading-display text-[30px] leading-[1.15] md:text-[52px]">
            <span className="gold-text">
              A secretária do consultório é uma posição estratégica. A DAMA Escola existe
              para formá-la como tal.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.7] text-white/80 md:text-[19px]">
            A DAMA Escola é a vertical educacional do Grupo DAMA Health. Enquanto a
            operação comercial da DAMA trabalha dentro do consultório do médico parceiro,
            a Escola olha para fora: forma profissionais do mercado médico com o mesmo
            método que a operação executa todos os dias.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl space-y-14">
          <Reveal>
            <h2 className={H2}>Por que existe uma escola dentro de uma operação comercial</h2>
            <div className={BODY}>
              <p>
                A DAMA descobriu o problema operando. Em consultórios particulares, a
                pessoa que atende o primeiro contato do paciente decide, na prática,
                quanto daquela agenda vai se converter. Ela não é uma etapa
                administrativa: é a etapa comercial mais determinante do consultório.
              </p>
              <p>
                E quase ninguém a treina para isso. A formação da recepção, quando existe,
                cobre sistema de agenda e cordialidade. Não cobre condução de conversa,
                tratamento de objeção, follow-up, redução de falta ou retorno de paciente
                inativo.
              </p>
              <p>
                A DAMA Escola nasceu dessa lacuna. Não para transformar a secretária em
                vendedora, mas para dar a ela o método que a posição sempre exigiu e
                ninguém tinha organizado.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>O método é o mesmo</h2>
            <div className={BODY}>
              <p>
                A Escola ensina o método D.A.M.A:{" "}
                <strong className="text-[var(--navy)]">
                  Diagnosticar · Atrair · Marcar · Acompanhar
                </strong>
                . Quatro passos aplicados na ordem, em cada atendimento da recepção.
              </p>
            </div>
            <ul className="mt-6 list-none space-y-4">
              {STEPS.map((s) => (
                <li
                  key={s.title}
                  className="card-dama p-5 md:p-6"
                  style={{ borderLeft: "4px solid var(--gold)" }}
                >
                  <span className="font-serif text-[18px] text-[var(--navy)] md:text-[20px]">
                    {s.title}
                  </span>
                  <span className="text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
                    {" "}
                    · {s.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className={BODY}>
              <p>
                É o mesmo método que a operação comercial da DAMA aplica nos consultórios
                parceiros. A diferença é quem executa: lá, a estrutura da DAMA. Aqui, a
                profissional formada.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>A estrutura da formação</h2>
            <div className={BODY}>
              <p>
                A Formação Secretária D.A.M.A é o produto da Escola. São cinco módulos e
                vinte e cinco aulas, organizados assim:
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {MODULOS.map((m) => (
                <article key={m.title} className="card-dama p-6 md:p-8">
                  <h3 className="font-serif text-[19px] leading-[1.3] text-[var(--navy)] md:text-[22px]">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
                    · {m.text}
                  </p>
                </article>
              ))}
            </div>
            <div className={BODY}>
              <p>
                Cada aula segue a mesma estrutura: a grande ideia, o essencial do
                conteúdo, uma ferramenta para preencher, uma aplicação prática e a missão
                da semana. Existe uma regra: não se avança para a próxima aula sem ter
                feito a missão da anterior. Conteúdo acumulado sem aplicação não constrói
                profissional nenhuma.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>A certificação</h2>
            <div className={BODY}>
              <p>
                Ao concluir todas as etapas e missões, a profissional recebe o{" "}
                <strong className="text-[var(--navy)]">Certificado D.A.M.A</strong>,
                emitido pela plataforma, com código de verificação pública.
              </p>
              <p>
                O certificado é dela, e é permanente. Não é um comprovante de horas
                assistidas: é o registro de que o método foi aplicado.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>Para quem a Escola foi construída</h2>
            <div className={BODY}>
              <p>
                <strong className="text-[var(--navy)]">
                  Para o profissional de saúde que quer formar a equipe que já tem.
                </strong>{" "}
                Médico, dentista, biomédico, psicólogo ou fisioterapeuta com consultório
                ou clínica particular, que percebeu que o que chega na recepção não está
                virando agenda, e prefere um método já testado a treinar do zero.
              </p>
              <p>
                <strong className="text-[var(--navy)]">
                  Para a profissional que quer construir uma carreira nesta posição.
                </strong>{" "}
                Quem trabalha ou quer trabalhar na recepção da saúde privada e entendeu
                que existe um caminho técnico ali, com nome, método e certificação.
              </p>
              <p>
                <strong className="text-[var(--navy)]">E para quem não foi.</strong> Para
                quem espera que assistir aula mude alguma coisa sem aplicar. E para o
                consultório que atende exclusivamente por convênio: o método é desenhado
                para conversão de atendimento particular, e sem isso ainda não é o
                momento.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>
              DAMA Escola e operação DAMA são duas respostas diferentes
            </h2>
            <div className={BODY}>
              <p>
                O Grupo DAMA Health tem duas formas de resolver o mesmo problema, e elas
                não competem entre si.
              </p>
              <p>
                <strong className="text-[var(--navy)]">
                  A operação comercial da DAMA
                </strong>{" "}
                assume a frente comercial do consultório com estrutura própria,
                indicadores e método rodando de fora para dentro. É para quem quer a
                responsabilidade fora da sua mesa.
              </p>
              <p>
                <strong className="text-[var(--navy)]">A DAMA Escola</strong> forma quem
                já está na recepção, para que a estrutura passe a existir de dentro. É
                para quem tem a pessoa certa e falta o método.
              </p>
              <p>
                A escolha depende do momento do consultório, não do tamanho dele. E se
                você não souber qual das duas faz sentido, essa é exatamente a conversa do
                diagnóstico.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>O que a Escola não faz</h2>
            <div className={BODY}>
              <p>
                Não promete resultado. Não promete renda. Não garante número e não data
                resultado.
              </p>
              <p>
                O que a formação entrega é o método, as ferramentas e a certificação. O
                que acontece depois depende da aplicação na rotina real de um consultório
                real.
              </p>
              <p>
                A Escola também segue as mesmas normas que orientam toda a comunicação do
                Grupo DAMA Health: nada que promova promessa de resultado clínico,
                exposição de paciente ou prática vedada pelas resoluções do CFM.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                A DAMA Escola é a vertical educacional do Grupo DAMA Health. O método é o
                mesmo que a operação pratica. O que muda é quem passa a executá-lo.
              </p>
            </div>
            <a
              href="https://escola.grupodamahealth.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8"
            >
              Conhecer a Formação Secretária D.A.M.A <span aria-hidden>→</span>
            </a>
          </Reveal>

        </div>
      </section>
    </>
  );
}
