import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { provinces } from "@/lib/provinces-data";
import { allProvincesMeta } from "@/lib/culture-loader";
import passportIcon from "@/assets/passport-icon.png";

type Props = {
  visitedCount: number;
  clearedFogs: Record<string, boolean>;
  onSelectProvince: (provId: string) => void;
  onOpenPassport?: () => void;
};

const ITEMS_PER_PAGE = 3;

export function PassportCard({
  visitedCount,
  clearedFogs,
  onSelectProvince,
  onOpenPassport,
}: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  // Get all visited/unlocked provinces
  const visitedProvinces = provinces.filter((p) => clearedFogs[p.id]);

  const totalPages = Math.max(1, Math.ceil(visitedProvinces.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages - 1);

  // Get provinces for current page
  const pageVisited = visitedProvinces.slice(
    safePage * ITEMS_PER_PAGE,
    (safePage + 1) * ITEMS_PER_PAGE
  );

  // Construct exactly 3 slots for the current page
  const slots = [
    ...pageVisited,
    ...Array(Math.max(0, ITEMS_PER_PAGE - pageVisited.length)).fill(null),
  ];

  // Lookup map for province metadata
  const metaLookup = new Map(allProvincesMeta.map((pm) => [pm.id, pm]));

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-76 bg-white/95 backdrop-blur-md rounded-3xl p-3.5 shadow-[var(--shadow-soft)] border border-slate-100/80 font-[family-name:var(--font-body)] text-slate-800 relative select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div 
          onClick={onOpenPassport}
          className={`flex items-center gap-2 ${onOpenPassport ? "cursor-pointer group" : ""}`}
        >
          <img src={passportIcon} alt="Paspor" className="h-8.5 w-auto object-contain shrink-0 drop-shadow-xs transition-transform group-hover:scale-105" />
          <div>
            <h3 className="text-xs font-black text-slate-800 tracking-tight font-[family-name:var(--font-display)] group-hover:text-emerald-700 transition-colors">
              Paspor Nusantara
            </h3>
            {onOpenPassport && (
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <BookOpen className="size-3" /> Bukti Stempel
              </span>
            )}
          </div>
        </div>
        <Leaf className="size-4 text-emerald-500 fill-emerald-100" />
      </div>

      {/* Counter Row & Status */}
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1.5 px-0.5 border-b border-slate-100 pb-1">
        <span>Telah Jelajahi</span>
        <div className="flex items-center gap-2">
          <span className="font-black text-emerald-700 text-[11px] font-[family-name:var(--font-display)] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {visitedCount} / 38
          </span>
        </div>
      </div>

      {/* 3 Vertical Slots with Page Transition */}
      <div className="relative min-h-[126px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={safePage}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            {slots.map((prov, index) => {
              if (prov) {
                const meta = metaLookup.get(prov.id);
                const stamp = meta?.stampIcon ? meta.stampIcon.split(" ")[0] : prov.emoji;

                return (
                  <button
                    key={prov.id}
                    onClick={() => onSelectProvince(prov.id)}
                    className="w-full h-9 flex items-center justify-between px-3 py-1 rounded-2xl bg-white border border-slate-150 hover:bg-amber-50/50 hover:border-amber-200 transition-all text-left shadow-[0_2px_6px_rgba(0,0,0,0.02)] group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">{prov.emoji}</span>
                      <span className="text-[11px] font-black text-slate-800 group-hover:text-amber-900 truncate max-w-[140px] font-[family-name:var(--font-display)]">
                        {prov.name}
                      </span>
                    </div>
                    {/* Circular Unlocked Stamp Badge */}
                    <div className="size-6 rounded-full border border-emerald-500/80 bg-emerald-50 text-emerald-600 grid place-items-center text-[10px] font-black shadow-xs shrink-0 select-none">
                      {stamp}
                    </div>
                  </button>
                );
              }

              // Empty Placeholder Slot
              return (
                <div
                  key={`empty-${index}`}
                  className="w-full h-9 flex items-center justify-between px-3 py-1 rounded-2xl bg-slate-50/60 border border-slate-100/70 select-none opacity-60"
                >
                  <div className="h-2.5 w-16 bg-slate-100 rounded-md animate-pulse" />
                  <div className="size-6 rounded-full border border-dashed border-slate-350 bg-transparent shrink-0" />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Footer Controls */}
      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
        <button
          onClick={handlePrev}
          disabled={safePage === 0}
          className="flex items-center gap-1 px-2 py-0.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-slate-50 transition cursor-pointer text-[10px] font-extrabold text-slate-700"
        >
          <ChevronLeft className="size-3" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md font-[family-name:var(--font-display)]">
          {safePage + 1} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={safePage >= totalPages - 1}
          className="flex items-center gap-1 px-2 py-0.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 disabled:opacity-30 disabled:hover:bg-emerald-50 disabled:border-slate-200 disabled:text-slate-700 transition cursor-pointer text-[10px] font-extrabold"
        >
          <span>Berikutnya</span>
          <ChevronRight className="size-3" />
        </button>
      </div>
    </motion.div>
  );
}
