const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

(async () => {
  try {
    const hostname = 'https://meharphysiotherapyclinic.github.io';
    const basePath = 'website';
    const files = [];

    function scanDir(dir) {
      fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          scanDir(filePath);
        } else if (file.endsWith('.html')) {
          let relative = path.relative(basePath, filePath).replace(/\\/g, '/');
          files.push('/' + basePath + '/' + relative);
        }
      });
    }

    scanDir(basePath);

    const smStream = new SitemapStream({ hostname });

    files.forEach(file => {
      const filePath = path.join(basePath, file.replace('/' + basePath + '/', ''));
      const stats = fs.statSync(filePath);
      const lastmod = stats.mtime.toISOString();
      smStream.write({ url: file, changefreq: 'weekly', priority: 0.8, lastmod });
    });
    smStream.end();

    const data = await streamToPromise(smStream);
    fs.writeFileSync('website/sitemap.xml', data.toString());
    console.log('✅ Sitemap generated successfully');
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
    process.exit(1);
  }
})();
