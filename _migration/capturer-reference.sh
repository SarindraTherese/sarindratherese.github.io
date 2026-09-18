#!/usr/bin/env bash
# ÉTAPE 0 — référence visuelle du site actuel
# ───────────────────────────────────────────
# Une capture par page, en large et en téléphone. C'est contre ces
# images qu'on comparera la version Next.js : sans elles, « est-ce
# que ça rend pareil ? » reste une impression.
#
#     bash _migration/capturer-reference.sh
set -euo pipefail
RACINE="$(cd "$(dirname "$0")/.." && pwd)"
SORTIE="$RACINE/_migration/out/reference"
mkdir -p "$SORTIE"

PAGES=(home about projects skills refuge bible finds conseils contact
       lectures-2022 lectures-2023 lectures-2024 lectures-2025 lectures-2026)
GUIDES=(classroom-of-the-elite tensura mushoku-tensei)

capture() {  # $1 url  $2 nom  $3 largeur  $4 hauteur
  google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=1 --window-size="$3,$4" \
    --virtual-time-budget=6000 --screenshot="$SORTIE/$2.png" "$1" >/dev/null 2>&1
}

n=0
for p in "${PAGES[@]}"; do
  capture "file://$RACINE/index.html#$p" "large-$p"    1280 2400
  capture "file://$RACINE/index.html#$p" "mobile-$p"    390 2400
  n=$((n+2)); printf '.'
done
for g in "${GUIDES[@]}"; do
  capture "file://$RACINE/refuge/$g.html" "large-guide-$g"  1280 2400
  capture "file://$RACINE/refuge/$g.html" "mobile-guide-$g"  390 2400
  n=$((n+2)); printf '.'
done
echo
echo "$n captures dans _migration/out/reference/"
du -sh "$SORTIE" | cut -f1 | xargs echo "poids :"
