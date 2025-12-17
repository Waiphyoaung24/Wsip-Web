"use client";

import { useState } from "react";

interface Logo {
  id: string;
  name: string;
  src?: string;
  component?: React.ReactNode;
}

// Placeholder logos - replace with actual logo images/components
const logos: Logo[] = [
  { id: "1", name: "Logo 1" },
  { id: "2", name: "Logo 2" },
  { id: "3", name: "Logo 3" },
  { id: "4", name: "Logo 4" },
  { id: "5", name: "Logo 5" },
  { id: "6", name: "Logo 6" },
  { id: "7", name: "Logo 7" },
  { id: "8", name: "Logo 8" },
];

export function LogoMarquee() {
  const [isVertical, setIsVertical] = useState(false);

  const toggleDirection = () => {
    setIsVertical(!isVertical);
  };

  return (
    
    <div className={`logo-marquee-wrapper ${isVertical ? "logo-marquee-wrapper--vertical" : ""}`}>
          {/* Gooey Transitions Section */}
          <div className="gooey-transitions-container mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="gooey-transitions-wrapper">
            <h1 className="gooey-text">Works</h1>
            <h1 className="gooey-text">Projects</h1>
          </div>
        </div>
    

      <div className={`logo-marquee ${isVertical ? "logo-marquee--vertical" : ""}`}>
        <div className="logo-marquee__group">
          {logos.map((logo) => (
            <div key={logo.id} className="logo-marquee__item">
              {logo.component || logo.src ? (
                logo.component || (
                  <img src={logo.src} alt={logo.name} className="logo-marquee__image" />
                )
              ) : (
                <div className="logo-marquee__placeholder">{logo.name}</div>
              )}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="logo-marquee__group">
          {logos.map((logo) => (
            <div key={`duplicate-${logo.id}`} className="logo-marquee__item">
              {logo.component || logo.src ? (
                logo.component || (
                  <img src={logo.src} alt={logo.name} className="logo-marquee__image" />
                )
              ) : (
                <div className="logo-marquee__placeholder">{logo.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`logo-marquee logo-marquee--reverse ${isVertical ? "logo-marquee--vertical" : ""}`}>
        <div className="logo-marquee__group">
          {[...logos].reverse().map((logo) => (
            <div key={logo.id} className="logo-marquee__item">
              {logo.component || logo.src ? (
                logo.component || (
                  <img src={logo.src} alt={logo.name} className="logo-marquee__image" />
                )
              ) : (
                <div className="logo-marquee__placeholder">{logo.name}</div>
              )}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="logo-marquee__group">
          {[...logos].reverse().map((logo) => (
            <div key={`duplicate-reverse-${logo.id}`} className="logo-marquee__item">
              {logo.component || logo.src ? (
                logo.component || (
                  <img src={logo.src} alt={logo.name} className="logo-marquee__image" />
                )
              ) : (
                <div className="logo-marquee__placeholder">{logo.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

