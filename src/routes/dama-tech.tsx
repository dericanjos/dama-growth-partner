import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ORGANIZACAO } from "@/config/organizacao";

const PAGE_URL = `${ORGANIZACAO.site}/dama-tech`;

const TITLE = "DAMA Tech | A infraestrutura da operação DAMA em produto";
const DESCRIPTION =
  "Plataforma de Atendimento, App do médico parceiro e CRM DAMA. A infraestrutura da operação comercial transformada em produto.";

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "DAMA Tech",
  url: PAGE_URL,
  provider: { "@id": `${ORGANIZACAO.site}/#organization` },
  description:
    "Vertical de tecnologia do Grupo DAMA Health: Plataforma de Atendimento DAMA, App DAMA e CRM DAMA, a camada comercial entre o primeiro contato do paciente e a consulta.",
  areaServed: { "@type": "Country", name: "BR" },
  serviceType: "Tecnologia para a frente comercial de consultórios médicos",
  audience: {
    "@type": "Audience",
    audienceType: "Médicos parceiros da operação e médicos donos de consultório particular",
  },
};

export const Route = createFileRoute("/dama-tech")({
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
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) }],
  }),
  component: DamaTechPage,
});

const H2 = "heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]";
const BODY = "mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]";

const PRODUTOS = [
  {
    title: "Plataforma de Atendimento DAMA",
    text: "A infraestrutura que sustenta a operação comercial dentro do consultório. É onde o método D.A.M.A vira rotina: cada contato com processo, cada conversa com registro, cada etapa com indicador.",
  },
  {
    title: "App DAMA",
    text: "A janela do médico parceiro para a própria operação. Mostra o que está acontecendo na frente comercial do consultório e os indicadores da semana, sem precisar pedir relatório para ninguém.",
  },
  {
    title: "CRM DAMA",
    text: "O produto. O CRM que a operação usa, disponível também para quem não é parceiro da operação comercial. É a ferramenta sem a estrutura em volta, para o médico que quer organizar a própria frente comercial.",
  },
];

function DamaTechPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Vertical de Tecnologia
          </span>
          <h1 className="heading-display text-[34px] leading-[1.1] md:text-[56px]">
            <span className="gold-text">A infraestrutura da operação, em produto.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-white/75 md:text-[17px]">
            A DAMA opera consultórios todos os dias. A DAMA Tech é o que sustenta essa
            operação por dentro, transformado em produto. Não é software de gestão
            genérico: é a infraestrutura da DAMA, com o método embutido.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl space-y-14">
          {PRODUTOS.map((p) => (
            <Reveal key={p.title}>
              <h2 className={H2}>{p.title}</h2>
              <div className={BODY}>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <h2 className={H2}>O que a DAMA Tech não é</h2>
            <div className={BODY}>
              <p>
                Não é software de gestão de clínica, não substitui prontuário e não faz
                agendamento por conta própria. É a camada comercial: o que acontece entre
                o primeiro contato do paciente e a consulta acontecer.
              </p>
              <p>
                As mesmas regras valem aqui: sem promessa de resultado, sem exposição de
                paciente, e dentro das normas do CFM.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FECHO E CHAMADA */}
      <section className="surface-dark relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-serif text-[19px] leading-[1.65] text-white/85 md:text-[23px]">
              A DAMA Tech está em evolução contínua, junto com a operação que ela
              sustenta.
            </p>
            <Link to="/contato" className="btn-gold mt-9">
              Falar sobre a DAMA Tech <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
