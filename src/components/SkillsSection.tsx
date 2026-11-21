import type { SkillCategory, TransferableSkill } from '../data/profileData';

interface SkillsSectionProps {
  skills: TransferableSkill[];
  activeCategory: SkillCategory | 'All';
  onCategoryChange: (category: SkillCategory | 'All') => void;
  highlightedSkillId: string | null;
}

const CATEGORIES: Array<SkillCategory | 'All'> = [
  'All',
  'Web Development',
  'Communication',
  'Problem-Solving',
  'Time Management',
];

export function SkillsSection({
  skills,
  activeCategory,
  onCategoryChange,
  highlightedSkillId,
}: SkillsSectionProps) {
  const visibleSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="border-t border-[#DCD0BF] pt-12 dark:border-[#342A23]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
              03. Technical &amp; Transferable Skills
            </p>
            <h2
              id="skills-heading"
              className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#1E1611] sm:text-5xl dark:text-[#F4EDE4]"
            >
              Site Development, Communication &amp; Execution
            </h2>
          </div>

          {/* Interactive Skill Filter Control */}
          <div
            role="tablist"
            aria-label="Filter transferable skills by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#DCD0BF] bg-[#EDE5D8] p-1 dark:border-[#342A23] dark:bg-[#1E1814]"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onCategoryChange(category)}
                  className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#FAF7F2] text-[#1E1611] shadow-xs dark:bg-[#C88A55] dark:text-[#14100D]'
                      : 'text-[#5C4B3E] hover:text-[#1E1611] dark:text-[#C2B2A2] dark:hover:text-[#F4EDE4]'
                  }`}
                >
                  {category === 'All' ? 'All Skills' : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial 2-column grid of skill monographs */}
        <div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
          data-testid="skills-grid"
        >
          {visibleSkills.map((skill) => {
            const isHighlighted = highlightedSkillId === skill.id;
            return (
              <article
                key={skill.id}
                id={skill.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-colors duration-200 sm:p-8 ${
                  isHighlighted
                    ? 'border-[#7C4A2D] bg-[#FAF7F2] ring-1 ring-[#7C4A2D]/30 dark:border-[#C88A55] dark:bg-[#221B16] dark:ring-[#C88A55]/30'
                    : 'border-[#DCD0BF] bg-[#FAF7F2] dark:border-[#342A23] dark:bg-[#1B1511]'
                }`}
              >
                <div>
                  {/* Unboxed editorial metadata line */}
                  <div className="flex items-center justify-between text-xs text-[#6B5849] dark:text-[#A99888]">
                    <span>{skill.category}</span>
                    <span className="font-mono tabular-nums">{skill.index}</span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl leading-snug font-semibold text-[#1E1611] sm:text-[1.75rem] dark:text-[#F4EDE4]">
                    {skill.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#45372C] dark:text-[#C9B9A9]">
                    {skill.summary}
                  </p>

                  <div className="mt-5 border-t border-[#E6DDD0] pt-4 dark:border-[#2F2620]">
                    <p className="text-xs font-semibold text-[#7C4A2D] dark:text-[#C88A55]">
                      How I Apply It
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
                      {skill.methodology}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#E6DDD0] pt-4 dark:border-[#2F2620]">
                  <p className="text-xs font-medium text-[#1E1611] dark:text-[#F4EDE4]">
                    Focus Outcome · {skill.impactMetric}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B5849] dark:text-[#A99888]">
                    {skill.keywords.join(' · ')}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
