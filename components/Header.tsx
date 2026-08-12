'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestQuote: () => void;
}

export default function Header({ activeTab, setActiveTab, onRequestQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we should show solid background (scrolled past hero)
  const shouldShowSolidBg = scrollY > 100;

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    {
      id: 'gallery',
      label: 'GALLERY',
      subItems: [
        { id: 'projects', label: 'PROJECTS' },
        { id: 'works', label: 'WORKS' }
      ]
    },
    { id: 'clients', label: 'CLIENTS' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      animate={{
        backgroundColor: shouldShowSolidBg ? 'rgba(255, 255, 255, 0.98)' : 'rgba(22, 35, 44, 1.0)',
        borderColor: shouldShowSolidBg ? '#faf9f7' : 'rgba(120, 89, 25, 0.3)',
        backdropFilter: shouldShowSolidBg ? 'blur(12px)' : 'blur(8px)',
        boxShadow: shouldShowSolidBg ? '0 2px 12px rgba(0, 0, 0, 0.06)' : 'none'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
        {mounted && (
          <>
            {/* Brand Logo - Icon + Text */}
            <motion.button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center justify-center text-left group focus:outline-none gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="header-brand-logo"
            >
              <Image
                src="/assets/energy.png"
                alt="Aseen Power"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain flex-shrink-0 transition-all duration-300"
                style={{
                  filter: shouldShowSolidBg ? 'none' : 'brightness(0) invert(1)',
                }}
                priority
              />
              <div className="flex flex-col items-start justify-center">
                <motion.span
                  className="font-display font-extrabold text-xl sm:text-2xl tracking-[0.03em] leading-none group-hover:text-[#785919] dark:group-hover:text-[#eac076] transition-colors duration-200"
                  animate={{ color: shouldShowSolidBg ? '#1b1c1c' : '#ffffff' }}
                  transition={{ duration: 0.3 }}
                >
                  ASEEN
                </motion.span>
                <motion.span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-[#785919] dark:text-[#eac076] leading-none mt-1 duration-200"
                  animate={{ color: shouldShowSolidBg ? '#1b1c1c' : '#ffffff' }}
                  transition={{ duration: 0.3 }}
                >
                  POWER
                </motion.span>
              </div>
            </motion.button>

            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navItems.map((item) => (
                item.subItems ? (
                  <div key={item.id} className="relative group py-2">
                    <button
                      className="relative font-display text-xs lg:text-sm font-semibold tracking-widest transition-all duration-200 uppercase"
                      style={{
                        color: shouldShowSolidBg
                          ? ((activeTab === 'projects' || activeTab === 'works') ? '#1b1c1c' : '#666766')
                          : ((activeTab === 'projects' || activeTab === 'works') ? '#ffffff' : '#cccccc')
                      }}
                      id={`nav-link-${item.id}`}
                    >
                      {item.label}
                      {(activeTab === 'projects' || activeTab === 'works') && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-2 left-0 right-0 h-[2.5px] bg-[#785919] dark:bg-[#eac076]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full mt-0 w-40 bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col overflow-hidden">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setActiveTab(subItem.id)}
                          className={`text-left font-display text-xs font-bold tracking-widest px-4 py-3 hover:bg-stone-50 dark:hover:bg-[#23252d] transition-colors ${activeTab === subItem.id ? 'text-[#785919] dark:text-[#eac076]' : 'text-[#1b1c1c] dark:text-[#e8e6e3]'
                            }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="relative font-display text-xs lg:text-sm font-semibold tracking-widest py-2 transition-all duration-200"
                    animate={{
                      color: shouldShowSolidBg
                        ? (activeTab === item.id ? '#1b1c1c' : '#666766')
                        : (activeTab === item.id ? '#ffffff' : '#cccccc')
                    }}
                    whileHover={{
                      color: shouldShowSolidBg ? '#1b1c1c' : '#ffffff'
                    }}
                    transition={{ duration: 0.2 }}
                    id={`nav-link-${item.id}`}
                  >
                    {item.label}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#785919] dark:bg-[#eac076]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              ))}
            </nav>

            {/* Theme Toggle + CTA Request Quote */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                onClick={onRequestQuote}
                className="group inline-flex items-center justify-center bg-[#785919] dark:bg-[#eac076] dark:text-black hover:bg-black dark:hover:bg-white text-white font-display text-xs tracking-widest font-bold uppercase py-3.5 px-6 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0 "
                whileHover={{ y: -2, boxShadow: '0 12px 24px rgba(120, 89, 25, 0.2)' }}
                whileTap={{ y: 0 }}
                id="header-cta-quote"
              >
                REQUEST A QUOTE
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile ThemeToggle + Hamburger Menu Switch */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                onClick={onRequestQuote}
                className="bg-[#785919] dark:bg-[#eac076] dark:text-black text-white p-2 text-[10px] font-bold tracking-wider rounded-sm uppercase px-3 hover:bg-black dark:hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="mobile-quote-btn"
              >
                QUOTE
              </motion.button>
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-black dark:text-white hover:text-[#785919] dark:hover:text-[#eac076] transition-colors focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Menu"
                id="mobile-menu-hamburger"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-[#e9e8e7] dark:border-[#3a3d45] bg-white dark:bg-[#1a1c22] overflow-hidden shadow-xl"
            id="mobile-nav-panel"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item, idx) => (
                item.subItems ? (
                  <div key={item.id} className="flex flex-col border-b border-[#f5f3f3] dark:border-[#2a2c35] last:border-b-0">
                    <div className="text-left font-display text-sm font-bold tracking-widest py-3 text-[#1b1c1c] dark:text-[#e8e6e3]">
                      {item.label}
                    </div>
                    <div className="flex flex-col pl-4 space-y-2 pb-3">
                      {item.subItems.map((subItem) => (
                        <motion.button
                          key={subItem.id}
                          onClick={() => {
                            setActiveTab(subItem.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`text-left font-display text-xs font-bold tracking-widest py-2 transition-colors ${activeTab === subItem.id ? 'text-[#785919] dark:text-[#eac076]' : 'text-[#666766] dark:text-[#a0a2a8] hover:text-[#785919] dark:hover:text-[#eac076]'
                            }`}
                        >
                          {subItem.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left font-display text-sm font-bold tracking-widest py-3 border-b border-[#f5f3f3] dark:border-[#2a2c35] last:border-b-0 transition-colors ${activeTab === item.id ? 'text-[#785919] dark:text-[#eac076] pl-2 border-l-2 border-[#785919] dark:border-[#eac076]' : 'text-[#1b1c1c] dark:text-[#e8e6e3] hover:text-[#785919] dark:hover:text-[#eac076]'
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    id={`mobile-nav-link-${item.id}`}
                  >
                    {item.label}
                  </motion.button>
                )
              ))}
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full text-center bg-black dark:bg-white dark:text-black hover:bg-[#785919] dark:hover:bg-[#eac076] text-white font-display text-sm tracking-widest font-bold py-4 rounded-sm mt-4 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                id="mobile-nav-cta"
              >
                REQUEST A QUOTE
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
