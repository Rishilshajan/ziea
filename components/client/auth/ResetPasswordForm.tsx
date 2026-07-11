"use client";

import React, { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', show: false, error: false });
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const showToast = (msg: string, isError = false) => {
    setToast({ message: msg, show: true, error: isError });
    setTimeout(() => setToast({ message: '', show: false, error: false }), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      showToast("Password has been reset successfully!");
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      showToast(err.message || "Failed to reset password", true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-[#FDFAF6] rounded-3xl p-6 md:p-10 shadow-[0px_4px_32px_rgba(44,56,41,0.06)] relative z-10 my-auto mx-auto flex flex-col">
      <header className="flex flex-col items-center justify-center mb-6 shrink-0">
        <Image
          src="/ZIEA_Splash2.png"
          alt="ZIEA Clothing — Everyday Comfort"
          width={220}
          height={85}
          className="h-16 w-auto object-contain -mb-1"
          priority
        />
        <h2 className="font-cormorant text-3xl text-primary-dark tracking-wide italic">Reset Password</h2>
        <p className="font-jost text-sm text-on-surface-variant mt-2 text-center">Create a new, strong password.</p>
      </header>

      <div className="relative">
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="New Password"
              placeholder="Create a new password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-on-surface-variant/50 hover:text-primary transition-colors flex items-center"
                >
                      {showPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
                </button>
              }
            />
            <Input
              label="Confirm Password"
              placeholder="Repeat your password"
              required
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-on-surface-variant/50 hover:text-primary transition-colors flex items-center"
                >
                      {showConfirmPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
                </button>
              }
            />
            <div>
              <Button variant="auth-primary" type="submit">
                Reset Password
              </Button>
            </div>
            <div className="text-center">
              <Link href="/login" className="font-jost text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </section>
      </div>

      <Toast show={toast.show} message={toast.message} error={toast.error} />
    </div>
  );
}
