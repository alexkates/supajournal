"use client";

import Link from "next/link";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import AvatarMenu from "./avatar-menu";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/types";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    const supabase = createClientComponentClient<Database>();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) setEmail(user.email);
      else setEmail(undefined);
    }

    supabase.auth.onAuthStateChange((event) => {
      getUser();
    });

    getUser();
  }, []);

  return (
    <nav className="container z-10 flex items-center justify-between p-4">
      <Button asChild variant={"ghost"} size={"lg"}>
        <Link href="/journal" className="text-xl">
          Supa<span className="text-primary">journal</span>
        </Link>
      </Button>
      <div className="flex items-center gap-4">
        {email && <AvatarMenu email={email} />}
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
