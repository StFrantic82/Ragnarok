<script>
// ===== Multijoueur en ligne (pair-à-pair, PeerJS) : salon, hôte autoritaire, une vue par joueur =====
const MP_FNS=['pick','put','ban','fightClick','protect','lumClick','lumHeroes','done','mulligan','odinChoose','friggSetup','fOrder','friggH2','friggLoom','invest','lokiVbanH','lokiDiscH'];
const MP={on:false,host:false,stage:'menu',seat:0,code:'',players:[],loki:false,err:'',exec:false,net:null,conn:null,token:'',god:null,started:false,lost:false,busy:false};
const MP_ORIG={};
const MPT=(en,fr)=>typeof LANG!='undefined'&&LANG=='fr'?fr:en;
const MP_TEST=typeof location!='undefined'&&/mptest/.test(location.search);
const MP_OK=MP_TEST||(typeof location!='undefined'&&(/github\.io$/.test(location.hostname)||/^(localhost|127\.0\.0\.1)$/.test(location.hostname)));
const MP_URL='https://stfrantic82.github.io/Ragnarok/';
const MP_MAX=4;
// ---------- Réseau : PeerJS (WebRTC) ou canal local de test (BroadcastChannel) ----------
let MP_PEERJS=null;
function mpLoadPeer(){if(MP_PEERJS)return MP_PEERJS;MP_PEERJS=new Promise((ok,ko)=>{if(window.Peer)return ok();const src=['https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js','https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js'];
 const tryN=i=>{if(i>=src.length){MP_PEERJS=null;return ko(new Error('peerjs'))}const s=document.createElement('script');s.src=src[i];s.onload=()=>window.Peer?ok():tryN(i+1);s.onerror=()=>{s.remove();tryN(i+1)};document.head.appendChild(s)};tryN(0)});return MP_PEERJS}
// Connexion commune : send(obj), onData(fn), onClose(fn), close()
function mpWrapPeerConn(c){const o={id:c.peer,send:m=>{try{c.open&&c.send(JSON.stringify(m))}catch(e){}},close:()=>{try{c.close()}catch(e){}},_d:null,_c:null};
 c.on('data',d=>{try{o._d&&o._d(typeof d=='string'?JSON.parse(d):d)}catch(e){console.error(e)}});c.on('close',()=>o._c&&o._c());c.on('error',()=>o._c&&o._c());return o}
const MP_BC={};// test : un BroadcastChannel par salon
function mpTestNet(){const me='t'+Math.random().toString(36).slice(2,8);return{
 host(code,onConn){return new Promise((ok,ko)=>{const ch=new BroadcastChannel('rgmp-'+code),conns={};let taken=false;
  ch.onmessage=e=>{const m=e.data;if(m.to=='?'&&m.k=='ping'){ch.postMessage({to:m.from,from:'host',k:'taken'});return}
   if(m.to!='host')return;if(m.k=='open'){const c={id:m.from,send:d=>ch.postMessage({to:m.from,from:'host',k:'d',d:JSON.parse(JSON.stringify(d))}),close:()=>{ch.postMessage({to:m.from,from:'host',k:'close'});delete conns[m.from]},_d:null,_c:null};conns[m.from]=c;ch.postMessage({to:m.from,from:'host',k:'ok'});onConn(c)}
   else if(m.k=='d'&&conns[m.from])conns[m.from]._d&&conns[m.from]._d(m.d);else if(m.k=='close'&&conns[m.from]){const c=conns[m.from];delete conns[m.from];c._c&&c._c()}};
  ok({destroy(){Object.values(conns).forEach(c=>c.close());ch.close()}})})},
 join(code){return new Promise((ok,ko)=>{const ch=new BroadcastChannel('rgmp-'+code);let c=null;const t=setTimeout(()=>{ch.close();ko({type:'peer-unavailable'})},1500);
  ch.onmessage=e=>{const m=e.data;if(m.to!=me)return;if(m.k=='ok'){clearTimeout(t);c={id:'host',send:d=>ch.postMessage({to:'host',from:me,k:'d',d:JSON.parse(JSON.stringify(d))}),close:()=>{ch.postMessage({to:'host',from:me,k:'close'});ch.close()},_d:null,_c:null};ok(c)}
   else if(m.k=='d'&&c)c._d&&c._d(m.d);else if(m.k=='close'&&c){c._c&&c._c();ch.close()}};ch.postMessage({to:'host',from:me,k:'open'})})}}}
function mpPeerNet(){return{
 host(code,onConn){return mpLoadPeer().then(()=>new Promise((ok,ko)=>{const p=new Peer('ragnarok-mp-'+code);let up=false;
  p.on('open',()=>{up=true;ok({destroy(){try{p.destroy()}catch(e){}}})});p.on('connection',c=>{c.on('open',()=>onConn(mpWrapPeerConn(c)))});
  p.on('error',e=>{if(!up){try{p.destroy()}catch(x){}ko(e)}else console.warn('peer',e.type)});p.on('disconnected',()=>{try{p.reconnect()}catch(e){}})}))},
 join(code){return mpLoadPeer().then(()=>new Promise((ok,ko)=>{const p=new Peer();let done=false;const fail=e=>{if(done)return;done=true;try{p.destroy()}catch(x){}ko(e)};
  const t=setTimeout(()=>fail({type:'timeout'}),20000);
  p.on('error',e=>fail(e));p.on('open',()=>{const c=p.connect('ragnarok-mp-'+code,{reliable:true});c.on('open',()=>{if(done)return;done=true;clearTimeout(t);const w=mpWrapPeerConn(c);const cl=w.close;w.close=()=>{cl();setTimeout(()=>{try{p.destroy()}catch(e){}},300)};ok(w)});c.on('error',e=>fail(e))})}))}}}
const mpNet=()=>MP_TEST?mpTestNet():mpPeerNet();
const mpCode=()=>{const A='ABCDEFGHJKLMNPQRSTUVWXYZ';let s='';for(let i=0;i<4;i++)s+=A[Math.random()*A.length|0];return s};
const mpTok=()=>Math.random().toString(36).slice(2)+Date.now().toString(36);
function mpErrTxt(e){const t=e&&e.type;if(t=='peer-unavailable')return MPT('Room not found. Check the code (the host must keep the page open).','Salon introuvable. Vérifie le code (l’hôte doit garder la page ouverte).');
 if(t=='timeout')return MPT('Connection timed out. Try again, or try another network.','La connexion a échoué (délai dépassé). Réessaie, ou essaie un autre réseau.');
 if(e&&e.message=='peerjs')return MPT('Could not load the network library. Check your Internet connection.','Impossible de charger la bibliothèque réseau. Vérifie ta connexion Internet.');
 return MPT('Connection error','Erreur de connexion')+(t?' ('+t+')':'')}
// ---------- Chemins d'objets (arguments des actions) ----------
function mpPath(x){if(x==null||typeof x!='object')return null;const seen=new Set();
 const go=(o,path,d)=>{if(o===x)return path;if(!o||typeof o!='object'||d>4||seen.has(o))return null;seen.add(o);
  for(const k of Object.keys(o)){if(k=='log'||k=='ev'||k=='snap'||k=='grad')continue;const r=go(o[k],[...path,k],d+1);if(r)return r}return null};return go(S,[],0)}
const mpEnc=a=>a.map(x=>x!=null&&typeof x=='object'?{p:mpPath(x)}:{v:x});
const mpDec=a=>a.map(x=>x&&x.p?x.p.reduce((o,k)=>o==null?o:o[k],S):x?x.v:undefined);
// ---------- Hôte : point de vue d'un joueur (rotation de S.ps) ----------
function mpRot(k){const n=S.ps.length;k=((k%n)+n)%n;if(!k)return;S.ps=[...S.ps.slice(k),...S.ps.slice(0,k)];S.ps.forEach((p,i)=>p.i=i);if(S.ord)S.ord=S.ord.map(x=>(x-k+n)%n);S.prio=(S.prio-k+n)%n}
const MP_DROP=new Set(['ev','snap','grad','cstat','kstat','_ho','_fb','_av','_dec']);
const mpHid=()=>({n:'?',t:'Hidden',sub:'',cost:0,bon:[],vp:'',eff:''});
function mpView(seat){const n=S.ps.length;mpRot(seat);let v;try{v=JSON.parse(JSON.stringify(S,(k,x)=>MP_DROP.has(k)?undefined:x))}finally{mpRot(n-seat)}
 v.ps.forEach((p,i)=>{if(i){p.hand=p.hand.map(mpHid);p.deck=p.deck.map(mpHid);p.fsetup=p.fsetup?[]:null;p.pend=null}else p.deck=p.deck.map(mpHid)});
 v.cd=v.cd.map(()=>({}));v.ws=v.ws.map(()=>({}));if(v.lkDeck)v.lkDeck=v.lkDeck.map(()=>({}));
 if(seat){v.lumMode=0;v._askHome=0}
 const me=v.ps[0],nm=i=>v.ps[i].n;v.mpSeat=seat;v.mpWho=[];
 if(v.phase=='pick'){v.mpWho=v.ps.map((p,i)=>!p.aside?i:-1).filter(i=>i>=0);if(me.aside){v.phase='wait';v.mpMine=me.aside}}
 else if(['place','fchoice','frigg'].includes(v.phase)){v.mpWho=v.ps.map((p,i)=>p.aside||(p.g=='frigg'&&v.phase!='place')?i:-1).filter(i=>i>=0);
  if(v.phase!='place'&&me.g!='frigg')v.phase=me.aside?'place':'wait';else if(v.phase=='place'&&!me.aside)v.phase='wait'}
 else if(v.phase=='fight'){const a=v.ord[v.k];v.mpWho=[a];v.mpFight=1;if(a!==0)v.phase='wait'}
 return v}
// ---------- Actions ----------
function mpGuard(s,fn){const p=S.ps[s],ph=S.phase;if(!p||ph=='end')return false;const actor=ph=='fight'?S.ord[S.k]:-1,fr=p.g=='frigg'&&(ph=='fchoice'||ph=='frigg');
 switch(fn){case'fightClick':case'protect':case'lumClick':case'lumHeroes':return ph=='fight'&&actor==s;
  case'done':return ph=='fight'&&actor==s&&!(p.vb>0&&p.v.length);
  case'pick':case'mulligan':case'odinChoose':case'lokiDiscH':case'friggSetup':return ph=='pick'&&!p.aside;
  case'put':case'ban':return !!p.aside&&['place','fchoice','frigg'].includes(ph)&&!fr;
  case'fOrder':return ph=='fchoice'&&p.g=='frigg';case'friggH2':case'friggLoom':return ph=='frigg'&&p.g=='frigg';
  case'invest':return !!p.prosp&&(ph=='place'||ph=='fchoice'||ph=='frigg'||(ph=='fight'&&actor==s));
  case'lokiVbanH':return p.vb>0}return false}
function mpExec(s,fn,args){if(!S||!S.mp||!MP_FNS.includes(fn)||!mpGuard(s,fn))return;const n=S.ps.length;mpRot(s);MP.exec=true;
 try{MP_ORIG[fn].apply(null,mpDec(args||[]))}catch(e){console.error('mp exec',fn,e)}finally{MP.exec=false;if(S)mpRot(n-s)}
 if(S&&S.lokiWin&&S.phase!='end'){MP.exec=true;try{lokiEnd()}finally{MP.exec=false}}
 mpBroadcast();R()}
function mpInstall(){MP_FNS.forEach(fn=>{const f=window[fn];if(typeof f!='function'||f._mp)return;MP_ORIG[fn]=f;const st=function(...a){if(!MP.on||MP.exec||!S||!S.mp)return MP_ORIG[fn].apply(this,a);
  const enc=mpEnc(a);if(MP.host)mpExec(0,fn,enc);else if(MP.conn&&!MP.lost)MP.conn.send({t:'act',fn,args:enc})};st._mp=1;window[fn]=st})}
// ---------- Hôte : salon ----------
function mpLobbyMsg(){return{t:'lobby',code:MP.code,loki:MP.loki,started:MP.started,players:MP.players.map(p=>({name:p.name,god:p.god,online:p.online}))}}
function mpBroadcast(){MP.players.forEach((p,i)=>{if(!i||!p.conn||!p.online)return;const m=mpLobbyMsg();m.you=i;if(MP.started&&S&&S.mp)m.view=mpView(i);p.conn.send(m)})}
function mpHostConn(c){let pl=null;
 c._d=m=>{if(!m||!m.t)return;
  if(m.t=='join'){const name=String(m.name||'').trim().slice(0,20)||MPT('Player','Joueur');const old=MP.players.find(p=>p.token&&p.token===m.token);
   if(old){pl=old;if(old.conn&&old.conn!==c)try{old.conn.close()}catch(e){}old.conn=c;old.online=true}
   else{if(MP.started){c.send({t:'err',e:'started'});setTimeout(()=>c.close(),300);return}if(MP.players.length>=MP_MAX){c.send({t:'err',e:'full'});setTimeout(()=>c.close(),300);return}
    pl={name,god:null,token:m.token||mpTok(),conn:c,online:true};MP.players.push(pl)}
   mpBroadcast();R();return}
  if(!pl)return;const s=MP.players.indexOf(pl);if(s<0)return;
  if(m.t=='god'&&!MP.started){const g=m.god;if(g===null||(DK[g]&&!MP.players.some(q=>q!==pl&&q.god==g)))pl.god=g;mpBroadcast();R();return}
  if(m.t=='act'&&MP.started){mpExec(s,m.fn,m.args);return}
  if(m.t=='leave'){mpDrop(pl,true)}};
 c._c=()=>{if(pl)mpDrop(pl,false)}}
function mpDrop(pl,left){const s=MP.players.indexOf(pl);if(s<0)return;pl.online=false;pl.conn=null;if(left&&!MP.started)MP.players.splice(s,1);mpBroadcast();R()}
async function mpHost(){mpName();MP.err='';MP.busy=true;R();const net=mpNet();
 for(let tries=0;tries<4;tries++){const code=mpCode();try{MP.net=await net.host(code,mpHostConn);MP.code=code;break}catch(e){if(!(e&&e.type=='unavailable-id')){MP.busy=false;MP.err=mpErrTxt(e);R();return}}}
 if(!MP.net){MP.busy=false;MP.err=mpErrTxt({});R();return}
 MP.busy=false;MP.on=true;MP.host=true;MP.seat=0;MP.stage='lobby';MP.started=false;MP.players=[{name:mpName(),god:MP.god||null,token:'host',conn:null,online:true}];R()}
function mpHostGod(g){if(MP.started)return;const me=MP.players[0];if(g!==null&&MP.players.some((q,i)=>i&&q.god==g))return;me.god=g;mpBroadcast();R()}
function mpStart(){if(!MP.host||MP.started)return;const P=MP.players;if(P.length<2||P.some(p=>!p.god||!p.online))return;
 const gods=P.map(p=>p.god);LOKI_ON=MP.loki;VIEW='';MP.exec=true;try{newGame(gods[0],0,gods);S.mp=true;S.mpNames=P.map(p=>p.name)}finally{MP.exec=false}
 MP.started=true;MP.stage='game';mpBroadcast();R();scrollTo(0,0)}
function mpBackToLobby(){if(!MP.host)return;S=null;MP.started=false;MP.stage='lobby';VIEW='mp';MP.players=MP.players.filter(p=>p.online);mpBroadcast();R();scrollTo(0,0)}
// ---------- Client ----------
async function mpJoin(code){code=String(code||'').toUpperCase().replace(/[^A-Z]/g,'').slice(0,4);if(code.length!=4){MP.err=MPT('The code has 4 letters.','Le code fait 4 lettres.');R();return}
 mpName();MP.err='';MP.busy=true;R();let tk='';try{tk=sessionStorage.getItem('rgmp_tok_'+code)||''}catch(e){}if(!tk){tk=mpTok();try{sessionStorage.setItem('rgmp_tok_'+code,tk)}catch(e){}}
 try{const c=await mpNet().join(code);MP.conn=c;MP.code=code;MP.token=tk;MP.on=true;MP.host=false;MP.lost=false;MP.busy=false;if(MP.stage!='game')MP.stage='lobby';
  c._d=mpClientMsg;c._c=()=>{if(!MP.on)return;MP.lost=true;R()};c.send({t:'join',name:mpName(),token:tk});R()}
 catch(e){MP.busy=false;MP.err=mpErrTxt(e);R()}}
function mpClientMsg(m){if(!m||!m.t)return;
 if(m.t=='err'){MP.err=m.e=='full'?MPT('This room is full (4 players).','Ce salon est complet (4 joueurs).'):MPT('This game has already started.','Cette partie a déjà commencé.');mpReset(true);return}
 if(m.t=='closed'){mpReset(true);MP.err=MPT('The host closed the room.','L’hôte a fermé le salon.');S=null;VIEW='mp';R();return}
 if(m.t=='lobby'){MP.players=m.players;MP.loki=m.loki;MP.seat=m.you;MP.started=m.started;
  if(m.view){const ui=S?{lumMode:S.lumMode,_askHome:S._askHome}:{};S=m.view;Object.assign(S,ui);if(MP.stage!='game'){MP.stage='game';VIEW='';scrollTo(0,0)}}
  else if(!m.started){if(MP.stage=='game'){S=null;VIEW='mp';scrollTo(0,0)}MP.stage='lobby'}R()}}
function mpPickGod(g){if(MP.host)return mpHostGod(g);if(MP.conn)MP.conn.send({t:'god',god:g})}
function mpReset(keepErr){const e=MP.err;try{if(MP.host){MP.players.forEach(p=>p.conn&&p.conn.send({t:'closed'}));setTimeout(()=>{try{MP.net&&MP.net.destroy()}catch(x){}MP.net=null},300)}else if(MP.conn){MP.conn.send({t:'leave'});const c=MP.conn;setTimeout(()=>c.close(),200)}}catch(x){}
 Object.assign(MP,{on:false,host:false,stage:'menu',players:[],started:false,conn:null,lost:false,busy:false,err:keepErr?e:''})}
function mpLeave(){mpReset(false);S=null;VIEW='';R();scrollTo(0,0)}
function mpName(){let n='';try{n=(document.getElementById('mpn')||{}).value}catch(e){}n=(n||MP.name||PSEUDO||'').trim().slice(0,20);MP.name=n;try{localStorage.setItem('rgmp_name',n)}catch(e){}return n||MPT('Player','Joueur')}
try{MP.name=localStorage.getItem('rgmp_name')||''}catch(e){}
function mpOpen(){VIEW='mp';if(!MP.on)MP.stage='menu';R();scrollTo(0,0)}
// ---------- Écrans ----------
function mpLink(){return (MP_TEST?location.href.split('#')[0]:MP_URL)+'#join-'+MP.code}
function mpCopy(t,el){try{navigator.clipboard.writeText(t).then(()=>{if(el){const o=el.textContent;el.textContent='✓ '+MPT('Copied','Copié');setTimeout(()=>el.textContent=o,1500)}}).catch(()=>{})}catch(e){}}
function mpGodGrid(){const mine=MP.players[MP.seat]&&MP.players[MP.seat].god,gods=Object.keys(DK).sort((a,b)=>a.localeCompare(b));
 return`<div class=hm-gods style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr))">${gods.map(g=>{const who=MP.players.findIndex(p=>p.god==g),taken=who>=0&&who!=MP.seat;
  return`<button class="hm-god${g==mine?' on':''}" ${taken?'disabled':''} onclick="mpPickGod(${g==mine?'null':`'${g}'`})" style="${taken?'opacity:.35;cursor:not-allowed':''}">${typeof godInfo=='function'&&!taken?`<div class=hm-tip>${godInfo(g)}</div>`:''}${IMG[g+'|S']?`<img src="${IMG[g+'|S']}" alt="">`:`<div style="aspect-ratio:1028/661;border-radius:10px;background:#cdbf9f;display:flex;align-items:center;justify-content:center;font:700 18px Cinzel,Georgia,serif">${g}</div>`}<span>${g}${taken?' · '+esc(MP.players[who].name):''}</span></button>`}).join('')}</div>`}
function renderMP(A){let h=`<div class="hm notr" style="text-align:left;max-width:860px"><p><button class=hm-sec onclick="${MP.on?'mpLeave()':"VIEW='';R()"}">← ${MPT('Home','Accueil')}</button></p><h2 style="font-family:Cinzel,Georgia,serif;text-align:center">🌐 ${MPT('Online multiplayer','Multijoueur en ligne')}</h2>`;
 if(MP.err)h+=`<p style="color:#b3261e;font-weight:700">⚠ ${esc(MP.err)}</p>`;
 if(!MP_OK){h+=`<p>${MPT('Online multiplayer works on the web version of the game:','Le multijoueur en ligne fonctionne sur la version web du jeu :')} <a href="${MP_URL}" target=_blank>${MP_URL}</a></p><p class=m>${MPT('This page cannot open direct connections between players.','Cette page ne peut pas ouvrir de connexion directe entre joueurs.')}</p></div>`;A.innerHTML=h;return}
 if(MP.stage=='menu'||!MP.on){let pre='';try{const m=(location.hash||'').match(/^#join-([A-Za-z]{4})$/);if(m)pre=m[1].toUpperCase()}catch(e){}
  h+=`<p>${MPT('Play with friends from home: one player creates a room and shares the code, the others join. 2 to 4 players, each chooses a different god. Each screen only shows its own hand.','Joue avec des amis depuis chez vous : un joueur crée un salon et partage le code, les autres le rejoignent. De 2 à 4 joueurs, chacun choisit un dieu différent. Chaque écran ne montre que sa propre main.')}</p>
  <p><label><b>${MPT('Your name','Ton nom')}</b><br><input id=mpn maxlength=20 value="${esc(MP.name||PSEUDO)}" placeholder="${MPT('Player','Joueur')}" style="font:inherit;padding:6px;border:1px solid var(--bd);border-radius:6px;background:var(--card);color:var(--fg)"></label></p>
  <div style="display:flex;flex-wrap:wrap;gap:16px">
   <div class=p style="flex:1 1 260px"><b>${MPT('Create a room','Créer un salon')}</b><p class=m>${MPT('You will be the host: keep this page open until the end of the game.','Tu seras l’hôte : garde cette page ouverte jusqu’à la fin de la partie.')}</p><button ${MP.busy?'disabled':''} onclick="mpHost()" style="font-size:15px;padding:8px 16px">➕ ${MPT('Create','Créer')}</button></div>
   <div class=p style="flex:1 1 260px"><b>${MPT('Join a room','Rejoindre un salon')}</b><p class=m>${MPT('Enter the 4-letter code given by the host.','Entre le code de 4 lettres donné par l’hôte.')}</p><input id=mpc maxlength=4 value="${pre}" placeholder="ABCD" style="font:700 18px monospace;width:90px;text-transform:uppercase;padding:5px;border:1px solid var(--bd);border-radius:6px;background:var(--card);color:var(--fg)" onkeydown="if(event.key=='Enter')mpJoin(this.value)"> <button ${MP.busy?'disabled':''} onclick="mpJoin(document.getElementById('mpc').value)" style="font-size:15px;padding:8px 16px">🚪 ${MPT('Join','Rejoindre')}</button></div>
  </div>${MP.busy?`<p class=m>⏳ ${MPT('Connecting…','Connexion…')}</p>`:''}</div>`;A.innerHTML=h;return}
 if(MP.lost){h+=`<p>⚠ ${MPT('Connection to the host lost.','Connexion à l’hôte perdue.')} <button onclick="mpJoin(MP.code)">${MPT('Reconnect','Se reconnecter')}</button></p></div>`;A.innerHTML=h;return}
 const P=MP.players,ok=P.length>=2&&P.every(p=>p.god&&p.online);
 h+=`<div class=p style="text-align:center"><div class=m>${MPT('Room code','Code du salon')}</div><div style="font:900 40px monospace;letter-spacing:8px">${MP.code}</div>
  <button class=hm-sec onclick="mpCopy(MP.code,this)">📋 ${MPT('Copy code','Copier le code')}</button> <button class=hm-sec onclick="mpCopy(mpLink(),this)">🔗 ${MPT('Copy invitation link','Copier le lien d’invitation')}</button></div>
  <h3>${MPT('Players','Joueurs')} (${P.length}/${MP_MAX})</h3><div>${P.map((p,i)=>`<div class=p style="display:flex;align-items:center;gap:10px;margin:4px 0;${i==MP.seat?'border:2px solid var(--ac)':''}">${p.god&&IMG[p.god+'|S']?`<img src="${IMG[p.god+'|S']}" height=36 style="border-radius:4px">`:'<span style="font-size:24px">❔</span>'}<b>${esc(p.name)}</b>${i==0?` <span class=m>(${MPT('host','hôte')})</span>`:''}${i==MP.seat?` <span class=m>(${MPT('you','toi')})</span>`:''}<span style="margin-left:auto">${p.online?'':'🔌 '+MPT('offline','déconnecté')+' · '}${p.god?esc(p.god):'<i class=m>'+MPT('choosing a god…','choisit un dieu…')+'</i>'}</span></div>`).join('')}</div>
  <h3>${MPT('Choose your god','Choisis ton dieu')}</h3>${mpGodGrid()}
  <div class=p><b>🐍 ${MPT('Loki expansion','Extension Loki')} :</b> ${MP.host?`<button ${MP.loki?'style="background:var(--mu)"':''} onclick="MP.loki=false;mpBroadcast();R()">${MPT('Off','Non')}</button><button ${MP.loki?'':'style="background:var(--mu)"'} onclick="MP.loki=true;mpBroadcast();R()">${MPT('On','Oui')}</button>`:(MP.loki?MPT('On','Oui'):MPT('Off','Non'))}</div>
  ${MP.host?`<p style="text-align:center"><button class=hm-play ${ok?'':'disabled'} onclick="mpStart()">${MPT('START THE GAME','LANCER LA PARTIE')}</button><br><span class=m>${ok?'':P.length<2?MPT('Waiting for at least one other player…','En attente d’au moins un autre joueur…'):MPT('Every player must choose a god.','Chaque joueur doit choisir un dieu.')}</span></p>`:`<p style="text-align:center" class=m>⏳ ${MPT('Waiting for the host to start the game…','En attente du lancement par l’hôte…')}</p>`}</div>`;
 A.innerHTML=h}
function mpBar(){const v=S,N=i=>{const nm=(v.mpNames||[])[(i+v.mpSeat)%v.ps.length]||'';return esc(v.ps[i].n)+(nm?' ('+esc(nm)+')':'')};
 const pl=MP.players,off=pl.filter(p=>!p.online).map(p=>esc(p.name));let msg='';
 if(v.phase=='end')msg='';
 else if(v.mpFight)msg=v.mpWho[0]===0?'⚔ '+MPT('Your turn to fight!','À toi de combattre !'):'⏳ '+N(v.mpWho[0])+' '+MPT('is fighting…','combat…');
 else if(v.mpWho.length)msg=(v.mpWho.includes(0)?'👉 '+MPT('Your move.','À toi de jouer.')+' ':'')+(v.mpWho.filter(i=>i).length?'⏳ '+MPT('Waiting for','En attente de')+' : '+v.mpWho.filter(i=>i).map(N).join(', '):'');
 return`<div class="p notr" id=mpbar style="border:2px solid #3a6ea5;background:rgba(58,110,165,.12);display:flex;flex-wrap:wrap;gap:8px;align-items:center"><b>🌐 ${MPT('Room','Salon')} ${MP.code}</b><span>${msg}</span>${v.phase=='wait'&&v.mpMine?`<span class=m>${MPT('You set aside','Tu as mis de côté')} : <b>${esc(v.mpMine.n)}</b></span>`:''}${off.length?`<span style="color:#b3261e">🔌 ${MPT('Offline','Déconnecté')} : ${off.join(', ')}</span>`:''}${MP.lost?`<span style="color:#b3261e">⚠ ${MPT('Connection lost','Connexion perdue')} <button onclick="mpJoin(MP.code)">${MPT('Reconnect','Se reconnecter')}</button></span>`:''}</div>`}
function mpDecorate(){const A=document.getElementById('app');if(!A||!S)return;const r0=A.querySelector('.row');if(r0)r0.insertAdjacentHTML('afterend',mpBar());
 A.querySelectorAll('button[onclick="replay()"]').forEach(b=>b.remove());
 if(S.phase=='end'){const lg=A.querySelector('.log'),t=MP.host?`<button onclick="mpBackToLobby()" style="font-size:16px;padding:9px 16px">🔁 ${MPT('New game with the same players','Nouvelle partie avec les mêmes joueurs')}</button> `:`<span class=m>${MPT('The host can start a new game.','L’hôte peut lancer une nouvelle partie.')}</span> `;
  if(lg)lg.insertAdjacentHTML('beforebegin',`<p class=notr>${t}<button onclick="mpLeave()" style="background:var(--mu)">${MPT('Leave the room','Quitter le salon')}</button></p>`)}}
// ---------- Branchements ----------
mpInstall();
(()=>{const GH=goHome;goHome=function(){if(MP.on)return mpLeave();return GH()};
 const RR=R;R=function(){if(MP.exec)return;if(!S&&VIEW=='mp'){renderMP(document.getElementById('app'));return}
  if(MP.on&&S&&S.mp){if(MP.host){const real=S;S=mpView(0);try{RR()}finally{S=real}}else RR();
   if(MP.host){const real=S;S=mpView(0);try{mpDecorate()}finally{S=real}}else mpDecorate();return}
  RR();
  if(!S&&VIEW!='stats'&&VIEW!='sim'&&VIEW!='rules'&&VIEW!='turn'){const A=document.getElementById('app'),b=A&&A.querySelector('.hm-play');if(b&&!A.querySelector('#mpopen'))b.insertAdjacentHTML('afterend',`<br><button id=mpopen class=hm-sec onclick="mpOpen()" style="border-color:#3a6ea5;font-weight:700">🌐 Online multiplayer</button>`)}};
 window.addEventListener('beforeunload',()=>{try{if(MP.on&&MP.host)MP.players.forEach(p=>p.conn&&p.conn.send({t:'closed'}))}catch(e){}});
 try{if(/^#join-[A-Za-z]{4}$/.test(location.hash||'')){VIEW='mp';MP.stage='menu'}}catch(e){}
 window.addEventListener('hashchange',()=>{if(/^#join-[A-Za-z]{4}$/.test(location.hash||'')&&!MP.on&&!S){VIEW='mp';MP.stage='menu';R()}});
 R()})();
</script>
