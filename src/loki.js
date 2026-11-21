<script>
// ===== Extension Loki (module optionnel) =====
var LOKI_ON=false;if(typeof document!='undefined'&&document.head)document.head.insertAdjacentHTML('beforeend','<style>@media(min-width:1250px){.lkboard .row{flex-wrap:nowrap}}@media(max-width:1249px){.lkboard{flex:1 1 100%!important}}</style>');const LOKI_MAX=4;let LKW=4;
// surnom|force (coût)|PV|élite(1)|sous-type|effet permanent|effet instantané|effet quand vaincu|texte
// Permanent : U B G (Morts-vivants/Bêtes/Géants +1 Force), W (protéger un monde +2), last (ne peut être vaincu que s'il est le dernier Loki)
// Instantané : disc (chacun défausse 1 carte), lose2, unfree (défausser tous les mondes libérés), next (révéler le Loki suivant), perloki (chacun perd 1 Héros par Loki en jeu), rich (le(s) plus riche(s) perd(ent) 3 Héros)
// Vaincu : atk (+1 attaque), draw (+1 carte), opp2 (adversaires -2 Héros), oppdisc (adversaires défaussent 1 carte)
const LOKI_DATA=`The Thief|5|2/Animal||Animal||disc||Instant: each player discards 1 card from their hand for each Loki in play.
The Trickster|5|2/Glory||Glory||lose||Instant: each player loses 1 Hero for each Loki in play.
The Deceiver|5|2/Destiny||Destiny||unfree||Instant: discard 1 random freed World from play for each Loki in play.
The Sly God|5|2/Equipment||Equipment||tok||Instant: place 1 Hero on this card for each Loki in play. This Loki has +1 Strength for each Hero on it.
The Shapeshifter|5|2/Warrior||Warrior||next||Instant: reveal the next Loki card.
The Mocker|5|2/Artefact||Artefact||vban||Instant: each player moves 1 card from their Valhalla to their banish area and gains 1 Hero for each Loki in play.
Laufey’s Son|7|2/Giant|1||G|||Ongoing: Giants have +1 Strength.|Giant
Father of the Wolf|7|2/Beast|1||B|||Ongoing: Beasts have +1 Strength.|Beast
Father of Hel|7|2/Undead|1||U|||Ongoing: Undeads have +1 Strength.|Undead
Father of the World Serpent|7|3/World|1||W|||Ongoing: protecting a World costs +2 Heroes.|World
The Bound God|9|5/Loki|1||last|||Ongoing: cannot be defeated unless this is the last Loki in play.
The Sky Traveller|4|3|||||opplose|When defeated: opponents lose 1 Hero for each Loki in play.
Son of Farbauti|4|2|||||oppdiscn|When defeated: opponents discard 1 card from their hand for each Loki in play.
The Lie-Smith|4|7|||||less|When defeated: draw 1 card less at the end of your turn.
The Mischief Maker|4|4|||||atk|When defeated: +1 Attack.`;
const mkLoki=r=>({n:r[0],t:'Loki',cost:+r[1],vp:r[2],e:r[3]=='1',sub:r[4]||'',fx:r[5]||'',on:r[6]||'',def:r[7]||'',txt:r[8]||'',ct:r[9]||''});
const lkOn=x=>!!(S&&S.lk&&S.lk.L.some(c=>c.fx==x));
function lokiW(){return lkOn('W')?2:0}
function lokiReveal(n){for(let i=0;i<n;i++){if(!S.lkDeck.length){log('Loki deck is empty: no new Loki appears.');break}const c=S.lkDeck.pop();S.lk.L.push(c);log('🐍 Loki appears: Loki, '+c.n+' — '+c.txt);lokiOnEnter(c)}
 if(S.lk.L.length>=LOKI_MAX)S.lokiWin=true}
const lokiLose=(p,k)=>{p.h=Math.max(0,p.h-k)};
function lokiDiscAI(p){while(p.dsc>0){const o=p.hand.filter(c=>c.t!='God');if(o.length<=1){p.dsc=0;break}const d=o.reduce((a,b)=>lv(p,b)<lv(p,a)?b:a);p.hand.splice(p.hand.indexOf(d),1);p.disc.push(d);p.dsc--;log(p.n+' discards '+d.n+' (Loki)')}if(!p.hand.some(c=>c.t!='God'))p.dsc=0}
function lokiDisc(p,k){p.dsc=(p.dsc||0)+k;if(!p.human&&p.hand.length)lokiDiscAI(p)}
function lokiOnEnter(c){const N=S.lk.L.length;
 if(c.on=='disc')S.ps.forEach(p=>lokiDisc(p,N));
 if(c.on=='lose2')S.ps.forEach(p=>lokiLose(p,2));
 if(c.on=='lose')S.ps.forEach(p=>lokiLose(p,N));
 if(c.on=='unfree'&&S.free.length){const out=[];for(let i=0;i<N&&S.free.length;i++)out.push(S.free.splice(Math.random()*S.free.length|0,1)[0]);log(out.map(w=>w.n).join(', ')+' discarded by Loki')}
 if(c.on=='tok'){c.tok=(c.tok||0)+N;c.cost+=N;log(c.n+' gets '+N+' Hero'+(N>1?'es':'')+' (+'+N+' Strength)')}
 if(c.on=='vban')S.ps.forEach(p=>lokiVban(p,1,N));
 if(c.on=='next')lokiReveal(1)}
function lokiOnDefeat(p,c){const op=S.ps.filter(q=>q!==p);
 if(c.def=='atk'){if(p.human&&S.phase=='fight')S.fl++;else p._xa=(p._xa||0)+1}
 if(c.def=='draw')p.xdraw=(p.xdraw||0)+1;
 if(c.def=='opp2')op.forEach(q=>lokiLose(q,2));
 const N=S.lk.L.length;
 if(c.def=='opplose')op.forEach(q=>lokiLose(q,N));
 if(c.def=='oppdiscn')op.forEach(q=>lokiDisc(q,N));
 if(c.def=='oppdisc')op.forEach(q=>lokiDisc(q,1));
 if(c.def=='less')p.xdraw=(p.xdraw||0)-1;
 if(c.def=='selfban')lokiVban(p,1,0)}
function lokiRedraw(p){p.redraw=0;p.dsc=0;p.disc.push(...p.hand);p.hand=[];draw(p);p.eyeDone=false;log(p.n+' discards their hand and draws a new one (Loki)')}
function lokiVban(p,k,gain){if(!p.v.length)return;p.vb=(p.vb||0)+k;p.vbg=gain;if(!p.human||S.spect)lokiVbanAI(p)}
function lokiVbanDo(p,c){if(!(p.vb>0)||!p.v.includes(c))return;p.v.splice(p.v.indexOf(c),1);p.ban.push(c);p.vb--;if(p.vbg)p.h+=p.vbg;log(p.n+' moves '+c.n+' from Valhalla to banished (Loki)'+(p.vbg?' +'+p.vbg+' Heroes':''));if(!p.v.length)p.vb=0}
function lokiVbanAI(p){while(p.vb>0&&p.v.length){const c=p.v.reduce((a,b)=>{const va=(withS(S,()=>{const i=p.v.indexOf(a);p.v.splice(i,1);const t=score(p).t;p.v.splice(i,0,a);return t})),vb=(()=>{const i=p.v.indexOf(b);p.v.splice(i,1);const t=score(p).t;p.v.splice(i,0,b);return t})();return vb>va?b:a});lokiVbanDo(p,c)}}
function lokiEnd(){S.phase='end';log('🐍 '+LOKI_MAX+' Loki cards are in play: Loki triumphs, everyone loses!');if(!S.saved&&!S.spect&&typeof saveGame=='function')saveGame()}
(()=>{
 const NG=newGame;newGame=function(a,b){NG(a,b);if(LOKI_ON){S.lk={L:[],R:[]};S.lkDeck=shuf(LOKI_DATA.split('\n').map(l=>mkLoki(l.split('|'))));lokiReveal(1)}};
 const CC=cc;cc=function(p,base,at,type){let r=CC(p,base,at,type);if(!S||!S.lk)return r;
  if(type=='cr'){if(at[0]=='Undead'&&lkOn('U'))r++;if(at[0]=='Beast'&&lkOn('B'))r++;if(at[0]=='Giant'&&lkOn('G'))r++}
  return r};
 const AC=acc;acc=function(p){const o=AC(p);if(S.lk&&!S.lokiWin)S.lk.L.forEach(c=>{if(c.fx!='last'||S.lk.L.length==1)o.push({c,r:S.lk,s:'L'})});return o};
 const H=hit;hit=function(p,o){if(S.lk&&o.r===S.lk){const k=crCost(p,o.c);if(k>p.h||!S.lk.L.includes(o.c))return;p.h-=k;S.lk.L.splice(S.lk.L.indexOf(o.c),1);(p.lk=p.lk||[]).push(o.c);p.acted=true;p.spent=(p.spent||0)+k;
   log(p.n+' defeats Loki: '+o.c.n+' ('+k+')');lokiOnDefeat(p,o.c);if(typeof ev=='function'&&S.ev)ev({a:'loki',p:p.n,c:o.c.n,k,h:p.h});return}
  const f=S.free.length;H(p,o);if(S.lk&&S.free.length>f)lokiReveal(S.free.length-f)};
 const SC=score;score=function(p){const r=SC(p),l=(p.lk||[]).reduce((s,c)=>s+val(p,c.vp),0);r.l=l;r.t+=l;return r};
 const CN=cnt;cnt=function(p,k){return k=='Loki'?(p.lk||[]).length:k=='Kin'?(p.lk||[]).filter(c=>c.vp.endsWith('/Kin')).length:CN(p,k)};
 const ER=endRound;endRound=function(){ER();if(!S.lk||S.phase=='end')return;S.ps.forEach(p=>{if(p.redraw)lokiRedraw(p);while(p.xdraw>0){p.xdraw--;const x=drawOne(p);if(x)p.hand.push(x)}while(p.xdraw<0){p.xdraw++;const x=p.hand.pop();if(x){p.deck.push(x);log(p.n+' draws 1 card less (Loki)')}}if(!p.human&&p.dsc)lokiDiscAI(p);if(p.vb&&(!p.human||S.spect))lokiVbanAI(p)})};
 const AIC=aiCombat;aiCombat=function(p){AIC(p);let g=0;while(p._xa>0&&g++<3){p._xa--;const pl=planCombat(p,1,W(p),4);pl.seq.forEach(k=>{const o=afind(k);if(o.c&&crCost(p,o.c)<=p.h)hit(p,o)})}p._xa=0};
 const PK=pick;pick=function(i){const me=S&&S.ps[0];if(me&&me.human&&!S.spect&&((me.dsc>0&&me.hand.filter(c=>c.t!='God').length>1)||(me.vb>0&&me.v.length)))return;return PK(i)};
 const DN=done;done=function(){const me=S.ps[0];if(me.vb>0&&me.v.length)return;return DN()};
 const VV=V;V=function(p,w){let v=VV(p,w);if(S.lk){if(S.lokiWin)v-=150;else{const n=S.lk.L.length,R=Math.max(0,7-S.rd);if(R>0)v-=(w.lk??LKW)*(n>=3?3:n>=2?1:0)*Math.min(1,R/3)}}return v};
 const RR=R;R=function(){if(S&&S.lokiWin&&S.phase!='end'&&!S._sim)lokiEnd();const r=RR.apply(this,arguments);
  try{const me=S&&S.ps&&S.ps[0];if(me&&me.human&&!S.spect&&me.vb>0&&me.v.length&&S.phase!='end'){const A=document.getElementById('app'),lg=A.querySelector('.log');if(lg)lg.insertAdjacentHTML('beforebegin',`<div class="p odn" style="border:2px solid #c9a227;background:rgba(201,162,39,.12)"><p><b>🐍 Loki: move ${me.vb} card${me.vb>1?'s':''} from your Valhalla to your banish area</b>${me.vbg?' (you gain '+me.vbg+' Heroes)':' (no Hero gained)'}. Click the card.</p><div class=row>${me.v.map((c,i)=>`<span class=clk onclick="lokiVbanH(${i})" style="display:inline-block">${ch(c)}</span>`).join('')}</div></div>`)}}catch(e){}
  try{const me=S&&S.ps&&S.ps[0];if(me&&me.human&&!S.spect&&S.phase=='pick'&&me.dsc>0&&!me.fsetup&&me.hand.filter(c=>c.t!='God').length<=1)me.dsc=0;if(me&&me.human&&!S.spect&&S.phase=='pick'&&me.dsc>0&&!me.fsetup&&me.hand.filter(c=>c.t!='God').length>1){const A=document.getElementById('app'),lg=A.querySelector('.log');
   if(lg)lg.insertAdjacentHTML('beforebegin',`<div class="p odn" style="border:2px solid #c9a227;background:rgba(201,162,39,.12)"><p><b>🐍 Loki: discard ${me.dsc} card${me.dsc>1?'s':''} from your hand</b> (before setting a card aside; you always keep at least 1 card to set aside). Click the card to discard.</p><div class=row>${me.hand.map((c,i)=>c.t=='God'?'':`<span class=clk onclick="lokiDiscH(${i})" style="display:inline-block">${ch(c)}</span>`).join('')}</div></div>`)}}catch(e){}
  return r};
})();
function lokiVbanH(i){const me=S.ps[0];lokiVbanDo(me,me.v[i]);R()}
function lokiDiscH(i){const me=S.ps[0],c=me.hand[i];if(!c||c.t=='God'||!(me.dsc>0)||me.hand.filter(x=>x.t!='God').length<=1)return;me.hand.splice(i,1);me.disc.push(c);me.dsc--;log(me.n+' discards '+c.n+' (Loki)');R()}
function lokiVpTxt(v){const a=v.split('/');return a.length==1?v:a.length==2?a[0]+' × '+a[1]:a[0]+' + '+a[1]+' × '+a[2]}
function lokiStr(c){try{return S&&S.ps&&S.ps[0]?crCost(S.ps[0],c):c.cost}catch(e){return c.cost}}
function lokiBody(c){if(IMG['Loki|'+c.n])return`<div class=c style="padding:2px;width:90px;background:#0f1f16;border:1px solid #c9a227;margin:0;position:relative"><img src="${IMG['Loki|'+c.n]}" width=90 title="Loki — ${c.n}: ${c.txt}" style="display:block;border-radius:5px"><span style="position:absolute;top:58px;left:50%;transform:translateX(-50%);background:rgba(60,60,60,.82);color:#fff;font:700 14px system-ui;padding:3px 9px;border-radius:10px;white-space:nowrap"><img src="${SUBIMG.h}" width=16 height=16 style="filter:invert(1);vertical-align:-3px"> ${lokiStr(c)}</span><div style="color:#f2e6c0;padding:3px 4px 4px;font:10.5px/1.25 system-ui;min-height:84px;box-sizing:border-box"><i style="color:#f2d675">${c.n}</i>${c.ct?` <img src="${SUBIMG[c.ct]}" title="Counts as a ${c.ct}" style="width:14px;height:14px;vertical-align:-2px;border-radius:3px">`:""}<br>${c.txt}${c.ct?`<br><b>${{Giant:"Counts as a Giant.",Beast:"Counts as a Beast.",Undead:"Counts as an Undead.",World:"Counts as a World."}[c.ct]}</b>`:""}</div></div>`;
 return`<div class=c style="width:132px;min-height:158px;padding:6px;background:linear-gradient(160deg,#1f3b2a,#0f1f16);color:#e8d9a8;border:2px solid #c9a227;border-radius:8px;font:12px system-ui;box-sizing:border-box;position:relative">

 <div style="font-size:22px;line-height:1">🐍${c.e?' <span style="color:#b48cff">★</span>':''}</div>${c.sub?`<div style="font-size:10px;opacity:.8">${c.sub}</div>`:''}<b style="display:block;font-family:Cinzel,Georgia,serif;font-size:14px;margin:2px 0 0;color:#f2d675">Loki</b><i style="display:block;font-size:11px;margin-bottom:3px;color:#f2d675">${c.n}</i>
 <div style="font-size:11px;line-height:1.3;margin-bottom:38px">${c.txt}</div>
 <div style="position:absolute;bottom:5px;left:6px;right:6px;font-size:11px"><span style="opacity:.85">Strength ${c.cost}</span><br><b style="background:#c9a227;color:#1f3b2a;border-radius:8px;padding:0 5px;display:inline-block;margin-top:2px;font-size:10px;white-space:nowrap">${lokiVpTxt(c.vp)} VP</b></div></div>`}
function lokiPanel(){const n=S.lk.L.length,danger=n>=LOKI_MAX-1;
 return`<div class="p lkp" style="flex:0 0 auto;width:196px;margin:0;padding:5px;border:2px solid ${danger?'#b3261e':'#c9a227'};background:${danger?'rgba(179,38,30,.10)':'rgba(201,162,39,.10)'}">
 <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px"><b style="font-size:15px">🐍 Loki: ${n} / ${LOKI_MAX}</b><span class=m style="font-size:12px">Deck: ${S.lkDeck.length}</span></div>${danger&&!S.lokiWin?'<div style="color:#b3261e;font:700 11px system-ui;margin-bottom:4px">⚠ One more freed World and Loki wins!</div>':''}
 <div style="display:grid;grid-template-columns:repeat(2,94px);gap:4px">${S.lk.L.map(c=>ch2(c)).join('')||'<span class=m>No Loki in play.</span>'}</div></div>`}
</script>
