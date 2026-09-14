import { useState } from "react";
import { Sparkles, Check, X } from "lucide-react";
import mascotBird from "@/assets/mascot-bird.png";
import xpIcon from "@/assets/xp-icon.png";

type Option = {
  id: string;
  label: string;
  correct?: boolean;
};

export function QuizTeaser() {
  const [picked, setPicked] = useState<string | null>(null);

  const options: Option[] = [
    { id: "a", label: "Sumatera Utara" },
    { id: "b", label: "Sumatera Barat", correct: true },
    { id: "c", label: "Riau" },
    { id: "d", label: "Jambi" },
  ];

  const answered = picked !== null;
  const correct = picked === "b";

  return (
    <section className="relative py-24 md:py-32 bg-white font-[family-name:var(--font-body)] overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="badge-pill mb-4 inline-flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" /> Kuis Interaktif
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black text-foreground mb-4">
              Uji Pengetahuan Budayamu!
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-semibold">
              Jawab kuis di tiap provinsi, kumpulkan XP, dan naik ke level Master Nusantara. Salah? Maskot kami akan menyemangati kamu untuk coba lagi!
            </p>

            {/* Mascot Tip */}
            <div className="card-soft rounded-3xl p-5 flex items-center gap-4 border-2 border-border/80">
              <img src={mascotBird} alt="Maskot Burung" className="size-16 object-contain" />
              <div>
                <div className="text-xs font-bold text-terracotta uppercase">Tips Maskot</div>
                <div className="font-semibold text-foreground">"Ingat, rumahnya beratap seperti tanduk kerbau!"</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-soft rounded-[2rem] p-6 md:p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-full bg-gold text-gold-foreground px-3 py-1 text-sm font-bold">Soal 3 / 10</span>
                <span className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm font-bold text-foreground">
                  <img src={xpIcon} alt="XP" className="size-4.5 object-contain" /> +20 XP
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Rumah Gadang berasal dari provinsi...
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {options.map((o) => {
                  const isPicked = picked === o.id;
                  const showCorrect = answered && o.correct;
                  const showWrong = answered && isPicked && !o.correct;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setPicked(o.id)}
                      disabled={answered}
                      className={[
                        "flex items-center gap-3 rounded-2xl px-5 py-4 text-left font-bold border-2 transition",
                        showCorrect ? "border-forest bg-forest/10 text-forest" :
                        showWrong ? "border-destructive bg-destructive/10 text-destructive" :
                        "border-border bg-white hover:border-ocean hover:-translate-y-0.5",
                      ].join(" ")}
                    >
                      <span className={`size-9 grid place-items-center rounded-xl font-bold ${
                        showCorrect ? "bg-forest text-white" :
                        showWrong ? "bg-destructive text-white" :
                        "bg-cream text-foreground"
                      }`}>
                        {showCorrect ? <Check className="size-5" /> : showWrong ? <X className="size-5" /> : o.id.toUpperCase()}
                      </span>
                      <span>{o.label}</span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`mt-6 rounded-2xl p-4 font-bold text-lg animate-pop-in ${correct ? "bg-forest/10 text-forest" : "bg-terracotta/10 text-terracotta"}`}>
                  {correct ? "🎉 Benar! +20 XP" : "Ups, coba lagi ya! Rumah Gadang berasal dari Sumatera Barat."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
