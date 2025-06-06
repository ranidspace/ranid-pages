import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/pages/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.string().date().optional(),
  }),
});
const friends = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/friends" }),
  schema: z.object({
    name: z.string(),
    link: z.string(),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/projects" }),
});

export const collections = { blog, friends, projects };
