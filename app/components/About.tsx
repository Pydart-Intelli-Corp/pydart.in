'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface CompanyStat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

// Enhanced mouse tracking
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = x / window.innerWidth;
      const normalizedY = y / window.innerHeight;
      
      setMousePosition({ x, y });
      setNormalizedPosition({ x: normalizedX, y: normalizedY });
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', updateMousePosition);
      return () => window.removeEventListener('mousemove', updateMousePosition);
    }
  }, []);
  
  return { mousePosition, normalizedPosition };
};

// Floating tech icons
const TechIcons = () => {
  const [icons, setIcons] = useState<Array<{x: number, y: number, icon: string, delay: number}>>([]);
  
  useEffect(() => {
    const techIcons = ['⚡', '🚀', '💡', '🔬', '🎯', '⭐', '🌟', '💎'];
    const newIcons = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: techIcons[i % techIcons.length],
      delay: i * 0.8
    }));
    setIcons(newIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((iconData, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-10"
          style={{
            left: `${iconData.x}%`,
            top: `${iconData.y}%`,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: iconData.delay
          }}
        >
          {iconData.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default function About() {
  const { mousePosition, normalizedPosition } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
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

  // Company values with enhanced data
  const values: CompanyValue[] = [
    {
      id: 'excellence',
      title: 'Excellence',
      description: 'We relentlessly pursue perfection in everything we do, from breakthrough engineering to meticulous client service, establishing benchmarks that elevate entire industries.',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'We challenge conventional thinking and embrace calculated risks to develop breakthrough solutions that create unprecedented value and open new frontiers for our clients.',
      icon: '💡',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'integrity',
      title: 'Integrity',
      description: 'We operate with unwavering ethical standards, ensuring every business decision reflects our commitment to honesty, accountability, and long-term trusted partnerships.',
      icon: '🛡️',
      color: 'from-green-500 to-emerald-500'
    }
  ];
  
  // Enhanced stats data
  const stats: CompanyStat[] = [
    { 
      value: "5+", 
      label: "AI Solutions", 
      description: "Cutting-edge AI implementations",
      icon: "🚀"
    },
    { 
      value: "3+", 
      label: "Industries Served", 
      description: "Diverse sector expertise",
      icon: "🌐"
    },
    { 
      value: "100%", 
      label: "Client Satisfaction", 
      description: "Perfect track record",
      icon: "⭐"
    },
    { 
      value: "24/7", 
      label: "Support", 
      description: "Round-the-clock assistance",
      icon: "💬"
    }
  ];

  const team: TeamMember[] = [
    {
      name: "Alex Chen",
      role: "CEO & AI Visionary",
      bio: "Leading AI innovation with 10+ years of experience in machine learning and business transformation.",
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Johnson",
      role: "CTO & Tech Lead",
      bio: "Expert in full-stack development and AI infrastructure with a passion for scalable solutions.",
      avatar: "👩‍💻"
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Product",
      bio: "Product strategist with expertise in user experience and AI-driven product development.",
      avatar: "👨‍🔬"
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="about" 
      className="relative py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <TechIcons />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '-15%', top: '20%' }}
        />
        
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-teal-500/6 to-cyan-500/6 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
          style={{ right: '-10%', bottom: '15%' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <motion.div 
          className="relative mb-20 text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Dynamic mouse-following orbs */}
          <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * 0.02 : 0,
                y: isClient ? mousePosition.y * 0.015 : 0,
                left: '20%',
                top: '5%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute w-60 h-60 bg-gradient-to-r from-teal-500/12 to-cyan-500/12 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * -0.025 : 0,
                y: isClient ? mousePosition.y * 0.02 : 0,
                right: '25%',
                bottom: '0%'
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          <motion.div className="relative z-10" variants={itemVariants}>
            <motion.h2 
              className="text-6xl md:text-8xl font-black mb-8 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
                About{' '}
              </span>
              <motion.span 
                className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Pydart
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-8"
              variants={itemVariants}
            >
              Transforming business through AI innovation, crafting intelligent solutions that bridge present limitations and future possibilities
            </motion.p>
            
            {/* Interactive floating elements */}
            {isClient && (
              <>
                <motion.div 
                  className="absolute w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{
                    left: `${15 + normalizedPosition.x * 12}%`,
                    top: `${8 + normalizedPosition.y * 6}%`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
                  style={{
                    right: `${18 + normalizedPosition.x * 10}%`,
                    bottom: `${5 + normalizedPosition.y * 8}%`
                  }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Main About Content */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Left column - About content */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div>
              <div className="inline-flex items-center mb-4">
                <span className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 mr-4 rounded-full"></span>
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Our Story</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6">
                Transforming Business <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Through AI</span> Innovation
              </h3>
            </div>
            
            <p className="text-lg text-neutral-700 leading-relaxed">
              Pydart AI Corp is at the forefront of AI-driven business transformation, crafting intelligent solutions that enhance efficiency, drive growth, and create sustainable competitive advantages for our clients across industries.
            </p>
            
            <motion.div 
              className="border-l-4 border-indigo-500 pl-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-r-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xl md:text-2xl font-medium text-neutral-800 italic">
                "Our mission is to drive transformative growth by delivering innovative AI solutions that bridge present limitations and future possibilities."
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/about" className="group inline-block">
                <div className="inline-flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300">
                  <span className="font-bold">Learn More About Our Approach</span>
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right column - Enhanced Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-neutral-200/50 transition-all duration-500 relative overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      animate={{ 
                        rotate: hoveredCard === index ? [0, 5, -5, 0] : 0
                      }}
                    >
                      <span className="text-2xl">
                        {stat.icon}
                      </span>
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text mb-2">{stat.value}</h3>
                    <p className="text-neutral-800 font-semibold mb-1">{stat.label}</p>
                    <p className="text-neutral-600 text-sm">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="mb-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-8 bg-gradient-to-r from-green-500 to-teal-500 mr-4 rounded-full"></span>
              <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Our Values</span>
              <span className="h-1 w-8 bg-gradient-to-r from-green-500 to-teal-500 ml-4 rounded-full"></span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Principles That <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Drive Us</span> Forward
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                className="group relative"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-neutral-200/50 transition-all duration-500 h-full">
                  {/* Color accent bar */}
                  <div className={`h-2 bg-gradient-to-r ${value.color}`}></div>
                  <div className="p-8">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-3xl">
                        {value.icon}
                      </span>
                    </motion.div>
                    
                    <h4 className={`text-2xl font-bold mb-4 text-transparent bg-gradient-to-r ${value.color} bg-clip-text`}>
                      {value.title}
                    </h4>
                    
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="mb-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-8 bg-gradient-to-r from-orange-500 to-amber-500 mr-4 rounded-full"></span>
              <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">Our Team</span>
              <span className="h-1 w-8 bg-gradient-to-r from-orange-500 to-amber-500 ml-4 rounded-full"></span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Meet The <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Visionaries</span>
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-neutral-200/50 transition-all duration-500 text-center">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, 10, -10, 0] }}
                  >
                    <span className="text-4xl">{member.avatar}</span>
                  </motion.div>
                  
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{member.name}</h4>
                  <p className="text-orange-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-neutral-600 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-50" />
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                Ready to{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  transform
                </span>
                {' '}your business?
              </motion.h3>
              
              <motion.p 
                className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Let's discuss how our AI solutions can revolutionize your operations and drive unprecedented growth.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#about" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-indigo-400 text-white hover:text-indigo-400 font-bold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
