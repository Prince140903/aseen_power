'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeView from '@/components/HomeView';
import ServicesView from '@/components/ServicesView';
import ProjectsView from '@/components/ProjectsView';
import AboutView from '@/components/AboutView';
import ContactView from '@/components/ContactView';
import { X, CheckCircle, Lock, HardHat, FileText, Globe } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [policyTopic, setPolicyTopic] = useState<string | null>(null);

  // Quote Form in side-drawer
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectScope: 'HT Substation 33KV',
    details: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Scroll to top on active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteDrawerOpen(false);
      setQuoteFormData({ name: '', email: '', company: '', projectScope: 'HT Substation 33KV', details: '' });
    }, 4500);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} onRequestQuote={() => setIsQuoteDrawerOpen(true)} />;
      case 'services':
        return <ServicesView />;
      case 'projects':
        return <ProjectsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setActiveTab={setActiveTab} onRequestQuote={() => setIsQuoteDrawerOpen(true)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f8]" id="master-page-layout">
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
              className="fixed inset-0 bg-stone-950 z-[100] cursor-pointer"
              id="drawer-backdrop"
            />

            {/* Sliding cabinet body */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-white border-l border-[#e9e8e7] shadow-2xl z-[101] overflow-y-auto px-8 py-10 flex flex-col justify-between"
              id="quote-sliding-drawer"
            >
              <div>
                {/* Header of drawer */}
                <div className="flex items-center justify-between mb-8 border-b border-[#f5f3f3] pb-6">
                  <div>
                    <span className="font-display text-[9px] tracking-widest font-black text-[#785919] uppercase block mb-1">
                      ESTIMATING SYSTEM
                    </span>
                    <h2 className="font-display font-extrabold text-lg text-black uppercase leading-tight">
                      Request Substation Quote
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsQuoteDrawerOpen(false)}
                    className="p-2 text-stone-400 hover:text-black transition-colors rounded-sm hover:bg-stone-50 cursor-pointer"
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
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-5">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-base text-black mb-1 uppercase">
                      RFQ Transmitted
                    </h3>
                    <p className="font-sans text-xs text-gray-500 max-w-xs leading-relaxed">
                      Your technical quotation scope request has been compiled. An engineer from our BKC Mumbai contracting dispatch group will follow up shortly to arrange site schematics transfers.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    
                    {/* Name input */}
                    <div className="flex flex-col">
                      <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] uppercase mb-1.5">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black placeholder:text-gray-400"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col">
                      <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] uppercase mb-1.5">Business Email *</label>
                      <input 
                        type="email" 
                        required
                        value={quoteFormData.email}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@company.com"
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black placeholder:text-gray-400"
                      />
                    </div>

                    {/* Company input */}
                    <div className="flex flex-col">
                      <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] uppercase mb-1.5">Company Name</label>
                      <input 
                        type="text" 
                        value={quoteFormData.company}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Engineering Corp Ltd"
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black placeholder:text-gray-400"
                      />
                    </div>

                    {/* Scope type list selector */}
                    <div className="flex flex-col">
                      <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] uppercase mb-1.5">Electrical Scope *</label>
                      <select 
                        value={quoteFormData.projectScope}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, projectScope: e.target.value }))}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-3 py-3 font-sans text-xs text-black cursor-pointer"
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
                      <label className="font-display text-[9px] tracking-widest font-extrabold text-[#444748] uppercase mb-1.5">Project Scope / Load Rating Details *</label>
                      <textarea 
                        required
                        value={quoteFormData.details}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, details: e.target.value }))}
                        placeholder="Define load rating, kVA capacity parameters, location..."
                        rows={4}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-xs text-black placeholder:text-gray-400 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full bg-[#785919] hover:bg-black text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                      id="drawer-cabinet-submit-btn"
                    >
                      TRANSMIT SPEC SHEET
                    </button>

                  </form>
                )}
              </div>

              {/* Secure certification stamp */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#f5f3f3] text-[10px] font-sans text-stone-400">
                <Lock size={12} className="text-secondary" />
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
              className="fixed inset-0 bg-stone-950 z-[120] cursor-pointer"
              id="policy-backdrop"
            />

            {/* Dialog Card container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] max-w-2xl mx-auto bg-white border border-[#e9e8e7] rounded-lg shadow-2xl z-[121] overflow-hidden flex flex-col justify-between"
              id="policy-dialog-modal"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-sm bg-[#785919]/10 text-[#785919]">
                    <FileText size={16} />
                  </span>
                  <span className="font-display text-xs font-bold tracking-wider text-black uppercase">
                    {policyTopic}
                  </span>
                </div>
                <button 
                  onClick={() => setPolicyTopic(null)}
                  className="p-1.5 text-stone-400 hover:text-black transition-colors rounded-sm hover:bg-stone-100 cursor-pointer"
                  id="close-policy-modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content body depending on theme */}
              <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-4 text-stone-600 text-xs sm:text-sm font-sans leading-relaxed">
                {policyTopic === 'Privacy Policy' && (
                  <>
                    <p className="font-bold text-stone-900">Last updated: June 2026</p>
                    <p>At Aseen Power, we respect and safeguard the proprietary parameters and network schematics shared with us. This Privacy Policy details the data management protocols used inside our Bandra Kurla Complex towers.</p>
                    <p className="font-bold text-stone-900">1. Information We Extract</p>
                    <p>We only collect data explicitly submitted inside our consultation requests and load estimators. We do not distribute, serialize, or monetize your industrial metrics under any operational conditions.</p>
                    <p className="font-bold text-stone-900">2. Physical & Digital Security</p>
                    <p>All load flow diagrams and single-line system maps submitted are archived inside encrypted, compartmentalized air-gapped databases overseen by cybersecurity compliance managers.</p>
                  </>
                )}

                {policyTopic === 'Terms of Service' && (
                  <>
                    <p className="font-bold text-stone-900">Class-A Contracting Regulations</p>
                    <p>By browsing our technical specs and utilizing our interactive Substation load calculator, you agree to the following institutional terms:</p>
                    <p className="font-bold text-stone-900">1. Estimator Reliability Disclaimer</p>
                    <p>Calculations generated by our Substation load calculator are intended for preliminary architectural sizing only. Absolute transformer setups require physical soil resistivity tests, ambient heat dissipation coefficient logs, and government grid approval before concrete installations.</p>
                    <p className="font-bold text-stone-900">2. Intellectual Framework</p>
                    <p>All structural drawings and panel diagrams featured remain the exclusive intellectual copyholders property of Aseen Power Ltd unless explicit transfer bounds have been signed.</p>
                  </>
                )}

                {policyTopic === 'Cookie Policy' && (
                  <>
                    <p className="font-bold text-stone-900">Cookie Management System</p>
                    <p>This website utilizes basic technical cookies to record state transitions (such as current navigation tab preferences or estimated load memory) to ensure a high-speed, lag-free user experience inside frame systems.</p>
                    <p className="font-semibold text-stone-900">No telemetry identifiers or promotional tracking cookies are utilized on this Aseen Power website.</p>
                  </>
                )}

                {policyTopic === 'Sitemap' && (
                  <>
                    <p className="font-bold text-stone-900 text-center uppercase mb-4">Aseen Power | Sitemap Matrix</p>
                    <div className="grid grid-cols-2 gap-4 text-stone-800 font-display text-xs tracking-widest font-bold">
                      <button onClick={() => { setActiveTab('home'); setPolicyTopic(null); }} className="p-3 bg-stone-50 border border-stone-200 text-center hover:bg-[#eac076]/10 uppercase rounded-sm cursor-pointer block text-xs">Home landing</button>
                      <button onClick={() => { setActiveTab('services'); setPolicyTopic(null); }} className="p-3 bg-stone-50 border border-stone-200 text-center hover:bg-[#eac076]/10 uppercase rounded-sm cursor-pointer block text-xs">Capabilities</button>
                      <button onClick={() => { setActiveTab('projects'); setPolicyTopic(null); }} className="p-3 bg-stone-50 border border-stone-200 text-center hover:bg-[#eac076]/10 uppercase rounded-sm cursor-pointer block text-xs">Projects Gallery</button>
                      <button onClick={() => { setActiveTab('about'); setPolicyTopic(null); }} className="p-3 bg-stone-50 border border-stone-200 text-center hover:bg-[#eac076]/10 uppercase rounded-sm cursor-pointer block text-xs">About legacy</button>
                      <button onClick={() => { setActiveTab('contact'); setPolicyTopic(null); }} className="p-3 bg-stone-50 border border-stone-200 text-center hover:bg-[#eac076]/10 uppercase rounded-sm cursor-pointer block text-xs">Contact Gate</button>
                    </div>
                  </>
                )}

                {policyTopic === 'Corporate Certifications' && (
                  <>
                    <h4 className="font-bold text-black mb-2 uppercase">Official SGS Audit Certifications</h4>
                    <ul className="space-y-2 text-stone-600 font-sans">
                      <li>• <strong>ISO 9001:2015</strong> — Quality Management Standards for Turnkey Switchgear & Transformer Assembly works.</li>
                      <li>• <strong>ISO 45001:2018</strong> — Occupational Health & Safety Compliance standards in Heavy High-Voltage Environments.</li>
                    </ul>
                  </>
                )}

                {policyTopic === 'National Registration' && (
                  <>
                    <h4 className="font-bold text-black mb-2 uppercase">Government Liaison Qualifications</h4>
                    <p>Aseen Power is actively registered with the Central Electricity Authority (CEA) as a Super-Grade Contractor (Contract No: MH-CIV-1002-HVC), qualified to sign and charge live high-voltage grids up to 220kV capacity.</p>
                  </>
                )}

                {policyTopic === 'External Credentials' && (
                  <>
                    <h4 className="font-bold text-black mb-2 uppercase">Contracting Directory Credentials</h4>
                    <p>Standard registry credentials and validation indexes of Aseen Power are updated inside the National Infrastructure Electrical Engineering database for client audits and bidding registrations.</p>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5 font-bold tracking-wide">
                  <CheckCircle size={12} className="text-emerald-500" />
                  AUTHENTICATED RECORD
                </span>
                <span className="font-mono">AP-MUM-2026</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
