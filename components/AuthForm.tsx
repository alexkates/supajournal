"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/types";
import { ThemeMinimal } from "@supabase/auth-ui-shared";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_up"
      appearance={{
        theme: ThemeMinimal,
      }}
      showLinks={true}
      providers={[]}
      redirectTo={`${defaultUrl}/auth/callback`}
    />
  );
}
