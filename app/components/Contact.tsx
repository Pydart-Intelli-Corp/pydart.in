'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  service: string;
  purpose: string;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface Service {
  value: string;
  label: string;
  icon: string;
  description: string;
  color: string;
  suggestions: string[];
}

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  color: string;
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

// Floating communication icons
const CommunicationIcons = () => {
  const [icons, setIcons] = useState<Array<{x: number, y: number, icon: string, delay: number}>>([]);
  
  useEffect(() => {
    const commIcons = ['💬', '📧', '📞', '💻', '🌐', '✉️', '📱', '🤝'];
    const newIcons = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: commIcons[i % commIcons.length],
      delay: i * 0.7
    }));
    setIcons(newIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((iconData, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-8"
          style={{
            left: `${iconData.x}%`,
            top: `${iconData.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10 + i,
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

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border ${
        type === 'success' 
          ? 'bg-green-600/20 text-green-400 border-green-500/30' 
          : 'bg-red-600/20 text-red-400 border-red-500/30'
      } backdrop-blur-xl`}
    >
      <span className="text-xl">{type === 'success' ? '✅' : '⚠️'}</span>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-current hover:text-white text-xl transition-colors"
      >
        ×
      </button>
    </motion.div>
  );
};

export default function Contact() {
  const { mousePosition, normalizedPosition } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    mobile: '',
    service: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
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
    hidden: { y: 50, opacity: 0 },
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
      value: 'Mobile Application', 
      label: 'Mobile App Development', 
      icon: '📱',
      description: 'Native iOS & Android applications',
      color: 'from-blue-500 to-cyan-500',
      suggestions: [
        "I want to develop a mobile app for iOS and Android.",
        "I need a mobile app for my business.",
        "I have an app idea I'd like to discuss.",
      ]
    },
    { 
      value: 'Web Application', 
      label: 'Web Application', 
      icon: '🌐',
      description: 'Modern web applications & platforms',
      color: 'from-green-500 to-emerald-500',
      suggestions: [
        "I want to build a web application with specific functionality.",
        "I need a web-based platform for my services.",
        "I need a website with advanced features.",
      ]
    },
    { 
      value: 'GUI application', 
      label: 'Desktop Application', 
      icon: '💻',
      description: 'Cross-platform desktop software',
      color: 'from-purple-500 to-pink-500',
      suggestions: [
        "I need a desktop application for my work.",
        "I'm looking to create a user-friendly GUI application.",
        "I want a software for internal purpose.",
      ]
    },
    { 
      value: 'Computer Software', 
      label: 'Custom Software', 
      icon: '⚙️',
      description: 'Tailored software solutions',
      color: 'from-orange-500 to-amber-500',
      suggestions: [
        "I have an idea for software to solve a specific problem.",
        "I'm seeking developers for a computer application.",
        "I need help to write software.",
      ]
    },
    { 
      value: 'Website', 
      label: 'Website Development', 
      icon: '🌍',
      description: 'Professional websites & portfolios',
      color: 'from-indigo-500 to-purple-500',
      suggestions: [
        "I need a professional website for my company.",
        "I want to create a blog or portfolio website.",
        "I am looking for web design and development services.",
      ]
    },
    { 
      value: 'AI Services', 
      label: 'AI & ML Services', 
      icon: '🤖',
      description: 'Intelligent automation & analytics',
      color: 'from-red-500 to-pink-500',
      suggestions: [
        "I need help integrating AI into my products.",
        "I'm interested in developing machine learning solutions.",
        "I need consultation for implementing AI algorithms.",
      ]
    }
  ];

  const contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      title: 'Email Us',
      details: ['info.pydart@gmail.com', 'Available 24/7'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 (555) 123-4567', 'Mon-Fri 9AM-6PM'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌍',
      title: 'Visit Us',
      details: ['Bengaluru, Karnataka', 'India'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: ['Instant Support', 'Real-time assistance'],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'service') {
      const service = services.find(s => s.value === value);
      setSelectedService(service || null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({ ...prev, purpose: suggestion }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setNotification({ message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success' });
        setFormData({ name: '', email: '', mobile: '', service: '', purpose: '' });
        setSelectedService(null);
      } else {
        setNotification({ message: 'Failed to send message. Please try again.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="contact" 
      className="relative py-32 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 text-white overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CommunicationIcons />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 70, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '-20%', top: '15%' }}
        />
        
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-500/6 to-pink-500/6 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 45, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
          style={{ right: '-15%', bottom: '20%' }}
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
              className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
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
                duration: 28,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute w-72 h-72 bg-gradient-to-r from-purple-500/12 to-pink-500/12 rounded-full blur-3xl"
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
                duration: 24,
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
              <span className="bg-gradient-to-r from-neutral-300 to-neutral-100 bg-clip-text text-transparent">
                Get in{' '}
              </span>
              <motion.span 
                className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Touch
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-xl blur-xl"
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
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-8"
              variants={itemVariants}
            >
              Ready to transform your ideas into reality? Let's discuss your next big project and create something amazing together.
            </motion.p>
            
            {/* Interactive floating elements */}
            {isClient && (
              <>
                <motion.div 
                  className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{
                    left: `${12 + normalizedPosition.x * 15}%`,
                    top: `${6 + normalizedPosition.y * 8}%`
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
                  className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                  style={{
                    right: `${18 + normalizedPosition.x * 12}%`,
                    bottom: `${8 + normalizedPosition.y * 10}%`
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

        {/* Contact Info Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-cyan-500/50 transition-all duration-500 text-center relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2 
                    }}
                  >
                    {info.icon}
                  </motion.div>
                  <h3 className={`text-lg font-bold mb-3 text-transparent bg-gradient-to-r ${info.color} bg-clip-text`}>
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className={`text-neutral-300 ${idx === 0 ? 'font-semibold' : 'text-sm'}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                Start Your Project
              </h3>
              <p className="text-neutral-300 mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
              </p>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
              {/* Name Field */}
              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-neutral-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-neutral-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              {/* Mobile Field */}
              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-neutral-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="+91 12345 67890"
                />
              </motion.div>

              {/* Service Selection */}
              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-neutral-300 mb-2">
                  Service Required *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.value}>
                      {service.icon} {service.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Purpose Field */}
              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-neutral-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project requirements, goals, and timeline..."
                />
              </motion.div>

              {/* Suggestions */}
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-neutral-400">Quick suggestions:</p>
                  <div className="space-y-2">
                    {selectedService.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left px-3 py-2 text-sm bg-neutral-700/30 hover:bg-neutral-600/50 border border-neutral-600/30 hover:border-cyan-500/50 rounded-lg transition-all duration-300 text-neutral-300 hover:text-cyan-400"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-neutral-600 disabled:to-neutral-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
                Our Services
              </h3>
              <p className="text-neutral-300 mb-8">
                We offer comprehensive technology solutions tailored to your business needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-neutral-800/30 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h4 className={`font-bold text-transparent bg-gradient-to-r ${service.color} bg-clip-text`}>
                          {service.label}
                        </h4>
                        <p className="text-neutral-400 text-sm">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
