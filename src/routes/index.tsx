import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { MapPreview } from "@/components/landing/MapPreview";
import { Features } from "@/components/landing/Features";
import { Popular } from "@/components/landing/Popular";
import { QuizTeaser } from "@/components/landing/QuizTeaser";
import { Badges } from "@/components/landing/Badges";
import { CtaFooter } from "@/components/landing/CtaFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jelajah Budaya Nusantara — Petualangan Budaya Indonesia" },
      { name: "description", content: "Belajar 850+ warisan budaya dari 38 provinsi Indonesia lewat peta interaktif, kuis seru, dan lencana. Platform WebGIS edukasi untuk pelajar." },
      { property: "og:title", content: "Jelajah Budaya Nusantara" },
      { property: "og:description", content: "Petualangan budaya Indonesia lewat peta interaktif, kuis, dan lencana." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Stats />
      <MapPreview />
      <Features />
      <Popular />
      <QuizTeaser />
      <Badges />
      <CtaFooter />
    </main>
  );
}
