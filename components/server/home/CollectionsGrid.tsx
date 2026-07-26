import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "../../client/product/ProductCard";
import type { Product } from "@/types/product";
import { getWishlistProductIds } from "@/app/actions/wishlist";

export default async function CollectionsGrid() {
  const supabase = await createClient();
  const wishlistedIds = await getWishlistProductIds();

  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      product_code,
      name,
      original_price,
      discounted_price,
      images,
      badges,
      delivery_days
    `)
    .eq("is_published", true)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Error fetching latest collections:", error);
  }

  return (
    <section className="px-page space-y-8 bg-background">
      {/* Heading */}
      <div className="flex justify-between items-end">
        <h3 className="cormorant text-3xl italic text-primary-dark">
          Latest Collections
        </h3>

        <Link
          href="/collections"
          className="font-label-sm text-secondary border-b border-secondary pb-1"
        >
          View All
        </Link>
      </div>

      {/* Empty State */}
      {!products || products.length === 0 ? (
        <div className="py-16 text-center border rounded-xl border-border bg-muted/10">
          <h4 className="font-semibold text-lg text-primary-dark">
            No products available
          </h4>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {(products as Product[]).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              productCode={product.product_code}
              title={product.name}
              originalPrice={product.original_price ?? 0}
              discountedPrice={
                product.discounted_price ??
                product.original_price ??
                0
              }
              imageUrl={
                product.images?.[0]?.url ??
                "/placeholder-product.jpg"
              }
              altText={product.name}
              badge={product.badges?.[0]}
              cropX={product.images?.[0]?.crop_x ?? 50}
              cropY={product.images?.[0]?.crop_y ?? 50}
              zoom={product.images?.[0]?.zoom ?? 100}
              initialWishlisted={wishlistedIds.includes(product.id)}
              deliveryDays={product.delivery_days}
            />
          ))}
        </div>
      )}
    </section>
  );
}