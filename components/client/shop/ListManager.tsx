"use client";

import React, { useState } from 'react';
import UnauthenticatedState from './UnauthenticatedState';
import EmptyState from './EmptyState';
import PopulatedList from './PopulatedList';

interface ListManagerProps {
  title: string;
  type: 'wishlist' | 'cart';
  icon: string;
  emptyDescription: string;
  mockItems: any[];
}

type ViewState = 'unauthenticated' | 'empty' | 'populated';

export default function ListManager({ title, type, icon, emptyDescription, mockItems }: ListManagerProps) {
  const [viewState, setViewState] = useState<ViewState>('populated');

  return (
    <div className="relative min-h-[50vh]">
      
      {/* Demo Controls (Only for development visualization) */}
      <div className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur shadow-lg border p-4 rounded-xl flex flex-col gap-2">
        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Demo Controls</p>
        <button 
          onClick={() => setViewState('unauthenticated')}
          className={`text-xs px-3 py-1.5 rounded border transition-colors ${viewState === 'unauthenticated' ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          Not Logged In
        </button>
        <button 
          onClick={() => setViewState('empty')}
          className={`text-xs px-3 py-1.5 rounded border transition-colors ${viewState === 'empty' ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          Logged In (Empty)
        </button>
        <button 
          onClick={() => setViewState('populated')}
          className={`text-xs px-3 py-1.5 rounded border transition-colors ${viewState === 'populated' ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          Logged In (With Items)
        </button>
      </div>

      {/* State Rendering */}
      {viewState === 'unauthenticated' && <UnauthenticatedState title={title} />}
      
      {viewState === 'empty' && (
        <EmptyState 
          title={title} 
          icon={icon}
          description={emptyDescription}
        />
      )}
      
      {viewState === 'populated' && (
        type === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 md:gap-10">
            <div className="w-full">
              <PopulatedList items={mockItems} type={type} />
            </div>
            
            <div className="w-full bg-[#fffcf9] p-6 rounded-xl shadow-[0px_2px_16px_rgba(44,56,41,0.06)] self-start h-fit">
              <h3 className="cormorant text-2xl mb-4 text-[#211a15]">Order Summary</h3>
              <div className="flex justify-between font-jost text-[#44483f] mb-3">
                <span>Subtotal</span>
                <span>₹2,499</span>
              </div>
              <div className="flex justify-between font-jost text-[#44483f] mb-4 pb-4 border-b border-[#e1e3de]">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-jost font-semibold text-lg mb-6 text-[#211a15]">
                <span>Total</span>
                <span className="text-[#6d8a57]">₹2,499</span>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-full font-label-md hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <PopulatedList items={mockItems} type={type} />
        )
      )}
    </div>
  );
}
