"use client";

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdOutlineDelete, MdOutlineLocalShipping } from 'react-icons/md';
import type { ListItem } from './ListManager';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { updateCartQty, removeCartItem, addToCart } from '@/app/actions/cart';
import { removeWishlistItem } from '@/app/actions/wishlist';
import { notifyCountsChanged } from '@/utils/counts';

interface PopulatedListProps {
  items: ListItem[];
  type: 'wishlist' | 'cart';
}

export default function PopulatedList({ items, type }: PopulatedListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Optimistic per-item quantity so the stepper feels instant before refresh.
  const [pendingQty, setPendingQty] = useState<Record<string, number>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  const run = (id: string, action: () => Promise<unknown>) => {
    setBusyId(id);
    startTransition(async () => {
      await action();
      notifyCountsChanged();
      router.refresh();
      setBusyId(null);
    });
  };

  const handleQtyChange = (item: ListItem, next: number) => {
    setPendingQty((prev) => ({ ...prev, [item.id]: next }));
    run(item.id, () => updateCartQty(item.id, next));
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 ${type === 'wishlist' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map((item) => {
        const qty = pendingQty[item.id] ?? item.quantity ?? 1;
        const rowBusy = busyId === item.id && isPending;
        return (
          <div key={item.id} className="flex flex-col group relative">
            <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-[0px_2px_16px_rgba(44,56,41,0.08)] aspect-[4/5] mb-4">
              <Link href={`/collections/${item.productCode}`} className="block absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              <button
                type="button"
                aria-label="Remove item"
                disabled={rowBusy}
                onClick={(e) => {
                  e.preventDefault();
                  run(
                    item.id,
                    () =>
                      type === 'cart'
                        ? removeCartItem(item.id)
                        : removeWishlistItem(item.productId),
                  );
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:bg-black/60 z-10 text-white disabled:opacity-50"
              >
                <MdOutlineDelete className="text-[18px]" />
              </button>
            </div>

            <div className="space-y-1.5 px-1">
              <Link href={`/collections/${item.productCode}`}>
                <h3 className="cormorant text-xl font-semibold text-on-surface leading-snug truncate hover:text-primary transition-colors">{item.title}</h3>
              </Link>
              {item.variant ? (
                <p className="font-jost text-[14px] text-on-surface-variant truncate">
                  {type === 'cart' ? `Size: ${item.variant}` : item.variant}
                </p>
              ) : null}
              <div className="flex justify-between items-center mt-1">
                <span className="font-jost font-bold text-lg text-[#6d8a57]">{item.price}</span>
                {type === 'cart' ? (
                  <QuantityStepper value={qty} onChange={(n) => handleQtyChange(item, n)} min={1} />
                ) : null}
              </div>
              <p className="text-[#72796c] text-[12px] mt-1.5 flex items-center gap-1">
                <MdOutlineLocalShipping className="text-[14px]" />
                Free delivery
              </p>

              {type === 'wishlist' ? (
                <button
                  type="button"
                  disabled={rowBusy}
                  onClick={(e) => {
                    e.preventDefault();
                    run(item.id, async () => {
                      await addToCart(item.productId, null, 1);
                      await removeWishlistItem(item.productId);
                    });
                  }}
                  className="w-full mt-3 text-white py-2.5 rounded-full font-label-md hover:opacity-90 active:scale-[0.97] transition-all shadow-sm bg-primary disabled:opacity-50"
                >
                  Move to Cart
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
