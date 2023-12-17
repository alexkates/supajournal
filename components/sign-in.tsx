"ues client";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { AuthOtpResponse } from "@supabase/supabase-js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [authResponse, setAuthResponse] = useState<AuthOtpResponse | null>(null);

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

  const handleSignIn = async () => {
    const response = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${getURL()}/auth/callback`,
      },
    });

    setAuthResponse(response);
  };

  if (authResponse) {
    return (
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">You're almost there</CardTitle>
          <CardDescription>Check your email to finish signing in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"link"} onClick={handleSignIn}>
            Need to resend the magic link?{" "}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in to get started</CardTitle>
        <CardDescription>Enter your email below to receive a magic link for authentication</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleSignIn}>
            Send Magic Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
