import { MainNav } from "@/components/layout/MainNav";
import { SsgoiTransition } from "@ssgoi/react";

export default function ContactPage() {
  return (
    <SsgoiTransition id="/contact">
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col gap-10 py-16 px-8 bg-white dark:bg-black">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              Contact
            </h1>
            <MainNav />
          </header>
          <section className="flex flex-1 flex-col justify-center gap-4">
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This is a placeholder page for Contact. Add your contact form or
              contact details here.
            </p>
          </section>
        </main>
      </div>
    </SsgoiTransition>
  );
}


