import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Search, Tag, X } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductImage } from '../components/ProductImage';
import { PageShell } from '../components/MotionPrimitives';
import { PRODUCT_CATEGORIES } from '../data/companyData';
import { ALL_PRODUCTS, productPath } from '../data/productUtils';

/* Catalogue layout: category sidebar with counts, search + page size bar,
   card grid, pagination. Each card opens /products/:categoryId/:slug/ */

const PAGE_SIZES = [6, 9, 12, 24];

export function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const selectedCategory = params.get('category') || 'all';
  const query = params.get('q') || '';
  const perPage = PAGE_SIZES.includes(Number(params.get('per'))) ? Number(params.get('per')) : 9;
  const page = Math.max(1, Number(params.get('page')) || 1);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products/' },
  ];

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === null || value === '') next.delete(key);
      else next.set(key, value);
    });
    setParams(next);
  };

  const shortTitle = (id: string, title: string) =>
    id === 'custom-machined-parts' ? 'Custom parts & fixtures' : title;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category.id !== selectedCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q) ||
        p.category.title.toLowerCase().includes(q) ||
        p.category.code.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory);
  const heading = activeCategory ? activeCategory.title : 'All products';

  const sidebar = [
    { id: 'all', label: 'All products', code: '', count: ALL_PRODUCTS.length },
    ...PRODUCT_CATEGORIES.map((c) => ({
      id: c.id,
      label: shortTitle(c.id, c.title),
      code: c.code,
      count: c.items.length,
    })),
  ];

  const ring =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2F7FB]';

  return (
    <PageShell>
      <SeoHead
        title="Automotive Shafts and Machined Components | J.D. Associates"
        description="Explore J.D. Associates product catalogue: EV axle shafts, metal shafts, cardan shafts, connecting rods, cams, gears, jig fixtures, and receiving gauges."
        canonicalPath="/products/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#F2F7FB] pt-24 text-[#102A43] lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* SIDEBAR */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <h2 className="mb-3 hidden px-2 font-display text-lg font-bold lg:block">Categories</h2>
                <nav
                  aria-label="Product categories"
                  className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:max-h-[calc(100vh-9rem)] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-[#102A43]/10 lg:bg-white lg:p-2 lg:pb-2"
                >
                  {sidebar.map((item) => {
                    const active = selectedCategory === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => update({ category: item.id === 'all' ? null : item.id, page: null })}
                        aria-current={active ? 'true' : undefined}
                        className={`flex shrink-0 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors lg:w-full lg:border-transparent lg:py-3 ${ring} ${
                          active
                            ? 'border-[#075B91] bg-[#075B91] text-white shadow-md'
                            : 'border-[#102A43]/10 bg-white text-[#334E68] hover:bg-[#EEF5FA] hover:text-[#102A43] lg:bg-transparent'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                            active ? 'bg-white/15 text-[#E45532]' : 'bg-[#EEF5FA] text-[#B5472A]'
                          }`}
                        >
                          {item.code || <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />}
                        </span>
                        <span className={`flex-1 whitespace-nowrap lg:whitespace-normal ${active ? 'font-semibold' : 'font-medium'}`}>
                          {item.label}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                            active ? 'bg-white/15 text-white' : 'bg-[#EEF5FA] text-[#64748B]'
                          }`}
                        >
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* CONTENT */}
            <section className="lg:col-span-9" aria-label="Products">
              {/* Toolbar */}
              <div className="flex flex-col gap-4 border-b border-[#102A43]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h1>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {filtered.length} of {ALL_PRODUCTS.length} products
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => update({ q: e.target.value, page: null })}
                      placeholder="Search by name or type"
                      aria-label="Search products"
                      className={`h-11 w-full rounded-xl border border-[#102A43]/15 bg-white pl-10 pr-9 text-sm placeholder:text-[#64748B] ${ring}`}
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => update({ q: null, page: null })}
                        aria-label="Clear search"
                        className={`absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#64748B] hover:bg-[#EEF5FA] ${ring}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <label className="flex shrink-0 items-center gap-2 text-sm text-[#64748B]">
                    Show
                    <span className="relative">
                      <select
                        value={perPage}
                        onChange={(e) => update({ per: e.target.value === '9' ? null : e.target.value, page: null })}
                        className={`h-11 appearance-none rounded-xl border border-[#102A43]/15 bg-white pl-3.5 pr-9 text-sm font-semibold text-[#102A43] ${ring}`}
                      >
                        {PAGE_SIZES.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
                        aria-hidden="true"
                      />
                    </span>
                  </label>
                </div>
              </div>

              {/* Grid */}
              {pageItems.length > 0 ? (
                <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((product) => (
                    <li key={`${product.category.id}-${product.slug}`}>
                      <Link
                        to={productPath(product)}
                        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#102A43]/10 bg-white transition-all hover:-translate-y-1 hover:border-[#075B91]/40 hover:shadow-[0_16px_36px_-18px_rgba(7,91,145,0.4)] ${ring}`}
                      >
                        <div className="overflow-hidden border-b border-[#102A43]/10 bg-[#F2F7FB]">
                          <ProductImage
                            categoryId={product.category.id}
                            slug={product.slug}
                            name={product.name}
                            width={700}
                            className="transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-start gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF5FA] text-xs font-bold text-[#B5472A]">
                              {product.category.code}
                            </span>
                            <h3 className="font-display text-base font-bold leading-snug group-hover:text-[#064B79]">
                              {product.name}
                            </h3>
                          </div>
                          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                            {product.note}
                          </p>
                          <div className="mt-4 flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#102A43]/12 bg-[#F2F7FB] px-2.5 py-1 text-xs font-semibold text-[#334E68]">
                              <Tag className="h-3 w-3" aria-hidden="true" />
                              {product.category.code}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#075B91] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                              View details
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-[#102A43]/20 bg-white px-6 py-16 text-center">
                  <p className="font-display text-lg font-bold">No products match your search</p>
                  <p className="mt-1 text-sm text-[#64748B]">Try a different keyword or clear the filters.</p>
                  <button
                    type="button"
                    onClick={() => setParams({})}
                    className={`mt-5 rounded-lg bg-[#075B91] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#064B79] ${ring}`}
                  >
                    Reset filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => update({ page: currentPage - 1 === 1 ? null : String(currentPage - 1) })}
                    aria-label="Previous page"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#102A43]/15 bg-white disabled:opacity-40 ${ring}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update({ page: n === 1 ? null : String(n) })}
                      aria-current={n === currentPage ? 'page' : undefined}
                      className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold tabular-nums ${ring} ${
                        n === currentPage
                          ? 'border-[#075B91] bg-[#075B91] text-white'
                          : 'border-[#102A43]/15 bg-white text-[#334E68] hover:bg-[#EEF5FA]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => update({ page: String(currentPage + 1) })}
                    aria-label="Next page"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#102A43]/15 bg-white disabled:opacity-40 ${ring}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}

              {/* Not listed */}
              <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl bg-[#075B91] p-7 text-white sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-xl font-bold">Part not listed?</h2>
                  <p className="mt-1.5 max-w-md text-sm text-white/75">
                    Send us the drawing. If it can be turned or milled, we will quote it.
                  </p>
                </div>
                <Link
                  to="/contact-us/"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#E45532] px-6 py-3 text-sm font-semibold text-[#102A43] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Send your drawing
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  );
}