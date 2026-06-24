"use client";

import { motion } from "framer-motion";
import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { portfolio } from "@/data/portfolio";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
            >
              {portfolio.title}
            </motion.h1>

            <p className="mt-4 text-lg sm:text-xl text-slate-300/95 leading-relaxed max-w-2xl">
              {portfolio.hero.statement}
            </p>

            <p className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
              {portfolio.hero.details}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                View Projects
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Contact
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-7 shadow-[0_0_0_1px_rgba(0,200,83,0.10)]"
            >
              <p className="text-sm font-medium tracking-wide text-accent-400 uppercase">
                Current role
              </p>
              <p className="mt-2 text-base sm:text-lg text-slate-200 font-semibold">
                {portfolio.hero.currentRole}
              </p>

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
