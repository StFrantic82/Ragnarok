<script>
// ===== Langue : anglais / français (traduction de l'interface à l'affichage) =====
var LANG='en';try{LANG=localStorage.getItem('rg_lang')||'en'}catch(e){}
function setLang(l){LANG=l;try{localStorage.setItem('rg_lang',l)}catch(e){}langCss();R()}
function langCss(){try{document.documentElement.style.setProperty('--seltxt',LANG=='fr'?"'✓ Choisi'":"'✓ Selected'");document.documentElement.lang=LANG}catch(e){}}langCss();
// Phrases complètes (texte exact, sans espaces autour)
const FR_EXACT={
'CHOOSE YOUR GOD':'CHOISIS TON DIEU','AI opponents':'Adversaires IA','Loki expansion':'Extension Loki','Your nickname (for stats)':'Ton pseudo (pour les stats)','Anonymous':'Anonyme','PLAY':'JOUER','Off':'Non','🐍 On':'🐍 Oui',
'👀 Watch AI vs AI':'👀 Regarder IA contre IA','📊 Game statistics':'📊 Statistiques','📜 Rules':'📜 Règles','🧭 Turn summary':'🧭 Résumé du tour','✓ Selected':'✓ Choisi','(prototype)':'(prototype)',
'Face the creatures · Save the Worlds · Earn your place in Valhalla':'Affronte les Créatures · Sauve les Mondes · Gagne ta place au Valhalla',
'A Loki card appears at the start and each time a World is freed. 4 Loki in play = everyone loses.':'Une carte Loki apparaît au début puis à chaque Monde libéré. 4 Loki en jeu = tout le monde perd.',
'Allfather':'Père de tous','Queen of the Ases':'Reine des Ases','Chief of the Valkyries':'Cheffe des Valkyries','God of Light':'Dieu de la Lumière','God of Thunder':'Dieu du Tonnerre','God of War':'Dieu de la Guerre','Guardian of the Worlds':'Gardien des Mondes','God of Prosperity':'Dieu de la Prospérité','God of Poetry':'Dieu de la Poésie',
'⌂ Home':'⌂ Accueil','🤖 AI simulations':'🤖 Simulations IA','🎓 Tutorial':'🎓 Tutoriel','↩ Undo':'↩ Annuler','Undo your last click':'Annuler ton dernier clic','← Home':'← Accueil','📜 Full rules':'📜 Règles complètes','Worlds deck:':'Pioche des Mondes :','Keep playing':'Continuer la partie','Yes, go home':'Oui, retour à l’accueil','Leave this game? It won’t be saved.':'Quitter la partie ? Elle ne sera pas enregistrée.',
'Choose the card to set aside':'Choisis la carte à mettre de côté','(Valhalla or banished); the other 3 will be played.':'(Valhalla ou bannie) ; les 3 autres seront jouées.','(Mulligan already used)':'(Mulligan déjà utilisé)','🔄 Mulligan (1× per game)':'🔄 Mulligan (1× par partie)',
'Discard your 4 cards and draw 4 new ones — once per game':'Défausse tes 4 cartes et pioches-en 4 nouvelles — une fois par partie',
"Your god card is always played: it can't be set aside":'Ta carte dieu est toujours jouée : elle ne peut pas être mise de côté','Always played':'Toujours jouée',
'Card set aside:':'Carte mise de côté :','(a god can never go to Valhalla)':'(un dieu ne va jamais au Valhalla)',
'Combat:':'Combat :','End my turn':'Finir mon tour','Dark creatures can’t be attacked.':'Les Créatures sombres ne peuvent pas être attaquées.',
'Not accessible':'Inaccessible','No attack left':'Plus d’attaque','You already protected a World this round':'Tu as déjà protégé un Monde cette manche','Requirement not met':'Condition non remplie',
'A World is freed when one of its sides has no creature left. It stays here until a player protects it.':'Un Monde est libéré quand l’un de ses côtés n’a plus de Créature. Il reste ici jusqu’à ce qu’un joueur le protège.',
'A World is freed when one of its sides has no creature left. It stays here until a player protects it — click one to protect it (1 per round).':'Un Monde est libéré quand l’un de ses côtés n’a plus de Créature. Il reste ici jusqu’à ce qu’un joueur le protège — clique sur un Monde pour le protéger (1 par manche).',
'Frigg is among your played cards.':'Frigg fait partie de tes cartes jouées.',
'In which order should they resolve? (The Loom changes your banished cards and your Valhalla, which affects “x Banished card”, “x Character” effects, etc.)':'Dans quel ordre les résoudre ? (Le Métier à tisser modifie tes cartes bannies et ton Valhalla, ce qui change les effets « × carte bannie », « × Personnage », etc.)',
'Frigg first':'Frigg d’abord','My other cards first':'Mes autres cartes d’abord','Loom:':'Métier à tisser :','take 2 Heroes, or return a banished card to your Valhalla for free.':'prends 2 Héros, ou remets gratuitement une carte bannie dans ton Valhalla.','+2 Heroes':'+2 Héros',
'👑 Frigg’s setup:':'👑 Mise en place de Frigg :','you drew these 2 cards. Choose the one to':'tu as pioché ces 2 cartes. Choisis celle à','banish':'bannir',
'(+2 Heroes) — the other is shuffled back into your deck. Then you draw your 4 cards for round 1.':'(+2 Héros) — l’autre est remélangée dans ton deck. Puis tu pioches tes 4 cartes pour la manche 1.',
'👁 Odin’s eye':'👁 L’œil d’Odin','(mandatory, before setting a card aside): choose one card to':'(obligatoire, avant de mettre une carte de côté) : choisis une carte à','discard':'défausser','— you then draw 2 cards.':'— puis tu pioches 2 cartes.',
'🌾 Freyr — Sow & harvest:':'🌾 Freyr — Semer et récolter :','end of your turn':'fin de ton tour','you take them back and gain':'tu les reprends et gagnes','as many':'autant','more.':'en plus.','Skip':'Passer','Heroes at the end of your turn':'Héros à la fin de ton tour',
'☀ Luminous':'☀ Lumineux','☀ Luminous already used this turn.':'☀ Lumineux déjà utilisé ce tour.','☀ Luminous is no longer available this turn (it must be used before fighting or protecting a World).':'☀ Lumineux n’est plus disponible ce tour (il s’utilise avant de combattre ou de protéger un Monde).',
'Cancel free defeat':'Annuler la victoire gratuite','Click a creature marked ☀.':'Clique sur une Créature marquée ☀.','☀ free':'☀ gratuit',
'YOU':'TOI','VALHALLA':'VALHALLA','MONSTERS':'CRÉATURES','CREATURES':'CRÉATURES','WORLDS':'MONDES','BANISHED':'BANNIES','🐍 LOKI':'🐍 LOKI',
'Heroes in stock':'Héros en réserve','Attacks available this round':'Attaques disponibles cette manche','Attacks left this turn':'Attaques restantes ce tour','Banished cards':'Cartes bannies','Beasts defeated':'Bêtes vaincues','Giants defeated':'Géants vaincus','Undead defeated':'Morts-vivants vaincus','Elite creatures defeated':'Créatures Élites vaincues','Worlds saved':'Mondes sauvés','Characters in Valhalla':'Personnages au Valhalla','Items in Valhalla':'Objets au Valhalla','Events in Valhalla':'Événements au Valhalla',
'Animal':'Animal','Artefact':'Artefact','Destiny':'Destin','Equipment':'Équipement','Glory':'Gloire','Warrior':'Guerrier',
'📋 Copy game summary':'📋 Copier le résumé de la partie',"— send it to the game's author so your game counts in the statistics.":'— envoie-le à l’auteur du jeu pour que ta partie compte dans les statistiques.',
'Copy this text and send it to the author:':'Copie ce texte et envoie-le à l’auteur :','✅ Summary copied — paste it in a message to the author.':'✅ Résumé copié — colle-le dans un message à l’auteur.',
'Saving the game…':'Enregistrement de la partie…','✅ Game saved for the statistics.':'✅ Partie enregistrée pour les statistiques.','Game not saved: your access to this page is read-only.':'Partie non enregistrée : ton accès à cette page est en lecture seule.','Game not saved: the database is full.':'Partie non enregistrée : la base de données est pleine.','Game not saved (network error).':'Partie non enregistrée (erreur réseau).',
'Game not recorded on this site: use “Copy game summary” to send it to the author.':'Partie non enregistrée sur ce site : utilise « Copier le résumé de la partie » pour l’envoyer à l’auteur.',
'Statistics are only available in the Claude version of the app.':'Les statistiques ne sont disponibles que dans la version Claude de l’app.',
'👀 AI vs AI':'👀 IA contre IA','▶ Next round':'▶ Manche suivante','⏩ Auto-play':'⏩ Lecture auto','⏸ Pause':'⏸ Pause','⏭ Skip to end':'⏭ Aller à la fin','AI vs AI game started.':'Partie IA contre IA lancée.',
'Cards played, effects resolved.':'Cartes jouées, effets résolus.','Loki deck is empty: no new Loki appears.':'La pioche Loki est vide : aucun nouveau Loki n’apparaît.',
'📊 Statistics':'📊 Statistiques','← Back to the game':'← Retour au jeu','Refresh':'Actualiser','🗑 Reset statistics':'🗑 Réinitialiser les statistiques','Yes, reset':'Oui, réinitialiser','Cancel':'Annuler','✕ Close':'✕ Fermer','Loading…':'Chargement…',
'📥 Import games from testers':'📥 Importer des parties de testeurs','Paste one or more game summaries (text starting with RAGNAROK-GAME:) sent by your testers.':'Colle un ou plusieurs résumés de partie (texte commençant par RAGNAROK-GAME:) envoyés par tes testeurs.','Import':'Importer',
'No game summary found in the text.':'Aucun résumé de partie trouvé dans le texte.','Import unavailable here.':'Import impossible ici.','Could not read the statistics.':'Impossible de lire les statistiques.','The data isn’t responding right now. Try again in a moment.':'Les données ne répondent pas pour le moment. Réessaie dans un instant.',
'No games recorded yet. Finish a game (7 rounds) for it to show up here.':'Aucune partie enregistrée. Termine une partie (7 manches) pour qu’elle apparaisse ici.',
'Show:':'Afficher :','All players (AI included)':'Tous les joueurs (IA comprises)','Humans only':'Humains uniquement','Mode:':'Mode :','General statistics by god':'Statistiques générales par dieu','Click a god to see how often each card of its deck went to Valhalla.':'Clique sur un dieu pour voir à quelle fréquence chaque carte de son deck est allée au Valhalla.',
'Player':'Joueur','Games':'Parties','Win %':'% victoires','Avg VP':'PV moyens','Avg Heroes gained':'Héros gagnés (moy.)','Highest score':'Meilleur score','Lowest score':'Pire score','Creatures defeated':'Créatures vaincues','Times defeated':'Fois vaincue','Win % of the player who defeated it':'% victoires de celui qui l’a vaincue','Worlds protected':'Mondes protégés','Times protected':'Fois protégé','Latest games':'Dernières parties','Date':'Date','Winner':'Vainqueur','Rank':'Rang','Opp.':'Adv.','In Valhalla':'Au Valhalla','Win % when in Valhalla':'% victoires quand au Valhalla',
'🐍 With Loki':'🐍 Avec Loki','Base game':'Jeu de base','All':'Tout','No Loki in play.':'Aucun Loki en jeu.','⚠ One more freed World and Loki wins!':'⚠ Encore un Monde libéré et Loki gagne !',
'Instant: each player discards 1 card from their hand for each Loki in play.':'Instantané : chaque joueur défausse 1 carte de sa main par Loki en jeu.',
'Instant: each player loses 1 Hero for each Loki in play.':'Instantané : chaque joueur perd 1 Héros par Loki en jeu.',
'Instant: discard 1 random freed World from play for each Loki in play.':'Instantané : défausse au hasard 1 Monde libéré par Loki en jeu.',
'Instant: place 1 Hero on this card for each Loki in play. This Loki has +1 Strength for each Hero on it.':'Instantané : place 1 Héros sur cette carte par Loki en jeu. Ce Loki a +1 de Force par Héros sur lui.',
'Counts as a Giant.':'Compte comme un Géant.','Counts as a Beast.':'Compte comme une Bête.','Counts as an Undead.':'Compte comme un Mort-vivant.','Counts as a World.':'Compte comme un Monde.','Counts as a Giant':'Compte comme un Géant','Counts as a Beast':'Compte comme une Bête','Counts as a Undead':'Compte comme un Mort-vivant','Counts as a World':'Compte comme un Monde','Instant: reveal the next Loki card.':'Instantané : révèle la carte Loki suivante.',
'Instant: each player moves 1 card from their Valhalla to their banish area and gains 1 Hero for each Loki in play.':'Instantané : chaque joueur déplace 1 carte de son Valhalla vers ses cartes bannies et gagne 1 Héros par Loki en jeu.',
'Ongoing: Giants have +1 Strength.':'Permanent : les Géants ont +1 de Force.','Ongoing: Beasts have +1 Strength.':'Permanent : les Bêtes ont +1 de Force.','Ongoing: Undeads have +1 Strength.':'Permanent : les Morts-vivants ont +1 de Force.',
'Ongoing: protecting a World costs +2 Heroes.':'Permanent : protéger un Monde coûte +2 Héros.','Ongoing: cannot be defeated unless this is the last Loki in play.':'Permanent : ne peut être vaincu que s’il est le dernier Loki en jeu.',
'When defeated: opponents lose 1 Hero for each Loki in play.':'Quand il est vaincu : les adversaires perdent 1 Héros par Loki en jeu.','When defeated: opponents discard 1 card from their hand for each Loki in play.':'Quand il est vaincu : les adversaires défaussent 1 carte de leur main par Loki en jeu.',
'When defeated: draw 1 card less at the end of your turn.':'Quand il est vaincu : pioche 1 carte de moins à la fin de ton tour.','When defeated: +1 Attack.':'Quand il est vaincu : +1 Attaque.'
};
// Motifs (appliqués dans l'ordre ; les noms propres sont protégés)
const FR_RX=[
[/^Round (\d+)\/(\d+)$/,'Manche $1/$2'],[/^Priority: (.+)$/,'Priorité : $1'],
[/^(\d+) attack\(s\) left\. Click a highlighted creature on the board to fight it \(cost in Heroes shown on it\)\. Dark creatures can’t be attacked\. You can also protect one freed World \(green panel\)\.$/,'$1 attaque(s) restante(s). Clique sur une Créature en surbrillance pour la combattre (coût en Héros indiqué dessus). Les Créatures sombres ne peuvent pas être attaquées. Tu peux aussi protéger un Monde libéré (panneau vert).'],
[/^Valhalla \((\d+) Heroes\)$/,'Valhalla ($1 Héros)'],[/^Banish \(\+(\d+) Heroes\)$/,'Bannir (+$1 Héros)'],
[/^Fight (.+) for (\d+) Heroes$/,'Combattre $1 pour $2 Héros'],[/^Protect (.+) for (\d+) Heroes$/,'Protéger $1 pour $2 Héros'],[/^Defeat (.+) for free \(Luminous\)$/,'Vaincre $1 gratuitement (Lumineux)'],
[/^Not enough Heroes \((\d+) needed\)$/,'Pas assez de Héros ($1 nécessaires)'],[/^Cost to protect once freed: (\d+) Heroes$/,'Coût pour le protéger une fois libéré : $1 Héros'],
[/^Set aside — Valhalla cost: (\d+) Heroes$/,'Mise de côté — coût Valhalla : $1 Héros'],
[/^🌍 Freed Worlds \((\d+)\)$/,'🌍 Mondes libérés ($1)'],[/^(\d+) defeated · (\d+) VP$/,'$1 vaincu(s) · $2 PV'],[/^(\d+) saved · (\d+) VP$/,'$1 sauvé(s) · $2 PV'],[/^(\d+) cards?$/,'$1 carte(s)'],
[/^cards (\d+) · creatures (\d+) · worlds (\d+) · scoring (\d+)( · Loki (\d+))?$/,(m,a,b,c,d,e,f)=>`cartes ${a} · Créatures ${b} · mondes ${c} · score ${d}${e?' · Loki '+f:''}`],
[/^\(cards (\d+), creatures (\d+), worlds (\d+), scoring (\d+)\)$/,'(cartes $1, Créatures $2, mondes $3, score $4)'],
[/^· Heroes (\d+) · VP (\d+)$/,'· Héros $1 · PV $2'],[/^(.+) · (\d+) VP$/,'$1 · $2 PV'],[/^(.+) : (\d+) VP \((\d+) Heroes\)$/,'$1 : $2 PV ($3 Héros)'],
[/^Valhalla: /,'Valhalla : '],[/^, (.+)$/,(m,a)=>', '+(FR_EXACT[a]||a)],[/Creatures: /g,'Créatures : '],[/ · Worlds: /g,' · Mondes : '],[/ · Banished: /g,' · Bannies : '],[/ · Loki defeated: /g,' · Loki vaincus : '],
[/^Game over – winner: (.+)$/,'Partie terminée – vainqueur : $1'],[/^🔁 Play again with (.+)$/,'🔁 Rejouer avec $1'],
[/^🐍 Loki triumphs! (\d+) Loki cards are in play: everyone loses\.$/,'🐍 Loki triomphe ! $1 cartes Loki sont en jeu : tout le monde perd.'],
[/^(.+) is among your played cards\.$/,'$1 fait partie de tes cartes jouées.'],[/^(.+) first$/,'$1 d’abord'],
[/^place up to (\d+) of your Heroes on (.+) — they are not available this turn, and at the$/,'place jusqu’à $1 de tes Héros sur $2 — ils ne sont pas disponibles ce tour, et à la'],
[/^Invest (\d+) → (\d+)$/,'Investir $1 → $2'],[/^(\d+)×as many$/,'$1× autant'],[/^🌾 Invested on (.+):$/,'🌾 Investi sur $1 :'],
[/^\(Baldr, 1× per turn, before any fight or World protection — you have (\d+) Glory\):$/,'(Baldr, 1× par tour, avant tout combat ou protection de Monde — tu as $1 Gloire) :'],
[/^Free defeat: any accessible creature$/,'Victoire gratuite : toute Créature accessible'],[/^Free defeat: non-Elite accessible creature$/,'Victoire gratuite : Créature accessible non Élite'],
[/^🐍 Loki: (\d+) \/ (\d+)$/,'🐍 Loki : $1 / $2'],[/^Deck: (\d+)$/,'Pioche : $1'],
[/^🐍 Loki: discard (\d+) cards? from your hand$/,'🐍 Loki : défausse $1 carte(s) de ta main'],
[/^\(before setting a card aside; you always keep at least 1 card to set aside\)\. Click the card to discard\.$/,'(avant de mettre une carte de côté ; tu gardes toujours au moins 1 carte à mettre de côté). Clique sur la carte à défausser.'],
[/^🐍 Loki: move (\d+) cards? from your Valhalla to your banish area$/,'🐍 Loki : déplace $1 carte(s) de ton Valhalla vers tes cartes bannies'],
[/^\(you gain (\d+) Heroes\)\. Click the card\.$/,'(tu gagnes $1 Héros). Clique sur la carte.'],[/^\(no Hero gained\)\. Click the card\.$/,'(aucun Héros gagné). Clique sur la carte.'],
[/^Strength (\d+)$/,'Force $1'],[/^Loki — (.+?): (.+)$/,(m,a,b)=>'Loki — '+a+' : '+(FR_EXACT[b]||b)],
[/^(\d+) games · $/,'$1 parties · '],[/^ player\(s\) · human wins: $/,' joueur(s) · victoires humaines : '],[/ · average length: ([\d.]+) min$/,' · durée moyenne : $1 min'],[/^🐍 Loki games: $/,'🐍 Parties avec Loki : '],[/^ · Loki won $/,' · Loki a gagné '],
[/^(Base game|🐍 With Loki|All) \((\d+)\)$/,(m,a,b)=>FR_EXACT[a]+' ('+b+')'],
[/^You \((.+)\)$/,'Toi ($1)'],[/^Cost (\d+) · VP (.+)$/,'Coût $1 · PV $2'],[/^(.+) — deck cards \((\d+) games?\)$/,'$1 — cartes du deck ($2 parties)'],
[/^% of games where the card ended in Valhalla\. (.+) itself can never be placed in Valhalla\.$/,'% des parties où la carte a fini au Valhalla. $1 ne peut jamais aller au Valhalla.'],
[/^Delete all (\d+) recorded games\? This can’t be undone\.$/,'Supprimer les $1 parties enregistrées ? C’est irréversible.'],[/^Deleting… (\d+)\/(\d+)$/,'Suppression… $1/$2'],
[/^Statistics reset: (\d+) games deleted\.$/,'Statistiques réinitialisées : $1 parties supprimées.'],[/^Some games could not be deleted \(your access may be read-only\)\.$/,'Certaines parties n’ont pas pu être supprimées (accès peut-être en lecture seule).'],
[/^(\d+) game\(s\) imported(.*)$/,'$1 partie(s) importée(s)$2'],[/could not be imported \(invalid text, or your access is read-only\)/,'n’ont pas pu être importées (texte invalide ou accès en lecture seule)'],
// journal de partie
[/^(.+) \(Frigg setup\) banishes (.+) \(\+(\d+) Heroes\) and shuffles (.+) back$/,'$1 (mise en place de Frigg) bannit $2 (+$3 Héros) et remélange $4'],[/^(.+) defeats Loki: (.+) \((\d+)\)$/,'$1 bat Loki : $2 ($3)'],[/^(.+) defeats (.+) \((\d+)\)$/,'$1 bat $2 ($3)'],[/^(.+) sends (.+) to Valhalla$/,'$1 envoie $2 au Valhalla'],[/^(.+) banishes (.+)$/,'$1 bannit $2'],
[/^(.+) protects (.+)$/,'$1 protège $2'],[/^(.+) returns (.+) to Valhalla \(Loom\)$/,'$1 remet $2 au Valhalla (Métier à tisser)'],
[/^(.+) \(Odin’s eye\) discards (.+) and draws (.+)$/,(m,a,b,c)=>a+' (œil d’Odin) défausse '+b+' et pioche '+(c=='nothing'?'rien':c)],
[/^(.+) takes a Mulligan \(discards (.+)\)$/,'$1 fait un Mulligan (défausse $2)'],[/^(.+) uses Luminous: \+(\d+) Heroes$/,'$1 utilise Lumineux : +$2 Héros'],[/^(.+) uses Luminous: defeats (.+) for free$/,'$1 utilise Lumineux : bat $2 gratuitement'],
[/^(.+) invests (\d+) Heroes on (.+)$/,'$1 investit $2 Héros sur $3'],[/^(.+) invests (\d+) Heroes$/,'$1 investit $2 Héros'],[/^(.+) harvests (\d+) Heroes from (\d+) invested$/,'$1 récolte $2 Héros grâce à $3 investis'],
[/^🐍 Loki appears: Loki, (.+) — (.+)$/,(m,a,b)=>'🐍 Loki apparaît : Loki, '+a+' — '+(FR_EXACT[b]||b)],[/^🐍 (\d+) Loki cards are in play: Loki triumphs, everyone loses!$/,'🐍 $1 cartes Loki sont en jeu : Loki triomphe, tout le monde perd !'],
[/^(.+) discards (.+) \(Loki\)$/,'$1 défausse $2 (Loki)'],[/^(.+) draws 1 card less \(Loki\)$/,'$1 pioche 1 carte de moins (Loki)'],[/^(.+) gets (\d+) Hero(es)? \(\+(\d+) Strength\)$/,'$1 reçoit $2 Héros (+$4 de Force)'],
[/^(.+) is lost to Loki$/,'$1 est perdu au profit de Loki'],[/^(.+) discarded by Loki$/,'$1 défaussé(s) par Loki'],[/^(.+) moves (.+) from Valhalla to banished \(Loki\)( \+(\d+) Heroes)?$/,(m,a,b,c,d)=>a+' déplace '+b+' du Valhalla vers ses cartes bannies (Loki)'+(d?' +'+d+' Héros':'')],
[/^(.+) discards their hand and draws a new one \(Loki\)$/,'$1 défausse sa main et en pioche une nouvelle (Loki)'],
[/^(.+) sings the Song of Heroes$/,'$1 entonne le Chant des Héros'],[/^(.+) uses (.+)$/,'$1 utilise $2'],
// fragments de mots (en dernier)
[/\bHeroes\b/g,'Héros'],[/\bHero\b/g,'Héros'],[/\bVP\b/g,'PV']
];FR_RX.slice(-3).forEach(x=>x[0].post=true);
let FR_NAMES=null;
function frNames(){if(FR_NAMES)return FR_NAMES;const s=new Set(Object.keys(DK));
 try{Object.values(DK).forEach(d=>d.c.split('\n').forEach(l=>s.add(l.split('|')[0])))}catch(e){}
 try{CR.split('\n').forEach(l=>s.add(l.split('|')[0]))}catch(e){}try{WD.split('\n').forEach(l=>s.add(l.split('|')[0]))}catch(e){}
 try{LOKI_DATA.split('\n').forEach(l=>s.add(l.split('|')[0]))}catch(e){}
 ['Valhalla','Loki','RAGNARÖK','RAGNAROK-GAME:'].forEach(x=>s.add(x));
 FR_NAMES=[...s].filter(x=>x&&x.length>2).sort((a,b)=>b.length-a.length);return FR_NAMES}
const frEsc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');let FR_NRX=null;
function trFR(t){const m=t.match(/^(\s*)([\s\S]*?)(\s*)$/),pre=m[1],core=m[2],post=m[3];if(!core)return t;
 if(FR_EXACT[core]!=null)return pre+FR_EXACT[core]+post;
 const N=frNames();if(N.includes(core))return t;
 let s=core;for(const [r,f] of FR_RX){if(!r.global&&r.test(s)){s=s.replace(r,f);break}}
 for(const [r,f] of FR_RX){if(r.global&&!r.post)s=s.replace(r,f)}
 if(!FR_NRX)FR_NRX=new RegExp(N.map(frEsc).join('|'),'g');
 const keep=[];s=s.replace(FR_NRX,x=>{keep.push(x);return'\u0001'+(keep.length-1)+'\u0002'});
 for(const [r,f] of FR_RX){if(r.global&&r.post)s=s.replace(r,f)}
 s=s.replace(/\u0001(\d+)\u0002/g,(_,i)=>keep[+i]);return pre+s+post}
const FR_DONE=new WeakMap();
function translateNode(root){if(LANG!='fr'||!root)return;
 const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=tw.nextNode())L.push(n);
 L.forEach(n=>{const p=n.parentElement;if(!p||p.closest('script,style,textarea,.notr'))return;const v=n.nodeValue;if(!/[A-Za-z]/.test(v)||FR_DONE.get(n)===v)return;const t=trFR(v);if(t!==v)n.nodeValue=t;FR_DONE.set(n,n.nodeValue)});
 (root.querySelectorAll?root.querySelectorAll('[title],[placeholder]'):[]).forEach(e=>['title','placeholder'].forEach(a=>{const v=e.getAttribute(a);if(v&&/[A-Za-z]/.test(v)&&!e.dataset['fr'+a]){const t=trFR(v);e.setAttribute(a,t);e.dataset['fr'+a]='1'}}))}
(()=>{const RR=R;R=function(){const r=RR.apply(this,arguments);try{translateNode(document.getElementById('app'))}catch(e){}return r};
 try{const mo=new MutationObserver(ms=>{if(LANG!='fr')return;ms.forEach(m=>{m.addedNodes.forEach(x=>{if(x.nodeType==3){const p=x.parentElement;if(p)translateNode(p)}else if(x.nodeType==1)translateNode(x)})})});
  const go=()=>{const a=document.getElementById('app');if(a)mo.observe(a,{childList:true,subtree:true})};if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',go);else go()}catch(e){}})();
function langSwitch(){return`<div class=notr style="position:absolute;top:10px;right:12px;z-index:5;display:flex;gap:4px;background:rgba(255,255,255,.75);border-radius:999px;padding:3px">${[['en','🇬🇧 EN'],['fr','🇫🇷 FR']].map(([k,l])=>`<button onclick="setLang('${k}')" style="border-radius:999px;padding:4px 10px;font-size:13px;${LANG==k?'background:var(--ac);color:#fff':'background:transparent;color:#333'}">${l}</button>`).join('')}</div>`}
try{if(!S)R()}catch(e){}
</script>
