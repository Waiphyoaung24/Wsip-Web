"use client";

import HeroSections from "@/components/layout/home/HeroSections";
import { LogoMotionPath } from "@/components/layout/home/LogoMotionPath";
import { MainNav } from "@/components/layout/MainNav";
import { WelcomeSection } from "@/components/layout/home/WelcomeSection";
import { SsgoiTransition } from "@ssgoi/react";
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
        <div className="relative z-10 flex w-full max-w-5xl flex-col gap-4 sm:gap-6 md:gap-8 px-5 sm:px-5 md:px-6 pt-6 sm:pt-5 md:pt-6 pb-8 sm:pb-6 md:pb-8">
          <MainNav />
          <WelcomeSection />
        </div>
      </div>
      <LogoMotionPath />
      <HeroSections />
    </SsgoiTransition>
  );
}
