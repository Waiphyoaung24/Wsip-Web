export function WelcomeSection() {
  return (
    <section className="mt-6 flex min-h-[calc(100vh-8rem)] items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
            Welcome to your basic Next.js skeleton.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            This project includes simple routing, a shared layout, and page
            transition hooks so you can start building features without worrying
            about boilerplate.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
            alt="Animated gif"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
}

