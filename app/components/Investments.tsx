'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

export default function Investments() {
  const { mousePosition } = useMouseTracking();
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

  return (
    <section 
      ref={sectionRef}
      id="investments"
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
            <pattern id="neural-grid-investments" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-investments)" />
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
          {/* Why Stibe? - Investor Section */}
          <motion.div 
            className="bg-gradient-to-r from-[#00b4ab]/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-[#00b4ab]/20 mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div className="max-w-6xl mx-auto" variants={itemVariants}>
              {/* Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  Why <span className="text-[#00b4ab]">Stibe</span>?
                </h3>
                <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
                  Our flagship AI-powered grooming and styling platform represents the future of beauty and wellness services
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.div 
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-neutral-200/50"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-800 mb-2">MVP in Progress</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Core AI scheduler and suggestion engine under development
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-neutral-200/50"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-800 mb-2">Early Traction</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Partnerships lined up with 50+ salons and freelance stylists
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-neutral-200/50"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-800 mb-2">Market Demand</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Pre‑launch interest from 2,000+ potential users
                  </p>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="text-center">
                <h4 className="text-xl font-semibold text-neutral-800 mb-8">Investor Actions</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00b4ab] to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-[#00b4ab] transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Pitch Deck
                  </motion.a>

                  <motion.button
                    onClick={() => router.push('/investor')}
                    className="inline-flex items-center px-6 py-3 border-2 border-[#00b4ab] text-[#00b4ab] font-semibold rounded-lg hover:bg-[#00b4ab] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Read More
                  </motion.button>

                  <motion.a
                    href="mailto:info.pydart@gmail.com"
                    className="inline-flex items-center px-6 py-3 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
