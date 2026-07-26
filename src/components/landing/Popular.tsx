import kecak from "@/assets/culture-kecak.jpg";
import gadang from "@/assets/culture-gadang.jpg";
import angklung from "@/assets/culture-angklung.jpg";
import reog from "@/assets/culture-reog.jpg";
import wayang from "@/assets/culture-wayang.jpg";
import batik from "@/assets/culture-batik.jpg";
import { Heart } from "lucide-react";

const items = [
  { title: "Tari Kecak", region: "Bali", tag: "Tari", img: kecak, color: "bg-terracotta" },
  { title: "Rumah Gadang", region: "Sumatera Barat", tag: "Rumah Adat", img: gadang, color: "bg-gold" },
  { title: "Angklung", region: "Jawa Barat", tag: "Musik", img: angklung, color: "bg-forest" },
  { title: "Reog", region: "Ponorogo", tag: "Tradisi", img: reog, color: "bg-terracotta" },
  { title: "Wayang", region: "Jawa Tengah", tag: "Cerita", img: wayang, color: "bg-ocean" },
  { title: "Batik", region: "Nusantara", tag: "Pakaian", img: batik, color: "bg-gold" },
];

export function Popular() {
  return (
    <section id="budaya" className="relative py-20 md:py-28 bg-gradient-to-b from-transparent to-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="inline-block bg-terracotta text-terracotta-foreground rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              Populer minggu ini
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Budaya yang lagi dijelajahi</h2>
          </div>
          <a href="#" className="font-semibold text-ocean hover:underline underline-offset-4">
            Lihat semua →
          </a>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {items.map((it) => (
            <article key={it.title} className="snap-start shrink-0 w-[280px] md:w-[320px] card-soft rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={it.img} alt={it.title} className="size-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" width={800} height={800} />
                <span className={`absolute top-3 left-3 ${it.color} text-white rounded-full px-3 py-1 text-xs font-bold shadow-[var(--shadow-soft)]`}>
                  {it.tag}
                </span>
                <button className="absolute top-3 right-3 size-10 rounded-full bg-white/90 grid place-items-center shadow-[var(--shadow-soft)] hover:bg-white">
                  <Heart className="size-5 text-terracotta" />
                </button>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{it.region}</div>
                <h3 className="text-xl font-bold text-foreground mt-1">{it.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gold">⭐</span>
                    <span className="font-bold text-foreground">4.9</span>
                    <span className="text-muted-foreground">· 1.2k</span>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-foreground">+15 XP</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
