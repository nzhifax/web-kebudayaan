import { Map, Gamepad2, Award, BookOpen, Compass, Users } from "lucide-react";

const features = [
  { icon: Map, title: "Peta Interaktif", desc: "Jelajahi 38 provinsi lewat peta hidup penuh cerita.", color: "bg-ocean text-ocean-foreground" },
  { icon: Gamepad2, title: "Kuis Seru", desc: "Uji pengetahuanmu, dapatkan XP dan naik level.", color: "bg-terracotta text-terracotta-foreground" },
  { icon: Award, title: "Kumpulkan Lencana", desc: "Explorer Aceh, Bali, hingga Master Nusantara.", color: "bg-gold text-gold-foreground" },
  { icon: BookOpen, title: "Story Map", desc: "Rasakan kunjungan ke museum virtual tiap daerah.", color: "bg-forest text-forest-foreground" },
  { icon: Compass, title: "Misi Harian", desc: "Tantangan baru tiap hari untuk streak belajarmu.", color: "bg-terracotta text-terracotta-foreground" },
  { icon: Users, title: "Untuk Sekolah", desc: "Dashboard guru untuk memantau progres siswa.", color: "bg-ocean text-ocean-foreground" },
];

export function Features() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-forest text-forest-foreground rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            Cara belajar baru
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Bukan ensiklopedia. Ini petualangan.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card-soft rounded-3xl p-7 hover:-translate-y-1 transition group">
              <div className={`${f.color} size-14 rounded-2xl grid place-items-center shadow-[var(--shadow-soft)] mb-5 group-hover:scale-110 transition`}>
                <f.icon className="size-7" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
