import { useState } from 'react';
import { ProductSchematicPlate } from './EngineeringPlates';
import { getProductImage } from '../data/productImages';

type ProductImageProps = {
  categoryId: string;
  slug: string;
  name: string;
  width?: number;
  eager?: boolean;
  className?: string;
};

export function ProductImage({ categoryId, slug, name, width = 900, eager = false, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  // If the photo can't load, fall back to the old schematic so the card is never empty.
  if (failed) return <ProductSchematicPlate categoryId={categoryId} />;

  return (
    <img
      src={getProductImage(categoryId, slug, width)}
      alt={name}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`aspect-[4/3] w-full object-cover ${className}`}
    />
  );
}