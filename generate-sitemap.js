const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

const baseUrl = "https://yourdomain.com"; // <-- replace with your actual website URL

// Collect all .html files
function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDir(filePath, fileList);
    } else if (file.endsWith(".html")) {
      // Turn file path into a URL path
      let urlPath = path.relative(".", filePath).replace(/\\/g, "/");

      // remove "index.html" from URLs
      if (urlPath.endsWith("index.html")) {
        urlPath = urlPath.replace("index.html", "");
      }

      fileList.push(`/${urlPath}`);
    }
  });

  return fileList;
}

(async () => {
  try {
    console.log("🔍 Scanning repo for .html files...");
    const links = scanDir(".");

    if (links.length === 0) {
      throw new Error("No .html files found in repo!");
    }

    console.log("✅ Found HTML files:", links);

    // Generate sitemap
    const stream = new SitemapStream({ hostname: baseUrl });
    links.forEach((link) => stream.write({ url: link, changefreq: "weekly" }));
    stream.end();

    const data = await streamToPromise(stream);

    // Ensure folder exists (repo root)
    const outputPath = path.join(".", "sitemap.xml");
    fs.writeFileSync(outputPath, data.toString());

    console.log("🎉 Sitemap generated successfully:", outputPath);
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
    process.exit(1);
  }
})();
