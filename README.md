# sarindratherese.github.io

Mon portfolio. Site statique, pas de build.

<https://sarindratherese.github.io>

## En local

```
python3 -m http.server 8000
```

## Modifier le contenu

En tête de `assets/js/main.js`, sans toucher au HTML :

- `AVAILABILITY` — `open`, `selective` ou `closed`. Pilote la pastille, la carte
  Contact et la ligne Status de l'About. Bouger `AVAILABILITY_UPDATED` avec.
- `READINGS` — les livres. `year: 2024` les regroupe par année.
- `OFFERINGS` — les séances proposées.

Les couleurs sont des variables en tête de `assets/css/style.css`.
Le choix de la direction visuelle est documenté dans `_design/`.
