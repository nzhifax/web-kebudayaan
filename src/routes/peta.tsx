import { createFileRoute } from "@tanstack/react-router";
import { AdventureMap } from "@/components/adventure/AdventureMap";

type PetaSearch = {
  passport?: boolean;
};

export const Route = createFileRoute("/peta")({
  validateSearch: (search: Record<string, unknown>): PetaSearch => {
    return {
      passport: search.passport === "true" || search.passport === true,
    };
  },
  head: () => ({
    meta: [
      { title: "Peta Interaktif — Jelajah Nusantara" },
      {
        name: "description",
        content:
          "Jelajahi 38 provinsi Indonesia lewat peta petualangan interaktif bergaya kartun. Kumpulkan stempel Paspor Nusantara, buka kabut misteri, dan raih XP budaya!",
      },
      { property: "og:title", content: "Peta Interaktif — Jelajah Nusantara" },
      { property: "og:description", content: "Petualangan budaya Indonesia lewat peta interaktif kartun, kuis, dan stempel." },
    ],
  }),
  component: PetaPage,
});

function PetaPage() {
  const search = Route.useSearch();
  return (
    <main className="h-screen w-screen overflow-hidden font-[family-name:var(--font-body)] text-foreground bg-[#F8F6F2]">
      <AdventureMap initialPassportOpen={search.passport} />
    </main>
  );
}
