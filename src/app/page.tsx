import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import FeaturesSection from "@/components/home/FeaturesSection";
import SubjectExplorer from "@/components/home/SubjectExplorer";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import StatsBar from "@/components/home/StatsBar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CTASection />
      <StatsBar />
      <TrustedBySection />
      <SubjectExplorer />
      <FeaturesSection />
      <TestimonialsSection />
      <WhatsAppButton />
    </>
  );
}
