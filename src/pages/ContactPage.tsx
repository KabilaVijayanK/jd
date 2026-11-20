import { useState, ChangeEvent, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
  FileText,
  ShieldCheck,
  Send,
  PencilRuler,
  FileCheck2,
  ChevronDown,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageShell } from '../components/MotionPrimitives';
import { COMPANY_FACTS, PRODUCT_CATEGORIES } from '../data/companyData';

/* Contact page: dark info panel (left) + clean enquiry form card (right).
   Form logic, validation, file upload and the /api/enquiry call are unchanged.
   Palette: teal #0E2A2D, teal-2 #14393D, brass #D9A441, mist #EEF2F1, ink #0B1A1C */

interface EnquiryFormValues {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  productRequired: string;
  quantity: string;
  message: string;
}

interface SubmissionSuccess {
  referenceId: string;
  submittedAt: string;
  message: string;
}

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#0B1A1C] placeholder:text-[#8A9794] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9A441]/60 focus:border-[#0E2A2D]';
const inputOk = 'border-[#0B1A1C]/15 hover:border-[#0B1A1C]/30';
const inputBad = 'border-red-400';

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#0B1A1C]">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    type: string;
    base64: string;
  } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionSuccess | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    defaultValues: {
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      productRequired: preselectedProduct || PRODUCT_CATEGORIES[0].title,
      quantity: '',
      message: '',
    },
  });

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact-us/' },
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('Drawing file exceeds 5 MB limit. Please upload a smaller file.');
      setSelectedFile(null);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        base64: result,
      });
    };
    reader.onerror = () => {
      setFileError('Unable to read the selected file.');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: EnquiryFormValues) => {
    setServerError(null);
    setSubmissionResult(null);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          drawingFileName: selectedFile?.name,
          drawingFileSize: selectedFile?.size,
          drawingFileType: selectedFile?.type,
          drawingBase64: selectedFile?.base64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || 'Failed to submit enquiry. Please verify your entries.');
        return;
      }

      setSubmissionResult({
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
        message: data.message,
      });
      reset();
      setSelectedFile(null);
    } catch {
      setServerError('Network error while connecting to the enquiry server. Please try again.');
    }
  };

  const contactRows = [
    { icon: Phone, label: 'Phone', value: COMPANY_FACTS.contacts.phone },
    { icon: Mail, label: 'Email', value: COMPANY_FACTS.contacts.email },
    { icon: MessageSquare, label: 'WhatsApp', value: COMPANY_FACTS.contacts.whatsapp },
  ];

  const steps = [
    { icon: Send, title: 'You send the details', text: 'Requirement, quantity and an optional drawing.' },
    { icon: PencilRuler, title: 'We review feasibility', text: 'Checked against our CNC and VMC capability.' },
    { icon: FileCheck2, title: 'You receive a quote', text: 'Based on your drawing, material and tolerances.' },
  ];

  const ring =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  return (
    <PageShell>
      <SeoHead
        title="Contact J.D. Associates | Request Precision Component Quote"
        description="Submit your component drawings, quantity requirements, and OEM enquiries to J.D. Associates in Faridabad, Haryana."
        canonicalPath="/contact-us/"
        breadcrumbs={breadcrumbs}
      />

      <main className="flex-1 bg-[#EEF2F1] pt-24 text-[#0B1A1C] lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-28">
          <Breadcrumbs items={breadcrumbs} />

          {/* HEADER */}
          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6414]">
              OEM procurement &amp; technical enquiries
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s quote your part.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#3D5255] sm:text-lg">
              Share your component specification, estimated batch volume and, if you have one, the engineering
              drawing. We review it and come back with a quote.
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* INFO PANEL */}
            <aside className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl bg-[#0E2A2D] p-7 text-white sm:p-9 lg:sticky lg:top-28">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-[#D9A441]/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border border-[#D9A441]/25"
                />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">Manufacturer</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">{COMPANY_FACTS.name}</h2>
                  <p className="mt-1 text-sm text-white/60">
                    {COMPANY_FACTS.legalStatus} · Established {COMPANY_FACTS.established}
                  </p>

                  <dl className="mt-7 divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-start gap-4 py-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#D9A441]">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-white/50">Facility</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-white/90">{COMPANY_FACTS.address.line}</dd>
                        <dd className="mt-1 text-xs font-medium text-[#D9A441]">
                          ({COMPANY_FACTS.address.statusLabel})
                        </dd>
                      </div>
                    </div>

                    {contactRows.map((row) => (
                      <div key={row.label} className="flex items-start gap-4 py-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
                          <row.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-white/50">{row.label}</dt>
                          <dd className="mt-1 text-sm text-white/70">{row.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/65 ring-1 ring-white/10">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A441]" aria-hidden="true" />
                    <p>
                      <span className="font-semibold text-white">Verification notice. </span>
                      Map embeds and direct phone and email links are withheld until the street address and official
                      contact channels are verified in writing by J.D. Associates.
                    </p>
                  </div>

                  <h3 className="mt-9 font-display text-lg font-bold">What happens next</h3>
                  <ol className="mt-4 space-y-4">
                    {steps.map((step, i) => (
                      <li key={step.title} className="flex items-start gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9A441] font-display text-sm font-bold text-[#0B1A1C]">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{step.title}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-white/60">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>

            {/* FORM CARD */}
            <section
              aria-labelledby="enquiry-heading"
              className="rounded-2xl border border-[#0B1A1C]/10 bg-white p-6 shadow-[0_1px_2px_rgba(11,26,28,0.04),0_8px_24px_-12px_rgba(11,26,28,0.12)] sm:p-9 lg:col-span-7"
            >
              {submissionResult ? (
                <div role="status" className="py-8 text-center sm:py-14">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0E2A2D] text-[#D9A441]">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h2 id="enquiry-heading" className="mt-6 font-display text-2xl font-bold sm:text-3xl">
                    Enquiry received
                  </h2>
                  <p className="mx-auto mt-3 inline-block rounded-full bg-[#D9A441]/15 px-4 py-1.5 text-sm font-semibold text-[#8A6414]">
                    Reference: {submissionResult.referenceId}
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#3D5255]">
                    {submissionResult.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmissionResult(null)}
                    className={`mt-8 rounded-lg border border-[#0B1A1C]/20 px-6 py-3 text-sm font-semibold hover:bg-[#EEF2F1] ${ring}`}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 id="enquiry-heading" className="font-display text-2xl font-bold">
                      Component enquiry form
                    </h2>
                    <p className="mt-1.5 text-sm text-[#64736F]">
                      Fields marked with * are required for engineering and quotation validation.
                    </p>
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
                    {/* Group 1 */}
                    <fieldset className="space-y-5">
                      <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6414]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E2A2D] text-[10px] text-white">
                          1
                        </span>
                        Your details
                      </legend>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field id="fullName" label="Full name *" error={errors.fullName?.message}>
                          <input
                            id="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Rajesh Sharma"
                            {...register('fullName', {
                              required: 'Full name is required.',
                              minLength: { value: 2, message: 'Enter at least 2 characters.' },
                            })}
                            aria-invalid={Boolean(errors.fullName)}
                            className={`${inputBase} ${errors.fullName ? inputBad : inputOk}`}
                          />
                        </Field>

                        <Field id="companyName" label="Company name *" error={errors.companyName?.message}>
                          <input
                            id="companyName"
                            type="text"
                            autoComplete="organization"
                            placeholder="OEM / Engineering Organization"
                            {...register('companyName', {
                              required: 'Company name is required.',
                              minLength: { value: 2, message: 'Enter at least 2 characters.' },
                            })}
                            aria-invalid={Boolean(errors.companyName)}
                            className={`${inputBase} ${errors.companyName ? inputBad : inputOk}`}
                          />
                        </Field>

                        <Field id="phone" label="Phone number *" error={errors.phone?.message}>
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+91 98XXXXXXXX"
                            {...register('phone', {
                              required: 'Phone number is required.',
                              pattern: {
                                value: /^[+\d\s()-]{7,20}$/,
                                message: 'Enter a valid phone number.',
                              },
                            })}
                            aria-invalid={Boolean(errors.phone)}
                            className={`${inputBase} ${errors.phone ? inputBad : inputOk}`}
                          />
                        </Field>

                        <Field id="email" label="Email address *" error={errors.email?.message}>
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="procurement@company.com"
                            {...register('email', {
                              required: 'Business email is required.',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address.',
                              },
                            })}
                            aria-invalid={Boolean(errors.email)}
                            className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
                          />
                        </Field>
                      </div>
                    </fieldset>

                    {/* Group 2 */}
                    <fieldset className="space-y-5">
                      <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6414]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E2A2D] text-[10px] text-white">
                          2
                        </span>
                        Your requirement
                      </legend>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field id="productRequired" label="Product required *" error={errors.productRequired?.message}>
                          <div className="relative">
                            <select
                              id="productRequired"
                              {...register('productRequired', {
                                required: 'Please select a component category.',
                              })}
                              aria-invalid={Boolean(errors.productRequired)}
                              className={`${inputBase} appearance-none pr-10 ${errors.productRequired ? inputBad : inputOk}`}
                            >
                              {PRODUCT_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.title}>
                                  {cat.title}
                                </option>
                              ))}
                              {preselectedProduct &&
                                !PRODUCT_CATEGORIES.some((c) => c.title === preselectedProduct) && (
                                  <option value={preselectedProduct}>{preselectedProduct}</option>
                                )}
                              <option value="Other Custom Drawing Component">Other Custom Drawing Component</option>
                            </select>
                            <ChevronDown
                              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64736F]"
                              aria-hidden="true"
                            />
                          </div>
                        </Field>

                        <Field id="quantity" label="Estimated quantity *" error={errors.quantity?.message}>
                          <input
                            id="quantity"
                            type="text"
                            placeholder="e.g. 500 units / month"
                            {...register('quantity', {
                              required: 'Estimated quantity is required.',
                            })}
                            aria-invalid={Boolean(errors.quantity)}
                            className={`${inputBase} ${errors.quantity ? inputBad : inputOk}`}
                          />
                        </Field>
                      </div>

                      <Field id="message" label="Message / technical specifications *" error={errors.message?.message}>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Metal grade (Steel, Stainless Steel, Brass, Copper, Aluminium), shaft length, drawing reference notes..."
                          {...register('message', {
                            required: 'Please provide component details or requirements.',
                            minLength: { value: 10, message: 'Enter at least 10 characters.' },
                          })}
                          aria-invalid={Boolean(errors.message)}
                          className={`${inputBase} resize-y ${errors.message ? inputBad : inputOk}`}
                        />
                      </Field>
                    </fieldset>

                    {/* Group 3 */}
                    <fieldset>
                      <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6414]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E2A2D] text-[10px] text-white">
                          3
                        </span>
                        Drawing (optional)
                      </legend>

                      <label
                        htmlFor="drawingUpload"
                        className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#0B1A1C]/20 bg-[#F4F7F6] px-5 py-8 text-center transition-colors hover:border-[#0E2A2D] hover:bg-[#EEF2F1] focus-within:border-[#0E2A2D]"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E2A2D] text-[#D9A441] transition-transform group-hover:scale-105">
                          <Upload className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="mt-3 text-sm font-semibold">Click to upload your drawing</span>
                        <span className="mt-1 text-xs text-[#64736F]">PDF, DXF, DWG, STEP, IGES, PNG, JPG · Max 5 MB</span>
                        <input
                          id="drawingUpload"
                          type="file"
                          accept=".pdf,.dxf,.dwg,.step,.stp,.igs,.iges,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>

                      {selectedFile && (
                        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#0B1A1C]/10 bg-white px-4 py-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2F1] text-[#0E2A2D]">
                              <FileText className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold">{selectedFile.name}</span>
                              <span className="block text-xs text-[#64736F]">
                                {Math.round(selectedFile.size / 1024)} KB attached
                              </span>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedFile(null)}
                            aria-label="Remove attached drawing"
                            className={`rounded-full p-1.5 text-[#64736F] hover:bg-red-50 hover:text-red-600 ${ring}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      {fileError && (
                        <p className="mt-2 text-xs font-medium text-red-600" role="alert">
                          {fileError}
                        </p>
                      )}
                    </fieldset>

                    <div className="flex flex-col gap-4 border-t border-[#0B1A1C]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xs text-xs leading-relaxed text-[#64736F]">
                        Your drawing and details are used only to prepare your quotation.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E2A2D] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#14393D] disabled:cursor-not-allowed disabled:opacity-60 ${ring}`}
                      >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                        {isSubmitting ? 'Submitting requirement...' : 'Submit requirement'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  );
}