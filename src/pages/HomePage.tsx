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
import { ProductImage } from '../components/ProductImage';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import {
  COMPANY_FACTS,
  COMPANY_HIGHLIGHTS,
  HOME_FAQS,
  INDUSTRIES_LIST,
  PRODUCT_CATEGORIES,
  WHY_CHOOSE_ITEMS,
} from '../data/companyData';

/* Palette: logo-inspired blue and orange.
   blue  #075B91   blue-2 #064B79   orange #E45532   mist #EEF5FA   ink #102A43 */

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const IMAGES = {
  hero: '1740209475472-aa7d280f7452',
  floor: '1787039467622-ddec5c24320c',
  industries: [
    '1740209475472-aa7d280f7452',
    '1764114235891-66ff86abaf87',
    '1585201731775-0597e1be4bfb',
    '1764114235896-034c8772de01',
    '1787039467622-ddec5c24320c',
  ],
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
  if (failed) return <div className={`h-full w-full bg-[#064B79] ${className}`} />;
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

      <main className="flex-1 bg-[#EEF5FA] text-[#102A43]">
        {/* HERO: full-bleed photo, headline bottom-left, stats docked at the base */}
        <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#1F2937]">
          <div className="absolute inset-0 -z-10">
            <Photo id={IMAGES.hero} alt="CNC machine cutting a metal part" w={2000} priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/65 to-[#1F2937]/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/70 via-[#1F2937]/10 to-transparent" />
          </div>

          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-12 lg:pb-16">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-5 text-sm font-medium text-[#E45532]">
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
                  className="inline-flex items-center gap-2 rounded-md bg-[#E45532] px-7 py-4 text-sm font-semibold text-[#102A43] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]"
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

          <div className="border-t border-white/15 bg-[#1F2937]/85 backdrop-blur-md">
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
                  <h2 className="mt-1 text-sm font-medium text-[#E45532]">{item.title}</h2>
                  <p className="mt-0.5 hidden sm:block text-xs text-white/65 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT: company introduction immediately follows the hero */}
        <section className="overflow-hidden bg-[#F5F8FC] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <RevealBlock className="lg:col-span-6">
                <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#B5472A]">
                  <span className="h-px w-8 bg-[#E45532]" aria-hidden="true" />
                  About J.D. Associates
                </p>
                <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Precision manufacturing, built on partnership.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#334E68] sm:text-lg">
                  Since May 2000, J.D. Associates has made drawing-led shafts and machined
                  components for automotive and engineering teams. From our Faridabad facility, we
                  combine CNC and VMC machining with a practical, collaborative approach to every
                  specification.
                </p>
                <Link
                  to="/about-us/"
                  className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#075B91] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#064B79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2"
                >
                  Get to know us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <dl className="mt-10 grid grid-cols-3 border-t border-[#102A43]/15 pt-5">
                  <div className="pr-3">
                    <dt className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
                      2000
                    </dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#334E68] sm:text-sm">
                      Established
                    </dd>
                  </div>
                  <div className="border-l border-[#102A43]/15 px-3 sm:px-5">
                    <dt className="font-display text-2xl font-bold tabular-nums sm:text-3xl">5</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#334E68] sm:text-sm">
                      Machinable metals
                    </dd>
                  </div>
                  <div className="border-l border-[#102A43]/15 pl-3 sm:pl-5">
                    <dt className="font-display text-xl font-bold sm:text-2xl">CNC + VMC</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#334E68] sm:text-sm">
                      Core capabilities
                    </dd>
                  </div>
                </dl>
              </RevealBlock>

              <RevealBlock delay={0.08} className="lg:col-span-6">
                <div className="relative mx-auto max-w-xl lg:ml-auto">
                  <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-[#E45532]/50 sm:-right-6 sm:-top-6 sm:h-36 sm:w-36" />
                  <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-[#075B91] shadow-2xl shadow-[#075B91]/15">
                    <Photo
                      id={IMAGES.floor}
                      alt="CNC and VMC machines at the J.D. Associates manufacturing facility"
                      w={1600}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#075B91]/90 via-transparent to-[#075B91]/10" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E45532]">
                        Faridabad, Haryana
                      </p>
                      <p className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                        From your drawing to a precision-made part.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 right-4 rounded-lg border border-[#E2E8F0] bg-white px-5 py-4 shadow-xl sm:right-8">
                    <p className="font-display text-2xl font-bold text-[#075B91]">Since 2000</p>
                    <p className="mt-1 text-xs font-medium text-[#64748B]">Manufacturing in Faridabad</p>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* PRODUCTS: bento mosaic, one hero tile and one wide tile */}
        <section className="pb-8 pt-20 lg:pb-10 lg:pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight">
                What we make
              </h2>
              <Link
                to="/products/"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#B5472A] transition-colors"
              >
                Open the full catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-4">
              {PRODUCT_CATEGORIES.map((category, i) => (
                <Link
                  key={category.id}
                  to={`/products/?category=${category.id}`}
                  className={`group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl bg-[#102A43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 lg:min-h-0 ${
                    bento ? BENTO_6[i] : ''
                  }`}
                >
                  <div className="absolute inset-0 -z-10">
                    <ProductImage
                      categoryId={category.id}
                      slug={category.slug}
                      name={category.image.alt}
                      width={1200}
                      className="!aspect-auto h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/45 to-[#102A43]/10" />
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
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#E45532]">
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

        {/* CAPABILITIES: manufacturing-floor photo and equipment overview */}
        <section className="bg-[#F5F7F9] pb-20 pt-8 lg:pb-28 lg:pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-[#102A43] shadow-sm lg:col-span-7 lg:min-h-[520px]">
                <div className="absolute inset-0">
                  <Photo
                    id={IMAGES.floor}
                    alt="CNC and VMC machines on the shop floor"
                    w={1600}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-[#102A43]/10 to-transparent" />
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#102A43] shadow-sm sm:left-8 sm:top-8">
                  <span className="h-2 w-2 rounded-full bg-[#E45532]" aria-hidden="true" />
                  Manufacturing floor
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                    Materials we machine
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {COMPANY_FACTS.materials.map((material) => (
                      <li
                        key={material}
                        className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 lg:p-10">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#B5472A]">
                  <span className="h-px w-7 bg-[#E45532]" aria-hidden="true" />
                  Precision equipment
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                  CNC and VMC machining, run to your drawing
                </h2>
                <p className="mt-4 leading-relaxed text-[#334E68]">
                  One Faridabad facility brings shafts, gears, cams and custom parts together with
                  dependable CNC and VMC equipment.
                </p>

                <dl className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {COMPANY_FACTS.machineryBrands.map((machine) => (
                    <div key={machine.brand} className="rounded-xl bg-[#F5F7F9] p-4 ring-1 ring-[#102A43]/5">
                      <dt className="font-display text-lg font-bold text-[#075B91]">{machine.brand}</dt>
                      <dd className="mt-1.5 text-xs leading-relaxed text-[#475569]">{machine.role}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* WHY: dark band, heading on top, bento of six reasons (photo card and blue card) */}
        <section className="bg-[#1D5F83] py-20 lg:py-28 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
                Why OEMs keep working with us
              </h2>
              <p className="max-w-sm leading-relaxed text-white/70">
                What you can expect when you send us a drawing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
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
                    className={`group relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl p-7 sm:p-8 ${
                      wide ? 'md:col-span-2' : ''
                    } ${
                      blueCard
                        ? 'bg-[#287EB3] text-white'
                        : 'bg-white/[0.05] ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.09]'
                    }`}
                  >
                    {photoCard && (
                      <div className="absolute inset-0 -z-10">
                        <Photo id={IMAGES.hero} w={1400} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/55 to-[#102A43]/15" />
                      </div>
                    )}

                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        blueCard ? 'bg-white/15' : 'bg-[#287EB3]/15'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${blueCard ? 'text-white' : 'text-[#7DB8D8]'}`}
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

        {/* INDUSTRIES: image-led selector with a numbered list of applications */}
        <section className="bg-[#F8FAFC] py-20 lg:py-28" aria-labelledby="industries-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#B5472A]">
                  Applications
                </p>
                <h2
                  id="industries-heading"
                  className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
                >
                  Industries we serve
                </h2>
              </div>
              <Link
                to="/industries/"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors hover:text-[#0869A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] focus-visible:ring-offset-4"
              >
                See all applications
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-2 lg:gap-16">
              <div>
                {INDUSTRIES_LIST.map((industry, i) =>
                  i === activeIndustry ? (
                    <motion.div
                      key={industry.id}
                      initial={reduced ? false : { opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      className="relative isolate aspect-[5/4] overflow-hidden rounded-2xl bg-[#075B91] shadow-xl shadow-[#075B91]/15"
                    >
                      <Photo
                        id={IMAGES.industries[i % IMAGES.industries.length]}
                        w={1600}
                        className="absolute inset-0 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#075B91]/90 via-[#075B91]/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <p className="max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                          {industry.description}
                        </p>
                      </div>
                    </motion.div>
                  ) : null,
                )}
                <div className="mt-4 flex items-center justify-center gap-2" aria-label="Choose industry image">
                  {INDUSTRIES_LIST.map((industry, i) => (
                    <button
                      key={industry.id}
                      type="button"
                      onClick={() => setActiveIndustry(i)}
                      aria-label={`Show ${industry.title}`}
                      aria-pressed={i === activeIndustry}
                      className="flex h-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] focus-visible:ring-offset-2"
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeIndustry ? 'w-7 bg-[#0869A8]' : 'w-1.5 bg-[#CBD5E1]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <ol className="border-t border-[#102A43]/15">
                {INDUSTRIES_LIST.map((industry, i) => {
                  const active = i === activeIndustry;
                  const confirmed = industry.verificationStatus === 'confirmed';

                  return (
                    <li key={industry.id} className="border-b border-[#102A43]/15">
                      <button
                        type="button"
                        onClick={() => setActiveIndustry(i)}
                        aria-pressed={active}
                        className="group grid w-full grid-cols-[2rem_minmax(0,1fr)_2.5rem] items-start gap-3 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0869A8] sm:grid-cols-[2rem_minmax(0,1fr)_2.75rem] sm:gap-4 sm:py-6"
                      >
                        <span
                          className={`pt-1 font-mono text-xs tabular-nums transition-colors ${
                            active ? 'text-[#0869A8]' : 'text-[#94A3B8]'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block font-display text-lg font-bold leading-snug transition-colors sm:text-xl ${
                              active ? 'text-[#0869A8]' : 'text-[#102A43] group-hover:text-[#0869A8]'
                            }`}
                          >
                            {industry.title}
                          </span>
                          {active && (
                            <span className="mt-2 block">
                              <span
                                className={`mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold ${
                                  confirmed ? 'text-[#B5472A]' : 'text-[#64748B]'
                                }`}
                              >
                                {confirmed ? (
                                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                                ) : (
                                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                )}
                                {industry.verificationLabel}
                              </span>
                              <span className="block text-sm leading-relaxed text-[#64748B]">
                                {industry.description}
                              </span>
                            </span>
                          )}
                        </span>
                        <span
                          className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full transition-all sm:h-9 sm:w-9 ${
                            active
                              ? 'bg-[#0869A8] text-white'
                              : 'text-[#475569] group-hover:bg-[#0869A8]/10 group-hover:text-[#0869A8]'
                          }`}
                        >
                          {active ? (
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
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
                <p className="mt-3 text-[#334E68] leading-relaxed">
                  Not here? Send us your drawing and we will answer directly.
                </p>
                <Link
                  to="/contact-us/"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-[#B5472A] transition-colors"
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

        {/* FINAL CTA */}
        <section className="overflow-hidden bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight text-[#102A43]">
                Have a drawing? Get a quote.
              </h2>
              <p className="mt-4 text-[#334E68] leading-relaxed">
                Send the part drawing, material grade and yearly volume. Our Faridabad team will
                reply with a quote. Customer names appear on this site only with written
                permission.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 rounded-md bg-[#E45532] px-7 py-4 text-sm font-semibold text-[#102A43] transition-colors hover:bg-white"
              >
                Request a quote
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact-us/"
                className="inline-flex items-center rounded-md border border-[#CBD5E1] px-7 py-4 text-sm font-semibold text-[#102A43] transition-colors hover:bg-[#F5F8FC]"
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