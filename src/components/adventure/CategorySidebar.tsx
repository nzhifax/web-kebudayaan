import { motion } from "framer-motion";

export type CategoryFilterId =
  | "all"
  | "tari"
  | "rumah"
  | "kuliner"
  | "musik"
  | "pakaian"
  | "tradisi"
  | "senjata"
  | "flora"
  | "fauna";

export type CategoryFilterItem = {
  id: CategoryFilterId;
  label: string;
  emoji: string;
};

export const CATEGORY_FILTERS: CategoryFilterItem[] = [
  { id: "all", label: "Semua", emoji: "🌏" },
  { id: "tari", label: "Tari", emoji: "💃" },
  { id: "rumah", label: "Rumah Adat", emoji: "🏠" },
  { id: "kuliner", label: "Kuliner", emoji: "🍲" },
  { id: "musik", label: "Musik", emoji: "🎵" },
  { id: "pakaian", label: "Pakaian", emoji: "🥋" },
  { id: "tradisi", label: "Tradisi", emoji: "🎭" },
  { id: "senjata", label: "Senjata", emoji: "⚔️" },
  { id: "flora", label: "Flora", emoji: "🌿" },
  { id: "fauna", label: "Fauna", emoji: "🐾" },
];

type Props = {
  activeCategory: CategoryFilterId;
  onSelectCategory: (cat: CategoryFilterId) => void;
};

export function CategorySidebar({ activeCategory, onSelectCategory }: Props) {
  return (
    <div className="absolute left-4 top-24 z-30 flex flex-col gap-1.5 p-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-white/90 font-[family-name:var(--font-body)]">
      {CATEGORY_FILTERS.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-black transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                : "text-slate-700 hover:bg-amber-100/70 hover:text-amber-950"
            }`}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            <span className="hidden md:inline whitespace-nowrap">{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
