import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Home,
  Music,
  Shirt,
  UtensilsCrossed,
  Drum,
  Shield,
  Landmark,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Compass,
  MapPin,
  Users,
  Maximize2,
  Flower,
  Footprints,
} from "lucide-react";
import { ProvinceMeta, CultureDetail, loadProvinceCulture } from "@/lib/culture-loader";

// Import asset glob maps for authentic province photos across categories
const rumahAdatFiles = import.meta.glob("/src/assets/rumah-adat/*", { eager: true, import: "default" }) as Record<string, string>;
const tarianFiles = import.meta.glob("/src/assets/tarian-adat/*", { eager: true, import: "default" }) as Record<string, string>;
const pakaianFiles = import.meta.glob("/src/assets/pakaian-adat/*", { eager: true, import: "default" }) as Record<string, string>;
const makananFiles = import.meta.glob("/src/assets/makanan/*", { eager: true, import: "default" }) as Record<string, string>;
const alatMusikFiles = import.meta.glob("/src/assets/alat-musik/*", { eager: true, import: "default" }) as Record<string, string>;
const senjataFiles = import.meta.glob("/src/assets/senjata/*", { eager: true, import: "default" }) as Record<string, string>;
const cagarFiles = import.meta.glob("/src/assets/cagar-budaya/*", { eager: true, import: "default" }) as Record<string, string>;
const warisanFiles = import.meta.glob("/src/assets/warisan-budaya/*", { eager: true, import: "default" }) as Record<string, string>;
const floraFiles = import.meta.glob("/src/assets/flora/*", { eager: true, import: "default" }) as Record<string, string>;
const faunaFiles = import.meta.glob("/src/assets/fauna/*", { eager: true, import: "default" }) as Record<string, string>;

export type CategoryKey =
  | "rumahAdat"
  | "tarian"
  | "pakaian"
  | "makanan"
  | "musik"
  | "senjata"
  | "cagar"
  | "warisan"
  | "flora"
  | "fauna";

export type CategoryConfig = {
  id: CategoryKey;
  label: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGradient: string;
  badgeBg: string;
};

export const CATEGORIES: CategoryConfig[] = [
  { id: "rumahAdat", label: "Rumah Adat", emoji: "🏠", icon: Home, color: "text-amber-600", bgGradient: "from-amber-400 to-amber-600", badgeBg: "bg-amber-100 text-amber-800" },
  { id: "tarian", label: "Tari Tradisional", emoji: "🎭", icon: Music, color: "text-blue-600", bgGradient: "from-blue-400 to-indigo-600", badgeBg: "bg-blue-100 text-blue-800" },
  { id: "pakaian", label: "Pakaian Adat", emoji: "👘", icon: Shirt, color: "text-purple-600", bgGradient: "from-purple-400 to-pink-600", badgeBg: "bg-purple-100 text-purple-800" },
  { id: "makanan", label: "Kuliner Khas", emoji: "🍜", icon: UtensilsCrossed, color: "text-emerald-600", bgGradient: "from-emerald-400 to-teal-600", badgeBg: "bg-emerald-100 text-emerald-800" },
  { id: "musik", label: "Alat Musik", emoji: "🎵", icon: Drum, color: "text-rose-600", bgGradient: "from-rose-400 to-pink-500", badgeBg: "bg-rose-100 text-rose-800" },
  { id: "senjata", label: "Senjata Tradisional", emoji: "🗡️", icon: Shield, color: "text-orange-600", bgGradient: "from-orange-400 to-amber-600", badgeBg: "bg-orange-100 text-orange-800" },
  { id: "cagar", label: "Warisan & Cagar", emoji: "🏛️", icon: Landmark, color: "text-cyan-600", bgGradient: "from-cyan-400 to-blue-600", badgeBg: "bg-cyan-100 text-cyan-800" },
  { id: "warisan", label: "Tradisi & Cerita", emoji: "📜", icon: BookOpen, color: "text-violet-600", bgGradient: "from-violet-400 to-purple-600", badgeBg: "bg-violet-100 text-violet-800" },
  { id: "flora", label: "Flora Khas", emoji: "🌿", icon: Flower, color: "text-green-600", bgGradient: "from-green-400 to-emerald-600", badgeBg: "bg-green-100 text-green-800" },
  { id: "fauna", label: "Fauna Khas", emoji: "🐾", icon: Footprints, color: "text-amber-700", bgGradient: "from-amber-400 to-orange-600", badgeBg: "bg-amber-100 text-amber-900" },
];

function getCategoryImage(catId: CategoryKey, provName: string): string | null {
  if (!provName) return null;
  const normName = provName.toLowerCase();

  let filesMap: Record<string, string> | null = null;
  switch (catId) {
    case "rumahAdat": filesMap = rumahAdatFiles; break;
    case "tarian": filesMap = tarianFiles; break;
    case "pakaian": filesMap = pakaianFiles; break;
    case "makanan": filesMap = makananFiles; break;
    case "musik": filesMap = alatMusikFiles; break;
    case "senjata": filesMap = senjataFiles; break;
    case "cagar": filesMap = cagarFiles; break;
    case "warisan": filesMap = warisanFiles; break;
    case "flora": filesMap = floraFiles; break;
    case "fauna": filesMap = faunaFiles; break;
  }

  if (filesMap) {
    for (const path in filesMap) {
      if (path.toLowerCase().includes(normName)) {
        return filesMap[path];
      }
    }
  }
  return null;
}

type Props = {
  province: ProvinceMeta | null;
  onClose: () => void;
  exploredCategories: Record<string, boolean>;
  onSelectCategory: (cat: CategoryConfig, title: string, detailText: string) => void;
  progressPercent: number;
  isFirstVisit?: boolean;
  onStartAdventure?: () => void;
};

export function SidePanel({
  province,
  onClose,
  exploredCategories,
  onSelectCategory,
  progressPercent,
  isFirstVisit = false,
  onStartAdventure,
}: Props) {
  const [cultureDetail, setCultureDetail] = useState<CultureDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (!province) return;
    setLoading(true);
    setShowWelcome(isFirstVisit);
    loadProvinceCulture(province.filename).then((data) => {
      setCultureDetail(data);
      setLoading(false);
    });
  }, [province, isFirstVisit]);

  if (!province) return null;

  const heroPhoto =
    getCategoryImage("rumahAdat", province.name) ||
    getCategoryImage("tarian", province.name) ||
    getCategoryImage("makanan", province.name);

  const getCategoryTitleAndDetail = (catId: CategoryKey) => {
    const cp = province.cultureProps;
    const b = cultureDetail?.budaya;

    switch (catId) {
      case "rumahAdat":
        return {
          title: b?.rumah_adat || cp?.rumahAdat || "Rumah Adat Khas",
          detail: `Rumah adat khas masyarakat ${province.name} dengan gaya arsitektur yang melambangkan filosofi kehidupan lokal.`
        };
      case "tarian":
        return {
          title: b?.tarian || cp?.tarian || "Tari Tradisional",
          detail: `Tarian tradisional ${province.name} yang dipentaskan pada upacara adat dan perayaan penuh kegembiraan.`
        };
      case "pakaian":
        return {
          title: b?.baju_adat || cp?.bajuAdat || "Pakaian Adat",
          detail: `Busana adat ${province.name} dengan sulaman mahkota khas dan keindahan kain tenun tradisional.`
        };
      case "makanan":
        return {
          title: b?.makanan_khas || cp?.makanan || "Kuliner Khas",
          detail: `Hidangan kuliner lezat khas ${province.name} kaya akan bumbu rempah Nusantara.`
        };
      case "musik":
        return {
          title: b?.alat_musik || cp?.alatMusik || "Alat Musik",
          detail: `Alat musik tradisional yang dimainkan dengan harmoni nada indah melodi budaya.`
        };
      case "senjata":
        return {
          title: b?.senjata_tradisional || cp?.senjata || "Senjata Pusaka",
          detail: `Senjata peninggalan pusaka leluhur ${province.name} dengan ukiran filosofi keberanian.`
        };
      case "cagar":
        return {
          title: b?.cagar_budaya || cp?.cagar || "Cagar Budaya",
          detail: `Situs warisan dan cagar sejarah bersejarah tinggi yang dilindungi bangsa.`
        };
      case "warisan":
        return {
          title: b?.warisan_budaya || cp?.warisan || "Warisan Budaya",
          detail: `Kumpulan tradisi unik, upacara adat, dan kearifan lokal turun temurun.`
        };
      case "flora":
        const floraTitle = b?.flora || cp?.flora || "Flora Khas";
        const floraLatin = b?.flora_latin || cp?.floraLatin;
        const floraEng = b?.flora_english || cp?.floraEnglish;
        return {
          title: floraTitle,
          detail: `Flora khas provinsi ${province.name}: ${floraTitle}${floraLatin ? ` (Nama Latin: ${floraLatin})` : ""}${floraEng ? `, dikenal juga sebagai ${floraEng}` : ""}.`
        };
      case "fauna":
        const faunaTitle = b?.fauna || cp?.fauna || "Fauna Khas";
        const faunaLatin = b?.fauna_latin || cp?.faunaLatin;
        const faunaEng = b?.fauna_english || cp?.faunaEnglish;
        return {
          title: faunaTitle,
          detail: `Fauna khas provinsi ${province.name}: ${faunaTitle}${faunaLatin ? ` (Nama Latin: ${faunaLatin})` : ""}${faunaEng ? `, dikenal juga sebagai ${faunaEng}` : ""}.`
        };
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[520px] bg-[#FDFBF7]/95 backdrop-blur-md shadow-2xl overflow-y-auto custom-scrollbar font-[family-name:var(--font-body)] rounded-l-[2rem] border-l border-slate-200/50"
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-slate-100/60 p-4 sm:p-5 text-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 grid place-items-center shadow-inner text-2xl shrink-0">
              <span>{province.stampIcon.split(" ")[0]}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 block font-[family-name:var(--font-display)]">
                PETUALANGAN {province.island}
              </span>
              <h2 className="text-xl font-black text-slate-800 leading-tight flex items-center gap-2 font-[family-name:var(--font-display)]">
                {province.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-9 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-600 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden border-b border-amber-900/10 bg-slate-900">
          {heroPhoto ? (
            <img src={heroPhoto} alt={province.name} className="absolute inset-0 size-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#7DD3FC] via-[#BAE6FD] to-[#E0F2FE]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 flex flex-col justify-end text-white">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full w-fit mb-1.5 border border-amber-300/30">
              {province.island}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight font-[family-name:var(--font-display)] drop-shadow-md">
              {province.name}
            </h1>

            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5 text-amber-400" /> {province.capital}
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3.5 text-amber-400" /> {province.population}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="size-3.5 text-amber-400" /> {province.area}
              </span>
            </div>
          </div>
        </div>

        {/* Mascot Dialog Banner (First Visit / Welcome) */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="m-4 p-5 rounded-3xl bg-[#FFFBEB] border border-amber-200/80 shadow-[var(--shadow-soft)] animate-pop-in"
          >
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-2xl bg-amber-400 border-2 border-white flex items-center justify-center text-3xl shrink-0 shadow-md animate-bounce">
                👋
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-200/50 px-2.5 py-1 rounded-lg">
                  Pemandu Petualang
                </span>
                <p className="text-sm font-bold text-slate-800 mt-2.5 leading-relaxed">
                  "Halo Petualang Cilik! Selamat datang di <span className="text-terracotta font-black">{province.name}</span>! Ayo temukan keajaiban budayanya!"
                </p>
                <button
                  onClick={() => {
                    setShowWelcome(false);
                    if (onStartAdventure) onStartAdventure();
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FFB703] hover:bg-[#FB8500] text-slate-900 font-black px-5 py-2.5 text-xs shadow-[0_3px_0_#D97706] hover:translate-y-[1px] hover:shadow-[0_2px_0_#D97706] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
                >
                  <Sparkles className="size-4" /> Mulai Petualangan!
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Fun Fact Callout Card */}
        <div className="px-4 pt-3">
          <div className="rounded-2xl bg-[#FFFBEB] p-4 border border-amber-100 text-slate-700 flex items-start gap-3 shadow-[var(--shadow-soft)]">
            <Sparkles className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold leading-relaxed">
              <span className="font-black text-amber-800 block text-[11px] uppercase tracking-wider mb-0.5 font-[family-name:var(--font-display)]">
                Tahukah Kamu?
              </span>
              "{province.funFact}"
            </div>
          </div>
        </div>

        {/* Exploration Progress HUD */}
        <div className="p-4">
          <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-100 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-display)]">
                <Compass className="size-4 text-terracotta" /> Progres Eksplorasi
              </span>
              <span className="text-terracotta font-black text-sm">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-150">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-xs"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Culture Categories List with Photos */}
        <div className="px-4 pb-8 space-y-3.5">
          <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center justify-between font-[family-name:var(--font-display)]">
            <span className="flex items-center gap-1.5">
              <span>🎭</span> Kebudayaan & Kekayaan {province.name}
            </span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">
              Klik untuk Jelajahi
            </span>
          </h3>

          {loading ? (
            <div className="py-12 text-center text-xs font-black text-slate-400 animate-pulse">
              Memuat Kebudayaan...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const info = getCategoryTitleAndDetail(cat.id);
                const isExplored = exploredCategories[cat.id];
                const photo = getCategoryImage(cat.id, province.name);

                return (
                  <motion.div
                    key={cat.id}
                    whileHover={{ scale: 1.025, y: -2 }}
                    whileTap={{ scale: 0.975 }}
                    onClick={() => onSelectCategory(cat, info.title, info.detail)}
                    className={`relative cursor-pointer rounded-2xl p-3.5 shadow-[var(--shadow-soft)] border transition-all overflow-hidden flex flex-col justify-between group ${
                      isExplored
                        ? "bg-white border-amber-250 shadow-amber-50/30"
                        : "bg-white/90 border-slate-200/70 hover:border-amber-300/80"
                    }`}
                  >
                    {/* Discovered Ribbon Checkmark */}
                    {isExplored && (
                      <div className="absolute top-2.5 right-2.5 text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 z-10">
                        <CheckCircle2 className="size-3.5 fill-emerald-100" />
                        <span className="text-[9px] font-black uppercase">Tuntas</span>
                      </div>
                    )}

                    <div>
                      {/* Photo Thumbnail + Title */}
                      <div className="flex items-start gap-3 mb-2.5">
                        <div className="relative size-14 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 shadow-xs bg-slate-100">
                          {photo ? (
                            <img
                              src={photo}
                              alt={info.title}
                              className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className={`size-full bg-gradient-to-br ${cat.bgGradient} grid place-items-center text-white text-xl`}>
                              <span>{cat.emoji}</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <span className={`text-[10px] font-black uppercase tracking-wider block ${cat.color} font-[family-name:var(--font-display)]`}>
                            {cat.label}
                          </span>
                          <h4 className="text-xs font-black text-slate-800 line-clamp-1 font-[family-name:var(--font-display)] mt-0.5">
                            {info.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-semibold">
                        {info.detail}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-black text-amber-600">
                      <span>Jelajahi & Pelajari</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
