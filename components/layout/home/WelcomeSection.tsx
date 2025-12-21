"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function WelcomeSection() {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop / tablet only: keep existing vertical infinite scroll
    mm.add("(min-width: 768px)", () => {
      const duration = 18;

      gsap.to(".welcome-slider-1 .welcome-img-wrap", {
        yPercent: -320,
        repeat: -1,
        ease: "none",
        duration,
        stagger: {
          each: duration / 5,
          repeat: -1,
        },
      });

      gsap.to(".welcome-slider-2 .welcome-img-wrap", {
        yPercent: 320,
        repeat: -1,
        ease: "none",
        duration,
        stagger: {
          each: duration / 5,
          repeat: -1,
        },
      });
    });

    // No GSAP animation for mobile – handled via CSS horizontal scroll

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="mt-6 sm:mt-8 md:mt-4 flex min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)] items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-6 lg:gap-8 w-full items-center">
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-4 lg:gap-6 order-2 md:order-1 px-2 sm:px-4 md:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-2 sm:mb-3 md:mb-0">
            Welcome to your basic Next.js skeleton.
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-white/90">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto overflow-hidden">
          <div ref={galleryRef} className="welcome-gallery" aria-hidden="true">
            <div className="welcome-slider welcome-slider-1">
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-1/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-2/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-3/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-4/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-5/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>

            <div className="welcome-slider welcome-slider-2">
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-6/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-7/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-8/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-9/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="welcome-img-wrap">
                <img
                  src="https://picsum.photos/seed/wisp-10/600/900"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

