const badges = [
  { name: "Explorer Aceh", emoji: "🕌", color: "from-forest to-ocean" },
  { name: "Explorer Bali", emoji: "🔥", color: "from-terracotta to-gold" },
  { name: "Explorer Jawa", emoji: "🏯", color: "from-gold to-terracotta" },
  { name: "Pecinta Seni", emoji: "🎭", color: "from-ocean to-forest" },
  { name: "Warisan Lestari", emoji: "🌿", color: "from-forest to-gold" },
  { name: "Master Nusantara", emoji: "👑", color: "from-terracotta to-ocean" },
];

export function Badges() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-gold text-gold-foreground rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            Lencana
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Kumpulkan semua lencananya</h2>
          <p className="mt-3 text-lg text-muted-foreground">Selesaikan misi tiap provinsi untuk membuka lencana eksklusif.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {badges.map((b) => (
            <div key={b.name} className="text-center group">
              <div className={`mx-auto size-28 rounded-[2rem] bg-gradient-to-br ${b.color} grid place-items-center text-5xl shadow-[var(--shadow-pop)] group-hover:-translate-y-2 group-hover:rotate-[-4deg] transition`}>
                <span className="drop-shadow-md">{b.emoji}</span>
              </div>
              <div className="mt-3 font-bold text-foreground">{b.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
