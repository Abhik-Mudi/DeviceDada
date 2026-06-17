import { Cpu } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
            <img src="/icon1.png" alt="DeviceDada Logo" className="h-10 w-10" />
          <span className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            DeviceDada
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/#categories" className="text-foreground/70 transition-colors hover:text-primary">Categories</Link>
          <Link href="/quiz" className="text-foreground/70 transition-colors hover:text-primary">Quiz</Link>
          <Link href="/compare" className="text-foreground/70 transition-colors hover:text-primary">Compare</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link 
            href="/quiz" 
            className="relative inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 overflow-hidden group"
          >
            <span className="relative z-10">Start Quiz</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          </Link>
        </div>
      </div>
    </header>
  );
}