import heroBg from "@/assets/hero-nusantara.jpg";
import boy from "@/assets/mascot-boy.png";
import girl from "@/assets/mascot-girl.png";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background scene */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Panorama pulau Nusantara"
          className="size-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/95" />
      </div>

      {/* Drifting clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[14%] left-0 w-40 h-16 rounded-full bg-white/80 blur-md animate-drift-slow" />
        <div className="absolute top-[22%] left-0 w-24 h-10 rounded-full bg-white/70 blur-md animate-drift-slower" style={{ animationDelay: "-25s" }} />
        <div className="absolute top-[8%] left-0 w-32 h-12 rounded-full bg-white/70 blur-md animate-drift-slow" style={{ animationDelay: "-40s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 min-h-[100svh] grid lg:grid-cols-12 items-center gap-8">
        {/* Left: text */}
        <div className="lg:col-span-6 relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-[var(--shadow-soft)] mb-6 animate-pop-in">
            <Sparkles className="size-4 text-terracotta" />
            <span className="text-sm font-semibold text-foreground">Petualangan Budaya Digital</span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-foreground">
            <span className="block text-ocean drop-shadow-[0_4px_0_rgba(255,255,255,0.6)]">JELAJAH</span>
            <span className="block text-terracotta drop-shadow-[0_4px_0_rgba(255,255,255,0.6)]">BUDAYA</span>
            <span className="block text-forest drop-shadow-[0_4px_0_rgba(255,255,255,0.6)]">NUSANTARA</span>
          </h1>

          <p className="mt-6 max-w-md text-lg md:text-xl text-foreground/80 font-medium">
            Belajar budaya Indonesia melalui peta interaktif — kumpulkan lencana, selesaikan misi, dan jelajahi 38 provinsi!
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="btn-playful btn-playful-hover">
              Mulai Menjelajah
              <ArrowRight className="size-5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3.5 font-semibold text-foreground border border-white shadow-[var(--shadow-soft)] hover:bg-white transition">
              <span className="size-8 rounded-full bg-forest grid place-items-center">
                <span className="size-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-white translate-x-0.5" />
              </span>
              Lihat Video
            </button>
          </div>

          {/* Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { label: "38 Provinsi", color: "bg-ocean text-ocean-foreground" },
              { label: "850+ Warisan", color: "bg-forest text-forest-foreground" },
              { label: "Gratis untuk Sekolah", color: "bg-gold text-gold-foreground" },
            ].map((c) => (
              <span key={c.label} className={`${c.color} rounded-full px-4 py-1.5 text-sm font-semibold shadow-[var(--shadow-soft)]`}>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: mascots + floating cards */}
        <div className="lg:col-span-6 relative h-[500px] lg:h-[620px]">
          {/* Girl */}
          <div className="absolute right-0 bottom-0 w-[62%] animate-float">
            <img src={girl} alt="Maskot perempuan" className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]" width={768} height={1024} />
          </div>
          {/* Boy */}
          <div className="absolute left-0 bottom-4 w-[56%] animate-float-alt">
            <img src={boy} alt="Maskot laki-laki" className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]" width={768} height={1024} />
          </div>

          {/* Floating info bubbles */}
          <div className="absolute top-6 right-4 card-soft px-4 py-3 rounded-3xl animate-bob">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-gold grid place-items-center text-xl">🏝️</div>
              <div>
                <div className="text-xs text-muted-foreground font-semibold">Sedang populer</div>
                <div className="font-bold text-foreground">Tari Kecak, Bali</div>
              </div>
            </div>
          </div>

          <div className="absolute top-40 left-2 card-soft px-4 py-3 rounded-3xl animate-bob" style={{ animationDelay: "-1.5s" }}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-forest grid place-items-center text-xl">🏆</div>
              <div>
                <div className="text-xs text-muted-foreground font-semibold">Lencana baru</div>
                <div className="font-bold text-foreground">Explorer Aceh</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 card-soft px-5 py-3 rounded-full animate-bob" style={{ animationDelay: "-3s" }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <span className="font-semibold text-foreground">+20 XP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
