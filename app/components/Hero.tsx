'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 }); // Initialize to invalid position
  const [absoluteMousePosition, setAbsoluteMousePosition] = useState({ x: -100, y: -100 }); // Initialize off-screen
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMouseInHero, setIsMouseInHero] = useState(false); // Track if mouse is in hero section
  const heroRef = useRef<HTMLElement>(null);

  // Hero background images - Desktop (Landscape) and Mobile (Portrait)
  const desktopImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // AI Technology Neural Network
    'https://images.unsplash.com/photo-1508361727343-ca787442dcd7?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // AI Neural Network Visualization
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // AI Circuit Board Technology
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // Digital Technology Abstract
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // Data Visualization Tech
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // Futuristic Digital Interface
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // AI Computer Code
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&crop=entropy&auto=format', // AI Robot Hand Technology
  ];

  const mobileImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // AI Technology Neural Network (Portrait)
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // AI Neural Network Visualization (Portrait)
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // Mobile Tech Interface (Portrait)
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // Digital Code Matrix (Portrait)
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // Circuit Board Vertical (Portrait)
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // AI Robot Portrait
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // Data Streams Vertical
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1080&h=1920&fit=crop&crop=entropy&auto=format', // Digital AI Portrait
  ];

  // Typewriter text lines
  const typewriterLines = [
    { text: 'Intelligence,', color: 'text-white' },
    { text: 'Designed for', color: 'text-[#00b4ab]' },
    { text: 'Everyday Impact.', color: 'text-white' }
  ];

  // Generate deterministic positions for floating particles
  const particlePositions = [
    { x: 15, y: 20 },
    { x: 85, y: 15 },
    { x: 25, y: 75 },
    { x: 70, y: 85 },
    { x: 90, y: 45 },
    { x: 10, y: 60 },
    { x: 60, y: 25 },
    { x: 35, y: 90 },
    { x: 80, y: 70 },
    { x: 45, y: 40 },
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isClient) return;

    const timer = setTimeout(() => {
      if (currentLineIndex < typewriterLines.length) {
        const currentLine = typewriterLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.text.length) {
          // Still typing current line
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // Current line complete, move to next line
          setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
          }, 150); // Reduced pause between lines from 300ms to 150ms
        }
      } else {
        // All lines complete
        setIsTypingComplete(true);
      }
    }, currentCharIndex === 0 ? 200 : 35); // Reduced initial delay from 500ms to 200ms, typing speed from 60ms to 35ms

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isClient, typewriterLines]);

  // Auto-slide hero images (similar to career screen)
  useEffect(() => {
    const currentImages = isMobile ? mobileImages : desktopImages;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentImages.length);
    }, 5000); // Changed back to 5 seconds per image

    return () => clearInterval(timer);
  }, [isMobile, desktopImages.length, mobileImages.length]);

  // Reset slide when switching between mobile/desktop
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only track cursor if mouse is within the hero section
      if (!heroRef.current) return;
      
      const heroRect = heroRef.current.getBoundingClientRect();
      const isWithinHero = e.clientX >= heroRect.left && 
                          e.clientX <= heroRect.right && 
                          e.clientY >= heroRect.top && 
                          e.clientY <= heroRect.bottom;
      
      setIsMouseInHero(isWithinHero);
      
      if (isWithinHero) {
        // For absolute positioning (custom cursor)
        setAbsoluteMousePosition({
          x: e.clientX,
          y: e.clientY,
        });

        // For relative positioning (existing effects)
        setMousePosition({
          x: (e.clientX - heroRect.left) / heroRect.width,
          y: (e.clientY - heroRect.top) / heroRect.height,
        });

        // Detect hoverable elements within hero section
        const target = e.target as HTMLElement;
        const isClickable = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.closest('button') || 
                           target.closest('a') ||
                           target.classList.contains('cursor-pointer');
        
        if (isClickable) {
          setCursorVariant('hover');
        } else {
          setCursorVariant('default');
        }
      } else {
        // Reset cursor when outside hero section and hide it
        setCursorVariant('default');
        setMousePosition({ x: -1, y: -1 }); // Set to invalid position to hide cursor
        setAbsoluteMousePosition({ x: -100, y: -100 }); // Move cursor off-screen
      }
    };

    // Add global mouse move listener for custom cursor
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[120vh] bg-black text-white overflow-hidden pb-20"
      style={{ cursor: 'none' }}
    >
      {/* Background Images with Dissolving Effect */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 3.5,
              ease: "easeInOut",
              opacity: { 
                duration: 3.5,
                ease: [0.4, 0.0, 0.2, 1.0] // Ultra smooth, slower dissolve curve
              }
            }}
            className="absolute inset-0"
          >
            {/* Responsive background image - Mobile (Portrait) or Desktop (Landscape) */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url("${isMobile ? mobileImages[currentSlide] : desktopImages[currentSlide]}")`,
              }}
              onError={(e) => {
                const currentImages = isMobile ? mobileImages : desktopImages;
                console.log('Image failed to load:', currentImages[currentSlide]);
                // Fallback to gradient if image fails
                e.currentTarget.style.backgroundImage = 'none';
              }}
            />
            {/* Fallback gradient background with smooth transition */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Company Logo - Top Left (Desktop Only) */}
      <div className="absolute -top-5 left-6 md:left-10 lg:left-14 z-[100] hidden md:block">
        <motion.a 
          href="/" 
          aria-label="Go to homepage" 
          className="group block hover:scale-110 transition-transform duration-300 ease-out relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="/pydart_logo.png" 
            alt="PyDart Logo" 
            className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain hover:opacity-80 transition-opacity duration-300" 
          />
        </motion.a>
      </div>

      {/* Email Us Button - Top Right */}
      <div className="absolute top-8 right-2 sm:right-4 md:right-6 lg:right-8 z-50 hidden md:block">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=info.pydart@gmail.com&su=Inquiry%20from%20Website&body=Hello%20Pydart%20Team,%0A%0AI%20would%20like%20to%20inquire%20about%20your%20services.%0A%0AThank%20you!"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative overflow-hidden px-3 py-2 rounded-sm transition-colors duration-200 block pointer-events-auto text-white"
          style={{ pointerEvents: 'auto' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
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

      {/* Futuristic Interactive Cursor - Custom Mouse Pointer (Hero Section Only) */}
      {isClient && isMouseInHero && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          animate={{
            x: absoluteMousePosition.x - 16,
            y: absoluteMousePosition.y - 16,
            scale: cursorVariant === 'hover' ? 1.5 : 1,
            opacity: isMouseInHero && mousePosition.x >= 0 && mousePosition.y >= 0 && mousePosition.x <= 1 && mousePosition.y <= 1 ? 1 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20,
            mass: 0.1,
            opacity: { duration: 0.1 }
          }}
        >
          {/* Main cursor core */}
          <div className="relative w-8 h-8">
            {/* Central glowing core */}
            <motion.div 
              className="absolute inset-0 w-3 h-3 left-2.5 top-2.5 bg-[#00b4ab] rounded-full shadow-lg shadow-[#00b4ab]/50"
              animate={{
                backgroundColor: cursorVariant === 'hover' ? '#ff6b6b' : '#00b4ab',
                boxShadow: cursorVariant === 'hover' ? '0 0 20px rgba(255, 107, 107, 0.5)' : '0 0 20px rgba(0, 180, 171, 0.5)',
                scale: cursorVariant === 'hover' ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Rotating outer ring */}
            <motion.div
              className="absolute inset-0 w-8 h-8 border-2 rounded-full"
              animate={{ 
                rotate: 360,
                borderColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.6)' : 'rgba(0, 180, 171, 0.6)',
              }}
              transition={{ 
                rotate: { duration: cursorVariant === 'hover' ? 1.5 : 3, repeat: Infinity, ease: "linear" },
                borderColor: { duration: 0.2 }
              }}
            />
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 w-8 h-8 border rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.6, 0.2, 0.6],
                borderColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.4)' : 'rgba(0, 180, 171, 0.4)',
              }}
              transition={{ 
                scale: { duration: cursorVariant === 'hover' ? 1 : 2, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: cursorVariant === 'hover' ? 1 : 2, repeat: Infinity, ease: "easeInOut" },
                borderColor: { duration: 0.2 }
              }}
            />
            
            {/* Corner indicators */}
            <motion.div 
              className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2"
              animate={{
                borderColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.8)' : 'rgba(0, 180, 171, 0.8)',
                scale: cursorVariant === 'hover' ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2"
              animate={{
                borderColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.8)' : 'rgba(0, 180, 171, 0.8)',
                scale: cursorVariant === 'hover' ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2"
              animate={{
                borderColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.8)' : 'rgba(0, 180, 171, 0.8)',
                scale: cursorVariant === 'hover' ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2"
              animate={{
                borderColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.8)' : 'rgba(0, 180, 171, 0.8)',
                scale: cursorVariant === 'hover' ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Scanning line */}
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5"
              animate={{ 
                y: [0, 32, 0],
                background: cursorVariant === 'hover' 
                  ? 'linear-gradient(to right, transparent, rgba(255, 107, 107, 1), transparent)'
                  : 'linear-gradient(to right, transparent, rgba(0, 180, 171, 1), transparent)',
              }}
              transition={{ 
                y: { duration: cursorVariant === 'hover' ? 0.8 : 1.5, repeat: Infinity, ease: "easeInOut" },
                background: { duration: 0.2 }
              }}
            />
            
            {/* Outer glow effect */}
            <motion.div 
              className="absolute inset-0 w-8 h-8 rounded-full blur-lg scale-150"
              animate={{
                backgroundColor: cursorVariant === 'hover' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0, 180, 171, 0.1)',
                scale: cursorVariant === 'hover' ? 2 : 1.5,
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Hover state additional effects */}
            {cursorVariant === 'hover' && (
              <>
                {/* Extra pulsing rings on hover */}
                <motion.div
                  className="absolute inset-0 w-12 h-12 -left-2 -top-2 border border-[#ff6b6b]/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 0.1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.div
                  className="absolute inset-0 w-16 h-16 -left-4 -top-4 border border-[#ff6b6b]/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.05, 0.3]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00b4ab]/30 rounded-full"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient Glow Effect */}
      {isClient && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00b4ab]/20 to-[#008a82]/20 blur-3xl"
          animate={{
            x: mousePosition.x * 200 - 192,
            y: mousePosition.y * 200 - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      )}

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 text-left pt-20 sm:pt-24 md:pt-8">
              
              {/* Company Logo (Mobile Only) - Big logo on top of heading */}
              <div className="mb-0 md:hidden">
                <motion.a 
                  href="/" 
                  aria-label="Go to homepage" 
                  className="group block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img 
                    src="/pydart_logo.png" 
                    alt="PyDart Logo" 
                    className="w-36 h-36 sm:w-44 sm:h-44 object-contain" 
                  />
                </motion.a>
              </div>
              
              {/* Main Headline with Typewriter Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight tracking-tight min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] -mt-8 md:mt-0"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {typewriterLines.map((line, index) => {
                  // Show completed lines fully
                  if (index < currentLineIndex) {
                    return (
                      <motion.span 
                        key={index}
                        className={`block ${line.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          x: isHovering && isTypingComplete ? mousePosition.x * (index === 1 ? -2 : 1.5) : 0,
                        }}
                        transition={{ 
                          opacity: { duration: 0.3 },
                          x: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                      >
                        {line.text}
                      </motion.span>
                    );
                  }
                  
                  // Show current typing line
                  if (index === currentLineIndex && !isTypingComplete) {
                    const currentText = line.text.substring(0, currentCharIndex);
                    return (
                      <motion.span 
                        key={index}
                        className={`block ${line.color}`}
                      >
                        {currentText}
                        {currentCharIndex < line.text.length && (
                          <motion.span
                            className="inline-block w-1 h-[0.8em] bg-[#00b4ab] ml-1"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                          />
                        )}
                      </motion.span>
                    );
                  }
                  
                  // Show completed line when typing is done
                  if (isTypingComplete) {
                    return (
                      <motion.span 
                        key={index}
                        className={`block ${line.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          x: isHovering ? mousePosition.x * (index === 1 ? -2 : 1.5) : 0,
                        }}
                        transition={{ 
                          opacity: { duration: 0.3 },
                          x: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                      >
                        {line.text}
                      </motion.span>
                    );
                  }
                  
                  return null;
                })}
              </motion.h1>

              {/* Subheading - Appears after typewriter completes */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isTypingComplete ? 1 : 0, 
                  y: isTypingComplete ? 0 : 30 
                }}
                transition={{ duration: 0.4, delay: isTypingComplete ? 0.1 : 0 }}
                className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                We craft scalable AI solutions — from personal care to intelligent systems — driven by empathy, data, and design.
              </motion.p>

              {/* CTA Buttons - Appear after subheading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isTypingComplete ? 1 : 0, 
                  y: isTypingComplete ? 0 : 30 
                }}
                transition={{ duration: 0.4, delay: isTypingComplete ? 0.2 : 0 }}
                className="flex flex-row gap-6"
              >
                <motion.button
                  onClick={scrollToServices}
                  className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:border-[#00b4ab] hover:bg-[#00b4ab]/10 transition-all duration-300 group relative overflow-hidden text-sm md:text-base"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#00b4ab]">
                    What We Do
                  </span>
                  <svg className="ml-2 w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00b4ab] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00b4ab]/0 via-[#00b4ab]/5 to-[#00b4ab]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={scrollToProjects}
                  className="text-sm md:text-base lg:text-lg font-medium group relative overflow-hidden px-4 py-3 md:px-5 md:py-3 rounded-sm transition-colors duration-200 text-white hover:text-[#00b4ab]"
                  style={{ pointerEvents: 'auto' }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
                    <span className="relative">
                      <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">
                        Explore Stibe
                      </span>
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#00b4ab] group-hover:-translate-y-0.5 group-hover:opacity-100">
                        Explore Stibe
                      </span>
                    </span>
                    <span className="absolute left-1 md:left-1.5 lg:left-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 md:group-hover:translate-y-5 text-[#00b4ab]">(</span>
                    <span className="absolute right-1 md:right-1.5 lg:right-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 md:group-hover:translate-y-5 text-[#00b4ab]">)</span>
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Stibe Spotlight Card */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ 
                  opacity: isTypingComplete ? 1 : 0, 
                  x: isTypingComplete ? 0 : 30 
                }}
                transition={{ duration: 0.5, delay: isTypingComplete ? 0.3 : 0 }}
                className="relative"
              >
                {/* Stibe Product Card with Career Theme Styling */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-[#00b4ab]/50 transition-all duration-300 group relative overflow-hidden"
                  animate={{
                    y: mousePosition.y * -5,
                    rotateX: mousePosition.y * 2,
                    rotateY: mousePosition.x * 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00b4ab]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Stibe Logo/Icon */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-[#00b4ab] to-[#008a82] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00b4ab]/20 rounded-xl blur-xl"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00b4ab] transition-colors duration-300">Stibe</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    AI-powered grooming platform connecting users with trusted stylists, salons & pet groomers
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {['Smart Booking', 'AI Recommendations', 'Quality Assurance'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-xs text-gray-400">
                        <div className="w-1 h-1 bg-[#00b4ab] rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    onClick={scrollToProjects}
                    className="relative z-20 w-full px-3 py-2 bg-[#00b4ab] text-white text-xs font-medium rounded-lg hover:bg-[#008a82] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[#00b4ab]/20"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                  
                  {/* Status */}
                  <div className="flex items-center mt-3 pt-3 border-t border-gray-800">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Featured Product</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators (like career screen) */}
      <div className="absolute bottom-4 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {(isMobile ? mobileImages : desktopImages).map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#00b4ab] scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-xs mb-2 uppercase tracking-widest font-medium">Discover</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
