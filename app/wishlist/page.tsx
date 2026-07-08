import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import ListManager from '../../components/client/shop/ListManager';

export const metadata: Metadata = {
  title: 'ZIEA | My Wishlist',
  description: 'A curated collection of your favorite everyday luxuries.',
};

const mockWishlistItems = [
  {
    id: "item-1",
    title: "Ethereal Cotton Gown",
    variant: "Sage Grove / Silk Blend",
    price: "₹2,499",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSY95RWH1Wo7H19PkacynKlYVolPOtOIyMq6LUl5JHAHt74v3OKePn2HzVtjEnd8ytxfA4LvkNaSBiAqWXt-jCF_0mux_z_ApCMjqdlc9uFeCBYyth0A_Hw7H8lb7GGvTsBh-vHns__TeuqJbk-9wkpPJ1BocwdWTIt3sDxRjZ7J5TIe4MItD46YM52GC8U0pqqUbvx4eUQEqXEwYIMVDKyebTqbvK82XvHxYbDfsBjGNSdnZE0R0SpdGXYjJ3l4ld3YH74X2_ZE4"
  },
  {
    id: "item-2",
    title: "Linen Lounge Set",
    variant: "Terracotta",
    price: "₹3,850",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiWW7alPv1JKYEjGmfG9faIyZcraUlI4RChzg4flNVGae8IiL2beKt7U1ChVyJ8kdIzc1H3wl_vUULwjW8JGcmhaRCglJDs4WQ2EK6pYrGr5sObXhub9GlYG5qWjETej-v06PhYcrGzv0jRMPZXV1iNJQqxQ0oEy095JHBKWgpX4Jam9rEig-E6t3sdtVHWZlr9El0nl2m_3wUI8kQ4aFlzz2uJ49bwzwwDfZF-lokWla_hfU38_DXVEJNv4JW9-wuEJl6mxrybI"
  },
  {
    id: "item-3",
    title: "Silk Sleep Mask",
    variant: "Jasmine White",
    price: "₹1,200",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkR5AdgZ6NTzOEWxFr4RAj9O2HNgch1XYkCJkSLTslb7E2TW-5550TuxZFZM3HD_kHjMYCw2fiAruDNW3sG8s0InUdHsqwRVkGnGpBcTLpI40YKdCprCzNTgzoGyO_61SOFVaD5jOZEVkDOL8nFf9Hj-ZC9ekhF2D7v797nZ4p3FpeDj8d8B5hAsgxmam3jUc95F2mUEmhJHZnJuN48gX0RvPlqnItABUNspBaTBlAwbhKHwjEHMM02hAZ_Cy5l-jq2PLJ6lq4KfA"
  }
];

export default function WishlistPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20 md:pt-24 pb-16 px-4 xl:px-8 w-full min-h-[80vh]">
        
        {/* Breadcrumbs */}
        <div className="mb-4 md:mb-6 mt-0">
          <nav className="inline-flex text-[13px] md:text-sm text-[#44483f]">
            <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#211a15]">Wishlist</span>
          </nav>
        </div>

        <section className="mb-4 md:mb-12 flex flex-col items-center text-center">
          <h2 className="cormorant text-4xl md:text-5xl lg:text-5xl text-primary mb-3">My Wishlist</h2>
          <p className="font-jost text-[15px] md:text-lg text-on-surface-variant max-w-lg">A curated collection of your favorite everyday luxuries.</p>
        </section>

        <ListManager 
          title="Wishlist"
          type="wishlist"
          icon="favorite"
          emptyDescription="Start exploring our collection to find your next favorite pieces."
          mockItems={mockWishlistItems}
        />
      </main>
      
      <Footer />
    </>
  );
}
