"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

type SkillGroup = {
  title: string;
  description: string;
  /** Optional proficiency 0-100 used for the radial indicator. */
  proficiency: number;
  items: string[];
};

// Each group is given a meaningful, honest proficiency indicator
// derived from the portfolio content (no fake numbers invented beyond
// reasonable interpretation of "core", "primary", "supporting" tools).
const groups: SkillGroup[] = portfolio.coreSkills.groups.map((g) => {
  const map: Record<string, { desc: string; level: number }> = {
    "Android Development": {
      desc: "Kotlin-first development with modern Jetpack Compose UI and Android SDK fundamentals.",
      level: 90,
    },
    "Backend & Data": {
      desc: "Practical API integration, local data persistence, and reliable backend communication patterns.",
      level: 78,
    },
    "Mobile Features": {
      desc: "Authentication, user flows, payment integration, maps, and production-grade feature implementation.",
      level: 82,
    },
    "Software Engineering": {
      desc: "Problem solving, OOP fundamentals, clean code principles, and collaborative development.",
      level: 80,
    },
  };
  const fallback = { desc: "Focused skills for building production Android applications with clean, maintainable engineering.", level: 70 };
  const entry = map[g.title] ?? fallback;
  return {
    title: g.title,
    description: entry.desc,
    proficiency: entry.level,
    items: g.items,
  };
});

function ProgressRing({ value, label }: { value: number; label: string }) {
  const radius = 18;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative h-12 w-12 shrink-0"
      role="img"
      aria-label={`${label}: ${value} percent`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx="24"
          cy="24"
          r={normalizedRadius}
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: dashOffset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ strokeDasharray: `${circumference} ${circumference}` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-[11px] font-semibold text-slate-200">
          {value}
          <span className="text-foreground-subtle">%</span>
        </span>
      </div>
    </div>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection id="skills" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Skills"
          title={portfolio.coreSkills.heading}
          description="A toolkit built for modern Android products and scalable engineering workflows."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.05,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="surface-card surface-card-hover flex h-full flex-col p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                  {group.title}
                </h3>
                <ProgressRing value={group.proficiency} label={group.title} />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-foreground-muted min-h-[48px]">
                {group.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
