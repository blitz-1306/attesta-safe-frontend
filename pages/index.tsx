import { FC } from "react";
import HeroSection from "../components/Landing/HeroSection/HeroSection";
import AboutSection from "../components/Landing/AboutSection/AboutSection";
import ServiceFeatures from "../components/Landing/ServiceFeatures/ServiceFeatures";
import HowItWorksSection from "../components/Landing/HowItWorksSection/HowItWorksSection";
import TypesOfAttestations from "../components/Landing/TypesOfAttestations/TypesOfAttestations";
import GoToServiceSection from "../components/Landing/GoToServiceSection/GoToServiceSection";
import Footer from "../components/Landing/Footer/Footer";

const Index: FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServiceFeatures />
      <HowItWorksSection />
      <TypesOfAttestations />
      <GoToServiceSection />
      <Footer />
    </>
  );
};

export default Index;
