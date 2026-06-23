'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface Client {
  id: string;
  name: string;
  logo: string;
}

interface ClientsCarouselProps {
  onViewAll?: () => void;
}

export function ClientsCarousel({ onViewAll }: ClientsCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
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

  // Measure the track to calculate animation distance
  useEffect(() => {
    if (!containerRef.current) return;

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
  }, []);

  // Run infinite scroll animation
  useEffect(() => {
    if (trackWidth === 0) return;

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
  }, [trackWidth, isPaused, controls]);

  return (
    <section className="py-12 sm:py-16 bg-[#fbf9f8] dark:bg-[#0f1115] border-t border-b border-[#e9e8e7] dark:border-[#3a3d45]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal variant="fadeUp" className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:mb-12 md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-xs tracking-[0.25em] font-extrabold text-[#785919] dark:text-[#eac076] uppercase mb-2">
              Trusted By Industry Leaders
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#666766] dark:text-[#8b8e93]">
              Partnering with India's most respected enterprises
            </p>
          </div>
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-2 rounded-full border border-[#785919]/20 bg-white px-5 py-2.5 font-display text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#785919] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#785919] hover:bg-[#785919] hover:text-white dark:border-[#eac076]/25 dark:bg-[#1a1c22] dark:text-[#eac076] dark:hover:bg-[#eac076] dark:hover:text-black"
            >
              View All
              <ArrowRight size={14} />
            </button>
          )}
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
                <div className="w-full h-full bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded flex items-center justify-center p-2 sm:p-3 hover:border-[#785919]/20 dark:hover:border-[#eac076]/20 hover:shadow-sm transition-all duration-300 group">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={80}
                      height={50}
                      className="object-contain max-w-[80%] max-h-[60px] filter grayscale group-hover:grayscale-0 transition-all duration-300 dark:brightness-90 dark:group-hover:brightness-100"
                      priority={false}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.textContent = client.name;
                        placeholder.className = 'font-display font-semibold text-[8px] sm:text-[9px] text-center text-[#999999] dark:text-[#8b8e93] px-1 line-clamp-2';
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
