import { ScrollArea } from "../../ui/ScrollArea";
import Image from "next/image";

export default function CategoryPills() {
  const categories = [
    { image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&q=80", label: "Nightwear" },
    { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", label: "Loungewear" },
    { image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80", label: "Accessories" },
    { image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80", label: "Home" },
  ];

  return (
    <section className="pt-4 pb-8 md:pt-8 md:pb-16 px-margin-mobile">
      <h3 className="cormorant text-3xl text-primary-dark italic mb-8">Our Categories</h3>
      <ScrollArea className="gap-6 pb-2">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-muted/20 shrink-0 relative">
              <Image 
                src={cat.image} 
                alt={cat.label} 
                fill 
                className="object-cover"
                sizes="80px"
              />
            </div>
            <span className="font-label-sm text-text whitespace-nowrap">{cat.label}</span>
          </div>
        ))}
      </ScrollArea>
    </section>
  );
}
