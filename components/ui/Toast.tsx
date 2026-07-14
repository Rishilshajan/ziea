import React from 'react';
import { MdOutlineError, MdOutlineCheckCircle } from 'react-icons/md';

interface ToastProps {
  show: boolean;
  message: string;
  error?: boolean;
}

export default function Toast({ show, message, error = false }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-max max-w-[90vw] bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-full shadow-[0px_8px_24px_rgba(44,56,41,0.08)] z-[100] animate-in slide-in-from-top-4 fade-in duration-300 border border-black/5 flex items-center gap-2.5">
      {error ? (
        <MdOutlineError className="text-red-500 text-lg shrink-0" />
      ) : (
        <MdOutlineCheckCircle className="text-[#7A9268] text-lg shrink-0" />
      )}
      <span className="font-jost font-medium text-sm text-[#2C3829] tracking-wide text-balance text-left">{message}</span>
    </div>
  );
}
