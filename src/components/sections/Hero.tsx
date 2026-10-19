import Container from "../ui/Container";
import { portfolio } from "@/data/portfolio";
import { publicUrl } from "@/lib/url";
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-14 md:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="bg-grid-faint pointer-events-none absolute inset-0 opacity-60"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            Open to opportunities
          </p>
          <p className="mt-7 text-lg font-medium">
            {portfolio.title}
            <span className="mt-1 block text-sm font-normal text-foreground-muted">
              {portfolio.role} · {portfolio.location}
            </span>
          </p>
          <h1 className="mt-5 text-[clamp(2.6rem,4.8vw,4.25rem)] font-semibold leading-[1.06] tracking-[-.045em]">
            {portfolio.hero.headline}
            <span className="mt-3 block text-accent-bright text-[.67em] leading-[1.18] tracking-[-.035em]">
              {portfolio.hero.emphasis}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted">
            {portfolio.hero.summary}
          </p>
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Core technologies"
          >
            {portfolio.hero.badges.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-link button-primary" href="#projects">
              Explore Projects <span aria-hidden>↗</span>
            </a>
            <a className="button-link button-secondary" href="#contact">
              Get in Touch
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-5">
            <a
              className="profile-link text-foreground"
              href={publicUrl(portfolio.resumeAsset)}
              download
            >
              Download CV{" "}
              <span aria-hidden className="ml-2">
                ↓
              </span>
            </a>
            <a
              className="profile-link"
              href={portfolio.contact.gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
            >
              GitHub ↗
            </a>
            <a
              className="profile-link"
              href={portfolio.contact.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <aside
          aria-label="Mobile engineering profile"
          className="surface-card relative p-6 sm:p-8"
        >
          <p className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[.14em] text-foreground-subtle">
            <span>{portfolio.hero.panel.title}</span>
            <span aria-hidden>01 / M.</span>
          </p>
          <div
            aria-hidden
            className="my-8 flex items-center justify-center gap-4"
          >
            <div className="grid h-20 w-20 place-items-center rounded-2xl border border-accent/25 bg-accent/5 text-accent-bright">
              <svg
                viewBox="0 0 48 48"
                width="48"
                height="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m16 13-4-6m20 6 4-6M8 28a16 16 0 0 1 32 0H8Z" />
                <circle cx="17" cy="21" r="1" />
                <circle cx="31" cy="21" r="1" />
                <path d="M12 33h24M17 38h14" />
              </svg>
            </div>
            <span className="h-px w-7 bg-white/15" />
            <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/15 bg-white/[.02] text-foreground-muted">
              <svg
                viewBox="0 0 48 48"
                width="42"
                height="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m28 7-18 18 7 7L42 7H28Zm0 22-7 7 7 7h14L28 29Z" />
              </svg>
            </div>
          </div>
          <div className="space-y-6">
            {portfolio.hero.panel.clusters.map((cluster, index) => (
              <div
                key={cluster.label}
                className={
                  index === 0
                    ? "border-l-2 border-accent pl-4"
                    : "border-l-2 border-white/20 pl-4"
                }
              >
                <p className="eyebrow text-[12px]">{cluster.label}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  {cluster.items}
                </h2>
                <p className="mt-1 text-sm text-foreground-muted">
                  {cluster.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
              Data & integration
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              {portfolio.hero.panel.integration}
            </p>
          </div>
        </aside>
      </Container>
    </section>
  );
}
