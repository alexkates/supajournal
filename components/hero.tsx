"use client";

import HeroCTAs from "./hero-ctas";

export default function Hero() {
  return (
    <section className="container flex flex-col h-full pt-6 sm:pt-24">
      <div className="flex flex-col items-center gap-12 w-full">
        <div className="space-y-14 sm:space-y-8 text-center w-full max-w-2xl">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary dark:to-zinc-300 to-zinc-800">
            Build that journaling habit once and for all
          </h1>
          <div className="font-light">
            <h2 className="text-xl">Reflect, write, and grow with Supajournal</h2>
            Powered by{" "}
            <a href="https://supabase.io" target="_blank" rel="noopener noreferrer" className="text-gradient underline text-primary">
              Supabase
            </a>{" "}
            and{" "}
            <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="underline text-primary">
              OpenAI
            </a>
          </div>
        </div>
        <HeroCTAs />
        <video className="w-full max-w-4xl shadow-2xl rounded-md" autoPlay loop muted playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
