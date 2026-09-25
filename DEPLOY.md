# Deploy to Netlify or Render

This repository is now a static site and does not need the former backend. It includes configuration for both Netlify and Render.

## Render settings

The repository-root `render.yaml` is ready to use as a Blueprint. It builds the React app from `Client` and serves `Client/build` as a static site with SPA routing.

If configuring Render manually, use:

- Environment: Static Site
- Build command: `cd Client && npm ci && npm run build`
- Publish directory: `Client/build`
- Rewrite: `/*` → `/index.html`

## Netlify settings

- Base directory: `Client`
- Build command: `npm run build`
- Publish directory: `build`
- Node version: `20`

The repository-root `netlify.toml` already contains these settings, SPA routing, cache headers and security headers.

## Deploy

Connect this repository in Netlify and deploy. Netlify will build the React app and detect the three static forms automatically:

- `contact`
- `sponsor-interest`
- `dog-return`

After assigning the final domain, add a sitemap using that real domain before submitting it to search engines.
