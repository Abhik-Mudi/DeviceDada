"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Star, ShoppingCart, RefreshCcw, 
  ExternalLink, CheckCircle2, AlertCircle, Loader2,
  TrendingUp, Award, Zap, Cpu, Sparkles,
  ShieldCheck
} from "lucide-react";

interface Recommendation {
  id: string;
  name: string;
  category: string;
  price: string;
  specs: string[];
  tag: string;
  badge: string;
  reason: string;
}

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const storedAnswers = sessionStorage.getItem("quizAnswers");
        if (!storedAnswers) {
          setError("No quiz data found. Please take the quiz first.");
          setLoading(false);
          return;
        }

        const answers = JSON.parse(storedAnswers);
        
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });

        if (!response.ok) throw new Error("Failed to get recommendations");

        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full border-4 border-white/5 border-t-primary animate-spin mb-8" />
          <h2 className="text-3xl font-display font-bold mb-3">Dada is Curating...</h2>
          <p className="text-muted-foreground max-w-md text-lg animate-pulse">
            Analyzing your lifestyle patterns and matching them with thousands of tech specs.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mb-8">
          <AlertCircle className="h-10 w-10 text-accent" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Discovery Interrupted</h2>
        <p className="text-muted-foreground mb-10 max-w-md text-lg">{error}</p>
        <Link 
          href="/quiz" 
          className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
        >
          Restart Journey
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground selection:bg-primary/30">
      {/* Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/quiz" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group">
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold">Adjust Needs</span>
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-xl font-display font-bold tracking-tight">Your Curated Tech</span>
          </div>
          <Link href="/quiz" className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all active:scale-95">
            <RefreshCcw className="h-4 w-4" />
            New Search
          </Link>
        </div>
      </header>

      <main className="flex-1 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh -z-10 opacity-30" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-20 space-y-6">
            <div className="inline-flex items-center rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
              <Award className="mr-2 h-4 w-4" />
              Machine Learning Verified
            </div>
            <h1 className="text-5xl font-display font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Found Your <span className="text-gradient">Match</span>
            </h1>
            <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
              Based on your specific requirements, these masterpieces offer the ultimate balance of utility and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {recommendations.map((device, index) => (
              <div 
                key={device.id || index} 
                className={`group relative flex flex-col rounded-[3rem] border transition-all duration-500 hover:shadow-[0_20px_80px_-15px_rgba(59,130,246,0.3)] hover:-translate-y-3 overflow-hidden ${
                  index === 0 ? "border-primary bg-white/[0.03] shadow-2xl" : "border-white/5 bg-white/[0.01]"
                }`}
              >
                {/* Visual Flair */}
                <div className={`absolute top-0 right-0 p-12 text-8xl font-black opacity-[0.03] select-none pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {index + 1}
                </div>

                {(device.tag || index === 0) && (
                  <div className="absolute top-6 left-6 max-w-3/4 bg-primary text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl z-10 flex items-center gap-2 animate-bounce-slow">
                    <Zap className="h-3 w-3 fill-white" />
                    {device.tag || "Top Recommendation"}
                  </div>
                )}
                
                <div className="p-10 pb-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-6">
                    <div>
                      <div className="inline-block px-4 py-1.5 mt-10 rounded-xl bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest mb-4">
                        {device.badge || device.category}
                      </div>
                      <h3 className="text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{device.name}</h3>
                      <div className="flex items-center gap-3">
                         <TrendingUp className="h-5 w-5 text-secondary" />
                         <p className="text-muted-foreground font-medium text-lg leading-relaxed">{device.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="text-4xl font-display font-black text-white">{device.price}</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {device.specs?.map((spec: string, sIndex: number) => (
                      <div key={sIndex} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-white/80 leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto p-10 pt-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-white text-background h-16 py-2 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all hover:bg-white/90 active:scale-95">
                      <ShoppingCart className="h-5 w-5" />
                      Secure Deal
                    </button>
                    <Link 
                      href={`/compare?devices=${device.name}`}
                      className="flex-1 glass-card border-white/5 h-16 py-2 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95"
                    >
                      Head-to-Head
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Neutrality Disclaimer */}
          <div className="mt-32 text-center">
            <div className="inline-block p-10 rounded-[2.5rem] glass-card border border-white/5 max-w-4xl relative overflow-hidden">
              <div className="absolute top-0 left-0 p-8 opacity-5">
                <ShieldCheck className="h-24 w-24" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed italic relative z-10">
                <span className="text-white font-bold not-italic block mb-2 uppercase tracking-widest text-xs">Neutrality Policy</span>
                "DeviceDada recommendations are generated via algorithmic analysis of technical metadata. We do not accept promotional fees for ranking. Prices are fetched in real-time and may fluctuate."
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 glass mt-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-6">
           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
              <Cpu className="h-6 w-6" />
           </div>
           <p className="text-sm text-muted-foreground font-medium">
            © 2026 DeviceDada Intelligence Engine.
          </p>
        </div>
      </footer>
    </div>
  );
}
