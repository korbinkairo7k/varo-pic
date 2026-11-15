# Varopic: complete single-page deployment

Release: 2026-11-16-complete-flat

This package contains the entire current website inside the root index.html: compiled application code, styles, fonts, logo and photographs. It includes the desktop and mobile connection graphics, $12M+ figure, purple hero line, email-only contact, team@varopic.com, and Founder sam@varopic.com.

## Upload

Extract the ZIP and upload ALL its files directly to the root of korbinkairo7k/varo-pic on main. Replace index.html, package.json, package-lock.json and vercel.json, and add the other files. Do not upload the ZIP itself.

There are no nested folders to upload. Old src and public files may remain in GitHub: this package's build does not read them. The complete page is now supplied by the root index.html.

For Vercel use the repository root, install command npm ci, build command npm run build, and output directory dist. The included vercel.json sets the build configuration. Deploy the new commit rather than redeploying an older commit.

Visit /version.json on your live domain after deployment. It must show 2026-11-16-complete-flat. If it does not, that domain is serving a different deployment or repository.

## Local preview

With Node.js installed, run npm run dev and visit http://127.0.0.1:5174/. Run npm run build to create dist for static hosting. No dependencies need downloading.

This is a compiled deployment package. The editable React project remains in the original workspace; future design changes should be made there and exported again. Contact links open the visitor's email application. No form or backend is used.
