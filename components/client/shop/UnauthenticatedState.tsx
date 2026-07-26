import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/Button';

interface UnauthenticatedStateProps {
  title: string;
}

export default function UnauthenticatedState({ title }: UnauthenticatedStateProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-4 md:pt-6 pb-12 md:pb-16 text-center">
      <p className="font-jost text-base md:text-lg text-muted mb-8 max-w-sm">
        You&apos;re not signed in. Please log in or sign up to view and manage your {title.toLowerCase()}.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
        <Link href="/login" className="w-full sm:w-auto">
          <Button variant="auth-primary" className="!w-full sm:!w-auto px-10">
            Login
          </Button>
        </Link>
        <Link href="/signup" className="w-full sm:w-auto">
          <Button
            variant="auth-primary"
            className="!w-full sm:!w-auto px-10 !bg-transparent !text-[#2C3829] border-2 border-[#2C3829] hover:!bg-[#2C3829]/5 hover:!opacity-100 !shadow-none"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
