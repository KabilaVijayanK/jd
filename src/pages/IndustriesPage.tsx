import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, FileCheck2, PencilRuler, Send } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductImage } from '../components/ProductImage';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import { INDUSTRIES_LIST } from '../data/companyData';

/* Industries v3: bento grid.
   - Light header with a status filter (All / Confirmed / Awaiting verification).
   - Photo tiles of mixed sizes, each with title, description, component links.
   - A three-step "how it works" strip, then the closing quote banner.
   Palette: teal #0E2A2D, teal-2 #14393D, brass #D9A441, mist #EEF2F1, ink #0B1A1C */

type Filter = 'all' | 'confirmed' | 'pending';

const SPANS = [
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-3',
];

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

  const ring =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF2F1]';
  const ringDark =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E2A2D]';

  return (
    <PageShell>
      <SeoHead
        title="Industries We Serve | Automotive & Engineering OEMs | J.D. Associates"
        description="J.D. Associates supplies precision shafts and machined components to two-wheeler, three-wheeler, E-Rickshaw, four-wheeler OEMs, switchgear, and general engineering sectors."
        canonicalPath="/industries/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#EEF2F1] pt-24 text-[#0B1A1C] lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-28">
          <Breadcrumbs items={breadcrumbs} />

          {/* HEADER */}
          <header className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6414]">
                OEM &amp; industrial sectors
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                Industries we serve
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#3D5255] sm:text-lg">
                From electric three-wheeler axle shafts to two- and four-wheeler drivetrain parts, our CNC and VMC
                capability supports OEM production lines.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter sectors by verification status"
              className="flex shrink-0 flex-wrap gap-2 rounded-full bg-white p-1.5 ring-1 ring-[#0B1A1C]/10"
            >
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${ring} ${
                      active ? 'bg-[#0E2A2D] text-white' : 'text-[#3D5255] hover:bg-[#EEF2F1]'
                    }`}
                  >
                    {f.label}
                    <span
                      className={`rounded-full px-1.5 text-xs tabular-nums ${
                        active ? 'bg-white/15 text-[#D9A441]' : 'bg-[#EEF2F1] text-[#64736F]'
                      }`}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </header>

          {/* BENTO GRID */}
          <section aria-label="Industry sectors" className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
            {visible.map((industry, idx) => {
              const primaryCategory = industry.componentCategories[0]?.categoryId || 'axle-shafts';
              const confirmed = industry.verificationStatus === 'confirmed';
              const span = filter === 'all' ? SPANS[idx % SPANS.length] : idx % 3 === 0 ? 'lg:col-span-3' : 'lg:col-span-3';

              return (
                <RevealBlock key={industry.id} delay={idx * 0.04} className={`${span}`}>
                  <article
                    id={industry.id}
                    aria-labelledby={`${industry.id}-title`}
                    className="group relative flex h-full min-h-[400px] scroll-mt-28 flex-col justify-end overflow-hidden rounded-2xl bg-[#0E2A2D] text-white"
                  >
                    {/* Photo */}
                    <div className="absolute inset-0">
                      <ProductImage
                        categoryId={primaryCategory}
                        slug={industry.id}
                        name={industry.title}
                        width={1200}
                        className="!aspect-auto h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1A1C] via-[#0E2A2D]/75 to-[#0E2A2D]/10"
                    />

                    {/* Top row */}
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
                      <span className="rounded-lg bg-[#0E2A2D]/90 px-2.5 py-1 font-display text-xs font-bold tabular-nums text-[#D9A441] backdrop-blur">
                        {industry.code}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          confirmed ? 'bg-white text-[#0E2A2D]' : 'bg-[#D9A441] text-[#0B1A1C]'
                        }`}
                      >
                        {confirmed ? (
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {industry.verificationLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative p-5 sm:p-7">
                      <h2
                        id={`${industry.id}-title`}
                        className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
                      >
                        {industry.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/75">
                        {industry.description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {industry.componentCategories.map((cat) => (
                          <li key={cat.label}>
                            <Link
                              to={`/products/?category=${cat.categoryId}`}
                              className={`inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur transition-colors hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#0B1A1C] ${ringDark}`}
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Link
                          to={`/products/?category=${primaryCategory}`}
                          className={`inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1A1C] transition-colors hover:bg-[#D9A441] ${ringDark}`}
                        >
                          Explore products
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                          to={`/contact-us/?product=${encodeURIComponent(industry.title + ' Components')}`}
                          className={`inline-flex items-center gap-1.5 rounded text-sm font-semibold text-white/90 hover:text-[#D9A441] ${ringDark}`}
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
          </section>

          {visible.length === 0 && (
            <p className="mt-6 rounded-2xl border border-dashed border-[#0B1A1C]/20 bg-white px-6 py-12 text-center text-sm text-[#64736F]">
              No sectors in this group yet.
            </p>
          )}

          {/* HOW IT WORKS */}
          <section aria-labelledby="how-heading" className="mt-16">
            <h2 id="how-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              From drawing to quote
            </h2>
            <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-[#0B1A1C]/10 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E2A2D] text-[#D9A441]">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl font-bold tabular-nums text-[#0B1A1C]/15">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#64736F]">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* CLOSING CTA */}
          <section className="mt-10 rounded-2xl bg-[#0E2A2D] p-8 text-white sm:p-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Precision components for your industry.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  Available in steel, stainless steel, brass, copper and aluminium, quoted from your 2D or 3D drawing.
                </p>
              </div>
              <Link
                to="/contact-us/"
                className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#D9A441] px-7 py-4 text-sm font-semibold text-[#0B1A1C] transition-colors hover:bg-white ${ringDark}`}
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