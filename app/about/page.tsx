"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import Footer from '../components/Footer';

export default function DetailedAbout() {
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  // Team member data - from Flutter app content
  const team = [
    {
      name: "Tishnu Thankappan",
      position: "Founder / CEO",
      image: "/assets/images/team/tishnu.jpg",
      quote: "With a strong background in research and development in embedded systems, as well as expertise in Flutter and .NET.",
      linkedin: "https://linkedin.com/in/tishnuthankappan",
      email: "tishnu@pydart.io"
    },
    {
      name: "Adwaith Raj PR",
      position: "Co-Founder / CTO",
      image: "/assets/images/team/adwaith.jpg",
      quote: "Expertise in cloud technologies and a keen understanding of the latest industry trends.",
      linkedin: "https://linkedin.com/in/adwaithraj",
      email: "adwaith@pydart.io"
    },
    {
      name: "Akshara Ravi",
      position: "Co-Founder / CMO",
      image: "/assets/images/team/akshara.jpg",
      quote: "Transforming brands with agile digital strategies and data-driven innovation.",
      linkedin: "https://linkedin.com/in/aksharakravi",
      email: "akshara@pydart.io"
    }
  ];
  
  // Company achievements and project timeline
  const achievements = [
    {
      year: "Feb 2025",
      title: "Company Founded",
      description: "Pydart Intelli Corp was established in India with a vision to transform industries through innovative AI solutions."
    },
    {
      year: "Apr 2025",
      title: "Project Inception",
      description: "Initiated development of two innovative AI-powered projects focused on business transformation."
    },
    {
      year: "Jul 2025",
      title: "Initial Client Partnerships",
      description: "Began collaborating with select businesses to develop tailored AI solutions for their unique challenges."
    },
    {
      year: "Dec 2025",
      title: "MVP Launch",
      description: "Scheduled launch of our Minimum Viable Product, showcasing our AI capabilities and technology stack."
    },
    {
      year: "Q1 2026",
      title: "Indian Market Expansion",
      description: "Strategic plan to scale operations and expand our presence across the Indian market."
    }
  ];
  
  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Hero section with parallax effect */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/others/whoweare.png" 
            alt="About Pydart" 
            fill 
            className="object-cover object-center scale-105"
            priority
            style={{
              transformOrigin: 'center',
              transform: 'scale(1.1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-950"></div>
          
          {/* Modern geometric patterns */}
          <div className="absolute inset-0 bg-[url('/assets/images/patterns/grid.svg')] opacity-10"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center mb-6">
              <div className="h-px w-12 bg-[#00b4ab] mr-4"></div>
              <span className="text-[#00b4ab] font-medium tracking-widest text-sm uppercase">Our Story</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="block">Defining the future of</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00b4ab] to-[#008a82]">AI innovation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl">
              Pioneers in technology innovation, delivering transformative solutions that empower businesses to achieve their boldest ambitions.
            </p>
            
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center"
              >
                <div className="h-14 w-1 bg-[#00b4ab] mr-4"></div>
                <div>
                  <p className="text-white/60 text-sm">Founded</p>
                  <p className="text-white font-bold">February 2025</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center"
              >
                <div className="h-14 w-1 bg-[#00b4ab] mr-4"></div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white font-bold">India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
      
      {/* Our Story section with modern card layout */}
      <section ref={ref} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-r from-[#00b4ab]/10 to-[#008a82]/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-gradient-to-r from-[#008a82]/10 to-[#00b4ab]/10 blur-3xl rounded-full"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="mb-16 text-center">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center mb-3"
                >
                  <div className="h-px w-6 bg-[#00b4ab] mr-3"></div>
                  <span className="text-[#00b4ab] font-medium text-sm uppercase tracking-wider">Our Journey</span>
                  <div className="h-px w-6 bg-[#00b4ab] ml-3"></div>
                </motion.div>
                
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  A Journey of <span className="text-[#00b4ab]">Innovation</span> and <span className="text-[#008a82]">Growth</span>
                </motion.h2>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 p-8 md:p-12">
                <div className="prose prose-lg mx-auto prose-invert max-w-none">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/90 leading-relaxed mb-6"
                  >
                    Founded in February 2025, Pydart Intelli Corp is an AI startup based in India with a simple yet ambitious vision: to create innovative AI-powered technology solutions that transform industries and empower businesses to achieve their boldest ambitions.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg md:text-xl text-white/90 leading-relaxed mb-6"
                  >
                    Currently, we're focused on developing two groundbreaking projects that leverage cutting-edge artificial intelligence to solve complex business challenges. Our team of AI specialists, developers, and strategists works collaboratively to deliver digital solutions that drive business development and create lasting competitive advantages.
                  </motion.p>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 leading-relaxed"
                  >
                    At Pydart Intelli Corp, we believe that AI technology should be a catalyst for positive change, making businesses more efficient, innovative, and responsive to market demands. This belief guides our approach to developing tailored AI solutions for our clients across industries.
                  </motion.p>
                </div>
              </div>
            </div>
            
            {/* Timeline section with modern design */}
            <div className="mt-24 max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Our Journey Through the Years
                </h3>
                <p className="text-white/70 max-w-2xl mx-auto">
                  From our founding to our future vision, explore the key milestones that have shaped our growth.
                </p>
              </motion.div>
              
              <div className="relative">
                {/* Modern timeline design */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#00b4ab] via-[#00b4ab]/70 to-[#008a82]"></div>
                
                {/* Timeline items */}
                {achievements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px 0px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex md:items-center mb-16 md:mb-24 ${
                      index % 2 === 0 
                        ? 'md:flex-row flex-col' 
                        : 'md:flex-row-reverse flex-col'
                    }`}
                  >
                    <div className="md:w-1/2 hidden md:block"></div>
                    
                    {/* Timeline node */}
                    <div className="absolute md:left-1/2 left-4 md:transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#00b4ab] to-[#008a82] z-10 shadow-lg shadow-[#00b4ab]/20 md:top-0 top-0">
                      <span className="text-white font-bold text-xs md:text-sm">{item.year}</span>
                    </div>
                    
                    {/* Content card with glass effect */}
                    <div className={`md:w-1/2 w-full p-6 md:p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800/50 hover:border-[#00b4ab]/50 transition-all duration-300 md:mt-0 mt-4 ml-12 md:ml-0 md:mr-0 ${
                      index % 2 === 0 
                        ? 'md:ml-8' 
                        : 'md:mr-8'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.03), transparent 250px)'
                    }}
                    >
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h4>
                      <p className="text-white/80 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Leadership Team - Modern Cards with Hover Effects */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-950"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center mb-3"
              >
                <div className="h-px w-6 bg-[#00b4ab] mr-3"></div>
                <span className="text-[#00b4ab] font-medium text-sm uppercase tracking-wider">Our Team</span>
                <div className="h-px w-6 bg-[#00b4ab] ml-3"></div>
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Meet Our <span className="text-[#00b4ab]">Leadership</span> Team
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/70 max-w-2xl mx-auto"
              >
                Visionary experts leading the way in AI innovation and technological advancement
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  {/* Modern card with hover effect */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00b4ab]/80 to-[#008a82]/80 opacity-0 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                    
                    {/* Image container with aspect ratio */}
                    <div className="aspect-[3/4] relative">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Content overlay that slides up on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {member.name}
                      </h3>
                      
                      <p className="text-[#00b4ab] font-medium mb-4">
                        {member.position}
                      </p>
                      
                      <p className="text-white/80 mb-6 text-sm transition-opacity duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                        {member.quote}
                      </p>
                      
                      <div className="flex items-center space-x-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 hover:bg-[#00b4ab] rounded-full transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a 
                          href={`mailto:${member.email}`} 
                          className="p-2 bg-white/10 hover:bg-[#00b4ab] rounded-full transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h-16c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Values section - Modern Split Design */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 77, 0, 0.1) 0%, rgba(230, 68, 0, 0.05) 50%, transparent 70%)' }}></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center mb-3"
              >
                <div className="h-px w-6 bg-[#00b4ab] mr-3"></div>
                <span className="text-[#00b4ab] font-medium text-sm uppercase tracking-wider">Our Philosophy</span>
                <div className="h-px w-6 bg-[#00b4ab] ml-3"></div>
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                What <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00b4ab] to-[#008a82]">Drives Us</span>
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col h-full"
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-800/50 h-full overflow-hidden group hover:border-[#00b4ab]/30 transition-all duration-500">
                  {/* Accent corner */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00b4ab]/10 rounded-full blur-xl group-hover:bg-[#00b4ab]/20 transition-colors duration-500"></div>
                  
                  <div className="p-4 bg-[#00b4ab]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-[#00b4ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Vision</h3>
                  
                  <div className="mb-8 h-1 w-16 bg-gradient-to-r from-[#00b4ab] to-[#008a82]"></div>
                  
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    To be the global leader in creating transformative AI technology solutions that reshape industries and improve lives around the world.
                  </p>
                  
                  <p className="text-white/70 leading-relaxed mt-auto">
                    We envision a future where AI technology serves humanity's highest aspirations, empowering organizations to solve the world's most pressing challenges through innovation, creativity, and technical excellence.
                  </p>
                </div>
              </motion.div>
              
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col h-full"
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-800/50 h-full overflow-hidden group hover:border-[#008a82]/30 transition-all duration-500">
                  {/* Accent corner */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#008a82]/10 rounded-full blur-xl group-hover:bg-[#008a82]/20 transition-colors duration-500"></div>
                  
                  <div className="p-4 bg-[#008a82]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-[#008a82]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Mission</h3>
                  
                  <div className="mb-8 h-1 w-16 bg-gradient-to-r from-[#008a82] to-[#00b4ab]"></div>
                  
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    To drive transformative growth for our clients by delivering innovative AI technology solutions that bridge present limitations and future possibilities.
                  </p>
                  
                  <p className="text-white/70 leading-relaxed mt-auto">
                    We create enduring value while upholding the highest standards of excellence and integrity, ensuring that every solution we deliver advances our clients' strategic objectives and contributes to their long-term success.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack - Modern Design with Gradient */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('/assets/images/patterns/circuit.svg')] opacity-20"></div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-950 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-950 to-transparent"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-950 p-8 md:p-16 rounded-3xl shadow-2xl border border-gray-800/50 overflow-hidden relative">
              {/* Gradient orb */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#00b4ab]/20 to-[#008a82]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#008a82]/20 to-[#00b4ab]/20 rounded-full blur-3xl"></div>
              
              {/* Circuit pattern overlay */}
              <div className="absolute inset-0 bg-[url('/assets/images/patterns/circuit.svg')] opacity-5"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00b4ab] to-[#008a82]">Technology</span> Stack
                </h2>
                
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  We leverage cutting-edge technologies to deliver powerful AI solutions that drive business transformation.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-12">
                  {/* Tech stack items */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-[#00b4ab]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.35,17.13C11.23,17.13 11.09,17.07 10.99,16.95L7.81,13.77C7.61,13.56 7.61,13.24 7.81,13.04C8.02,12.83 8.34,12.83 8.54,13.04L11.35,15.85L18.11,9.1C18.31,8.89 18.63,8.89 18.84,9.1C19.05,9.31 19.05,9.63 18.84,9.83L11.71,16.95C11.61,17.07 11.47,17.13 11.35,17.13Z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">AI & ML</h3>
                    <p className="text-white/60 text-sm text-center">Advanced machine learning algorithms</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-[#00b4ab]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Cloud</h3>
                    <p className="text-white/60 text-sm text-center">Scalable cloud infrastructure</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-[#00b4ab]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.45,15.18L22,7.31V19L22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L16.74,12.5L10.23,8.75L4.31,19H6.57L10.96,11.44L17.45,15.18Z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Analytics</h3>
                    <p className="text-white/60 text-sm text-center">Advanced data analytics solutions</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-[#00b4ab]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Security</h3>
                    <p className="text-white/60 text-sm text-center">Enterprise-grade security protocols</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>      </section>
      
      {/* Footer */}
      <Footer />
      
    </main>
  );
}
