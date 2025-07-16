'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Generate deterministic positions for particles
  const particlePositions = [
    { x: 100, y: 150 },
    { x: 300, y: 400 },
    { x: 800, y: 200 },
    { x: 1200, y: 500 },
    { x: 400, y: 600 },
    { x: 700, y: 100 },
    { x: 1000, y: 350 },
    { x: 200, y: 700 },
    { x: 1400, y: 250 },
    { x: 600, y: 800 },
    { x: 900, y: 450 },
    { x: 1100, y: 650 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
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
      className="relative min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 overflow-hidden"
    >
      {/* Company Logo - Top Left (Desktop Only) */}
      <div className="absolute -top-5 left-6 md:left-10 lg:left-14 z-[100] hidden md:block">
        <a href="/" aria-label="Go to homepage" className="group block hover:scale-110 transition-transform duration-300 ease-out relative">
          <img src="/pydart_logo.png" alt="Pydart Logo" className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300" />
        </a>
      </div>


      {/* Email Us Button - Top Right */}
      <div className="absolute top-8 right-2 sm:right-4 md:right-6 lg:right-8 z-50 hidden md:block">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=info.pydart@gmail.com&su=Inquiry%20from%20Website&body=Hello%20Pydart%20Team,%0A%0AI%20would%20like%20to%20inquire%20about%20your%20services.%0A%0AThank%20you!"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative cursor-pointer overflow-hidden px-3 py-2 rounded-sm transition-colors duration-200 block pointer-events-auto text-neutral-700"
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

      {/* Animated Floating Teal Dot */}
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
            <pattern id="neural-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      {/* Subtle Particle Field */}
      {isClient && (
        <div className="absolute inset-0">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neutral-400/20 rounded-full"
              initial={{
                x: pos.x,
                y: pos.y,
              }}
              animate={{
                x: pos.x + (i % 2 === 0 ? 100 : -100),
                y: pos.y + (i % 3 === 0 ? 50 : -50),
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient Glow Effect */}
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

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 text-left pt-8 sm:pt-12 md:pt-0">
              
              {/* Company Logo (Mobile Only) */}
              <div className="mb-0 md:hidden">
                <a href="/" aria-label="Go to homepage" className="group block hover:scale-110 transition-transform duration-300 ease-out relative inline-block">
                  <img src="/pydart_logo.png" alt="Pydart Logo" className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                </a>
              </div>
              
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-neutral-900 mb-8 leading-[0.9] tracking-tight -mt-8 md:mt-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.span 
                  className="block"
                  animate={{
                    x: isHovering ? mousePosition.x * 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  Intelligence,
                </motion.span>
                <motion.span 
                  className="block text-[#00b4ab]"
                  animate={{
                    x: isHovering ? mousePosition.x * -3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  Designed for
                </motion.span>
                <motion.span 
                  className="block"
                  animate={{
                    x: isHovering ? mousePosition.x * 2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  Everyday Impact.
                </motion.span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl text-neutral-600 mb-12 leading-relaxed font-light max-w-3xl"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                We craft scalable AI solutions — from personal care to intelligent systems — driven by empathy, data, and design.
              </motion.p>

              {/* CTA Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-8"
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="group relative inline-flex items-center text-lg font-medium text-[#00b4ab] pb-1"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <span className="relative">
                    Explore Stibe
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
                </motion.button>
                
                <motion.a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToServices();
                  }}
                  className="group relative inline-flex items-center text-lg font-medium text-neutral-700 pb-1"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <span className="relative">
                    What We Do ?
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] bg-neutral-700"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>

            {/* Right Content - Stibe Spotlight */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative"
              >
                {/* Stibe Product Card */}
                <motion.div
                  className="bg-neutral-200/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-neutral-300/50 relative overflow-hidden"
                  animate={{
                    y: mousePosition.y * -10,
                    rotateX: mousePosition.y * 5,
                    rotateY: mousePosition.x * 5,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Stibe Logo/Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00b4ab] to-teal-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">Stibe</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    AI-powered grooming platform connecting users with trusted stylists, salons & pet groomers
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {['Smart Booking', 'AI Recommendations', 'Quality Assurance'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-sm text-neutral-700">
                        <div className="w-1.5 h-1.5 bg-[#00b4ab] rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center mt-6 pt-6 border-t border-neutral-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">Featured Product</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-neutral-400"
        >
          <span className="text-xs mb-2 uppercase tracking-widest font-medium">Discover</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-neutral-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
