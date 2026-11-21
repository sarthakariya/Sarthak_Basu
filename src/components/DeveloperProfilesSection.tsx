import { useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Code2,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from 'lucide-react';
import type { GoogleBadgeCategory, ProfileData } from '../data/profileData';
import {
  buildFallbackGitHubPreview,
  fetchGitHubPreview,
  formatRepoUpdatedDate,
  type GitHubPreviewPayload,
} from '../utils/githubPreview';

interface DeveloperProfilesSectionProps {
  profile: ProfileData;
}

const BADGE_FILTERS: Array<GoogleBadgeCategory | 'All'> = [
  'All',
  'Web & Cloud',
  'CS & AI',
  'Certificates',
];

export function DeveloperProfilesSection({
  profile,
}: DeveloperProfilesSectionProps) {
  const [githubData, setGithubData] = useState<GitHubPreviewPayload>(() =>
    buildFallbackGitHubPreview(profile.githubUsername, profile.portraitUrl)
  );
  const [githubLoading, setGithubLoading] = useState(true);
  const [badgeFilter, setBadgeFilter] = useState<GoogleBadgeCategory | 'All'>(
    'All'
  );

  const loadGitHub = useCallback(
    async (signal?: AbortSignal) => {
      setGithubLoading(true);
      const data = await fetchGitHubPreview(
        profile.githubUsername,
        profile.portraitUrl,
        signal
      );
      if (!signal?.aborted) {
        setGithubData(data);
        setGithubLoading(false);
      }
    },
    [profile.githubUsername, profile.portraitUrl]
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadGitHub(controller.signal);
    return () => controller.abort();
  }, [loadGitHub]);

  const visibleBadges =
    badgeFilter === 'All'
      ? profile.googleDev.badges
      : profile.googleDev.badges.filter((b) => b.category === badgeFilter);

  return (
    <section
      id="profiles"
      aria-labelledby="profiles-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="border-t border-[#DCD0BF] pt-12 dark:border-[#342A23]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
              01. Live Developer Identity &amp; Credentials
            </p>
            <h2
              id="profiles-heading"
              className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#1E1611] sm:text-5xl dark:text-[#F4EDE4]"
            >
              GitHub Repositories &amp; Google Developer Badges
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
            Live code pulled directly from{' '}
            <span className="font-mono text-xs text-[#1E1611] dark:text-[#F4EDE4]">
              github.com/{profile.githubUsername}
            </span>{' '}
            alongside verified Google Developer credentials at{' '}
            <span className="font-mono text-xs text-[#1E1611] dark:text-[#F4EDE4]">
              {profile.googleDev.handle}
            </span>
            .
          </p>
        </div>

        {/* 2-column balanced developer preview showcase */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Left Panel: Live GitHub Profile & Repositories */}
          <article
            id="profile-github"
            data-testid="github-preview-card"
            className="flex flex-col justify-between rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 sm:p-7 lg:col-span-6 dark:border-[#342A23] dark:bg-[#1B1511]"
          >
            <div>
              {/* GitHub Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#E6DDD0] pb-5 dark:border-[#2F2620]">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#CFC0AC] bg-[#EDE5D8] dark:border-[#3D3129] dark:bg-[#261E19]">
                    <img
                      src={githubData.user.avatarUrl || profile.portraitUrl}
                      alt={`${githubData.user.login} GitHub avatar`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#6B5849] dark:text-[#A99888]">
                      <Github className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>GitHub</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {githubLoading
                          ? 'Syncing'
                          : githubData.source === 'live'
                            ? 'Live API'
                            : 'Direct Preview'}
                      </span>
                    </div>
                    <h3 className="font-display mt-0.5 truncate text-2xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      @{githubData.user.login}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void loadGitHub()}
                    disabled={githubLoading}
                    aria-label="Refresh live GitHub repositories"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#CFC0AC] text-[#5C4B3E] transition-colors hover:bg-[#EDE5D8] hover:text-[#1E1611] disabled:opacity-50 dark:border-[#3D3129] dark:text-[#C2B2A2] dark:hover:bg-[#28201A] dark:hover:text-[#F4EDE4]"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${githubLoading ? 'animate-spin' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <a
                    href={profile.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#7C4A2D] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#633820] dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66]"
                  >
                    <span>Open GitHub</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Bio + Tabular Stats */}
              <p className="mt-4 text-sm leading-relaxed text-[#4C3D31] dark:text-[#C9B9A9]">
                {githubData.user.bio}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#6B5849] dark:text-[#A99888]">
                <span className="font-mono tabular-nums">
                  <strong className="font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                    {githubData.user.publicRepos}
                  </strong>{' '}
                  public repos
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  <strong className="font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                    {githubData.user.followers}
                  </strong>{' '}
                  followers
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  <strong className="font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                    {githubData.user.following}
                  </strong>{' '}
                  following
                </span>
              </div>

              {/* Repository List / Loading Skeleton / Graceful Fallback */}
              <div className="mt-6">
                {githubLoading ? (
                  <div className="space-y-3" aria-busy="true">
                    {[1, 2, 3].map((slot) => (
                      <div
                        key={slot}
                        className="h-20 animate-pulse rounded-xl border border-[#E6DDD0] bg-[#EDE5D8]/60 dark:border-[#2F2620] dark:bg-[#241C16]"
                      />
                    ))}
                  </div>
                ) : githubData.repos.length > 0 ? (
                  <div className="divide-y divide-[#E6DDD0] border-t border-[#E6DDD0] dark:divide-[#2F2620] dark:border-[#2F2620]">
                    {githubData.repos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block py-3.5 transition-colors hover:bg-[#F3ECE0] sm:px-2.5 sm:rounded-lg dark:hover:bg-[#231C17]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Code2
                              className="h-4 w-4 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]"
                              aria-hidden="true"
                            />
                            <span className="truncate text-sm font-semibold text-[#1E1611] group-hover:text-[#7C4A2D] dark:text-[#F4EDE4] dark:group-hover:text-[#C88A55]">
                              {repo.name}
                            </span>
                          </div>
                          <span className="shrink-0 font-mono text-[11px] text-[#6B5849] tabular-nums dark:text-[#A99888]">
                            {formatRepoUpdatedDate(repo.updatedAt)}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
                          {repo.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-[#6B5849] dark:text-[#A99888]">
                          <span>{repo.language}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                            <Star className="h-3 w-3" aria-hidden="true" />
                            {repo.stars}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                            <GitFork className="h-3 w-3" aria-hidden="true" />
                            {repo.forks}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#E6DDD0] bg-[#F5F0E8] p-5 dark:border-[#2F2620] dark:bg-[#14100D]">
                    <p className="text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      Explore all builds on github.com/{profile.githubUsername}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
                      Live repository metadata could not be reached right now (or no public repositories are pinned yet). Open GitHub directly to view commits, web builds, and upcoming code drops.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-[#E6DDD0] pt-4 text-xs text-[#6B5849] dark:border-[#2F2620] dark:text-[#A99888]">
              <span>github.com/{profile.githubUsername}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Auto-syncs on page load</span>
            </div>
          </article>

          {/* Right Panel: Google Developer Profile & Badges (g.dev/mrsarthak) */}
          <article
            id="profile-google-dev"
            data-testid="google-dev-preview-card"
            className="flex flex-col justify-between rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 sm:p-7 lg:col-span-6 dark:border-[#342A23] dark:bg-[#1B1511]"
          >
            <div>
              {/* Google Developer Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#E6DDD0] pb-5 dark:border-[#2F2620]">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#CFC0AC] bg-[#EDE5D8] text-[#7C4A2D] dark:border-[#3D3129] dark:bg-[#261E19] dark:text-[#C88A55]">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#6B5849] dark:text-[#A99888]">
                      <span>Google Developer Program</span>
                      <span aria-hidden="true">·</span>
                      <span>Badges &amp; Certs</span>
                    </div>
                    <h3 className="font-display mt-0.5 truncate text-2xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      {profile.googleDev.handle}
                    </h3>
                  </div>
                </div>

                <a
                  href={profile.googleDev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#7C4A2D] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#633820] dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66]"
                >
                  <span>View g.dev</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#4C3D31] dark:text-[#C9B9A9]">
                {profile.googleDev.summary}
              </p>

              {/* Interactive Badge Category Filter */}
              <div
                role="tablist"
                aria-label="Filter Google Developer badges and certificates"
                className="mt-5 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#DCD0BF] bg-[#EDE5D8] p-1 dark:border-[#342A23] dark:bg-[#14100D]"
              >
                {BADGE_FILTERS.map((category) => {
                  const isSelected = badgeFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setBadgeFilter(category)}
                      className={`min-h-[34px] shrink-0 whitespace-nowrap rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#FAF7F2] text-[#1E1611] shadow-xs dark:bg-[#C88A55] dark:text-[#14100D]'
                          : 'text-[#5C4B3E] hover:text-[#1E1611] dark:text-[#C2B2A2] dark:hover:text-[#F4EDE4]'
                      }`}
                    >
                      {category === 'All' ? 'All Credentials' : category}
                    </button>
                  );
                })}
              </div>

              {/* Badges & Certificates List */}
              <div className="mt-4 divide-y divide-[#E6DDD0] dark:divide-[#2F2620]">
                {visibleBadges.map((badge) => (
                  <div key={badge.id} className="py-3.5 first:pt-2 last:pb-0">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#6B5849] dark:text-[#A99888]">
                      <span>{badge.category} · {badge.issuer}</span>
                      <span className="font-mono tabular-nums">{badge.year}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      {badge.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
                      {badge.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#E6DDD0] pt-4 text-xs text-[#6B5849] dark:border-[#2F2620] dark:text-[#A99888]">
              <span>Public profile: https://g.dev/mrsarthak</span>
              <a
                href={profile.googleDev.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#7C4A2D] underline-offset-4 hover:underline dark:text-[#C88A55]"
              >
                Verify badges on Google Developers →
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
