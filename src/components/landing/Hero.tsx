import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Map, Trophy, BookOpen, Gift } from "lucide-react";
import heroBg from "@/assets/hero-nusantara-fix.png";
import mascotBird from "@/assets/mascot-bird.png";
import passportIcon from "@/assets/passport-icon.png";
import { useAdventureStore } from "@/hooks/useAdventureStore";

export function Hero() {
  const { xp, levelInfo } = useAdventureStore();

  const xpRange = Math.max(1, levelInfo.maxXp - levelInfo.minXp);
  const currentProgressXp = xp - levelInfo.minXp;
  const levelProgressPercent = Math.min(100, Math.max(0, Math.round((currentProgressXp / xpRange) * 100)));

  const stats = [
    {
      value: "38",
      label: "Provinsi",
      icon: Map,
      bg: "bg-[#F0FDF4]",
      border: "border-[#DCFCE7]",
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-800",
    },
    {
      value: "500+",
      label: "Warisan Budaya",
      icon: Trophy,
      bg: "bg-[#F5F3FF]",
      border: "border-[#EDE9FE]",
      iconBg: "bg-[#EDE9FE]",
      iconColor: "text-purple-600",
      textColor: "text-purple-800",
    },
    {
      value: "180+",
      label: "Kuis & Misi",
      icon: BookOpen,
      bg: "bg-[#F0F9FF]",
      border: "border-[#E0F2FE]",
      iconBg: "bg-[#E0F2FE]",
      iconColor: "text-sky-600",
      textColor: "text-sky-800",
    },
    {
      value: "Gratis",
      label: "untuk Sekolah",
      icon: Gift,
      bg: "bg-[#FFFBEB]",
      border: "border-[#FEF3C7]",
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-amber-600",
      textColor: "text-amber-800",
    },
  ];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream">
      {/* Background scene */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Panorama pulau Nusantara"
          className="size-full object-cover select-none"
          width={1920}
          height={1200}
        />
        {/* Subtle overlay gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/35 to-transparent lg:block hidden" />
        <div className="absolute inset-0 bg-cream/80 lg:hidden block" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 min-h-[100svh] grid lg:grid-cols-12 items-center gap-12">
        {/* Left Column: Text & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Large Title */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-black leading-[0.9] tracking-tight select-none">
            <span className="block text-slate-800 drop-shadow-[0_4px_0_white]">JELAJAH</span>
            <span className="block text-terracotta drop-shadow-[0_4px_0_white] my-1">NUSANTARA</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg md:text-xl text-slate-700 font-bold leading-relaxed">
            Mulailah petualangan menjelajahi budaya, flora, dan fauna Indonesia. Selesaikan misi, kumpulkan stempel, dan temukan kekayaan unik di setiap dari{" "}
            <span className="text-terracotta font-extrabold border-b-2 border-dashed border-terracotta/40">38 provinsi Nusantara!</span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/peta"
              className="inline-flex items-center gap-3 rounded-full bg-[#FFB703] hover:bg-[#FB8500] text-slate-900 font-black px-6 py-3.5 shadow-[0_5px_0_#D97706] hover:translate-y-[1px] hover:shadow-[0_4px_0_#D97706] active:translate-y-[4px] active:shadow-none transition-all border border-[#FB8500]/20 cursor-pointer animate-float-gentle"
            >
              <span className="size-8 rounded-full bg-white flex items-center justify-center shadow-sm animate-compass-spin">
                <Compass className="size-4 text-amber-500 fill-amber-500/20" strokeWidth={2.5} />
              </span>
              Mulai Petualangan
              <ArrowRight className="size-5 ml-1" />
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                className={`flex flex-col p-4 rounded-3xl border ${s.bg} ${s.border} shadow-[var(--shadow-soft)] hover:scale-[1.03] transition-transform duration-200`}
              >
                <div className={`size-10 rounded-2xl ${s.iconBg} flex items-center justify-center mb-3`}>
                  <s.icon className={`size-5.5 ${s.iconColor}`} />
                </div>
                <div className={`text-2xl font-black ${s.textColor}`}>{s.value}</div>
                <div className="text-xs font-bold text-slate-500 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Flying Mascot & Speeches */}
        <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center min-h-[400px] lg:min-h-[500px]">
          {/* Flying Bird Mascot Container */}
          <div className="relative w-full max-w-[420px] lg:max-w-none flex justify-center lg:justify-end pr-0 lg:pr-10">
            {/* Speech Bubble */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[5%] left-[2%] lg:-left-[15%] bg-white px-6 py-4 rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-100/80 font-extrabold text-slate-800 text-sm md:text-base max-w-[200px] select-none z-20"
            >
              Yuk, kita mulai petualanganmu!
              {/* Speech bubble pointer pointing towards the bird (right side) */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[12px] border-l-white drop-shadow-sm" />
            </motion.div>

            {/* Flying Bird Mascot */}
            <motion.div
              animate={{
                y: [0, -16, 0],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[70%] sm:w-[60%] lg:w-[88%] max-w-[460px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
            >
              <img
                src={mascotBird}
                alt="Maskot Burung Terbang"
                className="w-full h-auto object-contain select-none"
              />
            </motion.div>
          </div>

          {/* Wooden Plaque Progress Board - Level & Rank Progress */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 right-4 lg:right-0 bg-gradient-to-br from-[#854d0e] to-[#422006] border-4 border-[#a16207] rounded-3xl p-4.5 shadow-2xl flex items-center gap-3.5 max-w-[310px] select-none text-white z-20"
          >
            {/* Level Image Badge (Clean image without container) */}
            <img
              src={levelInfo.badgeImage}
              alt={levelInfo.title}
              className="h-16 w-auto object-contain shrink-0 drop-shadow-xl select-none"
            />

            {/* Info & Progress */}
            <div className="flex-1 min-w-[140px]">
              <div className="text-[10px] font-black text-amber-200 uppercase tracking-widest leading-none flex items-center gap-1">
                <span>Progress Level</span>
                <span className="text-amber-400">⚡</span>
              </div>
              <div className="text-xl font-black mb-1 flex items-baseline gap-1.5 mt-1">
                <span>Lvl {levelInfo.level}</span>
                <span className="text-xs text-amber-300 font-extrabold truncate max-w-[120px]">{levelInfo.title}</span>
              </div>
              {/* Progress bar container */}
              <div className="w-full h-3 bg-yellow-950/80 rounded-full p-0.5 border border-yellow-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
              <div className="text-[10px] font-extrabold text-amber-200/80 text-right mt-1">
                {xp} / {levelInfo.maxXp} XP
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
