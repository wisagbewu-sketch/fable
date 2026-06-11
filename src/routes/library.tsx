import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";
import { StoryCard } from "@/components/site/StoryCard";
import { stories, categories, ageGroups, levels } from "@/data/stories";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Story Library — Fable" },
      { name: "description", content: "Browse Fable's library of beautifully illustrated stories. Filter by category, age, reading level, and time." },
      { property: "og:title", content: "Story Library — Fable" },
      { property: "og:description", content: "Browse beautifully illustrated children's stories on Fable." },
    ],
  }),
  component: LibraryPage,
  notFoundComponent: () => { throw notFound(); },
});

const timeBuckets = [
  { id: "any",   label: "Any length", test: (_: number) => true },
  { id: "short", label: "Under 5 min", test: (m: number) => m < 5 },
  { id: "med",   label: "5–8 min",     test: (m: number) => m >= 5 && m <= 8 },
  { id: "long",  label: "9+ min",      test: (m: number) => m >= 9 },
] as const;

type Filters = {
  q: string;
  category: string | null;
  age: string | null;
  level: number | null;
  time: typeof timeBuckets[number]["id"];
};

function LibraryPage() {
  const [f, setF] = useState<Filters>({ q: "", category: null, age: null, level: null, time: "any" });
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const bucket = timeBuckets.find(b => b.id === f.time)!;
    return stories.filter(s =>
      (!q || s.title.toLowerCase().includes(q) || s.author.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) &&
      (!f.category || s.category === f.category) &&
      (!f.age || s.ageGroup === f.age) &&
      (!f.level || s.level === f.level) &&
      bucket.test(s.minutes)
    );
  }, [f]);

  const active = !!(f.category || f.age || f.level || f.time !== "any" || f.q);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="bg-hero-radial">
        <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Library</p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl max-w-3xl">A shelf full of wonderful, gentle worlds.</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted">Find your next favorite by category, age, or how long you have to read tonight.</p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input
                value={f.q}
                onChange={e => setF({ ...f, q: e.target.value })}
                placeholder="Search by title, author, or category…"
                className="w-full rounded-full bg-card pl-11 pr-4 py-3.5 text-sm font-semibold shadow-soft placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-coral"
              />
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-3.5 text-sm font-bold shadow-soft hover:shadow-float transition-all"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            {active && (
              <button
                onClick={() => setF({ q: "", category: null, age: null, level: null, time: "any" })}
                className="inline-flex items-center gap-1 text-sm font-bold text-coral hover:underline"
              >
                <X className="h-4 w-4" /> Clear
              </button>
            )}
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-5 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
              <FilterGroup label="Category" options={[null, ...categories]} value={f.category} onChange={v => setF({ ...f, category: v as string | null })} />
              <FilterGroup label="Age group" options={[null, ...ageGroups]} value={f.age} onChange={v => setF({ ...f, age: v as string | null })} renderLabel={v => v ? `Ages ${v}` : "All ages"} />
              <FilterGroup label="Reading level" options={[null, ...levels]} value={f.level} onChange={v => setF({ ...f, level: v as number | null })} renderLabel={v => v ? `Level ${v}` : "Any level"} />
              <FilterGroup label="Reading time" options={timeBuckets.map(b => b.id)} value={f.time} onChange={v => setF({ ...f, time: v as Filters["time"] })} renderLabel={v => timeBuckets.find(b => b.id === v)?.label ?? String(v)} />
            </motion.div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-6 text-sm font-semibold text-ink-muted">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-card p-12 text-center shadow-soft">
            <p className="font-display text-2xl">No stories match those filters.</p>
            <p className="mt-2 text-ink-muted">Try clearing a filter or two.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((s, i) => <StoryCard key={s.slug} story={s} index={i} />)}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function FilterGroup<T extends string | number | null>({
  label, options, value, onChange, renderLabel,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  renderLabel?: (v: T) => string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => {
          const selected = value === o;
          const text = renderLabel ? renderLabel(o) : (o === null ? "All" : String(o));
          return (
            <button
              key={i}
              onClick={() => onChange(o)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                selected ? "bg-coral-grad text-primary-foreground shadow-soft" : "bg-muted text-ink-muted hover:bg-secondary"
              }`}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
