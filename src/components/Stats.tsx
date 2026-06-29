import Reveal from "./Reveal";
import CountUp from "./ui/CountUp";

const stats = [
  { to: 10, suffix: "K+", label: "Comunidad construida para clientes" },
  { to: 6, suffix: "", label: "Servicios bajo un mismo techo" },
  { to: 24, suffix: "/7", label: "Atención automatizada por WhatsApp" },
  { to: 100, suffix: "%", label: "Enfocados en convertir, no en likes" },
];

export default function Stats() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-4 gap-2 rounded-3xl border border-white/10 bg-night-card px-3 py-7 sm:gap-6 md:p-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="font-bebas text-3xl font-bold tracking-wide text-gradient sm:text-5xl md:text-6xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[11px] font-medium leading-snug text-white sm:text-sm">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
