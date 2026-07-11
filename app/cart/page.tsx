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

const mockCartItems = [
  {
    id: "cart-1",
    title: "Ethereal Cotton Gown",
    variant: "Sage Grove / Silk Blend / Size: M",
    price: "₹2,499",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSY95RWH1Wo7H19PkacynKlYVolPOtOIyMq6LUl5JHAHt74v3OKePn2HzVtjEnd8ytxfA4LvkNaSBiAqWXt-jCF_0mux_z_ApCMjqdlc9uFeCBYyth0A_Hw7H8lb7GGvTsBh-vHns__TeuqJbk-9wkpPJ1BocwdWTIt3sDxRjZ7J5TIe4MItD46YM52GC8U0pqqUbvx4eUQEqXEwYIMVDKyebTqbvK82XvHxYbDfsBjGNSdnZE0R0SpdGXYjJ3l4ld3YH74X2_ZE4"
  }
];

export default function CartPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20 md:pt-24 pb-16 px-4 xl:px-8 w-full min-h-[80vh]">
        
        {/* Breadcrumbs */}
        <div className="mb-4 md:mb-6 mt-0">
          <nav className="inline-flex text-[13px] md:text-sm text-[#44483f]">
            <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#211a15]">Shopping Cart</span>
          </nav>
        </div>

        <section className="mb-4 md:mb-12 flex flex-col items-center text-center">
          <h2 className="cormorant text-4xl md:text-5xl lg:text-5xl text-primary mb-3">Shopping Cart</h2>
          <p className="font-jost text-[15px] md:text-lg text-on-surface-variant max-w-lg">Review your selected items before checkout.</p>
        </section>

        <ListManager 
          title="Cart"
          type="cart"
          icon={<MdOutlineShoppingBag />}
          emptyDescription="Your bag is looking a little empty. Discover our collections to add items."
          mockItems={mockCartItems}
        />
      </main>
      
      <Footer />
    </>
  );
}
