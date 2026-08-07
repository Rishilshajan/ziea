"use client";

import React, { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item that should be open on first render. */
  defaultOpen?: number;
  /**
   * Semantic heading level wrapping each accordion trigger. Defaults to h3.
   * Set to "h2" when the accordion sits directly under the page h1 so the
   * document heading order stays sequential (no skipped levels).
   */
  headingLevel?: "h2" | "h3" | "h4";
}

/** Collapsible sections with brand styling. Lives inside the product info column. */
export function Accordion({ items, defaultOpen, headingLevel = "h3" }: AccordionProps) {
  const Heading = headingLevel;
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ?? null,
  );

  return (
    <div className="border-t border-border">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `accordion-panel-${idx}`;
        const buttonId = `accordion-button-${idx}`;
        return (
          <div key={idx} className="border-b border-border">
            <Heading>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">
                  {item.title}
                </span>
                <MdOutlineExpandMore
                  aria-hidden="true"
                  className={`text-primary text-xl transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Heading>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-4 font-jost text-[15px] text-[#44483f] leading-relaxed"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
