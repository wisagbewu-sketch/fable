import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Bookmark, Clock, Minus, Moon, Plus, Sun, Volume2, VolumeX,
} from "lucide-react";
import { getStory, stories } from "@/data/stories";
import { StoryCard } from "@/components/site/StoryCard";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/story/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.story.title} — Fable` },
      { name: "description", content: loaderData.story.blurb },
      { property: "og:title", content: `${loaderData.story.title} — Fable` },
      { property: "og:description", content: loaderData.story.blurb },
      { property: "og:image", content: loaderData.story.cover },
      { name: "twitter:image", content: loaderData.story.cover },
    ] : [],
  }),
  component: StoryReader,
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-ink-muted">{error.message}</p>
        <Link to="/library" className="mt-6 inline-block rounded-full bg-coral-grad text-primary-foreground px-6 py-3 text-sm font-bold">Back to library</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="font-display text-3xl">Story not found</h1>
        <p className="mt-2 text-ink-muted">It may have wandered off to another shelf.</p>
        <Link to="/library" className="mt-6 inline-block rounded-full bg-coral-grad text-primary-foreground px-6 py-3 text-sm font-bold">Back to library</Link>
      </div>
    </div>
  ),
});

function StoryReader() {
  const { story } = Route.useLoaderData();
  const [fontScale, setFontScale] = useState(1);
  const [dark, setDark] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reading, setReading] = useState(false);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  // Progress tracking based on article scroll
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight + rect.top + window.scrollY;
      const scrolled = window.scrollY - (rect.top + window.scrollY - 0);
      const p = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [story.slug]);

  // Read aloud (Web Speech API)
  useEffect(() => {
    if (!reading) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(story.paragraphs.join("\n\n"));
    u.rate = 0.95; u.pitch = 1.05;
    u.onend = () => setReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return () => window.speechSynthesis.cancel();
  }, [reading, story.paragraphs]);

  const related = useMemo(() => stories.filter(s => s.slug !== story.slug).slice(0, 4), [story.slug]);

  const surface = dark ? "bg-[#1c1d20] text-[#f0ece4]" : "bg-background text-foreground";
  const subtle  = dark ? "text-[#b9b3a6]" : "text-ink-muted";
  const chrome  = dark ? "bg-[#26272b]/85 border-white/5" : "bg-card/90 border-border/60";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${surface}`}>
      {/* Sticky chrome with progress bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${chrome}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link to="/library" className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold hover:opacity-80 transition ${subtle}`}>
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Library</span>
          </Link>
          <Link to="/" className="flex items-center gap-2"><img src={logo} alt="Fable" className="h-7" /></Link>
          <div className="flex items-center gap-1">
            <IconBtn dark={dark} onClick={() => setFontScale(s => Math.max(0.85, +(s - 0.1).toFixed(2)))} label="Smaller text"><Minus className="h-4 w-4" /></IconBtn>
            <span className={`px-2 text-xs font-bold tabular-nums ${subtle}`}>{Math.round(fontScale * 100)}%</span>
            <IconBtn dark={dark} onClick={() => setFontScale(s => Math.min(1.4, +(s + 0.1).toFixed(2)))} label="Larger text"><Plus className="h-4 w-4" /></IconBtn>
            <Divider dark={dark} />
            <IconBtn dark={dark} onClick={() => setReading(r => !r)} label={reading ? "Stop reading aloud" : "Read aloud"}>
              {reading ? <VolumeX className="h-4 w-4 text-coral" /> : <Volume2 className="h-4 w-4" />}
            </IconBtn>
            <IconBtn dark={dark} onClick={() => setDark(d => !d)} label="Toggle dark mode">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconBtn>
            <IconBtn dark={dark} onClick={() => setBookmarked(b => !b)} label="Bookmark">
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-coral text-coral" : ""}`} />
            </IconBtn>
          </div>
        </div>
        <div className="h-1 w-full bg-transparent">
          <div className="h-full bg-coral-grad transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      </header>

      {/* Cover */}
      <section className="mx-auto max-w-5xl px-5 pt-10 sm:px-8 sm:pt-14">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 text-xs font-bold">
          {[story.category, `Ages ${story.ageGroup}`, `Level ${story.level}`, `${story.minutes} min read`].map(t => (
            <span key={t} className={`rounded-full px-3 py-1 ${dark ? "bg-white/10" : "bg-muted text-ink-muted"}`}>{t}</span>
          ))}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">{story.title}</motion.h1>
        <p className={`mt-3 text-sm font-semibold ${subtle}`}>by {story.author}</p>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mt-8 overflow-hidden rounded-[2rem] shadow-float">
          <img src={story.cover} alt={story.title} className="h-[300px] w-full object-cover sm:h-[440px]" />
        </motion.div>
      </section>

      {/* Story body */}
      <article ref={articleRef} className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
        <p className={`mb-8 font-display text-lg italic ${subtle}`}>{story.blurb}</p>
        <div
          style={{ fontSize: `${fontScale * 1.25}rem`, lineHeight: 1.75 }}
          className="space-y-7 font-sans"
        >
          {story.paragraphs.map((p: string, i: number) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              {i === 0 ? <span className="float-left mr-3 mt-1 font-display text-6xl leading-none text-coral">{p[0]}</span> : null}
              {i === 0 ? p.slice(1) : p}
            </motion.p>
          ))}
        </div>

        <div className={`mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 ${dark ? "bg-white/5" : "bg-card shadow-soft"}`}>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint-grad shadow-soft">🌟</div>
            <div>
              <p className="font-display text-lg">The end.</p>
              <p className={`text-xs font-semibold ${subtle}`}>You finished {story.title}.</p>
            </div>
          </div>
          <Link to="/library" className="inline-flex items-center gap-2 rounded-full bg-coral-grad text-primary-foreground px-5 py-3 text-sm font-bold">
            Find another story
          </Link>
        </div>
      </article>

      {/* Related */}
      <section className={`border-t ${dark ? "border-white/5" : "border-border"}`}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl sm:text-3xl">More gentle adventures</h2>
            <p className={`hidden sm:flex items-center gap-1 text-sm font-bold ${subtle}`}><Clock className="h-4 w-4" /> Picked for tonight</p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((s, i) => <StoryCard key={s.slug} story={s} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function IconBtn({ children, onClick, label, dark }: { children: React.ReactNode; onClick: () => void; label: string; dark: boolean }) {
  return (
    <button
      onClick={onClick} aria-label={label} title={label}
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
        dark ? "hover:bg-white/10" : "hover:bg-muted"
      }`}
    >{children}</button>
  );
}
function Divider({ dark }: { dark: boolean }) {
  return <div className={`mx-1 h-5 w-px ${dark ? "bg-white/10" : "bg-border"}`} />;
}
