import React from "react";
import Container from "../ui/Container";
import { portfolio } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300/90">
            <span className="text-accent font-semibold">“</span>
            {portfolio.footer.quote}
            <span className="text-accent font-semibold">”</span>
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Molham Alnaeb. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
