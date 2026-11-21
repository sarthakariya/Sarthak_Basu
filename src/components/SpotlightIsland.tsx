import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export type IslandAccent = 'violet' | 'sky' | 'emerald' | 'amber' | 'rose' | 'multi';

const ACCENT_STYLES: Record<
  IslandAccent,
  {
    spot: string;
    innerGlow: string;
    borderHover: string;
    topGlow: string;
  }
> = {
  violet: {
    spot: 'rgba(167, 139, 250, 0.2)',
    innerGlow: 'rgba(167, 139, 250, 0.28)',
    borderHover: 'hover:border-violet-400/50',
    topGlow: 'from-transparent via-violet-400/70 to-transparent',
  },
  sky: {
    spot: 'rgba(56, 189, 248, 0.2)',
    innerGlow: 'rgba(56, 189, 248, 0.28)',
    borderHover: 'hover:border-sky-400/50',
    topGlow: 'from-transparent via-sky-400/70 to-transparent',
  },
  emerald: {
    spot: 'rgba(52, 211, 153, 0.2)',
    innerGlow: 'rgba(52, 211, 153, 0.28)',
    borderHover: 'hover:border-emerald-400/50',
    topGlow: 'from-transparent via-emerald-400/70 to-transparent',
  },
  amber: {
    spot: 'rgba(251, 191, 36, 0.18)',
    innerGlow: 'rgba(251, 191, 36, 0.26)',
    borderHover: 'hover:border-amber-400/50',
    topGlow: 'from-transparent via-amber-400/70 to-transparent',
  },
  rose: {
    spot: 'rgba(251, 113, 133, 0.2)',
    innerGlow: 'rgba(251, 113, 133, 0.28)',
    borderHover: 'hover:border-rose-400/50',
    topGlow: 'from-transparent via-rose-400/70 to-transparent',
  },
  multi: {
    spot: 'rgba(99, 102, 241, 0.2)',
    innerGlow: 'rgba(56, 189, 248, 0.26)',
    borderHover: 'hover:border-sky-400/45',
    topGlow: 'from-sky-400/70 via-violet-400/70 to-emerald-400/70',
  },
};

export const SECTION_STAGGER_VARIANTS = {
  hidden: { opacity: 0.96, y: 16 },
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
  hidden: { opacity: 0.94, y: 14, scale: 0.985 },
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
  /** Enables magnetic cursor attraction + subtle 3D tilt spring on hover */
  magnetic?: boolean;
  /** Backwards-compatible alias for magnetic */
  tilt?: boolean;
  staggerChild?: boolean;
}

export function SpotlightIsland({
  children,
  className = '',
  id,
  delay = 0,
  accent = 'violet',
  magnetic = true,
  tilt = false,
  staggerChild = false,
}: SpotlightIslandProps) {
  const palette = ACCENT_STYLES[accent];
  const enableMagnet = magnetic || tilt;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 210, damping: 20, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Subtle magnetic pull toward cursor (±6.5px) + gentle tactile 3D tilt (±2deg)
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-6.5, 6.5]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-6.5, 6.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.1, -2.1]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.1, 2.1]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty('--mx', `${x}px`);
    event.currentTarget.style.setProperty('--my', `${y}px`);
    if (enableMagnet && rect.width > 0 && rect.height > 0) {
      rawX.set(x / rect.width - 0.5);
      rawY.set(y / rect.height - 0.5);
    }
  }

  function handleMouseLeave() {
    if (enableMagnet) {
      rawX.set(0);
      rawY.set(0);
    }
  }

  const customStyle = {
    '--spot-color': palette.spot,
    '--inner-glow': palette.innerGlow,
    ...(enableMagnet
      ? { x: translateX, y: translateY, rotateX, rotateY, transformPerspective: 1100 }
      : {}),
  } as CSSProperties;

  return (
    <motion.div
      id={id}
      variants={staggerChild ? ITEM_STAGGER_VARIANTS : undefined}
      initial={staggerChild ? undefined : { opacity: 0.94, y: 16, scale: 0.985 }}
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={customStyle}
      className={`glass-island spotlight-card group relative overflow-hidden rounded-2xl border border-white/[0.13] backdrop-blur-xl transition-colors duration-300 ${palette.borderHover} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r opacity-75 transition-opacity duration-300 group-hover:opacity-100 ${palette.topGlow}`}
      />
      {children}
    </motion.div>
  );
}
