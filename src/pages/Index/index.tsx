
import HeroSection from "./components/HeroSection";
import UserTypeSection from "./components/UserTypeSection";
import PrimaryFeaturesSection from "./components/PrimaryFeaturesSection";
import SecondaryFeaturesSection from "./components/SecondaryFeaturesSection";
import InstitutionalLinksSection from "./components/InstitutionalLinksSection";
import TestimonialsSection from "./components/TestimonialsSection";

const Index = () => {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <HeroSection />
      <UserTypeSection />
      <PrimaryFeaturesSection />
      <SecondaryFeaturesSection />
      <InstitutionalLinksSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
