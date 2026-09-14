import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Info,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";
import { CategoryConfig } from "./SidePanel";
import { ProvinceMeta } from "@/lib/culture-loader";

// Asset glob maps for category photos
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

type CulturePhoto = {
  url: string;
  itemName: string;
};

function getCategoryImages(catId: string, provName: string): CulturePhoto[] {
  if (!provName) return [];
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

  const list: CulturePhoto[] = [];
  if (filesMap) {
    for (const path in filesMap) {
      if (path.toLowerCase().includes(normName)) {
        const fileNameWithExt = path.split("/").pop() || "";
        const fileNameWithoutExt = fileNameWithExt.replace(/\.[^/.]+$/, "");
        const parts = fileNameWithoutExt.split(" - ");
        const itemName = parts.length > 1 ? parts.slice(1).join(" - ").trim() : fileNameWithoutExt;

        list.push({
          url: filesMap[path],
          itemName: itemName,
        });
      }
    }
  }
  return list;
}

type Props = {
  category: CategoryConfig | null;
  province: ProvinceMeta | null;
  title: string;
  detail: string;
  onClose: () => void;
  onExplore: () => void;
};

export function CategoryModal({
  category,
  province,
  title,
  detail,
  onClose,
  onExplore,
}: Props) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  if (!category || !province) return null;

  const photos = getCategoryImages(category.id, province.name);
  const activePhoto = photos[slideIdx] || null;

  // Reset slide index when category or province changes
  useEffect(() => {
    setSlideIdx(0);
  }, [category.id, province.id]);

  const handlePrevSlide = () => {
    if (photos.length === 0) return;
    setSlideIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextSlide = () => {
    if (photos.length === 0) return;
    setSlideIdx((prev) => (prev + 1) % photos.length);
  };

  // Web Speech API TTS Pronunciation
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const currentTitle = activePhoto?.itemName || title;
      const textToSpeak = `${category.label} dari ${province.name}: ${currentTitle}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "id-ID";
      utterance.rate = 0.9;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClose = () => {
    onExplore();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto font-[family-name:var(--font-body)]">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border-4 border-amber-300 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 size-9 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-600 font-bold transition-colors z-20 cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* Category Header Badge */}
          <div className="flex items-center gap-3 mb-4 pr-8">
            <div className="size-14 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md bg-slate-100">
              {activePhoto ? (
                <img src={activePhoto.url} alt={title} className="size-full object-cover" />
              ) : (
                <div className={`size-full bg-gradient-to-br ${category.bgGradient} grid place-items-center text-white text-3xl`}>
                  <span>{category.emoji}</span>
                </div>
              )}
            </div>
            <div>
              <span className={`text-xs font-black uppercase tracking-wider ${category.color}`}>
                {category.label} • {province.name}
              </span>
              <h2 className="text-xl font-black text-slate-800 leading-tight">
                {activePhoto?.itemName || title}
              </h2>
            </div>
          </div>

          {/* Audio Pronunciation Button */}
          <button
            onClick={handleSpeak}
            className={`w-full mb-4 flex items-center justify-center gap-2 rounded-2xl py-2.5 px-4 text-xs font-extrabold shadow-xs border transition-all cursor-pointer ${
              isPlayingAudio
                ? "bg-rose-100 text-rose-700 border-rose-300 animate-pulse"
                : "bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300"
            }`}
          >
            <Volume2 className={`size-4 ${isPlayingAudio ? "animate-spin" : ""}`} />
            <span>Dengarkan Pengucapan (Audio TTS)</span>
          </button>

          {/* Culture Photo Banner with Sliding Carousel Controls */}
          <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden shadow-inner mb-4 bg-slate-900 border border-slate-200 group">
            {activePhoto ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhoto.url}
                  src={activePhoto.url}
                  alt={activePhoto.itemName}
                  initial={{ opacity: 0.3, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className={`size-full bg-gradient-to-br ${category.bgGradient} flex items-center justify-center`}>
                <span className="text-6xl drop-shadow-md">{category.emoji}</span>
              </div>
            )}

            {/* Slider Badge: Photo Counter */}
            {photos.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20 z-10 flex items-center gap-1">
                <Camera className="size-3 text-amber-400" />
                <span>
                  {slideIdx + 1} / {photos.length}
                </span>
              </div>
            )}

            {/* Slider Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevSlide();
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/45 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 shadow-md border border-white/10"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="size-5 stroke-[2.5]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/45 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 shadow-md border border-white/10"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="size-5 stroke-[2.5]" />
                </button>
              </>
            )}

            {/* Slide Indicator Dots */}
            {photos.length > 1 && (
              <div className="absolute bottom-16 inset-x-0 flex justify-center gap-1.5 z-10">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIdx(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === slideIdx ? "w-5 bg-amber-400" : "w-1.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Overlay Gradient with Photo Name Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent p-4 flex flex-col justify-end text-white pointer-events-none">
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-fit mb-1 border border-amber-300/30">
                {category.label} • {province.name}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-sm font-[family-name:var(--font-display)]">
                {activePhoto?.itemName || title}
              </h3>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3 text-xs text-slate-700 font-semibold mb-6">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 leading-relaxed">
              <h4 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5 text-xs font-[family-name:var(--font-display)]">
                <BookOpen className="size-4 text-amber-600" /> Penjelasan & Sejarah
              </h4>
              <p className="text-slate-700 font-semibold leading-relaxed mt-1">{detail}</p>
            </div>
          </div>

          {/* Action Button: Finish & Earn XP */}
          <button
            onClick={handleClose}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-terracotta text-white font-black py-3.5 shadow-lg hover:from-amber-600 hover:to-terracotta/90 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="size-5" /> Selesai Mempelajari (+10 XP)
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
