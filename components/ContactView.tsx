'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Map, 
  Sparkles, 
  Lock,
  ChevronRight,
  AlertCircle,
  Loader
} from 'lucide-react';
import { initializeEmailJS, sendContactEmail, validateEmail } from '@/lib/emailjs';

export default function ContactView() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    emailAddress: '',
    phone: '',
    projectCategory: 'Industrial Substation Setup',
    urgency: 'Medium - within 3 months',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }

    if (!validateEmail(formData.emailAddress)) {
      setFormError('Please enter a valid email address');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormError('Please provide project details (at least 10 characters)');
      return;
    }

    setFormLoading(true);

    try {
      // Send email via EmailJS
      const emailSent = await sendContactEmail(formData);

      if (!emailSent) {
        setFormError('Failed to send contact form. Please try again or contact us directly.');
        return;
      }

      // Also submit to backend for logging
      await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(err => console.error('Backend logging failed:', err));

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          fullName: '',
          company: '',
          emailAddress: '',
          phone: '',
          projectCategory: 'Industrial Substation Setup',
          urgency: 'Medium - within 3 months',
          message: ''
        });
        setFormError(null);
      }, 6000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const faqs = [
    {
      q: 'What is your standard turnaround time for a 33kV substation project?',
      a: 'A standard 33kV turnkey HT substation installation, including equipment sourcing, civil foundations, administrative drawings, and final charging approval takes approximately 90 to 120 operational days depending on layout configuration.'
    },
    {
      q: 'Are your engineers authorized to file grid connection charging applications?',
      a: 'Yes. Aseen Power is a fully licensed Class-A Electrical Contractor. We retain dedicated administrative liaison engineers who handle comprehensive filings, schematic signatures, and statutory testing approvals with government load operators.'
    },
    {
      q: 'How frequently should industrial APFC panels be audited?',
      a: 'To avoid penalty tariffs from poor power factors, APFC microprocessor units and capacitor banks should have preventive thermal profiles and capacitance load checks performed at least semi-annually under active load conditions.'
    }
  ];

  return (
    <div className="bg-[#fbf9f8] min-h-screen py-16 sm:py-24" id="contact-us-view">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-xs tracking-[0.3em] font-extrabold text-[#785919] uppercase block mb-3">
            COMMUNICATION PORTAL
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight uppercase mb-6">
            CONTACT INTAKE
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#444748] leading-relaxed">
            Initialize your electrical specifications load sheet. Submit project schematics, arrange site coordinates survey, or contact our engineering dispatch departments to secure project quotes.
          </p>
          <div className="w-16 h-1 bg-[#785919] mx-auto mt-6 rounded-full" />
        </div>

        {/* Top block: Contact info cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16" id="contact-quickcontacts-grid">
          
          <a href="tel:+912224567890" className="bg-white p-6 rounded-lg border border-[#e9e8e7] hover:border-[#785919] hover:shadow-xs transition-colors  text-left block">
            <span className="w-8 h-8 rounded-sm bg-[#785919]/5 border border-[#785919]/15 flex items-center justify-center text-[#785919] mb-4">
              <Phone className="w-4 h-4" />
            </span>
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase mb-1">Telephone Support</h3>
            <p className="font-display font-semibold text-[#785919] text-xs">+91 (22) 2456 7890</p>
            <span className="text-[10px] text-gray-400 block mt-2 font-mono">Mon-Sat: 9AM - 6PM IST</span>
          </a>

          <a href="mailto:projects@aseenpower.com" className="bg-white p-6 rounded-lg border border-[#e9e8e7] hover:border-[#785919] hover:shadow-xs transition-colors  text-left block">
            <span className="w-8 h-8 rounded-sm bg-[#785919]/5 border border-[#785919]/15 flex items-center justify-center text-[#785919] mb-4">
              <Mail className="w-4 h-4" />
            </span>
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase mb-1">Email Coordinates</h3>
            <p className="font-sans text-[#785919] text-xs font-semibold">projects@aseenpower.com</p>
            <span className="text-[10px] text-gray-400 block mt-2 font-mono">Response within 12 hours</span>
          </a>

          <div className="bg-white p-6 rounded-lg border border-[#e9e8e7] text-left block">
            <span className="w-8 h-8 rounded-sm bg-[#785919]/5 border border-[#785919]/15 flex items-center justify-center text-[#785919] mb-4">
              <MapPin className="w-4 h-4" />
            </span>
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase mb-1">HQ Office Tower</h3>
            <p className="font-sans text-stone-600 text-xs">BKC Phase II, Mumbai</p>
            <span className="text-[10px] text-gray-400 block mt-2 font-mono">Aseen Tower, Maharashtra</span>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#e9e8e7] text-left block">
            <span className="w-8 h-8 rounded-sm bg-[#785919]/5 border border-[#785919]/15 flex items-center justify-center text-[#785919] mb-4">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase mb-1">License Rating</h3>
            <p className="font-sans text-stone-600 text-xs">Class-A Super Contractor</p>
            <span className="text-[10px] text-gray-400 block mt-2 font-mono">Central CEA Certified Rating</span>
          </div>

        </div>

        {/* Master Row: Form split with HQ blueprint-styled Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24" id="contact-master-portal">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-lg border border-[#e9e8e7] shadow-sm relative">
            <div>
              <span className="font-display text-[10px] tracking-widest font-extrabold text-[#785919] uppercase block mb-2">
                PROJECT METRICS TRANSMISSION
              </span>
              <h2 className="font-display font-extrabold text-2xl text-black uppercase mb-6">
                Consultation Request Intake
              </h2>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
                id="contact-success-alert"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-2">
                  Project Docket Successfully Created
                </h4>
                <p className="font-sans text-xs text-gray-500 max-w-sm mb-4">
                  Thank you {formData.fullName}. Our estimating engineering team has successfully generated a docket index representing your {formData.projectCategory} scope description.
                </p>
                <div className="font-mono text-[10px] text-[#785919] bg-stone-50 border border-stone-200 p-3 rounded-sm leading-snug w-full max-w-md text-left">
                  <span className="font-bold uppercase block text-stone-500 mb-1 font-display text-[9px] tracking-wider">PROJECT METRICS INDEX</span>
                  • Category: {formData.projectCategory}<br />
                  • Urgency: {formData.urgency}<br />
                  • Status: STAGE-1 LIAISON PENDING
                </div>
              </motion.div>
            ) : (
              <>
                {formError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-sm mb-6"
                    id="contact-error-alert"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-xs text-red-700">{formError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">FULL NAME *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        disabled={formLoading}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col">
                      <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">COMPANY / ORGANISATION</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Infrastructure Group"
                        disabled={formLoading}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                        disabled={formLoading}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">TELEPHONE</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        disabled={formLoading}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Category Selection */}
                    <div className="flex flex-col">
                      <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">PROJECT CATEGORY</label>
                      <select 
                        name="projectCategory"
                        value={formData.projectCategory}
                        onChange={handleInputChange}
                        disabled={formLoading}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option>Industrial Substation Setup</option>
                        <option>Commercial Substation Setup</option>
                        <option>Power Factor correction / Audit</option>
                        <option>Underground Cable laying loop</option>
                        <option>Long term AMC & Maintenance Contracts</option>
                      </select>
                    </div>

                    {/* Urgency selection */}
                    <div className="flex flex-col">
                      <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">TIMELINE URGENCY</label>
                      <select  
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        disabled={formLoading}
                        className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option>High - immediate (within 1 month)</option>
                        <option>Medium - within 3 months</option>
                        <option>Low - planning stage (3-6 months)</option>
                        <option>Periodic budget bidding</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">SCOPE BRIEF & REQUIREMENTS *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Provide transformer capacities, load details, locations coordinates if any..."
                      required
                      disabled={formLoading}
                      rows={4}
                      className="w-full bg-stone-50 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 resize-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-sans text-gray-400 leading-none">
                    <Lock size={12} className="text-stone-400" />
                    Your configurations are safeguarded under strict NDA frameworks.
                  </div>

                  {/* Get consultation button */}
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-[#1b1c1c] hover:bg-[#785919] text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    id="contact-large-submit-btn"
                  >
                    {formLoading && <Loader className="w-4 h-4 animate-spin" />}
                    {formLoading ? 'SUBMITTING...' : 'GET A CONSULTATION'}
                  </button>

                </form>
              </>
            )}
          </div>

          {/* Map & FAQ layout right Column */}
          <div className="lg:col-span-5 flex flex-col space-y-10 justify-between">
            
            {/* Headquarters Map Panel with styled lines resembling Image 2's location module */}
            <div className="bg-stone-950 text-white rounded-lg border border-[#785919]/20 p-8 relative overflow-hidden h-72 shadow-xl flex flex-col justify-between">
              <div className="absolute inset-0 engineering-grid opacity-[0.15] pointer-events-none" />
              
              {/* Complex road blueprints representation from image 2 */}
              <div className="absolute top-1/3 left-0 right-0 h-[1.5px] bg-[#eac076]/20 rotate-6" />
              <div className="absolute top-2/3 left-0 right-0 h-[1.5px] bg-[#eac076]/20 -rotate-12" />
              <div className="absolute top-0 bottom-0 left-1/4 w-[1.5px] bg-[#eac076]/20 rotate-45" />
              <div className="absolute top-0 bottom-0 left-3/4 w-[1.5px] bg-[#eac076]/20 -rotate-12" />
              
              <div className="relative z-10 flex flex-col">
                <span className="font-display text-[9px] tracking-widest font-extrabold text-[#eac076] uppercase mb-1">
                  OFFICIAL COORDINATES
                </span>
                <h3 className="font-display font-extrabold text-lg text-white mb-2 uppercase">
                  Aseen Tower, BKC Phase II, Mumbai
                </h3>
                <p className="font-sans text-[11px] text-gray-300 max-w-xs leading-relaxed">
                  Bandra Kurla Complex Phase II, Mumbai, Maharashtra 400051 India
                </p>
              </div>

              {/* Pin indicator */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eac076]/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#eac076]"></span>
                </span>
                <span className="font-display text-xs font-bold text-white tracking-widest uppercase">
                  MUMBAI CORPORATE HQ
                </span>
              </div>
            </div>

            {/* In-view FAQs for quick lookup */}
            <div className="space-y-4">
              <h3 className="font-display text-xs tracking-widest font-extrabold text-stone-500 uppercase mb-4">
                COMMON CONTRACT FAQ
              </h3>

              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg border border-[#e9e8e7] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-display font-semibold text-xs tracking-wide text-black hover:bg-stone-50"
                  >
                    <span className="uppercase">{faq.q}</span>
                    <ChevronRight size={14} className={`text-stone-400 transition-transform ${activeFaq === idx ? 'rotate-90 text-[#785919]' : ''}`} />
                  </button>

                  {activeFaq === idx && (
                    <div className="px-5 pb-4 font-sans text-xs text-gray-400 border-t border-gray-100 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
