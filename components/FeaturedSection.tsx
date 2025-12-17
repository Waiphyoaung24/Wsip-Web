"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PanelData {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
}

const panelsData: PanelData[] = [
  {
    id: 1,
    title: "Section 1",
    imageUrl: "https://assets.codepen.io/16327/demo1.png",
    imageAlt: "Demo 1",
  },
  {
    id: 2,
    title: "Section 2",
    imageUrl: "https://assets.codepen.io/16327/demo2.png",
    imageAlt: "Demo 2",
  },
  {
    id: 3,
    title: "Section 3",
    imageUrl: "https://assets.codepen.io/16327/demo3.png",
    imageAlt: "Demo 3",
  },
  {
    id: 4,
    title: "Section 4",
    imageUrl: "https://assets.codepen.io/16327/demo4.png",
    imageAlt: "Demo 4",
  },
  {
    id: 5,
    title: "Section 5",
    imageUrl: "https://assets.codepen.io/16327/demo5.png",
    imageAlt: "Demo 5",
  },
];

export function FeaturedSection() {
  useEffect(() => {
    if (typeof window === "undefined" || !gsap || !ScrollTrigger) return;

    const panels = gsap.utils.toArray<HTMLElement>(".featured-panel");
    // Remove the last panel from the loop (as per original code)
    const panelsToAnimate = panels.slice(0, -1);

    panelsToAnimate.forEach((panel) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "bottom bottom",
          pinSpacing: false,
          pin: true,
          scrub: true,
          onRefresh: () => {
            gsap.set(panel, {
              transformOrigin:
                "center " + (panel.offsetHeight - window.innerHeight / 2) + "px",
            });
          },
        },
      });

      tl.fromTo(
        panel,
        {
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
        },
        {
          y: 0,
          rotateX: 0,
          scale: 0.5,
          opacity: 0.5,
          duration: 1,
        },
        0
      ).to(panel, {
        opacity: 0,
        duration: 0.1,
      });
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Kill all ScrollTriggers associated with this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (panelsToAnimate.some((panel) => trigger.vars.trigger === panel)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="featured-slides-wrapper">
      {panelsData.map((panel) => (
        <section key={panel.id} className="featured-panel">
          <div className="featured-panel-content">
            <h1>{panel.title}</h1>
            <img src={panel.imageUrl} alt={panel.imageAlt} />
          </div>
        </section>
      ))}
    </div>
  );
}

