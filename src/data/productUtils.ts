import { PRODUCT_CATEGORIES } from './companyData';

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export type Category = (typeof PRODUCT_CATEGORIES)[number];
export type CategoryItem = Category['items'][number];

export type FlatProduct = CategoryItem & {
  slug: string;
  category: Category;
};

export const ALL_PRODUCTS: FlatProduct[] = PRODUCT_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    slug: slugify(item.name),
    category,
  }))
);

export const productPath = (p: FlatProduct) => `/products/${p.category.id}/${p.slug}/`;

export const findProduct = (categoryId?: string, slug?: string) =>
  ALL_PRODUCTS.find((p) => p.category.id === categoryId && p.slug === slug);