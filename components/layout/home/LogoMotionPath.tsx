"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface Point {
  x: number;
  y: number;
}

export function LogoMotionPath() {
  const mainRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const visionTextRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mainRef.current || !boxRef.current) return;
    if (!gsap || !ScrollTrigger) return;

    // Animate "Explore Our Vision" text - simple fade in
    let textAnimation: gsap.core.Tween | null = null;
    let textScrollTrigger: ScrollTrigger | null = null;

    if (visionTextRef.current) {
      const text = visionTextRef.current;
      
      // Set initial state
      gsap.set(text, { opacity: 0 });
      
      // Simple fade in with ScrollTrigger
      textScrollTrigger = ScrollTrigger.create({
        trigger: text,
        start: "top 80%",
        onEnter: () => {
          textAnimation = gsap.to(text, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          if (textAnimation) {
            textAnimation.reverse();
          }
        },
      });
    }

    const createTimeline = () => {
      // Revert previous context if it exists
      if (ctxRef.current) {
        ctxRef.current.revert();
      }

      // Match reference code: no scope parameter for gsap.context
      ctxRef.current = gsap.context(() => {
        const box = boxRef.current;
        if (!box) return;

        const boxStartRect = box.getBoundingClientRect();

        // Get all containers except the initial one
        const containers = gsap.utils.toArray<HTMLElement>(
          ".motion-container:not(.initial)"
        );

        // Calculate points to animate between
        const points: Point[] = containers.map((container) => {
          const marker = container.querySelector(".motion-marker") || container;
          const rect = marker.getBoundingClientRect();

          return {
            x:
              rect.left +
              rect.width / 2 -
              (boxStartRect.left + boxStartRect.width / 2),
            y:
              rect.top +
              rect.height / 2 -
              (boxStartRect.top + boxStartRect.height / 2),
          };
        });

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".motion-container.initial",
            start: "clamp(top center)",
            endTrigger: ".final",
            end: "clamp(top center)",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate box along motion path
        // Check if MotionPathPlugin is available - plugin is registered as "motionPath" (lowercase)
        const hasMotionPath = !!(gsap.plugins as any).motionPath || !!(gsap.plugins as any).MotionPathPlugin;
        
        if (hasMotionPath && box) {
          // Use selector string like reference code: ".box" -> ".motion-box"
          tl.to(".motion-box", {
            duration: 1,
            ease: "none",
            motionPath: {
              path: points,
              curviness: 1.5,
            },
          });
        } else if (box) {
          // Fallback: animate to each point sequentially
          points.forEach((point, index) => {
            tl.to(".motion-box", {
              x: point.x,
              y: point.y,
              duration: 1 / points.length,
              ease: index === 0 ? "power2.out" : index === points.length - 1 ? "power2.in" : "power2.inOut",
            });
          });
        }

        // Animate vision cards - reveal as logo approaches each point
        const visionCards = gsap.utils.toArray<HTMLElement>(".vision-card");
        const totalPoints = points.length;
        
        visionCards.forEach((card, index) => {
          // Calculate when to show each card based on logo position
          // Each card appears when logo reaches its corresponding point
          const pointProgress = (index + 1) / (totalPoints + 1);
          const showStart = pointProgress - 0.08; // Start showing slightly before reaching point
          const showEnd = pointProgress + 0.12; // Keep visible slightly after passing point
          
          // Set initial state
          gsap.set(card, {
            opacity: 0,
            scale: 0.85,
            y: 15,
          });

          // Set initial state - simple fade
          gsap.set(card, { opacity: 0 });

          // Simple fade in
          tl.to(
            card,
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            showStart
          );

          // Simple fade out
          tl.to(
            card,
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            showEnd
          );
        });
      });
    };

    // Create initial timeline
    createTimeline();

    // Recreate timeline on resize
    const handleResize = () => {
      createTimeline();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      // Cleanup text animations
      if (textAnimation) {
        textAnimation.kill();
      }
      if (textScrollTrigger) {
        textScrollTrigger.kill();
      }
      
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current.kill();
        ctxRef.current = null;
      }
      // Kill all ScrollTriggers associated with this component
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars?.trigger;
        if (
          triggerElement === mainRef.current ||
          (typeof triggerElement === "string" &&
            mainRef.current?.querySelector(triggerElement))
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <div className="motion-spacer h-[20vh] flex justify-center items-center relative z-10">
        <div
          ref={visionTextRef}
          className="vision-text text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide"
          style={{
            fontFamily: "Alwyn, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Explore Our Vision
        </div>
      </div>

      <div ref={mainRef} className="motion-main relative h-[300vh] z-20">
        {/* Initial container with logo box */}
        <div className="motion-container initial absolute w-[140px] h-[140px] border-2 border-dashed border-white/20 rounded-[10px] flex justify-center items-center left-[60%] top-[5%] z-30">
          <div
            ref={boxRef}
            className="motion-box w-[100px] h-[100px] z-40 rounded-[10px] bg-transparent relative"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dkk8ylzhy/image/upload/v1765956705/logo_w9g1ku.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
            }}
          />
        </div>

        {/* Vision statement containers */}
        <div className="motion-container second absolute w-[140px] h-[140px]  rounded-[10px] flex justify-center items-center left-[10%] top-[25%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
          <div className="vision-card absolute left-[160px] sm:left-[180px] flex flex-col justify-center w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <h3 className="vision-title text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
              Sculpted Brand Stories
            </h3>
            <p className="vision-description text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              We shape brands with precision and vision, carving distinctive narratives that feel timeless yet current.
            </p>
          </div>
        </div>

        <div className="motion-container third absolute w-[140px] h-[140px] rounded-[10px] flex justify-center items-center right-[10%] top-[45%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
          <div className="vision-card absolute right-[160px] sm:right-[180px] flex flex-col justify-center w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] text-right pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <h3 className="vision-title text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
              Digital Spaces in Motion
            </h3>
            <p className="vision-description text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              We blend interaction design, motion, and technology to craft digital experiences that feel alive and expressive.
            </p>
          </div>
        </div>

        <div className="motion-container fourth absolute w-[140px] h-[140px]  rounded-[10px] flex justify-center items-center left-[20%] top-[65%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
          <div className="vision-card absolute left-[160px] sm:left-[180px] flex flex-col justify-center w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <h3 className="vision-title text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
              Creative Excellence
            </h3>
            <p className="vision-description text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              From branding to web development, we deliver solutions that combine beautiful design with powerful functionality.
            </p>
          </div>
        </div>

        <div className="motion-container fifth absolute w-[140px] h-[140px]  rounded-[10px] flex justify-center items-center left-[60%] top-[80%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
          <div className="vision-card absolute left-[160px] sm:left-[180px] flex flex-col justify-center w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <h3 className="vision-title text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
              Strategic Innovation
            </h3>
            <p className="vision-description text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              We develop data-driven strategies that align with your business objectives and drive meaningful growth.
            </p>
          </div>
        </div>

        <div className="motion-container sixth absolute w-[140px] h-[140px] border-2 border-dashed border-white/20  rounded-[10px] flex justify-center items-center left-[15%] top-[95%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
          <div className="vision-card absolute left-[160px] sm:left-[180px] flex flex-col justify-center w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <h3 className="vision-title text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
              Your Vision, Our Craft
            </h3>
            <p className="vision-description text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              Together, we transform ideas into compelling brand experiences that resonate and inspire.
            </p>
          </div>
        </div>
      </div>

      <div className="final h-[20vh] relative z-10" />
    </>
  );
}

// Ensure the component is exported
export default LogoMotionPath;
