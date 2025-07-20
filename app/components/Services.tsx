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

// Optimized mouse tracking hook - mobile-safe with throttling
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    let ticking = false;
    
    const updateMousePosition = (e: MouseEvent) => {
      if (!isMobile && !ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ 
            x: e.clientX / window.innerWidth, 
            y: e.clientY / window.innerHeight 
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    if (typeof window !== 'undefined' && !isMobile) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
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
  const [isHeadingComplete, setIsHeadingComplete] = useState(false);
  const [sectionFullScreen, setSectionFullScreen] = useState(false);
  const [wheelProgress, setWheelProgress] = useState(0);
  const [contentProgress, setContentProgress] = useState(0);
  
  // Scroll speed tracking states
  const [scrollSpeed, setScrollSpeed] = useState(1); // Track scroll speed multiplier
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  
  // Typewriter effect states
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // What we do typewriter states
  const [whatWeDoLineIndex, setWhatWeDoLineIndex] = useState(0);
  const [whatWeDoCharIndex, setWhatWeDoCharIndex] = useState(0);
  const [whatWeDoComplete, setWhatWeDoComplete] = useState(false);
  const [whatWeDoStarted, setWhatWeDoStarted] = useState(false);
  
  // Show description heading after "What we do" is complete
  const [showDescriptionHeading, setShowDescriptionHeading] = useState(false);
  
  // What we do typewriter lines - matching project section style
  const whatWeDoLines = [
    { text: 'What we do?', color: 'text-white' }
  ];

  // Typewriter text lines - shortened for mobile
  const typewriterLines = [
    { text: 'Comprehensive Technology Solutions for Modern Business - Empowering Your Vision Through AI, Mobile Development, and Digital Transformation', color: 'text-white' }
  ];

  useEffect(() => {
    setIsClient(true);
    if (isInView) {
      controls.start("visible");
      // Start typewriter effect when section comes into view
      if (!hasStartedTyping) {
        setHasStartedTyping(true);
      }
    }
  }, [isInView, controls, hasStartedTyping]);

  // Track scroll speed for dynamic animation speed
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      // Calculate scroll speed
      const scrollDistance = Math.abs(currentScrollY - lastScrollY);
      const timeElapsed = currentTime - lastScrollTime;
      
      if (timeElapsed > 0) {
        const speed = scrollDistance / timeElapsed; // pixels per millisecond
        // Normalize and clamp speed multiplier between 1x and 5x
        const speedMultiplier = Math.min(Math.max(1 + speed * 0.5, 1), 5);
        setScrollSpeed(speedMultiplier);
      }
      
      setLastScrollY(currentScrollY);
      setLastScrollTime(currentTime);
    };

    // Debounce scroll speed reset
    let resetTimer: NodeJS.Timeout;
    const handleScrollWithReset = () => {
      handleScroll();
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        setScrollSpeed(1); // Reset to normal speed after scrolling stops
      }, 200);
    };

    window.addEventListener('scroll', handleScrollWithReset, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollWithReset);
      clearTimeout(resetTimer);
    };
  }, [lastScrollY, lastScrollTime]);
  
  // Typewriter effect - optimized for long text with scroll-based speed
  useEffect(() => {
    if (!isClient || !hasStartedTyping) return;

    // Calculate dynamic timing based on scroll speed - Much faster values
    const baseTypingSpeed = 8;  // Reduced from 15 to 8
    const basePauseSpeed = 80;  // Reduced from 150 to 80
    const baseInitialDelay = 100; // Reduced from 200 to 100
    
    const typingSpeed = Math.max(baseTypingSpeed / scrollSpeed, 2); // Min 2ms (was 3ms)
    const pauseSpeed = Math.max(basePauseSpeed / scrollSpeed, 15); // Min 15ms (was 30ms)
    const initialDelay = Math.max(baseInitialDelay / scrollSpeed, 25); // Min 25ms (was 50ms)

    const timer = setTimeout(() => {
      if (currentLineIndex < typewriterLines.length) {
        const currentLine = typewriterLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.text.length) {
          // Still typing current line - type faster for longer text
          // Increment by different amounts based on text length for a smoother experience
          const increment = currentLine.text.length > 100 ? Math.ceil(3 * scrollSpeed) : Math.ceil(1 * scrollSpeed);
          setCurrentCharIndex(prev => Math.min(prev + increment, currentLine.text.length));
        } else {
          // Current line complete, move to next line
          setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
          }, pauseSpeed);
        }
      } else {
        // All lines complete
        setIsTypingComplete(true);
        setIsHeadingComplete(true);
      }
    }, currentCharIndex === 0 ? initialDelay : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isClient, hasStartedTyping, typewriterLines, scrollSpeed]);

  // What we do typewriter effect with scroll-based speed
  useEffect(() => {
    if (!isClient || !whatWeDoStarted) return;

    // Calculate dynamic timing based on scroll speed - Much faster values
    const baseTypingSpeed = 25; // Reduced from 50 to 25
    const basePauseSpeed = 30;  // Reduced from 50 to 30
    const baseInitialDelay = 50; // Reduced from 100 to 50
    const baseShowDelay = 100;  // Reduced from 200 to 100
    
    const typingSpeed = Math.max(baseTypingSpeed / scrollSpeed, 5); // Min 5ms (was 10ms)
    const pauseSpeed = Math.max(basePauseSpeed / scrollSpeed, 8); // Min 8ms (was 10ms)
    const initialDelay = Math.max(baseInitialDelay / scrollSpeed, 15); // Min 15ms (was 20ms)

    const timer = setTimeout(() => {
      if (whatWeDoLineIndex < whatWeDoLines.length) {
        const currentLine = whatWeDoLines[whatWeDoLineIndex];
        
        if (whatWeDoCharIndex < currentLine.text.length) {
          setWhatWeDoCharIndex(prev => prev + 1);
        } else {
          // Current line complete, move to next line
          setTimeout(() => {
            setWhatWeDoLineIndex(prev => prev + 1);
            setWhatWeDoCharIndex(0);
          }, pauseSpeed);
        }
      } else {
        // All lines complete
        setWhatWeDoComplete(true);
        // Show description heading after a short delay
        setTimeout(() => {
          setShowDescriptionHeading(true);
        }, Math.max(baseShowDelay / scrollSpeed, 30)); // Min 30ms delay (was 50ms)
      }
    }, whatWeDoCharIndex === 0 ? initialDelay : typingSpeed);

    return () => clearTimeout(timer);
  }, [whatWeDoLineIndex, whatWeDoCharIndex, isClient, whatWeDoStarted, whatWeDoLines, scrollSpeed]);

  // Start "What we do" typewriter when section comes into view
  useEffect(() => {
    if (isInView && !whatWeDoStarted) {
      setWhatWeDoStarted(true);
    }
  }, [isInView, whatWeDoStarted]);

  // Start description heading typewriter after "What we do" is complete
  useEffect(() => {
    if (showDescriptionHeading && !hasStartedTyping) {
      setHasStartedTyping(true);
    }
  }, [showDescriptionHeading, hasStartedTyping]);

  // No scroll locking needed

  // Professional scroll handling
  useEffect(() => {
    if (!isClient || !sectionRef.current || isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Check if section fills the entire viewport
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          const isFullScreen = sectionTop <= 0 && sectionBottom >= windowHeight;
          setSectionFullScreen(isFullScreen);

          // Reset progress when section is far from viewport (only if heading not complete)
          if (sectionTop > windowHeight && !isHeadingComplete && scrollProgress < 0.1) {
            setScrollProgress(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, isHeadingComplete, scrollProgress, isMobile]);

  // No scroll lock/unlock needed

  // Wheel handling removed - no need for scroll lock

  // No scroll prevention needed

  // When typing completes, update heading completion state
  useEffect(() => {
    if (isTypingComplete && !isHeadingComplete) {
      const delay = isMobile ? 200 : 300; // Short delay after typing completes
      const timeoutId = setTimeout(() => {
        setIsHeadingComplete(true);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [isTypingComplete, isHeadingComplete, isMobile]);

  // Professional scroll detection for triggering typewriter
  useEffect(() => {
    if (!isClient || !sectionRef.current) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate section position
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // Calculate scroll progress for use in other animations
          let progress = 0;
          
          if (sectionTop < windowHeight && sectionBottom > 0) {
            // Start when section is partially in viewport
            const sectionHeight = rect.height;
            const visibleHeight = Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0);
            progress = Math.min(visibleHeight / (windowHeight * 0.6), 1);
            
            // Professional easing
            const easingPower = isMobile ? 0.6 : 0.7;
            progress = Math.pow(progress, easingPower);
            
            // Ensure smooth progress without jumps
            progress = Math.max(0, Math.min(1, progress));
            
            // Start typewriter earlier in the view for longer text
            if (progress > 0.1 && showDescriptionHeading && !hasStartedTyping) {
              setHasStartedTyping(true);
            }
          }
          
          setScrollProgress(progress);
          
          // Content progress update after typing is complete
          if (isTypingComplete && !contentProgress) {
            const delay = isMobile ? 400 : 500;
            setTimeout(() => {
              setContentProgress(1);
            }, delay);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Always add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, isTypingComplete, hasStartedTyping, contentProgress, isMobile]);

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
      title: "AI-Integrated Mobile Apps",
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
      title: "GEO & SEO  Web Development",
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
      title: "Digital Marketing",
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
      className="relative min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white overflow-hidden py-8 sm:py-16 md:py-20 lg:py-32"
      style={{ 
        willChange: 'transform', // Hint browser for optimization
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {/* Section Heading at Very Top - Left Aligned */}
      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Project-style heading with typewriter effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: Math.max(0.8 / scrollSpeed, 0.2), 
              delay: Math.max(0.2 / scrollSpeed, 0.05) 
            }}
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-left leading-tight tracking-tight pt-1 sm:pt-4 min-h-[35px] sm:min-h-[60px] md:min-h-[60px] lg:min-h-[60px]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {whatWeDoLines.map((line, index) => {
              // Show completed lines fully
              if (index < whatWeDoLineIndex) {
                return (
                  <motion.span 
                    key={index}
                    className="block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ opacity: { duration: 0.3 } }}
                  >
                    <span className="text-white">What we </span>
                    <span className="text-[#00b4ab]">do?</span>
                  </motion.span>
                );
              }
              
              // Show current typing line
              if (index === whatWeDoLineIndex) {
                const currentText = line.text.slice(0, whatWeDoCharIndex);
                const whatWeText = "What we ";
                const doText = "do?";
                
                return (
                  <span key={index} className="block">
                    {whatWeDoCharIndex <= whatWeText.length ? (
                      // Still typing "What we "
                      <>
                        <span className="text-white">
                          {whatWeText.slice(0, whatWeDoCharIndex)}
                        </span>
                        {whatWeDoCharIndex < line.text.length && (
                          <span className="animate-pulse text-white">|</span>
                        )}
                      </>
                    ) : (
                      // Typing "do?"
                      <>
                        <span className="text-white">What we </span>
                        <span className="text-[#00b4ab]">
                          {doText.slice(0, whatWeDoCharIndex - whatWeText.length)}
                        </span>
                        {whatWeDoCharIndex < line.text.length && (
                          <span className="animate-pulse text-[#00b4ab]">|</span>
                        )}
                      </>
                    )}
                  </span>
                );
              }
              
              // Don't show future lines
              return null;
            })}
          </motion.h1>
        </div>
      </div>

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
              animate={isTypingComplete ? {
                // Static state after typewriter completes
                opacity: 0.3,
              } : {
                // Animated state during typewriter - speed up with scroll
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={isTypingComplete ? {
                duration: Math.max(0.5 / scrollSpeed, 0.1),
                ease: "easeOut"
              } : {
                duration: Math.max((3 + i * 0.5) / scrollSpeed, 0.5 + i * 0.1), // Faster particle animation
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.max((i * 0.2) / scrollSpeed, i * 0.05), // Faster delay
              }}
            />
          ))}
        </div>
      )}

      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Desktop/Tablet Grid Pattern */}
            <pattern id="neural-grid-services-desktop" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              {/* Vertical lines - normal thickness */}
              <path d="M 0 0 L 0 10" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
              {/* Horizontal lines - very reduced thickness */}
              <path d="M 0 0 L 10 0" fill="none" stroke="#00b4ab" strokeWidth="0.05"/>
            </pattern>
            {/* Mobile Grid Pattern - Much more rows, same columns */}
            <pattern id="neural-grid-services-mobile" x="0" y="0" width="10" height="2.5" patternUnits="userSpaceOnUse">
              {/* Vertical lines - normal thickness */}
              <path d="M 0 0 L 0 2.5" fill="none" stroke="#00b4ab" strokeWidth="0.2"/>
              {/* Horizontal lines - very reduced thickness */}
              <path d="M 0 0 L 10 0" fill="none" stroke="#00b4ab" strokeWidth="0.05"/>
            </pattern>
          </defs>
          {/* Show desktop pattern on larger screens */}
          <rect className="hidden sm:block" width="100%" height="100%" fill="url(#neural-grid-services-desktop)" />
          {/* Show mobile pattern on mobile screens */}
          <rect className="block sm:hidden" width="100%" height="100%" fill="url(#neural-grid-services-mobile)" />
        </svg>
      </div>

      {/* Optimized ambient glow effect - mobile-safe */}
      {isClient && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00b4ab]/20 to-[#008a82]/20 blur-3xl"
          animate={!isMobile ? {
            x: mousePosition.x * 80 - 192, // Reduced multiplier for smoother performance
            y: mousePosition.y * 80 - 192,
          } : {
            x: -96,
            y: -96,
          }}
          transition={{ 
            type: "spring", 
            stiffness: Math.min(40 * scrollSpeed, 100), // Increase responsiveness with scroll speed
            damping: Math.max(25 - (scrollSpeed * 2), 15) // Reduce damping for faster movement
          }} // Optimized spring values with scroll responsiveness
        />
      )}

        <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">          {/* Header Section */}
          <motion.div 
            className="flex items-center justify-start min-h-[30vh] sm:min-h-screen -mt-16 sm:-mt-40 md:-mt-48 lg:-mt-56"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            style={{
              // Prevent layout shift during transition
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            {/* Description heading with Typewriter Effect - only show after "What we do" is complete */}
            {showDescriptionHeading && (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: Math.max(0.8 / scrollSpeed, 0.2), 
                  delay: Math.max(0.2 / scrollSpeed, 0.05) 
                }}
                className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-2 sm:mb-8 text-white leading-relaxed tracking-wide min-h-[40px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {typewriterLines.map((line, lineIndex) => {
                  // Split the text into words for the dark/white reveal effect
                  const words = line.text.split(' ');
                  // Calculate visible word count based on typing progress
                  const visibleWordCount = !isTypingComplete 
                    ? Math.ceil((currentCharIndex / line.text.length) * words.length) 
                    : words.length;
                  
                  return (
                    <span 
                      key={lineIndex}
                      className="block text-white"
                      style={{ color: '#ffffff' }}
                    >
                      {!isTypingComplete && currentLineIndex === lineIndex ? (
                        <>
                          {words.map((word, wordIndex) => {
                            const isRevealed = wordIndex < visibleWordCount;
                            
                            return (
                              <span
                                key={wordIndex}
                                className="inline-block mr-3"
                                style={{ 
                                  color: isRevealed ? '#ffffff' : '#374151',
                                  transition: 'color 0.05s ease-out'
                                }}
                              >
                                {word}
                              </span>
                            );
                          })}
                          {/* Typing cursor - only show during active typing */}
                          {currentCharIndex < line.text.length && (
                            <motion.span
                              className="inline-block w-1 h-[0.8em] bg-[#00b4ab] ml-1"
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                            />
                          )}
                        </>
                      ) : (
                        // Final state - simple white text with no animations
                        line.text
                      )}
                    </span>
                  );
                })}
              </motion.h1>
            )}
          </motion.div>

          {/* Services Section - Timeline Layout */}
          <motion.div 
            className="mb-6 sm:mb-20 -mt-16 sm:-mt-40 md:-mt-48 lg:-mt-56"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: isTypingComplete ? 1 : 0,
              y: isTypingComplete ? 0 : 30
            }}
            transition={{ 
              duration: Math.max(0.4 / scrollSpeed, 0.1),
              delay: isTypingComplete ? Math.max(0.2 / scrollSpeed, 0.05) : 0,
              ease: "easeOut"
            }}
          >
            {/* Mobile Timeline - Centered Vertical with Alternating Sides */}
            <div className="block lg:hidden">
              <div className="relative px-2 sm:px-4">
                {/* Vertical Timeline Line - Centered */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b4ab] via-[#00b4ab]/60 to-transparent transform -translate-x-1/2"></div>
                
                {/* Timeline Items */}
                <div className="space-y-4 sm:space-y-6">
                  {services.map((service, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                      <motion.div
                        key={index}
                        className={`relative flex ${isLeft ? 'justify-start pr-4 sm:pr-6' : 'justify-end pl-4 sm:pl-6'}`}
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        animate={{ 
                          opacity: isTypingComplete ? 1 : 0,
                          x: isTypingComplete ? 0 : (isLeft ? -50 : 50)
                        }}
                        transition={{ 
                          duration: Math.max(0.6 / scrollSpeed, 0.15),
                          delay: isTypingComplete ? Math.max((0.3 + index * 0.15) / scrollSpeed, 0.1 + index * 0.05) : 0,
                          type: "spring",
                          stiffness: Math.min(80 * scrollSpeed, 200),
                          damping: Math.max(25 - (scrollSpeed * 2), 15)
                        }}
                      >
                        {/* Timeline Node - Centered */}
                        <div className="absolute left-1/2 top-3 sm:top-4 w-3 h-3 sm:w-4 sm:h-4 bg-[#00b4ab] rounded-full border-2 sm:border-3 border-gray-900 shadow-lg z-10 transform -translate-x-1/2">
                          <div className="absolute inset-0.5 bg-white rounded-full animate-pulse"></div>
                        </div>
                        
                        {/* Content Panel - Reduced content */}
                        <div className={`w-[45%] bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-700/50 hover:border-[#00b4ab]/30 p-3 sm:p-4 shadow-xl hover:shadow-xl hover:shadow-[#00b4ab]/10 transition-all duration-500`}>
                          {/* Icon and Category */}
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(service.category)} text-white shadow-lg`}>
                              <div className="w-4 h-4 sm:w-5 sm:h-5">
                                {getCategoryIcon(service.icon)}
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(service.category)} shadow-lg`}>
                              {service.category.toUpperCase()}
                            </span>
                          </div>

                          {/* Title - Full heading for mobile */}
                          <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2 hover:text-[#00b4ab] transition-colors duration-300 line-clamp-2">
                            {service.title}
                          </h4>
                          
                          {/* Description - Shortened */}
                          <p className="text-gray-300 mb-2 sm:mb-3 leading-relaxed text-[10px] sm:text-xs line-clamp-2">
                            {service.description.slice(0, 80)}...
                          </p>

                          {/* Features - Only 1 feature */}
                          <div className="mb-2 sm:mb-3">
                            <div className="flex items-start gap-1.5 sm:gap-2">
                              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#00b4ab] mt-1.5 flex-shrink-0" />
                              <span className="text-[9px] sm:text-xs text-gray-400 leading-relaxed line-clamp-1">
                                {service.features[0]}
                              </span>
                            </div>
                          </div>

                          {/* Technologies - Only 2 technologies */}
                          <div>
                            <div className="flex flex-wrap gap-0.5 sm:gap-1">
                              {service.technologies.slice(0, 2).map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-1.5 sm:px-2 py-0.5 bg-gray-800/60 backdrop-blur-sm text-gray-300 text-[8px] sm:text-xs rounded border border-gray-700/50"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Connection Line to Timeline */}
                        <div className={`absolute top-4 sm:top-6 ${isLeft ? 'right-[45%]' : 'left-[45%]'} w-4 sm:w-6 h-0.5 bg-gradient-to-${isLeft ? 'r' : 'l'} from-[#00b4ab]/60 to-transparent`}></div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Timeline - Horizontal */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Horizontal Timeline Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00b4ab]/60 to-transparent transform -translate-y-1/2"></div>
                
                {/* Timeline Items - All same size and aligned */}
                <div className="grid grid-cols-3 gap-8">
                  {services.slice(0, 3).map((service, index) => (
                    <motion.div
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: isTypingComplete ? 1 : 0,
                        y: isTypingComplete ? 0 : 50
                      }}
                      transition={{ 
                        duration: Math.max(0.6 / scrollSpeed, 0.15),
                        delay: isTypingComplete ? Math.max((0.4 + index * 0.2) / scrollSpeed, 0.1 + index * 0.1) : 0,
                        type: "spring",
                        stiffness: Math.min(80 * scrollSpeed, 200),
                        damping: Math.max(25 - (scrollSpeed * 2), 15)
                      }}
                    >
                      {/* Content Panel - Same height for all cards */}
                      <div className="mt-16">
                        <div className="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#00b4ab]/30 p-8 shadow-xl hover:shadow-2xl hover:shadow-[#00b4ab]/10 transition-all duration-500 h-[480px] flex flex-col">
                          {/* Icon and Category */}
                          <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(service.category)} text-white shadow-lg`}>
                              {getCategoryIcon(service.icon)}
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(service.category)} shadow-lg`}>
                              {service.category.toUpperCase()}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="text-2xl font-bold text-white mb-4 hover:text-[#00b4ab] transition-colors duration-300">
                            {service.title}
                          </h4>
                          
                          {/* Description */}
                          <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                            {service.description}
                          </p>

                          {/* Features */}
                          <div className="mb-6 flex-1">
                            <h5 className="text-sm font-semibold text-gray-200 mb-3">Key Features:</h5>
                            <div className="space-y-3">
                              {service.features.slice(0, 2).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ab] mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-400 leading-relaxed">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mt-auto">
                            <h5 className="text-sm font-semibold text-gray-200 mb-3">Tech:</h5>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.slice(0, 3).map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-gray-800/60 backdrop-blur-sm text-gray-300 text-xs rounded-lg border border-gray-700/50"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Second Row for remaining services - Same alignment */}
                {services.length > 3 && (
                  <div className="grid grid-cols-3 gap-8 mt-32">
                    {services.slice(3).map((service, index) => (
                      <motion.div
                        key={index + 3}
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ 
                          opacity: isTypingComplete ? 1 : 0,
                          y: isTypingComplete ? 0 : 50
                        }}
                        transition={{ 
                          duration: Math.max(0.6 / scrollSpeed, 0.15),
                          delay: isTypingComplete ? Math.max((1.0 + index * 0.2) / scrollSpeed, 0.4 + index * 0.1) : 0,
                          type: "spring",
                          stiffness: Math.min(80 * scrollSpeed, 200),
                          damping: Math.max(25 - (scrollSpeed * 2), 15)
                        }}
                      >
                        {/* Content Panel - Same height for all cards */}
                        <div className="mt-16">
                          <div className="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#00b4ab]/30 p-8 shadow-xl hover:shadow-2xl hover:shadow-[#00b4ab]/10 transition-all duration-500 h-[480px] flex flex-col">
                            {/* Icon and Category */}
                            <div className="flex items-center justify-between mb-6">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(service.category)} text-white shadow-lg`}>
                                {getCategoryIcon(service.icon)}
                              </div>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(service.category)} shadow-lg`}>
                                {service.category.toUpperCase()}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-2xl font-bold text-white mb-4 hover:text-[#00b4ab] transition-colors duration-300">
                              {service.title}
                            </h4>
                            
                            {/* Description */}
                            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                              {service.description}
                            </p>

                            {/* Features */}
                            <div className="mb-6 flex-1">
                              <h5 className="text-sm font-semibold text-gray-200 mb-3">Key Features:</h5>
                              <div className="space-y-3">
                                {service.features.slice(0, 2).map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ab] mt-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-400 leading-relaxed">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Technologies */}
                            <div className="mt-auto">
                              <h5 className="text-sm font-semibold text-gray-200 mb-3">Tech:</h5>
                              <div className="flex flex-wrap gap-2">
                                {service.technologies.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-gray-800/60 backdrop-blur-sm text-gray-300 text-xs rounded-lg border border-gray-700/50"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isTypingComplete ? 1 : 0,
              y: isTypingComplete ? 0 : 20
            }}
            transition={{ 
              duration: Math.max(0.3 / scrollSpeed, 0.08), // Reduced from 0.6 to 0.3
              delay: isTypingComplete ? Math.max(0.6 / scrollSpeed, 0.15) : 0, // Reduced from 1.2 to 0.6
              ease: "easeOut"
            }}
          >
            {/* CTA Section */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-xl border border-gray-700/50 hover:border-[#00b4ab]/30 transition-all duration-500 p-3 sm:p-8 lg:p-12 mb-3 sm:mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isTypingComplete ? 1 : 0,
                y: isTypingComplete ? 0 : 30
              }}
              transition={{ 
                duration: Math.max(0.25 / scrollSpeed, 0.06), // Reduced from 0.4 to 0.25
                delay: isTypingComplete ? Math.max(0.8 / scrollSpeed, 0.2) : 0 // Reduced from 1.4 to 0.8
              }} // Much faster CTA card timing
            >
              <h4 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                Ready to Transform Your Business?
              </h4>
              <p className="text-gray-300 mb-3 sm:mb-8 leading-relaxed text-xs sm:text-base">
                Let's discuss how our digital solutions can accelerate your growth and drive innovation.
              </p>
              
              {/* Action Buttons - Hero section style */}
              <div className="flex flex-row gap-3 sm:gap-6 justify-center items-center">
                <motion.button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center px-3 py-1.5 sm:px-6 sm:py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:border-[#00b4ab] hover:bg-[#00b4ab]/10 transition-all duration-300 group relative overflow-hidden text-xs sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#00b4ab]">
                    Start Your Project
                  </span>
                  <svg className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00b4ab] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00b4ab]/0 via-[#00b4ab]/5 to-[#00b4ab]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  className="text-xs sm:text-base font-medium group relative overflow-hidden px-3 py-2 sm:px-5 sm:py-3 rounded-sm transition-colors duration-200 text-white hover:text-[#00b4ab]"
                  style={{ pointerEvents: 'auto' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="inline-block px-0.5 sm:px-1.5">
                    <span className="relative">
                      <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">
                        Learn More
                      </span>
                      <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#00b4ab] group-hover:-translate-y-0.5 group-hover:opacity-100">
                        Learn More
                      </span>
                    </span>
                    <span className="absolute left-0.5 sm:left-2 -top-1 sm:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 sm:group-hover:translate-y-5 text-[#00b4ab]">(</span>
                    <span className="absolute right-0.5 sm:right-2 -top-1 sm:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-3 sm:group-hover:translate-y-5 text-[#00b4ab]">)</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Secondary Links */}
            <motion.div 
              className="flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: Math.max(0.25 / scrollSpeed, 0.06), // Reduced from 0.4 to 0.25
                delay: Math.max(1.0 / scrollSpeed, 0.25) // Reduced from 1.8 to 1.0
              }} // Much faster secondary links timing
            >
              <motion.a
                href="/careers"
                className="group relative inline-flex items-center text-base sm:text-lg font-medium text-gray-300 pb-1 hover:text-[#00b4ab] transition-colors duration-300"
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
