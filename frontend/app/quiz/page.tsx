"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Laptop, Smartphone, Monitor, Tablet, 
  ChevronRight, ChevronLeft, Info, Check,
  Zap, Camera, ShieldCheck, Gauge, Cpu
} from "lucide-react";

const STEPS = [
  "Category",
  "Brands",
  "Budget",
  "Purpose",
  "User Type",
  "Technical"
];

const CATEGORIES = [
  { id: "laptop", name: "Laptop", icon: Laptop },
  { id: "phone", name: "Phone", icon: Smartphone },
  { id: "tab", name: "Tablet", icon: Tablet },
  { id: "computer", name: "Computer", icon: Monitor },
];

const BRANDS = {
  phone: ["Samsung", "Apple", "Vivo", "Iqoo", "Oppo", "Xiaomi", "OnePlus", "Google", "Realme", "Nothing", "Motorola", "Asus", "Infinix", "Tecno", "Lava"],
  laptop: ["Dell", "HP", "Apple", "Lenovo", "Asus", "Acer", "MSI", "Razer", "Microsoft", "Samsung"],
  tab: ["Apple", "Samsung", "Lenovo", "Xiaomi", "Microsoft", "Huawei"],
  computer: ["Apple", "Dell", "HP", "Lenovo", "Custom Build", "Asus", "Acer", "MSI", "Razer", "Microsoft", "Samsung"]
};

const BUDGETS = [
  "Under ₹20,000",
  "₹20,000 - ₹40,000",
  "₹40,000 - ₹70,000",
  "₹70,000 - ₹1,20,000",
  "Above ₹1,20,000"
];

const PURPOSES = [
  { id: "gaming", name: "Gaming", icon: Zap, description: "High performance for smooth gameplay" },
  { id: "camera", name: "Camera", icon: Camera, description: "Photography and content creation" },
  { id: "performance", name: "Performance", icon: Gauge, description: "Multitasking and professional work" },
  { id: "allrounder", name: "All-rounder", icon: ShieldCheck, description: "Good balance of everything" },
];

const USER_TYPES = [
  "School student",
  "College student",
  "Professional",
  "Married man/woman",
  "Others"
];

interface TechQuestion {
  id: string;
  question: string;
  explanation: string;
  options: string[];
}

const TECH_QUESTIONS: Record<string, TechQuestion[]> = {
  phone: [
    {
      id: "ois",
      question: "Do you need OIS in your camera?",
      explanation: "OIS means Optical Image Stabilization. It keeps your camera video and photos stable and less shaky.",
      options: ["Yes", "No", "Not sure"]
    },
    {
      id: "display",
      question: "Which display type do you prefer?",
      explanation: "AMOLED/OLED displays have better colors and deep blacks compared to LCD/IPS.",
      options: ["AMOLED/OLED", "LCD/IPS", "Don't care"]
    },
    {
      id: "charging",
      question: "Do you need super-fast charging?",
      explanation: "Fast charging (e.g., 65W+) lets you charge your phone fully in under 40 minutes.",
      options: ["Yes, very fast", "Normal is fine", "Not a priority"]
    }
  ],
  laptop: [
    {
      id: "portability",
      question: "How important is weight?",
      explanation: "Thin & Light laptops are easy to carry but might have fewer ports. Performance laptops are heavier.",
      options: ["Must be very light", "Normal weight", "Doesn't matter"]
    },
    {
      id: "battery_life",
      question: "Do you need all-day battery?",
      explanation: "If you travel or work in cafes, you might need 10+ hours of real-world battery life.",
      options: ["Yes, 10+ hours", "6-8 hours is fine", "I'll mostly be plugged in"]
    },
    {
      id: "screen_quality",
      question: "Is color accuracy important?",
      explanation: "Critical for photo/video editors. High color accuracy (100% sRGB) shows colors as they truly are.",
      options: ["Yes, I'm a creator", "Good for movies", "Normal is fine"]
    }
  ],
  computer: [
    {
      id: "form_factor",
      question: "What size do you prefer?",
      explanation: "Tower PCs are easy to upgrade. Mini PCs save space but are harder to change later.",
      options: ["Large Tower", "Mini/Compact PC", "All-in-One (Built into monitor)"]
    },
    {
      id: "graphics",
      question: "Do you need a dedicated Graphics Card (GPU)?",
      explanation: "Essential for 3D gaming and video editing. Not needed for basic office work.",
      options: ["Yes, for heavy gaming", "Yes, for editing", "No, basic usage"]
    },
    {
      id: "storage",
      question: "How much storage do you need?",
      explanation: "SSD is for speed (Windows/Apps), HDD is for bulk files (Movies/Photos).",
      options: ["Fast SSD only", "Mixed (Fast + Bulk)", "Don't know"]
    }
  ],
  tab: [
    {
      id: "refresh_rate",
      question: "Do you want a smooth 120Hz display?",
      explanation: "Makes scrolling and using a stylus feel much smoother and more natural.",
      options: ["Yes, must have", "60Hz is fine", "Not sure"]
    },
    {
      id: "stylus",
      question: "Will you use a Stylus (Pen)?",
      explanation: "Great for note-taking, drawing, and precise editing.",
      options: ["Yes, daily", "Maybe occasionally", "No"]
    },
    {
      id: "cellular",
      question: "Do you need 5G/LTE connectivity?",
      explanation: "Allows you to use internet without Wi-Fi, using a SIM card.",
      options: ["Yes, for travel", "Wi-Fi only is fine"]
    }
  ]
};

interface QuizAnswers {
  category: string;
  brands: string[];
  budget: string;
  purpose: string;
  userType: string;
  tech: Record<string, string>;
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    category: "",
    brands: [],
    budget: "",
    purpose: "",
    userType: "",
    tech: {}
  });

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else submitQuiz();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleBrand = (brand: string) => {
    setAnswers((prev: QuizAnswers) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b: string) => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const submitQuiz = () => {
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/recommendations");
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Category
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-display font-bold text-center">What's on your mind?</h2>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setAnswers({ ...answers, category: cat.id }); nextStep(); }}
                  className={`group flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300 ${
                    answers.category === cat.id 
                      ? "border-primary bg-primary/10 shadow-xl shadow-primary/20 scale-105" 
                      : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className={`mb-4 p-4 rounded-2xl transition-colors ${answers.category === cat.id ? "bg-primary text-white" : "bg-white/5 text-muted-foreground group-hover:text-primary"}`}>
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <span className={`font-bold text-lg ${answers.category === cat.id ? "text-primary" : "text-foreground"}`}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 1: // Brands
        const availableBrands = (BRANDS as Record<string, string[]>)[answers.category] || [];
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold mb-2">Favorite Brands?</h2>
              <p className="text-muted-foreground">Select any brands you love, or just hit continue.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableBrands.map((brand: string) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                    answers.brands.includes(brand)
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-white/5 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="font-bold">{brand}</span>
                  <div className={`h-5 w-5 rounded-md flex items-center justify-center transition-colors ${answers.brands.includes(brand) ? "bg-secondary" : "bg-white/5"}`}>
                    {answers.brands.includes(brand) && <Check className="h-3 w-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2: // Budget
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-display font-bold text-center">What's the budget?</h2>
            <div className="grid gap-4">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  onClick={() => { setAnswers({ ...answers, budget: b }); nextStep(); }}
                  className={`w-full flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all duration-200 ${
                    answers.budget === b
                      ? "border-accent bg-accent/10 text-accent scale-[1.02]"
                      : "border-white/5 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="font-bold text-xl">{b}</span>
                  <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all ${answers.budget === b ? "border-accent bg-accent" : "border-white/20"}`}>
                    {answers.budget === b && <div className="h-3 w-3 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3: // Purpose
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-display font-bold text-center">Primary Mission?</h2>
            <div className="grid gap-4">
              {PURPOSES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setAnswers({ ...answers, purpose: p.id }); nextStep(); }}
                  className={`group flex items-center gap-6 p-6 rounded-[2rem] border-2 text-left transition-all duration-300 ${
                    answers.purpose === p.id
                      ? "border-primary bg-primary/10 shadow-xl shadow-primary/20 scale-[1.02]"
                      : "border-white/5 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 transition-all ${answers.purpose === p.id ? "bg-primary text-white scale-110" : "bg-white/10 text-muted-foreground group-hover:text-primary"}`}>
                    <p.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-xl mb-1 ${answers.purpose === p.id ? "text-primary" : "text-foreground"}`}>{p.name}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 4: // User Type
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-display font-bold text-center">Who are you?</h2>
            <div className="grid gap-3">
              {USER_TYPES.map((u) => (
                <button
                  key={u}
                  onClick={() => { setAnswers({ ...answers, userType: u }); nextStep(); }}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-200 ${
                    answers.userType === u
                      ? "border-secondary bg-secondary/10 text-secondary scale-[1.02]"
                      : "border-white/5 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="font-bold text-lg">{u}</span>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${answers.userType === u ? "bg-secondary" : "bg-white/10"}`}>
                    {answers.userType === u && <Check className="h-4 w-4 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 5: // Technical
        const categoryQuestions = TECH_QUESTIONS[answers.category] || [];
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold mb-2">Fine-tuning</h2>
              <p className="text-muted-foreground">Let's nail down those specific needs.</p>
            </div>
            <div className="space-y-12">
              {categoryQuestions.map((q) => (
                <div key={q.id} className="space-y-6">
                  <h4 className="font-bold text-xl leading-tight border-l-4 border-primary pl-4">{q.question}</h4>
                  <div className="glass-card rounded-[1.5rem] p-6 flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      <span className="text-foreground font-bold not-italic block mb-1">Dada explains:</span>
                      {q.explanation}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {q.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers({ ...answers, tech: { ...answers.tech, [q.id]: opt } })}
                        className={`px-8 py-3 rounded-full border-2 transition-all font-bold ${
                          answers.tech[q.id] === opt
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                            : "border-white/5 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      {/* Quiz Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group">
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold">Exit</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="text-xl font-display font-bold">Quiz</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh -z-10 opacity-30" />
        
        <div className="container mx-auto max-w-2xl px-4">
          {/* Progress Section */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-primary font-bold block text-sm uppercase tracking-widest mb-1">Progress</span>
                <h3 className="text-2xl font-display font-bold">Step {step + 1} of {STEPS.length}</h3>
              </div>
              <span className="text-2xl font-display font-bold text-white/40">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden p-1 border border-white/5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step Content */}
          <div className="min-h-[450px]">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-16 flex items-center justify-between pt-10 border-t border-white/5">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`flex items-center gap-2 font-bold px-6 py-3 rounded-2xl transition-all ${step === 0 ? "text-muted-foreground/30 cursor-not-allowed" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={
                (step === 0 && !answers.category) ||
                (step === 2 && !answers.budget) ||
                (step === 3 && !answers.purpose) ||
                (step === 4 && !answers.userType)
              }
              className={`relative flex items-center gap-2 bg-primary px-10 py-4 rounded-2xl text-white font-bold shadow-2xl shadow-primary/30 transition-all hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 active:scale-95 group overflow-hidden`}
            >
              <span className="relative z-10">
                {step === STEPS.length - 1 ? "Get Results" : "Continue"}
              </span>
              <ChevronRight className={`relative z-10 ml-2 h-5 w-5 transition-transform ${step === STEPS.length - 1 ? "group-hover:rotate-12" : "group-hover:translate-x-1"}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
