"ues client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { PencilLineIcon } from "lucide-react";

export default function SignIn() {
  const supabase = createClientComponentClient();

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/journal",
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
