import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_FACTS, PRODUCT_CATEGORIES } from '../data/companyData';

/* Footer: deep blue background, light-blue accents, glass CTA card, link columns, contact details. */

const ACCENT = '#7DD3FC'; // light blue accent

const linkClass =
  'group inline-flex items-center gap-2 rounded text-sm text-white/70 transition-colors hover:text-[#7DD3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]';

const headingClass =
  'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7DD3FC] after:h-px after:w-8 after:bg-[#7DD3FC]/40';

const iconBox =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#7DD3FC] ring-1 ring-white/10 transition-colors group-hover:bg-[#7DD3FC] group-hover:text-[#075B91]';

export function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about-us/', label: 'About Us' },
    { to: '/products/', label: 'Products' },
    { to: '/industries/', label: 'Industries' },
    { to: '/contact-us/', label: 'Contact Us' },
  ];

  const contactRows = [
    { icon: Phone, label: 'Phone', value: '9810170102', href: 'tel:+919810170102' },
    { icon: Mail, label: 'Email', value: 'JDCNC2010@gmail.com', href: 'mailto:JDCNC2010@gmail.com' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#075B91] to-[#05466F] text-white">
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Soft light-blue glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7DD3FC]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-[#7DD3FC]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA CARD */}
        <div className="-mb-2 translate-y-0 pt-12 lg:pt-16">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-xl shadow-black/10 backdrop-blur-sm sm:p-8 lg:flex-row lg:items-center lg:p-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-[#7DD3FC]/40 bg-[#7DD3FC]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#7DD3FC]">
                Free feasibility review
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Have a drawing? <span className="text-[#7DD3FC]">Let&apos;s quote it.</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                Send your 2D or 3D drawing for a feasibility review and an accurate CNC/VMC quote.
              </p>
            </div>
            <Link
              to="/contact-us/"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#7DD3FC] px-7 py-4 text-sm font-semibold text-[#06385A] shadow-lg shadow-[#7DD3FC]/20 transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]"
            >
              Request a quote
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* LINK COLUMNS */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Identity */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]"
            >
              <img
                src="/logo.png"
                alt="J.D. Associates"
                className="h-16 w-auto rounded-lg bg-white p-1.5 shadow-md"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Precision engineering and manufacturing of machined components, assemblies and
              custom parts in accordance with customer drawings and specifications.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['CNC', 'VMC', 'Custom parts'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className={headingClass}>Quick links</h3>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-white/30 transition-all group-hover:w-5 group-hover:bg-[#7DD3FC]"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Products" className="lg:col-span-3">
            <h3 className={headingClass}>Product categories</h3>
            <ul className="mt-6 space-y-3">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={`/products/?category=${category.id}`} className={linkClass}>
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-white/30 transition-all group-hover:w-5 group-hover:bg-[#7DD3FC]"
                    />
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Contact</h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7DD3FC] text-[#075B91]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-white/80">
                  {COMPANY_FACTS.address.line}{' '}
                  <span className="text-[#7DD3FC]">({COMPANY_FACTS.address.statusLabel})</span>
                </span>
              </li>
              {contactRows.map((row) => (
                <li key={`${row.label}-${row.value}`}>
                  <a
                    href={row.href}
                    className="group flex items-start gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                  >
                    <span className={iconBox}>
                      <row.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 leading-relaxed">
                      <span className="block text-xs text-white/50">{row.label}</span>
                      <span className="break-words text-white/85 transition-colors group-hover:text-[#7DD3FC]">
                        {row.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEGAL ROW */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>Copyright © 2026 {COMPANY_FACTS.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy/"
              className="rounded transition-colors hover:text-[#7DD3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions/"
              className="rounded transition-colors hover:text-[#7DD3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
            >
              Terms and Conditions
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-semibold text-white/85 transition-colors hover:border-[#7DD3FC] hover:bg-[#7DD3FC] hover:text-[#075B91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}