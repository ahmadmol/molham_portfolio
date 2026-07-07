"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <nav aria-label="Primary" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleGoTop}
              className="rounded-lg px-2 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              aria-label="Go to top"
            >
              <span className="block text-sm font-semibold tracking-tight text-slate-100 sm:text-base">
                Molham Alnaeb
              </span>
              <span className="block text-xs text-slate-400">Android Developer</span>
            </button>

            <div className="hidden items-center gap-6 lg:flex">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className={[
                      "relative rounded-lg px-1 py-1 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
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
                  className="ml-2 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:border-accent/50 hover:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 sm:text-sm"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
                  Resume
                </a>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-100 transition hover:border-accent/40 hover:bg-accent/10 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Toggle navigation menu</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-all ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-all ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-all ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen ? (
              <motion.div
                id="mobile-nav-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur lg:hidden"
              >
                <div className="flex flex-col gap-2 p-3">
                  {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          scrollToId(item.id);
                        }}
                        className={[
                          "rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all",
                          isActive
                            ? "bg-accent/10 text-accent"
                            : "text-slate-300 hover:bg-white/10 hover:text-slate-100",
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
                      className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-left text-sm font-semibold text-accent"
                    >
                      Resume
                    </a>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
