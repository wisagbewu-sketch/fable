import { Link } from "@tanstack/react-router";
import { BookOpen, Search } from "lucide-react";
import logo from "@/assets/logo.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_82%,transparent)] border-b border-border/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Fable" className="h-9 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-ink-muted">
          <Link to="/library" className="hover:text-foreground transition-colors">Library</Link>
          <Link to="/how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link to="/for-parents" className="hover:text-foreground transition-colors">For parents</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/library" aria-label="Search" className="hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-muted transition-colors">
            <Search className="h-4 w-4" />
          </Link>
          <Link to="/library" className="inline-flex items-center gap-2 rounded-full bg-coral-grad text-primary-foreground px-5 py-2.5 text-sm font-bold shadow-soft hover:shadow-float transition-all hover:-translate-y-0.5">
            <BookOpen className="h-4 w-4" /> Start Reading
          </Link>
        </div>
      </nav>
    </header>
  );
}
