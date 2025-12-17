"use client";

import { LogoMarquee } from "@/components/LogoMarquee";
import { OurServicesSection } from "@/components/OurServicesSection";
import { SculptureFlowSection } from "@/components/SculptureFlowSection";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Layout tokens for the "Who We Are" section so spacing can be tuned in one place.
// Feel free to tweak these class strings as needed.
const WHO_SECTION_WRAPPER =
  "w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16";
const WHO_TITLE_CLASSES =
  "text-white text-center text-2xl sm:text-3xl md:text-[38px] font-light pt-8 sm:pt-[45px] pb-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10";
const WHO_SUBTITLE_CONTAINER_CLASSES =
  "flex items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 md:px-8";
const WHO_SUBTITLE_TEXT_CLASSES =
  "text-white text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl leading-relaxed font-light";
const WHO_SCULPTURE_MARGIN_CLASSES =
  "mt-6 sm:mt-8 md:mt-10 lg:mt-12";

export function ScrollSections1() {
  const whoTitleRef = useRef<HTMLHeadingElement | null>(null);
  const whoSubtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".panel");
    const panelScrollTriggers: ScrollTrigger[] = [];

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

    // Panel sections ScrollTriggers with lower refreshPriority (refreshed first)
    sections.forEach((eachPanel, i) => {
      const trigger1 = ScrollTrigger.create({
        trigger: eachPanel,
        onEnter: () => goToSection(i),
        refreshPriority: -1, // Lower priority - refreshed first
      });
      panelScrollTriggers.push(trigger1);

      const trigger2 = ScrollTrigger.create({
        trigger: eachPanel,
        start: "bottom bottom",
        onEnterBack: () => goToSection(i),
        refreshPriority: -1, // Lower priority - refreshed first
      });
      panelScrollTriggers.push(trigger2);
    });

    // Animate "Who We Are" title
    if (whoTitleRef.current) {
      const titleAnimation = gsap.fromTo(
        whoTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: whoTitleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true,
            refreshPriority: -1, // Lower priority
          },
        }
      );
      if (titleAnimation.scrollTrigger) {
        panelScrollTriggers.push(titleAnimation.scrollTrigger);
      }
    }

    // Animate "Who We Are" subtitle
    if (whoSubtitleRef.current) {
      const subtitleAnimation = gsap.fromTo(
        whoSubtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: whoSubtitleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true,
            refreshPriority: -1, // Lower priority
          },
        }
      );
      if (subtitleAnimation.scrollTrigger) {
        panelScrollTriggers.push(subtitleAnimation.scrollTrigger);
      }
    }

    return () => {
      // Kill only panel section ScrollTriggers
      panelScrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section className="min-h-screen flex items-start justify-center panel">
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <OurServicesSection />
        </div>
      </section>
      <section className="min-h-screen flex items-start justify-center panel">
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <LogoMarquee />
        </div>
      </section>
      <section className="min-h-screen flex items-start justify-center panel">
        <div className={WHO_SECTION_WRAPPER}>
          <h1 ref={whoTitleRef} className={WHO_TITLE_CLASSES}>
            Who We Are
          </h1>
        

          {/* Subtitle with Animation */}
          <div className={WHO_SUBTITLE_CONTAINER_CLASSES}>
            <p ref={whoSubtitleRef} className={WHO_SUBTITLE_TEXT_CLASSES}>
              WISP Studio is a Bangkok-based creative collective operating at
              the intersection of strategic brand design and innovative visual
              technology.
            </p>
          </div>
          <div className="h-50">
          </div>
          {/* Spacing before Sculpture section */}
          <div className={WHO_SCULPTURE_MARGIN_CLASSES}>
            <SculptureFlowSection />
          </div>
        </div>
      </section>
    
       
       
    </>
  );
}

export function FeaturedProjectSection() {
  const sectionPinRef = useRef<HTMLDivElement>(null);
  const sectionToPinRef = useRef<HTMLElement>(null);
  const horizontalScrollTriggers = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionPinRef.current || !sectionToPinRef.current) return;

    const sectionPin = sectionPinRef.current;
    const sectionToPin = sectionToPinRef.current;

    // First ScrollTrigger instance: Horizontal scrolling with pinning
    // Higher refreshPriority (refreshed later) to avoid conflicts with panel sections
    const containerAnimation = gsap.to(sectionPin, {
      scrollTrigger: {
        trigger: sectionToPin,
        start: "top top",
        end: () => `+=${sectionPin.scrollWidth - document.documentElement.clientWidth}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 1, // Higher priority - refreshed after panel sections
        onToggle: (self) => {
          // Smooth transition handling
          if (self.isActive) {
            // When horizontal section becomes active, refresh to ensure smooth transition
            ScrollTrigger.refresh(true);
          }
        },
        onRefresh: () => {
          // Recalculate on refresh
          if (sectionPin) {
            const newEnd = sectionPin.scrollWidth - document.documentElement.clientWidth;
            // The end will be recalculated automatically with invalidateOnRefresh
          }
        },
      },
      x: () => `-${sectionPin.scrollWidth - document.documentElement.clientWidth}px`,
      ease: "none",
    });

    // Store the ScrollTrigger instance
    const containerScrollTrigger = containerAnimation.scrollTrigger;
    if (containerScrollTrigger) {
      horizontalScrollTriggers.current.push(containerScrollTrigger);
    }

    // Second ScrollTrigger instance: Toggle active class on image wrappers
    // Also higher priority to refresh after container animation
    const imageWrappers = sectionPin.querySelectorAll<HTMLElement>(".image_wrapper");

    imageWrappers.forEach((imageWrapper) => {
      const imageWrapperID = imageWrapper.id;

      const imageAnimation = gsap.to(imageWrapper, {
        scrollTrigger: {
          trigger: imageWrapper,
          start: "left center",
          end: "right center",
          containerAnimation: containerAnimation,
          refreshPriority: 1, // Higher priority
          toggleClass: {
            targets: `.${imageWrapperID}`,
            className: "active",
          },
        },
      });

      // Store the ScrollTrigger instance
      const imageScrollTrigger = imageAnimation.scrollTrigger;
      if (imageScrollTrigger) {
        horizontalScrollTriggers.current.push(imageScrollTrigger);
      }
    });

    // Handle resize with safe refresh
    const handleResize = () => {
      // Use safe refresh to avoid interrupting momentum scrolls
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    // Initial refresh after setup
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Kill only horizontal section ScrollTriggers
      horizontalScrollTriggers.current.forEach((trigger) => {
        trigger.kill();
      });
      horizontalScrollTriggers.current = [];
      containerAnimation.kill();
    };
  }, []);

  return (
    <section
      ref={sectionToPinRef}
      id="section_to-pin"
      className="featured-section-pin"
    >
      <div ref={sectionPinRef} id="section_pin" className="section_pin">
        <div className="content_wrapper">
          <h1>Featured Projects</h1>
        </div>
        <div id="image_wrapper_1" className="image_wrapper image_wrapper_1">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1516647768-31ff0cef8821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt="Featured Project 1"
          />
        </div>
        <div id="image_wrapper_2" className="image_wrapper image_wrapper_2">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1516648064-ee10acfa64db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=863&q=80"
            alt="Featured Project 2"
          />
        </div>
        <div id="image_wrapper_3" className="image_wrapper image_wrapper_3">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1516647072-a39e59e34b97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt="Featured Project 3"
          />
        </div>
      </div>
    </section>
  );
}