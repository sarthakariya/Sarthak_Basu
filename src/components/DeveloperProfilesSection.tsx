import { useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Code2,
  Github,
  Instagram,
  RefreshCw,
} from 'lucide-react';
import { resolvePublicAssetUrl, type ProfileData } from '../data/profileData';
import {
  buildFallbackGitHubPreview,
  fetchGitHubPreview,
  formatRepoUpdatedDate,
  type GitHubPreviewPayload,
} from '../utils/githubPreview';

interface DeveloperProfilesSectionProps {
  profile: ProfileData;
}

export function DeveloperProfilesSection({
  profile,
}: DeveloperProfilesSectionProps) {
  const portraitSrc = resolvePublicAssetUrl(profile.portraitUrl);
  const [githubData, setGithubData] = useState<GitHubPreviewPayload>(() =>
    buildFallbackGitHubPreview(profile.githubUsername, portraitSrc)
  );
  const [githubLoading, setGithubLoading] = useState(true);

  const loadGitHub = useCallback(
    async (signal?: AbortSignal) => {
      setGithubLoading(true);
      const data = await fetchGitHubPreview(
        profile.githubUsername,
        portraitSrc,
        signal
      );
      if (!signal?.aborted) {
        setGithubData(data);
        setGithubLoading(false);
      }
    },
    [profile.githubUsername, portraitSrc]
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadGitHub(controller.signal);
    return () => controller.abort();
  }, [loadGitHub]);

  const googleScreenshot = resolvePublicAssetUrl(
    profile.profileScreenshots.googleDev
  );
  const instagramScreenshot = resolvePublicAssetUrl(
    profile.profileScreenshots.instagram
  );
  const githubScreenshot = resolvePublicAssetUrl(
    profile.profileScreenshots.github
  );
  const displayedRepos = githubData.repos.slice(0, 3);

  return (
    <section
      id="profiles"
      aria-labelledby="profiles-heading"
      className="mx-auto max-w-3xl scroll-mt-16 px-5 py-6 sm:px-6"
    >
      <div className="border-t border-[#DCD0BF] pt-7 dark:border-[#261E19]">
        <h2
          id="profiles-heading"
          className="text-xs font-medium tracking-wide text-[#7C4A2D] uppercase dark:text-[#C88A55]"
        >
          Profiles
        </h2>

        {/* Interactive Visual Cards: Google Developers + Instagram */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Google Developers Interactive Card */}
          <a
            id="profile-google-dev"
            data-testid="google-dev-preview-card"
            href={profile.googleDev.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#DCD0BF] bg-gradient-to-br from-[#FAF7F2] to-[#F1E8DA] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C4A2D] dark:border-[#2D241E] dark:from-[#1B1511] dark:to-[#130E0B] dark:hover:border-[#C88A55]"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4C5B2] bg-[#F5F0E8] text-[#7C4A2D] dark:border-[#3A2E25] dark:bg-[#221A15] dark:text-[#C88A55]">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-[#6B5849] dark:text-[#A99888]">
                  <span>Active Profile</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#7C4A2D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#C88A55]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h3 className="font-display mt-4 text-2xl font-semibold text-[#1E1611] dark:text-[#F5EDE3]">
                Google Developers
              </h3>
              <p className="mt-1 truncate font-mono text-xs text-[#7C4A2D] dark:text-[#C88A55]">
                me.developers.google.com/u/mrsarthak
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#B5A595]">
                Verified Google Developer badges, learning paths &amp; certificates.
              </p>

              {googleScreenshot && (
                <div className="mt-3 overflow-hidden rounded-lg border border-[#DCD0BF] dark:border-[#2F2620]">
                  <img
                    src={googleScreenshot}
                    alt="Sarthak Basu Google Developers profile screenshot"
                    className="h-32 w-full object-cover object-top"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#E6DDD0] pt-3 text-xs font-medium text-[#4C3D31] dark:border-[#261E19] dark:text-[#C9B9A9]">
              <span>Open Google Profile</span>
              <span className="font-mono text-[11px] opacity-75">u/mrsarthak</span>
            </div>
          </a>

          {/* Instagram Interactive Card */}
          <a
            id="instagram"
            data-testid="instagram-live-preview"
            href={profile.instagramPreview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#DCD0BF] bg-gradient-to-br from-[#FAF7F2] to-[#F1E8DA] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C4A2D] dark:border-[#2D241E] dark:from-[#1B1511] dark:to-[#130E0B] dark:hover:border-[#C88A55]"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4C5B2] bg-[#F5F0E8] text-[#7C4A2D] dark:border-[#3A2E25] dark:bg-[#221A15] dark:text-[#C88A55]">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-[#6B5849] dark:text-[#A99888]">
                  <span>Active Profile</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#7C4A2D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#C88A55]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h3 className="font-display mt-4 text-2xl font-semibold text-[#1E1611] dark:text-[#F5EDE3]">
                Instagram
              </h3>
              <p className="mt-1 truncate font-mono text-xs text-[#7C4A2D] dark:text-[#C88A55]">
                {profile.instagramPreview.handle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#B5A595]">
                Personal updates, developer moments &amp; direct social connect.
              </p>

              {instagramScreenshot && (
                <div className="mt-3 overflow-hidden rounded-lg border border-[#DCD0BF] dark:border-[#2F2620]">
                  <img
                    src={instagramScreenshot}
                    alt="Sarthak Basu Instagram profile screenshot"
                    className="h-32 w-full object-cover object-top"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#E6DDD0] pt-3 text-xs font-medium text-[#4C3D31] dark:border-[#261E19] dark:text-[#C9B9A9]">
              <span>Open Instagram</span>
              <span className="font-mono text-[11px] opacity-75">
                instagram.com
              </span>
            </div>
          </a>
        </div>

        {/* Compact Live GitHub Card */}
        <article
          id="profile-github"
          data-testid="github-preview-card"
          className="mt-4 rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2]/90 p-5 dark:border-[#2D241E] dark:bg-[#17120E]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4C5B2] bg-[#F5F0E8] text-[#7C4A2D] dark:border-[#3A2E25] dark:bg-[#221A15] dark:text-[#C88A55]">
                <Github className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-semibold text-[#1E1611] dark:text-[#F5EDE3]">
                    GitHub
                  </h3>
                  <span className="font-mono text-xs text-[#7C4A2D] dark:text-[#C88A55]">
                    @{githubData.user.login}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#6B5849] tabular-nums dark:text-[#9D8D7E]">
                  {githubLoading
                    ? 'Syncing live repositories...'
                    : `${githubData.user.publicRepos} public repos · ${githubData.user.followers} followers`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void loadGitHub()}
                disabled={githubLoading}
                aria-label="Refresh GitHub repositories"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4C5B2] text-[#5C4B3E] transition-colors hover:bg-[#EDE5D8] disabled:opacity-50 dark:border-[#332821] dark:text-[#B5A595] dark:hover:bg-[#241C16]"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${githubLoading ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <a
                href={profile.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#7C4A2D] px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#633820] dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66]"
              >
                <span>Open GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {githubScreenshot ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-[#DCD0BF] dark:border-[#2F2620]">
              <img
                src={githubScreenshot}
                alt="Sarthak Basu GitHub profile screenshot"
                className="w-full object-cover object-top"
              />
            </div>
          ) : !githubLoading && displayedRepos.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-[#E6DDD0] pt-4 sm:grid-cols-3 dark:border-[#261E19]">
              {displayedRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-[#E6DDD0] bg-[#F5F0E8]/70 p-3 transition-colors hover:border-[#7C4A2D] dark:border-[#29201A] dark:bg-[#110D0A] dark:hover:border-[#C88A55]"
                >
                  <div className="flex items-center gap-1.5">
                    <Code2
                      className="h-3.5 w-3.5 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]"
                      aria-hidden="true"
                    />
                    <span className="truncate text-xs font-semibold text-[#1E1611] group-hover:text-[#7C4A2D] dark:text-[#F5EDE3] dark:group-hover:text-[#C88A55]">
                      {repo.name}
                    </span>
                  </div>
                  <p className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-[#6B5849] tabular-nums dark:text-[#9D8D7E]">
                    <span>{repo.language}</span>
                    <span>{formatRepoUpdatedDate(repo.updatedAt)}</span>
                  </p>
                </a>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
