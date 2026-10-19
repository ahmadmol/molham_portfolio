import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function About() {
  return (
    <MotionSection id="about" className="section-space">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading {...portfolio.sections.about} />
            <div className="mt-8 max-w-xl space-y-4">
              {portfolio.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-foreground-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="surface-card p-6 sm:p-7 lg:col-span-5">
            <h3 className="text-base font-semibold text-foreground">
              Currently focused on
            </h3>
            <ul className="mt-5 space-y-3">
              {portfolio.about.currentFocus.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base text-foreground-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </MotionSection>
  );
}
