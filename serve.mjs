import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files={'/':['index.html','text/html'],'/favicon.ico':['favicon.ico','image/x-icon'],'/version.json':['version.json','application/json']};
http.createServer(async(req,res)=>{const item=files[new URL(req.url,'http://localhost').pathname];if(!item){res.writeHead(404);res.end();return;}try{res.writeHead(200,{'Content-Type':item[1],'Cache-Control':'no-store'});res.end(await readFile(item[0]));}catch{res.writeHead(500);res.end();}}).listen(5174,'127.0.0.1',()=>console.log('http://127.0.0.1:5174/'));
