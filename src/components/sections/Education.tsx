import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function Education() {
  return (
    <MotionSection id="education" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              kicker="Education"
              title={portfolio.education.degree}
              description={`${portfolio.education.university} • ${portfolio.education.start} — ${portfolio.education.end}`}
            />
          </div>

          <div className="lg:max-w-xl w-full rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 shadow-[0_0_0_1px_rgba(0,200,83,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Languages
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.languages.items.map((lang) => (
                <div
                  key={lang.name}
                  className="rounded-2xl border border-white/10 bg-black/10 p-4"
                >
                  <p className="text-sm font-semibold text-slate-200">
                    {lang.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-300/90">
                    {lang.level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
