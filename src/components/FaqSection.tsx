import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProfileData } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface FaqSectionProps {
  profile: ProfileData;
}

export function FaqSection({ profile }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    profile.faqs[0]?.id ?? null
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 space-y-4"
    >
      <div>
        <h2
          id="faq-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-50"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Verified third-person facts about Sarthak Basu’s work, community, and
          credentials
        </p>
      </div>

      <SpotlightIsland className="divide-y divide-slate-400/12 overflow-hidden">
        {profile.faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} id={faq.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-800/35 sm:px-6"
              >
                <span className="font-display text-sm font-semibold text-slate-100 sm:text-base">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-sky-400"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400 sm:px-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </SpotlightIsland>
    </section>
  );
}
