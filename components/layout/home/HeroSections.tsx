"use client";

import { LogoMarquee } from "@/components/layout/home/LogoMarquee";
import { OurServicesSection } from "@/components/layout/home/OurServicesSection";
import { SculptureFlowSection } from "@/components/layout/home/SculptureFlowSection";
import { ContactUsFooter } from "./ContactUsFooter";
import { FeaturedSection } from "./FeaturedSection";

// Layout tokens for consistent spacing across sections
const SECTION_WRAPPER = "w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16";
const SECTION_CONTAINER = "min-h-screen flex items-start justify-center";
const SECTION_CONTAINER_WITHOUT_MIN_HEIGHT = "flex items-start justify-center";

// Layout tokens for the "Who We Are" section
const WHO_TITLE_CLASSES =
  "text-white text-center text-2xl sm:text-3xl md:text-[38px] font-light pt-8 sm:pt-[45px] pb-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10";
const WHO_SUBTITLE_CONTAINER_CLASSES =
  "flex items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 md:px-8";
const WHO_SUBTITLE_TEXT_CLASSES =
  "text-white text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl leading-relaxed font-light";
const WHO_SCULPTURE_MARGIN_CLASSES =
  "mt-6 sm:mt-8 md:mt-10 lg:mt-12";

export default function HeroSections() {
  return (
    <>
      <section className={SECTION_CONTAINER}>
        <div className={SECTION_WRAPPER}>
          <OurServicesSection />
        </div>
      </section>

      <section className={SECTION_CONTAINER_WITHOUT_MIN_HEIGHT}>
        <div className={SECTION_WRAPPER}>
          <LogoMarquee />
        </div>
      </section>

      <div className="h-20"></div>
      <section className={SECTION_CONTAINER}>
        <div className={SECTION_WRAPPER}>
          <h1 className={WHO_TITLE_CLASSES}>Who We Are</h1>
          <div className={WHO_SUBTITLE_CONTAINER_CLASSES}>
            <p className={WHO_SUBTITLE_TEXT_CLASSES}>
              WISP Studio is a Bangkok-based creative collective operating at
              the intersection of strategic brand design and innovative visual
              technology.
            </p>
          </div>
          <div className="h-50"></div>
          <div className={WHO_SCULPTURE_MARGIN_CLASSES}>
            <SculptureFlowSection />
          </div>
        </div>
      </section>
      <FeaturedSection/>
     
      <ContactUsFooter />
    </>
  );
}
