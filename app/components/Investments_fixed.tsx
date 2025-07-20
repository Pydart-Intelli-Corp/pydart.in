'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Mouse tracking hook
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
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

export default function Investments() {
  const { mousePosition, isMobile } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    setIsClient(true);
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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

  // Background gradient explanation:
  // - Custom gradient using Services section's bottom-left color (gray-900) at top-left position
  // - Direction: to-br (top-left to bottom-right)
  // - Top-left: gray-900 (rgb(17, 24, 39)) - Darker shade from Services section's bottom-left
  // - Middle: Pure black for depth
  // - Bottom-right: gray-800 (rgb(31, 41, 55)) - Slightly lighter shade 
  //
  // Note: Using CSS gradient instead of Tailwind classes for more precise color positioning
  // Additional optimization with willChange and transform properties for better performance
  return (
    <section 
      ref={sectionRef}
      id="investments"
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, rgba(3, 3, 20, 1), rgb(0, 0, 0), rgb(31, 41, 55))`,
        willChange: 'transform', // Hint browser for optimization
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {/* Floating orange dot */}
      {isClient && !isMobile && (
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-[#00b4ab] shadow-lg shadow-teal-500/30 pointer-events-none z-30"
          animate={{
            x: mousePosition.x * 800,
            y: mousePosition.y * 600,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            mass: 0.5
          }}
        />
      )}

      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
        {/* Desktop Pattern */}
        <svg className="absolute inset-0 w-full h-full hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-investments-desktop" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
              <path d="M 0 0 L 0 10" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-investments-desktop)" />
        </svg>
        
        {/* Mobile Pattern - 4x denser rows */}
        <svg className="absolute inset-0 w-full h-full block sm:hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-investments-mobile" x="0" y="0" width="10" height="2.5" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0" fill="none" stroke="#00b4ab" strokeWidth="0.05"/>
              <path d="M 0 0 L 0 2.5" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-investments-mobile)" />
        </svg>
      </div>

      {/* Ambient glow effect */}
      {isClient && !isMobile && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-teal-200/10 to-teal-300/10 blur-3xl"
          animate={{
            x: mousePosition.x * 100 - 192,
            y: mousePosition.y * 100 - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      )}

      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full py-4 sm:py-8 md:py-12 lg:py-20">
          {/* Why Stibe? - Investor Section */}
          <motion.div 
            className="bg-gradient-to-r from-[#00b4ab]/10 to-teal-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-[#00b4ab]/20 mb-8 sm:mb-12 lg:mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div className="max-w-6xl mx-auto" variants={itemVariants}>
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                  Why <span className="text-[#00b4ab]">Stibe</span>?
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                  Our flagship AI-powered grooming and styling platform represents the future of beauty and wellness services
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center border border-[#00b4ab]/30"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">MVP in Progress</h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed px-1 sm:px-0">
                    Core AI scheduler and suggestion engine under development
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center border border-[#00b4ab]/30"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">Early Traction</h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed px-1 sm:px-0">
                    Partnerships lined up with 50+ salons and freelance stylists
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center border border-[#00b4ab]/30"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">Market Demand</h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed px-1 sm:px-0">
                    Pre‑launch interest from 2,000+ potential users
                  </p>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="text-center">
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-4 sm:mb-6 lg:mb-8">Investor Actions</h4>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
                  <motion.a
                    href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:border-[#00b4ab] hover:bg-[#00b4ab]/10 transition-all duration-300 group relative overflow-hidden text-xs sm:text-sm lg:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#00b4ab] flex items-center">
                      <svg className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 group-hover:text-[#00b4ab] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="hidden sm:inline">Download Pitch Deck</span>
                      <span className="sm:hidden">Pitch Deck</span>
                    </span>
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00b4ab]/0 via-[#00b4ab]/5 to-[#00b4ab]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>

                  <motion.button
                    onClick={() => router.push('/investor')}
                    className="text-xs sm:text-sm lg:text-base font-medium group relative overflow-hidden px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 rounded-sm transition-colors duration-200 text-white hover:text-[#00b4ab]"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <span className="inline-block px-0.5 sm:px-1 lg:px-1.5">
                      <span className="relative">
                        <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">
                          Read More
                        </span>
                        <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#00b4ab] group-hover:-translate-y-0.5 group-hover:opacity-100">
                          Read More
                        </span>
                      </span>
                      <span className="absolute left-1 md:left-1.5 lg:left-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 md:group-hover:translate-y-5 text-[#00b4ab]">(</span>
                      <span className="absolute right-1 md:right-1.5 lg:right-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4 md:group-hover:translate-y-5 text-[#00b4ab]">)</span>
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
