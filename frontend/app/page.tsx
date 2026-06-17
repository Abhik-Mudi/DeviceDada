import Link from "next/link";
import { Laptop, Smartphone, Monitor, Tablet, ChevronRight, Split, Zap, ShieldCheck, Gauge, Cpu } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground selection:bg-primary/30">
      <Header />

      <main className="flex-1 relative">
        {/* Background Mesh */}
        <div className="absolute inset-0 bg-mesh -z-10 opacity-50" />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold backdrop-blur-md animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white/80 uppercase tracking-widest text-[10px]">Empowered by AI Intelligence</span>
              </div>
              <h1 className="max-w-4xl text-5xl font-display font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
                Find Your Next <br />
                <span className="text-gradient">Tech Masterpiece</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                DeviceDada decodes the tech jargon. We guide you through simple choices to find the perfect phone, laptop, or tablet for your unique lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto pt-4">
                <Link
                  href="/quiz"
                  className="inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-10 text-lg font-bold text-white shadow-2xl shadow-primary/40 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 group"
                >
                  Start The Journey
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex h-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  Compare Specs
                  <Split className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Hero Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] -z-10 opacity-50" />
        </section>

        {/* Bento Categories Section */}
        <section id="categories" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-start mb-16 space-y-4">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-5xl">Select Your Domain</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Choose a category to begin your personalized discovery.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
              {/* Laptops - Large Bento */}
              <Link 
                href="/quiz?category=laptop"
                className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2rem] glass-card p-10 flex flex-col justify-between transition-all hover:border-primary/50"
              >
                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Laptop className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Laptops</h3>
                  <p className="text-muted-foreground text-lg max-w-xs leading-relaxed">
                    From ultra-portables to gaming beasts, find the one that fits your workflow.
                  </p>
                </div>
                <div className="relative z-10 mt-12 flex items-center font-bold text-primary">
                  Begin Guide <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="absolute bottom-0 right-0 p-4 opacity-5 translate-y-4 translate-x-4 transition-transform group-hover:translate-y-0 group-hover:translate-x-0">
                  <Laptop className="h-48 w-48" />
                </div>
              </Link>

              {/* Phones - Vertical Bento */}
              <Link 
                href="/quiz?category=phone"
                className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-[2rem] glass-card p-8 flex flex-col justify-between transition-all hover:border-secondary/50"
              >
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform group-hover:scale-110">
                    <Smartphone className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Phones</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Performance, camera, or battery? We'll help you decide.
                  </p>
                </div>
                <div className="relative z-10 flex items-center font-bold text-secondary">
                  Explore <ChevronRight className="ml-2 h-4 w-4" />
                </div>
                <div className="absolute bottom-0 right-0 p-2 opacity-5">
                  <Smartphone className="h-32 w-32" />
                </div>
              </Link>

              {/* Tablets - Horizontal Bento */}
              <Link 
                href="/quiz?category=tab"
                className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] glass-card p-8 flex flex-col justify-between transition-all hover:border-accent/50"
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">Tablets</h3>
                    <p className="text-muted-foreground text-sm">Entertainment & Creativity.</p>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:rotate-12 transition-transform">
                    <Tablet className="h-5 w-5" />
                  </div>
                </div>
                <div className="relative z-10 flex items-center font-bold text-accent text-sm">
                  Start Quiz <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>

              {/* Computers - Horizontal Bento */}
              <Link 
                href="/quiz?category=computer"
                className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] glass-card p-8 flex flex-col justify-between transition-all hover:border-primary/50"
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">Desktops</h3>
                    <p className="text-muted-foreground text-sm">Raw Power.</p>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:rotate-12 transition-transform">
                    <Monitor className="h-5 w-5" />
                  </div>
                </div>
                <div className="relative z-10 flex items-center font-bold text-primary text-sm">
                  Start Quiz <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Intelligence Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Intelligent <br />
                  <span className="text-gradient">Tech Discovery</span>
                </h2>
                <div className="grid gap-8">
                  <div className="flex gap-6 group">
                    <div className="mt-1 h-12 w-12 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Zero Jargon</h4>
                      <p className="text-muted-foreground leading-relaxed">We translate complex specs like Nits, TGP, and LPDDR5 into human-first advantages.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="mt-1 h-12 w-12 shrink-0 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center transition-all group-hover:bg-secondary group-hover:text-white">
                      <Gauge className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Pure Performance</h4>
                      <p className="text-muted-foreground leading-relaxed">Our algorithms analyze real-world benchmarks, not just marketing numbers.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="mt-1 h-12 w-12 shrink-0 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Market Real-time</h4>
                      <p className="text-muted-foreground leading-relaxed">Always synced with the latest availability and pricing across major platforms.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/5] rounded-[3rem] glass-card p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center animate-float">
                    <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 mb-8 shadow-2xl">
                      <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden border-4 border-white/10">
                        <img src="/icon1.png" alt="DeviceDada" className="h-3/4 w-3/4 object-contain" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">DeviceDada Guru</h3>
                    <p className="text-lg text-muted-foreground italic max-w-sm">
                      "I've analyzed 5,000+ devices so you don't have to. Ready to find yours?"
                    </p>
                  </div>
                  
                  {/* Decorative Floats */}
                  <div className="absolute top-10 right-10 h-16 w-16 rounded-2xl glass-card flex items-center justify-center text-primary animate-bounce-slow">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-20 left-10 h-20 w-20 rounded-2xl glass-card flex items-center justify-center text-secondary animate-pulse-slow">
                    <Laptop className="h-10 w-10" />
                  </div>
                  <div className="absolute top-10 left-10 h-16 w-16 rounded-2xl glass-card flex items-center justify-center text-primary animate-bounce-slow">
                    <Tablet className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-20 right-10 h-20 w-20 rounded-2xl glass-card flex items-center justify-center text-secondary animate-pulse-slow">
                    <Monitor className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
