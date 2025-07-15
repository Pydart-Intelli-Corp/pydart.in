'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function About() {
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  // Company values
  const values = [
    {
      id: 'excellence',
      title: 'Excellence',
      description: 'We relentlessly pursue perfection in everything we do, from breakthrough engineering to meticulous client service, establishing benchmarks that elevate entire industries.',
      icon: '★',
    },
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'We challenge conventional thinking and embrace calculated risks to develop breakthrough solutions that create unprecedented value and open new frontiers for our clients.',
      icon: '💡',
    },
    {
      id: 'integrity',
      title: 'Integrity',
      description: 'We operate with unwavering ethical standards, ensuring every business decision reflects our commitment to honesty, accountability, and long-term trusted partnerships.',
      icon: '🛡️',
    }
  ];
  
  // Stats data
  const stats = [
    { value: "5+", label: "AI Solutions" },
    { value: "3+", label: "Industries Served" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support" }
  ];
  
  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Modern about section with split design */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#FF4D00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#FF4D00]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column - About content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center mb-3">
                  <span className="h-px w-6 bg-[#FF4D00] mr-3"></span>
                  <span className="text-[#FF4D00] font-medium text-sm uppercase tracking-wider">About Us</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Transforming Business <span className="text-[#FF4D00]">Through AI</span> Innovation
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Pydart AI Corp is at the forefront of AI-driven business transformation, crafting intelligent solutions that enhance efficiency, drive growth, and create sustainable competitive advantages for our clients across industries.
              </p>
              
              <div className="border-l-4 border-[#FF4D00] pl-6 py-2">
                <p className="text-xl md:text-2xl font-medium text-gray-800 italic">
                  "Our mission is to drive transformative growth by delivering innovative AI solutions that bridge present limitations and future possibilities."
                </p>
              </div>
              
              <Link href="/about" className="group">
                <div className="inline-flex items-center justify-between bg-[#FF4D00] hover:bg-[#FF6D30] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#FF4D00]/20 transform hover:-translate-y-1 transition-all duration-300 group-hover:pr-8">
                  <span className="font-medium">Learn More About Our Approach</span>
                  <svg className="w-5 h-5 ml-3 group-hover:ml-4 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
            
            {/* Right column - Stats with modern cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:border-[#FF4D00]/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-[#FF4D00]/10 flex items-center justify-center mb-4 transition-colors duration-300">
                      <span className="text-gray-500 group-hover:text-[#FF4D00] text-xl transition-colors duration-300">
                        {index === 0 && "🚀"}
                        {index === 1 && "🌐"}
                        {index === 2 && "⭐"}
                        {index === 3 && "💬"}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Core values section with modern design */}
      <div className="bg-gray-50 py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="inline-flex items-center justify-center mb-3">
                <span className="h-px w-6 bg-[#FF4D00] mr-3"></span>
                <span className="text-[#FF4D00] font-medium text-sm uppercase tracking-wider">Our Values</span>
                <span className="h-px w-6 bg-[#FF4D00] ml-3"></span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Principles That <span className="text-[#FF4D00]">Drive Us</span> Forward
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-1 bg-[#FF4D00]"></div>
                  <div className="p-8">
                    <div className="w-14 h-14 bg-[#FF4D00]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[#FF4D00] text-2xl">
                        {value.icon}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#FF4D00] transition-colors duration-300">{value.title}</h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
