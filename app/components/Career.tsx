'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { API_CONFIG, postRequestWithFile, parseResponse, validation } from '../../lib/api/config';

// Job openings data
const jobOpenings = [
  {
    title: 'Flutter Developer',
    location: 'Kochi',
    type: 'Full-time',
    description: 'Develop mobile applications using the Flutter framework.',
    requirements: [
      'Proficiency in Flutter & Dart',
      '1+ years of development experience'
    ],
    salary: 'Competitive'
  },
  {
    title: 'React Native Developer',
    location: 'Kochi',
    type: 'Full-time',
    description: 'Develop mobile applications using the React Native framework.',
    requirements: [
      'Proficiency in React Native',
      '1+ years of development experience'
    ],
    salary: 'Competitive'
  },
  {
    title: 'Dotnet Developer',
    location: 'Kochi',
    type: 'Full-time',
    description: 'Develop web and desktop applications and APIs using the .NET framework.',
    requirements: [
      'Proficiency in C# and .NET',
      '1+ years of development experience'
    ],
    salary: 'Competitive'
  },
  {
    title: 'Flutter Intern',
    location: 'Kochi',
    type: 'Internship',
    description: 'Assist in developing mobile applications using Flutter.',
    requirements: [
      'Basic knowledge of Flutter & Dart',
      'Interns/Freshers are welcome'
    ],
    salary: 'Stipend'
  },
  {
    title: '.NET Core Intern',
    location: 'Kochi',
    type: 'Internship',
    description: 'Assist in developing applications using the .NET Core framework.',
    requirements: [
      'Basic knowledge of C# and .NET Core',
      'Interns/Freshers are welcome'
    ],
    salary: 'Stipend'
  },
  {
    title: 'UI/UX Developer',
    location: 'Kochi',
    type: 'Full-time',
    description: 'Design and implement user interfaces and experiences.',
    requirements: [
      'Proficiency in design tools (e.g., Figma, Sketch, Adobe XD)',
      'Experience in UI/UX design or a strong portfolio (Interns/Freshers can apply)'
    ],
    salary: 'Competitive'
  },
];

// Perks data
const perks = [
  {
    icon: '/assets/images/career/flex.webp',
    title: 'Flexible Working',
    description: 'Work from home or office, your choice'
  },
  {
    icon: '/assets/images/career/grow.webp',
    title: 'Growth Opportunities',
    description: 'Continuous learning and career advancement'
  },
  {
    icon: '/assets/images/career/health.webp',
    title: 'Health Benefits',
    description: 'Comprehensive health and wellness coverage'
  },
  {
    icon: '/assets/images/career/pay.webp',
    title: 'Competitive Pay',
    description: 'Market-leading salaries and bonuses'
  },
  {
    icon: '/assets/images/career/team.webp',
    title: 'Great Team',
    description: 'Work with passionate and talented individuals'
  },
  {
    icon: '/assets/images/career/home.webp',
    title: 'Work-Life Balance',
    description: 'Healthy balance between work and personal life'
  },
];

export default function Career() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedJob, setSelectedJob] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    job: '',
    resume: '',
  });

  const jobOpeningsRef = useRef<HTMLDivElement>(null);
  const applicationFormRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    '/assets/images/career/career1.webp',
    '/assets/images/career/career2.webp',
    '/assets/images/career/career3.webp',
  ];

  // Auto-slide hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToJobOpenings = () => {
    jobOpeningsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToApplicationForm = () => {
    applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Reset submit status when user makes changes
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      job: '',
      resume: '',
    };

    // Validate name
    if (!validation.name(formData.name)) {
      errors.name = 'Name must be at least 2 characters long';
    }

    // Validate email
    if (!validation.email(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!validation.phone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Validate job selection
    if (!selectedJob) {
      errors.job = 'Please select a position';
    }

    // Validate resume file
    if (!resumeFile) {
      errors.resume = 'Please upload your resume';
    } else if (!validation.file(resumeFile)) {
      errors.resume = 'Please upload a PDF or DOC file (max 5MB)';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (validation.file(file)) {
        setResumeFile(file);
        setFormErrors(prev => ({ ...prev, resume: '' }));
        if (submitStatus !== 'idle') {
          setSubmitStatus('idle');
        }
      } else {
        setFormErrors(prev => ({ 
          ...prev, 
          resume: 'Please upload a PDF or DOC file (max 5MB)' 
        }));
        setResumeFile(null);
        // Clear the file input
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting application...");
    
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    // Trim text values
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const job = selectedJob.trim();

    // Check for empty fields
    if ([name, email, phone, job].some(field => field === '') || !resumeFile) {
      setIsLoading(false);
      setSubmitStatus('error');
      setErrorMessage('Please fill all required fields');
      return;
    }

    // Validate email format
    if (!validation.email(email)) {
      setIsLoading(false);
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Validate phone number format
    if (!validation.phone(phone)) {
      setIsLoading(false);
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid phone number');
      return;
    }

    try {
      // Prepare query parameters following the Dart pattern
      const queryParams = new URLSearchParams({
        recipientName: name,
        recipientEmail: email,
        mobile: phone,
        selectedService: job,
        purpose: "Application Submission"
      });

      // Construct API URL with query parameters
      const apiUrl = `${API_CONFIG.emailApiUrl}${API_CONFIG.endpoints.careers}?${queryParams.toString()}`;
      console.log('🚀 Making API call to:', apiUrl);

      // Create FormData for multipart request
      const formDataToSend = new FormData();
      formDataToSend.append('pdfFile', resumeFile, resumeFile.name);

      console.log('📝 Form data being sent:', {
        recipientName: name,
        recipientEmail: email,
        mobile: phone,
        selectedService: job,
        purpose: "Application Submission",
        resumeFileName: resumeFile.name,
        resumeSize: resumeFile.size,
        resumeType: resumeFile.type
      });

      // Make POST request with multipart form data
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header - let browser set it with boundary for multipart
      });

      console.log("Response status:", response.status);
      const responseBody = await response.text();
      console.log("Response body:", responseBody);

      if (response.status === 200) {
        // Clear form on success
        setFormData({ name: '', email: '', phone: '' });
        setSelectedJob('');
        setResumeFile(null);
        setFormErrors({ name: '', email: '', phone: '', job: '', resume: '' });
        
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        setIsLoading(false);
        setSubmitStatus('success');
        
        // Scroll to top of form to show success message
        applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsLoading(false);
        setSubmitStatus('error');
        setErrorMessage(`Failed to submit: ${responseBody} (Status: ${response.status})`);
      }
    } catch (error) {
      setIsLoading(false);
      setSubmitStatus('error');
      setErrorMessage(`Error occurred: ${error}`);
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Sliding Images */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide]}
              alt={`Career hero ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Build Your Future With Us
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 font-medium"
            >
              Join our team of innovators and shape the future of technology
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={scrollToJobOpenings}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00b4ab] to-[#008a82] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00b4ab]/30 transition-all duration-300 transform hover:scale-105"
            >
              View Open Positions →
            </motion.button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#00b4ab] scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Job Openings Section */}
      <section ref={jobOpeningsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white">
              Open Positions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover exciting opportunities to grow your career with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-[#00b4ab]/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00b4ab] transition-colors duration-300">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{job.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.type === 'Full-time' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-blue-600/20 text-blue-400'
                  }`}>
                    {job.type}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {job.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Requirements:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#00b4ab] mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#00b4ab] font-semibold text-sm">
                    {job.salary}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedJob(job.title);
                      scrollToApplicationForm();
                    }}
                    className="px-4 py-2 bg-[#00b4ab] text-white text-sm font-medium rounded-lg hover:bg-[#008a82] transition-colors duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white">
              Why Join Us?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the benefits of working with a forward-thinking company
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-24 h-24 mx-auto mb-6 overflow-hidden rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={perk.icon}
                    alt={perk.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00b4ab] transition-colors duration-300">
                  {perk.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={applicationFormRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 sm:p-12 rounded-3xl border border-gray-800"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-white text-center">
              Apply Now
            </h2>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-lg text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-green-400 font-semibold">Application Submitted Successfully!</h3>
                </div>
                <p className="text-green-300 text-sm">
                  Thank you for your interest in joining our team. We'll review your application and get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-lg text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-red-400 font-semibold">Submission Failed</h3>
                </div>
                <p className="text-red-300 text-sm">
                  {errorMessage || 'There was an error submitting your application. Please try again.'}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      formErrors.name 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/30 focus:border-[#00b4ab]'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      formErrors.email 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/30 focus:border-[#00b4ab]'
                    }`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      formErrors.phone 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/30 focus:border-[#00b4ab]'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Position *
                  </label>
                  <select
                    value={selectedJob}
                    onChange={(e) => {
                      setSelectedJob(e.target.value);
                      if (formErrors.job) {
                        setFormErrors(prev => ({ ...prev, job: '' }));
                      }
                      if (submitStatus !== 'idle') {
                        setSubmitStatus('idle');
                      }
                    }}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white focus:outline-none transition-colors duration-300 ${
                      formErrors.job 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/30 focus:border-[#00b4ab]'
                    }`}
                  >
                    <option value="" className="bg-black">Select a position</option>
                    {jobOpenings.map((job, index) => (
                      <option key={index} value={job.title} className="bg-black">
                        {job.title}
                      </option>
                    ))}
                  </select>
                  {formErrors.job && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.job}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Upload Resume (PDF/DOC) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    required
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className={`flex items-center justify-center w-full px-4 py-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                      formErrors.resume 
                        ? 'border-red-500 hover:border-red-400' 
                        : 'border-white/30 hover:border-[#00b4ab]'
                    }`}
                  >
                    <svg className="w-5 h-5 text-white/70 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span className="text-white/70">
                      {resumeFile ? resumeFile.name : 'Choose file...'}
                    </span>
                  </label>
                </div>
                {resumeFile && !formErrors.resume && (
                  <p className="text-green-400 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    File selected: {resumeFile.name}
                  </p>
                )}
                {formErrors.resume && (
                  <p className="text-red-400 text-sm mt-2">{formErrors.resume}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  Supported formats: PDF, DOC, DOCX (Max size: 5MB)
                </p>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00b4ab] to-[#008a82] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00b4ab]/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
