"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type NavItem = { id: string; label: string };

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("about");

  const items = useMemo(() => navItems, []);

  useEffect(() => {
    const els = items
      .map((x) => document.getElementById(x.id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root: null, threshold: [0.1, 0.2, 0.35], rootMargin: "-20% 0px -70% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function scrollToId(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur bg-background/80 border-b border-white/10">
        <nav
          aria-label="Primary"
          className="mx-auto max-w-6xl px-4 sm:px-6 py-3"
        >
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-left"
              aria-label="Go to top"
            >
              <span className="block text-sm sm:text-base font-semibold tracking-tight text-slate-100">
                Molham Alnaeb
              </span>
              <span className="block text-xs text-slate-400">
                Android Developer
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className={[
                      "relative text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-lg px-1 py-1",
                      isActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-accent"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden mt-3 flex flex-wrap gap-2">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={[
                    "text-xs font-semibold rounded-full px-3 py-1 border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                    isActive
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-accent/30",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
