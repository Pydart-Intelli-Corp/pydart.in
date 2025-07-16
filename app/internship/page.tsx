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
      icon: 'https://images.unsplash.com/photo-1553028826-f4804151e0b2?q=80&w=2070&auto=format&fit=crop',
      title: 'Expert Training',
      description: 'Learn from industry professionals with hands-on guidance and mentorship'
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      title: 'Real Projects',
      description: 'Work on live projects and build an impressive portfolio'
    },
    {
      icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
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
      name: 'Flutter', 
      logo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074&auto=format&fit=crop',
      description: 'Cross-platform mobile development'
    },
    { 
      name: 'React', 
      logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
      description: 'Modern web development'
    },
    { 
      name: '.NET', 
      logo: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop',
      description: 'Enterprise applications'
    },
    { 
      name: 'Python', 
      logo: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2032&auto=format&fit=crop',
      description: 'Data science & backend'
    },
    { 
      name: 'Node.js', 
      logo: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
      description: 'Server-side JavaScript'
    },
    { 
      name: 'Cloud', 
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      description: 'Modern cloud platforms'
    },
  ];

  // Success stories/testimonials
  const successStories = [
    {
      name: 'Sarah Johnson',
      role: 'Flutter Developer at TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1887&auto=format&fit=crop',
      quote: 'The internship program gave me the practical skills I needed to land my dream job. The mentorship was incredible!'
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Developer at StartupXYZ',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
      quote: 'Working on real projects during the internship made all the difference. I felt confident from day one at my new job.'
    },
    {
      name: 'Priya Sharma',
      role: 'React Developer at InnovateInc',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
      quote: 'The comprehensive training and placement support helped me transition from student to professional developer seamlessly.'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Sliding Images */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide]}
              alt={`Internship hero ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Transform Your Future
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 font-medium"
            >
              Launch your tech career with our comprehensive internship program
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToRegistrationForm}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00b4ab] to-[#008a82] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00b4ab]/30 transition-all duration-300 transform hover:scale-105"
              >
                Register Now →
              </button>
              <button
                onClick={scrollToProgramInfo}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#00b4ab] scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Program Benefits Section */}
      <section ref={programInfoRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white">
              Why Choose Our Program?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our internship program is designed to give you real-world experience 
              and the skills you need to succeed in the tech industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-[#00b4ab]/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00b4ab] transition-colors duration-300 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white">
              Technologies You'll Master
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Work with cutting-edge technologies and frameworks used by top companies worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-[#00b4ab]/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="relative w-full h-32 mb-4 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00b4ab] transition-colors duration-300 mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from our alumni who have successfully transitioned into tech careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-[#00b4ab]/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{story.name}</h4>
                    <p className="text-[#00b4ab] text-sm font-medium">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">"{story.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section ref={registrationFormRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          {/* Status Messages */}
          <AnimatePresence>
            {registrationStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`mb-8 p-6 rounded-2xl ${
                  registrationStatus.type === 'success' 
                    ? 'bg-green-900/50 border border-green-500' 
                    : 'bg-red-900/50 border border-red-500'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {registrationStatus.type === 'success' ? (
                      <svg className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${
                      registrationStatus.type === 'success' ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {registrationStatus.type === 'success' ? 'Registration Successful!' : 'Registration Failed'}
                    </h3>
                    <div className={`mt-2 text-sm ${
                      registrationStatus.type === 'success' ? 'text-green-200' : 'text-red-200'
                    }`}>
                      <p>{registrationStatus.message}</p>
                      {registrationStatus.registrationId && (
                        <p className="mt-2 font-medium">
                          Registration ID: {registrationStatus.registrationId}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={resetForm}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          registrationStatus.type === 'success' 
                            ? 'bg-green-800 hover:bg-green-700 text-green-100' 
                            : 'bg-red-800 hover:bg-red-700 text-red-100'
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
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center border border-green-500/30"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Registration Completed Successfully!
              </h2>
              <p className="text-gray-300 mb-4">
                Your internship registration has been submitted and payment has been processed.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                You will receive a confirmation email shortly with all the details.
              </p>
              <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
                <p className="text-sm font-medium text-gray-300">Registration ID:</p>
                <p className="text-2xl font-bold text-[#00b4ab]">{registrationStatus.registrationId}</p>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <p>• Our training team will contact you within 2-3 business days</p>
                <p>• You will receive detailed information about the training schedule</p>
                <p>• Keep your registration ID for future reference</p>
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
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white">
                  Start Your Journey
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Register your students for our comprehensive internship program and 
                  watch them transform into industry-ready developers
                </p>
              </div>
              
              <InternshipRegistrationForm
                onSuccess={handleRegistrationSuccess}
                onError={handleRegistrationError}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Need Assistance?</h2>
            <p className="text-gray-300 mb-8">
              Our dedicated team is here to help you with any questions about the internship program
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-[#00b4ab]/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#00b4ab]/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#00b4ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Training Team</h3>
              </div>
              <p className="text-gray-300 mb-4">For internship program queries and guidance:</p>
              <a
                href="mailto:training.pydart@gmail.com"
                className="text-[#00b4ab] hover:text-[#33c3bc] font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                training.pydart@gmail.com
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-[#00b4ab]/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#00b4ab]/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#00b4ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Technical Support</h3>
              </div>
              <p className="text-gray-300 mb-4">For registration issues and technical help:</p>
              <a
                href="mailto:hello@pydart.com"
                className="text-[#00b4ab] hover:text-[#33c3bc] font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@pydart.com
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
