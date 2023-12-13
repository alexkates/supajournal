import ThemeSelector from "@/components/ThemeSelector";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Supajournal | AI Powered Journaling",
  description: "The easiest way to build the habit of journaling.",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
