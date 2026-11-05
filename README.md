# cv

# cesarb.dev

[![CI](https://github.com/cesarb1392/REPO_NAME/actions/workflows/ci.yml/badge.svg)](https://github.com/cesarb1392/REPO_NAME/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

Personal website and CV of **César Represa Bautista**, Cloud Engineer focused on Kubernetes, DevOps and security.

🌐 **Live site:** [cesarb.dev](https://cesarb.dev)

## Overview

A fast, accessible, single-page site built with plain HTML, CSS and JavaScript. It has no framework, no build step and no third-party tracking.

**Highlights**
- Semantic HTML with a skip link and keyboard navigation
- Light/dark theme toggle
- Responsive layout
- Automated checks for HTML validity, broken links and Lighthouse scores

## Project structure

```
.
├── index.html            # Page markup
├── style.css             # Styles
├── script.js             # Theme toggle, terminal effect, copy-email
├── CNAME                 # Custom domain for GitHub Pages
├── .nojekyll             # Serve files as-is (needed for .well-known)
├── robots.txt
├── sitemap.xml
├── .well-known/
│   └── security.txt
└── .github/
    ├── dependabot.yml
    └── workflows/ci.yml
```

## Run locally

```bash
git clone https://github.com/cesarb1392/REPO_NAME.git
cd REPO_NAME
python3 -m http.server 8000   # or: npx serve .
```

Open <http://localhost:8000>.

## Deployment

Hosted on **GitHub Pages** from the `main` branch (root). The custom domain is set via `CNAME`, and every push to `main` is published automatically.

## Quality checks

On every pull request and push, GitHub Actions runs:
- HTML validation (`html-validate`)
- Link checking (`lychee`)
- Lighthouse CI (performance, accessibility, best practices, SEO)

## License

- **Code** is licensed under the [MIT License](LICENSE).
- **Content** (CV text, photos, logos, personal information) is © César Represa Bautista, all rights reserved.

## Contact

[contact@cesarb.dev](mailto:contact@cesarb.dev) · [LinkedIn](https://www.linkedin.com/in/cesar-represa-bautista) · [GitHub](https://github.com/cesarb1392)
