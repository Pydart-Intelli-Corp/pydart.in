/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: '#FF4D00',
          light: '#FF7A40',
          dark: '#CC3E00',
          ultralight: '#FFF0EB',
          ultradark: '#992F00',
        },
        // Accent colors for visual interest
        accent: {
          blue: '#0066FF',
          purple: '#8A2BE2',
          teal: '#00CCCC',
          gold: '#FFD700',
        },
        // Background colors for the theme
        pydark: {
          900: '#0A0A0A',  // darkest
          800: '#111827',  // gray-900
          700: '#1F2937',  // gray-800
          600: '#374151',  // gray-700
          500: '#4B5563',  // gray-600
        },
        // Add state colors
        state: {
          success: '#10B981', // emerald-500
          error: '#EF4444',   // red-500
          warning: '#F59E0B', // amber-500
          info: '#3B82F6',    // blue-500
        },
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        slide: 'slide 30s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards'
      },
      boxShadow: {
        'accent': '0 4px 14px 0 rgba(255, 77, 0, 0.39)',
        'blue': '0 10px 20px -5px rgba(0, 112, 243, 0.2), 0 4px 6px -2px rgba(0, 112, 243, 0.05)',
        'purple': '0 10px 20px -5px rgba(124, 58, 237, 0.2), 0 4px 6px -2px rgba(124, 58, 237, 0.05)',
        'glow-blue': '0 0 15px rgba(0, 112, 243, 0.35), 0 0 5px rgba(0, 112, 243, 0.15)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, #000000, #111827)',
        'gradient-blue': 'linear-gradient(135deg, rgba(0, 112, 243, 0.1), rgba(124, 58, 237, 0.05))',
        'gradient-mesh': 'radial-gradient(at 0% 0%, rgba(0, 112, 243, 0.15) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 201, 167, 0.15) 0, transparent 50%), radial-gradient(at 0% 100%, rgba(79, 70, 229, 0.15) 0, transparent 50%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(18, 21, 31, 0.95) 0%, rgba(13, 16, 25, 0.95) 100%)',
        'pattern-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'pattern-dots': 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
      }
    },
  },
  plugins: [],
}
