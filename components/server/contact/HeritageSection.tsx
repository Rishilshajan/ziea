import React from 'react';

export default function HeritageSection() {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="order-2 md:order-1 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg">
        <img 
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
          alt="Organic cotton fabric with spice flower" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA578q2MWB2HZDZ0pxA5Cn_PsXohBpg00eagTi0XamkWnXh5SweBedNfv-IhTkrOyrXx4SWjDPlZnWZkvlCLGt-FL1y0yYu2Bz_k9qtqSxRnQVBkA8sSzE3ePBv3XFgk-Qb9Ki2yAKegERx5Xos5SvhAmLROiZQzsJYV9wzXobiOhG1WpVosNKIZVmS-bLxmuRWG0f2p578AbOiF2vEU3TNhi8HhKDObAeNWlTLNFy7KCvhna49WlphfpicRc8zthiD2Npgx-3Q4jk"
        />
      </div>
      <div className="order-1 md:order-2 space-y-4">
        <span className="font-label-md text-sm text-[#865139] uppercase tracking-[0.2em]">Our Heritage</span>
        <h3 className="cormorant text-4xl lg:text-5xl text-primary leading-tight">Crafted in the Heart of Kerala</h3>
        <p className="font-jost text-on-surface-variant text-lg leading-relaxed border-l-2 border-[#865139]/20 pl-6">
          Our studio is more than just a place of work; it's a sanctuary where Kerala's rich textile heritage meets modern, minimalist design. Inspired by the backwaters and the tropical breeze, every ZIEA piece is a tribute to tranquility.
        </p>
      </div>
    </div>
  );
}
