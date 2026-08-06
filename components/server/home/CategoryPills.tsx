import Link from "next/link";
import SmartImage from "../../ui/SmartImage";
import { getCategories } from "@/utils/categories";

export default async function CategoryPills() {
  const categories = await getCategories();

  return (
    <section className="px-page">
      {/* Heading */}
      <h3 className="cormorant text-2xl md:text-3xl text-primary-dark mb-4 md:mb-6">
        Our Categories
      </h3>

      {categories.length > 0 ? (
        <>
          {/* Mobile: circular avatar row (horizontal scroll, Instagram-story style) */}
          <div className="md:hidden -mx-4 px-4 flex gap-5 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections?category=${category.id}`}
                className="group flex shrink-0 flex-col items-center gap-2.5 w-[108px]"
              >
                <div className="relative h-[104px] w-[104px] overflow-hidden rounded-full bg-muted/20 ring-1 ring-primary-dark/10 shadow-[0px_3px_14px_rgba(44,56,41,0.12)]">
                  <SmartImage
                    src={category.image_url}
                    alt={category.name}
                    cropX={category.cropX}
                    cropY={category.cropY}
                    zoom={category.zoom}
                    sizes="104px"
                  />
                </div>
                <span className="jost text-xs leading-tight text-center text-primary-dark line-clamp-2">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop: editorial 4:5 cards, 4-up */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections?category=${category.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/20 shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-in-out">
                    <SmartImage
                      src={category.image_url}
                      alt={category.name}
                      cropX={category.cropX}
                      cropY={category.cropY}
                      zoom={category.zoom}
                      sizes="25vw"
                    />
                  </div>
                  {/* Legibility gradient for the overlaid label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <h4 className="cormorant absolute inset-x-0 bottom-0 p-5 text-white text-2xl drop-shadow">
                    {category.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        /* Empty State (matches the storefront product empty state) */
        <div className="py-16 text-center">
          <p className="cormorant text-3xl text-primary">
            No categories yet
          </p>
          <p className="jost mt-2 text-sm md:text-base text-muted">
            Categories will appear here as soon as they’re added.
          </p>
        </div>
      )}
    </section>
  );
}
