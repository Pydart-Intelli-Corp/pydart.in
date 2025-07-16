'use client';

/**
 * Theme Switcher Utility
 * 
 * This utility provides functions to manipulate theme-related DOM elements and apply
 * animations when switching between themes or when elements enter the viewport.
 */

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Add fade-in animation to elements when they enter the viewport
export function useFadeInOnScroll(options = { once: true, amount: 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, options);
  
  useEffect(() => {
    if (isInView && ref.current) {
      (ref.current as HTMLElement).classList.add('animate-fadeInUp');
    }
  }, [isInView]);
  
  return ref;
}

// Apply dynamic gradient backgrounds
export function useGradientBackground(startColor: string, endColor: string) {
  const ref = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    ref.current.style.background = `linear-gradient(to bottom right, ${startColor}, ${endColor})`;
    ref.current.style.backgroundSize = '200% 200%';
    ref.current.classList.add('animate-gradient');
  }, [startColor, endColor]);
  
  return ref;
}

// Create an interactive element that follows cursor movement
export function useInteractiveCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      
      // Calculate position within the element
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Update the position of the glow effect
      const glowElement = element.querySelector('.cursor-glow') as HTMLElement;
      if (glowElement) {
        glowElement.style.left = `${x}px`;
        glowElement.style.top = `${y}px`;
        glowElement.style.opacity = '1';
      }
    };
    
    const handleMouseLeave = () => {
      const glowElement = element.querySelector('.cursor-glow') as HTMLElement;
      if (glowElement) {
        glowElement.style.opacity = '0';
      }
    };
    
    // Create and append the glow element if it doesn't exist
    if (!element.querySelector('.cursor-glow')) {
      const glow = document.createElement('div');
      glow.className = 'cursor-glow absolute w-40 h-40 rounded-full bg-primary opacity-0 pointer-events-none transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 blur-xl';
      element.appendChild(glow);
      
      // Ensure the parent has position relative
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
    }
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return ref;
}
