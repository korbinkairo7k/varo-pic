import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.dirname(new URL(import.meta.url).pathname);
const manifest = JSON.parse(await fs.readFile(new URL('./release-files.json', import.meta.url), 'utf8'));
const output = new URL('./varopic-release-dist/', import.meta.url);
await fs.mkdir(output, { recursive: true });
for (const [name, expected] of Object.entries(manifest)) {
  if (path.basename(name) !== name) throw new Error('Invalid release filename');
  const data = await fs.readFile(new URL('./' + name, import.meta.url));
  if (crypto.createHash('sha256').update(data).digest('hex') !== expected) throw new Error('Missing or outdated upload: ' + name);
  await fs.writeFile(new URL(name, output), data);
}
console.log('Verified and built Varopic release 2026-11-24. Old src/public folders are not used.');
