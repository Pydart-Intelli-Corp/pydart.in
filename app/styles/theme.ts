/**
 * PyDart Theme Configuration
 * 
 * This file contains theme constants used throughout the application
 * for consistent styling based on the footer and career components.
 */

export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      main: '#FF4D00',        // Orange accent color (used in hover effects)
      light: '#FF7A40',       // Lighter shade of primary
      dark: '#CC3E00',        // Darker shade of primary
      ultraLight: '#FFF0EB',  // Very light shade for backgrounds
      ultraDark: '#992F00',   // Very dark shade for strong accents
    },
    
    // Accent colors for more vibrant designs
    accent: {
      blue: '#0066FF',
      purple: '#8A2BE2',
      teal: '#00CCCC',
      gold: '#FFD700',
    },
    
    // Background colors
    background: {
      light: '#FFFFFF',
      dark: '#0A0A0A',
      card: {
        light: '#F9F9F9',
        dark: '#161616',
        glass: 'rgba(31, 41, 55, 0.5)',
        frosted: 'rgba(255, 255, 255, 0.05)',
      },
      gradient: {
        from: '#000000',  // black
        to: '#111827',    // gray-900
        primary: 'linear-gradient(to right, #FF4D00, #FF7A40)',
        accent: 'linear-gradient(to right, #0066FF, #8A2BE2)',
        conic: 'conic-gradient(from 45deg at center, #CC3E00, #0066FF, #8A2BE2, #FF4D00, #CC3E00)',
      }
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',     // white
      secondary: '#D1D5DB',   // gray-300
      tertiary: '#9CA3AF',    // gray-400
    },
    
    // State colors
    state: {
      success: '#10B981',     // emerald-500
      error: '#EF4444',       // red-500
      warning: '#F59E0B',     // amber-500
      info: '#3B82F6',        // blue-500
    },
    
    // Common UI element colors
    ui: {
      border: '#374151',      // gray-700
      input: {
        background: '#1F2937', // gray-800
        border: '#4B5563',    // gray-600
        focus: '#FF4D00',     // Primary color
      },
      card: {
        background: '#1F2937', // gray-800
      },
      button: {
        primary: {
          background: '#FF4D00',
          hover: '#FF6C33',
          text: '#FFFFFF',
        },
        secondary: {
          background: '#374151', // gray-700
          hover: '#4B5563',     // gray-600
          text: '#FFFFFF',
        },
      }
    }
  },
  
  // Font sizes following a consistent scale
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Spacing scale (can be used for margins, paddings, etc.)
  spacing: {
    0: '0',
    1: '0.25rem',      // 4px
    2: '0.5rem',       // 8px
    3: '0.75rem',      // 12px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    8: '2rem',         // 32px
    10: '2.5rem',      // 40px
    12: '3rem',        // 48px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Border radius values
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',    // Full rounded (circle)
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  
  // Animation timing
  animation: {
    fast: '0.15s',
    default: '0.3s',
    slow: '0.5s',
  },
  
  // Z-index scale
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
  },
};

// Type definitions for theme
export type Theme = typeof theme;

// Helper function to access theme values
export const getThemeValue = <T extends keyof typeof theme>(
  themeSection: T,
  path: string
): any => {
  const sections = path.split('.');
  let value: any = theme[themeSection];
  
  for (const section of sections) {
    if (value && value[section] !== undefined) {
      value = value[section];
    } else {
      return undefined;
    }
  }
  
  return value;
};
