'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface Client {
  id: string;
  name: string;
  logo: string;
}

export function ClientsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const clients: Client[] = [
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

  // Detect mobile and hydration
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || !mounted) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % clients.length);
    }, 3500); // Auto-scroll every 3.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, clients.length, mounted]);

  const getVisibleClients = () => {
    const clientsPerView = isMobile ? 2 : 6; // 2 on mobile, 6 on desktop
    const visible = [];
    for (let i = 0; i < clientsPerView; i++) {
      visible.push(clients[(currentIndex + i) % clients.length]);
    }
    return visible;
  };

  const clientsPerView = isMobile ? 2 : 6;
  const percentPerClient = 100 / clientsPerView;

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <section className="py-12 sm:py-16 bg-[#fbf9f8] border-t border-b border-[#e9e8e7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal variant="fadeUp" className="text-center mb-8 sm:mb-12">
          <h3 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] uppercase mb-2">
            Trusted By Industry Leaders
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#666766]">
            Partnering with India's most respected enterprises
          </p>
        </ScrollReveal>

        {/* Auto-scrolling carousel */}
        <div className="overflow-hidden rounded-lg">
          <motion.div
            className={`flex gap-3 sm:gap-6`}
            animate={{ x: -currentIndex * (percentPerClient + (isMobile ? 1.5 : 2.4)) + '%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {getVisibleClients().map((client, index) => (
              <motion.div
                key={`${client.id}-${index}`}
                className={`flex-shrink-0 ${isMobile ? 'w-1/2' : 'w-1/6'} min-h-[80px] sm:min-h-[100px] flex items-center justify-center`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-full h-full bg-white border border-[#e9e8e7] rounded flex items-center justify-center p-2 sm:p-3 hover:border-[#785919]/20 hover:shadow-sm transition-all duration-300 group">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={80}
                      height={50}
                      className="object-contain max-w-[80%] max-h-[60px] filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      priority={false}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.textContent = client.name;
                        placeholder.className = 'font-display font-semibold text-[8px] sm:text-[9px] text-center text-[#999999] px-1 line-clamp-2';
                        img.parentElement?.appendChild(placeholder);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-1 sm:gap-1.5 mt-6 sm:mt-8">
          {Array.from({ length: Math.ceil(clients.length / clientsPerView) }).map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                index === Math.floor(currentIndex / clientsPerView)
                  ? 'bg-[#785919]' 
                  : 'bg-[#e9e8e7]'
              }`}
              animate={{ 
                width: index === Math.floor(currentIndex / clientsPerView) ? 24 : 4 
              }}
              onClick={() => setCurrentIndex(index * clientsPerView)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
