import { ScrollSections } from "@/components/HeroSections";
import { MainNav } from "@/components/layout/MainNav";
import { OnBoardingSection } from "@/components/OnBoardingSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { SsgoiTransition } from "@ssgoi/react";
import Image from "next/image";

export default function Home() {
  return (
    
    <SsgoiTransition id="/">
      <OnBoardingSection />
      <div className="relative flex min-h-screen items-start justify-center font-sans">
        <main className="relative z-10 flex w-full max-w-5xl flex-col gap-8 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
          <header className="flex h-16 items-center justify-between sm:h-20">
            <div className="flex items-center gap-2">
            <Image
                src="/imgs/logo.png"
                alt="Wsip logo"
                width={120}
                height={32}
                priority></Image>
            </div>
            <MainNav />
          </header>
          <WelcomeSection />
        </main>
      </div>
      <ScrollSections />
      
    </SsgoiTransition>

  );
}
