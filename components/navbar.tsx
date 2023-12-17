"use client";

import Link from "next/link";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import AvatarMenu from "./avatar-menu";

type Props = {
  email?: string;
};

export default function Navbar({ email }: Props) {
  return (
    <nav className="flex items-center justify-between container p-4 z-10">
      <Link href="/journal">
        <h1 className="text-4xl font-bold transition duration-200 hover:scale-[1.10]">
          Supa<span className="text-primary">journal</span>
        </h1>
      </Link>
      <div className="flex items-center">
        {email && <AvatarMenu email={email} />}
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
