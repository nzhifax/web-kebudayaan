import { motion } from "framer-motion";

export function AnimatedDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {/* === Flying Sea Birds 🕊 (Flock of 3) === */}
      <motion.div
        className="absolute top-[8%] text-lg flex gap-2 opacity-70"
        initial={{ x: "-10vw", y: 0 }}
        animate={{ x: "110vw", y: [-8, 12, -8] }}
        transition={{
          x: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.span
          animate={{ scaleY: [1, 0.7, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          🕊️
        </motion.span>
        <motion.span
          animate={{ scaleY: [1, 0.7, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        >
          🕊️
        </motion.span>
        <motion.span
          animate={{ scaleY: [1, 0.7, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="text-sm"
        >
          🕊️
        </motion.span>
      </motion.div>

      {/* Second bird flock (opposite direction, different height) */}
      <motion.div
        className="absolute top-[28%] text-sm flex gap-1.5 opacity-50"
        initial={{ x: "110vw" }}
        animate={{ x: "-10vw", y: [-5, 10, -5] }}
        transition={{
          x: { duration: 45, repeat: Infinity, ease: "linear", delay: 10 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span>🕊️</span>
        <span>🕊️</span>
      </motion.div>

      {/* === Sailing Traditional Boat (Perahu Pinisi) ⛵ === */}
      <motion.div
        className="absolute bottom-[18%] text-3xl filter drop-shadow-lg pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
        initial={{ x: "15vw", y: 0 }}
        animate={{ x: "-45vw", y: [0, -8, 0] }}
        transition={{
          x: { duration: 55, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        title="Perahu Pinisi Nusantara"
      >
        ⛵
        {/* Wake trail behind boat */}
        <motion.div
          className="absolute -right-8 bottom-0 text-xs opacity-40 flex gap-0.5"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>~</span><span>~</span><span>~</span>
        </motion.div>
      </motion.div>

      {/* === Swimming Fish 🐟 === */}
      <motion.div
        className="absolute bottom-[12%] left-[20%] text-xl opacity-60"
        animate={{
          x: [0, 80, 0],
          y: [0, -10, 0],
          scaleX: [1, 1, -1, -1, 1],
        }}
        transition={{
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scaleX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        🐟
      </motion.div>

      {/* Swimming Turtle 🐢 */}
      <motion.div
        className="absolute bottom-[25%] right-[15%] text-lg opacity-50"
        animate={{
          x: [0, -60, 0],
          y: [0, -6, 0],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        🐢
      </motion.div>

      {/* === Dolphins 🐬 === */}
      <motion.div
        className="absolute bottom-[8%] left-[45%] text-2xl filter drop-shadow-sm opacity-60"
        animate={{
          y: [0, -25, 0],
          rotate: [0, -20, 20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🐬
      </motion.div>

      {/* === Rainbow 🌈 === */}
      <motion.div
        className="absolute top-[3%] right-[5%] text-5xl filter drop-shadow-sm"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🌈
      </motion.div>

      {/* === Small Island Decoration 🏝️ === */}
      <motion.div
        className="absolute bottom-[30%] left-[8%] text-2xl opacity-40"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🏝️
      </motion.div>


      {/* === Animated Wave SVG at Bottom === */}
      <div className="absolute bottom-0 left-0 right-0 z-5 pointer-events-none overflow-hidden h-16">
        <motion.svg
          viewBox="0 0 1440 60"
          className="absolute bottom-0 w-[200%] h-full"
          animate={{ x: [0, -720] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C120,10 240,50 360,30 C480,10 600,50 720,30 C840,10 960,50 1080,30 C1200,10 1320,50 1440,30 L1440,60 L0,60 Z"
            fill="rgba(125, 211, 252, 0.15)"
          />
          <path
            d="M0,35 C100,20 200,45 360,35 C520,25 600,45 720,35 C840,25 960,45 1080,35 C1200,25 1340,45 1440,35 L1440,60 L0,60 Z"
            fill="rgba(96, 165, 250, 0.1)"
          />
        </motion.svg>
      </div>
    </div>
  );
}
