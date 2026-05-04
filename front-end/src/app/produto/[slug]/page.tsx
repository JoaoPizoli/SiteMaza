import { PRODUCTS } from "@/lib/products";
import { ProductDetail } from "@/components/products/ProductDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // If not enough related products, fill with others
  if (relatedProducts.length < 3) {
    const others = PRODUCTS.filter(
      (p) =>
        p.id !== product.id && !relatedProducts.find((rp) => rp.id === p.id)
    ).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
