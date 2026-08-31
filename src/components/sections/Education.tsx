import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function Education() {
  return (
    <MotionSection id="education" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="Education"
              title={portfolio.education.degree}
              description={`${portfolio.education.university} • ${portfolio.education.start} — ${portfolio.education.end}`}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="surface-card grid grid-cols-1 gap-6 p-6 sm:p-7 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  Highlights
                </p>
                <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
                  <li className="flex items-start gap-3">
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
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    Computer Engineering fundamentals: data structures, OOP, software engineering.
                  </li>
                  <li className="flex items-start gap-3">
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
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    Graduated with hands-on experience across mobile, IoT, and team projects.
                  </li>
                  <li className="flex items-start gap-3">
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
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    Mentored students on graduation projects and Android development.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  Languages
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {portfolio.languages.items.map((lang) => (
                    <div
                      key={lang.name}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-accent/30"
                    >
                      <p className="text-sm font-semibold text-slate-50">
                        {lang.name}
                      </p>
                      <p className="mt-1 text-xs text-foreground-muted">
                        {lang.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
