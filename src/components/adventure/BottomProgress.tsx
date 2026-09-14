import { motion } from "framer-motion";
import { Award, BookOpen, Sparkles, Compass, Map, Trophy } from "lucide-react";
import { LevelInfo } from "@/hooks/useAdventureStore";
import xpIcon from "@/assets/xp-icon.png";
import mascotBird from "@/assets/mascot-bird.png";

type Props = {
  levelInfo: LevelInfo;
  xp: number;
  visitedProvincesCount: number;
  discoveredCulturesCount: number;
  earnedBadgesCount?: number;
  onOpenPassport: () => void;
};

export function BottomProgress({
  levelInfo,
  xp,
  visitedProvincesCount,
  discoveredCulturesCount,
  earnedBadgesCount = 0,
  onOpenPassport,
}: Props) {
  const currentLevelProgress = Math.min(
    100,
    Math.round(
      ((xp - levelInfo.minXp) / Math.max(1, levelInfo.maxXp - levelInfo.minXp)) * 100
    )
  );

  return (
    <div className="pointer-events-auto fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-4xl font-[family-name:var(--font-body)]">
      <div className="glass-panel rounded-3xl p-3 sm:p-4 shadow-2xl border-2 border-white/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Level Badge & XP Progress Bar */}
          <div className="flex items-center gap-3 min-w-[220px] flex-1">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              className="size-12 shrink-0 animate-bounce flex items-center justify-center"
            >
              <img src={levelInfo.badgeImage} alt={levelInfo.title} className="size-full object-contain drop-shadow-md" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-black text-slate-800">
                <span>
                  Lvl {levelInfo.level}: <span className="text-terracotta">{levelInfo.title}</span>
                </span>
                <span className="text-amber-600 font-extrabold flex items-center gap-1">
                  <img src={xpIcon} alt="XP" className="size-4.5 object-contain inline shrink-0 drop-shadow-xs" />
                  <span>{xp} XP</span>
                </span>
              </div>

              {/* XP Bar with Mascot Marker */}
              <div className="relative mt-1.5 pt-3">
                {/* Traveling Mascot Marker */}
                <motion.div
                  className="absolute -top-5 z-10 -ml-4 pointer-events-none"
                  initial={{ left: "0%" }}
                  animate={{ left: `${Math.max(4, Math.min( currentLevelProgress, 96))}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={mascotBird}
                    alt="Maskot Petualang"
                    className="h-10 md:h-12 w-auto object-contain drop-shadow-md animate-bounce"
                  />
                </motion.div>

                <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200 shadow-inner">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-terracotta shadow-sm progress-shimmer"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentLevelProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Summary Badges */}
          <div className="flex items-center gap-2 text-xs font-black text-slate-700">
            <div className="flex items-center gap-1.5 rounded-2xl bg-amber-50 px-3 py-2 border border-amber-200 shadow-xs">
              <span className="text-base">🗺️</span>
              <span>{visitedProvincesCount}/38 Prov</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-sky-50 px-3 py-2 border border-sky-200 text-sky-900 shadow-xs">
              <span className="text-base">🎭</span>
              <span>{discoveredCulturesCount} Budaya</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-purple-50 px-3 py-2 border border-purple-200 text-purple-900 shadow-xs">
              <span className="text-base">🏆</span>
              <span>{earnedBadgesCount} Stempel</span>
            </div>
          </div>

          {/* Passport Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenPassport}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2.5 font-black text-xs shadow-md hover:shadow-lg transition-all border border-amber-300 shrink-0"
          >
            <BookOpen className="size-4" />
            <span>Paspor Nusantara</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
