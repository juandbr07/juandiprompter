const CACHE='juandiprompter-v2.0.2';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./version.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('juandiprompter-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;if(u.pathname.endsWith('/version.json')&&u.searchParams.has('check')){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}e.respondWith(fetch(e.request).catch(async()=>{const c=await caches.open(CACHE);return await c.match(e.request)||(e.request.mode==='navigate'?await c.match('./index.html'):null)||Response.error()}));});
