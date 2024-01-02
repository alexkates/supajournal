import Link from "next/link";
import React from "react";

export default function Footer() {
  const links = [
    { href: "https://vercel.com", text: "Vercel" },
    { href: "https://supabase.io", text: "Supabase" },
    { href: "https://openai.com", text: "OpenAI" },
  ];

  return (
    <footer className="hidden w-full items-center justify-center py-4 text-xs text-muted-foreground sm:flex">
      <span>Powered by</span>
      {links.map((link, index) => (
        <span key={index}>
          <Link href={link.href} target="_blank" rel="noopener noreferrer" className="pl-1 underline">
            {link.text}
          </Link>
          {index !== links.length - 1 && ", "}
        </span>
      ))}
    </footer>
  );
}
