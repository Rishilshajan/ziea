import React from 'react';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { Accordion } from '@/components/ui/Accordion';
import { deliveryByLabel } from '@/utils/price';

interface ProductInfoProps {
  title: string;
  price: string;
  original?: string;
  description: string;
  material?: string;
  careInstructions?: string;
  shippingInfo?: string;
  contents?: string;
  deliveryDays?: number | null;
}

export default function ProductInfo({
  title,
  price,
  original,
  description,
  material,
  careInstructions,
  shippingInfo,
  contents,
  deliveryDays,
}: ProductInfoProps) {
  const deliveryLabel = deliveryByLabel(deliveryDays);
  const accordionItems = [
    careInstructions && {
      title: 'Care Instructions',
      content: (
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: careInstructions }}
        />
      ),
    },
    shippingInfo && {
      title: 'Shipping & Returns',
      content: (
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: shippingInfo }}
        />
      ),
    },
    contents && {
      title: 'Contents',
      content: (
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: contents }}
        />
      ),
    },
  ].filter(Boolean) as { title: string; content: React.ReactNode }[];

  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div className="space-y-2">
        <h1 className="cormorant text-3xl md:text-4xl lg:text-[42px] leading-tight text-primary font-semibold">{title}</h1>
        <div className="flex items-center gap-3">
          <p className="font-jost text-xl md:text-2xl font-medium text-primary">{price}</p>
          {original && (
            <span className="font-jost text-base md:text-lg text-[#74796e] line-through">{original}</span>
          )}
          <span className="text-[11px] text-[#74796e] mt-1 uppercase tracking-wider">Inclusive of all taxes</span>
        </div>
        {deliveryLabel && (
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2C3829] pt-1">
            <MdOutlineLocalShipping className="text-[16px] text-[#2C3829]" />
            Deliverable by {deliveryLabel}
          </p>
        )}
      </div>

      {/* Description (rendered inline, open) */}
      <div className="space-y-2 pt-2">
        <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Description</h3>
        <div
          className="font-jost text-[15px] text-[#44483f] leading-relaxed rich-text-content"
          dangerouslySetInnerHTML={{ __html: description || '<p>No description available.</p>' }}
        />
      </div>

      {/* Material (plain line) */}
      {material && (
        <div className="space-y-2">
          <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Material</h3>
          <p className="font-jost text-[15px] text-[#44483f] leading-relaxed">{material}</p>
        </div>
      )}

      {/* Care Instructions, Shipping & Returns, Contents (collapsible) */}
      {accordionItems.length > 0 && <Accordion items={accordionItems} />}
    </div>
  );
}
