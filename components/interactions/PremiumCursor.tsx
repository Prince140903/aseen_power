'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface CursorPosition {
  x: number;
  y: number;
}

export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check if mobile and set client flag
  useEffect(() => {
    setIsClient(true);

    const isMobileDevice = () => window.innerWidth < 768 || ('ontouchstart' in window);
    setIsMobile(isMobileDevice());

    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup cursor tracking - runs on all renders, but only affects DOM when not mobile
  useEffect(() => {
    // Early return if mobile or not client - but hook still runs
    if (isMobile || !isClient) return;

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 100);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleInteractiveHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, [role="button"], input, textarea, select, [data-interactive], .group');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleInteractiveHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleInteractiveHover);
      document.documentElement.style.cursor = 'auto';
    };
  }, [isMobile, isClient]);

  // If mobile or not client, don't render DOM elements
  if (isMobile || !isClient) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        ref={cursorRef}
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.3 : 1,
          opacity: isClicking ? 0.5 : 1
        }}
        transition={{ duration: 0, type: 'tween' }}
        className="fixed w-10 h-10 border-2 border-[#785919] dark:border-[#eac076] rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-mode-difference"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 2 : (isClicking ? 0.7 : 1)
        }}
        transition={{ duration: 0.15, type: 'tween' }}
        className="fixed w-3 h-3 bg-[#785919] dark:bg-[#eac076] rounded-full pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.7))' }}
      />
    </>
  );
}
