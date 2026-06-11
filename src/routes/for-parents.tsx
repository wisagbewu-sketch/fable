import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Moon, Clock, ChartLine, EyeOff, BookOpen } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/for-parents")({
  head: () => ({
    meta: [
      { title: "For parents — Fable" },
      { name: "description", content: "A calm, ad-free reading app you can hand your child without worry. Designed with parents, paediatricians, and teachers." },
      { property: "og:title", content: "For parents — Fable" },
      { property: "og:description", content: "Calm, ad-free, and made with parents in mind." },
    ],
  }),
  component: ParentsPage,
});

const promises = [
  { icon: EyeOff,    title: "No ads, ever",            body: "Not a single banner, pre-roll, or sponsored anything. Children read, that's it." },
  { icon: Shield,    title: "Privacy by design",       body: "We don't sell data, don't share with advertisers, and only collect what's needed to save your reading." },
  { icon: Moon,      title: "Built for bedtime",       body: "Dimmable theme, gentle motion, and no autoplaying anything to keep wind-down peaceful." },
  { icon: Clock,     title: "Reading time, not screen time", body: "Parents can set quiet hours and per-day reading windows that fit your evening." },
  { icon: ChartLine, title: "Quiet progress",          body: "See what your child is reading without turning it into a leaderboard. Encouragement, not pressure." },
  { icon: BookOpen,  title: "Real books, just digital", body: "Every story is written by a human, illustrated by hand, and lightly reviewed for tone and content." },
];

function ParentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="bg-hero-radial">
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">For parents</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">A screen that finally feels like a bookshelf.</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">
              Fable is the app we built because we couldn't find one we trusted for our own children. Calm, beautiful,
              respectful of attention, and entirely free of the loud patterns that follow children around the rest of the web.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <section>
          <h2 className="font-display text-3xl sm:text-4xl">Our promises to your family</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-3xl bg-card p-7 shadow-soft hover:shadow-float transition-shadow"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--peach)_55%,white)]">
                  <p.icon className="h-5 w-5 text-coral" />
                </div>
                <h3 className="mt-5 font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-card p-10 sm:p-14 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl">What you'll get on the family plan</h3>
              <p className="mt-3 text-ink-muted">Unlimited stories, four child profiles, parent dashboard, and the gentlest interface in your evening rotation.</p>
              <Link to="/pricing" className="mt-6 inline-flex rounded-full bg-coral-grad text-primary-foreground px-7 py-3.5 text-sm font-bold shadow-soft hover:shadow-float transition-all">
                See pricing
              </Link>
            </div>
            <ul className="grid gap-3 text-sm">
              {[
                "Unlimited access to the full library",
                "Up to 4 personalised child profiles",
                "Reading-level filters per profile",
                "Quiet-hours and bedtime scheduling",
                "Weekly story recommendations by email",
                "Cancel anytime, no awkward funnels",
              ].map(item => (
                <li key={item} className="rounded-2xl bg-muted px-4 py-3 font-semibold">{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
