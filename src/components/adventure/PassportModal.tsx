import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Lock, Sparkles, BookOpen } from "lucide-react";
import { allProvincesMeta } from "@/lib/culture-loader";
import { useAdventureStore, BADGES } from "@/hooks/useAdventureStore";
import xpIcon from "@/assets/xp-icon.png";
import passportIcon from "@/assets/passport-icon.png";
import { MascotWidget } from "@/components/ui/MascotWidget";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getProvinceProgress: (id: string) => number;
};

export function PassportModal({ isOpen, onClose, getProvinceProgress }: Props) {
  const [activeTab, setActiveTab] = useState<"stamps" | "badges">("stamps");
  const {
    unlockedBadges,
    exploredCategories,
    earnedBadgesCount,
    levelInfo,
    xp,
    discoveredCulturesCount,
  } = useAdventureStore();

  if (!isOpen) return null;

  const completedCount = allProvincesMeta.filter((p) => getProvinceProgress(p.id) >= 100).length;
  const visitedCount = allProvincesMeta.filter((p) => getProvinceProgress(p.id) > 0).length;
  const explorationPercent = Math.round((visitedCount / 38) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto font-[family-name:var(--font-body)] text-white">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 p-5 sm:p-7 shadow-2xl border-4 border-amber-500 my-8 overflow-hidden select-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-9 rounded-full bg-amber-800/80 hover:bg-amber-700 grid place-items-center text-amber-200 font-bold transition-colors z-10 cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* Official Passport Information Dashboard */}
          <div className="bg-amber-950/80 border-2 border-amber-800/90 rounded-3xl p-4 sm:p-5 mb-5 shadow-inner">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              {/* Left: Level, Avatar Badge & Title */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative shrink-0 size-20 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 border-2 border-amber-300 p-1 shadow-lg grid place-items-center">
                  <img src={levelInfo.badgeImage} alt={levelInfo.title} className="size-full object-contain drop-shadow-md animate-pulse" />
                  <span className="absolute -bottom-2 -right-2 text-base bg-amber-950 px-1.5 py-0.5 rounded-full border border-amber-400 shadow-xs">
                    {levelInfo.badgeEmoji}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-900/80 px-2.5 py-0.5 rounded-full border border-amber-700">
                    PASPOR PETUALANG RESMI
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-amber-100 mt-1 truncate font-[family-name:var(--font-display)]">
                    Lvl {levelInfo.level}: <span className="text-amber-400">{levelInfo.title}</span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-amber-200/90 font-extrabold mt-1">
                    <span className="flex items-center gap-1 text-amber-300">
                      <img src={xpIcon} alt="XP" className="size-4 object-contain inline" />
                      <span>{xp} XP</span>
                    </span>
                    <span className="text-amber-600">•</span>
                    <span>🎭 {discoveredCulturesCount} Budaya</span>
                    <span className="text-amber-600">•</span>
                    <span>🏆 {earnedBadgesCount} Lencana</span>
                  </div>
                </div>
              </div>

              {/* Right: Exploration Progress Dashboard */}
              <div className="w-full md:w-64 bg-amber-900/60 border border-amber-800 rounded-2xl p-3.5 flex flex-col gap-2 shrink-0">
                <div className="flex items-center justify-between text-xs font-black text-amber-200">
                  <span>Progress Eksplorasi</span>
                  <span className="text-amber-400 font-extrabold">{visitedCount} / 38 Prov</span>
                </div>
                <div className="h-3 w-full rounded-full bg-amber-950 overflow-hidden border border-amber-800 p-0.5 shadow-inner">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${explorationPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-extrabold text-amber-300/90">
                  <span>{explorationPercent}% Jelajah Nusantara</span>
                  <span>{completedCount} Tuntas 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Switcher Buttons */}
          <div className="flex items-center justify-center gap-2 mb-6 bg-amber-950/90 p-1.5 rounded-2xl border border-amber-800/80 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("stamps")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "stamps"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 shadow-md scale-[1.02]"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/50"
              }`}
            >
              <BookOpen className="size-4" />
              <span>Stempel Paspor ({visitedCount}/38)</span>
            </button>

            <button
              onClick={() => setActiveTab("badges")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "badges"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 shadow-md scale-[1.02]"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/50"
              }`}
            >
              <Award className="size-4" />
              <span>Stempel Spesial ({earnedBadgesCount}/{BADGES.length})</span>
            </button>
          </div>

          {/* TAB 1: Stamps Grid */}
          {activeTab === "stamps" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2"
            >
              {allProvincesMeta.map((prov) => {
                const progress = getProvinceProgress(prov.id);
                const isCompleted = progress >= 100;
                const isVisited = progress > 0;

                return (
                  <motion.div
                    key={prov.id}
                    whileHover={{ scale: 1.04 }}
                    className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 transition-all text-center ${
                      isCompleted
                        ? "bg-gradient-to-b from-amber-500 to-amber-700 border-amber-300 shadow-lg text-white"
                        : isVisited
                        ? "bg-amber-900/60 border-amber-700 text-amber-200"
                        : "bg-amber-950/40 border-amber-900/60 text-amber-600/40"
                    }`}
                  >
                    {/* Stamp Seal Badge */}
                    <div
                      className={`size-11 rounded-full grid place-items-center text-xl mb-1.5 border-2 shadow-inner ${
                        isCompleted
                          ? "bg-amber-400/30 border-amber-200"
                          : isVisited
                          ? "bg-black/20 border-amber-600/50"
                          : "bg-black/30 border-amber-900/40"
                      }`}
                    >
                      {isCompleted ? (
                        prov.stampIcon.split(" ")[0]
                      ) : isVisited ? (
                        "⏳"
                      ) : (
                        <Lock className="size-4 opacity-50" />
                      )}
                    </div>

                    <span className="text-[11px] font-black leading-tight line-clamp-1">
                      {prov.name}
                    </span>

                    <span className="text-[9px] font-bold mt-1 opacity-90 px-2 py-0.5 rounded-full bg-black/20">
                      {isCompleted ? "SELESAI ✅" : isVisited ? `${progress}%` : "TERKUNCI 🔒"}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 2: Badges Grid */}
          {activeTab === "badges" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2"
            >
              {BADGES.map((badge) => {
                const isUnlocked = !!unlockedBadges[badge.id];
                let count = 0;
                for (const provCats of Object.values(exploredCategories)) {
                  if (provCats[badge.categoryId]) count++;
                }
                const progressText = isUnlocked
                  ? "TERBUKA ✅"
                  : `${Math.min(count, badge.requiredCount)} / ${badge.requiredCount}`;

                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.04 }}
                    className={`relative flex flex-col items-center justify-between p-4 rounded-2xl border-2 transition-all text-center ${
                      isUnlocked
                        ? "bg-gradient-to-b from-amber-500/90 to-amber-700/90 border-amber-300 shadow-xl text-white"
                        : "bg-amber-950/50 border-amber-900/70 text-amber-200/80"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-14 rounded-2xl grid place-items-center text-3xl mb-2 border shadow-inner ${
                          isUnlocked
                            ? "bg-amber-300/30 border-amber-200 text-white"
                            : "bg-black/30 border-amber-900/50"
                        }`}
                      >
                        {badge.icon}
                      </div>
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 border ${
                          isUnlocked
                            ? "bg-amber-950/80 text-amber-300 border-amber-400/60"
                            : "bg-black/40 text-amber-400/80 border-amber-900/40"
                        }`}
                      >
                        {progressText}
                      </span>
                      <h4 className="text-xs font-black leading-tight text-amber-100 font-[family-name:var(--font-display)]">{badge.title}</h4>
                      <p className="text-[10px] font-medium text-amber-200/80 mt-1 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Footer Action */}
          <div className="mt-5 pt-3 border-t border-amber-800/80 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Tutup Paspor
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
