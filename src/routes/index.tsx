import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import {
  FeaturedStory, Categories, Trending, StoryOfDay, Testimonials, CTASection, Footer,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fable — Read. Imagine. Grow." },
      { name: "description", content: "A magical children's reading platform. Beautifully illustrated stories that spark imagination and build reading confidence." },
      { property: "og:title", content: "Fable — Read. Imagine. Grow." },
      { property: "og:description", content: "A magical children's reading platform with beautifully illustrated stories." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedStory />
        <Categories />
        <Trending />
        <StoryOfDay />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
