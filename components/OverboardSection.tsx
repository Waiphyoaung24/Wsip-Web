"use client";

import { gsap } from "gsap";
import { useEffect, useState } from "react";

export function OverboardSection() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Load the font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css?family=Advent+Pro:100";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Check if user has already visited
    const hasVisited = localStorage.getItem("hasVisitedOverboard");
    
    // Only show overlay if user hasn't visited before
    if (!hasVisited) {
      setShowOverlay(true);
    }

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleEnter = () => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[url('http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif')] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      <h1
        onClick={handleEnter}
        className="cursor-pointer text-5xl text-[rgba(197, 48, 48, 0.3)] transition-opacity hover:opacity-70 sm:text-6xl md:text-7xl"
        style={{
          fontFamily: "'Advent Pro', sans-serif",
          fontSize: "3em",
          margin: "0.2em 0.5em",
        }}
      >
        Enter
      </h1>
    </div>
  );
}

