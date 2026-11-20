import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Factory, FileText, Info, Ruler } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductImage } from '../components/ProductImage';
import { PageShell } from '../components/MotionPrimitives';
import { ALL_PRODUCTS, findProduct, productPath } from '../data/productUtils';

/* Product detail view for /products/:categoryId/:slug/. */

export function ProductDetailPage() {
  const { categoryId, slug } = useParams();
  const product = findProduct(categoryId, slug);

  if (!product) return <Navigate to="/products/" replace />;

  const { category } = product;
  const related = ALL_PRODUCTS.filter((p) => p.category.id === category.id && p.slug !== product.slug).slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products/' },
    { name: category.title, path: `/products/?category=${category.id}` },
    { name: product.name, path: productPath(product) },
  ];

  const ring =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F7F6]';

  const quoteLink = `/contact-us/?product=${encodeURIComponent(`${product.name} (${category.title})`)}`;

  const specs = [
    { label: 'Category', value: category.title },
    { label: 'Sheet code', value: category.code },
    { label: 'Status', value: product.specStatus },
    { label: 'Tolerances', value: 'Per your drawing' },
    { label: 'Material certificates', value: 'On request' },
  ];

  return (
    <PageShell>
      <SeoHead
        title={`${product.name} | ${category.title} | J.D. Associates`}
        description={`${product.name}: ${product.note} Part of the ${category.title} range from J.D. Associates.`}
        canonicalPath={productPath(product)}
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#F4F7F6] pt-24 text-[#0B1A1C] lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <Link
            to={`/products/?category=${category.id}`}
            className={`mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[#3D5255] hover:text-[#0B1A1C] ${ring}`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to {category.title}
          </Link>

          {/* Top: visual + summary */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-[#0B1A1C]/10 bg-white">
                <ProductImage
                  categoryId={category.id}
                  slug={product.slug}
                  name={product.name}
                  width={1400}
                  eager
                  className="aspect-[4/3] lg:aspect-[16/11]"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#0E2A2D] px-3 py-1 text-xs font-bold text-[#D9A441]">
                  {category.code}
                </span>
                <span className="rounded-full border border-[#0B1A1C]/12 bg-white px-3 py-1 text-xs font-semibold text-[#3D5255]">
                  {category.title}
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#3D5255]">{product.note}</p>

              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#D9A441]/15 px-3.5 py-1.5 text-sm font-semibold text-[#8A6414]">
                <Ruler className="h-4 w-4" aria-hidden="true" />
                {product.specStatus}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={quoteLink}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E2A2D] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#14393D] ${ring}`}
                >
                  Request a quote
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact-us/"
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border border-[#0B1A1C]/20 bg-white px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#EEF2F1] ${ring}`}
                >
                  Send your drawing
                </Link>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-white p-4 text-sm leading-relaxed text-[#3D5255] ring-1 ring-[#0B1A1C]/10">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#8A6414]" aria-hidden="true" />
                <span>{category.drawingNote}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-6 lg:col-span-7">
              <section className="rounded-2xl border border-[#0B1A1C]/10 bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold">About this range</h2>
                <p className="mt-3 text-base leading-relaxed text-[#263445]">{category.fullDescription}</p>
                <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-[#F4F7F6] px-4 py-3 text-sm leading-relaxed text-[#3D5255]">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#8A6414]" aria-hidden="true" />
                  <span>{category.materialsNote}</span>
                </p>
              </section>

              <section className="rounded-2xl border border-[#0B1A1C]/10 bg-white p-6 sm:p-8">
                <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                  <Factory className="h-5 w-5 text-[#8A6414]" aria-hidden="true" />
                  Industries served
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.relevantIndustries.map((industry) => (
                    <li
                      key={industry}
                      className="rounded-full border border-[#0B1A1C]/12 bg-[#F4F7F6] px-3.5 py-1.5 text-sm font-medium text-[#3D5255]"
                    >
                      {industry}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="lg:col-span-5">
              <section className="overflow-hidden rounded-2xl border border-[#0B1A1C]/10 bg-white">
                <h2 className="border-b border-[#0B1A1C]/10 bg-[#0E2A2D] px-6 py-4 font-display text-lg font-bold text-white">
                  Specifications
                </h2>
                <dl>
                  {specs.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-6 border-b border-[#0B1A1C]/10 px-6 py-3.5 text-sm last:border-b-0"
                    >
                      <dt className="text-[#64736F]">{row.label}</dt>
                      <dd className="text-right font-semibold">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-14" aria-labelledby="related-heading">
              <div className="flex items-end justify-between">
                <h2 id="related-heading" className="font-display text-2xl font-bold">
                  More in {category.title}
                </h2>
                <Link
                  to={`/products/?category=${category.id}`}
                  className={`rounded text-sm font-semibold text-[#0E2A2D] hover:underline ${ring}`}
                >
                  View all
                </Link>
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={productPath(p)}
                      className={`group flex h-full flex-col rounded-2xl border border-[#0B1A1C]/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#0E2A2D]/40 hover:shadow-[0_16px_36px_-18px_rgba(14,42,45,0.4)] ${ring}`}
                    >
                      <span className="text-xs font-bold text-[#8A6414]">{p.category.code}</span>
                      <h3 className="mt-2 font-display text-base font-bold">{p.name}</h3>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-[#64736F]">{p.note}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0E2A2D]">
                        View details
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </PageShell>
  );
}