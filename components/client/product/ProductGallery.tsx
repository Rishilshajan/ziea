"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Desktop Thumbnails (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col gap-4 overflow-y-auto max-h-[600px] no-scrollbar shrink-0 w-20 xl:w-24">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative aspect-[4/5] w-full rounded-md overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[600px] rounded-xl overflow-hidden bg-[#eee0d6]/30 shadow-sm">
        <Image
          src={images[activeImage]}
          alt="Product Main Image"
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
      </div>

      {/* Mobile Thumbnails (Hidden on Desktop) */}
      <div className="flex md:hidden gap-3 overflow-x-auto no-scrollbar w-full pt-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative aspect-[4/5] w-16 sm:w-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent opacity-70"
              }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
