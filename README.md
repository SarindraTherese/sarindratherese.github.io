# sarindratherese.github.io

Mon portfolio. Site statique, une seule page, aucun build : le dépôt est
exactement ce qui est servi.

En ligne : <https://sarindratherese.github.io>

## Lancer en local

```
python3 -m http.server 8000
```

Puis <http://localhost:8000>. Passer par un serveur plutôt que d'ouvrir
`index.html` en `file://` — sinon les polices Google et le formulaire de
contact ne se comportent pas comme en production.

## Ce qu'il y a dedans

```
index.html        tout le contenu ; six écrans basculés en JS, routés par ancre
assets/css/       un seul fichier, les couleurs sont en variables tout en haut
assets/js/        navigation, onglets, filtres, formulaire, graphiques
assets/img/       photo, favicon, image de partage (og-image)
assets/docs/      le CV en PDF
_design/          documents de travail, jamais publiés (voir son README)
```

## Ce que je modifie souvent

Trois constantes en tête de `assets/js/main.js`. Aucune ligne de HTML à toucher :

- **`AVAILABILITY`** — `open`, `selective` ou `closed`. Une seule valeur qui
  pilote la pastille, son libellé, le texte de la carte Contact et la ligne
  « Status » de la fiche About. Mettre `AVAILABILITY_UPDATED` à jour en même
  temps : une disponibilité périmée est pire que pas de disponibilité du tout.
- **`READINGS`** — les livres, pour la page Refuge. Ajouter `year: 2024` et ils
  se regroupent par année tout seuls, la plus récente en haut. Sans année,
  l'entrée part dans « Currently reading ».
- **`OFFERINGS`** — les séances proposées, même page, onglet Sessions.

## Comment c'est fait

HTML, CSS et JavaScript écrits à la main. Rien à installer, aucun framework.
Chart.js pour les graphiques de compétences, Formspree pour le formulaire,
Google Fonts (Instrument Sans en lecture, JetBrains Mono en titrage),
GitHub Pages pour l'hébergement.

La direction visuelle s'appelle **Blueprint** : fond quadrillé, titres en
monospace capitales, angles vifs, cadres pointillés. La palette est dérivée des
couleurs de ma photo de profil. Tout tient dans les variables CSS en tête de
`assets/css/style.css` — les changer là recolore le site entier. Le raisonnement,
les mesures de contraste et les directions écartées sont dans `_design/`.
