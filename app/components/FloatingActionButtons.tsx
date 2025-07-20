'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const FloatingActionButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');

  // Show/hide button based on scroll position and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect current section
      const aboutSection = document.getElementById('about');
      const contactSection = document.getElementById('contact');
      
      if (aboutSection && contactSection) {
        const aboutTop = aboutSection.offsetTop - 100;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const contactTop = contactSection.offsetTop - 100;
        
        if (scrollTop >= aboutTop && scrollTop < aboutBottom) {
          setCurrentSection('about');
        } else if (scrollTop >= contactTop) {
          setCurrentSection('contact');
        } else {
          setCurrentSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigate to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open WhatsApp chat
  const openWhatsApp = () => {
    const phoneNumber = '917356765036'; // Updated with actual number
    const message = 'Hello! I would like to know more about PyDart Intelligence Corp services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Calculate stroke dash array for progress circle
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  // Determine if we should use dark theme
  const isDarkSection = currentSection === 'about' || currentSection === 'contact';

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-4">
          {/* Expanded Action Buttons */}
          <div className={`flex flex-col space-y-4 transition-all duration-500 ease-out transform ${
            isExpanded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
          }`}>
            {/* WhatsApp Button */}
            <div className={`transition-all duration-300 ${isExpanded ? 'animate-slide-in-up' : ''}`}
                 style={{ animationDelay: isExpanded ? '0.1s' : '0s' }}>
              <button
                onClick={openWhatsApp}
                className="group relative bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float-gentle backdrop-blur-sm border border-white/20 overflow-hidden"
                style={{ animationDelay: '0.5s' }}
                title="WhatsApp"
              >
                <svg className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg border border-gray-700 backdrop-blur-sm z-20">
                  WhatsApp
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-600/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* WhatsApp pulse effect */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-40 animate-ping"></div>
                </div>
              </button>
            </div>

            {/* Contact Button */}
            <div className={`transition-all duration-300 ${isExpanded ? 'animate-slide-in-up' : ''}`}
                 style={{ animationDelay: isExpanded ? '0.2s' : '0s' }}>
              <button
                onClick={scrollToContact}
                className="group relative bg-gradient-to-r from-accent-blue via-blue-500 to-accent-purple text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float-gentle backdrop-blur-sm border border-white/20 overflow-hidden"
                style={{ animationDelay: '1s' }}
                title="Contact Us"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 relative z-10" />
                <span className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg border border-gray-700 backdrop-blur-sm z-20">
                  Contact Us
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Flowing wave effect */}
                <div className="absolute inset-0 rounded-full opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
                </div>
              </button>
            </div>

            {/* Go to Top Button */}
            <div className={`transition-all duration-300 ${isExpanded ? 'animate-slide-in-up' : ''}`}
                 style={{ animationDelay: isExpanded ? '0.3s' : '0s' }}>
              <button
                onClick={scrollToTop}
                className="group relative bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float-gentle backdrop-blur-sm border border-white/20 overflow-hidden"
                title="Go to Top"
              >
                <ChevronUpIcon className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 relative z-10" />
                <span className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg border border-gray-700 backdrop-blur-sm z-20">
                  Go to Top
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Flowing particle effect */}
                <div className="absolute inset-0 rounded-full opacity-30">
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Toggle Button with Scroll Progress */}
          <div className="relative">
            {/* Scroll Progress Circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke={isDarkSection ? "rgba(156, 163, 175, 0.3)" : "rgba(255, 255, 255, 0.2)"}
                strokeWidth="2"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke={isDarkSection ? "url(#darkProgressGradient)" : "url(#progressGradient)"}
                strokeWidth="3"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-150 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00b4ab" />
                  <stop offset="50%" stopColor="#33c3bc" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
                <linearGradient id="darkProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6B7280" />
                  <stop offset="50%" stopColor="#9CA3AF" />
                  <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Main Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`relative text-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-pulse-glow backdrop-blur-sm border overflow-hidden ${
                isExpanded 
                  ? 'rotate-45 bg-gradient-to-r from-red-500 to-red-600' 
                  : isDarkSection
                    ? 'rotate-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 border-gray-600/50'
                    : 'rotate-0 bg-gradient-to-r from-primary-dark via-primary to-primary-light border-white/30'
              }`}
              title="Quick Actions"
            >
              <svg 
                className={`h-6 w-6 transition-all duration-500 relative z-10 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d={isExpanded ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                />
              </svg>
              <div className={`absolute inset-0 rounded-full blur-xl opacity-75 animate-pulse ${
                isDarkSection 
                  ? 'bg-gradient-to-r from-gray-800/30 to-gray-700/30'
                  : 'bg-gradient-to-r from-primary-dark/30 to-primary-light/30'
              }`}></div>
              
              {/* Flowing particles */}
              <div className="absolute inset-0 rounded-full opacity-20">
                <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-3 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActionButtons;
