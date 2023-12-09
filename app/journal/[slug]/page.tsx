export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Journal: {params.slug}</div>;
}
