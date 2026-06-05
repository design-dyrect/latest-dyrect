export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/studio/'],
      },
    ],
    sitemap: 'https://dyrect.co/sitemap.xml',
    host: 'https://dyrect.co',
  };
}
