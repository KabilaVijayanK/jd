// Put this file next to companyData.ts (src/data/productImages.ts)
//
// How to add an Unsplash photo:
//   1. Open the photo on unsplash.com, e.g. https://unsplash.com/photos/close-up-of-old-industrial-gears-and-machinery-3haIGP0Z2ME
//   2. Copy the ID at the end of the URL (here: 3haIGP0Z2ME)
//   3. Paste it below, per category or per product.

const unsplash = (photoId: string, width = 900) =>
  `https://unsplash.com/photos/${photoId}/download?force=true&w=${width}`;

// Used when a category or product has no photo of its own yet.
// (Gears and machinery in a workshop.)
const DEFAULT_PHOTO_ID = '3haIGP0Z2ME';

// One photo per category: key = category.id from companyData.ts
export const CATEGORY_PHOTO_IDS: Record<string, string> = {
  // 'ev-axle-shafts': 'PASTE_UNSPLASH_ID',
  // 'metal-shafts': 'PASTE_UNSPLASH_ID',
  // 'cardan-shafts': 'PASTE_UNSPLASH_ID',
  // 'custom-machined-parts': 'PASTE_UNSPLASH_ID',
};

// Optional: a photo for one specific product. Key = `${category.id}/${slug}`
export const PRODUCT_PHOTO_IDS: Record<string, string> = {
  // 'metal-shafts/spline-shaft': 'PASTE_UNSPLASH_ID',
};

export const getProductImage = (categoryId: string, slug: string, width = 900) => {
  const id = PRODUCT_PHOTO_IDS[`${categoryId}/${slug}`] ?? CATEGORY_PHOTO_IDS[categoryId] ?? DEFAULT_PHOTO_ID;
  return unsplash(id, width);
};