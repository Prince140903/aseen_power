'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, Shield } from 'lucide-react';
import type { Settings } from '@/lib/cms';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openPolicyModal: (topic: string) => void;
  settings: Settings;
}

export default function Footer({ setActiveTab, openPolicyModal, settings }: FooterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickLink = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return mounted ? (
    <footer className="bg-black dark:bg-[#0a0b0e] text-white py-16 lg:py-24 border-t-2 border-[#785919]/40 dark:border-[#eac076]/30 relative overflow-hidden">
      {/* Subtle blueprints background grid overlay */}
      <div className="absolute inset-0 engineering-grid opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 pb-16 border-b border-white/10">
           
          {/* Column 1: Brand Credentials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-col mb-4">
                <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                  {settings.site_title}
                </span>
                <span className="font-display font-semibold text-xs tracking-[0.3em] text-[#eac076] mt-1">
                  {settings.site_tagline}
                </span>
              </div>
              <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-sm mt-3">
                {settings.footer_company_description}
              </p>
            </div>
            
            {/* Social Link Badges */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => openPolicyModal('Corporate Certifications')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#785919]/20 dark:hover:bg-[#eac076]/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#eac076] transition-all "
                title="SGS Quality Assured"
                id="footer-social-shield"
              >
                <Shield size={16} />
              </button>
              <button
                onClick={() => openPolicyModal('National Registration')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#785919]/20 dark:hover:bg-[#eac076]/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#eac076] transition-all "
                title="Licensed Government Contractor"
                id="footer-social-globe"
              >
                <Globe size={16} />
              </button>
              <button
                onClick={() => openPolicyModal('External Credentials')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#785919]/20 dark:hover:bg-[#eac076]/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#eac076] transition-all "
                title="Aseen Engineering Directory"
                id="footer-social-external"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2.5">
            <h4 className="font-display text-xs tracking-[0.2em] font-bold text-white mb-6 uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-4 font-display text-xs tracking-widest font-semibold text-gray-400">
              <li>
                <button
                  onClick={() => handleQuickLink('services')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  Core Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('projects')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  Project Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('about')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  Safety Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('contact')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Policies */}
          <div className="lg:col-span-2.5">
            <h4 className="font-display text-xs tracking-[0.2em] font-bold text-white mb-6 uppercase">
              LEGAL
            </h4>
            <ul className="space-y-4 font-display text-xs tracking-widest font-semibold text-gray-400">
              <li>
                <button
                  onClick={() => openPolicyModal('Privacy Policy')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  PRIVACY POLICY
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('Terms of Service')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  TERMS OF SERVICE
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('Cookie Policy')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  COOKIE POLICY
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('Sitemap')}
                  className="hover:text-[#eac076] transition-colors block"
                >
                  SITEMAP
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Location */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-display text-xs tracking-[0.2em] font-bold text-white mb-6 uppercase">
                LOCATION
              </h4>
              <p className="text-gray-400 font-sans text-xs leading-relaxed mb-4">
                {settings.contact_address}
              </p>
            </div>
            
            <div
              onClick={() => handleQuickLink('contact')}
              className="group relative h-28 w-full border border-white/10 rounded-sm bg-stone-900 dark:bg-[#1a1c22] overflow-hidden flex items-center justify-center"
              id="footer-location-mini-map"
            >
              <div className="absolute inset-0 engineering-grid opacity-[0.14] group-hover:scale-105 transition-transform duration-300 pointer-events-none" />
              
              <div className="absolute top-1/4 left-0 right-0 h-[1.5px] bg-secondary/15 rotate-12" />
              <div className="absolute top-2/3 left-0 right-0 h-[1.5px] bg-secondary/15 -rotate-6" />
              <div className="absolute top-0 bottom-0 left-1/3 w-[1.5px] bg-secondary/15 rotate-45" />
              <div className="absolute top-0 bottom-0 left-2/3 w-[1.5px] bg-secondary/15 -rotate-12" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-3 h-3 bg-[#eac076] rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-[#785919] dark:bg-[#eac076] border border-white rounded-full relative" />
                <span className="text-[9px] font-display font-bold tracking-widest text-[#eac076] mt-2 group-hover:text-white transition-colors">
                  BKC HQ, MUMBAI
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-center sm:text-left">
          <p className="text-gray-500 font-sans text-[11px] tracking-wide">
            {settings.footer_copyright_text}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 font-sans text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              ISO 9001:2015 & ISO 45001:2018 Certified
            </span>
          </div>
        </div>

      </div>
    </footer>
  ) : (
    <footer className="bg-black dark:bg-[#0a0b0e] h-32" />
  );
}
