import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Car,
  CheckCircle2,
  Cog,
  Drill,
  Factory,
  Layers,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqAccordion } from '../components/FaqAccordion';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import { CUSTOMER_LOGOS } from '../data/companyData';

/* Palette: light blues + white
   ink #1C3D73   blue #1D7CF2   deep #1668D0   sky #6DB5FF
   ice #E6F3FF   paper #F4FAFF  line #CFE5FB */

const industries = [
  {
    id: 'automotive',
    number: '01',
    name: 'Automotive Manufacturing',
    title: 'Precision Components for Automotive Manufacturing.',
    description:
      'Precision machining and manufacturing of engineering components according to customer drawings and specifications.',
    capabilities: [
      'Precision Machined Components',
      'Turned Components',
      'Custom Engineering Parts',
      'Drawing-Based Manufacturing',
    ],
    icon: Car,
    imageLabel: 'Automotive manufacturing',
    imageId: '1764114235896-034c8772de01',
    imageAlt: 'Machined components for automotive manufacturing',
  },
  {
    id: 'electrical-switchgear',
    number: '02',
    name: 'Electrical & Switchgear',
    title: 'Precision Engineering for Electrical and Switchgear Applications.',
    description:
      'Manufacturing of mechanical assemblies and precision components to meet specific engineering requirements.',
    capabilities: ['Mechanical Assemblies', 'Precision Components', 'Machined Parts', 'Custom Manufacturing'],
    icon: Zap,
    imageLabel: 'Electrical and switchgear',
    imageId: '1585201731775-0597e1be4bfb',
    imageAlt: 'Precision machined parts for industrial equipment',
  },
  {
    id: 'industrial-engineering',
    number: '03',
    name: 'Industrial Engineering',
    title: 'Supporting Industrial Engineering Requirements.',
    description:
      'Advanced machining facilities and skilled professionals support the manufacturing of precision engineering components.',
    capabilities: ['CNC Turning', 'VMC Machining', 'Grinding Operations', 'Precision Components'],
    icon: Cog,
    imageLabel: 'Industrial engineering',
    imageId: '1787039467622-ddec5c24320c',
    imageAlt: 'CNC and VMC machines on an industrial manufacturing floor',
  },
  {
    id: 'general-manufacturing',
    number: '04',
    name: 'General Manufacturing',
    title: 'Custom Manufacturing for Diverse Engineering Needs.',
    description:
      'Customer-focused manufacturing solutions designed around component drawings and technical specifications.',
    capabilities: ['Custom Machined Parts', 'Mechanical Components', 'Precision Machining', 'Assembly Requirements'],
    icon: Factory,
    imageLabel: 'General manufacturing',
    imageId: '1764114235891-66ff86abaf87',
    imageAlt: 'Machining components in a manufacturing workshop',
  },
];

const capabilities = [
  { title: 'CNC Turning', detail: '11 CNC turning machines', icon: Cog },
  { title: 'VMC Machining', detail: '4 VMC machines', icon: Factory },
  { title: 'Traub Machining', detail: '20 Traub machines', icon: Wrench },
  { title: 'Grinding Operations', detail: '8 grinding machines', icon: Layers },
  { title: 'Drilling and Milling', detail: '20 drill machines and milling operations', icon: Drill },
  { title: 'Assembly and Supporting Manufacturing', detail: 'Assembly and production support', icon: Cog },
];

const inspectionFacilities = [
  'Digital Profile Projector',
  'Surface Roughness Tester',
  'Hardness Tester',
  'Precision Inspection Facilities',
];

const industryFaqs = [
  {
    question: 'What manufacturing capabilities does JD Associates offer?',
    answer:
      'The company profile lists CNC turning, VMC machining, Traub machining, grinding, drilling, milling and supporting manufacturing facilities. Please contact JD Associates to review a specific requirement.',
  },
  {
    question: 'Does JD Associates support custom engineering requirements?',
    answer:
      'The company describes manufacturing components according to customer drawings and specifications. Individual requirements are subject to review.',
  },
  {
    question: 'What CNC and VMC facilities are available?',
    answer: 'The listed setup includes 11 CNC turning machines and 4 VMC machines.',
  },
  {
    question: 'Can components be manufactured according to customer drawings?',
    answer:
      'Yes. The company profile describes components manufactured according to customer drawings and specifications. Contact the team to discuss your drawing.',
  },
  {
    question: 'What quality inspection facilities are available?',
    answer:
      'The company information lists a digital profile projector, surface roughness tester, hardness tester and precision inspection facilities.',
  },
  {
    question: 'How can customers discuss their manufacturing requirements?',
    answer: 'Use the Contact Us page to share your requirements and technical drawings with JD Associates.',
  },
];

const GRID_PAPER: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(29,124,242,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(29,124,242,.07) 1px,transparent 1px)',
  backgroundSize: '36px 36px',
};

const unsplash = (photoId: string, width = 1400) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=85&w=${width}`;

function IndustryPhoto({
  label,
  photoId,
  alt,
  className = '',
  priority = false,
  width = 1400,
}: {
  label?: string;
  photoId: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`group relative isolate overflow-hidden bg-[#CFE8FF] ${className}`}>
      <img
        src={failed ? '/images/custom-machined-parts.jpg' : unsplash(photoId, width)}
        alt={failed ? 'Manufacturing equipment in a workshop' : alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={failed ? undefined : () => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.05] motion-reduce:transition-none"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C3D73]/45 via-transparent to-transparent"
        aria-hidden="true"
      />
      {label && (
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#1C3D73] shadow-md sm:bottom-5 sm:left-5">
          {label}
        </span>
      )}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] ${light ? 'text-[#BFE0FF]' : 'text-[#1D7CF2]'}`}>
      <span className={`h-px w-10 ${light ? 'bg-[#BFE0FF]' : 'bg-[#1D7CF2]'}`} aria-hidden="true" />
      {children}
    </p>
  );
}

const btnPrimary =
  'inline-flex items-center gap-2 rounded-full bg-[#1D7CF2] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#1D7CF2]/30 transition hover:bg-[#1668D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D7CF2] focus-visible:ring-offset-2';
const btnGhost =
  'inline-flex items-center gap-2 rounded-full border border-[#CFE5FB] bg-white px-7 py-4 text-sm font-bold text-[#1C3D73] transition hover:border-[#1D7CF2] hover:text-[#1D7CF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D7CF2] focus-visible:ring-offset-2';

export function IndustriesPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries/' },
  ];

  return (
    <PageShell>
      <SeoHead
        title="Industries We Serve | Precision Manufacturing | JD Associates"
        description="Explore JD Associates' precision machining, CNC turning, VMC machining and engineering manufacturing capabilities for customer-specific requirements."
        canonicalPath="/industries/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-white text-[#1C3D73]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F3FF] via-[#F4FAFF] to-white pb-16 pt-28 lg:pb-24 lg:pt-32" style={GRID_PAPER}>
          <div className="pointer-events-none absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[#BFE0FF]/60 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#CFE5FB] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#1D7CF2]" aria-hidden="true" />
                  Industries &amp; applications
                </span>
                <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[68px]">
                  Engineering precision across <span className="text-[#1D7CF2]">industrial applications.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3E6290]">
                  JD Associates offers precision machining and manufacturing capabilities to support
                  diverse engineering and industrial component requirements.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#capabilities" className={btnPrimary}>
                    Explore our capabilities <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link to="/contact-us/" className={btnGhost}>
                    Discuss your requirements <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4F77A3]">Jump to an industry</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {industries.map((industry) => {
                      const Icon = industry.icon;
                      return (
                        <li key={industry.id}>
                          <a
                            href={`#${industry.id}`}
                            className="inline-flex items-center gap-2 rounded-full border border-[#CFE5FB] bg-white px-4 py-2.5 text-sm font-bold transition hover:border-[#1D7CF2] hover:bg-[#1D7CF2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D7CF2] focus-visible:ring-offset-2"
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {industry.name}
                            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <RevealBlock delay={0.08} className="lg:col-span-5">
                <div className="relative mx-auto grid max-w-md grid-cols-5 gap-3 pb-6">
                  <IndustryPhoto
                    photoId="1740209475472-aa7d280f7452"
                    alt="CNC machining equipment on a manufacturing floor"
                    label="Precision manufacturing"
                    priority
                    width={1000}
                    className="col-span-5 aspect-[16/11] rounded-[2rem] border-4 border-white shadow-xl shadow-[#1D7CF2]/20"
                  />
                  <IndustryPhoto
                    photoId="1787039467622-ddec5c24320c"
                    alt="CNC and VMC machines on the shop floor"
                    width={700}
                    className="col-span-3 aspect-[4/3] rounded-[1.75rem] border-4 border-white shadow-lg"
                  />
                  <IndustryPhoto
                    photoId="1764114235896-034c8772de01"
                    alt="Precision machined components"
                    width={500}
                    className="col-span-2 aspect-square rounded-[1.75rem] border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-0 right-2 flex items-center gap-3 rounded-2xl border border-[#CFE5FB] bg-white p-3.5 shadow-xl sm:-right-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F3FF]">
                      <ShieldCheck className="h-5 w-5 text-[#1D7CF2]" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold leading-tight">
                      Built to your
                      <br />
                      drawings
                    </span>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* INDUSTRY APPLICATIONS: stacking cards */}
        <section className="bg-white pb-20 pt-4 lg:pb-28" aria-labelledby="industry-categories-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow>Applications</Eyebrow>
                <h2 id="industry-categories-heading" className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
                  Engineering <span className="text-[#1D7CF2]">applications.</span>
                </h2>
              </div>
              <p className="leading-relaxed text-[#3E6290] lg:col-span-5">
                These application areas reflect the general machining and manufacturing capabilities of
                JD Associates and are not associated with specific customer projects.
              </p>
            </div>

            <div className="mt-12 space-y-6 lg:space-y-10">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                const reversed = index % 2 === 1;
                return (
                  <article
                    key={industry.id}
                    id={industry.id}
                    style={{ top: `${6.5 + index * 1.25}rem` }}
                    className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#CFE5FB] bg-white shadow-xl shadow-[#1D7CF2]/10 lg:sticky"
                  >
                    <div className="grid lg:grid-cols-12">
                      <IndustryPhoto
                        label={industry.imageLabel}
                        photoId={industry.imageId}
                        alt={industry.imageAlt}
                        className={`aspect-[4/3] lg:col-span-6 lg:aspect-auto lg:min-h-[26rem] ${reversed ? 'lg:order-2' : ''}`}
                      />
                      <div className={`relative flex flex-col justify-center p-7 sm:p-10 lg:col-span-6 lg:p-12 ${reversed ? 'lg:order-1' : ''}`}>
                        <span
                          className="pointer-events-none absolute right-6 top-2 font-display text-[7rem] font-extrabold leading-none text-[#1D7CF2]/[0.08] sm:text-[9rem]"
                          aria-hidden="true"
                        >
                          {industry.number}
                        </span>
                        <div className="relative flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F3FF] text-[#1D7CF2]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1D7CF2]" aria-label={`Industry ${industry.number}`}>
                            {industry.number} <span aria-hidden="true">/</span> {industry.name}
                          </span>
                        </div>
                        <h3 className="relative mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                          {industry.title}
                        </h3>
                        <p className="relative mt-4 leading-relaxed text-[#3E6290]">{industry.description}</p>
                        <ul className="relative mt-6 grid gap-2 sm:grid-cols-2">
                          {industry.capabilities.map((capability) => (
                            <li key={capability} className="flex items-center gap-2.5 rounded-xl bg-[#F4FAFF] px-3.5 py-3 text-sm font-semibold ring-1 ring-[#CFE5FB]">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1D7CF2]" aria-hidden="true" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                        <a href="#capabilities" className={`${btnPrimary} relative mt-7 self-start`}>
                          Explore capabilities <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#1D7CF2] to-[#1668D0] py-20 text-white lg:py-28" aria-labelledby="capabilities-heading">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)',
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow light>Manufacturing setup</Eyebrow>
                <h2 id="capabilities-heading" className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                  Capabilities that support diverse requirements.
                </h2>
              </div>
              <p className="leading-relaxed text-white/85 lg:col-span-4">
                Our setup includes CNC turning, VMC, Traub machining, grinding, drilling and milling operations.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <RevealBlock key={capability.title} delay={index * 0.04}>
                    <article className="group h-full rounded-3xl bg-white/10 p-6 ring-1 ring-white/25 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#1C3D73] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <div className="flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1D7CF2] shadow-sm transition group-hover:bg-[#1D7CF2] group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-display text-sm font-extrabold tabular-nums text-white/60 transition group-hover:text-[#1D7CF2]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mt-8 font-display text-xl font-bold leading-snug">{capability.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80 transition group-hover:text-[#3E6290]">{capability.detail}</p>
                    </article>
                  </RevealBlock>
                );
              })}
            </div>
          </div>
        </section>

        {/* QUALITY */}
        <section className="bg-[#F4FAFF] py-20 lg:py-28" aria-labelledby="quality-heading">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <RevealBlock className="lg:col-span-5">
              <div className="relative mx-auto max-w-md pb-8">
                <IndustryPhoto
                  label="Inspection and metrology equipment"
                  photoId="1585201731775-0597e1be4bfb"
                  alt="Precision machined components for quality inspection"
                  className="aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] border-8 border-white shadow-2xl shadow-[#1D7CF2]/20"
                />
                <div className="absolute -right-2 bottom-0 flex items-center gap-3 rounded-2xl border border-[#CFE5FB] bg-white p-4 shadow-xl sm:-right-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6F3FF]">
                    <ShieldCheck className="h-5 w-5 text-[#1D7CF2]" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold leading-tight">
                    In-process
                    <br />
                    inspection
                  </span>
                </div>
              </div>
            </RevealBlock>

            <div className="lg:col-span-7">
              <Eyebrow>Quality assurance</Eyebrow>
              <h2 id="quality-heading" className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
                Quality-focused manufacturing at <span className="text-[#1D7CF2]">every stage.</span>
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-[#3E6290]">
                Quality inspection practices support the manufacturing process, with dedicated
                facilities for component inspection.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {inspectionFacilities.map((facility) => (
                  <li key={facility} className="flex items-center gap-3 rounded-2xl border border-[#CFE5FB] bg-white p-4 text-sm font-bold shadow-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F3FF]">
                      <ShieldCheck className="h-4 w-4 text-[#1D7CF2]" aria-hidden="true" />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CUSTOMERS */}
        <section className="bg-white py-16 lg:py-24" aria-labelledby="customers-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealBlock className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center"><Eyebrow>Customer portfolio</Eyebrow></div>
              <h2 id="customers-heading" className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Trusted by industry <span className="text-[#1D7CF2]">leaders.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#4F77A3]">
                Customer names are presented together and are not linked to specific industries or projects.
              </p>
            </RevealBlock>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CUSTOMER_LOGOS.map((customer, index) => (
                <li key={customer.name}>
                  <RevealBlock delay={index * 0.03}>
                    <div className="flex min-h-28 items-center justify-center rounded-2xl border border-[#CFE5FB] bg-[#F4FAFF] px-4 py-3 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-[#1D7CF2]/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <img
                        src={customer.src}
                        alt={`${customer.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className="max-h-12 max-w-full object-contain"
                      />
                    </div>
                  </RevealBlock>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F4FAFF] py-20 lg:py-28" aria-labelledby="industry-faq-heading">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#E6F3FF] p-8 lg:sticky lg:top-28">
                <Eyebrow>Industry enquiries</Eyebrow>
                <h2 id="industry-faq-heading" className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight">
                  Questions about our <span className="text-[#1D7CF2]">capabilities.</span>
                </h2>
                <p className="mt-4 leading-relaxed text-[#3E6290]">
                  Ask our team about a specific drawing, inspection requirement or manufacturing need.
                </p>
                <Link to="/contact-us/" className={`${btnPrimary} mt-6`}>
                  Contact our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={industryFaqs} />
            </div>
          </div>
        </section>

        {/* FINAL ENQUIRY */}
        <section className="bg-[#F4FAFF] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1D7CF2] p-8 text-white sm:p-14 lg:p-20">
            <IndustryPhoto
              photoId="1740209475472-aa7d280f7452"
              alt=""
              width={1800}
              className="absolute inset-0 -z-10 opacity-25 mix-blend-luminosity"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1D7CF2] via-[#1D7CF2]/85 to-[#1668D0]/60" aria-hidden="true" />
            <Eyebrow light>Discuss your requirement</Eyebrow>
            <h2 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1] tracking-tight sm:text-6xl">
              Looking for a manufacturing partner for your industry?
            </h2>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl text-lg leading-relaxed text-white/90">
                Discuss your engineering component requirements with JD Associates. Share your drawings
                and specifications to explore suitable precision machining and manufacturing solutions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#1C3D73] shadow-lg transition hover:bg-[#E6F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D7CF2]"
                >
                  Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-4 text-sm font-bold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contact our team <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}