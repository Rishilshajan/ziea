"use client";

import React, { useState } from 'react';

export default function ProductActions() {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div className="space-y-4">
        <label className="font-label-md text-on-surface-variant block text-sm font-medium">Select Size</label>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex-none w-14 h-10 rounded-full font-jost text-sm transition-all duration-200 active:scale-95 border border-transparent ${
                selectedSize === size
                  ? "bg-[#4c623d] text-white"
                  : "bg-surface-variant text-primary hover:bg-[#d6c3b3]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <p className="text-xs text-secondary italic">Only 1 left in stock</p>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label className="font-label-md text-on-surface-variant block text-sm font-medium">Quantity</label>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-variant text-primary hover:bg-[#d6c3b3] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">remove</span>
          </button>
          <span className="font-jost text-base w-6 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-variant text-primary hover:bg-[#d6c3b3] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-2 space-y-4">
        <button className="w-full bg-[#865139] text-white font-label-md h-12 rounded-full transition-all hover:bg-[#7a4730] active:scale-[0.97] soft-lift uppercase tracking-widest text-sm font-bold">
          Add to Cart
        </button>
        <button className="w-full bg-transparent border-2 border-[#4c623d] text-[#4c623d] font-label-md h-12 rounded-full transition-all hover:bg-[#4c623d] hover:text-white active:scale-[0.97] uppercase tracking-widest text-sm font-bold">
          Buy Now
        </button>
      </div>

      {/* Delivery Estimate */}
      <div className="bg-[#f9ebe1] p-4 rounded-lg flex gap-4 items-start border border-[#d6c3b3]/30">
        <span className="material-symbols-outlined text-[#4c623d] mt-0.5">local_shipping</span>
        <div>
          <p className="text-sm font-semibold text-[#44483f]">Estimated delivery in 7 days</p>
          <p className="text-xs text-[#74796e] mt-1">Free shipping on all orders</p>
        </div>
      </div>
      
      {/* Badges */}
      <div className="flex justify-between items-center py-4 border-b border-[#eee0d6]">
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#4c623d]">local_shipping</span>
          <span className="text-[10px] text-[#74796e] uppercase tracking-wider">Free Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#4c623d]">eco</span>
          <span className="text-[10px] text-[#74796e] uppercase tracking-wider">Eco-Friendly</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#4c623d]">verified_user</span>
          <span className="text-[10px] text-[#74796e] uppercase tracking-wider">Secure Pay</span>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-4 pt-2">
        <details className="group border-b border-[#eee0d6] pb-4">
          <summary className="flex justify-between items-center cursor-pointer list-none">
            <span className="font-label-md text-primary font-bold">Material & Care</span>
            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
          </summary>
          <div className="pt-3 text-sm text-[#74796e] font-jost leading-relaxed">
            Dry clean recommended. Hand wash cold with mild detergent. Lay flat to dry in shade to preserve the color and fibers.
          </div>
        </details>
        <details className="group border-b border-[#eee0d6] pb-4">
          <summary className="flex justify-between items-center cursor-pointer list-none">
            <span className="font-label-md text-primary font-bold">Shipping & Returns</span>
            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
          </summary>
          <div className="pt-3 text-sm text-[#74796e] font-jost leading-relaxed">
            Free shipping on orders over ₹2000. Returns accepted within 7 days of delivery for unworn items in original packaging.
          </div>
        </details>
      </div>
    </div>
  );
}
