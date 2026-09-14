import { Link } from "@tanstack/react-router";
import { Award, BookOpen, Flag, CheckCircle2, ArrowRight } from "lucide-react";
import { useAdventureStore, BADGES } from "@/hooks/useAdventureStore";
import { provinces } from "@/lib/provinces-data";
import passportIcon from "@/assets/passport-icon.png";

export function Badges() {
  const {
    unlockedBadges,
    clearedFogs,
    exploredCategories,
    visitedProvincesCount,
    earnedBadgesCount,
  } = useAdventureStore();

  // Visited provinces list for stamps preview
  const visitedProvinces = provinces.filter((p) => clearedFogs[p.id]);

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-amber-50/40 to-sky-50/50 font-[family-name:var(--font-body)] overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section 4 & 5: Paspor Nusantara & Misi Harian Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Paspor Nusantara & Stempel */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-700 p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <img src={passportIcon} alt="" className="absolute -top-4 -right-4 h-48 w-auto opacity-15 pointer-events-none drop-shadow-xl" />
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black mb-4 border border-white/30">
                <img src={passportIcon} alt="Paspor" className="h-4.5 w-auto object-contain" />
                <span>Fitur Spesial Paspor</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-black text-amber-300 leading-tight">
                Kumpulkan Stempel Paspor Nusantara
              </h3>
              <p className="mt-3 text-sm md:text-base font-bold text-emerald-100 leading-relaxed max-w-md">
                Setiap provinsi yang kamu selesaikan akan memberikan stempel budaya eksklusif. Kamu telah mengumpulkan{" "}
                <span className="text-amber-300 font-black">{visitedProvincesCount} dari 38 Stempel</span>!
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {visitedProvinces.length > 0 ? (
                  visitedProvinces.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="px-3.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center gap-2 text-xs font-black"
                    >
                      <span>{p.emoji} Stempel {p.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black text-emerald-200">
                    📍 Belum ada stempel terkumpul. Mulai jelajahi peta!
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/peta"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black px-6 py-3.5 text-xs shadow-xl border-2 border-amber-300 transition-all hover:scale-105"
              >
                <span>Buka Paspor Digital ({visitedProvincesCount}/38)</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Misi Harian & Streaks */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-terracotta p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🚩</div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black mb-4 border border-white/30">
                <Flag className="size-4" />
                <span>Misi Harian & Streaks</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-black text-white leading-tight">
                Selesaikan Misi & Dapatkan XP
              </h3>
              <p className="mt-3 text-sm md:text-base font-bold text-amber-100 leading-relaxed max-w-md">
                Jawab kuis harian, jelajahi provinsi baru, dan dapatkan poin XP untuk menaikkan level petualanganmu!
              </p>

              <div className="mt-6 space-y-2.5 max-w-md">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-black">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-300" />
                    <span>Jelajahi 1 Provinsi Baru</span>
                  </div>
                  <span className="text-amber-200">+20 XP</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-black">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-300" />
                    <span>Jawab 10 Soal Kuis Budaya</span>
                  </div>
                  <span className="text-amber-200">+100 XP</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/peta"
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-black px-6 py-3.5 text-xs shadow-xl border-2 border-white transition-all hover:scale-105"
              >
                <span>Mulai Misi Hari Ini</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 6: Earn Cultural Badges Header & Grid */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black mb-3">
            <Award className="size-4 text-amber-600" />
            <span>Koleksi Stempel Budaya ({earnedBadgesCount} / {BADGES.length} Terbuka)</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Raih Stempel Kehormatan Nusantara
          </h2>
          <p className="mt-3 text-base text-slate-600 font-bold">
            Tunjukkan prestasimu dengan membuka stempel keren di tiap pencapaian eksplorasi budaya!
          </p>
        </div>

        {/* Badges Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {BADGES.map((b) => {
            const isUnlocked = !!unlockedBadges[b.id];
            let count = 0;
            for (const provCats of Object.values(exploredCategories)) {
              if (provCats[b.categoryId]) count++;
            }
            const progressText = isUnlocked
              ? "TERBUKA ✅"
              : `${Math.min(count, b.requiredCount)} / ${b.requiredCount}`;

            return (
              <div
                key={b.id}
                className={`rounded-3xl p-5 text-center transition-all duration-300 ${
                  isUnlocked
                    ? "bg-white shadow-xl border-3 border-emerald-400 hover:-translate-y-2"
                    : "bg-slate-100/80 border-2 border-slate-200 opacity-60"
                }`}
              >
                <div
                  className={`mx-auto size-16 rounded-2xl grid place-items-center text-3xl shadow-md mb-3 ${
                    isUnlocked
                      ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-emerald-200"
                      : "bg-slate-300 text-slate-500"
                  }`}
                >
                  {b.icon}
                </div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black mb-1.5 ${
                    isUnlocked
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {progressText}
                </span>
                <h4 className="text-sm font-black text-slate-900 leading-tight">{b.title}</h4>
                <p className="text-[10px] font-bold text-slate-500 mt-1 leading-snug">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
