import React from 'react';
import Link from 'next/link';
import RevealOnScroll from '../../ui/RevealOnScroll';

export default function HeroSection() {
  return (
    <section className="px-page pt-4 pb-8 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 flex flex-col justify-center min-h-[30vh] md:min-h-[calc(100vh-140px)]">
      {/* Mobile-only breadcrumb (desktop shows it over the sticky image) */}
      <nav className="md:hidden flex items-center text-[13px] text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2 text-muted/40">/</span>
        <span className="text-text">About Us</span>
      </nav>

      <RevealOnScroll>
        <span className="font-label-md text-primary uppercase tracking-[0.2em] mb-6 block">Our Legacy</span>
        <h2 className="cormorant text-5xl md:text-7xl lg:text-7xl text-[#211a15] leading-tight mb-8">
          Born from the shores of <span className="italic text-primary">tranquility.</span>
        </h2>
        <p className="font-jost text-on-surface-variant max-w-md leading-relaxed border-l-2 border-primary/30 pl-6 italic md:text-lg">
          A tribute to slow living, inspired by the gentle rhythm of Kerala's heart.
        </p>
      </RevealOnScroll>
    </section>
  );
}
