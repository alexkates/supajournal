"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function GetStartedButton() {
  const supabase = createClientComponentClient();
  const getURL = () => {
    let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";
    url = url.includes("http") ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  };

  return (
    <div className="flex justify-evenly w-ful max-w-xl gap-4">
      <Button size={"lg"} onClick={signIn}>
        Get started
      </Button>

      <Button asChild size={"icon"} variant={"outline"}>
        <Link href="https://github.com/alexkates/supajournal" target="_blank">
          <GithubIcon size={24} />
        </Link>
      </Button>
    </div>
  );
}
