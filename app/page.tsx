import { MainNav } from "@/components/layout/MainNav";
import { SsgoiTransition } from "@ssgoi/react";
import Image from "next/image";

export default function Home() {
  return (
    <SsgoiTransition id="/">
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col gap-10 py-16 px-8 bg-white dark:bg-black">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={90}
                height={18}
                priority
              />
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Skeleton
              </span>
            </div>
            <MainNav />
          </header>

          <section className="flex flex-1 flex-col justify-center gap-6">
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
