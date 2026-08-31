import React from "react";
import Container from "../ui/Container";
import { portfolio } from "@/data/portfolio";

function isValidUrl(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && /^https?:\/\//i.test(value);
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact } = portfolio;

  return (
    <footer className="relative mt-12 border-t border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Closing note
            </p>
            <p className="mt-3 max-w-xl text-xl font-semibold leading-snug text-slate-50 sm:text-2xl">
              <span className="text-accent">“</span>
              {portfolio.footer.quote}
              <span className="text-accent">”</span>
            </p>
            <p className="mt-4 max-w-md text-sm text-foreground-muted">
              Open to Android engineering roles, freelance collaborations, and
              technical mentorship opportunities.
            </p>
          </div>

          <div className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent transition-colors group-hover:border-accent/40"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span className="font-medium">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent transition-colors group-hover:border-accent/40"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <span className="font-medium">{contact.phone}</span>
                </a>
              </li>
              <li className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`https://${contact.linkedInUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn (opens in a new tab)"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://${contact.gitHubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub (opens in a new tab)"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:text-accent"
                >
                  GitHub
                </a>
                {isValidUrl(portfolio.resumeUrl) ? (
                  <a
                    href={portfolio.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open resume (opens in a new tab)"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-all hover:border-accent/55"
                  >
                    Resume
                  </a>
                ) : null}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-foreground-subtle sm:flex-row">
          <p>
            © {year} {portfolio.title}. Crafted with care.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot"
              aria-hidden
            />
            Built with Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </Container>
    </footer>
  );
}
