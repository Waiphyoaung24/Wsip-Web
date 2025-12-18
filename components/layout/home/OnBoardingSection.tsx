"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function OnBoardingSection() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already visited
    const hasVisited = localStorage.getItem("hasVisitedOnboarding");
    
    // Only show overlay if user hasn't visited before
    if (hasVisited) {
      setShowOverlay(false);
      return;
    }

    // Show overlay first
    setShowOverlay(true);

    // Animate in with GSAP
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    
    if (overlay && logo) {
      // Set initial state
      gsap.set(overlay, { opacity: 0 });
      gsap.set(logo, { opacity: 0, scale: 0.8 });

      // Fade in overlay
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Fade in and scale up logo
      gsap.to(logo, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.2)",
      });
    }

    // Wait for page to fully load
    const handleLoad = () => {
      setIsLoaded(true);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleLogoClick = () => {
    if (!isLoaded) return; // Don't allow click until page is loaded
    
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    
    if (overlay && logo) {
      // Save to localStorage that user has visited
      localStorage.setItem("hasVisitedOnboarding", "true");
      
      // Animate out logo first
      gsap.to(logo, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Then fade out overlay
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setShowOverlay(false);
            },
          });
        },
      });
    }
  };

  if (!showOverlay) return null;

  return (
    <div
      ref={overlayRef}
      id="onboarding-section"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#ef552c] via-[#161f2a] to-[#18212d] px-4"
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      <div 
        ref={logoRef}
        onClick={handleLogoClick}
        className={`flex flex-col items-center justify-center transition-opacity ${isLoaded ? 'cursor-pointer hover:opacity-90' : 'cursor-wait'}`}
      >
        <Image
          src="/imgs/logo.png"
          alt="Wsip logo"
          width={400}
          height={120}
          className="w-[250px] h-auto sm:w-[300px] md:w-[350px] lg:w-[400px]"
          priority
        />
      </div>
    </div>
  );
}
