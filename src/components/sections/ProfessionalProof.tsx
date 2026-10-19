import Container from "../ui/Container";
import { portfolio } from "@/data/portfolio";
export default function ProfessionalProof() {
  return (
    <section
      aria-label="Professional overview"
      className="border-y border-white/10"
    >
      <Container>
        <ul className="grid grid-cols-1 gap-y-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.proof.map((item) => (
            <li
              key={item.title}
              className="border-l border-white/15 pl-5 first:border-accent/60"
            >
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
