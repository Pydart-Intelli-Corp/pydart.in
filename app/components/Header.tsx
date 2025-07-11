'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-8 z-50">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-8 sm:h-9 md:h-10 lg:h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 text-sm sm:text-base md:text-lg lg:text-xl font-medium">
         
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-[#FF4D00] rounded-full mr-1.5 md:mr-2 lg:mr-3" />
            <nav className="bg-white rounded-full pl-3 pr-0 md:pl-5 md:pr-0 lg:pl-6 lg:pr-0 xl:pl-5 xl:pr-1 py-3 md:py-4 lg:py-5 xl:py-1 flex items-center space-x-3 md:space-x-5 lg:space-x-6 xl:space-x-10">
              <button onClick={() => smoothScrollTo('work')} className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative">
                <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">Projects</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Projects</span>
                  </span>
                  <span className="absolute -left-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">)</span>
                </span>
              </button>
              <button onClick={() => smoothScrollTo('services')} className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative">
                <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">Services</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Services</span>
                  </span>
                  <span className="absolute -left-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">)</span>
                </span>
              </button>
              <button onClick={() => smoothScrollTo('approach')} className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative">
                <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">Investments</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Investments</span>
                  </span>
                  <span className="absolute -left-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">)</span>
                </span>
              </button>
              <button onClick={() => smoothScrollTo('approach')} className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative">
                <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">About</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">About</span>
                  </span>
                  <span className="absolute -left-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1.5 text-[#FF4D00]">)</span>
                </span>
              </button>
              <button onClick={() => smoothScrollTo('contact')} className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative bg-[#E5E5E5] py-5 md:py-6 lg:py-2.5 rounded-full">
                <span className="inline-block px-1 md:px-1 lg:px-5">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">Contact</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Contact</span>
                  </span>
                  <span className="absolute left-3 top-0 md:top-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2 md:group-hover:translate-y-2.5 text-[#FF4D00]">(</span>
                  <span className="absolute right-3 top-0 md:top-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2 md:group-hover:translate-y-2.5 text-[#FF4D00]">)</span>
                </span>
              </button>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-0.5 sm:p-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-3.5 h-2.5 sm:w-4 sm:h-3 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5 sm:translate-y-1' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-black transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5 sm:-translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-xl mt-2 p-4`}>
          <nav className="py-3 sm:py-4 space-y-3 sm:space-y-4">
            <button 
              onClick={() => smoothScrollTo('work')}
              className="block text-base sm:text-lg font-semibold hover:text-[#FF4D00] transition-colors w-full text-left"
            >
              Projects
            </button>
            <button 
              onClick={() => smoothScrollTo('services')}
              className="block text-base sm:text-lg font-medium hover:text-[#FF4D00] transition-colors w-full text-left"
            >
              Services
            </button>
            <button 
              onClick={() => smoothScrollTo('approach')}
              className="block text-base sm:text-lg font-semibold hover:text-[#FF4D00] transition-colors w-full text-left"
            >
              Investments
            </button>
            <button 
              onClick={() => smoothScrollTo('approach')}
              className="block text-base sm:text-lg font-semibold hover:text-[#FF4D00] transition-colors w-full text-left"
            >
              About
            </button>
            <div className="pt-1.5 sm:pt-2">
              <button 
                onClick={() => smoothScrollTo('contact')}
                className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-black text-white text-sm sm:text-base rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
