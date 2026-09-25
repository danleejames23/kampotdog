# Kampot Dog Sanctuary website

A fully static React site for Kampot Dog Sanctuary. Dog profiles, blog posts, counters, videos, team images and the adoption booklet are bundled into the frontend, so the public site does not require an API or database.

## Local development

```bash
cd Client
npm install
npm start
```

## Production build

```bash
cd Client
npm run build
```

Netlify configuration lives in the repository-root `netlify.toml`. Contact, sponsorship-interest and dog-return requests are captured with Netlify Forms.

Static content is maintained in `Client/src/data/siteData.js`. Dog and team photos are served from `Client/public/images`.
