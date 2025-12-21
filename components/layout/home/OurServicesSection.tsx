"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Branding",
    description: "We craft compelling brand identities that resonate with your audience and differentiate you in the market. Our strategic approach combines market research, creative vision, and storytelling to build brands that leave lasting impressions.",
    tags: ["Identity", "Strategy", "Guidelines"],
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Design",
    description: "We transform ideas into visually stunning designs that captivate and engage. Our design team specializes in creating beautiful, functional, and user-centered solutions across print and digital mediums.",
    tags: ["Graphic", "UI/UX", "Visual"],
  },
  {
    id: "webdev",
    number: "03",
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Web Development",
    description: "We build modern, responsive websites and web applications that combine beautiful design with powerful functionality. Our development team creates fast, secure, and scalable solutions using cutting-edge technologies.",
    tags: ["Frontend", "Backend", "Full Stack"],
  },
  {
    id: "innovation",
    number: "04",
    title: "Innovation",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Innovation",
    description: "We explore emerging technologies and creative possibilities to help businesses stay ahead of the curve. Our innovation lab experiments with new tools, techniques, and approaches to solve creative and technical challenges.",
    tags: ["Technology", "Digital", "Future"],
  },
];

export function OurServicesSection() {
  const [activeService, setActiveService] = useState<string>("innovation");
  const [expandedMobile, setExpandedMobile] = useState<string>("innovation");
  const titleRef = useRef<HTMLHeadingElement>(null);

  const toggleMobile = (id: string) => {
    setExpandedMobile(expandedMobile === id ? "" : id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!titleRef.current) return;
    if (!gsap || !ScrollTrigger) return;

    // Animate "What we do" title - simple fade in
    let textAnimation: gsap.core.Tween | null = null;
    let textScrollTrigger: ScrollTrigger | null = null;

    const text = titleRef.current;

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

    return () => {
      if (textAnimation) {
        textAnimation.kill();
      }
      if (textScrollTrigger) {
        textScrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 md:gap-30">
       {/* Title */}
       <h1
          ref={titleRef}
          className="text-white text-center text-2xl sm:text-3xl md:text-[38px] font-light pt-8 sm:pt-[45px] pb-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
          style={{
            fontFamily: "Alwyn, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          What we do
        </h1>
    <div>
     
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 xl:gap-14 pl-4 md:pl-8 lg:pl-12 xl:pl-16">
          {/* Desktop Image Panel */}
          <div className="hidden md:block md:w-200 relative md:px-4 lg:px-6 xl:px-18">
            <div className="sticky top-24 md:top-32 lg:top-40 h-[65vh] md:h-[40vh] w-full rounded-lg overflow-hidden bg-black/20">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeService === service.id ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black/80 to-transparent text-[#F2F0E9]">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] uppercase tracking-widest border border-[#F2F0E9]/30 px-2.5 py-1 rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-serif italic text-base md:text-lg lg:text-xl opacity-90 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services List */}
          <div className="w-full md:w-7/12 flex flex-col">
            {services.map((service) => {
              const isActive = activeService === service.id;
              const isExpandedMobile = expandedMobile === service.id;

              return (
                <div
                  key={service.id}
                  className="group flex flex-col border-b border-white/20 last:border-none cursor-pointer"
                  onMouseEnter={() => setActiveService(service.id)}
                  onClick={() => toggleMobile(service.id)}
                >
                  {/* Service Header */}
                  <div className="relative py-6 md:py-10 lg:py-12 flex items-baseline justify-between hover-trigger transition-all duration-500">
                    <div className="flex items-baseline gap-4 md:gap-8 lg:gap-12 transition-transform duration-500 group-hover:translate-x-3 md:group-hover:translate-x-4">
                      <span
                        className={`font-mono text-xs md:text-sm lg:text-base transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/40"
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transition-colors duration-300 leading-tight ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`transform transition-transform duration-500 flex-shrink-0 ${
                        isActive ? "rotate-0 opacity-100" : "-rotate-45 opacity-0 group-hover:opacity-50"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile Expandable Content */}
                  <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpandedMobile
                        ? "max-h-[600px] opacity-100 pb-6"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="relative h-56 sm:h-64 w-full rounded-lg overflow-hidden mb-5">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <p className="font-serif text-base sm:text-lg leading-relaxed text-white/80 mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] uppercase tracking-widest border border-white/30 px-2.5 py-1 rounded-full text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
     
    </div>
    </div>
  );
}
