import React from "react";
import MotionSection from "../ui/MotionSection";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function Skills() {
  return (
    <MotionSection id="skills" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Skills"
          title={portfolio.coreSkills.heading}
          description="A toolkit built for modern Android products and scalable engineering workflows."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {portfolio.coreSkills.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(0,200,83,0.08)] hover:shadow-[0_0_0_1px_rgba(0,200,83,0.14)] transition-shadow"
            >
              <h3 className="text-base font-semibold text-slate-100">
                {group.title}
              </h3>

              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/80 shadow-[0_0_0_4px_rgba(0,200,83,0.15)]" />
                    <span className="text-sm text-slate-300/95">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
