"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const findUsItem = {
  title: "Procurando a Maza perto de você?",
  icon: "/assets/home/find-us/location-icon.svg",
  buttons: [
    { text: "VER LOJAS", href: "#" },
    { text: "VER REPRESENTANTES", href: "#" }
  ]
};

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2 
    },
  },
};

const bgLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const bgRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function FindUsSection() {
  return (
    <section className="w-full flex justify-center py-[80px] px-4 md:px-0 relative">
      <motion.div 
        className="w-full max-w-[1216px] relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="relative pt-[32px]"> {/* Padding for floating icon */}
          
          {/* Floating Icon */}
          <motion.div 
            variants={iconVariants}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center bg-white rounded-[8px] shadow-[0px_4px_60px_0px_rgba(160,0,16,0.3)] w-[64px] h-[64px] overflow-hidden"
          >
            <div className="w-[192px] h-[192px] flex items-center justify-center -m-[64px]">
              <Image 
                src={findUsItem.icon}
                alt="Location Icon" 
                width={192} 
                height={192} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Main Content Card */}
          <div 
            className="w-full relative overflow-hidden rounded-[8px] p-[40px] flex flex-col items-center justify-center text-center gap-[40px]"
            style={{
              background: "linear-gradient(130deg, #B11116 1%, #8D1317 79%)",
            }}
          >
            {/* Background Vectors */}
            <motion.div 
              variants={bgLeftVariants}
              className="absolute top-[-97px] left-[-131px] pointer-events-none select-none"
            >
              <Image 
                src="/assets/home/find-us/vector-bg-left.svg" 
                alt="Background Vector Left" 
                width={342} 
                height={297} 
              />
            </motion.div>
            
            <motion.div 
              variants={bgRightVariants}
              className="absolute top-[61px] right-[-457px] md:right-[-200px] lg:left-[872px] pointer-events-none select-none"
            >
              <Image 
                src="/assets/home/find-us/vector-bg-right.svg" 
                alt="Background Vector Right" 
                width={401} 
                height={141} 
              />
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-[40px] z-10 items-center">
              
              {/* Text */}
              <motion.div variants={itemVariants} className="flex flex-col gap-[24px]">
                <h2 className="font-roboto font-semibold text-[31px] leading-[1.4em] text-[#F1F5F9]">
                  {findUsItem.title}
                </h2>
              </motion.div>

              {/* Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-[24px]">
                {findUsItem.buttons.map((btn, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    className="bg-white hover:bg-gray-100 text-[#1C1C1C] border-[4px] border-[rgba(227,227,227,0.5)] rounded-[50px] px-[32px] py-[16px] h-auto font-roboto font-semibold text-[17px] leading-[1.5em] tracking-[0.03em] cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-200"
                  >
                    {btn.text}
                  </Button>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
