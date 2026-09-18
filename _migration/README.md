# Migration vers Next.js + FastAPI

Étape 0 — préparation. **Le site actuel n'est pas modifié.** Tout ce qui
est ici est soit une extraction de l'existant, soit un outil pour la
produire.

## Les données

`data/` contient l'intégralité du contenu du site, en JSON.

| fichier | contenu |
|---|---|
| `lectures.json` | 225 livres — année, mois, titre, auteur, couverture |
| `carnet-biblique.json` | 63 jours, les sept familles, les dates du défi |
| `objets.json` | Testé et adopté |
| `guides.json` | les trois guides de personnages |
| `recommandations.json` | vide, la section n'est pas encore écrite |
| `projets.json` | 7 projets, jusqu'ici figés dans `index.html` |
| `competences.json` | 6 familles, 15 barres chiffrées, 3 séries de graphiques |
| `disponibilite.json` | statut et textes associés |
| `annees.json` | les années couvertes |

## Les outils

```
node   _migration/extraire-donnees.js    # main.js  → data/*.json
python3 _migration/extraire-html.py      # index.html → projets, compétences
python3 _migration/convertir-images.py   # 225 couvertures → AVIF + WebP
bash   _migration/capturer-reference.sh  # 34 captures du site actuel
```

Les quatre sont **rejouables** : ils relisent la source et réécrivent la
sortie. Tant que l'étape 1 n'est pas faite, `main.js` reste la référence
et ces fichiers se régénèrent.

## Ce qui n'est pas versionné

`out/` — images converties et captures de référence. Régénérable en une
commande, et 1 366 fichiers dérivés n'ont rien à faire dans l'historique
Git. L'emplacement définitif des images se décidera à l'étape 1 : dépôt
ou stockage objet.

## Deux choses relevées au passage

**Les pourcentages de compétences sont écrits deux fois** — dans les
barres HTML et à nouveau dans le code des graphiques de `main.js`.
Dix valeurs en double. À ramener à une source unique.

**Les couvertures sont servies cinq à sept fois trop grandes.** Une carte
fait 125 px sur grand écran, 167 px en deux colonnes sur téléphone, et
l'image d'origine fait 927 px de large en médiane.
