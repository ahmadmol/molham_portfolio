"use client";

import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import { motion, useReducedMotion } from "framer-motion";

function isValidUrl(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && /^https?:\/\//i.test(value);
}

const categoryAccent: Record<string, string> = {
  accessibility: "from-accent to-emerald-700",
  realestate: "from-accent to-cyan-700",
  auctions: "from-accent to-amber-700",
  education: "from-accent to-sky-700",
};

function categoryForTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("blind") || t.includes("assist")) return "accessibility";
  if (t.includes("real estate")) return "realestate";
  if (t.includes("auction")) return "auctions";
  if (t.includes("quiz") || t.includes("test")) return "education";
  return "accessibility";
}

function categoryLabelFor(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("blind") || t.includes("assist")) return "Accessibility";
  if (t.includes("real estate")) return "Real Estate";
  if (t.includes("auction")) return "Marketplace";
  if (t.includes("quiz") || t.includes("test")) return "Education";
  return "Project";
}

function ProjectVisual({ title }: { title: string }) {
  const accentKey = categoryForTitle(title);
  const gradient = categoryAccent[accentKey] ?? categoryAccent.accessibility;
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-40">
      {/* Patterned background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-faint opacity-50"
      />
      <div
        aria-hidden
        className={[
          "absolute inset-0 bg-gradient-to-br opacity-90",
          gradient,
        ].join(" ")}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18),_transparent_55%)]"
      />

      {/* Phone-frame silhouette */}
      <div
        aria-hidden
        className="absolute right-4 top-1/2 hidden h-28 w-14 -translate-y-1/2 rounded-xl border border-white/30 bg-black/30 backdrop-blur-sm sm:block"
      >
        <div className="mx-auto mt-1 h-1 w-6 rounded-full bg-white/40" />
        <div className="mt-2 mx-1 space-y-1">
          <div className="h-1 w-full rounded bg-white/30" />
          <div className="h-1 w-3/4 rounded bg-white/20" />
          <div className="h-4 w-full rounded bg-white/15" />
          <div className="h-4 w-full rounded bg-white/15" />
        </div>
      </div>

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/70" />
          {categoryLabelFor(title)}
        </div>
        <div>
          <div
            aria-hidden
            className="text-2xl font-bold text-black/85 sm:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {initials}
          </div>
          <div className="mt-1 text-[11px] font-medium text-black/70">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection id="projects" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Projects"
          title={portfolio.featuredProjects.heading}
          description="A snapshot of products and experiments where I transformed requirements into working mobile experiences."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.featuredProjects.items.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : idx * 0.05,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group surface-card surface-card-hover relative flex flex-col overflow-hidden p-6 sm:p-7"
            >
              <ProjectVisual title={p.title} />

              <div className="mt-5 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                    {p.result}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Problem
                    </p>
                    <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">
                      {p.problem}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Solution
                    </p>
                    <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">
                      {p.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                    Tech stack
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
                  {isValidUrl(p.githubUrl) ? (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} GitHub (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-2 text-xs font-semibold text-accent transition-all hover:border-accent/55 hover:bg-accent/15 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
                      </svg>
                      GitHub
                    </a>
                  ) : null}

                  {isValidUrl(p.liveUrl) ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live demo (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-100 transition-all hover:border-accent/30 hover:text-accent hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    >
                      Live Demo
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ) : null}

                  {!isValidUrl(p.githubUrl) && !isValidUrl(p.liveUrl) ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground-subtle">
                      <span className="h-1 w-1 rounded-full bg-foreground-subtle" aria-hidden />
                      Source private — case study available on request
                    </span>
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
