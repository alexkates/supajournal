import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucidePencil, PencilLineIcon } from "lucide-react";

export default function HeroHeader() {
  return (
    <section className="container flex flex-col h-full pt-24">
      <div className="flex flex-col items-center gap-8">
        <div className="space-y-8 text-center">
          <h1 className="text-6xl font-bold">
            Build the <span className="text-primary">journaling</span> habit
            <br />
            once and for all.
          </h1>
          <h2 className="font-light text-muted-foreground text-xl text-left">
            Supajournal makes it easy to build the habit of journaling by providing you with a daily writing prompt powered by OpenAI's GPT.
          </h2>
        </div>
        <Button size={"lg"} asChild>
          <Link href="/journal" className="flex items-center gap-2">
            <PencilLineIcon className="w-4 h-4" />
            Start Writing
          </Link>
        </Button>
      </div>
    </section>
  );
}
