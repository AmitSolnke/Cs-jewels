const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const generateSitemap = async () => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/aboutus', changefreq: 'weekly', priority: 0.8 },
    { url: '/enash', changefreq: 'weekly', priority: 0.8 },
    { url: '/contact-us', changefreq: 'weekly', priority: 0.8 },
    { url: '/product-details/:id', changefreq: 'weekly', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
    { url: '/find-a-store', changefreq: 'monthly', priority: 0.7 },
    { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.4 },
    { url: '/CSR-Policy', changefreq: 'yearly', priority: 0.4 },
    { url: '/refund-policy', changefreq: 'yearly', priority: 0.4 },
    // Add other routes or fetch dynamically
  ];

  const stream = new SitemapStream({ hostname: 'https://www.csjewels.com' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  stream.pipe(writeStream);

  links.forEach((link) => stream.write(link));
  stream.end();

  await streamToPromise(stream);
  console.log('Sitemap generated!');
};

generateSitemap();
