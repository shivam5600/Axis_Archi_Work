import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProject, allSlugs, getRelated } from '@/lib/projects';
import Lightbox from '@/components/Lightbox';
import SketchImage from '@/components/SketchImage';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return allSlugs();
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return { title: 'Not found' };
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: [p.cover] },
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) return notFound();
  const related = getRelated(project.slug, 3);

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[100svh] w-full">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_55%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 container-edge max-w-[100rem] mx-auto pb-12 md:pb-16 text-[#F2EFEA]">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-9">
              <Reveal variant="mask">
                <p className="eyebrow opacity-70">[ {project.category} ]{project.year ? `  · ${project.year}` : ''}</p>
              </Reveal>
              <Reveal variant="mask" delay={120}>
                <h1 className="display text-[13vw] sm:text-[11vw] md:text-[8.5rem] leading-[0.92] md:leading-[0.9] mt-3">
                  {project.title}
                </h1>
              </Reveal>
            </div>
            <Reveal delay={260} className="col-span-12 md:col-span-3 body-serif text-lg leading-relaxed opacity-80">
              <p>{project.summary}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="hairline-b">
        <div className="container-edge max-w-[100rem] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--line)]">
          {[
            { k: 'Location', v: project.location },
            { k: 'Year', v: project.year },
            { k: 'Area', v: project.area },
            { k: 'Status', v: project.status },
          ].filter((row) => row.v).map((row, i) => (
            <Reveal key={row.k} delay={i * 60} className="px-6 py-8">
              <p className="eyebrow text-smoke">{row.k}</p>
              <p className="display text-2xl md:text-3xl mt-2">{row.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Long description */}
      <section className="container-edge max-w-[100rem] mx-auto py-12 md:py-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-smoke">— Project note</p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <p className="display text-balance text-3xl md:text-5xl leading-[1.1]">
                {project.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery — lightbox-enabled mosaic */}
      <section className="container-edge max-w-[100rem] mx-auto pb-12 md:pb-20">
        <div className="hairline-b pb-6 mb-12 flex items-end justify-between">
          <p className="eyebrow text-smoke">[ Gallery ] {project.images.length.toString().padStart(2, '0')} frames</p>
          <p className="eyebrow text-smoke hidden md:block">Click to enlarge</p>
        </div>
        <Lightbox images={project.images} alt={project.title} />
      </section>

      {/* Pull quote */}
      <section className="container-edge max-w-[100rem] mx-auto pb-16 md:pb-24">
        <div className="hairline-b pb-6 mb-12">
          <p className="eyebrow text-smoke">— A note on the work</p>
        </div>
        <Reveal>
          <p className="display text-balance text-4xl md:text-7xl leading-[0.96]">
            “Every project is a negotiation between <em className="italic font-light text-[var(--accent)]">light</em>, <em className="italic font-light">material</em>, and the <em className="italic font-light">slow time</em> of a place.”
          </p>
        </Reveal>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-edge max-w-[100rem] mx-auto pb-12 md:pb-20">
          <div className="hairline-b pb-6 mb-12 flex items-end justify-between">
            <p className="eyebrow text-smoke">— Continue reading</p>
            <Link href={`/projects#${project.category}`} className="eyebrow ink-link">All {project.type} projects →</Link>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80} className="col-span-12 md:col-span-4">
                <Link href={`/projects/${r.slug}`} className="block">
                  <div className="img-hover">
                    <SketchImage src={r.cover} alt={r.title} aspect="aspect-[4/5]" mode="static" />
                  </div>
                  <h3 className="display text-3xl mt-5"><span className="ink-link">{r.title}</span></h3>
                  <p className="eyebrow text-smoke mt-2">{r.location} · {r.year}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
