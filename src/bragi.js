<script>
// ===== Bragi (en test) =====
DK.Bragi={h:5,s:'3/pairs',c:`Bragi|G||0|||bragi
Kvasir|C||3|Character&Event|3|1/1/Event
Gunnlöð|C||2|Item|3|0/1/pairs
Bragi Boddason|C|Glory|4|Glory|2/Glory|2
The Einherjar|C|Warrior|3|Atk|2/Warrior|2/Warrior
Óðrerir|I|Artefact|2|Giant|2/Event|1
Bragarfull|I|Glory|3|Elite|2/Elite|1/Glory
Golden Harp|I||4|Event|4|1/1/Character
The Mead of Poetry|E|Destiny|2|Unl|3|1
Welcome to Valhalla|E|Glory|2|Undead|4|1/Glory
Ægir's Feast|E||2|World|2/World|1/1/Item
Lokasenna|E||2|Beast|3|Atk
Hákonarmál|E|Glory|3|Elite|3/Glory|2`};
(()=>{const CN2=cnt;cnt=function(p,k){if(k=='pairs'){const T=tags(p);return SUBS.reduce((s,t)=>s+Math.floor(T.filter(x=>x==t).length/2),0)}return CN2(p,k)};
 const RH2=resolveHand;resolveHand=function(p){const b=p.hand.some(c=>c.eff=='bragi');if(b)p.hand.forEach(c=>{if(c.t!='God'&&!p.v.includes(c)){c._tmp=1;p.v.push(c)}});const h0=p.h;RH2(p);if(b){p.h-=2;p.g='bragi';log(p.n+' sings the Song of Heroes')}};
 const SC2=score;score=function(p){const r=SC2(p),t=p.v.filter(c=>c._tmp);if(t.length){const a=t.reduce((x,c)=>x+val(p,c.vp)*(c.dbl?2:1),0);r.a-=a;r.t-=a}return r};
 const ER2=endRound;endRound=function(){S.ps.forEach(p=>{if(p.v.some(c=>c._tmp)){p.v=p.v.filter(c=>{if(c._tmp){delete c._tmp;return false}return true})}});return ER2.apply(this,arguments)}})();
</script>
