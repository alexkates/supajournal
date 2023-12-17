"use client";

import SignIn from "./sign-in";

export default function HeroHeader() {
  return (
    <section className="container flex flex-col h-full pt-24">
      <div className="flex flex-col items-center gap-12">
        <div className="space-y-8 text-center">
          <h1 className="text-6xl font-bold">
            Build the <span className="text-primary">journaling</span> habit
            <br />
            once and for all.
          </h1>
          <h2 className="font-light text-muted-foreground text-xl">
            Supajournal makes it easy to build the habit of journaling
            <br />
            by providing you with a daily writing prompt powered by OpenAI's GPT.
          </h2>
        </div>
        <SignIn />
      </div>
    </section>
  );
}
