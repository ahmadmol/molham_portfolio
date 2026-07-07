"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import type { ExperienceItem } from "@/data/portfolio";

function formatMeta(item: ExperienceItem) {
  const parts = [item.company, item.locationOrMeta].filter(Boolean);
  return parts.join(" — ");
}

export default function ExperienceTimeline() {
  return (
    <MotionSection id="experience" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Experience"
          title={portfolio.experience.heading}
          description="Production Android roles where I focused on maintainable architecture, reliable features, and real business outcomes."
        />

        <div className="mt-10 relative">
          <div
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-px bg-white/10"
          />

          <ol className="space-y-6">
            {portfolio.experience.items.map((item, idx) => {
              const meta = formatMeta(item) ? formatMeta(item) : item.company || item.locationOrMeta || "";
              const achievements = item.highlights.slice(0, 3);

              return (
                <motion.li
                  key={item.role + idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="relative pl-10 pr-2"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-7 w-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(0,200,83,0.12)]" />
                  </span>

                  <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(0,200,83,0.08)] hover:shadow-[0_0_0_1px_rgba(0,200,83,0.18)] transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-100 group-hover:text-slate-50 transition-colors">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm text-slate-300/90">
                          {meta}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {item.start} — {item.end || "Present"}
                        </span>
                        <p className="sm:hidden text-sm font-medium text-accent/90">
                          {item.start} — {item.end || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Summary
                        </p>
                        <p className="mt-2 text-sm text-slate-300/95 leading-relaxed">
                          {achievements[0] ?? ""}
                        </p>

                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Achievements
                          </p>
                          <ul className="mt-3 space-y-2">
                            {achievements.slice(0, 3).map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-3 text-slate-300/90"
                              >
                                <span className="mt-1 h-2 w-2 rounded-full bg-accent/70" aria-hidden />
                                <span className="text-sm leading-relaxed">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Technologies
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.technologies.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Focus areas
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.highlights.slice(0, 4).map((h) => (
                              <span
                                key={h}
                                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-slate-200"
                              >
                                {h.split(" ").slice(0, 2).join(" ")}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </MotionSection>
  );
}
