'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

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
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
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

  // Feature cards data
  const features = [
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
      title: "Market Research Study",
      description: "Join our comprehensive market study to shape the future of AI-powered grooming services",
      category: "research",
      icon: "chart",
      highlights: [
        "Early Access: Be among the first to experience Stibe's innovative features before public launch",
        "Shape the Future: Your feedback directly influences product development and feature priorities",
        "Exclusive Benefits: Get special discounts, priority booking, and insider updates on new developments"
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
      case 'chart':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

  // Typewriter effect
  useEffect(() => {
    if (!isClient || !hasStartedTyping) return;

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
          }, 150);
        }
      } else {
        // All lines complete
        setIsTypingComplete(true);
      }
    }, currentCharIndex === 0 ? 200 : 35);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isClient, hasStartedTyping, typewriterLines]);

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
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden py-20 lg:py-32"
      style={{ cursor: 'auto' }}
    >
      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-projects" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-projects)" />
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

      {/* Ambient glow effect */}
      {isClient && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00b4ab]/20 to-[#008a82]/20 blur-3xl"
          animate={{
            x: mousePosition.x * 100 - 192,
            y: mousePosition.y * 100 - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      )}

      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">
            
            {/* Left Content */}
            <div className="lg:col-span-8 text-left">
              
              {/* Main Headline with Typewriter Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight tracking-tight min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px]"
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
                Stibe is your AI-powered grooming companion — bringing instant bookings, personalized recommendations, and on-demand services right to your fingertips.
              </motion.p>


            </div>

            {/* Right Content - Pitch Deck Card */}
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
                {/* Pitch Deck Card */}
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
                  
                  {/* Document Icon */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-[#00b4ab] to-[#008a82] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00b4ab]/20 rounded-xl blur-xl"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00b4ab] transition-colors duration-300">Stibe Pitch Deck</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Comprehensive business overview, market analysis, and growth strategy for our AI grooming platform
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {['Market Research', 'Business Model', 'Growth Strategy'].map((feature, index) => (
                      <div key={feature} className="flex items-center text-xs text-gray-400">
                        <div className="w-1 h-1 bg-[#00b4ab] rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.a
                    href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 w-full px-3 py-2 bg-[#00b4ab] text-white text-xs font-medium rounded-lg hover:bg-[#008a82] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[#00b4ab]/20 block text-center"
                    style={{ pointerEvents: 'auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Pitch Deck
                  </motion.a>
                  
                  {/* Status */}
                  <div className="flex items-center mt-3 pt-3 border-t border-gray-800">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Business Overview</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Feature Cards Section */}
          <motion.div 
            className="-mt-8 lg:-mt-12"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isTypingComplete ? 1 : 0 
            }}
            transition={{ duration: 0.6, delay: isTypingComplete ? 0.8 : 0 }}
          >
            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: isTypingComplete ? 1 : 0,
                    y: isTypingComplete ? 0 : 50
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isTypingComplete ? 1.2 + (index * 0.2) : 0,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#00b4ab]/20 transition-all duration-500 overflow-hidden border border-gray-700 hover:border-[#00b4ab]/50 h-full p-8">
                    
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(feature.category)} text-white shadow-lg`}>
                        {getCategoryIcon(feature.icon)}
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(feature.category)} shadow-lg`}>
                        {feature.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-[#00b4ab] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3 mb-6">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ab] mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-400 leading-relaxed">
                            <span className="font-semibold text-gray-200">
                              {highlight.split(':')[0]}:
                            </span>
                            {highlight.split(':')[1]}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Market Study Button - Only show for research category */}
                    {feature.category === 'research' && (
                      <motion.a
                        href="https://forms.gle/6cDuUXCBXqur4XuQ7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          Join Market Study
                        </span>
                        <svg className="ml-2 w-4 h-4 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
