import Navbar from "./components/Navbar";
import ScrollHero from "./components/ScrollHero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import SpecsSection from "./components/SpecsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ClosingCTA from "./components/ClosingCTA";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" style={{ background: "#000" }}>
        <ScrollHero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <SpecsSection />
        <TestimonialsSection />
        <ClosingCTA />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
