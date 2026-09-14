import { motion } from "framer-motion";
import { useMemo } from "react";

type CloudConfig = {
  id: number;
  top: string;
  width: number;
  duration: number;
  delay: number;
  opacity: number;
  path: string;
};

const CLOUD_PATHS = [
  "M 4 14 C 1 14 0 11 2 9 C 1 7 3 4 6 5 C 7 2 12 1 15 4 C 18 2 22 4 21 8 C 24 9 24 13 20 14 Z",
  "M 3 12 C 0 12 0 9 2 8 C 1 6 4 3 7 4 C 9 1 14 1 16 4 C 19 3 22 5 20 8 C 23 9 22 12 19 12 Z",
  "M 5 13 C 2 13 1 10 3 9 C 2 7 4 5 7 6 C 8 3 11 2 14 4 C 16 2 20 3 19 7 C 22 8 22 12 18 13 Z",
];

export function FloatingClouds() {
  const clouds = useMemo<CloudConfig[]>(
    () => [
      { id: 1, top: "14%", width: 120, duration: 50, delay: 0, opacity: 0.5, path: CLOUD_PATHS[0] },
      { id: 2, top: "24%", width: 160, duration: 70, delay: 15, opacity: 0.45, path: CLOUD_PATHS[1] },
      { id: 3, top: "34%", width: 100, duration: 55, delay: 8, opacity: 0.5, path: CLOUD_PATHS[2] },
      { id: 4, top: "45%", width: 140, duration: 65, delay: 25, opacity: 0.4, path: CLOUD_PATHS[0] },
      { id: 5, top: "58%", width: 110, duration: 60, delay: 12, opacity: 0.35, path: CLOUD_PATHS[1] },
      { id: 6, top: "72%", width: 130, duration: 75, delay: 30, opacity: 0.45, path: CLOUD_PATHS[2] },
      { id: 7, top: "84%", width: 150, duration: 58, delay: 5, opacity: 0.4, path: CLOUD_PATHS[0] },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {/* Floating cloud layers */}
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{ top: c.top, width: c.width, opacity: c.opacity }}
          initial={{ x: "-150px" }}
          animate={{ x: "calc(100vw + 150px)" }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "linear",
            delay: c.delay,
          }}
        >
          <svg
            viewBox="0 0 24 16"
            fill="white"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.06))" }}
          >
            <path d={c.path} />
          </svg>
        </motion.div>
      ))}

      {/* Sparkle particles scattered across the sky */}
      {[
        { id: "s1", left: "15%", top: "10%", delay: 0 },
        { id: "s2", left: "35%", top: "25%", delay: 0.5 },
        { id: "s3", left: "55%", top: "8%", delay: 1 },
        { id: "s4", left: "75%", top: "20%", delay: 1.5 },
        { id: "s5", left: "90%", top: "15%", delay: 2 },
        { id: "s6", left: "25%", top: "40%", delay: 2.5 },
        { id: "s7", left: "65%", top: "35%", delay: 0.3 },
        { id: "s8", left: "85%", top: "45%", delay: 1.8 },
      ].map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-yellow-300"
          style={{ left: sparkle.left, top: sparkle.top }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.6, 1.2, 0.6],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sparkle.delay,
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}
