"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Toast from '@/components/ui/Toast';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [toast, setToast] = useState({ message: '', show: false, error: false });
  const [isLoading, setIsLoading] = useState(false);
  
  const supabase = createClient();

  const showToast = (msg: string, isError = false) => {
    setToast({ message: msg, show: true, error: isError });
    setTimeout(() => setToast({ message: '', show: false, error: false }), 4000);
  };

  const emailSchema = z.string().email("Please enter a valid email address");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const result = emailSchema.safeParse(e.target.value);
    if (!result.success && e.target.value.length > 0) setEmailError(result.error.issues[0].message);
    else setEmailError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || !email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) throw error;
      showToast("Password reset link sent to your email!");
    } catch (error: any) {
      showToast(error.message || "Failed to send reset link", true);
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
        <h2 className="font-cormorant text-3xl text-primary-dark tracking-wide italic">Forget Password</h2>
        <p className="font-jost text-sm text-on-surface-variant mt-2 text-center">Enter your email and we'll send you a reset link.</p>
      </header>

      <div className="relative">
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              placeholder="hello@example.com"
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            <div>
              <Button variant="auth-primary" type="submit">
                Send Reset Link
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
