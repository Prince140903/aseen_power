'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Settings, 
  Award, 
  ChevronRight, 
  Phone, 
  Mail, 
  CheckCircle, 
  Sparkles,
  ArrowUpRight,
  HardHat,
  Tv,
  Zap,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onRequestQuote: () => void;
}

export default function HomeView({ setActiveTab, onRequestQuote }: HomeViewProps) {
  // Lead form state
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    emailAddress: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [ticketId, setTicketId] = useState<number>(1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.emailAddress || !formData.message) {
      setFormError('Please fill out all required fields.');
      return;
    }
    setFormError('');
    setTicketId(Math.floor(1000 + Math.random() * 9000));
    setFormSubmitted(true);
    // Auto reset submission alert after 4 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ fullName: '', company: '', emailAddress: '', message: '' });
    }, 5500);
  };

  return (
    <div className="relative" id="home-view-container">
      {/* 1. IMMERSIVE HERO SECTION - STYLISH SUBSTATION TWILIGHT SCREEN */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-stone-950 text-white overflow-hidden py-20 px-6">
        {/* Background Image of high voltage transmission lines styled dramatically */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 pointer-events-none filter brightness-50"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1600')` 
          }}
        />
        {/* Blue/Amber geometric ambient lighting overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-black/80 to-transparent z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#785919]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none z-10" />

        <div className="max-w-[1280px] mx-auto w-full relative z-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="font-display text-xs lg:text-sm font-extrabold tracking-[0.4em] text-[#eac076] uppercase mb-4 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eac076] animate-pulse" />
              INSTITUTIONAL GRADE ELECTRICAL ENGINEERING
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
              Powering the Future of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-100 to-[#eac076]">Industry & Commerce.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10">
              Expert Licensed Electrical Contractors. Delivering critical high-voltage infrastructure projects on time, within budget, and to the highest safety standards since 1998.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto bg-[#785919] hover:bg-black text-white font-display text-xs tracking-widest font-bold uppercase py-4 px-8 rounded-sm transition-all duration-300 shadow-xl hover:shadow-2xl border border-[#785919] cursor-pointer"
                id="hero-view-services"
              >
                VIEW OUR SERVICES
              </button>
              <button
                onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto hover:bg-white/10 text-white font-display text-xs tracking-widest font-bold uppercase py-4 px-8 rounded-sm transition-all duration-300 border border-white/40 cursor-pointer"
                id="hero-explore-projects"
              >
                EXPLORE PROJECTS
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. VALUE PROPS SECTION - WHY ASEEN POWER? */}
      <section className="py-20 bg-[#fbf9f8] border-b border-[#e9e8e7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] uppercase mb-3">
              Institutional Credence
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] uppercase tracking-tight">
              WHY ASEEN POWER?
            </h3>
            <div className="w-12 h-1 bg-[#785919] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1: Expertise */}
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-[#e9e8e7] flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-[#fbf9f8] border border-[#eac076]/30 flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-[#785919]" />
              </div>
              <h4 className="font-display font-bold text-lg text-black mb-3">
                Unmatched Expertise
              </h4>
              <p className="font-sans text-sm text-[#444748] leading-relaxed">
                {"Aseen's 20+ years"} of collective engineering experience across varied sectors.
              </p>
            </div>

            {/* Box 2: Reliable Solutions */}
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-[#e9e8e7] flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-[#fbf9f8] border border-[#eac076]/30 flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-[#785919]" />
              </div>
              <h4 className="font-display font-bold text-lg text-black mb-3">
                Reliable Solutions
              </h4>
              <p className="font-sans text-sm text-[#444748] leading-relaxed">
                Turnkey HT Substations, Heavy Industrial cabling, and scalable electrical infrastructure designed securely.
              </p>
            </div>

            {/* Box 3: Safety & Quality */}
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-[#e9e8e7] flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-[#fbf9f8] border border-[#eac076]/30 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#785919]" />
              </div>
              <h4 className="font-display font-bold text-lg text-black mb-3">
                Safety & Quality
              </h4>
              <p className="font-sans text-sm text-[#444748] leading-relaxed">
                Consulted to the highest standard with ISO certified compliance processes and 100% incident-free history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES WITH GOLD ACCENT BORDERS */}
      <section className="py-24 bg-white border-b border-[#e9e8e7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] uppercase mb-3">
              Capabilities Statement
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] uppercase tracking-tight">
              OUR CORE SERVICES
            </h3>
            <div className="w-12 h-1 bg-[#785919] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div 
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#fbf9f8] p-8 rounded-lg border-l-4 border-[#785919] border-t border-b border-r border-[#e9e8e7] flex flex-col justify-between hover:bg-white hover:border-[#785919]/50 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-semibold tracking-wider text-secondary">01 / CONTRACTING</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-3">Industrial Electrification</h4>
                <p className="font-sans text-sm text-[#444748] leading-relaxed">
                  HT Substations, Government Submissions, and custom Panel Fabrication for heavy manufacturing plants and automotive facilities.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center text-xs font-display font-semibold text-[#785919]">
                EXPLORE TECHNICAL SPECIFICATIONS
              </div>
            </div>

            {/* Service 2 */}
            <div 
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#fbf9f8] p-8 rounded-lg border-l-4 border-[#785919] border-t border-b border-r border-[#e9e8e7] flex flex-col justify-between hover:bg-white hover:border-[#785919]/50 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-semibold tracking-wider text-secondary">02 / INFRASTRUCTURE</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-3">Commercial Infrastructure</h4>
                <p className="font-sans text-sm text-[#444748] leading-relaxed">
                  Complete turnkey electrical engineering works for corporate headquarters, star hotels, shopping centers, and retail malls.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center text-xs font-display font-semibold text-[#785919]">
                EXPLORE TECHNICAL SPECIFICATIONS
              </div>
            </div>

            {/* Service 3 */}
            <div 
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#fbf9f8] p-8 rounded-lg border-l-4 border-[#785919] border-t border-b border-r border-[#e9e8e7] flex flex-col justify-between hover:bg-white hover:border-[#785919]/50 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-semibold tracking-wider text-secondary">03 / HIGH REQUISITIONS</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-3">Specialized Solutions</h4>
                <p className="font-sans text-sm text-[#444748] leading-relaxed">
                  High-capacity underground cable laying, comprehensive power quality audits, and automated energy efficiency integration.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center text-xs font-display font-semibold text-[#785919]">
                EXPLORE TECHNICAL SPECIFICATIONS
              </div>
            </div>

            {/* Service 4 */}
            <div 
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#fbf9f8] p-8 rounded-lg border-l-4 border-[#785919] border-t border-b border-r border-[#e9e8e7] flex flex-col justify-between hover:bg-white hover:border-[#785919]/50 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-semibold tracking-wider text-secondary">04 / MANUFACTURING</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-3">Panel Manufacturing</h4>
                <p className="font-sans text-sm text-[#444748] leading-relaxed">
                  In-house specialized design and fabrication of heavy LT panels, AMF units, and microprocessor-controlled APFC panels.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center text-xs font-display font-semibold text-[#785919]">
                EXPLORE TECHNICAL SPECIFICATIONS
              </div>
            </div>

            {/* Service 5 */}
            <div 
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#fbf9f8] p-8 rounded-lg border-l-4 border-[#785919] border-t border-b border-r border-[#e9e8e7] flex flex-col justify-between hover:bg-white hover:border-[#785919]/50 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-semibold tracking-wider text-secondary">05 / GREEN INTEGRATION</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-3">Renewable Integration</h4>
                <p className="font-sans text-sm text-[#444748] leading-relaxed">
                  Solar farm electrical infrastructure, substation retrofits, grid-interfaced synchronization, and sustainable utility setups.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center text-xs font-display font-semibold text-[#785919]">
                EXPLORE TECHNICAL SPECIFICATIONS
              </div>
            </div>

            {/* Service 6 */}
            <div 
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#fbf9f8] p-8 rounded-lg border-l-4 border-[#785919] border-t border-b border-r border-[#e9e8e7] flex flex-col justify-between hover:bg-white hover:border-[#785919]/50 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-semibold tracking-wider text-secondary">06 / COMPREHENSIVE CARE</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-3">Maintenance & AMC</h4>
                <p className="font-sans text-sm text-[#444748] leading-relaxed">
                  Rigorous annual maintenance contract (AMC) scopes and 24/7 technical hotline dispatch for optimal industrial uptime.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center text-xs font-display font-semibold text-[#785919]">
                EXPLORE TECHNICAL SPECIFICATIONS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUCCESSFUL PROJECTS GALLERY SLIDES */}
      <section className="py-24 bg-[#f5f3f3] border-b border-[#e9e8e7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] uppercase mb-3">
              Proven Performance
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] uppercase tracking-tight">
              SUCCESSFUL PROJECTS
            </h3>
            <div className="w-12 h-1 bg-[#785919] mx-auto mt-4 rounded-full" />
          </div>

          {/* Three Dark Overlay Project Cards matching Mockup 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div 
              onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-72 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-white">
                <span className="font-display text-[10px] tracking-widest font-extrabold text-[#eac076] uppercase mb-1">
                  INDUSTRIAL PLANT, PUNE
                </span>
                <h4 className="font-display font-bold text-base text-white leading-tight">
                  Complete HT/LT Electrification
                </h4>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-72 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-white">
                <span className="font-display text-[10px] tracking-widest font-extrabold text-[#eac076] uppercase mb-1">
                  CORPORATE OFFICE, BANGALORE
                </span>
                <h4 className="font-display font-bold text-base text-white leading-tight">
                  Interior Electrical & Lighting
                </h4>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-72 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-white">
                <span className="font-display text-[10px] tracking-widest font-extrabold text-[#eac076] uppercase mb-1">
                  DATA CENTER, HYDERABAD
                </span>
                <h4 className="font-display font-bold text-base text-white leading-tight">
                  Precision Power Backup Systems
                </h4>
              </div>
            </div>
          </div>

          {/* Heavy black callout block with golden metrics */}
          <div className="bg-black text-white p-10 sm:p-14 rounded-lg relative overflow-hidden border border-[#785919]/25 shadow-xl text-center">
            {/* Fine blueprints background overlay */}
            <div className="absolute inset-0 engineering-grid opacity-[0.03]" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <span className="font-display font-extrabold text-5xl sm:text-7xl text-[#eac076] tracking-tight leading-none mb-4">
                500+
              </span>
              <h4 className="font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-white mb-4">
                HIGH-VOLTAGE PROJECTS DELIVERED ACROSS INDIA
              </h4>
              <p className="font-sans text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
                From initial consultation and administrative submissions to final substation commissioning and testing, we bridge the gap between architectural blueprints and absolute operational excellence.
              </p>
              <button 
                onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="font-display text-xs tracking-widest font-bold uppercase text-[#eac076] hover:text-white mt-8 inline-flex items-center gap-2 group cursor-pointer"
              >
                VIEW DETAILED PORTFOLIO
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HIGH-FIDELITY CONTACT ROW AND FORMS FROM IMAGE 2 */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 engineering-grid-fine opacity-[0.04] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Block - Consultation callout matching content from Image 2 */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <div>
                <span className="font-display text-[10px] tracking-[0.3em] font-extrabold text-[#785919] uppercase mb-3 inline-block">
                  PROJECT SCOPE INITIATION
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight tracking-tight uppercase">
                  READY TO START YOUR NEXT PROJECT?
                </h3>
                <div className="w-12 h-1 bg-[#785919] mt-4 rounded-full" />
              </div>

              <p className="font-sans text-sm sm:text-base text-[#444748] leading-relaxed">
                Consult with our specialized electrical engineering team today. We provide highly detailed technical feasibility studies, load requirements, grid synchronization calculations, and accurate project estimates for large-scale industrial and commercial ventures.
              </p>

              {/* Direct channels */}
              <div className="space-y-6 pt-4">
                {/* Telephone Dispatch */}
                <a 
                  href="tel:+912224567890" 
                  className="group flex items-center gap-4 hover:translate-x-1 transition-transform"
                  id="direct-call"
                >
                  <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] border border-[#e9e8e7] flex items-center justify-center text-[#785919] group-hover:bg-[#785919] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display text-[10px] font-bold text-gray-400 tracking-wider uppercase block">
                      Call Us
                    </span>
                    <span className="font-display font-bold text-sm tracking-wide text-black group-hover:text-[#785919] transition-colors">
                      +91 (22) 2456 7890
                    </span>
                  </div>
                </a>

                {/* Mail dispatch */}
                <a 
                  href="mailto:projects@aseenpower.com" 
                  className="group flex items-center gap-4 hover:translate-x-1 transition-transform"
                  id="direct-email"
                >
                  <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] border border-[#e9e8e7] flex items-center justify-center text-[#785919] group-hover:bg-[#785919] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display text-[10px] font-bold text-gray-400 tracking-wider uppercase block">
                      Email
                    </span>
                    <span className="font-sans text-sm font-semibold tracking-wide text-black group-hover:text-[#785919] transition-colors">
                      projects@aseenpower.com
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Block - Interactive Form Container */}
            <div className="lg:col-span-7 bg-[#fbf9f8] p-8 sm:p-12 rounded-lg border border-[#e9e8e7] shadow-lg relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Zap size={144} className="text-[#785919]" />
              </div>

              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                  id="lead-submit-success-alert"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-black mb-2">
                    Consultation Request Lodged
                  </h4>
                  <p className="font-sans text-sm text-gray-500 max-w-sm mb-6">
                    Thank you {formData.fullName}. An electrical systems engineer from our Mumbai HQ BKC team will review your requirements and reach out within 24 hours.
                  </p>
                  <div className="text-[10px] font-display font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-3 py-1.5 rounded-sm">
                    TICKET ID: AP-{ticketId}-MUM
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="p-4 bg-red-50 text-red-600 text-xs font-sans font-medium rounded-sm border border-red-200">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name input */}
                    <div className="flex flex-col">
                      <label htmlFor="fullName" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">
                        FULL NAME *
                      </label>
                      <input 
                        type="text" 
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="w-full bg-white border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors"
                      />
                    </div>

                    {/* Company input */}
                    <div className="flex flex-col">
                      <label htmlFor="company" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">
                        COMPANY
                      </label>
                      <input 
                        type="text" 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Engineering Ltd"
                        className="w-full bg-white border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email address input */}
                  <div className="flex flex-col">
                    <label htmlFor="emailAddress" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input 
                      type="email" 
                      id="emailAddress"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      required
                      className="w-full bg-white border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 transition-colors"
                    />
                  </div>

                  {/* Message input */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] uppercase mb-2">
                      MESSAGE *
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project requirements..."
                      required
                      rows={4}
                      className="w-full bg-white border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black placeholder:text-gray-400 resize-none transition-colors"
                    />
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    className="w-full bg-[#1b1c1c] hover:bg-[#785919] text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    id="lead-submit-btn"
                  >
                    GET A CONSULTATION
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
