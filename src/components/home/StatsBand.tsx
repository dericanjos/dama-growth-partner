import { Reveal } from "@/components/Reveal";

const STATS = [
  { value: "+25.000", label: "Consultas Agendadas" },
  { value: "+90", label: "Médicos Parceiros" },
  { value: "+16", label: "Estados Atendidos" },
  { value: "+2.000", label: "Avaliações 5 Estrelas" },
];

export function StatsBand() {
  return (
    <section className="surface-dark border-t border-white/5 py-16 md:py-20">
      <div className="container-dama">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="text-center md:border-l md:border-white/10 md:first:border-l-0 md:px-6"
            >
              <div className="font-serif text-4xl md:text-5xl">
                <span className="gold-text">{s.value}</span>
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
