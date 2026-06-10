'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useScrollPosition } from '@/hooks/use-scroll-position';

export function ScrollProgress() {
  const { scrollY } = useScrollPosition();
  
  // Calculate scroll progress as percentage
  const scrollHeight = typeof document !== 'undefined' 
    ? document.documentElement.scrollHeight - window.innerHeight
    : 0;
  const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#785919] to-black z-40"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
}
