import { SiteConfig, ContactConfig } from "@/types";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const siteConfig: SiteConfig = {
  name: "Supajournal",
  author: "alexkates",
  description: "Your AI powered journaling companion",
  keywords: ["journal", "journaling", "supajournal", "supabase", "Next.js", "React", "Tailwind CSS"],
  url: {
    base: baseUrl,
    author: "https://alexkates.dev",
  },
  ogImage: `${baseUrl}/og.jpg`,
};
