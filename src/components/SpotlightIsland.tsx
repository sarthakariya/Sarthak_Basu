import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';

interface SpotlightIslandProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  hoverLift?: boolean;
}

export function SpotlightIsland({
  children,
  className = '',
  id,
  delay = 0,
  hoverLift = false,
}: SpotlightIslandProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0.96, y: 16, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={hoverLift ? { y: -3 } : undefined}
      className={`spotlight-card rounded-2xl border border-slate-400/15 bg-[#0D1424]/90 backdrop-blur-md transition-[border-color] duration-200 hover:border-sky-400/35 ${className}`}
    >
      {children}
    </motion.div>
  );
}
