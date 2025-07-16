'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Types
interface InvestmentArea {
  title: string;
  description: string;
  image: string;
  percentage: string;
  focus: string[];
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

export default function Investments() {
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

  // Investment areas
  const investments: InvestmentArea[] = [
    {
      title: "AI & Machine Learning",
      description: "Intelligent systems that understand, learn, and adapt to human needs",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
      percentage: "40%",
      focus: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Deep Learning"]
    },
    {
      title: "Mobile Innovation",
      description: "Next-generation mobile experiences with seamless performance and intuitive design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format",
      percentage: "25%",
      focus: ["Cross-platform Development", "AR/VR Integration", "IoT Connectivity", "Performance Optimization"]
    },
    {
      title: "Web Technologies",
      description: "Modern web platforms that scale globally and perform beautifully",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
      percentage: "20%",
      focus: ["Progressive Web Apps", "Microservices", "Cloud Infrastructure", "Real-time Systems"]
    },
    {
      title: "Research & Development",
      description: "Exploring emerging technologies and pushing the boundaries of what's possible",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
      percentage: "15%",
      focus: ["Quantum Computing", "Blockchain", "Edge Computing", "5G Applications"]
    }
  ];

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
                Investment
              </motion.span>
              <motion.span 
                className="block text-[#00b4ab]"
                animate={{
                  x: isHovering ? mousePosition.x * -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                Focus
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0"
              variants={itemVariants}
            >
              Strategic allocation of resources across cutting-edge technologies 
              to build the future of intelligent applications and seamless user experiences.
            </motion.p>
          </motion.div>

          {/* Investment Areas Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 px-4 sm:px-0"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {investments.map((area, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-neutral-200/90 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-300/50">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img 
                      src={area.image} 
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Percentage badge */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#00b4ab] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {area.percentage}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2 sm:mb-3 group-hover:text-[#00b4ab] transition-colors duration-300">
                      {area.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-3 sm:mb-4 leading-relaxed text-sm">
                      {area.description}
                    </p>
                    
                    {/* Focus areas */}
                    <div className="space-y-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-neutral-700 mb-2">Key Focus Areas:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {area.focus.map((item, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md hover:bg-[#00b4ab] hover:text-white transition-colors duration-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Investment Philosophy */}
          <motion.div 
            className="bg-neutral-200/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-300/50 mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div className="text-center max-w-4xl mx-auto" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">Our Investment Philosophy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00b4ab] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Innovation First</h4>
                  <p className="text-sm text-neutral-600">Prioritizing breakthrough technologies that reshape industries</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00b4ab] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Human-Centered</h4>
                  <p className="text-sm text-neutral-600">Technology that enhances human capability and experience</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00b4ab] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Global Impact</h4>
                  <p className="text-sm text-neutral-600">Solutions that scale to create worldwide positive change</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div 
              className="inline-flex gap-6"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="group relative inline-flex items-center text-lg font-medium text-[#00b4ab] pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Partner With Us
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
                className="group relative inline-flex items-center text-lg font-medium text-neutral-700 pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  View Our Work
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
