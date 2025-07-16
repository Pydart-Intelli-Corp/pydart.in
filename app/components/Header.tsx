'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // If we're very close to top, no active section
      if (scrollTop < 100) {
        setActiveSection('');
        return;
      }
      
      const sections = ['projects', 'services', 'investments', 'about', 'contact'];
      let currentSection = '';
      
      // Check each section to find which one is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const headerOffset = 80;
          
          // A section is considered active if:
          // 1. Its top is above the middle of the screen (accounting for header)
          // 2. Its bottom is below the middle of the screen
          const sectionTop = rect.top + window.pageYOffset;
          const sectionBottom = rect.bottom + window.pageYOffset;
          const currentScrollWithOffset = scrollTop + headerOffset + (window.innerHeight * 0.3);
          
          if (sectionTop <= currentScrollWithOffset && sectionBottom > currentScrollWithOffset) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  const smoothScrollTo = (elementId: string) => {
    if (elementId === 'top') {
      // Scroll to the very top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveSection('');
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        setActiveSection(elementId);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-2 sm:top-4 md:top-6 lg:top-8 z-50">
      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <div className="flex items-center h-12 sm:h-14 md:h-15 lg:h-16">
          {/* Logo */}
          <Link href="/" onClick={() => smoothScrollTo('top')} className="flex items-center space-x-1 text-lg font-medium cursor-pointer hover:opacity-80 transition-opacity">
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center relative">
            {/* Navigation with individual button backgrounds */}
            <nav className="bg-white rounded-full pl-0.5 sm:pl-1 md:pl-1 lg:pl-1.5 pr-1 py-0.5 sm:py-0.5 md:py-1 lg:py-1 flex items-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 relative">
              
              {/* Animated dot that moves horizontally */}
              <div 
                className={`absolute w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 bg-[#FF4D00] rounded-full transition-all duration-500 ease-in-out transform top-1/2 -translate-y-1/2 ${
                  !activeSection ? 'opacity-100 scale-100 -left-6 sm:-left-7 md:-left-8 lg:-left-9 xl:-left-10' :
                  activeSection === 'projects' ? 'opacity-100 scale-100 left-4 sm:left-5 md:left-6 lg:left-8' :
                  activeSection === 'services' ? 'opacity-100 scale-100 left-20 sm:left-24 md:left-28 lg:left-32' :
                  activeSection === 'investments' ? 'opacity-100 scale-100 left-44 sm:left-52 md:left-60 lg:left-72' :
                  activeSection === 'about' ? 'opacity-100 scale-100 left-72 sm:left-84 md:left-96 lg:left-112' :
                  activeSection === 'contact' ? 'opacity-100 scale-100 left-88 sm:left-104 md:left-120 lg:left-140' :
                  'opacity-100 scale-100 -left-6 sm:-left-7 md:-left-8 lg:-left-9 xl:-left-10'
                }`}
              />
              
              <button 
                onClick={() => smoothScrollTo('projects')} 
                className={`text-xs sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-500 px-2 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'projects' 
                    ? 'bg-[#FF4D00] text-white scale-105' 
                    : ''
                }`}
              >
                <span className="inline-block px-1 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-300 ${activeSection === 'projects' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Projects</span>
                    {activeSection !== 'projects' && (
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Projects</span>
                    )}
                  </span>
                  {activeSection !== 'projects' && (
                    <>
                      <span className="absolute left-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">(</span>
                      <span className="absolute right-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('services')} 
                className={`text-xs sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-500 px-2 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'services' 
                    ? 'bg-[#FF4D00] text-white scale-105' 
                    : ''
                }`}
              >
                <span className="inline-block px-1 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-300 ${activeSection === 'services' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Services</span>
                    {activeSection !== 'services' && (
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Services</span>
                    )}
                  </span>
                  {activeSection !== 'services' && (
                    <>
                      <span className="absolute left-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">(</span>
                      <span className="absolute right-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('investments')} 
                className={`text-xs sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-500 px-2 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'investments' 
                    ? 'bg-[#FF4D00] text-white scale-105' 
                    : ''
                }`}
              >
                <span className="inline-block px-1 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-300 ${activeSection === 'investments' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Investments</span>
                    {activeSection !== 'investments' && (
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Investments</span>
                    )}
                  </span>
                  {activeSection !== 'investments' && (
                    <>
                      <span className="absolute left-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">(</span>
                      <span className="absolute right-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('about')} 
                className={`text-xs sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-500 px-2 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'about' 
                    ? 'bg-[#FF4D00] text-white scale-105' 
                    : ''
                }`}
              >
                <span className="inline-block px-1 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-300 ${activeSection === 'about' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>About</span>
                    {activeSection !== 'about' && (
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">About</span>
                    )}
                  </span>
                  {activeSection !== 'about' && (
                    <>
                      <span className="absolute left-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">(</span>
                      <span className="absolute right-1 -top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 text-[#FF4D00]">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('contact')} 
                className={`text-xs sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-500 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full ${
                  activeSection === 'contact' 
                    ? 'bg-[#FF4D00] text-white scale-105' 
                    : 'bg-[#E5E5E5]'
                }`}
              >
                <span className="inline-block px-1.5 sm:px-2 md:px-2.5 lg:px-3">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-300 ${activeSection === 'contact' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Contact</span>
                    {activeSection !== 'contact' && (
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">Contact</span>
                    )}
                  </span>
                  {activeSection !== 'contact' && (
                    <>
                      <span className="absolute -left-1.5 sm:-left-1.5 md:-left-2 lg:left-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-[#FF4D00]">(</span>
                      <span className="absolute -right-1.5 sm:-right-1.5 md:-right-2 lg:right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-[#FF4D00]">)</span>
                    </>
                  )}
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
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-xl mt-1 p-2`}>
          <nav className="py-1 sm:py-2 space-y-1 sm:space-y-2">
            <button 
              onClick={() => smoothScrollTo('top')}
              className="block text-base sm:text-lg font-semibold hover:text-[#FF4D00] transition-colors w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => smoothScrollTo('projects')}
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
              onClick={() => smoothScrollTo('investments')}
              className="block text-base sm:text-lg font-semibold hover:text-[#FF4D00] transition-colors w-full text-left"
            >
              Investments
            </button>
            <button 
              onClick={() => smoothScrollTo('about')}
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
