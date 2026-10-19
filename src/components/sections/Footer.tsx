import Container from "../ui/Container";
import { portfolio } from "@/data/portfolio";
import { publicUrl } from "@/lib/url";
export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container className="py-10">
        <p className="text-lg font-medium">{portfolio.footer.quote}</p>
        <p className="mt-2 text-sm text-foreground-muted">
          {portfolio.footer.statement}
        </p>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {portfolio.title}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5">
            <a
              className="profile-link"
              href={`mailto:${portfolio.contact.email}`}
            >
              Email
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
              href={publicUrl(portfolio.resumeAsset)}
              download
            >
              Download CV
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
