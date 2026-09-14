import { useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, X, Award, CheckCircle } from "lucide-react";
import { MascotWidget } from "@/components/ui/MascotWidget";

export type ChestData = {
  id: string;
  lat: number;
  lng: number;
  island: string;
  xpReward: number;
  funFact: string;
  sticker: string;
};

export const CHESTS: ChestData[] = [
  {
    id: "chest-sumatera",
    lat: 1.5,
    lng: 100.5,
    island: "Sumatera",
    xpReward: 50,
    funFact: "Tahukah kamu? Bunga Rafflesia Arnoldii di Sumatra bisa tumbuh hingga diameter seluas 1 meter!",
    sticker: "🌺 Bunga Raksasa",
  },
  {
    id: "chest-jawa",
    lat: -7.5,
    lng: 110.0,
    island: "Jawa",
    xpReward: 50,
    funFact: "Wayang Kulit ciptaan Sunan Kalijaga adalah seni pertunjukan bayangan tertua di Indonesia!",
    sticker: "🎭 Topeng Wayang",
  },
  {
    id: "chest-kalimantan",
    lat: -1.0,
    lng: 113.5,
    island: "Kalimantan",
    xpReward: 60,
    funFact: "Orangutan Kalimantan adalah kera besar tercerdas yang pandai membuat sarang dari ranting pohon!",
    sticker: "🦧 Sahabat Hutan",
  },
  {
    id: "chest-sulawesi",
    lat: -2.0,
    lng: 121.0,
    island: "Sulawesi",
    xpReward: 60,
    funFact: "Kapal Pinisi dari Bulukumba dibuat tanpa paku besi dan telah menjelajahi seluruh lautan dunia!",
    sticker: "⛵ Kapal Pinisi",
  },
  {
    id: "chest-bali",
    lat: -8.5,
    lng: 116.5,
    island: "Bali & Nusa Tenggara",
    xpReward: 70,
    funFact: "Komodo di NTT adalah kadal terbesar di dunia yang sudah hidup sejak zaman purbakala!",
    sticker: "🦎 Naga Purba",
  },
  {
    id: "chest-papua",
    lat: -3.5,
    lng: 138.0,
    island: "Papua",
    xpReward: 80,
    funFact: "Burung Cendrawasih Papua sering dijuluki 'Bird of Paradise' karena keindahan bulunya yang berkilau!",
    sticker: "🦜 Burung Surga",
  },
];

function makeChestIcon(isOpen: boolean) {
  return L.divIcon({
    className: "treasure-marker",
    html: `
      <div style="
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: ${isOpen ? "rgba(226, 232, 240, 0.9)" : "linear-gradient(135deg, #F59E0B, #D97706)"};
        border: 3px solid white;
        box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        display: grid;
        place-items: center;
        font-size: 22px;
        transform: translate(-50%, -50%);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
        animation: ${isOpen ? "none" : "chest-wiggle 3s ease-in-out infinite"};
      ">
        <span>${isOpen ? "📦" : "🎁"}</span>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}

type Props = {
  chest: ChestData;
  isOpen: boolean;
  onOpen: (chest: ChestData) => void;
};

export function TreasureChestMarker({ chest, isOpen, onOpen }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      onOpen(chest);
    }
    setModalOpen(true);
  };

  return (
    <>
      <Marker
        position={[chest.lat, chest.lng]}
        icon={makeChestIcon(isOpen)}
        eventHandlers={{
          click: handleClick,
        }}
      />

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center border-4 border-amber-400 font-[family-name:var(--font-body)]"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 size-8 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500 font-bold transition-colors z-10"
              >
                <X className="size-4" />
              </button>

              {/* Mascot Treasure Hunter Companion */}
              <div className="flex justify-center mb-2">
                <MascotWidget
                  variant="explorer"
                  mood="celebrate"
                  title={`Harta Karun ${chest.island}`}
                  message={`Hore! Peti rahasia di ${chest.island} berhasil kamu buka! 🗝️`}
                  size="sm"
                  bubblePosition="bottom"
                />
              </div>

              <div className="mx-auto size-16 rounded-3xl bg-gradient-to-br from-amber-200 to-yellow-400 grid place-items-center text-3xl mb-3 border-2 border-amber-300 shadow-inner animate-bounce">
                🎁
              </div>

              <h3 className="text-xl font-black text-slate-800">
                Selamat! Harta Karun Menemukanmu!
              </h3>

              <div className="my-4 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-left space-y-2.5">
                <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                  <Sparkles className="size-4 text-amber-500 shrink-0" />
                  <span>Bonus XP: +{chest.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-2 text-purple-800 font-extrabold text-sm">
                  <Award className="size-4 text-purple-500 shrink-0" />
                  <span>Stiker Koleksi: {chest.sticker}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-bold bg-white/80 p-2.5 rounded-xl border border-amber-100">
                  "{chest.funFact}"
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold py-3.5 shadow-lg hover:from-amber-600 hover:to-amber-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Gift className="size-4" /> Simpan Ke Koleksi
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
