'use client';

import { useState } from 'react';
import { studio } from '@/lib/projects';
import Reveal from '@/components/Reveal';

export default function ContactPage() {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    kind: 'New project',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = state.subject || `Studio Inquiry — ${state.kind}`;
    const body = `Name: ${state.name}\nEmail: ${state.email}\nPhone: ${state.phone}\nInquiry: ${state.kind}\n\n${state.message}`;
    window.location.href = `mailto:${studio.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <section className="container-edge max-w-[100rem] mx-auto pt-28 md:pt-44 pb-20 md:pb-32">
        <div className="grid grid-cols-12 gap-6 items-end mb-12 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-smoke">— Section VI / Contact</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal variant="mask">
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.92] md:leading-[0.9]">Let's work</h1>
            </Reveal>
            <Reveal variant="mask" delay={120}>
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.92] md:leading-[0.9]">
                <em className="italic font-light">together</em><span className="text-[var(--accent)]">.</span>
              </h1>
            </Reveal>
            <Reveal delay={300} className="mt-6 max-w-2xl text-[var(--fg-soft)] body-serif text-lg leading-relaxed">
              Tell us about your project — site, scope, and when you'd like to begin. We typically reply within one business day.
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <Reveal className="col-span-12 md:col-span-7">
            <form onSubmit={onSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                <Field label="Your name">
                  <input
                    required
                    type="text"
                    value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                    className="input"
                    placeholder="Full name"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    value={state.phone}
                    onChange={(e) => setState({ ...state, phone: e.target.value })}
                    className="input"
                    placeholder="+91 ..."
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    className="input"
                    placeholder="you@email.com"
                  />
                </Field>
                <Field label="Subject">
                  <input
                    type="text"
                    value={state.subject}
                    onChange={(e) => setState({ ...state, subject: e.target.value })}
                    className="input"
                    placeholder="A short subject line"
                  />
                </Field>
              </div>

              <Field label="The inquiry is about">
                <div className="flex flex-wrap gap-3 mt-3">
                  {['New project', 'Residential', 'Commercial', 'Institutional', 'Press', 'Career'].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setState({ ...state, kind: opt })}
                      className={`eyebrow px-4 py-2 hairline rounded-full transition-colors ${
                        state.kind === opt
                          ? 'bg-[var(--fg)] text-[var(--bg)] border-transparent'
                          : 'text-[var(--fg-soft)]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="A few lines about the project">
                <textarea
                  required
                  rows={6}
                  value={state.message}
                  onChange={(e) => setState({ ...state, message: e.target.value })}
                  className="input resize-y"
                  placeholder="Site, scope, when you'd like to begin…"
                />
              </Field>

              <button
                type="submit"
                className="inline-flex items-center gap-3 px-7 py-4 bg-[var(--accent)] text-white eyebrow hover:bg-[var(--accent-strong)] transition-colors"
                data-cursor="hover"
              >
                Send Message
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
                  <path d="M0 7h20m0 0L14 1m6 6l-6 6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              {sent && (
                <p className="eyebrow text-[var(--accent)]">Your mail client is opening — thank you.</p>
              )}
            </form>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-4 md:col-start-9 space-y-12">
            <div>
              <p className="eyebrow text-smoke mb-3">Studio</p>
              <p className="body-serif leading-relaxed text-[var(--fg-soft)]">{studio.contact.address}</p>
            </div>
            <div>
              <p className="eyebrow text-smoke mb-3">Direct</p>
              <a className="block py-1" href={`tel:${studio.contact.phone.replace(/\s/g, '')}`}>
                <span className="ink-link">{studio.contact.phone}</span>
              </a>
              <a className="block py-1" href={`mailto:${studio.contact.email}`}>
                <span className="ink-link">{studio.contact.email}</span>
              </a>
            </div>
            <div>
              <p className="eyebrow text-smoke mb-3">Hours</p>
              <p className="text-[var(--fg-soft)]">{studio.contact.hours}</p>
            </div>
          </Reveal>
        </div>

        <style jsx>{`
          :global(.input) {
            width: 100%;
            background: transparent;
            color: var(--fg);
            border: 0;
            border-bottom: 1px solid var(--line);
            padding: 0.75rem 0;
            font-family: var(--font-display);
            font-size: 1.5rem;
            letter-spacing: -0.01em;
            outline: none;
            transition: border-color 400ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          :global(.input::placeholder) {
            color: var(--fg-soft);
            opacity: 0.5;
          }
          :global(.input:focus) {
            border-color: var(--accent);
          }
        `}</style>
      </section>

      {/* Map */}
      <section className="container-edge max-w-[100rem] mx-auto pb-32">
        <div className="hairline-b pb-6 mb-8 flex items-end justify-between">
          <p className="eyebrow text-smoke">— On the map</p>
          <p className="eyebrow text-smoke">{studio.contact.addressShort}</p>
        </div>
        <div className="aspect-[16/8] hairline overflow-hidden">
          <iframe
            src={studio.contact.mapsEmbed}
            title="Studio location"
            className="w-full h-full grayscale-[0.4] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="eyebrow text-smoke">{label}</span>
      {children}
    </label>
  );
}
