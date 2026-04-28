import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, HandHeart, GraduationCap, ShieldCheck, Handshake, Sparkles, Flame } from "lucide-react";
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
      { property: "og:url", content: "https://grupodamahealth.com.br/sobre" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/sobre" }],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, label: "Empatia", text: "Nos interessamos genuinamente pelo problema para entregarmos uma solução." },
  { icon: HandHeart, label: "Bondade", text: "Gentileza também é uma forma de excelência." },
  { icon: GraduationCap, label: "Educação", text: "A forma como falamos define a experiência que entregamos." },
  { icon: ShieldCheck, label: "Responsabilidade", text: "Cuidamos dos detalhes como quem cuida do próprio negócio." },
  { icon: Handshake, label: "Confiabilidade", text: "Médico parceiro dorme tranquilo porque sabe que pode confiar na nossa equipe." },
  { icon: Sparkles, label: "Honestidade", text: "A verdade é inegociável, mesmo quando exige conversas difíceis." },
  { icon: Flame, label: "Determinação", text: "Não soltamos a mão até a meta virar realidade. Aqui focamos em entregar resultado e não serviço." },
];

const TIMELINE = [
  { year: "2022", title: "Fundação", text: "Jéssica Anjos cria a DAMA como time de atendimento comercial para consultórios médicos." },
  { year: "2023", title: "Primeiros parceiros", text: "Os primeiros médicos parceiros validam o método. As taxas de conversão dobram." },
  { year: "2024", title: "Expansão nacional", text: "A operação ultrapassa fronteiras estaduais. O time interno cresce e o marketing passa a integrar a nossa solução." },
  { year: "2025", title: "Operação Integrada", text: "Time Comercial, Growth, Marketing Médico e Tecnologia Avançada passam a operar de forma unificada. Nasce o ecossistema estratégico de soluções do Grupo Dama." },
  { year: "2026", title: "Grupo DAMA", text: "+90 médicos parceiros, presença em +16 Estados e +25 mil consultas agendadas. O grupo DAMA se consolida como referência altamente indicada pelos seus clientes e inicia sua fase de expansão nacional." },
  { year: "2027", title: "Expansão do Ecossistema", text: "Novas verticais passam a integrar o Grupo DAMA, ampliando a estrutura de soluções estratégicas para médicos em todo o Brasil a fim de potencializar os seus resultados." },
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
              Da percepção à estrutura inteligente.
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-10 space-y-6 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
            <p>
              O Grupo DAMA nasceu da percepção de que muitos médicos altamente capacitados viviam doentes, sobrecarregados e presos a um resultado pequeno e instável por tentarem sustentar sozinhos todas as áreas do consultório ou delegar funções estratégicas para profissionais sem a expertise necessária.
            </p>
            <p>
              O problema nunca foi falta de competência médica. O problema era a ausência de uma operação comercial e estratégica capaz de transformar atendimento em receita, crescimento previsível e consistente. Enquanto o médico cuidava do paciente, ninguém cuidava da estrutura responsável pelo faturamento do consultório.
            </p>
            <p>
              Foi nesse contexto que <span className="font-semibold text-[var(--navy)]">Jéssica Anjos</span> fundou a DAMA. O que começou como um time especializado em atendimento comercial humanizado através do método D.A.M.A evoluiu para um ecossistema integrado de soluções que hoje reúne comercial, growth, marketing médico, gestão, tecnologia exclusiva e mais, para médicos em todo o nosso Brasil.
            </p>
            <p>
              Hoje, o Grupo DAMA atua como extensão estratégica de consultórios médicos, estruturando operações inteligentes e sustentáveis através de método, dados e processos à prova de crises.
            </p>
            <p className="font-serif text-[20px] italic text-[var(--navy)] md:text-[22px]">
              “Médicos deveriam investir sua energia salvando vidas, e não tentando sustentar sozinhos o crescimento do próprio consultório.”
            </p>
            <p className="text-[14px] uppercase tracking-[0.18em] text-[var(--gold-deep)]">
              — Jéssica Anjos
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
                    Cristã, esposa, mãe, empreendedora e leitora voraz. Criadora do Grupo DAMA, transformou uma operação comercial enxuta em um ecossistema estratégico que hoje serve a médicos em diferentes regiões do nosso Brasil.
                  </p>
                  <p>
                    Sua visão é clara: <span className="font-semibold text-[var(--navy)]">médico deveria se dedicar a salvar vidas e não a sustentar sozinho o seu próprio crescimento.</span>
                  </p>
                  <p>
                    Sob sua liderança, o Grupo DAMA construiu um time interno multidisciplinar que opera através de dados com autonomia, método e acima de tudo, propósito.
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
              <span className="gold-text">7 valores que orientam tudo</span>
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
            <span className="gold-text">Quer fazer parte dessa história de crescimento?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
            Buscamos parceiros decididos a crescer através de processo e construção de médio e longo prazo, sem fórmulas mágicas ou promessas mentirosas.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
            Quer entender como isso funciona na prática? Fale diretamente com a nossa equipe.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <a
              href={`https://wa.me/5521959214292?text=${encodeURIComponent("Olá, Jessica! Vim do site do Grupo DAMA e gostaria de saber mais sobre os serviços e como funciona a parceria.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Falar com um especialista <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
