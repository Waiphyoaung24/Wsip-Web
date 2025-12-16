"use client";

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
          ease: "Power3.easeInOut",
        },
        duration: 0.85,
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
      <section className="min-h-screen flex items-center justify-center">
      <p className="text-white text-2xl">This is page 1</p>
      </section>
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">This is page 2</p>
      </section>
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">This is page 3</p>
      </section>
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">This is page 4</p>
      </section>
    </>
  );
}

