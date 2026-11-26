<script>
// ===== IA avancée : anticipation par simulation + fonction de valeur réglée par auto-jeu + apprentissage =====
const AIW_DEFAULT={h:0.69,hr:0.41,b:0.31,ab:0.66,ban:-1.5,imit:1.5,lum:4};
let AIW=Object.assign({},AIW_DEFAULT),AIM={cards:{},kills:{},games:0};
// clone rapide : copie les conteneurs, partage les cartes (immuables), sauf les cartes Loki ; n'emporte pas le journal
const CLONE_SKIP={log:1,ev:1,snap:1,grad:1,cstat:1,kstat:1};
const cleaf=o=>(typeof o.t=='string'&&o.t!='Loki')||o.need!==undefined;
function fclone(o){if(o===null||typeof o!='object')return o;
 if(Array.isArray(o)){const n=o.length;if(!n)return[];const f=o[0];if(f===null||typeof f!='object'||cleaf(f)){let ok=true;for(let i=1;i<n;i++){const x=o[i];if(x!==null&&typeof x=='object'&&!cleaf(x)){ok=false;break}}if(ok)return o.slice()}
  const a=new Array(n);for(let i=0;i<n;i++)a[i]=fclone(o[i]);return a}
 if(cleaf(o))return o;
 const r={};for(const k in o){r[k]=CLONE_SKIP[k]?(Array.isArray(o[k])?[]:undefined):fclone(o[k])}return r}
const clone=fclone;
// options de l'IA (par joueur via p.x, sinon défauts)
const XDEF={fair:1,nopf:1,dp:6,la:1,D:2,top:2,lak:2,lad:3};const X=(p,k)=>(p.x&&p.x[k]!==undefined)?p.x[k]:XDEF[k];
// brouillard : l'IA ne doit pas connaître l'ordre des pioches cachées quand elle anticipe
function fog(st,p){st.cd=shuf(st.cd);st.ws=shuf(st.ws);if(st.lkDeck){st.lkDeck=shuf(st.lkDeck);st._lkRisk=0;
  // 2 Loki en jeu : si « The Shapeshifter » est encore dans la pioche, libérer un Monde peut en révéler 2 d'un coup (défaite). On le compte comme un risque moyen, pas comme un tirage.
  const d=st.lkDeck,i=d.findIndex(c=>c.on=='next');if(st.lk&&st.lk.L.length==2&&i>=0&&d.length>1){if(i==d.length-1){const j=Math.random()*(d.length-1)|0;[d[i],d[j]]=[d[j],d[i]]}st._lkRisk=150/d.length}}
 return st}
const pclone=p=>X(p,'fair')?fog(clone(S),p):clone(S);
function withS(st,f){const o=S;S=st;try{return f()}finally{S=o}}
// Œil d'Odin : en jouant Odin (résolu en premier), on défausse une des 2 autres cartes jouées et on pioche 2 cartes, jouées aussi
function drawOne(p){if(!p.deck.length){if(!p.disc.length)return null;p.deck=shuf(p.disc);p.disc=[]}return p.deck.pop()}
function odinAuto(p){const o=p.hand.filter(c=>c.t!='God');if(!o.length)return null;return o.reduce((a,b)=>(val(p,b.eff)+b.bon.length)<(val(p,a.eff)+a.bon.length)?b:a)}
const needEye=p=>p&&!p.fsetup&&!p.eyeDone&&p.hand.some(c=>c.eff=='eye')&&p.hand.some(c=>c.t!='God');
function odinEye(p,d){if(!needEye(p))return;if(!d||!p.hand.includes(d))d=odinAuto(p);p.eyeDone=true;
 p.hand.splice(p.hand.indexOf(d),1);p.disc.push(d);const nw=[drawOne(p),drawOne(p)].filter(Boolean);p.hand.push(...nw);
 log(p.n+' (Odin’s eye) discards '+d.n+' and draws '+(nw.map(c=>c.n).join(' & ')||'nothing'));if(typeof ev=='function')ev({a:'odinEye',p:p.n,c:d.n})}
function aiOdin(p){if(!needEye(p))return;const cands=p.hand.filter(c=>c.t!='God');let best=null,bv=-1e9;
 cands.forEach(d=>{let s=0;for(let k=0;k<2;k++){const st=clone(S);s+=withS(st,()=>{const q=S.ps[p.i],dd=q.hand[p.hand.indexOf(d)];q.deck=shuf(q.deck);odinEye(q,dd);return bestVal(q)})}if(s>bv){bv=s;best=d}});
 odinEye(p,best)}
function odinChoose(j){const me=S.ps[0];odinEye(me,me.hand.filter(c=>c.t!='God')[j])}
function resolveHand(p){p.prosp=false;p.eyeDone=false;p.lumUsed=false;p.acted=false;
 p.pend=p.human&&p.ban.length&&p.hand.some(c=>c.eff=='frigg')?[...p.hand]:null;p.hand.forEach(c=>{if(c.t=='God'){p.h+=c.eff=='frigg'?0:2;p.g=c.eff;
   if(c.eff=='freyja'){const n=cnt(p,'Character');p.h-=1;if(n>=1)p.h++;if(n>=2)p.atk++;if(n>=3)p.unl++}
   if(c.eff=='heim'){p.h-=1;p.trb++}if(c.eff=='eye')p.h-=2-(globalThis.ODH||0);if(c.eff=='freyr'){p.h-=(globalThis.FRB??1);p.prosp=true}}
  else if(!p.pend){p.h+=Math.max(0,val(p,c.eff));if(c.eff=='Atk')p.atk++;if(c.eff=='Unl')p.unl++}});
 p.disc.push(...p.hand);p.hand=[]}
function friggStep(p){if(p.g!='frigg')return;const bb=p.ban.length?p.ban.reduce((a,b)=>lv(p,b)>lv(p,a)?b:a):null;
 if(p.human&&p.pend){S.phase='fchoice';return}if(p.human||!p.ban.length){p.h+=2;return}
 const w=W(p),ev=f=>{const st=pclone(p);return withS(st,()=>{const q=S.ps[p.i];f(q);return planCombat(q,nAtk(q),w,0).v})};
 let best=ev(q=>{q.h+=2}),bi=-1;p.ban.forEach((c,i)=>{const v=ev(q=>loom(q,q.ban[i]));if(v>best){best=v;bi=i}});if(bi<0)p.h+=2;else loom(p,p.ban[bi])}
// --- fonction de valeur ---
function feats(p){const R=Math.max(0,7-S.rd),bon=p.v.reduce((s,c)=>s+c.bon.filter(b=>b!='Atk'&&b!='Unl').length,0),ab=p.v.reduce((s,c)=>s+c.bon.filter(b=>b=='Atk'||b=='Unl').length,0);
 return{vp:score(p).t,h:R>0?p.h:0,hr:p.h*R/7,b:bon*R,ab:ab*R,ban:p.ban.length*(R>0?1:0),sp:R>0?setProg(p):0,gp:R>0?godProg(p)*R/7:0,fp:R>0?growth(p)*R/7:0}}
function growth(p){const mm=p.n=='Odin'?1:3;let s=0;[p.s,...p.v.map(c=>c.vp)].forEach(f=>{if(!f)return;const a=f.split('/');if(a.length<2)return;const m=+a[a.length-2];if(m>=mm&&!['GBU','CIE'].includes(a[a.length-1]))s+=m});return s}
const FPW={Odin:4,Tyr:3};
const GPW={Freyja:5,Heimdall:4,Odin:0,Baldr:7,Freyr:3};
function godProg(p){if(p.n=='Freyja')return Math.min(cnt(p,'Character'),3);if(p.n=='Heimdall')return cnt(p,'diffsub');if(p.n=='Odin')return S.free.length;if(p.n=='Baldr')return Math.min(cnt(p,'Glory'),5);if(p.n=='Freyr')return cnt(p,'Destiny');return 0}
// progression vers la prochaine série (ex. Freyja : Géant+Bête+Mort-vivant) : valeur partielle d'une série commencée
function setProg(p){let s=0;[p.s,...p.v.map(c=>c.vp),...p.cr.map(c=>c.vp)].forEach(f=>{if(!f)return;const a=f.split('/'),k=a[a.length-1];if(k!='GBU'&&k!='CIE')return;
 const m=a.length==2?+a[0]:+a[1],T=k=='GBU'?['Giant','Beast','Undead']:['Character','Item','Event'],c=T.map(x=>cnt(p,x)),mn=Math.min(...c);s+=m*c.filter(x=>x>mn).length/3});return s}
// pendant une évaluation, les compteurs (cnt) d'un joueur sont mémorisés : l'état ne change pas
let CNTM=null;(()=>{const C0=cnt;cnt=function(p,k){if(CNTM&&CNTM.p===p){const m=CNTM.m;let v=m[k];if(v===undefined)v=m[k]=C0(p,k);return v}return C0(p,k)}})();
function V(p,w){CNTM={p,m:{}};try{return V0(p,w)}finally{CNTM=null}}
function V0(p,w){const f=feats(p);return f.vp+w.h*f.h+w.hr*f.hr+w.b*f.b+w.ab*f.ab+(p.n=='Frigg'?0.28:w.ban)*f.ban+(w.sp??0.8)*f.sp+(w.gp??GPW[p.n]??0)*f.gp+(w.fp??FPW[p.n]??0)*f.fp+(hasLum(p)?(w.lum??1)*Math.max(0,7-S.rd)*(cnt(p,'Glory')>=3?2.5:cnt(p,'Glory')>=1?1.8:0.6):0)}
const W=p=>p.w||AIW;
// préférence apprise (imitation) : >0 si la joueuse fait souvent ce choix
function pref(cn,place){const m=AIM.cards[cn];if(!m)return 0;const n=m.seen||0;if(n<1)return 0;
 const a=(m.aside+1)/(n+2),v=(m.v+1)/(m.v+m.b+2);return (a-0.25)*0.5+(place=='v'?v-0.5:0.5-v)}
function kpref(cn){const m=AIM.kills[cn];if(!m)return 0;return ((m.k+1)/(m.av+2)-0.5)}
// --- Luminous (Baldr au Valhalla) : 1×/tour, au choix : ≥1 Gloire +2 Héros ; ≥3 battre gratuitement une non-élite accessible ; ≥5 une élite accessible
const hasLum=p=>p.v.some(c=>c.bon.includes('Lum'));
function lumAvail(p){return hasLum(p)&&!p.lumUsed&&!p.acted&&cnt(p,'Glory')>=1}
function lumOk(p,c){const g=cnt(p,'Glory');return lumAvail(p)&&(c.e?g>=5:g>=3)}
var LUMH=2;function lumHeroes(p){if(!lumAvail(p))return;p.h+=LUMH;p.lumUsed=true;S.lumMode=0;log(p.n+' uses Luminous: +'+LUMH+' Heroes')}
function lumKill(p,o){if(!o||!lumOk(p,o.c))return;p.h+=crCost(p,o.c);p.lumUsed=true;S.lumMode=0;log(p.n+' uses Luminous: defeats '+o.c.n+' for free');p._lk=1;hit(p,o);p._lk=0}
function lumClick(i){lumKill(S.ps[0],acc(S.ps[0])[i]);R()}
function lumPanel(me){if(!lumAvail(me))return hasLum(me)&&me.lumUsed?'<p class=m>☀ Luminous already used this turn.</p>':hasLum(me)&&me.acted&&cnt(me,'Glory')>=1?'<p class=m>☀ Luminous is no longer available this turn (it must be used before fighting or protecting a World).</p>':'';const g=cnt(me,'Glory');
 return`<div style="border:2px solid #f2c94c;border-radius:8px;padding:6px 8px;margin:4px 0;background:rgba(242,201,76,.12)"><b>☀ Luminous</b> (Baldr, 1× per turn, before any fight or World protection — you have ${g} Glory): <button onclick="lumHeroes(S.ps[0]);R()">+2 Heroes</button>${g>=3?`<button onclick="S.lumMode=S.lumMode?0:1;R()">${S.lumMode?'Cancel free defeat':'Free defeat: '+(g>=5?'any':'non-Elite')+' accessible creature'}</button>`:''}${S.lumMode?' <span class=m>Click a creature marked ☀.</span>':''}</div>`}
function aiLum(p){if(!lumAvail(p))return;const w=W(p);let best={v:-1e9,a:null};
 {const st=pclone(p);const v=withS(st,()=>{const q=S.ps[p.i];lumHeroes(q);return planCombat(q,nAtk(q),w,0).v});if(v>best.v)best={v,a:'h'}}
 acc(p).filter(o=>lumOk(p,o.c)).map(akey).forEach(k=>{const st=pclone(p);const v=withS(st,()=>{const q=S.ps[p.i];lumKill(q,afind(k));return planCombat(q,nAtk(q),w,0).v});if(v>best.v)best={v,a:k}});
 if(best.a=='h')lumHeroes(p);else if(best.a)lumKill(p,afind(best.a))}
// marque l'action (combat ou protection) : Luminous n'est plus disponible ensuite
(()=>{const H=hit,P=protect,PU=put;hit=function(p,o){const n=p.cr.length,h=p.h;H(p,o);if(p.cr.length>n){p.spent=(p.spent||0)+Math.max(0,h-p.h);if(!p._lk)p.acted=true}};protect=function(p,w){const n=p.ws.length,h=p.h;P(p,w);if(p.ws.length>n){p.acted=true;p.spent=(p.spent||0)+Math.max(0,h-p.h)}};put=function(p){const h=p.h;PU(p);if(p.h<h)p.spent=(p.spent||0)+(h-p.h)}})();
// --- Prosperity (Freyr joué) : poser 1 Héros (dépensé) sur une carte du Valhalla sans Héros -> PV et bonus doublés, définitif
// --- Freyr : semer et récolter — poser X Héros sur sa carte de scoring, récupérés en double au début de la manche suivante
function payInvest(p){if(p.inv){const g=p.inv*(1+invMult(p));p.h+=g;log(p.n+' harvests '+g+' Heroes from '+p.inv+' invested');p.inv=0}}
const invCap=p=>5;
const invMult=p=>1+p.v.filter(c=>c.bon.includes('Inv2')).length;
function invest(p,x){if(!p.prosp)return;x=Math.max(0,Math.min(p.h,invCap(p),x|0));p.h-=x;p.inv=(p.inv||0)+x;p.prosp=false;if(x)log(p.n+' invests '+x+' Heroes')}
function prospSkip(p){p.prosp=false}
function aiProsper(p){if(!p.prosp)return;const w=W(p),R=Math.max(0,7-S.rd);
 const xs=[...new Set([0,1,2,3,Math.floor(p.h/3),Math.floor(p.h/2),Math.ceil(p.h*2/3),p.h])].filter(x=>x<=p.h&&x<=invCap(p));let best=-1e9,bx=0;
 xs.forEach(x=>{const st=pclone(p);const v=withS(st,()=>{const q=S.ps[p.i];invest(q,x);return planCombat(q,nAtk(q),w,0).v+(R>0?(w.h||0.7)*(1+invMult(p))*x+(w.inv??1.5)*invMult(p)*x:1.6*Math.min((1+invMult(p))*x,6))})+0;if(v>best){best=v;bx=x}});
 invest(p,bx)}
// --- combat ---
const akey=o=>({ri:o.r===S.lk?-1:S.rows.indexOf(o.r),s:o.s,ci:o.r[o.s].indexOf(o.c)});
const afind=k=>{const r=k.ri<0?S.lk:S.rows[k.ri];return{c:r[k.s][k.ci],r,s:k.s}};
// évalue chaque protection possible en la jouant puis en l'annulant (sans copier l'état)
function bestProtect(p,w){let best=null,bv=V(p,w),bf=feats(p);if(p.pw)return{j:best,v:bv,f:bf};
 for(let j=0;j<S.free.length;j++){const x=S.free[j],k=wCost(p,x);if(k>p.h)continue;p.h-=k;p.ws.push(x);S.free.splice(j,1);p.pw=1;const v=V(p,w);if(v>bv){bv=v;best=j;bf=feats(p)}p.pw=0;S.free.splice(j,0,x);p.ws.pop();p.h+=k}
 return{j:best,v:bv,f:bf}}
// valeur après un combat simple (pas de Monde libéré, pas un Loki) : jouer puis annuler, sans copier l'état
function tryHit(p,o,w){if(o.r===S.lk||o.r[o.s].length<=1)return null;const k=crCost(p,o.c);p.h-=k;p.cr.push(o.c);const v=V(p,w);p.cr.pop();p.h+=k;return v}
function planCombat(p,n,w,deep){ // renvoie {v,seq:[clé],prot}
 const base=bestProtect(p,w);let best={v:base.v,seq:[],prot:base.j,f:base.f};if(n<=0)return best;
 const opts=acc(p).filter(o=>crCost(p,o.c)<=p.h).map(akey);
 const cand=[],im=(W(p).imit||0)*(p.human?0:1),mkst=k=>{const st=clone(S);withS(st,()=>hit(S.ps[p.i],afind(k)));return st};
 opts.forEach(k=>{const o=afind(k),fv=tryHit(p,o,w);if(fv!=null){cand.push({k,st:null,v:fv+im*kpref(o.c.n)});return}
  const st=mkst(k);cand.push({k,st,v:withS(st,()=>V(S.ps[p.i],w))+im*kpref(o.c.n)})});
 cand.sort((a,b)=>b.v-a.v);const lim=deep?cand.length:Math.min(1,cand.length);
 cand.slice(0,deep?Math.min(cand.length,deep):lim).forEach(c=>{const st=c.st||mkst(c.k);const r=withS(st,()=>planCombat(st.ps[p.i],n-1,w,deep?Math.max(2,deep-2):0));if(r.v>best.v)best={v:r.v,seq:[c.k,...r.seq],prot:r.prot,f:r.f}});return best}
var PCD=8;
function aiCombat(p){aiProsper(p);aiLum(p);const w=W(p);
 if(X(p,'fair')){let n=nAtk(p),g=0;while(g++<12){const st=pclone(p),pl=withS(st,()=>planCombat(S.ps[p.i],n,w,PCD));
   if(n>0&&pl.seq.length){const o=afind(pl.seq[0]);if(o.c&&crCost(p,o.c)<=p.h){hit(p,o);n--;continue}}
   if(pl.prot!=null&&S.free[pl.prot])protect(p,S.free[pl.prot]);break}
  if(!X(p,'nopf'))[...S.free].forEach(x=>protect(p,x));return}
 const pl=planCombat(p,nAtk(p),w,PCD);pl.seq.forEach(k=>{const o=afind(k);if(o.c&&crCost(p,o.c)<=p.h)hit(p,o)});
 if(pl.prot!=null&&S.free[pl.prot])protect(p,S.free[pl.prot]);else if(!X(p,'nopf'))[...S.free].forEach(x=>protect(p,x))}
// --- choix de la carte de côté + placement ---
function optApply(q,i,pl){q.human=false;const c=q.aside=q.hand.splice(i,1)[0];resolveHand(q);friggStep(q);
  if(pl=='v'){const k=cardCost(q,c);if(k>q.h||c.t=='God')return false;q.h-=k;q.v.push(c)}else{q.h+=2+(q.v.filter(x=>x.bon.includes('Ban')).length);q.ban.push(c)}q.aside=null;return true}
function evalOptions(p,w,useImit){const out=[];for(let i=0;i<p.hand.length;i++)for(const pl of['v','b']){if(p.hand[i].t=='God')continue;const st=pclone(p);const r=withS(st,()=>{const q=S.ps[p.i];
  if(!optApply(q,i,pl))return null;
  const cp=planCombat(q,nAtk(q),w,0);return{v:cp.v,f:cp.f}});
  if(r){let v=r.v;if(useImit)v+=(w.imit||0)*pref(p.hand[i].n,pl);out.push({i,pl,v,f:r.f,cn:p.hand[i].n})}}
 return out}
// affinage des meilleures options : combat planifié en profondeur et/ou regard sur la manche suivante
function nextRoundSelf(q){S.rd++;q.trb=0;q.atk=0;q.unl=0;q.g='';q.aside=null;q.pw=0;q.eyeDone=false;q.deck=shuf(q.deck);draw(q)}
function refine(p,x,w){const la=X(p,'la')&&S.rd<7,K=la?(X(p,'lak')||2):1,dp=X(p,'dp')||0;let s=0;
 for(let k=0;k<K;k++){const st=pclone(p);s+=withS(st,()=>{const q=S.ps[p.i];if(!optApply(q,x.i,x.pl))return -1e9;
   if(!la)return planCombat(q,nAtk(q),w,dp).v;
   const d=PCD;PCD=X(p,'lad')||3;try{aiCombat(q)}finally{PCD=d}payInvest(q);if(S.lokiWin)return V(q,w);
   let v0=V(q,w);const D=X(p,'D')||1;
   for(let d=1;d<=D&&S.rd<7;d++){nextRoundSelf(q);const o=evalOptions(q,w,false);if(!o.length)return v0;const bo=o.reduce((a,b)=>b.v>a.v?b:a);
    if(d==D)return bo.v;if(!optApply(q,bo.i,bo.pl))return bo.v;const d0=PCD;PCD=X(p,'lad')||3;try{aiCombat(q)}finally{PCD=d0}payInvest(q);v0=V(q,w);if(S.lokiWin)return v0}
   return v0})}
 return s/K}
function aiDecide(p){const w=W(p),o=evalOptions(p,w,!p.w);o.sort((a,b)=>b.v-a.v);
 if((X(p,'dp')||X(p,'la'))&&o.length>1){const top=o.slice(0,X(p,'top')||3);top.forEach(x=>{x.v2=refine(p,x,w)+(!p.w?(w.imit||0)*pref(x.cn,x.pl):0)});top.sort((a,b)=>b.v2-a.v2);return top[0]}
 return o[0]||{i:0,pl:'b'}}
// --- anciennes IA (pour comparaison) ---
function legacyChoose(p){let b=0,bs=-99;p.hand.forEach((c,j)=>{const s=c.t=='God'?-9:cv(p,c)-cardCost(p,c)*.8;if(s>bs){bs=s;b=j}});return b}
function legacyCombat(p){for(let n=nAtk(p);n>0;n--){let b=null,bs=0;acc(p).forEach(o=>{const k=crCost(p,o.c);if(k<=p.h){const s=val(p,o.c.vp)+(o.c.e?2:0)-k*.7;if(s>bs){bs=s;b=o}}});if(b)hit(p,b)}[...S.free].forEach(w=>protect(p,w))}
// --- remplacement de pick / combat ---
function mulligan(p){if(p.mull||S.phase!='pick')return;p.mull=true;p.eyeDone=false;const old=p.hand.map(c=>c.n);p.disc.push(...p.hand);p.hand=[];draw(p);log(p.n+' takes a Mulligan (discards '+old.join(', ')+')');if(typeof ev=='function')ev({a:'mulligan',p:p.n,c:old.join('|')})}
function bestVal(p){const o=evalOptions(p,W(p),!p.w);return o.length?Math.max(...o.map(x=>x.v)):-1e9}
function aiMulligan(p){if(p.mull||p.legacy)return;const v0=bestVal(p);let sum=0,n=3;
 for(let k=0;k<n;k++){const st=clone(S);sum+=withS(st,()=>{const q=S.ps[p.i];q.disc.push(...q.hand);q.hand=[];q.deck=shuf(q.deck);draw(q);return bestVal(q)})}
 if(sum/n>v0+1.5)mulligan(p)}
pick=function(i){const dec={};if(S.ps[0].human&&(S.ps[0].fsetup||needEye(S.ps[0])||!S.ps[0].hand[i]||S.ps[0].hand[i].t=='God'))return;if(S.mp){const me=S.ps[0];if(S.phase!='pick'||me.aside||!me.hand[i])return;me.aside=me.hand.splice(i,1)[0];S._dec={};if(S.ps.every(p=>p.aside))pickResolve();return}
 S.ps.forEach(p=>{if(!p.human){aiMulligan(p);aiOdin(p)}});
 S.ps.forEach(p=>{if(p.human){p.aside=p.hand.splice(i,1)[0]}else if(p.legacy){p.aside=p.hand.splice(legacyChoose(p),1)[0]}else{const d=aiDecide(p);dec[p.i]=d.pl;p.aside=p.hand.splice(d.i,1)[0]}});
 S._dec=dec;
 pickResolve()};
function pickResolve(){const dec=S._dec||{};
 S.ps.forEach(resolveHand);log('Cards played, effects resolved.');S.phase='place';S.ps.forEach(friggStep);
 S.ps.filter(p=>!p.human).forEach(p=>{const c=p.aside,k=cardCost(p,c);if(p.legacy){if(k<=p.h&&c.t!='God'&&cv(p,c)>=k*.6)put(p);else ban(p)}else if(dec[p.i]=='v'&&k<=p.h&&c.t!='God')put(p);else ban(p)});
 if(!S.ps.some(p=>p.human)){S.ord=S.ps.map((_,j)=>(S.prio+j)%S.ps.length);S.k=0;combat()}}
combat=function(){while(S.k<S.ord.length){const p=S.ps[S.ord[S.k]];
  if(p.human){S.phase='fight';S.fl=nAtk(p);if(typeof onHumanFight=='function')onHumanFight(p);return}
  if(p.legacy)legacyCombat(p);else aiCombat(p);payInvest(p);S.k++;if(S.lokiWin){lokiEnd();return}}
 endRound()};
</script>
