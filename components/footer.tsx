import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden py-4 text-xs text-muted-foreground sm:flex">
      Powered by{" "}
      <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline">
        Vercel
      </Link>
      ,{" "}
      <Link href="https://supabase.io" target="_blank" rel="noopener noreferrer" className="underline">
        Supabase
      </Link>
      , and{" "}
      <Link href="https://openai.com" target="_blank" rel="noopener noreferrer" className="underline">
        OpenAI
      </Link>
    </footer>
  );
}
