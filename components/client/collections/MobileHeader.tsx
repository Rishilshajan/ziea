"use client";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { MdOutlineArrowBack, MdOutlineFavoriteBorder, MdOutlineShoppingBag } from 'react-icons/md';

export default function MobileHeader() {
  const router = useRouter();
  return (
    <header className="md:hidden sticky top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#fff8f5] shadow-sm">
      <button 
        aria-label="Go back" 
        onClick={() => router.back()}
        className="text-primary hover:opacity-80 scale-95 transition-transform duration-200"
      >
        <MdOutlineArrowBack />
      </button>
      <h1 className="font-headline-md text-[24px] text-primary">Collections</h1>
      <div className="flex gap-2">
        <button 
          aria-label="Wishlist" 
          onClick={() => router.push('/wishlist')}
          className="text-primary hover:opacity-80 scale-95 transition-transform duration-200"
        >
          <MdOutlineFavoriteBorder className="text-[22px]" />
        </button>
        <button 
          aria-label="Shopping Cart" 
          onClick={() => router.push('/cart')}
          className="text-primary hover:opacity-80 scale-95 transition-transform duration-200"
        >
          <MdOutlineShoppingBag className="text-[22px]" />
        </button>
      </div>
    </header>
  );
}
