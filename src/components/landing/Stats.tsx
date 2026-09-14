import { useEffect, useRef, useState } from "react";

const items = [
  { value: 38, suffix: "", label: "Provinsi", icon: "🗺️", color: "bg-ocean text-ocean-foreground" },
  { value: 500, suffix: "+", label: "Warisan Budaya", icon: "🏛️", color: "bg-terracotta text-terracotta-foreground" },
  { value: 180, suffix: "+", label: "Kuis & Misi", icon: "📸", color: "bg-forest text-forest-foreground" },
  { value: 6, suffix: "", label: "Kategori Kuis", icon: "🎭", color: "bg-gold text-gold-foreground" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-gold text-gold-foreground rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            Sekilas Nusantara
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Kekayaan yang bisa kamu jelajahi
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.label} className="card-soft rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:-translate-y-1 transition">
              <div className={`${it.color} size-14 rounded-2xl grid place-items-center text-2xl shadow-[var(--shadow-soft)] mb-4`}>
                {it.icon}
              </div>
              <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-foreground leading-none">
                <Counter target={it.value} suffix={it.suffix} />
              </div>
              <div className="mt-2 text-muted-foreground font-semibold">{it.label}</div>
              <div className={`absolute -right-8 -bottom-8 size-32 rounded-full ${it.color} opacity-10 group-hover:scale-125 transition`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
