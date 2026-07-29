'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { GalleryImage } from '@/lib/cms';
import Image from 'next/image';

interface WorksViewProps {
  gallery: GalleryImage[];
}

export default function WorksView({ gallery = [] }: WorksViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Works');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['All Works', ...Array.from(new Set(gallery.map(g => g.category)))];

  const filteredWorks = gallery.filter(work => {
    const matchesCategory = selectedCategory === 'All Works' || work.category === selectedCategory;
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          work.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return mounted ? (
    <div className="bg-[#fbf9f8] dark:bg-[#0f1115] min-h-screen py-16 sm:py-24" id="works-view-root">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-xs tracking-[0.3em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase block mb-3">
            GALLERY
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tight uppercase mb-6">
            OUR WORKS
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#444748] dark:text-[#b0b3b8] leading-relaxed">
            A visual showcase of our technical expertise and completed works.
          </p>
          <div className="w-16 h-1 bg-[#785919] dark:bg-[#eac076] mx-auto mt-6 rounded-full" />
        </ScrollReveal>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-stone-200 dark:border-[#3a3d45] pb-8" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div 
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-display text-xs lg:text-sm font-bold tracking-wider border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-sm' 
                    : 'bg-white dark:bg-[#1a1c22] text-stone-600 dark:text-[#b0b3b8] border-[#e9e8e7] dark:border-[#3a3d45] hover:bg-stone-50 dark:hover:bg-[#23252d] hover:text-black dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="relative w-full md:w-80"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Search className="w-4 h-4 text-stone-400 dark:text-[#8b8e93] absolute left-4 top-1/2 -translate-y-1/2" />
            <motion.input 
              type="text" 
              placeholder="Search works..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#1a1c22] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm pl-11 pr-4 py-3 font-sans text-xs text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] transition-colors"
              whileFocus={{ boxShadow: '0 0 0 3px rgba(120, 89, 25, 0.1)' }}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#1a1c22] rounded-lg border border-[#e9e8e7] dark:border-[#3a3d45] overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-300 flex flex-col justify-between group"
                whileHover={{ y: -4 }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={work.image_url || 'https://via.placeholder.com/400x300?text=Work'} 
                      alt={work.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </motion.div>
                  <motion.span 
                    className="absolute top-4 right-4 bg-[#785919] dark:bg-[#eac076] dark:text-black text-white text-[9px] font-display font-black tracking-widest px-3 py-1.5 uppercase rounded-sm shadow-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    {work.category}
                  </motion.span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-black dark:text-white leading-tight mb-3 tracking-tight group-hover:text-[#785919] dark:group-hover:text-[#eac076] transition-colors">
                      {work.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#444748] dark:text-[#b0b3b8] leading-relaxed">
                      {work.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWorks.length === 0 && (
          <motion.div 
            className="text-center py-20 bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded-lg mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-display text-xs font-bold text-stone-400 dark:text-[#8b8e93] block tracking-wider uppercase">
              No works found
            </span>
            <p className="font-sans text-xs text-gray-400 dark:text-[#b0b3b8] mt-2">
              Try adjusting your search parameter or select another category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  ) : (
    <div className="bg-[#fbf9f8] dark:bg-[#0f1115] min-h-screen py-16 sm:py-24" />
  );
}
