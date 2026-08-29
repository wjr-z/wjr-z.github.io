import { getCollection } from 'astro:content';
import { getPostSlug } from '../lib/post-meta';

const site = 'https://wjr-z.github.io';

export async function GET() {
  const posts = await getCollection('blog');
  const urls = ['', 'about/', 'archives/', 'sections/', 'tags/', ...posts.map((post) => `${encodeURI(getPostSlug(post))}/`)]
    .map((path) => `<url><loc>${site}/${path}</loc></url>`)
    .join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}