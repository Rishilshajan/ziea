import { MdOutlineLocalShipping } from 'react-icons/md';
import DiscountPercent from '@/components/client/product/DiscountPercent';
import { deliveryByLabel } from '@/utils/price';

interface ProductInfoProps {
  title: string;
  price: string;
  original?: string;
  originalPrice?: number | null;
  discountedPrice?: number | null;
  description: string;
  deliveryDays?: number | null;
}

export default function ProductInfo({
  title,
  price,
  original,
  originalPrice,
  discountedPrice,
  description,
  deliveryDays,
}: ProductInfoProps) {
  const deliveryLabel = deliveryByLabel(deliveryDays);

  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div className="space-y-2">
        <h1 className="cormorant text-3xl md:text-4xl lg:text-[42px] leading-tight text-primary font-semibold">{title}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="font-jost text-xl md:text-2xl font-medium text-primary">{price}</p>
          {original && (
            <span className="font-jost text-base md:text-lg text-[#74796e] line-through">{original}</span>
          )}
          <DiscountPercent original={originalPrice} discounted={discountedPrice} />
          <span className="text-[11px] text-[#74796e] mt-1 uppercase tracking-wider">Inclusive of all taxes</span>
        </div>
        {deliveryLabel && (
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2C3829] pt-1">
            <MdOutlineLocalShipping className="text-[16px] text-[#2C3829]" />
            Deliverable by or before {deliveryLabel}
          </p>
        )}
      </div>

      {/* Description content (no heading) */}
      {description && (
        <div
          className="font-jost text-[15px] text-[#44483f] leading-relaxed rich-text-content pt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
