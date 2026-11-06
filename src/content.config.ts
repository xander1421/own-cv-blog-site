import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', retainBody: true }),
  schema: z.object({
    title: z.string(),
    // Short title for <title>/og:title only (search results truncate ~60 chars);
    // the full `title` stays as the on-page h1.
    seoTitle: z.string().optional(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
