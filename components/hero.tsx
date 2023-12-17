"use client";

import SignIn from "./sign-in";

export default function HeroHeader() {
  return (
    <section className="container flex flex-col h-full pt-24">
      <div className="flex flex-col items-center gap-12">
        <div className="space-y-8 text-center">
          <h1 className="text-6xl font-bold">
            Build that <span className="text-primary ">journaling</span> habit
            <br />
            once and for all.
          </h1>
          <h2 className="font-light text-muted-foreground text-xl">
            Supajournal makes it easy to build that <span className="text-primary underline">journaling habit</span>
            <br />
            by providing you with <span className="text-primary underline">insights</span> and meaningful{" "}
            <span className="text-primary underline">writing prompts</span>
            powered by OpenAI's GPT.
          </h2>
        </div>
        <SignIn />
      </div>
    </section>
  );
}
