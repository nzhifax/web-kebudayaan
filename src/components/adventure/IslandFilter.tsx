import { motion } from "framer-motion";

export type IslandOption = {
  id: string;
  label: string;
  emoji: string;
};

export const ISLANDS: IslandOption[] = [
  { id: "all", label: "Semua Pulau", emoji: "🌏" },
  { id: "Sumatera", label: "Sumatera", emoji: "🌴" },
  { id: "Jawa", label: "Jawa", emoji: "🌋" },
  { id: "Kalimantan", label: "Kalimantan", emoji: "🌿" },
  { id: "Sulawesi", label: "Sulawesi", emoji: "🐉" },
  { id: "Bali & Nusa Tenggara", label: "Bali & Nusa", emoji: "🏖️" },
  { id: "Maluku", label: "Maluku", emoji: "⚓" },
  { id: "Papua", label: "Papua", emoji: "🦜" },
];

type Props = {
  selectedIsland: string;
  onSelectIsland: (islandId: string) => void;
};

export function IslandFilter({ selectedIsland, onSelectIsland }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 max-w-full no-scrollbar font-[family-name:var(--font-body)]">
      {ISLANDS.map((is) => {
        const isSelected = selectedIsland === is.id;
        return (
          <motion.button
            key={is.id}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onSelectIsland(is.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-black border transition-all ${
              isSelected
                ? "bg-gradient-to-r from-terracotta to-amber-600 text-white border-amber-300 shadow-md scale-105"
                : "glass-panel text-slate-700 hover:bg-amber-100/60 border-white/80 shadow-xs"
            }`}
          >
            <span className="text-sm">{is.emoji}</span>
            <span>{is.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
