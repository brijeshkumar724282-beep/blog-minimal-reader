# Folio · Minimal Blog Template

A calm, reading first blog template. Paper light theme, serif headlines, one terracotta accent, solid colors only. Built with Vite + React + Tailwind CSS + Framer Motion.

## Features

1. **Home** — featured essay, 8 card grid, topic filter pills with counts, live search
2. **Article view** — hash based routing (`#/post/:slug`), sticky table of contents, reading progress bar, copy link share button
3. **Newsletter + trending** — mock signup stored in `localStorage`, trending sidebar ranked by score
4. **Author + topics** — about author card, topic browse row
5. **Footer + dark reading mode** — persisted theme toggle, responsive accessible layout

## Run

```bash
npm install && npm run dev
```

Build for static hosting:

```bash
npm install && npm run build
```

Preview the build:

```bash
npm run preview
```

## Customize

- **Posts:** edit `src/data/posts.js` — add objects with `slug`, `title`, `excerpt`, `category`, `date`, `readTime`, `cover`, `coverInk`, `sections`. Set one post `featured: true`.
- **Topics:** edit the `categories` array in the same file.
- **Author:** edit the `author` object in the same file.
- **Colors:** change `paper`, `ink`, `accent` in `tailwind.config.js`. Keep fills solid.
- **Fonts:** headline font is Newsreader (loaded in `src/index.css`), body is Inter. Swap via the `fontFamily` theme keys.
- **Base path:** `vite.config.js` uses `base: './'` so the build works from any folder or static host.

## Assumptions

- Cover art is solid color blocks with the title initial, so the template ships with zero image assets.
- Newsletter signup is a local mock only; no network calls, address saved under `folio-subscriber` in `localStorage`.
- Article routing uses the URL hash, so deep links work on any static file host with no server rewrites.
