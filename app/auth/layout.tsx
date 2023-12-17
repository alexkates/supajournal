export default async function Layout({ children }: { children: React.ReactNode }) {
  return <main className="container mx-auto md:py-24">{children}</main>;
}
