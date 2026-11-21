<script>
// ===== Annuler le dernier clic du joueur =====
let UNDO=null,UNDO_PEND=null,UNDO_SIG=null;
const undoSig=()=>{try{return JSON.stringify(S)}catch(e){return Math.random()+''}};
function undoBtn(){return UNDO&&S&&!S.mp&&S.phase!='end'&&!S.spect?`<button onclick="undoLast()" title="Undo your last click" style="background:var(--mu)">↩ Undo</button>`:''}
function undoLast(){if(!UNDO)return;S=UNDO;UNDO=null;R()}
(()=>{const skip=/undoLast|_askHome|S=null|openStats|copySummary|replay|newGame|spect|VIEW|setLang|importGames|resetStats/;
 document.addEventListener('click',e=>{const el=e.target.closest&&e.target.closest('[onclick]');if(!el||!S||S.spect||S.mp||S.phase=='end')return;const oc=el.getAttribute('onclick')||'';if(skip.test(oc)||el.disabled)return;
  try{UNDO_PEND=structuredClone(S);UNDO_SIG=undoSig()}catch(x){UNDO_PEND=null;return}
  setTimeout(()=>{if(!UNDO_PEND)return;if(S&&undoSig()!==UNDO_SIG){UNDO=UNDO_PEND;R()}UNDO_PEND=null},0)},true);
 const NG=newGame;newGame=function(){UNDO=null;return NG.apply(this,arguments)}})();
</script>
