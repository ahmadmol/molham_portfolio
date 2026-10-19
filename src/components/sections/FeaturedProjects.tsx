import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio, type ProjectItem } from "@/data/portfolio";
import { isHttpUrl } from "@/lib/url";
function ProjectVisual({ theme }: { theme: ProjectItem["visualTheme"] }) {
  const paths: Record<ProjectItem["visualTheme"], React.ReactNode> = {
    property: (
      <>
        <path d="m8 20 24-12 24 12-24 12L8 20Zm0 12 24 12 24-12M8 44l24 12 24-12" />
        <path d="M32 32v12" />
      </>
    ),
    auction: (
      <>
        <path d="m28 12 18 18m-24-12 12-12 18 18-12 12-18-18Zm14 12L14 52m-4-4 8 8M35 52h21M39 46h13v6" />
      </>
    ),
    quiz: (
      <>
        <rect x="10" y="8" width="44" height="48" rx="6" />
        <path d="m17 23 4 4 7-8m5 5h13M17 37h11m5 0h13M17 46h29" />
      </>
    ),
    accessibility: (
      <>
        <circle cx="32" cy="14" r="5" />
        <path d="M13 26h38M32 21v16m0-1L20 55m12-19 12 19" />
        <path d="M10 14a29 29 0 0 0 0 36M54 14a29 29 0 0 1 0 36" />
      </>
    ),
  };
  return (
    <div className="project-visual">
      <svg viewBox="0 0 64 64" aria-hidden>
        {paths[theme]}
      </svg>
      <span className="absolute bottom-3 right-4 font-mono text-xs text-foreground-subtle">
        Abstract illustration
      </span>
    </div>
  );
}
export default function FeaturedProjects() {
  return (
    <MotionSection id="projects" className="section-space">
      <Container>
        <SectionHeading {...portfolio.sections.projects} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portfolio.featuredProjects.items.map((item, index) => {
            const project: ProjectItem = item;
            return (
              <article
                key={project.id}
                className="surface-card surface-card-hover flex min-w-0 flex-col overflow-hidden"
              >
                <ProjectVisual theme={project.visualTheme} />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="eyebrow text-foreground-subtle tracking-[.1em]">
                    0{index + 1} / {project.category}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base text-foreground-muted">
                    {project.summary}
                  </p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-foreground-muted">
                    {project.detail}
                  </p>
                  {project.technologies.length > 0 && (
                    <ul
                      aria-label="Technologies"
                      className="mt-auto flex flex-wrap gap-2 pt-6"
                    >
                      {project.technologies.map((tech) => (
                        <li className="chip" key={tech}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(isHttpUrl(project.repositoryUrl) ||
                    isHttpUrl(project.demoUrl)) && (
                    <div className="mt-5 flex gap-4">
                      {isHttpUrl(project.repositoryUrl) && (
                        <a
                          className="profile-link"
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code ↗
                        </a>
                      )}
                      {isHttpUrl(project.demoUrl) && (
                        <a
                          className="profile-link"
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </MotionSection>
  );
}
