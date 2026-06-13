"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Plus, X, 
  Check, HelpCircle, Search, Loader2, AlertCircle, ShoppingCart
} from "lucide-react";

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
  // Use lazy initialization to set initial devices from URL
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
      // Reset result if list changes so user knows they need to click compare again
      setResult(null);
    }
  };

  const handleRemoveDevice = (index: number) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
    if (newDevices.length < 2) {
      setResult(null);
    }
    updateUrl(newDevices);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-display font-bold sm:text-4xl mb-4">Compare <span className="text-primary">Head-to-Head</span></h1>
        <p className="text-text-muted max-w-xl mx-auto mb-8">
          Type the names of devices you want to compare and DeviceDada will show you the differences.
        </p>

        {/* Selection UI */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Type device name (e.g. iPhone 15 Pro)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddDevice()}
              />
            </div>
            <button 
              onClick={handleAddDevice}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-primary/90"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                {device}
                <button onClick={() => handleRemoveDevice(i)} className="hover:text-primary/70">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {devices.length < 2 && (
            <p className="text-sm text-text-muted animate-pulse">Add at least two devices to compare...</p>
          )}

          {devices.length >= 2 && !loading && (
            <button 
              onClick={() => handleCompare(devices)}
              className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-secondary/90 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <Search className="h-5 w-5" />
              {result ? "Update Comparison" : "Compare Now"}
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-text-muted font-medium">Analyzing devices...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center py-20 text-red-500">
          <AlertCircle className="h-10 w-10 mb-4" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-16 mt-16">
          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-3xl border border-outline/10 bg-surface shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className="p-6 font-bold text-text-muted border-b border-outline/10">Feature</th>
                  {devices.map((device, i) => (
                    <th key={i} className="p-6 text-center border-b border-outline/10 min-w-[200px]">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background border border-outline/10 mb-2">
                        {i === 0 ? <Plus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-secondary" />}
                      </div>
                      <h3 className="font-display font-bold">{device}</h3>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.comparison.map((row, index) => (
                  <tr key={index} className="border-b border-outline/5 hover:bg-primary/5 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm uppercase tracking-wider">{row.feature}</span>
                        <div className="group relative">
                          <HelpCircle className="h-4 w-4 text-text-muted cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-3 bg-foreground text-background text-xs rounded-xl shadow-xl z-20">
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
                        <td key={i} className={`p-6 text-center ${isBetter ? "bg-primary/5" : ""}`}>
                          <span className="font-medium">{displayValue}</span>
                          {isBetter && (
                            <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full mx-auto">
                              <Check className="h-3 w-3" />
                              Better
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

          {/* Summaries / Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {devices.map((device, i) => {
              const summary = result.summaries.find(
                s => s.name.toLowerCase().includes(device.toLowerCase()) || 
                     device.toLowerCase().includes(s.name.toLowerCase())
              ) || result.summaries[i];

              if (!summary) return null;

              return (
                <div key={i} className={`p-8 rounded-3xl border h-full flex flex-col ${i === 0 ? "bg-primary/5 border-primary/10" : "bg-secondary/5 border-secondary/10"}`}>
                  <h4 className="text-xl font-display font-bold mb-4 flex items-center gap-2 text-center sm:text-left justify-center sm:justify-start">
                    <span className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm text-white shrink-0 ${i === 0 ? "bg-primary" : "bg-secondary"}`}>
                      {i === 0 ? "👍" : "🔥"}
                    </span>
                    <span className="truncate">{device}</span>
                  </h4>
                  
                  <div className="space-y-6 flex-1 text-left">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Pros</p>
                      <ul className="space-y-2">
                        {summary.pros.map((pro, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <Check className={`h-4 w-4 mt-0.5 shrink-0 ${i === 0 ? "text-primary" : "text-secondary"}`} />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Cons</p>
                      <ul className="space-y-2">
                        {summary.cons.map((con, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-red-500/80">
                            <X className="h-4 w-4 mt-0.5 shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-outline/10 text-left">
                    <p className="text-sm italic text-text-muted">
                      <span className="font-bold not-italic block mb-1">Verdict:</span>
                      &quot;{summary.verdict}&quot;
                    </p>
                    <button className="w-full mt-6 bg-foreground text-background py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                      <ShoppingCart className="h-4 w-4" />
                      Buy {device.split("(")[0].trim()}
                    </button>
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
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        }>
          <CompareContent />
        </Suspense>
      </main>
    </div>
  );
}
