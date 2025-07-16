'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Types
interface Feature {
  title: string;
  description: string;
  category: 'booking' | 'ai' | 'service';
  icon: string;
  highlights: string[];
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

export default function Projects() {
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

  // Feature data
  const features: Feature[] = [
    {
      title: "AI Booking Management",
      description: "Experience seamless scheduling with real-time availability and smart conflict resolution",
      category: "booking",
      icon: "calendar",
      highlights: [
        "Instant Availability: See real-time open slots and book your appointment in one tap",
        "Auto-Reminders & Rescheduling: Never miss or double-book again—Stibe handles calendar conflicts for you",
        "Dynamic Slot Optimization: Maximizes provider availability to reduce your wait time"
      ]
    },
    {
      title: "Personalized AI Suggestions",
      description: "Get tailored recommendations based on your style preferences and trending looks",
      category: "ai", 
      icon: "sparkles",
      highlights: [
        "Style Match: Our AI analyzes your past choices and local trends to recommend looks you'll love",
        "Product Pairings: Get add-on suggestions—from premium shampoos to styling tools—that complement your service",
        "Trend Alerts: Be the first to try hot new styles and seasonal treatments"
      ]
    },
    {
      title: "On-Demand Services",
      description: "Choose between salon visits or professionals who come to you, for the whole family",
      category: "service",
      icon: "home",
      highlights: [
        "Home & Salon: Choose between salon visits or professionals who come to you",
        "Family & Pets: Book kids' haircuts, senior friendly services, and certified pet groomers all in one place",
        "Verified Experts: Browse ratings, portfolios, and safety credentials before you book"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'booking': return 'from-blue-500 to-blue-600';
      case 'ai': return 'from-purple-500 to-purple-600';
      case 'service': return 'from-green-500 to-green-600';
      default: return 'from-teal-500 to-teal-600';
    }
  };

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'calendar':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'sparkles':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3L11 3l3.057 3L17 3v4l-3.057 3L11 7l-3.057 3L5 7V3z" />
          </svg>
        );
      case 'home':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 overflow-hidden py-32 lg:py-40"
    >
      {/* Floating teal dot */}
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
            <pattern id="neural-grid-projects" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-projects)" />
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

      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-20 sm:mb-32"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Headline */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-8 leading-[0.9] tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif' }}
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
                Tired of Waiting Forever
              </motion.span>
              <motion.span 
                className="block text-[#00b4ab]"
                animate={{
                  x: isHovering ? mousePosition.x * -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                for Your Perfect Style?
              </motion.span>
            </motion.h2>

            {/* Subheadline */}
            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-700 mb-8 leading-relaxed max-w-4xl mx-auto"
              variants={itemVariants}
            >
              Stibe by Pydart Intelli Corp is your soon‑to‑launch AI grooming and styling companion—bringing instant bookings, personalized recommendations, and on‑demand services for you, your family, and your pets.
            </motion.h3>

            {/* Intro Paragraph */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0"
              variants={itemVariants}
            >
              Stibe will launch soon! Get ready to experience seamless scheduling, smart style suggestions, and top‑rated professionals at your fingertips. Whether you need a fresh haircut, a relaxing spa treatment, or a pet grooming session, our AI‑powered platform matches you with the right expert in seconds.
            </motion.p>
          </motion.div>

          {/* Key Features Section */}
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.h3 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 text-center mb-16 tracking-tight"
              variants={itemVariants}
            >
              Key Features
            </motion.h3>

            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-neutral-200/50 h-full p-8">
                    
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(feature.category)} text-white`}>
                        {getCategoryIcon(feature.icon)}
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(feature.category)}`}>
                        {feature.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4 group-hover:text-[#00b4ab] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ab] mt-2 flex-shrink-0" />
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            <span className="font-semibold text-neutral-800">
                              {highlight.split(':')[0]}:
                            </span>
                            {highlight.split(':')[1]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Market Study & Call to Action */}
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Market Study Section */}
            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-200/50 p-8 sm:p-12 mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                Market Study & Resources
              </h4>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Curious about our industry insights? Fill out our market study and see why experts believe in Stibe's potential:
              </p>
              <motion.a
                href="https://forms.gle/6cDuUXCBXqur4XuQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00b4ab] to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-[#00b4ab] transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Complete the Market Study
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Primary Calls to Action */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              variants={itemVariants}
            >
              <motion.a
                href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center text-lg font-medium text-neutral-700 pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Download Pitch Deck
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-neutral-700"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.a>

              <motion.button
                onClick={() => {
                  const element = document.getElementById('investments');
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
                className="group relative inline-flex items-center text-lg font-medium text-[#00b4ab] pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Investment Opportunities
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-[#00b4ab]"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
