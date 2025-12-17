"use client";

import { LogoMarquee } from "@/components/LogoMarquee";
import { OurServicesSection } from "@/components/OurServicesSection";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function ScrollSections() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".panel");

    function goToSection(i: number) {
      gsap.to(window, {
        scrollTo: {
          y: i * window.innerHeight,
          autoKill: false,
        },
        duration: 0.85,
        ease: "power3.inOut",
      });
    }

    ScrollTrigger.defaults({
      // markers: true
    });

    sections.forEach((eachPanel, i) => {
      ScrollTrigger.create({
        trigger: eachPanel,
        onEnter: () => goToSection(i),
      });

      ScrollTrigger.create({
        trigger: eachPanel,
        start: "bottom bottom",
        onEnterBack: () => goToSection(i),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center panel">
        <OurServicesSection />
      </section>
      <section className="min-h-screen flex items-center justify-center panel px-4 sm:px-6 md:px-8">
        <LogoMarquee />
      </section>
      <section className="min-h-screen flex items-center justify-center panel px-4 sm:px-6 md:px-8">
        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-4xl leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </p>
      </section>
      <section className="min-h-screen flex items-center justify-center panel px-4 sm:px-6 md:px-8">
        <p className="text-white text-lg sm:text-xl md:text-2xl text-center max-w-4xl">This is page 4</p>
      </section>
    </>
  );
}

