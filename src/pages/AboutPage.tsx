import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import { ABOUT_STRENGTHS, COMPANY_FACTS } from '../data/companyData';

/* Design idea: the page reads like an engineering drawing sheet.
   - Hero: a stepped shaft drawn line by line (the one animated moment), with dimension lines.
   - "At a glance": a drawing title block, the way real drawings carry company details.
   - Machines: callouts with leader lines. Strengths: a ruled spec sheet.
   Palette (unchanged): teal #0E2A2D, teal-2 #14393D, brass #D9A441, mist #EEF2F1, ink #0B1A1C */

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const PHOTO = {
  story: '1769147339214-076740872485', // metal parts on engineering blueprints
  expertise: '1666634157070-6fd830fb5672', // metal rod machined on a lathe
  cta: '1764114235916-74de69e6851f', // industrial laser cutting
};

function Photo({ id, alt = '', w = 1400, className = '' }: { id: string; alt?: string; w?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`h-full w-full bg-[#14393D] ${className}`} />;
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

/* Hero drawing: a stepped shaft, centerline, and dimensions. */
function ShaftDrawing() {
  return (
    <figure className="relative">
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
      <div className="rounded-2xl bg-[#0E2A2D] p-4 sm:p-6">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="Technical drawing of a stepped precision shaft with length and diameter dimensions"
          className="h-auto w-full text-white"
          fill="none"
        >
          {/* grid */}
          <defs>
            <pattern id="jd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" stroke="#fff" strokeOpacity=".06" />
            </pattern>
          </defs>
          <rect width="640" height="320" fill="url(#jd-grid)" />

          {/* centerline */}
          <path d="M20 150H600" stroke="#D9A441" strokeWidth="1" strokeDasharray="14 4 2 4" opacity=".8" />

          {/* shaft outline */}
          <path
            className="jd-draw"
            pathLength={1}
            d="M40 120H120V100H260V80H420V100H520V120H560V180H520V200H420V220H260V200H120V180H40Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* step lines */}
          <g className="jd-draw" stroke="currentColor" strokeOpacity=".55" strokeWidth="1" pathLength={1}>
            <path d="M120 120V180M260 100V200M420 100V200M520 120V180" pathLength={1} />
          </g>

          {/* length dimension */}
          <g className="jd-dim" stroke="#D9A441" strokeWidth="1">
            <path d="M40 232V268M560 190V268" strokeOpacity=".6" />
            <path d="M40 260H560" />
            <path d="M40 260l9-4v8zM560 260l-9-4v8z" fill="#D9A441" />
          </g>
          <text className="jd-dim" x="300" y="252" fill="#D9A441" fontSize="13" textAnchor="middle" fontWeight="600">
            L = per drawing
          </text>

          {/* diameter dimension */}
          <g className="jd-dim" stroke="#D9A441" strokeWidth="1">
            <path d="M420 80H600M420 220H600" strokeOpacity=".6" />
            <path d="M590 80V220" />
            <path d="M590 80l-4 9h8zM590 220l-4-9h8z" fill="#D9A441" />
          </g>
          <text className="jd-dim" x="606" y="156" fill="#D9A441" fontSize="13" fontWeight="600">
            Ø
          </text>

          {/* tolerance callout */}
          <g className="jd-dim">
            <path d="M340 80L372 40H470" stroke="#fff" strokeOpacity=".6" />
            <text x="378" y="34" fill="#fff" fontSize="12" fillOpacity=".85">
              CNC turned + VMC finished
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-[#64736F]">
        Every part starts as a customer drawing like this one.
      </figcaption>
    </figure>
  );
}

export function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us/' },
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

      <main className="flex-1 bg-[#EEF2F1] text-[#0B1A1C]">
        {/* HERO */}
        <section className="pt-24 lg:pt-28">
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  Shafts made to your drawing.
                </h1>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3D5255]">
                  J.D. Associates is a Partnership Firm in Faridabad, Haryana. Since May 2000 we have machined
                  automotive shafts, EV axle shafts, cardan shafts, connecting rods, cams, gears, and custom jig
                  fixtures.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact-us/"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0E2A2D] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#14393D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2"
                  >
                    Request a quote
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/products/"
                    className="inline-flex items-center rounded-md border border-[#0B1A1C]/25 px-7 py-4 text-sm font-semibold transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
                  >
                    See our products
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ShaftDrawing />
              </div>
            </div>

            {/* TITLE BLOCK: company facts as a drawing title block */}
            <dl className="mt-16 grid grid-cols-2 border-2 border-[#0B1A1C] bg-white lg:grid-cols-5">
              {titleBlock.map((row, i) => (
                <div
                  key={row.label}
                  className={`p-4 sm:p-5 ${i > 0 ? 'lg:border-l lg:border-[#0B1A1C]' : ''} ${
                    i % 2 === 1 ? 'border-l border-[#0B1A1C] lg:border-l' : ''
                  } ${i >= 2 ? 'border-t border-[#0B1A1C] lg:border-t-0' : ''} ${
                    i === 4 ? 'col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <dt className="text-xs font-medium text-[#64736F]">{row.label}</dt>
                  <dd className="mt-1.5 font-display text-base font-bold leading-snug tabular-nums sm:text-lg">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* STORY */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <RevealBlock className="space-y-5 lg:col-span-6">
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Precision machining roots in Faridabad
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[#3D5255] sm:text-lg">
                Since 2000 we have focused on drawing-driven component manufacturing for India&apos;s automotive and
                engineering industry. From the industrial hub of Faridabad, we supply two-wheeler, three-wheeler,
                E-Rickshaw, and four-wheeler OEM requirements.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-[#3D5255] sm:text-lg">
                A team of 51–100 skilled people and dedicated R&amp;D support turn client drawings into repeatable,
                accurately machined components: axle shaft configurations, production receiving gauges, and custom
                workholding fixtures.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.08} className="lg:col-span-6">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#0E2A2D]">
                  <Photo id={PHOTO.story} alt="Machined metal parts resting on engineering drawings" w={1400} />
                </div>
                <div className="absolute -bottom-5 left-5 rounded-xl bg-[#0E2A2D] px-5 py-4 text-white shadow-xl sm:left-8">
                  <p className="font-display text-2xl font-bold">Since 2000</p>
                  <p className="mt-0.5 text-xs text-white/70">Manufacturing in Faridabad</p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="bg-[#0E2A2D] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <RevealBlock className="lg:col-span-6">
              <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-[#14393D]">
                <Photo id={PHOTO.expertise} alt="Metal rod being machined on a CNC lathe" w={1400} />
              </div>
            </RevealBlock>

            <RevealBlock delay={0.08} className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Our manufacturing expertise
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                CNC turning centers and vertical machining centers (VMC) work together to make shafts, rotational
                couplings, connecting rods, cams, gears, and custom tooling to your drawing.
              </p>

              <h3 className="mt-9 text-sm font-semibold text-[#D9A441]">Materials we machine</h3>
              {/* material schedule: ruled rows, like a drawing's material list */}
              <ul className="mt-3 grid grid-cols-1 border-t border-white/25 sm:grid-cols-2 sm:gap-x-8">
                {COMPANY_FACTS.materials.map((metal) => (
                  <li key={metal} className="flex items-center gap-3 border-b border-white/15 py-3 text-sm font-medium">
                    <span className="h-px w-5 bg-[#D9A441]" aria-hidden="true" />
                    {metal}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>
        </section>

        {/* INFRASTRUCTURE: callouts on a shared leader line */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-4xl font-bold tracking-tight lg:text-6xl">Our infrastructure</h2>
              <p className="max-w-sm leading-relaxed text-[#3D5255]">
                Our machining floor runs CNC and VMC equipment from established industrial machinery brands.
              </p>
            </div>

            <div className="relative">
              {/* the leader line the callouts hang from */}
              <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-[#0B1A1C] lg:block" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {COMPANY_FACTS.machineryBrands.map((machine, idx) => (
                  <RevealBlock key={machine.brand} delay={idx * 0.05} className="relative lg:pt-10">
                    <span
                      className="absolute left-0 top-0 hidden h-4 w-4 rounded-full border-2 border-[#0B1A1C] bg-[#D9A441] lg:block"
                      aria-hidden="true"
                    />
                    <span className="absolute left-[7px] top-4 hidden h-6 w-px bg-[#0B1A1C] lg:block" aria-hidden="true" />
                    <h3 className="font-display text-3xl font-bold">{machine.brand}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#3D5255]">{machine.role}</p>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STRENGTHS: a ruled spec sheet */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 font-display text-4xl font-bold tracking-tight lg:text-6xl">Our strengths</h2>

            <div className="grid grid-cols-1 gap-x-12 border-t-2 border-[#0B1A1C] md:grid-cols-2">
              {ABOUT_STRENGTHS.map((strength, idx) => (
                <RevealBlock
                  key={strength.title}
                  delay={idx * 0.03}
                  className="grid grid-cols-[4px_1fr] gap-5 border-b border-[#0B1A1C]/20 py-7"
                >
                  <span className="rounded-full bg-[#D9A441]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl font-bold">{strength.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#3D5255]">{strength.description}</p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* COMMITMENT + CTA */}
        <section className="relative isolate overflow-hidden bg-[#0E2A2D] py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <Photo id={PHOTO.cta} w={2000} />
            <div className="absolute inset-0 bg-[#0E2A2D]/85" />
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
                className="inline-flex items-center gap-2 rounded-md bg-[#D9A441] px-7 py-4 text-sm font-semibold text-[#0B1A1C] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E2A2D]"
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