import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../data/companyData';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <div className="divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-trigger-${idx}`;

        return (
          <div key={item.question} className="bg-white">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-5 px-2 sm:px-4 flex items-center justify-between gap-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0869A8] rounded-md"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#0869A8] tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-base sm:text-lg font-semibold text-[#102A43] group-hover:text-[#0869A8] transition-colors">
                    {item.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                    isOpen
                      ? 'bg-[#0869A8] border-[#0869A8] text-white'
                      : 'bg-[#F5F8FC] border-[#E2E8F0] text-[#102A43] group-hover:border-[#0869A8]'
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={prefersReduced ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="px-2 sm:px-4 pb-6 pl-10 sm:pl-12"
                >
                  <p className="text-sm sm:text-base leading-relaxed text-[#64748B] max-w-3xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
