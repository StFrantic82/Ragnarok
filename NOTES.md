# Ragnarök — notes de passation

Document de reprise du projet pour une nouvelle discussion avec Claude. Il résume l'état de l'app, les règles telles qu'elles sont codées, les décisions de design, les derniers résultats d'équilibrage et la marche à suivre pour mettre à jour l'app.

État au 21 novembre 2026.

---

## 1. Où se trouve l'app

| Version | Adresse | Particularités |
|---|---|---|
| App Claude (artefact) | https://claude.ai/artifact/ENnb98gSjoj2he3TfHigRE (slug `6c518448-eec1-489f-89ca-e54996d87da1`, titre « Ragnarok ») | Enregistre les parties dans une base de données (collection `games`), affiche les statistiques et fait apprendre l'IA (document `ai/model`). |
| GitHub Pages | https://stfrantic82.github.io/Ragnarok/ (dépôt `StFrantic82/Ragnarok`, branche `main`, fichier `index.html`) | Lien à partager aux testeurs. Pas de base de données : pas de stats ni d'apprentissage. Les testeurs envoient leurs parties avec « Copier le résumé de la partie ». |

**Publier une mise à jour, à chaque modification :**
1. Cloner le dépôt, modifier les fichiers de `src/`, puis construire `index.html` avec `python3 src/build.py` (voir section 3).
2. Publier sur l'artefact Claude (`publish_files` avec le slug et la dernière version).
   - Si l'artefact est partagé en public (« Anyone with the link »), Claude ne peut pas le modifier : il faut d'abord repasser le partage sur « Only you », publier, puis remettre le partage.
   - Si quelqu'un a publié entre-temps (par exemple en renommant l'app), relire la version en ligne avant de republier.
3. Copier `index.html` dans le dépôt GitHub, commit, push. La page se met à jour en environ une minute.
   - Pour pousser, l'application GitHub « Claude » doit être installée sur le compte StFrantic82, avec accès au dépôt.

---

## 2. Préférences de l'auteur (à respecter)

- **Langue :** l'auteur écrit en français. L'app existe en **anglais, français et italien** (sélecteur EN/FR/IT en haut de l'accueil, italien ajouté le 21 novembre) : toute nouvelle interface doit être traduite dans les trois langues. Italien : `i18n_it.js` (dictionnaire `IT_EXACT`, motifs `IT_RX`, textes `IT_UI` pour le multijoueur et le simulateur, règles `rulesHTML_it`/`turnHTML_it`), plus les entrées `it` des fiches des dieux (`godinfo.js`) et du tutoriel (`tutorial.js`). Vocabulaire italien : Eroi, Creature (Giganti, Bestie, Non morti), Mondi, Attacchi, Élite, round (manche) / turno (tour), bandire, carta punteggio.
- **Vocabulaire du jeu :** Héros, Créatures, Mondes, Attaques, Élites avec une majuscule. On dit **« tags »** (et non sous-types) pour Animal, Artefact, Destin (Destiny), Équipement (Equipment), Gloire (Glory), Guerrier (Warrior).
- **Icônes :** dans les textes d'aide (tutoriel, fiches des dieux, règles), mettre l'icône du jeu juste après le mot clé : Héros, Créatures (Géant, Bête, Mort-vivant), Mondes, Élite, tags, types de carte, Attaque. Les icônes restent carrées (18 × 18 px).
- **Tags par ordre alphabétique** dans les compteurs : Animal, Artefact, Destiny, Equipment, Glory, Warrior.
- **Les noms de cartes restent en anglais**, comme sur les illustrations.
- **Équilibrage :** cible d'environ 88 à 92 PV de moyenne par dieu. L'IA marque en général 2 à 4 PV de moins qu'un bon joueur humain : comparer surtout les écarts entre dieux.
- **Méthode de travail :** tester (simulation et navigateur) avant de publier, ne rien changer sans validation sur les règles, et proposer plusieurs options chiffrées quand c'est un choix de design.

---

## 3. Architecture du code

L'app est un seul fichier HTML (`index.html`, à la racine du dépôt) assemblé par `src/build.py` à partir des fichiers sources du dossier `src/`. Commande : `python3 src/build.py`, qui réécrit `index.html`. Ordre d'assemblage :

1. `base.html` : moteur du jeu (decks `DK`, créatures `CR`, Mondes `WD`, plateau, coûts `cc/crCost/cardCost/wCost`, `cnt`, `score`, `R()` rendu).
2. Images : CIMG (51 créatures), `baldr_img.js` (Baldr, cartes de score Frigg/Freyr/Odin, Freyr), `loki_img.js` (15 Loki). `bragi_img.js` n'est pas inclus pour le moment.
3. `ai.js` : IA par simulation (valeur `V`, poids `AIW_DEFAULT`, `GPW`, `FPW`), pouvoirs des dieux (`resolveHand`), Odin, Frigg, Lumineux, Prospérité, Mulligan.
4. `loki.js` : extension Loki.
5. `track.js` : enregistrement des parties, apprentissage, statistiques, zone de droite, mode IA contre IA, résumé à copier et import.
6. `home.js` : page d'accueil.
7. `rules.js` : règles complètes et résumé du tour (EN et FR).
8. `godinfo.js` : fiches des dieux au survol (EN/FR) et helpers d'icônes de tags.
9. `undo.js` : bouton Annuler le dernier clic.
10. `tutorial.js` : tutoriel guidé avec Thor.
11. `sim.js` : simulateur IA contre IA (statistiques par dieu et matchups).
12. `mp.js` : multijoueur en ligne (voir section 5).
13. `i18n.js` : traduction FR de l'interface à l'affichage (dictionnaire exact et motifs), choix de langue mémorisé.

**IA (refonte du 26 novembre, `ai.js`) :**
- Copie d'état rapide (`fclone` : les cartes sont partagées, le journal n'est pas copié) et évaluation des combats sans copie (`tryHit`, `bestProtect`) : parties IA environ 4 fois plus rapides à IA égale.
- Choix de la carte mise de côté : les 2 meilleures options sont rejouées en simulation sur **2 manches d'avance** (2 tirages de main chacune) avant de décider (`refine`, options `XDEF` : `la`, `D`, `top`, `lak`).
- L'IA ne connaît plus l'ordre des pioches cachées quand elle anticipe (`fog`) ; avec 2 Loki en jeu elle compte le risque « The Shapeshifter » (`_lkRisk`).
- Elle ne protège plus un Monde quand son évaluation dit que ça ne vaut pas le coût (`nopf`).
- Mesures (parties appariées à 3, nouvelle IA contre ancienne) : +4 à +5 PV par partie, 39-40 % de victoires contre 27 % ; à 4 joueurs +5 PV, à 2 joueurs +3 PV. Avec Loki : niveau égal à l'ancienne, qui trichait en voyant le prochain Loki (la même IA « tricheuse » gagnerait +3,5 PV). Les poids `AIW_DEFAULT` ont été testés un par un : aucun changement net, ils restent identiques.
- Banc d'essai : `src/aitest/ab.js` (`node ab.js N graine '{"x":{...}}' '{"x":{...}}' [joueurs] [loki]`) compare deux variantes sur des parties appariées.

**Pour les simulations hors navigateur :** `python3 src/mkengine.py`, puis par exemple `node src/sim2.js 300 3`. `mkengine.py` crée `engine.js` (base, puis ai, loki et bragi) pour Node. `bench.js` expose `play()`, et `sim2.js`, `simL.js`, `simB.js`, `simv.js` servent aux statistiques.

**Format d'une carte** (dans `DK[dieu].c`, une ligne par carte) : `nom|type|tag|coût|bonus Valhalla|PV|effet`
- type : `G` (dieu), `C` (Personnage), `I` (Objet), `E` (Événement) ;
- tag : un tag, ou `Warrior+Warrior` pour un tag double ;
- bonus : réductions séparées par `&`, une icône en double vaut −2. Valeurs spéciales : `Atk` (+1 Attaque), `Unl` (Déverrouillage), `Lum`, `Inv2`, `Dbl`, `Rb`, `Ban`.
- PV et effet : `n`, `m/clé` (m × clé) ou `base/m/clé`.
- clés utiles : tags, types, `Banished`, `World`, `Elite`, `GBU`, `CIE`, `diffsub`, `majsub`, `majcr`, `majtype`, `diffcr`, `Hero3`, `HeroCap6`, `Loki`, `pairs`.

---

## 4. Règles telles qu'elles sont codées

- **Partie :** 7 manches, de 1 à 3 IA.
- **Plateau :** 3 rangées, chacune avec un Monde au centre et 2 Créatures de chaque côté.
- **Départ :** chaque joueur a 13 cartes (le dieu et 12 cartes) et pioche 4 cartes. Héros de départ : voir le tableau des dieux.
- **Une manche :**
  1. Chaque joueur met **1 carte de côté** (jamais son dieu) et joue les 3 autres. Il applique leurs effets et le pouvoir de son dieu.
  2. La carte de côté va au **Valhalla** (on paie son coût moins les réductions) ou est **bannie** (+2 Héros).
  3. **Combat, dans l'ordre de priorité :** 1 attaque, plus les attaques en bonus. On attaque la Créature la plus à l'extérieur de chaque côté (n'importe laquelle avec Déverrouillage), en payant sa Force moins les réductions. Un côté vide libère le Monde, qui est remplacé.
  4. **Protection :** 1 Monde libéré par manche. Coût = seuil − symboles correspondants − réductions Monde.
  5. En fin de manche, chaque joueur complète sa main à 4 cartes.
- **Mulligan :** une fois par partie.
- **Fin de partie :** score = PV du Valhalla + Créatures + Mondes + carte de score (+ Loki). En cas d'égalité, le plus de Héros restants l'emporte.
- **Bonus Valhalla :** ce sont des réductions de coût pour affronter, envoyer au Valhalla ou protéger ce qui porte l'icône. Attaque et Déverrouillage peuvent aussi être des bonus Valhalla, ou des effets joués.
- **Correctif de novembre :** les réductions sur la protection des Mondes ne fonctionnaient pas depuis la version d'origine. Elles fonctionnent maintenant.

### Les dieux

| Dieu | Héros de départ | Pouvoir | Carte de score | Deck (P/O/É) |
|---|---|---|---|---|
| Odin | **4** (relevé de 3 en novembre) | Œil d'Odin : défausser 1 carte, piocher 2 (obligatoire, avant de mettre une carte de côté). Aucun Héros. | 4 × Monde | 4/4/4 |
| Thor | 2 | +2 Héros. Les Élites coûtent −1 par Équipement possédé. | 3 × Élite | 5/4/3 |
| Frigg | 2 | Métier à tisser : +2 Héros, ou une carte bannie va gratuitement au Valhalla. Mise en place : pioche 2, en bannit une (+2), remélange l'autre. | 4 × type de carte majoritaire | 4/4/4 |
| Freyja | 4 | +1 Héros, puis selon ses Personnages au Valhalla : 1+ → +1 Héros, 2+ → +1 Attaque, 3+ → Déverrouillage | 5 × série Géant + Bête + Mort-vivant | 6/4/2 |
| Heimdall | 2 | +1 Héros. Cette manche, tout coût avec un tag −1. | 2 × tags différents | 3/4/5 |
| Tyr | 4 | +2 Héros. −1 de Force par Créature du même type déjà vaincue. | 2 × type de Créature majoritaire | 2/4/6 |
| Baldr | **4** (baissé de 5 le 21 novembre) | +2 Héros. Lumineux (Baldr au Valhalla, coût 6, 1 fois par tour, avant tout combat ou protection) : 1+ Gloire → +2 Héros, 3+ → Créature non Élite gratuite, 5+ → Élite aussi. | 5 × série Personnage + Objet + Événement | 2/5/5 |
| Freyr | **2** (baissé de 3 le 26 novembre) | +1 Héros et Prospérité : placer jusqu'à 5 Héros sur la carte de score, récupérés en double à la fin de son tour (plus avec Cult of Uppsala). | 2 × Héros restants (max 6) | 6/3/3 |

Le détail de toutes les cartes est en annexe A.

### Extension Loki (option sur l'accueil)

- Les 15 cartes Loki sont mélangées. Une est révélée au début de la partie, puis **une de plus à chaque Monde libéré**. Avec **4 Loki en jeu, tout le monde perd.**
- Un Loki se combat comme une Créature : 1 attaque, sa Force, les réductions Élite et tag s'appliquent, Lumineux aussi s'il n'est pas Élite. Vaincu, son effet s'arrête et il rapporte ses PV.
- Un Loki vaincu **compte pour ses tags et pour Élite**. Les Loki 7 à 10 comptent aussi comme **Géant, Bête, Mort-vivant ou Monde**.
- **Effets :** instantané (à l'arrivée), permanent (tant qu'il est en jeu), ou quand il est vaincu. « Pour chaque Loki en jeu » compte le Loki qui arrive pour un effet instantané, mais plus le Loki vaincu pour un effet « quand il est vaincu ».
- **Pertes de Héros :** elles se prennent dans la réserve, pas sur les Héros placés par la Prospérité de Freyr.
- **Défausse :** on garde toujours au moins 1 carte à mettre de côté. Si Loki arrive pendant les combats (main vide), la défausse ou la pioche s'applique à la main suivante.
- **Affichage :** zone Loki à droite du plateau (compteur et pioche restante), alerte à 3 Loki, rubrique LOKI dans la zone de droite du joueur.
- Les illustrations sont celles de l'auteur, avec la même image provisoire pour tous les Loki. Le surnom et l'effet s'affichent sous la carte.

Liste des 15 Loki en annexe B.

---

## 5. Fonctionnalités de l'app

- **Accueil :** choix du dieu (fiche au survol), 1 à 3 IA, Loki oui/non, pseudo, langue EN/FR, Jouer, Regarder IA contre IA, 🤖 Simulations IA, 🎓 Tutoriel, Statistiques, Règles, Résumé du tour.
- **En jeu :** Héros et Attaques au-dessus de la main, coûts au milieu des cartes, zone de droite (score, compteurs, Valhalla, Créatures, Mondes, bannies, Loki), récapitulatif des adversaires, bouton ↩ Annuler (dernier clic), bouton Accueil.
- **Fin de partie :** enregistrement (version Claude), « Copier le résumé de la partie », « Rejouer avec le même dieu ».
- **Statistiques (version Claude) :** tableau par dieu (cliquer pour voir le % de chaque carte au Valhalla), filtre humains/tous, modes Jeu de base / Avec Loki / Tout, import des résumés envoyés par les testeurs, réinitialisation.
- **Extension Loki :** quand on l'active (accueil ou salon en ligne), un encadré vert résume la règle (`lokiSummary()` dans `home.js`, EN/FR/IT).
- **Simulateur :** parties au hasard (50 à 1 000 parties, 2 à 4 joueurs, Loki oui/non) ou matchups 1 contre 1 (tableau croisé). Rien n'est enregistré.
- **Multijoueur en ligne (`mp.js`, 21 novembre) :** sur l’accueil, deux boutons identiques côte à côte : « Play solo » et « Play online ». Un joueur crée un salon (code de 4 lettres, lien `#join-CODE`), 2 à 4 humains sans IA, chacun un dieu différent, Loki au choix de l'hôte.
  - Réseau pair-à-pair avec PeerJS 1.5.4 (chargé depuis unpkg, sinon jsdelivr), identifiant `ragnarok-mp-CODE`. Fonctionne uniquement sur GitHub Pages (et localhost) : l'artefact Claude bloque WebRTC et affiche un lien vers GitHub Pages.
  - L'hôte fait tourner la seule vraie partie (`S`) ; les autres envoient leurs clics (`MP_FNS`, arguments encodés par chemin dans `S`) et reçoivent une vue (`mpView`) où ils sont `ps[0]` (rotation de `S.ps`), avec les mains et pioches adverses masquées. `mpGuard` refuse toute action hors de son tour.
  - Choix simultanés : chacun met sa carte de côté (`S.mp` dans `pick` d'ai.js), puis place ; le combat se fait joueur par joueur dans l'ordre de priorité. Reconnexion avec le même onglet (jeton en sessionStorage). Pas d'enregistrement en base, pas d'Annuler.
  - Test local sans Internet : ajouter `?mptest=1` à l'URL (canal BroadcastChannel entre onglets du même navigateur).

---

## 6. Derniers résultats d'équilibrage (simulations IA, 3 joueurs)

**Sans Loki** (environ 650 parties par dieu, avec Odin à 4 Héros) :

| Dieu | PV moyens | Victoires (33 % = juste) |
|---|---|---|
| Freyr | 88,3 | 44 % |
| Baldr | 88,0 | 36 % |
| Thor | 87,8 | 32 % |
| Freyja | 86,4 | 35 % |
| Tyr | 85,6 | 32 % |
| Heimdall | 84,6 | 28 % |
| Frigg | 83,7 | 29 % |
| Odin | 82,1 | 30 % |

**Avec Loki :** moyenne 72,9 PV, contre 85,9 sans Loki. Loki ne gagne quasiment jamais contre l'IA, mais la partie se bloque souvent à 3 Loki en jeu.
- Les moins touchés sont Frigg (−7,5 PV, 38 % de victoires) et Freyr (−10,4 PV, 49 %).
- Les plus touchés sont Odin (−16,4 PV, 22 %) et Freyja (−16,0 PV, 27 %).

**Décisions prises et pistes en attente :**
- **Freyr :** départ baissé à 2 Héros le 26 novembre (validé). Avec la nouvelle IA, Freyr dans chaque partie : à 3 Héros 94,2 PV et 45,5 % de victoires à 3 joueurs (60,8 % à 2) ; à 2 Héros 88,4 PV et 33,0 % à 3 joueurs (51,0 % à 2). Autres pistes testées : Freyr ne donne aucun Héros (départ 3) 26,5 % à 3 joueurs ; départ à 1 Héros 29,3 %. **Carte de score de Freyr à mettre à jour par l'auteur (2 Héros).**
- **Tableau du 26 novembre (nouvelle IA, 800 parties à 3, avant le changement de Freyr) :** Freyr 94,7 PV / 48 %, Frigg 91,2 / 37 %, Baldr 89,0 / 34 %, Thor 88,5 / 31 %, Tyr 87,8 / 31 %, Odin 87,3 / 31 %, Heimdall 87,3 / 27 %, Freyja 85,4 / 28 %. Avec Loki (600 parties) : Frigg 50 % et Freyr 46 % de victoires, Tyr, Odin et Freyja 23-25 %, Loki gagne 1,7 % des parties.
- **Odin :** départ relevé à 4 Héros (validé, carte de score mise à jour par l'auteur).
- **Baldr :** départ baissé à 4 Héros le 21 novembre (validé). Simulations du 21 novembre, Baldr dans chaque partie à 3 contre des dieux au hasard : à 5 Héros 89,2 PV et 38 % de victoires (500 parties) ; à 4 Héros 85,0 PV et 32,4 % (1 500 parties), pour 85,4 PV chez les adversaires. Autres pistes testées (500 parties) : Lumineux +1 Héros 36 %, seuils de Lumineux à 4/6 Gloire 26 %, coût 7 au Valhalla 32 % (mais Baldr au Valhalla dans 53 % des parties au lieu de 71 %), carte de score à 4 PV par série 40 %. Carte de score mise à jour par l'auteur (4 Héros).
- **Heimdall :** l'auteur le juge correct, car il marque plus en le jouant lui-même.
- **Pistes Loki non retenues pour l'instant :** The Deceiver limité à 1 Monde, The Mocker vers la défausse au lieu des cartes bannies.
- **Sur les chiffres :** l'écart entre deux séries de 300 parties peut atteindre 5 PV pour un même dieu. Il faut au moins 300 parties par dieu pour conclure.

---

## 7. Nouveaux dieux en préparation : Bragi, Iðunn, Njörd, Skaði

**Contrainte de répartition, validée :**
- Sur ces 4 decks : 16 Personnages, 16 Objets, 16 Événements.
- Sur les 12 decks réunis : **15 fois chaque tag**. Les 8 decks actuels en ont Animal 11, Artefact 11, Destin 12, Équipement 10, Gloire 9, Guerrier 9. Les 4 nouveaux decks ajoutent donc Animal 4, Artefact 4, Destin 3, Équipement 5, Gloire 6, Guerrier 6, soit 7 tags par deck.

**Bragi, Dieu de la Poésie : terminé, retiré de l'app à la demande de l'auteur.** Son deck, son code (`bragi.js`) et des visuels provisoires (`bragi_img.js`, style cartoon plat original) sont prêts. Le remettre revient à ajouter ces deux fichiers dans `build.py`, plus sa ligne dans les règles et son départ « Bragi 5 ».
- **Pouvoir, Song of Heroes / Chant des Héros (icône : harpe) :** ce tour-ci, les cartes jouées avec Bragi comptent comme si elles étaient dans le Valhalla : leurs bonus et leurs tags s'appliquent. Aucun Héros.
- **Carte de score (lieu : Valhalla) :** 3 PV par paire de tags identiques. **Départ : 5 Héros.**
- **Simulation :** environ 86 PV et 36 % de victoires.
- **Règle de l'auteur :** tous les Événements coûtent au moins 2.
- Deck en annexe A.

**Iðunn** (lieu de score : Brunnakr) : 3 P / 6 O / 3 É
- Ívaldi (P, Équipement), Sons of Ívaldi (P, Équipement), Elli (P, Destin)
- Golden Apples (O, Artefact), Eski (O, Artefact), The Nut (O), Apple Tree of Asgard (O), Healing Herbs (O), Seeds of Youth (O)
- The Abduction of Iðunn (É, Animal), The Gods Grow Old (É, Destin), Return to Asgard (É)

**Njörd** (lieu de score : Nóatún) : 4 P / 5 O / 3 É
- Nerthus (P), Hœnir (P, Gloire), The Sailors (P, Guerrier), The Fishermen (P, Animal)
- Fisherman's Net (O, Équipement), Wind Sail (O), Amber Treasure (O, Artefact), Seagull Feather (O, Animal), Longship (O, Guerrier)
- The Vanir Hostages (É), Chosen by the Feet (É), Calming the Waves (É)

**Skaði** (lieu de score : Thrymheim) : 5 P / 2 O / 5 É
- Thjazi (P, Animal), Ullr (P, Guerrier), Mountain Hunters (P, Guerrier), Snow Skiers (P), Sæmingr (P, Gloire)
- Bow of Skaði (O, Équipement), Skis (O, Équipement)
- Thjazi's Eyes (É), Skaði's Revenge (É, Guerrier), Loki's Goat Rope (É), Marriage with Njörd (É), Return to the Mountains (É)

Pour Iðunn, Njörd et Skaði, il reste à définir les coûts, bonus, PV et effets, ainsi que le pouvoir, la carte de score et les Héros de départ. Pistes de thème : Iðunn la récupération de cartes (défausse et bannies), Njörd les Mondes, Skaði la chasse aux Créatures.

---

## Annexe A — Decks (format `nom|type|tag|coût|bonus|PV|effet`)

```
Odin (départ 4, score 4/World)
Odin|G||0|||eye
Geri & Freki|C|Animal|3|Beast|2/Beast|
Sleipnir|C|Animal|2|Glory|2/Artefact|2/-1/Animal
Huginn & Muninn|C|Animal|2|Undead|5|1
Heiðrún|C|Animal|5|Artefact|3/Animal|0/1/Animal
Gungnir|I|Artefact|1|Giant|1/Giant|1/1/Glory
Hlidskjálf|I|Glory|4|Animal|2/Event|0/1/Character
Draupnir|I|Artefact|2|Beast&Undead||1/1/World
Odin's Helmet|I||0|Event||1
Fight to the Death|E|Glory|1|Giant|2|
Wisdom of the Runes|E||1|Elite|3|0/1/majsub
Journey Through the 9 Worlds|E||5|Atk|4/Glory|2/-1/World
Mímir's Well|E||3|World|2/World|1/1/Artefact

Thor (départ 2, score 3/Elite)
Thor|G||0|||thor
Tanngrisnir|C|Animal|1|Beast|1/Beast|0/1/Beast
Tanngnjóstr|C|Animal|1|Giant|1/Giant|0/1/Giant
Sif|C||3|Atk|5|1/1/Equipment
Thrud|C||5||4/Equipment|3/-1/Equipment
Magni & Modi|C|Warrior|2|Undead|2/Undead|
Mjölnir|I|Equipment|3||2/Elite|2/-1/Elite
Chariot|I||2|Unl|3|0/1/Warrior
Megingjörð|I|Equipment|2||3/Warrior|1
Járngreipr|I|Equipment|1|Elite||1/Elite
Fight to the Death|E|Warrior|0||1/World|1
Lightning / Thunder|E||2|Giant&Beast&Undead|2/GBU|1/1/diffcr
Goats Resurrection|E||1||2/Animal|1/1/Animal

Frigg (départ 2, score 4/majtype)
Frigg|G||0|||frigg
Gná|C||3|Giant|3/Event|0/1/Banished
Fulla|C||1|Artefact|2|
Eir|C|Destiny|2|Beast|4|1
Hlín|C||2||4/Artefact|0/1/Artefact
Odin's Ring|I|Artefact|4||3/Destiny|0/1/Destiny
Veil of Destiny|I|Destiny|4|Undead|3/Character|0/1/Banished
Key of the Palace|I|Artefact|2|Undead&Giant||
Hlin's Belt|I|Artefact|2||2/majcr|Unl
Blessing|E||4||3/majtype|0/1/majtype
Weaving the Future|E|Destiny|1|Ban||
Queens Council|E||3|Beast|3/Item|0/1/Banished
Prophecy|E|Destiny|2|Atk||1

Freyja (départ 4, score 5/GBU)
Freyja|G||0|||freyja
Cat #1|C|Animal|3|Item|3/Item|2
Cat #2|C|Animal|1||1/majcr|0/1/majsub
Valkyrie Brynhildr|C|Warrior|4|Beast&Giant|4|0/2/Event
Valkyrie Skuld|C|Warrior|3|Undead&Giant|2|0/1/Animal
Valkyrie Gunnr|C|Warrior|2|Beast&Undead||1
Valkyrie Hildr|C|Warrior|2|Event|2/GBU|
Brísingamen|I||1||1/Character|3/-1/Character
Fjaðrhamr|I||2|Beast|4/Event|
Chariot|I||3||4/Animal|1/1/Animal
Seal of Sessrúmnir|I||1|Character|3|0/1/Character
Golden Tears|E||3|Giant|3/GBU|0/1/Item
Song of the Valkyries|E||3|Warrior|2/Warrior|0/1/Warrior

Heimdall (départ 2, score 2/diffsub)
Heimdall|G||0|||heim
Gulltoppr|C|Animal|2|Undead|2|
The 9 Mothers|C|Destiny|5|Rb|6|0/1/Event
Rig|C|Warrior|3||4/Equipment|0/1/majsub
Gjallarhorn|I|Equipment|4|Event|3/Glory|
Resonant Sword|I|Equipment|3|Beast&Giant|1/Beast|1
Bifrost|I||4||2/diffsub|1/1/Glory
Golden teeth|I|Artefact|1|Undead|1/Undead|0/1/Undead
Fight to the death|E||2||2/Elite|3/-1/Elite
Eternal Watch|E|Glory|3|Beast&Giant|1/Giant|1
Guardian of the Worlds|E||2|World|1/World|0/1/Character
Keen Eyes|E|Glory|1||1/Event|Unl
Ragnarok's awakening|E|Glory|3|Atk|3|0/1/diffsub

Tyr (départ 4, score 2/majcr)
Tyr|G||0|||tyr
Vidar|C||3|Unl|2/diffcr|0/1/diffcr
Hermóðr|C||3||3/Destiny|0/1/Item
Tyr's Sword|I|Equipment|1||1/Giant|1
Tyr's Armor|I|Equipment|2|World|2/World|1/1/Destiny
Gleipnir|I|Artefact|2|Event|1/Beast|Atk
Oathstone|I|Artefact|2|Destiny|2/Artefact|0/1/Destiny
Gathering at the Thing|E|Destiny|0|Character&Item||1/1/Equipment
Honorable Duel|E||2||1/majcr|1
Fight to the death|E||2|Equipment&Artefact|1/Undead|
Pact of Binding|E|Destiny|5||2/Event|0/1/diffcr
Tyr's Oath|E|Destiny|3|Atk|3|3/-1/Artefact
The Severed Hand|E|Destiny|2||3|

Baldr (départ 4, score 5/CIE)
Baldr|C|Warrior|6|Lum||2
Höðr|C||3|Undead|5/Warrior|1/1/CIE
Nanna|C|Glory|2|Dbl|2/CIE|3/-1/Warrior
Hringhorni|I|Equipment|2|Elite|2/Elite|
Shield|I|Equipment|3|Dbl|3/CIE|1
Funeral Pyre|I|Glory|2|Unl||1/Glory
Mistletoe|I||1||1/diffsub|1/majsub
Baldr's Mount|I|Animal|2|Beast|3|1/1/Equipment
Thökk's Refusal|E||2|Character&Item&Event||
Oath of all things|E|Glory|3|World|2/World|2/-1/World
Baldr's Death|E|Glory|5||3/Glory|2/Warrior
Javelin Throw|E||1|Giant|2|1/1/CIE
Funeral|E||4|Dbl|4/CIE|

Freyr (départ 2, score 2/HeroCap6)
Freyr|G||0|||freyr
Gullinbursti|C|Animal|3|Beast&Beast||1/1/Destiny
Gerda|C||2|Giant&Giant||
Skírnir|C|Warrior+Warrior|4|Atk|4|2/-1/Artefact
Byggvir|C||2||2/Warrior|1/Character
Beyla|C||1||1/Artefact|1/Hero3
Freyfaxi|C|Destiny|5|Item&Item&Event&Event|2/Destiny|1
Skíðblaðnir|I|Artefact|4|World&World|2/World|2
Sword of Freyr|I|Equipment|4|Elite&Elite|1/Elite|1/Elite
Freyr's Antler|I|Artefact|4|Undead&Undead|2|1
Cult of Uppsala|E|Artefact|2|Inv2||1/Hero3
Skírnir's Journey|E|Destiny|2|Unl|2/Artefact|
Duel with Surtr|E|Destiny|1||1/Destiny|Atk

Bragi (en préparation, hors de l'app — départ 5, score 3/pairs)
Bragi|G||0|||bragi
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
Hákonarmál|E|Glory|3|Elite|3/Glory|2
```

## Annexe B — Loki (format `surnom|Force|PV|élite|tag|permanent|instantané|vaincu|texte|compte comme`)

```
The Thief|5|2/Animal||Animal||disc||Instant: each player discards 1 card from their hand for each Loki in play.
The Trickster|5|2/Glory||Glory||lose||Instant: each player loses 1 Hero for each Loki in play.
The Deceiver|5|2/Destiny||Destiny||unfree||Instant: discard 1 random freed World from play for each Loki in play.
The Sly God|5|2/Equipment||Equipment||tok||Instant: place 1 Hero on this card for each Loki in play. This Loki has +1 Strength for each Hero on it.
The Shapeshifter|5|2/Warrior||Warrior||next||Instant: reveal the next Loki card.
The Mocker|5|2/Artefact||Artefact||vban||Instant: each player moves 1 card from their Valhalla to their banish area and gains 1 Hero for each Loki in play.
Laufey’s Son|7|2/Giant|1||G|||Ongoing: Giants have +1 Strength.|Giant
Father of the Wolf|7|2/Beast|1||B|||Ongoing: Beasts have +1 Strength.|Beast
Father of Hel|7|2/Undead|1||U|||Ongoing: Undeads have +1 Strength.|Undead
Father of the World Serpent|7|3/World|1||W|||Ongoing: protecting a World costs +2 Heroes.|World
The Bound God|9|5/Loki|1||last|||Ongoing: cannot be defeated unless this is the last Loki in play.
The Sky Traveller|4|3|||||opplose|When defeated: opponents lose 1 Hero for each Loki in play.
Son of Farbauti|4|2|||||oppdiscn|When defeated: opponents discard 1 card from their hand for each Loki in play.
The Lie-Smith|4|7|||||less|When defeated: draw 1 card less at the end of your turn.
The Mischief Maker|4|4|||||atk|When defeated: +1 Attack.
```
