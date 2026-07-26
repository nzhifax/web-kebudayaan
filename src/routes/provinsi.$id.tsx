import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Compass, Home, Music, UtensilsCrossed, Drum, MapPin, Sparkles } from "lucide-react";
import { provinces, islandColors } from "@/lib/provinces-data";

export const Route = createFileRoute("/provinsi/$id")({
  loader: ({ params }) => {
    const p = provinces.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { province: p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Provinsi tidak ditemukan" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.province;
    return {
      meta: [
        { title: `${p.name} — Budaya, Rumah Adat & Tradisi` },
        { name: "description", content: `Jelajahi budaya ${p.name}: ${p.rumahAdat}, ${p.tarian}, ${p.makanan}, dan ${p.alatMusik}.` },
        { property: "og:title", content: `${p.name} — Jelajah Budaya Nusantara` },
        { property: "og:description", content: `Rumah adat ${p.rumahAdat}, tarian ${p.tarian}, kuliner ${p.makanan}.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProvinsiPage,
});

function ProvinsiPage() {
  const { province: p } = Route.useLoaderData();
  const color = islandColors[p.island];

  const cards = [
    { icon: Home, label: "Rumah Adat", val: p.rumahAdat, tone: "bg-terracotta text-terracotta-foreground", story: "Arsitektur tradisional yang mencerminkan cara hidup masyarakat setempat." },
    { icon: Music, label: "Tarian", val: p.tarian, tone: "bg-ocean text-ocean-foreground", story: "Tarian yang menyimpan cerita, doa, dan kegembiraan komunitas." },
    { icon: UtensilsCrossed, label: "Kuliner", val: p.makanan, tone: "bg-forest text-forest-foreground", story: "Cita rasa khas yang lahir dari kekayaan bumi dan warisan turun-temurun." },
    { icon: Drum, label: "Alat Musik", val: p.alatMusik, tone: "bg-gold text-gold-foreground", story: "Suara khas yang mengiringi ritual, perayaan, dan hiburan sehari-hari." },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color} 0%, oklch(0.35 0.05 260) 100%)` }}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-5 pb-16">
          <div className="flex items-center justify-between gap-3 text-white">
            <Link to="/peta" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-90">
              <ArrowLeft className="size-4" /> Kembali ke Peta
            </Link>
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="size-9 rounded-xl bg-white/20 backdrop-blur grid place-items-center">
                <Compass className="size-5" strokeWidth={2.5} />
              </div>
              <span className="font-bold hidden sm:inline">Jelajah Budaya</span>
            </Link>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="size-24 md:size-28 rounded-3xl bg-white/95 grid place-items-center text-6xl shadow-[0_10px_0_rgba(0,0,0,0.15)] animate-bob">
              {p.emoji}
            </div>
            <div className="text-white">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <MapPin className="size-3.5" /> {p.island}
              </div>
              <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-tight">{p.name}</h1>
              <p className="mt-2 text-white/90 text-lg">Ibu Kota: <span className="font-bold">{p.capital}</span></p>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 80" className="block w-full text-background" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z" />
        </svg>
      </header>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[var(--shadow-card)] border border-white">
          <h2 className="text-2xl font-bold text-foreground">Cerita Singkat</h2>
          <p className="mt-2 text-foreground/80 leading-relaxed text-lg">{p.cerita}</p>
        </div>

        <h2 className="mt-10 text-3xl font-bold text-foreground">Warisan Budaya</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {cards.map(({ icon: Icon, label, val, tone, story }) => (
            <article key={label} className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)] border border-white hover:-translate-y-1 transition">
              <div className={`size-14 rounded-2xl grid place-items-center ${tone} shadow-[var(--shadow-soft)]`}>
                <Icon className="size-6" />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</div>
              <div className="text-xl font-bold text-foreground">{val}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{story}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl p-6 md:p-8 text-white shadow-[var(--shadow-pop)]" style={{ background: `linear-gradient(135deg, ${color}, oklch(0.55 0.18 30))` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="size-3.5" /> Tantangan
              </div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">Uji pengetahuanmu tentang {p.name}!</h3>
              <p className="text-white/90">Kumpulkan lencana dan jadilah Duta Budaya.</p>
            </div>
            <Link
              to="/kuis"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-foreground px-5 py-3 font-bold shadow-[0_5px_0_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition"
            >
              Main Kuis <Sparkles className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
