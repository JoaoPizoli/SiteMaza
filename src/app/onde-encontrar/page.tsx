"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FindUsPage() {
  const [selectedType, setSelectedType] = useState<'representative' | 'store'>('representative');

  return (
    <main className="w-full bg-white font-roboto">
      {/* Hero Section */}
      <section className="relative w-full h-[460px] flex items-end justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/assets/lojas/hero-bg.png"
            alt="Maza Lojas Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 w-full max-w-[1440px] mx-auto px-6 xl:px-0 pb-[64px] flex flex-col items-center justify-end text-left gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Content Wrapper - Centered but Left Aligned */}
          <div className="flex flex-col items-start gap-3">
            {/* Badge + Title Group */}
            <div className="flex flex-col items-start gap-1">
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-[8px] px-2 py-1 rounded-[50px] border border-[rgba(255,217,150,0.3)] bg-[rgba(251,185,67,0.2)] w-fit backdrop-blur-[87.7px]"
                variants={itemVariants}
              >
                 <div className="flex items-center justify-center">
                    <span className="text-[#FBB943] font-black text-[11px] leading-[1.5em] tracking-[0.12em]">LOJAS & REPRESENTANTES MAZA</span>
                 </div>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-white font-semibold text-[32px] md:text-[48px] leading-[1.4em]"
                variants={itemVariants}
              >
                Presença em todos os estados do Brasil!
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p 
              className="text-[#FCFCF7] font-medium text-[14px] leading-[1.5em] max-w-[561px]"
              variants={itemVariants}
            >
              Localize o ponto de venda ou representante mais próximo.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* D2 Section - Search & Results */}
      <section className="w-full max-w-[1440px] mx-auto px-6 xl:px-0 py-[80px] flex flex-col gap-10">
        {/* Search Filter Form */}
        <motion.div 
          className="flex flex-col items-center gap-[29px] w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
           {/* Filters Row */}
           <div className="flex flex-col lg:flex-row gap-[32px] items-center justify-center w-full">
              {/* State Select */}
              <div className="w-full max-w-[303px] h-[60px] px-[32px] flex items-center justify-between bg-gradient-to-r from-[#FCFCF7] to-[#FAFAFA] border border-[rgba(215,215,215,0.3)] backdrop-blur-[10px] rounded-[200px] cursor-pointer hover:border-[#FBB943] transition-colors">
                 <span className="text-[#5F5F5A] text-[16px] leading-[1.5em]">Selecione o seu estado</span>
                 <Image src="/assets/lojas/icon-state.svg" alt="Select" width={18} height={18} />
              </div>

              {/* City Select */}
              <div className="w-full max-w-[303px] h-[60px] px-[32px] flex items-center justify-between bg-gradient-to-r from-[#FCFCF7] to-[#FAFAFA] border border-[rgba(215,215,215,0.3)] backdrop-blur-[10px] rounded-[200px] cursor-pointer hover:border-[#FBB943] transition-colors">
                 <span className="text-[#5F5F5A] text-[16px] leading-[1.5em]">Selecione a sua cidade</span>
                 <Image src="/assets/lojas/icon-city.svg" alt="Select" width={18} height={18} />
              </div>
           </div>

           {/* Radio Buttons Row */}
           <div className="flex flex-row gap-[32px] items-center justify-center">
              {/* Radio 1 - Representante */}
              <div 
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => setSelectedType('representative')}
              >
                 <div className={`w-[17px] h-[17px] rounded-full border border-[#B11116] flex items-center justify-center transition-colors ${selectedType === 'representative' ? 'bg-[#B11116]' : 'bg-white'}`}>
                    {/* Selected state: filled red circle */}
                 </div>
                 <span className="text-[#5F5F5A] text-[16px] leading-[1.5em]">Representante</span>
              </div>

              {/* Radio 2 - Loja Física */}
              <div 
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => setSelectedType('store')}
              >
                 <div className={`w-[17px] h-[17px] rounded-full border border-[#B11116] flex items-center justify-center transition-colors ${selectedType === 'store' ? 'bg-[#B11116]' : 'bg-white'}`}>
                     {/* Selected state: filled red circle */}
                 </div>
                 <span className="text-[#5F5F5A] text-[16px] leading-[1.5em]">Loja física</span>
              </div>
           </div>

           {/* Search Button Row */}
           <div className="flex items-center justify-center">
              <button className="flex items-center justify-center gap-[4px] px-[32px] h-[62px] bg-[#A00010] border-[4px] border-[rgba(160,0,16,0.4)] rounded-[50px] hover:bg-[#8f0d12] transition-colors group shadow-lg">
                 <span className="text-[#F1F1EA] font-semibold text-[17px] leading-[1.5em] tracking-[0.03em]">PESQUISAR</span>
                 <Image src="/assets/lojas/icon-search.svg" alt="Search" width={24} height={24} className="brightness-0 invert" />
              </button>
           </div>
           
           {/* Divider */}
           <div className="w-full h-[1px] bg-[#F1F1EA] mt-2"></div>
        </motion.div>

        {/* Results Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Card 1 */}
          <motion.div 
             className="flex flex-col gap-6 p-6 bg-white border border-[#EBEBEB] rounded-[10px] hover:shadow-lg transition-shadow"
             variants={itemVariants}
          >
             {/* Header */}
             <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-[10px] px-3 py-1.5 rounded-[50px] border border-[rgba(255,217,150,0.5)] bg-[rgba(251,185,67,0.1)] w-fit">
                   <span className="text-[#FBB943] font-black text-[11px] leading-[1.5em] tracking-[0.12em]">LOJA</span>
                </div>
                <h3 className="text-[#1C1C1C] font-semibold text-[18px] leading-[1.4em]">
                   RICARDO S. FARINI - FARINI REPRESENTAÇÃO COMERCIAL LTDA
                </h3>
             </div>

             {/* Info List */}
             <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex items-start gap-3">
                   <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#F8F8F8] rounded-[4px] flex items-center justify-center">
                      <Image src="/assets/lojas/icon-email.svg" alt="Email" width={18} height={18} />
                   </div>
                   <span className="text-[#5F5F5A] text-[14px] leading-[1.5em] py-1 break-all">diretoria@amazonfortimp.com.br</span>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-3">
                   <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#F8F8F8] rounded-[4px] flex items-center justify-center">
                      <Image src="/assets/lojas/icon-phone.svg" alt="Phone" width={18} height={18} />
                   </div>
                   <span className="text-[#5F5F5A] text-[14px] leading-[1.5em] py-1">(19) 99159 4165</span>
                </div>
                {/* Address */}
                <div className="flex items-start gap-3">
                   <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#F8F8F8] rounded-[4px] flex items-center justify-center">
                      <Image src="/assets/lojas/icon-map.svg" alt="Map" width={18} height={18} />
                   </div>
                   <span className="text-[#5F5F5A] text-[14px] leading-[1.5em] py-1">Rua XXX, 35 - Poços de Caldas/MG - CEP 37704-365</span>
                </div>
             </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
             className="flex flex-col gap-6 p-6 bg-white border border-[#EBEBEB] rounded-[10px] hover:shadow-lg transition-shadow"
             variants={itemVariants}
          >
             {/* Header */}
             <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-[10px] px-3 py-1.5 rounded-[50px] border border-[rgba(255,217,150,0.5)] bg-[rgba(251,185,67,0.1)] w-fit">
                   <span className="text-[#FBB943] font-black text-[11px] leading-[1.5em] tracking-[0.12em]">LOJA</span>
                </div>
                <h3 className="text-[#1C1C1C] font-semibold text-[18px] leading-[1.4em]">
                   RICARDO S. FARINI - FARINI REPRESENTAÇÃO COMERCIAL LTDA
                </h3>
             </div>

             {/* Info List */}
             <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex items-start gap-3">
                   <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#F8F8F8] rounded-[4px] flex items-center justify-center">
                      <Image src="/assets/lojas/icon-email.svg" alt="Email" width={18} height={18} />
                   </div>
                   <span className="text-[#5F5F5A] text-[14px] leading-[1.5em] py-1 break-all">diretoria@amazonfortimp.com.br</span>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-3">
                   <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#F8F8F8] rounded-[4px] flex items-center justify-center">
                      <Image src="/assets/lojas/icon-phone.svg" alt="Phone" width={18} height={18} />
                   </div>
                   <span className="text-[#5F5F5A] text-[14px] leading-[1.5em] py-1">(19) 99159 4165</span>
                </div>
                {/* Address */}
                <div className="flex items-start gap-3">
                   <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#F8F8F8] rounded-[4px] flex items-center justify-center">
                      <Image src="/assets/lojas/icon-map.svg" alt="Map" width={18} height={18} />
                   </div>
                   <span className="text-[#5F5F5A] text-[14px] leading-[1.5em] py-1">Rua XXX, 35 - Poços de Caldas/MG - CEP 37704-365</span>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Map Placeholder Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 xl:px-0 pb-[80px]">
        <div className="w-full h-[300px] md:h-[500px] relative rounded-[20px] overflow-hidden border border-[#EBEBEB]">
           <Image 
             src="/assets/lojas/map-placeholder.png" 
             alt="Mapa de Lojas e Representantes" 
             fill 
             className="object-cover"
           />
        </div>
      </section>
      
    </main>
  );
}
