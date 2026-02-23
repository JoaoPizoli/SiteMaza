"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function ProductsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center py-40 gap-12">
      <motion.div
        className="w-full max-w-[1440px] px-6 xl:px-0 flex flex-col gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 w-full">
          {/* Left: Headings */}
          <motion.div className="flex flex-col gap-8" variants={itemVariants}>
            <div className="flex flex-col gap-2">
              {/* Tag: Produtos */}
              <div className="flex items-center justify-center gap-[10px] px-2 py-1 w-fit rounded-[50px] bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px]">
                <span className="font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
                  PRODUTOS
                </span>
              </div>
              {/* H2 */}
              <h2 className="font-roboto font-semibold text-[49px] leading-[1.4em] text-[#1C1C1C]"> 
                Nossas linhas de produtos.
              </h2>
            </div>
          </motion.div>

          {/* Right: Search Form */}
          <motion.div className="w-full md:w-auto" variants={itemVariants}>
            <div className="flex items-center justify-between w-full md:w-[561px] h-[56px] pl-6 pr-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[200px] shadow-sm">
              <input
                type="text"
                placeholder="Digite o nome do produto"
                className="flex-1 bg-transparent border-none outline-none text-base text-[#64748B] placeholder:text-[#64748B]"
              />
              <button className="w-[47px] h-[41px] flex items-center justify-center bg-[#A00010] rounded-[50px] hover:bg-[#8a000e] transition-colors">
                <Image
                  src="/assets/products/search-btn.svg"
                  alt="Search"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1: Imobiliária */}
          <ProductCard
            title="Imobiliária"
            icon="/assets/figma/icon-imobiliaria.svg"
            image="/assets/figma/imobiliaria.png"
            href="/produtos/imobiliaria"
            variants={itemVariants}
          />

          {/* Card 2: Automotivo */}
          <ProductCard
            title="Automotivo"
            icon="/assets/figma/icon-automotivo.svg"
            image="/assets/figma/automotivo.png"
            href="/produtos/automotivo"
            variants={itemVariants}
          />

          {/* Card 3: Industrial */}
          <ProductCard
            title="Industrial"
            icon="/assets/figma/icon-industrial.svg"
            image="/assets/figma/industrial.png"
            href="/produtos/industrial"
            variants={itemVariants}
          />

          {/* Card 4: Impermeabilizantes */}
          <ProductCard
            title="Impermeabilizantes"
            icon="/assets/figma/icon-impermeabilizantes.svg"
            image="/assets/figma/impermeabilizantes.png"
            href="/produtos/impermeabilizantes"
            variants={itemVariants}
          />
        </div>
      </motion.div>

      {/* Partners / Certificates Section */}
      <motion.div 
        className="w-full max-w-[1440px] px-6 xl:px-0 flex flex-col gap-12 mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-12 w-full">
          {/* Header */}
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-[#E2E8F0]"></div>
             <div className="flex items-center justify-center gap-[10px] px-2 py-1 w-fit rounded-[50px] bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px]">
                <span className="font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
                  CERTIFICADOS
                </span>
              </div>
              <div className="h-px flex-1 bg-[#E2E8F0]"></div>
          </div>

          {/* Logos */}
          <div className="w-full flex justify-center items-center gap-12 flex-wrap">
             <div className="relative w-[85px] h-[96px]">
                <Image
                  src="/assets/certificates/certificate-1.png"
                  alt="Certificate 1"
                  fill
                  className="object-contain"
                />
             </div>
             <div className="relative w-[99px] h-[100px]">
                <Image
                  src="/assets/certificates/certificate-2.png"
                  alt="Certificate 2"
                  fill
                  className="object-contain"
                />
             </div>
             <div className="relative w-[86px] h-[56px]">
                <Image
                  src="/assets/certificates/certificate-3.png"
                  alt="Certificate 3"
                  fill
                  className="object-contain"
                />
             </div>
             <div className="relative w-[110px] h-[59px]">
                <Image
                  src="/assets/certificates/certificate-4.png"
                  alt="Certificate 4"
                  fill
                  className="object-contain"
                />
             </div>
             <div className="relative w-[110px] h-[55px]">
                <Image
                  src="/assets/certificates/certificate-5.png"
                  alt="Certificate 5"
                  fill
                  className="object-contain"
                />
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

interface ProductCardProps {
  title: string;
  icon: string;
  image: string;
  href: string;
  variants: Variants;
}

function ProductCard({ title, icon, image, href, variants }: ProductCardProps) {
  return (
    <motion.div
      className="w-full"
      variants={variants}
    >
      <Link href={href} className="group relative block w-full h-[400px] rounded-lg overflow-hidden cursor-pointer">
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg flex items-center justify-between transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-[#F8FAFC] rounded">
                <Image src={icon} alt="" width={20} height={20} />
              </div>
              <span className="font-bold text-lg text-[#1C1C1C]">{title}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1C1C1C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                VER MAIS
              </span>
              <div className="w-6 h-6 flex items-center justify-center bg-[#FBB943] rounded-full">
                <Image 
                  src="/assets/figma/arrow-up-right.svg" 
                  alt="" 
                  width={12} 
                  height={12} 
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

