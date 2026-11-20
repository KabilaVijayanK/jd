import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Clock,
  Cpu,
  Layers,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { CountUpMetric } from '../components/CountUpMetric';
import { FaqAccordion } from '../components/FaqAccordion';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import {
  COMPANY_FACTS,
  COMPANY_HIGHLIGHTS,
  HOME_FAQS,
  INDUSTRIES_LIST,
  PRODUCT_CATEGORIES,
  WHY_CHOOSE_ITEMS,
} from '../data/companyData';

/* Palette: deep teal (cutting-fluid green) + brass, taken from the gold drill-bit photo.
   teal  #0E2A2D   teal-2 #14393D   brass #D9A441   mist #EEF2F1   ink #0B1A1C */

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const IMAGES = {
  hero: '1740209475472-aa7d280f7452',
  floor: '1787039467622-ddec5c24320c',
  cta: '1764114235916-74de69e6851f',
  productByKeyword: [
    ['axle', '1666634157070-6fd830fb5672'],
    ['cardan', '1735494033576-9c882e80504c'],
    ['connecting', '1769147339214-076740872485'],
    ['cam', '1666618090858-fbcee636bd3e'],
    ['metal shaft', '1713371398485-7bde1bde9def'],
    ['custom', '1713371398484-cc4e4f6a262a'],
  ] as [string, string][],
  productDefault: '1740209475472-aa7d280f7452',
  industries: [
    '1740209475472-aa7d280f7452',
    '1764114235891-66ff86abaf87',
    '1585201731775-0597e1be4bfb',
    '1764114235896-034c8772de01',
    '1787039467622-ddec5c24320c',
  ],
};

const productPhoto = (title: string) => {
  const t = title.toLowerCase();
  return IMAGES.productByKeyword.find(([k]) => t.includes(k))?.[1] ?? IMAGES.productDefault;
};

function Photo({
  id,
  alt = '',
  w = 1400,
  className = '',
  priority = false,
}: {
  id: string;
  alt?: string;
  w?: number;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`h-full w-full bg-[#14393D] ${className}`} />;
  return (
    <img
      src={unsplash(id, w)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/* Bento spans for a 4-column desktop grid with 6 products. Other counts use 1x1 tiles. */
const BENTO_6 = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  '',
  '',
  'lg:col-span-4',
];

const WHY_ICONS = [Clock, Cpu, Compass, Layers, Wrench, ShieldCheck];

export function HomePage() {
  const reduced = useReducedMotion();
  const bento = PRODUCT_CATEGORIES.length === 6;
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <PageShell>
      <SeoHead
        title="J.D. Associates | Precision Shafts & Machined Automotive Components"
        description="J.D. Associates manufactures precision axle shafts, metal shafts, cardan shafts, connecting rods, cams, gears, and custom CNC/VMC components for OEMs."
        canonicalPath="/"
        faqs={HOME_FAQS}
      />

      <main className="flex-1 bg-[#EEF2F1] text-[#0B1A1C]">
        {/* HERO: full-bleed photo, headline bottom-left, stats docked at the base */}
        <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0E2A2D]">
          <div className="absolute inset-0 -z-10">
            <Photo id={IMAGES.hero} alt="CNC machine cutting a metal part" w={2000} priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A2D] via-[#0E2A2D]/70 to-[#0E2A2D]/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A2D]/80 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-12 lg:pb-16">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-5 text-sm font-medium text-[#D9A441]">
                Faridabad, Haryana. Machining since 2000.
              </p>
              <h1 className="font-display text-[42px] sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-white">
                Shafts and machined parts that fit on the first try.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                Precision shafts and components for two-, three- and four-wheeler OEMs, machined on
                CNC and VMC centres to your drawing.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 rounded-md bg-[#D9A441] px-7 py-4 text-sm font-semibold text-[#0B1A1C] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E2A2D]"
                >
                  Request a quote
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/products/"
                  className="inline-flex items-center gap-2 rounded-md border border-white/35 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Browse products
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/15 bg-[#0E2A2D]/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
              {COMPANY_HIGHLIGHTS.map((item, i) => (
                <div
                  key={item.title}
                  className={`py-5 sm:py-6 pr-4 ${i > 0 ? 'lg:border-l lg:border-white/15 lg:pl-6' : ''} ${
                    i % 2 === 1 ? 'border-l border-white/15 pl-4 lg:pl-6' : ''
                  }`}
                >
                  <p className="font-display text-xl sm:text-2xl font-bold leading-tight text-white tabular-nums [&_*]:font-display [&_*]:font-bold">
                    {item.isNumeric ? (
                      <CountUpMetric
                        target={item.metric as number}
                        start={item.metric === 2000 ? 1985 : 10}
                        prefix={item.metricPrefix}
                      />
                    ) : (
                      <span>{item.metricLabel}</span>
                    )}
                  </p>
                  <h2 className="mt-1 text-sm font-medium text-[#D9A441]">{item.title}</h2>
                  <p className="mt-0.5 hidden sm:block text-xs text-white/65 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT: company introduction immediately follows the hero */}
        <section className="overflow-hidden bg-[#F7F8F5] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <RevealBlock className="lg:col-span-6">
                <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6414]">
                  <span className="h-px w-8 bg-[#D9A441]" aria-hidden="true" />
                  About J.D. Associates
                </p>
                <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Precision manufacturing, built on partnership.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#3D5255] sm:text-lg">
                  Since May 2000, J.D. Associates has made drawing-led shafts and machined
                  components for automotive and engineering teams. From our Faridabad facility, we
                  combine CNC and VMC machining with a practical, collaborative approach to every
                  specification.
                </p>
                <Link
                  to="/about-us/"
                  className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#0E2A2D] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#14393D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2"
                >
                  Get to know us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <dl className="mt-10 grid grid-cols-3 border-t border-[#0B1A1C]/15 pt-5">
                  <div className="pr-3">
                    <dt className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
                      2000
                    </dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#3D5255] sm:text-sm">
                      Established
                    </dd>
                  </div>
                  <div className="border-l border-[#0B1A1C]/15 px-3 sm:px-5">
                    <dt className="font-display text-2xl font-bold tabular-nums sm:text-3xl">5</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#3D5255] sm:text-sm">
                      Machinable metals
                    </dd>
                  </div>
                  <div className="border-l border-[#0B1A1C]/15 pl-3 sm:pl-5">
                    <dt className="font-display text-xl font-bold sm:text-2xl">CNC + VMC</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#3D5255] sm:text-sm">
                      Core capabilities
                    </dd>
                  </div>
                </dl>
              </RevealBlock>

              <RevealBlock delay={0.08} className="lg:col-span-6">
                <div className="relative mx-auto max-w-xl lg:ml-auto">
                  <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-[#D9A441]/50 sm:-right-6 sm:-top-6 sm:h-36 sm:w-36" />
                  <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-[#0E2A2D] shadow-2xl shadow-[#0E2A2D]/15">
                    <Photo
                      id={IMAGES.floor}
                      alt="CNC and VMC machines at the J.D. Associates manufacturing facility"
                      w={1600}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A2D]/90 via-transparent to-[#0E2A2D]/10" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D9A441]">
                        Faridabad, Haryana
                      </p>
                      <p className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                        From your drawing to a precision-made part.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 right-4 rounded-lg border border-[#E5E7E1] bg-white px-5 py-4 shadow-xl sm:right-8">
                    <p className="font-display text-2xl font-bold text-[#0E2A2D]">Since 2000</p>
                    <p className="mt-1 text-xs font-medium text-[#64736F]">Manufacturing in Faridabad</p>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* PRODUCTS: bento mosaic, one hero tile and one wide tile */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight">
                What we make
              </h2>
              <Link
                to="/products/"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#8A6414] transition-colors"
              >
                Open the full catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px] gap-4">
              {PRODUCT_CATEGORIES.map((category, i) => (
                <Link
                  key={category.id}
                  to={`/products/?category=${category.id}`}
                  className={`group relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-xl bg-[#0E2A2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 ${
                    bento ? BENTO_6[i] : ''
                  }`}
                >
                  <div className="absolute inset-0 -z-10">
                    <Photo
                      id={productPhoto(category.title)}
                      alt={category.title}
                      w={1200}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A2D] via-[#0E2A2D]/55 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3
                      className={`font-display font-bold text-white ${
                        bento && i === 0 ? 'text-3xl lg:text-4xl' : 'text-xl'
                      }`}
                    >
                      {category.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm text-white/75 leading-relaxed ${
                        bento && i === 0 ? 'max-w-md line-clamp-3' : 'line-clamp-2'
                      }`}
                    >
                      {category.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D9A441]">
                      View range
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES: photo with machine brands as a type-led list */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              <div className="lg:col-span-7 relative min-h-[340px] overflow-hidden rounded-xl bg-[#0E2A2D]">
                <div className="absolute inset-0">
                  <Photo id={IMAGES.floor} alt="CNC and VMC machines on the shop floor" w={1600} />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2A2D]/90 to-transparent p-6 pt-20">
                  <p className="text-sm text-white/80">
                    <span className="font-semibold text-[#D9A441]">Metals: </span>
                    {COMPANY_FACTS.materials.join(', ')}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">
                  CNC and VMC machining, run to your drawing
                </h2>
                <p className="mt-4 text-[#3D5255] leading-relaxed">
                  One floor in Faridabad handles shafts, gears, cams and custom parts, on machines
                  from established makers.
                </p>
                <dl className="mt-8 divide-y divide-[#0B1A1C]/12 border-y border-[#0B1A1C]/12">
                  {COMPANY_FACTS.machineryBrands.map((machine) => (
                    <div key={machine.brand} className="flex items-baseline gap-5 py-4">
                      <dt className="w-24 shrink-0 font-display text-2xl font-bold">{machine.brand}</dt>
                      <dd className="text-sm text-[#3D5255] leading-relaxed">{machine.role}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* WHY: dark band, heading on top, bento of six reasons (photo card and blue card) */}
        <section className="bg-[#0E2A2D] py-20 lg:py-28 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
                Why OEMs keep working with us
              </h2>
              <p className="max-w-sm leading-relaxed text-white/70">
                What you can expect when you send us a drawing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {WHY_CHOOSE_ITEMS.map((item, idx) => {
                const Icon = WHY_ICONS[idx % WHY_ICONS.length];
                const six = WHY_CHOOSE_ITEMS.length === 6;
                const photoCard = six && idx === 0;
                const blueCard = six && idx === 5;
                const wide = photoCard || blueCard;
                return (
                  <RevealBlock
                    key={item.title}
                    delay={idx * 0.04}
                    className={`group relative isolate flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl p-7 sm:p-8 ${
                      wide ? 'md:col-span-2' : ''
                    } ${
                      blueCard
                        ? 'bg-[#1F5FFF] text-white'
                        : 'bg-white/[0.05] ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.09]'
                    }`}
                  >
                    {photoCard && (
                      <div className="absolute inset-0 -z-10">
                        <Photo id={IMAGES.hero} w={1400} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A2D] via-[#0E2A2D]/70 to-[#1F5FFF]/25" />
                      </div>
                    )}

                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        blueCard ? 'bg-white/15' : 'bg-[#4C8DFF]/15'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${blueCard ? 'text-white' : 'text-[#6FA3FF]'}`}
                        aria-hidden="true"
                      />
                    </span>

                    <div className="mt-10">
                      <h3
                        className={`font-display font-bold leading-tight ${
                          wide ? 'text-2xl lg:text-3xl' : 'text-xl'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm leading-relaxed ${wide ? 'max-w-md' : ''} ${
                          blueCard ? 'text-white/85' : 'text-white/75'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </RevealBlock>
                );
              })}
            </div>
          </div>
        </section>

        {/* INDUSTRIES: one row of photo panels. The active panel opens to show details,
            the rest stay as slim photo strips. Hover, focus or tap a panel to open it.
            On phones the same panels stack and open downward. */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight">
                Industries we serve
              </h2>
              <Link
                to="/industries/"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#8A6414] transition-colors"
              >
                See all applications
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:h-[540px]">
              {INDUSTRIES_LIST.map((industry, i) => {
                const confirmed = industry.verificationStatus === 'confirmed';
                const active = i === activeIndustry;
                return (
                  <div
                    key={industry.id}
                    onMouseEnter={() => setActiveIndustry(i)}
                    onFocus={() => setActiveIndustry(i)}
                    onClick={() => setActiveIndustry(i)}
                    className={`group relative isolate overflow-hidden rounded-xl bg-[#0E2A2D] cursor-pointer transition-[flex-grow,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-w-[84px] ${
                      active ? 'h-[460px] lg:h-auto lg:grow-[6]' : 'h-24 lg:h-auto lg:grow-[1]'
                    } lg:basis-0`}
                  >
                    <div className="absolute inset-0 -z-10">
                      <Photo
                        id={IMAGES.industries[i % IMAGES.industries.length]}
                        w={1200}
                        className={`transition-transform duration-700 ${active ? 'scale-100' : 'scale-110'}`}
                      />
                      <div
                        className={`absolute inset-0 transition-colors duration-500 ${
                          active
                            ? 'bg-gradient-to-t from-[#0E2A2D] via-[#0E2A2D]/55 to-transparent'
                            : 'bg-[#0E2A2D]/65 group-hover:bg-[#0E2A2D]/50'
                        }`}
                      />
                    </div>

                    {/* Collapsed state: status icon and the title, set vertically on desktop */}
                    <div
                      className={`absolute inset-0 flex items-center gap-4 p-5 transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-between lg:p-5 ${
                        active ? 'pointer-events-none opacity-0' : 'opacity-100 delay-200'
                      }`}
                      aria-hidden={active}
                    >
                      {confirmed ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D9A441]" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
                      )}
                      <h3 className="font-display text-base font-bold text-white lg:text-lg lg:[writing-mode:vertical-rl] lg:rotate-180 lg:self-start">
                        {industry.title}
                      </h3>
                    </div>

                    {/* Open state: full details */}
                    <div
                      className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 transition-all duration-500 ${
                        active
                          ? 'translate-y-0 opacity-100 delay-150'
                          : 'pointer-events-none translate-y-3 opacity-0'
                      }`}
                    >
                      <div className="max-w-md">
                        <span
                          className={`mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            confirmed ? 'bg-[#D9A441] text-[#0B1A1C]' : 'bg-white/20 text-white'
                          }`}
                        >
                          {confirmed ? (
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {industry.verificationLabel}
                        </span>
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {industry.title}
                        </h3>
                        <p className="mt-3 text-sm text-white/80 leading-relaxed">{industry.description}</p>
                        <Link
                          to={`/industries/#${industry.id}`}
                          tabIndex={active ? 0 : -1}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D9A441] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E2A2D]"
                        >
                          View details
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    {/* Keyboard handle for collapsed panels */}
                    {!active && (
                      <button
                        type="button"
                        onClick={() => setActiveIndustry(i)}
                        aria-label={`Show ${industry.title}`}
                        className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D9A441]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ: heading and contact on the left, answers on the right */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
                  Questions buyers ask
                </h2>
                <p className="mt-3 text-[#3D5255] leading-relaxed">
                  Not here? Send us your drawing and we will answer directly.
                </p>
                <Link
                  to="/contact-us/"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-[#8A6414] transition-colors"
                >
                  Contact our team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={HOME_FAQS} />
            </div>
          </div>
        </section>

        {/* FINAL CTA: full-bleed photo */}
        <section className="relative isolate overflow-hidden bg-[#0E2A2D] py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <Photo id={IMAGES.cta} w={2000} />
            <div className="absolute inset-0 bg-[#0E2A2D]/80" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight text-white">
                Have a drawing? Get a quote.
              </h2>
              <p className="mt-4 text-white/75 leading-relaxed">
                Send the part drawing, material grade and yearly volume. Our Faridabad team will
                reply with a quote. Customer names appear on this site only with written
                permission.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 rounded-md bg-[#D9A441] px-7 py-4 text-sm font-semibold text-[#0B1A1C] transition-colors hover:bg-white"
              >
                Request a quote
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact-us/"
                className="inline-flex items-center rounded-md border border-white/35 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact our team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}