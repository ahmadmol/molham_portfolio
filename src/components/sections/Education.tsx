import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
export default function Education() {
  const { education, languages } = portfolio;
  return (
    <MotionSection
      id="education"
      className="section-space border-y border-white/10"
    >
      <Container>
        <SectionHeading {...portfolio.sections.education} />
        <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
          <div>
            <h3 className="text-xl font-semibold sm:text-2xl">
              {education.degree}
            </h3>
            <p className="mt-3 text-base text-foreground-muted">
              {education.university} · {education.start} — {education.end}
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-foreground-subtle">
              {languages.heading}
            </h3>
            <ul className="mt-4 space-y-2">
              {languages.items.map((item) => (
                <li
                  key={item.name}
                  className="flex max-w-xs justify-between gap-6 text-base"
                >
                  <span>{item.name}</span>
                  <span className="text-foreground-muted">{item.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
