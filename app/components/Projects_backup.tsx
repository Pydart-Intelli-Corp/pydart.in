'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Mouse tracking hook
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
       <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start landscape-mobile:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-8 landscape-mobile:col-span-8 text-left space-y-6 md:space-y-8 lg:space-y-10">{seEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    
    if (typeof window !== 'undefined' && !isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (!isMobile) {
        window.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, [isMobile]);
  
  return { mousePosition, isMobile };
};

export default function Projects() {
  const { mousePosition, isMobile } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // Scroll speed tracking states
  const [scrollSpeed, setScrollSpeed] = useState(1); // Track scroll speed multiplier
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Typewriter text lines
  const typewriterLines = [
    { text: 'Tired of Waiting Forever', color: 'text-white' },
    { text: 'for Your', color: 'text-[#00b4ab]' },
    { text: 'Perfect Style?', color: 'text-white' }
  ];

  // Feature cards data - original structure
  const features = [
    {
      title: "AI Booking",
      description: "Smart scheduling with real-time availability",
      category: "booking",
      icon: "calendar",
      highlights: [
        "Real-time Availability: Instant booking with live calendar sync",
        "Smart Scheduling: AI optimizes appointment times for efficiency",
        "Automated Reminders: Never miss an appointment again"
      ]
    },
    {
      title: "Save Time",
      description: "Skip the wait, get perfect grooming instantly",
      category: "ai", 
      icon: "sparkles",
      highlights: [
        "No More Wait Time: Book instantly without endless searching",
        "Your Perfect Stylist: Matched with professionals who understand your style",
        "On Your Time: Flexible scheduling that fits your busy lifestyle"
      ]
    },
    {
      title: "Market Study",
      description: "Shape the future of AI grooming",
      category: "research",
      icon: "chart",
      highlights: [
        "Early Access: First access to new AI grooming features",
        "Exclusive Benefits: Special pricing and premium features",
        "Shape Development: Your feedback directly influences our roadmap"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'booking': return 'from-blue-500 to-blue-600';
      case 'ai': return 'from-purple-500 to-purple-600';
      case 'research': return 'from-orange-500 to-orange-600';
      default: return 'from-teal-500 to-teal-600';
    }
  };

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'calendar':
        return (
          <svg className="w-3 h-3 sm:w-5 sm:h-5 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'sparkles':
        return (
          <svg className="w-3 h-3 sm:w-5 sm:h-5 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3L11 3l3.057 3L17 3v4l-3.057 3L11 7l-3.057 3L5 7V3z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-3 h-3 sm:w-5 sm:h-5 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3 sm:w-5 sm:h-5 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (isInView) {
      controls.start("visible");
      // Start typewriter effect when section comes into view
      if (!hasStartedTyping) {
        setHasStartedTyping(true);
      }
    }
  }, [isInView, controls, hasStartedTyping]);

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
    if (!isClient || !hasStartedTyping) return;

    // Calculate dynamic timing based on scroll speed - Much faster values
    const baseTypingSpeed = 15; // Reduced from 35 to 15
    const basePauseSpeed = 80;  // Reduced from 150 to 80
    const baseInitialDelay = 100; // Reduced from 200 to 100
    
    const typingSpeed = Math.max(baseTypingSpeed / scrollSpeed, 3); // Min 3ms (was 8ms)
    const pauseSpeed = Math.max(basePauseSpeed / scrollSpeed, 15); // Min 15ms (was 30ms)
    const initialDelay = Math.max(baseInitialDelay / scrollSpeed, 25); // Min 25ms (was 50ms)

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
  }, [currentLineIndex, currentCharIndex, isClient, hasStartedTyping, typewriterLines, scrollSpeed]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden py-8 xs:py-12 sm:py-16 md:py-20 lg:py-24 projects-responsive"
      style={{ cursor: 'auto' }}
    >
      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
        {/* Desktop Pattern */}
        <svg className="absolute inset-0 w-full h-full hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-projects-desktop" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
              <path d="M 0 0 L 0 10" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-projects-desktop)" />
        </svg>
        
        {/* Mobile Pattern - 4x denser rows */}
        <svg className="absolute inset-0 w-full h-full block sm:hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-projects-mobile" x="0" y="0" width="10" height="2.5" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0" fill="none" stroke="#00b4ab" strokeWidth="0.05"/>
              <path d="M 0 0 L 0 2.5" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-projects-mobile)" />
        </svg>
      </div>

      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00b4ab]/30 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.max((3 + i * 0.5) / scrollSpeed, 0.8 + i * 0.1), // Faster with scroll speed
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.max((i * 0.2) / scrollSpeed, i * 0.05), // Faster stagger
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient glow effect */}
      {isClient && !isMobile && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00b4ab]/20 to-[#008a82]/20 blur-3xl"
          animate={{
            x: mousePosition.x * 100 - 192,
            y: mousePosition.y * 100 - 192,
          }}
          transition={{ 
            type: "spring", 
            stiffness: Math.min(50 * scrollSpeed, 120), // More responsive with scroll speed
            damping: Math.max(30 - (scrollSpeed * 3), 20) // Reduce damping for faster movement
          }}
        />
      )}

      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center landscape-mobile:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-8 landscape-mobile:col-span-8 text-left pt-0 xs:pt-0 sm:pt-0 md:pt-4 projects-content mt-16 xs:mt-20 sm:mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48">
              
              {/* Main Headline with Typewriter Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: Math.max(0.4 / scrollSpeed, 0.1), 
                  delay: Math.max(0.2 / scrollSpeed, 0.05) 
                }}
                className="text-3xl xs:text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight tracking-tight min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[220px] lg:min-h-[260px] -mt-2 xs:-mt-3 sm:-mt-4 md:mt-0 projects-heading"
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
                className="text-sm xs:text-base sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-3xl projects-subheading"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                AI-powered grooming companion bringing instant bookings and personalized recommendations.
              </motion.p>

              {/* Pitch Deck Card - Mobile Portrait Only */}
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
                className="mt-6 xs:mt-8 sm:mt-10 md:hidden landscape-mobile:hidden w-full max-w-xs xs:max-w-sm sm:max-w-md"
              >
                {/* Pitch Deck Card */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 shadow-lg border border-gray-800 hover:border-[#00b4ab]/50 transition-all duration-300 group relative overflow-hidden w-full"
                  animate={{
                    y: !isMobile ? mousePosition.y * -5 : 0,
                    rotateX: !isMobile ? mousePosition.y * 2 : 0,
                    rotateY: !isMobile ? mousePosition.x * 2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00b4ab]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Document Icon */}
                  <div className="relative w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b4ab] to-[#008a82] rounded-md sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00b4ab]/20 rounded-md sm:rounded-xl blur-lg sm:blur-xl"></div>
                  </div>
                  
                  <h3 className="text-xs sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-[#00b4ab] transition-colors duration-300">Stibe Pitch Deck</h3>
                  <p className="text-gray-300 text-[9px] sm:text-sm leading-relaxed mb-2 sm:mb-4">
                    Business overview and market analysis for our AI grooming platform
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-0.5 xs:space-y-1 sm:space-y-2 mb-2 xs:mb-3 sm:mb-4">
                    {['Market Research', 'Business Model', 'Growth Strategy'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-[8px] xs:text-[9px] sm:text-xs text-gray-400">
                        <div className="w-0.5 h-0.5 xs:w-0.5 xs:h-0.5 sm:w-1 sm:h-1 bg-[#00b4ab] rounded-full mr-1 xs:mr-1.5 sm:mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.a
                    href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 w-full px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 sm:py-2 bg-[#00b4ab] text-white text-[8px] xs:text-[9px] sm:text-xs font-medium rounded xs:rounded-md sm:rounded-lg hover:bg-[#008a82] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[#00b4ab]/20 block text-center"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Pitch Deck
                  </motion.a>
                  
                  {/* Status */}
                  <div className="flex items-center mt-1 xs:mt-2 sm:mt-3 pt-1 xs:pt-2 sm:pt-3 border-t border-gray-800">
                    <div className="w-0.5 h-0.5 xs:w-1 xs:h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full mr-1 xs:mr-1.5 sm:mr-2 animate-pulse" />
                    <span className="text-[7px] xs:text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Business Overview</span>
                  </div>
                </motion.div>
              </motion.div>


            </div>

            {/* Right Content - Pitch Deck Card (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ 
                  opacity: isTypingComplete ? 1 : 0, 
                  x: isTypingComplete ? 0 : 30 
                }}
                transition={{ 
                  duration: Math.max(0.5 / scrollSpeed, 0.12), 
                  delay: isTypingComplete ? Math.max(0.3 / scrollSpeed, 0.08) : 0 
                }}
                className="relative"
              >
                {/* Pitch Deck Card */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-lg border border-gray-800 hover:border-[#00b4ab]/50 transition-all duration-300 group relative overflow-hidden"
                  animate={{
                    y: !isMobile ? mousePosition.y * -5 : 0,
                    rotateX: !isMobile ? mousePosition.y * 2 : 0,
                    rotateY: !isMobile ? mousePosition.x * 2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00b4ab]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Document Icon */}
                  <div className="relative w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b4ab] to-[#008a82] rounded-md sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00b4ab]/20 rounded-md sm:rounded-xl blur-lg sm:blur-xl"></div>
                  </div>
                  
                  <h3 className="text-xs sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-[#00b4ab] transition-colors duration-300">Stibe Pitch Deck</h3>
                  <p className="text-gray-300 text-[9px] sm:text-sm leading-relaxed mb-2 sm:mb-4">
                    Business overview and market analysis for our AI grooming platform
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-0.5 sm:space-y-2 mb-2 sm:mb-4">
                    {['Market Research', 'Business Model', 'Growth Strategy'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-[7px] sm:text-xs text-gray-400">
                        <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#00b4ab] rounded-full mr-1 sm:mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.a
                    href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 w-full px-2 py-1 sm:px-3 sm:py-2 bg-[#00b4ab] text-white text-[7px] sm:text-xs font-medium rounded sm:rounded-lg hover:bg-[#008a82] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[#00b4ab]/20 block text-center"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Pitch Deck
                  </motion.a>
                  
                  {/* Status */}
                  <div className="flex items-center mt-1 sm:mt-3 pt-1 sm:pt-3 border-t border-gray-800">
                    <div className="w-0.5 h-0.5 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full mr-1 sm:mr-2 animate-pulse" />
                    <span className="text-[7px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Business Overview</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Features Section - Timeline Design */}
          <motion.div 
            className="-mt-2 sm:-mt-8 lg:-mt-12"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isTypingComplete ? 1 : 0 
            }}
            transition={{ 
              duration: Math.max(0.6 / scrollSpeed, 0.15), 
              delay: isTypingComplete ? Math.max(0.8 / scrollSpeed, 0.2) : 0 
            }}
          >
            {/* Mobile Vertical Timeline */}
            <div className="relative lg:hidden px-2 sm:px-4">
              {/* Timeline Line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b4ab]/50 via-[#00b4ab] to-[#00b4ab]/50"></div>
              
              <div className="space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-10 sm:pl-14"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ 
                      opacity: isTypingComplete ? 1 : 0,
                      x: isTypingComplete ? 0 : -30
                    }}
                    transition={{ 
                      duration: Math.max(0.5 / scrollSpeed, 0.12),
                      delay: isTypingComplete ? Math.max((0.4 + (index * 0.15)) / scrollSpeed, 0.1 + (index * 0.03)) : 0,
                    }}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute left-[-12px] sm:left-[-16px] w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${getCategoryColor(feature.category)} flex items-center justify-center shadow-lg border-2 border-gray-900`}>
                      <div className="text-white">
                        {getCategoryIcon(feature.icon)}
                      </div>
                    </div>
                    
                    {/* Content Panel */}
                    <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/60 rounded-lg sm:rounded-xl p-3 sm:p-5 hover:border-[#00b4ab]/50 hover:from-gray-800/60 hover:to-gray-900/60 transition-all duration-300 shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-3">
                        <h4 className="text-sm sm:text-lg font-bold text-white leading-tight">
                          {feature.title}
                        </h4>
                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(feature.category)} shadow-sm self-start sm:self-center`}>
                          {feature.category.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Show first 2 highlights */}
                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                        {feature.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-start gap-2 sm:gap-3">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#00b4ab] mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <p className="text-[11px] sm:text-sm text-gray-400 leading-relaxed">
                              <span className="font-semibold text-gray-200">
                                {highlight.split(':')[0]}:
                              </span>
                              <span className="text-gray-300">
                                {highlight.split(':')[1]}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      {feature.category === 'research' && (
                        <motion.a
                          href="https://forms.gle/6cDuUXCBXqur4XuQ7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Join Study</span>
                          <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Horizontal Timeline */}
            <div className="hidden lg:block px-4">
              {/* Horizontal Timeline Line */}
              <div className="relative mb-20">
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00b4ab] to-transparent"></div>
                
                <div className="grid grid-cols-3 gap-12">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ 
                        opacity: isTypingComplete ? 1 : 0,
                        y: isTypingComplete ? 0 : 30
                      }}
                      transition={{ 
                        duration: Math.max(0.6 / scrollSpeed, 0.15),
                        delay: isTypingComplete ? Math.max((0.5 + (index * 0.2)) / scrollSpeed, 0.12 + (index * 0.04)) : 0,
                        type: "spring",
                        stiffness: Math.min(120 * scrollSpeed, 300),
                        damping: Math.max(20 - (scrollSpeed * 3), 15)
                      }}
                    >
                      {/* Timeline Node */}
                      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(feature.category)} flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform duration-300 border-4 border-gray-900`}>
                        <div className="text-white">
                          {getCategoryIcon(feature.icon)}
                        </div>
                      </div>
                      
                      {/* Content Card */}
                      <div className="mt-20 bg-gradient-to-br from-gray-800/40 to-gray-900/50 backdrop-blur-sm border border-gray-700/40 rounded-2xl p-8 hover:border-[#00b4ab]/50 hover:from-gray-800/60 hover:to-gray-900/70 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#00b4ab]/20 min-h-[460px] flex flex-col">
                        
                        {/* Category Badge */}
                        <div className="flex justify-center mb-6">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getCategoryColor(feature.category)} shadow-lg`}>
                            {feature.category.toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Title and Description */}
                        <h4 className="text-2xl xl:text-3xl font-bold text-white mb-6 text-center group-hover:text-[#00b4ab] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        
                        <p className="text-gray-300 mb-8 leading-relaxed text-center text-base">
                          {feature.description}
                        </p>
                        
                        {/* All Highlights */}
                        <div className="space-y-4 mb-8 flex-1">
                          {feature.highlights.map((highlight, highlightIndex) => (
                            <div key={highlightIndex} className="flex items-start gap-4">
                              <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-400 leading-relaxed">
                                <span className="font-semibold text-gray-200 text-base">
                                  {highlight.split(':')[0]}:
                                </span>
                                <span className="text-gray-300">
                                  {highlight.split(':')[1]}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Button */}
                        <div className="mt-auto">
                          {feature.category === 'research' && (
                            <motion.a
                              href="https://forms.gle/6cDuUXCBXqur4XuQ7"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-500/30"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <span>Join Market Study</span>
                              <svg className="ml-3 w-5 h-5 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.a>
                          )}
                        </div>
                      </div>
                      
                      {/* Connecting Line for Middle Items */}
                      {index < features.length - 1 && (
                        <div className="absolute top-8 left-full w-12 h-0.5 bg-[#00b4ab]/60 transform translate-x-0"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
