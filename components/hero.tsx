"use client";

import HeroCTAs from "./hero-ctas";

export default function Hero() {
  return (
    <section className="container flex flex-col items-center gap-12">
      <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
        <h1 className="bg-gradient-to-r from-primary to-zinc-800 bg-clip-text text-6xl font-bold text-transparent dark:to-zinc-300">
          Build that journaling habit once and for all
        </h1>
        <h2 className="text-xl font-light">Reflect, write, and grow with Supajournal</h2>
      </div>
      <HeroCTAs />
      <video className="rounded-md shadow-2xl" autoPlay loop muted playsInline>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
