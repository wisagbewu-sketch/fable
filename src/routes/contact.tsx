import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fable" },
      { name: "description", content: "Get in touch with the Fable team. We read every message." },
      { property: "og:title", content: "Contact — Fable" },
      { property: "og:description", content: "Questions, ideas, story requests — we'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="bg-hero-radial">
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Contact</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">Say hello.</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted">
              Story idea, question, school inquiry, or just a kind note — we read everything that lands in our inbox.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <motion.form
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl bg-card p-8 shadow-soft"
        >
          {sent ? (
            <div className="py-8 text-center">
              <h3 className="font-display text-3xl">Thank you ✿</h3>
              <p className="mt-3 text-ink-muted">We'll be in touch within a day or two. Until then, happy reading.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              <Field label="Your name"><input required className="input" placeholder="Amelia" /></Field>
              <Field label="Email"><input required type="email" className="input" placeholder="you@example.com" /></Field>
              <Field label="What's this about?">
                <select className="input" defaultValue="general">
                  <option value="general">A general question</option>
                  <option value="story">A story idea or feedback</option>
                  <option value="school">School or library inquiry</option>
                  <option value="press">Press & partnerships</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea required rows={5} className="input resize-none" placeholder="Tell us what's on your mind…" />
              </Field>
              <button type="submit" className="self-start rounded-full bg-coral-grad text-primary-foreground px-7 py-3.5 text-sm font-bold shadow-soft hover:shadow-float hover:-translate-y-0.5 transition-all">
                Send message
              </button>
            </div>
          )}
        </motion.form>

        <aside className="grid gap-4 content-start">
          <ContactCard icon={Mail}     title="Email" body="hello@fable.read" />
          <ContactCard icon={MessageCircle} title="Help & support" body="We answer within 1–2 days, Mon–Fri." />
          <ContactCard icon={MapPin}   title="Studio"  body="A small attic in Lisbon, Portugal." />
        </aside>
      </main>

      <style>{`
        .input{
          width:100%; border-radius: 14px; background: var(--muted);
          padding: 12px 14px; font-weight: 600; font-size: 14px; color: var(--ink);
          outline: none; transition: box-shadow .2s ease;
        }
        .input:focus{ box-shadow: 0 0 0 3px color-mix(in oklab, var(--coral) 35%, transparent); }
      `}</style>

      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

function ContactCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-soft">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--peach)_55%,white)]">
        <Icon className="h-5 w-5 text-coral" />
      </div>
      <p className="mt-4 font-display text-lg">{title}</p>
      <p className="text-sm text-ink-muted">{body}</p>
    </div>
  );
}
