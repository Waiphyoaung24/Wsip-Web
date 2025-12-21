import { MainNav } from "@/components/layout/MainNav";
import { SsgoiTransition } from "@ssgoi/react";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <SsgoiTransition id="/about-us">
      <div className="relative flex min-h-screen items-start justify-center font-sans">
        <div className="flex w-full max-w-5xl flex-col gap-8 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <MainNav />
          <section className="mt-6 flex flex-col gap-4">
            <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
              About Us
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This is a placeholder page for About Us. You can add your company
              story and team information here.
            </p>
          </section>
        </div>
      </div>
    </SsgoiTransition>
  );
}


