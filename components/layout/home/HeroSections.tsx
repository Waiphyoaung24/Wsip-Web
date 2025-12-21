"use client";

import { LogoMarquee } from "@/components/layout/home/LogoMarquee";
import { OurServicesSection } from "@/components/layout/home/OurServicesSection";
import { SculptureFlowSection } from "@/components/layout/home/SculptureFlowSection";
import { ContactUsFooter } from "./ContactUsFooter";
import { FeaturedSection } from "./FeaturedSection";


export default function HeroSections() {
  return (
    <>
      <OurServicesSection />
      <div className="h-20"></div>
      <LogoMarquee />
      <div className="h-20"></div>
      <SculptureFlowSection />
      <FeaturedSection/>
      <ContactUsFooter />
    </>
  );
}
