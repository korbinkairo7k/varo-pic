# Varopic: complete current website

Release: `varopic-brand-refresh-2026-11-14-v2`

This source matches the current local preview: the official logo, purple and orange accents, redesigned mobile connection graphic, compact header and contact form, and existing animations.

## Replace the old GitHub files

1. Extract this ZIP into a new, empty local folder. The extracted root contains `package.json`, `index.html`, `src`, and `public` directly. There is no extra `varopic` folder inside the ZIP.
2. Open https://github.com/korbinkairo7k/varo-pic and select the `main` branch.
3. At the repository root, choose **Add file > Upload files**.
4. Upload ALL the extracted files and folders, including the entire `src` and `public` folders. Replace files with the same paths. Include `.gitignore` and `.env.example` if hidden by your file browser.
5. Commit the uploaded files to the branch used by your host.

Do not upload the ZIP itself, and do not place these files in another enclosing folder. An uploaded ZIP does not replace the application files used by the build.

The repository inspected before this release had a newer README alongside older application code. It also lacked the official PNG logo and ICO favicon. Replacing only the top-level files is not enough: replace `src/App.tsx` and `src/styles.css`, and upload the `public` assets too.

## Confirm the upload is current

After committing, check these exact paths in GitHub:

- `src/App.tsx` contains `Your business, connected.` and `function BrandMark()`.
- `src/styles.css` contains `--brand-purple:#5416ce`.
- `public/images/varopic-mark.png` exists.
- `public/favicon.ico` exists.
- `public/version.json` contains `varopic-brand-refresh-2026-11-14-v2`.

## Deployment

Use Node.js 22.12 or newer. The build settings are:

- Project root: repository root (the folder containing `package.json`).
- Framework: Vite.
- Install command: `npm ci`.
- Build command: `npm run build`.
- Published output: `dist`.

`vercel.json` supplies the Vite install/build/output settings for Vercel. Confirm that your hosting project uses this repository, its updated branch, and the repository root, then deploy the new commit. Redeploying an older commit will continue showing the old website.

After deployment, open `/version.json` on your actual website. It should display `varopic-brand-refresh-2026-11-14-v2`. A missing/different release means the new package is not being served at that URL.

Hosting reference: https://vercel.com/docs/builds/configure-a-build

This version uses domain-root asset paths. GitHub Pages under `/varo-pic/` requires a base-path adjustment; uploading this source to GitHub alone does not enable Pages hosting. Update the canonical and social sharing URLs in `index.html` for your production domain.

## Run locally

```sh
npm ci
npm run dev
```

## Build locally

```sh
npm run build
npm run preview
```

## Contact form and assets

The email links point to hello@varopic.com and samjezme@varopic.com. The contact form remains unconnected and directs visitors to email the team. To activate it, configure `VITE_CONTACT_ENDPOINT` before building. The endpoint must accept JSON POST requests with `name`, `email`, `company`, `inquiry`, and `message`, and return a successful HTTP status with `{ "accepted": true }` after accepting the message for storage or delivery. Configure CORS if needed. Never put secret keys in frontend variables. Verify real delivery before accepting inquiries.

The original official logo and favicon are included unchanged. Image credits are in `IMAGE-SOURCES.md`; font licenses are in `public/font-licenses/`. The archive excludes Git history, hosting credentials, installed dependencies, and generated build files.
