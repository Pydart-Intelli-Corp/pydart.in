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
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', updateMousePosition);
      return () => window.removeEventListener('mousemove', updateMousePosition);
    }
  }, []);
  
  return { mousePosition };
};

export default function About() {
  const { mousePosition } = useMouseTracking();
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
      className="relative min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 overflow-hidden"
    >
      {/* Floating orange dot */}
      {isClient && (
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
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-about" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-about)" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-0">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Main heading */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight tracking-tight"
              variants={itemVariants}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.span 
                className="block"
                animate={{
                  x: isHovering ? mousePosition.x * 3 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                About
              </motion.span>
              <motion.span 
                className="block text-[#00b4ab]"
                animate={{
                  x: isHovering ? mousePosition.x * -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                Pydart
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light mb-8 sm:mb-12 px-4 sm:px-0"
              variants={itemVariants}
            >
              Building the future through intelligent design and empathetic technology. 
              We create AI-powered solutions that enhance everyday life.
            </motion.p>

            {/* Mission Statement */}
            <motion.div
              className="bg-neutral-200/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-300/50 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                To democratize access to intelligent technology by creating AI-powered solutions 
                that are intuitive, accessible, and genuinely useful in people's daily lives.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4 sm:px-0"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-neutral-200/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-300/50">
                  <div className="text-2xl sm:text-3xl font-bold text-[#00b4ab] mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-base sm:text-lg font-semibold text-neutral-800 mb-1 sm:mb-2">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-neutral-600">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Learn More Button */}
          <motion.div 
            className="text-center mb-16 sm:mb-20 px-4 sm:px-0"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.a 
                href="/about"
                className="inline-flex items-center justify-center bg-[#00b4ab] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#009e96] transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                Learn More About Us
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center px-4 sm:px-0"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div 
              className="flex flex-col sm:inline-flex sm:flex-row gap-4 sm:gap-6"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="group relative inline-flex items-center justify-center sm:justify-start text-base sm:text-lg font-medium text-[#00b4ab] pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Join Our Team
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-[#00b4ab]"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center justify-center sm:justify-start text-base sm:text-lg font-medium text-neutral-700 pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Our Work
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-neutral-700"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
