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
    // Save answers to session storage and redirect
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/recommendations");
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Category
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-center">What are you buying today?</h2>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setAnswers({ ...answers, category: cat.id }); nextStep(); }}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${
                    answers.category === cat.id 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-outline/10 bg-surface hover:border-primary/40"
                  }`}
                >
                  <cat.icon className="h-10 w-10 mb-4" />
                  <span className="font-semibold">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 1: // Brands
        const availableBrands = (BRANDS as Record<string, string[]>)[answers.category] || [];
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-center">Which brands do you prefer?</h2>
            <p className="text-center text-text-muted">You can select multiple brands or skip if you&apos;re open to all.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableBrands.map((brand: string) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    answers.brands.includes(brand)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-outline/10 bg-surface hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium">{brand}</span>
                  {answers.brands.includes(brand) && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 2: // Budget
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-center">What is your budget?</h2>
            <div className="space-y-3">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  onClick={() => { setAnswers({ ...answers, budget: b }); nextStep(); }}
                  className={`w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                    answers.budget === b
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-outline/10 bg-surface hover:border-primary/40"
                  }`}
                >
                  <span className="font-semibold text-lg">{b}</span>
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${answers.budget === b ? "border-primary bg-primary" : "border-outline/20"}`}>
                    {answers.budget === b && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3: // Purpose
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-center">What is the main purpose?</h2>
            <div className="grid grid-cols-1 gap-4">
              {PURPOSES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setAnswers({ ...answers, purpose: p.id }); nextStep(); }}
                  className={`flex items-start gap-5 p-6 rounded-2xl border-2 text-left transition-all ${
                    answers.purpose === p.id
                      ? "border-primary bg-primary/5"
                      : "border-outline/10 bg-surface hover:border-primary/40"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${answers.purpose === p.id ? "bg-primary text-white" : "bg-primary/5 text-primary"}`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{p.name}</h4>
                    <p className="text-text-muted text-sm">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 4: // User Type
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-center">Who are you?</h2>
            <div className="grid grid-cols-1 gap-3">
              {USER_TYPES.map((u) => (
                <button
                  key={u}
                  onClick={() => { setAnswers({ ...answers, userType: u }); nextStep(); }}
                  className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                    answers.userType === u
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-outline/10 bg-surface hover:border-primary/40"
                  }`}
                >
                  <span className="font-semibold text-lg">{u}</span>
                  {answers.userType === u && <Check className="h-5 w-5" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 5: // Technical
        const categoryQuestions = TECH_QUESTIONS[answers.category] || [];
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-display font-bold">A few technical preferences</h2>
              <p className="text-text-muted mt-2">Don&apos;t worry, DeviceDada will explain everything!</p>
            </div>
            <div className="space-y-8">
              {categoryQuestions.map((q) => (
                <div key={q.id} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <h4 className="font-bold text-lg leading-tight">{q.question}</h4>
                  </div>
                  <div className="bg-secondary/5 rounded-xl p-4 flex gap-3 border border-secondary/10">
                    <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-secondary/80 leading-relaxed italic">
                      {q.explanation}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers({ ...answers, tech: { ...answers.tech, [q.id]: opt } })}
                        className={`px-6 py-2 rounded-full border-2 transition-all font-medium ${
                          answers.tech[q.id] === opt
                            ? "border-primary bg-primary text-white"
                            : "border-outline/10 bg-surface hover:border-primary/20"
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
      <header className="border-b border-outline/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-white">
              <Cpu className="h-4 w-4" />
            </div>
            <span className="text-lg font-display font-bold text-primary">DeviceDada Quiz</span>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest mb-2">
              <span>Step {step + 1} of {STEPS.length}</span>
              <span>{Math.round(((step + 1) / STEPS.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 w-full rounded-full bg-outline/10 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out" 
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step Content */}
          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-outline/10 pt-8">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`flex items-center gap-2 font-bold transition-colors ${step === 0 ? "text-text-muted opacity-50 cursor-not-allowed" : "text-primary hover:text-primary/80"}`}
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
              className={`flex items-center gap-2 bg-primary px-8 py-4 rounded-full text-white font-bold shadow-lg transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105`}
            >
              {step === STEPS.length - 1 ? "Show Recommendations" : "Continue"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
