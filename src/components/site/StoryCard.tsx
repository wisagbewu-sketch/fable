import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Bookmark, Clock } from "lucide-react";
import type { Story, Tint } from "@/data/stories";

const tintBg: Record<Tint, string> = {
  mint:  "bg-[color-mix(in_oklab,var(--mint)_55%,white)]",
  peach: "bg-[color-mix(in_oklab,var(--peach)_55%,white)]",
  cream: "bg-[color-mix(in_oklab,var(--cream)_60%,white)]",
  gold:  "bg-[color-mix(in_oklab,var(--gold)_45%,white)]",
  teal:  "bg-[color-mix(in_oklab,var(--teal)_50%,white)]",
  coral: "bg-[color-mix(in_oklab,var(--coral)_35%,white)]",
};

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="story-card group relative rounded-3xl bg-card p-3 shadow-soft"
    >
      <Link to="/story/$slug" params={{ slug: story.slug }} className="block">
        <div className={`relative overflow-hidden rounded-2xl ${tintBg[story.tint]} aspect-[4/5]`}>
          <img
            src={story.cover} alt={story.title} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-[11px] font-bold text-ink">
            {story.category}
          </span>
        </div>
        <div className="px-2 pt-4 pb-2">
          <h3 className="font-display text-lg leading-snug group-hover:text-coral transition-colors">{story.title}</h3>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-ink-muted">
            <span>Ages {story.ageGroup}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{story.minutes} min</span>
          </div>
        </div>
      </Link>
      <button
        aria-label="Bookmark"
        onClick={(e) => e.preventDefault()}
        className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-card/90 backdrop-blur shadow-soft hover:bg-card transition-colors"
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </motion.article>
  );
}
