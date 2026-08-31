import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Skills from "@/components/sections/Skills";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <div className="relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow focus:ring-2 focus:ring-accent/70"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <div aria-hidden className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="section-divider" />
        </div>
        <About />
        <ExperienceTimeline />
        <Skills />
        <FeaturedProjects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
