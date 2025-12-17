"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  children: string;
  className?: string;
}

export function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const textElement = textRef.current;
    const text = textElement.textContent || "";
    
    // Split text into character spans
    textElement.innerHTML = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    const chars = textElement.querySelectorAll("span");

    gsap.from(chars, {
      scrollTrigger: {
        trigger: textElement,
        start: "top 85%",
        end: "bottom 20%",
        scrub: true,
      },
      color: "#fff",
      stagger: 1, // Delay between each character animation
      duration: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === textElement) {
          trigger.kill();
        }
      });
    };
  }, [children]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}

