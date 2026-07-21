"use client";

import Link from "next/link";
import { useState } from "react";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import type { ProductCardProps } from "@/types/product";

export default function ProductCard({
  productCode,
  title,
  originalPrice,
  discountedPrice,
  imageUrl,
  altText,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link
      href={`/collections/${productCode}`}
      className="flex flex-col space-y-4 group"
    >
      {/* Product Image */}
      <div className="relative bg-surface rounded-xl overflow-hidden aspect-[4/5] shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
        <div
          className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
          title={altText ?? title}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          {isFavorite ? (
            <MdFavorite
              className="text-sm"
              style={{ color: "var(--color-secondary)" }}
            />
          ) : (
            <MdOutlineFavoriteBorder
              className="text-sm"
              style={{ color: "var(--color-muted)" }}
            />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="space-y-1">
        <h4 className="font-label-md text-text line-clamp-2">
          {title}
        </h4>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-semibold text-text">
            ₹ {discountedPrice.toLocaleString("en-IN")}
          </span>

          {originalPrice > discountedPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹ {originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}