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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.replace(/\/$/, ''));
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#E2E8F0] bg-white shadow-[0_1px_12px_rgba(16,42,67,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] rounded-md"
        >
          <img
            src="/logo.png"
            alt="J.D. Associates"
            className="h-17 w-auto shrink-0 rounded-md p-0.5"
          />
        </Link>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] rounded-xs ${
                  active ? 'text-[#B5472A]' : 'text-[#263445] hover:text-[#0869A8]'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#E45532]"
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
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 text-[#FFFFFF] bg-[#E45532] hover:bg-[#CE4729] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2"
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
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#102A43] transition-colors hover:bg-[#F5F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8]"
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
                        ? 'bg-[#EAF3FF] text-[#0869A8] font-semibold'
                        : 'text-[#263445] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/contact-us/"
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0869A8] hover:bg-[#102A43] rounded-lg transition-colors"
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
