"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { MdLogout } from 'react-icons/md';

interface LogoutButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggingOut(false);
    setIsModalOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsModalOpen(true)} 
        className={className}
      >
        {children}
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Logout"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        icon={<MdLogout />}
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isLoggingOut}
      />
    </>
  );
}
