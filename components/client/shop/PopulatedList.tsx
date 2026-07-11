"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MdOutlineDelete, MdOutlineLocalShipping } from 'react-icons/md';

interface ProductItem {
  id: string;
  title: string;
  variant: string;
  price: string;
  image: string;
}

interface PopulatedListProps {
  items: ProductItem[];
  type: 'wishlist' | 'cart';
}

export default function PopulatedList({ items, type }: PopulatedListProps) {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (id: string) => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 ${type === 'wishlist' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map((item) => (
        <div key={item.id} className="flex flex-col group cursor-pointer relative">
          <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-[0px_2px_16px_rgba(44,56,41,0.08)] aspect-[3/4] mb-4">
            <Image 
              src={item.image} 
              alt={item.title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <button className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:bg-black/60 z-10 text-white">
              <MdOutlineDelete className="text-[18px]" />
            </button>
          </div>
          
          <div className="space-y-1.5 px-1">
            <h3 className="cormorant text-xl font-semibold text-on-surface leading-snug truncate">{item.title}</h3>
            <p className="font-jost text-[14px] text-on-surface-variant truncate">{item.variant}</p>
            <div className="flex justify-between items-center mt-1">
              <span className="font-jost font-bold text-lg text-[#6d8a57]">{item.price}</span>
              <div className="flex items-center gap-2 bg-surface-container-low px-2 py-0.5 rounded border border-[#6d8a57]/20">
                <span className="font-jost text-xs text-[#44483f] font-medium">Qty:</span>
                <span className="font-jost text-sm font-semibold text-[#211a15]">1</span>
              </div>
            </div>
            <p className="text-[#72796c] text-[12px] mt-1.5 flex items-center gap-1">
              <MdOutlineLocalShipping className="text-[14px]" />
              Delivery by <span className="font-semibold text-[#44483f]">Jul 14, 2026</span>
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); handleAddToCart(item.id); }}
              className={`w-full mt-3 text-white py-2.5 rounded-full font-label-md hover:opacity-90 active:scale-[0.97] transition-all shadow-sm ${addedItems[item.id] ? 'bg-secondary' : 'bg-primary'}`}
            >
              {addedItems[item.id] ? "Added!" : (type === 'wishlist' ? "Move to Cart" : "Remove from Cart")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
