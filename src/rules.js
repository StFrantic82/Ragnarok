<script>
// ===== Règles complètes & résumé du tour (onglets de la page d'accueil) =====
function rulesNav(cur){return`<div class=row style="gap:6px;margin-bottom:8px"><button onclick="VIEW='';R();scrollTo(0,0)">← Home</button><button ${cur=='rules'?'disabled':''} onclick="VIEW='rules';R();scrollTo(0,0)">📜 Full rules</button><button ${cur=='turn'?'disabled':''} onclick="VIEW='turn';R();scrollTo(0,0)">🧭 Turn summary</button></div>`}
const RULES_CSS=`<style>.rl{max-width:860px;margin:0 auto;line-height:1.5;font-size:15px}.rl h2{font-family:'Metamorphous','Cinzel',Georgia,serif;margin:6px 0 10px}.rl h3{font-family:'Cinzel',Georgia,serif;margin:18px 0 6px;border-bottom:1px solid var(--bd);padding-bottom:3px}.rl table{border-collapse:collapse;width:100%;font-size:14px;margin:6px 0}.rl td,.rl th{border:1px solid var(--bd);padding:5px 7px;text-align:left;vertical-align:top}.rl th{background:rgba(0,0,0,.04)}.rl .box{background:var(--card);border:1px solid var(--bd);border-radius:10px;padding:10px 14px;margin:8px 0}.rl ol li,.rl ul li{margin:3px 0}.rl .step{display:flex;gap:10px;align-items:flex-start;margin:8px 0}.rl .n{flex:0 0 30px;height:30px;border-radius:50%;background:var(--ac);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center}</style>`;
function rulesHTML(){return`<div class=rl><h2>📜 Ragnarök — Full rules</h2>
<div class=box><b>Goal.</b> As a god of Asgard, you face the Creatures of Ragnarök for 7 rounds. Send cards to Valhalla, defeat Creatures and protect the Worlds to score the most Victory Points (VP). Heroes are the currency of the game: you earn them with your cards and spend them to do everything else.</div>
<h3>1. Setup</h3><ul>
<li>Each player chooses a god and takes its 13-card deck (the god card + 12 cards) and its scoring card. Shuffle your deck and draw <b>4 cards</b>.</li>
<li>Each player starts with the number of Heroes shown on their scoring card (Baldr 4, Freyja 4, Odin 4, Tyr 4, Freyr 3, Frigg 2, Heimdall 2, Thor 2).</li>
<li>Shuffle the Creatures and the Worlds. Make <b>3 rows</b>: a World in the middle with <b>2 Creatures on each side</b>.</li>
<li><b>Frigg</b> sets up differently: draw 2 cards (not Frigg), banish one (+2 Heroes), shuffle the other back into the deck, then draw 4 cards.</li></ul>
<h3>2. The cards</h3><ul>
<li><b>Types:</b> Character (blue), Item (yellow), Event (red). <b>Tags</b> (top left): ${tagsNamed(0)}. A card with two identical tag icons counts twice.</li>
<li><b>Cost</b> (bottom left): Heroes to pay to send the card to Valhalla.</li>
<li><b>Effect</b> (bottom): what the card gives when it is played (Heroes, +1 Attack, unlock, etc.).</li>
<li><b>VP</b> (scroll, top right): points scored at the end of the game if the card is in your Valhalla. “2 × Warrior” = 2 VP per Warrior icon you have.</li>
<li><b>Reduction icons</b> (top middle): once the card is in your Valhalla, each icon reduces by 1 Hero the cost of everything that matches it (a Creature type, Elite Creatures, a card type, a tag, protecting a World…). Two identical icons = −2.</li>
<li><b>God cards</b> are always played: they can never be set aside, sent to Valhalla or banished.</li></ul>
<h3>3. Round structure (7 rounds)</h3>
<p><b>A. Choose and play.</b> All players simultaneously choose <b>1 card to set aside</b>. The other 3 cards are <b>played</b>: apply their effects (gain Heroes, attacks, unlocks…) and your god’s power if you played it. Played cards go to your discard pile.</p>
<p><b>B. The card set aside</b> — choose one:</p><ul><li><b>Valhalla:</b> pay its cost (after reductions). It stays in front of you for the rest of the game: its VP count at the end and its reduction icons work for you.</li><li><b>Banish:</b> gain <b>2 Heroes</b>. The card leaves the game (some cards and gods use banished cards).</li></ul>
<p><b>C. Combat</b>, in priority order. Each player has <b>1 attack</b>, plus the extra attacks given by their cards.</p><ul>
<li>You can attack only an <b>accessible</b> Creature: the outermost Creature on each side of each World (unless an “unlock” effect lets you attack any Creature).</li>
<li>Pay its <b>Strength</b> in Heroes, minus your reductions. The Creature goes into your score pile (its VP count at the end).</li>
<li><b>Elite</b> Creatures (purple star) are stronger and often worth more.</li>
<li>When one side of a World has <b>no Creature left</b>, the World is <b>freed</b>: it goes to the Freed Worlds area, and a new World with new Creatures replaces it.</li>
<li><b>Protecting a World:</b> once per round, you may take a freed World. Its cost = its threshold − the number of matching symbols you have (shown on the World) − your World reductions. A protected World is worth its VP.</li></ul>
<p><b>D. End of round.</b> Each player draws back up to 4 cards (reshuffle the discard pile when the deck is empty). Priority passes to the next player.</p>
<p><b>Mulligan:</b> once per game, before choosing your card, you may discard your 4 cards and draw 4 new ones.</p>
<h3>4. The gods</h3><table><tr><th>God</th><th>Power when played</th><th>Scoring card</th></tr>
<tr><td><b>Baldr</b>, God of Light</td><td>+2 Heroes. <b>Luminous</b>: once Baldr is in your Valhalla, once per turn, before fighting or protecting: with 1+ Glory gain 2 Heroes; with 3+ Glory defeat an accessible non-Elite Creature for free; with 5+ Glory, an Elite one too.</td><td>5 × complete set Character + Item + Event</td></tr>
<tr><td><b>Freyja</b>, Goddess of Love</td><td>+1 Hero, and depending on your Characters in Valhalla: 1+ → +1 Hero, 2+ → +1 Attack, 3+ → unlock (attack any Creature).</td><td>5 × complete set Giant + Beast + Undead</td></tr>
<tr><td><b>Freyr</b>, God of Prosperity</td><td>+1 Hero and <b>Prosperity</b>: place up to 5 Heroes on your scoring card; at the end of your turn, take them back and gain as many.</td><td>2 × Heroes left (max 6)</td></tr>
<tr><td><b>Frigg</b>, Queen of the Ases</td><td><b>Loom</b>: gain 2 Heroes, or return one of your banished cards to your Valhalla for free.</td><td>4 × your most numerous card type</td></tr>
<tr><td><b>Heimdall</b>, Guardian of the Worlds</td><td>+1 Hero, and this round every cost involving a tag ${tagsIcons()} is reduced by 1.</td><td>2 × different tags</td></tr>
<tr><td><b>Odin</b>, Allfather</td><td><b>Odin’s eye</b> (before setting a card aside): discard 1 card, then draw 2.</td><td>4 × protected World</td></tr>
<tr><td><b>Thor</b>, God of Thunder</td><td>+2 Heroes, and this round the Strength of Elite Creatures is reduced by 1 per Equipment you have.</td><td>3 × Elite Creature</td></tr>
<tr><td><b>Tyr</b>, God of War</td><td>+2 Heroes, and this round the Strength of each Creature is reduced by 1 per Creature of the same type you have defeated.</td><td>2 × your most numerous Creature type</td></tr></table>
<h3>5. End of the game and scoring</h3><p>After round 7, add up: VP of your Valhalla cards + VP of your defeated Creatures + VP of your protected Worlds + your scoring card (+ your defeated Loki, with the expansion). The highest total wins; in case of a tie, the player with the most Heroes left wins.</p>
<h3>6. 🐍 Loki expansion (optional)</h3><ul>
<li>Shuffle the 15 Loki cards. Reveal one at the start of the game, then <b>one more each time a World is freed</b>.</li>
<li>If <b>4 Loki</b> are in play at the same time, <b>Loki wins and every player loses</b>.</li>
<li>A Loki is fought like a Creature (1 attack, Strength in Heroes, Elite and tag reductions apply). Once defeated, his effect stops and he scores his VP for you.</li>
<li>Three kinds of effects: <b>Instant</b> (when he appears), <b>Ongoing</b> (as long as he is in play), <b>When defeated</b> (for the player who defeats him).</li>
<li><b>The Bound God</b> can only be defeated when he is the last Loki in play.</li></ul></div>`}
function turnHTML(){const st=(n,t,b)=>`<div class=step><div class=n>${n}</div><div><b>${t}</b><br>${b}</div></div>`;
 return`<div class=rl><h2>🧭 Turn summary</h2><div class=box>
 ${st(1,'Choose a card to set aside','Out of your 4 cards, set 1 aside (never your god card). <i>Mulligan once per game: discard your 4 cards and draw 4.</i> <b>Odin:</b> use Odin’s eye first.')}
 ${st(2,'Play the other 3 cards','Apply their effects: Heroes, +1 Attack, unlock… and your god’s power if it is among them.')}
 ${st(3,'Valhalla or banish','<b>Valhalla:</b> pay the cost (minus your reductions) → VP at the end + permanent reductions. <b>Banish:</b> +2 Heroes.')}
 ${st(4,'Combat (in priority order)','1 attack + your extra attacks. Pay the Strength of an accessible Creature (the outermost one on each side). Then you may protect <b>1 freed World</b>.')}
 ${st(5,'End of round','Draw back up to 4 cards. Priority passes to the next player. Game over after round 7.')}</div>
 <h3>Reminders</h3><table>
 <tr><th>Heroes</th><td>Earned by played cards, gods, banishing (+2). Spent on Valhalla, Creatures and Worlds.</td></tr>
 <tr><th>Reductions</th><td>Each icon of a Valhalla card = −1 Hero on matching costs (two identical icons = −2).</td></tr>
 <tr><th>Freed World</th><td>One side with no Creature left → the World is freed and replaced. Protect it: threshold − your matching symbols − reductions.</td></tr>
 <tr><th>Scoring</th><td>Valhalla + Creatures + Worlds + scoring card (+ Loki). Tie: most Heroes left.</td></tr>
 <tr><th>🐍 Loki</th><td>1 at the start, +1 per freed World. 4 in play = everyone loses. Instant / Ongoing / When defeated.</td></tr></table></div>`}
function renderRules(A){const lg=typeof LANG!='undefined'?LANG:'en',fr=lg=='fr',it=lg=='it'&&typeof rulesHTML_it=='function';A.innerHTML=RULES_CSS+rulesNav(VIEW)+(VIEW=='turn'?(it?turnHTML_it():fr?turnHTML_fr():turnHTML()):(it?rulesHTML_it():fr?rulesHTML_fr():rulesHTML()))}
(()=>{const RR=R;R=function(){if(!S&&(VIEW=='rules'||VIEW=='turn')){renderRules(document.getElementById('app'));return}return RR.apply(this,arguments)}})();
</script>
<script>
function rulesHTML_fr(){return`<div class="rl notr"><h2>📜 Ragnarök — Règles complètes</h2>
<div class=box><b>But du jeu.</b> Tu incarnes un dieu d’Asgard et tu affrontes les Créatures du Ragnarök pendant 7 manches. Envoie des cartes au Valhalla, bats des Créatures et protège les Mondes pour marquer le plus de Points de Victoire (PV). Les Héros sont la monnaie du jeu : tu les gagnes avec tes cartes et tu les dépenses pour tout le reste.</div>
<h3>1. Mise en place</h3><ul>
<li>Chaque joueur choisit un dieu et prend son deck de 13 cartes (la carte dieu + 12 cartes) et sa carte de score. Mélange ton deck et pioche <b>4 cartes</b>.</li>
<li>Chaque joueur commence avec le nombre de Héros indiqué sur sa carte de score (Baldr 4, Freyja 4, Odin 4, Tyr 4, Freyr 3, Frigg 2, Heimdall 2, Thor 2).</li>
<li>Mélange les Créatures et les Mondes. Forme <b>3 rangées</b> : un Monde au centre avec <b>2 Créatures de chaque côté</b>.</li>
<li><b>Frigg</b> se prépare autrement : pioche 2 cartes (pas Frigg), bannis-en une (+2 Héros), remélange l’autre dans le deck, puis pioche 4 cartes.</li></ul>
<h3>2. Les cartes</h3><ul>
<li><b>Types :</b> Personnage (bleu), Objet (jaune), Événement (rouge). <b>Tags</b> (en haut à gauche) : ${tagsNamed(1)}. Une carte avec deux icônes de tag identiques compte double.</li>
<li><b>Coût</b> (en bas à gauche) : les Héros à payer pour envoyer la carte au Valhalla.</li>
<li><b>Effet</b> (en bas) : ce que la carte rapporte quand elle est jouée (Héros, +1 Attaque, déverrouillage…).</li>
<li><b>PV</b> (parchemin, en haut à droite) : les points marqués en fin de partie si la carte est dans ton Valhalla. « 2 × Guerrier » = 2 PV par icône Guerrier que tu possèdes.</li>
<li><b>Icônes de réduction</b> (en haut au milieu) : une fois la carte dans ton Valhalla, chaque icône réduit de 1 Héros le coût de tout ce qui lui correspond (un type de Créature, les Créatures Élites, un type de carte, un tag, la protection d’un Monde…). Deux icônes identiques = −2.</li>
<li><b>Les cartes dieu</b> sont toujours jouées : elles ne peuvent jamais être mises de côté, envoyées au Valhalla ni bannies.</li></ul>
<h3>3. Déroulement d’une manche (7 manches)</h3>
<p><b>A. Choisir et jouer.</b> Tous les joueurs choisissent en même temps <b>1 carte à mettre de côté</b>. Les 3 autres sont <b>jouées</b> : applique leurs effets (Héros, attaques, déverrouillages…) et le pouvoir de ton dieu s’il en fait partie. Les cartes jouées vont dans ta défausse.</p>
<p><b>B. La carte mise de côté</b> — au choix :</p><ul><li><b>Valhalla :</b> paie son coût (après réductions). Elle reste devant toi jusqu’à la fin de la partie : ses PV comptent à la fin et ses icônes de réduction travaillent pour toi.</li><li><b>Bannir :</b> gagne <b>2 Héros</b>. La carte quitte le jeu (certaines cartes et certains dieux utilisent les cartes bannies).</li></ul>
<p><b>C. Combat</b>, dans l’ordre de priorité. Chaque joueur dispose d’<b>1 attaque</b>, plus les attaques supplémentaires données par ses cartes.</p><ul>
<li>Tu ne peux attaquer qu’une Créature <b>accessible</b> : la Créature la plus à l’extérieur de chaque côté de chaque Monde (sauf si un effet de déverrouillage te permet d’attaquer n’importe quelle Créature).</li>
<li>Paie sa <b>Force</b> en Héros, moins tes réductions. La Créature rejoint ta pile de score (ses PV comptent à la fin).</li>
<li>Les Créatures <b>Élites</b> (étoile violette) sont plus fortes et rapportent souvent plus.</li>
<li>Quand un côté d’un Monde n’a <b>plus de Créature</b>, le Monde est <b>libéré</b> : il rejoint la zone des Mondes libérés, et un nouveau Monde avec de nouvelles Créatures le remplace.</li>
<li><b>Protéger un Monde :</b> une fois par manche, tu peux prendre un Monde libéré. Son coût = son seuil − le nombre de symboles correspondants que tu possèdes (indiqués sur le Monde) − tes réductions de Monde. Un Monde protégé rapporte ses PV.</li></ul>
<p><b>D. Fin de manche.</b> Chaque joueur complète sa main à 4 cartes (remélange la défausse quand le deck est vide). La priorité passe au joueur suivant.</p>
<p><b>Mulligan :</b> une fois par partie, avant de choisir ta carte, tu peux défausser tes 4 cartes et en piocher 4 nouvelles.</p>
<h3>4. Les dieux</h3><table><tr><th>Dieu</th><th>Pouvoir quand il est joué</th><th>Carte de score</th></tr>
<tr><td><b>Baldr</b>, Dieu de la Lumière</td><td>+2 Héros. <b>Lumineux</b> : une fois Baldr dans ton Valhalla, une fois par tour, avant de combattre ou de protéger : avec 1+ Gloire, gagne 2 Héros ; avec 3+ Gloire, bats gratuitement une Créature accessible non Élite ; avec 5+ Gloire, une Élite aussi.</td><td>5 × série complète Personnage + Objet + Événement</td></tr>
<tr><td><b>Freyja</b>, Déesse de l’Amour</td><td>+1 Héros, et selon tes Personnages au Valhalla : 1+ → +1 Héros, 2+ → +1 Attaque, 3+ → déverrouillage (attaquer n’importe quelle Créature).</td><td>5 × série complète Géant + Bête + Mort-vivant</td></tr>
<tr><td><b>Freyr</b>, Dieu de la Prospérité</td><td>+1 Héros et <b>Prospérité</b> : place jusqu’à 5 Héros sur ta carte de score ; à la fin de ton tour, reprends-les et gagnes-en autant.</td><td>2 × Héros restants (max 6)</td></tr>
<tr><td><b>Frigg</b>, Reine des Ases</td><td><b>Métier à tisser</b> : gagne 2 Héros, ou remets gratuitement une de tes cartes bannies dans ton Valhalla.</td><td>4 × ton type de carte le plus nombreux</td></tr>
<tr><td><b>Heimdall</b>, Gardien des Mondes</td><td>+1 Héros, et cette manche tout coût lié à un tag ${tagsIcons()} est réduit de 1.</td><td>2 × tags différents</td></tr>
<tr><td><b>Odin</b>, Père de tous</td><td><b>L’œil d’Odin</b> (avant de mettre une carte de côté) : défausse 1 carte, puis pioches-en 2.</td><td>4 × Monde protégé</td></tr>
<tr><td><b>Thor</b>, Dieu du Tonnerre</td><td>+2 Héros, et cette manche la Force des Créatures Élites est réduite de 1 par Équipement que tu possèdes.</td><td>3 × Créature Élite</td></tr>
<tr><td><b>Tyr</b>, Dieu de la Guerre</td><td>+2 Héros, et cette manche la Force de chaque Créature est réduite de 1 par Créature du même type que tu as vaincue.</td><td>2 × ton type de Créature le plus nombreux</td></tr></table>
<h3>5. Fin de partie et décompte</h3><p>Après la manche 7, additionne : les PV de tes cartes au Valhalla + les PV de tes Créatures vaincues + les PV de tes Mondes protégés + ta carte de score (+ tes Loki vaincus avec l’extension). Le plus gros total l’emporte ; en cas d’égalité, le joueur qui a le plus de Héros restants gagne.</p>
<h3>6. 🐍 Extension Loki (optionnelle)</h3><ul>
<li>Mélange les 15 cartes Loki. Révèles-en une au début de la partie, puis <b>une de plus à chaque Monde libéré</b>.</li>
<li>Si <b>4 Loki</b> sont en jeu en même temps, <b>Loki gagne et tous les joueurs perdent</b>.</li>
<li>Un Loki se combat comme une Créature (1 attaque, Force en Héros, réductions Élite et de tag appliquées). Une fois vaincu, son effet s’arrête et il te rapporte ses PV.</li>
<li>Trois sortes d’effets : <b>Instantané</b> (quand il apparaît), <b>Permanent</b> (tant qu’il est en jeu), <b>Quand il est vaincu</b> (pour le joueur qui le bat).</li>
<li><b>The Bound God</b> ne peut être vaincu que s’il est le dernier Loki en jeu.</li></ul></div>`}
function turnHTML_fr(){const st=(n,t,b)=>`<div class=step><div class=n>${n}</div><div><b>${t}</b><br>${b}</div></div>`;
 return`<div class="rl notr"><h2>🧭 Résumé du tour</h2><div class=box>
 ${st(1,'Choisis une carte à mettre de côté','Parmi tes 4 cartes, mets-en 1 de côté (jamais ta carte dieu). <i>Mulligan une fois par partie : défausse tes 4 cartes et pioches-en 4.</i> <b>Odin :</b> utilise d’abord l’œil d’Odin.')}
 ${st(2,'Joue les 3 autres cartes','Applique leurs effets : Héros, +1 Attaque, déverrouillage… et le pouvoir de ton dieu s’il en fait partie.')}
 ${st(3,'Valhalla ou bannir','<b>Valhalla :</b> paie le coût (moins tes réductions) → PV à la fin + réductions permanentes. <b>Bannir :</b> +2 Héros.')}
 ${st(4,'Combat (dans l’ordre de priorité)','1 attaque + tes attaques supplémentaires. Paie la Force d’une Créature accessible (la plus à l’extérieur de chaque côté). Puis tu peux protéger <b>1 Monde libéré</b>.')}
 ${st(5,'Fin de manche','Complète ta main à 4 cartes. La priorité passe au joueur suivant. Fin de partie après la manche 7.')}</div>
 <h3>Rappels</h3><table>
 <tr><th>Héros</th><td>Gagnés avec les cartes jouées, les dieux, le bannissement (+2). Dépensés pour le Valhalla, les Créatures et les Mondes.</td></tr>
 <tr><th>Réductions</th><td>Chaque icône d’une carte du Valhalla = −1 Héros sur les coûts correspondants (deux icônes identiques = −2).</td></tr>
 <tr><th>Monde libéré</th><td>Un côté sans Créature → le Monde est libéré et remplacé. Pour le protéger : seuil − tes symboles correspondants − réductions.</td></tr>
 <tr><th>Décompte</th><td>Valhalla + Créatures + Mondes + carte de score (+ Loki). Égalité : le plus de Héros restants.</td></tr>
 <tr><th>🐍 Loki</th><td>1 au début, +1 par Monde libéré. 4 en jeu = tout le monde perd. Instantané / Permanent / Quand il est vaincu.</td></tr></table></div>`}
</script>
