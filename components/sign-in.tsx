"ues client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { PencilLineIcon } from "lucide-react";

export default function SignIn() {
  async function signInWithGoogle() {
    const supabase = createClientComponentClient();
    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        "http://localhost:3000/";
      // Make sure to include `https://` when not localhost.
      url = url.includes("http") ? url : `https://${url}/journal`;
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
      return url;
    };

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL(),
      },
    });
  }

  return (
    <Button size={"lg"} onClick={signInWithGoogle} className="text-2xl">
      <PencilLineIcon className="mr-2" />
      Let's get writing!
    </Button>
  );
}
