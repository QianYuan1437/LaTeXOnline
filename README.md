# LaTeXOnline

An online LaTeX formula editor that can be deployed directly to GitHub Pages, powered by MathJax 4 for live rendering.

## Features

- Live LaTeX formula preview
- Inline / display mode toggle
- English / Chinese UI toggle
- Starter templates and quick snippets
- Automatic local persistence
- One-click copy for raw, wrapped, or shareable source
- SVG and PNG export from rendered formulas

## Deployment

This is a pure static site and requires no build step.

1. Publish the repository to GitHub.
2. Enable GitHub Pages in the repository settings.
3. Deploy from the root of the default branch.

Expected deployment URL:

`https://qianyuan1437.github.io/LaTeXOnline`

## Tech

- `index.html`
- `styles.css`
- `app.js`
- MathJax CDN: `https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js`
