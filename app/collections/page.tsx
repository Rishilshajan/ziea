import { Metadata } from 'next';

import CategoryTabs from '../../components/client/collections/CategoryTabs';
import FiltersPanel from '../../components/client/collections/FiltersPanel';
import ProductGrid from '../../components/server/collections/ProductGrid';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import Link from 'next/link';
import { getFilteredProducts, getProductFacets, type ProductSort } from '@/utils/products';
import { getCategories } from '@/utils/categories';
import { getWishlistProductIds } from '@/app/actions/wishlist';

export const metadata: Metadata = {
  title: 'ZIEA - Collections',
  description: 'Experience the gentle embrace of Kerala\'s heritage. Our collections are crafted from the finest natural fibers, designed for moments of tranquility.',
};

interface CollectionsPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    onSale?: string;
    badges?: string;
    inStock?: string;
    sizes?: string;
    materials?: string;
    sort?: string;
  }>;
}

const SORT_VALUES: ProductSort[] = ["newest", "price_asc", "price_desc", "popular"];

/** Parse a CSV param into a trimmed, non-empty string array (undefined when empty). */
function parseCsv(value?: string): string[] | undefined {
  if (!value) return undefined;
  const arr = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return arr.length ? arr : undefined;
}

/** Parse a numeric param, ignoring NaN. */
function parseNum(value?: string): number | undefined {
  if (value == null || value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const params = await searchParams;
  const { category, page, q } = params;
  const pageNumber = page ? parseInt(page, 10) : undefined;

  const minPrice = parseNum(params.minPrice);
  const maxPrice = parseNum(params.maxPrice);
  const onSale = params.onSale === "1";
  const inStock = params.inStock === "1";
  const badges = parseCsv(params.badges);
  const sizes = parseCsv(params.sizes);
  const materials = parseCsv(params.materials);
  const sort = SORT_VALUES.includes(params.sort as ProductSort)
    ? (params.sort as ProductSort)
    : undefined;

  const normalizedPage = Number.isNaN(pageNumber) ? undefined : pageNumber;

  // Fetch everything the page needs concurrently instead of waterfalling
  // facets/categories → products → wishlist across nested components.
  const [facets, categories, productData, wishlistedIds] = await Promise.all([
    getProductFacets(),
    getCategories(),
    getFilteredProducts({
      category,
      page: normalizedPage,
      q,
      minPrice,
      maxPrice,
      onSale,
      inStock,
      badges,
      sizes,
      materials,
      sort,
    }),
    getWishlistProductIds(),
  ]);

  return (
    <>
      <Header />

      <main className="bg-background mt-16 md:mt-20 min-h-screen">
        <div className="w-full px-page pt-4 md:pt-6 pb-10 md:pb-14">

        {/* Breadcrumbs */}
        <div className="mb-6 md:mb-8">
          <nav className="flex text-[13px] md:text-sm text-[#44483f]">
            <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#211a15]">Collections</span>
          </nav>
        </div>
        
        {/* Page heading (shown on mobile + desktop) */}
        <h1 className="cormorant text-4xl md:text-6xl text-primary-dark mb-3 md:mb-4 text-center">Collections</h1>

        {/* Category tabs (centered) with the Filters trigger pinned to the right on
            desktop, and stacked full-width below the tabs on mobile. */}
        <div className="relative mb-6 md:mb-8">
          <CategoryTabs />
          <div className="mt-3 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
            <FiltersPanel categories={categories} facets={facets} />
          </div>
        </div>

        <ProductGrid
          items={productData.items}
          total={productData.total}
          wishlistedIds={wishlistedIds}
          category={category}
          page={normalizedPage}
          q={q}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSale={onSale}
          inStock={inStock}
          badges={badges}
          sizes={sizes}
          materials={materials}
          sort={sort}
        />

        </div>
      </main>
      
      <Footer />
    </>
  );
}
