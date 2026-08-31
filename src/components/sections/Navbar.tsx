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

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-[13px] font-bold tracking-tight text-accent"
    >
      M
      <span className="sr-only">Molham Alnaeb</span>
    </span>
  );
}

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useMemo(() => navItems, []);
  const resumeUrl = portfolio.resumeUrl;

  // Track active section
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
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Track scroll for navbar elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

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

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
          : "border-b border-transparent bg-background/60 backdrop-blur-md",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-3.5"
      >
        <button
          type="button"
          onClick={handleGoTop}
          className="group flex items-center gap-2.5 rounded-lg px-1 py-1 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          aria-label="Go to top — Molham Alnaeb"
        >
          <LogoMark />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-slate-100 sm:text-base">
              Molham Alnaeb
            </span>
            <span className="text-[11px] font-medium text-foreground-muted sm:text-xs">
              Android Developer
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className={[
                  "relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                  isActive
                    ? "text-slate-100"
                    : "text-foreground-muted hover:text-slate-100",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
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
              aria-label="Open resume (opens in a new tab)"
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2 text-xs font-semibold text-accent transition-all hover:border-accent/50 hover:bg-accent/15 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 sm:text-sm"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Resume
            </a>
          ) : null}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-100 transition hover:border-accent/40 hover:bg-accent/10 lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="relative block h-4 w-5">
            <span
              className={[
                "absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300",
                mobileMenuOpen ? "scale-x-0 opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute bottom-0 left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[57px] bottom-0 z-40 bg-background/70 backdrop-blur-md lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              key="mobile-menu"
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative z-50 mx-3 mb-3 overflow-hidden rounded-2xl border border-white/10 bg-background-soft/95 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {items.map((item, i) => {
                  const isActive = activeId === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.03 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToId(item.id);
                      }}
                      className={[
                        "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-slate-300 hover:bg-white/5 hover:text-slate-100",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <span
                          className="h-2 w-2 rounded-full bg-accent"
                          aria-hidden
                        />
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden
                          className="opacity-40"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      )}
                    </motion.button>
                  );
                })}

                {isValidUrl(resumeUrl) ? (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open resume (opens in a new tab)"
                    className="mt-1 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden
                      />
                      Resume
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
