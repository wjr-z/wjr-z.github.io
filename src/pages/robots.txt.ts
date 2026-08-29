export function GET() {
  return new Response('User-agent: *\nAllow: /\n\nSitemap: https://wjr-z.github.io/sitemap.xml\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}