'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';
  className?: string;
  id?: string;
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
};

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  variant = 'fadeUp',
  className = '',
  id = ''
}: ScrollRevealProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}
