import { Link } from "@tanstack/react-router";
import mascotExplorer from "@/assets/mascot-explorer.png";
import { ArrowRight, Compass } from "lucide-react";

export function CtaFooter() {
  return (
    <>
      <section className="relative py-24 md:py-32 font-[family-name:var(--font-body)] bg-sky-50/50 select-none">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-terracotta via-amber-500 to-amber-600 text-white p-10 md:p-16 shadow-2xl border-4 border-white">
            <div className="absolute -right-6 -bottom-6 w-64 md:w-80 opacity-95">
              <img src={mascotExplorer} alt="Pongo Maskot" className="w-full h-auto object-contain animate-float drop-shadow-2xl" />
            </div>

            <div className="relative z-10 max-w-xl">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black border border-white/30 mb-4 inline-block">
                🧭 Petualangan Menunggumu!
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Siap Berangkat, Penjelajah?
              </h2>
              <p className="mt-4 text-base md:text-lg font-bold text-amber-100 leading-relaxed">
                Mulai perjalananmu keliling 38 provinsi Indonesia sekarang. Kumpulkan stempel, lencana, dan jadi Master Nusantara!
              </p>
              <Link
                to="/peta"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-4 text-base md:text-lg shadow-2xl transition-all hover:scale-105 border-2 border-white/40"
              >
                <Compass className="size-6 text-amber-400 animate-spin-slow" />
                <span>Mulai Menjelajah Sekarang</span>
                <ArrowRight className="size-5 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white/80 pt-16 pb-10 font-[family-name:var(--font-body)] border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-10 rounded-full bg-amber-500 grid place-items-center text-slate-900 font-bold">🧭</div>
                <div className="font-[family-name:var(--font-display)] font-black text-white text-lg">Jelajah Nusantara</div>
              </div>
              <p className="text-xs font-bold text-slate-400 leading-relaxed">
                Platform WebGIS edukasi budaya Indonesia yang interaktif untuk pelajar SD, SMP, dan SMA.
              </p>
            </div>
            {[
              { title: "Jelajahi", items: ["Peta Interaktif", "38 Provinsi", "Story Map", "Galeri Budaya"], to: "/peta" },
              { title: "Belajar", items: ["Kuis Interaktif", "Koleksi Lencana", "Misi Harian", "Untuk Sekolah"], to: "/kuis" },
              { title: "Tentang", items: ["Tentang Kami", "Sumber Data", "Kontak", "Kebijakan Privasi"], to: "/tentang" },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-black text-white text-sm mb-4 uppercase tracking-wider">{col.title}</div>
                <ul className="space-y-2.5 text-xs font-bold text-slate-400">
                  {col.items.map((it) => (
                    <li key={it}><Link to={col.to} className="hover:text-amber-400 transition-colors">{it}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800/80 pt-6 flex flex-wrap justify-between items-center gap-3 text-xs font-bold text-slate-500">
            <div>© 2026 Jelajah Nusantara. Dibuat dengan ❤ untuk pelajar Indonesia.</div>
            <div className="flex items-center gap-4">
              <span>Syarat & Ketentuan</span>
              <span>Privasi</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
