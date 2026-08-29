import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

export function getPostTitle(post: BlogPost): string {
  return post.data.title?.trim() || post.id.replace(/\.md$/, '').split('/').pop() || post.id;
}

export function getPostSlug(post: BlogPost): string {
  return post.id.replace(/\.md$/, '');
}
