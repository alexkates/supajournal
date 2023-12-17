"use client";

import Link from "next/link";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between container p-4 z-10">
      <Link href="/journal">
        <h1 className="text-4xl font-bold transition duration-200 hover:scale-[1.10]">
          Supa<span className="text-primary">journal</span>
        </h1>
      </Link>
      <ThemeModeToggle />
    </nav>
  );
}
