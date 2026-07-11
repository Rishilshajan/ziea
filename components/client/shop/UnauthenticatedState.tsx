import React from 'react';
import Link from 'next/link';
import { MdOutlineLock } from 'react-icons/md';

interface UnauthenticatedStateProps {
  title: string;
}

export default function UnauthenticatedState({ title }: UnauthenticatedStateProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-2 pb-8 md:py-12 text-center">
      <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-surface-container-low border-2 border-dashed border-primary/20">
        <MdOutlineLock className="text-primary text-6xl" />
      </div>
      <h3 className="font-headline-md text-3xl text-on-surface mb-2">{title}</h3>
      <p className="font-body-md text-on-surface-variant mb-8 max-w-sm">
        User is not signed in. Please log in or sign up to view and manage your {title.toLowerCase()}.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-primary text-white px-10 py-3 rounded-full font-label-md hover:opacity-90 active:scale-[0.97] transition-all">
          Login
        </button>
        <button className="bg-transparent text-primary border-2 border-primary px-10 py-3 rounded-full font-label-md hover:bg-primary/5 active:scale-[0.97] transition-all">
          Sign Up
        </button>
      </div>
    </div>
  );
}
