"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

type NavItem = { id: string; label: string };

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function isValidUrl(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && /^https?:\/\//i.test(value);
}

export default function Navbar() {
  const reduceMotion = useReducedMotion();
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
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0.1, 0.2, 0.35],
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function handleGoTop() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const resumeUrl = portfolio.resumeUrl;

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur bg-background/80 border-b border-white/10">
        <nav aria-label="Primary" className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleGoTop}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-lg px-2 py-1"
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
                      isActive
                        ? "text-slate-100"
                        : "text-slate-400 hover:text-slate-200",
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

              {isValidUrl(resumeUrl) ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open resume"
                  className="ml-2 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-xs sm:text-sm font-semibold text-accent hover:border-accent/50 hover:bg-accent/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
                  Resume
                </a>
              ) : null}
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

            {isValidUrl(resumeUrl) ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open resume"
                className="text-xs font-semibold rounded-full px-3 py-1 border border-accent/30 bg-accent/10 text-accent hover:border-accent/50 hover:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                Resume
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
