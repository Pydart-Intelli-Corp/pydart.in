'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white pt-10 pb-6">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">
          
          {/* Our Services */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 tracking-wider">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Website Development
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  iOS & Android Development
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 11-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Embedded System Development
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                  </svg>
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  IoT Solutions
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 tracking-wider">Careers</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/careers" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Current Openings
                </Link>
              </li>
              <li>
                <Link 
                  href="/internship" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  Internship Programs
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  </svg>
                  Employee Benefits
                </Link>
              </li>
              <li>
                <span className="text-gray-300 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Tech Stack
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/careers"
                className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
              >
                Join Our Team
              </Link>
            </div>
          </div>

          {/* Internship */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 tracking-wider">Internship</h4>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                Gain hands-on experience with cutting-edge projects.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real Project Experience
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mentorship & Training
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Certificate of Completion
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/internship"
                  className="inline-block px-6 py-2.5 bg-gradient-to-r from-[#FF4D00] to-[#e64400] hover:from-[#e64400] hover:to-[#d63900] text-white rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="mailto:info@pydart.in" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@pydart.in
                </Link>
              </li>
              <li>
                <Link 
                  href="tel:+917356765056" 
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 73567-65056
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.google.com/maps?q=10.001321532145445,76.30230229063729" 
                  target="_blank"
                  className="text-gray-300 hover:text-[#FF4D00] transition-colors duration-300 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF4D00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Palarivattom, Kochi
                </Link>
              </li>
              <li>
                <div className="text-gray-300 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Mon-Fri: 9AM - 6PM
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-white text-base font-bold mb-3 tracking-wider">Investor Relations</h5>
              <Link
                href="mailto:founder@pydart.in"
                className="inline-block px-4 py-2 border border-gray-400 hover:border-[#FF4D00] text-gray-300 hover:text-[#FF4D00] rounded-full text-sm font-medium transition-colors duration-300"
              >
                Investment Enquiry
              </Link>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <Image
                src="/assets/logos/pydart-GreenWhite.png"
                alt="Pydart Logo"
                width={150}
                height={75}
                className="mx-auto"
              />
            </div>
            <p className="text-gray-300 text-sm italic mb-4">
              Innovate. Integrate. Inspire.
            </p>
            <p className="text-gray-300 text-sm italic mb-4">
              --------------- Follow us on ---------------
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              <Link 
                href="https://github.com/Pydart-Intelli-Corp" 
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF4D00] transition-colors duration-300 group"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current text-white group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link 
                href="https://www.linkedin.com/company/pydart-intelli-corp/" 
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF4D00] transition-colors duration-300 group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current text-white group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link 
                href="https://www.instagram.com/pydart.india?igsh=MTVwMWhlMm9qNWRydw==" 
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF4D00] transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current text-white group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-xs tracking-wider">
            © {currentYear} Pydart Intelli Corp Pvt Ltd. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
