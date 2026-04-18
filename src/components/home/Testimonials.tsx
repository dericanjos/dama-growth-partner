import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface T {
  name: string;
  specialty: string;
  text: string;
}

const TESTIMONIALS: T[] = [
  {
    name: "Dr. Gil Lemes",
    specialty: "Psiquiatra",
    text: "Em um teste de cliente oculto, o melhor atendimento dentre todos os consultórios foi o de vocês. As mentoras ficaram muito impressionadas com a técnica, a presteza e a cordialidade.",
  },
  {
    name: "Dra. Evelin Lubrigatti",
    specialty: "Cardiologista",
    text: "Encontrei a DAMA em um momento crítico. Odeio atendimentos robotizados, e meus pacientes também. Uma surpresa boa atrás da outra, pacientes bem atendidos!",
  },
  {
    name: "Dr. Ulyscélio Ferreira",
    specialty: "Neurocirurgião",
    text: "Tenho muito orgulho do trabalho que construímos ao longo desses 2 anos. Não canso de encher o tanque de vocês, cultura é tudo!",
  },
  {
    name: "Dra. Simone Godoy",
    specialty: "Pediatra",
    text: "Desde que comecei com a DAMA, venho recebendo diversos feedbacks positivos dos pacientes. Minhas taxas de conversão aumentaram e eu consegui abrir agenda em mais dias e aumentar o valor da minha consulta.",
  },
  {
    name: "Dra. Bruna Bressanelli",
    specialty: "Pediatra",
    text: "Eu realmente gosto muito do serviço de vocês. Vocês são detalhistas, dedicadas, muito competentes ao meu ver. Por isso tenho indicado tanto.",
  },
  {
    name: "Dra. Mariana Amaral",
    specialty: "Cardiologista",
    text: "Minha experiência tem sido muito boa. Respostas rápidas e que tornam o serviço bem eficiente. Estamos melhorando a cada mês. Inclusive, já indiquei o serviço para várias pessoas.",
  },
  {
    name: "Dr. Luan Luckmann",
    specialty: "Reumatologista",
    text: "Aumentaram minha conversão de novos pacientes particulares e fidelizaram os antigos, além de terem criado processos de resgate e de follow-up. Recomendo muito.",
  },
  {
    name: "Dra. Bruna Porto",
    specialty: "Reumatologista",
    text: "Já conseguimos diminuir o número de faltas que eu tinha e aumentamos o número de pacientes. Se Deus quiser vamos conseguir aumentar a agenda cada vez mais.",
  },
  {
    name: "Dr. João Batista",
    specialty: "Neurocirurgião",
    text: "Vocês são incríveis!",
  },
];

function initials(name: string) {
  return name
    .replace(/^Dra?\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="bg-[var(--cream)] py-24 md:py-32">
      <div className="container-dama">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="heading-display mt-4 text-3xl md:text-[2.5rem]">
            O que médicos parceiros dizem sobre a DAMA
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 90}
              className="card-dama group flex flex-col p-7 hover:[&]:[transform:translateY(-3px)] hover:border-[color-mix(in_oklab,var(--gold)_50%,var(--border))]"
            >
              <Quote className="h-7 w-7 text-[var(--gold)]" strokeWidth={1.5} />
              <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                {t.text}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy-light)] font-serif text-sm font-semibold text-[var(--gold)]">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--navy)]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {t.specialty}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
