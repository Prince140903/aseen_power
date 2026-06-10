'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  id?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.2,
  className = '',
  id = ''
}: StaggerContainerProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          }
        }
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
