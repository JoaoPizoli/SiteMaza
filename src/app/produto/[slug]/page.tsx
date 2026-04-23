import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import { PRODUCTS } from "@/lib/products";

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
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (item) => item.line === product.line && item.id !== product.id,
  ).slice(0, 3);

  if (relatedProducts.length < 3) {
    const fallbackProducts = PRODUCTS.filter(
      (item) =>
        item.id !== product.id &&
        !relatedProducts.find((related) => related.id === item.id),
    ).slice(0, 3 - relatedProducts.length);

    relatedProducts.push(...fallbackProducts);
  }

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
