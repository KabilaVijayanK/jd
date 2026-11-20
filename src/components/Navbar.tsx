import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us/' },
  { label: 'Products', to: '/products/' },
  { label: 'Industries', to: '/industries/' },
  { label: 'Contact Us', to: '/contact-us/' },
];

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.replace(/\/$/, ''));
  };

  const solidHeader = !isHome || scrolled || mobileOpen;
  const heroHeader = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        solidHeader
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_1px_12px_rgba(16,42,67,0.04)]'
          : 'bg-[#0E2A2D]/55 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] rounded-md"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="28" height="28" rx="6" fill={heroHeader ? '#D9A441' : '#102A43'} />
            <circle
              cx="14"
              cy="14"
              r="6.5"
              stroke={heroHeader ? '#0E2A2D' : '#EAF3FF'}
              strokeWidth="1.75"
            />
            <circle cx="14" cy="14" r="2.25" fill={heroHeader ? '#0E2A2D' : '#155EEF'} />
            <path
              d="M14 4.5V7.5M14 20.5V23.5M4.5 14H7.5M20.5 14H23.5"
              stroke={heroHeader ? '#0E2A2D' : '#60A5FA'}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <span
            className={`font-display text-lg font-bold tracking-tight whitespace-nowrap shrink-0 ${
              heroHeader ? 'text-white' : 'text-[#102A43]'
            }`}
          >
            J.D. Associates
          </span>
        </Link>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] rounded-xs ${
                  heroHeader
                    ? active
                      ? 'text-[#D9A441]'
                      : 'text-white/85 hover:text-white'
                    : active
                      ? 'text-[#155EEF]'
                      : 'text-[#263445] hover:text-[#155EEF]'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full ${
                      heroHeader ? 'bg-[#D9A441]' : 'bg-[#155EEF]'
                    }`}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact-us/"
            className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              heroHeader
                ? 'text-[#0B1A1C] bg-[#D9A441] hover:bg-white focus-visible:ring-white'
                : 'text-white bg-[#155EEF] hover:bg-[#102A43] focus-visible:ring-[#155EEF]'
            }`}
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 ${
              heroHeader
                ? 'border-white/25 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white'
                : 'border-[#E2E8F0] bg-white text-[#102A43] hover:bg-[#F5F8FC] focus-visible:ring-[#155EEF]'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 shadow-lg"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'bg-[#EAF3FF] text-[#155EEF] font-semibold'
                        : 'text-[#263445] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/contact-us/"
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#155EEF] hover:bg-[#102A43] rounded-lg transition-colors"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
