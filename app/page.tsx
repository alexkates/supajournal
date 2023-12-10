import Link from "next/link";

export default async function Index() {
  return (
    <main>
      <h1>Index</h1>
      <Link href="/journal">Get Started</Link>
    </main>
  );
}
