import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import gil from "@/assets/testimonials/gil.png";
import evelin from "@/assets/testimonials/evelin.jpg";
import ulyscelio from "@/assets/testimonials/ulyscelio.png";
import simone from "@/assets/testimonials/simone.png";
import brunaB from "@/assets/testimonials/bruna-bressanelli.png";
import mariana from "@/assets/testimonials/mariana.png";
import luan from "@/assets/testimonials/luan.png";
import brunaP from "@/assets/testimonials/bruna-porto.png";
import joao from "@/assets/testimonials/joao.png";

interface T {
  name: string;
  specialty: string;
  text: string;
  photo: string;
}

const TESTIMONIALS: T[] = [
  {
    name: "Dr. Gil Lemes",
    specialty: "Psiquiatra",
    text: "Em um teste de cliente oculto, o melhor atendimento dentre todos os consultórios foi o de vocês. As mentoras ficaram muito impressionadas com a técnica, a presteza e a cordialidade.",
    photo: gil,
  },
  {
    name: "Dra. Evelin Lubrigatti",
    specialty: "Cardiologista",
    text: "Encontrei a DAMA em um momento crítico. Odeio atendimentos robotizados, e meus pacientes também. Uma surpresa boa atrás da outra, pacientes bem atendidos!",
    photo: evelin,
  },
  {
    name: "Dr. Ulyscélio Ferreira",
    specialty: "Neurocirurgião",
    text: "Tenho muito orgulho do trabalho que construímos ao longo desses 2 anos. Não canso de encher o tanque de vocês, cultura é tudo!",
    photo: ulyscelio,
  },
  {
    name: "Dra. Simone Godoy",
    specialty: "Pediatra",
    text: "Desde que comecei com a DAMA, venho recebendo diversos feedbacks positivos dos pacientes. Minhas taxas de conversão aumentaram e eu consegui abrir agenda em mais dias e aumentar o valor da minha consulta.",
    photo: simone,
  },
  {
    name: "Dra. Bruna Bressanelli",
    specialty: "Pediatra",
    text: "Eu realmente gosto muito do serviço de vocês. Vocês são detalhistas, dedicadas, muito competentes ao meu ver. Por isso tenho indicado tanto.",
    photo: brunaB,
  },
  {
    name: "Dra. Mariana Amaral",
    specialty: "Cardiologista",
    text: "Minha experiência tem sido muito boa. Respostas rápidas e que tornam o serviço bem eficiente. Estamos melhorando a cada mês. Inclusive, já indiquei o serviço para várias pessoas.",
    photo: mariana,
  },
  {
    name: "Dr. Luan Luckmann",
    specialty: "Reumatologista",
    text: "Aumentaram minha conversão de novos pacientes particulares e fidelizaram os antigos, além de terem criado processos de resgate e de follow-up. Recomendo muito.",
    photo: luan,
  },
  {
    name: "Dra. Bruna Porto",
    specialty: "Reumatologista",
    text: "Já conseguimos diminuir o número de faltas que eu tinha e aumentamos o número de pacientes. Se Deus quiser vamos conseguir aumentar a agenda cada vez mais.",
    photo: brunaP,
  },
  {
    name: "Dr. João Batista",
    specialty: "Neurocirurgião",
    text: "Vocês são incríveis!",
    photo: joao,
  },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--cream)] py-24 md:py-32">
      <div className="container-dama">
        <Reveal className="max-w-2xl">
          <div className="badge-pill-light">
            <span className="badge-pill-dot" />
            Depoimentos
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.5rem]">
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
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-1 ring-[color-mix(in_oklab,var(--gold)_40%,var(--border))]"
                />
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
