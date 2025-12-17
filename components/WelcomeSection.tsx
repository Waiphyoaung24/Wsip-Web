import { AnimatedText } from "@/components/AnimatedText";

export function WelcomeSection() {
  return (
    <section className="mt-4 sm:mt-6 flex min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)] items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full items-center">
        <div className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-black dark:text-zinc-50">
            Welcome to your basic Next.js skeleton.
          </h1>
          <AnimatedText className="max-w-xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </AnimatedText>
        </div>
        <div className="flex items-center justify-center order-1 md:order-2">
          <img
            src="http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
            alt="Animated gif"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
}

