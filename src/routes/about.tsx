import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookHeart, Feather, Sparkles, Users } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Fable" },
      { name: "description", content: "Fable is a magical reading platform built by writers, illustrators, and parents who believe in the quiet power of a good story." },
      { property: "og:title", content: "About — Fable" },
      { property: "og:description", content: "The team and the why behind Fable." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: BookHeart, title: "Reading first", body: "No badges, no slot machines, no shouting cartoons. Just stories, beautifully told." },
  { icon: Feather,   title: "Made by humans", body: "Every Fable story is written by a real author and illustrated by hand. No filler." },
  { icon: Sparkles,  title: "Quietly magical", body: "We design for warmth and wonder, not stimulation. Reading should feel like a soft blanket." },
  { icon: Users,     title: "For families",   body: "Fable lives gently in your evenings — together on the couch, or curled up alone." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="bg-hero-radial">
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">About</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">Stories worth slowing down for.</h1>
            <p className="mt-5 max-w-3xl text-lg text-ink-muted">
              Fable began at bedtime — three friends, three small children, and the same realization on the same night:
              the children's apps we had were loud, busy, and a little exhausting. We wanted a place that felt like
              the picture books we loved as kids, just gently brought to life.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <section>
          <h2 className="font-display text-3xl sm:text-4xl">What we believe</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-3xl bg-card p-7 shadow-soft hover:shadow-float transition-shadow"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--mint)_55%,white)]">
                  <v.icon className="h-5 w-5 text-coral" />
                </div>
                <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-ink-muted">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">A small studio of writers and illustrators.</h2>
            <p className="mt-4 text-ink-muted text-lg">
              We commission every Fable story from working authors and pair each one with a hand-painted illustration set.
              Our editors are former librarians, teachers, and parents — and the bar is simple: would we read this to our own kids?
            </p>
            <p className="mt-4 text-ink-muted">
              We're a tiny team based across three time zones, working slowly on purpose.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["Iris Ashford", "Noor Karim", "June Park", "Sam Okafor", "Luca Romano", "Elena Vasquez"].map((name) => (
              <div key={name} className="rounded-3xl bg-card p-4 shadow-soft text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-mint-grad" />
                <p className="mt-3 font-display text-sm leading-tight">{name}</p>
                <p className="text-[11px] font-semibold text-ink-muted">Author</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-coral-grad p-10 sm:p-14 text-primary-foreground shadow-float text-center">
          <h3 className="font-display text-3xl sm:text-4xl">Come read with us.</h3>
          <p className="mt-3 text-white/90">Start with ten free stories. No card, no clutter.</p>
          <Link to="/library" className="mt-6 inline-flex rounded-full bg-card text-ink px-7 py-3.5 text-sm font-bold shadow-soft hover:-translate-y-0.5 transition-all">
            Browse the library
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
