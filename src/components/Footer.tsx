import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { COMPANY_FACTS, INDUSTRIES_LIST, PRODUCT_CATEGORIES } from '../data/companyData';

/* Footer: blue background, orange quote call-to-action, link columns, and contact details. */

const linkClass =
  'inline-block rounded text-sm text-white/65 transition-colors hover:text-[#E45532] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]';

const headingClass = 'text-xs font-semibold uppercase tracking-wider text-[#E45532]';

export function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about-us/', label: 'About Us' },
    { to: '/products/', label: 'Products' },
    { to: '/industries/', label: 'Industries' },
    { to: '/contact-us/', label: 'Contact Us' },
  ];

  const contactRows = [
    { icon: Phone, label: 'Phone', value: COMPANY_FACTS.contacts.phone },
    { icon: Mail, label: 'Email', value: COMPANY_FACTS.contacts.email },
    { icon: MessageSquare, label: 'WhatsApp', value: COMPANY_FACTS.contacts.whatsapp },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#075B91] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA STRIP */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 py-12 lg:flex-row lg:items-center lg:py-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Have a drawing? <span className="text-[#E45532]">Let&apos;s quote it.</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">
              Send your 2D or 3D drawing for a feasibility review and an accurate CNC/VMC quote.
            </p>
          </div>
          <Link
            to="/contact-us/"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#E45532] px-7 py-4 text-sm font-semibold text-[#102A43] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]"
          >
            Request a quote
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* LINK COLUMNS */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14">
          {/* Identity */}
          <div className="space-y-5 lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532] focus-visible:ring-offset-2 focus-visible:ring-offset-[#075B91]"
            >
              <img
                src="/logo.png"
                alt="J.D. Associates"
                className="h-16 w-auto rounded-md bg-white p-1"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Precision shafts, EV rear axle shafts, cardan shafts, connecting rods, cams, gears, and custom CNC/VMC
              machined components manufactured in Faridabad, Haryana since May 2000.
            </p>
            <p className="inline-flex flex-wrap gap-x-2 rounded-full bg-white/8 px-3.5 py-1.5 text-xs text-white/70 ring-1 ring-white/10">
              <span>{COMPANY_FACTS.legalStatus}</span>
              <span aria-hidden="true">·</span>
              <span>Est. {COMPANY_FACTS.established}</span>
              <span aria-hidden="true">·</span>
              <span>{COMPANY_FACTS.teamSize}</span>
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className={headingClass}>Quick links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products + industries */}
          <nav aria-label="Products" className="lg:col-span-3">
            <h3 className={headingClass}>Product categories</h3>
            <ul className="mt-5 space-y-3">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={`/products/?category=${category.id}`} className={linkClass}>
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>

            
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Contact</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#E45532]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-white/80">
                  {COMPANY_FACTS.address.line}{' '}
                  <span className="text-[#E45532]">({COMPANY_FACTS.address.statusLabel})</span>
                </span>
              </li>
              {contactRows.map((row) => (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
                    <row.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">
                    <span className="block text-xs text-white/45">{row.label}</span>
                    <span className="text-white/75">{row.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEGAL ROW */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>Copyright © 2026 {COMPANY_FACTS.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy/" className="rounded transition-colors hover:text-[#E45532]">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions/" className="rounded transition-colors hover:text-[#E45532]">
              Terms and Conditions
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-semibold text-white/80 transition-colors hover:border-[#E45532] hover:text-[#E45532] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45532]"
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