"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineLocalShipping, MdOutlineEco, MdOutlineVerifiedUser } from 'react-icons/md';
import type { ProductSize } from '@/types/product';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { addToCart } from '@/app/actions/cart';
import { notifyCountsChanged } from '@/utils/counts';

interface ProductActionsProps {
  productId: string;
  sizes: ProductSize[];
}

export default function ProductActions({ productId, sizes }: ProductActionsProps) {
  const router = useRouter();
  const availableSizes = sizes ?? [];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selected = availableSizes.find((s) => s.size === selectedSize) ?? null;
  const maxQty = selected ? Math.max(1, selected.quantity) : 1;

  const handleSelectSize = (size: ProductSize) => {
    if (size.quantity <= 0) return;
    // Toggle: tapping the selected size again clears it.
    setSelectedSize((prev) => (prev === size.size ? null : size.size));
    setQuantity(1);
  };

  // Gate: a size must be selected before adding to cart.
  const canAddToCart = selected !== null;

  const handleAddToCart = () => {
    if (!canAddToCart || !selectedSize) return;
    startTransition(async () => {
      const res = await addToCart(productId, selectedSize, quantity);
      if (res && 'error' in res && res.error === 'unauthenticated') {
        router.push('/login');
        return;
      }
      notifyCountsChanged();
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div className="space-y-4">
        <label className="font-label-md text-on-surface-variant block text-sm font-medium">Select Size</label>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {availableSizes.map((size) => {
            const isOutOfStock = size.quantity <= 0;
            const isSelected = selectedSize === size.size;
            return (
              <button
                key={size.size}
                type="button"
                onClick={() => handleSelectSize(size)}
                disabled={isOutOfStock}
                aria-pressed={isSelected}
                className={`flex-none min-w-[3.25rem] px-4 h-11 rounded-full font-jost text-sm font-medium transition-all duration-200 border ${
                  isOutOfStock
                    ? "border-[#d6c3b3]/50 text-[#2C3829]/40 opacity-50 cursor-not-allowed line-through"
                    : isSelected
                      ? "bg-[#2C3829] text-white border-[#2C3829] active:scale-95"
                      : "bg-white text-[#2C3829] border-[#d6c3b3] hover:border-[#2C3829]/50 active:scale-95"
                }`}
              >
                {size.size}
              </button>
            );
          })}
        </div>
        {selected && (
          <p className="text-sm font-semibold text-[#2C3829]">
            {selected.quantity} left in stock
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label className="font-label-md text-on-surface-variant block text-sm font-medium">Quantity</label>
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={maxQty}
        />
      </div>

      {/* Buttons */}
      <div className="pt-2 space-y-4">
        <Button
          type="button"
          variant="auth-primary"
          onClick={handleAddToCart}
          disabled={!canAddToCart || isPending}
          className={`${!canAddToCart ? "opacity-50 cursor-not-allowed" : ""} ${isAdded ? "!bg-primary" : ""}`}
        >
          {isAdded ? "Added!" : "Add to Cart"}
        </Button>
      </div>

      {/* Badges */}
      <div className="flex justify-between items-center py-4 border-b border-[#eee0d6]">
        <div className="flex flex-col items-center gap-1">
          <MdOutlineLocalShipping className="text-[#4c623d]" />
          <span className="text-[10px] text-[#74796e] uppercase tracking-wider">Free Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MdOutlineEco className="text-[#4c623d]" />
          <span className="text-[10px] text-[#74796e] uppercase tracking-wider">Eco-Friendly</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MdOutlineVerifiedUser className="text-[#4c623d]" />
          <span className="text-[10px] text-[#74796e] uppercase tracking-wider">Secure Pay</span>
        </div>
      </div>
    </div>
  );
}
