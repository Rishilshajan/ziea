"use client";

import { useEffect, useState } from "react";

/**
 * Rotating, on-brand loading messages shown while the storefront fetches
 * products (Myntra-style). A random line is chosen on mount and the set
 * gently cycles until the real content streams in.
 *
 * Client-only randomness: the server renders the first line deterministically,
 * then the client picks a random start on mount — no hydration mismatch.
 */
const QUOTES = [
  "Draping elegance, one weave at a time…",
  "Where tradition meets everyday grace.",
  "Curating pieces worth the wait.",
  "Slow fashion, timeless you.",
  "Handpicked for the woman who knows her worth.",
  "Bringing Kerala’s quiet luxury to you…",
  "Good things take a moment - yours is almost here.",
  "Threads of heritage, styled for today.",
  "Style that whispers, never shouts.",
  "Loading looks you’ll love…",
];

export default function LoadingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Random starting line on each visit.
    setIndex(Math.floor(Math.random() * QUOTES.length));
    // Gently cycle while the products load.
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-6 md:py-8">
      <p
        key={index}
        className="cormorant text-xl md:text-2xl text-primary animate-in fade-in duration-700"
      >
        {QUOTES[index]}
      </p>
      <span className="mt-3 h-[3px] w-16 rounded-full bg-primary/25 overflow-hidden">
        <span className="block h-full w-1/2 rounded-full bg-primary/60 animate-[loadingbar_2.6s_ease-in-out_infinite]" />
      </span>
    </div>
  );
}
