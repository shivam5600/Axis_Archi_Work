import { getProjects } from '@/lib/projects';
import ProjectGrid from '@/components/ProjectGrid';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Interiors',
  description: 'Interior architecture by Axis Architects — residential, commercial and hospitality interiors across Lucknow.',
};

export default function InteriorsPage() {
  const projects = getProjects('interior');
  return (
    <>
      <section className="container-edge max-w-[100rem] mx-auto pt-32 md:pt-56 pb-8 md:pb-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-smoke">Section III</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal variant="mask">
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.9]">
                <em className="italic font-light">Interiors</em><span className="text-[var(--accent)]">.</span>
              </h1>
            </Reveal>
            <Reveal delay={140} className="mt-8 max-w-2xl body-serif text-[var(--fg-soft)] text-lg leading-relaxed">
              Rooms held together by their light. The materials are few, the moves are slow, and there is always somewhere to sit and read.
            </Reveal>
          </div>
        </div>
      </section>
      <ProjectGrid projects={projects} />
    </>
  );
}
