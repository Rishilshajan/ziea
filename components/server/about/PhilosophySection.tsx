import React from 'react';
import RevealOnScroll from '../../ui/RevealOnScroll';

export default function PhilosophySection() {
  return (
    <section className="relative py-24 md:py-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          alt="Lifestyle portrait in ZIEA nightdress."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAADuBpks4zXCEFnARVZRJxDJH4VPCdXebQLIf3PLjBzxHotwZf5Bl3WnN_oCL_S9DWZpQpymw2StUCt3rRqi10rDS9TLnFr4_lj9A3t6HZGldzSA1W_dnDuyz1hkopoSArfMXk2Zwpb-8QHjaS6kxE-UFCsvLsBb4Q2iIiyYV-z133f-HOQuxXqupHOEosEbZZ6xzj04sS87lSJ-rIQgsQFAwXzy1Wrc54CH_2EzuLC19JBiJm7VpXlAUCuqQxi1tXZW15qhm0E74"
        />
        <div className="absolute inset-0 bg-[#1a2318]/60 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <RevealOnScroll>
          <span className="material-symbols-outlined text-primary-container text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>spa</span>
          <h3 className="cormorant text-4xl md:text-6xl text-white italic mb-8 drop-shadow-md">"A ritual of rest."</h3>
          <p className="font-jost text-white/95 text-xl md:text-2xl leading-relaxed mb-10 font-light drop-shadow">
            At ZIEA, we believe that the clothes you wear to rest are the most important in your wardrobe. They are the transition from the noise of the world to the sanctuary of the self. Our philosophy of slow living isn't just about pace—it's about the intentionality of touch, the quality of fiber, and the heritage of the hands that made them.
          </p>
          <div className="inline-flex items-center gap-4 py-3 px-8 rounded-full bg-primary text-white border border-primary hover:bg-[#3d4f31] transition-colors cursor-default shadow-lg">
            <span className="font-label-md tracking-[0.1em] text-sm">THE ZIEA PROMISE</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
