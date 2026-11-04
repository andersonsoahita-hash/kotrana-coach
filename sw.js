/* Kotrana Coach · by Stephen — fonctionne même avec une mauvaise connexion.
   Réseau d'abord (pour toujours avoir la dernière version), cache en secours. */
const C='kc-shell-v1',SHELL=['./','index.html','config.js','entree.js','manifest.json','icon-180.png','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin||u.pathname.endsWith('/version.json'))return;
  e.respondWith((async()=>{
    const nav=r.mode==='navigate',key=nav?new Request(u.origin+u.pathname):r;
    try{
      const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),nav?4000:6000);
      const res=await fetch(r,{signal:ctl.signal});clearTimeout(t);
      if(res&&res.ok){const c=await caches.open(C);c.put(key,res.clone())}
      return res;
    }catch(_){
      const c=await caches.open(C);
      return (await c.match(key,{ignoreSearch:true}))||(await c.match(r,{ignoreSearch:true}))||(await c.match(u.pathname.replace(/[^/]*$/,'index.html'),{ignoreSearch:true}))||Response.error();
    }})())});
