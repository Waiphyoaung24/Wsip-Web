"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

export function OverboardSection() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already visited
    const hasVisited = localStorage.getItem("hasVisitedOverboard");
    
    // Only show overlay if user hasn't visited before
    if (hasVisited) {
      setShowOverlay(false);
      return;
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
    
    // Save to localStorage that user has visited
    localStorage.setItem("hasVisitedOverboard", "true");
    
    // Animate out
    const overlay = document.getElementById("overboard-section");
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setShowOverlay(false);
        },
      });
    }
  };

  if (!showOverlay) return null;

  return (
    <div
      id="overboard-section"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#ef552c] via-[#161f2a] to-[#18212d]"
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      <div 
        onClick={handleLogoClick}
        className={`flex flex-col items-center justify-center transition-opacity ${isLoaded ? 'cursor-pointer hover:opacity-80' : 'cursor-wait'}`}
      >
        <Image
          src="/imgs/logo.png"
          alt="Wsip logo"
          width={400}
          height={120}
          priority
          className="animate-pulse"
        />
      </div>
    </div>
  );
}

