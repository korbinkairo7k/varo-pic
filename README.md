# Varopic: current preview release, November 24, 2026

This is a ready-to-deploy export of the current preview. All upload files are at the top level.

1. Extract this ZIP.
2. Open the main page of korbinkairo7k/varo-pic on GitHub, on the branch connected to Vercel.
3. Select Add file > Upload files. Select ALL files inside the extracted folder, not the ZIP or its enclosing folder.
4. Commit the upload, including replacements for index.html, package.json, package-lock.json and vercel.json.
5. Wait for Vercel's deployment to finish. The deployed /version.json must report varopic-flat-upload-2026-11-24.

The old src and public folders can remain. This release does not build from them. The new build checks every release file and fails if one is missing or outdated instead of deploying old content.

This is a compiled deployment package, not the editable React source. The original editable project is retained in the Codex workspace. To update this export, regenerate it from that project. Do not edit the compiled files manually because their integrity hashes would no longer match.
