import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X, Sparkles, Trophy, RotateCcw, Compass } from "lucide-react";
import { useMemo, useState } from "react";
import { provinces } from "@/lib/provinces-data";

type Question = {
  q: string;
  options: string[];
  answer: number;
  fun: string;
};

function buildQuestions(): Question[] {
  const rng = () => Math.random();
  const shuffle = <T,>(a: T[]) => [...a].sort(() => rng() - 0.5);
  const pick = <T,>(a: T[], n: number) => shuffle(a).slice(0, n);

  const pool = shuffle(provinces).slice(0, 8);
  return pool.map((p) => {
    const field = pick(["rumahAdat", "tarian", "makanan", "alatMusik"] as const, 1)[0];
    const labels = { rumahAdat: "rumah adat", tarian: "tarian", makanan: "makanan khas", alatMusik: "alat musik" };
    const correct = p[field];
    const wrongs = pick(
      provinces.filter((x) => x.id !== p.id).map((x) => x[field]).filter((v) => v !== correct),
      3,
    );
    const options = shuffle([correct, ...wrongs]);
    return {
      q: `Apa ${labels[field]} khas dari ${p.name}?`,
      options,
      answer: options.indexOf(correct),
      fun: `${p.emoji} ${p.name}: ${p.cerita}`,
    };
  });
}

export const Route = createFileRoute("/kuis")({
  head: () => ({
    meta: [
      { title: "Kuis Budaya Nusantara — Uji Pengetahuanmu" },
      { name: "description", content: "Kuis interaktif seputar rumah adat, tarian, kuliner, dan alat musik 38 provinsi Indonesia. Kumpulkan skor & lencana." },
      { property: "og:title", content: "Kuis Budaya Nusantara" },
      { property: "og:description", content: "Uji pengetahuan budayamu dan kumpulkan lencana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KuisPage,
});

function KuisPage() {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => buildQuestions(), [seed]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (isLast) return setDone(true);
    setIdx((i) => i + 1);
    setPicked(null);
  };
  const reset = () => {
    setSeed((s) => s + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const percent = Math.round((score / questions.length) * 100);
  const badge =
    percent >= 90 ? { name: "Duta Budaya", emoji: "👑", color: "bg-gold text-gold-foreground" } :
    percent >= 70 ? { name: "Pelestari", emoji: "🏆", color: "bg-terracotta text-terracotta-foreground" } :
    percent >= 40 ? { name: "Penjelajah", emoji: "🧭", color: "bg-ocean text-ocean-foreground" } :
    { name: "Pemula", emoji: "🌱", color: "bg-forest text-forest-foreground" };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky/40 via-background to-cream">
      <header className="mx-auto max-w-4xl px-4 md:px-6 pt-5 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-terracotta">
          <ArrowLeft className="size-4" /> Beranda
        </Link>
        <div className="inline-flex items-center gap-2">
          <div className="size-9 rounded-xl bg-terracotta grid place-items-center">
            <Compass className="size-5 text-terracotta-foreground" strokeWidth={2.5} />
          </div>
          <div className="font-bold text-foreground">Kuis Budaya</div>
        </div>
        <Link to="/peta" className="text-sm font-semibold text-foreground hover:text-terracotta">Peta</Link>
      </header>

      <section className="mx-auto max-w-2xl px-4 md:px-6 py-10">
        {!done ? (
          <>
            <div className="flex items-center justify-between text-sm font-bold text-foreground/70 mb-3">
              <span>Soal {idx + 1} / {questions.length}</span>
              <span className="inline-flex items-center gap-1"><Trophy className="size-4 text-gold-foreground" /> Skor: {score}</span>
            </div>
            <div className="h-3 rounded-full bg-white overflow-hidden border border-border">
              <div className="h-full bg-terracotta transition-all" style={{ width: `${((idx + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
            </div>

            <div className="mt-6 rounded-3xl bg-white p-6 md:p-8 shadow-[var(--shadow-card)] border border-white animate-pop-in" key={idx}>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/40 text-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="size-3.5" /> Pertanyaan
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground leading-tight">{q.q}</h2>

              <div className="mt-6 grid gap-3">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.answer;
                  const isPicked = picked === i;
                  const revealed = picked !== null;
                  const tone = !revealed
                    ? "bg-cream border-border hover:border-terracotta hover:bg-white"
                    : isCorrect
                    ? "bg-forest/15 border-forest text-forest"
                    : isPicked
                    ? "bg-destructive/10 border-destructive text-destructive"
                    : "bg-white border-border opacity-70";
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={`text-left rounded-2xl border-2 px-4 py-3.5 font-semibold transition flex items-center justify-between gap-3 ${tone}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="size-8 rounded-xl bg-white grid place-items-center border border-border font-bold text-foreground">{String.fromCharCode(65 + i)}</span>
                        <span className="text-foreground">{opt}</span>
                      </span>
                      {revealed && isCorrect && <Check className="size-5 text-forest" />}
                      {revealed && isPicked && !isCorrect && <X className="size-5 text-destructive" />}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className="mt-5 rounded-2xl bg-sky/40 border border-ocean/30 p-4 text-sm text-foreground/90 animate-pop-in">
                  💡 {q.fun}
                </div>
              )}

              <button
                onClick={next}
                disabled={picked === null}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta text-terracotta-foreground py-3.5 font-bold shadow-[0_5px_0_oklch(0.45_0.16_35)] disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 transition"
              >
                {isLast ? "Lihat Hasil" : "Lanjut"} <Sparkles className="size-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-[var(--shadow-card)] border border-white text-center animate-pop-in">
            <div className={`mx-auto size-24 rounded-3xl grid place-items-center text-5xl ${badge.color} shadow-[0_8px_0_rgba(0,0,0,0.15)]`}>
              {badge.emoji}
            </div>
            <h2 className="mt-5 text-3xl font-bold text-foreground">Kamu {badge.name}!</h2>
            <p className="mt-1 text-muted-foreground">Skor kamu {score} dari {questions.length} ({percent}%)</p>

            <div className="mt-6 h-4 rounded-full bg-cream overflow-hidden">
              <div className="h-full bg-gradient-to-r from-terracotta via-gold to-forest transition-all" style={{ width: `${percent}%` }} />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta text-terracotta-foreground px-5 py-3 font-bold shadow-[0_5px_0_oklch(0.45_0.16_35)] hover:-translate-y-0.5 transition">
                <RotateCcw className="size-4" /> Main Lagi
              </button>
              <Link to="/peta" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white border-2 border-border px-5 py-3 font-bold text-foreground hover:bg-cream transition">
                Jelajahi Peta
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
