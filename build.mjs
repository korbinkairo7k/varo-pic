import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','favicon.ico','version.json']) await copyFile(file,`dist/${file}`);
console.log('Built complete Varopic website from root index.html.');
