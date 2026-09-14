import { motion } from "framer-motion";
import { Sparkles, Leaf } from "lucide-react";
import { LevelInfo } from "@/hooks/useAdventureStore";
import xpIcon from "@/assets/xp-icon.png";

type Props = {
  visitedCount: number;
  totalProvinces: number;
  levelInfo: LevelInfo;
  xp: number;
};

export function ProgressCard({
  visitedCount,
  totalProvinces,
  levelInfo,
  xp,
}: Props) {
  const percentage = Math.min(100, Math.round((visitedCount / totalProvinces) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-76 bg-white/95 backdrop-blur-md rounded-3xl p-3.5 shadow-[var(--shadow-soft)] border border-slate-100/80 font-[family-name:var(--font-body)] text-slate-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          {/* Sparkles icon */}
          <Sparkles className="size-4 text-amber-400 fill-amber-300" />
          <h3 className="text-xs font-black text-slate-800 tracking-tight font-[family-name:var(--font-display)]">
            Progress Jelajah
          </h3>
        </div>
        <Leaf className="size-4 text-emerald-500 fill-emerald-100" />
      </div>

      {/* Progress Value Counter */}
      <div className="flex items-baseline gap-1.5 mb-1.5 px-0.5">
        <span className="text-xl font-black text-slate-850 tracking-tight font-[family-name:var(--font-display)]">
          {visitedCount} / {totalProvinces}
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
          Provinsi
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-3 border border-slate-150 p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-emerald-500 shadow-sm"
        />
      </div>

      {/* Level & XP Footer Pill */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-amber-50/50 border border-amber-250/50">
        <div className="flex items-center gap-2">
          <img src={levelInfo.badgeImage} alt={levelInfo.title} className="size-6.5 object-contain shrink-0 drop-shadow-xs" />
          <div>
            <div className="text-[10px] font-black text-amber-900 leading-tight font-[family-name:var(--font-display)]">
              Lvl {levelInfo.level}: {levelInfo.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-black text-amber-900 font-[family-name:var(--font-display)]">
          <img src={xpIcon} alt="XP" className="size-4 object-contain" />
          <span>{xp} XP</span>
        </div>
      </div>
    </motion.div>
  );
}
