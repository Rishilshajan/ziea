import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/client/layout/Header';
import ProductGallery from '../../../components/client/product/ProductGallery';
import ProductActions from '../../../components/client/product/ProductActions';
import ProductInfo from '../../../components/server/product/ProductInfo';
import RelatedProducts from '../../../components/server/product/RelatedProducts';
import Footer from '../../../components/server/layout/Footer';
import { getProductByCode } from '@/utils/products';
import { resolvePrice } from '@/utils/price';
import { createClient } from '@/utils/supabase/server';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Strips HTML tags and collapses whitespace, then truncates to ~160 chars. */
function toMetaDescription(html: string | null): string {
  if (!html) return 'Discover premium ethnic wear at ZIEA.';
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductByCode(params.slug);

  if (!product) {
    return { title: 'ZIEA - Product Not Found' };
  }

  return {
    title: `ZIEA - ${product.name}`,
    description: toMetaDescription(product.description),
  };
}

export default async function ProductDetailPage(props: PageProps) {
  const params = await props.params;
  const product = await getProductByCode(params.slug);

  if (!product) notFound();

  const supabase = await createClient();

  // Category name for the breadcrumb.
  let categoryName = 'Collections';
  if (product.category_id) {
    const { data: category } = await supabase
      .from('categories')
      .select('name')
      .eq('id', product.category_id)
      .maybeSingle();
    if (category?.name) categoryName = category.name;
  }

  // Increment view count (best-effort; ignore errors).
  await supabase.rpc('increment_product_view_count', { p_id: product.id });

  const { price, original } = resolvePrice(product.original_price, product.discounted_price);

  return (
    <>
      <Header />

      <main className="pt-20 md:pt-28 pb-16 min-h-screen w-full px-4 xl:px-8 max-w-[1600px] mx-auto">

        {/* Breadcrumbs */}
        <div className="mb-6 md:mb-8 mt-0">
          <nav className="flex text-[13px] md:text-sm text-[#44483f]">
            <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-[#4c623d] transition-colors">{categoryName}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#211a15] truncate max-w-[150px] md:max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[1fr_1fr] xl:grid-cols-[5.5fr_4.5fr] gap-6 md:gap-10 lg:gap-16">

          {/* Left Column: Gallery (sticky on desktop while the right column scrolls) */}
          <div className="w-full md:sticky md:top-24 md:self-start">
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="w-full flex flex-col gap-6 pt-2 md:pt-0">
            <ProductInfo
              title={product.name}
              price={price}
              original={original ?? undefined}
              description={product.description ?? ''}
              material={product.material ?? undefined}
              careInstructions={product.care_instructions ?? undefined}
              shippingInfo={product.shipping_info ?? undefined}
              contents={product.contents ?? undefined}
              deliveryDays={product.delivery_days}
            />
            <ProductActions productId={product.id} sizes={product.sizes} />
          </div>

        </div>

        {/* Related Products Section (renders nothing — no border/gap — when empty) */}
        <RelatedProducts categoryId={product.category_id} excludeId={product.id} />

      </main>

      <Footer />
    </>
  );
}
