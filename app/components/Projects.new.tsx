'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';

// Types
interface Project {
  title: string;
  description: string;
  category: 'app' | 'platform' | 'research';
  status: string;
  progress: number;
  timeline: string;
  highlights: string[];
}

interface StibeFeature {
  icon: string;
  title: string;
  description: string;
}

interface StibeProblem {
  title: string;
  description: string;
  impact: string;
}

interface DevMilestone {
  date: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Planning';
}

// Enhanced mouse tracking with bounds
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

// Particle system for enhanced visuals
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, opacity: number}>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      x: (i + 1) * 12.5,
      y: 20 + (i % 3) * 15,
      size: 1 + (i % 3),
      opacity: 0.1 + (i % 4) * 0.1
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  );
};

export default function Projects() {
  const { mousePosition, normalizedPosition } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Data
  const stibeProblems: StibeProblem[] = [
    {
      title: "Long Waits & Unpredictable Schedules",
      description: "Customers face lengthy waiting times and uncertain appointment availability in traditional grooming services",
      impact: "45% customer dissatisfaction"
    },
    {
      title: "No Central Platform",
      description: "Fragmented services across salons, freelancers, and pet grooming with no unified discovery system",
      impact: "60% service visibility loss"
    },
    {
      title: "Trust & Pricing Issues",
      description: "Lack of transparency in pricing and concerns about service quality without proper rating systems",
      impact: "30% booking hesitation"
    },
    {
      title: "Discovery Challenges",
      description: "Talented freelancers struggle to be found by potential clients due to limited marketing reach",
      impact: "70% talent underutilization"
    }
  ];

  const stibeFeatures: StibeFeature[] = [
    {
      icon: "📱",
      title: "Instant Booking System",
      description: "Book appointments instantly with real-time availability and automated confirmations"
    },
    {
      icon: "🎯",
      title: "Smart Matching Algorithm",
      description: "AI-powered matching between customers and service providers based on preferences and location"
    },
    {
      icon: "⭐",
      title: "Trust & Rating System",
      description: "Comprehensive review system with verified ratings and transparent pricing structures"
    },
    {
      icon: "📍",
      title: "Location-Based Discovery",
      description: "Find the best grooming services near you with detailed profiles and portfolios"
    },
    {
      icon: "💳",
      title: "Secure Payment Gateway",
      description: "Safe and seamless payment processing with multiple payment options and wallet integration"
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Real-time updates on booking status, appointment reminders, and special offers"
    }
  ];

  const devMilestones: DevMilestone[] = [
    { date: "Jan 2024", title: "Project Conception & Market Research", status: "Completed" },
    { date: "Feb 2024", title: "Technical Architecture & UI/UX Design", status: "Completed" },
    { date: "Mar 2024", title: "Core App Development - User Module", status: "Completed" },
    { date: "Apr 2024", title: "Service Provider Portal Development", status: "Completed" },
    { date: "May 2024", title: "Payment Integration & Security Implementation", status: "In Progress" },
    { date: "Jun 2024", title: "Beta Testing & User Feedback Integration", status: "Upcoming" },
    { date: "Jul 2024", title: "Final Testing & Bug Fixes", status: "Upcoming" },
    { date: "Aug 2024", title: "App Store Launch & Marketing Campaign", status: "Planning" }
  ];

  const projects: Project[] = [
    {
      title: "Stibe Mobile App",
      description: "Revolutionary grooming platform connecting customers with service providers through an intuitive mobile experience",
      category: "app",
      status: "In Development",
      progress: 75,
      timeline: "Jan 2024 - Aug 2024",
      highlights: [
        "Real-time booking system with instant confirmations",
        "AI-powered service provider matching algorithm",
        "Integrated payment gateway with multiple options",
        "Comprehensive rating and review system",
        "Geolocation-based service discovery"
      ]
    },
    {
      title: "Service Provider Platform",
      description: "Comprehensive dashboard for grooming professionals to manage bookings, clients, and business analytics",
      category: "platform",
      status: "In Development", 
      progress: 65,
      timeline: "Feb 2024 - Jul 2024",
      highlights: [
        "Professional portfolio showcase capabilities",
        "Advanced booking and calendar management",
        "Real-time earnings and analytics dashboard",
        "Customer communication tools",
        "Business growth insights and recommendations"
      ]
    },
    {
      title: "AI Recommendation Engine",
      description: "Machine learning system that optimizes service matching and enhances user experience through intelligent suggestions",
      category: "research",
      status: "Research Phase",
      progress: 40,
      timeline: "Mar 2024 - Sep 2024",
      highlights: [
        "Behavioral pattern analysis for better matching",
        "Predictive analytics for demand forecasting",
        "Personalized service recommendations",
        "Dynamic pricing optimization algorithms",
        "Quality assurance through ML-driven insights"
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'app': return '📱';
      case 'platform': return '💻';
      case 'research': return '🧠';
      default: return '⚡';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'app': return 'from-blue-500 to-blue-600';
      case 'platform': return 'from-green-500 to-green-600';
      case 'research': return 'from-purple-500 to-purple-600';
      default: return 'from-orange-500 to-orange-600';
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="projects"
      className="relative py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '-20%', top: '10%' }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          style={{ right: '-15%', bottom: '15%' }}
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
          <ParticleField />
          
          {/* Dynamic gradient orbs */}
          <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * 0.03 : 0,
                y: isClient ? mousePosition.y * 0.02 : 0,
                left: '10%',
                top: '20%'
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * -0.02 : 0,
                y: isClient ? mousePosition.y * 0.015 : 0,
                right: '15%',
                bottom: '10%'
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Main heading with advanced animations */}
          <motion.div className="relative z-10" variants={itemVariants}>
            <motion.h2 
              className="text-6xl md:text-8xl font-black mb-8 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
                Current{' '}
              </span>
              <motion.span 
                className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Projects
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur-xl"
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
              Building the future of AI-powered solutions and revolutionary platforms that transform industries
            </motion.p>
            
            {/* Interactive floating elements */}
            {isClient && (
              <>
                <motion.div 
                  className="absolute w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  style={{
                    left: `${20 + normalizedPosition.x * 10}%`,
                    top: `${10 + normalizedPosition.y * 5}%`
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
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  style={{
                    right: `${15 + normalizedPosition.x * 8}%`,
                    bottom: `${5 + normalizedPosition.y * 8}%`
                  }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Problems Section */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Problems We're{' '}
            </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Solving
            </span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stibeProblems.map((problem, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 h-full border border-neutral-200/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    ⚠️
                  </div>
                  <h4 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {problem.title}
                  </h4>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {problem.description}
                  </p>
                  <div className="text-sm font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
                    {problem.impact}
                  </div>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Our{' '}
            </span>
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stibeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 h-full border border-neutral-200/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Timeline */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Development{' '}
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Timeline
            </span>
          </motion.h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full" style={{ height: '100%' }} />
            
            <div className="space-y-12">
              {devMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200/50">
                      <p className="text-sm font-semibold text-orange-600 mb-2">{milestone.date}</p>
                      <p className="text-lg font-bold text-neutral-800 mb-3">{milestone.title}</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        milestone.status === 'Upcoming' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <motion.div 
                      className="w-6 h-6 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full border-4 border-white shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Featured{' '}
            </span>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-200/50 h-full">
                  {/* Project header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)}`}>
                        <span className="mr-2">{getCategoryIcon(project.category)}</span>
                        {project.category.toUpperCase()}
                      </div>
                      <motion.div
                        className="text-2xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⚡
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {project.title}
                    </h4>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Status and timeline */}
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-700">Status:</span>
                        <span className="text-sm text-orange-600 font-semibold">{project.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-700">Timeline:</span>
                        <span className="text-sm text-neutral-600">{project.timeline}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-700">Progress</span>
                        <span className="text-sm font-bold text-orange-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-3">
                        <motion.div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(project.category)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h5 className="text-sm font-bold text-neutral-800 mb-4">Key Highlights:</h5>
                      <ul className="space-y-3">
                        {project.highlights.map((highlight, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-start text-sm text-neutral-600"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (idx * 0.1) }}
                          >
                            <motion.svg 
                              className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              whileHover={{ scale: 1.2 }}
                            >
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </motion.svg>
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-50" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-amber-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                Join us as we reshape the future of{' '}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  grooming
                </span>
                {' '}– for everyone.
              </motion.h3>
              
              <motion.p 
                className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Be part of the grooming revolution. Whether you're a user, service provider, or investor, 
                there's a place for you in the Stibe ecosystem.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try the App
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-orange-400 text-white hover:text-orange-400 font-bold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Partner with Us
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-green-400 text-white hover:text-green-400 font-bold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Invest in Stibe
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
