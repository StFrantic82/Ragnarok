const {ctx,play}=require('./bench.js');const vm=require('vm');
const N=+process.argv[2],np=+process.argv[3],on=process.argv[4]=='1';vm.runInContext('LOKI_ON='+on,ctx);
const st={};let lw=0;
for(let k=0;k<N;k++){const o=play(Array.from({length:np},()=>({})));const S=ctx.g();if(S.lokiWin)lw++;
 S.ps.forEach((p,i)=>{const x=st[p.n]=st[p.n]||{n:0,vp:0,w:0,lk:0,lvp:0,cr:0,ws:0,v:0};const sc=ctx.score(p);x.n++;x.vp+=sc.t;x.lvp+=sc.l||0;x.lk+=(p.lk||[]).length;x.cr+=p.cr.length;x.ws+=p.ws.length;x.v+=p.v.length;if(o.win==i)x.w++})}
console.log(JSON.stringify({st,lw,N}));
