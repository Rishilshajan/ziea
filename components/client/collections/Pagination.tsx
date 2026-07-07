"use client";
import React from 'react';

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-16 mb-2">
      <button aria-label="Previous page" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eee0d6] text-[#44483f] transition-colors">
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4c623d] text-white font-medium text-sm transition-colors">
        1
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eee0d6] text-[#44483f] font-medium text-sm transition-colors">
        2
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eee0d6] text-[#44483f] font-medium text-sm transition-colors">
        3
      </button>
      <span className="text-[#44483f] px-1">...</span>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eee0d6] text-[#44483f] font-medium text-sm transition-colors">
        12
      </button>
      
      <button aria-label="Next page" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eee0d6] text-[#44483f] transition-colors">
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </div>
  );
}
