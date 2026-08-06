import React from 'react';
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface AnalyticsPaginationProps {
  /** Route path, optionally with an existing query string,
   *  e.g. "/admin/analytics/views" or "/admin/enquiries?tab=read". */
  basePath: string;
  page: number;
  totalPages: number;
}

/**
 * Server-rendered Prev / Next pager for the analytics detail tables.
 * Renders nothing when there's only a single page.
 */
export function AnalyticsPagination({ basePath, page, totalPages }: AnalyticsPaginationProps) {
  if (totalPages <= 1) return null;

  // Preserve any existing query on basePath (e.g. ?tab=read) by choosing the
  // right separator for the page param.
  const sep = basePath.includes("?") ? "&" : "?";
  const hrefFor = (p: number) => (p <= 1 ? basePath : `${basePath}${sep}page=${p}`);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const arrowBase =
    'w-9 h-9 flex items-center justify-center rounded-full border border-[#d6c3b3]/40 transition-colors';
  const enabled = 'text-[#2C3829] bg-white hover:bg-[#FAF7F2] active:scale-95';
  const disabled = 'text-[#2C3829]/30 bg-[#FAF7F2] cursor-not-allowed pointer-events-none';

  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      {canPrev ? (
        <Link href={hrefFor(page - 1)} aria-label="Previous page" className={`${arrowBase} ${enabled}`}>
          <MdChevronLeft className="text-xl" />
        </Link>
      ) : (
        <span aria-hidden className={`${arrowBase} ${disabled}`}>
          <MdChevronLeft className="text-xl" />
        </span>
      )}

      <span className="font-jost text-sm text-[#2C3829]/70">
        Page {page} of {totalPages}
      </span>

      {canNext ? (
        <Link href={hrefFor(page + 1)} aria-label="Next page" className={`${arrowBase} ${enabled}`}>
          <MdChevronRight className="text-xl" />
        </Link>
      ) : (
        <span aria-hidden className={`${arrowBase} ${disabled}`}>
          <MdChevronRight className="text-xl" />
        </span>
      )}
    </div>
  );
}
