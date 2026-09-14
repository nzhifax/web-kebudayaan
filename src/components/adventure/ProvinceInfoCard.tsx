import { motion } from "framer-motion";
import { Star, ArrowRight, X, Binoculars, Flower, Footprints } from "lucide-react";
import { ProvinceMeta } from "@/lib/culture-loader";
import { MascotWidget } from "@/components/ui/MascotWidget";

// Import category icon assets
import iconRumahAdat from "@/assets/quiz-rumah-adat.png";
import iconTariTradisional from "@/assets/quiz-tari-tradisional.png";
import iconKuliner from "@/assets/quiz-kuliner.png";
import iconSenjata from "@/assets/quiz-senjata-tradisional.png";

// Import asset glob maps for exact photos if available
const rumahAdatFiles = import.meta.glob("/src/assets/rumah-adat/*", { eager: true, import: "default" }) as Record<string, string>;
const tarianFiles = import.meta.glob("/src/assets/tarian-adat/*", { eager: true, import: "default" }) as Record<string, string>;
const makananFiles = import.meta.glob("/src/assets/makanan/*", { eager: true, import: "default" }) as Record<string, string>;
const senjataFiles = import.meta.glob("/src/assets/senjata/*", { eager: true, import: "default" }) as Record<string, string>;
const floraFiles = import.meta.glob("/src/assets/flora/*", { eager: true, import: "default" }) as Record<string, string>;
const faunaFiles = import.meta.glob("/src/assets/fauna/*", { eager: true, import: "default" }) as Record<string, string>;

function findAssetImage(files: Record<string, string>, provName: string): string | null {
  if (!provName) return null;
  const normName = provName.toLowerCase();
  for (const path in files) {
    if (path.toLowerCase().includes(normName)) {
      return files[path];
    }
  }
  return null;
}

type Props = {
  province: ProvinceMeta;
  onClose: () => void;
  onExplore: () => void;
};

export function ProvinceInfoCard({ province, onClose, onExplore }: Props) {
  const cProps = province.cultureProps;

  // Find exact images or fallbacks
  const rumahImg = findAssetImage(rumahAdatFiles, province.name);
  const tariImg = findAssetImage(tarianFiles, province.name);
  const makananImg = findAssetImage(makananFiles, province.name);
  const senjataImg = findAssetImage(senjataFiles, province.name);
  const floraImg = findAssetImage(floraFiles, province.name);
  const faunaImg = findAssetImage(faunaFiles, province.name);

  // Top header featured illustration image
  const featuredImg = rumahImg || tariImg || makananImg || iconRumahAdat;

  // Format short names for 6 preview items
  const rumahVal = cProps?.rumahAdat ? cProps.rumahAdat.split(",")[0].trim() : "Rumah Adat";
  const tariVal = cProps?.tarian ? cProps.tarian.split(",")[0].trim() : "Tari Tradisional";
  const kulinerVal = cProps?.makanan ? cProps.makanan.split(",")[0].trim() : "Kuliner Khas";
  const floraVal = cProps?.flora ? cProps.flora.split(",")[0].trim() : "Flora Khas";
  const faunaVal = cProps?.fauna ? cProps.fauna.split(",")[0].trim() : "Fauna Khas";
  const senjataVal = cProps?.senjata ? cProps.senjata.split(",")[0].trim() : "Alam & Tradisi";

  const previewItems = [
    {
      title: "Rumah Adat",
      val: rumahVal,
      img: rumahImg || iconRumahAdat,
      bg: "bg-[#FBF5E8]",
      textColor: "text-[#965E19]",
      isCustomImg: true,
    },
    {
      title: "Tari Tradisional",
      val: tariVal,
      img: tariImg || iconTariTradisional,
      bg: "bg-[#F2EFFB]",
      textColor: "text-[#5B46B3]",
      isCustomImg: true,
    },
    {
      title: "Kuliner Khas",
      val: kulinerVal,
      img: makananImg || iconKuliner,
      bg: "bg-[#EEF7F0]",
      textColor: "text-[#2E7D32]",
      isCustomImg: true,
    },
    {
      title: "Flora Khas",
      val: floraVal,
      img: floraImg,
      icon: Flower,
      iconBg: "bg-emerald-100 text-emerald-700",
      bg: "bg-[#F0F8F1]",
      textColor: "text-[#2E7D32]",
      isCustomImg: !!floraImg,
    },
    {
      title: "Fauna Khas",
      val: faunaVal,
      img: faunaImg,
      icon: Footprints,
      iconBg: "bg-amber-100 text-amber-800",
      bg: "bg-[#F7F3EE]",
      textColor: "text-[#795548]",
      isCustomImg: !!faunaImg,
    },
    {
      title: "Alam Indah",
      val: senjataVal,
      img: senjataImg || iconSenjata,
      bg: "bg-[#EFF6FF]",
      textColor: "text-[#1D4ED8]",
      isCustomImg: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 15 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative w-[540px] max-w-[94vw] bg-[#FDFBF7] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/80 text-slate-800 font-[family-name:var(--font-body)] after:content-[''] after:absolute after:-bottom-3.5 after:left-12 after:w-0 after:h-0 after:border-l-[14px] after:border-l-transparent after:border-r-[14px] after:border-r-transparent after:border-t-[14px] after:border-t-[#FDFBF7]"
    >
      {/* Top Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 size-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
        title="Tutup"
      >
        <X className="size-4 stroke-[2.5]" />
      </button>

      {/* Top Header Card */}
      <div className="flex items-center gap-4 md:gap-5 pr-8">
        {/* Left Featured Illustration */}
        <div className="w-32 h-24 md:w-40 md:h-28 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-amber-900/10 bg-amber-50 relative">
          <img src={featuredImg} alt={province.name} className="size-full object-cover" />
        </div>

        {/* Right Title & Subtitle */}
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight flex items-center gap-2 font-[family-name:var(--font-display)]">
            {province.name}
            <span className="text-amber-400 text-xl md:text-2xl select-none">⭐</span>
          </h3>
          <p className="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed mt-1.5 line-clamp-3">
            {province.funFact || `${province.name} yang kaya akan budaya, tradisi, dan alam yang memukau.`}
          </p>
        </div>
      </div>

      {/* Mascot Storyteller Horizontal Banner */}
      <div className="mt-4 w-full bg-amber-50/80 border border-amber-200/70 rounded-2xl p-2 md:p-2.5 shadow-2xs">
        <MascotWidget
          variant="explorer"
          mood="happy"
          title="Kabar Petualang"
          message={`Selamat datang di ${province.name}! Yuk temukan keunikan seni dan budayanya! ✨`}
          size="sm"
          bubblePosition="right"
          className="w-full"
        />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-200/80 my-3.5" />

      {/* Preview Materi Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-slate-800 mb-3 font-[family-name:var(--font-display)] font-black text-sm md:text-base">
          <Binoculars className="size-4 md:size-5 text-slate-700" />
          <span>Preview Materi</span>
        </div>

        {/* 6 Preview Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {previewItems.map((item, idx) => (
            <div
              key={idx}
              onClick={onExplore}
              className={`flex flex-col items-center justify-between p-2 rounded-xl ${item.bg} hover:scale-105 transition-all cursor-pointer min-h-[115px] text-center border border-black/5 shadow-2xs`}
            >
              {/* Item Thumbnail / Icon */}
              <div className="size-12 rounded-lg overflow-hidden bg-white/80 grid place-items-center mb-1.5 shadow-2xs shrink-0 p-1">
                {item.isCustomImg && item.img ? (
                  <img src={item.img} alt={item.title} className="size-full object-cover rounded-md" />
                ) : item.icon ? (
                  <div className={`size-full rounded-md ${item.iconBg} grid place-items-center`}>
                    <item.icon className="size-5" />
                  </div>
                ) : null}
              </div>

              {/* Title & Value */}
              <div className="w-full">
                <div className="text-[10px] font-black text-slate-700 leading-tight truncate">{item.title}</div>
                <div className={`text-[10px] font-extrabold ${item.textColor} leading-tight truncate mt-0.5`}>
                  {item.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional items banner */}
      <div
        onClick={onExplore}
        className="w-full bg-[#FAF3E4] hover:bg-[#F7EBCE] text-[#8C6219] rounded-2xl py-2.5 px-4 font-black text-xs md:text-sm text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#E9D8B4] mb-4"
      >
        <span className="text-amber-500">✨</span>
        <span>+4 materi menarik lainnya!</span>
      </div>

      {/* Main Golden CTA Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onExplore}
        className="w-full py-3.5 px-6 rounded-2xl md:rounded-full bg-gradient-to-r from-[#F4B449] to-[#E99E25] hover:from-[#EDAA37] hover:to-[#DE9116] text-[#3D2200] font-black text-base md:text-lg shadow-[0_5px_0_#C57D12] hover:translate-y-[1px] hover:shadow-[0_4px_0_#C57D12] active:translate-y-[4px] active:shadow-none border border-amber-300/40 flex items-center justify-center gap-2.5 transition-all cursor-pointer font-[family-name:var(--font-display)]"
      >
        <span>Jelajahi {province.name}</span>
        <ArrowRight className="size-5 stroke-[3]" />
      </motion.button>
    </motion.div>
  );
}
