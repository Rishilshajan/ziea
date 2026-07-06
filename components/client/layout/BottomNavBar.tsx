"use client";

import Link from "next/link";

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-background/80 backdrop-blur-md rounded-t-xl shadow-[0px_-2px_16px_rgba(44,56,41,0.08)] border-t border-border">
      <Link href="#" className="flex flex-col items-center justify-center text-primary-dark font-bold scale-90 active:scale-95 transition-all">
        <span className="material-symbols-outlined filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        <span className="font-label-sm text-label-sm mt-1">Home</span>
      </Link>
      <Link href="#" className="flex flex-col items-center justify-center text-muted hover:text-secondary scale-90 active:scale-95 transition-all">
        <span className="material-symbols-outlined">storefront</span>
        <span className="font-label-sm text-label-sm mt-1">Shop</span>
      </Link>
      <Link href="#" className="flex flex-col items-center justify-center text-muted hover:text-secondary scale-90 active:scale-95 transition-all">
        <span className="material-symbols-outlined">favorite</span>
        <span className="font-label-sm text-label-sm mt-1">Wishlist</span>
      </Link>
      <Link href="#" className="flex flex-col items-center justify-center text-muted hover:text-secondary scale-90 active:scale-95 transition-all">
        <span className="material-symbols-outlined">shopping_cart</span>
        <span className="font-label-sm text-label-sm mt-1">Cart</span>
      </Link>
      <Link href="#" className="flex flex-col items-center justify-center text-muted hover:text-secondary scale-90 active:scale-95 transition-all">
        <span className="material-symbols-outlined">person</span>
        <span className="font-label-sm text-label-sm mt-1">Profile</span>
      </Link>
    </nav>
  );
}
