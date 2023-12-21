"use client";

import Link from "next/link";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import AvatarMenu from "./avatar-menu";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/types";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClientComponentClient<Database>();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    supabase.auth.onAuthStateChange((event) => {
      getUser();
    });

    getUser();
  }, []);

  return (
    <nav className="container flex items-center justify-between">
      <Link href="/journal" className="text-xl">
        Supa<span className="text-primary">journal</span>
      </Link>
      <div className="flex items-center gap-4">
        {user && <AvatarMenu user={user} />}
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
