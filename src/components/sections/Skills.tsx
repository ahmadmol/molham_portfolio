import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

export default function Skills() {
  return (
    <MotionSection id="skills" className="section-space">
      <Container>
        <SectionHeading {...portfolio.sections.skills} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {portfolio.coreSkills.groups.map((group) => (
            <li key={group.title} className="surface-card min-w-0 p-6">
              <h3 className="text-base font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-base text-foreground-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent/80"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </MotionSection>
  );
}
