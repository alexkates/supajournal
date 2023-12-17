"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const handleClick = async () => {
    setNavbar(false);
  };

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navbar]);

  return (
    <header className="select-none">
      <nav className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <Link href="/" onClick={handleClick}>
              <h1 className="text-2xl font-bold duration-200 lg:hover:scale-[1.10]">Supajournal</h1>
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <ThemeModeToggle />
        </div>
      </nav>
    </header>
  );
}
