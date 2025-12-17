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
  icon?: string;
}

const services: Service[] = [
  {
    id: "av",
    name: "Antivirus",
    title: "Antivirus",
    description:
      "Effectively catches all viruses. Our Antivirus includes Behavioural Detection, which spots new viruses because of the actions they take on your computer and stops them before they can do damage. Together with Signature-based Detection, which identifies the 'signatures' of known malware, you gain a multi-layered defence system for your PC that's virtually impenetrable.\n\nTop detection rates of viruses and malware have been proven by independent labs.",
  },
  {
    id: "firewall",
    name: "Firewall",
    title: "Firewall",
    description:
      "Protect your computer from unwanted hackers and identity thieves with this first line of defense. The firewall protects you against network attacks and prevents cyber crooks from entering your system.",
  },
  {
    id: "backup",
    name: "Backup",
    title: "Backup",
    description:
      "We've included 5GB of FREE online storage so you can keep your important data, photos, music and more safe. You can choose what you want to back up and how often, or just set the feature to auto backup. You can even back up content directly from folders with one click. And here's more: your back-up data is easily accessible whenever you want to view it or restore it to another computer or even your smart phone.",
  },
  {
    id: "vulnerabilities",
    name: "Vulnerabilities",
    title: "Vulnerabilities",
    description:
      "Checks your computer for out-dated software that hackers and viruses can exploit to gain access to your system, damage it or steal personal information. Once this software is flagged up it can then be removed.",
  },
  {
    id: "spamfilter",
    name: "Spamfilter",
    title: "Spamfilter",
    description:
      "Spamfilter. No spam. No scam. BullGuard Spamfilter keeps out junk mail and email scams, like phishing attempts, virus spreading and foreign language spam. You can also customize filters to block emails you don't want to receive.",
  },
  {
    id: "smp",
    name: "Social Media Protect",
    title: "Social Media Protect",
    description:
      "BullGuard helps you to monitor your children's Facebook profiles, including private messages and photos. We flag all possible threats to your children's safety, and notify you each time we find inappropriate content and ill-intended strangers.",
  },
  {
    id: "tuneup",
    name: "PC Tune-up",
    title: "PC Tune-up",
    description:
      "You'll never have to wait again to get your computer up and running. BullGuard's PC Tune Up removes unnecessary files and frees up memory so your computer runs faster.",
  },
  {
    id: "idp",
    name: "Identity Protection",
    title: "Identity Protection",
    description:
      "BullGuard scans the entire web for your usernames, email and postal addresses, phone numbers, credit card numbers, and more. Whenever one of your registered details is made public online, we immediately alert you via email and SMS, and provide you with advice on what to do next.\n\nIdentity Protection is only available for US, UK, Canada, Denmark, Germany, France, Ireland and Netherlands residents.",
  },
  {
    id: "parental",
    name: "Parental Control",
    title: "Parental Control",
    description:
      "Use BullGuard Parental Control to keep your children in check. You can block their access to suspicious websites, limit their time on the internet and monitor their activity. BullGuard helps you to protect them from being exposed to cyberbullying and inappropriate content.",
  },
];

export function OurServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: true,
        },
        opacity: 0,
        y: 30,
        duration: 1,
      });
    }

    // Animate subtitle with fade-in
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: true,
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full overflow-x-hidden min-h-screen">
      <div className="relative w-full h-full px-4 sm:px-6 md:px-8 lg:pr-[229px]">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-white text-center text-2xl sm:text-3xl md:text-[38px] font-light pt-8 sm:pt-[45px] pb-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        >
          Our Services
        </h1>

        {/* Subtitle with Animation */}
        <div className="flex items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 md:px-8">
          <p 
            ref={subtitleRef}
            className="text-white text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl leading-relaxed font-light"
          >
            WISP Studio is a Bangkok-based creative collective operating at the intersection of strategic brand design and innovative visual technology.
          </p>
          
        </div>

       

        {/* Main Content Container */}
        <div className="relative w-full flex flex-col md:flex-row items-start justify-between min-h-[400px] md:min-h-[600px] lg:min-h-[809px]">
         
          {/* Feature Content - Left Side */}
          <div className="relative w-full md:w-[30%] min-h-[300px] sm:min-h-[400px] mt-8 sm:mt-12 md:mt-0 md:top-[188px] md:left-[95px] px-4 sm:px-6 md:px-0">
            {services.map((service) => (
              <div
                key={service.id}
                className={`feature-content absolute inset-0 transition-opacity duration-100 ${
                  activeService === service.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="text-white">
                  <h2
                    className="text-2xl sm:text-3xl md:text-[37px] font-normal mb-2 sm:mb-[10px] pl-0 md:pl-[72px] transition-all duration-200"
                    style={{
                      marginLeft: activeService === service.id ? "0" : "-24px",
                      opacity: activeService === service.id ? 1 : 0,
                    }}
                  >
                    {service.title}
                  </h2>
                  <div
                    className="mb-2 sm:mb-[10px] transition-all duration-300"
                    style={{
                      width: activeService === service.id ? "100%" : "0",
                      opacity: activeService === service.id ? 1 : 0,
                    }}
                  >
                    <span className="block w-full border-t border-white/40 h-px" />
                  </div>
                  <p
                    className="text-sm sm:text-base md:text-[15px] text-white leading-relaxed sm:leading-[1.8] pr-0 md:pr-[32px] pt-4 sm:pt-6 md:pt-[32px] transition-opacity duration-300"
                    style={{
                      opacity: activeService === service.id ? 1 : 0,
                    }}
                  >
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
                    {service.id === "idp" && (
                      <span className="italic opacity-50 text-[10px] sm:text-[11px] block mt-2">
                        Identity Protection is only available for US, UK, Canada, Denmark, Germany, France, Ireland and Netherlands residents.
                      </span>
                    )}
                  </p>
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
              top: "clamp(100px, 10vh, 142px)",
              right: "clamp(-60px, -5vw, -20px)",
              zIndex: 3,
              transform: "scale(0.6) rotateX(0deg) rotateZ(6deg) rotateY(-5deg) skewX(-8deg) skewY(0deg)",
              transformOrigin: "center center",
            }}
            onMouseLeave={() => setActiveService(null)}
          >
            <div 
              className="grid grid-cols-3 h-full w-full"
              style={{
                gap: "16px",
                perspective: "1000px",
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`service-tile relative cursor-pointer transition-all duration-300 ease-out ${
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
                      backgroundImage: service.id === "av" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/avTile.jpg)" :
                                   service.id === "firewall" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/firewallTile.jpg)" :
                                   service.id === "backup" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/backupTile.jpg)" :
                                   service.id === "vulnerabilities" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/vulnerableTile.jpg)" :
                                   service.id === "spamfilter" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/spamfilterTile.jpg)" :
                                   service.id === "smp" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/smpTile.jpg)" :
                                   service.id === "tuneup" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/tuneupTile.jpg)" :
                                   service.id === "idp" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/idpTile.jpg)" :
                                   "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/parentalTile.jpg)",
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
          <div className="md:hidden w-full mt-8 mb-12 sm:mb-16 px-4">
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
                      backgroundImage: service.id === "av" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/avTile.jpg)" :
                                   service.id === "firewall" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/firewallTile.jpg)" :
                                   service.id === "backup" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/backupTile.jpg)" :
                                   service.id === "vulnerabilities" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/vulnerableTile.jpg)" :
                                   service.id === "spamfilter" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/spamfilterTile.jpg)" :
                                   service.id === "smp" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/smpTile.jpg)" :
                                   service.id === "tuneup" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/tuneupTile.jpg)" :
                                   service.id === "idp" ? "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/idpTile.jpg)" :
                                   "url(http://bullguard.com/marketingfiles/ext/umbracoLanding/demo/images/featureslist/parentalTile.jpg)",
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

