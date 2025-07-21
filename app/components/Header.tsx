'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    
    // Close menu after navigation on mobile
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-6 sm:top-10 md:top-8 lg:top-10 xl:top-12 z-50 header-mobile-landscape">
      <div className="w-full px-1 sm:px-3 md:px-4 lg:px-5">
        <div className="flex items-center justify-between h-4 sm:h-6 md:h-8 lg:h-9 xl:h-11 header-container gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => smoothScrollTo('top')} className="flex items-center space-x-1 text-lg font-medium cursor-pointer hover:opacity-80 transition-opacity z-[100]">
              <img 
                src="/pydart_logo.png" 
                alt="PyDart Logo" 
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 object-contain hover:scale-110 transition-transform duration-300" 
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 justify-center items-center relative min-w-0 px-2 sm:px-4 md:px-6 lg:px-8">
            {/* Navigation with individual button backgrounds */}
            <nav className="bg-neutral-100 rounded-full pl-0.5 sm:pl-1 md:pl-1 lg:pl-1.5 pr-0.5 sm:pr-1 py-0.5 sm:py-0.5 md:py-1 lg:py-1 flex items-center space-x-0.5 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6 relative max-w-fit">
              
              {/* Animated dot that moves horizontally */}
              <div 
                className={`absolute w-1 h-1 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 bg-[#00b4ab] rounded-full transition-all duration-500 ease-in-out transform top-1/2 -translate-y-1/2 nav-dot ${
                  !activeSection ? 'opacity-100 scale-100 -left-2 sm:-left-7 md:-left-8 lg:-left-9 xl:-left-10 dot-home' :
                  activeSection === 'projects' ? 'opacity-100 scale-100 left-4 sm:left-5 md:left-6 lg:left-8 dot-projects' :
                  activeSection === 'services' ? 'opacity-100 scale-100 left-15 sm:left-26 md:left-30 lg:left-34 dot-services' :
                  activeSection === 'investments' ? 'opacity-100 scale-100 left-30 sm:left-52 md:left-60 lg:left-72 dot-investments' :
                  activeSection === 'about' ? 'opacity-100 scale-100 left-50 sm:left-84 md:left-96 lg:left-112 dot-about' :
                  activeSection === 'contact' ? 'opacity-100 scale-100 left-62 sm:left-106 md:left-122 lg:left-142 dot-contact' :
                  'opacity-100 scale-100 -left-2 sm:-left-7 md:-left-8 lg:-left-9 xl:-left-10 dot-home'
                }`}
              />
              
              <button 
                onClick={() => smoothScrollTo('projects')} 
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full nav-button ${
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
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full nav-button ${
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
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full nav-button ${
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
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 py-1 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full nav-button ${
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
                className={`text-[10px] sm:text-sm md:text-sm lg:text-base font-medium group relative transition-all duration-150 px-1 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full nav-button ${
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
                </span>
              </button>
            </nav>
          </div>

          {/* Mobile Menu - Visible only on Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {/* Combined Menu Button and Dropdown */}
            <div className="relative">
              {/* Menu Button - Always visible at top */}
              <button
                onClick={toggleMenu}
                className={`bg-white rounded-full shadow-xl px-6 py-3 text-sm font-medium relative transition-all duration-300 ${isMenuOpen ? '' : 'hover:scale-105'} z-[100]`}
              >
                <span className={`block transition-opacity duration-300 text-black ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
                  Menu
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 text-black ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                  Close
                </span>
              </button>
              
              {/* Menu Content - Appears below button */}
              <div 
                className={`absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl transition-all duration-500 ease-out overflow-hidden origin-top-right z-[100] ${
                  isMenuOpen 
                    ? 'w-[280px] max-h-[400px] opacity-100 transform scale-y-100 pointer-events-auto' 
                    : 'w-[280px] max-h-0 opacity-0 transform scale-y-0 pointer-events-none'
                }`}
              >
                <div className="px-6 pb-6 pt-4">
                  {/* Navigation Items */}
                  <nav className="space-y-5">
                    {['projects', 'services', 'investments', 'about', 'contact'].map((section, index) => (
                      <button 
                        key={section}
                        onClick={() => smoothScrollTo(section)} 
                        className={`block w-full text-left text-lg font-normal transition-all duration-300 cursor-pointer ${
                          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        } ${
                          activeSection === section 
                            ? 'text-[#00b4ab] font-medium' 
                            : 'text-gray-900 hover:text-[#00b4ab]'
                        }`}
                        style={{
                          transitionDelay: isMenuOpen ? `${index * 70 + 100}ms` : '0ms'
                        }}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className={`w-full h-px bg-gray-200 my-5 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} style={{ transitionDelay: isMenuOpen ? '450ms' : '0ms' }} />

                  {/* Mobile Email Us Button */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info.pydart@gmail.com&su=Inquiry%20from%20Website&body=Hello%20Pydart%20Team,%0A%0AI%20would%20like%20to%20inquire%20about%20your%20services.%0A%0AThank%20you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-left text-lg font-normal text-[#00b4ab] hover:text-[#00a199] transition-all duration-300 cursor-pointer ${
                      isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Email Us Button - Hidden on Mobile */}
          <div className="hidden md:flex flex-shrink-0">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info.pydart@gmail.com&su=Inquiry%20from%20Website&body=Hello%20Pydart%20Team,%0A%0AI%20would%20like%20to%20inquire%20about%20your%20services.%0A%0AThank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative overflow-hidden px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-sm transition-colors duration-200 text-white/90 hover:text-white z-[100] whitespace-nowrap"
            >
              <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
                <span className="relative">
                  <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">
                    Email Us
                  </span>
                  <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#00b4ab] group-hover:-translate-y-0.5 group-hover:opacity-100">
                    Email Us
                  </span>
                </span>
                <span className="absolute left-1 md:left-1.5 lg:left-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2.5 md:group-hover:translate-y-3 text-[#00b4ab]">(</span>
                <span className="absolute right-1 md:right-1.5 lg:right-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2.5 md:group-hover:translate-y-3 text-[#00b4ab]">)</span>
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Backdrop - only visible when menu is open */}
        <div 
          className={`fixed md:hidden inset-0 bg-black/20 z-[90] transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
}
