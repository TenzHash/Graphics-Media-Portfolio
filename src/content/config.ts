import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    // YOU MUST ADD THIS LINE:
    video_url: z.string().optional(), 
    featured: z.boolean().default(true),
  }),
});

export const collections = { projects };