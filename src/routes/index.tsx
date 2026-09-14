import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jelajah Nusantara — Petualangan Budaya Indonesia" },
      { name: "description", content: "Mulailah petualangan menjelajahi budaya, flora, dan fauna Indonesia. Selesaikan misi, kumpulkan stempel, dan temukan kekayaan unik di setiap dari 38 provinsi Nusantara!" },
      { property: "og:title", content: "Jelajah Nusantara — Edukasi Budaya Indonesia" },
      { property: "og:description", content: "Mulailah petualangan menjelajahi budaya, flora, dan fauna Indonesia. Selesaikan misi, kumpulkan stempel, dan temukan kekayaan unik di setiap dari 38 provinsi Nusantara!" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Features />
    </main>
  );
}
