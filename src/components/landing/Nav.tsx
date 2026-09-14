import { Link, useLocation } from "@tanstack/react-router";
import { Home, Map, Gamepad2, Info, BookOpen } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

export function Nav() {
  const location = useLocation();
  const pathname = location.pathname;

  const isHomeActive = pathname === "/";
  const isPetaActive = pathname === "/peta";
  const isKuisActive = pathname === "/kuis";

  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform duration-300 group-hover:rotate-12 shrink-0">
              <img src={logoIcon} alt="Logo" className="size-11 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.15)]" />
            </div>
            <div className="font-[family-name:var(--font-display)] leading-none">
              <div className="text-xl font-black text-slate-800 tracking-tight">Jelajah</div>
              <div className="text-sm font-extrabold text-slate-500">Nusantara</div>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur border border-white/60 px-2 py-1.5 shadow-[var(--shadow-soft)]">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition ${
              isHomeActive
                ? "bg-emerald-500/10 text-emerald-800"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Home className="size-4" />
            Beranda
          </Link>
          <Link
            to="/peta"
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition ${
              isPetaActive
                ? "bg-emerald-500/10 text-emerald-800"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Map className="size-4" />
            Peta
          </Link>
          <Link
            to="/kuis"
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition ${
              isKuisActive
                ? "bg-emerald-500/10 text-emerald-800"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Gamepad2 className="size-4" />
            Kuis
          </Link>
          <Link
            to="/peta"
            search={{ passport: true }}
            className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition"
          >
            <BookOpen className="size-4 text-slate-500" />
            Paspor
          </Link>
        </nav>

        {/* Right: Spacer for centering navbar pill */}
        <div className="hidden md:flex flex-1 justify-end" />
      </div>
    </header>
  );
}
