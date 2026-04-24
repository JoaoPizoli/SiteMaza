"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/ProductCard";
import type { PRODUCTS } from "@/lib/products";

type Product = typeof PRODUCTS[0];

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  return (
    <div className="flex flex-col gap-[72px] w-full max-w-[1440px] mx-auto px-6 xl:px-0 py-20 md:pt-[180px] md:pb-[100px]">
      {/* Product Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-[72px]">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-[10px] flex-1"
        >
          <h1 className="font-roboto font-semibold text-[32px] md:text-[39px] leading-[1.4em] text-[#1C1C1C]">
            {product.title}
          </h1>
          <div className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#5F5F5A] whitespace-pre-line">
            {product.description}
            {/* Extended description mock */}
            {"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus dui, porta eu leo in, fermentum commodo libero. Vivamus rhoncus velit ut metus suscipit pharetra. Proin vitae ipsum at ligula ultrices consectetur ac non odio. Sed ipsum lacus, rutrum ac tellus a, feugiat ultrices eros. Duis augue libero, suscipit quis vulputate a, venenatis nec nibh. Mauris dictum velit ac turpis viverra blandit. Ut sem nulla, dictum eu hendrerit vitae, viverra eget urna. Maecenas eget commodo tortor, eget tempor nunc. Praesent vitae eros nisi. Vivamus pharetra tellus neque, sit amet dictum est gravida in.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ac nisl sed nulla maximus lobortis ut ac risus. Cras ac nisl quis justo lobortis mollis in at erat. Aenean nec mi pulvinar, dignissim ligula eu, pretium mi. Nullam condimentum id enim ut pharetra. In dignissim nisl sem, vitae ultrices libero blandit eget. Phasellus lacinia, erat quis aliquam tristique, odio ante tincidunt est, non dictum justo arcu non mi. Cras quis viverra erat. Aenean non quam et leo tincidunt suscipit.\n\nAenean suscipit, ex in sagittis rutrum, lorem massa auctor massa, eu aliquam libero nisi at odio. Sed in enim enim. Nam a vulputate dui, sed imperdiet mauris. Morbi rutrum posuere sagittis. Ut euismod facilisis mi vel rhoncus. Praesent sit amet tortor at dolor consequat sollicitudin eu ut justo. Duis sollicitudin enim semper, molestie tortor id, pulvinar nulla. Nulla ut suscipit purus. Mauris placerat sem dolor, vitae porta arcu luctus a. Maecenas nec risus ac lectus fringilla pharetra non non massa. Quisque tempor mauris ac tellus commodo eleifend.\n\nMorbi turpis leo, facilisis a accumsan at, tempor in magna. Ut dignissim molestie cursus. Etiam ac efficitur turpis. Curabitur fringilla metus at orci dictum, id consectetur odio iaculis. Aliquam semper quam eget lacinia pulvinar. Mauris viverra mauris eros, commodo vulputate elit posuere sit amet. Suspendisse consequat iaculis imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
          </div>
        </motion.div>

        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative w-full md:w-[581px] aspect-square shrink-0"
        >
             {/* Using a placeholder if specific image not available, but product.image is set */}
            <div className="relative w-full h-full bg-[#F1F5F9] rounded-[20px] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </motion.div>
      </div>

      {/* Related Products Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="flex flex-col gap-12"
      >
        <h3 className="font-roboto font-semibold text-[32px] md:text-[39px] leading-[1.4em] text-[#1C1C1C]">
          Produtos relacionados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct, index) => (
            <motion.div
              key={relatedProduct.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ProductCard
                image={relatedProduct.image}
                category={relatedProduct.category}
                description={relatedProduct.description}
                href={relatedProduct.href}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
