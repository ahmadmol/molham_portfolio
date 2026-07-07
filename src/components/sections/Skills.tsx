import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

function SkillPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-semibold text-slate-200">
      {children}
    </span>
  );
}

export default function Skills() {
  const descriptions: Record<string, string> = {
    "Android Development":
      "Kotlin-first development with modern Jetpack Compose UI and Android SDK fundamentals.",
    Architecture:
      "Clean Architecture, scalable patterns, and maintainable feature design for long-term success.",
    "APIs & Data":
      "Practical API integration, local data persistence, and reliable backend communication patterns.",
    "Tools & Workflow":
      "Engineering workflow, version control, code quality practices, and developer productivity tools.",
    "Backend & Data":
      "REST APIs, database integration, and local storage for fast, reliable data handling.",
    "Mobile Features":
      "Authentication, user flows, payment integration, maps, and production-grade feature implementation.",
    "Software Engineering":
      "Problem solving, OOP fundamentals, clean code principles, and collaborative development.",
  };

  return (
    <MotionSection id="skills" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Skills"
          title={portfolio.coreSkills.heading}
          description="A toolkit built for modern Android products and scalable engineering workflows."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {portfolio.coreSkills.groups.map((group) => {
            const desc =
              descriptions[group.title] ??
              "Focused skills for building production Android applications with clean, maintainable engineering.";
            return (
              <div
                key={group.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(0,200,83,0.08)] hover:shadow-[0_0_60px_rgba(0,200,83,0.10)] transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-slate-100">
                    {group.title}
                  </h3>
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(0,200,83,0.18)]"
                    aria-hidden
                  />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300/90 min-h-[42px]">
                  {desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <SkillPill key={item}>{item}</SkillPill>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </MotionSection>
  );
}
