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
  const [scrollSpeed, setScrollSpeed] = useState(1); // Track scroll speed multiplier
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const heroRef = useRef<HTMLElement>(null);

  // Hero background images - Desktop (Landscape) and Mobile (Portrait)
const desktopImages = [
  'https://images.unsplash.com/photo-1627389955805-5bf2447e9a75?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1645839078449-124db8a049fd?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1639322537231-2f206e06af84?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1495592822108-9e6261896da8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1515355252367-42ae86cb92f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];


const mobileImages = [
  'https://images.unsplash.com/photo-1685034759882-34583cece8e1?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1665602878676-219e01293b51?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1703750960115-47292be36300?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1677685854218-94b2b0250575?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

  // Track scroll speed for dynamic animation speed
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      // Calculate scroll speed
      const scrollDistance = Math.abs(currentScrollY - lastScrollY);
      const timeElapsed = currentTime - lastScrollTime;
      
      if (timeElapsed > 0) {
        const speed = scrollDistance / timeElapsed; // pixels per millisecond
        // Normalize and clamp speed multiplier between 1x and 5x
        const speedMultiplier = Math.min(Math.max(1 + speed * 0.5, 1), 5);
        setScrollSpeed(speedMultiplier);
      }
      
      setLastScrollY(currentScrollY);
      setLastScrollTime(currentTime);
    };

    // Debounce scroll speed reset
    let resetTimer: NodeJS.Timeout;
    const handleScrollWithReset = () => {
      handleScroll();
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        setScrollSpeed(1); // Reset to normal speed after scrolling stops
      }, 200);
    };

    window.addEventListener('scroll', handleScrollWithReset, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollWithReset);
      clearTimeout(resetTimer);
    };
  }, [lastScrollY, lastScrollTime]);

  // Typewriter effect with scroll-based speed
  useEffect(() => {
    if (!isClient) return;

    // Calculate dynamic timing based on scroll speed
    const baseTypingSpeed = 20;
    const basePauseSpeed = 50;
    const baseInitialDelay = 100;
    
    const typingSpeed = Math.max(baseTypingSpeed / scrollSpeed, 5); // Min 5ms
    const pauseSpeed = Math.max(basePauseSpeed / scrollSpeed, 10); // Min 10ms
    const initialDelay = Math.max(baseInitialDelay / scrollSpeed, 20); // Min 20ms

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
          }, pauseSpeed);
        }
      } else {
        // All lines complete
        setIsTypingComplete(true);
      }
    }, currentCharIndex === 0 ? initialDelay : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isClient, typewriterLines, scrollSpeed]);

  // Auto-slide hero images with scroll-based speed
  useEffect(() => {
    const currentImages = isMobile ? mobileImages : desktopImages;
    
    // Calculate dynamic interval based on scroll speed and device type
    const baseInterval = isMobile ? 5000 : 3000; // 5 seconds for mobile, 3 seconds for desktop
    const dynamicInterval = Math.max(baseInterval / scrollSpeed, 500); // Min 500ms
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentImages.length);
    }, dynamicInterval);

    return () => clearInterval(timer);
  }, [isMobile, desktopImages.length, mobileImages.length, scrollSpeed]);

  // Reset slide when switching between mobile/desktop
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only track cursor if mouse is within the hero section and not on mobile
      if (!heroRef.current || isMobile) return;
      
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

    // Add global mouse move listener for custom cursor (desktop only)
    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (!isMobile) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

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
      className="relative min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] bg-black text-white overflow-hidden pb-4 xs:pb-6 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 hero-responsive"
      style={{ cursor: isMobile ? 'auto' : 'none' }}
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
              duration: Math.max(2.0 / scrollSpeed, 0.5),
              ease: "easeInOut",
              opacity: { 
                duration: Math.max(2.0 / scrollSpeed, 0.5),
                ease: [0.4, 0.0, 0.2, 1.0] // Ultra smooth, scroll-responsive dissolve curve
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
              transition={{ duration: Math.max(2.0 / scrollSpeed, 0.5), ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Futuristic Interactive Cursor - Custom Mouse Pointer (Desktop Only) */}
      {isClient && !isMobile && isMouseInHero && (
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
      <div className="relative z-20 min-h-screen flex items-start md:items-center pt-8 xs:pt-10 sm:pt-12 md:pt-0">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 text-left pt-0 xs:pt-0 sm:pt-0 md:pt-4 hero-content">
              
              {/* Main Headline with Typewriter Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: Math.max(0.4 / scrollSpeed, 0.1), 
                  delay: Math.max(0.2 / scrollSpeed, 0.05) 
                }}
                className="text-3xl xs:text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight tracking-tight min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[220px] lg:min-h-[260px] -mt-2 xs:-mt-3 sm:-mt-4 md:mt-0 hero-heading"
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
                transition={{ 
                  duration: Math.max(0.2 / scrollSpeed, 0.05), 
                  delay: isTypingComplete ? Math.max(0.05 / scrollSpeed, 0.01) : 0 
                }}
                className="text-sm xs:text-base sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-3xl hero-subheading"
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
                transition={{ 
                  duration: Math.max(0.2 / scrollSpeed, 0.05), 
                  delay: isTypingComplete ? Math.max(0.1 / scrollSpeed, 0.02) : 0 
                }}
                className="flex flex-row gap-6 hero-buttons"
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

              {/* Stibe Product Card - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isTypingComplete ? 1 : 0, 
                  y: isTypingComplete ? 0 : 30 
                }}
                transition={{ 
                  duration: Math.max(0.3 / scrollSpeed, 0.08), 
                  delay: isTypingComplete ? Math.max(0.2 / scrollSpeed, 0.04) : 0 
                }}
                className="mt-8 md:hidden"
              >
                <motion.div
                  className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg p-4 shadow-lg border border-gray-800 hover:border-[#00b4ab]/50 transition-all duration-300 group relative overflow-hidden max-w-xs mx-auto hero-card-mobile"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00b4ab]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Stibe Logo/Icon */}
                  <div className="relative w-10 h-10 bg-gradient-to-br from-[#00b4ab] to-[#008a82] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00b4ab]/20 rounded-lg blur-lg"></div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00b4ab] transition-colors duration-300">Stibe</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    AI-powered grooming platform
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-1 mb-3">
                    {['Smart Booking', 'AI Recommendations'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-xs text-gray-400">
                        <div className="w-1 h-1 bg-[#00b4ab] rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    onClick={scrollToProjects}
                    className="relative z-20 w-full px-3 py-2 bg-[#00b4ab] text-white text-xs font-medium rounded hover:bg-[#008a82] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[#00b4ab]/20"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                  
                  {/* Status */}
                  <div className="flex items-center mt-2 pt-2 border-t border-gray-800">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Featured</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Stibe Spotlight Card */}
            <div className="lg:col-span-4 hidden md:block">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ 
                  opacity: isTypingComplete ? 1 : 0, 
                  x: isTypingComplete ? 0 : 30 
                }}
                transition={{ 
                  duration: Math.max(0.3 / scrollSpeed, 0.08), 
                  delay: isTypingComplete ? Math.max(0.15 / scrollSpeed, 0.03) : 0 
                }}
                className="relative"
              >
                {/* Stibe Product Card with Career Theme Styling */}
                <motion.div
                  className="bg-transparent md:bg-gradient-to-br md:from-gray-900 md:via-black md:to-gray-900 rounded-lg p-3 md:p-4 shadow-none md:shadow-lg border border-white/10 md:border-gray-800 hover:border-white/20 md:hover:border-[#00b4ab]/50 transition-all duration-300 group relative overflow-hidden max-w-xs md:max-w-sm mx-auto"
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
                  <div className="absolute inset-0 bg-transparent md:bg-gradient-to-br md:from-[#00b4ab]/5 md:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Stibe Logo/Icon */}
                  <div className="relative w-8 h-8 md:w-10 md:h-10 bg-transparent md:bg-gradient-to-br md:from-[#00b4ab] md:to-[#008a82] rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white/60 md:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-transparent md:bg-[#00b4ab]/20 rounded-lg blur-lg"></div>
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-white/70 md:text-white mb-1 md:mb-2 group-hover:text-white/90 md:group-hover:text-[#00b4ab] transition-colors duration-300">Stibe</h3>
                  <p className="text-gray-300/70 md:text-gray-300 text-xs leading-relaxed mb-2 md:mb-3">
                    AI-powered grooming platform
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-1 mb-2 md:mb-3">
                    {['Smart Booking', 'AI Recommendations'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-[10px] md:text-xs text-gray-400/60 md:text-gray-400">
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/30 md:bg-[#00b4ab] rounded-full mr-1.5 md:mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    onClick={scrollToProjects}
                    className="relative z-20 w-full px-2 py-1.5 md:px-3 md:py-2 bg-transparent md:bg-[#00b4ab] text-white/80 md:text-white text-[10px] md:text-xs font-medium rounded border border-white/20 md:border-none hover:bg-white/5 md:hover:bg-[#008a82] transition-colors duration-300 group-hover:shadow-none md:group-hover:shadow-lg md:group-hover:shadow-[#00b4ab]/20"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                  
                  {/* Status */}
                  <div className="flex items-center mt-2 pt-2 border-t border-white/10 md:border-gray-800">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white/40 md:bg-green-400 rounded-full mr-1.5 md:mr-2 animate-pulse" />
                    <span className="text-[8px] md:text-[10px] text-gray-500/60 md:text-gray-500 uppercase tracking-wider">Featured</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators (like career screen) */}
      <div className="absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-30">
        {(isMobile ? mobileImages : desktopImages).map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#00b4ab] scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: Math.max(0.8 / scrollSpeed, 0.2) }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 hidden md:block"
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
