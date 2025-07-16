'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  color: string;
  features: string[];
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

// Floating particles for background
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, color: string}>>([]);
  
  useEffect(() => {
    const colors = ['from-blue-400 to-cyan-500', 'from-purple-400 to-pink-500', 'from-green-400 to-emerald-500', 'from-orange-400 to-amber-500'];
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      x: (i + 2) * 8,
      y: 15 + (i % 4) * 20,
      size: 1 + (i % 3),
      color: colors[i % colors.length]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute bg-gradient-to-r ${particle.color} rounded-full opacity-20`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

export default function Services() {
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
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
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
        staggerChildren: 0.15,
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

  const services: Service[] = [
    {
      title: "AI-Powered Solutions",
      description: "Cutting-edge artificial intelligence and machine learning solutions that transform business operations and user experiences.",
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Computer Vision"],
      icon: "🧠",
      color: "from-blue-500 to-cyan-500",
      features: ["Custom AI Models", "Natural Language Processing", "Predictive Analytics", "Automated Decision Making"]
    },
    {
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with the latest technologies for optimal performance and scalability.",
      technologies: ["React", "Next.js", "TypeScript", "Node.js"],
      icon: "💻",
      color: "from-purple-500 to-pink-500",
      features: ["Progressive Web Apps", "Server-Side Rendering", "API Integration", "Performance Optimization"]
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices and platforms.",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      icon: "📱",
      color: "from-green-500 to-emerald-500",
      features: ["Cross-Platform Apps", "Native Performance", "Push Notifications", "Offline Functionality"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions and DevOps practices that ensure reliability, security, and optimal performance.",
      technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
      icon: "☁️",
      color: "from-orange-500 to-amber-500",
      features: ["Auto-Scaling", "Load Balancing", "CI/CD Pipelines", "Monitoring & Analytics"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that create intuitive, accessible, and engaging digital experiences.",
      technologies: ["Figma", "Adobe XD", "Framer", "Principle"],
      icon: "🎨",
      color: "from-rose-500 to-pink-500",
      features: ["User Research", "Prototyping", "Design Systems", "Accessibility Testing"]
    },
    {
      title: "Data Analytics",
      description: "Advanced data analytics and business intelligence solutions that provide actionable insights for growth.",
      technologies: ["Python", "R", "Tableau", "Power BI"],
      icon: "📊",
      color: "from-indigo-500 to-purple-500",
      features: ["Data Visualization", "Predictive Modeling", "Real-time Dashboards", "Statistical Analysis"]
    }
  ];

  const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const isHovered = hoveredCard === index;
    
    return (
      <motion.div
        className="group relative"
        variants={itemVariants}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 h-full border border-neutral-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            initial={false}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
          />
          
          {/* Floating icon */}
          <motion.div 
            className="text-6xl mb-6 relative z-10"
            animate={{ 
              rotate: isHovered ? [0, 5, -5, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {service.icon}
          </motion.div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                style={isHovered ? { backgroundImage: `linear-gradient(to right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})` } : {}}>
              {service.title}
            </h3>

            <p className="text-neutral-600 mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-neutral-700 mb-3">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${service.color} text-white`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-neutral-700 mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex}
                    className="flex items-start text-sm text-neutral-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                  >
                    <motion.svg 
                      className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-transparent bg-gradient-to-r ${service.color} bg-clip-text`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      whileHover={{ scale: 1.2 }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </motion.svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <motion.div 
              className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent cursor-pointer group-hover:scale-105 transition-transform duration-300`}
              whileHover={{ x: 5 }}
            >
              Learn More
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* Hover effect particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="services" 
      className="relative py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticles />
        
        <motion.div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '-10%', top: '20%' }}
        />
        
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-green-500/5 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
          style={{ right: '-5%', bottom: '20%' }}
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
          {/* Dynamic gradient orbs that follow mouse */}
          <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * 0.02 : 0,
                y: isClient ? mousePosition.y * 0.015 : 0,
                left: '20%',
                top: '10%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute w-60 h-60 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-full blur-3xl"
              style={{
                x: isClient ? mousePosition.x * -0.015 : 0,
                y: isClient ? mousePosition.y * 0.02 : 0,
                right: '25%',
                bottom: '5%'
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

          {/* Main heading */}
          <motion.div className="relative z-10" variants={itemVariants}>
            <motion.h2 
              className="text-6xl md:text-8xl font-black mb-8 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
                Our{' '}
              </span>
              <motion.span 
                className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Services
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"
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
              Transforming ideas into digital reality with cutting-edge technology and innovative solutions
            </motion.p>
            
            {/* Interactive floating elements */}
            {isClient && (
              <>
                <motion.div 
                  className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
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
                  className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-orange-500 rounded-full"
                  style={{
                    right: `${20 + normalizedPosition.x * 10}%`,
                    bottom: `${10 + normalizedPosition.y * 8}%`
                  }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-24 text-center"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                Ready to{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  innovate
                </span>
                {' '}together?
              </motion.h3>
              
              <motion.p 
                className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Let's discuss how our services can help transform your business and achieve your digital goals.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-blue-400 text-white hover:text-blue-400 font-bold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
