"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function OnboardingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldShow, setShouldShow] = useState(true); // Default to true for first-time users
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user has already visited
    const hasVisited = localStorage.getItem("hasVisitedOnboarding");
    
    // If user has already completed onboarding, redirect to home
    if (hasVisited === "true") {
      setShouldShow(false);
      router.replace("/");
      return;
    }

    // Ensure we show onboarding for first-time users
    setShouldShow(true);

    // Wait a bit for DOM to be ready, then animate
    const timer = setTimeout(() => {
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
    }, 100);

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
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, [router]);

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
              // Redirect to home page after animation completes
              // Use replace to avoid adding to history stack
              router.replace("/");
            },
          });
        },
      });
    }
  };

  // Don't render if user has already completed onboarding
  if (!shouldShow) {
    return null;
  }

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

