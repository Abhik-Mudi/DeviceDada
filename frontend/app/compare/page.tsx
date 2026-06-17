"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Plus, X, 
  Check, HelpCircle, Search, Loader2, AlertCircle, ShoppingCart, Cpu, BarChart3, Info
} from "lucide-react";
import { Footer } from "@/components/Footer";

interface ComparisonRow {
  feature: string;
  explanation: string;
  values: Record<string, string>;
  better: string;
}

interface DeviceSummary {
  name: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

interface ComparisonResult {
  comparison: ComparisonRow[];
  summaries: DeviceSummary[];
}

function CompareContent() {
  const [devices, setDevices] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const devParam = params.get("devices");
      return devParam ? devParam.split(",").filter(d => d.trim() !== "") : [];
    }
    return [];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const handleCompare = async (targetDevices: string[]) => {
    if (targetDevices.length < 2) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ devices: targetDevices }),
      });

      if (!response.ok) throw new Error("Failed to generate comparison");

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while comparing. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const updateUrl = (newDevices: string[]) => {
    const params = new URLSearchParams();
    if (newDevices.length > 0) {
      params.set("devices", newDevices.join(","));
    }
    window.history.replaceState(null, "", `/compare?${params.toString()}`);
  };

  const handleAddDevice = () => {
    if (inputValue.trim() && !devices.includes(inputValue.trim())) {
      const newDevices = [...devices, inputValue.trim()];
      setDevices(newDevices);
      setInputValue("");
      updateUrl(newDevices);
      setResult(null);
    }
  };

  const handleRemoveDevice = (index: number) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
    updateUrl(newDevices);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold backdrop-blur-md mb-6">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-white/80 uppercase tracking-widest text-[10px]">Head-to-Head Analysis</span>
        </div>
        <h1 className="text-4xl font-display font-bold sm:text-5xl md:text-6xl mb-6">
          Compare <span className="text-gradient">Tech Giants</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-lg">
          No biased opinions. Just raw data and intelligent insights to help you choose your next masterpiece.
        </p>

        {/* Selection UI */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search for any device..."
                className="w-full pl-12 pr-4 h-16 rounded-[1.25rem] border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all text-lg font-medium"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddDevice()}
              />
            </div>
            <button 
              onClick={handleAddDevice}
              className="bg-primary text-white px-8 h-16 rounded-[1.25rem] font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl font-bold animate-in fade-in zoom-in duration-300">
                <span className="text-white/90">{device}</span>
                <button onClick={() => handleRemoveDevice(i)} className="text-muted-foreground hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {devices.length < 2 && (
            <p className="text-sm text-muted-foreground animate-pulse flex items-center justify-center gap-2">
              <Info className="h-4 w-4" />
              Add at least two devices to begin the comparison...
            </p>
          )}

          {devices.length >= 2 && !loading && (
            <button 
              onClick={() => handleCompare(devices)}
              className="relative group bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-[1.5rem] text-xl font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto overflow-hidden"
            >
              <BarChart3 className="h-6 w-6 relative z-10" />
              <span className="relative z-10">{result ? "Compare Again" : "Compare Now"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-32 space-y-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-4 border-white/5 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-primary">
              <Cpu className="h-10 w-10 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display font-bold animate-pulse">Deep Analyzing...</p>
            <p className="text-muted-foreground">Parsing technical specifications and benchmarks</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center py-20 text-accent bg-accent/5 rounded-[2rem] border border-accent/10">
          <AlertCircle className="h-12 w-12 mb-4" />
          <p className="text-xl font-bold">{error}</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-24 mt-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Comparison Table */}
          <div className="max-w-6xl mx-auto overflow-hidden rounded-[2.5rem] border border-white/5 glass shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 backdrop-blur-xl">
                    <th className="p-8 font-bold text-muted-foreground uppercase tracking-widest text-[10px] border-b border-white/5">Technical Metric</th>
                    {devices.map((device, i) => (
                      <th key={i} className="p-8 text-center border-b border-white/5 min-w-[250px]">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-lg">
                          <span className="text-lg font-bold">{i + 1}</span>
                        </div>
                        <h3 className="text-xl font-display font-bold">{device}</h3>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.comparison.map((row, index) => (
                    <tr key={index} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-8">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-sm tracking-tight text-white/80">{row.feature}</span>
                          <div className="group/info relative">
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                            <div className="absolute left-0 bottom-full mb-3 hidden group-hover/info:block w-64 p-4 glass-card text-xs leading-relaxed rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
                              <p className="font-bold mb-2 text-primary uppercase tracking-widest text-[10px]">What is this?</p>
                              {row.explanation}
                            </div>
                          </div>
                        </div>
                      </td>
                      {devices.map((device, i) => {
                        const valueKey = Object.keys(row.values).find(
                          k => k.toLowerCase().includes(device.toLowerCase()) || 
                               device.toLowerCase().includes(k.toLowerCase())
                        ) || Object.keys(row.values)[i];
                        
                        const displayValue = valueKey ? row.values[valueKey] : "N/A";
                        const isBetter = row.better && (
                          row.better.toLowerCase().includes(device.toLowerCase()) || 
                          device.toLowerCase().includes(row.better.toLowerCase())
                        );

                        return (
                          <td key={i} className={`p-8 text-center transition-all ${isBetter ? "bg-primary/5" : ""}`}>
                            <span className={`text-lg font-bold ${isBetter ? "text-primary" : "text-white/60"}`}>{displayValue}</span>
                            {isBetter && (
                              <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full mx-auto">
                                <Check className="h-3 w-3" />
                                Advantage
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verdicts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {devices.map((device, i) => {
              const summary = result.summaries.find(
                s => s.name.toLowerCase().includes(device.toLowerCase()) || 
                     device.toLowerCase().includes(s.name.toLowerCase())
              ) || result.summaries[i];

              if (!summary) return null;

              return (
                <div key={i} className={`relative p-10 rounded-[3rem] glass-card h-full flex flex-col group transition-all hover:scale-[1.02] ${i === 0 ? "hover:border-primary/50" : "hover:border-secondary/50"}`}>
                  <div className={`absolute top-0 right-0 p-8 text-6xl opacity-5 group-hover:opacity-10 transition-opacity`}>
                    {i === 0 ? <Plus className="h-32 w-32" /> : <BarChart3 className="h-32 w-32" />}
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-xl shadow-xl ${i === 0 ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                        {i === 0 ? "01" : "02"}
                      </div>
                      <h4 className="text-2xl font-display font-bold truncate">{device}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">Mastery</p>
                        <ul className="space-y-4">
                          {summary.pros.map((pro, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm font-medium leading-relaxed">
                              <Check className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400 mb-4">Limitations</p>
                        <ul className="space-y-4">
                          {summary.cons.map((con, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm font-medium text-white/50 leading-relaxed">
                              <X className="h-4 w-4 mt-0.5 text-red-400/50 shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5">
                      <div className="glass rounded-[1.5rem] p-6 mb-8 border-white/5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Final Verdict</p>
                        <p className="text-sm font-medium italic leading-relaxed text-white/90">
                          &quot;{summary.verdict}&quot;
                        </p>
                      </div>
                      
                      <button className="w-full bg-white text-background h-16 rounded-[1.25rem] font-bold flex items-center justify-center gap-3 hover:bg-white/90 transition-all active:scale-95 shadow-xl">
                        <ShoppingCart className="h-5 w-5" />
                        Purchase {device.split("(")[0].trim()}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      {/* Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group">
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold md:block hidden">Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-xl font-display font-bold">Comparison Hub</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 py-16 relative">
        <div className="absolute inset-0 bg-mesh -z-10 opacity-30" />
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
             <div className="h-16 w-16 rounded-full border-4 border-white/5 border-t-primary animate-spin" />
             <p className="text-xl font-display font-bold animate-pulse">Initializing Engine...</p>
          </div>
        }>
          <CompareContent />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
