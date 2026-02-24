import React from "react";

export function AboutSection() {
  return (
    <section className="w-full flex justify-center pb-[240px] px-4 md:px-0">
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-[48px]">
        
        <div className="w-full flex flex-col xl:flex-row justify-between gap-[35px]">
          
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-8 lg:gap-[32px] w-full xl:w-auto">
            
            {/* Texts */}
            <div className="flex flex-col gap-[16px]">
              {/* Badge */}
              <div 
                className="flex items-center gap-[10px] px-[8px] py-[4px] rounded-[50px] w-fit backdrop-blur-[87.7px]"
                style={{
                  backgroundColor: "rgba(251, 185, 67, 0.2)",
                  border: "1.5px solid rgba(255, 217, 150, 0.3)"
                }}
              >
                 <span className="font-roboto font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
                   SOBRE NÓS
                 </span>
              </div>
              
              <h2 className="font-roboto font-semibold text-[49px] leading-[1.4em] text-[#1C1C1C]">
                Conheça a Maza.
              </h2>
              
              <p className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#5F5F5A] max-w-[590px]">
                Há 27 anos no mercado a Tintas Maza se destaca na fabricação de tintas imobiliárias, automotivas, industriais e solventes. Com sua fábrica instalada na cidade de Mococa-SP, a Maza cada vez mais investe, em novas tecnologias e inovações, para entregar aos seus consumidores e clientes produtos com qualidade garantida, responsabilidade ambiental e serviços excelentes.
                <br/><br/>
                Sempre buscando diferenciais a Maza tem um dos maiores portfolios de tintas do mercado para todos os fins. É assim com muito trabalho, pessoas comprometidas, produtos de qualidade e compromisso com o sucesso de nossos clientes que continuamos a nossa história...
              </p>
            </div>
            
            {/* Big Numbers */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 w-full max-w-[800px]">
              {/* Group 1 */}
              <div className="flex items-center gap-[16px] sm:gap-[24px]">
                 <span className="font-roboto font-semibold text-[32px] sm:text-[39px] leading-[1.4em] text-[#A00010] whitespace-nowrap">+27</span>
                 <span className="font-roboto font-bold text-[14px] sm:text-[16px] leading-[1.5em] text-[#1C1C1C]">Anos no mercado</span>
              </div>
              
              <div className="hidden sm:block w-[1px] h-[50px] bg-[#F1F1EA]"></div>
              
              <div className="flex items-center gap-[16px] sm:gap-[24px]">
                 <span className="font-roboto font-semibold text-[32px] sm:text-[39px] leading-[1.4em] text-[#A00010] whitespace-nowrap">+600</span>
                 <span className="font-roboto font-bold text-[14px] sm:text-[16px] leading-[1.5em] text-[#1C1C1C]">Cargas ofertadas<br/>por mês</span>
              </div>
              
              <div className="hidden sm:block w-[1px] h-[50px] bg-[#F1F1EA]"></div>
              
              <div className="flex items-center gap-[16px] sm:gap-[24px]">
                 <span className="font-roboto font-semibold text-[32px] sm:text-[39px] leading-[1.4em] text-[#A00010] whitespace-nowrap">+ 85</span>
                 <span className="font-roboto font-bold text-[14px] sm:text-[16px] leading-[1.5em] text-[#1C1C1C]">Transportadoras<br/>parceiras</span>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="w-full max-w-[669px] aspect-[669/493] relative rounded-[8px] overflow-hidden bg-gray-100 flex items-center justify-center">
              {/* Placeholder */}
              <span className="text-gray-400">Image Asset Placeholder</span>
          </div>
          
        </div>
      </div>
    </section>
  );
}
