'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestQuote: () => void;
}

export default function Header({ activeTab, setActiveTab, onRequestQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e9e8e7] transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo - Stacked or Single Line Hybrid (Highly Institutional) */}
        <button 
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col items-start justify-center text-left group cursor-pointer focus:outline-none"
          id="header-brand-logo"
        >
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-black leading-none group-hover:text-secondary transition-colors duration-200">
            ASEEN
          </span>
          <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.3em] text-secondary leading-none mt-1">
            POWER
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative font-display text-xs lg:text-sm font-semibold tracking-widest py-2 transition-colors duration-200 cursor-pointer ${
                activeTab === item.id 
                  ? 'text-black' 
                  : 'text-[#444748] hover:text-black'
              }`}
              id={`nav-link-${item.id}`}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#785919]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA Request Quote */}
        <div className="hidden md:block">
          <button
            onClick={onRequestQuote}
            className="group inline-flex items-center justify-center bg-[#785919] hover:bg-black text-white font-display text-xs tracking-widest font-bold uppercase py-3.5 px-6 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            id="header-cta-quote"
          >
            REQUEST A QUOTE
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Switch */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={onRequestQuote}
            className="bg-[#785919] text-white p-2 text-[10px] font-bold tracking-wider rounded-sm uppercase px-3"
            id="mobile-quote-btn"
          >
            QUOTE
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-black hover:text-secondary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-hamburger"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-[#e9e8e7] bg-white overflow-hidden shadow-xl"
            id="mobile-nav-panel"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-display text-sm font-bold tracking-widest py-3 border-b border-[#f5f3f3] last:border-b-0 ${
                    activeTab === item.id ? 'text-[#785919] pl-2 border-l-2 border-[#785919]' : 'text-[#1b1c1c]'
                  }`}
                  id={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full text-center bg-black hover:bg-secondary text-white font-display text-sm tracking-widest font-bold py-4 rounded-sm mt-4 transition-all"
                id="mobile-nav-cta"
              >
                REQUEST A QUOTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
