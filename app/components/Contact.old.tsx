'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  service: string;
  purpose: string;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border ${
        type === 'success' 
          ? 'bg-green-600/20 text-green-400 border-green-500/30' 
          : 'bg-red-600/20 text-red-400 border-red-500/30'
      } backdrop-blur-xl`}
    >
      <span className="text-xl">{type === 'success' ? '✅' : '⚠️'}</span>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-current hover:text-white text-xl transition-colors"
      >
        ×
      </button>
    </motion.div>
  );
};

const services = [
  { 
    value: 'Mobile Application', 
    label: 'Mobile App Development', 
    icon: '📱',
    description: 'Native iOS & Android applications',
    suggestions: [
      "I want to develop a mobile app for iOS and Android.",
      "I need a mobile app for my business.",
      "I have an app idea I'd like to discuss.",
    ]
  },
  { 
    value: 'Web Application', 
    label: 'Web Application', 
    icon: '🌐',
    description: 'Modern web applications & platforms',
    suggestions: [
      "I want to build a web application with specific functionality.",
      "I need a web-based platform for my services.",
      "I need a website with advanced features.",
    ]
  },
  { 
    value: 'GUI application', 
    label: 'Desktop Application', 
    icon: '💻',
    description: 'Cross-platform desktop software',
    suggestions: [
      "I need a desktop application for my work.",
      "I'm looking to create a user-friendly GUI application.",
      "I want a software for internal purpose.",
    ]
  },
  { 
    value: 'Computer Software', 
    label: 'Custom Software', 
    icon: '⚙️',
    description: 'Tailored software solutions',
    suggestions: [
      "I have an idea for software to solve a specific problem.",
      "I'm seeking developers for a computer application.",
      "I need help to write software.",
    ]
  },
  { 
    value: 'Website', 
    label: 'Website Development', 
    icon: '🌍',
    description: 'Professional websites & portfolios',
    suggestions: [
      "I need a professional website for my company.",
      "I want to create a blog or portfolio website.",
      "I am looking for web design and development services.",
    ]
  },
  { 
    value: 'Smart Home', 
    label: 'Smart Home Solutions', 
    icon: '🏠',
    description: 'IoT-enabled home automation',
    suggestions: [
      "I need to integrate my existing appliances with smart home features.",
      "I have a new home with smart features and want to develop an app for it.",
      "I want to develop a smart automation system for my house.",
    ]
  },
  { 
    value: 'Embedded System', 
    label: 'Embedded Systems', 
    icon: '🔧',
    description: 'Hardware-software integration',
    suggestions: [
      "I need an embedded system to control a machine.",
      "I have a hardware project that requires embedded programming.",
      "I need assistance with my embedded system project.",
    ]
  },
  { 
    value: 'IOT Projects', 
    label: 'IoT Projects', 
    icon: '📡',
    description: 'Connected device solutions',
    suggestions: [
      "I have an idea for an IoT based product.",
      "I'm looking to develop a smart monitoring system.",
      "I want to integrate IoT for my existing product.",
    ]
  },
  { 
    value: 'AI Services', 
    label: 'AI & ML Services', 
    icon: '🤖',
    description: 'Intelligent automation & analytics',
    suggestions: [
      "I need help integrating AI into my products.",
      "I'm interested in developing machine learning solutions.",
      "I need consultation for implementing AI algorithms.",
    ]
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    mobile: '',
    service: 'Mobile Application',
    purpose: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const ctaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const selectedService = services.find(s => s.value === formData.service);
    setSuggestions(selectedService?.suggestions || []);
  }, [formData.service]);

  // Scroll to CTA section when component mounts (for header navigation)
  useEffect(() => {
    const scrollToCTA = () => {
      if (ctaRef.current) {
        ctaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Check if URL has hash or if this is triggered from header
    if (window.location.hash === '#contact' || window.location.pathname === '/contact') {
      setTimeout(scrollToCTA, 100);
    }

    // Listen for custom header contact event
    const handleHeaderContact = () => scrollToCTA();
    window.addEventListener('headerContactClick', handleHeaderContact);

    return () => window.removeEventListener('headerContactClick', handleHeaderContact);
  }, []);

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const isValidMobile = (mobile: string) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({ ...prev, purpose: suggestion }));
    setShowSuggestions(false);
  };

  const sendEnquiryEmail = async (formData: ContactFormData) => {
    const apiUrl = "https://lactosure.azurewebsites.net/api";
    const params = new URLSearchParams({
      recipientEmail: formData.email,
      recipientName: formData.name,
      mobile: formData.mobile,
      selectedService: formData.service,
      purpose: formData.purpose,
    });

    try {
      const response = await fetch(`${apiUrl}/Email/EnquiryMail?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending enquiry email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.purpose) {
      setNotification({ message: 'All fields are required', type: 'error' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setNotification({ message: 'Please enter a valid email address', type: 'error' });
      return;
    }

    if (!isValidMobile(formData.mobile)) {
      setNotification({ message: 'Please enter a valid 10-digit mobile number', type: 'error' });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await sendEnquiryEmail(formData);
      
      if (success) {
        setNotification({ message: 'Inquiry received successfully! We\'ll contact you within 24 hours.', type: 'success' });
        setFormData({
          name: '',
          email: '',
          mobile: '',
          service: 'Mobile Application',
          purpose: ''
        });
      } else {
        setNotification({ message: 'Submission failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Server error. Please try later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Combined CTA and Contact Form Section */}
      <section ref={ctaRef} id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF4D00] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF4D00] rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#FF4D00] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* CTA Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-white leading-tight">
              Ready to Transform Your Business?
            </h1>
          </motion.div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 sm:p-12 rounded-3xl border border-gray-800"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-4 text-white">Start Your Project</h2>
                <p className="text-sm sm:text-base text-gray-400">Tell us about your project and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF4D00] transition-colors duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF4D00] transition-colors duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>

                {/* Mobile Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label htmlFor="mobile" className="block text-white font-medium mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF4D00] transition-colors duration-300"
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                </motion.div>

                {/* Service Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label htmlFor="service" className="block text-white font-medium mb-2">
                    Service Type *
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white focus:outline-none focus:border-[#FF4D00] transition-colors duration-300 appearance-none cursor-pointer"
                      required
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value} className="bg-black text-white">
                          {service.icon} {service.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Purpose Field with Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="relative"
                >
                  <label htmlFor="purpose" className="block text-white font-medium mb-2">
                    Project Purpose *
                  </label>
                  <div className="relative">
                    <textarea
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      onFocus={() => setShowSuggestions(true)}
                      rows={4}
                      className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF4D00] transition-colors duration-300 resize-none"
                      placeholder="Describe your project requirements..."
                      required
                    />
                    
                    {/* Suggestions */}
                    {showSuggestions && suggestions.length > 0 && !formData.purpose && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 w-full mt-2 bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg shadow-xl max-h-48 overflow-y-auto"
                      >
                        <div className="p-3 border-b border-gray-700">
                          <span className="text-sm text-gray-300">Quick suggestions:</span>
                        </div>
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-3 text-gray-200 hover:bg-gray-700/50 transition-colors duration-200 border-b border-gray-700 last:border-b-0"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  {showSuggestions && formData.purpose === '' && (
                    <p className="text-xs text-gray-400 mt-2">💡 Click on a suggestion above or type your custom message</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#FF4D00] to-[#e64400] text-white font-bold py-4 px-6 rounded-full hover:shadow-lg hover:shadow-[#FF4D00]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Get Free Consultation</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </button>
                </motion.div>
              </form>
            </motion.div>


          </div>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
