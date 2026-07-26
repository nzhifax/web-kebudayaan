import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { ArrowLeft, Compass, Filter, Home, Music, UtensilsCrossed, Drum, Sparkles } from "lucide-react";
import { islands, islandColors, provinces, type Province } from "@/lib/provinces-data";

const LeafletMap = lazy(() => import("@/components/map/LeafletMap"));

export const Route = createFileRoute("/peta")({
  head: () => ({
    meta: [
      { title: "Peta Interaktif Nusantara — Jelajah Budaya" },
      { name: "description", content: "Jelajahi 38 provinsi Indonesia lewat peta interaktif. Temukan rumah adat, tarian, kuliner, dan alat musik dari Sabang sampai Merauke." },
      { property: "og:title", content: "Peta Interaktif Nusantara" },
      { property: "og:description", content: "Jelajahi 38 provinsi Indonesia lewat peta interaktif." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PetaPage,
});

function PetaPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [active, setActive] = useState<Province>(provinces.find((p) => p.id === "bali")!);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-terracotta">
            <ArrowLeft className="size-4" /> Kembali
          </Link>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-terracotta grid place-items-center">
              <Compass className="size-5 text-terracotta-foreground" strokeWidth={2.5} />
            </div>
            <div className="font-bold text-foreground">Peta Nusantara</div>
          </div>
          <Link to="/kuis" className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-gold px-3 py-2 text-gold-foreground font-semibold text-sm shadow-[0_4px_0_oklch(0.72_0.16_82)]">
            <Sparkles className="size-4" /> Main Kuis
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground mr-2">
            <Filter className="size-4" /> Pulau:
          </span>
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-bold border-2 transition ${filter === null ? "bg-foreground text-background border-foreground" : "bg-white text-foreground border-border hover:bg-cream"}`}
          >
            Semua
          </button>
          {islands.map((i) => (
            <button
              key={i}
              onClick={() => setFilter(i)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-bold border-2 transition ${filter === i ? "text-white border-transparent" : "bg-white text-foreground border-border hover:bg-cream"}`}
              style={filter === i ? { backgroundColor: islandColors[i] } : undefined}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] lg:aspect-[16/11] rounded-3xl overflow-hidden shadow-[var(--shadow-card)] border-4 border-white">
              <ClientOnly fallback={<div className="size-full grid place-items-center bg-sky/40 text-muted-foreground">Memuat peta…</div>}>
                <Suspense fallback={<div className="size-full grid place-items-center bg-sky/40 text-muted-foreground">Memuat peta…</div>}>
                  <LeafletMap filter={filter} onSelect={setActive} activeId={active.id} />
                </Suspense>
              </ClientOnly>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Klik ikon untuk membuka info budaya. Geser & zoom untuk menjelajah.
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-card)] border border-white sticky top-24">
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-2xl grid place-items-center text-2xl text-white shadow-[var(--shadow-soft)]" style={{ backgroundColor: islandColors[active.island] }}>
                  {active.emoji}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">{active.island}</div>
                  <div className="text-xl font-bold text-foreground leading-tight">{active.name}</div>
                  <div className="text-xs text-muted-foreground">Ibu Kota: {active.capital}</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{active.cerita}</p>

              <ul className="mt-4 space-y-2">
                {[
                  { icon: Home, label: "Rumah Adat", val: active.rumahAdat, color: "bg-terracotta text-terracotta-foreground" },
                  { icon: Music, label: "Tarian", val: active.tarian, color: "bg-ocean text-ocean-foreground" },
                  { icon: UtensilsCrossed, label: "Kuliner", val: active.makanan, color: "bg-forest text-forest-foreground" },
                  { icon: Drum, label: "Alat Musik", val: active.alatMusik, color: "bg-gold text-gold-foreground" },
                ].map(({ icon: Icon, label, val, color }) => (
                  <li key={label} className="flex items-start gap-3 rounded-2xl bg-cream px-3 py-2.5 border border-border/60">
                    <span className={`size-9 shrink-0 rounded-xl grid place-items-center ${color}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</div>
                      <div className="font-semibold text-foreground text-sm">{val}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/provinsi/$id"
                params={{ id: active.id }}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta text-terracotta-foreground py-3 font-bold shadow-[0_5px_0_oklch(0.45_0.16_35)] hover:-translate-y-0.5 transition"
              >
                Buka Halaman Provinsi
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
