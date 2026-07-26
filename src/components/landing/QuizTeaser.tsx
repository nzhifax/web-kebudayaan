import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import boy from "@/assets/mascot-boy.png";

const options = [
  { id: "a", label: "Bali" },
  { id: "b", label: "Papua" },
  { id: "c", label: "Sumatera Barat", correct: true },
  { id: "d", label: "NTB" },
];

export function QuizTeaser() {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const correct = picked === "c";

  return (
    <section id="kuis" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="inline-block bg-terracotta text-terracotta-foreground rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              Kuis
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Belajar sambil main.
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Jawab kuis di tiap provinsi, kumpulkan XP, dan naik ke level Master Nusantara. Salah? Maskot kami akan menyemangati kamu untuk coba lagi!
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-4 rounded-full bg-cream overflow-hidden border border-border">
                <div className="h-full w-[21%] bg-gradient-to-r from-forest to-ocean rounded-full" />
              </div>
              <span className="font-bold text-foreground">21%</span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <img src={boy} alt="" className="w-24 h-auto animate-bob" width={768} height={1024} />
              <div className="card-soft rounded-2xl px-4 py-3 max-w-xs">
                <div className="text-xs font-bold text-terracotta uppercase">Tips Maskot</div>
                <div className="font-semibold text-foreground">"Ingat, rumahnya beratap seperti tanduk kerbau!"</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-soft rounded-[2rem] p-6 md:p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-full bg-gold text-gold-foreground px-3 py-1 text-sm font-bold">Soal 3 / 10</span>
                <span className="flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-sm font-bold text-foreground">
                  <Sparkles className="size-4 text-terracotta" /> +20 XP
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
