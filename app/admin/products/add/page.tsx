import React from 'react';
import Link from 'next/link';
import { MdArrowBack, MdMoreVert } from 'react-icons/md';
import AddProductForm from '@/components/client/admin/AddProductForm';

export default function AddProductPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopAppBar Navigation Shell (Admin Context) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:pl-76 md:pr-8 h-16 bg-surface/80 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products"
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all active:scale-95"
          >
            <MdArrowBack className="text-xl text-on-surface-variant" />
          </Link>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Add Product</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all">
            <MdMoreVert className="text-xl text-on-surface-variant" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-2xl mx-auto">
        
        {/* Desktop Header Variant */}
        <div className="hidden lg:flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/products"
              className="w-12 h-12 flex items-center justify-center bg-white shadow-sm hover:shadow-md rounded-full transition-all active:scale-95"
            >
              <MdArrowBack className="text-xl text-primary" />
            </Link>
            <h1 className="font-cormorant text-5xl text-primary font-bold italic">Add Product</h1>
          </div>
        </div>

        <AddProductForm />
      </main>
    </div>
  );
}
