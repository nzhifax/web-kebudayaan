import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

type Province = {
  id: string;
  name: string;
  x: number; // %
  y: number; // %
  color: string;
  emoji: string;
  items: string[];
};

const provinces: Province[] = [
  { id: "aceh", name: "Aceh", x: 8, y: 30, color: "bg-forest", emoji: "🕌", items: ["Rumah Krong Bade", "Tari Saman", "Rencong", "Mie Aceh"] },
  { id: "sumbar", name: "Sumatera Barat", x: 18, y: 46, color: "bg-terracotta", emoji: "🏠", items: ["Rumah Gadang", "Tari Piring", "Rendang", "Talempong"] },
  { id: "jabar", name: "Jawa Barat", x: 38, y: 66, color: "bg-ocean", emoji: "🎋", items: ["Rumah Kasepuhan", "Tari Jaipong", "Angklung", "Batagor"] },
  { id: "jateng", name: "Jawa Tengah", x: 48, y: 70, color: "bg-gold", emoji: "🏯", items: ["Rumah Joglo", "Tari Gambyong", "Gamelan", "Lumpia"] },
  { id: "bali", name: "Bali", x: 60, y: 76, color: "bg-terracotta", emoji: "🔥", items: ["Rumah Gapura Candi Bentar", "Tari Kecak", "Gamelan Bali", "Ayam Betutu"] },
  { id: "sulsel", name: "Sulawesi Selatan", x: 66, y: 56, color: "bg-forest", emoji: "⛵", items: ["Tongkonan", "Tari Pakarena", "Kapal Pinisi", "Coto Makassar"] },
  { id: "papua", name: "Papua", x: 88, y: 60, color: "bg-ocean", emoji: "🪶", items: ["Rumah Honai", "Tari Yospan", "Noken", "Papeda"] },
];

export function MapPreview() {
  const [active, setActive] = useState<Province>(provinces[4]);

  return (
    <section id="peta" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-ocean text-ocean-foreground rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            Peta Interaktif
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Klik pulau. Temukan kejutan.
          </h2>
          <p className="text-lg text-muted-foreground">
            Setiap provinsi menyimpan cerita, tarian, rumah adat, dan makanan yang siap kamu jelajahi.
          </p>
        </div>

        <div className="card-soft rounded-[2.5rem] p-4 md:p-8 bg-gradient-to-br from-sky/60 via-white to-cream relative overflow-hidden">
          <div className="absolute -top-16 -right-16 size-64 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-ocean/20 blur-3xl" />

          <div className="grid lg:grid-cols-12 gap-6 relative">
            {/* Map */}
            <div className="lg:col-span-8 relative aspect-[16/9] rounded-3xl bg-sky/40 border-2 border-dashed border-ocean/30 overflow-hidden">
              {/* stylized ocean */}
              <svg viewBox="0 0 800 450" className="absolute inset-0 size-full">
                <defs>
                  <linearGradient id="oceanG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#bfe0ff" />
                    <stop offset="1" stopColor="#7fc2ff" />
                  </linearGradient>
                </defs>
                <rect width="800" height="450" fill="url(#oceanG)" />
                {/* Rough archipelago silhouettes */}
                <g fill="#7ec97a" opacity="0.9">
                  <ellipse cx="90" cy="150" rx="70" ry="22" />
                  <ellipse cx="200" cy="220" rx="90" ry="26" />
                  <ellipse cx="360" cy="290" rx="130" ry="28" />
                  <ellipse cx="530" cy="270" rx="70" ry="24" />
                  <ellipse cx="600" cy="330" rx="40" ry="16" />
                  <path d="M580,220 q40,-40 110,-20 q60,20 40,60 q-20,40 -90,30 q-70,-10 -60,-70z" />
                  <ellipse cx="720" cy="280" rx="60" ry="30" />
                </g>
              </svg>

              {/* Province pins */}
              {provinces.map((p) => (
                <button
                  key={p.id}
                  onMouseEnter={() => setActive(p)}
                  onFocus={() => setActive(p)}
                  onClick={() => setActive(p)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={p.name}
                >
                  <span className={`relative flex size-11 items-center justify-center rounded-2xl ${p.color} text-white text-xl shadow-[0_6px_0_rgba(0,0,0,0.15)] transition-transform ${active.id === p.id ? "scale-125" : "group-hover:scale-110"}`}>
                    {p.emoji}
                    <span className={`absolute inset-0 rounded-2xl ${p.color} opacity-40 animate-ping`} style={{ animationDuration: "2.5s" }} />
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-foreground shadow-[var(--shadow-soft)]">
                    {p.name}
                  </span>
                </button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-3 right-3 bg-white/90 rounded-2xl px-3 py-2 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)] flex items-center gap-2">
                <MapPin className="size-4 text-terracotta" />
                Klik ikon untuk melihat budaya
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] border border-white h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <div className={`size-14 rounded-2xl ${active.color} grid place-items-center text-2xl text-white shadow-[var(--shadow-soft)]`}>
                    {active.emoji}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Provinsi</div>
                    <div className="text-2xl font-bold text-foreground leading-tight">{active.name}</div>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 flex-1">
                  {active.items.map((it, i) => (
                    <li key={it} className="flex items-center gap-3 rounded-2xl bg-cream px-3 py-2.5 border border-border/60">
                      <span className={`size-8 rounded-xl grid place-items-center text-sm font-bold ${["bg-terracotta text-terracotta-foreground","bg-ocean text-ocean-foreground","bg-forest text-forest-foreground","bg-gold text-gold-foreground"][i % 4]}`}>
                        {["🏠","🎭","🎵","🍲"][i]}
                      </span>
                      <span className="font-semibold text-foreground">{it}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta text-terracotta-foreground py-3.5 font-bold shadow-[0_6px_0_oklch(0.45_0.16_35)] hover:-translate-y-0.5 transition">
                  Klik untuk menjelajah
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
