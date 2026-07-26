import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import ListManager from '../../components/client/shop/ListManager';
import { MdOutlineShoppingBag } from 'react-icons/md';

export const metadata: Metadata = {
  title: 'ZIEA | Shopping Cart',
  description: 'Review your selected items before checkout.',
};

export default function CartPage() {
  return (
    <>
      <Header />
      
      <main className="bg-background mt-16 md:mt-20">

        <div className="w-full px-page pt-4 md:pt-6 pb-10 md:pb-14">

          {/* Breadcrumb */}
          <nav className="flex items-center text-[13px] md:text-sm text-muted mb-6 md:mb-8">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span className="mx-2 text-muted/40">/</span>
            <span className="text-text">Shopping Cart</span>
          </nav>

          {/* Heading */}
          <div className="mx-auto mb-8 md:mb-10 max-w-3xl text-center">
            <h1 className="cormorant text-5xl md:text-6xl italic text-primary-dark">
              Shopping Cart
            </h1>
            <p className="mt-5 font-jost text-base md:text-lg leading-8 text-muted">
              Review your selected items before checkout.
            </p>
          </div>

          <ListManager
            title="Cart"
            type="cart"
            icon={<MdOutlineShoppingBag />}
            emptyDescription="Your bag is looking a little empty. Discover our collections to add items."
            items={[]}
          />

        </div>

      </main>
      
      <Footer />
    </>
  );
}
