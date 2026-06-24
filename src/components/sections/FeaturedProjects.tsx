"use client";

import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import { motion } from "framer-motion";

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

export default function FeaturedProjects() {
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
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.14)] hover:shadow-[0_0_60px_rgba(0,200,83,0.10)] transition-shadow"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300/90">
                      {p.problem}
                    </p>
                  </div>
                  <div className="mt-1 h-10 w-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  </div>
                </div>

                {p.screenshotUrl ? (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <img
                      src={p.screenshotUrl}
                      alt={`${p.title} screenshot`}
                      loading="lazy"
                      className="h-40 w-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {p.githubUrl ? (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
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
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.18)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>

                <div className="mt-2 grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Solution
                    </p>
                    <p className="mt-2 text-slate-300/95 leading-relaxed">
                      {p.solution}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Technologies
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Result
                    </p>
                    <p className="mt-2 text-slate-300/95 leading-relaxed">
                      {p.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
