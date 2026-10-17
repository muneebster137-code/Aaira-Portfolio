import HeroSection from "@/components/home/HeroSection";
import KineticMarquee from "@/components/home/KineticMarquee";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import ManaaqAccordion from "@/components/home/ManaaqAccordion";
import ExpertiseMatrix from "@/components/home/ExpertiseMatrix";
import BrandWall from "@/components/home/BrandWall";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/common/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* 01 Hero with Monumental Punchline & Inline Monitor */}
      <HeroSection />

      {/* Dynamic Velocity Marquee */}
      <KineticMarquee />

      {/* 02 Selected Work with Asymmetric Elastic Grid */}
      <SelectedWorkSection />

      {/* 03 High-Contrast Philosophy Breakout (Theme Light) */}
      <PhilosophySection />

      {/* 04 Manaaq Creative Studios 4-Brand Ecosystem */}
      <ManaaqAccordion />

      {/* 05 Creative Disciplines & Floating Image Matrix */}
      <ExpertiseMatrix />

      {/* 06 Velocity Marquee Client Wall */}
      <BrandWall />

      {/* 07 Direct Intake & Contact */}
      <ContactSection />

      {/* K72 Signature Footer */}
      <Footer />
    </main>
  );
}
