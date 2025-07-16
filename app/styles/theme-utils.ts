/**
 * PyDart Theme Utilities
 * 
 * This file provides utility functions for using the theme in components.
 */

import { theme } from './theme';

// CSS variable name generator
export const cssVar = (name: string): string => `var(--${name})`;

// Convert theme to CSS variables
export const themeToCssVariables = (): Record<string, string> => {
  const variables: Record<string, string> = {};
  
  // Process colors
  Object.entries(theme.colors).forEach(([category, values]) => {
    if (typeof values === 'string') {
      variables[`--color-${category}`] = values;
    } else if (typeof values === 'object') {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'string') {
          variables[`--color-${category}-${key}`] = value;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              variables[`--color-${category}-${key}-${subKey}`] = subValue;
            }
          });
        }
      });
    }
  });
  
  // Process font sizes
  Object.entries(theme.fontSize).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });
  
  // Process spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });
  
  // Process border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    const normalizedKey = key === 'DEFAULT' ? 'default' : key;
    variables[`--radius-${normalizedKey}`] = value;
  });
  
  // Process shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    const normalizedKey = key === 'DEFAULT' ? 'default' : key;
    variables[`--shadow-${normalizedKey}`] = value;
  });
  
  // Process animation timing
  Object.entries(theme.animation).forEach(([key, value]) => {
    variables[`--animation-${key}`] = value;
  });
  
  return variables;
};

// Generate CSS string for theme variables
export const generateCssVariables = (): string => {
  const variables = themeToCssVariables();
  return Object.entries(variables)
    .map(([name, value]) => `${name}: ${value};`)
    .join('\n  ');
};

// Theme class builder to use the theme in components with Tailwind
export const tx = {
  // Text color helpers
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    tertiary: 'text-gray-400',
    accent: 'text-[#00b4ab]',
  },
  
  // Background helpers
  bg: {
    dark: 'bg-black',
    darker: 'bg-gray-900',
    gradient: 'bg-gradient-to-b from-black to-gray-900',
    card: 'bg-gray-800',
    accent: 'bg-[#00b4ab]',
  },
  
  // Button variants
  button: {
    primary: 'bg-[#00b4ab] hover:bg-[#33c3bc] text-white transition-colors duration-300',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300',
    outline: 'border border-gray-600 hover:border-[#00b4ab] text-white hover:text-[#00b4ab] transition-colors duration-300',
    link: 'text-gray-300 hover:text-[#00b4ab] transition-colors duration-300',
  },
  
  // Input styles
  input: 'bg-gray-800 border border-gray-600 focus:border-[#00b4ab] text-white rounded',
  
  // Card styles
  card: 'bg-gray-800 rounded-lg shadow-lg',
  
  // Section styles
  section: {
    default: 'py-12 md:py-16',
    gradient: 'bg-gradient-to-b from-black to-gray-900 text-white',
  },
  
  // Heading styles
  heading: {
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold text-white',
    h2: 'text-2xl md:text-3xl lg:text-4xl font-bold text-white',
    h3: 'text-xl md:text-2xl lg:text-3xl font-bold text-white',
    h4: 'text-lg md:text-xl font-bold text-white',
  },
  
  // Animation helpers
  animation: {
    fadeIn: 'animate-fade-in-up',
    float: 'animate-float',
  },
  
  // Hover effects
  hover: {
    accent: 'hover:text-[#00b4ab] transition-colors duration-300',
    scale: 'hover:scale-105 transition-transform duration-300',
    shadow: 'hover:shadow-lg transition-shadow duration-300',
  },
  
  // Layout helpers
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    fullWidth: 'w-full',
    flex: {
      center: 'flex items-center justify-center',
      between: 'flex items-center justify-between',
      column: 'flex flex-col',
    }
  },
};

// Utility function to combine multiple tailwind classes
export const cls = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};
