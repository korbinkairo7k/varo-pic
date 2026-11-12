# Varopic

A responsive React and TypeScript website built with Vite.

## Upload to GitHub

Extract this ZIP, create a GitHub repository, and upload the extracted files and folders to its root. Include the hidden `.gitignore` and `.env.example` files. Do not upload the ZIP itself or `node_modules`.

## Run locally

Install Node.js 22.12 or newer, then run:

```sh
npm ci
npm run dev
```

## Build and host

```sh
npm run build
```

Publish the resulting `dist` folder using a static hosting service. This version uses paths relative to the domain root. For GitHub Pages, use a root website repository or custom domain; hosting under a repository subfolder requires adapting the asset paths and Vite base first. Uploading source to GitHub alone does not publish the website.

Update the canonical URL and social sharing URLs in `index.html` when deploying to your own domain.

## Official branding

The supplied logo is preserved unchanged at `public/images/varopic-mark.png`. Its transparent margins are framed out for clear display in the header, footer, and mobile connection graphic. The original icon is at `public/favicon.ico`, linked from `index.html`.

Search engines control when the favicon appears after the public website is crawled.

## Contact form

Direct email links point to hello@varopic.com and samjezme@varopic.com. The form currently has no delivery service configured and clearly directs visitors to email the team.

To enable delivery, set `VITE_CONTACT_ENDPOINT` in your hosting build environment and rebuild. The endpoint must accept JSON POST requests with `name`, `email`, `company`, `inquiry`, and `message`, then return a successful HTTP status with `{ "accepted": true }` only after accepting the message for storage or delivery. Configure CORS if hosted on another origin. Keep secret keys on the server, never in `VITE_` variables. Verify actual delivery before launch.

## Assets

Image attributions are in `IMAGE-SOURCES.md`; font licenses are in `public/font-licenses/`. This archive excludes hosting credentials, Git history, dependencies, and generated build output.
