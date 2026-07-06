"use client";

import { useState } from "react";

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  altText: string;
}

export default function ProductCard({ title, price, imageUrl, altText }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex flex-col space-y-4 group">
      <div className="relative bg-surface rounded-xl overflow-hidden aspect-[3/4] shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
        <div
          className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
          title={altText}
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{
              fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
              color: isFavorite ? "var(--color-secondary)" : "var(--color-muted)",
            }}
          >
            favorite
          </span>
        </button>
      </div>
      <div className="space-y-1">
        <h4 className="font-label-md text-text">{title}</h4>
        <p className="text-lg font-medium text-text mt-1">{price}</p>
      </div>
    </div>
  );
}
