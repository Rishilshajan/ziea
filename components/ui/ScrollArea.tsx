import { ReactNode } from "react";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export function ScrollArea({
  children,
  className = "",
}: ScrollAreaProps) {
  return (
    <div
      className={`flex flex-nowrap overflow-x-auto overflow-y-hidden hide-scrollbar ${className}`}
    >
      {children}
    </div>
  );
}