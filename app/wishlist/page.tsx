import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import ListManager from '../../components/client/shop/ListManager';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

export const metadata: Metadata = {
  title: 'ZIEA | My Wishlist',
  description: 'A curated collection of your favorite everyday luxuries.',
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      
      <main className="bg-background mt-16 md:mt-20">

        <div className="w-full px-page pt-4 md:pt-6 pb-10 md:pb-14">

          {/* Breadcrumb */}
          <nav className="flex items-center text-[13px] md:text-sm text-muted mb-6 md:mb-8">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span className="mx-2 text-muted/40">/</span>
            <span className="text-text">Wishlist</span>
          </nav>

          {/* Heading */}
          <div className="mx-auto mb-8 md:mb-10 max-w-3xl text-center">
            <h1 className="cormorant text-5xl md:text-6xl italic text-primary-dark">
              My Wishlist
            </h1>
            <p className="mt-5 font-jost text-base md:text-lg leading-8 text-muted">
              A curated collection of your favorite everyday luxuries.
            </p>
          </div>

          <ListManager
            title="Wishlist"
            type="wishlist"
            icon={<MdOutlineFavoriteBorder />}
            emptyDescription="Start exploring our collection to find your next favorite pieces."
            items={[]}
          />

        </div>

      </main>
      
      <Footer />
    </>
  );
}
