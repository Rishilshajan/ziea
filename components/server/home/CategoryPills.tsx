import SmartImage from "../../ui/SmartImage";
import { getCategories } from "@/utils/categories";
import { ScrollArea } from "../../ui/ScrollArea";

export default async function CategoryPills() {
  const categories = await getCategories();

  return (
    <section>
      {/* Heading */}
      <div className="px-page">
        <h3 className="cormorant text-3xl italic text-primary-dark mb-8">
          Our Categories
        </h3>
      </div>

      {categories.length > 0 ? (
        /* Categories */
        <ScrollArea className="gap-6 md:gap-12 px-page pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-28 shrink-0 flex flex-col items-center gap-3"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-border bg-muted/20">
                <SmartImage
                  src={category.image_url}
                  alt={category.name}
                  cropX={category.cropX}
                  cropY={category.cropY}
                  zoom={category.zoom}
                  sizes="112px"
                />
              </div>

              <span className="font-label-sm text-text whitespace-nowrap text-center">
                {category.name}
              </span>
            </div>
          ))}
        </ScrollArea>
      ) : (
        /* Empty State */
        <div className="px-page py-8 text-center">
          <div className="rounded-xl border border-border bg-muted/10 px-6 py-8">
            <p className="text-base font-medium text-primary-dark">
              No categories available
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
