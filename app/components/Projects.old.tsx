'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  status: string;
  timeline: string;
  highlights: string[];
  progress: number;
  category: 'MVP' | 'Development' | 'Partnership';
}

interface Problem {
  title: string;
  description: string;
  icon: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}



const stibeProblems: Problem[] = [
  {
    title: "Long Waits & Unpredictable Schedules",
    description: "Customers face lengthy waiting times and uncertain appointment availability",
    icon: "⏰"
  },
  {
    title: "No Central Platform",
    description: "Fragmented services across salons, freelancers, and pet grooming",
    icon: "🔍"
  },
  {
    title: "Trust & Pricing Issues",
    description: "Lack of transparency in pricing and concerns about service quality",
    icon: "❓"
  },
  {
    title: "Discovery Challenges",
    description: "Talented freelancers struggle to be found by potential clients",
    icon: "🚫"
  }
];

const stibeFeatures: Feature[] = [
  {
    title: "Real-Time Booking",
    description: "Instant appointment scheduling with live availability",
    icon: "📅"
  },
  {
    title: "At-Home Services",
    description: "Professional grooming for people & pets at your doorstep",
    icon: "🏠"
  },
  {
    title: "Video Portfolios",
    description: "Skill showcasing through engaging video reels",
    icon: "🎥"
  },
  {
    title: "UPI Payments",
    description: "Seamless, secure digital payment integration",
    icon: "💳"
  },
  {
    title: "Transparent Reviews",
    description: "Authentic customer feedback and ratings system",
    icon: "⭐"
  },
  {
    title: "Cross-Platform",
    description: "Available on Android, iOS, and Web",
    icon: "📱"
  }
];



const projects: Project[] = [
  {
    title: "Stibe Platform Development",
    description: "Building the comprehensive grooming platform with real-time booking, verified professionals, and seamless user experience across all devices.",
    status: "MVP Development",
    timeline: "Launch: Q4 2025 (Kochi)",
    highlights: [
      "Unified platform for salons, freelancers & pet grooming",
      "Real-time booking with live availability",
      "Video portfolio system for skill showcasing",
      "UPI-based secure payment integration"
    ],
    progress: 75,
    category: 'MVP'
  },
  {
    title: "Market Expansion Strategy",
    description: "Strategic rollout plan targeting 15% of India's serviceable grooming sector, starting with Kerala pilot and expanding to major cities.",
    status: "Planning & Partnerships",
    timeline: "Q3 2026 onward",
    highlights: [
      "Pilot launch in Kochi (Q4 2025)",
      "App finalization (Q1 2026)",
      "Major cities rollout (Q3 2026+)",
      "Target: 15% market capture in India"
    ],
    progress: 45,
    category: 'Development'
  },
  {
    title: "Funding & Partnership Network",
    description: "Securing seed funding and building strategic partnerships to accelerate platform development and market penetration across the grooming industry.",
    status: "Active Fundraising",
    timeline: "Q4 2024 - Q1 2025",
    highlights: [
      "Seed funding round completion",
      "Strategic salon chain partnerships",
      "Freelancer network building",
      "Investor partnership development"
    ],
    progress: 60,
    category: 'Partnership'
  }
];

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'MVP': return 'from-green-500 to-emerald-600';
      case 'Development': return 'from-blue-500 to-cyan-600';
      case 'Partnership': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'MVP': return 'MVP Ready';
      case 'Development': return 'In Development';
      case 'Partnership': return 'Partnership Focus';
      default: return 'Active';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-50 overflow-hidden py-24"
    >
      {/* Animated Background Elements */}
      {isClient && (
        <>
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.02]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="projects-grid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#projects-grid)" />
            </svg>
          </div>

          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 right-20 w-24 h-24 border border-blue-300/30 rounded-lg"
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full"
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Interactive Glow */}
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-200/8 to-green-200/8 blur-3xl"
            animate={{
              x: mousePosition.x * 50 - 160,
              y: mousePosition.y * 50 - 160,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 30 }}
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-sm text-blue-700 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Current Projects & Development
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            <span className="block">Building the</span>
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Future of Grooming
            </span>
          </h2>

          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
            From concept to reality, we're crafting innovative solutions that transform how people connect with grooming professionals.
          </p>
        </motion.div>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#FF4D00]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#e64400]/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - What is Stibe */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4">
            <span className="h-px w-8 bg-[#FF4D00] mr-3"></span>
            <span className="text-[#FF4D00] font-medium text-sm uppercase tracking-wider">Introducing Stibe</span>
            <span className="h-px w-8 bg-[#FF4D00] ml-3"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing <span className="text-[#FF4D00]">Grooming</span> Services
          </h2>
          
          <div className="bg-gradient-to-r from-[#FF4D00] to-[#e64400] rounded-2xl p-8 text-white mb-12 shadow-2xl">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed">
              🎯 Stibe is a one-stop grooming app connecting users to salons, freelancers, and pet groomers for instant bookings and at-home services.
            </p>
          </div>
        </div>

        {/* The Problem Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            🚫 The Problems We're <span className="text-[#FF4D00]">Solving</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stibeProblems.map((problem, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-4 text-center">{problem.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 text-center">{problem.title}</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Solution Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 border border-green-100">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              ✅ Our <span className="text-green-600">Solution</span>
            </h3>
            <p className="text-xl md:text-2xl text-center text-gray-700 font-medium leading-relaxed">
              "A unified platform with real-time booking, verified professionals, transparent pricing, and portfolio-based discovery."
            </p>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            🛠️ Key <span className="text-[#FF4D00]">Features</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stibeFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF4D00]/20">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Our Journey Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            🧭 Our <span className="text-[#FF4D00]">Journey</span>
          </h3>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF4D00] to-[#e64400] rounded-full"></div>
            
            <div className="space-y-12">
              {[
                { quarter: "Q4 2024", title: "Research + Seed Funding", status: "Completed", icon: "🔍" },
                { quarter: "Q1 2025", title: "Prototype Development", status: "In Progress", icon: "⚡" },
                { quarter: "Q4 2025", title: "MVP Launch (Kochi)", status: "Upcoming", icon: "🚀" },
                { quarter: "Q1 2026", title: "App Finalization", status: "Planned", icon: "✨" },
                { quarter: "Q3 2026+", title: "Rollout to Major Cities", status: "Future", icon: "🌟" }
              ].map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="text-2xl mb-2">{milestone.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{milestone.quarter}</h4>
                      <p className="text-gray-700 font-medium mb-2">{milestone.title}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        milestone.status === 'Upcoming' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-[#FF4D00] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Current <span className="text-[#FF4D00]">Projects</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
                  <div className="p-6 pb-0">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)}`}>
                      {getCategoryBadge(project.category)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF4D00] transition-colors duration-300">
                      {project.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className="text-sm text-[#FF4D00] font-semibold">{project.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Timeline:</span>
                        <span className="text-sm text-gray-600">{project.timeline}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-semibold text-[#FF4D00]">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} transition-all duration-1000`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-3">Key Highlights:</h5>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <svg className="w-4 h-4 text-[#FF4D00] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Join us as we reshape the future of grooming – for everyone.
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the grooming revolution. Whether you're a user, service provider, or investor, 
              there's a place for you in the Stibe ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#FF4D00] hover:bg-[#e64400] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#FF4D00]/25 transform hover:-translate-y-1 transition-all duration-300"
              >
                Try the App
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-[#FF4D00] text-white hover:text-[#FF4D00] font-semibold rounded-lg transition-all duration-300"
              >
                Partner with Us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-green-400 text-white hover:text-green-400 font-semibold rounded-lg transition-all duration-300"
              >
                Invest in Stibe
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
