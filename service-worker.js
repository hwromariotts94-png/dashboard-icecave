const CACHE='ovp-v10.0.0';
const CORE=[
  './','./index.html','./manifest.webmanifest',
  './assets/icon-192.png','./assets/icon-512.png',
  './assets/roman.webp','./assets/roman.jpg','./assets/roman.png',
  './assets/vasiliy.webp','./assets/vasiliy.jpg','./assets/vasiliy.png',
  './assets/roman-ii.webp','./assets/roman-ii.jpg','./assets/roman-ii.png',
  './assets/nu-pogodi.webp','./assets/nu-pogodi.jpg','./assets/nu-pogodi.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin){
    e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))));
  }
});
