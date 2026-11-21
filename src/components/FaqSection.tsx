import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import {
  SECTION_STAGGER_VARIANTS,
  SpotlightIsland,
  VIEWPORT_CONFIG,
} from './SpotlightIsland';

interface FaqSectionProps {
  profile: ProfileData;
}

export function FaqSection({ profile }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(profile.faqs[0]?.id ?? null);

  return (
    <motion.section
      id="faq"
      aria-labelledby="faq-heading"
      variants={SECTION_STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="space-y-4 scroll-mt-20"
    >
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-rose-300 uppercase">
          Quick Q&amp;A
        </p>
        <h2
          id="faq-heading"
          className="mt-1 font-display text-2xl font-bold tracking-tight text-white"
        >
          About Sarthak
        </h2>
      </div>

      <SpotlightIsland accent="rose" staggerChild className="divide-y divide-white/[0.08]">
        {profile.faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} id={faq.id} className="px-5 py-3.5 sm:px-6">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                <span className="font-display text-sm font-semibold text-slate-100 sm:text-[15px]">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.03] text-slate-300"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2.5 pr-8 text-xs leading-relaxed text-slate-400 sm:text-[13.5px]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </SpotlightIsland>
    </motion.section>
  );
}
