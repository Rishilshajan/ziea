import Link from "next/link";
import SmartImage from "../../ui/SmartImage";
import { getCategories } from "@/utils/categories";

export default async function CategoryPills() {
  const categories = await getCategories();

  return (
    <section className="px-page">
      {/* Heading */}
      <h3 className="cormorant text-3xl md:text-4xl italic text-primary-dark mb-6 md:mb-8">
        Our Categories
      </h3>

      {categories.length > 0 ? (
        /* Editorial category cards: 2-up on mobile, 4-up on desktop */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                {/* Legibility gradient for the overlaid label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <h4 className="cormorant absolute inset-x-0 bottom-0 p-4 md:p-5 text-white italic text-xl md:text-2xl drop-shadow">
                  {category.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
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
