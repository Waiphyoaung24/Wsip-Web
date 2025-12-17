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
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mainRef.current || !boxRef.current) return;
    if (!gsap || !ScrollTrigger) return;

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
        <p className="text-white text-sm">scroll down</p>
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

        {/* Marker containers */}
        <div className="motion-container second absolute w-[140px] h-[140px] border-2 border-dashed border-white/20 rounded-[10px] flex justify-center items-center left-[10%] top-[25%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
        </div>

        <div className="motion-container third absolute w-[140px] h-[140px] border-2 border-dashed border-white/20 rounded-[10px] flex justify-center items-center right-[10%] top-[45%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
        </div>

        <div className="motion-container fourth absolute w-[140px] h-[140px] border-2 border-dashed border-white/20 rounded-[10px] flex justify-center items-center left-[20%] top-[65%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
        </div>

        <div className="motion-container fifth absolute w-[140px] h-[140px] border-2 border-dashed border-white/20 rounded-[10px] flex justify-center items-center left-[60%] top-[80%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
        </div>

        <div className="motion-container sixth absolute w-[140px] h-[140px] border-2 border-dashed border-white/20 rounded-[10px] flex justify-center items-center left-[15%] top-[95%] z-20">
          <div className="motion-marker w-[100px] h-[100px] rounded-[10px]" />
        </div>
      </div>

      <div className="final h-[20vh] relative z-10" />
    </>
  );
}

// Ensure the component is exported
export default LogoMotionPath;
