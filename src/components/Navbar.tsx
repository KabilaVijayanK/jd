import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

/* Navbar: white glass bar, light-blue (#7DD3FC) accents, pill active state, shadow on scroll. */

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us/' },
  { label: 'Products', to: '/products/' },
  { label: 'Facilities', to: '/facilities/' },
  { label: 'Industries', to: '/industries/' },
  { label: 'Contact Us', to: '/contact-us/' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.replace(/\/$/, ''));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'border-[#7DD3FC]/40 shadow-[0_8px_24px_rgba(8,105,168,0.10)]'
          : 'border-[#E2E8F0] shadow-[0_1px_12px_rgba(16,42,67,0.04)]'
      }`}
    >
      {/* Thin light-blue accent line on top */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#0869A8] via-[#7DD3FC] to-[#0869A8]"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Zone 1: Brand */}
        <Link
          to="/"
          className="flex shrink-0 items-center whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
        >
          <img
            src="/logo.png"
            alt="J.D. Associates"
            className="h-12 w-auto shrink-0 rounded-md p-0.5 lg:h-14"
          />
        </Link>

        {/* Zone 2: Navigation */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${
                  active ? 'text-[#075B91]' : 'text-[#263445] hover:text-[#0869A8]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#7DD3FC]/25 ring-1 ring-[#7DD3FC]/60"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/contact-us/"
            className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#7DD3FC] px-5 py-2.5 text-sm font-semibold text-[#06385A] shadow-md shadow-[#7DD3FC]/30 transition-all hover:-translate-y-0.5 hover:bg-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] focus-visible:ring-offset-2 md:inline-flex"
          >
            <span>Request a Quote</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#7DD3FC]/60 bg-[#7DD3FC]/15 text-[#075B91] transition-colors hover:bg-[#7DD3FC]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] md:hidden"
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
            className="border-b border-[#7DD3FC]/40 bg-white px-4 pb-6 pt-3 shadow-lg md:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      active
                        ? 'bg-[#7DD3FC]/25 font-semibold text-[#075B91] ring-1 ring-[#7DD3FC]/60'
                        : 'text-[#263445] hover:bg-[#F0F9FF]'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#38BDF8]" />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/contact-us/"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#7DD3FC] px-4 py-3 text-sm font-semibold text-[#06385A] shadow-md shadow-[#7DD3FC]/30 transition-colors hover:bg-[#38BDF8]"
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