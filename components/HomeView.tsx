'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { ClientsCarousel } from '@/components/ClientsCarousel';
import type { Settings as CmsSettings } from '@/lib/cms';
import {
  ShieldCheck,
  Settings,
  Award,
  ChevronLeft,
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
import { initializeEmailJS, sendContactEmail, validateEmail } from '@/lib/emailjs';
import Captcha from '@/components/Captcha';



const heroSlides = [
  {
    image: '/assets/slider/s1.avif',
    label: 'High-voltage transmission infrastructure'
  },
  {
    image: '/assets/slider/s2.jpeg',
    label: 'Industrial electrical engineering and commissioning'
  },
  {
    image: '/assets/slider/s3.avif',
    label: 'Renewable power and utility-scale energy systems'
  },
  {
    image: '/assets/slider/s4.avif',
    label: 'Commercial infrastructure power planning'
  },
  {
    image: '/assets/slider/s5.jpg',
    label: 'Substation infrastructure'
  }
];

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onRequestQuote: () => void;
  settings: CmsSettings;
}

export default function HomeView({ setActiveTab, onRequestQuote, settings }: HomeViewProps) {
  // Lead form state
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    emailAddress: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [ticketId, setTicketId] = useState<number>(1000);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);


  useEffect(() => {
    const slider = window.setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 15000);

    return () => window.clearInterval(slider);
  }, []);

  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }

    if (!validateEmail(formData.emailAddress)) {
      setFormError('Please enter a valid email address');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormError('Please provide details (at least 10 characters)');
      return;
    }

    if (!captchaVerified) {
      setFormError('Please complete the security verification before submitting');
      return;
    }

    setFormLoading(true);


    try {
      // Normalize values for sendContactEmail
      const submissionData = {
        fullName: formData.fullName,
        company: formData.company || 'Not provided',
        emailAddress: formData.emailAddress,
        phone: 'Not provided',
        projectCategory: 'Home Form Contact Inquiry',
        urgency: 'Standard',
        message: formData.message
      };

      const emailSent = await sendContactEmail(submissionData);

      if (!emailSent) {
        setFormError('Failed to send message. Please try again or contact us directly.');
        return;
      }

      await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      }).catch(err => console.error('Backend logging failed:', err));

      setTicketId(Math.floor(1000 + Math.random() * 9000));
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ fullName: '', company: '', emailAddress: '', message: '' });
        setCaptchaVerified(false);
        setCaptchaKey(prev => prev + 1);
      }, 5500);
    } catch (err) {

      console.error('Error submitting contact form:', err);
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };


  return (
    <div className="relative" id="home-view-container">
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-stone-950 text-white overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.image}
              aria-hidden={activeHeroSlide !== index}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter brightness-50"
              style={{ backgroundImage: `url('${slide.image}')` }}
              initial={false}
              animate={{ opacity: activeHeroSlide === index ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          ))}
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-black/30 to-transparent z-10" /> */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#785919]/10 dark:bg-[#eac076]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none z-10" />

        <div className="max-w-[1280px] mx-auto w-full px-6 relative z-20 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            {/* <span className="font-display text-xs lg:text-sm font-extrabold tracking-[0.4em] text-[#eac076] uppercase mb-4 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eac076] animate-pulse" />
              INSTITUTIONAL GRADE ELECTRICAL ENGINEERING
            </span> */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
              Powering the Future of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-100 to-[#eac076]">Residential, Commercial & Industrial Sector.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10">
              {settings.site_description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto bg-[#785919] dark:bg-[#eac076] dark:text-black hover:bg-black dark:hover:bg-white text-white font-display text-xs tracking-widest font-bold uppercase py-4 px-8 rounded-sm transition-all duration-300 shadow-xl hover:shadow-2xl border border-[#785919] dark:border-[#eac076] "
                id="hero-view-services"
              >
                VIEW OUR SERVICES
              </button>
              <button
                onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto hover:bg-white/10 text-white font-display text-xs tracking-widest font-bold uppercase py-4 px-8 rounded-sm transition-all duration-300 border border-white/40 "
                id="hero-explore-projects"
              >
                EXPLORE PROJECTS
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 w-full z-30">
          <div className="max-w-[1280px] mx-auto px-6 flex">
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-2 backdrop-blur-md">
              <button
                type="button"
                aria-label="Previous hero image"
                onClick={() => setActiveHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/15"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.label}
                    type="button"
                    aria-label={`Show ${slide.label}`}
                    onClick={() => setActiveHeroSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeHeroSlide === index ? 'w-8 bg-[#eac076]' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next hero image"
                onClick={() => setActiveHeroSlide(prev => (prev + 1) % heroSlides.length)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/15"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS SECTION */}
      <section className="py-20 bg-[#fbf9f8] dark:bg-[#0f1115] border-b border-[#e9e8e7] dark:border-[#3a3d45]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase mb-3">
              Institutional Credence
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] dark:text-[#e8e6e3] uppercase tracking-tight">
              WHY ASEEN POWER?
            </h3>
            <div className="w-12 h-1 bg-[#785919] dark:bg-[#eac076] mx-auto mt-4 rounded-full" />
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Unmatched Expertise', desc: "Aseen's 20+ years of collective engineering experience across varied sectors." },
              { icon: Settings, title: 'Reliable Solutions', desc: 'Turnkey HT Substations, Heavy Industrial cabling, and scalable electrical infrastructure designed securely.' },
              { icon: ShieldCheck, title: 'Safety & Quality', desc: 'Consulted to the highest standard with ISO certified compliance processes and 100% incident-free history.' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="bg-white dark:bg-[#1a1c22] p-8 sm:p-10 rounded-lg border border-[#e9e8e7] dark:border-[#3a3d45] flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 "
                  whileHover={{ y: -4 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-[#fbf9f8] dark:bg-[#23252d] border border-[#eac076]/30 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, backgroundColor: '#eac076' }}
                  >
                    <item.icon className="w-6 h-6 text-[#785919] dark:text-[#eac076]" />
                  </motion.div>
                  <h4 className="font-display font-bold text-lg text-black dark:text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm text-[#444748] dark:text-[#b0b3b8] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="py-24 bg-white dark:bg-[#1a1c22] border-b border-[#e9e8e7] dark:border-[#3a3d45]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase mb-3">
              Capabilities Statement
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] dark:text-[#e8e6e3] uppercase tracking-tight">
              OUR CORE SERVICES
            </h3>
            <div className="w-12 h-1 bg-[#785919] dark:bg-[#eac076] mx-auto mt-4 rounded-full" />
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: '01 / CONTRACTING', title: 'Industrial Electrification', desc: 'HT Substations, Government Submissions, and custom Panel Fabrication for heavy manufacturing plants and automotive facilities.' },
              { num: '02 / INFRASTRUCTURE', title: 'Commercial Infrastructure', desc: 'Complete turnkey electrical engineering works for corporate headquarters, star hotels, shopping centers, and retail malls.' },
              { num: '03 / HIGH REQUISITIONS', title: 'Specialized Solutions', desc: 'High-capacity underground cable laying, comprehensive power quality audits, and automated energy efficiency integration.' },
              { num: '04 / MANUFACTURING', title: 'Panel Manufacturing', desc: 'In-house specialized design and fabrication of heavy LT panels, AMF units, and microprocessor-controlled APFC panels.' },
              { num: '05 / GREEN INTEGRATION', title: 'Renewable Integration', desc: 'Solar farm electrical infrastructure, substation retrofits, grid-interfaced synchronization, and sustainable utility setups.' },
              { num: '06 / COMPREHENSIVE CARE', title: 'Maintenance & AMC', desc: 'Rigorous annual maintenance contract (AMC) scopes and 24/7 technical hotline dispatch for optimal industrial uptime.' },
            ].map((svc, i) => (
              <StaggerItem key={i}>
                <motion.div
                  onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group bg-[#fbf9f8] dark:bg-[#23252d] p-8 rounded-lg border-l-4 border-[#785919] dark:border-[#eac076] border-t border-b border-r border-[#e9e8e7] dark:border-[#3a3d45] flex flex-col justify-between hover:bg-white dark:hover:bg-[#2a2c35] hover:border-[#785919]/50 dark:hover:border-[#eac076]/50 hover:shadow-md transition-all duration-300 "
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-xs font-semibold tracking-wider text-secondary dark:text-[#eac076]">{svc.num}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-[#8b8e93] group-hover:text-secondary dark:group-hover:text-[#eac076] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-black dark:text-white mb-3">{svc.title}</h4>
                    <p className="font-sans text-sm text-[#444748] dark:text-[#b0b3b8] leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-gray-200/60 dark:border-[#3a3d45] flex items-center text-xs font-display font-semibold text-[#785919] dark:text-[#eac076]">
                    EXPLORE TECHNICAL SPECIFICATIONS
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. SUCCESSFUL PROJECTS */}
      <section className="py-24 bg-[#f5f3f3] dark:bg-[#12141a] border-b border-[#e9e8e7] dark:border-[#3a3d45]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase mb-3">
              Proven Performance
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] dark:text-[#e8e6e3] uppercase tracking-tight">
              SUCCESSFUL PROJECTS
            </h3>
            <div className="w-12 h-1 bg-[#785919] dark:bg-[#eac076] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'test', title: 'Complete HT/LT Electrification', img: '/assets/home_projects/h1.jpeg' },
              { label: 'CORPORATE OFFICE', title: 'Interior Electrical & Lighting', img: '/assets/home_projects/h2.jpeg' },
              { label: 'DATA CENTER', title: 'Precision Power Backup Systems', img: '/assets/home_projects/h3.jpeg' },
            ].map((card, i) => (
              <div
                key={i}
                onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="relative h-72 rounded-lg overflow-hidden group shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url('${card.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-white">
                  <span className="font-display text-[10px] tracking-widest font-extrabold text-[#eac076] uppercase mb-1">
                    {card.label}
                  </span>
                  <h4 className="font-display font-bold text-base text-white leading-tight">
                    {card.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black dark:bg-[#0a0b0e] text-white p-10 sm:p-14 rounded-lg relative overflow-hidden border border-[#785919]/25 dark:border-[#eac076]/25 shadow-xl text-center">
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
                className="font-display text-xs tracking-widest font-bold uppercase text-[#eac076] hover:text-white mt-8 inline-flex items-center gap-2 group "
              >
                VIEW DETAILED PORTFOLIO
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT ROW */}
      <section className="py-24 bg-white dark:bg-[#1a1c22] relative">
        <div className="absolute inset-0 engineering-grid-fine opacity-[0.04] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <div>
                <span className="font-display text-[10px] tracking-[0.3em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase mb-3 inline-block">
                  PROJECT SCOPE INITIATION
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-black dark:text-white leading-tight tracking-tight uppercase">
                  READY TO START YOUR NEXT PROJECT?
                </h3>
                <div className="w-12 h-1 bg-[#785919] dark:bg-[#eac076] mt-4 rounded-full" />
              </div>
              <p className="font-sans text-sm sm:text-base text-[#444748] dark:text-[#b0b3b8] leading-relaxed">
                Consult with our specialized electrical engineering team today. We provide highly detailed technical feasibility studies, load requirements, grid synchronization calculations, and accurate project estimates for large-scale industrial and commercial ventures.
              </p>
              <div className="space-y-6 pt-4">
                <a href={`tel:${settings.contact_phone.replace(/[^+\d]/g, '')}`} className="group flex items-center gap-4 hover:translate-x-1 transition-transform" id="direct-call">
                  <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] dark:bg-[#23252d] border border-[#e9e8e7] dark:border-[#3a3d45] flex items-center justify-center text-[#785919] dark:text-[#eac076] group-hover:bg-[#785919] dark:group-hover:bg-[#eac076] group-hover:text-white dark:group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display text-[10px] font-bold text-gray-400 dark:text-[#8b8e93] tracking-wider uppercase block">Call Us</span>
                    <span className="font-display font-bold text-sm tracking-wide text-black dark:text-white group-hover:text-[#785919] dark:group-hover:text-[#eac076] transition-colors">{settings.contact_phone}</span>
                  </div>
                </a>
                <a href={`mailto:${settings.contact_email}`} className="group flex items-center gap-4 hover:translate-x-1 transition-transform" id="direct-email">
                  <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] dark:bg-[#23252d] border border-[#e9e8e7] dark:border-[#3a3d45] flex items-center justify-center text-[#785919] dark:text-[#eac076] group-hover:bg-[#785919] dark:group-hover:bg-[#eac076] group-hover:text-white dark:group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display text-[10px] font-bold text-gray-400 dark:text-[#8b8e93] tracking-wider uppercase block">Email</span>
                    <span className="font-sans text-sm font-semibold tracking-wide text-black dark:text-white group-hover:text-[#785919] dark:group-hover:text-[#eac076] transition-colors">{settings.contact_email}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#fbf9f8] dark:bg-[#23252d] p-8 sm:p-12 rounded-lg border border-[#e9e8e7] dark:border-[#3a3d45] shadow-lg relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Zap size={144} className="text-[#785919] dark:text-[#eac076]" />
              </div>
              {formSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-12" id="lead-submit-success-alert">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-black dark:text-white mb-2">Consultation Request Lodged</h4>
                  <p className="font-sans text-sm text-gray-500 dark:text-[#8b8e93] max-w-sm mb-6">Thank you {formData.fullName}. An electrical systems engineer from our Mumbai HQ BKC team will review your requirements and reach out within 24 hours.</p>
                  <div className="text-[10px] font-display font-bold tracking-widest text-secondary dark:text-[#eac076] uppercase bg-secondary/10 dark:bg-[#eac076]/10 px-3 py-1.5 rounded-sm">TICKET ID: AP-{ticketId}-MUM</div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-sans font-medium rounded-sm border border-red-200 dark:border-red-800">{formError}</div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="fullName" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-2">FULL NAME *</label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" required className="w-full bg-white dark:bg-[#1a1c22] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="company" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-2">COMPANY</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Engineering Ltd" className="w-full bg-white dark:bg-[#1a1c22] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="emailAddress" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-2">EMAIL ADDRESS *</label>
                    <input type="email" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} placeholder="john@company.com" required className="w-full bg-white dark:bg-[#1a1c22] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="message" className="font-display text-[10px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-2">MESSAGE *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your project requirements..." required rows={4} className="w-full bg-white dark:bg-[#1a1c22] border border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076] focus:outline-none rounded-sm px-4 py-3 font-sans text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] resize-none transition-colors" />
                  </div>
                  <Captcha
                    key={captchaKey}
                    onVerify={setCaptchaVerified}
                    disabled={formLoading}
                    id="home-captcha"
                  />
                  <button
                    type="submit"
                    disabled={formLoading || !captchaVerified}
                    className="w-full bg-[#1b1c1c] dark:bg-[#2a2c35] hover:bg-[#785919] dark:hover:bg-[#eac076] dark:hover:text-black text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1b1c1c] dark:disabled:hover:bg-[#2a2c35] dark:disabled:hover:text-white"
                    id="lead-submit-btn"
                  >
                    {formLoading ? 'SENDING...' : 'GET A CONSULTATION'}
                  </button>


                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENTS CAROUSEL */}
      <ClientsCarousel onViewAll={() => { setActiveTab('clients'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
    </div>
  );
}
