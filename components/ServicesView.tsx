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
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import type { Service } from '@/lib/cms';
import Image from 'next/image';

interface ServicesViewProps {
  services: Service[];
}

export default function ServicesView({ services = [] }: ServicesViewProps) {
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
    <div className="bg-[#fbf9f8] dark:bg-[#0f1115] min-h-screen py-16 sm:py-24" id="services-view-root">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Heading */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-display text-xs tracking-[0.3em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase block mb-3">
            TECHNICAL COGNIZANCE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tight uppercase mb-6">
            OUR CORE SERVICES
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#444748] dark:text-[#b0b3b8] leading-relaxed">
            We provide turnkey electrical engineering and high-voltage contracting solutions tailored with extreme precision for high-stakes industrial complexes, utility grids, and commercial real estate.
          </p>
          <div className="w-16 h-1 bg-[#785919] dark:bg-[#eac076] mx-auto mt-6 rounded-full" />
        </ScrollReveal>

        {/* Services Grid - CMS Driven */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24" id="services-mockup1-grid">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-[#8b8e93]">
              <p className="font-display text-sm">No services available</p>
            </div>
          ) : (
            services.map((service) => {
              // Map icon names to components
              const iconMap: Record<string, React.ReactNode> = {
                'Factory': <Factory className="w-6 h-6" />,
                'Building2': <Building2 className="w-6 h-6" />,
                'Zap': <Zap className="w-6 h-6" />,
                'Cpu': <Cpu className="w-6 h-6" />
              };

              return (
                <StaggerItem key={service.id}>
                  <motion.div
                    className="bg-white dark:bg-[#1a1c22] rounded-lg border border-[#e9e8e7] dark:border-[#3a3d45] overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all flex flex-col justify-between h-full group"
                    whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)' }}
                  >
                    {service.image_url && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={service.image_url} 
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-full object-cover transition-transform duration-500"
                          />
                        </motion.div>
                      </div>
                    )}
                    <div className="p-8 sm:p-10 flex flex-col flex-1">
                      <div>
                        {/* Icon Box */}
                        {!service.image_url && (
                          <motion.div 
                            className="w-12 h-12 rounded-sm bg-[#fbf9f8] dark:bg-[#23252d] border border-[#eac076]/30 flex items-center justify-center text-[#785919] dark:text-[#eac076] mb-8"
                            whileHover={{ scale: 1.1, backgroundColor: '#eac076', color: 'white' }}
                          >
                            {iconMap[service.icon] || iconMap['Factory']}
                          </motion.div>
                        )}
                         
                        <h2 className="font-display font-bold text-xl text-black dark:text-white tracking-tight mb-4 group-hover:text-[#785919] dark:group-hover:text-[#eac076] transition-colors">
                          {service.title}
                        </h2>
                       
                      <p className="font-sans text-sm text-[#444748] dark:text-[#b0b3b8] leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {/* Features List */}
                      {(() => {
                        let featuresArray: string[] = [];
                        if (Array.isArray(service.features)) {
                          featuresArray = service.features;
                        } else if (typeof service.features === 'string') {
                          try {
                            // If it was stored as a JSON string
                            featuresArray = JSON.parse(service.features);
                          } catch (e) {
                            // If it's just a raw string
                            if ((service.features as string).trim() !== '') {
                              featuresArray = [(service.features as string).trim()];
                            }
                          }
                        }
                        
                        console.log(`Service [${service.title}] features:`, service.features, 'Parsed as:', featuresArray);

                        if (featuresArray && featuresArray.length > 0) {
                          return (
                            <ul className="space-y-4 mb-4">
                              {featuresArray.map((feature, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * idx }}
                                  whileHover={{ x: 4 }}
                                >
                                  <div className="w-2 h-2 rounded-none bg-[#785919] dark:bg-[#eac076] mt-2 shrink-0" />
                                  <span className="font-display text-xs lg:text-sm font-semibold text-stone-900 dark:text-[#e8e6e3] tracking-wide">
                                    {feature}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })()}
                      </div>
                      
                      {/* CMS Extra values space */}
                      {((service.certification && service.certification.trim() !== '') || (service.status && service.status.trim() !== '')) && (
                        <div className="mt-auto pt-5 border-t border-[#e9e8e7] dark:border-[#3a3d45] flex items-center justify-between">
                          {service.certification && (
                            <span className="font-display text-[10px] font-bold text-[#785919] dark:text-[#eac076] uppercase flex items-center gap-1.5">
                               <CheckSquare className="w-3.5 h-3.5" />
                               {service.certification}
                            </span>
                          )}
                          {service.status && (
                            <span className="font-mono text-[9px] bg-stone-100 dark:bg-[#23252d] px-2 py-1 rounded-sm text-stone-500 dark:text-[#8b8e93] uppercase border border-stone-200 dark:border-[#3a3d45]">
                              {service.status}
                            </span>
                          )}
                        </div>
                      )}

                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })
          )}
        </StaggerContainer>

        {/* Interactive Element: Electrical Load Estimate Calculator */}
        <ScrollReveal variant="scaleIn" className="bg-[#1b1c1c] dark:bg-[#0a0b0e] text-white p-8 sm:p-12 rounded-lg border border-[#785919]/20 dark:border-[#eac076]/20 shadow-xl relative overflow-hidden" id="substation-calculator-box">
          <div className="absolute inset-0 engineering-grid opacity-[0.03]" />
           
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
             
            {/* Left side: description */}
            <motion.div 
              className="lg:w-1/2 flex flex-col space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>

            {/* Right side: working range calculations */}
            <motion.div 
              className="lg:w-1/2 w-full bg-white dark:bg-[#1a1c22] text-black dark:text-white p-6 sm:p-8 rounded-sm shrink-0 shadow-lg border-l-4 border-[#785919] dark:border-[#eac076]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-5">
                 
                {/* Connected Load slider */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 dark:text-[#8b8e93] uppercase">ANTICIPATED LOAD (kW)</span>
                    <motion.span 
                      className="font-mono text-xs font-bold text-[#785919] dark:text-[#eac076]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.3 }}
                      key={loadKw}
                    >
                      {loadKw} kW
                    </motion.span>
                  </div>
                  <input 
                    type="range" 
                    min={50} 
                    max={2500} 
                    step={10} 
                    value={loadKw}
                    onChange={(e) => setLoadKw(parseInt(e.target.value))}
                    className="w-full accent-[#785919] dark:accent-[#eac076] "
                  />
                  <div className="flex justify-between text-[9px] font-mono text-stone-400 dark:text-[#8b8e93] mt-1">
                    <span>50 kW</span>
                    <span>1250 kW</span>
                    <span>2500 kW</span>
                  </div>
                </div>

                {/* Power Factor select */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 dark:text-[#8b8e93] uppercase mb-2">POWER FACTOR (cos &phi;)</label>
                    <select 
                      value={powerFactor} 
                      onChange={(e) => setPowerFactor(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-[#23252d] border border-stone-200 dark:border-[#3a3d45] focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] font-mono text-xs dark:text-white hover:bg-stone-100 dark:hover:bg-[#2a2c35] transition-colors"
                    >
                      <option value={0.75}>0.75 (Uncompensated Inductive)</option>
                      <option value={0.80}>0.80 (Standard Inductive)</option>
                      <option value={0.85}>0.85 (Normal Industrial)</option>
                      <option value={0.90}>0.90 (Slightly Compensated)</option>
                      <option value={0.92}>0.92 (Medium Regulation)</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 dark:text-[#8b8e93] uppercase mb-2">SAFETY HEADROOM (%)</label>
                    <select 
                      value={safetyMargin} 
                      onChange={(e) => setSafetyMargin(parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-[#23252d] border border-stone-200 dark:border-[#3a3d45] focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] font-mono text-xs dark:text-white hover:bg-stone-100 dark:hover:bg-[#2a2c35] transition-colors"
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
                <div className="pt-4 border-t border-stone-100 dark:border-[#3a3d45] flex flex-col space-y-3 bg-stone-50 dark:bg-[#23252d] p-4 rounded-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 dark:text-[#8b8e93] uppercase">CALCULATED ENVELOPE</span>
                    <motion.span 
                      className="font-mono font-bold text-black dark:text-white text-sm"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3 }}
                      key={calculatedKVA}
                    >
                      {calculatedKVA} kVA
                    </motion.span>
                  </div>
                   
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-display text-[10px] tracking-wider font-extrabold text-stone-500 dark:text-[#8b8e93] uppercase">APFC CORRECTION REQUIRED</span>
                    <motion.span 
                      className="font-mono font-bold text-[#785919] dark:text-[#eac076] text-xs"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3 }}
                      key={suggestedAPFC}
                    >
                      {suggestedAPFC} kVAR
                    </motion.span>
                  </div>

                  <div className="pt-2 border-t border-stone-200 dark:border-[#3a3d45]">
                    <span className="font-display text-[9px] font-bold text-gray-400 dark:text-[#8b8e93] block tracking-widest uppercase mb-1">SUGGESTED EQUIPMENT CONFIG</span>
                    <motion.span 
                      className="font-display font-bold text-xs text-stone-900 dark:text-[#e8e6e3] block bg-[#eac076]/15 py-1.5 px-3 rounded-sm border border-[#eac076]/20"
                      animate={{ backgroundColor: ['rgba(234, 192, 118, 0.15)', 'rgba(234, 192, 118, 0.25)', 'rgba(234, 192, 118, 0.15)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      key={suggestedTransformer}
                    >
                      {suggestedTransformer}
                    </motion.span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
