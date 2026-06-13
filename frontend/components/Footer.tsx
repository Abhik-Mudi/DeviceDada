import { Search } from "lucide-react";
import Link from "next/link";

export function Footer(){
    return <footer className="border-t border-outline/10 py-12 bg-surface">
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
}