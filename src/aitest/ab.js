// node ab.js N seed0 '<json A>' '<json B>' [np] [loki]  : A contre B, parties appariées (même graine, sièges inversés)
const {mk,play}=require('./h.js');const C=mk();
const N=+process.argv[2],s0=+process.argv[3],A=JSON.parse(process.argv[4]),B=JSON.parse(process.argv[5]||'{}'),np=+process.argv[6]||3,loki=process.argv[7]=='loki';
const mkcfg=v=>{const o={x:v.x||{}};if(v.w)o.w=v.w;return o};
let d=0,d2=0,n=0,wa=0,wb=0,sa=0,sb=0,va=0,vb=0,t=Date.now(),lw=0,g=0;
for(let k=0;k<N;k++){const seed=s0+k;Math.random=require('./h.js').rng(seed*7919);const mask=[];let ok=false;while(!ok){for(let i=0;i<np;i++)mask[i]=Math.random()<.5;ok=mask.some(x=>x)&&mask.some(x=>!x)}
 const r1=play(C,mask.map(m=>mkcfg(m?A:B)),{seed,loki}),r2=play(C,mask.map(m=>mkcfg(m?B:A)),{seed,loki});
 for(let i=0;i<np;i++){const a=mask[i]?r1.sc[i]:r2.sc[i],b=mask[i]?r2.sc[i]:r1.sc[i];d+=a-b;d2+=(a-b)**2;n++;va+=a;vb+=b}
 [[r1,mask],[r2,mask.map(m=>!m)]].forEach(([r,m])=>{g++;if(r.lokiWin)lw++;m.forEach((isA,i)=>{if(isA){sa++;if(r.win==i)wa++}else{sb++;if(r.win==i)wb++}})})}
const m=d/n,se=Math.sqrt((d2/n-m*m)/n);
console.log(JSON.stringify({dVP:+m.toFixed(2),se:+se.toFixed(2),vpA:+(va/n).toFixed(1),vpB:+(vb/n).toFixed(1),winA:+(100*wa/sa).toFixed(1),winB:+(100*wb/sb).toFixed(1),lokiWin:+(100*lw/g).toFixed(1),games:g,ms:Math.round((Date.now()-t)/g)}));
