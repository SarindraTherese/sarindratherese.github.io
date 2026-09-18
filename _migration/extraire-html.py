#!/usr/bin/env python3
"""
ÉTAPE 0 — extraction des projets et des compétences depuis index.html
─────────────────────────────────────────────────────────────────────
Ces deux sections sont les seules écrites en dur dans le HTML. Elles
en sortent ici sans être modifiées dans le fichier d'origine : le site
actuel continue de tourner à l'identique.

    python3 _migration/extraire-html.py
"""
import html
import json
import pathlib
import re
import sys

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = pathlib.Path(__file__).resolve().parent / 'data'
SOURCE = (RACINE / 'index.html').read_text(encoding='utf-8')


def texte(brut):
    """Retire le balisage et rend les entités. Les espaces multiples
    d'indentation deviennent une espace simple."""
    sans = re.sub(r'<[^>]+>', '', brut)
    return re.sub(r'\s+', ' ', html.unescape(sans)).strip()


def bloc(depart, arrivee):
    i = SOURCE.index(depart)
    return SOURCE[i:SOURCE.index(arrivee, i)]


# ── Projets ──────────────────────────────────────────────────────────
zone = bloc('id="page-projects"', 'id="page-skills"')
vedettes = zone[:zone.index('proj-grid-v2')] if 'proj-grid-v2' in zone else zone

projets = []
for m in re.finditer(r'<article class="proj-card-v2" data-cat="(\w+)">(.*?)</article>',
                     zone, re.S):
    cat, corps = m.group(1), m.group(2)
    flux = [texte(n) for n in re.findall(r'<span class="pnode[^"]*">(.*?)</span>', corps, re.S)]
    puces = [texte(li) for li in re.findall(r'<li>(.*?)</li>', corps, re.S)]
    pile = [texte(t) for t in re.findall(r'<span class="ptag">(.*?)</span>', corps, re.S)]

    def prem(motif):
        r = re.search(motif, corps, re.S)
        return texte(r.group(1)) if r else None

    impact = prem(r'<div class="pcv2-impact">(.*?)</div>')
    if impact:
        impact = re.sub(r'^Impact\s*', '', impact)

    projets.append({
        'categorie': {'ai': 'Generative AI', 'de': 'Data Engineering',
                      'an': 'Analytics'}.get(cat, cat),
        'code': cat,
        'vedette': m.start() < len(vedettes),
        'titre': prem(r'<h3 class="pcv2-title">(.*?)</h3>'),
        'periode': prem(r'<span class="pcv2-date">(.*?)</span>'),
        'contexte': prem(r'<p class="pcv2-context">(.*?)</p>'),
        'architecture': flux,
        'points': puces,
        'impact': impact,
        'technologies': pile,
    })

# ── Compétences ──────────────────────────────────────────────────────
zone = bloc('id="page-skills"', 'id="page-refuge"')

familles = [{'famille': texte(a),
             'entrees': [texte(li) for li in re.findall(r'<li>(.*?)</li>', b, re.S)]}
            for a, b in re.findall(
                r'<div class="scat-title">(.*?)</div>\s*<ul class="scat-list">(.*?)</ul>',
                zone, re.S)]

# Les barres sont groupées sous un titre de carte. On découpe sur le
# marqueur d'ouverture : chercher la fermeture ferait tomber la borne
# sur le premier </div> venu, à l'intérieur de la première barre.
MARQUEUR = '<div class="skill-bars-card">'
groupes = []
morceaux = zone.split(MARQUEUR)[1:]
for morceau in morceaux:
    titre = re.search(r'<h4[^>]*>(.*?)</h4>|<div class="[^"]*title[^"]*">(.*?)</div>',
                      morceau, re.S)
    lignes = [{'libelle': texte(a), 'pourcentage': int(b)}
              for a, b in re.findall(
                  r'<div class="bar-top"><span>(.*?)</span>.*?data-w="(\d+)"',
                  morceau, re.S)]
    if lignes:
        groupes.append({'groupe': texte(titre.group(1) or titre.group(2)) if titre else None,
                        'barres': lignes})

# Repli : si le découpage par carte échoue, on prend toutes les barres à plat.
if not groupes:
    plat = [{'libelle': texte(a), 'pourcentage': int(b)}
            for a, b in re.findall(
                r'<div class="bar-top"><span>(.*?)</span>.*?data-w="(\d+)"', zone, re.S)]
    groupes = [{'groupe': None, 'barres': plat}] if plat else []

# Les graphiques répètent les mêmes chiffres, mais dans main.js.
js = (RACINE / 'assets/js/main.js').read_text(encoding='utf-8')


def serie(appel):
    m = re.search(appel + r"\s*,?\s*\n?\s*\[(.*?)\],\s*\[(.*?)\]", js, re.S)
    if not m:
        return []
    noms = re.findall(r"'([^']*)'", m.group(1))
    vals = [int(v) for v in re.findall(r'\d+', m.group(2))]
    return [{'libelle': n, 'pourcentage': v} for n, v in zip(noms, vals)]


radar = re.search(r"labels: \[([^\]]*)\],\s*\n\s*datasets: \[\{"
                  r"[^}]*?data: \[([^\]]*)\]", js, re.S)
graphiques = {
    'radar': [{'libelle': n, 'pourcentage': v} for n, v in zip(
        re.findall(r"'([^']*)'", radar.group(1)),
        [int(v) for v in re.findall(r'\d+', radar.group(2))])] if radar else [],
    'barres1': serie(r"bar\(document\.getElementById\('barChart1'\)"),
    'barres2': serie(r"bar\(document\.getElementById\('barChart2'\)"),
}

competences = {'familles': familles, 'groupes': groupes, 'graphiques': graphiques}

# ── Écriture, puis relecture depuis le disque ────────────────────────
SORTIE.mkdir(parents=True, exist_ok=True)
for nom, valeur in (('projets.json', projets),
                    ('competences.json', competences)):
    (SORTIE / nom).write_text(json.dumps(valeur, ensure_ascii=False, indent=2) + '\n',
                              encoding='utf-8')

relus = json.loads((SORTIE / 'projets.json').read_text(encoding='utf-8'))
print('%4d  projets.json' % len(relus))
for p in relus:
    manque = [c for c in ('titre', 'periode', 'contexte') if not p[c]]
    print('      %-3s %-52s %2d points%s'
          % (p['code'], (p['titre'] or '?')[:52], len(p['points']),
             '  ← incomplet : ' + ', '.join(manque) if manque else ''))

c = json.loads((SORTIE / 'competences.json').read_text(encoding='utf-8'))
n_fam = sum(len(f['entrees']) for f in c['familles'])
n_bar = sum(len(g['barres']) for g in c['groupes'])
print('%4d  competences.json' % (n_fam + n_bar))
print('      %d familles, %d entrées listées' % (len(c['familles']), n_fam))
for g in c['groupes']:
    print('      barres — %-22s %d' % (g['groupe'] or 'sans titre', len(g['barres'])))
for k, v in c['graphiques'].items():
    print('      graphique %-8s %d valeurs' % (k, len(v)))

# Les graphiques rejouent des chiffres déjà présents dans les barres.
plat = {b['libelle']: b['pourcentage'] for g in c['groupes'] for b in g['barres']}
doublons = [(e['libelle'], e['pourcentage']) for k in ('barres1', 'barres2')
            for e in c['graphiques'][k]
            if any(e['libelle'].lower() in l.lower() for l in plat)]
if doublons:
    print('\n      %d valeurs répétées entre les barres HTML et les graphiques JS.'
          % len(doublons))
    print('      Source unique à la clé une fois la migration faite.')

if not projets or not familles:
    sys.exit('Extraction vide : le balisage a changé.')
