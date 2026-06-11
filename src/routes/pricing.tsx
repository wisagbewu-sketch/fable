import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Fable" },
      { name: "description", content: "Simple, family-friendly pricing. Start free, then unlock unlimited stories for the whole family." },
      { property: "og:title", content: "Pricing — Fable" },
      { property: "og:description", content: "Unlimited stories, no ads, gentle pricing for families." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Little Reader",
    price: "Free",
    period: "forever",
    tagline: "A taste of the Fable library to get started.",
    features: [
      "10 stories from our library",
      "Read on any device",
      "Always ad-free",
      "Bedtime-ready typography",
    ],
    cta: "Begin reading",
    accent: false,
  },
  {
    name: "Family",
    price: "$6.99",
    period: "per month",
    tagline: "Unlimited stories for up to 4 little readers.",
    features: [
      "Every story in the library",
      "Up to 4 child profiles",
      "Read-aloud voice for every story",
      "Bookmarks, streaks & reading time",
      "New stories every week",
      "Cancel anytime",
    ],
    cta: "Start 7-day free trial",
    accent: true,
  },
  {
    name: "Classroom",
    price: "$24",
    period: "per month",
    tagline: "For teachers, librarians, and reading groups.",
    features: [
      "Up to 30 student profiles",
      "Reading level controls",
      "Teacher dashboard",
      "Printable activity sheets",
      "Priority support",
    ],
    cta: "Talk to us",
    accent: false,
  },
];

const faqs = [
  { q: "Is there really a free plan?", a: "Yes — ten full stories, always ad-free. No credit card required to start." },
  { q: "Can I cancel anytime?", a: "Of course. Subscriptions can be canceled in one tap from your account page." },
  { q: "Is Fable safe for children?", a: "Fable has no ads, no third-party trackers in the reading view, and no chat features. Every story is written by a human and gently reviewed." },
  { q: "What ages are stories written for?", a: "Our stories span ages 3 to 10, organized by age group and reading level so you can find the right fit." },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="bg-hero-radial">
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 text-center sm:px-8 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Pricing</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">Simple plans. Endless stories.</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted">
              Start free. Upgrade when your little reader wants more. Cancel any time.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-[2rem] p-8 shadow-soft hover:shadow-float transition-all ${
                p.accent ? "bg-coral-grad text-primary-foreground lg:-mt-4 lg:mb-4" : "bg-card"
              }`}
            >
              {p.accent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-card text-ink px-3 py-1 text-[11px] font-bold shadow-soft">
                  <Sparkles className="h-3 w-3 text-coral" /> Most loved
                </span>
              )}
              <p className={`text-xs font-bold uppercase tracking-wider ${p.accent ? "text-white/80" : "text-coral"}`}>{p.name}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-5xl">{p.price}</span>
                <span className={`text-sm font-semibold ${p.accent ? "text-white/85" : "text-ink-muted"}`}>{p.period}</span>
              </div>
              <p className={`mt-3 text-sm ${p.accent ? "text-white/90" : "text-ink-muted"}`}>{p.tagline}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full ${p.accent ? "bg-white/20" : "bg-[color-mix(in_oklab,var(--mint)_50%,white)]"}`}>
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="font-semibold">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={p.name === "Classroom" ? "/contact" : "/library"}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold transition-all ${
                  p.accent ? "bg-card text-ink hover:-translate-y-0.5 shadow-soft" : "bg-coral-grad text-primary-foreground shadow-soft hover:shadow-float"
                }`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <section className="mt-24">
          <h2 className="font-display text-3xl sm:text-4xl text-center">Common questions</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4">
            {faqs.map(f => (
              <details key={f.q} className="group rounded-3xl bg-card p-6 shadow-soft open:shadow-float transition-shadow">
                <summary className="cursor-pointer list-none font-display text-lg flex items-center justify-between">
                  {f.q}
                  <span className="text-coral transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
