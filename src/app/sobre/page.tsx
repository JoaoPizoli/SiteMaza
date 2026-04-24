"use client";

import Image from "next/image";
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <main className="w-full bg-white font-roboto">
      <section className="w-full max-w-[1440px] mx-auto pt-[141px] pb-16 md:pb-24 px-6 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[35px] items-center">
          {/* Left Column: Text */}
          <motion.div 
            className="flex flex-col gap-8 max-w-[590px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-[10px] px-2 py-1 rounded-[50px] border border-[rgba(255,217,150,0.3)] bg-[rgba(251,185,67,0.2)] w-fit backdrop-blur-[87.7px]"
              variants={itemVariants}
            >
               <div className="flex items-center justify-center">
                  <span className="text-[#FBB943] font-black text-[13px] leading-[1.5em] tracking-[0.12em]">QUEM SOMOS</span>
               </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              {/* Title */}
              <motion.h1 
                className="text-[#1C1C1C] font-semibold text-[40px] md:text-[61px] leading-[1.4em]"
                variants={itemVariants}
              >
                Conheça a Maza.
              </motion.h1>

              {/* Paragraph */}
              <motion.p 
                className="text-[#5F5F5A] text-[16px] leading-[1.5em]"
                variants={itemVariants}
              >
                Há 27 anos no mercado a Tintas Maza se destaca na fabricação de tintas imobiliárias, automotivas, industriais e solventes. Com sua fábrica instalada na cidade de Mococa-SP, a Maza cada vez mais investe, em novas tecnologias e inovações, para entregar aos seus consumidores e clientes produtos com qualidade garantida, responsabilidade ambiental e serviços excelentes.
                <br /><br />
                Sempre buscando diferenciais a Maza tem um dos maiores portfolios de tintas do mercado para todos os fins. É assim com muito trabalho, pessoas comprometidas, produtos de qualidade e compromisso com o sucesso de nossos clientes que continuamos a nossa história...
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-[97px] w-full max-w-[730px]"
              variants={itemVariants}
            >
              {/* Stat 1 */}
              <div className="flex items-center gap-6">
                 <span className="text-[#A00010] font-semibold text-[39px] leading-[1.4em] whitespace-nowrap">+27</span>
                 <span className="text-[#1C1C1C] font-bold text-[16px] leading-[1.5em]">Anos <br/>no mercado</span>
              </div>
              
              {/* Divider (Hidden on mobile if needed, but keeping for now) */}
              <div className="hidden sm:block w-[1px] h-12 bg-[#F1F1EA]"></div>

              {/* Stat 2 */}
               <div className="flex items-center gap-6">
                 <span className="text-[#A00010] font-semibold text-[39px] leading-[1.4em] whitespace-nowrap">+600</span>
                 <span className="text-[#1C1C1C] font-bold text-[16px] leading-[1.5em]">Cargas ofertadas <br/>por mês</span>
              </div>
              
              {/* Divider */}
              <div className="hidden sm:block w-[1px] h-12 bg-[#F1F1EA]"></div>

               {/* Stat 3 */}
               <div className="flex items-center gap-6">
                 <span className="text-[#A00010] font-semibold text-[39px] leading-[1.4em] whitespace-nowrap">+ 85</span>
                 <span className="text-[#1C1C1C] font-bold text-[16px] leading-[1.5em]">Transportadoras <br/>parceiras</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            className="relative w-full flex justify-center lg:justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={imageVariants}
          >
            <div className="relative w-full max-w-[669px] h-auto aspect-[669/493]">
              <Image
                src="/assets/about/about-hero.png"
                alt="Maza factory and trucks"
                fill
                className="rounded-[8px] object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="w-full max-w-[1440px] mx-auto pb-16 md:pb-24 px-6 xl:px-0">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Card 1: Visão */}
          <motion.div 
            className="flex flex-col gap-[15px] p-6 bg-[#FCFCF7] border border-[#F4F4F4] rounded-[10px]"
            variants={itemVariants}
          >
             {/* Icon */}
             <div className="w-fit p-1 bg-[#B11116] rounded-[4px]">
               <Image 
                 src="/assets/about/icon-eye.svg"
                 alt="Visão Icon"
                 width={32}
                 height={32}
               />
             </div>
             
             <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-[20px] leading-[1.4em] text-[#1C1C1C]">Visão</h3>
                <p className="font-normal text-[16px] leading-[1.5em] text-[#5F5F5A]">
                  Ser uma das principais empresas do segmento, reconhecida pela excelência em qualidade, inovação e confiança no mercado de tintas e revestimentos.
                </p>
             </div>
          </motion.div>

          {/* Card 2: Valores */}
          <motion.div 
            className="flex flex-col gap-[15px] p-6 bg-[#FCFCF7] border border-[#F4F4F4] rounded-[10px]"
            variants={itemVariants}
          >
             {/* Icon */}
             <div className="w-fit p-1 bg-[#B11116] rounded-[4px]">
               <Image 
                 src="/assets/about/icon-users.svg"
                 alt="Valores Icon"
                 width={32}
                 height={32}
               />
             </div>
             
             <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-[20px] leading-[1.4em] text-[#1C1C1C]">Valores</h3>
                <p className="font-normal text-[16px] leading-[1.5em] text-[#5F5F5A]">
                  Valorizamos pessoas, fortalecemos parcerias e trabalhamos com responsabilidade coletiva para entregar excelência e crescer junto com nossos clientes.
                </p>
             </div>
          </motion.div>

          {/* Card 3: Missão */}
          <motion.div 
            className="flex flex-col gap-[15px] p-6 bg-[#FCFCF7] border border-[#F4F4F4] rounded-[10px]"
            variants={itemVariants}
          >
             {/* Icon */}
             <div className="w-fit p-1 bg-[#B11116] rounded-[4px]">
               <Image 
                 src="/assets/about/icon-target.svg"
                 alt="Missão Icon"
                 width={32}
                 height={32}
               />
             </div>
             
             <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-[20px] leading-[1.4em] text-[#1C1C1C]">Missão</h3>
                <p className="font-normal text-[16px] leading-[1.5em] text-[#5F5F5A]">
                  Oferecer produtos de alta qualidade que atendam às necessidades e superem as expectativas dos nossos clientes, com responsabilidade técnica, ambiental e social.
                </p>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Certificates Section */}
      <section className="w-full pb-[160px]">
        <motion.div 
           className="w-full max-w-[1440px] mx-auto px-6 xl:px-0 flex flex-col items-center gap-[80px]"
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           variants={containerVariants}
        >
           {/* Badge and Title */}
           <motion.div className="flex flex-col items-center gap-10" variants={itemVariants}>
              <div className="inline-flex items-center gap-[10px] px-2 py-1 rounded-[50px] border border-[rgba(255,217,150,0.3)] bg-[rgba(251,185,67,0.2)] w-fit backdrop-blur-[87.7px]">
                 <div className="flex items-center justify-center">
                    <span className="text-[#FBB943] font-black text-[13px] leading-[1.5em] tracking-[0.12em]">CERTIFICADOS</span>
                 </div>
              </div>
           </motion.div>

           {/* Certificates Logos */}
           <motion.div className="relative w-full overflow-hidden" variants={itemVariants}>
              <div className="flex items-center justify-center gap-12 flex-wrap">
                 <div className="relative w-[85px] h-[96px]">
                    <Image src="/assets/certificates/certificate-1.png" alt="Certificate 1" fill className="object-contain" />
                 </div>
                 <div className="w-[1px] h-12 bg-[#F1F1EA]"></div>
                 <div className="relative w-[99px] h-[100px]">
                    <Image src="/assets/certificates/certificate-2.png" alt="Certificate 2" fill className="object-contain" />
                 </div>
                 <div className="w-[1px] h-12 bg-[#F1F1EA]"></div>
                 <div className="relative w-[86px] h-[56px]">
                    <Image src="/assets/certificates/certificate-3.png" alt="Certificate 3" fill className="object-contain" />
                 </div>
                 <div className="w-[1px] h-12 bg-[#F1F1EA]"></div>
                 <div className="relative w-[110px] h-[59px]">
                    <Image src="/assets/certificates/certificate-4.png" alt="Certificate 4" fill className="object-cover" />
                 </div>
                 <div className="w-[1px] h-12 bg-[#F1F1EA]"></div>
                 <div className="relative w-[110px] h-[55px]">
                    <Image src="/assets/certificates/certificate-5.png" alt="Certificate 5" fill className="object-cover" />
                 </div>
              </div>
           </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
