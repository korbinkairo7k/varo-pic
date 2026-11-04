# Varopic

A complete responsive landing page built with React, TypeScript, Vite and Tailwind CSS. It uses local Manrope and Inter fonts and ten locally stored real photographs, including responsive image variants. The static build needs no external image or font service.

## Develop and build

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

`dist/` is the deployable static website. `.openai/hosting.json` preserves the private Sites project identity and declares this output directory. Keep this identity when updating the existing Site.

## Contact form configuration — required before accepting inquiries

No existing submission service or business contact address was supplied. The form is fully prepared but currently cannot send messages. It states this visibly. It validates all five fields, focuses the first invalid field, announces errors, retains unsent content, and never displays a false success message.

1. Configure a real HTTPS endpoint controlled by Varopic, with email delivery and/or durable storage. The endpoint must validate submissions on the server and apply spam/rate protections.
2. Copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT` to its URL, then rebuild. This value is embedded at build time. A runtime setting alone will not alter the existing static bundle.
3. If the endpoint is on another origin, allow the deployed Site origin via CORS, including `OPTIONS`, `POST`, `Content-Type` and `Accept`.
4. Return a successful HTTP response with JSON `{ "accepted": true }` only after the submission has actually been accepted for durable storage/delivery. An HTTP 200 response without this flag is treated as unconfirmed.
5. Verify an actual inquiry reaches its intended destination before public launch.

The JSON payload is:

```json
{
  "name": "Example name",
  "email": "person@example.com",
  "company": "Example company",
  "inquiry": "Looking for a partner",
  "message": "The visitor's message"
}
```

The inquiry value is one of `Looking for a partner`, `Offering products or services`, or `General inquiry`. Requests time out after 15 seconds. Failures preserve the fields. Never put a secret API key in `VITE_` settings or the client source; credentials belong on the server. No submissions are kept in browser storage, analytics or cookies.

## Content and assets

- `src/App.tsx`: all page copy, sections, navigation and form behavior.
- `src/styles.css`: responsive visual system and reduced-motion support.
- `public/images/`: ten photos, each with a 600px responsive variant.
- `IMAGE-SOURCES.md`: source pages, photographers, license details and crop guidance.
- `public/font-licenses/`: licenses for the bundled typefaces.
- `index.html`: page title, description, canonical URL and social preview metadata. Update the absolute metadata URLs when moving to a custom domain.
- `public/favicon.svg`: simple Varopic initial favicon, matching the text wordmark.

The three commercial opportunities are explicitly illustrative. The service strip describes seven industry sectors, three business scales and one point of contact. The $30M+ connections-value figure and client-growth positioning were supplied by the owner on 4 November 2026. They are presented specifically as connections value in US dollars, without inventing a measurement period, revenue, completed-deal totals, returns or client growth percentages. Keep supporting business records for this owner-supplied claim and update it when appropriate. No client names, testimonials, offices, team members or unverified contact details were added.

## Browser verification

Inspected at 390px, 768px and 1440px. Verified phone, tablet and desktop composition; image loading and crops; 1/2/3-column industry layouts; no horizontal overflow; anchor destinations; mobile menu open/close/Escape; inquiry preselection from both panels; empty-field and email validation; first-error focus; and honest unsent feedback with no configured endpoint. Browser error/warning logs were empty during these checks.

Lint and the production build pass. The production dependency audit reports zero known vulnerabilities. The development-only lint dependency tree currently reports 12 moderate findings inherited from minimatch, with no supported automatic fix; it is excluded from the deployed static bundle. Recheck these developer dependencies during maintenance. This is a functional and visual review, not a complete accessibility audit.

## Launch details

The initial Site is private to its owner. Configure the inquiry endpoint before accepting public traffic. Real legal/social destinations can be added when provided; no placeholder destinations are included. Source and deployment packages contain no contact service credentials.
