import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export type IslandAccent = 'violet' | 'sky' | 'emerald' | 'amber' | 'rose' | 'multi';

const ACCENT_STYLES: Record<
  IslandAccent,
  {
    spot: string;
    borderHover: string;
    topGlow: string;
  }
> = {
  violet: {
    spot: 'rgba(167, 139, 250, 0.17)',
    borderHover: 'hover:border-violet-400/45',
    topGlow: 'from-transparent via-violet-400/55 to-transparent',
  },
  sky: {
    spot: 'rgba(56, 189, 248, 0.17)',
    borderHover: 'hover:border-sky-400/45',
    topGlow: 'from-transparent via-sky-400/55 to-transparent',
  },
  emerald: {
    spot: 'rgba(52, 211, 153, 0.17)',
    borderHover: 'hover:border-emerald-400/45',
    topGlow: 'from-transparent via-emerald-400/55 to-transparent',
  },
  amber: {
    spot: 'rgba(251, 191, 36, 0.16)',
    borderHover: 'hover:border-amber-400/45',
    topGlow: 'from-transparent via-amber-400/55 to-transparent',
  },
  rose: {
    spot: 'rgba(251, 113, 133, 0.17)',
    borderHover: 'hover:border-rose-400/45',
    topGlow: 'from-transparent via-rose-400/55 to-transparent',
  },
  multi: {
    spot: 'rgba(99, 102, 241, 0.16)',
    borderHover: 'hover:border-sky-400/40',
    topGlow: 'from-sky-400/60 via-violet-400/60 to-emerald-400/60',
  },
};

export const SECTION_STAGGER_VARIANTS = {
  hidden: { opacity: 0.96, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 240,
      damping: 26,
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

export const ITEM_STAGGER_VARIANTS = {
  hidden: { opacity: 0.94, y: 16, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 'some' as const,
};

interface SpotlightIslandProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  accent?: IslandAccent;
  tilt?: boolean;
  staggerChild?: boolean;
}

export function SpotlightIsland({
  children,
  className = '',
  id,
  delay = 0,
  accent = 'violet',
  tilt = false,
  staggerChild = false,
}: SpotlightIslandProps) {
  const palette = ACCENT_STYLES[accent];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.4, -2.4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.4, 2.4]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty('--mx', `${x}px`);
    event.currentTarget.style.setProperty('--my', `${y}px`);
    if (tilt && rect.width > 0 && rect.height > 0) {
      mouseX.set(x / rect.width - 0.5);
      mouseY.set(y / rect.height - 0.5);
    }
  }

  function handleMouseLeave() {
    if (tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }

  const customStyle = {
    '--spot-color': palette.spot,
    ...(tilt ? { rotateX, rotateY, transformPerspective: 1000 } : {}),
  } as CSSProperties;

  return (
    <motion.div
      id={id}
      variants={staggerChild ? ITEM_STAGGER_VARIANTS : undefined}
      initial={staggerChild ? undefined : { opacity: 0.94, y: 18, scale: 0.985 }}
      whileInView={staggerChild ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={staggerChild ? undefined : VIEWPORT_CONFIG}
      transition={
        staggerChild
          ? undefined
          : {
              type: 'spring',
              stiffness: 240,
              damping: 25,
              delay,
            }
      }
      whileHover={{ y: -2.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={customStyle}
      className={`spotlight-card group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D111C]/90 shadow-[0_14px_36px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-300 ${palette.borderHover} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${palette.topGlow}`}
      />
      {children}
    </motion.div>
  );
}
