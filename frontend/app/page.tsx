import Link from "next/link";
import { Laptop, Smartphone, Monitor, Tablet, ChevronRight, Search, Split } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-outline/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Search className="h-5 w-5" />
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
                <span className="mr-2">✨</span>
                Stop guessing, ask DeviceDada
              </div>
              <h1 className="max-w-3xl text-4xl font-display font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your Perfect <span className="text-primary italic">Tech Companion</span> Without the Tech Speak
              </h1>
              <p className="max-w-[700px] text-lg text-text-muted md:text-xl leading-relaxed">
                Buying a new device shouldn&apos;t feel like learning a new language. DeviceDada guides you through simple questions to find the best phone, laptop, or tablet for your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/quiz"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:scale-105"
                >
                  Start Recommendation Quiz
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex h-14 items-center justify-center rounded-full border-2 border-primary/20 bg-surface px-8 text-lg font-semibold text-primary transition-all hover:bg-primary/5"
                >
                  Compare Devices
                  <Split className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container rounded-full blur-[120px]" />
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20 bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-5xl">What are you looking for?</h2>
              <p className="mt-4 text-lg text-text-muted max-w-2xl">
                Choose a category to start your journey. We&apos;ll ask simple questions and explain the jargon along the way.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Laptops", icon: Laptop, description: "Work, study, or game on the go" },
                { name: "Phones", icon: Smartphone, description: "Stay connected with the best mobile tech" },
                { name: "Tablets", icon: Tablet, description: "Portable entertainment and creativity" },
                { name: "Computers", icon: Monitor, description: "Powerful desktops for your workspace" },
              ].map((category) => (
                <Link 
                  key={category.name}
                  href={`/quiz?category=${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl border border-outline/10 bg-background p-8 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <category.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{category.name}</h3>
                  <p className="text-text-muted group-hover:text-foreground/80 transition-colors">
                    {category.description}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                    Start Guide
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                  Why use <span className="text-primary">DeviceDada</span>?
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">No Tech Speak Needed</h4>
                      <p className="text-text-muted">We explain terms like OIS, AMOLED, and Refresh Rate in simple words anyone can understand.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Unbiased Comparisons</h4>
                      <p className="text-text-muted">We compare devices neutrally feature-by-feature, focusing on what matters to you.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Real-time Prices</h4>
                      <p className="text-text-muted">Always see current availability and live prices from top retailers like Amazon and Flipkart.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-primary-container/20 flex items-center justify-center border border-primary/10 overflow-hidden shadow-2xl">
                  {/* Mock Guru Character Placeholder */}
                  <div className="flex flex-col items-center text-center p-12">
                    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center mb-6 text-white text-6xl">
                      👴
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">DeviceDada Guru</h3>
                    <p className="text-text-muted italic">&quot;Let me help you find your next gadget without the headache.&quot;</p>
                  </div>
                </div>
                {/* Floaties */}
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-surface shadow-lg border border-outline/10 flex items-center justify-center animate-bounce">
                  <Smartphone className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-2xl bg-surface shadow-lg border border-outline/10 flex items-center justify-center animate-pulse">
                  <Laptop className="h-12 w-12 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline/10 py-12 bg-surface">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                <Search className="h-4 w-4" />
              </div>
              <span className="text-lg font-display font-bold text-primary">DeviceDada</span>
            </div>
            <p className="text-sm text-text-muted">
              © 2026 DeviceDada. All rights reserved. Helping people choose tech wisely.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
