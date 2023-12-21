"use client";

import HeroCTAs from "./hero-ctas";

export default function Hero() {
  return (
    <section className="container flex flex-col items-center gap-12">
      <div className="flex flex-col items-center max-w-2xl gap-2 text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary dark:to-zinc-300 to-zinc-800">
          Build that journaling habit once and for all
        </h1>
        <h2 className="text-xl font-light">Reflect, write, and grow with Supajournal</h2>
      </div>
      <HeroCTAs />
      <video className="max-w-4xl shadow-2xl rounded-md" autoPlay loop muted playsInline>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
