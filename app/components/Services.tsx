'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Types
interface Service {
  title: string;
  description: string;
  category: 'ai' | 'mobile' | 'web' | 'design' | 'analytics';
  icon: string;
  features: string[];
  technologies: string[];
  details: string[];
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

export default function Services() {
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

  // Services data - our core offerings
  const services: Service[] = [
    {
      title: "AI-Integrated Mobile Development",
      description: "Native Android and iOS applications enhanced with cutting-edge AI capabilities for intelligent user experiences",
      category: "mobile",
      icon: "mobile",
      features: ["AI-Powered Android Apps", "iOS Development with ML", "Smart User Interfaces", "Predictive Analytics"],
      technologies: ["Android Studio", "Xcode", "TensorFlow Lite", "Core ML", "Firebase AI"],
      details: [
        "Smart Android Development: Build intelligent Android applications with integrated AI features and machine learning",
        "iOS AI Integration: Develop sophisticated iOS apps powered by Core ML and advanced AI capabilities",
        "Intelligent UX: Create apps that learn and adapt to user behavior for personalized experiences"
      ]
    },
    {
      title: "Generative AI Solutions",
      description: "Custom generative AI systems that create content, automate processes, and deliver innovative AI-powered experiences",
      category: "ai",
      icon: "brain",
      features: ["Content Generation", "AI Chatbots", "Image Generation", "Text Processing"],
      technologies: ["OpenAI GPT", "DALL-E", "Stable Diffusion", "LangChain", "Hugging Face"],
      details: [
        "Custom AI Models: Develop tailored generative AI solutions for content creation and automation",
        "Intelligent Chatbots: Build conversational AI systems that understand and respond naturally",
        "Creative AI: Implement image and text generation capabilities for marketing and content creation"
      ]
    },
    {
      title: "GEO & SEO Optimized Web Development",
      description: "High-performance websites and web applications optimized for search engines and geographic targeting",
      category: "web",
      icon: "code",
      features: ["SEO Optimization", "Geographic Targeting", "Performance Optimization", "Mobile-First Design"],
      technologies: ["Next.js", "React", "Node.js", "Google Analytics", "Schema Markup"],
      details: [
        "SEO Excellence: Build websites that rank high on search engines with advanced SEO optimization techniques",
        "Geographic Optimization: Implement location-based features and local SEO for targeted audience reach",
        "Performance Focus: Deliver lightning-fast websites with optimal Core Web Vitals and user experience"
      ]
    },
    {
      title: "Digital Marketing Solutions",
      description: "Comprehensive digital marketing strategies that drive growth, engagement, and conversions across all platforms",
      category: "analytics",
      icon: "chart",
      features: ["Social Media Marketing", "PPC Campaigns", "Content Strategy", "Analytics & Reporting"],
      technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "SEMrush", "Mailchimp"],
      details: [
        "Strategic Campaigns: Design and execute targeted digital marketing campaigns across multiple channels",
        "Data-Driven Insights: Utilize advanced analytics to optimize marketing performance and ROI",
        "Brand Growth: Build comprehensive marketing strategies that increase brand awareness and customer acquisition"
      ]
    },
    {
      title: "Graphics & Visual Design",
      description: "Creative visual solutions that communicate your brand story through compelling graphics and design elements",
      category: "design",
      icon: "palette",
      features: ["Brand Identity", "UI/UX Design", "Marketing Graphics", "Print Design"],
      technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Canva Pro", "After Effects"],
      details: [
        "Brand Visual Identity: Create cohesive visual brand systems that resonate with your target audience",
        "Digital Graphics: Design engaging graphics for websites, social media, and digital marketing campaigns",
        "User Interface Design: Craft intuitive and visually appealing interfaces for web and mobile applications"
      ]
    },
    {
      title: "Social Media Management",
      description: "Comprehensive social media handling services that build your brand presence and engage your audience across all platforms",
      category: "analytics",
      icon: "social",
      features: ["Content Creation", "Community Management", "Social Analytics", "Brand Monitoring"],
      technologies: ["Hootsuite", "Buffer", "Sprout Social", "Canva", "Facebook Business"],
      details: [
        "Content Strategy: Develop engaging content calendars and post strategies tailored to each platform",
        "Community Engagement: Build and nurture your online community through active engagement and response management",
        "Performance Analytics: Track social media metrics and ROI to optimize your social media strategy"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobile': return 'from-blue-500 to-blue-600';
      case 'ai': return 'from-purple-500 to-purple-600';
      case 'web': return 'from-green-500 to-green-600';
      case 'analytics': return 'from-orange-500 to-orange-600';
      case 'design': return 'from-pink-500 to-pink-600';
      default: return 'from-teal-500 to-teal-600';
    }
  };

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'brain':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'mobile':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
          </svg>
        );
      case 'code':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'palette':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a4 4 0 004-4V5a2 2 0 00-2-2H7z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'strategy':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'social':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 overflow-hidden py-32 lg:py-40"
    >
      {/* Floating teal dot */}
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
            <pattern id="neural-grid-services" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-services)" />
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

      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-20 sm:mb-32"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Main heading */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-8 leading-[0.9] tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif' }}
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
                Comprehensive
              </motion.span>
              <motion.span 
                className="block text-[#00b4ab]"
                animate={{
                  x: isHovering ? mousePosition.x * -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                Digital Solutions
              </motion.span>
            </motion.h2>

            {/* Subheadline */}
            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-700 mb-8 leading-relaxed max-w-4xl mx-auto"
              variants={itemVariants}
            >
              AI-integrated mobile apps, generative AI solutions, SEO-optimized web development, digital marketing, social media management, and stunning graphics design.
            </motion.h3>

            {/* Intro Paragraph */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0"
              variants={itemVariants}
            >
              We specialize in cutting-edge technology solutions that combine artificial intelligence with mobile development, web optimization, and creative design to help your business thrive in the digital age.
            </motion.p>
          </motion.div>

          {/* Services Section */}
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.h3 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 text-center mb-16 tracking-tight"
              variants={itemVariants}
            >
              Our Services
            </motion.h3>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-neutral-200/50 h-full p-8">
                    
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(service.category)} text-white`}>
                        {getCategoryIcon(service.icon)}
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(service.category)}`}>
                        {service.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4 group-hover:text-[#00b4ab] transition-colors duration-300">
                      {service.title}
                    </h4>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-neutral-800 mb-3">Key Features:</h5>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ab] flex-shrink-0" />
                            <span className="text-sm text-neutral-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-neutral-800">Technologies:</h5>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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
            {/* CTA Section */}
            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-200/50 p-8 sm:p-12 mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                Ready to Transform Your Business?
              </h4>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Let's discuss how our comprehensive digital solutions can accelerate your growth and drive innovation in your industry.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00b4ab] to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-[#00b4ab] transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Project
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-xl hover:border-[#00b4ab] hover:text-[#00b4ab] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More About Us
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* Secondary Links */}
            <motion.div 
              className="flex justify-center items-center"
              variants={itemVariants}
            >
              <motion.a
                href="/careers"
                className="group relative inline-flex items-center text-lg font-medium text-neutral-700 pb-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Join Our Team
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-neutral-700"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
