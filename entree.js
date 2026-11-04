/* Accueil animé + mise à jour pour les apps by Stephen sur GitHub Pages.
   <script>window.ENTREE={name:'KOTRANA',sub:'by Stephen',lines:['Voir clair.','Monter par paliers.','Tenir.'],who:'Stephen',logo:'icon-192.png',v:'2026.11.04-2010'}</script>
   <script src="entree.js?v=2026.11.04-2010"></script>
   + version.json à côté : {"v":"2026.11.04-2010"}. Le bouton « Mettre à jour » n'apparaît que si le site en ligne a une version plus récente. */
(function(){
  var C=window.ENTREE||{};if(!C.name)return;
  var fromUpdate=/[?&]u=/.test(location.search),done=true,raf=0,timers=[],AWAY=(C.away||5)*60000,LK='en_last',hiddenAt=0;
  function seen(){try{localStorage.setItem(LK,String(Date.now()))}catch(e){}}
  function last(){try{return +localStorage.getItem(LK)||0}catch(e){return 0}}
  function busy(){try{return !!(C.busy&&C.busy())}catch(e){return false}}
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var css='#en{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;padding:max(22px,env(safe-area-inset-top)) max(24px,env(safe-area-inset-right)) max(26px,env(safe-area-inset-bottom)) max(24px,env(safe-area-inset-left));background:#060E1B;color:#EAF4FF;font-family:"DM Sans",system-ui,-apple-system,sans-serif;overflow:hidden;text-align:center;touch-action:none;transition:opacity .6s ease,transform .6s cubic-bezier(.6,0,.2,1),filter .6s ease}'+
  '#en.out{opacity:0;transform:scale(1.18);filter:blur(10px);pointer-events:none}'+
  '#en canvas{position:absolute;inset:0;width:100%;height:100%;display:block}'+
  '#en .aur{position:absolute;inset:-25%;background:radial-gradient(38% 32% at 22% 26%,rgba(92,200,255,.34),transparent 70%),radial-gradient(42% 36% at 80% 74%,rgba(47,110,200,.42),transparent 70%),radial-gradient(30% 26% at 70% 20%,rgba(120,90,255,.20),transparent 70%);animation:enDrift 16s ease-in-out infinite alternate;will-change:transform}'+
  '#en .hi{position:relative;margin-top:6px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8CA6C6;opacity:0;animation:enFade .9s ease .2s forwards}'+
  '#en .mid{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:440px}'+
  '#en .lg{position:relative;width:140px;height:140px;display:grid;place-items:center;margin-bottom:30px}'+
  '#en .lg img{width:100px;height:100px;border-radius:30px;display:block;position:relative;z-index:2;animation:enPop 1s cubic-bezier(.2,.9,.3,1.25) both,enFloat 5.5s ease-in-out 1.1s infinite;box-shadow:0 20px 60px rgba(47,176,255,.45)}'+
  '#en .sp{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 55%,rgba(92,200,255,.0) 55%,#5CC8FF 100%);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2px));mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2px));animation:enSpin 3.2s linear infinite;opacity:0;animation-name:enSpin,enFade;animation-duration:3.2s,.8s;animation-delay:0s,.6s;animation-fill-mode:none,forwards;animation-iteration-count:infinite,1}'+
  '#en .rg{position:absolute;inset:8px;border-radius:50%;border:1.5px solid rgba(92,200,255,.5);opacity:0;animation:enRing 3.8s ease-out infinite}#en .rg:nth-of-type(2){animation-delay:1.27s}#en .rg:nth-of-type(3){animation-delay:2.54s}'+
  '#en h1{margin:0;font-family:"Sora",system-ui,sans-serif;font-weight:800;font-size:clamp(34px,11.5vw,50px);letter-spacing:.14em;display:flex;justify-content:center;padding-left:.14em}'+
  '#en h1 span{display:inline-block;opacity:0;transform:translateY(22px) scale(.9);animation:enRise .8s cubic-bezier(.2,.8,.2,1) forwards,enWave 4.2s ease-in-out infinite}'+
  '#en .sub{margin-top:12px;font-family:"Sora",system-ui,sans-serif;font-weight:700;font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:#A8E4FF;opacity:0;animation:enFade .9s ease 1.2s forwards}'+
  '#en .ln{position:relative;height:28px;margin-top:20px;width:100%}#en .ln b{position:absolute;left:0;right:0;font-weight:500;font-size:18px;color:#9DB6D3;opacity:0;transform:translateY(10px);transition:opacity .6s ease,transform .6s ease}#en .ln b.on{opacity:1;transform:none}'+
  '#en .bt{position:relative;width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px;opacity:0;transform:translateY(18px);animation:enRise .9s ease 1.8s forwards}'+
  '#en button{font:inherit;cursor:pointer;border:0;border-radius:20px;font-family:"Sora",system-ui,sans-serif;font-weight:700;-webkit-tap-highlight-color:transparent;transition:transform .15s ease}#en button:active{transform:scale(.97)}'+
  '#en .go{position:relative;overflow:hidden;min-height:58px;font-size:17px;letter-spacing:.02em;background:linear-gradient(135deg,#B9ECFF,#5CC8FF 55%,#2FB0FF);color:#04243B;box-shadow:0 12px 36px rgba(92,200,255,.42);animation:enGlow 2.8s ease-in-out 2.6s infinite}'+
  '#en .go::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.65),transparent);transform:skewX(-18deg);animation:enSheen 3.6s ease-in-out 2.8s infinite}'+
  '#en .go.alt{background:rgba(92,200,255,.10);color:#EAF4FF;border:1.5px solid rgba(92,200,255,.45);box-shadow:none;animation:none}#en .go.alt::after{display:none}'+
  '#en .nv{display:none;align-items:center;justify-content:center;gap:9px;font-size:13.5px;font-weight:700;color:#A8E4FF;padding:9px 14px;border-radius:99px;background:rgba(92,200,255,.10);border:1px solid rgba(92,200,255,.35);align-self:center}'+
  '#en .nv i{width:8px;height:8px;border-radius:50%;background:#47DDA0;box-shadow:0 0 0 0 rgba(71,221,160,.7);animation:enPulse 1.6s ease-out infinite}'+
  '#en .up{display:none;min-height:50px;font-size:15px;background:rgba(71,221,160,.14);color:#CFFBE7;border:1.5px solid #47DDA0}'+
  '#en.nw .nv{display:inline-flex;animation:enPop .6s cubic-bezier(.2,.9,.3,1.3) both}#en.nw .up{display:block;animation:enPop .6s cubic-bezier(.2,.9,.3,1.3) .1s both}'+
  '#en button:focus-visible{outline:2px solid #fff;outline-offset:3px}#en button:disabled{opacity:.7}'+
  '#en .st{min-height:18px;font-size:13px;color:#8CA6C6}#en .vv{font-size:11.5px;color:#4f6a8c;margin-top:2px}'+
  '@keyframes enPop{from{opacity:0;transform:scale(.5) rotate(-10deg)}to{opacity:1;transform:none}}@keyframes enFloat{50%{transform:translateY(-8px)}}@keyframes enSpin{to{transform:rotate(360deg)}}'+
  '@keyframes enRing{0%{opacity:.7;transform:scale(.7)}100%{opacity:0;transform:scale(2.4)}}@keyframes enRise{to{opacity:1;transform:none}}@keyframes enFade{to{opacity:1}}'+
  '@keyframes enWave{0%,55%,100%{color:#EAF4FF;text-shadow:none}25%{color:#BDEBFF;text-shadow:0 0 26px rgba(92,200,255,.9)}}'+
  '@keyframes enDrift{from{transform:translate3d(-4%,-3%,0) scale(1)}to{transform:translate3d(5%,4%,0) scale(1.15)}}'+
  '@keyframes enGlow{50%{box-shadow:0 14px 48px rgba(92,200,255,.7)}}@keyframes enSheen{0%{left:-60%}55%,100%{left:130%}}@keyframes enPulse{70%{box-shadow:0 0 0 10px rgba(71,221,160,0)}100%{box-shadow:0 0 0 0 rgba(71,221,160,0)}}'+
  '@media (prefers-reduced-motion:reduce){#en *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}#en,#en .ln b{transition:none}}';

  function hello(){var h=new Date().getHours(),g=h>=18||h<5?'Bonsoir':'Bonjour';return C.who?g+', '+C.who:g}
  function stars(cv,root){
    var x=cv.getContext('2d'),dpr=Math.min(2,window.devicePixelRatio||1),W=0,H=0,P=[],px=-9999,py=-9999;
    function size(){W=root.clientWidth;H=root.clientHeight;cv.width=W*dpr;cv.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.max(26,Math.min(64,Math.round(W*H/14000)));while(P.length<n)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.6});P.length=n}
    function frame(){x.clearRect(0,0,W,H);var i,j,a,b,dx,dy,d;
      for(i=0;i<P.length;i++){a=P[i];if(!RM){a.x+=a.vx;a.y+=a.vy;dx=a.x-px;dy=a.y-py;d=dx*dx+dy*dy;if(d<16000){var f=(1-d/16000)*1.4;a.x+=dx/Math.sqrt(d+1)*f;a.y+=dy/Math.sqrt(d+1)*f}
        if(a.x<-10)a.x=W+10;else if(a.x>W+10)a.x=-10;if(a.y<-10)a.y=H+10;else if(a.y>H+10)a.y=-10}
        x.fillStyle='rgba(168,228,255,.85)';x.beginPath();x.arc(a.x,a.y,a.r,0,6.283);x.fill();
        for(j=i+1;j<P.length;j++){b=P[j];dx=a.x-b.x;dy=a.y-b.y;d=dx*dx+dy*dy;if(d<9000){x.strokeStyle='rgba(92,200,255,'+(0.22*(1-d/9000)).toFixed(3)+')';x.lineWidth=.8;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}}
      if(!RM&&!done&&!document.hidden)raf=requestAnimationFrame(frame);else if(!RM&&!done)raf=0}
    function pt(e){var t=e.touches?e.touches[0]:e,r=root.getBoundingClientRect();px=t.clientX-r.left;py=t.clientY-r.top}
    root.addEventListener('pointermove',pt);root.addEventListener('touchmove',pt,{passive:true});root.addEventListener('touchstart',pt,{passive:true});
    root.addEventListener('pointerleave',function(){px=py=-9999});root.addEventListener('touchend',function(){px=py=-9999});
    function vis(){if(!document.hidden&&!raf&&!done&&!RM)raf=requestAnimationFrame(frame)}
    window.addEventListener('resize',size);document.addEventListener('visibilitychange',vis);
    size();frame();
    return function(){window.removeEventListener('resize',size);document.removeEventListener('visibilitychange',vis)}}
  function check(el){
    fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
      if(done||!j||!j.v||j.v===C.v)return;
      el.classList.add('nw');el._nv=j.v;el.querySelector('.nv span').textContent='Nouvelle version disponible'}).catch(function(){})}
  function choices(){try{var c=typeof C.choices==='function'?C.choices():C.choices;return c&&c.length?c:null}catch(e){return null}}
  function goHtml(){var c=choices();if(!c)return '<button class="go" type="button">Entrer</button>';return c.map(function(x,i){return '<button class="go'+(i?' alt':'')+'" type="button" data-r="'+String(x.role||'').replace(/[^a-z]/g,'')+'">'+x.label+'</button>'}).join('')}
  function add(force){
    if(document.getElementById('en'))return;
    if(!force&&(fromUpdate||busy()||(sessionStorage.getItem('en_skip')&&Date.now()-last()<AWAY))){history.replaceState(null,'',location.pathname+location.hash);if(fromUpdate)setTimeout(function(){toast('Mis à jour · version '+(C.v||''))},600);seen();return}
    done=false;timers=[];raf=0;
    if(!document.getElementById('en-css')){var st0=document.createElement('style');st0.id='en-css';st0.textContent=css;document.head.appendChild(st0)}
    var el=document.createElement('div');el.id='en';el.setAttribute('role','dialog');el.setAttribute('aria-label','Accueil '+C.name);
    var letters=String(C.name).split('').map(function(ch,i){return '<span style="animation-delay:'+(0.5+i*0.08).toFixed(2)+'s,'+(1.8+i*0.14).toFixed(2)+'s">'+ch+'</span>'}).join('');
    var lines=(C.lines&&C.lines.length?C.lines:(C.tag?[C.tag]:[])).map(function(t,i){return '<b'+(i===0?' class="on"':'')+'>'+t+'</b>'}).join('');
    el.innerHTML='<div class="aur"></div><canvas></canvas><div class="hi">'+hello()+'</div><div class="mid"><div class="lg"><i class="sp"></i><i class="rg"></i><i class="rg"></i><i class="rg"></i>'+(C.logo?'<img src="'+C.logo+'" alt="">':'')+'</div><h1 aria-label="'+C.name+'">'+letters+'</h1>'+(C.sub?'<div class="sub">'+C.sub+'</div>':'')+'<div class="ln">'+lines+'</div></div>'+
      '<div class="bt"><div class="nv"><i></i><span></span></div>'+goHtml()+'<button class="up" type="button">Mettre à jour</button><div class="st" aria-live="polite"></div><div class="vv">Version '+(C.v||'–')+'</div></div>';
    document.body.appendChild(el);
    var stopStars=stars(el.querySelector('canvas'),el);
    var bs=el.querySelectorAll('.ln b');if(bs.length>1&&!RM){var k=0;timers.push(setInterval(function(){bs[k].classList.remove('on');k=(k+1)%bs.length;bs[k].classList.add('on')},2600))}
    var gos=el.querySelectorAll('.go'),up=el.querySelector('.up'),msg=el.querySelector('.st');
    function enter(role){if(done)return;done=true;timers.forEach(clearInterval);if(raf)cancelAnimationFrame(raf);raf=0;if(stopStars)stopStars();seen();try{sessionStorage.setItem('en_skip','1')}catch(e){}el.classList.add('out');setTimeout(function(){el.remove()},640);window.dispatchEvent(new CustomEvent('entree:enter',{detail:{role:role||''}}))}
    Array.prototype.forEach.call(gos,function(g){g.onclick=function(){enter(g.getAttribute('data-r'))}});
    up.onclick=function(){up.disabled=true;up.textContent='Mise à jour…';msg.textContent='';
      var v=el._nv||String(Date.now());setTimeout(function(){location.replace(location.pathname+'?u='+encodeURIComponent(v))},350)};
    setTimeout(function(){check(el)},300);
  }
  function boot(){add(false);
    setInterval(function(){if(!document.hidden&&!document.getElementById('en'))seen()},15000);
    ['pointerdown','touchstart','keydown'].forEach(function(t){document.addEventListener(t,function(){if(!document.getElementById('en'))seen()},{passive:true,capture:true})});
    document.addEventListener('visibilitychange',function(){
      if(document.hidden){hiddenAt=Date.now();if(!document.getElementById('en'))seen();return}
      if(hiddenAt&&Date.now()-hiddenAt>=AWAY&&!busy()&&!document.getElementById('en'))add(true);hiddenAt=0});
    window.addEventListener('pageshow',function(e){if(e.persisted&&Date.now()-last()>=AWAY&&!busy())add(true)})}
  if(document.body)boot();else document.addEventListener('DOMContentLoaded',boot);
  function toast(t){var d=document.createElement('div');d.textContent=t;d.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:calc(110px + env(safe-area-inset-bottom,0px));z-index:2147483001;background:#EAF4FF;color:#08111F;padding:11px 18px;border-radius:14px;font:600 14px system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:90%';document.body.appendChild(d);setTimeout(function(){d.remove()},2800)}
})();
