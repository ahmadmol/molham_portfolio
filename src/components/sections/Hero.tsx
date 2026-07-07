"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { portfolio } from "@/data/portfolio";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const resumeUrl = portfolio.resumeUrl;

  return (
    <header className="relative overflow-hidden min-h-[80vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,transparent_55%)] opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,200,83,0.25)_0%,transparent_60%)] blur-2xl"
      />

      <Container className="pt-16 sm:pt-20 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{portfolio.subtitle}</Badge>
              <Badge className="border-transparent bg-white/5 text-slate-200">
                {portfolio.location}
              </Badge>
            </div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }
              }
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50 [text-shadow:0_0_24px_rgba(0,200,83,0.12)]"
            >
              {portfolio.title}
            </motion.h1>

            <p className="mt-4 text-lg sm:text-xl text-slate-300/95 leading-relaxed max-w-2xl">
              {portfolio.hero.statement}
            </p>

            <p className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
              {portfolio.hero.details}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start",
                  });
                }}
              >
                View Projects
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start",
                  });
                }}
              >
                Contact Me
              </Button>

              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                  aria-label="Download CV (opens in a new tab)"
                >
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Download CV
                  </Button>
                </a>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: reduceMotion ? "auto" : "smooth",
                      block: "start",
                    });
                  }}
                >
                  Download CV
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: "easeOut", delay: 0.05 }
              }
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-7 shadow-[0_0_0_1px_rgba(0,200,83,0.10)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium tracking-wide text-accent-400 uppercase">
                    Current role
                  </p>
                  <p className="mt-2 text-base sm:text-lg text-slate-200 font-semibold">
                    {portfolio.hero.currentRole}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(0,200,83,0.18)]"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-slate-200">
                    Available for work
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {portfolio.hero.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-slate-300/90"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(0,200,83,0.15)]" />
                    <span className="text-sm sm:text-base">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <p className="text-xs text-slate-400">Focus</p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    Kotlin • Compose
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <p className="text-xs text-slate-400">Strength</p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    Clean Architecture
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </header>
  );
}
