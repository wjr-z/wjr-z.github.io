import siteConfig from '../data/site.json';

export const site = siteConfig;
export const sections = siteConfig.sections;

export type SectionId = keyof typeof sections;
export const sectionIds = Object.keys(sections) as [SectionId, ...SectionId[]];
export const sectionAliases = Object.entries(sections).reduce<Record<string, SectionId>>((aliases, [id, section]) => {
  [id, ...section.aliases].forEach((alias) => {
    aliases[alias.trim().toLowerCase()] = id as SectionId;
  });
  return aliases;
}, {});