"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Star, ShoppingCart, RefreshCcw, 
  ExternalLink, CheckCircle2, AlertCircle, Loader2,
  TrendingUp, Award, Zap
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
        
        const response = await fetch("http://localhost:4000/api/recommend", {
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-display font-bold mb-2">DeviceDada is thinking...</h2>
        <p className="text-text-muted max-w-md">
          Analyzing your preferences and searching for the best devices that match your needs.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-display font-bold mb-2">Oops!</h2>
        <p className="text-text-muted mb-8 max-w-md">{error}</p>
        <Link 
          href="/quiz" 
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary/90 transition-all"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      {/* Header */}
      <header className="border-b border-outline/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/quiz" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Edit Preferences</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <span className="text-lg font-display font-bold text-primary">Your Top Matches</span>
          </div>
          <Link href="/quiz" className="bg-primary/5 text-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/10 transition-all">
            <RefreshCcw className="h-4 w-4" />
            Restart
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-bold text-secondary mb-4">
              <Award className="mr-2 h-4 w-4" />
              Tailored for you
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              The Best Choices for <span className="text-primary italic">You</span>
            </h1>
            <p className="max-w-2xl text-lg text-text-muted">
              Based on your needs, these devices offer the best combination of performance, value, and features.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recommendations.map((device, index) => (
              <div 
                key={device.id || index} 
                className={`group relative flex flex-col rounded-3xl border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${
                  index === 0 ? "border-primary bg-surface shadow-xl" : "border-outline/10 bg-surface/50"
                }`}
              >
                {(device.tag || index === 0) && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg z-10 flex items-center gap-2">
                    <Zap className="h-4 w-4 fill-white" />
                    {device.tag || "Best Match"}
                  </div>
                )}
                
                {/* Device Info */}
                <div className="p-8 pb-0 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6 gap-4">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-2 uppercase tracking-wider">
                        {device.badge || device.category}
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-primary transition-colors">{device.name}</h3>
                      <p className="text-text-muted font-medium">{device.reason}</p>
                    </div>
                    <div className="bg-background rounded-2xl p-3 border border-outline/10 shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-center sm:justify-start gap-2 mb-8">
                    <span className="text-3xl font-bold">{device.price}</span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-4 mb-8 text-left">
                    {device.specs?.map((spec: string, sIndex: number) => (
                      <div key={sIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="mt-auto p-8 pt-0">
                  <div className="h-px bg-outline/10 w-full mb-8" />
                  <div className="space-y-3">
                    <button className="w-full bg-primary text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 active:scale-95">
                      <ShoppingCart className="h-5 w-5" />
                      View Deals
                    </button>
                    <Link 
                      href="/compare"
                      className="w-full bg-surface border-2 border-outline/10 h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/5 hover:border-primary/20"
                    >
                      Compare with Others
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Disclaimer */}
          <div className="mt-20 text-center">
            <div className="inline-block p-6 rounded-2xl bg-primary/5 border border-primary/10 max-w-3xl">
              <p className="text-sm text-text-muted leading-relaxed italic">
                <strong>DeviceDada&apos;s Tip:</strong> Prices and availability are subject to change by retailers. Always double-check before making a final purchase. We provide neutral recommendations based on data and AI.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline/10 py-12 bg-surface mt-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-text-muted">
            © 2026 DeviceDada. All rights reserved. 
          </p>
        </div>
      </footer>
    </div>
  );
}
