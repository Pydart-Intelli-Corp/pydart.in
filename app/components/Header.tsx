'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');

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
  };

  return (
    <header className="fixed w-full top-6 sm:top-8 md:top-10 lg:top-12 z-50">
      <div className="w-full px-1 sm:px-3 md:px-4 lg:px-5">
        <div className="flex items-center h-6 sm:h-9 md:h-10 lg:h-11">
          {/* Logo */}
          <Link href="/" onClick={() => smoothScrollTo('top')} className="flex items-center space-x-1 text-lg font-medium cursor-pointer hover:opacity-80 transition-opacity">
            
          </Link>

          {/* Navigation for All Devices */}
          <div className="flex flex-1 justify-center items-center relative">
            {/* Navigation with individual button backgrounds */}
            <nav className="bg-neutral-100 rounded-full pl-0.5 sm:pl-1 md:pl-1 lg:pl-1.5 pr-0.5 sm:pr-1 py-0.5 sm:py-0.5 md:py-1 lg:py-1 flex items-center space-x-1 sm:space-x-4 md:space-x-5 lg:space-x-6 relative">
              
              {/* Animated dot that moves horizontally */}
              <div 
                className={`absolute w-1 h-1 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 bg-[#00b4ab] rounded-full transition-all duration-500 ease-in-out transform top-1/2 -translate-y-1/2 ${
                  !activeSection ? 'opacity-100 scale-100 -left-2 sm:-left-7 md:-left-8 lg:-left-9 xl:-left-10' :
                  activeSection === 'projects' ? 'opacity-100 scale-100 left-4 sm:left-5 md:left-6 lg:left-8' :
                  activeSection === 'services' ? 'opacity-100 scale-100 left-15 sm:left-26 md:left-30 lg:left-34' :
                  activeSection === 'investments' ? 'opacity-100 scale-100 left-30 sm:left-52 md:left-60 lg:left-72' :
                  activeSection === 'about' ? 'opacity-100 scale-100 left-50 sm:left-84 md:left-96 lg:left-112' :
                  activeSection === 'contact' ? 'opacity-100 scale-100 left-62 sm:left-106 md:left-122 lg:left-142' :
                  'opacity-100 scale-100 -left-2 sm:-left-7 md:-left-8 lg:-left-9 xl:-left-10'
                }`}
              />
              
              <button 
                onClick={() => smoothScrollTo('projects')} 
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'projects' 
                    ? 'bg-[#00b4ab] text-white scale-105' 
                    : 'text-black hover:bg-[#00b4ab] hover:text-white'
                }`}
              >
                <span className="inline-block px-0.5 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-100 ${activeSection === 'projects' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Projects</span>
                    {activeSection !== 'projects' && (
                      <span className="absolute top-0 left-0 transition-all duration-100 translate-y-full opacity-0 text-white group-hover:-translate-y-0.5 group-hover:opacity-100">Projects</span>
                    )}
                  </span>
                  {activeSection !== 'projects' && (
                    <>
                      <span className="absolute left-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">(</span>
                      <span className="absolute right-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('services')} 
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'services' 
                    ? 'bg-[#00b4ab] text-white scale-105' 
                    : 'text-black hover:bg-[#00b4ab] hover:text-white'
                }`}
              >
                <span className="inline-block px-0.5 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-100 ${activeSection === 'services' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Services</span>
                    {activeSection !== 'services' && (
                      <span className="absolute top-0 left-0 transition-all duration-100 translate-y-full opacity-0 text-white group-hover:-translate-y-0.5 group-hover:opacity-100">Services</span>
                    )}
                  </span>
                  {activeSection !== 'services' && (
                    <>
                      <span className="absolute left-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">(</span>
                      <span className="absolute right-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('investments')} 
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'investments' 
                    ? 'bg-[#00b4ab] text-white scale-105' 
                    : 'text-black hover:bg-[#00b4ab] hover:text-white'
                }`}
              >
                <span className="inline-block px-0.5 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-100 ${activeSection === 'investments' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Investments</span>
                    {activeSection !== 'investments' && (
                      <span className="absolute top-0 left-0 transition-all duration-100 translate-y-full opacity-0 text-white group-hover:-translate-y-0.5 group-hover:opacity-100">Investments</span>
                    )}
                  </span>
                  {activeSection !== 'investments' && (
                    <>
                      <span className="absolute left-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">(</span>
                      <span className="absolute right-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('about')} 
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full ${
                  activeSection === 'about' 
                    ? 'bg-[#00b4ab] text-white scale-105' 
                    : 'text-black hover:bg-[#00b4ab] hover:text-white'
                }`}
              >
                <span className="inline-block px-0.5 sm:px-1.5 md:px-1.5 lg:px-2">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-100 ${activeSection === 'about' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>About</span>
                    {activeSection !== 'about' && (
                      <span className="absolute top-0 left-0 transition-all duration-100 translate-y-full opacity-0 text-white group-hover:-translate-y-0.5 group-hover:opacity-100">About</span>
                    )}
                  </span>
                  {activeSection !== 'about' && (
                    <>
                      <span className="absolute left-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">(</span>
                      <span className="absolute right-0.5 -top-1 opacity-0 transition-all duration-100 group-hover:opacity-100 group-hover:translate-y-4 text-white hidden sm:inline">)</span>
                    </>
                  )}
                </span>
              </button>
              
              <button 
                onClick={() => smoothScrollTo('contact')} 
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full ${
                  activeSection === 'contact' 
                    ? 'bg-[#00b4ab] text-white scale-105' 
                    : 'bg-[#E5E5E5] text-black hover:bg-[#00b4ab] hover:text-white'
                }`}
              >
                <span className="inline-block px-0.5 sm:px-2 md:px-2.5 lg:px-3">
                  <span className="relative">
                    <span className={`inline-block transition-all duration-100 ${activeSection === 'contact' ? '' : 'group-hover:opacity-0 group-hover:-translate-y-1.5'}`}>Contact</span>
                    {activeSection !== 'contact' && (
                      <span className="absolute top-0 left-0 transition-all duration-100 translate-y-full opacity-0 text-white group-hover:-translate-y-0.5 group-hover:opacity-100">Contact</span>
                    )}
                  </span>
                  {activeSection !== 'contact' && (
                    <>
                      <span className="absolute -left-0.5 sm:-left-1.5 md:-left-2 lg:left-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-100 group-hover:opacity-100 text-white hidden sm:inline">(</span>
                      <span className="absolute -right-0.5 sm:-right-1.5 md:-right-2 lg:right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-100 group-hover:opacity-100 text-white hidden sm:inline">)</span>
                    </>
                  )}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
