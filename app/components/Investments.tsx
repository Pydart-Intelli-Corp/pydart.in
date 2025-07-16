'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';

interface InvestmentHighlight {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface MarketStat {
  value: string;
  label: string;
  growth: string;
}

interface InvestmentPerk {
  title: string;
  description: string;
  icon: string;
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

// Money particles animation
const MoneyParticles = () => {
  const [particles, setParticles] = useState<Array<{x: number, y: number, icon: string, delay: number}>>([]);
  
  useEffect(() => {
    const moneyIcons = ['💰', '💎', '🚀', '📈', '⭐', '💵'];
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: moneyIcons[i % moneyIcons.length],
      delay: i * 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        >
          {particle.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default function Investments() {
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
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
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
    hidden: { y: 80, opacity: 0 },
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

  const investmentHighlights: InvestmentHighlight[] = [
    {
      icon: "🏁",
      title: "Currently Bootstrapped",
      description: "Built with passion and vision. We've come this far without external funding — driven by commitment and belief in Stibe's potential.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: "🚀",
      title: "Open to Strategic Investors",
      description: "Looking for the right partners to join us — not just for funding, but for vision alignment, mentorship, and scaling expertise.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🧲",
      title: "Seeking Visionary Partners",
      description: "We want investors who believe in disruptive ideas, long-term growth, and backing passionate founders with hands-on execution.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const marketStats: MarketStat[] = [
    { value: "$26B+", label: "Indian Grooming Market", growth: "+12% CAGR" },
    { value: "$911B+", label: "Global Market Size", growth: "+8% CAGR" },
    { value: "1st", label: "Inclusive Platform of its Kind", growth: "First Mover" }
  ];

  const investmentPerks: InvestmentPerk[] = [
    {
      title: "Early Entry Advantage",
      description: "Join us in the pre-Series A stage with significant equity potential",
      icon: "⚡"
    },
    {
      title: "Proven Team",
      description: "Led by experienced developers with successful project track records",
      icon: "👥"
    },
    {
      title: "Scalable Technology",
      description: "Built on modern tech stack designed for rapid scaling and expansion",
      icon: "⚙️"
    },
    {
      title: "Market Validation",
      description: "Comprehensive market research with validated user demand and feedback",
      icon: "📊"
    }
  ];

  const whyInvestPoints = [
    "Massive Market: $26B+ grooming industry in India, $911B+ globally",
    "Untapped Opportunity: First-of-its-kind grooming platform to include freelancers, salons, and pet groomers",
    "High Scalability: Tech-enabled, UPI-integrated, and built for city-by-city expansion",
    "Strong Early Foundation: MVP launch planned, market study completed, product development in progress",
    "Hyper-Inclusive Model: Men, women, kids, pets — we serve all with verified, on-demand services",
    "Revenue Model in Place: Commission-based, ad space, and future subscriptions"
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="investments" 
      className="relative py-32 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 text-white overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MoneyParticles />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute w-[900px] h-[900px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '-20%', top: '15%' }}
        />
        
        <motion.div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-r from-green-500/8 to-emerald-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
          style={{ right: '-15%', bottom: '10%' }}
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
              className="absolute w-96 h-96 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * 0.025 : 0,
                y: isClient ? mousePosition.y * 0.02 : 0,
                left: '15%',
                top: '5%'
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute w-72 h-72 bg-gradient-to-r from-green-500/12 to-emerald-500/12 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * -0.02 : 0,
                y: isClient ? mousePosition.y * 0.025 : 0,
                right: '20%',
                bottom: '0%'
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 0, 360]
              }}
              transition={{
                duration: 25,
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
              <motion.span 
                className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Investment
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-xl blur-xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
              <span className="bg-gradient-to-r from-neutral-300 to-neutral-100 bg-clip-text text-transparent">
                {' '}Opportunity
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-8"
              variants={itemVariants}
            >
              Transform the grooming industry with us. Join our journey to build India's most inclusive grooming platform.
            </motion.p>
            
            {/* Floating money icons */}
            {isClient && (
              <>
                <motion.div 
                  className="absolute text-3xl"
                  style={{
                    left: `${10 + normalizedPosition.x * 15}%`,
                    top: `${5 + normalizedPosition.y * 8}%`
                  }}
                  animate={{
                    rotate: [0, 360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💰
                </motion.div>
                <motion.div 
                  className="absolute text-2xl"
                  style={{
                    right: `${15 + normalizedPosition.x * 12}%`,
                    bottom: `${5 + normalizedPosition.y * 10}%`
                  }}
                  animate={{
                    rotate: [360, 0, 360],
                    scale: [1.2, 1, 1.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  📈
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Market Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {marketStats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-neutral-700/50 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-neutral-300 font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-green-400 font-medium">{stat.growth}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Investment Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {investmentHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-neutral-800/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 hover:border-yellow-500/50 transition-all duration-500 h-full relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-6"
                    animate={{ 
                      scale: hoveredCard === index ? 1.2 : 1,
                      rotate: hoveredCard === index ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {highlight.icon}
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-4 text-transparent bg-gradient-to-r ${highlight.color} bg-clip-text`}>
                    {highlight.title}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Investment Perks */}
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
            <span className="text-neutral-300">Investment</span>{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Perks</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPerks.map((perk, index) => (
              <motion.div
                key={index}
                className="bg-neutral-800/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/30 hover:border-green-500/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-3xl mb-4">{perk.icon}</div>
                <h4 className="text-lg font-semibold text-green-400 mb-3">{perk.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Invest Section */}
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
            <span className="text-neutral-300">Why Invest in</span>{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Stibe?</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyInvestPoints.map((point, index) => (
              <motion.div 
                key={index} 
                className="flex items-start space-x-4 p-6 bg-neutral-800/20 backdrop-blur-sm rounded-xl border border-neutral-700/30 hover:border-orange-500/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="text-green-400 text-xl mt-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  ✓
                </motion.div>
                <p className="text-neutral-300 leading-relaxed">{point}</p>
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
            className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-neutral-700/50 relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-50" />
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-orange-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                Let's Build the Future of{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Grooming
                </span>
                {' '}Together
              </motion.h3>
              
              <motion.p 
                className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Want to learn more or request our pitch deck? Let's discuss how you can be part of this revolutionary journey.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={itemVariants}
              >
                <motion.a 
                  href="mailto:info.pydart@gmail.com" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧 info.pydart@gmail.com
                </motion.a>
                
                <span className="text-neutral-400 font-medium">or</span>
                
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center px-8 py-4 border-2 border-yellow-500/50 hover:border-yellow-400 text-yellow-400 hover:text-yellow-300 font-bold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Form
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
