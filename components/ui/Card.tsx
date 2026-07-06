import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-[0px_2px_16px_rgba(44,56,41,0.08)] bg-white ${className}`}>
      {children}
    </div>
  );
}
