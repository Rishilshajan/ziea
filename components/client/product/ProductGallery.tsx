"use client";

import React, { useState } from 'react';
import type { ProductImage } from '@/types/product';
import SmartImage from '@/components/ui/SmartImage';

interface ProductGalleryProps {
  images: ProductImage[];
}

/** Renders an image with the shared crop model (same as ProductCard). */
function CroppedImage({
  image,
  alt,
  priority,
  sizes,
}: {
  image: ProductImage;
  alt: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <SmartImage
      src={image.url}
      alt={alt}
      cropX={image.crop_x ?? 50}
      cropY={image.crop_y ?? 50}
      zoom={image.zoom ?? 100}
      sizes={sizes}
      priority={priority}
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
            <CroppedImage image={img} alt={`Thumbnail ${idx + 1}`} sizes="96px" />
          </button>
        ))}
      </div>

      {/* Main Image View — locked to the 4:5 master ratio (1080×1350) so the full
          image shows with no top/bottom crop. On desktop a fixed height derives
          the matching 4:5 width. */}
      <div className="relative w-full aspect-[4/5] md:w-auto md:h-[600px] xl:h-[680px] rounded-xl overflow-hidden bg-[#eee0d6]/30 shadow-sm">
        {active && (
          <CroppedImage image={active} alt="Product Main Image" priority sizes="(min-width: 768px) 480px, 100vw" />
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
            <CroppedImage image={img} alt={`Thumbnail ${idx + 1}`} sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
