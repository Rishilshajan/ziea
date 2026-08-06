"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdClose, MdOutlineTune } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Popularity" },
];

interface FiltersPanelProps {
  categories: { id: string; name: string }[];
  facets: {
    badges: string[];
    materials: string[];
    minPrice: number;
    maxPrice: number;
  };
}

/** Parse a CSV URL param into a trimmed, non-empty string array. */
function parseCsv(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function FiltersPanel({ categories, facets }: FiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // Draft state (edits apply only on "Apply"); re-initialised each time the drawer opens.
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");

  // Count of active filters, read from the live URL (for the button badge).
  const activeCount = useMemo(() => {
    let n = 0;
    if (searchParams.get("category")) n++;
    if (searchParams.get("minPrice")) n++;
    if (searchParams.get("maxPrice")) n++;
    n += parseCsv(searchParams.get("sizes")).length;
    n += parseCsv(searchParams.get("badges")).length;
    return n;
  }, [searchParams]);

  // Initialise draft from the URL whenever the drawer opens.
  useEffect(() => {
    if (!isOpen) return;
    setCategory(searchParams.get("category") ?? "");
    setMinPrice(searchParams.get("minPrice") ?? "");
    setMaxPrice(searchParams.get("maxPrice") ?? "");
    setSizes(parseCsv(searchParams.get("sizes")));
    setBadges(parseCsv(searchParams.get("badges")));
    setSort(searchParams.get("sort") || "newest");
  }, [isOpen, searchParams]);

  const toggle = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  // Clamp a typed price into the catalog's real [minPrice, maxPrice] range.
  // Empty/non-numeric input clears the field. Returns a clean string.
  const clampPrice = (raw: string): string => {
    const t = raw.trim();
    if (t === "" || Number.isNaN(Number(t))) return "";
    const n = Math.round(Number(t));
    const clamped = Math.min(Math.max(n, facets.minPrice), facets.maxPrice);
    return String(clamped);
  };

  // On blur: clamp to bounds, then keep min ≤ max relative to the other field.
  const handleMinBlur = () => {
    let v = clampPrice(minPrice);
    if (v && maxPrice.trim() && !Number.isNaN(Number(maxPrice)) && Number(v) > Number(maxPrice)) {
      v = clampPrice(maxPrice);
    }
    setMinPrice(v);
  };

  const handleMaxBlur = () => {
    let v = clampPrice(maxPrice);
    if (v && minPrice.trim() && !Number.isNaN(Number(minPrice)) && Number(v) < Number(minPrice)) {
      v = clampPrice(minPrice);
    }
    setMaxPrice(v);
  };

  const pushParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams();
    // Preserve search term only.
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    mutate(params);
    // Always reset paging on any filter/sort change.
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/collections?${query}` : "/collections");
  };

  const handleApply = () => {
    // Clamp both to the catalog range, then ensure min ≤ max (swap if inverted).
    let min = clampPrice(minPrice);
    let max = clampPrice(maxPrice);
    if (min && max && Number(min) > Number(max)) {
      [min, max] = [max, min];
    }
    // Reflect the corrected values back into the inputs.
    setMinPrice(min);
    setMaxPrice(max);

    pushParams((params) => {
      if (category) params.set("category", category);
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
      if (sizes.length) params.set("sizes", sizes.join(","));
      if (badges.length) params.set("badges", badges.join(","));
      if (sort && sort !== "newest") params.set("sort", sort);
    });
    setIsOpen(false);
  };

  const handleClearAll = () => {
    // Reset everything (including sort) back to defaults.
    pushParams(() => {});
    setIsOpen(false);
  };

  const chipClass = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-[13px] font-medium transition-all active:scale-95 ${
      active
        ? "bg-[#4c623d] text-white"
        : "bg-[#eee0d6]/50 text-[#44483f] hover:bg-[#eee0d6]"
    }`;

  const sectionTitle = "font-cormorant text-2xl text-[#2C3829] mb-3";

  return (
    <>
      {/* Filters trigger — placement is controlled by the parent (see collections page):
          right-aligned inline with the category tabs on desktop, full-width on mobile. */}
      <div className="flex justify-center md:justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full justify-center md:w-auto md:justify-start items-center gap-2 rounded-full border border-[#d6c3b3] bg-white px-5 py-2.5 font-jost text-sm font-medium text-[#2C3829] transition-all hover:border-primary/50 active:scale-95 shadow-sm"
        >
          <MdOutlineTune className="text-lg" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#4c623d] px-1.5 text-[11px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Slide-over drawer — opens below the header (does not cover it) */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 md:top-20 z-[70] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#2C3829]/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full md:w-[450px] bg-[#FAF7F2] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d6c3b3]/30 bg-[#FAF7F2] shrink-0">
              <h2 className="font-cormorant text-3xl text-[#2C3829] font-bold">
                Filters
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#2C3829]/70 hover:text-[#2C3829] transition-colors p-2 rounded-full hover:bg-black/5"
                aria-label="Close filters"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {/* Body (scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Sort by */}
              <div>
                <h3 className={sectionTitle}>Sort by</h3>
                <Select
                  label=""
                  value={sort}
                  onChange={setSort}
                  options={SORT_OPTIONS}
                  placeholder="Sort by"
                />
              </div>

              {/* Category */}
              <div>
                <h3 className={sectionTitle}>Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer font-jost text-sm text-[#44483f]">
                    <input
                      type="radio"
                      name="category"
                      checked={category === ""}
                      onChange={() => setCategory("")}
                      className="accent-[#4c623d] w-4 h-4"
                    />
                    All
                  </label>
                  {categories.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-3 cursor-pointer font-jost text-sm text-[#44483f]"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={category === c.id}
                        onChange={() => setCategory(c.id)}
                        className="accent-[#4c623d] w-4 h-4"
                      />
                      {c.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className={sectionTitle}>Price range</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={facets.minPrice}
                    max={facets.maxPrice}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onBlur={handleMinBlur}
                    placeholder={`Min ${facets.minPrice}`}
                    className="w-full px-4 py-2.5 border border-[#d6c3b3] rounded-xl bg-white font-jost text-sm text-[#2C3829] outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-[#44483f]">&ndash;</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={facets.minPrice}
                    max={facets.maxPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onBlur={handleMaxBlur}
                    placeholder={`Max ${facets.maxPrice}`}
                    className="w-full px-4 py-2.5 border border-[#d6c3b3] rounded-xl bg-white font-jost text-sm text-[#2C3829] outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className={sectionTitle}>Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSizes((prev) => toggle(prev, s))}
                      className={chipClass(sizes.includes(s))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge */}
              {facets.badges.length > 0 && (
                <div>
                  <h3 className={sectionTitle}>Badge</h3>
                  <div className="flex flex-wrap gap-2">
                    {facets.badges.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBadges((prev) => toggle(prev, b))}
                        className={chipClass(badges.includes(b))}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#d6c3b3]/30 bg-[#FAF7F2] flex gap-3 shrink-0">
              <Button
                type="button"
                variant="auth-social"
                className="!w-auto flex-1 !py-3 text-sm !rounded-full"
                onClick={handleClearAll}
              >
                Clear all
              </Button>
              <Button
                type="button"
                variant="auth-primary"
                className="!w-auto flex-1 !py-3 text-sm !rounded-full"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
