"use client";

import Link from "next/link";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import AvatarMenu from "./avatar-menu";
import { Button } from "./ui/button";

type Props = {
  email?: string;
};

export default function Navbar({ email }: Props) {
  return (
    <nav className="flex items-center justify-between container p-4 z-10">
      <Button asChild variant={"ghost"} size={"lg"}>
        <Link href="/journal" className="text-xl">
          Supa<span className="text-primary">journal</span>
        </Link>
      </Button>
      <div className="flex items-center">
        {email && <AvatarMenu email={email} />}
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
