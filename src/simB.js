const {ctx,play}=require('./bench.js');const vm=require('vm');
const N=+process.argv[2],god=process.argv[3]||'Bragi';if(process.argv[4])vm.runInContext(process.argv[4],ctx);
let x={n:0,vp:0,w:0,v:0,pairs:0,sc:0,cr:0,h:0};const opp={n:0,vp:0};
for(let k=0;k<N;k++){const o=play([{},{},{}],god);const S=ctx.g();const p=S.ps[0];const s=ctx.score(p);
 x.n++;x.vp+=s.t;x.sc+=s.d||0;x.v+=p.v.length;x.cr+=p.cr.length;x.pairs+=ctx.cnt(p,'pairs');x.h+=p.h;if(o.win==0)x.w++;
 S.ps.slice(1).forEach(q=>{opp.n++;opp.vp+=ctx.score(q).t})}
console.log(JSON.stringify({god,vp:(x.vp/x.n).toFixed(1),win:(100*x.w/x.n).toFixed(1),scoring:(x.sc/x.n).toFixed(1),pairs:(x.pairs/x.n).toFixed(2),valh:(x.v/x.n).toFixed(1),cr:(x.cr/x.n).toFixed(1),oppVP:(opp.vp/opp.n).toFixed(1),n:x.n}));
