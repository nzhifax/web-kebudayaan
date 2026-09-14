import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import kecak from "@/assets/culture-kecak.jpg";
import gadang from "@/assets/culture-gadang.jpg";
import angklung from "@/assets/culture-angklung.jpg";
import reog from "@/assets/culture-reog.jpg";
import wayang from "@/assets/culture-wayang.jpg";
import batik from "@/assets/culture-batik.jpg";

const islands = [
  {
    name: "Sumatera",
    count: "10 Provinsi",
    icon: "🗡️",
    highlight: "Rumah Gadang & Tari Saman",
    img: gadang,
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Jawa",
    count: "6 Provinsi",
    icon: "🎭",
    highlight: "Angklung, Wayang & Reog",
    img: angklung,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Kalimantan",
    count: "5 Provinsi",
    icon: "🏞️",
    highlight: "Tari Mandau & Rumah Betang",
    img: batik,
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Sulawesi",
    count: "6 Provinsi",
    icon: "⛵",
    highlight: "Perahu Pinisi & Rumah Tongkonan",
    img: wayang,
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Bali & Nusa Tenggara",
    count: "3 Provinsi",
    icon: "🏝️",
    highlight: "Tari Kecak & Rumah Mbaru Niang",
    img: kecak,
    color: "from-rose-500 to-red-600",
  },
  {
    name: "Maluku & Papua",
    count: "8 Provinsi",
    icon: "🕊️",
    highlight: "Tari Cendrawasih & Rumah Honai",
    img: reog,
    color: "from-teal-500 to-emerald-700",
  },
];

export function Popular() {
  return (
    <section id="provinsi" className="relative py-24 md:py-32 bg-white font-[family-name:var(--font-body)] overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-black mb-3">
              <MapPin className="size-4 text-blue-600" />
              <span>Jelajah Wilayah</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Jelajahi 38 Provinsi Nusantara
            </h2>
            <p className="mt-2 text-base text-slate-600 font-bold max-w-lg">
              Setiap pulau memiliki keunikan budaya, musik, dan cerita rakyatnya masing-masing.
            </p>
          </div>

          <Link
            to="/peta"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 text-xs shadow-lg transition-all"
          >
            <span>Buka Peta Interaktif</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Islands Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {islands.map((island) => (
            <Link
              key={island.name}
              to="/peta"
              className="group relative rounded-[2.5rem] overflow-hidden bg-slate-900 p-7 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[300px] flex flex-col justify-between"
            >
              {/* Background Thumbnail Image */}
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
                <img
                  src={island.img}
                  alt={island.name}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              {/* Top Row: Icon & Count */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 grid place-items-center text-2xl shadow-md">
                  {island.icon}
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-black">
                  {island.count}
                </span>
              </div>

              {/* Bottom Row: Island Info */}
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight mb-1 text-amber-300">
                  {island.name}
                </h3>
                <p className="text-xs font-bold text-slate-200">
                  ✨ {island.highlight}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                  <span>Mulai Jelajah</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
