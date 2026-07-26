"use client";

import React, { useEffect, useState } from 'react';
import UnauthenticatedState from './UnauthenticatedState';
import EmptyState from './EmptyState';
import PopulatedList from './PopulatedList';
import { createClient } from '@/utils/supabase/client';

interface ListItem {
  id: string;
  title: string;
  variant: string;
  price: string;
  image: string;
}

interface ListManagerProps {
  title: string;
  type: 'wishlist' | 'cart';
  icon: React.ReactNode;
  emptyDescription: string;
  /** Real list items for the signed-in user. Empty until the wishlist/cart DB is wired up. */
  items?: ListItem[];
}

export default function ListManager({ title, type, icon, emptyDescription, items = [] }: ListManagerProps) {
  const supabase = createClient();
  // null = still resolving the session
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setIsAuthed(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Resolving auth state
  if (isAuthed === null) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  // Not signed in
  if (!isAuthed) {
    return (
      <div className="relative min-h-[50vh]">
        <UnauthenticatedState title={title} />
      </div>
    );
  }

  // Signed in, but no items
  if (items.length === 0) {
    return (
      <div className="relative min-h-[50vh]">
        <EmptyState title={title} icon={icon} description={emptyDescription} />
      </div>
    );
  }

  // Signed in, with items
  const subtotal = items[0]?.price ?? '';

  return (
    <div className="relative min-h-[50vh]">
      {type === 'cart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 md:gap-10">
          <div className="w-full">
            <PopulatedList items={items} type={type} />
          </div>

          <div className="w-full bg-[#fffcf9] p-4 rounded-xl shadow-[0px_2px_16px_rgba(44,56,41,0.06)] self-start h-fit">
            <h3 className="cormorant text-2xl mb-4 text-[#211a15]">Order Summary</h3>
            <div className="flex justify-between font-jost text-[#44483f] mb-3">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between font-jost text-[#44483f] mb-4 pb-4 border-b border-[#e1e3de]">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-jost font-semibold text-lg mb-6 text-[#211a15]">
              <span>Total</span>
              <span className="text-[#6d8a57]">{subtotal}</span>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-full font-label-md hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <PopulatedList items={items} type={type} />
      )}
    </div>
  );
}
