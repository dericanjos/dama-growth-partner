import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Search, Megaphone, CalendarCheck, Activity } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o Método D.A.M.A?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Método D.A.M.A é a filosofia proprietária do Grupo DAMA composta por 4 pilares: Diagnosticar, Atrair, Marcar e Acompanhar.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona a operação comercial da DAMA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Grupo DAMA integra operação comercial, growth marketing e marketing 360 numa operação que funciona como extensão do consultório do médico.",
      },
    },
  ],
};

const HOWTO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Método D.A.M.A: Diagnosticar, Atrair, Marcar, Acompanhar",
  description:
    "Os quatro passos aplicados em cada contato que chega ao consultório, em ciclo contínuo.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Diagnosticar",
      text: "Reconhecer com quem se está falando antes de decidir o que dizer: quem é essa pessoa, o que ela sente e o que precisa ouvir para dar o próximo passo com segurança.",
      url: "https://grupodamahealth.com.br/metodo#diagnosticar",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Atrair",
      text: "Gerar confiança dentro da conversa que já começou, com comunicação humanizada e autoridade evidenciada, sem pressão nem urgência artificial.",
      url: "https://grupodamahealth.com.br/metodo#atrair",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Marcar",
      text: "Conduzir a conversa até a agenda sem pressão e sem deixar o paciente no vácuo, com próximo passo claro e follow-up registrado.",
      url: "https://grupodamahealth.com.br/metodo#marcar",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Acompanhar",
      text: "Seguir até a consulta e até o retorno: confirmar, reduzir a falta, remarcar quem faltou e chamar de volta quem tinha retorno previsto.",
      url: "https://grupodamahealth.com.br/metodo#acompanhar",
    },
  ],
};

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método D.A.M.A | Diagnosticar, Atrair, Marcar, Acompanhar" },
      {
        name: "description",
        content:
          "Método D.A.M.A — a filosofia proprietária do Grupo DAMA. Quatro pilares que transformam consultórios em operações previsíveis.",
      },
      { property: "og:title", content: "Método D.A.M.A | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Diagnosticar, Atrair, Marcar, Acompanhar — o método que guia a operação DAMA.",
      },
      { property: "og:url", content: "https://grupodamahealth.com.br/metodo" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/metodo" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(HOWTO_JSONLD) },
    ],
  }),
  component: MethodPage,
});

const STEPS = [
  {
    letter: "D",
    id: "diagnosticar",
    icon: Search,
    title: "Diagnosticar",
    lead: "Antes da técnica, existe o porquê.",
    paragraphs: [
      "Diagnosticar é reconhecer com quem se está falando antes de decidir o que dizer. Quem é essa pessoa, o que ela está sentindo, o que ela precisa ouvir para dar o próximo passo com segurança.",
      "Na prática, isso significa que a mesma pergunta sobre preço recebe conduções diferentes dependendo de quem pergunta: quem está com dor e quer resolver hoje, quem está pesquisando três consultórios, quem já foi mal atendido antes e chega desconfiado, quem está decidindo por um familiar.",
      "Um atendimento que não diagnostica trata todos igual. E tratar todos igual é a forma mais eficiente de perder quem era diferente.",
    ],
  },
  {
    letter: "A",
    id: "atrair",
    icon: Megaphone,
    title: "Atrair",
    lead: "Atrair, aqui, não é gerar tráfego. É gerar confiança dentro da conversa que já começou.",
    paragraphs: [
      "É a etapa em que a comunicação humanizada faz o paciente entender que do outro lado existe alguém que sabe do que está falando e que se importa com o que ele está passando. Autoridade evidenciada, não anunciada.",
      "Na prática: responder rápido, chamar pelo nome, demonstrar que se leu o que a pessoa escreveu, explicar o que acontece na consulta, e nunca conduzir por medo, urgência artificial ou pena.",
      "A DAMA conduz a decisão. Não convence, não pressiona, não insiste.",
    ],
  },
  {
    letter: "M",
    id: "marcar",
    icon: CalendarCheck,
    title: "Marcar",
    lead: "Marcar é conduzir a conversa até a agenda sem pressão e sem deixar o paciente no vácuo.",
    paragraphs: [
      "A maior parte da receita que escapa de um consultório escapa exatamente aqui: a conversa foi boa, o paciente ficou interessado, e ninguém propôs o próximo passo de forma clara. Ele disse que ia pensar. Ninguém voltou.",
      "Na prática: oferecer dois horários em vez de perguntar \u201Cquando você pode\u201D, registrar o combinado, e assumir que o silêncio não é uma resposta, é um follow-up pendente.",
    ],
  },
  {
    letter: "A",
    id: "acompanhar",
    icon: Activity,
    title: "Acompanhar",
    lead: "Acompanhar é seguir até a consulta e até o retorno.",
    paragraphs: [
      "É a etapa que quase ninguém opera, porque ela acontece depois da parte que parecia importante. Confirmar, reduzir a falta, remarcar quem faltou, chamar de volta quem tinha retorno previsto e não voltou.",
      "É também a etapa que alimenta a anterior: cada acompanhamento devolve informação sobre por que o paciente veio, por que faltou e por que voltou. Esse aprendizado entra no diagnóstico do próximo contato, e o ciclo recomeça mais preciso.",
    ],
  },
];

function MethodPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Método Proprietário
          </span>
          <h1 className="heading-display text-[44px] leading-[1.05] md:text-[80px]">
            <span className="gold-text">Método D.A.M.A</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.7] text-white/80 md:text-[19px]">
            D.A.M.A são quatro passos aplicados na ordem, em cada contato que chega
            ao consultório. Não é um funil linear que começa e termina: é um ciclo.
            O que se aprende no acompanhamento de um paciente muda o diagnóstico do
            próximo.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal className="space-y-6 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
            <p>
              O Método D.A.M.A é a filosofia que guia cada decisão dentro da operação. Não é um framework genérico copiado de livro de marketing. É a forma como aprendemos a operar consultórios médicos depois de mais de 90 parcerias e centenas de milhares de interações com pacientes reais.
            </p>
            <p>
              São quatro pilares (Diagnosticar, Atrair, Marcar e Acompanhar) que se aplicam em ciclo, não em linha reta. A operação roda continuamente: diagnostica, atrai, marca, acompanha, e o aprendizado de cada ciclo alimenta o próximo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CIRCULAR DIAGRAM */}
      <section className="bg-[var(--cream)] pb-20 md:pb-28">
        <div className="container-dama">
          <Reveal>
            <div className="card-dama relative mx-auto max-w-2xl px-6 py-12 md:py-16">
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                {STEPS.map((s) => (
                  <div
                    key={s.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--gold)]/40 bg-[var(--gold-soft)] font-serif text-5xl text-[var(--gold-deep)] md:h-24 md:w-24 md:text-6xl">
                      {s.letter}
                    </div>
                    <div className="mt-3 font-serif text-[18px] text-[var(--navy)] md:text-[20px]">
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                <span className="h-px w-10 bg-[var(--gold)]/40" />
                Ciclo contínuo
                <span className="h-px w-10 bg-[var(--gold)]/40" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEPS DETAILED */}
      <section className="bg-[var(--cream)] pb-24 md:pb-32">
        <div className="container-dama mx-auto max-w-3xl space-y-10 md:space-y-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.title + s.id} delay={i * 80}>
              <article
                id={s.id}
                className="card-dama p-8 md:p-12"
                style={{ borderLeft: "4px solid var(--gold)" }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] font-serif text-3xl text-[var(--gold)]">
                    {s.letter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                      <s.icon className="h-3.5 w-3.5" />
                      Etapa {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] leading-[1.15] text-[var(--navy)] md:text-[34px]">
                      {s.title}
                    </h2>
                  </div>
                </div>
                <p className="mt-6 font-serif text-[18px] leading-[1.6] text-[var(--navy)] md:text-[20px]">
                  {s.lead}
                </p>
                <div className="mt-5 space-y-4 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
                  {s.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SEÇÕES FINAIS */}
      <section className="bg-[var(--cream)] pb-24 md:pb-32">
        <div className="container-dama mx-auto max-w-3xl space-y-14">
          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]">
              O método também é como a DAMA vende
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                A primeira reunião com um médico parceiro roda o mesmo método.
                Diagnosticar, com perguntas e números. Atrair, gerando confiança com
                clareza e não com pressão. Marcar, com um próximo passo definido.
                Acompanhar, com follow-up pontual.
              </p>
              <p>
                A reunião comercial é uma demonstração do método. Se ele não
                funcionasse ali, não teria por que funcionar no seu consultório.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]">
              O que o método não faz
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                O método não substitui o médico. Ele cuida do que está fora da sala
                de consulta.
              </p>
              <p>
                Não promete resultado clínico, não interfere em conduta, não expõe
                paciente, não divulga valores publicamente e não usa antes e depois
                sensacionalista. Conformidade com as normas do CFM não é detalhe: é
                princípio, e está dentro do roteiro, não anexada a ele.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]">
              Como o método é implantado
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                A implantação segue um processo documentado, com etapas nomeadas e
                critério de pronto em cada uma. Começa por um diagnóstico de
                partida, passa por um documento de comunicação, pela estratégia de
                crescimento e de funis, e só então pela operação rodando com
                indicadores semanais.
              </p>
              <p>
                Não existe fase em que o médico não sabe o que está acontecendo.
                Transparência sobre o número, inclusive quando o número piora, faz
                parte do que a DAMA garante.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark relative overflow-hidden py-24 md:py-28">
        <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <h2 className="heading-display text-[28px] md:text-[42px]">
            <span className="gold-text">Quer o Método D.A.M.A operando no seu consultório?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
            Entenda como estruturamos consultórios para crescerem com previsibilidade e consistência através de processos bem definidos.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://comercial.grupodamahealth.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Quero ser parceiro <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
