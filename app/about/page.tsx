import { MainNav } from "@/components/layout/MainNav";
import { SsgoiTransition } from "@ssgoi/react";

export default function AboutPage() {
  return (
    <SsgoiTransition id="/about">
      <div className="flex min-h-screen items-start justify-center bg-black font-sans">
        <main className="flex w-full max-w-5xl flex-col gap-8 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
          <header className="flex h-16 items-center justify-between sm:h-20">
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              About
            </h1>
            <MainNav />
          </header>
          <section className="mt-6 flex flex-col gap-4">
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This is a minimal example page used to demonstrate routing and page
              transitions between <code>/</code> and <code>/about</code>.
            </p>
          </section>
        </main>
      </div>
    </SsgoiTransition>
  );
}


