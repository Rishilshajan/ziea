/**
 * Single source of truth for product badge background colours.
 *
 * Rule: the same badge text always maps to the same colour, everywhere it is
 * rendered (home, collections, product detail). Known/"universal" badges get a
 * semantic brand colour; any custom badge an admin creates is hashed
 * deterministically onto the brand palette so it stays consistent too.
 *
 * Colours are drawn from the ZIEA brand palette and chosen to be legible with
 * white text.
 */

// Brand-palette colours safe for white text (used for custom badges).
// Each is AA-legible (>=4.5:1) with white text even at the small badge sizes.
const BADGE_PALETTE = [
  "#546b45", // Sage Grove (AA-darkened)
  "#2C3829", // Deep Forest
  "#9e5c40", // Terracotta (AA-darkened)
  "#655d55", // Warm Mist (AA-darkened)
  "#865139", // Warm Brown
  "#6b5f52", // Taupe (AA-darkened)
] as const;

// Semantic colours for the universal/known badges.
const KNOWN_BADGE_COLORS: Record<string, string> = {
  "bestseller": "#865139",       // Warm Brown
  "new": "#546b45",              // Sage Grove (AA-darkened)
  "new arrival": "#546b45",      // Sage Grove (AA-darkened)
  "50% off": "#9e5c40",          // Terracotta (AA-darkened sale colour)
  "sale": "#9e5c40",             // Terracotta (AA-darkened)
  "limited edition": "#2C3829",  // Deep Forest
};

/**
 * Returns a consistent hex background colour for a given badge text.
 * Case/whitespace-insensitive so "Bestseller" and " bestseller " match.
 */
export function getBadgeColor(badge: string): string {
  const key = badge.trim().toLowerCase();
  if (!key) return BADGE_PALETTE[0];

  if (KNOWN_BADGE_COLORS[key]) return KNOWN_BADGE_COLORS[key];

  // Deterministic hash → palette index for custom badges.
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return BADGE_PALETTE[hash % BADGE_PALETTE.length];
}
