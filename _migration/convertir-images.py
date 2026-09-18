#!/usr/bin/env python3
"""
ÉTAPE 0 — conversion des images
───────────────────────────────
Les 225 couvertures pèsent 32 Mo, soit 87 % du site, pour un
affichage de 125 à 180 pixels de large selon l'écran. Elles sont
donc servies cinq à sept fois plus grandes que nécessaire.

On produit trois largeurs — 1x, 2x, 3x de la plus grande carte — en
AVIF et en WebP. Les originaux ne sont pas touchés : ils restent la
source si les besoins changent.

La sortie va dans _migration/out/, hors dépôt : à l'étape 1 on
décidera si ces fichiers vivent dans Git ou dans un stockage objet.

    python3 _migration/convertir-images.py
"""
import pathlib
import sys

try:
    import pillow_avif  # noqa: F401  — enregistre l'encodeur AVIF dans Pillow
    AVIF = True
except ImportError:
    AVIF = False

from PIL import Image

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = pathlib.Path(__file__).resolve().parent / 'out' / 'img'

# Une carte de couverture fait 125 px sur grand écran et 167 px en
# deux colonnes sur téléphone. 540 couvre donc le 3x du pire cas.
LARGEURS = [180, 360, 540]
Q_AVIF, Q_WEBP = 58, 80

LOTS = [
    ('livres',      'assets/img/livres',      LARGEURS),
    ('decouvertes', 'assets/img/decouvertes', [260, 520]),
    ('portrait',    'assets/img/photo.jpg',   [320, 640]),
]


def sortir(source, dossier, largeur, extension):
    cible = SORTIE / dossier / (source.stem + '-' + str(largeur) + extension)
    cible.parent.mkdir(parents=True, exist_ok=True)
    return cible


def convertir(source, dossier, largeurs):
    """Renvoie (octets produits, nombre de fichiers). Une image plus
    petite que la largeur demandée n'est jamais agrandie."""
    try:
        image = Image.open(source)
    except Exception as erreur:
        print('  illisible : %s — %s' % (source.name, erreur))
        return 0, 0
    image = image.convert('RGB')
    octets = fichiers = 0
    vues = set()
    for largeur in largeurs:
        cible_l = min(largeur, image.width)
        if cible_l in vues:
            continue
        vues.add(cible_l)
        hauteur = round(image.height * cible_l / image.width)
        petite = image.resize((cible_l, hauteur), Image.LANCZOS)
        formats = [('.webp', dict(format='WEBP', quality=Q_WEBP, method=6))]
        if AVIF:
            formats.append(('.avif', dict(format='AVIF', quality=Q_AVIF)))
        for extension, options in formats:
            chemin = sortir(source, dossier, largeur, extension)
            petite.save(chemin, **options)
            octets += chemin.stat().st_size
            fichiers += 1
    return octets, fichiers


def main():
    if not AVIF:
        print('AVIF indisponible — sortie en WebP seul.\n')
    total_avant = total_apres = total_fichiers = 0

    for nom, relatif, largeurs in LOTS:
        chemin = RACINE / relatif
        sources = ([chemin] if chemin.is_file()
                   else sorted(p for p in chemin.rglob('*') if p.is_file()))
        if not sources:
            print('%-12s aucun fichier' % nom)
            continue
        avant = sum(p.stat().st_size for p in sources)
        apres = fichiers = 0
        for source in sources:
            sous = nom + '/' + source.parent.name if source.parent != chemin else nom
            o, f = convertir(source, sous, largeurs)
            apres += o
            fichiers += f
        print('%-12s %3d sources · %5.1f Mo  →  %4d fichiers, %d largeurs × %d formats'
              % (nom, len(sources), avant / 1048576, fichiers,
                 len(largeurs), 2 if AVIF else 1))
        total_avant += avant
        total_apres += apres
        total_fichiers += fichiers

    # Comparer 225 originaux à 1 346 dérivés n'aurait aucun sens :
    # un visiteur ne télécharge qu'une largeur, dans un seul format.
    livres = SORTIE / 'livres'
    origine = sum(p.stat().st_size for p in (RACINE / 'assets/img/livres').rglob('*')
                  if p.is_file())
    if origine and livres.exists():
        print('\nCe qu'"'"'un visiteur télécharge réellement, couvertures seules :')
        print('  origine                     %6.1f Mo' % (origine / 1048576))
        for largeur, densite in zip(LARGEURS, ('1x', '2x', '3x')):
            a = sum(f.stat().st_size for f in livres.rglob('*-%d.avif' % largeur))
            w = sum(f.stat().st_size for f in livres.rglob('*-%d.webp' % largeur))
            if not (a or w):
                continue
            ref = a or w
            print('  %3d px (%s)   AVIF %5.1f Mo   WebP %5.1f Mo   −%d %%'
                  % (largeur, densite, a / 1048576, w / 1048576,
                     round(100 * (1 - ref / origine))))
        print('  Et encore : ce total suppose les cinq années visitées d'"'"'affilée.')
    print('\n%d fichiers écrits dans %s'
          % (total_fichiers, SORTIE.relative_to(RACINE)))


if __name__ == '__main__':
    sys.exit(main())
