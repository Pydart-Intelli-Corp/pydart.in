'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
  technologies: string[];
  metrics: { label: string; value: string; }[];
  color: string;
}

const services: Service[] = [
  {
    title: "Website Development",
    description: "Custom-built, responsive websites that deliver exceptional user experiences across all devices. From corporate sites to complex web applications.",
    icon: "/assets/icons/icon_development.png",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"],
    metrics: [
      { label: "Page Speed", value: "99%" },
      { label: "Performance", value: "A+" },
      { label: "SEO Score", value: "100" }
    ],
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "iOS & Android Development",
    description: "Native and cross-platform mobile applications that provide seamless experiences for your users on any device.",
    icon: "/assets/icons/icon_ui.png",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    metrics: [
      { label: "App Store", value: "5★" },
      { label: "Downloads", value: "1M+" },
      { label: "Retention", value: "95%" }
    ],
    color: "from-green-500 to-teal-600"
  },
  {
    title: "UI/UX Design",
    description: "Digital product experiences that engage, convert, and keep users coming back. Every interface is crafted to bridge user needs with business goals.",
    icon: "/assets/icons/creativity.png",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
    metrics: [
      { label: "Conversion", value: "+120%" },
      { label: "User Satisfaction", value: "4.9/5" },
      { label: "Design Awards", value: "15+" }
    ],
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to increase your brand visibility, drive traffic, and convert prospects into customers.",
    icon: "/assets/icons/map.png",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
    technologies: ["Google Ads", "Meta Ads", "SEO", "Analytics"],
    metrics: [
      { label: "ROI", value: "350%" },
      { label: "Traffic Growth", value: "+400%" },
      { label: "Lead Generation", value: "+250%" }
    ],
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Graphic Design",
    description: "Eye-catching visual designs that communicate your brand message effectively and leave a lasting impression on your audience.",
    icon: "/assets/icons/inspiration.png",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop",
    technologies: ["Photoshop", "Illustrator", "InDesign", "After Effects"],
    metrics: [
      { label: "Brand Recognition", value: "+180%" },
      { label: "Engagement", value: "+220%" },
      { label: "Client Satisfaction", value: "100%" }
    ],
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Social Media Management",
    description: "Comprehensive social media strategies to build your online presence, engage with your audience, and drive meaningful business results.",
    icon: "/assets/icons/customer_focus.png",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
    technologies: ["Hootsuite", "Buffer", "Canva", "Analytics"],
    metrics: [
      { label: "Followers Growth", value: "+300%" },
      { label: "Engagement Rate", value: "8.5%" },
      { label: "Reach", value: "2M+" }
    ],
    color: "from-teal-500 to-cyan-600"
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const isHovered = hoveredCard === index;
    const isSelected = selectedService === index;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 100, rotateX: -30 }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            duration: 0.8, 
            delay: index * 0.1,
            type: "spring",
            bounce: 0.3
          }
        }}
        whileHover={{ 
          y: -20,
          rotateY: 5,
          rotateX: 5,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        viewport={{ once: true, margin: "-100px" }}
        className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-700 cursor-pointer ${
          isSelected 
            ? 'bg-white/20 border-white/30 shadow-2xl shadow-white/20' 
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }`}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => setSelectedService(isSelected ? null : index)}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
          animate={{
            background: isHovered 
              ? `linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))` 
              : `linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))`
          }}
        />
        
        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: "100%",
                  opacity: 0 
                }}
                animate={{ 
                  y: "-20%",
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
        
        {/* Image section with 3D effect */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1, rotateZ: 2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image 
              src={service.image} 
              alt={service.title} 
              width={600} 
              height={400} 
              className="object-cover w-full h-full"
            />
          </motion.div>
          
          {/* Floating icon with glass morphism */}
          <motion.div
            className="absolute top-6 left-6 w-16 h-16 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 flex items-center justify-center shadow-xl"
            whileHover={{ 
              scale: 1.2, 
              rotate: 10,
              y: -5
            }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Image 
              src={service.icon} 
              alt="" 
              width={32} 
              height={32} 
              className="w-8 h-8 object-contain filter brightness-110"
            />
          </motion.div>
          
          {/* Performance metrics floating badges */}
          <div className="absolute top-6 right-6 space-y-2">
            {service.metrics.slice(0, 2).map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 50 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white text-xs font-medium"
              >
                {metric.label}: {metric.value}
              </motion.div>
            ))}
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        {/* Content section */}
        <div className="p-8 relative">
          <motion.h3 
            className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300"
            layout
          >
            {service.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-6 leading-relaxed"
            layout
          >
            {service.description}
          </motion.p>
          
          {/* Technology badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          {/* Expandable metrics section */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  {service.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-gray-400 text-xs">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Action button with magnetic effect */}
          <motion.button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white font-medium backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/30 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSelected ? 'View Details' : 'Explore Service'}
          </motion.button>
        </div>
        
        {/* Magnetic cursor follower */}
        {isHovered && (
          <motion.div
            className="absolute w-4 h-4 bg-white/60 rounded-full pointer-events-none"
            animate={{
              x: mousePosition.x - (containerRef.current?.getBoundingClientRect().left || 0) - 8,
              y: mousePosition.y - (containerRef.current?.getBoundingClientRect().top || 0) - 8,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="min-h-screen py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3), transparent 50%),
          linear-gradient(135deg, #0F0F23 0%, #1a1a2e 50%, #16213e 100%)
        `
      }}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(120, 119, 198, 0.4), transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(255, 119, 198, 0.4), transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(119, 198, 255, 0.4), transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(120, 119, 198, 0.4), transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with advanced typography */}
        <motion.div
          className="text-center mb-20"
          style={{ y: ySpring, opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block text-sm font-semibold tracking-[0.3em] uppercase text-white/60 mb-6"
              whileInView={{ letterSpacing: "0.5em" }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Our Expertise
            </motion.span>
            
            <motion.h2 
              className="text-6xl md:text-7xl font-black mb-8 leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Revolutionary
              </span>
              <br />
              <span className="text-white">Services</span>
            </motion.h2>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            
            <motion.p 
              className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Cutting-edge solutions crafted with precision, powered by innovation, 
              and designed to transform your digital presence into extraordinary experiences.
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Services grid with masonry layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
        
        {/* Call to action with magnetic button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/service-showcase">
            <motion.button
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10 flex items-center">
                Explore All Services
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 ml-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
