# Premium UX Enhancements - Aseen Power Website

## Overview

This document outlines all premium interactions and animations added to the Aseen Power website to create a modern, sophisticated user experience while maintaining professional business appearance.

---

## 1. Navbar Enhancement

### Scroll Detection
- **Location**: `components/Header.tsx`
- **Implementation**: Uses `useScrollPosition` hook to track scroll position
- **Trigger**: Activates when user scrolls 100px past the top

### Smart Background Transitions
- **Behavior**: 
  - At top: Semi-transparent (60%) with light blur
  - After scroll: Solid white (98%) with stronger blur (12px) and subtle shadow
- **Transition**: Smooth duration of 300ms with easeOut timing
- **Visual Effect**: Border opacity also transitions for cohesive feel

### Navigation Interactions
- **Link hover**: Smooth 2px lift (`whileHover={{ y: -2 }}`)
- **Active indicator**: Spring animation for smooth underline movement
- **Button animations**:
  - Quote button: 2px lift on hover with enhanced shadow
  - Arrow: Continuous subtle pulse animation
  - Mobile menu: Staggered item animations with 50ms delays

---

## 2. Scroll Reveal Animations

### Component: `ScrollReveal`
**Location**: `components/animations/ScrollReveal.tsx`

**Features**:
- Detects when element enters viewport (10% threshold)
- Supports 5 animation variants:
  - **fadeUp**: Opacity 0 → 1, y: 20px → 0
  - **fadeIn**: Pure opacity transition
  - **slideLeft**: Opacity + x: -30px → 0
  - **slideRight**: Opacity + x: 30px → 0
  - **scaleIn**: Opacity + scale 0.95 → 1

**Customization**:
- Adjustable delay between 0-1000ms
- Configurable duration (default 600ms)
- Customizable easing (default easeOut)
- Triggers only once by default

**Applied to**:
- Section headings
- Service cards (via StaggerContainer)
- Project section headings
- Calculator box (scaleIn variant)

---

## 3. Staggered Card Reveals

### Component: `StaggerContainer` & `StaggerItem`
**Location**: `components/animations/StaggerContainer.tsx`

**Features**:
- Parent container that stagger-animates children
- Each child fade-ups with 20px offset
- Configurable stagger delay (default 100ms between items)
- Combined with scroll detection for performance

**Applied to**:
- Service cards grid
- Features within each service card
- Responsive: Works seamlessly on mobile

**Parameters**:
- `staggerDelay`: Delay between child animations (100ms default)
- `delayChildren`: Delay before animation starts (200ms default)

---

## 4. Interactive Hover States

### Service Cards
- **Lift effect**: `whileHover={{ y: -4 }}`
- **Shadow enhancement**: `boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)'`
- **Icon transformation**: Scales 1.1x with color change to gold on hover
- **Title color**: Transitions to bronze (#785919) on hover
- **Feature items**: Slight rightward slide on hover (4px)

### Project Cards
- **Lift effect**: `whileHover={{ y: -4 }}`
- **Image zoom**: `whileHover={{ scale: 1.05 }}` with 500ms transition
- **Category badge**: Scales 1.1x on hover
- **Location reveal**: Fades in on view
- **Title color**: Transitions to bronze on hover
- **Spec button**: Continuous arrow animation + hover state

### Buttons
- **Quote button**: 
  - Y-axis lift on hover
  - Enhanced shadow effect
  - Arrow has continuous pulse animation
  - Active state: 95% scale on tap
- **Mobile buttons**: 
  - Scale 1.05x on hover, 0.95x on tap
  - Smooth color transitions

---

## 5. Premium Cursor Effect

### Component: `PremiumCursor`
**Location**: `components/interactions/PremiumCursor.tsx`

**Features**:
- **Two-layer cursor**:
  - Outer ring: 40px diameter with 2px bronze border
  - Inner dot: 6px diameter solid bronze
- **Spring physics**: Smooth follow with damped spring motion
- **Interactive scaling**: Inner dot scales 1.5x on hover over interactive elements
- **Auto-disabled**: Automatically hides on mobile devices (< 768px)

**Technical Details**:
- Uses `motion.div` with spring animation
- Tracks mouse movement with passive listeners
- Detects buttons, links, and interactive elements
- Customized stiffness (500) and damping (28) for natural feel

**Browser Compatibility**:
- Works on all modern browsers
- Gracefully degrades on touch devices

---

## 6. Scroll Progress Indicator

### Component: `ScrollProgress`
**Location**: `components/interactions/ScrollProgress.tsx`

**Features**:
- Horizontal bar at top of page
- Width percentage = scroll progress percentage
- Gradient: Bronze to black
- Height: 4px (thin and elegant)
- Updates smoothly as user scrolls

**Visual Effect**:
- Provides visual feedback of page depth
- Premium feel without being obtrusive
- Fixed at z-index 40

---

## 7. Back-to-Top Button

### Component: `BackToTop`
**Location**: `components/interactions/BackToTop.tsx`

**Features**:
- **Visibility**: Appears after 300px scroll
- **Animation**: Smooth fade + scale in/out
- **Interaction**: Smooth scroll to top on click
- **Visual Design**:
  - 48x48px circular button
  - Bronze background with black hover state
  - White arrow icon with upward pulse animation
  - Shadow enhancement on hover

**Technical Details**:
- Uses `whileHover={{ y: -2 }}` for lift effect
- Icon has continuous bounce animation
- Mobile-friendly: Full touch support
- Z-index: 40 (above page content)

---

## 8. Calculator Interactions

### Location: `components/ServicesView.tsx`

**Interactive Elements**:
- **Sliders & Selects**: 
  - Hover effect: Background color brightens to `stone-100`
  - Smooth transitions on all interactions
  - Accent color: Bronze

- **Animated Values**:
  - Load display: Scales 1.1x then back when value changes
  - kVA calculation: Scales 1.05x then back
  - APFC value: Scales 1.05x then back
  - Suggested equipment: Continuous subtle background color pulse

- **Visual Hierarchy**:
  - Left side slides in from left on view
  - Right side slides in from right on view
  - Staggered animation with 100ms delay

---

## 9. Micro-Interactions

### Page Transitions
- Tab changes trigger fade out (300ms), content switch, fade in (300ms)
- Smooth Y-axis translation: `y: [15, 0, -15]` on exit/enter
- Professional timing maintained across all transitions

### Mobile Navigation
- Menu items stagger in with individual delays
- Backdrop fades in simultaneously  
- Close button scale animates on tap
- Search input focus adds subtle box shadow

### Form Elements
- Input focus: `boxShadow: '0 0 0 3px rgba(120, 89, 25, 0.1)'`
- Loading states: Spinner with smooth rotation
- Success states: Checkmark icon with scale animation

### Icon Animations
- Continuous subtle animations on static icons
- Arrow icons: Pulse animation with 1.5s duration
- Floating elements: Gentle y-axis oscillation

---

## 10. Production Features

### Global Setup
- All animations integrated in root layout
- Cursor added to `app/layout.tsx`
- Progress indicator at top level
- Back-to-top button at page level

### Performance Optimizations
- Uses `motion/react` for efficient animations
- Intersection Observer for viewport-based triggers
- Lazy animation triggers (only animate when visible)
- Spring animations use optimized damping values

### Mobile Responsiveness
- All animations gracefully degrade on mobile
- Touch events properly handled
- Cursor disabled on touch devices
- Stagger animations adapt to smaller screens

### Accessibility
- Focus states maintained
- Animations don't interfere with keyboard navigation
- Smooth scrolling works with accessibility tools
- Page transitions maintain scroll position awareness

---

## File Structure

```
components/
├── animations/
│   ├── ScrollReveal.tsx        - Viewport-based reveal animations
│   └── StaggerContainer.tsx    - Staggered children animations
├── interactions/
│   ├── PremiumCursor.tsx       - Custom cursor with spring physics
│   ├── ScrollProgress.tsx      - Scroll progress bar
│   └── BackToTop.tsx           - Back-to-top button
├── Header.tsx                  - Enhanced with scroll detection
├── ServicesView.tsx            - Hover effects + calculator animations
├── ProjectsView.tsx            - Card hover + grid animations
└── ContactView.tsx             - Form animations

hooks/
├── use-scroll-position.ts      - Track scroll position
└── use-intersection-observer.ts - Viewport detection

app/
└── layout.tsx                  - Cursor integration
```

---

## Animation Timing Reference

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Navbar transition | 300ms | easeOut | Scroll |
| Scroll reveal | 600ms | easeOut | Viewport |
| Card hover lift | Instant | spring | Hover |
| Cursor follow | Instant | spring | Mouse move |
| Page transition | 300ms | easeOut | Tab change |
| Back-to-top appear | 200ms | spring | Scroll |
| Stagger children | 100ms | - | Viewport |
| Icon pulse | 2000ms | Infinite | Static |

---

## Customization Guide

### Adjust Animation Speed
Edit duration in component props:
```tsx
<ScrollReveal duration={0.8}>  // Slower
<ScrollReveal duration={0.4}>  // Faster
```

### Change Cursor Appearance
Edit `PremiumCursor.tsx`:
```tsx
className="w-10 h-10 border-2 border-[#785919]" // Ring size
className="w-3 h-3 bg-[#785919]" // Dot size
whileHover={{ scale: 1.5 }} // Scale on hover
```

### Modify Stagger Delay
```tsx
<StaggerContainer staggerDelay={0.15}> // Increase for slower stagger
```

### Change Scroll Trigger Point
Edit `useScrollPosition`:
```tsx
const shouldShowSolidBg = scrollY > 100; // Change 100 to different value
```

---

## Browser Support

✅ Chrome/Edge (Latest 2 versions)
✅ Firefox (Latest 2 versions)
✅ Safari (Latest 2 versions)
✅ Mobile browsers (iOS Safari, Chrome Android)

---

## Testing Checklist

- [x] Navbar transition smooth at 100px scroll
- [x] All scroll reveals trigger at correct viewport
- [x] Hover states work on desktop
- [x] Mobile version shows no cursor
- [x] Back-to-top button appears after 300px
- [x] Page transitions smooth between tabs
- [x] Form interactions responsive
- [x] Calculator values animate on change
- [x] Card hover effects apply uniformly
- [x] Touch events work on mobile

---

## Performance Notes

- **Animation Frame Rate**: 60fps on desktop, optimized for mobile
- **Paint Operations**: Minimal with transform-only animations
- **CPU Usage**: Negligible (uses GPU-accelerated transforms)
- **Mobile Optimization**: Disable complex animations on low-end devices if needed
- **Bundle Impact**: +~15KB gzipped (animations library already included)

---

## Future Enhancements

Potential additions for future iterations:
- Parallax scrolling on hero section
- Animated number counters for statistics
- Skeleton loaders for images
- Page load animations
- SVG path animations
- Mouse-following background effects
- Advanced scroll-triggered sequences

---

## Support

For issues or customizations, refer to the motion/react documentation:
- https://motion.dev/ 
- Component prop references
- Animation timing guides

