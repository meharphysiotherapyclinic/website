const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readdirSync, statSync, mkdirSync, existsSync } = require('fs');
const path = require('path');

// Folder containing your website HTML files
const WEBSITE_DIR = path.join(__dirname, 'website'); // adjust if HTML files are elsewhere
const OUTPUT_FILE = path.join(__dirname, 'sitemap.xml'); // sitemap at repo root
const BASE_URL = 'https://meharphysiotherapyclinic.github.io/website'; // Your live URL

// Ensure website folder exists
if (!existsSync(WEBSITE_DIR)) {
  console.warn('⚠ Website folder not found, creating it...');
  mkdirSync(WEBSITE_DIR, { recursive: true });
}

// Recursively find HTML files (ignore non-HTML)
function getHtmlFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

// Generate sitemap
async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({ hostname: BASE_URL });
    const writeStream = createWriteStream(OUTPUT_FILE);
    sitemap.pipe(writeStream);

    const htmlFiles = getHtmlFiles(WEBSITE_DIR);
    console.log('Adding URLs to sitemap:');
    htmlFiles.forEach(file => {
      const relativePath = path.relative(WEBSITE_DIR, file).replace(/\\/g, '/');
      const urlPath = relativePath === 'index.html' ? '/' : '/' + relativePath;

      const stats = statSync(file); // get file last modified date
      sitemap.write({
        url: urlPath,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: stats.mtime.toISOString() // dynamically add lastmod
      });

      console.log('✔', urlPath, 'lastmod:', stats.mtime.toISOString());
    });

    sitemap.end();
    await streamToPromise(sitemap);
    console.log('✅ Sitemap generated successfully at', OUTPUT_FILE);
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
  }
}

generateSitemap();
