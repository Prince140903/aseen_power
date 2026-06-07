'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, Search, Zap, Filter } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Industrial' | 'Commercial' | 'Infrastructure';
  location: string;
  detail: string;
  imageUrl: string;
  kVA?: string;
  year?: string;
}

export default function ProjectsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All Projects', 'Industrial', 'Commercial', 'Infrastructure'];

  const projectsData: Project[] = [
    {
      id: 'proj-1',
      title: 'Techno-Park Manufacturing Unit',
      category: 'Industrial',
      location: 'Pune, Maharashtra',
      detail: 'Complete 33KV substation installation, internal power distribution bus ducting, and automated generator synchronizing panels for a heavy engine casting facility.',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      kVA: '2,500 kVA',
      year: '2024'
    },
    {
      id: 'proj-2',
      title: 'Grand Meridian IT Park',
      category: 'Commercial',
      location: 'Bangalore, Karnataka',
      detail: 'Integrated microprocessor lighting control systems, emergency backup solutions, double busbar installations, and star-delta heavy HVAC starters for high-rise corporate towers.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
      kVA: '5,000 kVA',
      year: '2025'
    },
    {
      id: 'proj-3',
      title: 'City Metro Power Grid',
      category: 'Infrastructure',
      location: 'Hyderabad, Telangana',
      detail: 'Laying of 110KV heavy underground transmission lines across critical urban corridors, linking major substation units to optimize local municipal grids.',
      imageUrl: 'https://images.unsplash.com/photo-1544724480-8237305d33b4?auto=format&fit=crop&q=80&w=600',
      kVA: '12.5 MVA',
      year: '2024'
    },
    {
      id: 'proj-4',
      title: 'Oceanic Petrochemical Grid',
      category: 'Industrial',
      location: 'Dahej, Gujarat',
      detail: 'Design and commissioning of flame-proof distribution boards, synchronized double-ended load centers, and active harmonic filters for hazardous environments.',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      kVA: '3,000 kVA',
      year: '2023'
    },
    {
      id: 'proj-5',
      title: 'Central Government Hospital Block',
      category: 'Commercial',
      location: 'New Delhi',
      detail: 'Fail-safe electrical networks incorporating high-speed AMF transfer panels, dual redundant UPS banks, and clean-power isolation transformers for surgical operation theatres.',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      kVA: '1,500 kVA',
      year: '2025'
    },
    {
      id: 'proj-6',
      title: 'Solar Farm Grid Sync Substation',
      category: 'Infrastructure',
      location: 'Jodhpur, Rajasthan',
      detail: 'Turnkey pooling substation engineering comprising power transformers, state-of-the-art remote telemetry units (scada), and grid-interfaced vacuum circuit breakers (VCB).',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600',
      kVA: '25.0 MVA',
      year: '2024'
    }
  ];

  // Filtering logic
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'All Projects' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.detail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fbf9f8] min-h-screen py-16 sm:py-24" id="projects-view-root">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-xs tracking-[0.3em] font-extrabold text-[#785919] uppercase block mb-3">
            TECHNICAL MILESTONES
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight uppercase mb-6">
            SUCCESSFUL PROJECTS
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#444748] leading-relaxed">
            A selective breakdown of utility-scale substations, critical commercial installations, and structural infrastructure projects compiled under absolute ISO audit guidelines.
          </p>
          <div className="w-16 h-1 bg-[#785919] mx-auto mt-6 rounded-full" />
        </div>

        {/* Categories toggler + Search composite bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-stone-200 pb-8" id="projects-controls-container">
          
          {/* Category Pills matching Mockup 1 exactly */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-display text-xs lg:text-sm font-bold tracking-wider cursor-pointer border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black text-white border-black shadow-sm' 
                    : 'bg-white text-stone-600 border-[#e9e8e7] hover:bg-stone-50 hover:text-black'
                }`}
                id={`projects-filter-${cat.replace(" ", "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Clean Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search projects, states..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm pl-11 pr-4 py-3 font-sans text-xs text-black placeholder:text-gray-400 transition-colors"
              id="projects-search-input"
            />
          </div>
        </div>

        {/* Interactive Staggered Grid Container */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="projects-dynamic-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg border border-[#e9e8e7] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Category Pin Badge matching Image 1: Industrial, Commercial, Infrastructure */}
                  <span className="absolute top-4 right-4 bg-[#785919] text-white text-[9px] font-display font-black tracking-widest px-3 py-1.5 uppercase rounded-sm shadow-sm">
                    {project.category}
                  </span>

                  {/* Technical quick metrics banner */}
                  <div className="absolute bottom-4 left-4 bg-black/75 px-3 py-1 text-[10px] font-mono text-[#eac076] tracking-widest rounded-sm border-l-2 border-secondary">
                    {project.kVA} | CY: {project.year}
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    {/* Location Pin line */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={12} className="text-[#785919]" />
                      <span className="font-display font-semibold text-[10px] tracking-wider text-[#785919]">
                        {project.location}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-black leading-tight mb-4 tracking-tight">
                      {project.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed mb-6">
                      {project.detail}
                    </p>
                  </div>

                  {/* Footer link to launch blueprints modal or get specs */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#4af] bg-blue-50 text-blue-900 border border-blue-100 px-2.5 py-1 rounded-sm uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <Zap size={10} className="fill-blue-500 stroke-blue-500" />
                      COMMISSIONED
                    </span>
                    
                    <button 
                      onClick={() => alert(`Reviewing technical specifications of ${project.title}`)}
                      className="font-display text-[10px] tracking-widest font-extrabold text-[#785919] hover:text-black flex items-center gap-1 group cursor-pointer"
                    >
                      SPEC BLUEPRINTs
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty matching fallback alert */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white border border-[#e9e8e7] rounded-lg mt-12">
            <span className="font-display text-xs font-bold text-stone-400 block tracking-wider uppercase">
              No matching electrical contracts found
            </span>
            <p className="font-sans text-xs text-gray-400 mt-2">
              Try adjusting your search parameter or select another category indicator.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
