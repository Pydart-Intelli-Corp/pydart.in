'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

interface StibeInvestorDetailsProps {
  onBack?: () => void;
}

export default function StibeInvestorDetails({ onBack }: StibeInvestorDetailsProps) {
  const { mousePosition, isMobile } = useMouseTracking();
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

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
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
    }
  };

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
      className="relative min-h-screen overflow-hidden"
    >
      {/* Hero section with parallax effect */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background Image */}
          <Image 
            src="/assets/images/others/whoweare.png" 
            alt="AI Technology Background" 
            fill 
            className="object-cover object-center scale-105 opacity-20"
            priority
            style={{
              transformOrigin: 'center',
              transform: 'scale(1.1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-950"></div>
          
          {/* Modern geometric patterns */}
          <div className="absolute inset-0 bg-[url('/assets/images/patterns/grid.svg')] opacity-10"></div>
          
          {/* Floating AI Elements - Hidden on mobile */}
          <motion.div
            className="absolute top-20 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-[#00b4ab] to-teal-400 opacity-20 blur-xl hidden sm:block"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-lg hidden sm:block"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 bg-[#00b4ab] mr-3 sm:mr-4"></div>
              <span className="text-[#00b4ab] font-medium tracking-widest text-xs sm:text-sm uppercase">Investment Opportunity</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 lg:mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="block">Revolutionizing</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00b4ab] to-[#008a82]">Personal Care</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 sm:mb-8 lg:mb-10 max-w-2xl">
              Join us in building the future of AI-powered personal care services. Targeting a $12B global market with proven validation and clear path to profitability.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center"
              >
                <div className="h-10 sm:h-12 lg:h-14 w-1 bg-[#00b4ab] mr-3 sm:mr-4"></div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">Market Size</p>
                  <p className="text-white font-bold text-sm sm:text-base">$12B Global</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center"
              >
                <div className="h-10 sm:h-12 lg:h-14 w-1 bg-[#00b4ab] mr-3 sm:mr-4"></div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">Target MRR</p>
                  <p className="text-white font-bold text-sm sm:text-base">₹50L by Q4 2027</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative bg-gray-950 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Key Metrics Section */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            ref={sectionRef}
          >
            {[
              { 
                value: "$12B", 
                label: "Market Size", 
                description: "Global grooming & personal care market", 
                icon: "🌍",
                chart: "📊",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                value: "78%", 
                label: "AI Preference", 
                description: "Consumers prefer AI-tailored services", 
                icon: "🤖",
                chart: "📈",
                color: "from-purple-500 to-pink-500"
              },
              { 
                value: "₹50L", 
                label: "Target MRR", 
                description: "Monthly recurring revenue by Q4 2027", 
                icon: "💰",
                chart: "📉",
                color: "from-green-500 to-emerald-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-[#00b4ab]/50 transition-all duration-300 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-2xl`}></div>
                  </div>
                  
                  {/* Icon with Animation */}
                  <motion.div 
                    className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 relative z-10"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  {/* Chart Icon */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-lg sm:text-xl lg:text-2xl opacity-30">
                    {stat.chart}
                  </div>
                  
                    {/* Animated Progress Ring */}
                  <motion.div
                    className="absolute top-4 sm:top-6 left-4 sm:left-6 w-6 sm:w-8 h-6 sm:h-8"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: index * 1
                    }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.2"
                        className="text-[#00b4ab]"
                      />
                      <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-[#00b4ab]"
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ strokeDasharray: "75 100" }}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
                    </svg>
                  </motion.div>
                  
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00b4ab] mb-1 sm:mb-2 relative z-10">{stat.value}</div>
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 relative z-10">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-white/60 relative z-10">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Investment Timeline Section */}
          <motion.div 
            className="mb-16 sm:mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            ref={sectionRef}
          >
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Investment Roadmap</h3>
              <p className="text-white/70 text-sm sm:text-base lg:text-lg">Strategic milestones and growth trajectory</p>
            </div>
            
            <div className="relative">
              {/* Timeline Line - Simplified for mobile */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#00b4ab]/30 to-transparent hidden md:block"></div>
              
              {[
                {
                  phase: "Phase 1",
                  title: "MVP Launch",
                  amount: "₹15L",
                  timeline: "Q2 2024",
                  icon: "🚀",
                  color: "from-blue-500 to-purple-500",
                  tasks: ["AI Development", "Beta Launch", "User Base"]
                },
                {
                  phase: "Phase 2", 
                  title: "Scale & Growth",
                  amount: "₹35L",
                  timeline: "Q4 2024",
                  icon: "📈",
                  color: "from-purple-500 to-pink-500",
                  tasks: ["Market Expansion", "Feature Enhancement", "Team Growth"]
                },
                {
                  phase: "Phase 3",
                  title: "Series A Ready",
                  amount: "₹75L",
                  timeline: "Q2 2025",
                  icon: "🎯",
                  color: "from-green-500 to-blue-500",
                  tasks: ["Revenue Growth", "Partnerships", "Exit Strategy"]
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className="mb-6 sm:mb-8 md:mb-12"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Mobile-First Layout */}
                  <div className="flex flex-col md:flex-row md:items-center">
                    {/* Timeline Icon - Top on mobile */}
                    <div className={`flex justify-center md:justify-start mb-3 md:mb-0 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} ${index % 2 === 0 ? 'md:ml-6' : 'md:mr-6'}`}>
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#00b4ab] to-[#008b84] rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl border-2 border-gray-900 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {milestone.icon}
                      </motion.div>
                    </div>
                    
                    {/* Content Card - Minimal design */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'}`}>
                      <motion.div 
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-white/10 hover:border-[#00b4ab]/30 transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ y: -2 }}
                      >
                        {/* Subtle background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-3 rounded-xl`}></div>
                        
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
                            <div className="text-[#00b4ab] font-medium text-xs sm:text-sm">{milestone.phase}</div>
                            <div className="text-white/50 text-xs sm:text-sm">{milestone.timeline}</div>
                          </div>
                          
                          {/* Title and Amount */}
                          <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{milestone.title}</h4>
                          <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#00b4ab] mb-2 sm:mb-3">{milestone.amount}</div>
                          
                          {/* Minimal Task List */}
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {milestone.tasks.map((task, taskIndex) => (
                              <motion.span
                                key={taskIndex}
                                className="inline-flex items-center px-2 py-1 bg-white/5 rounded-md text-xs text-white/70 border border-white/10"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * taskIndex }}
                              >
                                {task}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Empty Space */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div 
            className="space-y-16"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            
            {/* 1. Market Opportunity */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#00b4ab]/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                Market Opportunity
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#00b4ab] mb-2 sm:mb-3">Global Market</h3>
                  <div className="space-y-1 sm:space-y-2 text-white/80">
                    <div className="flex items-center text-xs sm:text-sm">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#00b4ab] mr-2 flex-shrink-0"></div>
                      <span><strong className="text-white">$12B</strong> market, <strong className="text-white">6% CAGR</strong></span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#00b4ab] mr-2 flex-shrink-0"></div>
                      <span>On‑demand: <strong className="text-white">$3.5B</strong>, <strong className="text-white">9% CAGR</strong></span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#00b4ab] mb-2 sm:mb-3">AI Adoption</h3>
                  <div className="space-y-1 sm:space-y-2 text-white/80">
                    <div className="flex items-center text-xs sm:text-sm">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#00b4ab] mr-2 flex-shrink-0"></div>
                      <span><strong className="text-white">78%</strong> prefer AI services</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#00b4ab] mr-2 flex-shrink-0"></div>
                      <span><strong className="text-white">20-30%</strong> higher satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. MVP & Pre-Launch Validation */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white/10 hover:border-[#00b4ab]/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white font-bold text-xs sm:text-sm">2</span>
                </div>
                MVP Development
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#00b4ab] mb-2 sm:mb-3">Progress</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <motion.div 
                      className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-medium text-white text-xs sm:text-sm">Booking Engine</span>
                        <span className="text-xs font-semibold text-[#00b4ab]">80%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1 sm:h-1.5">
                        <motion.div 
                          className="bg-gradient-to-r from-[#00b4ab] to-teal-400 h-1 sm:h-1.5 rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: '80%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-white">Suggestion Engine</span>
                        <span className="text-sm font-semibold text-[#00b4ab]">60%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-[#00b4ab] to-teal-400 h-2 rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ duration: 1, delay: 0.7 }}
                        ></motion.div>
                      </div>
                      <p className="text-sm text-white/60 mt-2">Personalized style recommendations</p>
                    </motion.div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#00b4ab] mb-4">Partnerships & Pipeline</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-white">50+ salons</strong> and independent stylists signed up across 3 metros</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-white">10 certified pet groomers</strong> and 5 senior‑care stylists committed for launch</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#00b4ab] mb-4">Early Interest</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-white">2,000+ users</strong> on our waitlist</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-white">500 survey respondents</strong> validating feature set and pricing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 3. Projections & Unit Economics */}
            <motion.div 
              className="bg-neutral-200/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-300/50"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-xs sm:text-sm">3</span>
                </div>
                Projections & Unit Economics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3 sm:mb-4">Bookings Forecast</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-neutral-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>5,000 bookings</strong> in first quarter post‑launch</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>20,000 bookings</strong> by end of Year 1 across 5 metros</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3 sm:mb-4">Revenue Estimates</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-neutral-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span>MRR <strong>₹5 Lakh</strong> by Q1 2026</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span>MRR <strong>₹50 Lakh</strong> by Q4 2027</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3 sm:mb-4">Economics</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-neutral-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span>CAC: <strong>₹250</strong> via digital ads & referrals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span>LTV: <strong>₹3,000</strong> based on projected 4× repeat bookings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#00b4ab] mt-2 mr-3 flex-shrink-0"></div>
                      <span>Gross Margin: <strong>~70%</strong> on commissions and add‑on sales</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 3. Financial Dashboard */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#00b4ab]/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                Financial Projections & Revenue Model
              </h2>
              
              {/* Interactive Revenue Chart */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#00b4ab] rounded-full mr-2 sm:mr-3"></div>
                  Revenue Growth Trajectory
                </h3>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                    <h4 className="text-base sm:text-lg font-semibold text-white">Monthly Revenue Projections</h4>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex items-center">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-[#00b4ab] rounded-full mr-1 sm:mr-2"></div>
                        <span className="text-xs sm:text-sm text-white/70">Projected</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-blue-500 rounded-full mr-1 sm:mr-2"></div>
                        <span className="text-xs sm:text-sm text-white/70">Conservative</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Visualization */}
                  <div className="relative h-32 sm:h-40 lg:h-48 bg-black/20 rounded-lg p-3 sm:p-4 overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="absolute left-0 right-0 border-t border-white/20" style={{ top: `${i * 25}%` }}></div>
                      ))}
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="absolute top-0 bottom-0 border-l border-white/20" style={{ left: `${i * 16.66}%` }}></div>
                      ))}
                    </div>
                    
                    {/* Revenue Bars */}
                    <div className="flex items-end justify-between h-full relative z-10">
                      {[
                        { month: "Q1", value: 15, projected: 25 },
                        { month: "Q2", value: 28, projected: 45 },
                        { month: "Q3", value: 45, projected: 70 },
                        { month: "Q4", value: 65, projected: 90 },
                        { month: "Q1+1", value: 85, projected: 110 },
                        { month: "Q2+1", value: 120, projected: 150 }
                      ].map((data, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center space-y-1 sm:space-y-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                          {/* Projected Bar */}
                          <motion.div
                            className="w-4 sm:w-6 lg:w-8 bg-gradient-to-t from-[#00b4ab] to-[#00d4cc] rounded-t relative group cursor-pointer"
                            style={{ height: `${(data.projected / 150) * 100}%` }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-1 sm:px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ₹{data.projected}L
                            </div>
                          </motion.div>
                          
                          {/* Conservative Bar */}
                          <motion.div
                            className="w-3 sm:w-4 lg:w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t relative group cursor-pointer"
                            style={{ height: `${(data.value / 150) * 80}%` }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-1 sm:px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ₹{data.value}L
                            </div>
                          </motion.div>
                          
                          <span className="text-xs text-white/60 font-medium">{data.month}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Animated Background Elements - Hidden on small screens */}
                    <div className="absolute inset-0 pointer-events-none hidden sm:block">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#00b4ab] rounded-full opacity-20"
                          animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.8
                          }}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${60 + i * 10}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Metrics Below Chart */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { label: "Current MRR", value: "₹8L", growth: "+23%", icon: "📊" },
                      { label: "Target MRR", value: "₹50L", growth: "Q4 2027", icon: "🎯" },
                      { label: "Break-even", value: "Month 18", growth: "Projected", icon: "⚡" }
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#00b4ab]/50 transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute top-2 right-2 text-lg opacity-30">{metric.icon}</div>
                        <div className="text-sm text-white/60 mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-[#00b4ab]">{metric.growth}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Economics & Business Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#00b4ab] mb-4 flex items-center">
                    💰 Revenue Streams
                  </h3>
                  <div className="space-y-4">
                    {[
                      { model: "Commission", rate: "15-20%", desc: "Per booking (tiered by provider rating)" },
                      { model: "Subscriptions", rate: "₹1,999/mo", desc: "Standard: Enhanced listings & analytics" },
                      { model: "Premium", rate: "₹4,999/mo", desc: "Priority leads & targeted promotions" },
                      { model: "Add-ons", rate: "5-10%", desc: "Product sales & premium services" }
                    ].map((stream, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#00b4ab]/30 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-white">{stream.model}</div>
                            <div className="text-sm text-white/60">{stream.desc}</div>
                          </div>
                          <div className="text-[#00b4ab] font-bold">{stream.rate}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#00b4ab] mb-4 flex items-center">
                    📈 Unit Economics
                  </h3>
                  <div className="space-y-4">
                    {[
                      { metric: "CAC", value: "₹250", desc: "Customer Acquisition Cost", color: "from-red-500 to-orange-500" },
                      { metric: "LTV", value: "₹3,000", desc: "Lifetime Value (4x repeat)", color: "from-green-500 to-emerald-500" },
                      { metric: "LTV:CAC", value: "12:1", desc: "Healthy ratio for growth", color: "from-blue-500 to-purple-500" },
                      { metric: "Gross Margin", value: "~70%", desc: "On commissions & add-ons", color: "from-purple-500 to-pink-500" }
                    ].map((econ, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#00b4ab]/30 transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${econ.color} opacity-5 rounded-lg`}></div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">{econ.metric}</span>
                            <span className="text-[#00b4ab] font-bold text-lg">{econ.value}</span>
                          </div>
                          <div className="text-sm text-white/60">{econ.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4. Business Model */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#00b4ab]/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                Business Model
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Commission</h3>
                  <p className="text-sm sm:text-base text-white/80"><strong className="text-white">15–20%</strong> per booking (tiered by provider rating)</p>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Subscriptions</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-white/80">
                    <li><strong className="text-white">Standard:</strong> ₹1,999/mo for enhanced listings & analytics</li>
                    <li><strong className="text-white">Premium:</strong> ₹4,999/mo for priority leads & targeted promotions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Add‑On Revenue</h3>
                  <p className="text-sm sm:text-base text-white/80">AI‑recommended product bundles (<strong className="text-white">30% margin</strong>)</p>
                </div>
              </div>
            </motion.div>

            {/* 5. Use of Funds */}
            <motion.div 
              className="bg-neutral-200/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-300/50"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-xs sm:text-sm">5</span>
                </div>
                Use of Funds
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">30%</div>
                  <h4 className="font-semibold text-neutral-800 mb-2 text-sm sm:text-base">AI Engine</h4>
                  <p className="text-xs sm:text-sm text-neutral-600">Finalize AI suggestion engine & integrate feedback</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">30%</div>
                  <h4 className="font-semibold text-neutral-800 mb-2 text-sm sm:text-base">Product</h4>
                  <p className="text-xs sm:text-sm text-neutral-600">Mobile app polish, multi‑language support, loyalty</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">25%</div>
                  <h4 className="font-semibold text-neutral-800 mb-2 text-sm sm:text-base">Marketing</h4>
                  <p className="text-xs sm:text-sm text-neutral-600">Launch marketing in 5 metros & strategic partnerships</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 sm:p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">15%</div>
                  <h4 className="font-semibold text-neutral-800 mb-2 text-sm sm:text-base">Team</h4>
                  <p className="text-xs sm:text-sm text-neutral-600">Hire AI/ML engineers, product managers & sales reps</p>
                </motion.div>
              </div>
            </motion.div>

            {/* 6. Roadmap & Milestones */}
            <motion.div 
              className="bg-neutral-200/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-300/50"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-xs sm:text-sm">6</span>
                </div>
                Roadmap & Milestones
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <motion.div 
                  className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3 sm:p-4 border-l-4 border-red-500"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-800 text-sm sm:text-base">Jan 26, 2026</h4>
                    <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Launch</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm sm:text-base">Public MVP Launch – live in 2 metros; 5,000 bookings</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-800 text-sm sm:text-base">Q2 2026</h4>
                    <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Expansion</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm sm:text-base">Spa & wellness vertical live; 10,000 cumulative bookings</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 sm:p-4 border-l-4 border-green-500"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-800 text-sm sm:text-base">Q4 2026</h4>
                    <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Scale</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm sm:text-base">Expand to 5 more metros; hit ₹5L MRR</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4 border-l-4 border-purple-500"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-800 text-sm sm:text-base">Q4 2026</h4>
                    <span className="bg-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Growth</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm sm:text-base">Launch loyalty & referral programs; reach 100K users</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3 sm:p-4 border-l-4 border-orange-500"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-800 text-sm sm:text-base">Q2 2027</h4>
                    <span className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Vertical</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm sm:text-base">Pet‑only vertical rollout; partner with 100+ groomers</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Call to Action - Enhanced Download Button */}
            <motion.div 
              className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0"
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            >
              {/* Hero Text */}
              <motion.div
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Ready to Transform Personal Care?
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mx-auto">
                  Download our comprehensive pitch deck and discover how AI is revolutionizing the beauty industry
                </p>
              </motion.div>

              {/* Enhanced Download Button */}
              <motion.div
                className="relative inline-block"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glowing Background Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00b4ab] via-[#00d4cc] to-[#00b4ab] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                <motion.a 
                  href="https://lactosure.azurewebsites.net/api/Email/DownloadStibePdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-[#00b4ab] to-[#008a82] text-white font-bold text-base sm:text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-[#00b4ab]/50 transition-all duration-300 transform hover:-translate-y-1 border border-[#00d4cc]/30"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 180, 171, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00b4ab] via-[#00d4cc] to-[#00b4ab] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                  
                  {/* Button Content */}
                  <div className="relative z-10 flex items-center">
                    {/* Download Icon with Animation */}
                    <motion.div
                      className="mr-3 sm:mr-4 p-1.5 sm:p-2 bg-white/20 rounded-full"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <svg className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </motion.div>
                    
                    <div className="text-left">
                      <div className="font-bold text-base sm:text-lg lg:text-xl">Download Pitch Deck</div>
                      <div className="text-xs sm:text-sm text-white/80 font-normal">Complete investor presentation</div>
                    </div>
                    
                    {/* Arrow with Animation */}
                    <motion.svg 
                      className="ml-3 sm:ml-4 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-white/60"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-[#00b4ab]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant Download
                </div>
                <div className="flex items-center">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-[#00b4ab]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Complete Market Analysis
                </div>
                <div className="flex items-center">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-[#00b4ab]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Financial Projections
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
