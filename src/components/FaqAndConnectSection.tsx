import { useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Github,
  Instagram,
  Mail,
  Send,
} from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface FaqAndConnectSectionProps {
  profile: ProfileData;
  openFaqId: string | null;
  onToggleFaq: (id: string) => void;
}

export function FaqAndConnectSection({
  profile,
  openFaqId,
  onToggleFaq,
}: FaqAndConnectSectionProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    email: string;
  } | null>(null);

  async function handleCopyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      }
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please enter your name, email address, and a brief note.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please provide a valid email address so Sarthak can reply.');
      return;
    }

    setFormError(null);
    setSubmittedRecord({ name: trimmedName, email: trimmedEmail });
    setSenderName('');
    setSenderEmail('');
    setMessage('');
  }

  return (
    <>
      {/* FAQ Section paired with JSON-LD FAQPage for Search & AI Feeds */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
              04. Direct Questions &amp; Search Clarity
            </p>
            <h2
              id="faq-heading"
              className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#1E1611] sm:text-5xl dark:text-[#F4EDE4]"
            >
              Frequently Asked About {profile.fullName}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
              Structured answers designed for both visitors and search discovery—making key facts about {profile.fullName} immediately clear.
            </p>
          </div>

          <div className="divide-y divide-[#DCD0BF] border-y border-[#DCD0BF] lg:col-span-7 dark:divide-[#342A23] dark:border-[#342A23]">
            {profile.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} id={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-panel`}
                    onClick={() => onToggleFaq(faq.id)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#7C4A2D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] dark:hover:text-[#C88A55]"
                  >
                    <span className="font-display text-xl font-semibold text-[#1E1611] sm:text-2xl dark:text-[#F4EDE4]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#7C4A2D] transition-transform duration-200 dark:text-[#C88A55] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`${faq.id}-panel`}
                      className="pb-6 text-sm leading-relaxed text-[#4C3D31] dark:text-[#C9B9A9]"
                    >
                      <p className="max-w-[65ch]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connect & Social Channels Section */}
      <section
        id="connect"
        aria-labelledby="connect-heading"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-4 pb-16 sm:px-8 sm:pb-24"
      >
        <div className="rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 sm:p-10 dark:border-[#342A23] dark:bg-[#1B1511]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left column: Social links & direct email */}
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
                05. Direct Channels
              </p>
              <h2
                id="connect-heading"
                className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#1E1611] dark:text-[#F4EDE4]"
              >
                Connect With {profile.fullName}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
                Open to thoughtful conversations, creative collaborations, and professional opportunities.
              </p>

              <div className="mt-8 space-y-4">
                {/* Active Instagram Profile */}
                {profile.socials.instagram.enabled && (
                  <a
                    href={profile.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[#DCD0BF] bg-[#F5F0E8] p-4 transition-colors hover:border-[#7C4A2D] dark:border-[#342A23] dark:bg-[#14100D] dark:hover:border-[#C88A55]"
                  >
                    <div className="flex items-center gap-3.5">
                      <Instagram
                        className="h-5 w-5 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                          {profile.socials.instagram.label} · {profile.socials.instagram.handle}
                        </p>
                        <p className="text-xs text-[#6B5849] dark:text-[#A99888]">
                          {profile.socials.instagram.description}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#7C4A2D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#C88A55]"
                      aria-hidden="true"
                    />
                  </a>
                )}

                {/* LinkedIn renders automatically only when enabled: true in profileData.ts */}
                {profile.socials.linkedin.enabled && profile.socials.linkedin.url && (
                  <a
                    href={profile.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[#DCD0BF] bg-[#F5F0E8] p-4 transition-colors hover:border-[#7C4A2D] dark:border-[#342A23] dark:bg-[#14100D] dark:hover:border-[#C88A55]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                        LinkedIn · {profile.socials.linkedin.handle}
                      </p>
                      <p className="text-xs text-[#6B5849] dark:text-[#A99888]">
                        {profile.socials.linkedin.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]" />
                  </a>
                )}

                {/* GitHub Profile */}
                {profile.socials.github.enabled && (
                  <a
                    href={profile.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[#DCD0BF] bg-[#F5F0E8] p-4 transition-colors hover:border-[#7C4A2D] dark:border-[#342A23] dark:bg-[#14100D] dark:hover:border-[#C88A55]"
                  >
                    <div className="flex items-center gap-3.5">
                      <Github
                        className="h-5 w-5 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                          GitHub · {profile.socials.github.handle}
                        </p>
                        <p className="text-xs text-[#6B5849] dark:text-[#A99888]">
                          {profile.socials.github.description}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#7C4A2D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#C88A55]"
                      aria-hidden="true"
                    />
                  </a>
                )}

                {/* Direct Email Row with Copy Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DCD0BF] bg-[#F5F0E8] p-4 dark:border-[#342A23] dark:bg-[#14100D]">
                  <div className="flex items-center gap-3.5">
                    <Mail
                      className="h-5 w-5 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-[#6B5849] dark:text-[#A99888]">
                        Direct Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm font-semibold text-[#1E1611] underline-offset-4 hover:underline dark:text-[#F4EDE4]"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#CFC0AC] bg-[#FAF7F2] px-3 py-1.5 text-xs font-medium text-[#1E1611] transition-colors hover:bg-[#EDE5D8] dark:border-[#3D3129] dark:bg-[#1F1814] dark:text-[#F4EDE4] dark:hover:bg-[#2B221C]"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#7C4A2D] dark:text-[#C88A55]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: Direct Inquiry Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                noValidate
                className="space-y-5"
                aria-label={`Send a message to ${profile.fullName}`}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#4C3D31] dark:text-[#D5C6B7]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Alex Verma"
                      className="mt-2 w-full rounded-xl border border-[#CFC0AC] bg-[#F5F0E8] px-4 py-3 text-sm text-[#1E1611] placeholder:text-[#867364] focus:border-[#7C4A2D] focus:bg-white focus:outline-none dark:border-[#3D3129] dark:bg-[#14100D] dark:text-[#F4EDE4] dark:placeholder:text-[#7E6E60] dark:focus:border-[#C88A55]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#4C3D31] dark:text-[#D5C6B7]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="mt-2 w-full rounded-xl border border-[#CFC0AC] bg-[#F5F0E8] px-4 py-3 text-sm text-[#1E1611] placeholder:text-[#867364] focus:border-[#7C4A2D] focus:bg-white focus:outline-none dark:border-[#3D3129] dark:bg-[#14100D] dark:text-[#F4EDE4] dark:placeholder:text-[#7E6E60] dark:focus:border-[#C88A55]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#4C3D31] dark:text-[#D5C6B7]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a collaboration idea, project inquiry, or introduction..."
                    className="mt-2 w-full resize-y rounded-xl border border-[#CFC0AC] bg-[#F5F0E8] px-4 py-3 text-sm text-[#1E1611] placeholder:text-[#867364] focus:border-[#7C4A2D] focus:bg-white focus:outline-none dark:border-[#3D3129] dark:bg-[#14100D] dark:text-[#F4EDE4] dark:placeholder:text-[#7E6E60] dark:focus:border-[#C88A55]"
                  />
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-[#9A2E25] dark:text-[#F29C94]"
                  >
                    {formError}
                  </p>
                )}

                {submittedRecord && (
                  <div
                    role="status"
                    className="rounded-xl border border-[#CBBBA6] bg-[#EDE5D8] p-4 text-sm text-[#1E1611] dark:border-[#3D3129] dark:bg-[#261E19] dark:text-[#F4EDE4]"
                  >
                    <p className="font-semibold">
                      Note prepared for {profile.fullName}.
                    </p>
                    <p className="mt-1 text-xs text-[#5C4B3E] dark:text-[#BDAE9E]">
                      Thank you, {submittedRecord.name} ({submittedRecord.email}). Since this site is built for static GitHub hosting, click below to open your email client directly or write to {profile.email}.
                    </p>
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(`Hello Sarthak — from ${submittedRecord.name}`)}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7C4A2D] underline underline-offset-4 dark:text-[#C88A55]"
                    >
                      <span>Open in Mail App</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#7C4A2D] px-6 py-2.5 text-sm font-semibold text-[#FAF7F2] transition-colors hover:bg-[#633820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Inquiry</span>
                  </button>
                  <p className="text-xs text-[#6B5849] dark:text-[#A99888]">
                    Typical response time: within 24–48 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
