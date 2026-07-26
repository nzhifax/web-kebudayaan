import girl from "@/assets/mascot-girl.png";
import { ArrowRight } from "lucide-react";

export function CtaFooter() {
  return (
    <>
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ocean via-ocean to-forest text-white p-10 md:p-16">
            <div className="absolute -right-8 bottom-0 w-64 md:w-80 opacity-95">
              <img src={girl} alt="" className="w-full h-auto animate-float" width={768} height={1024} />
            </div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 left-10 size-32 rounded-full bg-gold blur-2xl" />
              <div className="absolute bottom-6 left-40 size-40 rounded-full bg-terracotta blur-3xl" />
            </div>
            <div className="relative max-w-xl">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold leading-tight">
                Siap berangkat, penjelajah?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Buat akun gratis dan mulai perjalananmu keliling Nusantara hari ini.
              </p>
              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-4 text-lg font-bold shadow-[0_8px_0_oklch(0.72_0.16_82)] hover:-translate-y-0.5 transition">
                Mulai Menjelajah
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white/80 pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-10 rounded-2xl bg-terracotta grid place-items-center">🧭</div>
                <div className="font-[family-name:var(--font-display)] font-bold text-white text-lg">Jelajah Budaya Nusantara</div>
              </div>
              <p className="text-sm">Platform WebGIS edukasi budaya Indonesia untuk pelajar SD, SMP, dan SMA.</p>
            </div>
            {[
              { title: "Jelajahi", items: ["Peta Interaktif", "Provinsi", "Story Map", "Galeri"] },
              { title: "Belajar", items: ["Kuis", "Lencana", "Misi Harian", "Untuk Guru"] },
              { title: "Tentang", items: ["Tentang Kami", "Sumber Data", "Kontak", "Privasi"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-bold text-white mb-3">{col.title}</div>
                <ul className="space-y-2 text-sm">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="hover:text-gold transition">{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-3 text-sm">
            <div>© 2026 Jelajah Budaya Nusantara. Dibuat untuk pelajar Indonesia.</div>
            <div className="flex items-center gap-4">
              <span>Data: BIG · Kemendikbud</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
