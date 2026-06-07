'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Factory, 
  Building2, 
  Zap, 
  Cpu, 
  ShieldAlert,
  Layers,
  CheckSquare,
  HelpCircle,
  Calculator,
  Compass
} from 'lucide-react';

export default function ServicesView() {
  // Calculator state
  const [loadKw, setLoadKw] = useState<number>(350);
  const [powerFactor, setPowerFactor] = useState<number>(0.85);
  const [safetyMargin, setSafetyMargin] = useState<number>(20);

  // Computed metrics
  const calculatedKVA = parseFloat(((loadKw / powerFactor) * (1 + safetyMargin / 100)).toFixed(1));
  const suggestedTransformer = calculatedKVA <= 100 
    ? '100 kVA Substation' 
    : calculatedKVA <= 250 
      ? '250 kVA Substation' 
      : calculatedKVA <= 500 
        ? '500 kVA Substation' 
        : calculatedKVA <= 1000 
          ? '1000 kVA Substation'
          : calculatedKVA <= 2000
            ? '2000 kVA / Double Substation System'
            : 'Custom HT grid synchronization (3KkVA+)';

  const suggestedAPFC = parseFloat((loadKw * (Math.tan(Math.acos(powerFactor)) - Math.tan(Math.acos(0.985)))).toFixed(1));

  return (
    <div className="bg-[#fbf9f8] min-h-screen py-16 sm:py-24" id="services-view-root">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Heading matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-display text-xs tracking-[0.3em] font-extrabold text-[#785919] uppercase block mb-3">
            TECHNICAL COGNIZANCE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight uppercase mb-6">
            OUR CORE SERVICES
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#444748] leading-relaxed">
            We provide turnkey electrical engineering and high-voltage contracting solutions tailored with extreme precision for high-stakes industrial complexes, utility grids, and commercial real estate.
          </p>
          <div className="w-16 h-1 bg-[#785919] mx-auto mt-6 rounded-full" />
        </div>

        {/* Dense Grid of 3 Core Services matching Image 1 exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24" id="services-mockup1-grid">
          
          {/* Card 1: Industrial Electrification */}
          <div className="bg-white rounded-lg border border-[#e9e8e7] p-8 sm:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Gold Icon Box */}
              <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] border border-[#eac076]/30 flex items-center justify-center text-[#785919] mb-8">
                <Factory className="w-6 h-6" />
              </div>
              
              <h2 className="font-display font-bold text-xl text-black tracking-tight mb-4">
                Industrial Electrification
              </h2>
              
              <p className="font-sans text-sm text-[#444748] leading-relaxed mb-8">
                Complete heavy-duty electrical systems tailored for manufacturing plants, automotive lines, chemical units, and metallurgy hubs to rigorous safety parameters.
              </p>

              {/* Checklist items with gold geometric square motifs */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    HT Substations & Transformer Installation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    Heavy Load Balancing & Sectional Distribution
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    DG Sets Sync & Emergency Busbars integration
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-display font-bold text-[#785919]">
              <span>STATUS: OFF-GRID & HYBRID</span>
              <span>100% REGULATED</span>
            </div>
          </div>

          {/* Card 2: Commercial Infrastructure */}
          <div className="bg-white rounded-lg border border-[#e9e8e7] p-8 sm:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Gold Icon Box */}
              <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] border border-[#eac076]/30 flex items-center justify-center text-[#785919] mb-8">
                <Building2 className="w-6 h-6" />
              </div>
              
              <h2 className="font-display font-bold text-xl text-black tracking-tight mb-4">
                Commercial Infrastructure
              </h2>
              
              <p className="font-sans text-sm text-[#444748] leading-relaxed mb-8">
                Expert blueprinting, execution, and lighting management for modern IT Parks, luxury hospitality towers, shopping terminals, and premium workspaces.
              </p>

              {/* Checklist items */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    Energy-Efficient Lighting Design & BMS Control
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    Microprocessor-based Fire Detection & Alarms
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    HVAC Heavy Drive Support & Starters
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-display font-bold text-[#785919]">
              <span>STATUS: BMS INTEGRATED</span>
              <span>ISO CERTIFIED</span>
            </div>
          </div>

          {/* Card 3: Specialized Solutions */}
          <div className="bg-white rounded-lg border border-[#e9e8e7] p-8 sm:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Gold Icon Box */}
              <div className="w-12 h-12 rounded-sm bg-[#fbf9f8] border border-[#eac076]/30 flex items-center justify-center text-[#785919] mb-8">
                <Zap className="w-6 h-6" />
              </div>
              
              <h2 className="font-display font-bold text-xl text-black tracking-tight mb-4">
                Specialized Solutions
              </h2>
              
              <p className="font-sans text-sm text-[#444748] leading-relaxed mb-8">
                State-of-the-art power safety audits, power factor optimization schedules, and underground distribution cabling laying works.
              </p>

              {/* Checklist items */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    Power Factor Corrector Audits & Overhauls
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    110kV+ Specialized Underground Trench Cable
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-[#785919] mt-2 shrink-0" />
                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 tracking-wide">
                    Predictive Thermo Diagnostic Maintenance
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-display font-bold text-[#785919]">
              <span>STATUS: AUDIT REGISTERED</span>
              <span>100% RELIABLE</span>
            </div>
          </div>

        </div>

        {/* Interactive Element: Electrical Load Estimate Calculator */}
        <div className="bg-[#1b1c1c] text-white p-8 sm:p-12 rounded-lg border border-[#785919]/20 shadow-xl relative overflow-hidden" id="substation-calculator-box">
          <div className="absolute inset-0 engineering-grid opacity-[0.03]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left side: description */}
            <div className="lg:w-1/2 flex flex-col space-y-4">
              <div className="inline-flex items-center gap-2 text-[#eac076]">
                <Calculator className="w-5 h-5" />
                <span className="font-display text-xs font-bold tracking-widest uppercase">ENGINEERING ESTIMATES HELPER</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white uppercase">
                HT Substation Load Calculator
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                Estimate your required Substation power envelope and automatic power factor optimization capacitors. Set your anticipated connected loads, power factors, and safe engineering headroom to instantly calculate optimal transformer envelopes.
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm mt-4 text-[11px] font-mono text-gray-400">
                Formula: kVA = (Connected kW &divide; Power Factor) &times; Safety Factor Headroom multiplier
              </div>
            </div>

            {/* Right side: working range calculations */}
            <div className="lg:w-1/2 w-full bg-white text-black p-6 sm:p-8 rounded-sm shrink-0 shadow-lg border-l-4 border-[#785919]">
              <div className="space-y-5">
                
                {/* Connected Load slider */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 uppercase">ANTICIPATED LOAD (kW)</span>
                    <span className="font-mono text-xs font-bold text-[#785919]">{loadKw} kW</span>
                  </div>
                  <input 
                    type="range" 
                    min={50} 
                    max={2500} 
                    step={10} 
                    value={loadKw}
                    onChange={(e) => setLoadKw(parseInt(e.target.value))}
                    className="w-full accent-[#785919] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-stone-400 mt-1">
                    <span>50 kW</span>
                    <span>1250 kW</span>
                    <span>2500 kW</span>
                  </div>
                </div>

                {/* Power Factor select */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 uppercase mb-2">POWER FACTOR (cos &phi;)</label>
                    <select 
                      value={powerFactor} 
                      onChange={(e) => setPowerFactor(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#785919] font-mono text-xs cursor-pointer"
                    >
                      <option value={0.75}>0.75 (Uncompensated Inductive)</option>
                      <option value={0.80}>0.80 (Standard Inductive)</option>
                      <option value={0.85}>0.85 (Normal Industrial)</option>
                      <option value={0.90}>0.90 (Slightly Compensated)</option>
                      <option value={0.92}>0.92 (Medium Regulation)</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 uppercase mb-2">SAFETY HEADROOM (%)</label>
                    <select 
                      value={safetyMargin} 
                      onChange={(e) => setSafetyMargin(parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#785919] font-mono text-xs cursor-pointer"
                    >
                      <option value={10}>10% Headroom</option>
                      <option value={15}>15% Headroom</option>
                      <option value={20}>20% Headroom (Standard)</option>
                      <option value={25}>25% Recommended High-Heat</option>
                      <option value={30}>30% Heavy Induction Over-run</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="pt-4 border-t border-stone-100 flex flex-col space-y-3 bg-stone-50 p-4 rounded-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 uppercase">CALCULATED ENVELOPE</span>
                    <span className="font-mono font-bold text-black text-sm">{calculatedKVA} kVA</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 uppercase">APFC CORRECTION REQUIRED</span>
                    <span className="font-mono font-bold text-[#785919] text-xs">{suggestedAPFC} kVAR</span>
                  </div>

                  <div className="pt-2 border-t border-stone-200">
                    <span className="font-display text-[9px] font-bold text-gray-400 block tracking-widest uppercase mb-1">SUGGESTED EQUIPMENT CONFIG</span>
                    <span className="font-display font-bold text-xs text-stone-900 block bg-[#eac076]/15 py-1.5 px-3 rounded-sm border border-[#eac076]/20">
                      {suggestedTransformer}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
