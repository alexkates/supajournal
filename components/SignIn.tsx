"ues client";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthOtpResponse } from "@supabase/supabase-js";

export default function Component() {
  const [email, setEmail] = useState("");
  const [authResponse, setAuthResponse] = useState<AuthOtpResponse | null>(null);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const response = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    setAuthResponse(response);
    router.refresh();
  };

  if (authResponse) {
    return (
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Supajournal</CardTitle>
          <CardDescription>Check your email for the magic link.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"></p>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={handleSignIn}>
                Resend Magic Link
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-xs">Need to resend the magic link?</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Supajournal</CardTitle>
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
        <div className="mt-4 text-center text-sm">
          By proceeding, you agree to our{" "}
          <Link className="underline" href="#">
            Terms of Service
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
