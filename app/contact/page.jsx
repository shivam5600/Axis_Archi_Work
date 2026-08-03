import { studio } from '@/lib/projects';
import Reveal from '@/components/Reveal';

export default function ContactPage() {
  return (
    <section className="container-edge max-w-[100rem] mx-auto pt-28 md:pt-44 pb-24 md:pb-32">
      <div className="grid grid-cols-12 gap-10 md:gap-12 items-center">
        {/* LEFT, compact map */}
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <div className="hairline overflow-hidden" style={{ height: 'min(58vh, 440px)' }}>
              <iframe
                src={studio.contact.mapsEmbed}
                title="Studio location"
                className="w-full h-full grayscale-[0.4] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        {/* RIGHT, studio details, vertically centred with the map */}
        <Reveal delay={120} className="col-span-12 md:col-span-4 md:col-start-9 space-y-10">
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
    </section>
  );
}
