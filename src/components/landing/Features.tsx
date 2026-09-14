import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import mascotBird from "@/assets/mascot-bird.png";
import passportIcon from "@/assets/passport-icon.png";
import xpIcon from "@/assets/xp-icon.png";
import hornbillIcon from "@/assets/hornbill-icon.png";
import badgeIcon from "@/assets/badge-icon.png";
import featuresBg from "@/assets/features-bg.png";
import mapCardIcon from "@/assets/map-card-icon.png";
import missionIcon from "@/assets/mission-icon.png";

export function Features() {
  const featureCards = [
    {
      title: "Jelajahi Peta",
      desc: "Pilih provinsi di peta dan mulailah petualanganmu!",
      customIcon: (
        <img src={mapCardIcon} alt="Jelajahi Peta" className="h-16 w-auto object-contain drop-shadow-md" />
      ),
      bgIcon: "bg-emerald-50/90 border-emerald-100",
    },
    {
      title: "Temukan Kekayaan Nusantara",
      desc: "Kenali budaya, flora, dan fauna khas setiap daerah.",
      customIcon: (
        <img src={hornbillIcon} alt="Kekayaan Nusantara" className="h-16 w-auto object-contain drop-shadow-md" />
      ),
      bgIcon: "bg-amber-50/90 border-amber-100",
    },
    {
      title: "Selesaikan Misi",
      desc: "Kerjakan misi seru dan uji pengetahuanmu lewat kuis.",
      customIcon: (
        <img src={missionIcon} alt="Selesaikan Misi" className="h-16 w-auto object-contain drop-shadow-md" />
      ),
      bgIcon: "bg-[#FFFBEB] border-amber-200",
    },
    {
      title: "Kumpulkan Stempel",
      desc: "Dapatkan stempel dari setiap pencapaianmu.",
      customIcon: (
        <img src={badgeIcon} alt="Stempel" className="h-16 w-auto object-contain drop-shadow-md" />
      ),
      bgIcon: "bg-amber-50/80 border-amber-200/80",
    },
    {
      title: "Isi Paspormu",
      desc: "Kumpulkan stempel dari 38 provinsi dan jadi Explorer sejati!",
      customIcon: (
        <img src={passportIcon} alt="Paspor" className="h-16 w-auto object-contain drop-shadow-md" />
      ),
      bgIcon: "bg-emerald-50/80 border-emerald-200/80",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 font-[family-name:var(--font-body)] overflow-hidden select-none bg-[#FAF6EE]">
      {/* Full Scenic Background Image Layer */}
      <img
        src={featuresBg}
        alt="Features Background Scenic"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section 1: Intro Row (Text Left, Mascot Right) */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-[#3A6B20] font-black text-base md:text-lg mb-2 tracking-wide">
              <span>Kenalan dengan</span>
              <span className="text-amber-500">🌾</span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-[#C84B31] leading-tight tracking-tight drop-shadow-xs">
              Jelajah Nusantara!
            </h2>

            <p className="mt-4 text-slate-700 font-bold text-base md:text-lg leading-relaxed max-w-2xl">
              Jelajah Nusantara adalah petualangan interaktif untuk mengenal kekayaan budaya, flora, dan fauna Indonesia.
            </p>
            <p className="mt-2 text-slate-700 font-bold text-base md:text-lg leading-relaxed max-w-2xl">
              Kamu bisa menjelajah 38 provinsi, menyelesaikan misi seru, mengumpulkan stempel, dan mengisi paspor petualanganmu!
            </p>
          </div>

          {/* Right Mascot Column */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative flex items-center">
              {/* Speech Bubble */}
              <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-amber-200/90 text-xs sm:text-sm font-black text-slate-800 max-w-[220px] sm:max-w-[240px] leading-relaxed z-10 animate-float-gentle relative">
                <span className="block text-amber-900 font-extrabold text-sm mb-1">Halo, Explorer! 🌾</span>
                Aku Janu, siap menemanimu menjelajahi Indonesia yang luar biasa!
                {/* Pointer Arrow pointing to right towards mascot */}
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[12px] border-l-white drop-shadow-xs" />
              </div>

              {/* Green Bird Mascot */}
              <div className="relative shrink-0 -ml-2">
                <img
                  src={mascotBird}
                  alt="Janu Mascot"
                  className="w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.16)] hover:scale-105 transition-transform select-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Subtitle */}
        <div className="text-center mb-12">
          <h3 className="inline-flex items-center gap-2.5 text-center font-black text-xl sm:text-2xl text-[#3A6B20] font-[family-name:var(--font-display)]">
            <span className="text-amber-500 text-lg">✨</span>
            <span>Apa yang bisa kamu lakukan di sini?</span>
            <span className="text-amber-500 text-lg">✨</span>
          </h3>
        </div>

        {/* Section 3: 5 Feature Cards Grid + Wooden Signpost */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative items-stretch">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="bg-white/95 backdrop-blur-xs rounded-3xl p-5 shadow-md border-2 border-amber-100/90 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-between group"
            >
              <div className="w-full flex flex-col items-center">
                {/* Icon Container */}
                <div className="mb-4 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {card.customIcon}
                </div>

                {/* Card Title */}
                <h4 className="text-sm font-black text-slate-800 leading-tight font-[family-name:var(--font-display)]">
                  {card.title}
                </h4>

                {/* Card Description */}
                <p className="text-[11px] font-bold text-slate-500 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Bottom Call-to-Action Banner */}
        <div className="mt-16 max-w-4xl mx-auto rounded-full bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 p-3 sm:p-4 shadow-xl border-2 border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 relative z-20">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="shrink-0 -ml-2">
              <img src={mascotBird} alt="Mascot" className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight font-[family-name:var(--font-display)]">
                Siap jadi bagian dari petualangan ini?
              </h4>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5">
                Ayo jelajahi, belajar, dan banggakan Indonesia!
              </p>
            </div>
          </div>

          <Link
            to="/peta"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#FFB703] hover:bg-[#FB8500] text-slate-950 font-black px-6 py-3.5 text-xs sm:text-sm shadow-md border border-amber-400 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>Mulai Petualangan</span>
            <ArrowRight className="size-4.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
