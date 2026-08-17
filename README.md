# Mehar Physiotherapy Clinic — Official Website

Official website of **Mehar Physiotherapy Clinic**, Greater Noida West, Uttar Pradesh, India.

**Live Website:** https://meharphysiotherapyclinic.github.io/website/

The website provides information about physiotherapy services, rehabilitation, patient resources, articles, FAQs, gallery, reviews, and appointment requests.

## About

The clinic is led by **Dr. Govindpreet Singh Arneja (B.P.T., M.I.A.P.)**, Senior Physiotherapist with over 20 years of clinical experience.

## Features

- Responsive, mobile-first design
- Light and dark system-theme support
- Optimized WebP imagery
- Self-hosted web fonts
- SVG icon system
- Appointment request form
- Physiotherapy services and patient resources
- Blog and article section
- FAQ and gallery
- Patient reviews
- "Listen to Article" functionality
- Progressive Web App (PWA) support
- Service-worker caching
- SEO and Schema.org structured data
- XML sitemap and `robots.txt`
- Automated sitemap maintenance with GitHub Actions

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- WebP
- WOFF2 fonts
- GitHub Pages
- GitHub Actions
- Formspree
- Google Maps

This is a lightweight static website and does not require a traditional backend.

## Project Structure

```text
.
├── .github/workflows/
│   └── update-sitemap.yml
├── assets/
│   └── icons.svg
├── fonts/
├── index.html
├── appointment.html
├── thankyou.html
├── faq.html
├── gallery.html
├── blog.html
├── blog1.html
├── ...
├── global-style.css
├── style.css
├── faq.css
├── listen.css
├── listen.js
├── reviews.js
├── manifest.json
├── sw.js
├── robots.txt
├── sitemap.xml
└── README.md
```

## SEO & Performance

The website uses:

- Structured data and canonical metadata
- Responsive layouts and optimized imagery
- Self-hosted fonts
- Lazy/dynamic resource loading where appropriate
- Service-worker caching
- `robots.txt` and XML sitemap
- Automated sitemap and `lastmod` maintenance

The sitemap workflow runs automatically through GitHub Actions on repository updates, on a scheduled basis, and manually when required.

## Appointment Requests

The appointment page uses **Formspree** for form submission and redirects successful submissions to the dedicated thank-you page.

```text
appointment.html → Formspree → thankyou.html
```

## Deployment

The website is designed for **GitHub Pages**.

For local testing:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Maintenance

- Keep page content, SEO metadata, and structured data accurate.
- Keep images optimized.
- Test appointment submission after form changes.
- Test mobile layouts and light/dark themes after major CSS changes.
- Keep external credentials and private tokens out of the repository.
- Let GitHub Actions maintain `sitemap.xml` rather than editing it manually.

## License

The website, branding, content, images, design, and original source code are proprietary to **Mehar Physiotherapy Clinic** and may not be reproduced, redistributed, or used commercially without permission.
