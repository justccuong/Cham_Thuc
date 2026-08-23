import { redirect } from "next/navigation";

export default async function HdsdPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; "san-pham"?: string }>;
}) {
  const params = await searchParams;
  const product = params.product || params["san-pham"];
  if (product) {
    redirect(`/huong-dan?product=${encodeURIComponent(product)}`);
  }
  redirect("/huong-dan");
}
