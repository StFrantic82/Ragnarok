const fs=require('fs'),vm=require('vm');
function mk(){const ctx={console,structuredClone,Math,Date,document:{getElementById:()=>({})}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(__dirname+'/engine.js','utf8')+';this.g=()=>S;this.DK=DK;this.score=score;this.setW=w=>{AIW=w};this.getW=()=>AIW;this.cnt=cnt;this.crCost=crCost;this.autoFsetup=autoFsetup',ctx);return ctx}
const ctx=mk();
function play(cfg,god0){const gods=Object.keys(ctx.DK);ctx.newGame(god0||gods[Math.random()*gods.length|0],cfg.length-1);const S=ctx.g();
 S.ps.forEach((p,i)=>{p.human=false;ctx.autoFsetup(p);if(cfg[i].legacy)p.legacy=true;else if(cfg[i].w)p.w=cfg[i].w});let n=0;while(S.phase!='end'&&n++<20)ctx.pick(-1);
 const r=S.ps.map(p=>[p.i,ctx.score(p).t,p.h,p.n]).sort((a,b)=>b[1]-a[1]||b[2]-a[2]);return{win:r[0][0],r}}
module.exports={ctx,play};
if(require.main===module){const N=+process.argv[2]||200,np=+process.argv[3]||3;let w=0,vpA=0,vpL=0;const t=Date.now();
 for(let k=0;k<N;k++){const seat=k%np;const cfg=Array.from({length:np},(_,i)=>i==seat?{}:{legacy:1});const o=play(cfg);if(o.win==seat)w++;o.r.forEach(x=>{if(x[0]==seat)vpA+=x[1];else vpL+=x[1]/(np-1)})}
 console.log('new AI winrate',(w/N*100).toFixed(1)+'%','(fair',(100/np).toFixed(1)+'%)','avgVP new',(vpA/N).toFixed(1),'legacy',(vpL/N).toFixed(1),(Date.now()-t)/N|0,'ms/game')}
