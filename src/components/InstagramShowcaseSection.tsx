import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Heart,
  Instagram,
  Maximize2,
  Play,
  X,
} from 'lucide-react';
import type { InstagramPost, ProfileData } from '../data/profileData';

interface InstagramShowcaseSectionProps {
  profile: ProfileData;
}

type ShowcaseTab = 'All' | 'Posts' | 'Tech & Setup' | 'Reels';

const TABS: ShowcaseTab[] = ['All', 'Posts', 'Tech & Setup', 'Reels'];

export function InstagramShowcaseSection({
  profile,
}: InstagramShowcaseSectionProps) {
  const { instagramShowcase } = profile;
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('All');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visiblePosts =
    activeTab === 'All'
      ? instagramShowcase.posts
      : instagramShowcase.posts.filter((p) => p.category === activeTab);

  useEffect(() => {
    if (!selectedPost) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedPost(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPost]);

  function toggleLike(postId: string) {
    setLikedIds((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-heading"
      className="scroll-mt-20 border-y border-[#342A23] bg-[#1A1410] py-16 text-[#F4EDE4] sm:py-24 dark:bg-[#0E0B09]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium text-[#D5A375]">
              04. In-Site Instagram Showcase
            </p>
            <h2
              id="instagram-heading"
              className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#FAF7F2] sm:text-5xl"
            >
              Instagram · {instagramShowcase.handle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#C9B9A9]">
            Browse my Instagram presence directly inside the site—click any post to inspect details, drop a like, or jump straight to my live profile.
          </p>
        </div>

        {/* Authentic Editorial Instagram Profile Container */}
        <div className="mt-10 rounded-2xl border border-[#352A22] bg-[#14100D] p-5 sm:p-8">
          {/* Instagram-style Profile Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-[#2E241E] pb-7 md:flex-row md:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar with warm bronze ring */}
              <div className="h-20 w-20 shrink-0 rounded-full bg-gradient-to-tr from-[#7C4A2D] via-[#C88A55] to-[#E6C7A3] p-[2.5px] sm:h-24 sm:w-24">
                <div className="h-full w-full overflow-hidden rounded-full bg-[#14100D] p-[2px]">
                  <img
                    src={profile.portraitUrl}
                    alt={`${instagramShowcase.handle} Instagram avatar`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover object-top"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-mono text-lg font-medium text-[#FAF7F2]">
                    {instagramShowcase.handle}
                  </h3>
                  <span className="text-xs text-[#BDAE9E]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs text-[#D5A375]">
                    {instagramShowcase.displayName}
                  </span>
                </div>

                <div className="mt-2 space-y-0.5 text-sm leading-relaxed text-[#D3C4B5]">
                  {instagramShowcase.bioLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#A99888]">
                  <span className="font-mono tabular-nums">
                    <strong className="font-semibold text-[#FAF7F2]">
                      {instagramShowcase.posts.length}
                    </strong>{' '}
                    featured highlights
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Class 12 CS · Site Developer</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href={instagramShowcase.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#C88A55] px-5 py-2.5 text-sm font-semibold text-[#14100D] transition-colors hover:bg-[#D89B66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88A55]"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>Follow on Instagram</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Instagram Feed Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter Instagram profile showcase"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#352A22] bg-[#1F1814] p-1"
            >
              {TABS.map((tab) => {
                const isSelected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab)}
                    className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-[#C88A55] text-[#14100D]'
                        : 'text-[#C9B9A9] hover:text-[#FAF7F2]'
                    }`}
                  >
                    {tab === 'All' ? 'All Feed' : tab}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#A99888]">
              instagram.com/mr_the_sarthak
            </p>
          </div>

          {/* 3-Column Instagram Post Grid */}
          <div
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="instagram-post-grid"
          >
            {visiblePosts.map((post) => {
              const isLiked = Boolean(likedIds[post.id]);
              const likeCount = post.likes + (isLiked ? 1 : 0);
              const hasFailed = Boolean(failedImages[post.id]);

              return (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl border border-[#2F2620] bg-[#1B1511]"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    aria-label={`Open Instagram post ${post.title}`}
                    className="relative block aspect-[4/5] w-full overflow-hidden bg-[#241C16] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88A55]"
                  >
                    {!hasFailed ? (
                      <img
                        src={post.imageUrl}
                        alt={post.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [post.id]: true,
                          }))
                        }
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2B221C] to-[#14100D] p-6">
                        <span className="font-display text-2xl text-[#E5D7C6]">
                          {post.title}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/85 via-[#0E0B09]/25 to-transparent" />

                    <div className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#14100D]/75 text-[#FAF7F2] backdrop-blur-xs transition-colors group-hover:bg-[#C88A55] group-hover:text-[#14100D]">
                      {post.isReel ? (
                        <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                      ) : (
                        <Maximize2 className="h-4 w-4" aria-hidden="true" />
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[11px] text-[#DFC4A8]">
                        {post.category} · {post.date}
                      </p>
                      <h4 className="font-display mt-0.5 text-xl font-semibold text-[#FAF7F2]">
                        {post.title}
                      </h4>
                    </div>
                  </button>

                  {/* Interactive post footer bar */}
                  <div className="flex items-center justify-between gap-2 px-4 py-3 text-xs text-[#C9B9A9]">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      aria-pressed={isLiked}
                      aria-label={
                        isLiked
                          ? `Unlike ${post.title}`
                          : `Like ${post.title}`
                      }
                      className="inline-flex min-h-[36px] items-center gap-1.5 transition-colors hover:text-[#FAF7F2]"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          isLiked
                            ? 'fill-[#C88A55] text-[#C88A55]'
                            : 'text-[#C9B9A9]'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-mono tabular-nums">{likeCount}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="min-h-[36px] font-medium text-[#D5A375] underline-offset-4 hover:underline"
                    >
                      View Caption
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Instagram Post Lightbox Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ig-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0807]/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#3A2E26] bg-[#1A1410] text-[#F4EDE4]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#342A23] px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-xs text-[#D5A375]">
                  {instagramShowcase.handle} · {selectedPost.category}
                </p>
                <h3
                  id="ig-lightbox-title"
                  className="font-display text-2xl font-semibold text-[#FAF7F2]"
                >
                  {selectedPost.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close Instagram post viewer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#3A2E26] text-[#F4EDE4] transition-colors hover:bg-[#2B221C]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 md:grid-cols-12">
              <div className="md:col-span-7">
                {selectedPost.isReel && selectedPost.videoUrl ? (
                  <video
                    src={selectedPost.videoUrl}
                    poster={selectedPost.imageUrl}
                    controls
                    className="aspect-[4/5] w-full rounded-xl bg-black object-contain"
                  />
                ) : (
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.alt}
                    referrerPolicy="no-referrer"
                    className="max-h-[62vh] w-full rounded-xl object-cover object-top"
                  />
                )}
              </div>

              <div className="flex flex-col justify-between md:col-span-5">
                <div>
                  <p className="text-xs text-[#A99888]">
                    {selectedPost.date} · {instagramShowcase.displayName}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#E3D8CC]">
                    {selectedPost.caption}
                  </p>
                </div>

                <div className="mt-6 space-y-3 border-t border-[#342A23] pt-4">
                  <button
                    type="button"
                    onClick={() => toggleLike(selectedPost.id)}
                    aria-pressed={Boolean(likedIds[selectedPost.id])}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#3D3129] bg-[#241C16] px-4 py-2 text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#31261E]"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedIds[selectedPost.id]
                          ? 'fill-[#C88A55] text-[#C88A55]'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-mono tabular-nums">
                      {likedIds[selectedPost.id] ? 'Liked' : 'Like Post'} (
                      {selectedPost.likes + (likedIds[selectedPost.id] ? 1 : 0)})
                    </span>
                  </button>

                  <a
                    href={instagramShowcase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#C88A55] px-4 py-2 text-xs font-semibold text-[#14100D] transition-colors hover:bg-[#D89B66]"
                  >
                    <span>Open {instagramShowcase.handle} on Instagram</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
