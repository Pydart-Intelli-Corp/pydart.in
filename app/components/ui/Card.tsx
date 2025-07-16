'use client';

import { ReactNode } from 'react';
import { cls } from '../../styles/theme-utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'glowing' | 'frosted' | 'premium' | 'minimal';
  padded?: boolean;
  hoverEffect?: boolean;
  animated?: boolean;
}

export default function Card({
  children,
  className,
  variant = 'default',
  padded = true,
  hoverEffect = false,
  animated = false,
}: CardProps) {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-pydark-700 shadow-sm',
    elevated: 'bg-pydark-700 shadow-md',
    outlined: 'border border-pydark-600/80 bg-transparent',
    glass: 'bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gray-800/70 border border-gray-700/50 shadow-md',
    gradient: 'bg-gradient-to-br from-pydark-900 via-pydark-800 to-pydark-700 shadow-sm',
    glowing: 'border border-primary/50 relative bg-pydark-800/90 hover:shadow-glow-blue shadow-sm',
    frosted: 'bg-white bg-opacity-5 backdrop-filter backdrop-blur-md border border-white border-opacity-10 shadow-md',
    premium: 'bg-gradient-mesh border border-gray-700/30 backdrop-filter backdrop-blur-sm shadow-lg',
    minimal: 'bg-pydark-800/80 backdrop-filter backdrop-blur-sm border-b border-primary/20 shadow-sm',
  };
  
  const paddingClasses = padded ? 'p-6' : '';
  
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-300 hover:shadow-blue hover:-translate-y-1' 
    : '';
  
  const content = (
    <div
      className={cls(
        baseClasses,
        variantClasses[variant],
        paddingClasses,
        hoverClasses,
        variant === 'glowing' ? 'group' : '',
        className
      )}
    >
      {children}
      {variant === 'glowing' && (
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-primary opacity-20 blur-xl rounded-xl"></div>
        </div>
      )}
    </div>
  );
  
  if (animated) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
}
