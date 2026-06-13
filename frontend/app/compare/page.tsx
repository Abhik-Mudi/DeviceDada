"use client";

import Link from "next/link";
import { 
  ChevronLeft, Plus, X, 
  Check, HelpCircle
} from "lucide-react";

const COMPARISON_DATA = [
  { 
    feature: "Processor", 
    explanation: "The 'brain' of the device. Faster means smoother apps and gaming.",
    phone1: "Snapdragon 8 Gen 3", 
    phone2: "Dimensity 9300",
    better: "phone1"
  },
  { 
    feature: "Display", 
    explanation: "AMOLED is brighter and has better colors than LCD.",
    phone1: "6.7\" AMOLED 120Hz", 
    phone2: "6.78\" AMOLED 144Hz",
    better: "phone2"
  },
  { 
    feature: "Main Camera", 
    explanation: "Higher megapixels and OIS mean clearer, less shaky photos.",
    phone1: "50MP with OIS", 
    phone2: "50MP with OIS",
    better: "neutral"
  },
  { 
    feature: "Battery", 
    explanation: "Larger mAh means it lasts longer on a single charge.",
    phone1: "5000 mAh", 
    phone2: "5500 mAh",
    better: "phone2"
  },
  { 
    feature: "Charging", 
    explanation: "Higher wattage (W) means it charges faster.",
    phone1: "45W Wired", 
    phone2: "120W Wired",
    better: "phone2"
  }
];

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      {/* Header */}
      <header className="border-b border-outline/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <span className="text-lg font-display font-bold text-primary">Device Comparison</span>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-display font-bold sm:text-4xl mb-4">Compare <span className="text-primary">Head-to-Head</span></h1>
            <p className="text-text-muted max-w-xl mx-auto">
              We compare the technical specs neutrally and explain what they actually mean for you.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-outline/10 bg-surface shadow-xl">
            <div className="grid grid-cols-3 bg-primary/5 border-b border-outline/10">
              <div className="p-6 font-bold text-text-muted">Feature</div>
              <div className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-outline/10 mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold">Samsung S24</h3>
              </div>
              <div className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-outline/10 mb-3">
                  <Plus className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display font-bold">Vivo X100</h3>
              </div>
            </div>

            {COMPARISON_DATA.map((row, index) => (
              <div key={index} className={`grid grid-cols-3 border-b border-outline/5 transition-colors hover:bg-primary/5`}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm uppercase tracking-wider">{row.feature}</span>
                    <div className="group relative">
                      <HelpCircle className="h-4 w-4 text-text-muted cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-3 bg-foreground text-background text-xs rounded-xl shadow-xl z-20">
                        {row.explanation}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`p-6 text-center flex flex-col items-center justify-center gap-2 ${row.better === "phone1" ? "bg-primary/5" : ""}`}>
                  <span className="font-medium">{row.phone1}</span>
                  {row.better === "phone1" && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <Check className="h-3 w-3" />
                      Better
                    </div>
                  )}
                </div>
                <div className={`p-6 text-center flex flex-col items-center justify-center gap-2 ${row.better === "phone2" ? "bg-secondary/5" : ""}`}>
                  <span className="font-medium">{row.phone2}</span>
                  {row.better === "phone2" && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                      <Check className="h-3 w-3" />
                      Better
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 p-8 bg-surface">
              <div />
              <div className="px-4">
                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all">
                  Buy Samsung
                </button>
              </div>
              <div className="px-4">
                <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-secondary/90 transition-all">
                  Buy Vivo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h4 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">👍</span>
                Pros & Cons: Samsung
              </h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Best-in-class software support (7 years)</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Compact and premium design</li>
                <li className="flex items-start gap-2 text-red-500/80"><X className="h-4 w-4 mt-0.5 shrink-0" /> Slower charging compared to competitors</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10">
              <h4 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-secondary text-white flex items-center justify-center text-sm">🔥</span>
                Pros & Cons: Vivo
              </h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" /> Incredible camera performance with Zeiss</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" /> Ultra-fast 120W charging</li>
                <li className="flex items-start gap-2 text-red-500/80"><X className="h-4 w-4 mt-0.5 shrink-0" /> UI can feel cluttered with pre-installed apps</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
