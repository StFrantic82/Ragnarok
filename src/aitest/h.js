// banc d'essai : charge base + ai_new.js + loki ; RNG à graine ; variantes par joueur (p.x)
const fs=require('fs'),vm=require('vm'),SRC='/home/claude/ragnarok/src/';
function rng(seed){let s=seed>>>0;return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mk(aiFile,extra){let b=fs.readFileSync(SRC+'base.html','utf8');b=b.slice(b.indexOf('<script>')+8,b.indexOf('</script>'));const i=b.indexOf('const IMG={'),j=b.indexOf('\n',i);b=b.slice(0,i)+'const IMG={};'+b.slice(j);
 const a=(fs.readFileSync(aiFile||SRC+'ai.js','utf8')+fs.readFileSync(SRC+'loki.js','utf8')).replace(/<\/?script>/g,'');
 const ctx={console,structuredClone,Math,Date,document:{getElementById:()=>({})}};vm.createContext(ctx);
 vm.runInContext('var S;'+b+'\n'+a+';this.g=()=>S;this.DK=DK;this.score=score;this.autoFsetup=autoFsetup;this.setLoki=v=>{LOKI_ON=v};'+(extra||''),ctx);return ctx}
function play(ctx,cfg,opt){opt=opt||{};if(opt.seed!=null)Math.random=rng(opt.seed);ctx.setLoki(!!opt.loki);
 const gods=Object.keys(ctx.DK),g=opt.gods||(()=>{const a=[...gods];const o=[];for(let k=0;k<cfg.length;k++)o.push(a.splice(Math.random()*a.length|0,1)[0]);return o})();
 ctx.newGame(g[0],0,g);const S=ctx.g();S.prio=Math.random()*S.ps.length|0;
 S.ps.forEach((p,i)=>{p.human=false;ctx.autoFsetup(p);if(cfg[i])Object.assign(p,cfg[i])});let n=0;while(S.phase!='end'&&n++<20)ctx.pick(-1);
 const sc=S.ps.map(p=>ctx.score(p).t);let w=0;S.ps.forEach((p,i)=>{if(sc[i]>sc[w]||(sc[i]==sc[w]&&p.h>S.ps[w].h))w=i});
 return{sc,win:S.lokiWin?-1:w,gods:S.ps.map(p=>p.n),lokiWin:!!S.lokiWin,rd:S.rd}}
module.exports={mk,play,rng};
