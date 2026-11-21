import { useEffect, useState } from 'react';
import { Maximize2, Play, X } from 'lucide-react';
import type { MediaEntry } from '../data/profileData';

interface MediaGallerySectionProps {
  media: MediaEntry[];
  fullName: string;
}

type MediaFilter = 'all' | 'photo' | 'video';

export function MediaGallerySection({
  media,
  fullName,
}: MediaGallerySectionProps) {
  const [filter, setFilter] = useState<MediaFilter>('all');
  const [selectedItem, setSelectedItem] = useState<MediaEntry | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleMedia =
    filter === 'all' ? media : media.filter((item) => item.type === filter);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!selectedItem) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-20 bg-[#1A1410] py-16 text-[#F4EDE4] sm:py-24 dark:bg-[#0E0B09]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium text-[#D5A375]">
              03. Visual Journal · Photos &amp; Reels
            </p>
            <h2
              id="gallery-heading"
              className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#FAF7F2] sm:text-5xl"
            >
              Moments, Craft &amp; Motion
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#C9B9A9]">
              A curated dark-espresso gallery frame built to showcase {fullName}&rsquo;s photography and short video reels—ready to update directly with personal media before publishing to GitHub.
            </p>
          </div>

          {/* Interactive Media Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter visual journal by media type"
            className="inline-flex w-fit items-center gap-1 rounded-xl border border-[#352A22] bg-[#241C16] p-1"
          >
            {(
              [
                { id: 'all', label: 'All Media' },
                { id: 'photo', label: 'Photography' },
                { id: 'video', label: 'Video Reels' },
              ] as const
            ).map((tab) => {
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(tab.id)}
                  className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#C88A55] text-[#14100D]'
                      : 'text-[#C9B9A9] hover:text-[#FAF7F2]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media-first Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleMedia.map((item) => {
            const isFeatured = item.featured && filter === 'all';
            const hasFailed = Boolean(failedImages[item.id]);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                aria-label={`Open ${item.title} in fullscreen viewer`}
                className={`group relative overflow-hidden rounded-2xl border border-[#352A22] bg-[#241C16] text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C88A55] ${
                  isFeatured ? 'md:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  {!hasFailed ? (
                    <img
                      src={item.imageUrl}
                      alt={item.alt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2E241D] to-[#1A1410] p-6">
                      <span className="font-display text-2xl text-[#E5D7C6]">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Measured dark contrast scrim for readable text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/90 via-[#0E0B09]/35 to-transparent" />

                  {/* Media affordance icon top-right */}
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#14100D]/75 text-[#FAF7F2] backdrop-blur-xs transition-colors group-hover:bg-[#C88A55] group-hover:text-[#14100D]">
                    {item.type === 'video' ? (
                      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    ) : (
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    )}
                  </div>

                  {/* Clean unboxed editorial caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#DFC4A8]">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{item.date}</span>
                    </div>
                    <h3 className="font-display mt-1 text-2xl font-semibold text-[#FAF7F2] sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#D3C4B5] sm:text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0A08]/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#3A2E26] bg-[#1A1410] text-[#F4EDE4]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#342A23] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs text-[#D5A375]">
                  {selectedItem.category} · {selectedItem.date}
                </p>
                <h3
                  id="lightbox-title"
                  className="font-display text-2xl font-semibold text-[#FAF7F2]"
                >
                  {selectedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close media viewer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#3A2E26] text-[#F4EDE4] transition-colors hover:bg-[#2B221C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88A55]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {selectedItem.type === 'video' && selectedItem.videoUrl ? (
                <video
                  src={selectedItem.videoUrl}
                  poster={selectedItem.imageUrl}
                  controls
                  className="aspect-video w-full rounded-xl bg-black object-contain"
                />
              ) : (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-full rounded-xl object-cover"
                />
              )}
              <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-[#D3C4B5]">
                {selectedItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
