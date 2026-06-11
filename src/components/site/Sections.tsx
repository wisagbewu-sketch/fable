import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Heart, Moon, Rocket, Sparkles, Sprout, Star, Wand2 } from "lucide-react";
import { StoryCard } from "./StoryCard";
import { stories } from "@/data/stories";
import fox from "@/assets/story-fox.jpg";
import potd from "@/assets/story-of-day.jpg";


const categories = [
  { name: "Adventure", icon: Compass, tint: "bg-[color-mix(in_oklab,var(--coral)_30%,white)]" },
  { name: "Bedtime",   icon: Moon,    tint: "bg-[color-mix(in_oklab,var(--mint)_55%,white)]" },
  { name: "Kindness",  icon: Heart,   tint: "bg-[color-mix(in_oklab,var(--peach)_55%,white)]" },
  { name: "Science",   icon: Rocket,  tint: "bg-[color-mix(in_oklab,var(--teal)_50%,white)]" },
  { name: "Nature",    icon: Sprout,  tint: "bg-[color-mix(in_oklab,var(--cream)_60%,white)]" },
  { name: "Magic",     icon: Wand2,   tint: "bg-[color-mix(in_oklab,var(--gold)_45%,white)]" },
];

function SectionHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      </div>
      {action && (
        <Link to="/library" className="hidden sm:inline-flex items-center gap-1 rounded-full bg-card px-4 py-2 text-sm font-bold shadow-soft hover:shadow-float transition-all">
          {action} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}


export function FeaturedStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Featured" title="A story everyone is reading" />
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="grid overflow-hidden rounded-[2rem] bg-card shadow-float lg:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative aspect-[4/3] lg:aspect-auto bg-mint-grad">
          <img src={fox} alt="The Lantern Fox" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-[color-mix(in_oklab,var(--gold)_40%,white)] px-3 py-1 text-xs font-bold">
            <Star className="h-3.5 w-3.5 text-coral" /> Editor's pick
          </span>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl">The Lantern Fox</h3>
          <p className="mt-3 text-ink-muted">
            On the longest night of the year, a little fox lights a lantern and walks into the snowy birch forest
            to bring courage to a friend who is afraid of the dark.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Adventure", "Ages 5–8", "7 min read", "Level 2"].map(t => (
              <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-ink-muted">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/story/$slug" params={{ slug: "the-lantern-fox" }}
              className="inline-flex items-center gap-2 rounded-full bg-coral-grad text-primary-foreground px-6 py-3 text-sm font-bold shadow-soft hover:shadow-float hover:-translate-y-0.5 transition-all">
              Read now <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="rounded-full bg-muted px-6 py-3 text-sm font-bold hover:bg-secondary transition-colors">Save for later</button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Browse" title="Find a world to wander into" action="All categories" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link to="/library" className={`group block rounded-3xl ${c.tint} p-5 shadow-soft hover:shadow-float hover:-translate-y-1 transition-all`}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-soft">
                <c.icon className="h-5 w-5 text-coral" />
              </div>
              <p className="mt-6 font-display text-lg">{c.name}</p>
              <p className="text-xs font-semibold text-ink-muted">Explore →</p>
            </Link>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export function Trending() {
  return (
    <section id="trending" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Trending this week" title="Stories children can't put down" action="See all" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {stories.slice(0, 6).map((s, i) => <StoryCard key={s.title} story={s} index={i} />)}
      </div>
    </section>
  );
}

export function StoryOfDay() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] shadow-float"
      >
        <img src={potd} alt="Story of the day" loading="lazy" className="h-[420px] w-full object-cover sm:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklab,var(--ink)_55%,transparent)] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end p-8 sm:p-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-coral" /> Story of the day
            </span>
            <h3 className="mt-4 font-display text-4xl text-white sm:text-5xl drop-shadow">
              The Whale Who Carried a Lighthouse
            </h3>
            <p className="mt-3 text-white/90 sm:text-lg drop-shadow">
              A gentle tale about helping strangers find their way home.
            </p>
            <Link to="/story/$slug" params={{ slug: "the-whale-who-carried-a-lighthouse" }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-bold text-ink shadow-soft hover:shadow-float transition-all">
              Read tonight <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

const testimonials = [
  { quote: "My daughter actually asks for reading time now. The illustrations feel like a gentle hug.", name: "Amelia R.", role: "Parent of two" },
  { quote: "Finally, a kids' app that doesn't feel like a slot machine. Calm, beautiful, thoughtful.", name: "Daniel K.", role: "Dad & teacher" },
  { quote: "We read one Fable story every night before bed. It's our favorite ritual.", name: "Priya S.", role: "Parent" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Loved by parents" title="A library families trust" />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-3xl bg-card p-7 shadow-soft hover:shadow-float transition-shadow"
          >
            <div className="flex gap-1 text-coral">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 font-display text-xl leading-snug">"{t.quote}"</blockquote>
            <figcaption className="mt-6 text-sm font-semibold text-ink-muted">
              <span className="text-foreground">{t.name}</span> · {t.role}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-coral-grad p-10 sm:p-16 text-primary-foreground shadow-float">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/15 blur-3xl" aria-hidden />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h3 className="font-display text-4xl sm:text-5xl">Begin your child's reading adventure tonight.</h3>
            <p className="mt-4 max-w-xl text-white/90 text-lg">Unlimited stories, no ads, made by writers and illustrators who love children's books.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/pricing" className="rounded-full bg-card px-7 py-3.5 text-base font-bold text-ink shadow-soft hover:-translate-y-0.5 transition-all">Start free trial</Link>
            <Link to="/pricing" className="rounded-full bg-white/15 backdrop-blur px-7 py-3.5 text-base font-bold text-white hover:bg-white/25 transition-colors">See pricing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type FooterLink = { label: string; to: string };
const footerCols: { h: string; l: FooterLink[] }[] = [
  { h: "Read", l: [
    { label: "Library", to: "/library" },
    { label: "How it works", to: "/how-it-works" },
    { label: "For parents", to: "/for-parents" },
  ]},
  { h: "Fable", l: [
    { label: "About", to: "/about" },
    { label: "Pricing", to: "/pricing" },
    { label: "Contact", to: "/contact" },
  ]},
  { h: "Start", l: [
    { label: "Browse stories", to: "/library" },
    { label: "Begin free trial", to: "/pricing" },
  ]},
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color-mix(in_oklab,var(--cream)_25%,var(--background))]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl">Fable</div>
          <p className="mt-3 text-sm text-ink-muted max-w-xs">A magical reading world for curious children and the grown-ups who love them.</p>
        </div>
        {footerCols.map(col => (
          <div key={col.h}>
            <p className="font-display text-sm font-bold">{col.h}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              {col.l.map(i => (
                <li key={i.label}>
                  <Link to={i.to} className="hover:text-foreground transition-colors">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Fable. Made with care for little readers.</p>
          <p>Read. Imagine. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
