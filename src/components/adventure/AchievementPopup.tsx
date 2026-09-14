import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { BadgeInfo } from "@/hooks/useAdventureStore";
import { MascotWidget } from "@/components/ui/MascotWidget";

type Props = {
  badge: BadgeInfo | null;
  onClose: () => void;
};

export function AchievementPopup({ badge, onClose }: Props) {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!badge) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [badge, onClose]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-50 p-8 shadow-2xl border-4 border-amber-400 text-center font-[family-name:var(--font-body)] overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background sparkle decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400"
                  style={{
                    left: `${10 + (i * 7) % 80}%`,
                    top: `${5 + (i * 11) % 85}%`,
                    fontSize: `${8 + (i % 4) * 4}px`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 size-8 rounded-full bg-amber-100 hover:bg-amber-200 grid place-items-center text-amber-600 transition-colors z-10"
            >
              <X className="size-4" />
            </button>

            {/* Achievement label */}
            <motion.div
              className="mb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                <Sparkles className="size-3.5" />
                Stempel Baru Terbuka!
              </span>
            </motion.div>

            {/* Mascot Ceremonial Presenter */}
            <motion.div
              className="flex justify-center mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <MascotWidget
                variant="bird"
                mood="celebrate"
                title="Penghargaan Petualang"
                message={`Selamat! Kamu mendapatkan lencana "${badge.title}"! 🎉`}
                size="sm"
                bubblePosition="bottom"
              />
            </motion.div>

            {/* Badge icon */}
            <motion.div
              className="mx-auto size-20 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 grid place-items-center text-4xl shadow-lg border-4 border-amber-300 mb-3 animate-glow-pulse"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 150,
                delay: 0.3,
              }}
            >
              {badge.icon}
            </motion.div>

            {/* Badge title */}
            <motion.h2
              className="text-2xl font-[family-name:var(--font-display)] font-bold text-slate-800 mb-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {badge.title}
            </motion.h2>

            {/* Badge description */}
            <motion.p
              className="text-sm text-slate-600 font-semibold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {badge.description}
            </motion.p>

            {/* Dismiss button */}
            <motion.button
              onClick={onClose}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold py-3 shadow-lg hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="size-4" />
              Keren! Lanjut Petualangan!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
