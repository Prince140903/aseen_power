'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface Client {
  id: string;
  name: string;
  logo: string;
  segment: string;
}

const clients: Client[] = [
  { id: '1', name: 'Raymond Realty', logo: '/assets/clients/raymond.png', segment: 'Real Estate' },
  { id: '2', name: 'Birla Estates', logo: '/assets/clients/birla estates.png', segment: 'Developer' },
  { id: '3', name: 'Tata Housing', logo: '/assets/clients/tatahousing.png', segment: 'Housing' },
  { id: '4', name: 'L&T Realty', logo: '/assets/clients/L&T.png', segment: 'Infrastructure' },
  { id: '5', name: 'Oberoi Realty', logo: '/assets/clients/Oberoi-Realty-Logo.png', segment: 'Luxury Realty' },
  { id: '6', name: 'Tata Projects', logo: '/assets/clients/tata projects.png', segment: 'EPC Projects' },
  { id: '7', name: 'Aurum', logo: '/assets/clients/Aurum.png', segment: 'Commercial' },
  { id: '8', name: 'CCI Projects', logo: '/assets/clients/CCI Projects.png', segment: 'Construction' },
  { id: '9', name: 'K Raheja', logo: '/assets/clients/K Raheja.png', segment: 'Real Estate' },
  { id: '10', name: 'Lodha Palava', logo: '/assets/clients/lodhapalava.png', segment: 'Township' },
  { id: '11', name: 'Narang', logo: '/assets/clients/narang.png', segment: 'Developer' },
  { id: '12', name: 'The Address GS', logo: '/assets/clients/Address GS.png', segment: 'Commercial' },
  { id: '13', name: 'ACME', logo: '/assets/clients/acme.png', segment: 'Energy' },
  { id: '14', name: 'Sunteck', logo: '/assets/clients/sunteck.png', segment: 'Real Estate' },
  { id: '15', name: 'Runwal', logo: '/assets/clients/Runwal.png', segment: 'Developer' },
  { id: '16', name: 'Saifee Burhani', logo: '/assets/clients/Saifee.png', segment: 'Institutional' },
];

export default function ClientsView() {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-[#1a1c22] border-b border-[#e9e8e7] dark:border-[#3a3d45]">
      <div className="absolute inset-0 engineering-grid-fine opacity-[0.04] pointer-events-none" />
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-[#785919]/10 blur-[120px] dark:bg-[#eac076]/10" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-900/5 blur-[140px]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#785919]/15 bg-[#785919]/5 px-4 py-2 text-[#785919] dark:border-[#eac076]/20 dark:bg-[#eac076]/10 dark:text-[#eac076]">
            <Sparkles size={14} />
            <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em]">Trusted Partners</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1b1c1c] dark:text-[#e8e6e3] uppercase tracking-tight">
            Our Valued Clients
          </h2>
          <p className="font-sans text-sm text-[#666766] dark:text-[#8b8e93] mt-4 max-w-2xl mx-auto leading-relaxed">
            We partner with India's leading real estate developers, builders, and industrial conglomerates to deliver world-class electrical infrastructure solutions.
          </p>
          <div className="w-12 h-1 bg-[#785919] dark:bg-[#eac076] mx-auto mt-6 rounded-full" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {clients.map((client, index) => (
            <motion.article
              key={client.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.32) }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl border border-[#e9e8e7] bg-[#fbf9f8]/80 p-1 shadow-sm transition-all duration-300 hover:border-[#785919]/30 hover:shadow-xl hover:shadow-[#785919]/10 dark:border-[#3a3d45] dark:bg-[#23252d]/80 dark:hover:border-[#eac076]/30 dark:hover:shadow-black/30"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eac076]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex min-h-[210px] flex-col rounded-lg bg-white p-5 dark:bg-[#1a1c22]">
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full border border-[#e9e8e7] px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-[#785919] dark:border-[#3a3d45] dark:text-[#eac076]">
                    {client.segment}
                  </span>
                  {/* <ArrowUpRight className="h-4 w-4 text-[#c4c7c7] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#785919] dark:group-hover:text-[#eac076]" /> */}
                </div>

                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#e9e8e7] bg-[#fbf9f8] p-6 dark:border-[#3a3d45] dark:bg-[#23252d]">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={220}
                    height={120}
                    className="max-h-[74px] w-auto max-w-[85%] object-contain grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0 dark:brightness-90 dark:group-hover:brightness-100"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-black dark:text-white">
                      {client.name}
                    </h3>
                    <p className="mt-1 font-sans text-xs text-[#666766] dark:text-[#8b8e93]">Electrical infrastructure partner</p>
                  </div>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#785919]/10 text-[#785919] dark:bg-[#eac076]/10 dark:text-[#eac076]">
                    <Building2 size={16} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 border-t border-[#e9e8e7] pt-12 dark:border-[#3a3d45] md:grid-cols-3">
          {[
            { value: '200+', label: 'Projects Completed' },
            { value: '50+', label: 'Industry Leaders' },
            { value: '25+', label: 'Years of Excellence' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-[#e9e8e7] bg-[#fbf9f8] p-6 text-center dark:border-[#3a3d45] dark:bg-[#23252d]"
            >
              <CheckCircle2 className="mx-auto mb-4 h-6 w-6 text-[#785919] dark:text-[#eac076]" />
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#785919] dark:text-[#eac076] mb-2">
                {stat.value}
              </div>
              <p className="font-sans text-sm text-[#666766] dark:text-[#8b8e93]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
