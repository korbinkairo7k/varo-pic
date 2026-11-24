# Varopic

Release: `varopic-preview-verified-2026-11-23-r2`

A responsive React, TypeScript and Vite website with the official Varopic logo, purple and orange accents, connection graphics for desktop and mobile, and direct email contact.

## Upload the full project to GitHub

Extract the ZIP into a fresh folder. Upload ALL extracted contents to the root of `korbinkairo7k/varo-pic`, replacing matching files. The archive contains `package.json`, `src/` and `public/` directly, with no extra enclosing folder.

Upload the entire `src` and `public` folders as well as the top-level files. Uploading only the README or the ZIP itself will leave the old website code in place.

After uploading, confirm:
- `src/App.tsx` contains `desktop-connections` and `team-card`.
- The contact section has two email links and no form.
- `public/images/varopic-mark.png` and `public/favicon.ico` exist.
- `public/version.json` identifies this release.

## Run and build

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The build produces `dist/`. Vercel settings are included in `vercel.json`: use the repository root, the Vite framework, `npm ci`, `npm run build`, and output directory `dist`. Deploy the newly uploaded commit. After deployment, check `/version.json` on your website to confirm the release.

Asset paths assume hosting at the domain root. A GitHub Pages repository subdirectory requires adjusting the base and public asset paths first. Update the canonical and sharing URLs in `index.html` for your actual production domain.

## Direct email contact

The contact card links to:
- team@varopic.com
- sam@varopic.com

These links open the visitor's email application. There is no contact form, submission endpoint, or backend to configure.

## Assets and editing

Page copy and layout are in `src/App.tsx`; styles are in `src/styles.css`. Both the desktop and mobile hero graphics use the unchanged official logo and lightweight vector icons. Motion respects reduced-motion preferences.

Image credits are in `IMAGE-SOURCES.md`; bundled typeface licenses are in `public/font-licenses/`. The ZIP excludes dependencies, generated build output, Git history, and hosting credentials.
