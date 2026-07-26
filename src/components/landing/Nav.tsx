import { Link } from "@tanstack/react-router";
import { Compass, Search, Trophy } from "lucide-react";

export function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-11 rounded-2xl bg-terracotta grid place-items-center shadow-[var(--shadow-pop)]">
            <Compass className="size-6 text-terracotta-foreground" strokeWidth={2.5} />
          </div>
          <div className="font-[family-name:var(--font-display)] leading-tight">
            <div className="text-lg font-bold text-foreground">Jelajah Budaya</div>
            <div className="text-xs text-muted-foreground -mt-1">Nusantara</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/70 backdrop-blur border border-white/60 px-2 py-2 shadow-[var(--shadow-soft)]">
          <Link to="/peta" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-gold/40 hover:text-foreground transition">Peta</Link>
          <a href="#provinsi" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-gold/40 hover:text-foreground transition">Provinsi</a>
          <a href="#budaya" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-gold/40 hover:text-foreground transition">Budaya</a>
          <Link to="/kuis" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-gold/40 hover:text-foreground transition">Kuis</Link>
          <a href="#tentang" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-gold/40 hover:text-foreground transition">Tentang</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Cari"
            className="size-11 rounded-2xl bg-white/80 border border-white/60 grid place-items-center shadow-[var(--shadow-soft)] hover:bg-white transition"
          >
            <Search className="size-5 text-foreground" />
          </button>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-gold px-4 py-2.5 text-gold-foreground font-semibold shadow-[0_5px_0_oklch(0.72_0.16_82)] hover:-translate-y-0.5 transition">
            <Trophy className="size-4" />
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
