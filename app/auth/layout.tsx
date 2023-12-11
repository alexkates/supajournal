export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto">
      <section className="flex flex-col justify-center h-screen items-center">{children}</section>
    </main>
  );
}
