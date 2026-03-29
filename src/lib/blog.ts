import type { CollectionEntry } from 'astro:content';

/**
 * Returns the URL slug for routing (single segment).
 * Content in blog/en/post.mdx has slug "en/post" — we strip the lang prefix
 * so [slug] routes match. Same for blog/el/post.mdx → "el/post" → "post".
 */
export function getBlogUrlSlug(post: CollectionEntry<'blog'>): string {
  const lang = post.data.lang || 'en';
  const prefix = `${lang}/`;
  return post.slug.startsWith(prefix) ? post.slug.slice(prefix.length) : post.slug;
}

/** Returns the canonical URL for a blog post. */
export function getBlogPostUrl(post: CollectionEntry<'blog'>): string {
  const urlSlug = getBlogUrlSlug(post);
  const lang = post.data.lang || 'en';
  return lang === 'en' ? `/blog/${urlSlug}` : `/${lang}/blog/${urlSlug}`;
}
