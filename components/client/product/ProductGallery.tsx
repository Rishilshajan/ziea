"use client";

import React, { useState } from 'react';
import type { ProductImage } from '@/types/product';

interface ProductGalleryProps {
  images: ProductImage[];
}

/** Renders an image with the shared crop model (same as ProductCard). */
function CroppedImage({
  image,
  alt,
  priority,
}: {
  image: ProductImage;
  alt: string;
  priority?: boolean;
}) {
  const zoom = image.zoom ?? 100;
  const cropX = image.crop_x ?? 50;
  const cropY = image.crop_y ?? 50;

  return (
    <img
      src={image.url}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className="absolute object-cover max-w-none select-none pointer-events-none"
      style={{
        width: `${zoom}%`,
        height: `${zoom}%`,
        left: `${cropX}%`,
        top: `${cropY}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const safeImages = images ?? [];
  const active = safeImages[activeImage];

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Desktop Thumbnails (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col gap-4 overflow-y-auto max-h-[600px] no-scrollbar shrink-0 w-20 xl:w-24">
        {safeImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative aspect-[4/5] w-full rounded-md overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
          >
            <CroppedImage image={img} alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[600px] rounded-xl overflow-hidden bg-[#eee0d6]/30 shadow-sm">
        {active && (
          <CroppedImage image={active} alt="Product Main Image" priority />
        )}
      </div>

      {/* Mobile Thumbnails (Hidden on Desktop) */}
      <div className="flex md:hidden gap-3 overflow-x-auto no-scrollbar w-full pt-1">
        {safeImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative aspect-[4/5] w-16 sm:w-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent opacity-70"
              }`}
          >
            <CroppedImage image={img} alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
