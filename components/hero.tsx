"use client";

import SignIn from "./sign-in";

export default function Hero() {
  return (
    <section className="container flex flex-col h-full pt-6 sm:pt-24">
      <div className="flex flex-col items-center gap-12">
        <div className="space-y-14 sm:space-y-8 text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary dark:to-accent to-zinc-800">
            Build that journaling habit
            <br />
            once and for all
          </h1>
          <h2 className="font-light text-muted-foreground text-xl">
            Supajournal makes it easy to build thatjournaling habit
            <br />
            by providing you withinsights and meaningful writing prompts powered by OpenAI's GPT
          </h2>
        </div>
        <SignIn />
        <video className="w-full max-w-2xl shadow-2xl rounded-md" autoPlay loop muted playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
