import { Search } from "lucide-react";
import Link from "next/link";

export function Header(){
    return <header className="sticky top-0 z-50 w-full border-b border-outline/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white">
              <img src="/favicon.ico" alt="DeviceDada Logo" className="h-full w-full" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-primary">DeviceDada</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#categories" className="transition-colors hover:text-primary">Categories</Link>
            <Link href="/quiz" className="transition-colors hover:text-primary">Quiz</Link>
            <Link href="/compare" className="transition-colors hover:text-primary">Compare</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/quiz" 
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </header>
}