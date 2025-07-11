'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-medium">
         
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="w-3.5 h-3.5 bg-[#FF4D00] rounded-full mr-4" />
            <nav className="bg-white border border-black/10 rounded-full px-8 py-3 flex items-center space-x-8">
              <Link href="#work" className="text-[18px] font-medium group relative">
                <span className="inline-block px-2">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">Work</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:translate-y-0 group-hover:opacity-100">Work</span>
                  </span>
                  <span className="absolute -left-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">)</span>
                </span>
              </Link>
              <Link href="#services" className="text-[18px] font-medium group relative">
                <span className="inline-block px-2">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">Services</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:translate-y-0 group-hover:opacity-100">Services</span>
                  </span>
                  <span className="absolute -left-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">)</span>
                </span>
              </Link>
              <Link href="#approach" className="text-[18px] font-medium group relative">
                <span className="inline-block px-2">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">Approach</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:translate-y-0 group-hover:opacity-100">Approach</span>
                  </span>
                  <span className="absolute -left-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">)</span>
                </span>
              </Link>
              <Link href="#about" className="text-[18px] font-medium group relative">
                <span className="inline-block px-2">
                  <span className="relative">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">About</span>
                    <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:translate-y-0 group-hover:opacity-100">About</span>
                  </span>
                  <span className="absolute -left-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">(</span>
                  <span className="absolute -right-0 -top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 text-[#FF4D00]">)</span>
                </span>
              </Link>
              <Link 
                href="#contact"
                className="text-[15px] font-semibold bg-[#F5F5F5] px-4 py-1.5 rounded-full hover:bg-[#FF4D00] hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-black transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="py-8 space-y-6">
            <Link 
              href="#work" 
              className="block text-2xl font-semibold hover:text-[#FF4D00] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link 
              href="#services" 
              className="block text-2xl font-medium hover:text-[#FF4D00] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#approach" 
              className="block text-2xl font-semibold hover:text-[#FF4D00] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Approach
            </Link>
            <Link 
              href="#about" 
              className="block text-2xl font-semibold hover:text-[#FF4D00] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4">
              <Link 
                href="#contact"
                className="inline-block px-8 py-4 bg-black text-white text-xl rounded-full hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
