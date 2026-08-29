import { defineCollection, z } from 'astro:content';
import { sectionAliases, sectionIds } from '../lib/sections';

const tags = z.preprocess((value) => {
  if (value === undefined || value === null || value === '') return [];
  const values = Array.isArray(value) ? value : String(value).split(/[,，]/);
  return [...new Set(values.map((tag) => String(tag).trim().replace(/^#/, '')).filter(Boolean))];
}, z.array(z.string()));

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().trim().min(1).optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags,
    section: z.preprocess((value) => {
      if (typeof value !== 'string') return value;
      const key = value.trim().toLowerCase();
      return sectionAliases[key] ?? key;
    }, z.enum(sectionIds)),
  }),
});

export const collections = { blog };