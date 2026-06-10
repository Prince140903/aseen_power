'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/use-scroll-position';

export function BackToTop() {
  const { scrollY } = useScrollPosition();
  const isVisible = scrollY > 300;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#785919] hover:bg-black text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-40  group"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowUp className="w-5 h-5 group-hover:translate-y-0 transition-transform" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
