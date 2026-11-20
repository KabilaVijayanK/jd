import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PlateProps {
  className?: string;
}

type HeroSchematicMode = 'axle' | 'cardan' | 'gears';

const HERO_MODES: { id: HeroSchematicMode; code: string; label: string; spec: string }[] = [
  {
    id: 'axle',
    code: '01',
    label: 'EV Axle Shafts',
    spec: '17" · 17.2" · 17.5" · 18" · 18.5" Series',
  },
  {
    id: 'cardan',
    code: '02',
    label: 'Cardan & Metal Shafts',
    spec: 'RMU Welding Shaft · Shaft 6134 · EV Exel',
  },
  {
    id: 'gears',
    code: '03',
    label: 'Cams, Gears & Rods',
    spec: 'CNC & VMC Drawing-Led Profiles',
  },
];

export function HeroEngineeringPlate() {
  const prefersReduced = useReducedMotion();
  const [mode, setMode] = useState<HeroSchematicMode>('axle');
  const activeMeta = HERO_MODES.find((m) => m.id === mode) || HERO_MODES[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Open Architectural Blueprint Frame (No Card Box / No Drop Shadow) */}
      <div className="relative flex-1 min-h-[340px] lg:min-h-[410px] border-t border-b border-[#CBD5E1] bg-[#F8FBFF]/75 overflow-hidden">
        {/* Blueprint micro-grid */}
        <div className="absolute inset-0 engineering-subgrid-bg opacity-80" />

        {/* Architectural Registration Crosshairs */}
        <span aria-hidden="true" className="absolute top-2.5 left-3 font-mono text-xs text-[#2878D0]">+</span>
        <span aria-hidden="true" className="absolute top-2.5 right-3 font-mono text-xs text-[#2878D0]">+</span>
        <span aria-hidden="true" className="absolute bottom-2.5 left-3 font-mono text-xs text-[#2878D0]">+</span>
        <span aria-hidden="true" className="absolute bottom-2.5 right-3 font-mono text-xs text-[#2878D0]">+</span>

        {/* Top Blueprint Telemetry Header (Strictly Factual) */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-4 pb-2 border-b border-[#E2E8F0]/80 text-[11px] font-mono text-[#64748B]">
          <span>CAD SCHEMATIC · {activeMeta.label.toUpperCase()}</span>
          <span className="text-[#155EEF] font-medium">{activeMeta.spec}</span>
        </div>

        {/* Interactive Schematic Viewport */}
        <div className="relative z-10 w-full h-[290px] sm:h-[330px] lg:h-[350px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.svg
              key={mode}
              viewBox="0 0 640 360"
              className="w-full h-full max-h-[340px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="img"
              aria-label={`Precision engineering schematic for ${activeMeta.label}`}
            >
              <defs>
                <linearGradient id="heroSteelBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="30%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
                <linearGradient id="heroSteelFlange" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="55%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
              </defs>

              {/* Centerline & Vertical Datum Axes */}
              <line x1="32" y1="180" x2="608" y2="180" stroke="#155EEF" strokeWidth="1" strokeDasharray="10 5 2 5" opacity="0.55" />
              <line x1="160" y1="36" x2="160" y2="324" stroke="#2878D0" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
              <line x1="480" y1="36" x2="480" y2="324" stroke="#2878D0" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />

              {mode === 'axle' && (
                <g>
                  {/* Dimension Span Line */}
                  <path d="M90 68 H550" stroke="#102A43" strokeWidth="1" opacity="0.5" />
                  <path d="M90 61 V75 M550 61 V75" stroke="#102A43" strokeWidth="1.2" opacity="0.6" />
                  <text x="320" y="58" textAnchor="middle" fill="#102A43" fontSize="11" fontFamily="IBM Plex Mono, monospace" fontWeight="500">
                    EV REAR AXLE SHAFT · DRAWING-MATCHED PROFILE
                  </text>

                  {/* Flange Hub */}
                  <rect x="90" y="102" width="24" height="156" rx="2" fill="url(#heroSteelFlange)" stroke="#102A43" strokeWidth="1.5" />
                  <circle cx="102" cy="124" r="5" fill="#102A43" opacity="0.7" />
                  <circle cx="102" cy="236" r="5" fill="#102A43" opacity="0.7" />
                  <rect x="114" y="132" width="46" height="96" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />

                  {/* Bearing Journal */}
                  <rect x="160" y="146" width="76" height="68" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                  <line x1="170" y1="146" x2="170" y2="214" stroke="#155EEF" strokeWidth="1.2" opacity="0.55" />

                  {/* Central Body */}
                  <rect x="236" y="156" width="188" height="48" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                  <polygon points="236,146 244,156 244,204 236,214" fill="#94A3B8" stroke="#102A43" strokeWidth="1.2" />

                  {/* Right Bearing Seat & Splines */}
                  <rect x="424" y="148" width="56" height="64" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                  <rect x="480" y="158" width="52" height="44" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                  {[164, 170, 176, 182, 188, 194].map((y) => (
                    <line key={y} x1="484" y1={y} x2="528" y2={y} stroke="#102A43" strokeWidth="1.15" opacity="0.75" />
                  ))}

                  {/* Threaded End */}
                  <rect x="532" y="165" width="18" height="30" rx="1" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.4" />
                  {[536, 540, 544, 548].map((x) => (
                    <line key={x} x1={x} y1="165" x2={x - 2} y2="195" stroke="#102A43" strokeWidth="1" opacity="0.7" />
                  ))}

                  {/* Animated CNC Inspection Probe */}
                  {!prefersReduced && (
                    <motion.g
                      animate={{ x: [0, 260, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <line x1="185" y1="115" x2="185" y2="245" stroke="#155EEF" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="185" cy="156" r="4.5" fill="#155EEF" />
                      <circle cx="185" cy="156" r="10" stroke="#155EEF" strokeWidth="1" opacity="0.4" />
                    </motion.g>
                  )}

                  {/* Bottom Engineering Callouts */}
                  <text x="198" y="295" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                    BEARING JOURNAL
                  </text>
                  <text x="506" y="295" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                    SPLINED OUTPUT
                  </text>
                </g>
              )}

              {mode === 'cardan' && (
                <g>
                  <text x="320" y="58" textAnchor="middle" fill="#102A43" fontSize="11" fontFamily="IBM Plex Mono, monospace" fontWeight="500">
                    CARDAN &amp; WELDING SHAFT ASSEMBLY · RMU / 6134
                  </text>

                  {/* Left Coupling Yoke */}
                  <path d="M96 122 H152 V238 H96 Z" fill="url(#heroSteelFlange)" stroke="#102A43" strokeWidth="1.5" />
                  <circle cx="124" cy="180" r="22" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.8" />
                  <circle cx="124" cy="180" r="8" fill="#102A43" />

                  {/* Stepped Central Coupling Tube */}
                  <rect x="152" y="152" width="56" height="56" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                  <rect x="208" y="160" width="224" height="40" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                  <line x1="234" y1="160" x2="234" y2="200" stroke="#155EEF" strokeWidth="1.3" opacity="0.65" />
                  <line x1="406" y1="160" x2="406" y2="200" stroke="#155EEF" strokeWidth="1.3" opacity="0.65" />
                  <rect x="432" y="152" width="56" height="56" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />

                  {/* Right Coupling Yoke */}
                  <path d="M488 122 H544 V238 H488 Z" fill="url(#heroSteelFlange)" stroke="#102A43" strokeWidth="1.5" />
                  <circle cx="516" cy="180" r="22" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.8" />
                  <circle cx="516" cy="180" r="8" fill="#102A43" />

                  <text x="320" y="295" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                    BALANCED TORQUE TRANSMISSION · STEELS &amp; ALLOYS
                  </text>
                </g>
              )}

              {mode === 'gears' && (
                <g>
                  <text x="320" y="58" textAnchor="middle" fill="#102A43" fontSize="11" fontFamily="IBM Plex Mono, monospace" fontWeight="500">
                    CAMS, GEARS &amp; CONNECTING ROD GEOMETRY
                  </text>

                  {/* Rotating Precision Gear */}
                  <motion.g
                    style={{ transformOrigin: '190px 180px' }}
                    animate={prefersReduced ? undefined : { rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="190" cy="180" r="64" fill="url(#heroSteelFlange)" stroke="#102A43" strokeWidth="1.6" />
                    <circle cx="190" cy="180" r="26" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.6" />
                    <circle cx="190" cy="180" r="8" fill="#102A43" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1={190 + 60 * Math.cos((deg * Math.PI) / 180)}
                        y1={180 + 60 * Math.sin((deg * Math.PI) / 180)}
                        x2={190 + 74 * Math.cos((deg * Math.PI) / 180)}
                        y2={180 + 74 * Math.sin((deg * Math.PI) / 180)}
                        stroke="#102A43"
                        strokeWidth="5.5"
                      />
                    ))}
                  </motion.g>

                  {/* Connecting Rod Profile */}
                  <g transform="translate(310, 180)">
                    <circle cx="38" cy="0" r="36" fill="url(#heroSteelFlange)" stroke="#102A43" strokeWidth="1.5" />
                    <circle cx="38" cy="0" r="19" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
                    <polygon points="70,-16 184,-10 184,10 70,16" fill="url(#heroSteelBody)" stroke="#102A43" strokeWidth="1.5" />
                    <circle cx="204" cy="0" r="21" fill="url(#heroSteelFlange)" stroke="#102A43" strokeWidth="1.5" />
                    <circle cx="204" cy="0" r="9.5" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
                  </g>

                  <text x="190" y="295" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                    GEAR TOOTH PROFILE
                  </text>
                  <text x="430" y="295" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                    CENTER-TO-CENTER BORE
                  </text>
                </g>
              )}
            </motion.svg>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Interactive Mode Switcher Strip (Flat Architectural Tabs, Zero Cards) */}
      <div
        role="tablist"
        aria-label="Inspect manufacturing schematics"
        className="grid grid-cols-3 border-b border-[#CBD5E1] bg-white"
      >
        {HERO_MODES.map((item) => {
          const active = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(item.id)}
              className={`relative px-3 sm:px-4 py-3.5 text-left transition-colors border-r last:border-r-0 border-[#E2E8F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#155EEF] ${
                active ? 'bg-[#EAF3FF]/70' : 'hover:bg-[#F5F8FC]'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="hero-schematic-bar"
                  className="absolute inset-x-0 top-0 h-0.5 bg-[#155EEF]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="block font-mono text-[10px] text-[#64748B] tabular-nums">
                {item.code}
              </span>
              <span
                className={`block font-display text-xs sm:text-sm font-semibold truncate ${
                  active ? 'text-[#155EEF]' : 'text-[#102A43]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CncVmcFloorPlate() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="relative w-full aspect-[16/10] border-t border-b border-[#CBD5E1] bg-[#F8FBFF] overflow-hidden select-none"
      role="img"
      aria-label="CNC and VMC machining center schematic illustrating multi-axis turning and vertical milling capability"
    >
      <div className="absolute inset-0 engineering-grid-bg opacity-90" />
      <span aria-hidden="true" className="absolute top-2.5 left-3 font-mono text-xs text-[#2878D0]">+</span>
      <span aria-hidden="true" className="absolute top-2.5 right-3 font-mono text-xs text-[#2878D0]">+</span>
      <svg viewBox="0 0 640 400" className="relative z-10 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="44" y="36" width="552" height="328" fill="#FFFFFF" fillOpacity="0.88" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="64" y="56" width="320" height="240" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.4" />

        <motion.g
          animate={prefersReduced ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="196" y="72" width="56" height="58" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.4" />
          <rect x="210" y="130" width="28" height="28" fill="#94A3B8" stroke="#102A43" strokeWidth="1.3" />
          <polygon points="218,158 230,158 224,182" fill="#155EEF" />
        </motion.g>

        <rect x="120" y="216" width="208" height="36" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.4" />
        <rect x="136" y="200" width="176" height="16" fill="#155EEF" fillOpacity="0.16" stroke="#155EEF" strokeWidth="1.2" />
        <line x1="92" y1="252" x2="356" y2="252" stroke="#102A43" strokeWidth="2" />

        <path d="M136 184 H312" stroke="#155EEF" strokeWidth="1.2" strokeDasharray="5 4" />
        <circle cx="224" cy="184" r="3.5" fill="#155EEF" />

        <rect x="404" y="56" width="172" height="240" fill="#F5F8FC" stroke="#CBD5E1" strokeWidth="1.4" />
        <rect x="422" y="74" width="136" height="92" fill="#102A43" />
        <path d="M442 120 H538 M490 92 V148" stroke="#2878D0" strokeWidth="1" opacity="0.6" />
        <rect x="454" y="108" width="72" height="24" stroke="#60A5FA" strokeWidth="1.5" />
        <text x="434" y="92" fill="#93C5FD" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          CNC / VMC
        </text>

        {[
          { label: 'FANUC', x: 422, y: 184 },
          { label: 'LMW', x: 494, y: 184 },
          { label: 'ACE', x: 422, y: 232 },
          { label: 'JYOTI', x: 494, y: 232 },
        ].map((item) => (
          <g key={item.label}>
            <rect x={item.x} y={item.y} width="64" height="36" fill="#FFFFFF" stroke="#D6E4FF" />
            <text
              x={item.x + 32}
              y={item.y + 22}
              textAnchor="middle"
              fill="#102A43"
              fontSize="10.5"
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="600"
            >
              {item.label}
            </text>
          </g>
        ))}

        <rect x="64" y="312" width="512" height="34" fill="#EAF3FF" stroke="#D6E4FF" />
        <text x="320" y="333" textAnchor="middle" fill="#102A43" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">
          Machined Materials: Steel · Stainless Steel · Brass · Copper · Aluminium
        </text>
      </svg>
    </div>
  );
}

export function ProductSchematicPlate({ categoryId, className = '' }: { categoryId: string } & PlateProps) {
  const prefersReduced = useReducedMotion();

  const renderSchematic = () => {
    switch (categoryId) {
      case 'axle-shafts':
        return (
          <g>
            <line x1="24" y1="120" x2="376" y2="120" stroke="#155EEF" strokeWidth="1" strokeDasharray="6 4 2 4" opacity="0.55" />
            <rect x="52" y="72" width="18" height="96" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <rect x="70" y="96" width="44" height="48" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <rect x="114" y="104" width="168" height="32" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <rect x="282" y="98" width="38" height="44" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <rect x="320" y="106" width="36" height="28" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
            {[111, 116, 120, 124, 129].map((y) => (
              <line key={y} x1="324" y1={y} x2="352" y2={y} stroke="#102A43" strokeWidth="1" />
            ))}
            <path d="M52 54 H356" stroke="#155EEF" strokeWidth="1.1" />
            <path d="M52 48 V60 M356 48 V60" stroke="#155EEF" strokeWidth="1.2" />
            <text x="204" y="46" textAnchor="middle" fill="#155EEF" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="500">
              17&quot; – 18.5&quot; EV AXLE SERIES
            </text>
          </g>
        );
      case 'metal-shafts':
        return (
          <g>
            <line x1="24" y1="120" x2="376" y2="120" stroke="#155EEF" strokeWidth="1" strokeDasharray="6 4 2 4" opacity="0.55" />
            <rect x="64" y="98" width="54" height="44" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <rect x="118" y="88" width="92" height="64" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <rect x="210" y="100" width="84" height="40" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <rect x="294" y="107" width="44" height="26" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
            <line x1="148" y1="88" x2="148" y2="152" stroke="#155EEF" strokeWidth="1.2" opacity="0.6" />
            <line x1="180" y1="88" x2="180" y2="152" stroke="#155EEF" strokeWidth="1.2" opacity="0.6" />
            <text x="200" y="182" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              EXEL &amp; STEPPED PRECISION SHAFTS
            </text>
          </g>
        );
      case 'cardan-shafts':
        return (
          <g>
            <line x1="24" y1="120" x2="376" y2="120" stroke="#155EEF" strokeWidth="1" strokeDasharray="6 4 2 4" opacity="0.55" />
            <path d="M58 84 H96 V156 H58 Z" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <circle cx="77" cy="120" r="14" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
            <circle cx="77" cy="120" r="5" fill="#102A43" />
            <rect x="96" y="102" width="208" height="36" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <line x1="126" y1="102" x2="126" y2="138" stroke="#155EEF" strokeWidth="1.2" />
            <line x1="274" y1="102" x2="274" y2="138" stroke="#155EEF" strokeWidth="1.2" />
            <path d="M304 84 H342 V156 H304 Z" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <circle cx="323" cy="120" r="14" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
            <circle cx="323" cy="120" r="5" fill="#102A43" />
            <text x="200" y="182" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              RMU WELDING SHAFT · SHAFT 6134
            </text>
          </g>
        );
      case 'connecting-rods':
        return (
          <g>
            <line x1="24" y1="120" x2="376" y2="120" stroke="#155EEF" strokeWidth="1" strokeDasharray="6 4 2 4" opacity="0.55" />
            <circle cx="114" cy="120" r="44" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <circle cx="114" cy="120" r="24" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
            <polygon points="152,102 268,108 268,132 152,138" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <line x1="166" y1="120" x2="254" y2="120" stroke="#102A43" strokeWidth="1.2" opacity="0.5" />
            <circle cx="290" cy="120" r="24" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <circle cx="290" cy="120" r="11" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
            <path d="M114 60 H290" stroke="#155EEF" strokeWidth="1" />
            <path d="M114 54 V66 M290 54 V66" stroke="#155EEF" strokeWidth="1.1" />
            <text x="202" y="48" textAnchor="middle" fill="#155EEF" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              CENTER-TO-CENTER BORE GEOMETRY
            </text>
          </g>
        );
      case 'cams-and-gears':
        return (
          <g>
            <motion.g
              style={{ transformOrigin: '148px 120px' }}
              animate={prefersReduced ? undefined : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="148" cy="120" r="46" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
              <circle cx="148" cy="120" r="20" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1={148 + 43 * Math.cos((deg * Math.PI) / 180)}
                  y1={120 + 43 * Math.sin((deg * Math.PI) / 180)}
                  x2={148 + 53 * Math.cos((deg * Math.PI) / 180)}
                  y2={120 + 53 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#102A43"
                  strokeWidth="4"
                />
              ))}
            </motion.g>
            <path
              d="M258 84 C290 84 316 100 316 120 C316 140 290 156 258 156 C242 156 232 142 232 120 C232 98 242 84 258 84 Z"
              fill="#F8FAFC"
              stroke="#102A43"
              strokeWidth="1.5"
            />
            <circle cx="262" cy="120" r="14" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
            <text x="200" y="194" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              PRECISION CAMS &amp; GEAR PROFILES
            </text>
          </g>
        );
      default:
        return (
          <g>
            <rect x="64" y="146" width="272" height="24" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
            <rect x="92" y="112" width="120" height="34" fill="#F8FAFC" stroke="#102A43" strokeWidth="1.5" />
            <rect x="110" y="78" width="22" height="34" fill="#155EEF" fillOpacity="0.2" stroke="#155EEF" strokeWidth="1.5" />
            <rect x="172" y="78" width="22" height="34" fill="#155EEF" fillOpacity="0.2" stroke="#155EEF" strokeWidth="1.5" />
            <rect x="234" y="88" width="76" height="58" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
            <circle cx="272" cy="117" r="14" fill="#FFFFFF" stroke="#155EEF" strokeWidth="1.5" />
            <text x="200" y="196" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              JIG FIXTURES &amp; RECEIVING GAUGES
            </text>
          </g>
        );
    }
  };

  return (
    <div
      className={`relative w-full aspect-[4/3] bg-[#F8FBFF] overflow-hidden select-none ${className}`}
    >
      <div className="absolute inset-0 engineering-grid-bg opacity-85" />
      <svg
        viewBox="0 0 400 240"
        className="relative z-10 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderSchematic()}
      </svg>
    </div>
  );
}
