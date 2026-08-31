import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function About() {
  return (
    <MotionSection id="about" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="About"
              title={portfolio.about.heading}
              description={portfolio.about.paragraphs[0]}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="surface-card p-6 sm:p-8">
              <div className="space-y-4">
                {portfolio.about.paragraphs.slice(1).map((p) => (
                  <p
                    key={p}
                    className="text-foreground-muted leading-relaxed text-[15px] sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Why work with me
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {portfolio.about.whyWorkWithMe.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-lg p-1.5 -ml-1.5 transition-colors hover:bg-white/[0.03]"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden
                          className="mt-1 shrink-0 text-accent"
                        >
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                        <span className="text-foreground-muted text-sm sm:text-[15px] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Current focus
                    </p>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {portfolio.about.currentFocus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
