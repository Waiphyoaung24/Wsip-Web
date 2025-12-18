"use client";

import HeroSections from "@/components/layout/home/HeroSections";
import { LogoMotionPath } from "@/components/layout/home/LogoMotionPath";
import { MainNav } from "@/components/layout/MainNav";
import { WelcomeSection } from "@/components/layout/home/WelcomeSection";
import { SsgoiTransition } from "@ssgoi/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasVisited = localStorage.getItem("hasVisitedOnboarding");
    
    // If first-time user, redirect to onboarding page
    if (hasVisited !== "true") {
      router.replace("/onboarding");
      return;
    }

    // Mark as ready to render home page
    setIsReady(true);
  }, [router]);

  // Don't render anything until we've checked localStorage
  // This prevents flash of content before redirect
  if (!isReady) {
    return null;
  }

  return (
    <SsgoiTransition id="/">
      <div className="relative flex min-h-screen items-start justify-center font-sans">
        <main className="relative z-10 flex w-full max-w-5xl flex-col gap-4 sm:gap-6 md:gap-8 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 pb-4 sm:pb-6 md:pb-8">
          <header className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/imgs/logo.png"
                alt="Wsip logo"
                width={100}
                height={26}
                className="w-20 h-auto sm:w-24 md:w-[120px]"
                priority
              />
            </div>
            <MainNav />
          </header>
          <WelcomeSection />
        </main>
      </div>
      <LogoMotionPath />
      <HeroSections />
    </SsgoiTransition>
  );
}
