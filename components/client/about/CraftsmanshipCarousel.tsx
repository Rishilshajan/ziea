"use client";

import React, { useState, useEffect } from 'react';
import RevealOnScroll from '../ui/RevealOnScroll';

export default function CraftsmanshipCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-8 md:px-12 md:py-16 lg:px-24 lg:py-24 xl:px-32 bg-primary/5">
      <div className="mb-12">
        <RevealOnScroll>
          <span className="font-label-md text-primary uppercase tracking-widest block mb-2">Artisanship</span>
          <h3 className="cormorant text-[#211a15] text-3xl md:text-5xl">Unrivaled Craftsmanship</h3>
        </RevealOnScroll>
      </div>
      
      <RevealOnScroll>
        <div className="relative w-full h-[550px] md:h-[500px]">
          {/* Card 1 */}
          <div className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ${currentIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.06)] group h-auto min-h-[450px] w-full flex flex-col">
              <div className="h-64 overflow-hidden shrink-0">
                <img 
                  alt="Traditional Looms" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAko-FQldqkXCWKP6RuDFWx1-fSKrnfs0-byR7m3hhQ4UV2l6Pf-thjznzyxzWz_cCazQATSRt0PSgPMfS5WmdOUVXLg-PxWTS2moY3TBWRK66Sw8TTCtaW7Mn9TMNfJY2LoPlENILbLAuLYY-tg_SK1LfWLElma2NLzKsgAjR2xpVCasMMlFNH7HqLPtnk5utwnfCiueYZ20o5ICJQrOtuQshuP-c9ns8QY1PUGg8ZBDBaEx22y3AK3rWB7ZLnSWduz2oLgA_vJQ4"
                />
              </div>
              <div className="p-8 flex-grow">
                <h4 className="cormorant text-2xl text-[#211a15] mb-4">Traditional Looms</h4>
                <p className="font-jost text-on-surface-variant">Every ZIEA garment begins on a traditional hand-loom, preserved through generations of weaving families in Balaramapuram.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ${currentIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.06)] group h-auto min-h-[450px] w-full flex flex-col">
              <div className="h-64 overflow-hidden shrink-0">
                <img 
                  alt="Natural Fibers" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgR88qG9r8GV6YSLHaeh8ae3JqGl6S6UgUD5u5aTS1fJRPM-1tmqBD_UqZR3YtAZNV5sp4220u0Cn2CFsp4DpeEsD6i7sgdKb0zKIlo4krFfgMy1jyb7btzFQoHpZtDrYSs3VidROntZybKHOL5TgoCm-TpJZfo56Ir-pcJB8XHVfgkki97Mgx4nf2nABQyPcg4f2y3Vxd86ir_caWXN9xO2w4dKDQdpKcNbwnKXxznnuUP-3uSFDuTRbsd55rsFxy0xxYXtozJI8"
                />
              </div>
              <div className="p-8 flex-grow">
                <h4 className="cormorant text-2xl text-[#211a15] mb-4">Natural Fibers</h4>
                <p className="font-jost text-on-surface-variant">We exclusively use premium, sustainable fibers that allow your skin to breathe as nature intended. No synthetics, only pure comfort.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ${currentIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="bg-[#647b53] text-white h-[450px] w-full rounded-2xl p-8 flex flex-col justify-center">
              <h4 className="cormorant text-3xl mb-4">Heritage Dyes</h4>
              <p className="font-jost opacity-90 text-lg">Botanical pigments inspired by Kerala’s flora—turmeric, indigo, and madder root.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ${currentIndex === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="bg-[#ffb99c]/20 border border-[#ffb99c]/30 text-[#211a15] h-[450px] w-full rounded-2xl p-8 flex flex-col justify-center">
              <h4 className="cormorant text-3xl mb-4 text-[#865139]">Fair Trade</h4>
              <p className="font-jost text-on-surface-variant text-lg">Direct partnerships with local artisans ensure fair wages and thriving communities.</p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
