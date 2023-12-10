import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cookies } from "next/headers";
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Supajournal | AI Powered Journaling",
  description: "The easiest way to build the habit of journaling.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();

  async function signOut() {
    "use server";

    const supabase = createServerActionClient({ cookies });

    await supabase.auth.signOut();

    redirect("/");
  }

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        {data?.user && (
          <form action={signOut}>
            <button type="submit">Sign Out</button>
          </form>
        )}

        {children}
      </body>
    </html>
  );
}
