import { MascotWidget } from "@/components/ui/MascotWidget";

export function GuideBanner() {
  const explorationTips = [
    "Klik provinsi di peta untuk menjelajahi tarian, rumah adat, & kebudayaan unik!",
    "Kumpulkan semua stempel provinsi di Paspor Petualang milikmu! 🛂",
    "Mainkan Kuis Kebudayaan untuk mendapatkan XP & lencana prestasi! 🏆",
    "Tahukah kamu? Indonesia memiliki lebih dari 17.000 pulau yang mempesona! 🇮🇩",
  ];

  return (
    <div className="absolute bottom-4 left-4 z-30 font-[family-name:var(--font-body)] pointer-events-auto">
      <MascotWidget
        variant="bird"
        mood="guide"
        title="Tips Petualangan"
        message={explorationTips}
        size="lg"
        bubblePosition="right"
      />
    </div>
  );
}

