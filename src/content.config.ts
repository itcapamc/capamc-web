import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const linkSchema = z.object({ label: z.string(), href: z.string() });
const accent = z.enum(["seal", "jade", "gold"]);

const homeSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    primary: linkSchema,
    secondary: linkSchema.optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  slides: z
    .array(
      z.object({
        title: z.string(),
        image: z.string(),
        imageAlt: z.string().optional(),
      }),
    )
    .default([]),
  pillars: z
    .array(
      z.object({
        title: z.string(),
        body: z.string(),
        accent: accent.default("seal"),
      }),
    )
    .default([]),
});

const proseSchema = z.object({
  title: z.string(),
  intro: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const giveSchema = proseSchema.extend({
  methods: z
    .array(
      z.object({
        title: z.string(),
        body: z.string(),
        cta: linkSchema.optional(),
        accent: accent.default("seal"),
      }),
    )
    .default([]),
});

const clubsSchema = z.object({
  title: z.string(),
  intro: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      category: z.string().optional(),
      description: z.string(),
      image: z.string().optional(),
      contact: z.string().optional(),
      link: z.string().optional(),
    }),
  ),
});

const awardsSchema = z.object({
  title: z.string(),
  intro: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      type: z.string().optional(),
      description: z.string(),
      deadline: z.string().optional(),
      link: linkSchema.optional(),
    }),
  ),
});

const newsSchema = z.object({
  title: z.string(),
  date: z.string(),
  location: z.string().optional(),
  excerpt: z.string(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const collections = {
  home: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/home" }),
    schema: homeSchema,
  }),
  about: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/about" }),
    schema: proseSchema,
  }),
  resources: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/resources" }),
    schema: proseSchema,
  }),
  give: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/give" }),
    schema: giveSchema,
  }),
  clubs: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/clubs" }),
    schema: clubsSchema,
  }),
  awards: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/awards" }),
    schema: awardsSchema,
  }),
  // ids come out as "en/2026-scholarship-open", "zh/pvsa-submissions", etc.
  news: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
    schema: newsSchema,
  }),
};
