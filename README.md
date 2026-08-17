# Mehar Physiotherapy Clinic — Official Website

Official website of **Mehar Physiotherapy Clinic**, Greater Noida West, Uttar Pradesh, India.

**Live Website:** https://meharphysiotherapyclinic.github.io/website/

The website provides information about physiotherapy services, clinical expertise, rehabilitation services, patient resources, articles, frequently asked questions, gallery content, reviews, and appointment requests.

---

## About the Clinic

**Mehar Physiotherapy Clinic** is led by **Dr. Govindpreet Singh Arneja (B.P.T., M.I.A.P.)**, Senior Physiotherapist with over 20 years of clinical experience.

### Key Services

- Orthopedic Physiotherapy
- Neurological Rehabilitation
- Sports Injury Rehabilitation
- Post-Surgical Rehabilitation
- Manual Therapy and Mobilisation
- PNF Techniques
- Spinal and Musculoskeletal Rehabilitation
- Stroke Rehabilitation
- Pediatric Physiotherapy
- Gait Analysis
- Knee Replacement Rehabilitation

---

## Website Features

- Responsive design for mobile, tablet and desktop
- Modern clinic-focused UI
- Light and dark system-theme support
- Self-hosted web fonts
- Optimized hero imagery
- SVG icon sprite
- Appointment request form
- Patient-friendly physiotherapy information
- Blog/article section
- FAQ section
- Gallery
- Patient reviews
- "Listen to Article" functionality
- Progressive Web App (PWA) support
- Service worker caching
- SEO-optimized page structure
- Schema.org structured data
- XML sitemap
- `robots.txt`
- Google Search Console verification
- Bing Webmaster verification
- Automated sitemap generation through GitHub Actions

---

## Technology Stack

This is a lightweight static website and does not require a traditional backend.

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- WebP images
- Web Fonts (`.woff2`)

### External Services

- GitHub Pages — website hosting
- Formspree — appointment form submission
- Google Maps — location/map integration
- Google Search Console — search indexing and monitoring
- Bing Webmaster Tools — search indexing and monitoring

### Automation

GitHub Actions automatically regenerates the XML sitemap and updates `lastmod` dates based on the latest Git history of HTML files.

---

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── update-sitemap.yml
│
├── assets/
│   └── icons.svg
│
├── fonts/
│   ├── dm-sans-v17-latin-regular.woff2
│   ├── dm-sans-v17-latin-500.woff2
│   ├── dm-sans-v17-latin-600.woff2
│   ├── dm-sans-v17-latin-700.woff2
│   └── dm-serif-display-v17-latin-regular.woff2
│
├── index.html
├── appointment.html
├── thankyou.html
├── faq.html
├── gallery.html
├── blog.html
├── blog1.html
├── blog2.html
├── ...
├── blog31.html
│
├── global-style.css
├── style.css
├── faq.css
├── listen.css
├── listen.js
├── reviews.js
│
├── manifest.json
├── sw.js
├── robots.txt
├── sitemap.xml
│
├── logo.webp
├── logo.png
├── doctor.webp
├── doctor-175w.webp
├── welcome-hero.webp
├── ...
│
└── README.md
```

---

## Design and Performance

The website uses a responsive, mobile-first approach with:

- Fluid typography
- Responsive layouts
- Optimized WebP imagery
- Self-hosted fonts
- CSS-based theme support
- SVG icons
- Lazy/dynamic resource loading where appropriate
- Preloaded critical hero imagery
- Minimal JavaScript dependencies
- Browser caching through the service worker

The website is designed to remain lightweight while maintaining a polished clinical/professional appearance.

---

## SEO

The website includes several technical SEO components:

- Unique page titles
- Meta descriptions
- Canonical website structure
- Schema.org structured data
- LocalBusiness / PhysiotherapyClinic structured data
- Person structured data for the physiotherapist
- Geographic information
- Service information
- `robots.txt`
- XML sitemap
- Search-engine verification files
- Automated sitemap maintenance

The primary website URL is:

```text
https://meharphysiotherapyclinic.github.io/website/
```

---

## Sitemap Automation

The workflow:

```text
.github/workflows/update-sitemap.yml
```

automatically:

1. Checks out the repository.
2. Sets up Node.js.
3. Generates the sitemap.
4. Reads the Git modification date of HTML pages.
5. Updates the corresponding `lastmod` values.
6. Commits the updated `sitemap.xml`.

The workflow runs:

- On pushes to `main`
- Automatically every day
- Manually through GitHub Actions

---

## Progressive Web App

The website includes:

```text
manifest.json
sw.js
```

The manifest provides installation metadata, while the service worker caches selected core resources for improved repeat-visit performance and basic offline resilience.

---

## Appointment Requests

Appointment requests are submitted through:

```text
appointment.html
```

The form uses Formspree for submission and redirects successful requests to:

```text
thankyou.html
```

No traditional server-side application is required.

---

## Local Development

Because the website is static, it can be opened directly in a browser.

For a more accurate development environment, use a local HTTP server.

For example, with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

---

## Deployment

The website is designed for deployment through **GitHub Pages**.

### Recommended repository settings

1. Push the project to the `main` branch.
2. Open **Settings → Pages** in the GitHub repository.
3. Select **Deploy from a branch**.
4. Select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Save the settings.

GitHub Pages will publish the static website.

---

## Updating the Website

When modifying the website:

### Content

Edit the relevant HTML page.

### Global styling

Use:

```text
global-style.css
style.css
```

### FAQ styling

Use:

```text
faq.css
```

### Article listening functionality

Use:

```text
listen.js
listen.css
```

### Reviews

Use:

```text
reviews.js
```

### Icons

Add or modify SVG symbols in:

```text
assets/icons.svg
```

### Images

Prefer optimized WebP images where practical.

### Sitemap

Normally, `sitemap.xml` should not need to be manually maintained because the GitHub Actions workflow regenerates it.

---

## Important Maintenance Guidelines

- Keep the website mobile responsive.
- Avoid unnecessary JavaScript libraries.
- Prefer WebP/optimized images.
- Keep critical resources lightweight.
- Preserve structured-data accuracy.
- Update page titles and descriptions when adding new pages.
- Test appointment submission after changing the appointment form.
- Test both light and dark system themes after major CSS changes.
- Check mobile layouts after significant header or navigation changes.
- Do not commit passwords, API keys, private tokens or other secrets.
- Keep external service credentials/configuration out of publicly visible source files whenever possible.

---

## Browser Support

The website is intended for modern browsers including:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
- Android browsers
- iOS Safari

Some advanced features, such as service-worker functionality and certain browser APIs, depend on browser support and secure-context requirements.

---

## License

The website and its original content are proprietary to **Mehar Physiotherapy Clinic**.

Unless explicitly stated otherwise, the website's:

- Text
- Images
- Branding
- Logo
- Clinical content
- Design
- Original code

may not be reproduced, redistributed or used commercially without permission.

---

## Contact

**Mehar Physiotherapy Clinic**  
Gaur City-2, Greater Noida West, Uttar Pradesh, India

**Website:**  
https://meharphysiotherapyclinic.github.io/website/

**Physiotherapist:**  
Dr. Govindpreet Singh Arneja, B.P.T., M.I.A.P.
