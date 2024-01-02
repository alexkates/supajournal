import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://supajournal.app";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="container mx-auto px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
