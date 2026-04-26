import { getProjects } from '@/lib/projects';
import ProjectGrid from '@/components/ProjectGrid';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Exteriors',
  description: 'A selection of architectural projects from Axis Architects — residences, commercial buildings, hospitals and townships across Lucknow and beyond.',
};

export default function ExteriorsPage() {
  const projects = getProjects('exterior');
  return (
    <>
      <section className="container-edge max-w-[100rem] mx-auto pt-32 md:pt-56 pb-8 md:pb-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-smoke">Section II</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal variant="mask">
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.9]">
                Exteriors<span className="text-[var(--accent)]">.</span>
              </h1>
            </Reveal>
            <Reveal delay={140} className="mt-8 max-w-2xl body-serif text-[var(--fg-soft)] text-lg leading-relaxed">
              Houses and pavilions where the landscape comes first — and the building learns its manners from it.
            </Reveal>
          </div>
        </div>
      </section>
      <ProjectGrid projects={projects} />
    </>
  );
}
