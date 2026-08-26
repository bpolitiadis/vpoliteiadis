import type { CollectionEntry } from 'astro:content';

/** Matches the 3-column grid so readers get an explicit “next page” when there are more stories. */
export const BLOG_POSTS_PER_PAGE = 3;

export function getPublishedBlogPosts(
  posts: CollectionEntry<'blog'>[],
  lang: string
): CollectionEntry<'blog'>[] {
  return posts
    .filter((post) => !post.data.draft && (post.data.lang || 'en') === lang)
    .sort(
      (a, b) =>
        new Date(b.data.publishedAt).getTime() -
        new Date(a.data.publishedAt).getTime()
    );
}

export function getBlogTotalPages(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / BLOG_POSTS_PER_PAGE));
}

export function getBlogPageSlice<T>(posts: T[], page: number): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * BLOG_POSTS_PER_PAGE;
  return posts.slice(start, start + BLOG_POSTS_PER_PAGE);
}
