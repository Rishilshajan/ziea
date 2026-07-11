import React from 'react';
import RevealOnScroll from '../../ui/RevealOnScroll';
import Link from 'next/link';

export default function EditorialCTA() {
  return (
    <section className="pt-20 pb-12 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <RevealOnScroll>
          <div className="w-16 h-px bg-primary mx-auto mb-10"></div>
          <h3 className="cormorant text-4xl md:text-5xl text-[#211a15] mb-6 italic">Experience the Comfort</h3>
          <p className="font-jost text-on-surface-variant mb-10 max-w-2xl mx-auto md:text-lg">
            Invite the tranquility of the backwaters into your home with our latest collection of hand-loomed essentials. Designed for the quiet moments that matter most.
          </p>
          <Link href="/collections" className="group relative inline-block">
            <button className="relative bg-primary text-white px-12 py-4 rounded-full font-label-md text-sm uppercase tracking-widest transition-all hover:bg-[#3d4f31]">
              Shop the Collection
            </button>
          </Link>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex justify-center items-center"><span className="cormorant italic text-xl">Vogue</span></div>
            <div className="flex justify-center items-center"><span className="cormorant italic text-xl">Travel + Leisure</span></div>
            <div className="flex justify-center items-center"><span className="cormorant italic text-xl">Elle Decor</span></div>
            <div className="flex justify-center items-center"><span className="cormorant italic text-xl">The Hindu</span></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
