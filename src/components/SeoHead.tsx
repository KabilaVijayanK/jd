import { useEffect } from 'react';
import { COMPANY_FACTS, FaqItem } from '../data/companyData';

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  breadcrumbs?: BreadcrumbEntry[];
  faqs?: FaqItem[];
}

export function SeoHead({ title, description, canonicalPath, breadcrumbs, faqs }: SeoHeadProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${origin}${normalizedPath}`;

    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', COMPANY_FACTS.name);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: COMPANY_FACTS.name,
        url: origin,
        description:
          'Precision machining and manufacturing company for engineering components, assemblies and custom CNC/VMC machined parts.',
        areaServed: 'India',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Faridabad',
          addressRegion: 'Haryana',
          addressCountry: 'IN',
        },
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${origin}${crumb.path}`,
        })),
      });
    }

    if (faqs && faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    const existingScripts = document.querySelectorAll('script[data-jd-seo-jsonld="true"]');
    existingScripts.forEach((node) => node.remove());

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jd-seo-jsonld', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [title, description, canonicalPath, breadcrumbs, faqs]);

  return null;
}
