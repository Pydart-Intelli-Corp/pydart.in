'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: [
        'Personal Information: We may collect personal information such as your name, email address, phone number, and other contact details when you voluntarily provide them through our website forms, contact us, or use our services.',
        'Usage Data: We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on our site.',
        'Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our services and website functionality',
        'Respond to your inquiries and provide customer support',
        'Send you important updates about our services',
        'Analyze website usage to improve user experience',
        'Comply with legal obligations and protect our rights'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      content: [
        'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.',
        'We may share your information with trusted service providers who assist us in operating our website and conducting our business.',
        'We may disclose your information when required by law or to protect our rights, property, or safety.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: [
        'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        'We use industry-standard encryption and secure servers to safeguard your data.',
        'Despite our security measures, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      content: [
        'Access: You have the right to request access to the personal information we hold about you.',
        'Correction: You may request that we correct any inaccurate or incomplete personal information.',
        'Deletion: You may request that we delete your personal information, subject to certain legal obligations.',
        'Opt-out: You may opt out of receiving promotional communications from us at any time.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: [
        'Our website uses cookies to improve your browsing experience and provide personalized content.',
        'You can control cookie settings through your browser preferences.',
        'Disabling cookies may affect the functionality of certain features on our website.'
      ]
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      content: [
        'Our website may contain links to third-party websites or services.',
        'We are not responsible for the privacy practices of these third-party services.',
        'We encourage you to review the privacy policies of any third-party services you access.'
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under the age of 13.',
        'We do not knowingly collect personal information from children under 13.',
        'If we become aware that we have collected such information, we will take steps to delete it promptly.'
      ]
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.',
        'We will notify you of any material changes by posting the updated policy on our website.',
        'Your continued use of our services after such changes constitutes acceptance of the updated policy.'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we protect and handle your personal information.
            </p>
            <div className="flex justify-center">
              <Image
                src="/assets/icons/privacy-shield.svg"
                alt="Privacy Protection"
                width={80}
                height={80}
                className="opacity-80"
                onError={(e) => {
                  // Fallback to a simple shield icon using SVG
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              <strong>Last Updated:</strong> July 21, 2025
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Effective Date:</strong> July 21, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At PyDart Intelli Corp, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              or use our services. Please read this policy carefully to understand our practices regarding your personal data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        activeSection === section.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {activeSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-gray-200 pt-4">
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-700 leading-relaxed flex items-start">
                            <svg className="w-2 h-2 text-blue-500 mt-2 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Questions About Our Privacy Policy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              If you have any questions or concerns about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@pydart.in"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
              <div className="text-lg">
                <span className="font-medium">Email:</span> info@pydart.in
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm">
            This privacy policy is governed by the laws of India. For any disputes related to this policy, 
            the courts of Kochi, Kerala shall have exclusive jurisdiction.
          </p>
        </div>
      </section>
    </div>
  );
}
