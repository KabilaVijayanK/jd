import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Cog,
  Drill,
  Ruler,
  PackageCheck,
  Bike,
  Car,
  Zap,
  Truck,
  Check,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import { ABOUT_STRENGTHS, COMPANY_FACTS } from '../data/companyData';

/* Design idea: a shop-floor spec sheet.
   - Hero: dark blue blueprint field, big headline, the stepped shaft drawn live (only animated moment).
   - Stat strip pulled from real company data, overlapping the hero.
   - Process: the real sequence a drawing follows through the plant.
   - Industries, machines, materials and strengths as ruled, engineered panels.
   Palette: blue #075B91, blue-2 #064B79, orange #E45532, mist #EEF5FA, ink #102A43 */

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const PHOTO = {
  story: '1769147339214-076740872485', // metal parts on engineering blueprints
  expertise: '1666634157070-6fd830fb5672', // metal rod machined on a lathe
  cta: '1764114235916-74de69e6851f', // industrial laser cutting
};

function Photo({ id, alt = '', w = 1400, className = '' }: { id: string; alt?: string; w?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`h-full w-full bg-[#064B79] ${className}`} />;
  return (
    <img
      src={unsplash(id, w)}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/* Hero drawing: stepped shaft, centerline and dimensions. */
function ShaftDrawing() {
  return (
    <figure>
      <style>{`
        .jd-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: jd-draw 2.2s cubic-bezier(.6,.1,.2,1) .2s forwards; }
        .jd-dim { opacity: 0; animation: jd-fade .8s ease 1.8s forwards; }
        @keyframes jd-draw { to { stroke-dashoffset: 0; } }
        @keyframes jd-fade { to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .jd-draw { animation: none; stroke-dashoffset: 0; }
          .jd-dim { animation: none; opacity: 1; }
        }
      `}</style>
      <div className="rounded-lg bg-[#075B91] p-3 sm:p-5">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="Technical drawing of a stepped precision shaft with length and diameter dimensions"
          className="h-auto w-full text-white"
          fill="none"
        >
          <defs>
            <pattern id="jd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" stroke="#fff" strokeOpacity=".07" />
            </pattern>
          </defs>
          <rect width="640" height="320" fill="url(#jd-grid)" />
          <path d="M20 150H600" stroke="#E45532" strokeWidth="1" strokeDasharray="14 4 2 4" opacity=".8" />
          <path
            className="jd-draw"
            pathLength={1}
            d="M40 120H120V100H260V80H420V100H520V120H560V180H520V200H420V220H260V200H120V180H40Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <g className="jd-draw" stroke="currentColor" strokeOpacity=".55" strokeWidth="1" pathLength={1}>
            <path d="M120 120V180M260 100V200M420 100V200M520 120V180" pathLength={1} />
          </g>
          <g className="jd-dim" stroke="#E45532" strokeWidth="1">
            <path d="M40 232V268M560 190V268" strokeOpacity=".6" />
            <path d="M40 260H560" />
            <path d="M40 260l9-4v8zM560 260l-9-4v8z" fill="#E45532" />
          </g>
          <text className="jd-dim" x="300" y="252" fill="#E45532" fontSize="13" textAnchor="middle" fontWeight="600">
            L = per drawing
          </text>
          <g className="jd-dim" stroke="#E45532" strokeWidth="1">
            <path d="M420 80H600M420 220H600" strokeOpacity=".6" />
            <path d="M590 80V220" />
            <path d="M590 80l-4 9h8zM590 220l-4-9h8z" fill="#E45532" />
          </g>
          <text className="jd-dim" x="606" y="156" fill="#E45532" fontSize="13" fontWeight="600">
            Ø
          </text>
          <g className="jd-dim">
            <path d="M340 80L372 40H470" stroke="#fff" strokeOpacity=".6" />
            <text x="378" y="34" fill="#fff" fontSize="12" fillOpacity=".85">
              CNC turned + VMC finished
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-[#64748B]">Every part starts as a customer drawing like this one.</figcaption>
    </figure>
  );
}

const PROCESS = [
  { icon: FileText, title: 'Drawing review', text: 'We study your drawing, tolerances and material before cutting begins.' },
  { icon: Cog, title: 'CNC turning', text: 'Shafts, couplings and rods are turned on CNC centers.' },
  { icon: Drill, title: 'VMC finishing', text: 'Keyways, flats, cams and gear features are finished on VMCs.' },
  { icon: Ruler, title: 'Gauge check', text: 'Parts are verified against production receiving gauges.' },
  { icon: PackageCheck, title: 'Delivery', text: 'Batches ship on the date we agreed with you.' },
];

const INDUSTRIES = [
  { icon: Bike, label: 'Two-wheeler' },
  { icon: Truck, label: 'Three-wheeler' },
  { icon: Zap, label: 'E-Rickshaw' },
  { icon: Car, label: 'Four-wheeler' },
];

const MAKES = [
  'Automotive shafts',
  'EV axle shafts',
  'Cardan shafts',
  'Connecting rods',
  'Cams and gears',
  'Custom jig fixtures',
];

export function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us/' },
  ];

  const stats = [
    { value: '2000', label: 'Year established' },
    { value: COMPANY_FACTS.teamSize, label: 'Skilled team members' },
    { value: String(COMPANY_FACTS.machineryBrands.length), label: 'Machine brands on the floor' },
    { value: String(COMPANY_FACTS.materials.length), label: 'Materials machined' },
  ];

  const titleBlock = [
    { label: 'Business type', value: COMPANY_FACTS.businessType },
    { label: 'Established', value: COMPANY_FACTS.established },
    { label: 'Legal status', value: COMPANY_FACTS.legalStatus },
    { label: 'Team size', value: COMPANY_FACTS.teamSize },
    { label: 'Location', value: COMPANY_FACTS.location },
  ];

  return (
    <PageShell>
      <SeoHead
        title="About J.D. Associates | Precision Shaft Manufacturer Since 2000"
        description="Learn about J.D. Associates, a Partnership Firm established in May 2000 in Faridabad, Haryana, specializing in CNC and VMC machined shafts and automotive components."
        canonicalPath="/about-us/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#EEF5FA] text-[#102A43]">
        {/* HERO: white background */}
        <section className="relative overflow-hidden bg-white pb-20 pt-28 lg:pb-24 lg:pt-36">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#E45532]" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  Precision shafts, machined to your drawing.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#334E68]">
                  J.D. Associates is a Partnership Firm in Faridabad, Haryana. Since May 2000 we have turned and
                  finished components for India&apos;s automotive and engineering industry.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact-us/"
                    className="inline-flex items-center gap-2 rounded-md bg-[#075B91] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#064B79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2"
                  >
                    Request a quote
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/products/"
                    className="inline-flex items-center rounded-md border border-[#102A43]/25 px-7 py-4 text-sm font-semibold transition-colors hover:bg-[#EEF5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532]"
                  >
                    See our products
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6">
                <ShaftDrawing />
              </div>
            </div>
          </div>
        </section>

        {/* STAT STRIP */}
        <section className="relative z-10 -mt-px pt-10 lg:pt-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 overflow-hidden rounded-lg border-b-4 border-[#E45532] bg-white shadow-md ring-1 ring-[#102A43]/10 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-6 lg:p-8 ${i % 2 === 1 ? 'border-l border-[#102A43]/10' : ''} ${
                    i >= 2 ? 'border-t border-[#102A43]/10 lg:border-t-0' : ''
                  } ${i > 0 ? 'lg:border-l lg:border-[#102A43]/10' : ''}`}
                >
                  <dd className="font-display text-3xl font-bold tabular-nums text-[#075B91] lg:text-4xl">{s.value}</dd>
                  <dt className="mt-1 text-sm text-[#334E68]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* STORY */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <RevealBlock delay={0.08} className="order-2 lg:order-1 lg:col-span-6">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#075B91]">
                  <Photo id={PHOTO.story} alt="Machined metal parts resting on engineering drawings" />
                </div>
                <div className="absolute -bottom-5 right-5 rounded-md border-l-4 border-[#E45532] bg-[#102A43] px-5 py-4 text-white shadow-xl sm:right-8">
                  <p className="font-display text-2xl font-bold">Since 2000</p>
                  <p className="mt-0.5 text-xs text-white/70">Manufacturing in Faridabad</p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock className="order-1 space-y-5 lg:order-2 lg:col-span-6">
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Precision machining roots in Faridabad
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[#334E68] sm:text-lg">
                Since 2000 we have focused on drawing-driven component manufacturing. From the industrial hub of
                Faridabad, we supply two-wheeler, three-wheeler, E-Rickshaw, and four-wheeler OEM requirements.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-[#334E68] sm:text-lg">
                A team of {COMPANY_FACTS.teamSize} skilled people and dedicated R&amp;D support turn client drawings
                into repeatable, accurately machined components: axle shaft configurations, production receiving
                gauges, and custom workholding fixtures.
              </p>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 pt-2 sm:grid-cols-2">
                {MAKES.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 shrink-0 text-[#E45532]" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>
        </section>

        {/* PROCESS: a real sequence, so numbered */}
        <section className="bg-[#102A43] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                From drawing to delivery
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Every order follows the same five steps, so quality and lead times stay predictable.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((step, i) => (
                <RevealBlock key={step.title} delay={i * 0.05} className="bg-[#102A43]">
                  <li className="flex h-full flex-col p-6 lg:p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#075B91]">
                        <step.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-bold tabular-nums text-[#E45532]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{step.text}</p>
                  </li>
                </RevealBlock>
              ))}
            </ol>
          </div>
        </section>

        {/* EXPERTISE + MATERIALS */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <RevealBlock className="lg:col-span-7">
              <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#102A43]/10">
                <div className="aspect-[16/8] overflow-hidden bg-[#075B91]">
                  <Photo id={PHOTO.expertise} alt="Metal rod being machined on a CNC lathe" />
                </div>
                <div className="p-7 lg:p-9">
                  <h2 className="font-display text-3xl font-bold tracking-tight lg:text-4xl">
                    Our manufacturing expertise
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-[#334E68]">
                    CNC turning centers and vertical machining centers (VMC) work together to make shafts,
                    rotational couplings, connecting rods, cams, gears, and custom tooling to your drawing.
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.08} className="lg:col-span-5">
              <div className="h-full rounded-lg bg-[#075B91] p-7 text-white lg:p-9">
                <h3 className="font-display text-2xl font-bold">Materials we machine</h3>
                <ul className="mt-6 border-t border-white/25">
                  {COMPANY_FACTS.materials.map((metal) => (
                    <li key={metal} className="flex items-center gap-3 border-b border-white/15 py-3.5 text-sm font-medium">
                      <span className="h-px w-5 bg-[#E45532]" aria-hidden="true" />
                      {metal}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Vehicles we build components for
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {INDUSTRIES.map((ind, i) => (
                <RevealBlock key={ind.label} delay={i * 0.04}>
                  <div className="group flex h-full items-center gap-4 rounded-lg border border-[#102A43]/15 bg-white p-5 transition-colors hover:border-[#075B91] hover:bg-[#075B91] hover:text-white">
                    <ind.icon className="h-7 w-7 text-[#075B91] transition-colors group-hover:text-[#E45532]" aria-hidden="true" />
                    <span className="font-display text-lg font-bold">{ind.label}</span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE */}
        <section className="border-y border-[#102A43]/10 bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Our infrastructure
              </h2>
              <p className="max-w-sm leading-relaxed text-[#334E68]">
                Our machining floor runs CNC and VMC equipment from established industrial machinery brands.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COMPANY_FACTS.machineryBrands.map((machine, idx) => (
                <RevealBlock key={machine.brand} delay={idx * 0.05}>
                  <div className="h-full rounded-lg border-t-4 border-[#075B91] bg-[#EEF5FA] p-6 transition-colors hover:border-[#E45532]">
                    <h3 className="font-display text-2xl font-bold">{machine.brand}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#334E68]">{machine.role}</p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* STRENGTHS */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Our strengths
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ABOUT_STRENGTHS.map((strength, idx) => (
                <RevealBlock key={strength.title} delay={idx * 0.03}>
                  <div className="flex h-full gap-4 rounded-lg bg-white p-6 ring-1 ring-[#102A43]/10">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E45532]">
                      <Check className="h-4 w-4 text-white" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{strength.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#334E68]">{strength.description}</p>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* COMPANY DETAILS: title block */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 border-2 border-[#102A43] bg-white lg:grid-cols-5">
              {titleBlock.map((row, i) => (
                <div
                  key={row.label}
                  className={`p-4 sm:p-5 ${i > 0 ? 'lg:border-l lg:border-[#102A43]' : ''} ${
                    i % 2 === 1 ? 'border-l border-[#102A43] lg:border-l' : ''
                  } ${i >= 2 ? 'border-t border-[#102A43] lg:border-t-0' : ''} ${
                    i === 4 ? 'col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <dt className="text-xs font-medium text-[#64748B]">{row.label}</dt>
                  <dd className="mt-1.5 font-display text-base font-bold leading-snug tabular-nums sm:text-lg">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="relative isolate overflow-hidden bg-[#075B91] py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <Photo id={PHOTO.cta} w={2000} />
            <div className="absolute inset-0 bg-[#075B91]/85" />
          </div>
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white lg:text-5xl">
                Accurate components, fair pricing, and timely delivery
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/75">
                Every batch gets the same promise: machined accurately to your drawing, quoted at a fair industrial
                price, and delivered on the agreed date.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
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
                Browse product catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}