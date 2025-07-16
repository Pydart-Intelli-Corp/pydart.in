'use client';

import React, { useState, useRef } from 'react';

interface Service {
  title: string;
  description: string;
  technologies: string[];
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Modern websites and applications built with the latest technologies for optimal performance and user experience.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"]
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"]
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that create intuitive and engaging digital experiences.",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle"]
  },
  {
    title: "Digital Strategy",
    description: "Comprehensive digital marketing strategies to grow your online presence and reach your target audience.",
    technologies: ["SEO", "Analytics", "Social Media", "Content Strategy"]
  },
  {
    title: "Brand Design",
    description: "Visual identity design that communicates your brand values and creates lasting impressions.",
    technologies: ["Photoshop", "Illustrator", "InDesign", "After Effects"]
  },
  {
    title: "Consulting",
    description: "Expert guidance and strategic planning to help you navigate digital transformation and growth.",
    technologies: ["Strategy", "Planning", "Analysis", "Implementation"]
  }
];

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const isHovered = hoveredCard === index;
    
    return (
      <div
        className="group border border-gray-200 bg-white hover:border-gray-300 transition-colors duration-200 cursor-pointer"
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Content */}
        <div className="p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {service.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Technologies - Minimal */}
          <div className="text-xs text-gray-500 mb-8">
            {service.technologies.join(' • ')}
          </div>

          {/* Simple CTA */}
          <div className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
            Learn more →
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Minimal Header */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Services
          </h2>
          <p className="text-gray-600 max-w-2xl">
            We create digital solutions that matter.
          </p>
        </div>

        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
