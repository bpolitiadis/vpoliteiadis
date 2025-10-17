import { test, expect } from '@playwright/test';

test.describe('Assets integrity', () => {
  test('no 404s or MIME errors on key pages', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/creative', '/blog'];
    for (const path of pages) {
      const responses: { url: string; status: number; contentType: string | null }[] = [];
      page.on('response', (res) => {
        const url = res.url();
        const ct = res.headers()['content-type'] || null;
        // Only track images and scripts
        if (/(\.png|\.jpe?g|\.webp|\.avif|\.svg|\/images\/|\/scripts\/|_astro\/)/i.test(url)) {
          responses.push({ url, status: res.status(), contentType: ct });
        }
      });

      await page.goto(path, { waitUntil: 'networkidle' });

      // Assert no 404s
      const notFound = responses.filter((r) => r.status === 404);
      expect.soft(notFound, `${path} has 404 assets`).toHaveLength(0);

      // Assert images have proper content-type
      const wrongMime = responses.filter(
        (r) => /\.(png|jpe?g|webp|avif|svg)/i.test(r.url) && r.contentType && !/image\//i.test(r.contentType)
      );
      expect.soft(wrongMime, `${path} has wrong MIME for images`).toHaveLength(0);
    }
  });
});


