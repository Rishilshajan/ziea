import React from 'react';

interface ProductInfoProps {
  title: string;
  price: string;
  description: string;
}

export default function ProductInfo({ title, price, description }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="cormorant text-3xl md:text-4xl lg:text-[42px] leading-tight text-primary font-semibold">{title}</h1>
        <div className="flex items-center gap-3">
          <p className="font-jost text-xl md:text-2xl font-medium text-primary">{price}</p>
          <span className="text-[11px] text-[#74796e] mt-1 uppercase tracking-wider">Inclusive of all taxes</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <p className="font-jost text-[15px] text-[#44483f] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
