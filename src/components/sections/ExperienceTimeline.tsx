"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import type { ExperienceItem } from "@/data/portfolio";

function formatMeta(item: ExperienceItem) {
  const parts = [item.company, item.locationOrMeta].filter(Boolean);
  return parts.join(" — ");
}

function isCurrent(end: string) {
  if (!end) return true;
  const normalized = end.trim().toLowerCase();
  return normalized === "present" || normalized === "now" || normalized === "—";
}

export default function ExperienceTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection id="experience" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Experience"
          title={portfolio.experience.heading}
          description="Production Android roles where I focused on maintainable architecture, reliable features, and real business outcomes."
        />

        <div className="relative mt-12">
          {/* Vertical timeline rail */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-accent/30 via-white/10 to-transparent sm:block"
          />

          <ol className="space-y-8">
            {portfolio.experience.items.map((item, idx) => {
              const meta = formatMeta(item);
              const summary = item.highlights[0] ?? "";
              const remainingHighlights = item.highlights.slice(1, 4);
              const current = isCurrent(item.end);
              const dateLabel = `${item.start} — ${item.end || "Present"}`;

              return (
                <motion.li
                  key={`${item.role}-${idx}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : idx * 0.06,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  className="relative sm:pl-14"
                >
                  {/* Node marker */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-6 hidden h-9 w-9 sm:flex items-center justify-center rounded-full border border-accent/30 bg-background-soft"
                  >
                    <span
                      className={[
                        "h-2.5 w-2.5 rounded-full bg-accent",
                        current ? "pulse-dot" : "",
                      ].join(" ")}
                    />
                  </span>

                  <article className="surface-card surface-card-hover p-6 sm:p-7">
                    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
                          {item.role}
                        </h3>
                        {meta ? (
                          <p className="mt-1 text-sm text-foreground-muted">
                            {meta}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                            current
                              ? "border border-accent/30 bg-accent/10 text-accent"
                              : "border border-white/10 bg-white/5 text-foreground-muted",
                          ].join(" ")}
                        >
                          {current ? (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot"
                              aria-hidden
                            />
                          ) : null}
                          {dateLabel}
                        </span>
                      </div>
                    </header>

                    <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
                      <div className="lg:col-span-7">
                        {summary ? (
                          <>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                              Summary
                            </p>
                            <p className="mt-2 text-[15px] text-foreground leading-relaxed">
                              {summary}
                            </p>
                          </>
                        ) : null}

                        {remainingHighlights.length > 0 ? (
                          <div className="mt-5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                              Key contributions
                            </p>
                            <ul className="mt-3 space-y-2.5">
                              {remainingHighlights.map((h) => (
                                <li
                                  key={h}
                                  className="flex items-start gap-3 text-foreground-muted"
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    aria-hidden
                                    className="mt-1 shrink-0 text-accent"
                                  >
                                    <path d="M5 12h14" />
                                    <path d="m13 6 6 6-6 6" />
                                  </svg>
                                  <span className="text-sm leading-relaxed">
                                    {h}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>

                      <div className="lg:col-span-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                          Tech used
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.technologies.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-accent/30 hover:text-accent"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                            Highlights at a glance
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.highlights.slice(0, 4).map((h, i) => {
                              const short = h
                                .split(" ")
                                .slice(0, 3)
                                .join(" ");
                              return (
                                <span
                                  key={`${h}-${i}`}
                                  className="rounded-full bg-accent/5 border border-accent/20 px-2.5 py-1 text-[11px] font-semibold text-accent"
                                >
                                  {short}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </MotionSection>
  );
}
