import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Trophy,
  RotateCcw,
  Compass,
  Home,
  Map,
  Gamepad2,
  Briefcase,
  Info,
  HelpCircle,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { useMemo, useState } from "react";
import { provinces } from "@/lib/provinces-data";
import { useAdventureStore } from "@/hooks/useAdventureStore";

import { MascotWidget } from "@/components/ui/MascotWidget";

// Assets imports
import logoIcon from "@/assets/logo-icon.png";
import xpIcon from "@/assets/xp-icon.png";
import passportIcon from "@/assets/passport-icon.png";
import badgeIcon from "@/assets/badge-icon.png";
import mascotExplorer from "@/assets/mascot-explorer.png";
import mascotBird from "@/assets/mascot-bird.png";
import heroBg from "@/assets/hero-quiz.png";

// Category images imports
import iconRumahAdat from "@/assets/quiz-rumah-adat.png";
import iconTariTradisional from "@/assets/quiz-tari-tradisional.png";
import iconAlatMusik from "@/assets/quiz-alat-musik.png";
import iconKuliner from "@/assets/quiz-kuliner.png";
import iconPakaianAdat from "@/assets/quiz-pakaian-adat.png";
import iconSenjataTradisional from "@/assets/quiz-senjata-tradisional.png";
import iconFlora from "@/assets/quiz-flora.png";
import iconFauna from "@/assets/quiz-fauna.png";

type Question = {
  q: string;
  options: string[];
  answer: number;
  fun: string;
};

type QuizCategory =
  | "rumahAdat"
  | "tarian"
  | "alatMusik"
  | "makanan"
  | "pakaianAdat"
  | "senjataTradisional"
  | "flora"
  | "fauna";

function buildCategoryQuestions(category: QuizCategory, count: number = 10): Question[] {
  const rng = () => Math.random();
  const shuffle = <T,>(a: T[]) => [...a].sort(() => rng() - 0.5);
  const pick = <T,>(a: T[], n: number) => shuffle(a).slice(0, n);

  // Map quiz category key to actual field name in Province type
  const fieldMap: Record<QuizCategory, keyof typeof provinces[0]> = {
    rumahAdat: "rumahAdat",
    tarian: "tarian",
    alatMusik: "alatMusik",
    makanan: "makanan",
    pakaianAdat: "pakaianAdat",
    senjataTradisional: "senjataTradisional",
    flora: "flora",
    fauna: "fauna",
  };

  const field = fieldMap[category];
  const labelMap: Record<QuizCategory, string> = {
    rumahAdat: "rumah adat",
    tarian: "tarian tradisional",
    alatMusik: "alat musik",
    makanan: "kuliner khas",
    pakaianAdat: "pakaian adat",
    senjataTradisional: "senjata tradisional",
    flora: "flora / tumbuhan khas",
    fauna: "fauna / hewan khas",
  };

  // Filter provinces that have the specified field populated
  const validProvinces = provinces.filter((p) => !!p[field]);
  const pool = pick(validProvinces, Math.min(count, validProvinces.length));

  return pool.map((p) => {
    const correct = p[field] as string;
    
    // Find wrong options from other provinces
    const allWrongs = validProvinces
      .filter((x) => x.id !== p.id)
      .map((x) => x[field] as string)
      .filter((v) => v !== correct && !!v);
    
    const uniqueWrongs = Array.from(new Set(allWrongs));
    const wrongs = pick(uniqueWrongs, 3);
    const options = shuffle([correct, ...wrongs]);

    return {
      q: `Apa ${labelMap[category]} khas dari provinsi ${p.name}?`,
      options,
      answer: options.indexOf(correct),
      fun: `${p.emoji} ${p.name}: ${p.cerita}`,
    };
  });
}

export const Route = createFileRoute("/kuis")({
  head: () => ({
    meta: [
      { title: "Kuis Nusantara — Uji Pengetahuanmu" },
      {
        name: "description",
        content:
          "Kuis interaktif seputar rumah adat, tarian, kuliner, dan alat musik 38 provinsi Indonesia. Kumpulkan skor & stempel.",
      },
      { property: "og:title", content: "Kuis Nusantara" },
      { property: "og:description", content: "Uji pengetahuan budayamu dan kumpulkan stempel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KuisPage,
});

function KuisPage() {
  const [stage, setStage] = useState<"landing" | "category" | "playing">("landing");
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("rumahAdat");
  const [showTutorial, setShowTutorial] = useState(false);

  // States from Store
  const { levelInfo, addXp } = useAdventureStore();

  // Quiz progress tracker (simulated or loaded from localStorage)
  const [quizProgress, setQuizProgress] = useState<Record<QuizCategory, number>>(() => {
    const initialProgress: Record<QuizCategory, number> = {
      rumahAdat: 0,
      tarian: 0,
      alatMusik: 0,
      makanan: 0,
      pakaianAdat: 0,
      senjataTradisional: 0,
      flora: 0,
      fauna: 0,
    };
    try {
      const saved = localStorage.getItem("jelajah_budaya_quiz_progress");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load quiz progress", e);
    }
    return initialProgress;
  });

  const updateQuizProgress = (category: QuizCategory, correctCount: number) => {
    setQuizProgress((prev) => {
      const current = prev[category] || 0;
      const nextVal = Math.min(30, current + correctCount);
      const updated = {
        ...prev,
        [category]: nextVal,
      };
      try {
        localStorage.setItem("jelajah_budaya_quiz_progress", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save quiz progress", e);
      }
      return updated;
    });
  };

  // Gameplay specific states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const startQuiz = (category: QuizCategory) => {
    setSelectedCategory(category);
    const qList = buildCategoryQuestions(category, 10);
    setQuestions(qList);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setStage("playing");
  };

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === questions[idx].answer) setScore((s) => s + 1);
  };

  const next = () => {
    const isLast = idx === questions.length - 1;
    if (isLast) {
      setDone(true);
      // Save stats
      updateQuizProgress(selectedCategory, score);
      const earnedXp = score * 10;
      if (earnedXp > 0) {
        addXp(earnedXp, `🏆 Kuis Selesai! (+${earnedXp} XP)`);
      }
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const reset = () => {
    startQuiz(selectedCategory);
  };

  // Category Configuration
  const categoriesList = [
    {
      id: "rumahAdat" as QuizCategory,
      title: "Rumah Adat",
      description: "Kenali berbagai rumah adat dari seluruh penjuru Indonesia.",
      img: iconRumahAdat,
      emoji: "🏠",
      color: "text-amber-700",
      bgClass: "bg-[#FFFBF5] border-amber-200 hover:border-amber-400 hover:bg-amber-50/30",
      progressBg: "bg-amber-100/70 border border-amber-200 text-amber-800",
    },
    {
      id: "tarian" as QuizCategory,
      title: "Tari Tradisional",
      description: "Pelajari gerakan dan cerita di balik tari daerah Indonesia.",
      img: iconTariTradisional,
      emoji: "🪭",
      color: "text-blue-700",
      bgClass: "bg-[#F5FAFF] border-blue-200 hover:border-blue-400 hover:bg-blue-50/30",
      progressBg: "bg-blue-100/70 border border-blue-200 text-blue-850",
    },
    {
      id: "alatMusik" as QuizCategory,
      title: "Alat Musik",
      description: "Temukan alat musik tradisional yang memiliki cerita unik.",
      img: iconAlatMusik,
      emoji: "🎵",
      color: "text-rose-700",
      bgClass: "bg-[#FFF5F6] border-rose-200 hover:border-rose-400 hover:bg-rose-50/30",
      progressBg: "bg-rose-100/70 border border-rose-200 text-rose-800",
    },
    {
      id: "makanan" as QuizCategory,
      title: "Kuliner",
      description: "Cicipi pengetahuan tentang makanan khas daerah Indonesia.",
      img: iconKuliner,
      emoji: "🍛",
      color: "text-emerald-700",
      bgClass: "bg-[#F5FFF7] border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30",
      progressBg: "bg-emerald-100/70 border border-emerald-200 text-emerald-805",
    },
    {
      id: "pakaianAdat" as QuizCategory,
      title: "Pakaian Adat",
      description: "Jelajahi keindahan pakaian adat dari berbagai daerah.",
      img: iconPakaianAdat,
      emoji: "👕",
      color: "text-purple-700",
      bgClass: "bg-[#FAF5FF] border-purple-200 hover:border-purple-400 hover:bg-purple-50/30",
      progressBg: "bg-purple-100/70 border border-purple-200 text-purple-800",
    },
    {
      id: "senjataTradisional" as QuizCategory,
      title: "Senjata Tradisional",
      description: "Kenali senjata tradisional yang menjadi warisan budaya bangsa.",
      img: iconSenjataTradisional,
      emoji: "🛡️",
      color: "text-orange-700",
      bgClass: "bg-[#FFF8F5] border-orange-200 hover:border-orange-400 hover:bg-orange-50/30",
      progressBg: "bg-orange-100/70 border border-orange-200 text-orange-800",
    },
    {
      id: "flora" as QuizCategory,
      title: "Flora Khas",
      description: "Kenali tumbuhan dan bunga endemik khas Nusantara.",
      img: iconFlora,
      emoji: "🌿",
      color: "text-emerald-700",
      bgClass: "bg-[#F5FFF7] border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30",
      progressBg: "bg-emerald-100/70 border border-emerald-200 text-emerald-800",
    },
    {
      id: "fauna" as QuizCategory,
      title: "Fauna Khas",
      description: "Temukan satwa dan hewan langka dari berbagai provinsi.",
      img: iconFauna,
      emoji: "🐾",
      color: "text-amber-700",
      bgClass: "bg-[#FFFBF5] border-amber-200 hover:border-amber-400 hover:bg-amber-50/30",
      progressBg: "bg-amber-100/70 border border-amber-200 text-amber-800",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col font-[family-name:var(--font-body)] text-slate-800 relative bg-[#F8F6F2] select-none overflow-x-hidden">
      {/* Top Navbar */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative transition-transform duration-300 group-hover:rotate-12 shrink-0">
                <img src={logoIcon} alt="Logo" className="size-11 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.15)]" />
              </div>
              <div className="font-[family-name:var(--font-display)] leading-none text-left">
                <div className="text-xl font-black text-slate-800 tracking-tight">Jelajah</div>
                <div className="text-sm font-extrabold text-slate-500">Nusantara</div>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Pill */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur border border-white/60 px-2 py-1.5 shadow-[var(--shadow-soft)]">
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition"
            >
              <Home className="size-4" />
              Beranda
            </Link>
            <Link
              to="/peta"
              className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition"
            >
              <Map className="size-4" />
              Peta
            </Link>
            <Link
              to="/kuis"
              className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 bg-emerald-500/10 text-emerald-800 transition"
            >
              <Gamepad2 className="size-4" />
              Kuis
            </Link>
            <Link
              to="/peta"
              search={{ passport: true }}
              className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition"
            >
              <BookOpen className="size-4 text-slate-500" />
              Paspor
            </Link>
          </nav>

          {/* Right: Spacer for centering navbar pill */}
          <div className="hidden md:flex flex-1 justify-end" />
        </div>
      </header>

      {/* Main Background panorama - common for all stages */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Nusantara panorama"
          className="w-full h-full object-cover object-bottom select-none opacity-90 scale-[1.01] origin-bottom transition-all duration-700"
        />
        <div className="absolute inset-0 bg-[#F8F6F2]/25 pointer-events-none" />
        {/* Soft overlay when playing to keep text highly readable */}
        {stage === "playing" && (
          <div className="absolute inset-0 bg-[#F8F6F2]/50 backdrop-blur-xs pointer-events-none transition-all duration-500" />
        )}
      </div>

      {/* Stage Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-28 relative z-10">
        {stage === "landing" && (
          <div className="w-full flex flex-col items-center">
            {/* Center Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-w-md md:max-w-xl w-full p-8 md:p-10 text-center flex flex-col items-center relative animate-pop-in">
              <div className="relative mb-5">
                <div className="absolute -top-3 -left-3 text-amber-400 text-xl font-bold animate-pulse">✨</div>
                <div className="absolute -bottom-2 -right-2 text-amber-400 text-xl font-bold animate-pulse">✨</div>
                <div className="size-16 rounded-3xl bg-slate-50 border-2 border-slate-100/80 flex items-center justify-center shadow-inner">
                  <Gamepad2 className="size-9 text-emerald-600 fill-emerald-500/10" strokeWidth={2.5} />
                </div>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-[2.75rem] font-black leading-tight tracking-tight select-none">
                <span className="text-[#1E293B]">Kuis </span>
                <span className="text-[#4E8F28]">Nusantara</span>
              </h1>

              <p className="mt-4 text-slate-600 font-extrabold text-sm md:text-base max-w-sm leading-relaxed">
                Uji pengetahuanmu tentang budaya Indonesia dan kumpulkan XP untuk naik level!
              </p>

              {/* Three Horizontal Feature Icons */}
              <div className="my-7 flex justify-center items-center gap-6 md:gap-8 w-full border-t border-b border-slate-100 py-6">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="size-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shadow-xs">
                    <img src={xpIcon} alt="XP" className="size-10 object-contain drop-shadow-xs" />
                  </div>
                  <span className="text-xs font-black text-slate-700">Dapatkan XP</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="size-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center shadow-xs">
                    <img src={badgeIcon} alt="Badge" className="size-10 object-contain drop-shadow-xs" />
                  </div>
                  <span className="text-xs font-black text-slate-700">Buka Badge</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-xs">
                    <img src={passportIcon} alt="Paspor" className="size-9 object-contain" />
                  </div>
                  <span className="text-xs font-black text-slate-700">Lengkapi Paspor</span>
                </div>
              </div>

              {/* Buttons */}
              <button
                onClick={() => setStage("category")}
                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#5C9E31] hover:bg-[#4E8828] text-white py-4 font-black shadow-[0_5px_0_#3A6B20] hover:translate-y-[1px] hover:shadow-[0_4px_0_#3A6B20] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-lg group"
              >
                Mulai Kuis
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>

              <button
                onClick={() => setShowTutorial(true)}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 py-3.5 font-extrabold text-slate-700 shadow-xs hover:translate-y-[1px] transition-all cursor-pointer text-sm"
              >
                <HelpCircle className="size-4.5 text-slate-500" />
                Cara Bermain
              </button>
            </div>

            {/* Bottom Dotted Path Decor */}
            <div className="mt-8 flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-slate-800/90 bg-white/70 backdrop-blur-xs px-4 py-2 rounded-full border border-white/55 font-extrabold text-xs shadow-xs">
                <span className="text-sm">❌</span>
                <span>Setiap jawaban adalah langkah petualanganmu!</span>
              </div>
            </div>
          </div>
        )}

        {stage === "category" && (
          <div className="w-full max-w-6xl flex flex-col items-center animate-fade-in">
            {/* Back Button */}
            <div className="w-full flex justify-start mb-4">
              <button
                onClick={() => setStage("landing")}
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-50 border border-slate-250/60 px-5 py-2 font-black text-slate-700 shadow-sm hover:translate-y-[1px] transition-all cursor-pointer text-xs"
              >
                <ArrowLeft className="size-3.5" strokeWidth={2.5} />
                Kembali
              </button>
            </div>

            {/* Title parchment Banner */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative bg-[#FCF8F2] border-2 border-[#DCD5C5] px-10 py-3 rounded-2xl shadow-xs inline-block">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-2xl rotate-[-20deg] select-none">🌿</div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-2xl rotate-[20deg] select-none">🌿</div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black text-slate-800 leading-tight tracking-tight">
                  Pilih Kategori Kuis
                </h2>
              </div>
              <p className="mt-3.5 text-slate-700 font-extrabold text-sm md:text-base">
                Pilih kategori budaya yang ingin kamu jelajahi!
              </p>
            </div>

            {/* Grid of 8 Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 w-full px-2 mb-8">
              {categoriesList.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => startQuiz(cat.id)}
                  className={`flex flex-col items-center p-5 rounded-3xl border-2 shadow-xs hover:shadow-md transition-all hover:-translate-y-1.5 cursor-pointer text-center duration-300 relative group bg-white ${cat.bgClass}`}
                >
                  {/* Thumbnail Avatar shape */}
                  <div className="size-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-50 mb-4 flex items-center justify-center relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img src={cat.img} alt={cat.title} className="size-full object-cover" />
                  </div>

                  <h3 className={`text-base font-black ${cat.color} mb-1.5 leading-snug`}>
                    {cat.title}
                  </h3>
                  
                  <p className="text-slate-500 font-bold text-xs leading-relaxed flex-1 mb-4">
                    {cat.description}
                  </p>

                  <div
                    className={`mt-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${cat.progressBg}`}
                  >
                    <span className="text-sm">{cat.emoji}</span>
                    <span>{quizProgress[cat.id] || 0}/30 soal</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Tip Panel */}
            <div className="w-full max-w-4xl px-2">
              <div className="rounded-3xl border border-sky-100 bg-sky-50/90 p-4.5 flex items-center justify-between gap-4 shadow-xs animate-pop-in">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-amber-400 text-white grid place-items-center text-xl shadow-xs shrink-0 border border-amber-300 select-none animate-pulse">
                    💡
                  </div>
                  <p className="text-xs md:text-sm font-extrabold text-slate-700 leading-relaxed max-w-xl text-left">
                    Setiap jawaban yang benar akan menambah XP dan membantumu mendapatkan badge baru untuk Paspor Nusantaramu!
                  </p>
                </div>
                <img
                  src={passportIcon}
                  alt="Paspor"
                  className="size-18 object-contain shrink-0 drop-shadow-xs hidden sm:block"
                />
              </div>
            </div>
          </div>
        )}

        {stage === "playing" && questions.length > 0 && (
          <div className="w-full max-w-2xl px-2 py-4 animate-pop-in">
            {/* Play header & Back to categories */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setStage("category")}
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 px-4 py-1.5 font-bold text-slate-700 shadow-xs transition cursor-pointer text-xs"
              >
                <ArrowLeft className="size-3.5" /> Keluar Kuis
              </button>
              <div className="inline-flex items-center gap-1.5 font-black text-slate-700 text-xs">
                <span>Kategori:</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  {categoriesList.find((c) => c.id === selectedCategory)?.title}
                </span>
              </div>
            </div>

            {!done ? (
              <>
                {/* Stats */}
                <div className="flex items-center justify-between text-xs font-black text-slate-600 mb-2">
                  <span>Soal {idx + 1} / {questions.length}</span>
                  <span className="inline-flex items-center gap-1 text-amber-600">
                    🏆 Skor: {score}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-3 rounded-full bg-white overflow-hidden border border-slate-150 p-0.5 shadow-inner">
                  <div
                    className="h-full bg-[#5C9E31] rounded-full transition-all duration-300"
                    style={{
                      width: `${((idx + (picked !== null ? 1 : 0)) / questions.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question Card */}
                <div className="mt-5 rounded-[2rem] bg-white p-6 md:p-8 shadow-md border border-white/60 animate-pop-in" key={idx}>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="size-3" /> Pertanyaan
                  </div>
                  <h2 className="mt-3.5 text-xl md:text-2xl font-black text-slate-800 leading-tight">
                    {questions[idx].q}
                  </h2>

                  {/* Options */}
                  <div className="mt-6 grid gap-3">
                    {questions[idx].options.map((opt, i) => {
                      const isCorrect = i === questions[idx].answer;
                      const isPicked = picked === i;
                      const revealed = picked !== null;
                      const tone = !revealed
                        ? "bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20"
                        : isCorrect
                        ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-extrabold"
                        : isPicked
                        ? "bg-rose-50 border-rose-300 text-rose-800"
                        : "bg-white border-slate-200 opacity-60";
                      
                      return (
                        <button
                          key={opt}
                          onClick={() => choose(i)}
                          disabled={revealed}
                          className={`text-left rounded-2xl border-2 px-4 py-3 font-extrabold transition flex items-center justify-between gap-3 text-sm cursor-pointer ${tone}`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="size-7 rounded-xl bg-white grid place-items-center border border-slate-200 font-black text-slate-600">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-slate-800">{opt}</span>
                          </span>
                          {revealed && isCorrect && <Check className="size-4.5 text-emerald-600" strokeWidth={3} />}
                          {revealed && isPicked && !isCorrect && <X className="size-4.5 text-rose-600" strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mascot Feedback Reaction */}
                  {picked !== null && (
                    <div className="mt-4 flex justify-center">
                      <MascotWidget
                        variant="bird"
                        mood={picked === questions[idx].answer ? "celebrate" : "encouraging"}
                        title={picked === questions[idx].answer ? "Jawaban Benar! 🎉" : "Umpan Balik Kuis"}
                        message={
                          picked === questions[idx].answer
                            ? "Luar biasa! Kamu menjawab dengan tepat! +10 XP didapatkan! ✨"
                            : "Yuk jangan berkecil hati, pelajari fakta serunya di bawah ya! 💪"
                        }
                        size="sm"
                        bubblePosition="right"
                      />
                    </div>
                  )}

                  {/* Fun fact */}
                  {picked !== null && (
                    <div className="mt-3 rounded-2xl bg-sky-50 border border-sky-100 p-4 text-xs font-bold text-slate-700 leading-relaxed animate-pop-in">
                      💡 <span className="font-black text-sky-850">Fakta Seru:</span> {questions[idx].fun}
                    </div>
                  )}

                  {/* Continue Button */}
                  <button
                    onClick={next}
                    disabled={picked === null}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5C9E31] text-white py-3.5 font-black shadow-[0_5px_0_#3A6B20] disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 transition cursor-pointer text-sm"
                  >
                    {idx === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
                    <Sparkles className="size-4" />
                  </button>
                </div>
              </>
            ) : (
              /* Results screen */
              <div className="rounded-[2.5rem] bg-white p-8 md:p-10 shadow-md border border-white text-center animate-pop-in flex flex-col items-center">
                <MascotWidget
                  variant="explorer"
                  mood={score >= 7 ? "celebrate" : "happy"}
                  title="Hasil Kuis Petualang"
                  message={
                    score >= 8
                      ? "WOW Keren banget! Kamu pantas jadi Duta Kebudayaan Nusantara! 👑"
                      : score >= 5
                      ? "Bagus sekali! Pengetahuan budayamu makin meningkat pesat! 🌟"
                      : "Terus berlatih ya! Semakin sering eksplor peta, kamu akan makin mahir! 🚀"
                  }
                  size="lg"
                  bubblePosition="top"
                />

                <h2 className="mt-4 text-2xl md:text-3xl font-black text-slate-800">Kuis Selesai!</h2>
                <p className="mt-2 text-slate-500 font-bold text-sm">
                  Kamu menjawab benar <span className="text-emerald-700 font-black">{score}</span> dari{" "}
                  <span className="font-bold">{questions.length}</span> soal ({score * 10}%)
                </p>

                {/* Score bar */}
                <div className="mt-6 h-4 rounded-full bg-slate-100 overflow-hidden border border-slate-200 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-[#5C9E31] rounded-full transition-all duration-500"
                    style={{ width: `${score * 10}%` }}
                  />
                </div>

                {/* XP Summary card */}
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 inline-flex items-center gap-2.5 text-amber-900 font-black text-sm shadow-xs">
                  <img src={xpIcon} alt="XP" className="size-6 object-contain shrink-0 drop-shadow-xs" />
                  <span>Dapatkan +{score * 10} XP untuk petualanganmu!</span>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5C9E31] hover:bg-[#4E8828] text-white px-6 py-3.5 font-black shadow-[0_5px_0_#3A6B20] hover:-translate-y-0.5 transition cursor-pointer text-sm"
                  >
                    <RotateCcw className="size-4" /> Main Lagi
                  </button>
                  <button
                    onClick={() => setStage("category")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white border-2 border-slate-200 px-6 py-3.5 font-extrabold text-slate-700 hover:bg-slate-50 transition cursor-pointer text-sm"
                  >
                    Pilih Kategori Lain
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border-4 border-emerald-400 relative animate-pop-in">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <span>🎮</span> Cara Bermain
            </h3>
            <div className="space-y-3.5 text-slate-750 font-bold text-sm text-left">
              <div className="flex gap-3">
                <span className="size-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-black">
                  1
                </span>
                <p>Pilih salah satu dari 6 kategori kuis yang ingin kamu mainkan.</p>
              </div>
              <div className="flex gap-3">
                <span className="size-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-black">
                  2
                </span>
                <p>Jawab 10 pertanyaan di tiap sesi kuis (dari total 30 soal yang tersedia per kategori).</p>
              </div>
              <div className="flex gap-3">
                <span className="size-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-black">
                  3
                </span>
                <p>Dapatkan 10 XP untuk setiap jawaban yang benar!</p>
              </div>
              <div className="flex gap-3">
                <span className="size-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-black">
                  4
                </span>
                <p>Kumpulkan XP kuis untuk menaikkan level penjelajahmu.</p>
              </div>
            </div>
            <button
              onClick={() => setShowTutorial(false)}
              className="mt-6 w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md hover:shadow-lg transition cursor-pointer text-sm"
            >
              Mengerti!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
