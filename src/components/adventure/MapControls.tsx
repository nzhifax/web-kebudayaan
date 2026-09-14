import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Target } from "lucide-react";
import L from "leaflet";

type Props = {
  map: L.Map | null;
  onRecenter: () => void;
};

export function MapControls({ map, onRecenter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  if (!map) return null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-white/90 font-[family-name:var(--font-body)]"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => map.zoomIn()}
        className="size-9 rounded-xl bg-slate-50 hover:bg-amber-100 text-slate-700 hover:text-amber-900 grid place-items-center transition-colors cursor-pointer"
        title="Zoom In"
      >
        <Plus className="size-5 stroke-[2.5]" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => map.zoomOut()}
        className="size-9 rounded-xl bg-slate-50 hover:bg-amber-100 text-slate-700 hover:text-amber-900 grid place-items-center transition-colors cursor-pointer"
        title="Zoom Out"
      >
        <Minus className="size-5 stroke-[2.5]" />
      </motion.button>

      <div className="h-px bg-slate-200/80 my-0.5" />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRecenter}
        className="size-9 rounded-xl bg-slate-50 hover:bg-blue-100 text-slate-700 hover:text-blue-900 grid place-items-center transition-colors cursor-pointer"
        title="Recenter Map"
      >
        <Target className="size-5 stroke-[2.5] text-blue-600" />
      </motion.button>
    </div>
  );
}
