'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-black">
      {/* Company Logo - Top Left */}
      <div className="absolute -top-5 left-6 md:left-10 lg:left-14 z-[100]">
        <a href="/" aria-label="Go to homepage" className="group block hover:scale-110 transition-transform duration-300 ease-out relative">
          <img src="/pydart_logo.png" alt="Pydart Logo" className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300" />
        </a>
      </div>

      {/* Email Us Button - Top Right */}
      <div className="absolute top-8 right-4 md:right-6 lg:right-8 z-50">
        <a
          href="mailto:hello@pydart.com"
          className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative cursor-pointer overflow-hidden px-3 py-2 rounded-sm hover:bg-white/10 transition-colors duration-200 block pointer-events-auto text-white"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
            <span className="relative">
              <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">
                Email Us
              </span>
              <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">
                Email Us
              </span>
            </span>
            <span className="absolute left-1 md:left-1.5 lg:left-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2.5 md:group-hover:translate-y-3 text-[#FF4D00]">(</span>
            <span className="absolute right-1 md:right-1.5 lg:right-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2.5 md:group-hover:translate-y-3 text-[#FF4D00]">)</span>
          </span>
        </a>
      </div>

      {/* Hero Background Images with Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`absolute inset-0 ${gradientBackgrounds[currentSlide]}`}
        >
          {!imageLoadError && (
            <Image
              src={heroImages[currentSlide]}
              alt={`Hero background ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
              onError={() => setImageLoadError(true)}
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            We Build AI-Powered Products
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 font-medium max-w-4xl mx-auto"
          >
            Delivering advanced digital solutions that transform businesses and create extraordinary user experiences
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToServices}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4D00] to-[#e64400] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#FF4D00]/30 transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Services →
            </button>
            <a
              href="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            >
              Learn More About Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#FF4D00] scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
