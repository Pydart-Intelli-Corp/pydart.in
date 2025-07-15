// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
// import { 
//   Sparkles, 
//   MapPin, 
//   Clock, 
//   Star, 
//   Heart, 
//   Zap, 
//   Shield, 
//   Smartphone, 
//   Users, 
//   ArrowRight, 
//   Play,
//   CheckCircle,
//   TrendingUp,
//   Award,
//   Target,
//   Calendar,
//   CreditCard,
//   MessageSquare,
//   Bell,
//   Search,
//   Filter,
//   ChevronRight,
//   Download,
//   Globe,
//   Headphones
// } from 'lucide-react';
// import Header from './Header';
// import Footer from './Footer';
// import { useBranch } from './BranchProvider';
// import TorchCursor from './TorchCursor';

// interface StibePlatformProps {
//   className?: string;
// }

// export default function StibePlatform({ className = '' }: StibePlatformProps) {
//   const { currentBranch } = useBranch();
//   const { scrollYProgress } = useScroll();
//   const [isClient, setIsClient] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [activeTab, setActiveTab] = useState('overview');
  
//   const heroRef = useRef<HTMLDivElement>(null);
//   const featuresRef = useRef<HTMLDivElement>(null);
//   const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
//   const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Animation transforms
//   const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

//   const features = [
//     {
//       icon: Zap,
//       title: 'AI-Powered Matching',
//       description: 'Smart algorithms connect you with the perfect beauty professional based on your preferences, location, and service requirements.',
//       stats: '99.7% Satisfaction Rate',
//       color: 'from-cyan-500 to-blue-600'
//     },
//     {
//       icon: Clock,
//       title: 'Instant Booking',
//       description: 'Book your beauty services instantly with real-time availability. No waiting, no hassle - just instant confirmation.',
//       stats: '< 30 Second Booking',
//       color: 'from-blue-500 to-purple-600'
//     },
//     {
//       icon: Shield,
//       title: 'Verified Professionals',
//       description: 'All service providers are thoroughly verified with background checks, certifications, and portfolio reviews.',
//       stats: '500+ Verified Providers',
//       color: 'from-purple-500 to-pink-600'
//     },
//     {
//       icon: Target,
//       title: 'Personalized Experience',
//       description: 'Get customized beauty recommendations based on your skin type, preferences, and previous service history.',
//       stats: 'Personalized for You',
//       color: 'from-pink-500 to-cyan-600'
//     }
//   ];

//   const marketStats = [
//     { value: '₹26.3B', label: 'Indian Beauty Market', growth: '+11.2% CAGR' },
//     { value: '₹3.94B', label: 'Serviceable Market', growth: 'First-Mover' },
//     { value: '10%', label: 'Platform Commission', growth: 'Competitive' },
//     { value: '₹999', label: 'Monthly Subscription', growth: 'Pro Tools' }
//   ];

//   const serviceTypes = [
//     { 
//       name: 'Hair Styling', 
//       icon: '💇‍♀️', 
//       services: ['Haircut', 'Styling', 'Coloring', 'Treatment'],
//       avgTime: '60-90 min',
//       avgPrice: '₹800-2500'
//     },
//     { 
//       name: 'Makeup', 
//       icon: '💄', 
//       services: ['Bridal', 'Party', 'Corporate', 'Special Events'],
//       avgTime: '45-75 min',
//       avgPrice: '₹1200-3500'
//     },
//     { 
//       name: 'Skincare', 
//       icon: '✨', 
//       services: ['Facial', 'Cleanup', 'Anti-aging', 'Acne Treatment'],
//       avgTime: '60-90 min',
//       avgPrice: '₹600-2000'
//     },
//     { 
//       name: 'Nail Art', 
//       icon: '💅', 
//       services: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Polish'],
//       avgTime: '45-60 min',
//       avgPrice: '₹400-1200'
//     }
//   ];

//   const userJourney = [
//     {
//       step: 1,
//       title: 'Choose Service',
//       description: 'Select from our wide range of beauty services',
//       icon: Search
//     },
//     {
//       step: 2,
//       title: 'Find Provider',
//       description: 'AI matches you with the perfect professional',
//       icon: Target
//     },
//     {
//       step: 3,
//       title: 'Book Instantly',
//       description: 'Confirm your appointment in seconds',
//       icon: Calendar
//     },
//     {
//       step: 4,
//       title: 'Enjoy Service',
//       description: 'Relax while our expert works their magic',
//       icon: Heart
//     }
//   ];

//   return (
//     <TorchCursor torchSize={300} intensity={0.85}>
//       <div className={`min-h-screen bg-black text-white ${className}`}>
//         {/* Background Effects */}
//         <div className="fixed inset-0 z-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          
//           {/* Animated Background Particles */}
//           {isClient && (
//             <div className="absolute inset-0 overflow-hidden">
//               {[...Array(50)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
//                   animate={{
//                     y: [0, -100, 0],
//                     x: [0, Math.sin(i) * 50, 0],
//                     opacity: [0.3, 0.8, 0.3]
//                   }}
//                   transition={{
//                     duration: 3 + i % 3,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: i * 0.1
//                   }}
//                   style={{
//                     left: `${Math.random() * 100}%`,
//                     top: `${Math.random() * 100}%`,
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10">
//           <Header />
          
//           {/* Hero Section */}
//           <motion.section
//             ref={heroRef}
//             initial={{ opacity: 0 }}
//             animate={isHeroInView ? { opacity: 1 } : {}}
//             className="min-h-screen flex items-center justify-center relative overflow-hidden"
//           >
//             <div className="container mx-auto px-4 py-20 text-center">
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
//                 transition={{ duration: 0.8 }}
//                 className="max-w-4xl mx-auto"
//               >
//                 {/* Platform Badge */}
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
//                   transition={{ delay: 0.2 }}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full mb-6"
//                 >
//                   <Sparkles className="w-4 h-4 text-cyan-400" />
//                   <span className="text-cyan-400 font-semibold">STIBE Platform</span>
//                 </motion.div>

//                 {/* Main Heading */}
//                 <motion.h1
//                   initial={{ y: 30, opacity: 0 }}
//                   animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
//                   transition={{ delay: 0.4 }}
//                   className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
//                 >
//                   <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//                     Beauty
//                   </span>
//                   <br />
//                   <span className="text-white">On-Demand</span>
//                 </motion.h1>

//                 {/* Tagline */}
//                 <motion.p
//                   initial={{ y: 30, opacity: 0 }}
//                   animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
//                   transition={{ delay: 0.6 }}
//                   className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
//                 >
//                   Services That Never Wait
//                 </motion.p>

//                 {/* Description */}
//                 <motion.p
//                   initial={{ y: 30, opacity: 0 }}
//                   animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
//                   transition={{ delay: 0.8 }}
//                   className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
//                 >
//                   Revolutionary AI-powered platform connecting you with verified beauty professionals 
//                   for instant, personalized services. Experience the future of beauty care.
//                 </motion.p>

//                 {/* CTA Buttons */}
//                 <motion.div
//                   initial={{ y: 30, opacity: 0 }}
//                   animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
//                   transition={{ delay: 1 }}
//                   className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//                 >
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg relative overflow-hidden"
//                   >
//                     <span className="relative z-10 flex items-center gap-2">
//                       <Download className="w-5 h-5" />
//                       Download App
//                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="group px-8 py-4 border-2 border-cyan-500/30 rounded-full text-cyan-400 font-semibold text-lg hover:bg-cyan-500/10 transition-colors"
//                   >
//                     <span className="flex items-center gap-2">
//                       <Play className="w-5 h-5" />
//                       Watch Demo
//                     </span>
//                   </motion.button>
//                 </motion.div>
//               </motion.div>
//             </div>

//             {/* Floating App Mockup */}
//             <motion.div
//               initial={{ y: 100, opacity: 0 }}
//               animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
//               transition={{ delay: 1.2, duration: 1 }}
//               className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-96 hidden lg:block"
//             >
//               <div className="relative w-full h-full">
//                 <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl">
//                   <div className="p-6 h-full flex flex-col">
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="w-3 h-3 bg-red-500 rounded-full" />
//                       <div className="w-3 h-3 bg-yellow-500 rounded-full" />
//                       <div className="w-3 h-3 bg-green-500 rounded-full" />
//                     </div>
//                     <div className="flex-1 space-y-4">
//                       <div className="h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg animate-pulse" />
//                       <div className="h-4 bg-gray-700/50 rounded animate-pulse" />
//                       <div className="h-4 bg-gray-700/50 rounded animate-pulse w-2/3" />
//                       <div className="grid grid-cols-2 gap-2 mt-6">
//                         {serviceTypes.slice(0, 4).map((service, i) => (
//                           <div key={i} className="p-3 bg-gray-800/50 rounded-lg text-center">
//                             <div className="text-2xl mb-1">{service.icon}</div>
//                             <div className="text-xs text-gray-400">{service.name}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.section>

//           {/* Market Stats Section */}
//           <section className="py-20 relative">
//             <div className="container mx-auto px-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-16"
//               >
//                 <h2 className="text-4xl font-bold mb-6">
//                   Capturing India's <span className="text-cyan-400">Beauty Market</span>
//                 </h2>
//                 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                   Positioned to capture significant market share in India's rapidly growing beauty industry
//                 </p>
//               </motion.div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {marketStats.map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="text-center p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50"
//                   >
//                     <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.value}</div>
//                     <div className="text-gray-300 font-semibold mb-1">{stat.label}</div>
//                     <div className="text-sm text-green-400">{stat.growth}</div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Features Section */}
//           <section ref={featuresRef} className="py-20 relative">
//             <div className="container mx-auto px-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
//                 className="text-center mb-16"
//               >
//                 <h2 className="text-4xl font-bold mb-6">
//                   Platform <span className="text-cyan-400">Features</span>
//                 </h2>
//                 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                   Advanced AI technology meets beautiful user experience
//                 </p>
//               </motion.div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {features.map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ delay: index * 0.2 }}
//                     className="group p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
//                   >
//                     <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
//                       <feature.icon className="w-8 h-8 text-white" />
//                     </div>
//                     <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
//                     <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
//                     <div className="text-cyan-400 font-semibold">{feature.stats}</div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Service Types Section */}
//           <section className="py-20 relative">
//             <div className="container mx-auto px-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 className="text-center mb-16"
//               >
//                 <h2 className="text-4xl font-bold mb-6">
//                   Our <span className="text-cyan-400">Services</span>
//                 </h2>
//                 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                   Comprehensive beauty services delivered by expert professionals
//                 </p>
//               </motion.div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {serviceTypes.map((service, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
//                   >
//                     <div className="text-4xl mb-4 text-center">{service.icon}</div>
//                     <h3 className="text-xl font-bold mb-3 text-center">{service.name}</h3>
//                     <div className="space-y-2 mb-4">
//                       {service.services.map((item, i) => (
//                         <div key={i} className="text-sm text-gray-400 flex items-center gap-2">
//                           <CheckCircle className="w-3 h-3 text-cyan-400" />
//                           {item}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="pt-4 border-t border-gray-700">
//                       <div className="text-sm text-gray-400 mb-1">Duration: {service.avgTime}</div>
//                       <div className="text-sm text-cyan-400 font-semibold">Price: {service.avgPrice}</div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* User Journey Section */}
//           <section className="py-20 relative">
//             <div className="container mx-auto px-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 className="text-center mb-16"
//               >
//                 <h2 className="text-4xl font-bold mb-6">
//                   How It <span className="text-cyan-400">Works</span>
//                 </h2>
//                 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                   Simple, fast, and intuitive - beauty services in just a few taps
//                 </p>
//               </motion.div>

//               <div className="relative">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                   {userJourney.map((step, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 30 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.2 }}
//                       className="relative text-center"
//                     >
//                       {/* Step Number */}
//                       <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl mb-6">
//                         {step.step}
//                       </div>
                      
//                       {/* Icon */}
//                       <div className="inline-flex p-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 mb-6">
//                         <step.icon className="w-8 h-8 text-cyan-400" />
//                       </div>
                      
//                       {/* Content */}
//                       <h3 className="text-xl font-bold mb-3">{step.title}</h3>
//                       <p className="text-gray-400">{step.description}</p>

//                       {/* Connecting Line */}
//                       {index < userJourney.length - 1 && (
//                         <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30" />
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Investment CTA Section */}
//           <section className="py-20 relative">
//             <div className="container mx-auto px-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-16 border border-cyan-500/20"
//               >
//                 <h2 className="text-4xl font-bold mb-6">
//                   Ready to <span className="text-cyan-400">Invest</span> in Beauty's Future?
//                 </h2>
//                 <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
//                   Join us in revolutionizing India's beauty industry with cutting-edge AI technology
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg"
//                   >
//                     <span className="flex items-center gap-2">
//                       <TrendingUp className="w-5 h-5" />
//                       Invest Now
//                     </span>
//                   </motion.button>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-8 py-4 border-2 border-cyan-500/30 rounded-full text-cyan-400 font-semibold text-lg hover:bg-cyan-500/10 transition-colors"
//                   >
//                     <span className="flex items-center gap-2">
//                       <MessageSquare className="w-5 h-5" />
//                       Contact Us
//                     </span>
//                   </motion.button>
//                 </div>
//               </motion.div>
//             </div>
//           </section>

//           <Footer />
//         </div>
//       </div>
//     </TorchCursor>
//   );
// }
