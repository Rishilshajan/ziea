import { Metadata } from 'next';

import CategoryTabs from '../../components/client/collections/CategoryTabs';
import ProductGrid from '../../components/server/collections/ProductGrid';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ZIEA - Collections',
  description: 'Experience the gentle embrace of Kerala\'s heritage. Our collections are crafted from the finest natural fibers, designed for moments of tranquility.',
};

export default function CollectionsPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20 md:pt-28 pb-8 min-h-screen w-full px-4 xl:px-8">
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-30"></div>
        
        {/* Breadcrumbs */}
        <div className="mb-4 mt-0">
          <nav className="flex text-[13px] md:text-sm text-[#44483f]">
            <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#211a15]">Collections</span>
          </nav>
        </div>
        
        {/* Large Desktop Heading (Hidden on Mobile) */}
        <h1 className="cormorant text-5xl text-primary mb-0 hidden md:block md:text-center">Collections</h1>

        <CategoryTabs />

        <div className="mb-6 md:mb-16 mt-2 md:mt-8 flex md:justify-center">
          <p className="text-[#44483f] text-sm md:text-lg max-w-2xl font-light leading-relaxed md:text-center">
            Experience the gentle embrace of Kerala's heritage. Our collections are crafted from the finest natural fibers, designed for moments of tranquility.
          </p>
        </div>

        <ProductGrid />

      </main>
      
      {/* Mobile Filter FAB */}
      <button aria-label="Filter Products" className="fixed bottom-6 right-6 w-14 h-14 bg-[#865139] text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-50 md:hidden">
        <span className="material-symbols-outlined">filter_list</span>
      </button>

      <Footer />
    </>
  );
}
