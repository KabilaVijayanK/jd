import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbEntry } from './SeoHead';

interface BreadcrumbsProps {
  items: BreadcrumbEntry[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#64748B]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />}
              {isLast ? (
                <span aria-current="page" className="text-[#102A43] font-semibold">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#0869A8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] rounded-xs"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
