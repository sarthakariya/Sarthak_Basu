export interface GitHubUserSummary {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

export interface GitHubRepoSummary {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  isFork: boolean;
}

export interface GitHubPreviewPayload {
  user: GitHubUserSummary;
  repos: GitHubRepoSummary[];
  source: 'live' | 'fallback';
}

export function normalizeGitHubUser(
  raw: Record<string, unknown>,
  fallbackUsername: string
): GitHubUserSummary {
  const login =
    typeof raw.login === 'string' && raw.login.trim()
      ? raw.login
      : fallbackUsername;
  return {
    login,
    name:
      typeof raw.name === 'string' && raw.name.trim()
        ? raw.name
        : 'Sarthak Basu',
    avatarUrl: typeof raw.avatar_url === 'string' ? raw.avatar_url : '',
    bio:
      typeof raw.bio === 'string' && raw.bio.trim()
        ? raw.bio
        : 'Class 12 Computer Science student, web & site developer, tech enthusiast, and gamer.',
    publicRepos: typeof raw.public_repos === 'number' ? raw.public_repos : 0,
    followers: typeof raw.followers === 'number' ? raw.followers : 0,
    following: typeof raw.following === 'number' ? raw.following : 0,
    htmlUrl:
      typeof raw.html_url === 'string' && raw.html_url.trim()
        ? raw.html_url
        : `https://github.com/${login}`,
  };
}

export function normalizeGitHubRepos(
  rawList: unknown,
  limit = 4
): GitHubRepoSummary[] {
  if (!Array.isArray(rawList)) return [];

  const parsed: GitHubRepoSummary[] = rawList
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === 'object' && item !== null && typeof (item as Record<string, unknown>).name === 'string'
    )
    .map((item) => ({
      id: typeof item.id === 'number' ? item.id : Math.floor(Math.random() * 100000),
      name: String(item.name),
      description:
        typeof item.description === 'string' && item.description.trim()
          ? item.description
          : 'Web & software project published on GitHub.',
      htmlUrl:
        typeof item.html_url === 'string'
          ? item.html_url
          : `https://github.com/sarthakariya/${String(item.name)}`,
      language:
        typeof item.language === 'string' && item.language.trim()
          ? item.language
          : 'Web',
      stars:
        typeof item.stargazers_count === 'number' ? item.stargazers_count : 0,
      forks: typeof item.forks_count === 'number' ? item.forks_count : 0,
      updatedAt:
        typeof item.updated_at === 'string' ? item.updated_at : '',
      isFork: Boolean(item.fork),
    }));

  // Prioritize non-fork repositories, then highest stars, then most recent updates
  parsed.sort((a, b) => {
    if (a.isFork !== b.isFork) return a.isFork ? 1 : -1;
    if (b.stars !== a.stars) return b.stars - a.stars;
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  return parsed.slice(0, limit);
}

export function formatRepoUpdatedDate(isoDate: string): string {
  if (!isoDate) return 'Active';
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return 'Active';
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function buildFallbackGitHubPreview(
  username: string,
  portraitUrl: string
): GitHubPreviewPayload {
  return {
    source: 'fallback',
    user: {
      login: username,
      name: 'Sarthak Basu',
      avatarUrl: portraitUrl,
      bio: 'Class 12 Computer Science student, web & site developer, tech enthusiast, and gamer.',
      publicRepos: 0,
      followers: 0,
      following: 0,
      htmlUrl: `https://github.com/${username}`,
    },
    repos: [],
  };
}

export async function fetchGitHubPreview(
  username: string,
  portraitUrl: string,
  signal?: AbortSignal
): Promise<GitHubPreviewPayload> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal,
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`,
        {
          headers: { Accept: 'application/vnd.github+json' },
          signal,
        }
      ),
    ]);

    if (!userRes.ok) {
      return buildFallbackGitHubPreview(username, portraitUrl);
    }

    const userJson = (await userRes.json()) as Record<string, unknown>;
    const reposJson = reposRes.ok ? ((await reposRes.json()) as unknown) : [];

    return {
      source: 'live',
      user: normalizeGitHubUser(userJson, username),
      repos: normalizeGitHubRepos(reposJson, 4),
    };
  } catch {
    return buildFallbackGitHubPreview(username, portraitUrl);
  }
}
