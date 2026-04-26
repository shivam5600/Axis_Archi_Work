import data from '@/data/projects.json';

export const studio = data.studio;
export const projects = data.projects;
export const slideshow = data.slideshow;
export const categories = data.categories;

export function getProjects(category) {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getRelated(slug, limit = 3) {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export function allSlugs() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function projectsByCategory() {
  return categories.map((cat) => ({
    ...cat,
    projects: projects.filter((p) => p.category === cat.slug),
  }));
}
