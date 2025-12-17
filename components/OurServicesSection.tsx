"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  expandedContent?: string;
  icon?: string;
}

const services: Service[] = [
  {
    id: "branding",
    name: "Branding",
    title: "Branding",
    description:
      "We craft compelling brand identities that resonate with your audience and differentiate you in the market. Our strategic approach combines market research, creative vision, and storytelling to build brands that leave lasting impressions.\n\nFrom logo design to brand guidelines, we create cohesive visual systems that communicate your values and connect with customers on an emotional level.",
    },
  {
    id: "design",
    name: "Design",
    title: "Design",
    description:
      "We transform ideas into visually stunning designs that captivate and engage. Our design team specializes in creating beautiful, functional, and user-centered solutions across print and digital mediums.\n\nWhether it's graphic design, UI/UX design, or creative direction, we bring creativity and strategic thinking to every project.",
   },
  {
    id: "webdev",
    name: "Web Development",
    title: "Web Development",
    description:
      "We build modern, responsive websites and web applications that combine beautiful design with powerful functionality. Our development team creates fast, secure, and scalable solutions using cutting-edge technologies.\n\nFrom simple landing pages to complex web applications, we deliver digital experiences that drive results and exceed expectations.",
    },
  {
    id: "tech",
    name: "IT Solutions",
    title: "IT Solutions",
    description:
      "We provide comprehensive IT technology solutions to help your business operate efficiently and scale effectively. Our technical expertise spans infrastructure, cloud services, automation, and system integration.\n\nWe help businesses leverage technology to streamline operations, improve productivity, and achieve their digital transformation goals.",
   },
  {
    id: "strategy",
    name: "Brand Strategy",
    title: "Brand Strategy",
    description:
      "We develop strategic brand positioning and marketing strategies that drive growth and build meaningful connections with your audience. Our data-driven approach ensures your brand strategy aligns with business objectives.\n\nThrough research, analysis, and creative thinking, we craft strategies that differentiate your brand and guide all marketing and communication efforts.",
   },
  {
    id: "digital",
    name: "Digital Design",
    title: "Digital Design",
    description:
      "We create engaging digital experiences across websites, mobile apps, and digital platforms. Our digital design team combines aesthetic excellence with user experience best practices to create interfaces that users love.\n\nFrom wireframes to pixel-perfect designs, we ensure every digital touchpoint reflects your brand and serves your users effectively.",
    },
  {
    id: "content",
    name: "Content Creation",
    title: "Content Creation",
    description:
      "We produce compelling content that tells your brand story and engages your audience. From copywriting to visual content, we create materials that resonate and drive action.\n\nOur content creation services span written content, visual assets, video production, and social media content that aligns with your brand voice and marketing goals.",
   },
  {
    id: "consulting",
    name: "Creative Consulting",
    title: "Creative Consulting",
    description:
      "We provide strategic creative consulting to help businesses make informed decisions about their brand, design, and digital presence. Our consultants bring years of experience and industry insights to guide your creative projects.\n\nFrom brand audits to creative direction, we help you navigate complex creative challenges and make decisions that align with your business goals.",
    },
  {
    id: "innovation",
    name: "Innovation Lab",
    title: "Innovation Lab",
    description:
      "We explore emerging technologies and creative possibilities to help businesses stay ahead of the curve. Our innovation lab experiments with new tools, techniques, and approaches to solve creative and technical challenges.\n\nFrom AI-powered design tools to immersive experiences, we help businesses explore what's next and identify opportunities for innovation in their brand and digital presence.",
   },
];

export function OurServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate title (from offset/transparent to visible), but keep it visible by default
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }

    // Animate subtitle with a slight delay, but keep it visible by default
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="">
      <div className="relative w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Title */}
       

       
        <h1 ref={titleRef} className="text-white text-center text-2xl sm:text-3xl md:text-[38px] font-light pt-8 sm:pt-[45px] pb-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        > What We Do</h1>

        {/* Main Content Container */}
        <div className="relative w-full flex flex-col md:flex-row items-start min-h-[300px] md:min-h-[500px] lg:min-h-709px]">
          {/* Feature Content - Left Side */}
          <div
            className="relative w-full md:w-[35%] lg:w-[30%] min-h-[300px] sm:min-h-[400px] mt-8 sm:mt-12 md:mt-0 md:left-0 px-4 sm:px-6 md:px-0"
            style={{
              top: "clamp(250px, 10vh, 142px)",
              marginLeft: "clamp(200px, 5vw, 80px)",
            }}
          >
            {/* Default visible content when no tile is active */}
            {!activeService && (
              <div className="feature-content absolute inset-0 z-10">
                <div className="text-white space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-[37px] lg:text-[42px] font-light mb-3 sm:mb-4 tracking-[0.02em]">
                      Overall
                    </h2>
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <span className="block w-full border-t border-white/30 h-[1px]" />
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-2">
                    <p className="text-sm sm:text-base md:text-[16px] lg:text-[17px] text-white/90 leading-relaxed sm:leading-[1.85] md:leading-[1.9] font-light">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. It has survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Animated service content when a service is active */}
            {services.map((service) => (
              <div
                key={service.id}
                className={`feature-content absolute inset-0 transition-opacity duration-100 ${
                  activeService === service.id ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="text-white space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-[37px] lg:text-[42px] font-light mb-3 sm:mb-4 tracking-[0.02em]">
                      {service.title}
                    </h2>
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <span className="block w-full border-t border-white/30 h-[1px]" />
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-2">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-sm sm:text-base md:text-[16px] lg:text-[17px] text-white/90 leading-relaxed sm:leading-[1.85] md:leading-[1.9] font-light">
                        {service.description.split("\n\n").map((paragraph, idx) => (
                          <span key={idx}>
                            {paragraph}
                            {idx < service.description.split("\n\n").length - 1 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>

                    {service.expandedContent && (
                      <div className="prose prose-invert max-w-none pt-2 sm:pt-3 md:pt-4 border-t border-white/10">
                        <p className="text-sm sm:text-base md:text-[16px] lg:text-[17px] text-white/85 leading-relaxed sm:leading-[1.85] md:leading-[1.9] font-light">
                          {service.expandedContent.split("\n\n").map((paragraph, idx) => (
                            <span key={idx}>
                              {paragraph}
                              {idx < service.expandedContent!.split("\n\n").length - 1 && (
                                <>
                                  <br />
                                  <br />
                                </>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tiles Container - Right Side */}
         
         
          <div
            className="absolute right-0 hidden md:block"
            style={{
              width: "clamp(500px, 50vw, 700px)",
              height: "clamp(500px, 50vw, 700px)",
              right: "clamp(40px, 5vw, 80px)",
              top: "clamp(100px, 10vh, 142px)",
              zIndex: 3,
            }}
            onMouseLeave={() => setActiveService(null)}
          >
             <h1 className="text-white font-sans leading-[1.4] max-w-[45rem] text-center text-base sm:text-lg md:text-lg lg:text-lg mb-4 sm:mb-6" style={{ wordSpacing: '1px', textShadow: '0px 1px 0px rgba(255, 255, 255, 0.1)' }}>
              Hover to see our services below, <br></br>if you want to see more, click{' '}
              <a href="/service" className="highlight-text inline-block text-white no-underline transition-all duration-[250ms] relative z-0 cursor-pointer" style={{ textShadow: '0px 1px 0px rgba(255, 255, 255, 0.1)' }}>
                <span>here</span>
              </a>
            </h1>
            <div 
              className="grid grid-cols-3 h-full w-full items-center justify-items-center"
              style={{
                gap: "clamp(20px, 2.5vw, 32px)",
                perspective: "1000px",
                padding: "clamp(12px, 1.5vw, 24px)",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`service-tile relative cursor-pointer transition-all duration-300 ease-out w-full h-full ${
                    activeService === service.id
                      ? "scale-[1.8] z-20 -translate-x-[70px]"
                      : activeService && activeService !== service.id
                      ? "scale-95 opacity-70"
                      : "scale-100 z-10"
                  }`}
                  onMouseEnter={() => setActiveService(service.id)}
                  style={{
                    aspectRatio: "1",
                    boxShadow: "rgba(0, 0, 0, 0.23) 19px 19px 30px",
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center rounded-sm"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <span className="sr-only">{service.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Tiles Grid */}
          <div className="md:hidden w-full mt-8 mb-4 sm:mb-16 px-4">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-lg mx-auto">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`service-tile relative cursor-pointer transition-all duration-200 aspect-square ${
                    activeService === service.id ? "scale-110 z-20" : "scale-100 z-10"
                  }`}
                  onMouseEnter={() => setActiveService(service.id)}
                  onTouchStart={() => setActiveService(activeService === service.id ? null : service.id)}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.23) 19px 19px 30px",
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <span className="sr-only">{service.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}

