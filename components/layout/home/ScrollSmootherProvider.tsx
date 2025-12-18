"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect } from "react";

// Register GSAP ScrollSmoother plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother);
}

type Props = {
  children: React.ReactNode;
};

export function ScrollSmootherProvider({ children }: Props) {
  useEffect(() => {
    // Initialize ScrollSmoother
    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });

    // Cleanup on unmount
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

