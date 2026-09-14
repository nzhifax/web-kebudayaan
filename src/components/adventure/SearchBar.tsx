import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { allProvincesMeta, ProvinceMeta } from "@/lib/culture-loader";

type Props = {
  onSelectProvince: (prov: ProvinceMeta) => void;
};

export function SearchBar({ onSelectProvince }: Props) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allProvincesMeta.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.capital.toLowerCase().includes(q) ||
        p.island.toLowerCase().includes(q) ||
        p.funFact.toLowerCase().includes(q) ||
        (p.cultureProps &&
          Object.values(p.cultureProps).some((val) =>
            val.toLowerCase().includes(q)
          ))
    );
  }, [query]);

  return (
    <div className="relative w-full max-w-md font-[family-name:var(--font-body)]">
      {/* Clean Single Pill Search Box matching mock design */}
      <div className="flex items-center rounded-full bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-md border-2 border-white focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-300/50 transition-all">
        <Search className="size-4 text-slate-400 shrink-0 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Cari provinsi, tari, rumah adat, makanan..."
          className="w-full bg-transparent text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="size-5 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500 transition-colors"
          >
            <X className="size-3" />
          </button>
        )}
      </div>

      {/* Autocomplete Result Dropdown */}
      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto custom-scrollbar rounded-2xl bg-white/95 backdrop-blur-md p-2 shadow-2xl border-2 border-amber-300">
          {results.map((prov) => (
            <div
              key={prov.id}
              onClick={() => {
                onSelectProvince(prov);
                setQuery("");
              }}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{prov.stampIcon.split(" ")[0]}</span>
                <div>
                  <div className="text-xs font-black text-slate-800">{prov.name}</div>
                  <div className="text-[10px] text-slate-500 font-bold">{prov.capital} • {prov.island}</div>
                </div>
              </div>
              <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                Jelajahi →
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
