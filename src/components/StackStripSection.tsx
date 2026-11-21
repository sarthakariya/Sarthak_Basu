import type { TechStackGroup } from '../data/profileData';

interface StackStripSectionProps {
  techStack: TechStackGroup[];
}

export function StackStripSection({ techStack }: StackStripSectionProps) {
  return (
    <section
      id="tech-stack"
      aria-labelledby="stack-heading"
      className="mt-6 scroll-mt-10"
    >
      <div
        data-testid="tech-stack-matrix"
        className="rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2]/95 p-5 backdrop-blur-md sm:p-6 dark:border-[#342A23] dark:bg-[#1B1511]/90"
      >
        <h2
          id="stack-heading"
          className="text-xs font-semibold tracking-wide text-[#7C4A2D] uppercase dark:text-[#C88A55]"
        >
          Stack &amp; Skills
        </h2>

        <dl className="mt-3.5 divide-y divide-[#E6DDD0] dark:divide-[#2F2620]">
          {techStack.map((group) => (
            <div
              key={group.id}
              id={group.id}
              className="grid grid-cols-1 gap-1 py-2.5 first:pt-0 last:pb-0 sm:grid-cols-12 sm:items-baseline sm:gap-4"
            >
              <dt className="text-xs font-medium text-[#6B5849] sm:col-span-4 dark:text-[#A99888]">
                {group.category}
              </dt>
              <dd className="text-xs leading-relaxed font-medium text-[#1E1611] sm:col-span-8 sm:text-[13px] dark:text-[#F4EDE4]">
                {group.tools.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
