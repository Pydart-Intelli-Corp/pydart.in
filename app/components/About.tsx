'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Types
interface CompanyStat {
  value: string;
  label: string;
  description: string;
}

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

export default function About() {
  const { mousePosition, isMobile } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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

  // Minimal company stats
  const stats: CompanyStat[] = [
    {
      value: "2024",
      label: "Founded",
      description: "Innovative solutions since day one"
    },
    {
      value: "AI-First",
      label: "Approach",
      description: "Intelligence at the core of everything"
    },
    {
      value: "Global",
      label: "Team",
      description: "Remote talent, local impact"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-gradient-to-b from-white to-neutral-100 overflow-hidden"
    >
      {/* Floating teal dot */}
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
      <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
        {/* Desktop Pattern */}
        <svg className="absolute inset-0 w-full h-full hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-about-desktop" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
              <path d="M 0 0 L 0 10" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-about-desktop)" />
        </svg>
        
        {/* Mobile Pattern - 4x denser rows */}
        <svg className="absolute inset-0 w-full h-full block sm:hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-about-mobile" x="0" y="0" width="10" height="2.5" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
              <path d="M 0 0 L 0 2.5" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-about-mobile)" />
        </svg>
      </div>

      {/* Ambient glow effect */}
      {isClient && (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Column - About Header */}
            <motion.div 
              className="w-full lg:w-2/5"
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight">
                  About <span className="text-[#00b4ab]">Pydart</span>
                </h2>
                <div className="h-1 w-16 sm:w-20 bg-[#00b4ab] mb-4 sm:mb-6 mx-auto sm:mx-0"></div>
                <p className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
                  Building the future through intelligent design and empathetic technology. 
                  We create AI-powered solutions that enhance everyday life.
                </p>
                
                {/* Mission Statement */}
                <div className="bg-neutral-50 border-l-4 border-[#00b4ab] pl-3 sm:pl-4 py-3 sm:py-4 mb-6 sm:mb-8 mx-2 sm:mx-0 rounded-r-lg">
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-800 mb-1 sm:mb-2">Our Mission</h4>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    To democratize access to intelligent technology by creating AI-powered solutions 
                    that are intuitive, accessible, and genuinely useful in people's daily lives.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 px-4 sm:px-0">
                  <motion.a 
                    href="/about"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#00b4ab] text-white font-medium rounded-lg hover:bg-teal-600 transition-colors duration-300 text-sm sm:text-base shadow-md hover:shadow-lg"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <span>Learn More About Us</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                  
                  <motion.button 
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-neutral-700 font-medium border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-300 text-sm sm:text-base shadow-sm hover:shadow-md"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats Cards */}
            <motion.div 
              className="w-full lg:w-3/5"
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            >
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 px-4 sm:px-0">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="relative overflow-hidden bg-transparent sm:bg-white rounded-none sm:rounded-xl shadow-none sm:shadow-lg hover:shadow-none sm:hover:shadow-xl transition-shadow duration-300 border-0 sm:border border-neutral-200 sm:border-neutral-100"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* No accent bar on mobile */}
                    <div className={`h-0 sm:h-1.5 w-full ${index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    
                    <div className="p-2 sm:p-6 text-center sm:text-left">
                      <h4 className="text-base sm:text-2xl font-semibold sm:font-bold text-neutral-700 sm:text-neutral-800 mb-0 sm:mb-1">{stat.value}</h4>
                      <p className="text-[#00b4ab] font-normal sm:font-medium mb-0 sm:mb-3 text-xs sm:text-base opacity-80 sm:opacity-100">{stat.label}</p>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed hidden sm:block">
                        {stat.description}
                      </p>
                      
                      {/* Hide decorative circle on mobile */}
                      <div className={`absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full opacity-0 sm:opacity-10 ${
                        index === 0 ? 'bg-purple-400' : index === 1 ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* View Projects CTA - Mobile optimized */}
              <motion.button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group flex items-center justify-center sm:justify-end w-full mt-6 sm:mt-8 text-neutral-700 font-medium px-4 sm:px-0 py-2 sm:py-0 rounded-lg sm:rounded-none bg-neutral-50 sm:bg-transparent hover:bg-neutral-100 sm:hover:bg-transparent transition-colors duration-300"
                whileHover={{ x: 5 }}
                variants={itemVariants}
              >
                <span className="text-sm sm:text-base">View Our Projects</span>
                <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
