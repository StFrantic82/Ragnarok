<script>
// ===== Simulateur de parties IA contre IA + statistiques et matchups =====
const SIM={mode:'random',n:100,np:3,per:20,loki:false,run:false,done:0,total:0,t0:0,res:null,mx:null,last:null};
const simFr=()=>typeof LANG!='undefined'&&LANG=='fr';
const ST=(en,fr)=>simFr()?fr:en;
function simOne(gods,np){ // gods: [g0,g1] pour un matchup, ou null pour des dieux au hasard
 const saveR=R,saveS=S,saveL=LOKI_ON;let out=null;R=function(){};LOKI_ON=SIM.loki;
 try{
  if(gods){const keep={};Object.keys(DK).forEach(k=>{if(!gods.includes(k)){keep[k]=DK[k];delete DK[k]}});try{newGame(gods[0],1)}finally{Object.assign(DK,keep)}}
  else{const ks=Object.keys(DK);newGame(ks[Math.random()*ks.length|0],np-1)}
  S.spect=true;S.simu=true;S.ps.forEach(p=>{p.human=false;autoFsetup(p)});
  let k=0;while(S.phase!='end'&&k++<30)pick(-1);
  const r=S.ps.map(p=>{const s=score(p);return{n:p.n,t:s.t,h:p.h,gain:p.h-(p.h0||0)+(p.spent||0),cr:p.cr.length,ws:p.ws.length,v:p.v.filter(c=>!c._tmp).length,lk:(p.lk||[]).length}});
  const ord=[...r].sort((a,b)=>b.t-a.t||b.h-a.h);out={r,win:S.lokiWin?null:ord[0].n,loki:!!S.lokiWin,lk:!!S.lk};
 }catch(e){out={err:String(e)}}finally{S=saveS;R=saveR;LOKI_ON=saveL}
 return out}
function simStart(){if(SIM.run)return;SIM.run=true;SIM.done=0;SIM.t0=Date.now();SIM.err=0;
 const gods=Object.keys(DK);let jobs=[];
 if(SIM.mode=='random'){for(let i=0;i<SIM.n;i++)jobs.push(null);SIM.res={};SIM.lokiWins=0;SIM.games=0}
 else{SIM.mx={};gods.forEach(a=>{SIM.mx[a]={};gods.forEach(b=>SIM.mx[a][b]={w:0,n:0,vp:0})});
  for(let i=0;i<gods.length;i++)for(let j=i+1;j<gods.length;j++)for(let k=0;k<SIM.per;k++)jobs.push(k%2?[gods[j],gods[i]]:[gods[i],gods[j]])}
 SIM.total=jobs.length;SIM.mode0=SIM.mode;SIM.np0=SIM.np;SIM.loki0=SIM.loki;R();
 const step=()=>{if(!SIM.run)return;const t=Date.now();
  while(jobs.length&&Date.now()-t<120){const j=jobs.shift(),o=simOne(j,SIM.np);SIM.done++;if(!o||o.err){SIM.err++;continue}simAdd(o,j)}
  simProgress();if(jobs.length)setTimeout(step,0);else{SIM.run=false;R()}};
 setTimeout(step,30)}
function simStop(){SIM.run=false;R()}
function simAdd(o,j){
 if(!j){SIM.games++;if(o.loki)SIM.lokiWins++;
  o.r.forEach(p=>{const x=SIM.res[p.n]=SIM.res[p.n]||{n:0,w:0,t:0,mn:1e9,mx:-1e9,gain:0,cr:0,ws:0,v:0,lk:0};x.n++;x.t+=p.t;x.mn=Math.min(x.mn,p.t);x.mx=Math.max(x.mx,p.t);x.gain+=p.gain;x.cr+=p.cr;x.ws+=p.ws;x.v+=p.v;x.lk+=p.lk;if(o.win==p.n)x.w++})}
 else{const [a,b]=[o.r[0],o.r[1]];const A=SIM.mx[a.n][b.n],B=SIM.mx[b.n][a.n];A.n++;B.n++;A.vp+=a.t;B.vp+=b.t;if(o.win==a.n)A.w++;else if(o.win==b.n)B.w++}}
function simProgress(){const e=document.getElementById('simprog');if(!e)return;const p=SIM.total?SIM.done/SIM.total:0,el=(Date.now()-SIM.t0)/1000,eta=p>0?el/p-el:0;
 e.innerHTML=`<div style="height:12px;background:var(--bd);border-radius:6px;overflow:hidden"><div style="height:100%;width:${(100*p).toFixed(1)}%;background:var(--ac)"></div></div><div class=m style="margin-top:4px">${SIM.done} / ${SIM.total} ${ST('games','parties')} · ${Math.round(el)} s${SIM.run?' · '+ST('about','environ')+' '+Math.round(eta)+' s '+ST('left','restantes'):''}</div>`}
const pc=(a,b)=>b?(100*a/b).toFixed(0)+' %':'–',av=(a,b)=>b?(a/b).toFixed(1):'–';
function simTableRandom(){const R0=SIM.res;if(!R0||!SIM.games)return'';const fair=100/SIM.np0;
 const rows=Object.entries(R0).sort((a,b)=>b[1].t/b[1].n-a[1].t/a[1].n);
 const col=w=>{const d=w-fair;return d>8?'#2e7d32':d<-8?'#c62828':''};
 let h=`<h3>${ST('Results by god','Résultats par dieu')} — ${SIM.games} ${ST('games','parties')}, ${SIM.np0} ${ST('players','joueurs')}${SIM.loki0?' · 🐍 Loki':''}</h3>
 <p class=m>${ST('A fair win rate is','Un taux de victoire équitable est de')} ${fair.toFixed(0)} %.${SIM.loki0?' '+ST('Loki won','Loki a gagné')+' '+pc(SIM.lokiWins,SIM.games)+' '+ST('of games.','des parties.'):''}</p>
 <div style="overflow-x:auto"><table class=simt><tr><th>${ST('God','Dieu')}</th><th>${ST('Games','Parties')}</th><th>${ST('Win %','% victoires')}</th><th>${ST('Avg VP','PV moyens')}</th><th>Min</th><th>Max</th><th>${ST('Heroes gained','Héros gagnés')}</th><th>${ST('Creatures','Créatures')}</th><th>${ST('Worlds','Mondes')}</th><th>Valhalla</th>${SIM.loki0?'<th>Loki</th>':''}</tr>`;
 rows.forEach(([g,x])=>{const w=100*x.w/x.n;h+=`<tr><td><b>${g}</b></td><td>${x.n}</td><td style="color:${col(w)};font-weight:700">${w.toFixed(0)} %</td><td><b>${av(x.t,x.n)}</b></td><td>${x.mn}</td><td>${x.mx}</td><td>${av(x.gain,x.n)}</td><td>${av(x.cr,x.n)}</td><td>${av(x.ws,x.n)}</td><td>${av(x.v,x.n)}</td>${SIM.loki0?`<td>${av(x.lk,x.n)}</td>`:''}</tr>`});
 return h+'</table></div>'}
function simTableMatch(){const M=SIM.mx;if(!M)return'';const g=Object.keys(M);
 const tot=a=>{let w=0,n=0;g.forEach(b=>{if(b!=a){w+=M[a][b].w;n+=M[a][b].n}});return n?100*w/n:0};
 const gs=[...g].sort((a,b)=>tot(b)-tot(a));
 const bg=v=>{const d=Math.max(-1,Math.min(1,(v-50)/30));return d>=0?`rgba(46,125,50,${(.12+.55*d).toFixed(2)})`:`rgba(198,40,40,${(.12+.55*-d).toFixed(2)})`};
 let h=`<h3>${ST('Matchups (1 vs 1)','Matchups (1 contre 1)')}${SIM.loki0?' · 🐍 Loki':''}</h3><p class=m>${ST('Each cell: win % of the row god against the column god','Chaque case : % de victoires du dieu en ligne contre le dieu en colonne')} (${SIM.per} ${ST('games per pair, alternating who plays first','parties par paire, en alternant qui commence')}).</p>
 <div style="overflow-x:auto"><table class=simt><tr><th></th>${gs.map(b=>`<th>${b}</th>`).join('')}<th>${ST('Overall','Global')}</th></tr>`;
 gs.forEach(a=>{h+=`<tr><th style="text-align:left">${a}</th>`+gs.map(b=>{if(a==b)return'<td style="background:#0001">—</td>';const c=M[a][b];if(!c.n)return'<td>…</td>';const v=100*c.w/c.n;return`<td title="${a} vs ${b}: ${c.w}/${c.n} · ${av(c.vp,c.n)} ${ST('VP','PV')}" style="background:${bg(v)};font-weight:700">${v.toFixed(0)}</td>`}).join('')+`<td style="font-weight:800">${tot(a).toFixed(0)} %</td></tr>`});
 return h+'</table></div>'}
function simText(){const L=[];if(SIM.mode0=='random'&&SIM.res){L.push(`RAGNAROK SIM ${SIM.games} games ${SIM.np0}p${SIM.loki0?' Loki':''}`);Object.entries(SIM.res).forEach(([g,x])=>L.push(`${g}\t${x.n}\t${(100*x.w/x.n).toFixed(1)}%\t${(x.t/x.n).toFixed(1)} VP`))}
 if(SIM.mode0=='match'&&SIM.mx){const g=Object.keys(SIM.mx);L.push('MATCHUPS\t'+g.join('\t'));g.forEach(a=>L.push(a+'\t'+g.map(b=>a==b?'-':SIM.mx[a][b].n?(100*SIM.mx[a][b].w/SIM.mx[a][b].n).toFixed(0):'').join('\t')))}
 return L.join('\n')}
function simCopy(){const t=simText();try{navigator.clipboard.writeText(t).then(()=>{SIM.copied=1;R()},()=>{SIM.copied=2;R()})}catch(e){SIM.copied=2;R()}}
function renderSim(A){const seg=(cur,opts,fn)=>`<div class=hm-seg>${opts.map(([v,l])=>`<button class="${cur==v?'on':''}" ${SIM.run?'disabled':''} onclick="${fn}=${JSON.stringify(v).replace(/"/g,"'")};R()">${l}</button>`).join('')}</div>`;
 const ng=Object.keys(DK).length,pairs=ng*(ng-1)/2;
 A.innerHTML=`<style>.simt{border-collapse:collapse;font-size:14px;margin:6px 0}.simt td,.simt th{border:1px solid var(--bd);padding:5px 8px;text-align:center}.simt th{background:#0000000a}.simc{display:flex;flex-wrap:wrap;gap:14px 22px;align-items:flex-end;margin:10px 0}.simc label{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.06em;opacity:.7;margin-bottom:4px}</style>
 <div class=notr style="max-width:1000px;margin:0 auto"><div class=row style="gap:6px"><button onclick="VIEW='';R();scrollTo(0,0)">← ${ST('Home','Accueil')}</button></div>
 <h2>🤖 ${ST('AI vs AI simulations','Simulations IA contre IA')}</h2>
 <p class=m>${ST('Runs complete games between AIs in your browser (nothing is saved in the game statistics). Use it to compare the gods and their matchups.','Lance des parties complètes entre IA dans ton navigateur (rien n’est enregistré dans les statistiques des parties). Pour comparer les dieux et leurs matchups.')}</p>
 <div class=simc>
 <div><label>Mode</label>${seg(SIM.mode,[['random',ST('Random games','Parties au hasard')],['match',ST('Matchups 1 vs 1','Matchups 1 contre 1')]],'SIM.mode')}</div>
 ${SIM.mode=='random'?`<div><label>${ST('Games','Parties')}</label>${seg(SIM.n,[[50,'50'],[100,'100'],[300,'300'],[1000,'1000']],'SIM.n')}</div><div><label>${ST('Players','Joueurs')}</label>${seg(SIM.np,[[2,'2'],[3,'3'],[4,'4']],'SIM.np')}</div>`
 :`<div><label>${ST('Games per pair','Parties par paire')}</label>${seg(SIM.per,[[10,'10'],[20,'20'],[50,'50'],[100,'100']],'SIM.per')}</div><div class=m style="align-self:center">${pairs} ${ST('pairs','paires')} × ${SIM.per} = ${pairs*SIM.per} ${ST('games','parties')}</div>`}
 <div><label>${ST('Loki expansion','Extension Loki')}</label>${seg(SIM.loki,[[false,ST('Off','Non')],[true,'🐍 '+ST('On','Oui')]],'SIM.loki')}</div>
 <div>${SIM.run?`<button onclick="simStop()" style="background:#c62828;color:#fff">■ ${ST('Stop','Arrêter')}</button>`:`<button onclick="simStart()" class=hm-play style="font-size:18px;padding:10px 26px">▶ ${ST('Run','Lancer')}</button>`}</div></div>
 <div id=simprog></div>
 ${SIM.mode0=='random'?simTableRandom():''}${SIM.mode0=='match'?simTableMatch():''}
 ${(SIM.res&&SIM.games)||SIM.mx?`<p><button onclick="simCopy()">📋 ${ST('Copy results','Copier les résultats')}</button> ${SIM.copied==1?'✅':SIM.copied==2?ST('Copy not allowed here.','Copie impossible ici.'):''}</p>`:''}
 ${SIM.err?`<p class=m>${SIM.err} ${ST('game(s) failed and were skipped.','partie(s) en erreur ignorée(s).')}</p>`:''}
 <p class=m>${ST('AI games are a guide: a good human player usually scores a few VP more than the AI.','Les parties IA sont un repère : un bon joueur humain marque en général quelques PV de plus que l’IA.')}</p></div>`;
 simProgress()}
(()=>{const RR=R;R=function(){if(!S&&VIEW=='sim'){renderSim(document.getElementById('app'));return}return RR.apply(this,arguments)}})();
</script>
