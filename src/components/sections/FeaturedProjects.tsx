"use client";

import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import { motion, useReducedMotion } from "framer-motion";

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-semibold text-slate-200">
      {children}
    </span>
  );
}

export default function FeaturedProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection id="projects" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Projects"
          title={portfolio.featuredProjects.heading}
          description="A snapshot of products and experiments where I transformed requirements into working mobile experiences."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {portfolio.featuredProjects.items.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : idx * 0.03,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-accent/20 hover:shadow-[0_0_60px_rgba(0,200,83,0.10)]"
            >
              <div className="absolute -top-3 -right-3 h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 blur-[0.2px] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300/90">{p.result}</p>
                  </div>

                  <div className="mt-1 h-10 w-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-accent"
                      aria-hidden
                    />
                  </div>
                </div>

                {p.screenshotUrl ? (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <img
                      src={p.screenshotUrl}
                      alt={`${p.title} screenshot`}
                      loading="lazy"
                      className="h-40 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : null}

                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Problem
                    </p>
                    <p className="mt-2 text-sm text-slate-300/95 leading-relaxed">
                      {p.problem}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Solution
                    </p>
                    <p className="mt-2 text-sm text-slate-300/95 leading-relaxed">
                      {p.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Tech stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.githubUrl ? (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} GitHub (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent hover:border-accent/50 hover:bg-accent/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    >
                      GitHub
                    </a>
                  ) : null}

                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live demo (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.18)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
