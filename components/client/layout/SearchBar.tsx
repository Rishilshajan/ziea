"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { formatINR } from "@/utils/price";

interface Suggestion {
  product_code: string;
  name: string;
  price: number;
  image?: string;
}

/**
 * Search input with live product suggestions. Debounced client-side query
 * against published products (name match); Enter runs the full /collections
 * search, clicking a suggestion jumps straight to that product.
 */
export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Debounced suggestion fetch (min 2 chars).
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }
    const escaped = term.replace(/[%,]/g, "");
    const t = setTimeout(async () => {
      const { data } = await supabase
        .from("products")
        .select("product_code, name, discounted_price, original_price, images")
        .eq("is_published", true)
        .eq("status", "published")
        .ilike("name", `%${escaped}%`)
        .limit(6);
      setSuggestions(
        (data ?? []).map((p: any) => ({
          product_code: p.product_code,
          name: p.name,
          price: p.discounted_price ?? p.original_price ?? 0,
          image: p.images?.[0]?.url,
        })),
      );
      setOpen(true);
    }, 200);
    return () => clearTimeout(t);
  }, [q, supabase]);

  // Close on outside click.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setOpen(false);
    const term = q.trim();
    router.push(term ? `/collections?q=${encodeURIComponent(term)}` : "/collections");
  };

  return (
    <div ref={wrapRef} className={`relative z-10 ${className}`}>
      <form onSubmit={submit}>
        <div className="relative">
          <MdSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2C3829]/50 text-xl" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Search designs..."
            aria-label="Search designs"
            className="w-full pl-12 pr-4 py-3 border border-outline-variant rounded-xl bg-white font-jost text-base text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/50 transition-all"
          />
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {suggestions.map((s) => (
            <Link
              key={s.product_code}
              href={`/collections/${s.product_code}`}
              onClick={() => {
                setOpen(false);
                setQ("");
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-[#FAF7F2] transition-colors"
            >
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt="" className="w-9 h-11 object-cover rounded-md shrink-0 bg-muted/20" />
              ) : null}
              <span className="flex-1 min-w-0 truncate font-jost text-sm text-[#2C3829]">{s.name}</span>
              <span className="font-jost text-sm font-semibold text-[#4c623d] shrink-0">
                {formatINR(s.price)}
              </span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => submit()}
            className="w-full text-left px-3 py-2 text-xs font-jost text-[#2C3829]/70 hover:bg-[#FAF7F2] border-t border-[#d6c3b3]/30 transition-colors"
          >
            Search all results for &ldquo;{q.trim()}&rdquo; &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
