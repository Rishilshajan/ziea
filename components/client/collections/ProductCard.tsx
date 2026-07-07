"use client";
import React, { useState } from 'react';

import Link from 'next/link';

type ProductCardProps = {
  title: string;
  price: string;
  color: string;
  colorClass: string;
  image: string;
  badge?: string;
  badgeClass?: string;
  altText?: string; // made optional to prevent issues if missing
};

export default function ProductCard({
  title,
  price,
  color,
  colorClass,
  image,
  badge,
  badgeClass,
  altText = ""
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWished, setIsWished] = useState(false);
  
  // Generate a slug from the title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <Link 
      href={`/collections/${slug}`}
      className="group cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-[#f9ebe1] product-card-shadow aspect-[3/4] mb-4">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          style={{ backgroundImage: `url('${image}')` }}
          aria-label={altText}
        ></div>
        
        {badge && (
          <div className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-[12px] font-semibold tracking-wider uppercase ${badgeClass}`}>
            {badge}
          </div>
        )}
        
        <button 
          aria-label="Add to Wishlist" 
          onClick={(e) => {
            e.preventDefault(); // prevent navigation when clicking wishlist
            e.stopPropagation();
            setIsWished(!isWished);
          }}
          className={`absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all active:scale-90 ${isWished ? 'text-white' : 'text-white/80 hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
        </button>
      </div>
      <div className="space-y-1.5 px-1 mt-2">
        <h3 className="font-semibold text-[17px] text-[#6b1f1f] leading-snug">{title}</h3>
        <p className="text-[#6d8a57] font-bold text-lg">{price}</p>
        <p className="text-[#9ea3a8] text-[13px]">
          Delivery by <span className="font-bold text-[#37190d]">Jul 14, 2026</span>
        </p>
      </div>
    </Link>
  );
}
