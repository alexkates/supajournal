"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";

export default function AuthForm() {
  const supabase = createClientComponentClient();
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
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
    <Button className="text-3xl gap-x-2 p-8" onClick={signIn}>
      Start Writing
    </Button>
  );
}
