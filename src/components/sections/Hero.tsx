"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { portfolio } from "@/data/portfolio";

function isValidUrl(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && /^https?:\/\//i.test(value);
}

const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.05 + i * 0.07,
      ease: EASE_OUT_SOFT,
    },
  }),
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const resumeUrl = portfolio.resumeUrl;

  function scrollTo(id: string) {
    const reduce = reduceMotion;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  const titleWords = portfolio.title.split(" ");

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Background layers */}
      <div
        aria-hidden
        className="bg-grid-faint pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.25)_0%,transparent_60%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(52,211,153,0.18)_0%,transparent_65%)] blur-2xl float-slow"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left column — Identity */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div
                custom={0}
                variants={fadeUp}
                className="flex flex-wrap items-center gap-2"
              >
                <Badge>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {portfolio.subtitle}
                </Badge>
                <Badge variant="neutral">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden
                    className="text-accent"
                  >
                    <path d="M12 22s-7-7.58-7-13a7 7 0 0 1 14 0c0 5.42-7 13-7 13Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  {portfolio.location}
                </Badge>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="mt-5 text-[clamp(2.4rem,5.6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-slate-50"
              >
                {titleWords.map((word, i) => (
                  <span
                    key={word + i}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      initial={reduceMotion ? false : { y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.1 + i * 0.08,
                        ease: EASE_OUT_SOFT,
                      }}
                    >
                      {i === titleWords.length - 1 ? (
                        <span className="text-gradient-accent">{word}</span>
                      ) : (
                        word
                      )}
                      {i < titleWords.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="mt-5 max-w-2xl text-lg text-foreground sm:text-xl"
              >
                {portfolio.hero.statement}
              </motion.p>

              <motion.p
                custom={3}
                variants={fadeUp}
                className="mt-3 max-w-2xl text-base text-foreground-muted sm:text-lg leading-relaxed"
              >
                {portfolio.hero.details}
              </motion.p>

              <motion.div
                custom={4}
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button onClick={() => scrollTo("projects")}>
                  View Projects
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </Button>

                <Button variant="secondary" onClick={() => scrollTo("contact")}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  Contact Me
                </Button>

                {isValidUrl(resumeUrl) ? (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex"
                    aria-label="Download CV (opens in a new tab)"
                  >
                    <Button variant="outline">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden
                      >
                        <path d="M12 3v12" />
                        <path d="m7 10 5 5 5-5" />
                        <path d="M5 21h14" />
                      </svg>
                      Download CV
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" onClick={() => scrollTo("contact")}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M12 3v12" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                    Request CV
                  </Button>
                )}
              </motion.div>

              <motion.dl
                custom={5}
                variants={fadeUp}
                className="mt-10 grid max-w-md grid-cols-3 gap-4 sm:gap-6"
              >
                {[
                  { label: "Production apps", value: "5+" },
                  { label: "Years building", value: "3+" },
                  { label: "Specialty", value: "Kotlin" },
                ].map((stat) => (
                  <div key={stat.label} className="border-l border-white/10 pl-3 sm:pl-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-xl font-semibold text-slate-50 sm:text-2xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>
          </div>

          {/* Right column — Status card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_SOFT }}
              className="surface-card surface-card-hover relative p-6 sm:p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Current role
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-100 sm:text-lg leading-snug">
                    {portfolio.hero.currentRole}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-accent/25 bg-accent/10 px-3 py-2">
                  <span
                    className="h-2 w-2 rounded-full bg-accent pulse-dot"
                    aria-hidden
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                    Open to work
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {portfolio.hero.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-foreground-muted"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
                      aria-hidden
                    />
                    <span className="text-sm sm:text-base leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
                    Stack
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    Kotlin • Compose
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
                    Strength
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    Clean Architecture
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-5 text-xs text-foreground-muted">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden
                    className="text-accent"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Replies within 24h
                </span>
                <a
                  href="#contact"
                  className="font-semibold text-accent hover:underline underline-offset-4"
                >
                  Start a conversation →
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div aria-hidden className="mt-16 section-divider" />
      </Container>
    </section>
  );
}
