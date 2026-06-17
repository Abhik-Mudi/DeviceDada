import { Cpu } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon1.png" alt="DeviceDada Logo" className="h-10 w-10" />
              <span className="text-xl font-display font-bold tracking-tight">DeviceDada</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Empowering your tech decisions with AI-driven insights and unbiased comparisons. Choose your next device with confidence.
            </p>
            <div className="flex gap-4">
              <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                {/* <Twitter className="h-4 w-4" /> */}
              </button>
              <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                {/* <Github className="h-4 w-4" /> */}
              </button>
              <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                {/* <Instagram className="h-4 w-4" /> */}
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/quiz" className="hover:text-primary transition-colors">Recommendation Quiz</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors">Device Compare</Link></li>
              <li><Link href="#categories" className="hover:text-primary transition-colors">Browse Categories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 DeviceDada. Built for the future of tech buying.</p>
          <p>Made with ✨ by DeviceDada Team</p>
        </div>
      </div>
    </footer>
  );
}