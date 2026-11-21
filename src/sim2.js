const {ctx,play}=require('./bench.js');
const N=+process.argv[2],np=+process.argv[3];const st={};
const vm=require('vm');vm.runInContext(`(function(){const P=put,H=hit,Pr=protect;
put=function(p){const c=p.aside,k=c?cardCost(p,c):0,n=p.v.length;P(p);if(p.v.length>n)p._sp=(p._sp||0)+k};
hit=function(p,o){const k=crCost(p,o.c),n=p.cr.length;H(p,o);if(p.cr.length>n)p._sp=(p._sp||0)+k};
protect=function(p,w){const k=wCost(p,w),n=p.ws.length;Pr(p,w);if(p.ws.length>n)p._sp=(p._sp||0)+k};
const NG=newGame;newGame=function(a,b){NG(a,b);S.ps.forEach(p=>p._h0=p.h)}})()`,ctx);
for(let k=0;k<N;k++){const o=play(Array.from({length:np},()=>({})));const S=ctx.g();
 S.ps.forEach((p,i)=>{const x=st[p.n]=st[p.n]||{n:0,vp:0,hg:0,mx:0,mn:1e9,w:0};const v=ctx.score(p).t;x.n++;x.vp+=v;x.hg+=p.h+(p._sp||0)-p._h0;x.mx=Math.max(x.mx,v);x.mn=Math.min(x.mn,v);if(o.win==i)x.w++})}
console.log(JSON.stringify(st));
