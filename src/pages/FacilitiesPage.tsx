import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Power,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageShell, RevealBlock } from '../components/MotionPrimitives';

/* ------------------------------------------------------------------ */
/*  Image paths may be local public assets or Unsplash photo IDs. */
/* ------------------------------------------------------------------ */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const imageUrl = (source: string, width = 1600) =>
  source.startsWith('/') ? source : U(source, width);

const IMG = {
  hero: '/facility/set1.jpeg',
  setupA: '/facility/set1.jpeg',
  setupB: '/facility/set2.jpeg',
  floorA: '/facility/set1.jpeg',
  floorB: '/facility/mech3.jpeg',
  assemblyA: '/facility/ass1.jpeg',
  assemblyB: '/facility/ass2.jpeg',
  laser: '/facility/laser.jpeg',
  welding: '/facility/welding.jpeg',
  pressA: '/facility/hydralic.jpeg',
  pressB: '/facility/mech2.jpeg',
  metro1: '/metro/metro1.png',
  metro2: '/metro/metro2.png',
  metro3: '/metro/metro3.png',
  metro4: '/metro/metro4.png',
  power: 'photo-1473341304170-971dccb5ac1e',
  cta: 'photo-1504328345606-18bbc8c9d7d1',
} as const;

type Shot = {
  id: string;
  title: string;
  caption: string;
  img: string;
};

const shot = (id: string, title: string, caption: string, img: string): Shot => ({
  id,
  title,
  caption,
  img,
});

const setup = [
  shot('manufacturing-setup', 'Manufacturing setup', 'Machining infrastructure', IMG.setupA),
  shot('machining-area', 'Machining area', 'Production equipment', IMG.setupB),
];

const assembly = [
  shot('assembly-area', 'Assembly area', 'Dedicated assembly facilities', IMG.assemblyA),
  shot('assembly-workstations', 'Assembly workstations', 'Component handling and assembly', IMG.assemblyB),
];
const specialised = [
  shot('laser-machine', 'Laser Machine – Weldarc', 'Laser processing', IMG.laser),
  shot('welding-spm', 'Welding SPM Machine', 'Specialised welding', IMG.welding),
];
const presses = [
  shot('hydraulic-press', '350 Ton Hydraulic Press', 'Hydraulic pressing', IMG.pressA),
  shot('mechanical-press', 'Mechanical Press', 'Mechanical pressing', IMG.pressB),
];
const metrology = [
  shot('profile-projector', 'Digital Profile Projector', 'Profile & dimension checks', IMG.metro1),
  shot('surface-roughness', 'Surface Roughness Tester', 'Surface finish verification', IMG.metro2),
  shot('hardness-tester', 'Hardness Tester', 'Material hardness testing', IMG.metro3),
  shot('precision-inspection', 'Precision Inspection Facilities', 'In-process inspection', IMG.metro4),
];

const allShots: Shot[] = [...setup, ...assembly, ...specialised, ...presses, ...metrology];

const chapters = [
  { id: 'manufacturing-setup', no: '01', label: 'Setup' },
  { id: 'shop-floor', no: '02', label: 'Shop floor' },
  { id: 'assembly-area', no: '03', label: 'Assembly' },
  { id: 'specialised-equipment', no: '04', label: 'Laser & welding' },
  { id: 'press-facilities', no: '05', label: 'Presses' },
  { id: 'metrology', no: '06', label: 'Inspection' },
  { id: 'power-backup', no: '07', label: 'Power' },
];

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */
function Photo({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-[#17638C] via-[#14263A] to-[#0B1C2C] ${className}`}
        role="img"
        aria-label={alt}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function ShotTile({
  item,
  onOpen,
  className = '',
  tall = false,
}: {
  item: Shot;
  onOpen: (s: Shot) => void;
  className?: string;
  tall?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-haspopup="dialog"
      aria-label={`View ${item.title}`}
      className={`group relative block w-full overflow-hidden rounded-[1.75rem] bg-[#0B1C2C] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-4 ${
        tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
      } ${className}`}
    >
      <Photo
        src={imageUrl(item.img)}
        alt={item.title}
        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/85 via-[#0B1C2C]/10 to-transparent" aria-hidden="true" />
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#14263A] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38BDF8]">{item.caption}</p>
        <p className="mt-1 font-display text-lg font-bold leading-snug text-white">{item.title}</p>
      </div>
    </button>
  );
}

function Chapter({
  id,
  no,
  eyebrow,
  title,
  text,
  children,
  flip = false,
}: {
  id: string;
  no: string;
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <RevealBlock className={`lg:col-span-4 ${flip ? 'lg:order-2' : ''}`}>
          <div className="lg:sticky lg:top-36">
            <span className="font-display text-[7rem] font-black leading-none tracking-tighter text-[#14263A]/[0.07] sm:text-[9rem]">
              {no}
            </span>
            <p className="-mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#17638C] sm:-mt-10">
              <span className="h-0.5 w-8 bg-[#38BDF8]" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-[#14263A] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 leading-relaxed text-[#52677C]">{text}</p>
          </div>
        </RevealBlock>
        <div className={`lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>{children}</div>
      </div>
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const reduced = useReducedMotion();
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, onStep]);

  const item = index !== null ? allShots[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[#050E17]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="facility-lightbox-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(allShots.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Close preview"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#38BDF8] sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <motion.img
              key={item.id}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={imageUrl(item.img, 2200)}
              alt={item.title}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#38BDF8] sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="px-5 py-6 text-center text-white sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#38BDF8]">{item.caption}</p>
            <h2 id="facility-lightbox-title" className="mt-1 font-display text-xl font-bold sm:text-2xl">
              {item.title}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoBlock() {
  const [status, setStatus] = useState<'preview' | 'playing' | 'error'>('preview');

  if (status === 'playing') {
    return (
      <div className="aspect-video overflow-hidden rounded-[2rem] bg-black shadow-2xl">
        <video
          className="h-full w-full object-contain"
          autoPlay
          controls
          muted
          playsInline
          preload="metadata"
          aria-label="JD Associates shop-floor manufacturing video"
          onError={() => setStatus('error')}
        >
          <source src="/hero%20jd.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStatus('playing')}
      aria-label="Play shop-floor manufacturing video"
      className="group relative block aspect-video w-full overflow-hidden rounded-[2rem] text-left shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-4"
    >
      <Photo
        src={imageUrl(IMG.floorA, 2000)}
        alt="Shop floor"
        className="h-full w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-[#0B1C2C]/45 transition-colors group-hover:bg-[#0B1C2C]/30" aria-hidden="true" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#38BDF8] text-[#0B1C2C] shadow-2xl transition-transform group-hover:scale-110 motion-reduce:transition-none">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#38BDF8]/40 motion-reduce:hidden" aria-hidden="true" />
          <Play className="relative ml-1 h-9 w-9" fill="currentColor" aria-hidden="true" />
        </span>
      </span>
      <span className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#38BDF8]">Shop-floor film</span>
          <span className="mt-1 block font-display text-xl font-bold sm:text-3xl">Inside the manufacturing facility</span>
        </span>
        {status === 'error' && (
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#14263A]">
            Couldn&apos;t load – tap to retry
          </span>
        )}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export function FacilitiesPage() {
  const [active, setActive] = useState<number | null>(null);
  const [current, setCurrent] = useState('manufacturing-setup');
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Facilities', path: '/facilities/' },
  ];

  const open = useCallback((s: Shot) => {
    const i = allShots.findIndex((x) => x.id === s.id);
    setActive(i >= 0 ? i : null);
  }, []);
  const close = useCallback(() => setActive(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setActive((i) => (i === null ? i : (i + dir + allShots.length) % allShots.length));
  }, []);

  // highlight current chapter in sticky nav
  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      { value: '350T', label: 'Hydraulic press' },
      { value: '2 × 380', label: 'KVA DG sets' },
      { value: '760', label: 'KVA combined backup' },
      { value: '4', label: 'Inspection instruments' },
    ],
    [],
  );

  return (
    <PageShell>
      <SeoHead
        title="Manufacturing Facilities & Infrastructure | JD Associates"
        description="Explore JD Associates' manufacturing setup, assembly area, laser equipment, press facilities, metrology support and power backup infrastructure."
        canonicalPath="/facilities/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#F4F9FD] text-[#14263A]">
        {/* HERO – full bleed */}
        <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-[#0B1C2C] pt-32">
          <Photo src={imageUrl(IMG.hero, 2400)} alt="JD Associates manufacturing facility" className="absolute inset-0 -z-10 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1C2C] via-[#0B1C2C]/55 to-[#0B1C2C]/30" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1C2C]/80 to-transparent" aria-hidden="true" />

          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
            <div className="[&_*]:!text-white/70 [&_a:hover]:!text-white">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <RevealBlock>
              <p className="mt-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#38BDF8]">
                <span className="h-0.5 w-10 bg-[#38BDF8]" aria-hidden="true" />
                Our facilities
              </p>
              <h1 className="mt-5 max-w-5xl font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                Where precision
                <br />
                <span className="text-[#38BDF8]">takes shape.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Machining, assembly, laser and welding, presses and inspection – all under one roof at JD Associates.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#manufacturing-setup"
                  className="inline-flex items-center gap-2 rounded-full bg-[#38BDF8] px-7 py-4 text-sm font-bold text-[#0B1C2C] transition-colors hover:bg-white hover:text-[#14263A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore the facility <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contact our team <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </RevealBlock>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#0B1C2C]/70 p-5 sm:p-6">
                  <dt className="font-display text-3xl font-black text-white sm:text-4xl">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-white/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* STICKY CHAPTER NAV */}
        <nav
          aria-label="Facility sections"
          className="sticky top-20 z-30 border-b border-[#14263A]/10 bg-[#F4F9FD]/90 backdrop-blur lg:top-24"
        >
          <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex min-w-max gap-1 py-3">
              {chapters.map((c) => {
                const on = current === c.id;
                return (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      aria-current={on ? 'true' : undefined}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17638C] ${
                        on ? 'bg-[#14263A] text-white' : 'text-[#52677C] hover:bg-[#14263A]/5'
                      }`}
                    >
                      <span className={on ? 'text-[#38BDF8]' : 'text-[#17638C]'}>{c.no}</span>
                      {c.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 01 SETUP */}
          <Chapter
            id="manufacturing-setup"
            no="01"
            eyebrow="Manufacturing setup"
            title="Advanced Manufacturing Setup."
            text="Our manufacturing facility is equipped with machining equipment and production infrastructure to support precision component manufacturing."
          >
            <div className="grid gap-5 sm:grid-cols-5">
              <RevealBlock className="sm:col-span-3">
                <ShotTile item={setup[0]} onOpen={open} className="!aspect-[4/5] sm:!aspect-auto sm:h-full sm:min-h-[26rem]" />
              </RevealBlock>
              <RevealBlock delay={0.08} className="sm:col-span-2 sm:mt-16">
                <ShotTile item={setup[1]} onOpen={open} tall />
              </RevealBlock>
            </div>
          </Chapter>

          {/* 02 SHOP FLOOR */}
          <section id="shop-floor" className="scroll-mt-32 py-16 lg:py-24">
            <RevealBlock className="mx-auto max-w-3xl text-center">
              <span className="font-display text-[7rem] font-black leading-none tracking-tighter text-[#14263A]/[0.07] sm:text-[9rem]">02</span>
              <p className="-mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#17638C] sm:-mt-10">Shop floor</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Inside Our Manufacturing Facility.
              </h2>
              <p className="mt-4 leading-relaxed text-[#52677C]">
                Explore the shop-floor environment, production equipment and manufacturing process.
              </p>
            </RevealBlock>
            <RevealBlock className="mt-10">
              <VideoBlock />
            </RevealBlock>
            
          </section>

          {/* 03 ASSEMBLY */}
          <Chapter
            id="assembly-area"
            no="03"
            eyebrow="Assembly area"
            title="Dedicated Assembly Facilities."
            text="Our assembly area supports component handling and mechanical assembly activities through dedicated workstations and production personnel."
            flip
          >
            <div className="grid gap-5 sm:grid-cols-5">
              <RevealBlock className="sm:col-span-2 sm:mt-16">
                <ShotTile item={assembly[0]} onOpen={open} tall />
              </RevealBlock>
              <RevealBlock delay={0.08} className="sm:col-span-3">
                <ShotTile item={assembly[1]} onOpen={open} className="!aspect-[4/5] sm:!aspect-auto sm:h-full sm:min-h-[26rem]" />
              </RevealBlock>
            </div>
          </Chapter>
        </div>

        {/* 04 + 05 DARK BAND */}
        <div className="bg-[#14263A] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <section id="specialised-equipment" className="scroll-mt-32 py-16 lg:py-24">
              <RevealBlock className="max-w-3xl">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">
                  <span className="h-0.5 w-8 bg-[#38BDF8]" aria-hidden="true" /> 04 · Laser &amp; welding
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Specialised Manufacturing Equipment.
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">
                  Dedicated equipment listed in the company profile supports laser processing and specialised welding operations.
                </p>
              </RevealBlock>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {specialised.map((p, i) => (
                  <RevealBlock key={p.id} delay={i * 0.06}>
                    <ShotTile item={p} onOpen={open} />
                  </RevealBlock>
                ))}
              </div>
            </section>

            <section id="press-facilities" className="scroll-mt-32 border-t border-white/10 py-16 lg:py-24">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                  {presses.map((p, i) => (
                    <RevealBlock key={p.id} delay={i * 0.06} className={i === 1 ? 'sm:mt-12' : ''}>
                      <ShotTile item={p} onOpen={open} tall />
                    </RevealBlock>
                  ))}
                </div>
                <RevealBlock className="lg:col-span-5">
                  <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">
                    <span className="h-0.5 w-8 bg-[#38BDF8]" aria-hidden="true" /> 05 · Press facilities
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                    Press Manufacturing Capabilities.
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/70">
                    The company profile lists a 350 Ton Hydraulic Press and a Mechanical Press.
                  </p>
                  <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                    {presses.map((p) => (
                      <li key={p.id} className="flex items-center justify-between py-4 text-sm">
                        <span className="font-semibold">{p.title}</span>
                        <span className="text-white/50">{p.caption}</span>
                      </li>
                    ))}
                  </ul>
                </RevealBlock>
              </div>
            </section>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 06 METROLOGY */}
          <section id="metrology" className="scroll-mt-32 py-16 lg:py-24">
            <RevealBlock className="max-w-3xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#17638C]">
                <span className="h-0.5 w-8 bg-[#38BDF8]" aria-hidden="true" /> 06 · Metrology &amp; inspection
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Advanced Metrology &amp; Inspection Facilities.
              </h2>
              <p className="mt-4 leading-relaxed text-[#52677C]">
                Dedicated inspection and metrology facilities are used to inspect and monitor components during production.
              </p>
            </RevealBlock>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {metrology.map((p, i) => (
                <RevealBlock key={p.id} delay={i * 0.05} className={i % 2 === 1 ? 'lg:mt-10' : ''}>
                  <ShotTile item={p} onOpen={open} tall />
                </RevealBlock>
              ))}
            </div>
          </section>

          {/* 07 POWER */}
          <section id="power-backup" className="scroll-mt-32 pb-16 lg:pb-24">
            <RevealBlock>
              <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#0B1C2C] p-7 text-white sm:p-12 lg:p-16">
                <Photo src={imageUrl(IMG.power, 2000)} alt="Power infrastructure" className="absolute inset-0 -z-10 h-full w-full opacity-30" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1C2C] via-[#0B1C2C]/85 to-[#0B1C2C]/40" aria-hidden="true" />
                <div className="grid items-end gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">
                      <span className="h-0.5 w-8 bg-[#38BDF8]" aria-hidden="true" /> 07 · Power backup
                    </p>
                    <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                      Reliable Power Backup Infrastructure.
                    </h2>
                    <p className="mt-4 leading-relaxed text-white/75">
                      The manufacturing facility is equipped with two DG sets, each with an individual capacity of 380 KVA.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
                    {[
                      { value: '2', label: 'DG Sets', icon: Power },
                      { value: '380 KVA', label: 'Individual Capacity', icon: Zap },
                      { value: '760 KVA', label: 'Combined Installed Capacity', icon: ShieldCheck },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <div key={s.label} className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur">
                          <Icon className="h-6 w-6 text-[#38BDF8]" aria-hidden="true" />
                          <p className="mt-8 font-display text-3xl font-black">{s.value}</p>
                          <p className="mt-2 text-xs leading-relaxed text-white/65">{s.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </section>

          {/* CTA */}
          <section className="pb-20 lg:pb-28">
            <RevealBlock>
              <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#17638C] p-8 text-white sm:p-12 lg:p-16">
                <Photo src={imageUrl(IMG.cta, 2000)} alt="" className="absolute inset-0 -z-10 h-full w-full opacity-20 mix-blend-luminosity" />
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BAE6FD]">Manufacturing capabilities</p>
                    <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                      Looking for a precision manufacturing partner?
                    </h2>
                    <p className="mt-4 leading-relaxed text-white/85">
                      Connect with JD Associates to discuss your component requirements and explore our manufacturing facilities.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/products/"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#14263A] transition-colors hover:bg-[#F4F9FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Explore Products <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to="/contact-us/"
                      className="inline-flex items-center gap-2 rounded-full bg-[#38BDF8] px-7 py-4 text-sm font-bold text-[#0B1C2C] transition-colors hover:bg-[#0EA5E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </section>
        </div>
      </main>

      <Lightbox index={active} onClose={close} onStep={step} />
    </PageShell>
  );
}