import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function About() {
  return (
    <MotionSection id="about" className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="About"
              title={portfolio.about.heading}
              description={portfolio.about.paragraphs[0]}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <div className="space-y-4">
                {portfolio.about.paragraphs.slice(1).map((p) => (
                  <p key={p} className="text-slate-300/95 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm font-semibold text-accent">
                    Why work with me
                  </p>
                  <ul className="mt-3 space-y-2">
                    {portfolio.about.whyWorkWithMe.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(0,200,83,0.18)]" />
                        <span className="text-slate-300/90 text-sm sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-accent">
                    Current focus
                  </p>
                  <ul className="mt-3 space-y-2">
                    {portfolio.about.currentFocus.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/20 border border-white/10" />
                        <span className="text-slate-300/90 text-sm sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 text-xs text-slate-400">
              Tip: explore my experience timeline and featured projects below.
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
