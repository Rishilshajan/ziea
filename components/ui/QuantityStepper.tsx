"use client";

import React from "react";
import { MdRemove, MdAdd } from "react-icons/md";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

/** Reusable −/+ quantity control (cart, product actions, inventory). */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className = "",
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className={`inline-flex items-center rounded-full border border-border overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="px-3 py-2 text-primary-dark disabled:opacity-40 hover:bg-muted/10 transition-colors"
      >
        <MdRemove className="text-lg" />
      </button>
      <span className="px-4 min-w-[2.5rem] text-center font-jost text-sm text-text select-none">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="px-3 py-2 text-primary-dark disabled:opacity-40 hover:bg-muted/10 transition-colors"
      >
        <MdAdd className="text-lg" />
      </button>
    </div>
  );
}
