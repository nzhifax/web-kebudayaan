import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Sparkles, Compass } from "lucide-react";

type ProvincePreview = {
  id: string;
  name: string;
  x: number; // %
  y: number; // %
  color: string;
  emoji: string;
  items: { label: string; icon: string }[];
};

const provinces: ProvincePreview[] = [
  { id: "aceh", name: "Aceh", x: 8, y: 30, color: "bg-emerald-500", emoji: "🗡️", items: [{ label: "Rumah Krong Bade", icon: "🏠" }, { label: "Tari Saman", icon: "🎭" }, { label: "Rencong Aceh", icon: "🗡️" }, { label: "Mie Aceh", icon: "🍜" }] },
  { id: "sumbar", name: "Sumatera Barat", x: 18, y: 46, color: "bg-amber-500", emoji: "🏠", items: [{ label: "Rumah Gadang", icon: "🏠" }, { label: "Tari Piring", icon: "🎭" }, { label: "Karih", icon: "🗡️" }, { label: "Rendang Padang", icon: "🍲" }] },
  { id: "jabar", name: "Jawa Barat", x: 38, y: 66, color: "bg-blue-500", emoji: "🎋", items: [{ label: "Rumah Kasepuhan", icon: "🏠" }, { label: "Tari Jaipong", icon: "🎭" }, { label: "Angklung", icon: "🎵" }, { label: "Batagor & Siomay", icon: "🍲" }] },
  { id: "jateng", name: "Jawa Tengah", x: 48, y: 70, color: "bg-purple-500", emoji: "🏯", items: [{ label: "Rumah Joglo", icon: "🏠" }, { label: "Tari Gambyong", icon: "🎭" }, { label: "Gamelan Jawa", icon: "🎵" }, { label: "Lumpia Semarang", icon: "🍲" }] },
  { id: "bali", name: "Bali", x: 60, y: 76, color: "bg-rose-500", emoji: "🔥", items: [{ label: "Candi Bentar", icon: "🏠" }, { label: "Tari Kecak", icon: "🎭" }, { label: "Gamelan Bali", icon: "🎵" }, { label: "Ayam Betutu", icon: "🍲" }] },
  { id: "sulsel", name: "Sulawesi Selatan", x: 66, y: 56, color: "bg-teal-500", emoji: "⛵", items: [{ label: "Tongkonan", icon: "🏠" }, { label: "Tari Pakarena", icon: "🎭" }, { label: "Kapal Pinisi", icon: "⛵" }, { label: "Coto Makassar", icon: "🍲" }] },
  { id: "papua", name: "Papua", x: 88, y: 60, color: "bg-indigo-500", emoji: "🪶", items: [{ label: "Rumah Honai", icon: "🏠" }, { label: "Tari Yospan", icon: "🎭" }, { label: "Noken Papua", icon: "🎒" }, { label: "Papeda & Ikan", icon: "🍲" }] },
];

export function MapPreview() {
  const [active, setActive] = useState<ProvincePreview>(provinces[4]);

  return (
    <section id="peta-preview" className="relative py-24 md:py-32 bg-sky-50/60 font-[family-name:var(--font-body)] overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-black mb-3">
            <Compass className="size-4 text-sky-600 animate-spin-slow" />
            <span>Peta Interaktif Petualangan</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Klik Pulau. Temukan Kejutan!
          </h2>
          <p className="mt-3 text-base text-slate-600 font-bold">
            Setiap provinsi menyimpan tarian, rumah adat, musik, dan kuliner unik yang siap kamu buka di peta.
          </p>
        </div>

        {/* Map Preview Card Container */}
        <div className="rounded-[2.5rem] bg-white p-6 md:p-8 shadow-2xl border-3 border-white/90 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 relative z-10 items-center">
            {/* Interactive Map Visual */}
            <div className="lg:col-span-8 relative aspect-[16/9] rounded-3xl bg-sky-200/60 border-2 border-sky-300 overflow-hidden shadow-inner">
              {/* Ocean & Archipelago SVG Graphic */}
              <svg viewBox="0 0 800 450" className="absolute inset-0 size-full">
                <defs>
                  <linearGradient id="oceanG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#bae6fd" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <rect width="800" height="450" fill="url(#oceanG)" />

                {/* Cartoon Island Shapes */}
                <g fill="#86efac" stroke="#16a34a" strokeWidth="3" opacity="0.95">
                  <ellipse cx="100" cy="150" rx="75" ry="24" />
                  <ellipse cx="210" cy="220" rx="95" ry="28" />
                  <ellipse cx="370" cy="295" rx="135" ry="30" />
                  <ellipse cx="540" cy="275" rx="75" ry="26" />
                  <ellipse cx="610" cy="335" rx="45" ry="18" />
                  <path d="M590,220 q40,-40 110,-20 q60,20 40,60 q-20,40 -90,30 q-70,-10 -60,-70z" />
                  <ellipse cx="730" cy="285" rx="65" ry="32" />
                </g>
              </svg>

              {/* Province Pins */}
              {provinces.map((p) => (
                <button
                  key={p.id}
                  onMouseEnter={() => setActive(p)}
                  onClick={() => setActive(p)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={`relative flex size-12 items-center justify-center rounded-2xl ${p.color} text-white text-2xl shadow-lg border-2 border-white transition-all ${
                      active.id === p.id ? "scale-125 ring-4 ring-amber-300 z-20" : "hover:scale-110"
                    }`}
                  >
                    {p.emoji}
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded-full bg-slate-900/90 text-white px-3 py-0.5 text-[11px] font-black shadow-md border border-white/20">
                    {p.name}
                  </span>
                </button>
              ))}

              {/* Legend Tag */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 text-xs font-black text-slate-800 shadow-lg border border-white flex items-center gap-2">
                <MapPin className="size-4 text-terracotta" />
                <span>Arahkan kursor / Tap pada ikon provinsi!</span>
              </div>
            </div>

            {/* Active Province Detail Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl border border-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                    <div className={`size-14 rounded-2xl ${active.color} grid place-items-center text-3xl shadow-md border border-white/20`}>
                      {active.emoji}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-amber-400">Provinsi Selected</div>
                      <h3 className="text-2xl font-black text-white leading-tight">{active.name}</h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {active.items.map((it) => (
                      <div key={it.label} className="flex items-center gap-3 rounded-2xl bg-slate-800/80 p-3 border border-slate-700/60">
                        <span className="size-9 rounded-xl bg-slate-700 grid place-items-center text-base shrink-0">
                          {it.icon}
                        </span>
                        <span className="text-xs font-black text-slate-200">{it.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/peta"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 py-4 text-xs font-black shadow-lg transition-all"
                >
                  <span>Eksplor Peta Penuh</span>
                  <ArrowRight className="size-4 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
