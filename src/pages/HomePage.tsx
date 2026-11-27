import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Clock,
  Cpu,
  Layers,
  Pause,
  Play,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Plus,
  Minus,
  Bike,
  Car,
  Truck,
  Zap,
  Factory,
  Cog,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { CountUpMetric } from '../components/CountUpMetric';
import { FaqAccordion } from '../components/FaqAccordion';
import { ProductImage } from '../components/ProductImage';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';
import {
  COMPANY_FACTS,
  COMPANY_HIGHLIGHTS,
  CUSTOMER_LOGOS,
  HOME_FAQS,
  INDUSTRIES_LIST,
  PRODUCT_CATEGORIES,
  WHY_CHOOSE_ITEMS,
} from '../data/companyData';

/* Palette: light blues only
   ink #1C3D73 (text)   blue #1D7CF2   sky #6DB5FF
   ice #E6F3FF          paper #F4FAFF  line #CFE5FB */

/* HERO VIDEO: files in /public are served from "/". Change the name to match yours. */
const HERO_VIDEO = [
  { src: '/hero.mp4', type: 'video/mp4' },
  // { src: '/hero.webm', type: 'video/webm' },
];
const HERO_POSTER = '/hero-poster.jpg';

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

type Slot = { ids: string[]; alt: string };

const FLOOR: Slot = {
  ids: ['1787039467622-ddec5c24320c', '1740209475472-aa7d280f7452', '1585201731775-0597e1be4bfb'],
  alt: 'CNC and VMC machines on the JD Associates shop floor',
};
const HERO_FALLBACK: Slot = {
  ids: ['1740209475472-aa7d280f7452', '1787039467622-ddec5c24320c'],
  alt: 'CNC machine cutting a metal component',
};
const INDUSTRY_SLOTS: Slot[] = [
  { ids: ['1740209475472-aa7d280f7452', '1787039467622-ddec5c24320c'], alt: 'Precision parts for two-wheeler manufacturers' },
  { ids: ['1764114235891-66ff86abaf87', '1585201731775-0597e1be4bfb'], alt: 'Machined components for three-wheelers' },
  { ids: ['1585201731775-0597e1be4bfb', '1764114235896-034c8772de01'], alt: 'Turned parts for four-wheeler suppliers' },
  { ids: ['1764114235896-034c8772de01', '1764114235891-66ff86abaf87'], alt: 'Metal parts for electrical and switchgear equipment' },
  { ids: ['1787039467622-ddec5c24320c', '1740209475472-aa7d280f7452'], alt: 'CNC and VMC machines producing industrial machinery parts' },
];
/* Photos for the four "how we work" cards. Replace with your own pictures when ready. */
const PROCESS: { title: string; text: string; slot: Slot }[] = [
  {
    title: 'Share your drawing',
    text: 'Send your drawing, material and quantity to our team.',
    slot: { ids: ['1764114235896-034c8772de01', '1764114235891-66ff86abaf87'], alt: 'Engineering drawing and a machined part' },
  },
  {
    title: 'Review and quote',
    text: 'We check feasibility and come back with a quotation.',
    slot: { ids: ['1585201731775-0597e1be4bfb', '1740209475472-aa7d280f7452'], alt: 'Engineer reviewing a component' },
  },
  {
    title: 'Machine and inspect',
    text: 'Parts are machined on CNC and VMC lines and checked at each stage.',
    slot: { ids: ['1740209475472-aa7d280f7452', '1787039467622-ddec5c24320c'], alt: 'CNC machine cutting a part' },
  },
  {
    title: 'Deliver and support',
    text: 'Finished components are dispatched with follow-up support.',
    slot: { ids: ['1787039467622-ddec5c24320c', '1585201731775-0597e1be4bfb'], alt: 'Finished components on the shop floor' },
  },
];

const GRID_PAPER: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(29,124,242,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(29,124,242,.08) 1px,transparent 1px)',
  backgroundSize: '32px 32px',
};

function PartDrawing({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#5AAEFF] to-[#1D7CF2]">
      <svg viewBox="0 0 320 160" className="w-3/4 max-w-sm text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M20 60h60v-14h40v-12h80v12h40v14h40v40h-40v14h-40v12h-80v-12h-40v-14H20z" />
        <path d="M10 80h300" strokeDasharray="10 4 2 4" opacity=".6" />
        <circle cx="160" cy="80" r="14" />
      </svg>
    </div>
  );
}

function Photo({ slot, w = 1400, className = '' }: { slot: Slot; w?: number; className?: string }) {
  const [i, setI] = useState(0);
  if (i >= slot.ids.length) return <PartDrawing label={slot.alt} />;
  return (
    <img
      key={slot.ids[i]}
      src={unsplash(slot.ids[i], w)}
      alt={slot.alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setI((n) => n + 1)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/* Small pill label with a dot, used above section headings */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#CFE5FB] bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1C3D73] shadow-sm">
      <span className="h-2 w-2 rounded-full bg-[#1D7CF2]" aria-hidden="true" />
      {children}
    </span>
  );
}

/* Background video with play/pause, reduced-motion respect and photo fallback */
function HeroVideo({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(!reduced);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing]);

  return (
    <>
      <div className="absolute inset-0 -z-10 bg-neutral-900" aria-hidden={!failed}>
        {failed ? (
          <Photo slot={HERO_FALLBACK} w={2000} />
        ) : (
          <video
            ref={ref}
            className="h-full w-full object-cover"
            autoPlay={!reduced}
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            aria-hidden="true"
            onError={() => setFailed(true)}
          >
            {HERO_VIDEO.map((s) => (
              <source key={s.src} src={s.src} type={s.type} onError={() => setFailed(true)} />
            ))}
          </video>
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
      </div>
      {!failed && (
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          className="absolute right-4 top-24 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#1F6FE0]/60 text-white backdrop-blur transition hover:bg-white hover:text-[#1F6FE0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
      )}
    </>
  );
}

const INDUSTRY_ICONS = [Bike, Truck, Car, Zap, Factory];
const WHY_ICONS = [Clock, Cpu, Compass, Layers, Wrench, ShieldCheck];

const CAPABILITIES: [string, number][] = [
  ['CNC Turning', 11],
  ['VMC', 4],
  ['Traub', 20],
  ['Production Lathe', 4],
  ['Drill Machines', 20],
  ['Grinding Machines', 8],
  ['Laser Machine', 1],
  ['Welding Machines', 2],
];

const ABOUT_STATS = [
  { icon: Layers, value: 14, label: 'Machine categories' },
  { icon: Cpu, value: 94, label: 'Listed machine units' },
  { icon: Wrench, value: 'CNC + VMC', label: 'Core capabilities' },
] as const;

const btnLight =
  'inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-bold text-[#1C3D73] transition hover:bg-[#6DB5FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F6FE0]';
const btnBlue =
  'inline-flex items-center gap-2 rounded-full bg-[#1D7CF2] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#1D7CF2]/25 transition hover:bg-[#1668D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D7CF2] focus-visible:ring-offset-2';

/* ============================ ABOUT ============================ */
function CropMarks() {
  const c = 'absolute h-6 w-6 border-[#1D7CF2]';
  return (
    <>
      <span className={`${c} -left-3 -top-3 border-l-2 border-t-2`} aria-hidden="true" />
      <span className={`${c} -right-3 -top-3 border-r-2 border-t-2`} aria-hidden="true" />
      <span className={`${c} -bottom-3 -left-3 border-b-2 border-l-2`} aria-hidden="true" />
      <span className={`${c} -bottom-3 -right-3 border-b-2 border-r-2`} aria-hidden="true" />
    </>
  );
}

function AboutSection() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        {/* Photo with crop marks and a drawing-style title block */}
        <RevealBlock className="lg:col-span-6">
          <div className="relative mx-4">
            <CropMarks />
            <div className="aspect-[5/4] overflow-hidden bg-[#CFE8FF]">
              <Photo slot={FLOOR} w={1400} />
            </div>
            <dl className="grid grid-cols-3 border border-t-0 border-[#CFE5FB] bg-[#F4FAFF] text-left">
              {[
                ['Certified', 'ISO 9001:2015'],
                ['Location', 'Faridabad, Haryana'],
                ['Built to', 'Your drawing'],
              ].map(([k, v], i) => (
                <div key={k} className={`px-4 py-3 ${i > 0 ? 'border-l border-[#CFE5FB]' : ''}`}>
                  <dt className="text-xs text-[#4F77A3]">{k}</dt>
                  <dd className="mt-0.5 text-sm font-bold text-[#1C3D73]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.06} className="lg:col-span-6">
          <h2 id="about-heading" className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            We machine what your drawing asks for, and check it before it leaves.
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-[#3E6290]">
            JD Associates makes machined and fabricated components for OEMs and suppliers.
            In-process checks at each stage keep every batch consistent with the one before.
          </p>

          {/* Spec sheet with dotted leaders instead of stacked cards */}
          <dl className="mt-8 border-t border-[#CFE5FB]">
            {ABOUT_STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-baseline gap-3 border-b border-[#CFE5FB] py-4">
                <Icon className="h-5 w-5 shrink-0 translate-y-1 text-[#1D7CF2]" strokeWidth={1.5} aria-hidden="true" />
                <dt className="text-sm font-semibold text-[#3E6290]">{label}</dt>
                <span className="min-w-6 flex-1 border-b-2 border-dotted border-[#BFD9F5]" aria-hidden="true" />
                <dd className="font-display text-2xl font-extrabold tabular-nums text-[#1C3D73]">
                  {typeof value === 'number' ? <CountUpMetric target={value} /> : value}
                </dd>
              </div>
            ))}
          </dl>

          <Link to="/about-us/" className={`${btnBlue} mt-8`}>
            Get to know us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ========================== CAPABILITIES ========================== */
function CapabilitiesSection() {
  const reduced = !!useReducedMotion();
  const rows = [...CAPABILITIES].sort((a, b) => b[1] - a[1]);
  const max = rows[0][1];

  return (
    <section className="bg-[#F4FAFF] py-20 lg:py-28" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="capabilities-heading" className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Twenty Traub machines. Eleven CNC lathes. One floor.
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-[#3E6290]">
          CNC turning, VMC machining, grinding, drilling, laser processing and welding, all in-house.
        </p>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-[#BFE0FF] lg:col-span-5">
            <div className="absolute inset-0">
              <Photo slot={FLOOR} w={1200} />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C3D73]/80 to-transparent p-5 pt-16 text-white">
              <p className="text-sm font-semibold">Our shop floor, Faridabad</p>
            </div>
          </div>

          {/* Machine register: bar length = number of machines */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold text-[#1C3D73]">Machines on the floor</h3>
            <ul className="mt-3 border-t border-[#CFE5FB]">
              {rows.map(([name, qty], i) => (
                <li key={name} className="grid grid-cols-[minmax(0,9rem)_1fr_2.5rem] items-center gap-4 border-b border-[#CFE5FB] py-3.5 sm:grid-cols-[11rem_1fr_3rem]">
                  <span className="text-sm font-semibold text-[#1C3D73]">{name}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-[#E1EFFC]">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-[#1D7CF2]"
                      style={{ width: `${(qty / max) * 100}%` }}
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  <span className="text-right font-display text-xl font-extrabold tabular-nums text-[#1C3D73]">{qty}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-semibold text-[#3E6290]">Materials:</span>
              {COMPANY_FACTS.materials.map((m) => (
                <span key={m} className="rounded-md border border-[#CFE5FB] bg-white px-3 py-1 text-xs font-semibold text-[#1C3D73]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== WHY ============================== */
/* One photo per reason, same order as WHY_CHOOSE_ITEMS. Swap in your own photos later. */
const WHY_SLOTS: Slot[] = [
  { ids: ['1585201731775-0597e1be4bfb', '1740209475472-aa7d280f7452'], alt: 'Machined component being checked during production' },
  { ids: ['1787039467622-ddec5c24320c', '1740209475472-aa7d280f7452'], alt: 'CNC and VMC machines on the shop floor' },
  { ids: ['1764114235891-66ff86abaf87', '1585201731775-0597e1be4bfb'], alt: 'Engineer working on a machined part' },
  { ids: ['1764114235896-034c8772de01', '1764114235891-66ff86abaf87'], alt: 'Precision inspection of a turned component' },
  { ids: ['1740209475472-aa7d280f7452', '1764114235896-034c8772de01'], alt: 'Custom component machined to a customer drawing' },
  { ids: ['1585201731775-0597e1be4bfb', '1787039467622-ddec5c24320c'], alt: 'Team improving the production process' },
];

function WhySection() {
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const item = WHY_CHOOSE_ITEMS[active];

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="why-heading" className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          What you can expect when you send us a drawing
        </h2>

        <div className="mt-12 grid overflow-hidden rounded-3xl bg-[#1C3D73] text-white lg:grid-cols-12">
          {/* Selector */}
          <div role="tablist" aria-label="Why choose JD Associates" className="p-3 sm:p-4 lg:col-span-4">
            {WHY_CHOOSE_ITEMS.map((it, idx) => {
              const Icon = WHY_ICONS[idx % WHY_ICONS.length];
              const on = idx === active;
              return (
                <button
                  key={it.title}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="why-panel"
                  id={`why-tab-${idx}`}
                  onClick={() => setActive(idx)}
                  onMouseEnter={() => setActive(idx)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    on ? 'bg-white text-[#1C3D73]' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${on ? 'text-[#1D7CF2]' : ''}`} strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-display text-base font-bold sm:text-lg">{it.title}</span>
                </button>
              );
            })}
          </div>

          {/* Detail: full-bleed photo with the text on top */}
          <div
            role="tabpanel"
            id="why-panel"
            aria-labelledby={`why-tab-${active}`}
            className="relative min-h-[420px] overflow-hidden bg-[#1C3D73] lg:col-span-8 lg:min-h-[480px]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reduced ? false : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Photo slot={WHY_SLOTS[active % WHY_SLOTS.length]} w={1400} />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#142E5C]/90 via-[#142E5C]/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:p-10 md:flex-row md:items-end md:justify-between">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="max-w-md"
                >
                  <h3 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/90">{item.description}</p>
                </motion.div>
              </AnimatePresence>
              <Link
                to="/contact-us/"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1C3D73] transition hover:bg-[#E6F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#142E5C]"
              >
                Send us a drawing <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const reduced = !!useReducedMotion();
  const [activeProduct, setActiveProduct] = useState(0);
  const product = PRODUCT_CATEGORIES[activeProduct];
  const [openIndustry, setOpenIndustry] = useState(0);
  const [shownIndustry, setShownIndustry] = useState(0);
  const toggleIndustry = (i: number) => {
    if (openIndustry === i) {
      setOpenIndustry(-1);
    } else {
      setOpenIndustry(i);
      setShownIndustry(i);
    }
  };

  return (
    <PageShell>
      <SeoHead
        title="JD Associates | Precision Machining and CNC Component Manufacturing"
        description="JD Associates provides precision machining, CNC turning and VMC manufacturing for custom engineering components, assemblies and machined parts."
        canonicalPath="/"
        faqs={HOME_FAQS}
      />

      <main className="flex-1 bg-[#F4FAFF] text-[#1C3D73]">
        {/* HERO (unchanged): full-bleed background video */}
        <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden text-white">
          <HeroVideo reduced={reduced} />

          <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-40 sm:px-6 lg:px-8 lg:pb-14">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-md border-l-4 border-[#6DB5FF] pl-4 text-base font-medium text-white/85">
                Precision engineering and industrial manufacturing, Faridabad
              </p>
              <h1 className="mt-6 max-w-5xl font-display text-[44px] font-extrabold leading-[0.98] tracking-tight sm:text-7xl lg:text-[96px]">
                Your drawing. Our spindles. Parts that fit.
              </h1>
              <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <p className="max-w-xl text-lg leading-relaxed text-white/80">
                  CNC turning, VMC and advanced production lines, machining components exactly to
                  your drawings and specifications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact-us/" className={btnLight}>
                    Request a quote
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/products/"
                    className="inline-flex items-center gap-2 border border-white/50 px-7 py-4 text-sm font-bold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Explore capabilities
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/20 bg-[#1F6FE0]/75 backdrop-blur-md">
            <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
              {COMPANY_HIGHLIGHTS.map((item, i) => (
                <div
                  key={item.title}
                  className={`py-5 pr-4 sm:py-6 ${i % 2 === 1 ? 'border-l border-white/20 pl-4' : ''} ${
                    i > 0 ? 'lg:border-l lg:border-white/20 lg:pl-6' : ''
                  }`}
                >
                  <p className="font-display text-2xl font-bold tabular-nums sm:text-3xl [&_*]:font-display [&_*]:font-bold">
                    <CountUpMetric target={item.metric} start={10} />
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-[#CFE8FF]">{item.title}</h2>
                  <p className="mt-0.5 hidden text-xs leading-relaxed text-white/65 sm:block">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT (redesigned) */}
        <AboutSection />

        {/* PRODUCTS: module selector, list left and detail panel right */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D7CF2]">Our products</p>
            <h2 className="mt-3 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Precision <em className="text-[#1D7CF2]">Components.</em>
              <br />
              Built to Drawing.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-[#3E6290]">
              Precision-machined components and mechanical assemblies made to your drawings and
              requirements.
            </p>

            <div className="mt-12 grid overflow-hidden border border-[#CFE5FB] lg:grid-cols-12">
              <div role="group" aria-label="Choose a product category" className="border-b border-[#CFE5FB] bg-[#F4FAFF] p-3 lg:col-span-4 lg:border-b-0 lg:border-r">
                {PRODUCT_CATEGORIES.map((c, i) => {
                  const active = i === activeProduct;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveProduct(i)}
                      aria-pressed={active}
                      className={`flex w-full items-center justify-between gap-3 border-l-4 px-4 py-4 text-left font-serif text-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D7CF2] ${
                        active ? 'border-[#1D7CF2] bg-white font-semibold shadow-sm' : 'border-transparent text-[#4F77A3] hover:bg-white/70'
                      }`}
                    >
                      {c.title}
                      {active && <ChevronRight className="h-4 w-4 shrink-0 text-[#1D7CF2]" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              {product && (
                <motion.div
                  key={product.id}
                  initial={reduced ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-8 bg-gradient-to-br from-white to-[#E6F3FF] p-6 sm:p-10 lg:col-span-8 lg:grid-cols-2 lg:items-center"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1D7CF2]">Selected category</p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{product.title}</h3>
                    <p className="mt-4 font-serif text-lg italic leading-relaxed text-[#3E6290]">{product.shortDescription}</p>
                    <Link
                      to={`/products/?category=${product.id}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1D7CF2] hover:text-[#1C3D73]"
                    >
                      View range <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#CFE5FB] shadow-xl shadow-[#1D7CF2]/10">
                    <ProductImage
                      categoryId={product.id}
                      slug={product.slug}
                      name={product.image.alt}
                      width={1000}
                      className="!aspect-auto h-full w-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <Link to="/products/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1C3D73] hover:text-[#1D7CF2]">
              Open the full catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* CAPABILITIES (redesigned) */}
        <CapabilitiesSection />

        {/* WHY (redesigned) */}
        <WhySection />

        {/* HOW WE WORK: staggered step cards with ghost numbers */}
        <section className="overflow-hidden py-20 lg:py-28" style={GRID_PAPER}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Pill>How we work</Pill>
                <h2 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  A simple <span className="text-[#1D7CF2]">process</span> for exact results.
                </h2>
              </div>
              <p className="leading-relaxed text-[#3E6290] lg:col-span-5">
                From your first drawing to the delivered part, we keep the steps short and the
                communication clear.
              </p>
            </div>

            <ol className="mt-14 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step, i) => (
                <li
                  key={step.title}
                  className={`relative overflow-hidden rounded-3xl border border-[#CFE5FB] bg-white p-3 shadow-lg shadow-[#1D7CF2]/5 ${
                    ['lg:mt-0', 'lg:mt-12', 'lg:mt-24', 'lg:mt-36'][i]
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#1D7CF2]">
                    <Photo slot={step.slot} w={800} />
                  </div>
                  <div className="relative p-4 pb-5">
                    <h3 className="font-display text-lg font-bold">
                      <span className="text-[#1D7CF2]">{i + 1}.</span> {step.title}
                    </h3>
                    <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-[#3E6290]">{step.text}</p>
                    <span className="pointer-events-none absolute -bottom-3 right-2 font-display text-7xl font-extrabold text-[#1D7CF2]/10" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* INDUSTRIES: sticky image + intro on the left, animated accordion on the right */}
        <section className="bg-[#F4FAFF] py-20 lg:py-28" aria-labelledby="industries-heading">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1D7CF2]">Industries we serve</p>
                <h2 id="industries-heading" className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                  Machined parts for demanding industries
                </h2>
                <p className="mt-5 leading-relaxed text-[#3E6290]">
                  From automotive OEMs to electrical equipment and general engineering, JD
                  Associates machines precision components to your drawings. Pick an industry to see
                  how we support it.
                </p>

                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-[#CFE8FF] shadow-xl shadow-[#1D7CF2]/15">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={shownIndustry}
                      className="absolute inset-0"
                      initial={reduced ? false : { opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Photo slot={INDUSTRY_SLOTS[shownIndustry % INDUSTRY_SLOTS.length]} w={1200} />
                    </motion.div>
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1668D0]/70 to-transparent" />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={shownIndustry}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: reduced ? 0 : 0.3 }}
                      className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-[#1C3D73] shadow-md"
                    >
                      {(() => {
                        const I = INDUSTRY_ICONS[shownIndustry] ?? Cog;
                        return <I className="h-4 w-4 text-[#1D7CF2]" strokeWidth={1.75} aria-hidden="true" />;
                      })()}
                      {INDUSTRIES_LIST[shownIndustry]?.title}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <Link to="/contact-us/" className={`${btnBlue} mt-6`}>
                  Request a quote
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ul className="border-t border-[#CFE5FB] lg:col-span-7">
              {INDUSTRIES_LIST.map((industry, i) => {
                const open = openIndustry === i;
                const confirmed = industry.verificationStatus === 'confirmed';
                return (
                  <li key={industry.id} className="relative border-b border-[#CFE5FB]">
                    <span
                      className={`absolute inset-y-0 left-0 w-1 origin-top rounded-full bg-[#1D7CF2] transition-transform duration-300 ${open ? 'scale-y-100' : 'scale-y-0'}`}
                      aria-hidden="true"
                    />
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggleIndustry(i)}
                        aria-expanded={open}
                        aria-controls={`industry-panel-${industry.id}`}
                        id={`industry-trigger-${industry.id}`}
                        className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_2.25rem] items-start gap-2 py-6 pl-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D7CF2]"
                      >
                        <span className="pt-1.5 text-[11px] font-semibold tabular-nums text-[#4F77A3]">I-{String(i + 1).padStart(2, '0')}</span>
                        <span className="min-w-0">
                          <span className={`block font-display text-xl font-bold transition-colors sm:text-2xl ${open ? 'text-[#1D7CF2]' : 'group-hover:text-[#1D7CF2]'}`}>
                            {industry.title}
                          </span>
                          {!open && <span className="mt-1 block truncate text-sm text-[#3E6290]">{industry.description}</span>}
                        </span>
                        <span
                          className={`mt-1 flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                            open ? 'border-[#1D7CF2] bg-[#1D7CF2] text-white' : 'border-[#CFE5FB] bg-white text-[#1C3D73] group-hover:border-[#1D7CF2]'
                          }`}
                        >
                          {open ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`industry-panel-${industry.id}`}
                          role="region"
                          aria-labelledby={`industry-trigger-${industry.id}`}
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-[calc(1rem+3rem+0.5rem)] pr-12">
                            <p className="leading-relaxed text-[#3E6290]">{industry.description}</p>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${confirmed ? 'text-[#1D7CF2]' : 'text-[#4F77A3]'}`}>
                                {confirmed ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <AlertCircle className="h-4 w-4" aria-hidden="true" />}
                                {industry.verificationLabel}
                              </span>
                              <span className="flex items-center gap-5 text-xs font-bold">
                                <Link to="/industries/" className="inline-flex items-center gap-1.5 text-[#1D7CF2] hover:text-[#1668D0]">
                                  Explore applications <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </Link>
                                <Link to="/contact-us/" className="inline-flex items-center gap-1.5 text-[#1D7CF2] hover:text-[#1668D0]">
                                  Request quote <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </Link>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* QUALITY */}
        <section className="py-20 lg:py-28" style={GRID_PAPER} aria-labelledby="quality-heading">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
            <div className="lg:col-span-7">
              <Pill>Our commitment to quality</Pill>
              <h2 id="quality-heading" className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                Quality is <span className="text-[#1D7CF2]">built in</span> at every stage
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-[#3E6290]">
                Our inspection department monitors components using dedicated inspection equipment
                and quality control practices.
              </p>
              <ul className="mt-7 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {['ISO 9001:2015 Certification', 'Digital Profile Projector', 'Surface Roughness Tester', 'Hardness Tester', 'Precision Inspection Facilities'].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-[#CFE5FB] py-3.5 text-sm font-semibold">
                    <span className="h-2 w-2 rounded-full bg-[#1D7CF2]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#1D7CF2] p-4 text-center text-white shadow-xl shadow-[#1D7CF2]/20 sm:p-6">
                <div className="overflow-hidden rounded-2xl border border-white/40 bg-white p-2 shadow-lg">
                  <img
                    src="/about/certificate.png"
                    alt="ISO 9001:2015 quality management certificate for J.D. Associates"
                    loading="lazy"
                    decoding="async"
                    className="mx-auto block h-[300px] w-full object-contain sm:h-[360px] lg:h-[400px]"
                  />
                </div>
                <Link to="/about-us/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  View company quality <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE: panel with dot bullets */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="infrastructure-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid overflow-hidden border border-[#CFE5FB] lg:grid-cols-12">
              <div className="bg-[#CFE8FF] p-8 text-[#1C3D73] sm:p-12 lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D7CF2]">Our facilities</p>
                <h2 id="infrastructure-heading" className="mt-4 font-serif text-4xl font-medium leading-[1.05] sm:text-5xl">
                  Infrastructure that <em className="text-[#1D7CF2]">supports precision</em>
                </h2>
                <p className="mt-5 text-xs leading-relaxed text-[#3E6290]">
                  Facility photographs will be added from approved company assets.
                </p>
              </div>
              <ul className="grid gap-x-8 bg-gradient-to-br from-white to-[#E6F3FF] p-8 sm:grid-cols-2 sm:p-12 lg:col-span-7">
                {[
                  ['CNC Machining Setup', ''],
                  ['Shop Floor', ''],
                  ['Assembly Area', ''],
                  ['Laser Machine', ''],
                  ['350 Ton Hydraulic Press', '350 Ton'],
                  ['Mechanical Press', ''],
                  ['Welding SPM Machine', ''],
                  ['Metrology Support', ''],
                  ['Power Backup', 'Two DG sets, 380 KVA each'],
                ].map(([item, note]) => (
                  <li key={item} className="flex items-start gap-3 border-b border-[#CFE5FB] py-3.5">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1D7CF2]" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold">{item}</span>
                      {note && <span className="block text-xs text-[#4F77A3]">{note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CUSTOMERS */}
        <section className="py-16" style={GRID_PAPER} aria-labelledby="customers-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="customers-heading" className="text-center font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Trusted by industry <span className="text-[#1D7CF2]">leaders</span>
            </h2>
            <ul className="mt-10 grid grid-cols-2 border-l border-t border-[#CFE5FB] bg-white sm:grid-cols-4">
              {CUSTOMER_LOGOS.map((client) => (
                <li key={client.name} className="flex min-h-24 items-center justify-center border-b border-r border-[#CFE5FB] bg-white p-4">
                  <img
                    src={client.src}
                    alt={`${client.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-[#4F77A3]">
              Client logos are shown for company-profile reference.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Pill>FAQ</Pill>
                <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-5xl">
                  Questions <span className="text-[#1D7CF2]">buyers</span> ask
                </h2>
                <p className="mt-4 leading-relaxed text-[#3E6290]">Not here? Send us your drawing and we will answer directly.</p>
                <Link to="/contact-us/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1D7CF2] hover:text-[#1C3D73]">
                  Contact our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={HOME_FAQS} />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#1D7CF2] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              Have a drawing? Let&apos;s make it.
            </h2>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-white/85">
                Share your drawings and component requirements. We will review them and suggest the
                right machining approach.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact-us/" className={btnLight}>
                  Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/contact-us/" className="inline-flex items-center border border-white/60 px-7 py-4 text-sm font-bold transition hover:bg-white/10">
                  Contact our team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}