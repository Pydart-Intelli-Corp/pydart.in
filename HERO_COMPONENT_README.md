# Hero Component Documentation

## Overview

The Hero component is a sophisticated, fully responsive landing section featuring advanced animations, interactive elements, and adaptive layouts across all device types and orientations. It serves as the primary entry point for the PyDart website, showcasing the company's AI solutions and the Stibe platform.

## 🏗️ Architecture

### Component Structure
```
Hero Component
├── Background System (Images + Overlays)
├── Interactive Cursor (Desktop Only)
├── Floating Particles
├── Ambient Glow Effects
├── Main Content Container
│   ├── Left Content (8 columns)
│   │   ├── Typewriter Headline
│   │   ├── Subheading
│   │   ├── CTA Buttons
│   │   └── Mobile Stibe Card (Portrait Only)
│   └── Right Content (4 columns)
│       └── Desktop Stibe Card
├── Slide Indicators
└── Scroll Indicator (Desktop Only)
```

### Key Dependencies
- **Framer Motion**: Animation library for smooth transitions and interactions
- **React Hooks**: State management and lifecycle handling
- **Tailwind CSS**: Utility-first styling with custom responsive utilities
- **TypeScript**: Type safety and enhanced development experience

## 📱 Responsive Design System

### Breakpoint Hierarchy
```typescript
const breakpoints = {
  xs: '480px+',    // Extra small mobile
  sm: '640px+',    // Small mobile/large mobile
  md: '768px+',    // Tablet
  lg: '1024px+',   // Desktop
  xl: '1280px+'    // Large desktop
}
```

### Layout Patterns

#### 1. Mobile Portrait (< 768px, portrait)
- **Layout**: Single column (`grid-cols-1`)
- **Content Flow**: Vertical stacking
- **Stibe Card**: Mobile-optimized card below content
- **Positioning**: Progressive upward movement (`mt-16` → `mt-20` → `mt-24`)

#### 2. Mobile Landscape (< 1024px, landscape)
- **Layout**: Two columns (`landscape-mobile:grid-cols-12`)
- **Content Split**: 8/4 column distribution
- **Stibe Card**: Desktop-style card on right
- **Custom CSS**: Orientation-specific utilities

#### 3. Desktop (≥ 1024px)
- **Layout**: Two columns (`lg:grid-cols-12`)
- **Content Split**: 8/4 column distribution
- **Positioning**: Negative margins for elevated content (`-mt-32` → `-mt-48`)
- **Enhanced Features**: Interactive cursor, advanced animations

## 🎯 Positioning System

### Hero Section Container
```tsx
className="relative min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] bg-black text-white overflow-hidden pb-4 xs:pb-6 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32"
```

**Progressive Spacing:**
- **Mobile**: `min-h-[50vh]`, `pt-16`, `pb-4`
- **XS (480px+)**: `min-h-[55vh]`, `pt-16`, `pb-6`
- **SM (640px+)**: `min-h-[60vh]`, `pt-20`, `pb-6`
- **MD (768px+)**: `pt-24`
- **LG (1024px+)**: `pt-28`
- **XL (1280px+)**: `pt-32`

### Main Content Positioning
```tsx
// Hero content container
className="lg:col-span-8 landscape-mobile:col-span-8 text-left pt-0 xs:pt-0 sm:pt-0 md:pt-4 hero-content mt-16 xs:mt-20 sm:mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48"
```

**Margin Progression:**
- **Base (Mobile)**: `mt-16` (64px down)
- **XS (480px+)**: `mt-20` (80px down)
- **SM (640px+)**: `mt-24` (96px down)
- **MD (768px+)**: `-mt-32` (128px up)
- **LG (1024px+)**: `-mt-40` (160px up)
- **XL (1280px+)**: `-mt-48` (192px up)

### Typography Scaling
```tsx
// Main headline
className="text-3xl xs:text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight tracking-tight min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[220px] lg:min-h-[260px] -mt-2 xs:-mt-3 sm:-mt-4 md:mt-0"
```

**Size Progression:**
- **Mobile**: `text-3xl`, `min-h-[120px]`, `-mt-2`
- **XS**: `text-4xl`, `min-h-[140px]`, `-mt-3`
- **SM**: `text-4xl`, `min-h-[160px]`, `-mt-4`
- **MD**: `text-6xl`, `min-h-[220px]`, `mt-0`
- **LG+**: `text-7xl`, `min-h-[260px]`

## 🎨 Visual Features

### 1. Background System
- **Dynamic Images**: Different image sets for mobile/desktop
- **Smooth Transitions**: Dissolving effect between slides
- **Fallback Gradients**: Graceful degradation for failed image loads
- **Overlay System**: Dark overlay for text readability

### 2. Interactive Cursor (Desktop Only)
- **Custom Design**: Futuristic gaming-style cursor
- **Hero Section Scoped**: Only active within hero boundaries
- **Hover States**: Different animations for interactive elements
- **Performance Optimized**: Uses requestAnimationFrame for smooth tracking

### 3. Typewriter Effect
- **Dynamic Speed**: Adjusts based on scroll speed
- **Progressive Reveal**: Line-by-line animation
- **Interactive Hover**: Mouse-responsive text movement
- **Color Coding**: Different colors for emphasis

### 4. Floating Particles
- **Deterministic Positioning**: Consistent placement across loads
- **Staggered Animation**: Individual timing for organic feel
- **Performance Optimized**: CSS transforms for smooth animation

## 📦 Component States

### State Management
```typescript
const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
const [isHovering, setIsHovering] = useState(false);
const [cursorVariant, setCursorVariant] = useState('default');
const [isClient, setIsClient] = useState(false);
const [currentSlide, setCurrentSlide] = useState(0);
const [isTypingComplete, setIsTypingComplete] = useState(false);
const [isMobile, setIsMobile] = useState(false);
const [scrollSpeed, setScrollSpeed] = useState(1);
```

### Animation States
- **Initial Load**: Fade-in animations with staggered delays
- **Typewriter Active**: Character-by-character text reveal
- **Typewriter Complete**: Full content visibility with interactions
- **Hover States**: Mouse-responsive animations
- **Scroll-Based**: Dynamic animation speeds based on scroll velocity

## 🎮 Interactive Elements

### CTA Buttons
1. **Primary Button**: "What We Do" with gradient hover effects
2. **Secondary Button**: "Explore Stibe" with sliding text animation and parentheses reveal

### Stibe Product Cards

#### Mobile Portrait Card
```tsx
className="w-[92vw] max-w-sm xs:max-w-md sm:max-w-lg landscape:w-[75vw] landscape:max-w-xs mx-auto hero-card-mobile min-h-[32vh] xs:min-h-[36vh] sm:min-h-[40vh] landscape:min-h-[60vh]"
```

#### Desktop/Landscape Card
```tsx
className="max-w-xs md:max-w-sm mx-auto landscape-mobile:p-3 landscape-mobile:max-w-xs"
```

## 🔧 Custom CSS Utilities

### Landscape Mobile Detection
```css
@media screen and (max-width: 1023px) and (orientation: landscape) {
  .landscape-mobile\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  .landscape-mobile\:col-span-8 { grid-column: span 8 / span 8; }
  .landscape-mobile\:col-span-4 { grid-column: span 4 / span 4; }
  .landscape-mobile\:block { display: block; }
  .landscape-mobile\:hidden { display: none; }
}
```

### Cursor Management
```css
#hero { cursor: none !important; }
#hero *, #hero *::before, #hero *::after { cursor: none !important; }
```

## ⚡ Performance Optimizations

### 1. Animation Performance
- **requestAnimationFrame**: Smooth cursor tracking
- **CSS Transforms**: Hardware-accelerated animations
- **Conditional Rendering**: Mobile-specific optimizations

### 2. Image Loading
- **Error Handling**: Graceful fallbacks for failed loads
- **Responsive Images**: Different images for different devices
- **Preloading**: Background image optimization

### 3. Memory Management
- **Cleanup Functions**: Proper event listener removal
- **Animation Frame Cleanup**: Prevents memory leaks
- **Conditional Effects**: Device-specific hook execution

## 🛠️ Development Guidelines

### Adding New Breakpoints
1. Define in breakpoint system
2. Add to typography scaling
3. Update positioning classes
4. Test across devices

### Modifying Animations
1. Update base timing values
2. Consider scroll speed multipliers
3. Test performance impact
4. Maintain accessibility

### Content Updates
1. Update typewriter text in `typewriterLines` array
2. Modify background images in `desktopImages`/`mobileImages`
3. Adjust CTA button text and targets
4. Update Stibe card content

## 🎭 Animation Timing

### Base Timings
```typescript
const baseTypingSpeed = 20;      // Character typing delay
const basePauseSpeed = 50;       // Line completion pause
const baseInitialDelay = 100;    // Initial animation delay
```

### Scroll-Responsive Multipliers
- **Scroll Speed Detection**: Real-time calculation
- **Dynamic Adjustment**: 1x to 5x speed multiplier
- **Minimum Thresholds**: Prevents overly fast animations

## 🔍 Debugging Tools

### State Inspection
- All states are accessible through React DevTools
- Mouse position tracking for cursor debugging
- Animation completion flags for timing issues

### CSS Classes
- `.hero-responsive`: Main container identifier
- `.hero-content`: Content positioning marker
- `.hero-heading`: Typography identifier
- `.hero-card-mobile`: Mobile card identifier

## 📝 Configuration Options

### Customizable Values
```typescript
// Image arrays
const desktopImages = [/* URLs */];
const mobileImages = [/* URLs */];

// Typewriter content
const typewriterLines = [
  { text: 'Intelligence,', color: 'text-white' },
  { text: 'Designed for', color: 'text-[#00b4ab]' },
  { text: 'Everyday Impact.', color: 'text-white' }
];

// Particle positions
const particlePositions = [/* x, y coordinates */];
```

## 🚀 Future Enhancements

### Planned Features
1. **A/B Testing**: Multiple headline variations
2. **Internationalization**: Multi-language support
3. **Analytics Integration**: Interaction tracking
4. **Advanced Animations**: Physics-based transitions
5. **Accessibility**: Enhanced screen reader support

### Performance Goals
1. **Core Web Vitals**: Optimize LCP, FID, CLS
2. **Bundle Size**: Code splitting optimization
3. **Loading Speed**: Progressive image loading
4. **Battery Efficiency**: Animation optimization

## 📚 Dependencies

### Required Packages
```json
{
  "framer-motion": "^10.x.x",
  "react": "^18.x.x",
  "typescript": "^5.x.x",
  "tailwindcss": "^3.x.x"
}
```

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS 14+, Android 10+
- **Features**: CSS Grid, Flexbox, CSS Transforms, requestAnimationFrame

---

## 🤝 Contributing

When modifying the Hero component:

1. **Test All Breakpoints**: Verify responsive behavior
2. **Check Performance**: Monitor animation performance
3. **Validate Accessibility**: Ensure keyboard navigation
4. **Update Documentation**: Keep this README current
5. **Cross-Device Testing**: Test on real devices

For questions or suggestions, please refer to the main project documentation or create an issue in the repository.
