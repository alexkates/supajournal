import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucidePencil, PencilLineIcon } from "lucide-react";

export default function HeroHeader() {
  return (
    <section className="container flex flex-col h-full justify-center -translate-y-[72px]">
      <div className="flex flex-col items-center gap-8">
        <div className="space-y-2 text-center">
          <h1 className="text-6xl font-bold">Supajournal</h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-3xl text-left">
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
