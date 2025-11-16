import { defineCollection, z } from "astro:content";

import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});
const friends = defineCollection({
  loader: file("./src/content/friends.toml"),
  schema: z.object({
    name: z.string(),
    link: z.string().url(),
    rawtext: z.boolean().default(false),
    text: z.string(),
  }),
});

const projects = defineCollection({
  loader: file("./src/content/projects.toml"),
  schema: z.object({
    title: z.string(),
    link: z.union([z.string().url(), z.string().startsWith("/")]),
    description: z.string(),
    alt: z.string(),
  }),
});

const socials = defineCollection({
  loader: file("./src/content/socials.toml"),
  schema: z.object({
    link: z.union([z.string().url(), z.string().startsWith("/")]),
    icon: z.string(),
    title: z.string().optional(),
  }),
});

export const collections = { blog, friends, projects, socials };
