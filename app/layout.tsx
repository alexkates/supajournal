import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Supajournal | A journaling app powered by Supabase and OpenAI",
  description: "A journaling app powered by Supabase and OpenAI",
  keywords: ["journal", "journaling", "supabase", "openai", "gpt-3", "gpt-3.5", "gpt-4"],
  authors: [
    {
      name: "Alex Kates",
      url: "https://alexkates.dev",
    },
  ],
  creator: "Alex Kates",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Supajournal | A journaling app powered by Supabase and OpenAI",
    description: "A journaling app powered by Supabase and OpenAI",
    siteName: "Supajournal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supajournal | A journaling app powered by Supabase and OpenAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supajournal | A journaling app powered by Supabase and OpenAI",
    description: "A journaling app powered by Supabase and OpenAI",
    images: ["/og-image.png"],
    creator: "@thealexkates",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex h-screen flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar email={user?.email} />
          <main className="container mx-auto px-4 h-full">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
