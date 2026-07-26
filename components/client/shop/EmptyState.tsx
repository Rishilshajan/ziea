import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  /** Kept for API compatibility; no longer rendered. */
  icon?: React.ReactNode;
}

export default function EmptyState({ description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-4 md:pt-6 pb-12 md:pb-16 text-center">
      <p className="font-jost text-base md:text-lg text-muted mb-8 max-w-sm">
        {description}
      </p>
      <Link href="/collections" className="w-full max-w-xs sm:max-w-none sm:w-auto">
        <Button variant="auth-primary" className="!w-full sm:!w-auto px-10">
          Explore Shop
        </Button>
      </Link>
    </div>
  );
}
