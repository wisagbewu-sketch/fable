import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import heroBook from "@/assets/hero-book.jpg";
import { Particles } from "./Particles";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <Particles />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-24 sm:px-8 lg:grid-cols-2 lg:pt-20 lg:pb-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur px-4 py-1.5 text-xs font-bold text-ink-muted shadow-soft"
          >
            <Sparkles className="h-3.5 w-3.5 text-coral" />
            A magical library for curious minds
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Read. <span className="text-coral">Imagine.</span>{" "}
            <span className="bg-coral-grad bg-clip-text text-transparent">Grow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-ink-muted sm:text-xl"
          >
            Discover beautifully illustrated stories that spark imagination, build confidence in reading,
            and turn every quiet moment into an adventure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button className="group inline-flex items-center gap-2 rounded-full bg-coral-grad text-primary-foreground px-7 py-3.5 text-base font-bold shadow-float hover:-translate-y-0.5 transition-all">
              <BookOpen className="h-5 w-5" /> Start Reading
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-base font-bold text-ink shadow-soft hover:shadow-float hover:-translate-y-0.5 transition-all">
              Explore Stories
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-sm text-ink-muted"
          >
            <Stat n="240+" label="Stories" />
            <Divider />
            <Stat n="12" label="Categories" />
            <Divider />
            <Stat n="4.9★" label="Parent rating" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-10 rounded-full bg-mint-grad opacity-50 blur-3xl" aria-hidden />
          <div className="relative animate-float">
            <img
              src={heroBook}
              alt="A magical floating storybook"
              width={1024} height={1024}
              className="relative z-10 w-full drop-shadow-[0_30px_50px_rgba(45,45,45,0.18)]"
            />
            <div className="absolute -top-6 -right-4 z-20 animate-drift">
              <Sparkles className="h-10 w-10 text-gold drop-shadow" />
            </div>
            <div className="absolute -bottom-2 -left-6 z-20 rounded-2xl bg-card px-4 py-3 shadow-float">
              <p className="text-xs font-bold text-ink-muted">Now reading</p>
              <p className="text-sm font-bold">The Lantern Fox 🦊</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div><div className="font-display text-2xl font-bold text-foreground">{n}</div><div>{label}</div></div>
);
const Divider = () => <div className="h-8 w-px bg-border" />;
