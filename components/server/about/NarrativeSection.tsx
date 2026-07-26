import React from 'react';
import RevealOnScroll from '../../ui/RevealOnScroll';

export default function NarrativeSection() {
  return (
    <section className="px-page py-8 md:py-16 bg-white">
      <RevealOnScroll>
        <div className="bg-[#F5F0E8] p-4 shadow-[0px_2px_16px_rgba(44,56,41,0.06)] border border-primary/10 rounded-2xl">
          <h3 className="cormorant text-4xl text-[#211a15] mb-8">The Echo of the Backwaters</h3>
          <div className="space-y-6 font-jost text-on-surface-variant text-lg">
            <p>In the quiet heart of Kerala, where the rhythm of life is set by the gentle lap of the backwaters against emerald banks, ZIEA found its soul. We began not as a brand, but as a tribute to the "Slow Living" philosophy that defines our home.</p>
            <p>Our journey follows the winding canals and the salt-kissed air of the Malabar coast, seeking to bottle that specific sense of morning tranquility—the moment the first light touches the dew on a banana leaf.</p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
