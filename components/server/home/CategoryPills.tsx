"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea } from "../../ui/ScrollArea";

interface Category {
  id: string;
  name: string;
  image_url: string;
}

export default function CategoryPills() {
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, image_url")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data ?? []);
      }

      setLoading(false);
    };

    fetchCategories();
  }, [supabase]);

  return (
    <section>
      {/* Heading */}
      <div className="px-margin-mobile">
        <h3 className="cormorant text-3xl italic text-primary-dark mb-8">
          Our Categories
        </h3>
      </div>

      {/* Loading */}
      {loading ? (
        <ScrollArea className="gap-6 pl-5 pr-5 pb-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-28 shrink-0 flex flex-col items-center gap-3 animate-pulse"
            >
              <div className="h-28 w-28 rounded-full bg-muted/60" />
              <div className="h-4 w-20 rounded bg-muted/60" />
            </div>
          ))}
        </ScrollArea>
      ) : categories.length > 0 ? (
        /* Categories */
        <ScrollArea className="gap-6 pl-5 pr-5 pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-28 shrink-0 flex flex-col items-center gap-3"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-border bg-muted/20">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover"
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
        <div className="px-margin-mobile py-8 text-center">
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