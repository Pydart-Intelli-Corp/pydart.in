'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { theme as defaultTheme, Theme } from '../styles/theme';

type ThemeMode = 'light' | 'dark';
type AnimationLevel = 'reduced' | 'normal' | 'enhanced';

type ThemeContextType = {
  theme: Theme;
  mode: ThemeMode;
  animationLevel: AnimationLevel;
  toggleMode: () => void;
  setAnimationLevel: (level: AnimationLevel) => void;
  isHighContrastMode: boolean;
  toggleHighContrastMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
  initialAnimationLevel?: AnimationLevel;
}

export function ThemeProvider({ 
  children, 
  initialMode = 'dark', // Default to dark mode since the site uses dark themes
  initialAnimationLevel = 'normal'
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [animationLevel, setAnimationLevel] = useState<AnimationLevel>(initialAnimationLevel);
  const [isHighContrastMode, setIsHighContrastMode] = useState<boolean>(false);

  // Apply theme class to document when mode changes
  useEffect(() => {
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${mode}-mode`);

    // Apply animation level class
    document.documentElement.classList.remove('reduced-animations', 'normal-animations', 'enhanced-animations');
    document.documentElement.classList.add(`${animationLevel}-animations`);

    // Apply high contrast if enabled
    document.documentElement.classList.toggle('high-contrast', isHighContrastMode);
  }, [mode, animationLevel, isHighContrastMode]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const toggleHighContrastMode = () => {
    setIsHighContrastMode(prev => !prev);
  };

  const value = {
    theme: defaultTheme,
    mode,
    animationLevel,
    toggleMode,
    setAnimationLevel,
    isHighContrastMode,
    toggleHighContrastMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
