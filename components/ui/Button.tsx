import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "pill" | "icon" | "ghost";
  children: ReactNode;
  className?: string;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "transition-all active:scale-95 flex items-center justify-center";
  
  const variants = {
    primary: "bg-secondary text-background rounded-full px-8 py-3 font-label-md shadow-lg shadow-black/10",
    pill: "gap-3 bg-surface border border-border rounded-full px-6 py-3 whitespace-nowrap font-label-md text-primary-dark",
    icon: "scale-95 hover:opacity-80 duration-200 text-primary-dark",
    ghost: "text-primary font-semibold hover:gap-3 inline-flex items-center gap-2",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
