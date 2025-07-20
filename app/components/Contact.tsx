'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { API_CONFIG } from '../../lib/api/config';

// Types
interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  service: string;
  purpose: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

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

export default function Contact() {
  const { mousePosition, isMobile } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    mobile: '',
    service: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    setIsClient(true);
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Reset form function
  const resetForm = () => {
    setSubmissionStatus({
      type: null,
      message: ''
    });
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

  // Contact information
  const contactInfo: ContactInfo[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: ["founder@pydart.in", "info.pydart@gmail.com"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: ["+91 73567 65036", "Available 24/7"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      details: ["Remote-First", "India • Global"]
    }
  ];

  // Services
  const services = [
    "Mobile Application",
    "Web Application", 
    "AI Services",
    "IOT Projects",
    "GUI application",
    "Computer Software",
    "Website",
    "Smart Home",
    "Embedded System",
    "Digital Marketing",
    "Branding",
    "Graphics Design",
    "Consulting",
    "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare query parameters following the same pattern as Career component
      const queryParams = new URLSearchParams({
        recipientEmail: formData.email,
        recipientName: formData.name,
        mobile: formData.mobile,
        selectedService: formData.service,
        purpose: formData.purpose
      });

      // Construct API URL with query parameters using API_CONFIG
      const apiUrl = `${API_CONFIG.emailApiUrl}/Email/EnquiryMail?${queryParams.toString()}`;
      console.log('🚀 Making API call to:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          service: '',
          purpose: ''
        });
        setSubmissionStatus({
          type: 'success',
          message: 'Inquiry received successfully! We\'ll contact you within 24 hours.'
        });
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmissionStatus({
          type: 'error',
          message: 'Submission failed. Please try again.'
        });
        // Scroll to top to show error message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmissionStatus({
        type: 'error',
        message: 'Server error. Please try later.'
      });
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 overflow-hidden"
    >
      {/* Floating teal dot */}
      {isClient && !isMobile && (
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

      {/* Geometric pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="contact-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#00b4ab" />
            <path d="M0 10H20M10 0V20" stroke="#00b4ab" strokeWidth="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
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
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column - Contact Header */}
            <motion.div 
              className="w-full lg:w-2/5"
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-left">
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                  Get In <span className="text-[#00b4ab]">Touch</span>
                </h2>
                <div className="h-1 w-20 bg-[#00b4ab] mb-6"></div>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Ready to build something amazing together? Let's discuss your project 
                  and explore how we can bring your ideas to life.
                </p>
                
                {/* Quick Contact Info */}
                <div className="bg-neutral-50 border-l-4 border-[#00b4ab] pl-4 py-4 mb-8">
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">Quick Connect</h4>
                  <p className="text-neutral-600 mb-2">
                    Reach out to us directly for immediate assistance
                  </p>
                  <div className="flex space-x-3 mt-3">
                    <motion.a
                      href="mailto:founder@pydart.in"
                      className="w-10 h-10 bg-[#00b4ab] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.a>
                    
                    <motion.a
                      href="tel:+917356765036"
                      className="w-10 h-10 bg-[#00b4ab] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Cards & Form */}
            <motion.div 
              className="w-full lg:w-3/5"
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            >
              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Colored accent top bar */}
                    <div className={`h-1.5 w-full ${index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 ${
                          index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {info.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-800">{info.title}</h4>
                      </div>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-neutral-600 text-sm mb-1">
                          {detail}
                        </p>
                      ))}
                      
                      <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10 ${
                        index === 0 ? 'bg-purple-400' : index === 1 ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Contact Form */}
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                variants={itemVariants}
              >
                {/* Colored accent top bar */}
                <div className="h-1.5 w-full bg-[#00b4ab]"></div>
                
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6">Send a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neutral-300 focus:border-[#00b4ab] focus:ring-2 focus:ring-[#00b4ab]/20 outline-none transition-colors bg-white text-neutral-900 text-sm sm:text-base"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neutral-300 focus:border-[#00b4ab] focus:ring-2 focus:ring-[#00b4ab]/20 outline-none transition-colors bg-white text-neutral-900 text-sm sm:text-base"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="mobile" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neutral-300 focus:border-[#00b4ab] focus:ring-2 focus:ring-[#00b4ab]/20 outline-none transition-colors bg-white text-neutral-900 text-sm sm:text-base"
                          placeholder="+91 73567 65036"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">
                          Service Interest
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neutral-300 focus:border-[#00b4ab] focus:ring-2 focus:ring-[#00b4ab]/20 outline-none transition-colors bg-white text-neutral-900 text-sm sm:text-base"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="purpose" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">
                        Message *
                      </label>
                      <textarea
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neutral-300 focus:border-[#00b4ab] focus:ring-2 focus:ring-[#00b4ab]/20 outline-none transition-colors bg-white resize-none text-neutral-900 text-sm sm:text-base"
                        placeholder="Tell us about your project and how we can help..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#00b4ab] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                  
                  {/* Decorative circle */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10 bg-teal-400"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status Messages - Similar to Internship Screen */}
      <AnimatePresence>
        {submissionStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-8 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-50 p-6 rounded-2xl ${
              submissionStatus.type === 'success' 
                ? 'bg-green-900/90 border border-green-500 backdrop-blur-sm' 
                : 'bg-red-900/90 border border-red-500 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {submissionStatus.type === 'success' ? (
                  <svg className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className={`text-lg font-medium ${
                  submissionStatus.type === 'success' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {submissionStatus.type === 'success' ? 'Message Sent Successfully!' : 'Message Failed'}
                </h3>
                <div className={`mt-2 text-sm ${
                  submissionStatus.type === 'success' ? 'text-green-200' : 'text-red-200'
                }`}>
                  <p>{submissionStatus.message}</p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="flex-shrink-0 ml-4 text-white/60 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
