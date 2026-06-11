import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Heart, Search, Sparkles, Type } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Fable works — Fable" },
      { name: "description", content: "How Fable turns a quiet evening into a reading adventure: pick a story, settle in, and let the page do the rest." },
      { property: "og:title", content: "How Fable works — Fable" },
      { property: "og:description", content: "Pick a story. Settle in. Let the page do the rest." },
    ],
  }),
  component: HowPage,
});

const steps = [
  { icon: Search,     title: "Choose a story",      body: "Search by mood, age, reading level, or how many minutes you have tonight." },
  { icon: BookOpen,   title: "Open the page",       body: "Gentle illustrations, calm typography, a reading view designed for sleepy eyes." },
  { icon: Headphones, title: "Read aloud — or listen", body: "Tap the speaker to hear the story read by a warm voice while children follow along." },
  { icon: Heart,      title: "Save, return, repeat", body: "Bookmark favorites, track reading streaks, and find your way back to comfort stories." },
];

const features = [
  { icon: Type,      title: "Reader-first typography",  body: "Adjustable size, generous line height, a font chosen for early readers — and a soothing dark mode for bedtime." },
  { icon: Sparkles,  title: "Hand-painted everything",  body: "Every cover and inside illustration is original art, not stock — quiet, warm, and a little magical." },
  { icon: Headphones,title: "Natural read-aloud",       body: "A clear narrator voice helps emerging readers follow the rhythm of language at their own pace." },
];

function HowPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="bg-hero-radial">
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">How it works</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">From the cover to "the end" in four little steps.</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">
              Fable is built to disappear into your evening. There are no menus to learn and no boxes to tick — only stories.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl bg-card p-7 shadow-soft hover:shadow-float transition-shadow"
            >
              <div className="font-display text-xs font-bold text-coral">Step {i + 1}</div>
              <div className="mt-3 grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--cream)_60%,white)]">
                <s.icon className="h-5 w-5 text-coral" />
              </div>
              <h3 className="mt-5 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.body}</p>
            </motion.div>
          ))}
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl sm:text-4xl">Designed for little readers.</h2>
          <p className="mt-3 max-w-2xl text-ink-muted">Every detail of Fable is shaped around how children actually read — and how parents actually use a tablet at the end of a long day.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-card p-7 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--mint)_55%,white)]">
                  <f.icon className="h-5 w-5 text-coral" />
                </div>
                <h3 className="mt-5 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-ink-muted">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-mint-grad p-10 sm:p-14 shadow-float text-center">
          <h3 className="font-display text-3xl sm:text-4xl">Ready when you are.</h3>
          <p className="mt-3 text-ink-muted">Open the library and pick the first story together.</p>
          <Link to="/library" className="mt-6 inline-flex rounded-full bg-coral-grad text-primary-foreground px-7 py-3.5 text-sm font-bold shadow-soft hover:shadow-float transition-all">
            Browse the library
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
