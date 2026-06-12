'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface Client {
  id: string;
  name: string;
  logo: string;
}

export function ClientsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

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

  // Duplicate clients for seamless infinite loop
  const duplicatedClients = [...clients, ...clients];

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Measure the track to calculate animation distance
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const measure = () => {
      const track = containerRef.current?.firstElementChild as HTMLElement;
      if (track) {
        // Half the total width (one full set of clients)
        setTrackWidth(track.scrollWidth / 2);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mounted]);

  // Run infinite scroll animation
  useEffect(() => {
    if (!mounted || trackWidth === 0) return;

    if (isPaused) {
      controls.stop();
      return;
    }

    // Calculate duration: ~30s for a full cycle of the single set
    const duration = Math.max(25, trackWidth / 60); // speed: 60px/s, minimum 25s

    controls.start({
      x: -trackWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [mounted, trackWidth, isPaused, controls]);

  if (!mounted) return null;

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

        {/* Infinite auto-scrolling marquee */}
        <div
          ref={containerRef}
          className="overflow-hidden rounded-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-3 sm:gap-6"
            animate={controls}
            initial={{ x: 0 }}
          >
            {duplicatedClients.map((client, index) => (
              <motion.div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-[calc(50%-0.375rem)] sm:w-[calc(16.666%-1.25rem)] min-h-[80px] sm:min-h-[100px] flex items-center justify-center"
                whileHover={{ y: -2, scale: 1.02 }}
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

        {/* Decorative gradient fade on edges
        <div className="flex justify-center gap-1 sm:gap-1.5 mt-6 sm:mt-8">
          <div className="h-1 w-6 rounded-full bg-[#785919]" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-[#e9e8e7]" />
          ))}
        </div> */}
      </div>
    </section>
  );
}
