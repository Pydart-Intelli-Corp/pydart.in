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

// Mouse tracking hook - mobile-safe
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
      if (!isMobile) {
        setMousePosition({ 
          x: e.clientX / window.innerWidth, 
          y: e.clientY / window.innerHeight 
        });
      }
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

export default function Services() {
  const { mousePosition, isMobile } = useMouseTracking();
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleWords, setVisibleWords] = useState<number[]>([0]); // Track visible words for single paragraph
  const [isHeadingComplete, setIsHeadingComplete] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [sectionFullScreen, setSectionFullScreen] = useState(false);
  const [headingPosition, setHeadingPosition] = useState<'center' | 'top'>('center');
  const [wheelProgress, setWheelProgress] = useState(0);
  const [contentProgress, setContentProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  // Typewriter text lines - single paragraph with white text
  const typewriterLines = [
    { text: 'Comprehensive Technology Solutions for Modern Business Challenges and Digital Innovation - Empowering Your Vision Through Advanced AI, Mobile Development, and Strategic Digital Transformation', color: 'text-white' }
  ];

  // Memoize words per line to prevent unnecessary re-renders
  const wordsPerLine = React.useMemo(() => 
    typewriterLines.map(line => line.text.split(' ')), 
    []
  );
  const totalWords = React.useMemo(() => 
    wordsPerLine.reduce((sum, words) => sum + words.length, 0), 
    [wordsPerLine]
  );

  useEffect(() => {
    setIsClient(true);
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Store scroll position when locking
  const [lockedScrollPosition, setLockedScrollPosition] = useState(0);

  // Check if section is in view and handle scroll locking - disabled on mobile
  useEffect(() => {
    if (!isClient || !sectionRef.current || isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section fills the entire viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      const isFullScreen = sectionTop <= 0 && sectionBottom >= windowHeight;
      setSectionFullScreen(isFullScreen);

      // Store current scroll position when entering full screen
      if (isFullScreen && !scrollLocked && !isHeadingComplete) {
        setLockedScrollPosition(window.pageYOffset);
      }

      // Reset progress when leaving section (only if heading not complete)
      if (!isFullScreen && !isHeadingComplete) {
        setScrollProgress(0);
        setVisibleWords([0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, isHeadingComplete, scrollLocked, isMobile]);

  // Lock/unlock scroll with position restoration - disabled on mobile
  useEffect(() => {
    if (!isClient || isMobile) return;

    // Lock scroll when section is full screen AND words are not fully revealed yet
    if (sectionFullScreen && !isHeadingComplete) {
      if (!scrollLocked) {
        setScrollLocked(true);
        
        // Lock scroll position
        document.body.style.position = 'fixed';
        document.body.style.top = `-${lockedScrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        
        console.log('Scroll locked at position:', lockedScrollPosition);
      }
    } 
    // Unlock scroll when words are fully revealed
    else if (isHeadingComplete && scrollLocked) {
      setScrollLocked(false);
      
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore the scroll position
      window.scrollTo(0, lockedScrollPosition);
      
      console.log('Scroll unlocked, restored to position:', lockedScrollPosition);
    }
    // Also unlock when leaving section
    else if (!sectionFullScreen && scrollLocked) {
      setScrollLocked(false);
      
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      console.log('Scroll unlocked - left section');
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isClient, sectionFullScreen, isHeadingComplete, scrollLocked, lockedScrollPosition, isMobile]);

  // Wheel-based word reveal when scroll is locked - desktop only
  useEffect(() => {
    if (!scrollLocked || !sectionFullScreen || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Use wheel events to control word reveal when scroll is locked
      setScrollProgress(prev => {
        const delta = e.deltaY > 0 ? 0.015 : -0.015; // Faster wheel-based reveal (increased from 0.005)
        const newProgress = Math.min(Math.max(prev + delta, 0), 1);
        
        // Calculate visible words based on progress - one word at a time
        const currentTotalWords = typewriterLines.reduce((sum, line) => sum + line.text.split(' ').length, 0);
        const exactWordProgress = newProgress * currentTotalWords;
        const wordsToShow = Math.floor(exactWordProgress);
        const newVisibleWords: number[] = [0];
        
        newVisibleWords[0] = Math.min(wordsToShow, typewriterLines[0].text.split(' ').length);
        setVisibleWords(newVisibleWords);
            // Check if heading is complete - only when ALL words are fully revealed
      if (wordsToShow >= currentTotalWords && !isHeadingComplete) {
        // Add a small delay to ensure the last word animation completes
        setTimeout(() => {
          setIsHeadingComplete(true);
          setHeadingPosition('top');
          setContentProgress(1);
        }, 500);
      }
        
        return newProgress;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollLocked, sectionFullScreen, isHeadingComplete, isMobile]);

  // Prevent all other scroll attempts when locked - desktop only
  useEffect(() => {
    if (!scrollLocked || isMobile) return;

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeys = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    // Add event listeners to prevent scroll attempts - exclude touch events for mobile compatibility
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('keydown', preventKeys);
    };
  }, [scrollLocked, isMobile]);

  // Simplified heading completion check - ensure ALL words are visible before marking complete
  useEffect(() => {
    const totalVisibleWords = visibleWords.reduce((sum, count) => sum + count, 0);
    const currentTotalWords = typewriterLines.reduce((sum, line) => sum + line.text.split(' ').length, 0);
    const complete = totalVisibleWords >= currentTotalWords;
    
    // Set heading complete when all words are visible with a delay to ensure animations finish
    if (complete && !isHeadingComplete) {
      const delay = isMobile ? 600 : 800; // Slightly faster on mobile
      setTimeout(() => {
        setIsHeadingComplete(true);
      }, delay);
    }
  }, [visibleWords, isHeadingComplete, isMobile]);

  // Scroll-based word reveal effect - modified to work with locking, mobile-friendly
  useEffect(() => {
    if (!isClient || !sectionRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate how much of the section is visible
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Start revealing when section enters viewport
      let progress = 0;
      
      // Calculate progress based on how much the section has been scrolled into view
      if (sectionTop < windowHeight && sectionBottom > 0) {
        if (sectionTop <= windowHeight * 0.9) { // Start earlier for faster reveal
          // Calculate progress based on how far the section has scrolled
          const maxScroll = windowHeight * 0.9;
          const currentScroll = maxScroll - Math.max(sectionTop, -sectionHeight);
          // Adjust scroll needed based on device type
          const scrollMultiplier = isMobile ? 3.0 : 5.0; // Faster on mobile
          const totalScrollNeeded = sectionHeight * scrollMultiplier + maxScroll;
          
          progress = Math.min(currentScroll / totalScrollNeeded, 1);
          
          // Apply faster easing for quicker reveal, especially on mobile
          const easingPower = isMobile ? 1.0 : 1.2;
          progress = Math.pow(progress, easingPower);
        }
      }
      
      setScrollProgress(progress);

      // Calculate visible words based on scroll progress - faster precise reveal
      const currentTotalWords = typewriterLines.reduce((sum, line) => sum + line.text.split(' ').length, 0);
      // Faster word reveal multiplier, especially on mobile
      const revealMultiplier = isMobile ? 1.0 : 0.8;
      const exactWordProgress = progress * currentTotalWords * revealMultiplier;
      const wordsToShow = Math.floor(exactWordProgress);
      const newVisibleWords: number[] = [0];
      
      // For single paragraph, set exact visible word count
      newVisibleWords[0] = Math.min(wordsToShow, typewriterLines[0].text.split(' ').length);
      
      setVisibleWords(newVisibleWords);

      // Check if heading is complete - only when ALL words are fully revealed
      if (wordsToShow >= currentTotalWords && !isHeadingComplete) {
        // Add a small delay to ensure the last word animation completes
        const delay = isMobile ? 300 : 500; // Faster on mobile
        setTimeout(() => {
          setIsHeadingComplete(true);
          setHeadingPosition('top');
          setContentProgress(1);
        }, delay);
      }
    };

    // Only add scroll listener if not locked, otherwise words reveal based on existing progress
    if (!scrollLocked) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }
    
    return () => {
      if (!scrollLocked) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isClient, scrollLocked, isHeadingComplete, isMobile]);

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
      className="relative min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white overflow-hidden py-12 sm:py-16 md:py-20 lg:py-32"
    >
      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00b4ab]/30 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="neural-grid-services" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid-services)" />
        </svg>
      </div>

      {/* Ambient glow effect - mobile-safe */}
      {isClient && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00b4ab]/20 to-[#008a82]/20 blur-3xl"
          animate={!isMobile ? {
            x: mousePosition.x * 100 - 192,
            y: mousePosition.y * 100 - 192,
          } : {
            x: -96,
            y: -96,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      )}

      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Section */}
          <motion.div 
            className={`transition-all duration-1000 ease-in-out ${
              headingPosition === 'center' 
                ? 'flex items-center justify-start min-h-[80vh] sm:min-h-screen' 
                : 'mb-12 sm:mb-16 md:mb-20 lg:mb-24'
            }`}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Main heading with Scroll-based Word Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-6 sm:mb-8 text-white leading-relaxed tracking-wide min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onMouseEnter={() => !isMobile && setIsHovering(true)}
              onMouseLeave={() => !isMobile && setIsHovering(false)}
            >
              {typewriterLines.map((line, lineIndex) => {
                const words = wordsPerLine[lineIndex];
                const visibleWordCount = visibleWords[lineIndex];
                const allWordsVisible = visibleWordCount === words.length;
                
                return (
                  <motion.span 
                    key={lineIndex}
                    className={`block ${line.color} ${lineIndex < typewriterLines.length - 1 ? 'mb-4' : ''}`}
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: 1, // Always visible
                      x: !isMobile && isHovering && allWordsVisible ? mousePosition.x * (lineIndex === 1 ? -2 : 1.5) : 0,
                    }}
                    transition={{ 
                      opacity: { duration: 0.3 },
                      x: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                    style={{ color: '#374151' }} // Initial dark grey color for all text
                  >
                    {words.map((word, wordIndex) => {
                      const isRevealed = wordIndex < visibleWordCount;
                      const isLastRevealedWord = wordIndex === visibleWordCount - 1 && !allWordsVisible;
                      
                      return (
                        <motion.span
                          key={wordIndex}
                          className="inline-block mr-3"
                          initial={{ opacity: 1 }}
                          animate={{ 
                            color: (isRevealed || isHeadingComplete) ? '#ffffff' : '#374151', // White when revealed, dark grey when not
                            opacity: 1 // Always visible
                          }}
                          transition={{ 
                            duration: 0.3, // Faster color transition (reduced from 0.4)
                            delay: wordIndex * 0.01, // Even faster stagger (reduced from 0.02)
                            ease: "easeOut"
                          }}
                        >
                          {word}
                          {isLastRevealedWord && !isHeadingComplete && (
                            <motion.span
                              className="inline-block w-1 h-[0.8em] bg-[#00b4ab] ml-2"
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                            />
                          )}
                        </motion.span>
                      );
                    })}
                  </motion.span>
                );
              })}
            </motion.h1>
          </motion.div>

          {/* Services Section */}
          <motion.div 
            className="mb-16 sm:mb-20 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHeadingComplete ? 1 : 0 
            }}
            transition={{ duration: 0.8, delay: isHeadingComplete ? 0.8 : 0 }}
          >
            {/* Services Grid - Mobile-friendly responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {services.map((service, index) => {
                return (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: isHeadingComplete ? 1 : 0,
                      y: isHeadingComplete ? 0 : 50
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: isHeadingComplete ? 1.0 + (index * 0.2) : 0,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={!isMobile ? { y: -8 } : {}}
                  >
                  <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#00b4ab]/20 transition-all duration-500 overflow-hidden border border-gray-700 hover:border-[#00b4ab]/50 h-full p-6 sm:p-8">
                    
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(service.category)} text-white shadow-lg`}>
                        {getCategoryIcon(service.icon)}
                      </div>
                      <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(service.category)} shadow-lg`}>
                        {service.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-[#00b4ab] transition-colors duration-300">
                      {service.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 sm:mb-6">
                      <h5 className="text-sm font-semibold text-gray-200 mb-2 sm:mb-3">Key Features:</h5>
                      <div className="space-y-2 sm:space-y-3">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ab] mt-1.5 sm:mt-2 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2 sm:space-y-3">
                      <h5 className="text-sm font-semibold text-gray-200">Technologies:</h5>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {service.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 sm:px-3 py-1 bg-gray-800/60 backdrop-blur-sm text-gray-300 text-xs rounded-lg border border-gray-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHeadingComplete ? 1 : 0 
            }}
            transition={{ duration: 0.6, delay: isHeadingComplete ? 1.8 : 0 }}
          >
            {/* CTA Section */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 hover:border-[#00b4ab]/30 transition-all duration-500 p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isHeadingComplete ? 1 : 0,
                y: isHeadingComplete ? 0 : 30
              }}
              transition={{ duration: 0.5, delay: isHeadingComplete ? 2.0 : 0 }}
              whileHover={!isMobile ? { scale: isHeadingComplete ? 1.02 : 1 } : {}}
            >
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                Ready to Transform Your Business?
              </h4>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Let's discuss how our comprehensive digital solutions can accelerate your growth and drive innovation in your industry.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00b4ab] to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-[#00b4ab] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00b4ab]/20 text-sm sm:text-base"
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
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
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-[#00b4ab] hover:text-[#00b4ab] hover:bg-[#00b4ab]/10 transition-all duration-300 text-sm sm:text-base"
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            >
              <motion.a
                href="/careers"
                className="group relative inline-flex items-center text-base sm:text-lg font-medium text-gray-300 pb-1 hover:text-[#00b4ab] transition-colors duration-300"
                whileHover={!isMobile ? { x: 5 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative">
                  Join Our Team
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-[#00b4ab]"
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
