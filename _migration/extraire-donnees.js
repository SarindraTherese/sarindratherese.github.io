/* ════════════════════════════════════════════════════════════
   ÉTAPE 0 — extraction des données vers JSON
   ────────────────────────────────────────────────────────────
   Les 452 premières lignes de main.js ne contiennent que des
   déclarations de données : aucun accès au DOM, aucun effet de
   bord. On les évalue telles quelles plutôt que de les parser —
   c'est la seule façon d'être certain de n'introduire aucune
   déformation entre le site actuel et les fichiers produits.

       node _migration/extraire-donnees.js
   ════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const SORTIE = path.join(__dirname, 'data');
const FIN_DES_DONNEES = 452;          // dernière ligne avant le routeur

const source = fs.readFileSync(path.join(RACINE, 'assets/js/main.js'), 'utf8')
  .split('\n').slice(0, FIN_DES_DONNEES).join('\n');

/* Garde-fou : si quelqu'un déplace du code dans cette zone, on
   s'arrête au lieu d'exécuter quelque chose d'inattendu. */
const interdit = /\b(document|window|fetch|localStorage)\b/;
if (interdit.test(source)) {
  console.error('Refus : la zone de données touche au navigateur. '
              + 'Vérifier FIN_DES_DONNEES.');
  process.exit(1);
}

const lire = new Function(source + `
  return { AVAILABILITY, AVAILABILITY_UPDATED, AVAILABILITY_COPY,
           DISCOVERIES, CONSEILS, GUIDES, READINGS, BIBLE, YEARS };`);
const d = lire();

/* Le carnet biblique arrive en paires [livre, date]. On le rend
   explicite : un objet nommé se relit sans compter les colonnes. */
const carnet = {
  edition: d.BIBLE.edition,
  debut:   d.BIBLE.start,
  fin:     d.BIBLE.end,
  familles:     d.BIBLE.families,
  nomsFamilles: d.BIBLE.familyNames,
  groupes:      d.BIBLE.grouped,
  entrees: d.BIBLE.entries.map(([livre, date]) => ({ livre, date }))
};

const fichiers = {
  'lectures.json':        d.READINGS,
  'carnet-biblique.json': carnet,
  'objets.json':          d.DISCOVERIES,
  'guides.json':          d.GUIDES,
  'recommandations.json': d.CONSEILS,
  'disponibilite.json':   { etat: d.AVAILABILITY,
                            miseAJour: d.AVAILABILITY_UPDATED,
                            textes: d.AVAILABILITY_COPY },
  'annees.json':          d.YEARS
};

fs.mkdirSync(SORTIE, { recursive: true });
for (const [nom, valeur] of Object.entries(fichiers)) {
  fs.writeFileSync(path.join(SORTIE, nom),
                   JSON.stringify(valeur, null, 2) + '\n', 'utf8');
  const n = Array.isArray(valeur) ? valeur.length
          : (valeur.entrees ? valeur.entrees.length : Object.keys(valeur).length);
  console.log(String(n).padStart(4) + '  ' + nom);
}

/* Contrôle : on recompte depuis le fichier écrit, pas depuis la
   mémoire. Un écart signale une écriture incomplète. */
const relu = JSON.parse(fs.readFileSync(path.join(SORTIE, 'lectures.json')));
const parAnnee = {};
relu.forEach(l => { parAnnee[l.year] = (parAnnee[l.year] || 0) + 1; });
console.log('\nLectures relues depuis le disque : ' + relu.length);
Object.keys(parAnnee).sort().forEach(a => console.log('  ' + a + ' : ' + parAnnee[a]));
const sansMois = relu.filter(l => !l.month).length;
const sansImage = relu.filter(l => !l.cover).length;
console.log('  sans mois : ' + sansMois + ' · sans couverture : ' + sansImage);
