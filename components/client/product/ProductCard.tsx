"use client";

import Link from "next/link";
import { useState } from "react";
import { MdFavorite, MdOutlineFavoriteBorder, MdOutlineShoppingBag } from "react-icons/md";
import type { ProductCardProps } from "@/types/product";
import { getBadgeColor } from "@/utils/badge";
import { Button } from "../../ui/Button";

// Standard vivid red for the "liked" wishlist state (common e-commerce heart red).
const WISHLIST_RED = "#E63946";

export default function ProductCard({
  productCode,
  title,
  originalPrice,
  discountedPrice,
  imageUrl,
  altText,
  badge,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Visual-only for now — cart persistence (DB) comes later.
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

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

        {/* Admin-set badge */}
        {badge && (
          <>
            {/* Mobile: diagonal corner ribbon across the top-left corner */}
            <div className="md:hidden absolute top-0 left-0 h-20 w-20 overflow-hidden z-10 pointer-events-none">
              <span
                className="jost absolute top-[16px] -left-[26px] w-[120px] -rotate-45 py-1 text-center text-[9px] font-semibold uppercase tracking-wide text-white shadow-md"
                style={{ backgroundColor: getBadgeColor(badge) }}
              >
                {badge}
              </span>
            </div>

            {/* Desktop: flat pill (top-left) */}
            <span
              className="jost hidden md:block absolute top-3 left-3 text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-sm z-10"
              style={{ backgroundColor: getBadgeColor(badge) }}
            >
              {badge}
            </span>
          </>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          {isFavorite ? (
            <MdFavorite className="text-2xl" style={{ color: WISHLIST_RED }} />
          ) : (
            <MdOutlineFavoriteBorder
              className="text-2xl"
              style={{ color: "var(--color-primary-dark)" }}
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

        {/* Add to Cart (visual only for now) — same deep-forest style as the Hero "Shop Now" button */}
        <Button
          type="button"
          variant="auth-primary"
          onClick={handleAddToCart}
          className={`gap-2 mt-3 !py-3 !text-base ${isAdded ? "!bg-primary" : ""}`}
        >
          {isAdded ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </Link>
  );
}
