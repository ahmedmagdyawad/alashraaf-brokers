/* Al Ashraaf showroom: pages network-first (fresh prices), images/fonts cache-first (fast on mobile). */
const V='ashraaf-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(r.mode==='navigate'||u.pathname.endsWith('.html')){
    e.respondWith(fetch(r).then(res=>{const c=res.clone(); caches.open(V).then(x=>x.put(r,c)); return res;}).catch(()=>caches.match(r)));
    return;
  }
  if(/\.(jpg|jpeg|png|js|woff2?)$/.test(u.pathname)||u.host.includes('fonts.g')){
    e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){const c=res.clone(); caches.open(V).then(x=>x.put(r,c));} return res;})));
  }
});
