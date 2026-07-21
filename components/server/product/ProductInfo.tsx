import React from 'react';

interface ProductInfoProps {
  title: string;
  price: string;
  description: string;
  material?: string;
  careInstructions?: string;
  shippingInfo?: string;
  contents?: string;
}

export default function ProductInfo({
  title,
  price,
  description,
  material,
  careInstructions,
  shippingInfo,
  contents
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div className="space-y-2">
        <h1 className="cormorant text-3xl md:text-4xl lg:text-[42px] leading-tight text-primary font-semibold">{title}</h1>
        <div className="flex items-center gap-3">
          <p className="font-jost text-xl md:text-2xl font-medium text-primary">{price}</p>
          <span className="text-[11px] text-[#74796e] mt-1 uppercase tracking-wider">Inclusive of all taxes</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 pt-2">
        <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Description</h3>
        <div
          className="font-jost text-[15px] text-[#44483f] leading-relaxed rich-text-content"
          dangerouslySetInnerHTML={{ __html: description || '<p>No description available.</p>' }}
        />
      </div>

      {/* Material */}
      {material && (
        <div className="space-y-2">
          <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Material</h3>
          <p className="font-jost text-[15px] text-[#44483f] leading-relaxed">{material}</p>
        </div>
      )}

      {/* Care Instructions */}
      {careInstructions && (
        <div className="space-y-2">
          <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Care Instructions</h3>
          <div
            className="font-jost text-[15px] text-[#44483f] leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: careInstructions }}
          />
        </div>
      )}

      {/* Shipping & Returns */}
      {shippingInfo && (
        <div className="space-y-2">
          <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Shipping & Returns</h3>
          <div
            className="font-jost text-[15px] text-[#44483f] leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: shippingInfo }}
          />
        </div>
      )}

      {/* Contents */}
      {contents && (
        <div className="space-y-2">
          <h3 className="font-jost text-sm font-semibold text-[#2C3829] uppercase tracking-widest">Contents</h3>
          <div
            className="font-jost text-[15px] text-[#44483f] leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: contents }}
          />
        </div>
      )}
    </div>
  );
}