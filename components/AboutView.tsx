'use client';

import React from 'react';
import { ShieldCheck, Target, Users, HardHat, Eye, Award, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function AboutView() {
  const stats = [
    { value: '20+', label: 'YEARS EXPERIENCE', detail: 'Engineering infrastructure since 1998' },
    { value: '500+', label: 'PROJECTS COMPLETED', detail: 'High-voltage substations commissioned' },
    { value: '100+', label: 'GLOBAL CLIENTS', detail: 'Fulfilling high-stake power demands' },
    { value: '99%', label: 'SAFETY COMPLIANCE', detail: 'Incident-free structural records' },
  ];

  return (
    <div className="bg-[#fbf9f8] min-h-screen py-16 sm:py-24" id="about-us-container">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-display text-xs tracking-[0.3em] font-extrabold text-[#785919] uppercase block mb-3">
            Institutional Legacy
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight uppercase mb-6">
            ABOUT ASEEN POWER
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#444748] leading-relaxed">
            Delivering uncompromised electrical discipline, heavy load engineering, and grid compatibility models to fuel {"India's"} industrial transformation.
          </p>
          <div className="w-16 h-1 bg-[#785919] mx-auto mt-6 rounded-full" />
        </div>

        {/* 1. Statistics Cards - Replicating Image 1's Hero Overlap Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24" id="statistics-metric-row">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white p-6 sm:p-8 rounded-lg border border-[#e9e8e7] flex flex-col items-center text-center shadow-sm relative overflow-hidden group hover:border-[#785919] transition-all duration-300"
            >
              {/* Subtle visual touch to imply engineering blueprint */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c4c7c7] group-hover:border-[#785919]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c4c7c7] group-hover:border-[#785919]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c4c7c7] group-hover:border-[#785919]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c4c7c7] group-hover:border-[#785919]" />
              
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-black tracking-tighter mb-2 group-hover:text-[#785919] transition-colors leading-none">
                {stat.value}
              </span>
              <span className="font-display text-[10px] tracking-widest font-extrabold text-stone-500 mb-2 block uppercase">
                {stat.label}
              </span>
              <p className="font-sans text-xs text-gray-400 mt-1 leading-snug">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Image and Narrative Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left Block photo */}
          <div className="lg:col-span-6 relative h-[400px] sm:h-[480px] rounded-lg overflow-hidden border border-[#e9e8e7]" id="about-brand-photo">
            <Image
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" 
              alt="High-Voltage Switchyard Commissioning"
              width={800}
              height={480}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
            <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-sm p-6 rounded-sm border-l-4 border-secondary text-white">
              <span className="font-mono text-[9px] font-bold text-[#eac076] tracking-widest uppercase block mb-1">
                OPERATIONAL MILESTONE
              </span>
              <p className="font-display font-medium text-xs sm:text-sm tracking-wide">
                Aseen Power has maintained zero safety incidents under regulatory audits for 28 consecutive quarters.
              </p>
            </div>
          </div>

          {/* Right Block narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div>
              <span className="font-display text-[10px] tracking-[0.25em] font-extrabold text-[#785919] uppercase block mb-3">
                FOUNDED IN 1998
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black leading-tight uppercase tracking-tight">
                Our Architectural Journey
              </h2>
              <div className="w-12 h-1 bg-[#785919] mt-3 rounded-full" />
            </div>

            <p className="font-sans text-sm text-[#444748] leading-relaxed">
              Founded on the pillars of absolute reliability and technical transparency, Aseen Power grew from an electrical supply installer in Mumbai into one of {"Western India's"} most credentialed high-voltage electrical contracting authorities.
            </p>

            <p className="font-sans text-sm text-[#444748] leading-relaxed">
              We specialize in the complex administrative filings and high-voltage grid linkages needed to commission active industrial infrastructure. Our comprehensive design plans are governed by seasoned project managers from site excavation to raw substation telemetry linkage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#785919]/5 border border-[#785919]/25 flex items-center justify-center text-[#785919] shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-black uppercase mb-1">Our Objective</h4>
                  <p className="font-sans text-xs text-gray-400">Engineering maximum system longevity and safety coefficients.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#785919]/5 border border-[#785919]/25 flex items-center justify-center text-[#785919] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-black uppercase mb-1">Our Standards</h4>
                  <p className="font-sans text-xs text-gray-400">Exceeding ISO 9001 quality audits with stringent compliance metrics.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Safety Standards Workflow Process */}
        <div className="bg-black text-white p-8 sm:p-12 rounded-lg border border-[#785919]/20 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 engineering-grid opacity-[0.03]" />
          
          <div className="relative z-10">
            <div className="text-center mb-12 max-w-xl mx-auto">
              <span className="font-display text-[9px] tracking-widest font-extrabold text-[#eac076] uppercase block mb-2">
                RIGOROUS RISK REDUCTION
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase">
                Substation Commissioning Safety Protocol
              </h3>
              <p className="font-sans text-xs text-gray-400 mt-2">
                Every substation installation is audited across five stringent engineering checkpoints to guarantee zero electrical hazards on live grid operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center" id="safety-protocol-timeline">
              {[
                { step: '01', title: 'Load Audit', desc: 'Sizing calculations & harmonic profile scan.' },
                { step: '02', title: 'Circuit Test', desc: 'Isolators, transformer dielectric fluid scan.' },
                { step: '03', title: 'Earth Ring', desc: 'Low-resistivity secure copper soil matrix bonding.' },
                { step: '04', title: 'Approval', desc: 'Supervising safety certificate filing.' },
                { step: '05', title: 'Sync-on', desc: 'Active telemetry tracking under load.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-white/5 border border-white/5 p-5 rounded-sm shadow-sm hover:bg-stone-900 transition-all">
                  <span className="font-mono text-xs font-bold text-[#eac076] bg-[#785919]/20 px-2 py-1 rounded-sm mb-3">
                    {item.step}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white uppercase mb-1">{item.title}</h4>
                  <p className="font-sans text-[11px] text-gray-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
