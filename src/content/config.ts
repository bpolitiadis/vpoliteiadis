import { defineCollection, z } from 'astro:content';

// Define the schema for project frontmatter
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  excerpt: z.string().optional(),
  coverImage: z.string(),
  coverVideo: z.string().optional(),
  tags: z.array(z.string()),
  techStack: z.array(z.string()),
  featured: z.boolean().default(false),
  publishedAt: z.string(), // Changed from date to string for now
  updatedAt: z.string().optional(),
  client: z.string().optional(),
  duration: z.string().optional(),
  role: z.string().optional(),
  team: z.array(z.string()).optional(),
  problem: z.string(),
  solution: z.string(),
  impact: z.string(),
  challenges: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  caseStudyUrl: z.string().optional(),
  status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
  featuredImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  // Compact page fields
  roleSummary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  // New UI/UX split sections
  about: z.string().optional(),
  roleDetails: z.string().optional(),
  roleHighlights: z.array(z.string()).optional(),
});

// Define the schema for creative pieces frontmatter
const creativeSchema = z.object({
  title: z.string(),
  description: z.string(),
  excerpt: z.string().optional(),
  mediaType: z.enum(['image', 'video', 'gallery']),
  coverImage: z.string(),
  coverVideo: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  tools: z.array(z.string()), // AI tools used (Midjourney, Kling AI, etc.)
  tags: z.array(z.string()),
  category: z.enum(['ai-art', 'digital-art', 'experiment', 'commission']),
  featured: z.boolean().default(false),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  client: z.string().optional(), // For commissioned work
  instagramUrl: z.string().optional(), // Link to Instagram post
  aspectRatio: z.string().optional(), // For responsive layout (e.g., "16/9", "1/1")
  dimensions: z.string().optional(), // Original dimensions
  prompt: z.string().optional(), // AI prompt used
  process: z.string().optional(), // Creative process description
});

// Define the schema for blog posts frontmatter
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  author: z.string().default('Vasileios Politeiadis'),
  tags: z.array(z.string()),
  category: z.enum([
    'technology',
    'ai',
    'development',
    'automation',
    'creative',
    'career',
    'tutorial',
    'finance',
  ]),
  featured: z.boolean().default(false),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  readingTime: z.string().optional(), // e.g., "5 min read"
  draft: z.boolean().default(false),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
});

// Define the collections
export const collections = {
  projects: defineCollection({
    type: 'content',
    schema: projectSchema,
  }),
  creative: defineCollection({
    type: 'content',
    schema: creativeSchema,
  }),
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
};

// Export the schema types for use in components
export type Project = z.infer<typeof projectSchema>;
export type Creative = z.infer<typeof creativeSchema>;
export type Blog = z.infer<typeof blogSchema>;
