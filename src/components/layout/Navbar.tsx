import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-center">
      <div className="w-full max-w-[1440px] h-[101px] py-6 flex justify-between items-center px-6 xl:px-0">
        {/* Logo Area */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/navbar/logo-maza.png"
            alt="Maza Logo"
            width={125}
            height={71}
            priority
            className="object-cover"
          />
        </Link>
        
        {/* Content Area */}
        <div className="hidden lg:flex items-center gap-6 justify-end">
          {/* Nav Items 1 */}
          <div className="flex items-center gap-6">
            <Link href="/sobre" className="font-medium text-base leading-[1.5em] text-white hover:opacity-80 transition-opacity">
              Sobre a Maza
            </Link>
            
            <Link href="/produtos" className="flex items-center gap-1 group">
              <span className="font-medium text-base leading-[1.5em] text-white group-hover:opacity-80 transition-opacity">
                Linha de produtos
              </span>
              <Image
                src="/assets/navbar/corner-right-down.svg"
                alt="Arrow"
                width={18}
                height={18}
              />
            </Link>
            
            <Link href="/representantes" className="font-normal text-base leading-[1.5em] text-white hover:opacity-80 transition-opacity">
              Representantes
            </Link>
          </div>

          {/* Divisor */}
          <div className="w-px h-8 bg-white/20 rounded"></div>

          {/* Nav Items 2 */}
          <div className="flex items-center gap-4">
            <Link 
              href="/onde-encontrar" 
              className="flex items-center gap-1 p-1 pr-3 bg-[rgba(177,17,22,0.2)] border border-[rgba(255,181,189,0.3)] backdrop-blur-[87.7px] rounded text-[#FFC9CB] hover:bg-[rgba(177,17,22,0.3)] transition-colors"
            >
              <div className="w-[17px] h-[18px] flex items-center justify-center">
                <Image
                  src="/assets/navbar/map-pin.svg"
                  alt="Map Pin"
                  width={17}
                  height={18}
                />
              </div>
              <span className="font-normal text-base leading-[1.5em]">Onde encontrar</span>
            </Link>

            <Link 
              href="/area-cliente" 
              className="flex items-center gap-1 p-1 pr-3 bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px] rounded text-[#FBB943] hover:bg-[rgba(251,185,67,0.3)] transition-colors"
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                 <Image
                  src="/assets/navbar/user.svg"
                  alt="User"
                  width={18}
                  height={18}
                />
              </div>
              <span className="font-normal text-base leading-[1.5em]">Área do cliente</span>
            </Link>
          </div>

          {/* Search Button */}
          <button 
            className="flex items-center justify-center w-8 h-8 p-1 bg-[rgba(241,241,234,0.2)] border border-[rgba(185,185,185,0.3)] rounded hover:bg-[rgba(241,241,234,0.3)] transition-colors"
            aria-label="Search"
          >
             <Image
              src="/assets/navbar/search-icon.svg"
              alt="Search"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

// Remove unused NavLink component or keep it if needed elsewhere (but here we replaced it)

