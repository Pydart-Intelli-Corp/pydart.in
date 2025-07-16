'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

// Service categories
const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'ai', name: 'AI Solutions' },
  { id: 'cloud', name: 'Cloud' },
];

// Detailed service offerings
const services = [
  {
    id: 1,
    title: 'Website Development',
    category: 'development',
    brief: 'Custom-built, responsive websites with exceptional UX.',
    description: 'We design and develop responsive websites optimized for all devices, ensuring a seamless user experience. From corporate sites to e-commerce platforms, we deliver solutions tailored to your specific business needs and goals.',
    image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop',
    features: [
      'Responsive design for all devices',
      'SEO-optimized code structure',
      'Integration with content management systems',
      'Performance optimization',
      'Security best practices',
    ],
    technologies: ['React', 'Next.js', 'Vue.js', 'WordPress', 'PHP'],
    accentColor: 'from-primary to-accent-blue',
    icon: '/assets/icons/icon_development.png',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    category: 'development',
    brief: 'Native and cross-platform mobile applications.',
    description: 'We create powerful, user-friendly mobile applications for iOS and Android platforms. Whether you need a native app or prefer a cross-platform solution, our team delivers high-performance applications with intuitive user interfaces.',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop',
    features: [
      'Native iOS and Android development',
      'Cross-platform solutions with Flutter and React Native',
      'Seamless API integration',
      'Push notification systems',
      'Offline functionality',
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    accentColor: 'from-accent-purple to-accent-blue',
    icon: '/assets/icons/icon_ui.png',
  },
  {
    id: 3,
    title: 'UI/UX Design',
    category: 'design',
    brief: 'User-centered design that engages and converts.',
    description: 'Our design team creates visually stunning interfaces that prioritize user experience. We follow a user-centered design approach, ensuring your digital products are not only beautiful but also intuitive and effective at achieving your business goals.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    features: [
      'User research and persona development',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Usability testing',
      'Design systems development',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin'],
    accentColor: 'from-accent-teal to-primary',
    icon: '/assets/icons/creativity.png',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    category: 'marketing',
    brief: 'Strategic marketing to drive traffic and conversions.',
    description: 'Our digital marketing services are designed to increase your brand visibility, drive traffic, and convert prospects into customers. We develop comprehensive strategies tailored to your business goals, target audience, and competitive landscape.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop',
    features: [
      'Search engine optimization (SEO)',
      'Pay-per-click advertising (PPC)',
      'Social media marketing',
      'Content marketing strategies',
      'Analytics and performance tracking',
    ],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Meta Ads', 'Google Ads'],
    accentColor: 'from-accent-gold to-primary',
    icon: '/assets/icons/map.png',
  },
  {
    id: 5,
    title: 'AI Integration',
    category: 'ai',
    brief: 'Cutting-edge AI solutions for business growth.',
    description: 'We help businesses leverage the power of artificial intelligence to automate processes, gain insights from data, and create innovative customer experiences. Our AI integration services are designed to provide practical, value-driving solutions.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad695?q=80&w=2070&auto=format&fit=crop',
    features: [
      'Machine learning model development',
      'Natural language processing solutions',
      'Computer vision implementation',
      'AI chatbots and virtual assistants',
      'Predictive analytics systems',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Python', 'Hugging Face'],
    accentColor: 'from-accent-blue to-accent-purple',
    icon: '/assets/icons/aigif.gif',
  },
  {
    id: 6,
    title: 'Cloud Solutions',
    category: 'cloud',
    brief: 'Scalable, secure cloud infrastructure services.',
    description: 'Our cloud services help businesses build, manage, and optimize their cloud infrastructure. We provide solutions for seamless migration, enhanced security, and cost-effective scaling to ensure your systems are always reliable and efficient.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop',
    features: [
      'Cloud architecture design',
      'Migration to cloud platforms',
      'Serverless application development',
      'Cloud security implementation',
      'DevOps and CI/CD pipeline setup',
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker'],
    accentColor: 'from-accent-teal to-accent-blue',
    icon: '/assets/icons/cpu.png',
  },
];

export default function ServiceShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleServices, setVisibleServices] = useState(services);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { theme, mode } = useTheme();

  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleServices(services);
    } else {
      setVisibleServices(services.filter(service => service.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-dark to-gray-900">
      <Header />

      {/* Hero section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-accent-purple opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-primary opacity-5 animate-float blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-gradient-vibrant text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Our Services
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-300">
              Discover the comprehensive range of solutions we offer to help your business thrive in the digital landscape.
            </p>
          </motion.div>

          {/* Category navigation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-primary to-accent-blue text-white shadow-lg' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {visibleServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="service-card rounded-xl overflow-hidden hover-lift"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.accentColor} flex items-center justify-center shadow-lg`}>
                        <Image 
                          src={service.icon} 
                          width={24} 
                          height={24} 
                          alt="" 
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.brief}</p>
                    
                    {/* Technologies badges */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {service.technologies.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                          +{service.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setSelectedService(service.id)}
                      className="text-gradient font-medium flex items-center group"
                    >
                      Learn More
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Service detail modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
            <motion.div 
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto card-glass rounded-xl relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-800/70 flex items-center justify-center hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Service content */}
              {(() => {
                const service = services.find(s => s.id === selectedService);
                if (!service) return null;
                
                return (
                  <>
                    <div className="relative h-72">
                      <Image 
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accentColor} flex items-center justify-center mr-4 shadow-lg`}>
                            <Image 
                              src={service.icon} 
                              width={32} 
                              height={32} 
                              alt="" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <h2 className="text-3xl font-bold text-white text-shadow-sm">{service.title}</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 text-sm rounded-full bg-gray-800/60 backdrop-blur-sm text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-4">Overview</h3>
                      <p className="text-gray-300 mb-8">{service.description}</p>
                      
                      <h3 className="text-xl font-bold mb-4">Key Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="benefit-item">{feature}</li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 flex justify-between items-center">
                        <Link href="/contact" className="px-6 py-3 bg-gradient-to-r from-primary to-accent-blue text-white font-medium rounded-lg shadow-lg hover:shadow-glow transition-all duration-300 flex items-center">
                          Request a Consultation
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                        <button 
                          onClick={() => setSelectedService(null)}
                          className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
                        >
                          Back to Services
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}