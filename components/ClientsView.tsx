'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface Client {
  id: string;
  name: string;
  logo: string;
}

export default function ClientsView() {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);

  // Sample client data - replace with CMS data if available
  const defaultClients: Client[] = [
    { id: '1', name: 'Raymond Realty', logo: '/assets/clients/raymond.png' },
    { id: '2', name: 'Birla Estates', logo: '/assets/clients/birla estates.png' },
    { id: '3', name: 'Tata Housing', logo: '/assets/clients/tatahousing.png' },
    { id: '4', name: 'L&T Realty', logo: '/assets/clients/L&T.png' },
    { id: '5', name: 'Oberoi Realty', logo: '/assets/clients/Oberoi-Realty-Logo.png' },
    { id: '6', name: 'Tata Projects', logo: '/assets/clients/tata projects.png' },
    { id: '7', name: 'Aurum', logo: '/assets/clients/Aurum.png' },
    { id: '8', name: 'CCI Projects', logo: '/assets/clients/CCI Projects.png' },
    { id: '9', name: 'K Raheja', logo: '/assets/clients/K Raheja.png' },
    { id: '10', name: 'Lodha Palava', logo: '/assets/clients/lodhapalava.png' },
    { id: '11', name: 'Narang', logo: '/assets/clients/narang.png' },
    { id: '12', name: 'The Address GS', logo: '/assets/clients/Address GS.png' },
    { id: '13', name: 'ACME', logo: '/assets/clients/acme.png' },
    { id: '14', name: 'Sunteck', logo: '/assets/clients/sunteck.png' },
    { id: '15', name: 'Runwal', logo: '/assets/clients/Runwal.png' },
    { id: '16', name: 'Saifee Burhani', logo: '/assets/clients/Saifee.png' },
  ];

  useEffect(() => {
    setClients(defaultClients);
    setLoading(false);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || clients.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % clients.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, clients.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index % clients.length);
    setIsAutoPlay(false);
    // Resume auto-play after 8 seconds of manual interaction
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  // Get visible clients (5 visible on desktop, 3 on tablet, 1 on mobile)
  const getVisibleClients = () => {
    let clientsPerView = 5;
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) clientsPerView = 1;
      else if (window.innerWidth < 1024) clientsPerView = 3;
    }
    const visible = [];
    for (let i = 0; i < clientsPerView; i++) {
      visible.push(clients[(currentIndex + i) % clients.length]);
    }
    return visible;
  };

  if (loading) {
    return (
      <section className="py-24 bg-white border-b border-[#e9e8e7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#785919] border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white border-b border-[#e9e8e7] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-20">
          <h2 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] uppercase mb-3">
            Trusted Partners
          </h2>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] uppercase tracking-tight">
            Our Valued Clients
          </h3>
          <p className="font-sans text-sm text-[#666766] mt-4 max-w-2xl mx-auto">
            We partner with India's leading real estate developers, builders, and industrial conglomerates to deliver world-class electrical infrastructure solutions.
          </p>
          <div className="w-12 h-1 bg-[#785919] mx-auto mt-6 rounded-full" />
        </ScrollReveal>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main carousel */}
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className="flex gap-4 sm:gap-6 lg:gap-8"
              animate={{ x: -currentIndex * (100 / 5 + 2.4) + '%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 w-full sm:w-1/3 lg:w-1/5 min-h-[120px] sm:min-h-[140px] flex items-center justify-center"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-[#fbf9f8] border border-[#e9e8e7] rounded flex items-center justify-center p-3 sm:p-4 hover:border-[#785919]/30 hover:shadow-md transition-all duration-300 cursor-pointer group">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={100}
                        height={70}
                        className="object-contain max-w-[85%] max-h-[70px] filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          const placeholder = document.createElement('div');
                          placeholder.textContent = client.name;
                          placeholder.className = 'font-display font-semibold text-[9px] sm:text-xs text-center text-[#666766] px-2';
                          img.parentElement?.appendChild(placeholder);
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setTimeout(() => setIsAutoPlay(true), 2000)}
            className="absolute -left-6 sm:-left-9 top-1/2 transform -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white border border-[#e9e8e7] text-[#785919] hover:bg-[#785919] hover:text-white transition-all duration-300 shadow-md hidden sm:flex items-center justify-center cursor-pointer group"
            aria-label="Previous clients"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setTimeout(() => setIsAutoPlay(true), 2000)}
            className="absolute -right-9 top-2/5 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-[#e9e8e7] text-[#785919] hover:bg-[#785919] hover:text-white transition-all duration-300 shadow-md hidden md:flex items-center justify-center cursor-pointer group"
            aria-label="Next clients"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: Math.ceil(clients.length / 5) }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index * 5)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  Math.floor(currentIndex / 5) === index
                    ? 'bg-[#785919] w-6 sm:w-8'
                    : 'bg-[#e9e8e7] hover:bg-[#c4c7c7] w-1.5 sm:w-2'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-[#e9e8e7]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#785919] mb-2">
              200+
            </div>
            <p className="font-sans text-sm text-[#666766]">Projects Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#785919] mb-2">
              50+
            </div>
            <p className="font-sans text-sm text-[#666766]">Industry Leaders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#785919] mb-2">
              25+
            </div>
            <p className="font-sans text-sm text-[#666766]">Years of Excellence</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
