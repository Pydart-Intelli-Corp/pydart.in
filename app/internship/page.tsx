'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import InternshipRegistrationForm from '@/app/components/InternshipRegistrationForm';

export default function InternshipRegistrationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    registrationId?: string;
  }>({
    type: null,
    message: ''
  });

  const programInfoRef = useRef<HTMLDivElement>(null);
  const registrationFormRef = useRef<HTMLDivElement>(null);
  
  // Hero images from Unsplash
  const heroImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2674&auto=format&fit=crop',
  ];

  // Auto-slide hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToProgramInfo = () => {
    programInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRegistrationForm = () => {
    registrationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegistrationSuccess = (registrationId: string) => {
    setRegistrationStatus({
      type: 'success',
      message: 'Registration completed successfully!',
      registrationId
    });
    
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationError = (error: string) => {
    setRegistrationStatus({
      type: 'error',
      message: error
    });
    
    // Scroll to top to show error message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setRegistrationStatus({
      type: null,
      message: ''
    });
  };

  // Program benefits data with new images
  const programBenefits = [
    {
      icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop',
      title: 'Expert Training',
      description: 'Learn from industry professionals with hands-on guidance and mentorship'
    },
    {
      icon: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
      title: 'Real Projects',
      description: 'Work on live projects and build an impressive portfolio'
    },
    {
      icon: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
      title: 'Certification',
      description: 'Get industry-recognized certificates upon successful completion'
    },
    {
      icon: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
      title: 'Mentorship',
      description: 'One-on-one mentoring sessions with senior developers'
    },
    {
      icon: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      title: 'Skill Development',
      description: 'Master latest technologies and modern development practices'
    },
    {
      icon: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop',
      title: 'Placement Support',
      description: 'Comprehensive job placement assistance and interview preparation'
    },
  ];

  // Technologies covered with new icons
  const technologies = [
    { 
      name: 'Artificial Intelligence', 
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      description: 'Machine learning and AI development'
    },
    { 
      name: 'App Development', 
      logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
      description: 'Mobile and web application development'
    },
    { 
      name: 'Embedded Systems', 
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      description: 'Hardware programming and IoT development'
    },
    { 
      name: 'Python', 
      logo: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2032&auto=format&fit=crop',
      description: 'Python programming for various applications'
    },
    { 
      name: 'Communication Protocols', 
      logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      description: 'UART, SPI, I2C and other protocols'
    },
    { 
      name: 'UI/UX Design', 
      logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop',
      description: 'User interface and experience design'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Sliding Images */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide]}
              alt={`Professional internship training ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Professional overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
            {/* Company Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 sm:mb-8"
            >
              <div className="w-2 h-2 bg-[#00b4ab] rounded-full mr-2"></div>
              <span className="text-white/90 text-sm sm:text-base font-medium">PyDart Intelligence Corp</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 text-white leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <span className="block">Professional</span>
              <span className="bg-gradient-to-r from-[#00b4ab] to-[#00d4cc] bg-clip-text text-transparent">Tech Internship</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Industry-leading training programs designed to transform students into job-ready professionals
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <button
                onClick={scrollToRegistrationForm}
                className="group relative inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#00b4ab] to-[#008a82] text-white font-bold rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#00b4ab]/40 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4cc] to-[#00b4ab] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  <span>Register Now</span>
                  <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button
                onClick={scrollToProgramInfo}
                className="group inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 border-2 border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-base sm:text-lg min-w-[200px]"
              >
                <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </button>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mt-12 sm:mt-16"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#00b4ab]">500+</div>
                <div className="text-white/70 text-sm sm:text-base">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#00b4ab]">95%</div>
                <div className="text-white/70 text-sm sm:text-base">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#00b4ab]">50+</div>
                <div className="text-white/70 text-sm sm:text-base">Industry Partners</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Professional Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#00b4ab]' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Program Benefits Section */}
      <section ref={programInfoRef} className="py-12 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center bg-[#00b4ab]/10 border border-[#00b4ab]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#00b4ab] rounded-full mr-2"></div>
              <span className="text-[#00b4ab] text-sm sm:text-base font-semibold">Program Benefits</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 text-gray-900 leading-tight">
              Why Choose Our <span className="text-[#00b4ab]">Professional Program</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Industry-aligned curriculum designed by professionals to bridge the gap between academic learning and industry requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#00b4ab]/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative w-full h-48 sm:h-56 mb-6 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-1 h-8 bg-[#00b4ab] rounded-full mr-3"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#00b4ab] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
                
                <div className="mt-4 flex items-center text-[#00b4ab] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center bg-[#00b4ab]/10 border border-[#00b4ab]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#00b4ab] rounded-full mr-2"></div>
              <span className="text-[#00b4ab] text-sm sm:text-base font-semibold">Technology Stack</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 text-white leading-tight">
              Master <span className="bg-gradient-to-r from-[#00b4ab] to-[#00d4cc] bg-clip-text text-transparent">Industry-Standard</span> Technologies
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive training on cutting-edge technologies and frameworks used by top technology companies worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-[#00b4ab]/50 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00b4ab]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="relative w-full h-40 sm:h-48 mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="w-1 h-6 bg-[#00b4ab] rounded-full mr-3"></div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00b4ab] transition-colors duration-300">
                      {tech.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">{tech.description}</p>
                  
                  <div className="flex items-center text-[#00b4ab] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore curriculum</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section ref={registrationFormRef} className="py-12 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          {/* Status Messages */}
          <AnimatePresence>
            {registrationStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className={`mb-8 p-6 rounded-2xl border-2 ${
                  registrationStatus.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {registrationStatus.type === 'success' ? (
                      <svg className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-bold ${
                      registrationStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {registrationStatus.type === 'success' ? 'Registration Successful!' : 'Registration Failed'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm font-medium">{registrationStatus.message}</p>
                      {registrationStatus.type === 'error' && registrationStatus.message && (
                        <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                          <p className="text-xs text-red-700 font-semibold mb-1">Error Details:</p>
                          <p className="text-xs text-red-600 whitespace-pre-wrap break-words">{registrationStatus.message}</p>
                          <div className="mt-2 text-xs text-red-600">
                            <p>• Please check your internet connection</p>
                            <p>• Verify all form fields are correctly filled</p>
                            <p>• If the issue persists, contact support</p>
                          </div>
                        </div>
                      )}
                      {registrationStatus.registrationId && (
                        <p className="mt-2 font-semibold">
                          Registration ID: {registrationStatus.registrationId}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={resetForm}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                          registrationStatus.type === 'success' 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                      >
                        {registrationStatus.type === 'success' ? 'Register Another Batch' : 'Try Again'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success State */}
          {registrationStatus.type === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-green-200 shadow-2xl"
            >
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Welcome to PyDart Intelligence!
              </h2>
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                Your internship registration has been completed successfully. Our team will contact you soon.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <p className="text-sm font-medium text-gray-700">Your Registration ID:</p>
                <p className="text-2xl font-bold text-[#00b4ab] mt-1">{registrationStatus.registrationId}</p>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>✓ Confirmation email sent to your registered address</p>
                <p>✓ Training team will contact you within 2-3 business days</p>
                <p>✓ Keep your registration ID for future reference</p>
              </div>
            </motion.div>
          ) : (
            /* Registration Form */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-[#00b4ab]/10 border border-[#00b4ab]/20 rounded-full px-4 py-2 mb-6">
                  <div className="w-2 h-2 bg-[#00b4ab] rounded-full mr-2"></div>
                  <span className="text-[#00b4ab] text-sm sm:text-base font-semibold">Registration</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-gray-900">
                  Start Your Professional <span className="text-[#00b4ab]">Journey</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Register for our comprehensive internship program and transform your students into industry-ready professionals
                </p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100">
                <InternshipRegistrationForm
                  onSuccess={handleRegistrationSuccess}
                  onError={handleRegistrationError}
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-[#00b4ab] to-[#008f88]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-white text-sm sm:text-base font-semibold">Get In Touch</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white">
              Ready to <span className="text-white/90">Transform</span> <br />
              Your Students?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of educational institutions that trust PyDart Intelligence 
              to prepare their students for the future of technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Partnership Inquiries
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Training Team</h4>
                      <p className="text-white/80">training.pydart@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Technical Support</h4>
                      <p className="text-white/80">info.pydart@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Office</h4>
                      <p className="text-white/80">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6">Program Impact</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white mb-2">500+</div>
                    <div className="text-sm text-white/80">Students Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white mb-2">50+</div>
                    <div className="text-sm text-white/80">Partner Colleges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white mb-2">85%</div>
                    <div className="text-sm text-white/80">Placement Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white mb-2">4.8/5</div>
                    <div className="text-sm text-white/80">Student Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Start Your Partnership Today
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Schedule a consultation to discuss how our internship program 
                  can benefit your institution and students
                </p>
              </div>

              <div className="space-y-6">
                <button 
                  onClick={() => scrollToRegistrationForm()}
                  className="w-full bg-gradient-to-r from-[#00b4ab] to-[#008f88] text-white font-bold py-4 px-8 rounded-2xl hover:from-[#008f88] hover:to-[#006b66] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Register Now
                </button>

                <button 
                  onClick={() => window.open('mailto:partnerships@pydart.in', '_blank')}
                  className="w-full bg-gray-100 text-gray-900 font-semibold py-4 px-8 rounded-2xl hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                >
                  Contact Our Team
                </button>

                <div className="flex items-center justify-center space-x-6 pt-4">
                  <a href="#" className="text-gray-400 hover:text-[#00b4ab] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00b4ab] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00b4ab] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
