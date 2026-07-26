import { SkeletonProductCard } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="pt-20 md:pt-28 pb-8 min-h-screen w-full px-page">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </section>
    </div>
  );
}
