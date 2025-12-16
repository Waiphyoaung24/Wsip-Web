import { MainNav } from "@/components/layout/MainNav";
import { OverboardSection } from "@/components/OverboardSection";
import { SsgoiTransition } from "@ssgoi/react";
import Image from "next/image";

export default function Home() {
  return (
    
    <SsgoiTransition id="/">
      <OverboardSection />
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

          <section className="mt-6 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
              Welcome to your basic Next.js skeleton.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This project includes simple routing, a shared layout, and page
              transition hooks so you can start building features without worrying
              about boilerplate.
            </p>
          </section>
        </main>
      </div>
    </SsgoiTransition>
  );
}
