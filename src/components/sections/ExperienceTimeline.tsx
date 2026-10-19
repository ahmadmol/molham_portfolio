import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
export default function ExperienceTimeline() {
  return (
    <MotionSection
      id="experience"
      className="section-space border-y border-white/5"
    >
      <Container>
        <SectionHeading {...portfolio.sections.experience} />
        <ol className="mt-12 border-l border-white/15">
          {portfolio.experience.items.map((item, index) => (
            <li
              key={item.company}
              className="relative grid gap-5 border-b border-white/10 py-8 pl-6 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-8"
            >
              <span
                aria-hidden
                className={`absolute -left-[4px] h-[7px] w-[7px] rounded-full ${index === 0 ? "bg-accent top-2" : "bg-foreground-subtle top-10"}`}
              />
              <p className="font-mono text-xs text-foreground-muted">
                {item.start} — {item.end}
              </p>
              <article>
                <p className="eyebrow">
                  {index === 0 ? "Current · SWB Company" : item.company}
                </p>
                <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
                  {item.role}
                </h3>
                <ul className="mt-5 space-y-3">
                  {item.highlights.map((text) => (
                    <li
                      key={text}
                      className="flex gap-3 text-base text-foreground-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-3 h-1 w-1 shrink-0 rounded-full bg-foreground-subtle"
                      />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <ul
                  aria-label="Technologies"
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {item.technologies.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </MotionSection>
  );
}
