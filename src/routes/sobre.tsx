import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, HandHeart, Crown, GraduationCap, ShieldCheck, Handshake, Sparkles, Flame } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos | Grupo DAMA — A história por trás da operação" },
      {
        name: "description",
        content:
          "Conheça a história do Grupo DAMA, fundado por Jéssica Anjos. De atendimento comercial a uma operação integrada para mais de 90 médicos em 16 estados.",
      },
      { property: "og:title", content: "Quem Somos | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "A história do Grupo DAMA e da fundadora Jéssica Anjos — autoridade, método e atendimento humanizado.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, label: "Empatia", text: "Entender antes de agir. Cada paciente é uma história, não um lead." },
  { icon: HandHeart, label: "Bondade", text: "Tratar pessoas com gentileza — médicos, equipes e pacientes." },
  { icon: Crown, label: "Honra", text: "A palavra dada vale mais do que qualquer contrato." },
  { icon: GraduationCap, label: "Educação", text: "Aprendizado contínuo. O time DAMA estuda todos os dias." },
  { icon: ShieldCheck, label: "Responsabilidade", text: "Assumir o que é nosso. Reportar, corrigir, evoluir." },
  { icon: Handshake, label: "Confiabilidade", text: "Médico parceiro dorme tranquilo sabendo que sua operação anda." },
  { icon: Sparkles, label: "Honestidade", text: "Verdade sempre. Mesmo quando dói. Mesmo quando custa." },
  { icon: Flame, label: "Determinação", text: "Não soltamos a mão até a meta virar realidade." },
];

const TIMELINE = [
  { year: "2022", title: "Fundação", text: "Jéssica Anjos cria a DAMA como time de atendimento comercial para consultórios médicos." },
  { year: "2023", title: "Primeiros parceiros", text: "Os primeiros médicos parceiros validam o método. As taxas de conversão dobram." },
  { year: "2024", title: "Expansão nacional", text: "A operação cruza estados. Time interno cresce. Marketing entra como vertical integrada." },
  { year: "2025", title: "Operação 360", text: "Time comercial + growth marketing + marketing 360 sob o mesmo teto. Nasce o Método D.A.M.A." },
  { year: "2026", title: "Grupo DAMA", text: "+90 médicos, 16+ estados, +25.000 consultas agendadas. A marca se consolida como referência." },
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Quem Somos
          </span>
          <h1 className="heading-display text-[34px] leading-[1.1] md:text-[58px]">
            <span className="gold-text">
              A DAMA nasceu pra devolver ao médico o que ele mais precisa: tempo e crescimento.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-white/75 md:text-[17px]">
            Não somos agência. Não somos terceirização avulsa. Somos o time que opera a frente comercial do consultório como se fosse nosso.
          </p>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="bg-[var(--cream)] py-24 md:py-32">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal>
            <span className="badge-pill-light">
              <span className="badge-pill-dot" /> Nossa História
            </span>
            <h2 className="heading-display mt-6 text-[30px] md:text-[42px]">
              Da convicção à operação.
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-10 space-y-6 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
            <p>
              A história do Grupo DAMA começa com uma observação simples: médicos brilhantes — especialistas, com formação sólida, atendimento atencioso — estavam perdendo dinheiro porque ninguém cuidava da operação comercial dos seus consultórios.
            </p>
            <p>
              Pacientes ligavam e ninguém respondia. Leads chegavam pelo Instagram e ficavam dias sem retorno. Agendas tinham buracos enquanto a sala de espera vazia gritava o óbvio: o médico fazia bem o que sabia fazer, mas não tinha estrutura para vender.
            </p>
            <p>
              Foi nesse contexto que <span className="font-semibold text-[var(--navy)]">Jéssica Anjos</span> fundou a DAMA. Começou como um time pequeno de atendimento comercial — pessoas treinadas para responder, qualificar e agendar. Em pouco tempo, ficou claro que atendimento sem marketing era operação sem combustível, e marketing sem atendimento era investimento jogado fora.
            </p>
            <p>
              A DAMA evoluiu. Integrou growth marketing. Integrou marketing 360. Criou método próprio. Hoje opera como extensão do consultório de mais de 90 médicos parceiros em 16 estados — com método, dados e atendimento humanizado.
            </p>
            <p className="font-serif text-[20px] italic text-[var(--navy)] md:text-[22px]">
              “O médico cuida do paciente. A DAMA cuida do crescimento.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* FUNDADORA */}
      <section className="bg-[var(--cream)] pb-24 md:pb-32">
        <div className="container-dama">
          <div className="card-dama overflow-hidden">
            <div className="grid md:grid-cols-[260px_1fr]">
              <div
                className="hidden items-center justify-center bg-[var(--navy)] md:flex"
                aria-hidden
              >
                <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-[var(--gold)]/40 bg-[var(--navy-light)] font-serif text-5xl text-[var(--gold)]">
                  JA
                </div>
              </div>
              <div className="p-8 md:p-12">
                <span className="eyebrow">Fundadora</span>
                <h3 className="heading-display mt-3 text-[28px] md:text-[34px]">
                  Jéssica Anjos
                </h3>
                <div className="mt-6 space-y-4 text-[15.5px] leading-[1.8] text-[var(--text-secondary)]">
                  <p>
                    Empreendedora, líder e estrategista comercial. Construiu a DAMA da primeira ligação à operação que hoje atende dezenas de especialidades médicas pelo Brasil.
                  </p>
                  <p>
                    Sua visão é clara: <span className="font-semibold text-[var(--navy)]">médico não deveria precisar escolher entre cuidar de paciente e cuidar do negócio.</span> Cabe a uma operação séria, ética e profissional fazer isso por ele.
                  </p>
                  <p>
                    Sob sua liderança, o Grupo DAMA construiu um time interno multidisciplinar — atendimento, marketing, growth, gestão — que opera com autonomia, método e propósito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="surface-dark relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">
              <span className="badge-pill-dot" /> Nossos Valores
            </span>
            <h2 className="heading-display mt-6 text-[30px] md:text-[44px]">
              <span className="gold-text">8 valores que orientam tudo</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/65 md:text-base">
              Não são frases bonitas na parede. São critérios reais de contratação, de decisão e de operação.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.label} delay={(i % 4) * 80} className="card-dark p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[color-mix(in_oklab,var(--gold)_14%,transparent)] text-[var(--gold-light)]">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-[18px] text-white">{v.label}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-white/60">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[var(--cream)] py-24 md:py-32">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal className="text-center">
            <span className="badge-pill-light">
              <span className="badge-pill-dot" /> Marcos
            </span>
            <h2 className="heading-display mt-6 text-[30px] md:text-[42px]">
              A linha do tempo da DAMA.
            </h2>
          </Reveal>

          <ol className="relative mt-14 space-y-10 border-l-2 border-[var(--gold)]/35 pl-8 md:pl-10">
            {TIMELINE.map((m, i) => (
              <Reveal key={m.year} delay={i * 80}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[42px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)] ring-4 ring-[var(--cream)] md:-left-[50px]"
                  />
                  <div className="font-serif text-[28px] text-[var(--gold-deep)]">{m.year}</div>
                  <h3 className="mt-1 font-serif text-[20px] text-[var(--navy)]">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-[var(--text-secondary)]">{m.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark relative overflow-hidden py-24 md:py-28">
        <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <h2 className="heading-display text-[28px] md:text-[42px]">
            <span className="gold-text">Quer fazer parte dessa história?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
            A DAMA cresce escolhendo bem com quem caminha. Conheça a parceria — ou fale diretamente com a equipe.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://parceria.grupodama.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Conhecer a Parceria <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Falar com a equipe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
