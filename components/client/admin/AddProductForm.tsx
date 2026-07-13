"use client";

import React, { useState } from 'react';
import { MdCameraAlt, MdClose, MdAdd, MdRemove } from 'react-icons/md';

export default function AddProductForm() {
  const [stock, setStock] = useState(15);
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product logic would trigger here. Product saved successfully.');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Image Upload Area */}
      <section className="space-y-4">
        <label className="font-label-md font-medium text-on-surface-variant">Product Gallery</label>
        
        <div className="relative group">
          <input accept="image/*" className="hidden" id="product-upload" multiple type="file" />
          <label 
            htmlFor="product-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-outline-variant bg-[#ffffff] rounded-xl cursor-pointer hover:bg-[#f9ebe1] transition-all group-active:scale-[0.98]" 
          >
            <MdCameraAlt className="text-4xl text-primary mb-2" />
            <p className="font-label-md text-on-surface-variant">Tap to upload photos</p>
            <p className="text-[10px] uppercase tracking-widest text-outline mt-1">High-res linen textures preferred</p>
          </label>
        </div>

        {/* Image Preview Grid (Asymmetric Bento Style) */}
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-2 row-span-2 aspect-square rounded-xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.08)] relative group">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10">
              <MdClose className="text-white text-3xl" />
            </div>
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7WuIPZtvagMVCZzFpP-g4YPiqWUDDprVevAoZ0d0KwnaMozSbgpDYg3-tu1bMe-ISUykdLS9_2XFup1J-R5g2ZOqW52RFbVuRGSo4dNHfiURBcqBP1ZHpz_HDsxFryjn7vuMugRtfsN3nHwmi7OwSFJm6ao-36tuJ7gAS-BfSVLHzhLWbxWI7DvPeFLdxvQ8h3Uc8axo-pkU0qzxH8-2deUWUKp0b0cSXjggd6H8xGOKx2eZvg6rnxK7FCAGND7tQZs6PhFE7oQI')" }}
            ></div>
          </div>
          
          <div className="aspect-square rounded-xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.08)] relative group">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDq7_dEQ9RrfTaMzxiQSoMkFHBVcp8v0xCsjADcGBCy07UI1_A-ZRoxqRnAYISC97A5iSR6_Mz25dGr8tTIDPVAu4ll7V15uPNxBnx_xz2lVrUm2BXEGZAxNwbiQqDOAhcPh7M43bv-s9-apy4zPCGGb19el2Nheq2yQ0-Nf1glpQLGPk9P_gDJUCpHKpnrAHHBJ03bdji6P9nng2Ck8pTnSVfiN2R_SUj9X5TbNUMb8Dephx7EYtUEHXyK7gNNsK6-3oaXePPjQg')" }}
            ></div>
          </div>
          
          <div className="aspect-square rounded-xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.08)] border border-outline-variant flex items-center justify-center bg-[#fff1e7] text-outline cursor-pointer hover:bg-[#eee0d6] transition-colors">
            <MdAdd className="text-2xl" />
          </div>
          
          <div className="col-span-2 aspect-[2/1] rounded-xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.08)] relative group">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWfOihMpKg8xkA1sVxWhcUjgJg36VaAzSdEz2fFdj3s1jINATsRFSLPW1VYrRywpcKU8O4sMkro1l8dYI4AzZ3OpWSyK0TjI_mGRqPSvYNYcPnjunQMtLPo-fMACwtmSqKvTiADuGR6UvCBihC6wvQ55N3CmLZantZuq52X0YC6fN7fChyZt6i-2tHEkLBlThwvk71okZcJnB-KnR3ipjsUqA-uWF1j9qo_1lQ2bxRLZhrLl5isqPLFqojf55JAfCziZa6KXfU-8k')" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-label-md font-medium text-on-surface-variant" htmlFor="product-name">Product Name</label>
          <input 
            id="product-name"
            className="w-full h-12 px-4 bg-[#ffffff] border border-outline-variant rounded-[12px] font-body-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
            placeholder="e.g. Malabar Mist Linen Kaftan" 
            type="text" 
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="font-label-md font-medium text-on-surface-variant" htmlFor="description">Description</label>
          <textarea 
            id="description"
            className="w-full p-4 bg-[#ffffff] border border-outline-variant rounded-[12px] font-body-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" 
            placeholder="Describe the tactile feel, origin of fabric, and the comfort story..." 
            rows={4}
          ></textarea>
        </div>

        {/* Category & Price Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-label-md font-medium text-on-surface-variant" htmlFor="category">Category</label>
            <select 
              id="category"
              className="w-full h-12 px-4 bg-[#ffffff] border border-outline-variant rounded-[12px] font-body-md text-[14px] appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option>Nightwear</option>
              <option>Loungewear</option>
              <option>Accessories</option>
              <option>Home</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-label-md font-medium text-on-surface-variant" htmlFor="price">Price (₹)</label>
            <input 
              id="price"
              className="w-full h-12 px-4 bg-[#ffffff] border border-outline-variant rounded-[12px] font-body-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
              placeholder="2499" 
              type="number" 
            />
          </div>
        </div>

        {/* Stock & Tags Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-label-md font-medium text-on-surface-variant" htmlFor="stock">Stock Quantity</label>
            <div className="flex items-center bg-[#ffffff] border border-outline-variant rounded-[12px] overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all h-12">
              <button 
                type="button" 
                onClick={() => setStock(Math.max(0, stock - 1))}
                className="px-3 h-full hover:bg-surface-container-high transition-colors text-outline"
              >
                <MdRemove className="text-lg" />
              </button>
              <input 
                id="stock"
                className="w-full h-full text-center border-none bg-transparent font-body-md text-[14px] focus:ring-0" 
                type="number" 
                value={stock} 
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              />
              <button 
                type="button" 
                onClick={() => setStock(stock + 1)}
                className="px-3 h-full hover:bg-surface-container-high transition-colors text-outline"
              >
                <MdAdd className="text-lg" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-md font-medium text-on-surface-variant">Visibility</label>
            <div className="flex items-center h-12 px-4 bg-[#ffffff] border border-outline-variant rounded-[12px]">
              <span className="font-label-md flex-grow">Publish to Store</span>
              <div 
                className="relative inline-flex items-center cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
              >
                <div className={`w-10 h-5 rounded-full transition-colors ${isVisible ? 'bg-primary' : 'bg-[#e5d8ce]'}`}>
                  <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform ${isVisible ? 'translate-x-[20px] border-white' : ''}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Spacer */}
      <div className="h-8"></div>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-surface/80 backdrop-blur-lg border-t border-[#f3e6dc] z-40 lg:pl-72">
        <button 
          type="submit"
          className="w-full h-14 bg-primary text-white rounded-full font-label-md uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-primary-container hover:text-on-primary-container max-w-2xl mx-auto block" 
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
