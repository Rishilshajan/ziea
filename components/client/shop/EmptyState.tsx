import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  icon: string;
  description: string;
}

export default function EmptyState({ title, icon, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-2 pb-8 md:py-12 text-center">
      <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-surface-container-low border-2 border-dashed border-primary/20">
        <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 0" }}>
          {icon}
        </span>
      </div>
      <h3 className="font-headline-md text-3xl text-on-surface mb-2">Your {title.toLowerCase()} is empty</h3>
      <p className="font-body-md text-on-surface-variant mb-8 max-w-sm">
        {description}
      </p>
      <Link href="/collections">
        <button className="bg-primary text-white px-10 py-3 rounded-full font-label-md hover:opacity-90 active:scale-[0.97] transition-all">
          Explore Shop
        </button>
      </Link>
    </div>
  );
}
