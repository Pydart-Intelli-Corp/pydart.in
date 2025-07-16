'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cls } from '../../styles/theme-utils';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'gradient' | 'glass' | 'glow' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  animated?: boolean;
  glowColor?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  animated = false,
  glowColor,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();
  
  // Base styles with improved transitions
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none focus-visible:outline-none';
  
  // Modern variant styles with improved shadows and focus effects
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-light text-white focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 shadow-sm hover:shadow-md',
    secondary: 'bg-pydark-600 hover:bg-pydark-500 text-white focus-visible:ring-2 focus-visible:ring-pydark-500/50 focus-visible:ring-offset-2 shadow-sm hover:shadow',
    outline: 'border border-pydark-600 hover:border-primary text-white hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 hover:shadow-sm',
    link: 'text-gray-300 hover:text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 bg-transparent',
    gradient: 'bg-gradient-to-r from-primary to-accent-blue text-white hover:shadow-blue focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 shadow-sm',
    glass: 'bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gray-800 border border-gray-700/30 hover:bg-gray-700 hover:bg-opacity-40 text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-gray-400/20 focus-visible:ring-offset-1',
    glow: 'bg-primary border-2 border-primary/80 text-white hover:shadow-glow-blue relative overflow-hidden shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2',
    ghost: 'bg-transparent hover:bg-gray-800/30 text-white focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 hover:shadow-sm',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 h-8',
    md: 'text-base px-4 py-2 h-10',
    lg: 'text-lg px-6 py-3 h-12',
    xl: 'text-xl px-8 py-4 h-14',
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Disabled styles
  const disabledStyles = disabled || isLoading 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  // Animated style for the button
  const buttonContent = (
    <>
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
      
      {variant === 'glow' && (
        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute -inset-[40%] animate-spin-slow bg-gradient-to-r from-primary-light via-transparent to-accent-blue opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      )}
    </>
  );

  // Return animated button if animated prop is true
  if (animated) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={cls(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          disabledStyles,
          className
        )}
        disabled={disabled || isLoading}
      >
        {buttonContent}
      </motion.button>
    );
  }

  // Return regular button
  return (
    <button
      className={cls(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        disabledStyles,
        variant === 'glow' ? 'group' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {buttonContent}
      
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
