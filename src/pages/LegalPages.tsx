import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageShell } from '../components/MotionPrimitives';
import { COMPANY_FACTS } from '../data/companyData';

export function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy/' },
  ];

  return (
    <PageShell>
      <SeoHead
        title="Privacy Policy | J.D. Associates"
        description="Privacy Policy governing enquiry submissions and engineering drawing confidentiality at J.D. Associates."
        canonicalPath="/privacy-policy/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 pt-24 lg:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#102A43]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#64748B]">
            Effective Year: 2026 · {COMPANY_FACTS.name} ({COMPANY_FACTS.legalStatus})
          </p>

          <div className="space-y-5 text-base text-[#263445] leading-relaxed pt-4 border-t border-[#E2E8F0]">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#102A43]">
                1. Information Collected Through Component Enquiries
              </h2>
              <p>
                When you submit an enquiry through our Contact Us form, we collect your name,
                organization name, phone number, email address, component requirements, estimated
                quantities, and any engineering drawings you voluntarily attach for quotation
                evaluation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#102A43]">
                2. Drawing &amp; Specification Confidentiality
              </h2>
              <p>
                Technical drawings, dimensional specifications, and procurement volumes shared with{' '}
                {COMPANY_FACTS.name} are handled strictly for manufacturing feasibility analysis
                and quotation preparation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#102A43]">
                3. Contact Channel Confirmation
              </h2>
              <p>
                Direct telephone, email, and WhatsApp channels for privacy requests are awaiting
                final client confirmation.
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

export function TermsPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Terms and Conditions', path: '/terms-and-conditions/' },
  ];

  return (
    <PageShell>
      <SeoHead
        title="Terms and Conditions | J.D. Associates"
        description="Terms and conditions for OEM component enquiries, drawings, and quotations on the J.D. Associates corporate website."
        canonicalPath="/terms-and-conditions/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 pt-24 lg:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#102A43]">
            Terms and Conditions
          </h1>
          <p className="text-sm text-[#64748B]">
            Effective Year: 2026 · {COMPANY_FACTS.name} ({COMPANY_FACTS.legalStatus})
          </p>

          <div className="space-y-5 text-base text-[#263445] leading-relaxed pt-4 border-t border-[#E2E8F0]">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#102A43]">
                1. Drawing-Led Manufacturing Scope
              </h2>
              <p>
                Component descriptions on this website reflect general CNC and VMC capabilities.
                Final tolerances, raw material grades, pricing, and delivery timelines are governed
                by formal commercial quotations issued against approved client engineering drawings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#102A43]">
                2. Pending Information Notice
              </h2>
              <p>
                Certain facility contact channels, street address verification, and supplementary
                product tolerances displayed on this site are explicitly identified as pending
                client confirmation.
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
