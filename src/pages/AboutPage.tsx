import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cog,
  GraduationCap,
  HardHat,
  HeartHandshake,
  Lightbulb,
  Ruler,
  ShieldCheck,
  X,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CountUpMetric } from '../components/CountUpMetric';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import { COMPANY_HIGHLIGHTS, CUSTOMER_LOGOS } from '../data/companyData';

/*
  Palette (unchanged brand colours)
  navy #14263A · ink #0F2338 · blue #17638C · sky #7CCBF7 · mist #E8F5FD · paper #F5F9FC

  Design idea: the page reads like an engineering drawing sheet.
  - Dimension lines and a title block in the hero
  - Hairline-ruled sections instead of floating cards
  - Sky blue is the single loud colour, used for the final call to action
*/

// Hero background: free Unsplash photo "Close-up of an old metal lathe in a workshop" (LISK OBE).
// https://unsplash.com/photos/close-up-of-an-old-metal-lathe-in-a-workshop-_VBsh_IKsD8
// If it ever fails to load, open that page, copy the image address (images.unsplash.com/...)
// and paste it below, adding ?auto=format&fit=crop&w=1920&q=80 at the end.
const HERO_IMAGE_SRC = 'https://unsplash.com/photos/_VBsh_IKsD8/download?force=true&w=1920';
const HERO_IMAGE_ALT = 'Close-up of a metal lathe in a machining workshop';

const suppliers = [
  'Kalyani Steels Ltd.',
  'Artee Steels Ltd.',
  'Arora Iron & Steel',
  'Bhushan Steel',
  'Nico Jaiswal',
];

const values = [
  {
    title: 'Safety',
    description: "The safety of our employees and the travelling public is everyone's responsibility.",
    icon: HardHat,
  },
  {
    title: 'Integrity',
    description:
      'Our business conduct includes the highest level of honesty, ethics and moral correctness.',
    icon: ShieldCheck,
  },
  {
    title: 'Respect',
    description:
      'Respect is the basic rule of behaviour that guides every employee in all their actions.',
    icon: HeartHandshake,
  },
  {
    title: 'Entrepreneurship',
    description:
      'Each employee should show initiative and be motivated by a desire to win, to commit and to succeed.',
    icon: Lightbulb,
  },
];

const differences = [
  {
    title: 'Stringent quality checks',
    description:
      'Stringent quality checks on each parameter at every stage of the manufacturing process.',
  },
  {
    title: 'Global manufacturing practices',
    description: 'Following best global practices in turning machine manufacturing.',
  },
  {
    title: 'Advanced technology',
    description: 'Latest technology on par with global counterparts.',
  },
  {
    title: 'Research and innovation',
    description: 'Uncompromised focus on research and innovation.',
  },
];

const teamCapabilities = [
  'Highly Qualified Engineers',
  'Professionals with Corporate Background',
  '15+ Years of Experience in Sourcing',
  'Strong Understanding of Global Quality Expectations',
];

const qualityItems = [
  { title: 'Quality Inspection Process', icon: Ruler },
  { title: 'Manufacturing Quality Checks', icon: Check },
  { title: 'Inspection Equipment', icon: Cog },
  { title: 'Quality-Focused Workforce', icon: GraduationCap },
];

const policyItems = [
  {
    title: 'Customer satisfaction',
    description:
      'Customer satisfaction is reflected through commitments, actions, products and services.',
  },
  {
    title: 'Quality products and timely delivery',
    description: 'The service we provide is founded on quality products and delivery commitments.',
  },
  {
    title: 'Defect prevention and improvement',
    description:
      'An encouraging environment helps employees and suppliers prevent defects and pursue excellence.',
  },
];

const certificateFacts = [
  ['Company', 'J.D. Associates'],
  ['Standard', 'ISO 9001:2015'],
  ['Management system', 'Quality Management Systems'],
  ['Activity', 'Manufacture and supply of precision machined components'],
];

/** Section heading with a short sky rule that echoes a drawing datum line. */
function SectionHeading({
  label,
  children,
  dark = false,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`flex items-center gap-3 text-sm font-semibold ${
          dark ? 'text-[#7CCBF7]' : 'text-[#17638C]'
        }`}
      >
        <span className="h-0.5 w-8 bg-[#7CCBF7]" aria-hidden="true" />
        {label}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? 'text-white' : 'text-[#14263A]'
        }`}
      >
        {children}
      </h2>
    </div>
  );
}

function CertificateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0F2338]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE6F5] bg-white text-[#14263A] transition-colors hover:bg-[#E8F5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17638C]"
              aria-label="Close certificate preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <h2 id="certificate-title" className="pr-12 font-display text-2xl font-bold text-[#14263A]">
              ISO 9001:2015 certificate
            </h2>
            <div className="mt-5 flex justify-center overflow-auto rounded-xl border border-[#CFE6F5] bg-[#F5F9FC] p-3 sm:p-5">
              <img
                src="/about/certificate.png"
                alt="ISO 9001:2015 quality management certificate for J.D. Associates"
                className="h-auto max-h-[calc(92vh-12rem)] w-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AboutPage() {
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const reduced = useReducedMotion();
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us/' },
  ];

  return (
    <PageShell>
      <SeoHead
        title="About JD Associates | Precision Engineering & Manufacturing"
        description="Learn about JD Associates, a precision machining company focused on quality components, skilled manufacturing and customer-drawing-based production."
        canonicalPath="/about-us/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-white text-[#172B42]">
        {/* Hero: full-bleed blue-tinted photo, large left-aligned headline, square buttons */}
        <section className="relative isolate overflow-hidden bg-[#0B0F14] pb-10 pt-32 text-white lg:pb-14 lg:pt-40">
          {!heroImageFailed && (
            <img
              src={HERO_IMAGE_SRC}
              alt={HERO_IMAGE_ALT}
              onError={() => setHeroImageFailed(true)}
              className="absolute inset-0 -z-20 h-full w-full object-cover"
              fetchPriority="high"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 -z-[15] engineering-grid-bg opacity-20" aria-hidden="true" />
          {/* Dark overlay: strongest on the left behind the text, easing off to the right */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-black/30"
            aria-hidden="true"
          />
          {/* Short accent bar at the top-left edge */}
          <span className="absolute left-0 top-0 h-1 w-24 bg-[#7CCBF7] sm:left-6 lg:left-8" aria-hidden="true" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-left"
            >
              <div className="[&_*]:!text-white/80">
                <Breadcrumbs items={breadcrumbs} />
              </div>
              <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Engineering precision. Manufacturing excellence.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white sm:text-lg lg:text-xl">
                JD Associates is committed to precision machining and manufacturing high-quality
                engineering components. With advanced manufacturing facilities, skilled
                professionals and a strong focus on quality, we manufacture components according
                to customer drawings and specifications.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/#machine-profile-heading"
                  className="inline-flex items-center gap-3 bg-[#17638C] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#0F2338] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore our capabilities
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-bold text-[#14263A] transition-colors hover:bg-[#7CCBF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contact our team
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealBlock delay={0.18}>
              <dl
                aria-label="JD Associates manufacturing statistics"
                className="grid grid-cols-2 border-y border-white/20 bg-black/25 backdrop-blur-md lg:grid-cols-4"
              >
                {COMPANY_HIGHLIGHTS.map((item, index) => (
                  <div
                    key={item.title}
                    className={`py-4 pr-4 sm:py-5 ${
                      index % 2 === 1 ? 'border-l border-white/20 pl-4' : ''
                    } ${
                      index > 1 ? 'border-t border-white/20 lg:border-t-0' : ''
                    } ${index > 0 ? 'lg:border-l lg:border-white/20 lg:pl-6' : ''}`}
                  >
                    <dt className="text-xs font-semibold text-white/75 sm:text-sm">{item.title}</dt>
                    <dd className="mt-1 font-display text-3xl font-bold tabular-nums text-white sm:text-4xl">
                      <CountUpMetric target={item.metric} />
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealBlock>
          </div>
        </section>

        <section className="bg-white pb-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 pt-20 lg:grid-cols-12 lg:gap-16 lg:pt-28">
              <SectionHeading label="Who we are" className="lg:col-span-6">
                Building precision through manufacturing expertise.
              </SectionHeading>
              <div className="lg:col-span-6">
                <p className="leading-relaxed text-[#334E68] sm:text-lg">
                  JD Associates offers precision machining of components made from various
                  materials. The company is equipped with advanced manufacturing machines operated
                  by skilled professionals to produce components according to customer
                  requirements.
                </p>
                <p className="mt-4 leading-relaxed text-[#334E68]">
                  Our expertise in high-quality precision machining enables us to manufacture
                  parts while maintaining strict quality control and quality assurance practices.
                  We focus on continuous improvement through training, coaching and continuing
                  education.
                </p>
                <ul className="mt-8 grid grid-cols-1 border-y border-[#CFE6F5] sm:grid-cols-2">
                  {[
                    'Precision machining',
                    'Skilled professionals',
                    'Quality control',
                    'Continuous improvement',
                  ].map((highlight, index) => (
                    <li
                      key={highlight}
                      className={`flex items-center gap-3 py-4 text-sm font-semibold text-[#14263A] ${
                        index % 2 === 1 ? 'sm:pl-6' : ''
                      } ${index > 1 ? 'border-t border-[#CFE6F5]' : ''} ${
                        index === 1 ? 'border-t border-[#CFE6F5] sm:border-l sm:border-t-0' : ''
                      } ${index === 3 ? 'sm:border-l' : ''}`}
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#17638C]" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & vision */}
        <section className="bg-[#E8F5FD] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <figure className="lg:col-span-7">
              <figcaption className="flex items-center gap-3 text-sm font-semibold text-[#17638C]">
                <span className="h-0.5 w-8 bg-[#7CCBF7]" aria-hidden="true" />
                Our mission and vision
              </figcaption>
              <blockquote className="mt-8 border-l-4 border-[#7CCBF7] pl-6 font-display text-2xl font-semibold leading-relaxed text-[#14263A] sm:text-3xl lg:pl-8">
                “We at JD Associates are excited about our future position in a dynamic
                engineering environment. Our innovative, dynamic and talented team is confident
                that our character, integrity and honour will continuously inspire us to serve
                each customer at the highest levels at all times.”
              </blockquote>
            </figure>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#CFE6F5] bg-[#E8F5FD] shadow-xl shadow-[#14263A]/15">
                <img
                  src="/about/mission.png"
                  alt="Industrial robots working on components inside a manufacturing facility"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2338]/30 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        

        {/* Values: one ruled row, no icon bubbles or cards */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading label="Our principles" className="max-w-2xl">
              The values that drive us.
            </SectionHeading>
            <div className="mt-12 grid grid-cols-1 border-y border-[#CFE6F5] sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="border-b border-[#CFE6F5] py-8 last:border-b-0 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
                  >
                    <Icon className="h-7 w-7 text-[#17638C]" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-xl font-bold text-[#14263A]">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What makes us different */}
        <section className="bg-[#F5F9FC] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading label="Why JD Associates">
                  What makes JD Associates different?
                </SectionHeading>
                <div className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-[#CFE6F5] bg-[#0F2338] shadow-xl shadow-[#14263A]/10">
                  <img
                    src="/images/custom-machined-parts.jpg"
                    alt="Metalworking machine and operator in an industrial workshop"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2338]/65 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#0F2338]/55 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                    Precision manufacturing
                  </span>
                </div>
              </div>
            </div>
            <ul className="divide-y divide-[#CFE6F5] border-y border-[#CFE6F5] lg:col-span-7">
              {differences.map((item) => (
                <li key={item.title} className="flex gap-5 py-8">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7CCBF7] text-[#0F2338]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#14263A]">{item.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-[#64748B]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:order-2 lg:col-span-6">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#CFE6F5] bg-[#E8F5FD] shadow-xl shadow-[#14263A]/10">
                <img
                  src="/about/why%20jd.png"
                  alt="Manufacturing professionals reviewing equipment on a factory floor"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2338]/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#0F2338]/55 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  The people behind every component
                </span>
              </div>
            </div>
            <div className="lg:order-1 lg:col-span-6">
              <SectionHeading label="Our team and expertise">
                A capable team behind every component.
              </SectionHeading>
              <p className="mt-5 leading-relaxed text-[#334E68]">
                JD Associates is supported by a pool of capable professionals committed to meeting
                customer expectations in Safety, Quality, Cost and Delivery.
              </p>
              <ul className="mt-7 divide-y divide-[#CFE6F5] border-y border-[#CFE6F5]">
                {teamCapabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-center gap-3 py-3.5 text-sm font-semibold text-[#14263A]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#7CCBF7]" aria-hidden="true" />
                    {capability}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-[#64748B]">
                The 15+ years statement refers specifically to sourcing experience, not overall
                company or employee experience.
              </p>
            </div>
          </div>
        </section>

        {/* Quality commitment + policy, one continuous dark band */}
        <section className="bg-[#14263A] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading label="Our quality commitment" dark>
                  Quality is at the heart of our manufacturing process.
                </SectionHeading>
                <p className="mt-5 leading-relaxed text-white/75">
                  Quality is our forte, and we abide by international standards of quality while
                  manufacturing our range. Our quality inspection department tests and monitors
                  components at every level of production.
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  Advanced testing equipment supports reliable inspection results. Continuous
                  improvement is achieved through teamwork, training and motivation.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
                {qualityItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="bg-[#14263A] p-8 sm:p-10">
                      <Icon className="h-8 w-8 text-[#7CCBF7]" aria-hidden="true" />
                      <h3 className="mt-6 font-display text-xl font-bold">{item.title}</h3>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-20 border-t border-white/15 pt-14">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <SectionHeading label="Quality policy" dark>
                    Our belief. Our quality policy.
                  </SectionHeading>
                </div>
                <p className="leading-relaxed text-white/75 lg:col-span-7 lg:pt-10">
                  Ever-increasing customer satisfaction is our main goal, reflected through our
                  commitments, actions, products and services. We believe that what ultimately
                  matters is the service we provide through quality products and timely delivery.
                </p>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-0">
                {policyItems.map((item) => (
                  <li
                    key={item.title}
                    className="border-t-2 border-[#7CCBF7] pt-5 lg:border-t-0 lg:border-l-2 lg:px-8 lg:py-1 lg:first:border-l-0 lg:first:pl-0"
                  >
                    <h3 className="font-display text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Suppliers & customers */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:col-span-7 lg:order-2">
              <SectionHeading label="Prestigious customers">Trusted by industry leaders.</SectionHeading>
              <ul className="mt-8 grid grid-cols-2 border-l border-t border-[#CFE6F5] sm:grid-cols-4">
                {CUSTOMER_LOGOS.map((customer) => (
                  <li
                    key={customer.name}
                    className="flex min-h-28 items-center justify-center border-b border-r border-[#CFE6F5] bg-white px-4 py-3"
                  >
                    <img
                      src={customer.src}
                      alt={`${customer.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-14 max-w-full object-contain"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-[#64748B]">
                Client logos are shown for company-profile reference.
              </p>
            </div>

            <div className="lg:col-span-5 lg:order-1">
              <SectionHeading label="Supply network">Our raw material supply network.</SectionHeading>
              <ul className="mt-8 divide-y divide-[#CFE6F5] border-y border-[#CFE6F5]">
                {suppliers.map((supplier) => (
                  <li
                    key={supplier}
                    className="flex items-center gap-3 py-4 font-display text-lg font-semibold text-[#14263A]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#7CCBF7]" aria-hidden="true" />
                    {supplier}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#64748B]">
                Supplier names are shown from the company profile. Official logos require approved
                assets.
              </p>
            </div>
          </div>
        </section>

        {/* Certification */}
        <section className="bg-[#F5F9FC] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:col-span-7">
              <SectionHeading label="Certifications">Our commitment to quality standards.</SectionHeading>
              <dl className="mt-8 divide-y divide-[#CFE6F5] border-y border-[#CFE6F5]">
                {certificateFacts.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="text-sm font-semibold text-[#17638C]">{label}</dt>
                    <dd className="text-sm font-semibold leading-relaxed text-[#14263A]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#CFE6F5] bg-white p-4 shadow-lg shadow-[#14263A]/5 sm:p-5">
                <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-xl border border-[#CFE6F5] bg-[#F5F9FC] p-2 sm:h-[360px] sm:p-3 lg:h-[400px]">
                  <img
                    src="/about/certificate.png"
                    alt="ISO 9001:2015 quality management certificate for J.D. Associates"
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-auto max-w-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setCertificateOpen(true)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#14263A] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#17638C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CCBF7]"
                >
                  View full certificate
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA: the one loud sky-blue block */}
        <section className="bg-[#7CCBF7] py-20 text-[#0F2338] lg:py-28">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Looking for a reliable precision manufacturing partner?
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-[#0F2338]/80">
                Connect with JD Associates to discuss your engineering component requirements.
                Our team is committed to understanding customer specifications and supporting
                quality-focused manufacturing solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products/"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F2338] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#17638C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0F2338] px-7 py-3.5 text-sm font-bold text-[#0F2338] transition-colors hover:bg-[#0F2338] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Contact our team
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CertificateModal open={certificateOpen} onClose={() => setCertificateOpen(false)} />
    </PageShell>
  );
}