<script>
// ===== Italiano : dictionnaire et motifs (même principe que le français) =====
const IT_EXACT={
'CHOOSE YOUR GOD':'SCEGLI IL TUO DIO','PLAY SOLO':'GIOCA DA SOLO','PLAY ONLINE':'GIOCA ONLINE','Play against the AI':'Gioca contro l’IA','Play with friends from home (2 to 4 players)':'Gioca con gli amici da casa (da 2 a 4 giocatori)','AI opponents':'Avversari IA','Loki expansion':'Espansione Loki','Your nickname (for stats)':'Il tuo nickname (per le statistiche)','Anonymous':'Anonimo','PLAY':'GIOCA','Off':'No','🐍 On':'🐍 Sì',
'👀 Watch AI vs AI':'👀 Guarda IA contro IA','📊 Game statistics':'📊 Statistiche','📜 Rules':'📜 Regole','🧭 Turn summary':'🧭 Riepilogo del round','✓ Selected':'✓ Scelto','(prototype)':'(prototipo)',
'Face the creatures · Save the Worlds · Earn your place in Valhalla':'Affronta le Creature · Salva i Mondi · Guadagnati un posto nel Valhalla',
'A Loki card appears at the start and each time a World is freed. 4 Loki in play = everyone loses.':'Una carta Loki appare all’inizio e ogni volta che un Mondo viene liberato. 4 Loki in gioco = tutti perdono.',
'Allfather':'Padre di tutti','Queen of the Ases':'Regina degli Asi','Goddess of Love':'Dea dell’Amore','God of Light':'Dio della Luce','God of Thunder':'Dio del Tuono','God of War':'Dio della Guerra','Guardian of the Worlds':'Guardiano dei Mondi','God of Prosperity':'Dio della Prosperità','God of Poetry':'Dio della Poesia',
'⌂ Home':'⌂ Home','🤖 AI simulations':'🤖 Simulazioni IA','🎓 Tutorial':'🎓 Tutorial','↩ Undo':'↩ Annulla','Undo your last click':'Annulla l’ultimo clic','← Home':'← Home','📜 Full rules':'📜 Regole complete','Worlds deck:':'Mazzo dei Mondi:','Keep playing':'Continua a giocare','Yes, go home':'Sì, torna alla home','Leave this game? It won’t be saved.':'Lasciare la partita? Non verrà salvata.',
'Choose the card to set aside':'Scegli la carta da mettere da parte','(Valhalla or banished); the other 3 will be played.':'(Valhalla o bandita); le altre 3 verranno giocate.','(Mulligan already used)':'(Mulligan già usato)','🔄 Mulligan (1× per game)':'🔄 Mulligan (1 volta per partita)',
'Discard your 4 cards and draw 4 new ones — once per game':'Scarta le tue 4 carte e pescane 4 nuove — una volta per partita',
"Your god card is always played: it can't be set aside":'La tua carta dio viene sempre giocata: non può essere messa da parte','Always played':'Sempre giocata',
'Card set aside:':'Carta messa da parte:','(a god can never go to Valhalla)':'(un dio non va mai nel Valhalla)',
'Combat:':'Combattimento:','End my turn':'Fine del mio turno','Dark creatures can’t be attacked.':'Le Creature scure non possono essere attaccate.',
'Not accessible':'Non accessibile','No attack left':'Nessun attacco rimasto','You already protected a World this round':'Hai già protetto un Mondo in questo round','Requirement not met':'Requisito non soddisfatto',
'A World is freed when one of its sides has no creature left. It stays here until a player protects it.':'Un Mondo viene liberato quando uno dei suoi lati non ha più Creature. Resta qui finché un giocatore non lo protegge.',
'A World is freed when one of its sides has no creature left. It stays here until a player protects it — click one to protect it (1 per round).':'Un Mondo viene liberato quando uno dei suoi lati non ha più Creature. Resta qui finché un giocatore non lo protegge — clicca su un Mondo per proteggerlo (1 per round).',
'Frigg is among your played cards.':'Frigg è tra le tue carte giocate.',
'In which order should they resolve? (The Loom changes your banished cards and your Valhalla, which affects “x Banished card”, “x Character” effects, etc.)':'In quale ordine risolverle? (Il Telaio modifica le tue carte bandite e il tuo Valhalla, e quindi gli effetti «× carta bandita», «× Personaggio», ecc.)',
'Frigg first':'Prima Frigg','My other cards first':'Prima le mie altre carte','Loom:':'Telaio:','take 2 Heroes, or return a banished card to your Valhalla for free.':'prendi 2 Eroi, oppure rimetti gratis una carta bandita nel tuo Valhalla.','+2 Heroes':'+2 Eroi',
'👑 Frigg’s setup:':'👑 Preparazione di Frigg:','you drew these 2 cards. Choose the one to':'hai pescato queste 2 carte. Scegli quella da','banish':'bandire',
'(+2 Heroes) — the other is shuffled back into your deck. Then you draw your 4 cards for round 1.':'(+2 Eroi) — l’altra viene rimescolata nel tuo mazzo. Poi peschi le tue 4 carte per il round 1.',
'👁 Odin’s eye':'👁 L’occhio di Odino','(mandatory, before setting a card aside): choose one card to':'(obbligatorio, prima di mettere da parte una carta): scegli una carta da','discard':'scartare','— you then draw 2 cards.':'— poi peschi 2 carte.',
'🌾 Freyr — Sow & harvest:':'🌾 Freyr — Semina e raccolto:','end of your turn':'fine del tuo turno','you take them back and gain':'li riprendi e ne guadagni','as many':'altrettanti','more.':'in più.','Skip':'Salta','Heroes at the end of your turn':'Eroi alla fine del tuo turno',
'☀ Luminous':'☀ Luminoso','☀ Luminous already used this turn.':'☀ Luminoso già usato in questo turno.','☀ Luminous is no longer available this turn (it must be used before fighting or protecting a World).':'☀ Luminoso non è più disponibile in questo turno (va usato prima di combattere o di proteggere un Mondo).',
'Cancel free defeat':'Annulla la vittoria gratuita','Click a creature marked ☀.':'Clicca su una Creatura segnata con ☀.','☀ free':'☀ gratis',
'YOU':'TU','VALHALLA':'VALHALLA','MONSTERS':'CREATURE','CREATURES':'CREATURE','WORLDS':'MONDI','BANISHED':'BANDITE','🐍 LOKI':'🐍 LOKI',
'Heroes in stock':'Eroi in riserva','Attacks available this round':'Attacchi disponibili in questo round','Attacks left this turn':'Attacchi rimasti in questo turno','Banished cards':'Carte bandite','Beasts defeated':'Bestie sconfitte','Giants defeated':'Giganti sconfitti','Undead defeated':'Non morti sconfitti','Elite creatures defeated':'Creature Élite sconfitte','Worlds saved':'Mondi salvati','Characters in Valhalla':'Personaggi nel Valhalla','Items in Valhalla':'Oggetti nel Valhalla','Events in Valhalla':'Eventi nel Valhalla',
'Animal':'Animale','Artefact':'Artefatto','Destiny':'Destino','Equipment':'Equipaggiamento','Glory':'Gloria','Warrior':'Guerriero',
'📋 Copy game summary':'📋 Copia il riepilogo della partita',"— send it to the game's author so your game counts in the statistics.":'— invialo all’autore del gioco perché la tua partita conti nelle statistiche.',
'Copy this text and send it to the author:':'Copia questo testo e invialo all’autore:','✅ Summary copied — paste it in a message to the author.':'✅ Riepilogo copiato — incollalo in un messaggio all’autore.',
'Saving the game…':'Salvataggio della partita…','✅ Game saved for the statistics.':'✅ Partita salvata per le statistiche.','Game not saved: your access to this page is read-only.':'Partita non salvata: il tuo accesso a questa pagina è in sola lettura.','Game not saved: the database is full.':'Partita non salvata: il database è pieno.','Game not saved (network error).':'Partita non salvata (errore di rete).',
'Game not recorded on this site: use “Copy game summary” to send it to the author.':'Partita non registrata su questo sito: usa «Copia il riepilogo della partita» per inviarla all’autore.',
'Statistics are only available in the Claude version of the app.':'Le statistiche sono disponibili solo nella versione Claude dell’app.',
'👀 AI vs AI':'👀 IA contro IA','▶ Next round':'▶ Round successivo','⏩ Auto-play':'⏩ Gioco automatico','⏸ Pause':'⏸ Pausa','⏭ Skip to end':'⏭ Vai alla fine','AI vs AI game started.':'Partita IA contro IA iniziata.',
'Cards played, effects resolved.':'Carte giocate, effetti risolti.','Loki deck is empty: no new Loki appears.':'Il mazzo Loki è vuoto: non appare nessun nuovo Loki.',
'📊 Statistics':'📊 Statistiche','← Back to the game':'← Torna alla partita','Refresh':'Aggiorna','🗑 Reset statistics':'🗑 Azzera le statistiche','Yes, reset':'Sì, azzera','Cancel':'Annulla','✕ Close':'✕ Chiudi','Loading…':'Caricamento…',
'📥 Import games from testers':'📥 Importa partite dei tester','Paste one or more game summaries (text starting with RAGNAROK-GAME:) sent by your testers.':'Incolla uno o più riepiloghi di partita (testo che inizia con RAGNAROK-GAME:) inviati dai tuoi tester.','Import':'Importa',
'No game summary found in the text.':'Nessun riepilogo di partita trovato nel testo.','Import unavailable here.':'Importazione non disponibile qui.','Could not read the statistics.':'Impossibile leggere le statistiche.','The data isn’t responding right now. Try again in a moment.':'I dati non rispondono al momento. Riprova tra poco.',
'No games recorded yet. Finish a game (7 rounds) for it to show up here.':'Nessuna partita registrata. Termina una partita (7 round) perché compaia qui.',
'Show:':'Mostra:','All players (AI included)':'Tutti i giocatori (IA incluse)','Humans only':'Solo umani','Mode:':'Modalità:','General statistics by god':'Statistiche generali per dio','Click a god to see how often each card of its deck went to Valhalla.':'Clicca su un dio per vedere quanto spesso ogni carta del suo mazzo è finita nel Valhalla.',
'Player':'Giocatore','Games':'Partite','Win %':'% vittorie','Avg VP':'PV medi','Avg Heroes gained':'Eroi guadagnati (media)','Highest score':'Punteggio più alto','Lowest score':'Punteggio più basso','Creatures defeated':'Creature sconfitte','Times defeated':'Volte sconfitta','Win % of the player who defeated it':'% vittorie di chi l’ha sconfitta','Worlds protected':'Mondi protetti','Times protected':'Volte protetto','Latest games':'Ultime partite','Date':'Data','Winner':'Vincitore','Rank':'Posizione','Opp.':'Avv.','In Valhalla':'Nel Valhalla','Win % when in Valhalla':'% vittorie quando è nel Valhalla',
'🐍 With Loki':'🐍 Con Loki','Base game':'Gioco base','All':'Tutto','No Loki in play.':'Nessun Loki in gioco.','⚠ One more freed World and Loki wins!':'⚠ Ancora un Mondo liberato e Loki vince!',
'Instant: each player discards 1 card from their hand for each Loki in play.':'Istantaneo: ogni giocatore scarta 1 carta dalla mano per ogni Loki in gioco.',
'Instant: each player loses 1 Hero for each Loki in play.':'Istantaneo: ogni giocatore perde 1 Eroe per ogni Loki in gioco.',
'Instant: discard 1 random freed World from play for each Loki in play.':'Istantaneo: scarta a caso 1 Mondo liberato per ogni Loki in gioco.',
'Instant: place 1 Hero on this card for each Loki in play. This Loki has +1 Strength for each Hero on it.':'Istantaneo: metti 1 Eroe su questa carta per ogni Loki in gioco. Questo Loki ha +1 Forza per ogni Eroe su di lui.',
'Counts as a Giant.':'Conta come un Gigante.','Counts as a Beast.':'Conta come una Bestia.','Counts as an Undead.':'Conta come un Non morto.','Counts as a World.':'Conta come un Mondo.','Counts as a Giant':'Conta come un Gigante','Counts as a Beast':'Conta come una Bestia','Counts as a Undead':'Conta come un Non morto','Counts as a World':'Conta come un Mondo','Instant: reveal the next Loki card.':'Istantaneo: rivela la carta Loki successiva.',
'Instant: each player moves 1 card from their Valhalla to their banish area and gains 1 Hero for each Loki in play.':'Istantaneo: ogni giocatore sposta 1 carta dal suo Valhalla alle sue carte bandite e guadagna 1 Eroe per ogni Loki in gioco.',
'Ongoing: Giants have +1 Strength.':'Permanente: i Giganti hanno +1 Forza.','Ongoing: Beasts have +1 Strength.':'Permanente: le Bestie hanno +1 Forza.','Ongoing: Undeads have +1 Strength.':'Permanente: i Non morti hanno +1 Forza.',
'Ongoing: protecting a World costs +2 Heroes.':'Permanente: proteggere un Mondo costa +2 Eroi.','Ongoing: cannot be defeated unless this is the last Loki in play.':'Permanente: può essere sconfitto solo se è l’ultimo Loki in gioco.',
'When defeated: opponents lose 1 Hero for each Loki in play.':'Quando viene sconfitto: gli avversari perdono 1 Eroe per ogni Loki in gioco.','When defeated: opponents discard 1 card from their hand for each Loki in play.':'Quando viene sconfitto: gli avversari scartano 1 carta dalla mano per ogni Loki in gioco.',
'When defeated: draw 1 card less at the end of your turn.':'Quando viene sconfitto: pesca 1 carta in meno alla fine del tuo turno.','When defeated: +1 Attack.':'Quando viene sconfitto: +1 Attacco.'
};
// Textes des modules multijoueur et simulateur (appelés par MPT et ST)
const IT_UI={
'Room not found. Check the code (the host must keep the page open).':'Stanza non trovata. Controlla il codice (l’host deve tenere la pagina aperta).',
'Connection timed out. Try again, or try another network.':'Connessione scaduta. Riprova, oppure prova un’altra rete.',
'Could not load the network library. Check your Internet connection.':'Impossibile caricare la libreria di rete. Controlla la tua connessione Internet.',
'Connection error':'Errore di connessione','Player':'Giocatore','The code has 4 letters.':'Il codice ha 4 lettere.','This room is full (4 players).':'Questa stanza è piena (4 giocatori).','This game has already started.':'Questa partita è già iniziata.','The host closed the room.':'L’host ha chiuso la stanza.',
'Copied':'Copiato','Home':'Home','Online multiplayer':'Multigiocatore online','Online multiplayer works on the web version of the game:':'Il multigiocatore online funziona sulla versione web del gioco:','This page cannot open direct connections between players.':'Questa pagina non può aprire connessioni dirette tra giocatori.',
'Play with friends from home: one player creates a room and shares the code, the others join. 2 to 4 players, each chooses a different god. Each screen only shows its own hand.':'Gioca con gli amici da casa: un giocatore crea una stanza e condivide il codice, gli altri si uniscono. Da 2 a 4 giocatori, ognuno sceglie un dio diverso. Ogni schermo mostra solo la propria mano.',
'Your name':'Il tuo nome','Create a room':'Crea una stanza','You will be the host: keep this page open until the end of the game.':'Sarai l’host: tieni questa pagina aperta fino alla fine della partita.','Create':'Crea','Join a room':'Entra in una stanza','Enter the 4-letter code given by the host.':'Inserisci il codice di 4 lettere dato dall’host.','Join':'Entra','Connecting…':'Connessione…',
'Connection to the host lost.':'Connessione con l’host persa.','Reconnect':'Riconnettiti','Room code':'Codice della stanza','Copy code':'Copia il codice','Copy invitation link':'Copia il link di invito','Players':'Giocatori','host':'host','you':'tu','offline':'disconnesso','choosing a god…':'sta scegliendo un dio…','Choose your god':'Scegli il tuo dio','Loki expansion':'Espansione Loki','Off':'No','On':'Sì',
'START THE GAME':'INIZIA LA PARTITA','Waiting for at least one other player…':'In attesa di almeno un altro giocatore…','Every player must choose a god.':'Ogni giocatore deve scegliere un dio.','Waiting for the host to start the game…':'In attesa che l’host avvii la partita…',
'Your turn to fight!':'Tocca a te combattere!','is fighting…':'sta combattendo…','Your move.':'Tocca a te.','Waiting for':'In attesa di','Room':'Stanza','You set aside':'Hai messo da parte','Offline':'Disconnesso','Connection lost':'Connessione persa','New game with the same players':'Nuova partita con gli stessi giocatori','The host can start a new game.':'L’host può avviare una nuova partita.','Leave the room':'Lascia la stanza',
'games':'partite','about':'circa','left':'rimanenti','Results by god':'Risultati per dio','players':'giocatori','A fair win rate is':'Una percentuale di vittorie equa è','Loki won':'Loki ha vinto','of games.':'delle partite.','God':'Dio','Games':'Partite','Win %':'% vittorie','Avg VP':'PV medi','Heroes gained':'Eroi guadagnati','Creatures':'Creature','Worlds':'Mondi',
'Matchups (1 vs 1)':'Scontri (1 contro 1)','Each cell: win % of the row god against the column god':'Ogni casella: % di vittorie del dio in riga contro il dio in colonna','games per pair, alternating who plays first':'partite per coppia, alternando chi inizia','Overall':'Totale','VP':'PV',
'AI vs AI simulations':'Simulazioni IA contro IA','Runs complete games between AIs in your browser (nothing is saved in the game statistics). Use it to compare the gods and their matchups.':'Esegue partite complete tra IA nel tuo browser (nulla viene salvato nelle statistiche delle partite). Serve a confrontare gli dei e i loro scontri.',
'Random games':'Partite casuali','Matchups 1 vs 1':'Scontri 1 contro 1','Games per pair':'Partite per coppia','pairs':'coppie','Stop':'Ferma','Run':'Avvia','Copy results':'Copia i risultati','Copy not allowed here.':'Copia non consentita qui.','game(s) failed and were skipped.':'partita/e in errore ignorata/e.',
'AI games are a guide: a good human player usually scores a few VP more than the AI.':'Le partite tra IA sono un riferimento: un buon giocatore umano di solito fa qualche PV in più dell’IA.'
};
const itT=en=>IT_UI[en]??IT_EXACT[en]??en;
const IT_RX=[
[/^Round (\d+)\/(\d+)$/,'Round $1/$2'],[/^Priority: (.+)$/,'Priorità: $1'],
[/^(\d+) attack\(s\) left\. Click a highlighted creature on the board to fight it \(cost in Heroes shown on it\)\. Dark creatures can’t be attacked\. You can also protect one freed World \(green panel\)\.$/,'$1 attacco/i rimasto/i. Clicca su una Creatura evidenziata per combatterla (costo in Eroi indicato sopra). Le Creature scure non possono essere attaccate. Puoi anche proteggere un Mondo liberato (pannello verde).'],
[/^Valhalla \((\d+) Heroes\)$/,'Valhalla ($1 Eroi)'],[/^Banish \(\+(\d+) Heroes\)$/,'Bandisci (+$1 Eroi)'],
[/^Fight (.+) for (\d+) Heroes$/,'Combatti $1 per $2 Eroi'],[/^Protect (.+) for (\d+) Heroes$/,'Proteggi $1 per $2 Eroi'],[/^Defeat (.+) for free \(Luminous\)$/,'Sconfiggi $1 gratis (Luminoso)'],
[/^Not enough Heroes \((\d+) needed\)$/,'Eroi insufficienti (ne servono $1)'],[/^Cost to protect once freed: (\d+) Heroes$/,'Costo per proteggerlo una volta liberato: $1 Eroi'],
[/^Set aside — Valhalla cost: (\d+) Heroes$/,'Metti da parte — costo Valhalla: $1 Eroi'],
[/^🌍 Freed Worlds \((\d+)\)$/,'🌍 Mondi liberati ($1)'],[/^(\d+) defeated · (\d+) VP$/,'$1 sconfitta/e · $2 PV'],[/^(\d+) saved · (\d+) VP$/,'$1 salvato/i · $2 PV'],[/^(\d+) cards?$/,'$1 carta/e'],
[/^cards (\d+) · creatures (\d+) · worlds (\d+) · scoring (\d+)( · Loki (\d+))?$/,(m,a,b,c,d,e,f)=>`carte ${a} · Creature ${b} · mondi ${c} · punteggio ${d}${e?' · Loki '+f:''}`],
[/^\(cards (\d+), creatures (\d+), worlds (\d+), scoring (\d+)\)$/,'(carte $1, Creature $2, mondi $3, punteggio $4)'],
[/^· Heroes (\d+) · VP (\d+)$/,'· Eroi $1 · PV $2'],[/^(.+) · (\d+) VP$/,'$1 · $2 PV'],[/^(.+) : (\d+) VP \((\d+) Heroes\)$/,'$1: $2 PV ($3 Eroi)'],
[/^Valhalla: /,'Valhalla: '],[/^, (.+)$/,(m,a)=>', '+(IT_EXACT[a]||a)],[/Creatures: /g,'Creature: '],[/ · Worlds: /g,' · Mondi: '],[/ · Banished: /g,' · Bandite: '],[/ · Loki defeated: /g,' · Loki sconfitti: '],
[/^Game over – winner: (.+)$/,'Partita finita – vincitore: $1'],[/^🔁 Play again with (.+)$/,'🔁 Gioca ancora con $1'],
[/^🐍 Loki triumphs! (\d+) Loki cards are in play: everyone loses\.$/,'🐍 Loki trionfa! $1 carte Loki sono in gioco: tutti perdono.'],
[/^(.+) is among your played cards\.$/,'$1 è tra le tue carte giocate.'],[/^(.+) first$/,'Prima $1'],
[/^place up to (\d+) of your Heroes on (.+) — they are not available this turn, and at the$/,'metti fino a $1 dei tuoi Eroi su $2 — non sono disponibili in questo turno, e alla'],
[/^Invest (\d+) → (\d+)$/,'Investi $1 → $2'],[/^(\d+)×as many$/,'$1× altrettanti'],[/^🌾 Invested on (.+):$/,'🌾 Investiti su $1:'],
[/^\(Baldr, 1× per turn, before any fight or World protection — you have (\d+) Glory\):$/,'(Baldr, 1 volta per turno, prima di qualsiasi combattimento o protezione di un Mondo — hai $1 Gloria):'],
[/^Free defeat: any accessible creature$/,'Vittoria gratuita: qualsiasi Creatura accessibile'],[/^Free defeat: non-Elite accessible creature$/,'Vittoria gratuita: Creatura accessibile non Élite'],
[/^🐍 Loki: (\d+) \/ (\d+)$/,'🐍 Loki: $1 / $2'],[/^Deck: (\d+)$/,'Mazzo: $1'],
[/^🐍 Loki: discard (\d+) cards? from your hand$/,'🐍 Loki: scarta $1 carta/e dalla tua mano'],
[/^\(before setting a card aside; you always keep at least 1 card to set aside\)\. Click the card to discard\.$/,'(prima di mettere da parte una carta; tieni sempre almeno 1 carta da mettere da parte). Clicca sulla carta da scartare.'],
[/^🐍 Loki: move (\d+) cards? from your Valhalla to your banish area$/,'🐍 Loki: sposta $1 carta/e dal tuo Valhalla alle tue carte bandite'],
[/^\(you gain (\d+) Heroes\)\. Click the card\.$/,'(guadagni $1 Eroi). Clicca sulla carta.'],[/^\(no Hero gained\)\. Click the card\.$/,'(nessun Eroe guadagnato). Clicca sulla carta.'],
[/^Strength (\d+)$/,'Forza $1'],[/^Loki — (.+?): (.+)$/,(m,a,b)=>'Loki — '+a+': '+(IT_EXACT[b]||b)],
[/^(\d+) games · $/,'$1 partite · '],[/^ player\(s\) · human wins: $/,' giocatore/i · vittorie umane: '],[/ · average length: ([\d.]+) min$/,' · durata media: $1 min'],[/^🐍 Loki games: $/,'🐍 Partite con Loki: '],[/^ · Loki won $/,' · Loki ha vinto '],
[/^(Base game|🐍 With Loki|All) \((\d+)\)$/,(m,a,b)=>IT_EXACT[a]+' ('+b+')'],
[/^You \((.+)\)$/,'Tu ($1)'],[/^Cost (\d+) · VP (.+)$/,'Costo $1 · PV $2'],[/^(.+) — deck cards \((\d+) games?\)$/,'$1 — carte del mazzo ($2 partite)'],
[/^% of games where the card ended in Valhalla\. (.+) itself can never be placed in Valhalla\.$/,'% delle partite in cui la carta è finita nel Valhalla. $1 non può mai andare nel Valhalla.'],
[/^Delete all (\d+) recorded games\? This can’t be undone\.$/,'Eliminare tutte le $1 partite registrate? L’operazione è irreversibile.'],[/^Deleting… (\d+)\/(\d+)$/,'Eliminazione… $1/$2'],
[/^Statistics reset: (\d+) games deleted\.$/,'Statistiche azzerate: $1 partite eliminate.'],[/^Some games could not be deleted \(your access may be read-only\)\.$/,'Alcune partite non sono state eliminate (il tuo accesso potrebbe essere in sola lettura).'],
[/^(\d+) game\(s\) imported(.*)$/,'$1 partita/e importata/e$2'],[/could not be imported \(invalid text, or your access is read-only\)/,'non sono state importate (testo non valido o accesso in sola lettura)'],
// registro della partita
[/^(.+) \(Frigg setup\) banishes (.+) \(\+(\d+) Heroes\) and shuffles (.+) back$/,'$1 (preparazione di Frigg) bandisce $2 (+$3 Eroi) e rimescola $4'],[/^(.+) defeats Loki: (.+) \((\d+)\)$/,'$1 sconfigge Loki: $2 ($3)'],[/^(.+) defeats (.+) \((\d+)\)$/,'$1 sconfigge $2 ($3)'],[/^(.+) sends (.+) to Valhalla$/,'$1 manda $2 nel Valhalla'],[/^(.+) banishes (.+)$/,'$1 bandisce $2'],
[/^(.+) protects (.+)$/,'$1 protegge $2'],[/^(.+) returns (.+) to Valhalla \(Loom\)$/,'$1 rimette $2 nel Valhalla (Telaio)'],
[/^(.+) \(Odin’s eye\) discards (.+) and draws (.+)$/,(m,a,b,c)=>a+' (occhio di Odino) scarta '+b+' e pesca '+(c=='nothing'?'niente':c)],
[/^(.+) takes a Mulligan \(discards (.+)\)$/,'$1 fa un Mulligan (scarta $2)'],[/^(.+) uses Luminous: \+(\d+) Heroes$/,'$1 usa Luminoso: +$2 Eroi'],[/^(.+) uses Luminous: defeats (.+) for free$/,'$1 usa Luminoso: sconfigge $2 gratis'],
[/^(.+) invests (\d+) Heroes on (.+)$/,'$1 investe $2 Eroi su $3'],[/^(.+) invests (\d+) Heroes$/,'$1 investe $2 Eroi'],[/^(.+) harvests (\d+) Heroes from (\d+) invested$/,'$1 raccoglie $2 Eroi da $3 investiti'],
[/^🐍 Loki appears: Loki, (.+) — (.+)$/,(m,a,b)=>'🐍 Appare Loki: Loki, '+a+' — '+(IT_EXACT[b]||b)],[/^🐍 (\d+) Loki cards are in play: Loki triumphs, everyone loses!$/,'🐍 $1 carte Loki sono in gioco: Loki trionfa, tutti perdono!'],
[/^(.+) discards (.+) \(Loki\)$/,'$1 scarta $2 (Loki)'],[/^(.+) draws 1 card less \(Loki\)$/,'$1 pesca 1 carta in meno (Loki)'],[/^(.+) gets (\d+) Hero(es)? \(\+(\d+) Strength\)$/,'$1 riceve $2 Eroi (+$4 Forza)'],
[/^(.+) is lost to Loki$/,'$1 viene perso a favore di Loki'],[/^(.+) discarded by Loki$/,'$1 scartato/i da Loki'],[/^(.+) moves (.+) from Valhalla to banished \(Loki\)( \+(\d+) Heroes)?$/,(m,a,b,c,d)=>a+' sposta '+b+' dal Valhalla alle carte bandite (Loki)'+(d?' +'+d+' Eroi':'')],
[/^(.+) discards their hand and draws a new one \(Loki\)$/,'$1 scarta la mano e ne pesca una nuova (Loki)'],
[/^(.+) sings the Song of Heroes$/,'$1 intona il Canto degli Eroi'],[/^(.+) uses (.+)$/,'$1 usa $2'],
// frammenti di parole (per ultimi)
[/\bHeroes\b/g,'Eroi'],[/\bHero\b/g,'Eroe'],[/\bVP\b/g,'PV']
];IT_RX.slice(-3).forEach(x=>x[0].post=true);
// Pagina delle regole e riepilogo del round
function rulesHTML_it(){return`<div class="rl notr"><h2>📜 Ragnarök — Regole complete</h2>
<div class=box><b>Scopo del gioco.</b> Impersoni un dio di Asgard e affronti le Creature del Ragnarök per 7 round. Manda carte nel Valhalla, sconfiggi Creature e proteggi i Mondi per totalizzare più Punti Vittoria (PV) possibile. Gli Eroi sono la moneta del gioco: li guadagni con le tue carte e li spendi per tutto il resto.</div>
<h3>1. Preparazione</h3><ul>
<li>Ogni giocatore sceglie un dio e prende il suo mazzo di 13 carte (la carta dio + 12 carte) e la sua carta punteggio. Mescola il tuo mazzo e pesca <b>4 carte</b>.</li>
<li>Ogni giocatore inizia con il numero di Eroi indicato sulla sua carta punteggio (Baldr 4, Freyja 4, Odin 4, Tyr 4, Freyr 3, Frigg 2, Heimdall 2, Thor 2).</li>
<li>Mescola le Creature e i Mondi. Forma <b>3 file</b>: un Mondo al centro con <b>2 Creature per lato</b>.</li>
<li><b>Frigg</b> si prepara in modo diverso: pesca 2 carte (non Frigg), bandiscine una (+2 Eroi), rimescola l’altra nel mazzo, poi pesca 4 carte.</li></ul>
<h3>2. Le carte</h3><ul>
<li><b>Tipi:</b> Personaggio (blu), Oggetto (giallo), Evento (rosso). <b>Tag</b> (in alto a sinistra): ${tagsNamed('it')}. Una carta con due icone di tag uguali conta doppio.</li>
<li><b>Costo</b> (in basso a sinistra): gli Eroi da pagare per mandare la carta nel Valhalla.</li>
<li><b>Effetto</b> (in basso): ciò che la carta ti dà quando viene giocata (Eroi, +1 Attacco, sblocco…).</li>
<li><b>PV</b> (pergamena, in alto a destra): i punti segnati a fine partita se la carta è nel tuo Valhalla. «2 × Guerriero» = 2 PV per ogni icona Guerriero che possiedi.</li>
<li><b>Icone di riduzione</b> (in alto al centro): una volta che la carta è nel tuo Valhalla, ogni icona riduce di 1 Eroe il costo di tutto ciò che le corrisponde (un tipo di Creatura, le Creature Élite, un tipo di carta, un tag, la protezione di un Mondo…). Due icone uguali = −2.</li>
<li><b>Le carte dio</b> vengono sempre giocate: non possono mai essere messe da parte, mandate nel Valhalla né bandite.</li></ul>
<h3>3. Svolgimento di un round (7 round)</h3>
<p><b>A. Scegliere e giocare.</b> Tutti i giocatori scelgono contemporaneamente <b>1 carta da mettere da parte</b>. Le altre 3 vengono <b>giocate</b>: applica i loro effetti (Eroi, attacchi, sblocchi…) e il potere del tuo dio se è tra queste. Le carte giocate vanno nella tua pila degli scarti.</p>
<p><b>B. La carta messa da parte</b> — a scelta:</p><ul><li><b>Valhalla:</b> paga il suo costo (dopo le riduzioni). Resta davanti a te fino alla fine della partita: i suoi PV contano alla fine e le sue icone di riduzione lavorano per te.</li><li><b>Bandire:</b> guadagni <b>2 Eroi</b>. La carta esce dal gioco (alcune carte e alcuni dei usano le carte bandite).</li></ul>
<p><b>C. Combattimento</b>, in ordine di priorità. Ogni giocatore ha <b>1 attacco</b>, più gli attacchi extra dati dalle sue carte.</p><ul>
<li>Puoi attaccare solo una Creatura <b>accessibile</b>: la Creatura più esterna su ciascun lato di ogni Mondo (salvo un effetto di sblocco che ti permette di attaccare qualsiasi Creatura).</li>
<li>Paga la sua <b>Forza</b> in Eroi, meno le tue riduzioni. La Creatura va nella tua pila punteggio (i suoi PV contano alla fine).</li>
<li>Le Creature <b>Élite</b> (stella viola) sono più forti e spesso valgono di più.</li>
<li>Quando un lato di un Mondo <b>non ha più Creature</b>, il Mondo viene <b>liberato</b>: va nella zona dei Mondi liberati e un nuovo Mondo con nuove Creature lo sostituisce.</li>
<li><b>Proteggere un Mondo:</b> una volta per round, puoi prendere un Mondo liberato. Il suo costo = la sua soglia − il numero di simboli corrispondenti che possiedi (indicati sul Mondo) − le tue riduzioni sui Mondi. Un Mondo protetto vale i suoi PV.</li></ul>
<p><b>D. Fine del round.</b> Ogni giocatore riporta la mano a 4 carte (rimescola gli scarti quando il mazzo è vuoto). La priorità passa al giocatore successivo.</p>
<p><b>Mulligan:</b> una volta per partita, prima di scegliere la tua carta, puoi scartare le tue 4 carte e pescarne 4 nuove.</p>
<h3>4. Gli dei</h3><table><tr><th>Dio</th><th>Potere quando viene giocato</th><th>Carta punteggio</th></tr>
<tr><td><b>Baldr</b>, Dio della Luce</td><td>+2 Eroi. <b>Luminoso</b>: una volta che Baldr è nel tuo Valhalla, una volta per turno, prima di combattere o di proteggere: con 1+ Gloria guadagni 2 Eroi; con 3+ Gloria sconfiggi gratis una Creatura accessibile non Élite; con 5+ Gloria anche una Élite.</td><td>5 × serie completa Personaggio + Oggetto + Evento</td></tr>
<tr><td><b>Freyja</b>, Dea dell’Amore</td><td>+1 Eroe e, in base ai tuoi Personaggi nel Valhalla: 1+ → +1 Eroe, 2+ → +1 Attacco, 3+ → sblocco (attaccare qualsiasi Creatura).</td><td>5 × serie completa Gigante + Bestia + Non morto</td></tr>
<tr><td><b>Freyr</b>, Dio della Prosperità</td><td>+1 Eroe e <b>Prosperità</b>: metti fino a 5 Eroi sulla tua carta punteggio; alla fine del tuo turno riprendili e guadagnane altrettanti.</td><td>2 × Eroi rimasti (max 6)</td></tr>
<tr><td><b>Frigg</b>, Regina degli Asi</td><td><b>Telaio</b>: guadagni 2 Eroi, oppure rimetti gratis una delle tue carte bandite nel tuo Valhalla.</td><td>4 × il tuo tipo di carta più numeroso</td></tr>
<tr><td><b>Heimdall</b>, Guardiano dei Mondi</td><td>+1 Eroe e, in questo round, ogni costo legato a un tag ${tagsIcons()} è ridotto di 1.</td><td>2 × tag diversi</td></tr>
<tr><td><b>Odin</b>, Padre di tutti</td><td><b>L’occhio di Odino</b> (prima di mettere da parte una carta): scarta 1 carta, poi pescane 2.</td><td>4 × Mondo protetto</td></tr>
<tr><td><b>Thor</b>, Dio del Tuono</td><td>+2 Eroi e, in questo round, la Forza delle Creature Élite è ridotta di 1 per ogni Equipaggiamento che possiedi.</td><td>3 × Creatura Élite</td></tr>
<tr><td><b>Tyr</b>, Dio della Guerra</td><td>+2 Eroi e, in questo round, la Forza di ogni Creatura è ridotta di 1 per ogni Creatura dello stesso tipo che hai sconfitto.</td><td>2 × il tuo tipo di Creatura più numeroso</td></tr></table>
<h3>5. Fine della partita e punteggio</h3><p>Dopo il round 7, somma: i PV delle tue carte nel Valhalla + i PV delle Creature sconfitte + i PV dei Mondi protetti + la tua carta punteggio (+ i Loki sconfitti con l’espansione). Vince il totale più alto; in caso di parità vince il giocatore con più Eroi rimasti.</p>
<h3>6. 🐍 Espansione Loki (facoltativa)</h3><ul>
<li>Mescola le 15 carte Loki. Rivelane una all’inizio della partita, poi <b>una in più per ogni Mondo liberato</b>.</li>
<li>Se <b>4 Loki</b> sono in gioco contemporaneamente, <b>Loki vince e tutti i giocatori perdono</b>.</li>
<li>Un Loki si combatte come una Creatura (1 attacco, Forza in Eroi, riduzioni Élite e di tag applicate). Una volta sconfitto, il suo effetto termina e ti dà i suoi PV.</li>
<li>Tre tipi di effetto: <b>Istantaneo</b> (quando appare), <b>Permanente</b> (finché è in gioco), <b>Quando viene sconfitto</b> (per il giocatore che lo sconfigge).</li>
<li><b>The Bound God</b> può essere sconfitto solo se è l’ultimo Loki in gioco.</li></ul></div>`}
function turnHTML_it(){const st=(n,t,b)=>`<div class=step><div class=n>${n}</div><div><b>${t}</b><br>${b}</div></div>`;
 return`<div class="rl notr"><h2>🧭 Riepilogo del round</h2><div class=box>
 ${st(1,'Scegli una carta da mettere da parte','Tra le tue 4 carte, mettine 1 da parte (mai la tua carta dio). <i>Mulligan una volta per partita: scarta le tue 4 carte e pescane 4.</i> <b>Odin:</b> usa prima l’occhio di Odino.')}
 ${st(2,'Gioca le altre 3 carte','Applica i loro effetti: Eroi, +1 Attacco, sblocco… e il potere del tuo dio se è tra queste.')}
 ${st(3,'Valhalla o bandire','<b>Valhalla:</b> paga il costo (meno le tue riduzioni) → PV alla fine + riduzioni permanenti. <b>Bandire:</b> +2 Eroi.')}
 ${st(4,'Combattimento (in ordine di priorità)','1 attacco + i tuoi attacchi extra. Paga la Forza di una Creatura accessibile (la più esterna su ciascun lato). Poi puoi proteggere <b>1 Mondo liberato</b>.')}
 ${st(5,'Fine del round','Riporta la mano a 4 carte. La priorità passa al giocatore successivo. La partita finisce dopo il round 7.')}</div>
 <h3>Promemoria</h3><table>
 <tr><th>Eroi</th><td>Si guadagnano con le carte giocate, gli dei, il bando (+2). Si spendono per il Valhalla, le Creature e i Mondi.</td></tr>
 <tr><th>Riduzioni</th><td>Ogni icona di una carta nel Valhalla = −1 Eroe sui costi corrispondenti (due icone uguali = −2).</td></tr>
 <tr><th>Mondo liberato</th><td>Un lato senza Creature → il Mondo viene liberato e sostituito. Per proteggerlo: soglia − i tuoi simboli corrispondenti − riduzioni.</td></tr>
 <tr><th>Punteggio</th><td>Valhalla + Creature + Mondi + carta punteggio (+ Loki). Parità: più Eroi rimasti.</td></tr>
 <tr><th>🐍 Loki</th><td>1 all’inizio, +1 per ogni Mondo liberato. 4 in gioco = tutti perdono. Istantaneo / Permanente / Quando viene sconfitto.</td></tr></table></div>`}
</script>
