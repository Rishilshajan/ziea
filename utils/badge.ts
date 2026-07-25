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
const BADGE_PALETTE = [
  "#7A9268", // Sage Grove
  "#2C3829", // Deep Forest
  "#C4856A", // Terracotta
  "#7A7068", // Warm Mist
  "#865139", // Warm Brown
  "#817264", // Taupe
] as const;

// Semantic colours for the universal/known badges.
const KNOWN_BADGE_COLORS: Record<string, string> = {
  "bestseller": "#865139",       // Warm Brown
  "new": "#7A9268",              // Sage Grove
  "new arrival": "#7A9268",      // Sage Grove
  "50% off": "#C4856A",          // Terracotta (sale colour)
  "sale": "#C4856A",             // Terracotta
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
