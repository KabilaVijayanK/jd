import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, FileCheck2, PencilRuler, Send } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductImage } from '../components/ProductImage';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import { INDUSTRIES_LIST } from '../data/companyData';

/* Industries page, v3: editorial rows.
   - Light, open header: title on the left, intro on the right.
   - Underline tabs for the status filter.
   - Each sector is a full-width row (big photo + text) that alternates sides. No cards.
   - Slate process band, then a closing banner.
   Palette unchanged: #102A43, #334E68, #E45532, #1D5F83, #B5472A, #F5F7F9. */

type Filter = 'all' | 'confirmed' | 'pending';

const ringLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F7F9]';
const ringSlate =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 focus-visible:ring-offset-[#334E68]';
const ringNavy =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102A43]';

export function IndustriesPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries/' },
  ];

  const confirmedCount = INDUSTRIES_LIST.filter((i) => i.verificationStatus === 'confirmed').length;
  const pendingCount = INDUSTRIES_LIST.length - confirmedCount;

  const visible = useMemo(
    () =>
      INDUSTRIES_LIST.filter((i) => {
        if (filter === 'all') return true;
        const isConfirmed = i.verificationStatus === 'confirmed';
        return filter === 'confirmed' ? isConfirmed : !isConfirmed;
      }),
    [filter]
  );

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All sectors', count: INDUSTRIES_LIST.length },
    { id: 'confirmed', label: 'Confirmed OEM', count: confirmedCount },
    { id: 'pending', label: 'Awaiting verification', count: pendingCount },
  ];

  const steps = [
    { icon: Send, title: 'Send the drawing', text: 'Share a 2D or 3D drawing with material and quantity.' },
    { icon: PencilRuler, title: 'Feasibility review', text: 'We check the part against our CNC and VMC capability.' },
    { icon: FileCheck2, title: 'Get the quote', text: 'You receive a quote based on your drawing and tolerances.' },
  ];

  return (
    <PageShell>
      <SeoHead
        title="Industries We Serve | Automotive & Engineering OEMs | J.D. Associates"
        description="J.D. Associates supplies precision shafts and machined components to two-wheeler, three-wheeler, E-Rickshaw, four-wheeler OEMs, switchgear, and general engineering sectors."
        canonicalPath="/industries/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#F5F7F9] pt-24 text-[#102A43] lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-28">
          <Breadcrumbs items={breadcrumbs} />

          {/* HEADER */}
          <header className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <span aria-hidden="true" className="block h-1.5 w-16 rounded-full bg-[#E45532]" />
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
                Industries we serve
              </h1>
            </div>
            <p className="text-base leading-relaxed text-[#334E68] sm:text-lg lg:col-span-5">
              From electric three-wheeler axle shafts to two- and four-wheeler drivetrain parts, our CNC and VMC
              capability supports OEM production lines.
            </p>
          </header>

          {/* FILTER TABS */}
          <div
            role="group"
            aria-label="Filter sectors by verification status"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-[#102A43]/15"
          >
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative -mb-px inline-flex items-center gap-2 border-b-2 pb-3 pt-2 text-sm font-semibold transition-colors ${ringLight} ${
                    active
                      ? 'border-[#E45532] text-[#102A43]'
                      : 'border-transparent text-[#64748B] hover:text-[#102A43]'
                  }`}
                >
                  {f.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                      active ? 'bg-[#334E68] text-white' : 'bg-[#102A43]/8 text-[#64748B]'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SECTOR ROWS */}
          <section aria-label="Industry sectors">
            {visible.map((industry, idx) => {
              const primaryCategory = industry.componentCategories[0]?.categoryId || 'axle-shafts';
              const confirmed = industry.verificationStatus === 'confirmed';
              const flip = idx % 2 === 1;

              return (
                <RevealBlock key={industry.id} delay={0.03}>
                  <article
                    id={industry.id}
                    aria-labelledby={`${industry.id}-title`}
                    className="grid scroll-mt-28 grid-cols-1 items-center gap-8 border-b border-[#102A43]/10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16"
                  >
                    {/* Photo */}
                    <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#102A43] sm:aspect-[16/10]">
                        <ProductImage
                          categoryId={primaryCategory}
                          slug={industry.id}
                          name={industry.title}
                          width={1400}
                          className="!aspect-auto h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#102A43]/50 via-transparent to-transparent"
                        />
                        <span
                          className={`absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm ${
                            confirmed ? 'bg-white text-[#334E68]' : 'bg-[#E45532] text-[#102A43]'
                          }`}
                        >
                          {confirmed ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#1D5F83]" aria-hidden="true" />
                          ) : (
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {industry.verificationLabel}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                      <p className="font-display text-sm font-bold tabular-nums text-[#B5472A]">{industry.code}</p>
                      <h2
                        id={`${industry.id}-title`}
                        className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
                      >
                        {industry.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-[#334E68]">{industry.description}</p>

                      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                        {industry.componentCategories.map((cat) => (
                          <li key={cat.label}>
                            <Link
                              to={`/products/?category=${cat.categoryId}`}
                              className={`rounded text-[#1D5F83] underline decoration-[#1D5F83]/30 underline-offset-4 transition-colors hover:text-[#B5472A] hover:decoration-[#E45532] ${ringLight}`}
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                          to={`/products/?category=${primaryCategory}`}
                          className={`inline-flex items-center gap-2 rounded-full bg-[#102A43] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E45532] hover:text-[#102A43] ${ringLight}`}
                        >
                          Explore products
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                          to={`/contact-us/?product=${encodeURIComponent(industry.title + ' Components')}`}
                          className={`inline-flex items-center gap-1.5 rounded-full border border-[#102A43]/20 px-5 py-3 text-sm font-semibold text-[#102A43] transition-colors hover:border-[#E45532] hover:text-[#B5472A] ${ringLight}`}
                        >
                          Submit drawing
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </RevealBlock>
              );
            })}

            {visible.length === 0 && (
              <p className="mt-8 rounded-2xl border border-dashed border-[#102A43]/20 bg-white px-6 py-12 text-center text-sm text-[#64748B]">
                No sectors in this group yet. Switch to “All sectors” to see every industry.
              </p>
            )}
          </section>

          {/* PROCESS BAND */}
          <section
            aria-labelledby="how-heading"
            className="mt-16 overflow-hidden rounded-3xl bg-[#334E68] px-6 py-12 text-white sm:px-12"
          >
            <h2 id="how-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              From drawing to quote
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold leading-none tabular-nums text-[#E45532]">
                      {i + 1}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-white/25" />
                    <step.icon className="h-6 w-6 text-white/80" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* CLOSING CTA */}
          <section className="mt-6 grid grid-cols-1 overflow-hidden rounded-3xl bg-[#1D5F83] text-white lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-8">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Precision components for your industry.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
                Available in steel, stainless steel, brass, copper and aluminium, quoted from your 2D or 3D drawing.
              </p>
            </div>
            <div className="flex items-center bg-[#102A43] p-8 sm:p-12 lg:col-span-4 lg:justify-center">
              <Link
                to="/contact-us/"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E45532] px-7 py-4 text-sm font-semibold text-[#102A43] transition-colors hover:bg-white ${ringNavy}`}
              >
                Request manufacturing quote
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}