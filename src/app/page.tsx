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
    <div>
      <Navbar />
      <Hero />
      <About />
      <ExperienceTimeline />
      <Skills />
      <FeaturedProjects />
      <Education />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
