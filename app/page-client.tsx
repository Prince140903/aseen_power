'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeView from '@/components/HomeView';
import ServicesView from '@/components/ServicesView';
import ProjectsView from '@/components/ProjectsView';
import ClientsView from '@/components/ClientsView';
import AboutView from '@/components/AboutView';
import ContactView from '@/components/ContactView';
import { ScrollProgress } from '@/components/interactions/ScrollProgress';
import { BackToTop } from '@/components/interactions/BackToTop';
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { initializeEmailJS, sendQuoteEmail, validateEmail } from '@/lib/emailjs';
import type { Service, Project, Settings } from '@/lib/cms';
import Captcha from '@/components/Captcha';

interface PageClientProps {
  services: Service[];
  projects: Project[];
  settings: Settings;
}

export default function PageClient({ services = [], projects = [], settings }: PageClientProps) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [policyTopic, setPolicyTopic] = useState<string | null>(null);

  // Quote Form in side-drawer
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectScope: 'HT Substation 33KV',
    details: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoteCaptchaVerified, setQuoteCaptchaVerified] = useState(false);
  const [quoteCaptchaKey, setQuoteCaptchaKey] = useState(0);

  // Scroll to top on active tab changes - only after hydration
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  // Initialize EmailJS on component mount
  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteError(null);

    // Validate form data
    if (!quoteFormData.name.trim()) {
      setQuoteError('Please enter your name');
      return;
    }

    if (!validateEmail(quoteFormData.email)) {
      setQuoteError('Please enter a valid email address');
      return;
    }

    if (!quoteFormData.details.trim()) {
      setQuoteError('Please provide project scope details');
      return;
    }

    if (!quoteCaptchaVerified) {
      setQuoteError('Please complete the security verification before submitting');
      return;
    }

    setQuoteLoading(true);

    try {
      // Send email via EmailJS
      const emailSent = await sendQuoteEmail(quoteFormData);

      if (!emailSent) {
        setQuoteError('Failed to send quote request. Please try again or contact us directly.');
        return;
      }

      // Also submit to backend for logging
      await fetch('/api/forms/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteFormData)
      }).catch(err => console.error('Backend logging failed:', err));

      setQuoteSubmitted(true);
      setTimeout(() => {
        setQuoteSubmitted(false);
        setIsQuoteDrawerOpen(false);
        setQuoteFormData({ name: '', email: '', phone: '', company: '', projectScope: 'HT Substation 33KV', details: '' });
        setQuoteError(null);
        setQuoteCaptchaVerified(false);
        setQuoteCaptchaKey(prev => prev + 1);
      }, 4500);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setQuoteError('An unexpected error occurred. Please try again.');
    } finally {
      setQuoteLoading(false);
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} onRequestQuote={() => setIsQuoteDrawerOpen(true)} settings={settings} />;
      case 'services':
        return <ServicesView services={services} />;
      case 'projects':
        return <ProjectsView projects={projects} />;
      case 'clients':
        return <ClientsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView settings={settings} />;
      default:
        return <HomeView setActiveTab={setActiveTab} onRequestQuote={() => setIsQuoteDrawerOpen(true)} settings={settings} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f8] dark:bg-[#0f1115]" id="master-page-layout">
      <ScrollProgress />
      <BackToTop />

      {/* GLOBAL HEADER */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRequestQuote={() => setIsQuoteDrawerOpen(true)}
      />

      {/* DYNAMIC MIDDLE CONTENT AREA */}
      <main className="flex-grow transition-opacity duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer
        setActiveTab={setActiveTab}
        openPolicyModal={(topic) => setPolicyTopic(topic)}
        settings={settings}
      />

      {/* 1. SIDE DRAWER COMPONENT: SLIDING TECHNICAL REQUEST FOR QUOTATIONS */}
      <AnimatePresence>
        {isQuoteDrawerOpen && (
          <>
            {/* Dark abstract overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteDrawerOpen(false)}
              className="fixed inset-0 bg-stone-950 z-[100]"
              id="drawer-backdrop"
            />

            {/* Sliding cabinet body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-white dark:bg-[#1a1c22] border-l border-[#e9e8e7] dark:border-[#3a3d45] shadow-2xl z-[101] overflow-y-auto px-8 py-10 flex flex-col justify-between"
              id="quote-sliding-drawer"
            >
              <div>
                {/* Header of drawer */}
                <div className="flex items-center justify-between mb-8 border-b border-[#f5f3f3] dark:border-[#3a3d45] pb-6">
                  <div>
                    <span className="font-display text-[9px] tracking-widest font-black text-[#785919] dark:text-[#eac076] uppercase block mb-1">
                      ESTIMATING SYSTEM
                    </span>
                    <h2 className="font-display font-extrabold text-lg text-black dark:text-white uppercase leading-tight">
                      Request Substation Quote
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsQuoteDrawerOpen(false)}
                    className="p-2 text-stone-400 dark:text-[#8b8e93] hover:text-black dark:hover:text-white transition-colors rounded-sm hover:bg-stone-50 dark:hover:bg-[#23252d]"
                    id="close-quote-drawer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {quoteSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                    id="drawer-submit-success"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-base text-black dark:text-white mb-1 uppercase">
                      RFQ Transmitted
                    </h3>
                    <p className="font-sans text-xs text-gray-500 dark:text-[#b0b3b8] max-w-xs leading-relaxed">
                      Your technical quotation scope request has been compiled. An engineer from our BKC Mumbai contracting dispatch group will follow up shortly to arrange site schematics transfers.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {quoteError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm mb-5"
                        id="quote-error-alert"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="font-sans text-xs text-red-700 dark:text-red-400">{quoteError}</p>
                      </motion.div>
                    )}

                    <form onSubmit={handleQuoteSubmit} className="space-y-5">

                      {/* Name input */}
                      <div className="flex flex-col">
                        <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          disabled={quoteLoading}
                          value={quoteFormData.name}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="w-full bg-stone-50 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black dark:text-[#e8e6e3] placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col">
                        <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5">Business Email *</label>
                        <input
                          type="email"
                          required
                          disabled={quoteLoading}
                          value={quoteFormData.email}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@company.com"
                          className="w-full bg-stone-50 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black dark:text-[#e8e6e3] placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col">
                        <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          disabled={quoteLoading}
                          value={quoteFormData.phone}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className="w-full bg-stone-50 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black dark:text-[#e8e6e3] placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Company input */}
                      <div className="flex flex-col">
                        <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5">Company Name</label>
                        <input
                          type="text"
                          disabled={quoteLoading}
                          value={quoteFormData.company}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Engineering Corp Ltd"
                          className="w-full bg-stone-50 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black dark:text-[#e8e6e3] placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Scope type list selector */}
                      <div className="flex flex-col">
                        <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5">Electrical Scope *</label>
                        <select
                          disabled={quoteLoading}
                          value={quoteFormData.projectScope}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, projectScope: e.target.value }))}
                          className="w-full bg-stone-50 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-3 py-3 font-sans text-xs text-black dark:text-[#e8e6e3] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option>HT Substation 33KV / 11KV Setup</option>
                          <option>Commercial Grid Cabling & Distribution</option>
                          <option>In-house Custom LT Panel Fabrication</option>
                          <option>Underground Cabling Laying Trench</option>
                          <option>Microprocessor APFC Audit & Support</option>
                        </select>
                      </div>

                      {/* Description Details textarea */}
                      <div className="flex flex-col">
                        <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5">Project Scope / Load Rating Details *</label>
                        <textarea
                          required
                          disabled={quoteLoading}
                          value={quoteFormData.details}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, details: e.target.value }))}
                          placeholder="Define load rating, kVA capacity parameters, location..."
                          rows={4}
                          className="w-full bg-stone-50 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black dark:text-[#e8e6e3] placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Security verification captcha */}
                      <Captcha
                        key={quoteCaptchaKey}
                        onVerify={setQuoteCaptchaVerified}
                        disabled={quoteLoading}
                        compact
                        id="quote-captcha"
                      />

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={quoteLoading || !quoteCaptchaVerified}
                        className="w-full bg-[#785919] dark:bg-[#eac076] dark:text-black hover:bg-black dark:hover:bg-white text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        id="drawer-cabinet-submit-btn"
                      >
                        {quoteLoading && <Loader className="w-4 h-4 animate-spin" />}
                        {quoteLoading ? 'SUBMITTING...' : 'TRANSMIT SPEC SHEET'}
                      </button>

                    </form>
                  </>
                )}
              </div>

              {/* Secure certification stamp */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#f5f3f3] dark:border-[#3a3d45] text-[10px] font-sans text-stone-400 dark:text-[#8b8e93]">
                <span>🔒</span>
                NDA Encrypted. Standard ISO 27001 data safeguards apply.
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. POLICY MODAL DIALOG: HIGH QUALITY IN-APP COMPLIANCE READER */}
      <AnimatePresence>
        {policyTopic && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setPolicyTopic(null)}
              className="fixed inset-0 bg-stone-950 z-[120]"
              id="policy-backdrop"
            />

            {/* Dialog Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] max-w-2xl mx-auto bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded-lg shadow-2xl z-[121] overflow-hidden flex flex-col justify-between"
              id="policy-dialog-modal"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-stone-100 dark:border-[#3a3d45] flex items-center justify-between bg-stone-50 dark:bg-[#12141a]">
                <div className="flex items-center gap-2">
                  <span className="font-display text-xs font-bold tracking-wider text-black dark:text-white uppercase">
                    {policyTopic}
                  </span>
                </div>
                <button
                  onClick={() => setPolicyTopic(null)}
                  className="p-1.5 text-stone-400 dark:text-[#8b8e93] hover:text-black dark:hover:text-white transition-colors rounded-sm hover:bg-stone-100 dark:hover:bg-[#23252d]"
                  id="close-policy-modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content body depending on theme */}
              <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-4 text-stone-600 dark:text-[#b0b3b8] text-xs sm:text-sm font-sans leading-relaxed">
                {policyTopic === 'Privacy Policy' && (
                  <>
                    <p className="font-bold text-stone-900 dark:text-white">Last updated: June 2026</p>
                    <p>At Aseen Power, we respect and safeguard the proprietary parameters and network schematics shared with us.</p>
                  </>
                )}

                {policyTopic === 'Terms of Service' && (
                  <>
                    <p className="font-bold text-stone-900 dark:text-white">Class-A Contracting Regulations</p>
                    <p>By browsing our technical specs, you agree to our terms.</p>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-stone-100 dark:border-[#3a3d45] bg-stone-50 dark:bg-[#12141a] flex items-center justify-between text-[11px] text-gray-400 dark:text-[#8b8e93]">
                <span className="font-bold tracking-wide">AUTHENTICATED RECORD</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
