/* ============================================================
   SARINDRA THERESE RANDRIAMBELOSON — Portfolio
   assets/js/main.js
   ============================================================ */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. DISPONIBILITÉ — source unique de vérité
   ────────────────────────────────────────────────────────────
   Change UNIQUEMENT la valeur ci-dessous. Tout le site suit :
   la pastille, le libellé, le texte de la carte, la bannière
   « Interested in working together? », et la date de mise à jour.

     'open'      → ouverte aux opportunités
     'selective' → pas en recherche active, mais joignable
     'closed'    → indisponible pour le moment
   ════════════════════════════════════════════════════════════ */
/* Le jour où Sarindra a commencé à tenir sa liste. La première
   lecture de 2022 est notée en avril : les deux concordent. */
const LITERARY_START = '2022-04-12';

/* Les livres qu'elle possède, pas ceux qu'elle a lus : les deux
   nombres sont proches et se confondraient sans cette distinction. */
const PHYSICAL_BOOKS = 261;

/* Deux marathons relevés dans son suivi. Le nombre de pages est la
   somme des relevés quotidiens, jamais une estimation :
     Seigneur des anneaux — 1–5, 9–13 et 17–21 novembre 2024
     Karamazov            — 13 au 29 août 2024, 17 relevés
   Le calendrier du premier couvre trois semaines, mais ce sont bien
   quinze jours de lecture : ne pas « corriger » ce chiffre. */
/* La liseuse : date d'acquisition, bibliothèque embarquée, et ce qui
   y a été lu. Les 86 ne se soustraient pas des 225 lectures — ce sont
   deux comptes distincts, l'un par support, l'autre par livre. */
const LISEUSE = {
  modele: 'Kindle girlie',
  depuis: '2024-12-14',
  ebooks: 2300,
  lus:    86
};

const PROUESSES = [
  { quoi: 'Les trois tomes du Seigneur des anneaux', pages: 1780, jours: 15 },
  { quoi: 'Les frères Karamazov, Dostoïevski',       pages: 1195, jours: 17 }
];

const AVAILABILITY = 'selective';
const AVAILABILITY_UPDATED = '2026-09';   // AAAA-MM — à mettre à jour avec le statut

const AVAILABILITY_COPY = {
  open: {
    label: 'Available for new opportunities',
    text:  'I’m open to freelance missions, consulting and roles in Data Analytics, Data Engineering or Generative AI.',
    tone:  'ok'
  },
  selective: {
    label: 'Not actively looking',
    text:  'I’m currently engaged on a project and not actively looking. I’m still glad to talk about interesting data and AI work — just get in touch.',
    tone:  'sand'
  },
  closed: {
    label: 'Currently unavailable',
    text:  'My schedule is full at the moment and I’m not taking on new work. Feel free to write anyway — I’ll reply when things open up.',
    tone:  'muted'
  }
};

/* ════════════════════════════════════════════════════════════
   2. OFF SCREEN — lectures et séances proposées
   ────────────────────────────────────────────────────────────
   Ajouter une entrée = ajouter un objet dans le tableau.
   Aucun HTML à toucher. Les entrées s'affichent dans l'ordre
   du tableau — mets la plus récente en premier.

   READINGS — un livre lu, une ligne.
   L'année range le livre sur la bonne étagère (#lectures-2023).
     { year: 2023, title: '…', author: '…', cover: 'le-petit-prince.jpg' }

   La couverture se cherche dans assets/img/livres/<année>/<cover>.
   Le fichier peut ne pas exister : la carte affiche alors son titre
   en tranche typographique. Poser l'image au bon nom suffit à la
   faire apparaître — il n'y a rien à changer ici.

   `author` est facultatif : mieux vaut pas d'auteur qu'un faux.
   ════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════
   DISCOVERIES — testé et adopté.
   Un objet acheté, essayé, et gardé. Ce qui n'a pas tenu n'a rien
   à faire ici : c'est ce tri qui donne sa valeur à la liste.
     { name:  'Kindle',
       kind:  'Liseuse',              // la catégorie, en deux mots
       note:  'Pourquoi c’en est une belle.',   // tes mots, 1 à 3 phrases
       image: 'kindle.jpg',           // dans assets/img/decouvertes/
       url:   'https://…' }           // facultatif

   `note`, `image` et `url` peuvent manquer : la carte s'adapte.
   ════════════════════════════════════════════════════════════ */
const DISCOVERIES = [
  { name: 'Kindle', image: 'kindle.jpg' },
  { name: 'Page turner', image: 'Pink Page Turner.jpg' },
  { name: 'Phone holder', image: 'Phone holder.png' },
  { name: 'Bablov', image: 'bablov.jpeg' },
  { name: 'Vanow', image: 'vanow.png' },
  { name: 'Walnut Sesame and Black Bean Powder',
    image: 'walnut-sesame-black-bean-powder.webp' },
  { name: 'Nescafé', image: 'nescafe.webp' },
];


/* ════════════════════════════════════════════════════════════
   GUIDES — les astuces pour ne pas se perdre.
   Lire un light novel japonais, c'est d'abord retenir qui est qui :
   des dizaines de noms, deux ordres possibles (Ayanokōji Kiyotaka
   ou Kiyotaka Ayanokōji) et des romanisations qui varient d'une
   traduction à l'autre. Chaque guide est une page à part, avec sa
   recherche et ses sections repliées tant qu'on n'y est pas arrivé.
     { title: '…', lead: '…', meta: '…', href: 'refuge/….html' }
   ════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════
   CONSEILS — mes favoris et recommandations, rangés par dossier.
   Un dossier par type de contenu. Chaque entrée dit pourquoi elle est
   là, et porte un lien quand la ressource est en ligne.
     { id: 'articles', nom: 'Articles & lectures web',
       lead: 'À quoi sert ce dossier, en une phrase.',
       items: [ { titre: '…', par: '…', pourquoi: '…', url: 'https://…' } ] }

   `par` et `pourquoi` sont facultatifs. Avec `url`, le titre devient un
   lien qui s'ouvre dans un nouvel onglet ; sans, il reste du texte.
   Un dossier sans entrée s'affiche quand même : il annonce ce qui vient.

   Une entrée qui porte `image` rejoint le mur d'affiches au lieu de la
   liste ; les deux peuvent coexister dans un même dossier.
       image: 'goblin.webp'   // dans assets/img/dramas/
       large: true            // visuel horizontal : il prend deux colonnes
       etat:  'En cours'      // pastille posée sur l'image
   `large` décrit le format du fichier, pas un choix de mise en page : une
   affiche verticale l'omet. En cas d'oubli, le rendu se corrige tout seul
   à l'affichage de l'image — mais la grille aura sauté une fois.
   ════════════════════════════════════════════════════════════ */
const CONSEILS = [
  { id: 'livres',  nom: 'Livres', icone: 'i-book',
    lead: 'Les livres que j\'ai vraiment aimés et que je pourrais recommander '
        + 'sans hésiter.',
    items: [
      /* ── 2022 ── */
      { an: 2022, titre: 'La clé de votre énergie',
        par: 'Natacha Calestrémé',
        image: 'livres/2022/La cle de votre energie.jpg' },
      { an: 2022, titre: 'Père riche, père pauvre',
        par: 'Robert Kiyosaki',
        image: 'livres/2022/Père riche, père pauvre .jpg' },
      { an: 2022, titre: 'L\'homme qui voulait être heureux',
        par: 'Laurent Gounelle',
        image: 'livres/2022/L\'homme qui voulait être heureux.jpg' },
      { an: 2022, titre: 'Ta deuxième vie commence quand tu comprends que tu n\'en as qu\'une',
        par: 'Raphaëlle Giordano',
        image: 'livres/2022/Ta deuxième vie commence quand tu comprends que tu n\'en as qu\'une.jpg' },
      { an: 2022, titre: 'L\'Alchimiste',
        par: 'Paulo Coelho',
        image: 'livres/2022/L\'Alchimiste.jpg' },
      { an: 2022, titre: 'La puissance de l\'acceptation',
        par: 'Lise Bourbeau',
        image: 'livres/2022/La Puissance de l\'acceptation.jpg' },
      { an: 2022, titre: 'Les 5 blessures',
        par: 'Lise Bourbeau',
        image: 'livres/2022/Les 5 blessures.jpg' },
      { an: 2022, titre: 'Les mots sont des fenêtres',
        par: 'Marshall Rosenberg',
        image: 'livres/2022/Les mots sont des fenêtres.jpg' },
      { an: 2022, titre: 'Kilomètre zéro',
        par: 'Maud Ankaoua',
        image: 'livres/2022/Kilomètre zéro.jpg' },
      { an: 2022, titre: 'Réfléchissez et devenez riche',
        par: 'Napoleon Hill',
        image: 'livres/2022/reflechissez et devenez riche.jpg' },
      { an: 2022, titre: 'Écoute ton corps',
        par: 'Lise Bourbeau',
        image: 'livres/2022/Écoute ton corps: La responsabilité, l\'engagement & la culpabilité.jpg' },
      { an: 2022, titre: 'Les quatre accords toltèques',
        par: 'Don Miguel Ruiz',
        image: 'livres/2022/Les quatre accords toltèques.jpg' },
      { an: 2022, titre: 'À la croisée des mondes',
        par: 'Philip Pullman',
        image: 'livres/2022/À la croisée des mondes.jpg' },
      /* ── 2023 ── */
      { an: 2023, titre: 'Devenir',
        par: 'Michelle Obama',
        image: 'livres/2023/Devenir.jpg' },
      { an: 2023, titre: 'Transformez votre vie',
        par: 'Louise Hay',
        image: 'livres/2023/Transformez votre vie.jpg' },
      { an: 2023, titre: 'Orgueil et préjugés',
        par: 'Jane Austen',
        image: 'livres/2023/Orgueil et préjugés.jpg' },
      { an: 2023, titre: 'Oser',
        par: 'Frédéric Fanget',
        image: 'livres/2023/oser.jpg' },
      { an: 2023, titre: 'Conversations avec Dieu, tome 1',
        par: 'Neale Donald Walsch',
        image: 'livres/2023/Conversations avec Dieu, tome 1.jpg' },
      { an: 2023, titre: 'Jamais plus',
        par: 'Colleen Hoover',
        image: 'livres/2023/Jamais plus.jpg' },
      { an: 2023, titre: 'Il est grand temps de rallumer les étoiles',
        par: 'Virginie Grimaldi',
        image: 'livres/2023/Il est grand temps de rallumer les étoiles.jpg' },
      { an: 2023, titre: 'Nos étoiles contraires',
        par: 'John Green',
        image: 'livres/2023/Nos étoiles contraires.jpg' },
      { an: 2023, titre: 'L\'estime de soi',
        par: 'Christophe André et François Lelord',
        image: 'livres/2023/L\'estime de soi.jpg' },
      { an: 2023, titre: 'Onze minutes',
        par: 'Paulo Coelho',
        image: 'livres/2023/Onze minutes.jpg' },
      { an: 2023, titre: 'Steve Jobs',
        par: 'Walter Isaacson',
        image: 'livres/2023/Steve Jobs.jpg' },
      { an: 2023, titre: 'Comment se faire des amis',
        par: 'Dale Carnegie',
        image: 'livres/2023/Comment se faire des amis.jpg' },
      { an: 2023, titre: 'Méditer, jour après jour',
        par: 'Christophe André',
        image: 'livres/2023/Méditer, jour après jour.jpg' },
      { an: 2023, titre: 'Harry Potter à l\'école des sorciers',
        par: 'J. K. Rowling',
        image: 'livres/2023/Harry Potter à l\'école des sorciers.jpg' },
      { an: 2023, titre: 'La ferme des animaux',
        par: 'George Orwell',
        image: 'livres/2023/La ferme des animaux.jpg' },
      { an: 2023, titre: 'Imparfaits, libres et heureux',
        par: 'Christophe André',
        image: 'livres/2023/Imparfaits, libres et heureux.jpg' },
      /* ── 2024 ── */
      { an: 2024, titre: 'Les impatientes',
        par: 'Djaïli Amadou Amal',
        image: 'livres/2024/Les impatientes.jpg' },
      { an: 2024, titre: 'Numéro deux',
        par: 'David Foenkinos',
        image: 'livres/2024/Numéro deux.jpg' },
      { an: 2024, titre: 'Plus rien ne pourra me blesser',
        par: 'David Goggins',
        image: 'livres/2024/Plus rien ne pourra me blesser.jpg' },
      { an: 2024, titre: 'Je revenais des autres',
        par: 'Mélissa Da Costa',
        image: 'livres/2024/Je revenais des autres.jpg' },
      { an: 2024, titre: 'The Subtle Art of Not Giving a F*ck',
        par: 'Mark Manson',
        image: 'livres/2024/The Subtle Art of Not Giving a F*ck.jpg' },
      { an: 2024, titre: 'Des fleurs pour Algernon',
        par: 'Daniel Keyes',
        image: 'livres/2024/Des fleurs pour Algernon.jpg' },
      { an: 2024, titre: 'Les douleurs fantômes',
        par: 'Mélissa Da Costa',
        image: 'livres/2024/Les douleurs fantômes.jpg' },
      { an: 2024, titre: 'Le premier jour du reste de ma vie',
        par: 'Virginie Grimaldi',
        image: 'livres/2024/Le premier jour du reste de ma vie.jpg' },
      { an: 2024, titre: 'Tu comprendras quand tu seras plus grande',
        par: 'Virginie Grimaldi',
        image: 'livres/2024/Tu comprendras quand tu seras plus grande.jpg' },
      { an: 2024, titre: 'L\'éveil de votre puissance intérieure',
        par: 'Anthony Robbins',
        image: 'livres/2024/L\'éveil de votre puissance intérieure.jpg' },
      { an: 2024, titre: 'Bilbo le Hobbit',
        par: 'J. R. R. Tolkien',
        image: 'livres/2024/Bilbo le Hobbit.jpg' },
      { an: 2024, titre: 'Les frères Karamazov',
        par: 'Fiodor Dostoïevski',
        image: 'livres/2024/Les frères Karamazov.jpg' },
      { an: 2024, titre: 'Le seigneur des anneaux, tome 1 : La communauté de l\'anneau',
        par: 'J. R. R. Tolkien',
        image: 'livres/2024/Le seigneur des anneaux, tome 1 : La communauté de l\'anneau.jpg' },
      { an: 2024, titre: 'Le seigneur des anneaux, tome 2 : Les deux tours',
        par: 'J. R. R. Tolkien',
        image: 'livres/2024/Le seigneur des anneaux, tome 2 : Les deux tours.jpg' },
      { an: 2024, titre: 'Le seigneur des anneaux, tome 3 : Le retour du roi',
        par: 'J. R. R. Tolkien',
        image: 'livres/2024/Le seigneur des anneaux, tome 3 : Le retour du roi.jpg' },
      /* ── 2025 ── */
      { an: 2025, titre: 'Le journal d\'Anne Frank',
        par: 'Anne Frank',
        image: 'livres/2025/Le journal d\'Anne Frank.jpg' },
      { an: 2025, titre: 'Le(s) vrai(es) amour(s)',
        par: 'Taylor Jenkins Reid',
        image: 'livres/2025/Le(s) vrai(es) amour(s).jpg' },
      { an: 2025, titre: 'Les sept maris d\'Evelyn Hugo',
        par: 'Taylor Jenkins Reid',
        image: 'livres/2025/Les sept maris d\'Evelyn Hugo.jpg' },
      { an: 2025, titre: 'Ce que j\'aimerais te dire',
        par: 'Emeric Lebreton',
        image: 'livres/2025/Ce que j\'aimerais te dire.jpg' },
      { an: 2025, titre: 'La mort d\'Ivan Ilitch',
        par: 'Léon Tolstoï',
        image: 'livres/2025/La mort d\'Ivan Ilitch.jpg' },
      { an: 2025, titre: 'La métamorphose',
        par: 'Franz Kafka',
        image: 'livres/2025/La métamorphose.jpg' },
      { an: 2025, titre: 'Sois heureux',
        par: 'Pape François',
        image: 'livres/2025/Sois heureux.jpg' },
      { an: 2025, titre: 'La Bible',
        image: 'livres/2025/La bible.jpeg' },
      { an: 2025, titre: 'La chambre de Giovanni',
        par: 'James Baldwin',
        image: 'livres/2025/La chambre de Giovanni.jpg' },
      { an: 2025, titre: 'Les lois de la nature humaine',
        par: 'Robert Greene',
        image: 'livres/2025/Les lois de la nature humaine.jpg' },
      { an: 2025, titre: 'En as-tu vraiment besoin ?',
        par: 'Pierre-Yves McSween',
        image: 'livres/2025/En as-tu vraiment besoin ?.jpg' },
      { an: 2025, titre: 'Histoire d\'une âme',
        par: 'Thérèse de Lisieux',
        image: 'livres/2025/Histoire d\'une âme.jpg' },
      { an: 2025, titre: 'Commentaire sur la Genèse',
        par: 'Jean Chrysostome',
        image: 'livres/2025/Commentaire de la Genèse.jpg' },
      { an: 2025, titre: 'Martin Eden',
        par: 'Jack London',
        image: 'livres/2025/Martin Eden.jpg' },
      { an: 2025, titre: '1984',
        par: 'George Orwell',
        image: 'livres/2025/1984.jpg' },
      { an: 2025, titre: 'The Midnight Library',
        par: 'Matt Haig',
        image: 'livres/2025/The Midnight Library.jpg' },
      { an: 2025, titre: 'Tuesdays with Morrie',
        par: 'Mitch Albom',
        image: 'livres/2025/Tuesdays with Morrie.jpg' },
      { an: 2025, titre: 'L\'homme le plus riche de Babylone',
        par: 'George S. Clason',
        image: 'livres/2025/L\'homme le plus riche de Babylone.jpg' },
      { an: 2025, titre: 'La pitié dangereuse',
        par: 'Stefan Zweig',
        image: 'livres/2025/La pitié dangereuse.jpg' },
      /* ── 2026 ── */
      { an: 2026, titre: 'L\'imitation de Jésus-Christ',
        par: 'Thomas a Kempis',
        image: 'livres/2026/L\'imitation de Jésus-Christ.jpg' },
      { an: 2026, titre: 'Œuvres complètes',
        par: 'Jean Chrysostome',
        image: 'livres/2026/Œuvres complètes.jpg' },
      { an: 2026, titre: 'Le joueur d\'échecs',
        par: 'Stefan Zweig',
        image: 'livres/2026/Le joueur d\'échecs.jpg' },
      { an: 2026, titre: 'Diary of Saint Maria Faustina Kowalska: Divine Mercy in My Soul',
        par: 'Sainte Faustine Kowalska',
        image: 'livres/2026/Diary of Saint Maria Faustina Kowalska: Divine Mercy in My Soul.jpg' },
      { an: 2026, titre: 'The Devil\'s Sons, tome 1',
        par: 'Chloé Wallerand',
        image: 'livres/2026/The Devil\'s Sons, tome 1.jpg' },
      { an: 2026, titre: 'À l\'est d\'Éden',
        par: 'John Steinbeck',
        image: 'livres/2026/À l\'est d\'Éden.jpg' },
      { an: 2026, titre: 'Madame Bovary',
        par: 'Gustave Flaubert',
        image: 'livres/2026/Madame Bovary.jpg' }
    ] },
  { id: 'dramas',  nom: 'K-drama & J-drama', visuel: 'Affiche', icone: 'i-play',
    lead: 'Les séries que j\'ai aimées.',
    items: [
      { titre: 'Scarlet Heart: Ryeo',
        image: 'dramas/scarlet-heart-ryeo.webp' },
      { titre: 'Bride of the Century',
        image: 'dramas/bride-of-the-century.webp', large: true },
      { titre: 'Weightlifting Fairy Kim Bok-joo',
        image: 'dramas/weightlifting-fairy-kim-bok-joo.webp' },
      { titre: 'Kill Me, Heal Me',
        image: 'dramas/kill-me-heal-me.webp', large: true, etat: 'En cours' },
      { titre: 'Goblin',
        image: 'dramas/goblin.webp', large: true },
      { titre: 'Business Proposal',
        image: 'dramas/business-proposal.webp' },
      { titre: 'Master\'s Sun',
        image: 'dramas/masters-sun.webp', large: true },
      { titre: 'Mr Queen',
        image: 'dramas/mr-queen.webp', large: true },
      { titre: 'Marry My Husband', par: 'J-drama',
        image: 'dramas/marry-my-husband-japan.webp' },
      { titre: 'Twenty-Five Twenty-One',
        image: 'dramas/twenty-five-twenty-one.webp', etat: 'En cours' }
    ] },
  { id: 'anime',   nom: 'Anime & manga', icone: 'i-spark',
    lead: 'Les anime et les mangas qui m\'ont marquée.',
    items: [
      { titre: 'Hunter \u00D7 Hunter',
        image: 'anime/hunter-x-hunter.webp' },
      { titre: 'Les Carnets de l\'Apothicaire',
        image: 'anime/the-apothecary-diaries.webp' },
      { titre: 'JoJo\'s Bizarre Adventure',
        image: 'anime/jojos-bizarre-adventure.webp' },
      { titre: 'Yu Yu Hakusho',
        image: 'anime/yu-yu-hakusho.webp' },
      { titre: 'Mushoku Tensei: Jobless Reincarnation',
        image: 'anime/mushoku-tensei.webp' },
      { titre: 'One Piece',
        image: 'anime/one-piece.webp' },
      { titre: 'Though I Am an Inept Villainess',
        image: 'anime/though-i-am-an-inept-villainess.webp' }
    ] },
  { id: 'youtube', nom: 'YouTube', icone: 'i-video',
    lead: 'Les chaînes et vidéos que je trouve intéressantes, utiles ou '
        + 'simplement agréables à regarder.',
    items: [] },
  { id: 'articles', nom: 'Articles & lectures web', icone: 'i-pen',
    lead: 'Les articles que je garde et relis.',
    items: [] }
];


const GUIDES = [
  { title: 'Classroom of the Elite', count: 41,
    lead: 'Portrait, kanji, ordre japonais et un repère court pour chacun. '
        + 'Les classes sont celles du début de la série, pour ne pas révéler '
        + 'les changements de classement.',
    meta: '41 personnages',
    short: '41 personnages, leurs classes de départ et les variantes de leurs noms.',
    href: 'refuge/classroom-of-the-elite.html' },
  { title: 'Mushoku Tensei', count: 59,
    lead: 'Rangés par volume, du premier au vingt-sixième : chaque volume '
        + 'reste replié jusqu\'à ouverture. Pas de kanji ici, seulement le nom '
        + 'utile pour lire la novel et ses variantes de traduction.',
    meta: '59 personnages · 26 volumes',
    short: '59 personnages sur 26 volumes, à ouvrir au fur et à mesure.',
    href: 'refuge/mushoku-tensei.html' },
  { title: 'That Time I Got Reincarnated as a Slime', count: 50,
    lead: 'Rangés par volume : chaque volume reste replié tant qu\'on n\'y est '
        + 'pas arrivé. Ni évolutions, ni changements de statut, ni issues de combat.',
    meta: '50 personnages · 5 volumes',
    short: '50 personnages rangés par volume, sans rien dévoiler de la suite.',
    href: 'refuge/tensura.html' },
  { title: 'The Apothecary Diaries', count: 26,
    lead: 'Les essentiels sont ouverts d\'emblée ; deux sections restent '
        + 'repliées, pour les noms dont le rôle se précise plus loin. Les '
        + 'transcriptions chinoises varient d\'une traduction à l\'autre, '
        + 'les variantes sont sur les fiches.',
    meta: '26 personnages · 3 sections',
    short: '26 personnages du palais intérieur, les plus tardifs repliés.',
    href: 'refuge/the-apothecary-diaries.html' },
  { title: 'Ascendance of a Bookworm', count: 39,
    lead: 'Rangés par partie, de la fille d\'un soldat au temple : chaque '
        + 'partie s\'ouvre quand on y arrive. Le prénom de l\'héroïne change '
        + 'selon les traductions — Maïn, Myne, Main — les trois fonctionnent '
        + 'dans la recherche.',
    meta: '39 personnages · 3 parties',
    short: '39 personnages rangés par partie, à ouvrir au fur et à mesure.',
    href: 'refuge/ascendance-of-a-bookworm.html' },
  { title: '86 — EIGHTY-SIX', count: 41,
    lead: 'Les essentiels d\'abord, puis l\'escadron Spearhead au complet, '
        + 'la République et les volumes suivants — chaque section repliée '
        + 'jusqu\'à ouverture. Chaque pilote porte aussi son Personal Name, '
        + 'le nom de code sous lequel on le désigne au combat.',
    meta: '41 personnages · 4 sections',
    short: '41 personnages et leurs noms de code, les sections tardives repliées.',
    href: 'refuge/eighty-six.html' },
  { title: 'Re:Zero — Starting Life in Another World', count: 30,
    lead: 'Rangés par volume de première apparition : les essentiels ouverts, '
        + 'puis la capitale, le manoir, la sélection royale et la suite, chaque '
        + 'section repliée jusqu\'à ouverture. Beaucoup de ces personnages sont '
        + 'presque toujours appelés par leur surnom — Ferris, Al, Betty.',
    meta: '30 personnages · 5 sections',
    short: '30 personnages rangés par volume, et les surnoms sous lesquels on les désigne.',
    href: 'refuge/re-zero.html' },
  { title: 'Sword Art Online', count: 24,
    lead: 'Presque tous ont deux noms — celui du joueur et celui de la vie '
        + 'réelle — et changent d\'apparence en changeant de monde. Chaque '
        + 'fiche donne les deux, et les sections suivent les volumes : les '
        + 'essentiels ouverts, le reste replié jusqu\'à ouverture.',
    meta: '24 personnages · 5 sections',
    short: '24 personnages, leur nom de joueur et leur nom réel.',
    href: 'refuge/sword-art-online.html' },
];


const READINGS = [
  /* ── 2022 ── */
  { year: 2022, month: 4, title: 'Le guide du lightworker', author: 'Isabelle Cerf', cover: 'guide_du_lightworker.jpeg' },
  { year: 2022, month: 4, title: 'Penser comme un millionnaire', author: 'Dean Graziosi', cover: 'Penser_comme_un_millionnaire.jpg' },
  { year: 2022, month: 4, title: 'Apprendre à gérer son argent', author: 'Eric Braun et Sandy Donovan', cover: 'Apprendre à gérer son argent.jpeg' },
  { year: 2022, month: 4, title: 'L\'art de la confiance en soi', author: 'Katty Kay et Claire Shipman', cover: 'L\'art de la confiance en soi.jpeg' },
  { year: 2022, month: 5, title: 'La clé de votre énergie', author: 'Natacha Calestrémé', cover: 'La cle de votre energie.jpg' },
  { year: 2022, month: 5, title: 'Le guide détendu des émotions au travail', author: 'Liz Fosslien et Mollie West Duffy', cover: 'Le guide détendu des émotions au travail.jpg' },
  { year: 2022, month: 5, title: 'L\'obstacle est le chemin', author: 'Ryan Holiday', cover: 'L\'obstacle est le chemin.jpg' },
  { year: 2022, month: 5, title: 'Père riche, père pauvre', author: 'Robert Kiyosaki', cover: 'Père riche, père pauvre .jpg' },
  { year: 2022, month: 6, title: 'La magie du rangement illustrée', author: 'Marie Kondo', cover: 'La magie du rangement illustrée.jpg' },
  { year: 2022, month: 6, title: 'The Personal MBA', author: 'Josh Kaufman', cover: 'The personal MBA.jpg' },
  { year: 2022, month: 6, title: 'Trouver ma place', author: 'Natacha Calestrémé', cover: 'Trouver ma place.jpg' },
  { year: 2022, month: 7, title: 'Ta deuxième vie commence quand tu comprends que tu n\'en as qu\'une', author: 'Raphaëlle Giordano', cover: 'Ta deuxième vie commence quand tu comprends que tu n\'en as qu\'une.jpg' },
  { year: 2022, month: 7, title: 'Le miracle de la pleine conscience', author: 'Thich Nhat Hanh', cover: 'Le miracle de la pleine conscience.jpg' },
  { year: 2022, month: 7, title: 'L\'homme qui voulait être heureux', author: 'Laurent Gounelle', cover: 'L\'homme qui voulait être heureux.jpg' },
  { year: 2022, month: 7, title: 'Le pouvoir du moment présent', author: 'Eckhart Tolle', cover: 'Le pouvoir du moment présent.jpg' },
  { year: 2022, month: 8, title: 'La puissance de l\'acceptation', author: 'Lise Bourbeau', cover: 'La Puissance de l\'acceptation.jpg' },
  { year: 2022, month: 8, title: 'L\'Alchimiste', author: 'Paulo Coelho', cover: 'L\'Alchimiste.jpg' },
  { year: 2022, month: 8, title: 'Les mots sont des fenêtres', author: 'Marshall Rosenberg', cover: 'Les mots sont des fenêtres.jpg' },
  { year: 2022, month: 8, title: 'Les 5 blessures', author: 'Lise Bourbeau', cover: 'Les 5 blessures.jpg' },
  { year: 2022, month: 9, title: 'Progressez à pas de géant', author: 'Anthony Robbins', cover: 'Progressez à pas de géant .jpg' },
  { year: 2022, month: 9, title: 'Miracle Morning', author: 'Hal Elrod', cover: 'Miracle Morning.jpg' },
  { year: 2022, month: 9, title: 'Qui es-tu ?', author: 'Lise Bourbeau', cover: 'Qui es tu?.jpg' },
  { year: 2022, month: 10, title: 'Devenir super-conscient', author: 'Joe Dispenza', cover: 'Devenir super-conscient .jpg' },
  { year: 2022, month: 10, title: 'Kilomètre zéro', author: 'Maud Ankaoua', cover: 'Kilomètre zéro.jpg' },
  { year: 2022, month: 10, title: 'Communiquer et guérir avec les anges', author: 'Doreen Virtue', cover: 'Communiquer et guérir avec les anges.jpg' },
  { year: 2022, month: 10, title: 'Révélez la sorcière qui dort en vous', author: 'Gabriela Herstik', cover: 'Révélez la sorcière qui dort en vous.jpg' },
  { year: 2022, month: 11, title: 'Le livre des esprits', author: 'Allan Kardec', cover: 'Le livre des esprits.jpg' },
  { year: 2022, month: 11, title: 'La prophétie des Andes', author: 'James Redfield', cover: 'La prophétie des Andes.jpg' },
  { year: 2022, month: 11, title: 'Écoute ton corps', author: 'Lise Bourbeau', cover: 'Écoute ton corps: La responsabilité, l\'engagement & la culpabilité.jpg' },
  { year: 2022, month: 11, title: 'Réfléchissez et devenez riche', author: 'Napoleon Hill', cover: 'reflechissez et devenez riche.jpg' },
  { year: 2022, month: 12, title: 'Les quatre accords toltèques', author: 'Don Miguel Ruiz', cover: 'Les quatre accords toltèques.jpg' },
  { year: 2022, month: 12, title: 'Prendre soin de l\'enfant intérieur', author: 'Thich Nhat Hanh', cover: 'Prendre soin de l\'enfant intérieur.jpg' },
  { year: 2022, month: 12, title: 'À la croisée des mondes', author: 'Philip Pullman', cover: 'À la croisée des mondes.jpg' },
  /* ── 2023 ── */
  { year: 2023, month: 1, title: 'La Wicca', author: 'Scott Cunningham', cover: 'La wicca.jpg' },
  { year: 2023, month: 1, title: 'Trois minutes à méditer', author: 'Christophe André', cover: 'Trois minutes à méditer.jpg' },
  { year: 2023, month: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', cover: 'Le Petit Prince.jpg' },
  { year: 2023, month: 1, title: 'Devenir', author: 'Michelle Obama', cover: 'Devenir.jpg' },
  { year: 2023, month: 2, title: 'Le charme discret de l\'intestin', author: 'Giulia Enders', cover: 'Le charme discret de l\'intestin.jpg' },
  { year: 2023, month: 2, title: 'Transformez votre vie', author: 'Louise Hay', cover: 'Transformez votre vie.jpg' },
  { year: 2023, month: 2, title: 'Deep Work', author: 'Cal Newport', cover: 'Deep Work.jpg' },
  { year: 2023, month: 2, title: 'Le livre des médiums', author: 'Allan Kardec', cover: 'Le livre des médiums.jpg' },
  { year: 2023, month: 3, title: 'Oser', author: 'Frédéric Fanget', cover: 'oser.jpg' },
  { year: 2023, month: 3, title: 'S\'ouvrir à l\'amour et au bonheur', author: 'Don Miguel Ruiz', cover: 'S\'ouvrir à l\'amour et au bonheur.jpg' },
  { year: 2023, month: 3, title: 'Orgueil et préjugés', author: 'Jane Austen', cover: 'Orgueil et préjugés.jpg' },
  { year: 2023, month: 3, title: 'Et si c\'était vrai', author: 'Marc Levy', cover: 'Et si c\'était vrai.jpg' },
  { year: 2023, month: 4, title: 'Conversations avec Dieu, tome 1', author: 'Neale Donald Walsch', cover: 'Conversations avec Dieu, tome 1.jpg' },
  { year: 2023, month: 4, title: 'La confiance en soi, une philosophie', author: 'Charles Pépin', cover: 'La confiance en soi, une philosophie.jpg' },
  { year: 2023, month: 5, title: 'Le jour où j\'ai appris à vivre', author: 'Laurent Gounelle', cover: 'Le jour où j\'ai appris à vivre.jpg' },
  { year: 2023, month: 5, title: 'Techniques de visualisation créatrice', author: 'Shakti Gawain', cover: 'Techniques de visualisation créatrice.jpg' },
  { year: 2023, month: 5, title: 'Da Vinci Code', author: 'Dan Brown', cover: 'Da Vinci Code.jpeg' },
  { year: 2023, month: 5, title: 'L\'Étranger', author: 'Albert Camus', cover: 'L\'Étranger.jpg' },
  { year: 2023, month: 6, title: 'Jamais plus', author: 'Colleen Hoover', cover: 'Jamais plus.jpg' },
  { year: 2023, month: 6, title: 'Petit traité de vie intérieure', author: 'Frédéric Lenoir', cover: 'Petit traité de vie intérieure.jpg' },
  { year: 2023, month: 6, title: 'Testament des abeilles', author: 'Natacha Calestrémé', cover: 'Testament des abeilles.jpg' },
  { year: 2023, month: 7, title: 'Le livre des coïncidences', author: 'Deepak Chopra', cover: 'Le livre des coïncidences.jpg' },
  { year: 2023, month: 7, title: 'Conversations avec Dieu, tome 2', author: 'Neale Donald Walsch', cover: 'Conversations avec Dieu, tome 2.jpg' },
  { year: 2023, month: 7, title: 'Nos étoiles contraires', author: 'John Green', cover: 'Nos étoiles contraires.jpg' },
  { year: 2023, month: 7, title: 'Il est grand temps de rallumer les étoiles', author: 'Virginie Grimaldi', cover: 'Il est grand temps de rallumer les étoiles.jpg' },
  { year: 2023, month: 8, title: 'Onze minutes', author: 'Paulo Coelho', cover: 'Onze minutes.jpg' },
  { year: 2023, month: 8, title: 'Tremblez mais osez', author: 'Susan Jeffers', cover: 'Tremblez mais osez.jpg' },
  { year: 2023, month: 8, title: 'La loi de l\'attraction', author: 'Esther et Jerry Hicks', cover: 'La loi de l\'attraction.jpg' },
  { year: 2023, month: 8, title: 'L\'estime de soi', author: 'Christophe André et François Lelord', cover: 'L\'estime de soi.jpg' },
  { year: 2023, month: 8, title: 'N\'ayez pas peur de la vie', author: 'Patricia Darré', cover: 'N\'ayez pas peur de la vie.jpg' },
  { year: 2023, month: 8, title: 'Steve Jobs', author: 'Walter Isaacson', cover: 'Steve Jobs.jpg' },
  { year: 2023, month: 9, title: 'Méditer, jour après jour', author: 'Christophe André', cover: 'Méditer, jour après jour.jpg' },
  { year: 2023, month: 9, title: 'La femme parfaite est une connasse', author: 'Anne-Sophie et Marie-Aldine Girard', cover: 'La femme parfaite est une connasse.jpg' },
  { year: 2023, month: 9, title: 'Comment se faire des amis', author: 'Dale Carnegie', cover: 'Comment se faire des amis.jpg' },
  { year: 2023, month: 9, title: 'La formule de Dieu', author: 'José Rodrigues dos Santos', cover: 'La formule de Dieu.jpg' },
  { year: 2023, month: 9, title: 'La magie de la foi', author: 'Joseph Murphy', cover: 'La magie de la foi.jpg' },
  { year: 2023, month: 11, title: 'Qui a piqué mon fromage ?', author: 'Spencer Johnson', cover: 'Qui a piqué mon fromage ?.jpg' },
  { year: 2023, month: 11, title: 'La ferme des animaux', author: 'George Orwell', cover: 'La ferme des animaux.jpg' },
  { year: 2023, month: 11, title: 'Harry Potter à l\'école des sorciers', author: 'J. K. Rowling', cover: 'Harry Potter à l\'école des sorciers.jpg' },
  { year: 2023, month: 11, title: 'Harry Potter et la chambre des secrets', author: 'J. K. Rowling', cover: 'Harry Potter et la chambre des secrets.jpg' },
  { year: 2023, month: 12, title: 'Imparfaits, libres et heureux', author: 'Christophe André', cover: 'Imparfaits, libres et heureux.jpg' },
  { year: 2023, month: 12, title: 'La vie !', author: 'Louise Hay', cover: 'La vie ! louise hay.jpg' },
  { year: 2023, month: 12, title: 'La magie de voir grand', author: 'David Schwartz', cover: 'La magie de voir grand.jpg' },
  /* ── 2024 ── */
  { year: 2024, month: 1, title: 'Quand on veut, on peut !', author: 'Norman Vincent Peale', cover: 'Quand on veut, on peut !.jpg' },
  { year: 2024, month: 1, title: 'Je pense trop', author: 'Christel Petitcollin', cover: 'Je pense trop.jpg' },
  { year: 2024, month: 1, title: 'Il y a quelqu\'un dans la maison', author: 'Patricia Darré', cover: 'Il y a quelqu\'un dans la maison.jpg' },
  { year: 2024, month: 1, title: 'La tresse', author: 'Laetitia Colombani', cover: 'La tresse.jpg' },
  { year: 2024, month: 1, title: 'Les impatientes', author: 'Djaïli Amadou Amal', cover: 'Les impatientes.jpg' },
  { year: 2024, month: 2, title: 'Plus rien ne pourra me blesser', author: 'David Goggins', cover: 'Plus rien ne pourra me blesser.jpg' },
  { year: 2024, month: 2, title: 'Numéro deux', author: 'David Foenkinos', cover: 'Numéro deux.jpg' },
  { year: 2024, month: 2, title: 'Harry Potter et le prisonnier d\'Azkaban', author: 'J. K. Rowling', cover: 'Harry Potter et le prisonnier d\'Azkaban.jpg' },
  { year: 2024, month: 2, title: 'Harry Potter et la coupe de feu', author: 'J. K. Rowling', cover: 'Harry Potter et la coupe de feu.jpg' },
  { year: 2024, month: 3, title: 'Les hauts de Hurlevent', author: 'Emily Brontë', cover: 'Les hauts de Hurlevent.jpg' },
  { year: 2024, month: 3, title: 'Psychologie de la peur', author: 'Christophe André', cover: 'Psychologie de la peur.jpg' },
  { year: 2024, month: 3, title: 'Je revenais des autres', author: 'Mélissa Da Costa', cover: 'Je revenais des autres.jpg' },
  { year: 2024, month: 3, title: 'Le cinquième accord toltèque', author: 'Don Miguel Ruiz', cover: 'Le cinquième accord toltèque.jpg' },
  { year: 2024, month: 3, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', cover: 'The Subtle Art of Not Giving a F*ck.jpg' },
  { year: 2024, month: 3, title: 'Antigone', author: 'Jean Anouilh', cover: 'Antigone.jpg' },
  { year: 2024, month: 4, title: 'Conversations avec Dieu, tome 1', author: 'Neale Donald Walsch', cover: 'Conversations avec Dieu, tome 1.jpg' },
  { year: 2024, month: 4, title: 'Juste avant le bonheur', author: 'Agnès Ledig', cover: 'Juste avant le bonheur.jpg' },
  { year: 2024, month: 4, title: 'Des fleurs pour Algernon', author: 'Daniel Keyes', cover: 'Des fleurs pour Algernon.jpg' },
  { year: 2024, month: 4, title: 'L\'art d\'avoir toujours raison', author: 'Arthur Schopenhauer', cover: 'L\'art d\'avoir toujours raison.jpg' },
  { year: 2024, month: 4, title: 'La délicatesse', author: 'David Foenkinos', cover: 'La délicatesse.jpg' },
  { year: 2024, month: 4, title: 'The 5 Love Languages', author: 'Gary Chapman', cover: 'The 5 Love Languages.jpg' },
  { year: 2024, month: 4, title: 'L\'art de la simplicité', author: 'Dominique Loreau', cover: 'L\'art de la simplicité.jpg' },
  { year: 2024, month: 5, title: 'Harry Potter et l\'ordre du Phénix', author: 'J. K. Rowling', cover: 'Harry Potter et l\'ordre du Phénix.jpg' },
  { year: 2024, month: 5, title: 'Harry Potter et le prince de sang-mêlé', author: 'J. K. Rowling', cover: 'Harry Potter et le prince de sang-mêlé.jpg' },
  { year: 2024, month: 5, title: 'Harry Potter et les reliques de la mort', author: 'J. K. Rowling', cover: 'Harry Potter et les reliques de la mort.jpg' },
  { year: 2024, month: 5, title: 'Toujours plus, + = +', author: 'Léna Situations', cover: 'Toujours plus, + = +.jpg' },
  { year: 2024, month: 5, title: 'Les douleurs fantômes', author: 'Mélissa Da Costa', cover: 'Les douleurs fantômes.jpg' },
  { year: 2024, month: 5, title: 'Votre temps est infini', author: 'Fabien Olicard', cover: 'Votre temps est infini.jpg' },
  { year: 2024, month: 6, title: 'Tu comprendras quand tu seras plus grande', author: 'Virginie Grimaldi', cover: 'Tu comprendras quand tu seras plus grande.jpg' },
  { year: 2024, month: 6, title: 'À tout jamais', author: 'Colleen Hoover', cover: 'À tout jamais.jpg' },
  { year: 2024, month: 6, title: 'Le premier jour du reste de ma vie', author: 'Virginie Grimaldi', cover: 'Le premier jour du reste de ma vie.jpg' },
  { year: 2024, month: 6, title: 'Origine', author: 'Dan Brown', cover: 'Origine.jpg' },
  { year: 2024, month: 7, title: 'Les choses humaines', author: 'Karine Tuil', cover: 'Les choses humaines.jpg' },
  { year: 2024, month: 7, title: 'L\'éveil de votre puissance intérieure', author: 'Anthony Robbins', cover: 'L\'éveil de votre puissance intérieure.jpg' },
  { year: 2024, month: 8, title: 'Bilbo le Hobbit', author: 'J. R. R. Tolkien', cover: 'Bilbo le Hobbit.jpg' },
  { year: 2024, month: 8, title: 'Demandez et vous recevrez', author: 'Esther et Jerry Hicks', cover: 'Demandez et vous recevrez.jpg' },
  { year: 2024, month: 8, title: 'Les frères Karamazov', author: 'Fiodor Dostoïevski', cover: 'Les frères Karamazov.jpg' },
  { year: 2024, month: 9, title: 'Ne coupez jamais la poire en deux', author: 'Chris Voss', cover: 'Ne coupez jamais la poire en deux.jpg' },
  { year: 2024, month: 9, title: 'Et n\'oublie pas d\'être heureux', author: 'Christophe André', cover: 'Et n\'oublie pas d\'être heureux.jpg' },
  { year: 2024, month: 10, title: 'Influence et manipulation', author: 'Robert Cialdini', cover: 'Influence et manipulation.jpg' },
  { year: 2024, month: 10, title: 'Le prophète', author: 'Khalil Gibran', cover: 'Le prophète.jpg' },
  { year: 2024, month: 10, title: 'Harry Potter et l\'enfant maudit', author: 'J. K. Rowling', cover: 'Harry Potter et l\'enfant maudit.jpg' },
  { year: 2024, month: 10, title: 'Lettres à un jeune poète', author: 'Rainer Maria Rilke', cover: 'Lettres à un jeune poète.jpg' },
  { year: 2024, month: 10, title: 'Ainsi gèlent les bulles de savon', author: 'Marie Vareille', cover: 'Ainsi gèlent les bulles de savon.jpg' },
  { year: 2024, month: 10, title: 'La nuit des temps', author: 'René Barjavel', cover: 'La nuit des temps.jpg' },
  { year: 2024, month: 10, title: 'Attendez-vous à un miracle', author: 'Joe Vitale', cover: 'Attendez-vous à un miracle.jpg' },
  { year: 2024, month: 10, title: 'Tout le bleu du ciel', author: 'Mélissa Da Costa', cover: 'Tout le bleu du ciel.jpg' },
  { year: 2024, month: 10, title: 'Karma Sutra', author: 'Steve', cover: 'Karma Sutra.jpg' },
  { year: 2024, month: 11, title: 'November 9', author: 'Colleen Hoover', cover: 'November 9.jpg' },
  { year: 2024, month: 11, title: 'Le seigneur des anneaux, tome 1 : La communauté de l\'anneau', author: 'J. R. R. Tolkien', cover: 'Le seigneur des anneaux, tome 1 : La communauté de l\'anneau.jpg' },
  { year: 2024, month: 11, title: 'Le seigneur des anneaux, tome 2 : Les deux tours', author: 'J. R. R. Tolkien', cover: 'Le seigneur des anneaux, tome 2 : Les deux tours.jpg' },
  { year: 2024, month: 11, title: 'Le seigneur des anneaux, tome 3 : Le retour du roi', author: 'J. R. R. Tolkien', cover: 'Le seigneur des anneaux, tome 3 : Le retour du roi.jpg' },
  { year: 2024, month: 12, title: 'Cessez d\'être gentil, soyez vrai !', author: 'Thomas d\'Ansembourg', cover: 'Cessez d\'être gentil, soyez vrai !.jpg' },
  { year: 2024, month: 12, title: 'Libérez votre cerveau', author: 'Idriss Aberkane', cover: 'Libérez votre cerveau.jpg' },
  { year: 2024, month: 12, title: 'Le pouvoir insoupçonné de tes blessures et de tes blocages', author: 'Isabelle Cerf', cover: 'Le pouvoir insoupçonné de tes blessures et de tes blocages.jpg' },
  { year: 2024, month: 12, title: 'Plus malin que le diable', author: 'Napoleon Hill', cover: 'Plus malin que le diable.jpg' },
  { year: 2024, month: 12, title: 'Désenchantées', author: 'Marie Vareille', cover: 'Désenchantées.jpg' },
  /* ── 2025 ── */
  { year: 2025, month: 1, title: 'Affirmez-vous', author: 'Frédéric Fanget', cover: 'Affirmez-vous.jpg' },
  { year: 2025, month: 1, title: 'Le journal d\'Anne Frank', author: 'Anne Frank', cover: 'Le journal d\'Anne Frank.jpg' },
  { year: 2025, month: 1, title: 'Respire !', author: 'Maud Ankaoua', cover: 'Respire.jpg' },
  { year: 2025, month: 1, title: 'Les délices de Tokyo', author: 'Durian Sukegawa', cover: 'Les délices de Tokyo.jpg' },
  { year: 2025, month: 1, title: 'Ainsi parlait Zarathoustra', author: 'Friedrich Nietzsche', cover: 'Ainsi parlait Zarathoustra.jpg' },
  { year: 2025, month: 2, title: 'Les sept maris d\'Evelyn Hugo', author: 'Taylor Jenkins Reid', cover: 'Les sept maris d\'Evelyn Hugo.jpg' },
  { year: 2025, month: 2, title: 'Le(s) vrai(es) amour(s)', author: 'Taylor Jenkins Reid', cover: 'Le(s) vrai(es) amour(s).jpg' },
  { year: 2025, month: 2, title: 'Les sirènes de Malibu', author: 'Taylor Jenkins Reid', cover: 'Les sirènes de Malibu.jpg' },
  { year: 2025, month: 3, title: 'Ce que j\'aimerais te dire', author: 'Emeric Lebreton', cover: 'Ce que j\'aimerais te dire.jpg' },
  { year: 2025, month: 3, title: 'L\'intelligence émotionnelle, tome 1', author: 'Daniel Goleman', cover: 'L\'intelligence émotionnelle, tome 1.jpg' },
  { year: 2025, month: 4, title: 'La mort d\'Ivan Ilitch', author: 'Léon Tolstoï', cover: 'La mort d\'Ivan Ilitch.jpg' },
  { year: 2025, month: 4, title: 'La métamorphose', author: 'Franz Kafka', cover: 'La métamorphose.jpg' },
  { year: 2025, month: 5, title: 'Sois heureux', author: 'Pape François', cover: 'Sois heureux.jpg' },
  { year: 2025, month: 5, title: 'La miséricorde', author: 'Pape François', cover: 'La miséricorde.jpg' },
  { year: 2025, month: 5, title: 'La force de la prière', author: 'Pape François', cover: 'La force de la prière.jpg' },
  { year: 2025, month: 6, title: 'La Bible', cover: 'La bible.jpeg', page: 'bible' },
  { year: 2025, month: 6, title: 'La joie de l\'Évangile', author: 'Pape François', cover: 'La joie de l\'Évangile.jpg' },
  { year: 2025, month: 6, title: 'La peau de chagrin', author: 'Honoré de Balzac', cover: 'La Peau de chagrin.jpg' },
  { year: 2025, month: 6, title: 'La chambre de Giovanni', author: 'James Baldwin', cover: 'La chambre de Giovanni.jpg' },
  { year: 2025, month: 6, title: 'Le dernier jour d\'un condamné', author: 'Victor Hugo', cover: 'Le dernier jour d\'un condamné.jpg' },
  { year: 2025, month: 6, title: 'L\'éducation sentimentale', author: 'Gustave Flaubert', cover: 'L\'éducation sentimentale.jpg' },
  { year: 2025, month: 7, title: 'Ho\'oponopono', author: 'Maria-Elisa Hurtado-Graciet', cover: 'Ho\'oponopono.jpg' },
  { year: 2025, month: 7, title: 'Fahrenheit 451', author: 'Ray Bradbury', cover: 'Fahrenheit 451.jpg' },
  { year: 2025, month: 7, title: 'Les lois de la nature humaine', author: 'Robert Greene', cover: 'Les lois de la nature humaine.jpg' },
  { year: 2025, month: 7, title: 'Vous êtes les artisans du futur', author: 'Pape François', cover: 'Vous êtes les artisans du futur.jpg' },
  { year: 2025, month: 7, title: 'Pierre et Jean', author: 'Guy de Maupassant', cover: 'Pierre et Jean.jpg' },
  { year: 2025, month: 7, title: 'Un temps pour changer', author: 'Pape François', cover: 'Un temps pour changer.jpg' },
  { year: 2025, month: 8, title: 'Les carnets de l\'apothicaire, tome 1', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T01.jpg' },
  { year: 2025, month: 8, title: 'Les carnets de l\'apothicaire, tome 2', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T02.jpg' },
  { year: 2025, month: 8, title: 'En as-tu vraiment besoin ?', author: 'Pierre-Yves McSween', cover: 'En as-tu vraiment besoin ?.jpg' },
  { year: 2025, month: 8, title: 'Les carnets de l\'apothicaire, tome 3', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T03.jpg' },
  { year: 2025, month: 8, title: 'Les carnets de l\'apothicaire, tome 4', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T04.jpg' },
  { year: 2025, month: 8, title: 'La vie', author: 'Pape François', cover: 'La vie.jpg' },
  { year: 2025, month: 8, title: 'Histoire d\'une âme', author: 'Thérèse de Lisieux', cover: 'Histoire d\'une âme.jpg' },
  { year: 2025, month: 9, title: 'L\'imitation de Jésus-Christ', author: 'Thomas a Kempis', cover: 'L\'imitation de Jésus-Christ.jpg' },
  { year: 2025, month: 9, title: 'Martin Eden', author: 'Jack London', cover: 'Martin Eden.jpg' },
  { year: 2025, month: 9, title: 'Dieu est jeune', author: 'Pape François', cover: 'Dieu est jeune.jpg' },
  { year: 2025, month: 9, title: 'L\'appel de la forêt', author: 'Jack London', cover: 'L\'appel de la forêt.jpg' },
  { year: 2025, month: 9, title: 'La dame aux camélias', author: 'Alexandre Dumas fils', cover: 'La dame aux camélias.jpg' },
  { year: 2025, month: 9, title: 'Prier le chapelet et aimer ça', author: 'V. Finet', cover: 'Prier le chapelet et aimer ça.jpg' },
  { year: 2025, month: 9, title: 'Commentaire sur la Genèse', author: 'Jean Chrysostome', cover: 'Commentaire de la Genèse.jpg' },
  { year: 2025, month: 9, title: 'Le livre de la vie', author: 'Thérèse d\'Avila', cover: 'Le livre de la vie.jpg' },
  { year: 2025, month: 10, title: '1984', author: 'George Orwell', cover: '1984.jpg' },
  { year: 2025, month: 10, title: 'Les carnets de l\'apothicaire, tome 5', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T05.jpg' },
  { year: 2025, month: 10, title: 'Les carnets de l\'apothicaire, tome 6', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T06.jpg' },
  { year: 2025, month: 10, title: 'Les carnets de l\'apothicaire, tome 7', author: 'Natsu Hyuga', cover: 'Les Carnets de l\'apothicaire T07.jpg' },
  { year: 2025, month: 10, title: 'The Midnight Library', author: 'Matt Haig', cover: 'The Midnight Library.jpg' },
  { year: 2025, month: 11, title: 'Diary of a Wimpy Kid, tome 1', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 1.jpg' },
  { year: 2025, month: 11, title: 'Greenlights', author: 'Matthew McConaughey', cover: 'Greenlights.jpg' },
  { year: 2025, month: 11, title: 'Le livre de ma mère', author: 'Albert Cohen', cover: 'Le livre de ma mère.jpg' },
  { year: 2025, month: 11, title: 'Tuesdays with Morrie', author: 'Mitch Albom', cover: 'Tuesdays with Morrie.jpg' },
  { year: 2025, month: 12, title: 'Diary of a Wimpy Kid, tome 2 : Rodrick Rules', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 2 : Rodrick Rules.jpg' },
  { year: 2025, month: 12, title: 'Thérèse Raquin', author: 'Émile Zola', cover: 'Thérèse Raquin.jpg' },
  { year: 2025, month: 12, title: 'L\'homme le plus riche de Babylone', author: 'George S. Clason', cover: 'L\'homme le plus riche de Babylone.jpg' },
  { year: 2025, month: 12, title: 'La pitié dangereuse', author: 'Stefan Zweig', cover: 'La pitié dangereuse.jpg' },
  /* ── 2026 ── */
  { year: 2026, month: 1, title: 'L\'imitation de Jésus-Christ', author: 'Thomas a Kempis', cover: 'L\'imitation de Jésus-Christ.jpg' },
  { year: 2026, month: 1, title: 'The Happiness Project', author: 'Gretchen Rubin', cover: 'The Happiness Project.jpg' },
  { year: 2026, month: 1, title: 'Atomic Habits', author: 'James Clear', cover: 'Atomic Habits.jpg' },
  { year: 2026, month: 2, title: 'Œuvres complètes', author: 'Jean Chrysostome', cover: 'Œuvres complètes.jpg' },
  { year: 2026, month: 2, title: 'Les carnets de l\'apothicaire, tome 8', author: 'Natsu Hyuga', cover: 'Les carnets de l\'apothicaire, tome 8.jpg' },
  { year: 2026, month: 2, title: 'Diary of a Wimpy Kid, tome 3 : The Last Straw', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 3 : The Last Straw.jpg' },
  { year: 2026, month: 2, title: 'Les carnets de l\'apothicaire, tome 9', author: 'Natsu Hyuga', cover: 'Les carnets de l\'apothicaire, tome 9.jpg' },
  { year: 2026, month: 2, title: 'Les carnets de l\'apothicaire, tome 10', author: 'Natsu Hyuga', cover: 'Les carnets de l\'apothicaire, tome 10.jpg' },
  { year: 2026, month: 2, title: 'Les carnets de l\'apothicaire, tome 11', author: 'Natsu Hyuga', cover: 'Les carnets de l\'apothicaire, tome 11.jpg' },
  { year: 2026, month: 2, title: 'Les carnets de l\'apothicaire, tome 12', author: 'Natsu Hyuga', cover: 'Les carnets de l\'apothicaire, tome 12.jpg' },
  { year: 2026, month: 2, title: 'Les carnets de l\'apothicaire, tome 13', author: 'Natsu Hyuga', cover: 'Les carnets de l\'apothicaire, tome 13.jpg' },
  { year: 2026, month: 3, title: 'Kiki\'s Delivery Service', author: 'Eiko Kadono', cover: 'Kiki\'s Delivery Service.jpg' },
  { year: 2026, month: 3, title: 'How to Win at Chess', author: 'Levy Rozman', cover: 'How to Win at Chess.jpg' },
  { year: 2026, month: 3, title: 'The Five People You Meet in Heaven', author: 'Mitch Albom', cover: 'The Five People You Meet in Heaven.jpg' },
  { year: 2026, month: 4, title: 'Nine Days with Saint Joseph', author: 'Andrew Hofer et Jonah Teller', cover: 'Nine Days with Saint Joseph.jpg' },
  { year: 2026, month: 4, title: 'The Secret', author: 'Rhonda Byrne', cover: 'The Secret.jpg' },
  { year: 2026, month: 4, title: 'Le joueur d\'échecs', author: 'Stefan Zweig', cover: 'Le joueur d\'échecs.jpg' },
  { year: 2026, month: 4, title: 'I Will Teach You to Be Rich', author: 'Ramit Sethi', cover: 'I Will Teach You to Be Rich.jpg' },
  { year: 2026, month: 5, title: 'Diary of Saint Maria Faustina Kowalska: Divine Mercy in My Soul', author: 'Sainte Faustine Kowalska', cover: 'Diary of Saint Maria Faustina Kowalska: Divine Mercy in My Soul.jpg' },
  { year: 2026, month: 5, title: 'The Good Life Handbook', author: 'Épictète', cover: 'The Good Life Handbook.jpg' },
  { year: 2026, month: 5, title: 'Diary of a Wimpy Kid, tome 4 : Dog Days', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 4 : Dog Days.jpg' },
  { year: 2026, month: 5, title: 'Diary of a Wimpy Kid, tome 5 : The Ugly Truth', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 5 : The Ugly Truth.jpg' },
  { year: 2026, month: 5, title: 'Pisse-mémé', author: 'Cati Baur', cover: 'Pisse-mémé.jpg' },
  { year: 2026, month: 5, title: 'Diary of a Wimpy Kid, tome 6 : Cabin Fever', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 6 : Cabin Fever.jpg' },
  { year: 2026, month: 6, title: 'À l\'est d\'Éden', author: 'John Steinbeck', cover: 'À l\'est d\'Éden.jpg' },
  { year: 2026, month: 6, title: 'The Devil\'s Sons, tome 1', author: 'Chloé Wallerand', cover: 'The Devil\'s Sons, tome 1.jpg' },
  { year: 2026, month: 7, title: 'Hunter x Hunter, tome 33', author: 'Yoshihiro Togashi', cover: 'Hunter x Hunter, tome 33.jpg' },
  { year: 2026, month: 7, title: 'Hunter x Hunter, tome 34', author: 'Yoshihiro Togashi', cover: 'Hunter x Hunter, tome 34.jpg' },
  { year: 2026, month: 7, title: 'Hunter x Hunter, tome 35', author: 'Yoshihiro Togashi', cover: 'Hunter x Hunter, tome 35.jpg' },
  { year: 2026, month: 7, title: 'Though I Am an Inept Villainess, tome 1', cover: 'Though I Am an Inept Villainess, tome 1.jpg' },
  { year: 2026, month: 7, title: 'Though I Am an Inept Villainess, tome 2', cover: 'Though I Am an Inept Villainess, tome 2.jpg' },
  { year: 2026, month: 7, title: 'Though I Am an Inept Villainess, tome 3', cover: 'Though I Am an Inept Villainess, tome 3.jpg' },
  { year: 2026, month: 7, title: 'Hunter x Hunter, tome 36', author: 'Yoshihiro Togashi', cover: 'Hunter x Hunter, tome 36.jpg' },
  { year: 2026, month: 8, title: 'Des souris et des hommes', author: 'John Steinbeck', cover: 'Des souris et des hommes.jpg' },
  { year: 2026, month: 8, title: 'Madame Bovary', author: 'Gustave Flaubert', cover: 'Madame Bovary.jpg' },
  { year: 2026, month: 8, title: 'Diary of a Wimpy Kid, tome 7 : The Third Wheel', author: 'Jeff Kinney', cover: 'Diary of a Wimpy Kid, tome 7 : The Third Wheel.jpg' },
  { year: 2026, month: 8, title: 'Numérologie', author: 'Lydie Castells et Didier Durandy', cover: 'Numérologie.jpg' },
];

/* ════════════════════════════════════════════════════════════
   3. LECTURE INTÉGRALE DE LA BIBLE — 31 jan → 7 juin 2025
   ────────────────────────────────────────────────────────────
   Carnet tel qu'il a été tenu. `date: null` = entrée non datée.
   Tout le reste (durée, trame des 127 jours, journées actives,
   pauses, densités) est calculé à partir de ce tableau : rien
   n'est écrit en dur dans la page.
   ════════════════════════════════════════════════════════════ */
const BIBLE = {
  edition: 'Bible de Jérusalem',
  start:   '2025-01-31',
  end:     '2025-06-07',
  /* Neuf lignes du carnet couvrent plusieurs livres : 63 lignes = 73 livres,
     soit 46 pour l'Ancien Testament et 27 pour le Nouveau — le canon complet.
     Le total affiché est calculé d'ici, jamais écrit en dur. */
  grouped: {
    'Jean 1, 2 et 3': 3, 'Samuel': 2, 'Rois 1, 2': 2, 'Les chroniques': 2,
    'Maccabées': 2, 'Corinthiens': 2, 'Thessaloniciens': 2, 'Timothée': 2,
    'Pierre': 2
  },
  /* Les sept familles, dans l'ordre de la Bible de Jérusalem — l'édition
     lue. Le classement de quatre livres varie selon les traditions :
     les Lamentations et Baruch suivent ici Jérémie chez les prophètes,
     Daniel est prophète, et Tobie, Judith, Esther et les Maccabées sont
     rangés parmi les historiques. */
  families: {
    pentateuque: ['Genèse', 'Exode', 'Lévitique', 'Nombres', 'Deutéronome'],
    historiques: ['Josué', 'Juges', 'Ruth', 'Samuel', 'Rois 1, 2',
                  'Les chroniques', 'Esdras', 'Néhémie', 'Tobie', 'Judith',
                  'Esther', 'Maccabées'],
    poetiques:   ['Job', 'Psaumes', 'Proverbes', 'Ecclésiaste',
                  'Cantique des cantiques', 'Sagesse', 'Ecclésiastique'],
    prophetes:   ['Isaïe', 'Jérémie', 'Les lamentations', 'Baruch', 'Ézéchiel',
                  'Daniel', 'Osée', 'Joël', 'Amos', 'Abdias', 'Jonas', 'Michée',
                  'Nahum', 'Habaquq', 'Sophonie', 'Aggée', 'Zacharie', 'Malachie'],
    evangiles:   ['Saint Mathieu', 'Saint Marc', 'Saint Luc', 'Saint Jean',
                  'Actes des apôtres'],
    lettres:     ['Romains', 'Corinthiens', 'Galates', 'Éphésiens', 'Philippiens',
                  'Colossiens', 'Thessaloniciens', 'Timothée', 'Tite', 'Philémon',
                  'Hébreux', 'Jacques', 'Pierre', 'Jean 1, 2 et 3', 'Jude'],
    apocalypse:  ['Apocalypse']
  },
  familyNames: {
    pentateuque: 'Pentateuque',
    historiques: 'Livres historiques',
    poetiques:   'Poétiques / sapientiaux',
    prophetes:   'Prophètes',
    evangiles:   'Évangiles / Actes',
    lettres:     'Lettres',
    apocalypse:  'Apocalypse'
  },
  entries: [
    ['Jean 1, 2 et 3', null],       ['Saint Mathieu', '2025-02-09'],
    ['Saint Marc', '2025-02-10'],   ['Saint Luc', '2025-02-18'],
    ['Saint Jean', '2025-02-25'],   ['Actes des apôtres', '2025-03-07'],
    ['Genèse', '2025-03-15'],       ['Exode', '2025-03-20'],
    ['Job', '2025-03-25'],          ['Lévitique', '2025-04-13'],
    ['Nombres', '2025-04-16'],      ['Deutéronome', '2025-04-22'],
    ['Josué', '2025-04-24'],        ['Juges', '2025-04-26'],
    ['Ruth', '2025-04-27'],         ['Samuel', '2025-04-30'],
    ['Rois 1, 2', '2025-05-06'],    ['Amos', '2025-05-07'],
    ['Osée', '2025-05-07'],         ['Michée', '2025-05-07'],
    ['Abdias', '2025-05-08'],       ['Jonas', '2025-05-08'],
    ['Nahum', '2025-05-08'],        ['Joël', '2025-05-08'],
    ['Habaquq', '2025-05-08'],      ['Sophonie', '2025-05-08'],
    ['Aggée', '2025-05-09'],        ['Zacharie', '2025-05-09'],
    ['Malachie', '2025-05-09'],     ['Les lamentations', '2025-05-09'],
    ['Les chroniques', '2025-05-11'],['Daniel', '2025-05-13'],
    ['Isaïe', '2025-05-16'],        ['Tobie', '2025-05-17'],
    ['Judith', '2025-05-19'],       ['Jérémie', '2025-05-21'],
    ['Baruch', '2025-05-23'],       ['Esther', '2025-05-24'],
    ['Ézéchiel', '2025-05-27'],     ['Esdras', '2025-05-27'],
    ['Néhémie', '2025-05-28'],      ['Ecclésiaste', '2025-05-29'],
    ['Cantique des cantiques', '2025-05-29'], ['Sagesse', '2025-05-30'],
    ['Maccabées', '2025-05-31'],    ['Romains', '2025-06-01'],
    ['Proverbes', '2025-06-02'],    ['Corinthiens', '2025-06-02'],
    ['Galates', '2025-06-03'],      ['Éphésiens', '2025-06-04'],
    ['Philippiens', '2025-06-04'],  ['Colossiens', '2025-06-04'],
    ['Thessaloniciens', '2025-06-04'], ['Psaumes', '2025-06-05'],
    ['Timothée', '2025-06-05'],     ['Tite', '2025-06-05'],
    ['Philémon', '2025-06-05'],     ['Hébreux', '2025-06-05'],
    ['Jacques', '2025-06-05'],      ['Pierre', '2025-06-05'],
    ['Jude', '2025-06-06'],         ['Apocalypse', '2025-06-06'],
    ['Ecclésiastique', '2025-06-07']
  ]
};

/* ════════════════════════════════════════════════════════════
   3. NAVIGATION — routage par ancre, liens partageables
   ════════════════════════════════════════════════════════════ */
const GA_MEASUREMENT_ID = 'G-T01M8EW56C';
/* Les années suivies. En ajouter une ici crée sa carte dans le Refuge et
   sa page (#lectures-2021), sans toucher au HTML. */
const YEARS = [2026, 2025, 2024, 2023, 2022];
const YEAR_PAGES = YEARS.map(y => 'lectures-' + y);

const PAGES = ['home', 'about', 'projects', 'skills', 'refuge', 'bible', 'finds', 'favoris']
  .concat(YEAR_PAGES, ['contact']);
const PAGE_TITLES = Object.assign(
  { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills',
    refuge: "Sarindra's Refuge", bible: '127 jours',
    finds: 'Testé et adopté', favoris: 'Mes favoris & recommandations',
    contact: 'Contact' },
  Object.fromEntries(YEARS.map(y => ['lectures-' + y, 'Mes lectures de ' + y])));

/* Les sujets du Refuge sont des pages à part ; la barre de navigation
   doit rester allumée sur le Refuge quand on les lit. */
const PAGE_PARENT = Object.assign(
  { bible: 'refuge', finds: 'refuge', favoris: 'refuge' },
  Object.fromEntries(YEAR_PAGES.map(id => [id, 'refuge'])));

/* Toutes les années partagent un même bloc de page. */
/* Le fil d'Ariane se déduit de PAGE_PARENT : une sous-page ajoutée
   plus tard l'obtient sans qu'on y touche. Les pages de premier niveau
   n'en ont pas — un fil d'un seul maillon ne dit rien que la barre de
   navigation ne dise déjà. */
function trailOf(id) {
  const trail = [];
  for (let cur = id; cur; cur = PAGE_PARENT[cur]) trail.unshift(cur);
  return trail;
}

function renderCrumbs(page, id) {
  const host = page.querySelector('.crumbs');
  if (!host) return;
  const trail = trailOf(id);
  if (trail.length < 2) { host.innerHTML = ''; return; }
  host.innerHTML = '<ol>' + trail.map((p, i) => '<li>' + (i === trail.length - 1
      ? '<span aria-current="page">' + esc(PAGE_TITLES[p] || p) + '</span>'
      : '<a href="#' + esc(p) + '">' + esc(PAGE_TITLES[p] || p) + '</a>')
    + '</li>').join('') + '</ol>';
}

function nodeIdFor(id) { return id.startsWith('lectures-') ? 'books' : id; }

function trackVirtualPageView(id) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: id === 'home' ? '/' : '/' + id,
    page_title: 'Sarindra Therese — ' + (PAGE_TITLES[id] || id)
  });
}

/* ── Mémoire de défilement ──────────────────────────────────────
   Quitter une page pour une autre, puis y revenir, doit reposer le
   regard là où on l'avait laissé. Sans cela on remonte tout en haut,
   et il faut refaire le chemin jusqu'au lien qu'on venait d'ouvrir —
   d'autant plus long que le Refuge est une longue page.

   On ne restaure que sur un RETOUR : bouton « précédent » du
   navigateur, ou fil d'Ariane. Un lien de la barre de navigation est
   un départ, pas un retour : il ouvre la page par le haut.

   Reconnaître un retour ne va pas de soi : `popstate` se déclenche à
   CHAQUE changement d'ancre, y compris sur un lien ordinaire — s'y
   fier ferait de toute navigation un retour. On estampille donc
   chaque entrée d'historique au passage. Une entrée déjà estampillée,
   c'est qu'on y est déjà venu : on y revient. Une entrée neuve porte
   un state nul — c'est un lien qu'on vient d'ouvrir. */
/* Les guides de personnages sont de vraies pages : les ouvrir quitte
   le document, et la mémoire vive s'efface. On la confie donc à la
   session du navigateur, qui survit d'une page à l'autre sans rien
   laisser après la fermeture de l'onglet. Le stockage peut être
   refusé — navigation privée, réglages — et l'absence de mémoire
   n'est pas une panne : on retombe alors sur le haut de page. */
const CLE_POSITIONS = 'refuge:positions';

function lirePositions() {
  try { return JSON.parse(sessionStorage.getItem(CLE_POSITIONS)) || {}; }
  catch (e) { return {}; }
}

function ecrirePositions() {
  try { sessionStorage.setItem(CLE_POSITIONS, JSON.stringify(POSITIONS)); }
  catch (e) { /* rien à faire : la page marche sans */ }
}

const POSITIONS = lirePositions();
let pageCourante = null;
let retourEnCours = false;
let rangHistorique = 0;

function marquerRetour() { retourEnCours = true; }

function naviguer() {
  corrigerAdresse();
  const revient = retourEnCours
    || (history.state != null && history.state.rang != null);
  retourEnCours = false;
  showPage(currentHashPage(), { reprendre: revient });
  if (history.state == null) {
    history.replaceState({ rang: ++rangHistorique }, '');
  }
  ecrirePositions();
}


/* Revenir d'un guide, c'est revenir d'un autre document : soit par le
   bouton « précédent », soit par le lien de retour du guide. Les deux
   méritent la même reprise, et se reconnaissent ici. */
function arriveDUnRetour() {
  const nav = performance.getEntriesByType
    && performance.getEntriesByType('navigation')[0];
  if (nav && nav.type === 'back_forward') return true;
  /* Un lien venu d'une autre page du site — le « ← Sarindra's Refuge »
     d'un guide, par exemple. Un lien partagé, lui, vient d'ailleurs ou
     de nulle part : il ouvre la page par le haut. */
  return !!document.referrer && document.referrer.indexOf(location.origin) === 0
      && document.referrer.split('#')[0] !== location.href.split('#')[0];
}


function showPage(id, opts) {
  if (!PAGES.includes(id)) id = 'home';
  const options = opts || {};

  /* On relève la position de la page qu'on quitte avant de la
     masquer : après, window.scrollY ne parle plus d'elle. */
  if (pageCourante && pageCourante !== id) POSITIONS[pageCourante] = window.scrollY;
  const reprise = options.reprendre && POSITIONS[id] != null ? POSITIONS[id] : null;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + nodeIdFor(id));
  if (!target) return;
  target.classList.add('active');
  renderCrumbs(target, id);
  if (id.startsWith('lectures-')) renderYear(Number(id.slice(9)));

  document.querySelectorAll('#nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + (PAGE_PARENT[id] || id));
    a.removeAttribute('aria-current');
    if (a.classList.contains('active')) a.setAttribute('aria-current', 'page');
  });

  closeMenu();
  document.title = (id === 'home' ? '' : (PAGE_TITLES[id] || id) + ' — ')
    + 'Sarindra Thérèse Randriambeloson — Data & AI Engineer';

  pageCourante = id;
  if (!options.silent) {
    /* Un retour se pose d'un coup, sans glissement : c'est un
       rétablissement, pas un déplacement. */
    window.scrollTo({
      top: reprise != null ? reprise : 0,
      behavior: (reprise != null || prefersReducedMotion()) ? 'auto' : 'smooth'
    });
  }

  if (id === 'skills') setTimeout(animateBars, 200);
  revealIn(target);
  trackVirtualPageView(id);
}

/* Cette page s'est d'abord appelée « conseils ». L'adresse a pu être
   partagée ou mise en favori avant d'être renommée : on la fait
   toujours aboutir plutôt que de retomber sur l'accueil. */
const ANCIENNES_ADRESSES = { conseils: 'favoris', 'coups-de-coeur': 'favoris' };

function currentHashPage() {
  const id = (location.hash || '#home').replace('#', '').split('?')[0];
  return ANCIENNES_ADRESSES[id] || id;
}

/* Et on remet l'adresse au propre dans la barre, pour que ce qu'on y
   recopie soit le lien actuel. replaceState ne déclenche pas de
   hashchange : pas de boucle. */
function corrigerAdresse() {
  const brut = (location.hash || '#home').replace('#', '').split('?')[0];
  if (ANCIENNES_ADRESSES[brut]) {
    history.replaceState(history.state, '', '#' + ANCIENNES_ADRESSES[brut]);
  }
}

/* ── Menu mobile ── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('nav-burger');
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  btn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
}

function closeMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('nav-burger');
  if (!links || !links.classList.contains('open')) return;
  links.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  btn.querySelector('use').setAttribute('href', '#i-menu');
}

/* ════════════════════════════════════════════════════════════
   4. ONGLETS — Skills et Notes partagent le même composant
   ════════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('.skills-tabs').forEach(group => {
    const tabs = Array.from(group.querySelectorAll('.stab'));
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabs.forEach(b => {
          const panel = document.getElementById('sp-' + b.dataset.tab);
          if (panel) panel.classList.toggle('active', b.dataset.tab === id);
        });
        if (id === 'viz') initCharts();
        if (id === 'tech') animateBars();
      });
    });
  });
}

/* Ouvre un onglet par son identifiant — utilisé par les liens [data-goto-tab]. */
function activateTab(tabId) {
  const btn = document.querySelector('.stab[data-tab="' + tabId + '"]');
  if (btn) btn.click();
}

function initTabLinks() {
  document.querySelectorAll('[data-goto-tab]').forEach(link => {
    link.addEventListener('click', () => {
      // le changement de hash déclenche showPage ; on bascule l'onglet juste après
      setTimeout(() => activateTab(link.dataset.gotoTab), 0);
    });
  });
}

function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = (bar.dataset.w || 0) + '%';
  });
}

/* ════════════════════════════════════════════════════════════
   5. FILTRE PROJETS
   ════════════════════════════════════════════════════════════ */
function initProjectFilter() {
  const btns = document.querySelectorAll('.pfilt');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.proj-card-v2').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? 'flex' : 'none';
        const featured = card.closest('.proj-featured');
        if (featured) featured.style.display = show ? 'block' : 'none';
      });
    });
  });
}

/* ════════════════════════════════════════════════════════════
   6. OFF SCREEN — rendu
   ════════════════════════════════════════════════════════════ */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatMonth(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (months[parseInt(m, 10) - 1] || '') + ' ' + y;
}

function emptyState(icon, title, text) {
  return '<div class="empty-state">'
    + '<svg class="icon" aria-hidden="true"><use href="#' + icon + '"/></svg>'
    + '<h3>' + esc(title) + '</h3><p>' + esc(text) + '</p></div>';
}


/* Une couverture se dépose dans assets/img/livres/<année>/<cover>.
   Rien d'autre à faire : si le fichier est là, il s'affiche ; s'il
   n'est pas là, la carte retombe sur sa tranche typographique, où le
   titre tient lieu de couverture et n'est donc plus répété dessous. */
function bookCard(b) {
  /* Les noms de fichiers sont ceux de Sarindra : espaces, accents,
     apostrophes. On les encode pour l'URL avant de les poser. */
  const src = 'assets/img/livres/' + b.year + '/' + esc(encodeURIComponent(b.cover));
  /* Un livre peut avoir sa propre page ici — la Bible en a une. */
  const open  = b.page ? '<a class="book is-linked" href="#' + esc(b.page) + '">'
                       : '<article class="book">';
  const close = b.page ? '</a>' : '</article>';
  return open
    + '<div class="book-cover"><span>' + esc(b.title) + '</span>'
    + '<img src="' + src + '" alt="Couverture de ' + esc(b.title)
    + '" loading="lazy" onerror="bookNoCover(this)"></div>'
    + '<p class="book-title">' + esc(b.title) + '</p>'
    + (b.author ? '<p class="book-author">' + esc(b.author) + '</p>' : '')
    + (b.page ? '<p class="book-go">Lire le récit'
        + '<svg class="icon icon-xs" aria-hidden="true"><use href="#i-arrow-right"/></svg>'
        + '</p>' : '')
    + close;
}

/* Image absente : on découvre la tranche et on retire le titre en
   double. Appelé par l'attribut onerror, donc global. */
function bookNoCover(img) {
  const box = img.parentNode;
  box.classList.add('is-blank');
  img.remove();
  const dup = box.parentNode.querySelector('.book-title');
  if (dup) dup.remove();
}


/* ════════════════════════════════════════════════════════════
   SUJETS DU REFUGE
   ────────────────────────────────────────────────────────────
   Un sujet = une entrée ici. Deux façons de le relier :
     page: 'bible'          → une page interne (#bible)
     url:  'https://…'      → un texte publié ailleurs
   ════════════════════════════════════════════════════════════ */
/* Les livres d'une année. Emporté par erreur avec l'ancienne grille
   de cartes, alors qu'il sert aussi aux étagères. */
function booksOfYear(y) { return READINGS.filter(r => r.year === y); }
const THIS_YEAR = new Date().getFullYear();


/* ════════════════════════════════════════════════════════════
   LE REFUGE — un sommaire, puis un aperçu.
   Quatre sujets à gauche, celui qu'on choisit développé à droite.
   Les chiffres viennent des données : personne ne les recopie.
   ════════════════════════════════════════════════════════════ */
function refugeTopics() {
  const annees = YEARS.filter(y => booksOfYear(y).length).sort((a, b) => a - b);
  const jours  = 127;
  const recos  = CONSEILS.reduce((n, d) => n + d.items.length, 0);

  return [
    { id: 'bible', page: 'bible',
      kicker: 'Défi accompli', tone: 'sand', icon: 'i-check',
      title:  'J’ai lu la Bible en 127 jours',
      meta:   '31 janv. — 7 juin 2025',
      status: 'Carnet de lecture',
      copy:   'J’ai noté chaque jour où je terminais un livre. Le carnet est là, '
            + 'tel que je l’ai tenu, sans rien y ajouter après coup.',
      stats:  [['Durée', jours + ' jours'], ['Livres', '73'],
               ['Période', '31/01 → 07/06']],
      cta:    'Voir le carnet' },

    { id: 'reads', page: 'lectures-' + (annees[0] || YEARS[0]),
      kicker: 'Lecture', tone: 'cyan', icon: 'i-book',
      title:  'Mes lectures, année après année',
      meta:   READINGS.length ? READINGS.length + ' livres depuis ' + annees[0] : 'à venir',
      status: 'Année par année',
      copy:   'Tous les livres que j’ai lus depuis ' + (annees[0] || '') + ', rangés par année. '
            + 'Certains m’ont marquée, d’autres beaucoup moins.',
      stats:  [['Total', READINGS.length + ' livres'],
               ['Première année', String(annees[0] || '—')],
               ['En cours', String(annees[annees.length - 1] || '—')]],
      cta:    'Parcourir les années',
      empty:  READINGS.length === 0 },

    { id: 'tested', page: 'finds',
      kicker: 'Acquisition', tone: 'ink', icon: 'i-spark',
      title:  'Testé et adopté',
      meta:   DISCOVERIES.length
              ? DISCOVERIES.length + (DISCOVERIES.length > 1 ? ' objets' : ' objet')
              : 'à venir',
      status: 'Ce que j’utilise',
      copy:   'Des objets que j’utilise vraiment, pas une liste d’achats. '
            + 'S’ils sont là, c’est que je les ai gardés.',
      stats:  [['Objets', String(DISCOVERIES.length)]],
      cta:    'Voir la liste',
      empty:  DISCOVERIES.length === 0 },

    /* CONSEILS compte des dossiers, pas des entrées. Annoncer
       « 5 favoris » alors que les cinq dossiers sont vides
       serait faux : on compte les entrées, et on nomme les dossiers. */
    { id: 'advice', page: 'favoris',
      kicker: 'Conseil', tone: 'line-sand', icon: 'i-pen',
      title:  'Mes favoris & recommandations',
      meta:   recos
              ? recos + (recos > 1 ? ' favoris' : ' favori')
              : CONSEILS.length + ' dossiers, encore vides',
      status: recos ? 'À jour' : 'À écrire',
      copy:   'Livres, vidéos, séries et ressources que j’ai aimés et que '
            + 'j’ai envie de partager.',
      stats:  recos ? [['Dossiers', String(CONSEILS.length)],
                       ['Entrées',  String(recos)]] : [],
      cta:    recos ? 'Voir' : 'Bientôt',
      empty:  recos === 0 }
  ];
}

/* « Anniversaire littéraire » — la durée et le nombre de livres se
   recalculent à chaque affichage plutôt que d'être recopiés dans le
   HTML : c'est la règle du site, aucun chiffre écrit deux fois.
   En années et mois pleins, pas en jours : « 4 ans et 5 mois » se lit,
   « 1 623 jours » se compte. */
function dureeDepuis(depart, maintenant) {
  let annees = maintenant.getFullYear() - depart.getFullYear();
  let mois = maintenant.getMonth() - depart.getMonth();
  if (maintenant.getDate() < depart.getDate()) mois -= 1;
  if (mois < 0) { annees -= 1; mois += 12; }
  if (annees < 0) return null;
  const a = annees ? annees + (annees > 1 ? ' ans' : ' an') : '';
  const m = mois ? mois + ' mois' : '';
  return (a && m) ? a + ' et ' + m : (a || m || 'moins d’un mois');
}

function renderSince() {
  const cible = document.getElementById('rfg-since');
  if (!cible) return;
  const depart = new Date(LITERARY_START + 'T00:00:00');

  /* La date s'écrit depuis la même constante que la durée. L'avoir
     aussi en dur dans le HTML en aurait fait deux sources pour un
     seul fait, et la première à dériver aurait menti sans bruit. */
  const debut = document.getElementById('rfg-start');
  if (debut) {
    debut.textContent = depart.toLocaleDateString('fr-FR',
      { day: 'numeric', month: 'long', year: 'numeric' });
  }

  const duree = dureeDepuis(depart, new Date());
  const livres = READINGS.length;
  cible.textContent = duree
    ? duree + ' · ' + livres + (livres > 1 ? ' livres lus' : ' livre lu')
    : '';

  const etagere = document.getElementById('rfg-shelf');
  if (etagere) {
    etagere.textContent = PHYSICAL_BOOKS
      + (PHYSICAL_BOOKS > 1 ? ' livres physiques' : ' livre physique');
  }

  /* Ce qui fait la prouesse, c'est le volume, pas la mise en page :
     un encadré prendrait plus de place qu'il n'en dit. */
  const liseuse = document.getElementById('rfg-reader');
  if (liseuse) {
    const d = new Date(LISEUSE.depuis + 'T00:00:00');
    liseuse.textContent = LISEUSE.modele + ' depuis le '
      + d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const note = document.getElementById('rfg-reader-note');
    if (note) {
      note.textContent = 'plus de ' + LISEUSE.ebooks.toLocaleString('fr-FR')
                       + ' ebooks · ' + LISEUSE.lus + ' lus';
    }
  }

  const feats = document.getElementById('rfg-feats');
  if (feats) {
    feats.innerHTML = PROUESSES.map(p =>
      '<span class="feat">' + esc(p.quoi)
      + '<small>' + p.pages.toLocaleString('fr-FR') + ' pages en '
      + p.jours + ' jours</small></span>').join('');
  }
}

function renderRefuge() {
  renderSince();
  const index = document.getElementById('rfg-index');
  const vue   = document.getElementById('rfg-preview');
  if (!index || !vue) return;
  const sujets = refugeTopics();

  index.innerHTML = sujets.map((t, i) =>
      '<button class="rfg-item' + (i === 0 ? ' active' : '') + '"'
    + ' type="button" data-cible="' + esc(t.id) + '"'
    + ' aria-controls="vue-' + esc(t.id) + '" aria-selected="' + (i === 0) + '">'
    + '<span class="rfg-num">' + String(i + 1).padStart(2, '0') + '</span>'
    + '<span><span class="rfg-name">' + esc(t.title) + '</span>'
    + '<span class="rfg-meta">' + esc(t.meta) + '</span></span>'
    + '</button>').join('');

  vue.innerHTML = sujets.map((t, i) =>
      '<article class="rfg-card' + (i === 0 ? ' active' : '') + '" id="vue-' + esc(t.id) + '">'
    + '<div class="rfg-top">'
    + '<span class="rfg-kicker tone-' + t.tone + '">'
    + '<svg class="icon icon-xs" aria-hidden="true"><use href="#' + esc(t.icon) + '"/></svg>'
    + esc(t.kicker) + '</span>'
    + '<span class="rfg-status">' + esc(t.status) + '</span></div>'
    + '<div class="rfg-body"><h3 class="rfg-title">' + esc(t.title) + '</h3>'
    + '<p class="rfg-copy">' + esc(t.copy) + '</p></div>'
    + '<div class="rfg-bottom">'
    + '<div class="rfg-stats">' + t.stats.map(([k, v]) =>
        '<span class="rfg-stat"><small>' + esc(k) + '</small><strong>'
        + esc(v) + '</strong></span>').join('') + '</div>'
    + '<a class="rfg-cta" href="#' + esc(t.page) + '">' + esc(t.cta)
    + '<svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-right"/></svg>'
    + '</a></div></article>').join('');

  index.querySelectorAll('.rfg-item').forEach(b => {
    b.addEventListener('click', () => {
      index.querySelectorAll('.rfg-item').forEach(x => {
        x.classList.remove('active'); x.setAttribute('aria-selected', 'false');
      });
      vue.querySelectorAll('.rfg-card').forEach(c => c.classList.remove('active'));
      b.classList.add('active'); b.setAttribute('aria-selected', 'true');
      const cible = document.getElementById('vue-' + b.dataset.cible);
      if (cible) cible.classList.add('active');
    });
  });
}

/* Les light novels ne sont pas des lectures finies : ils ont leur
   propre section, sous le refuge, et mènent droit aux guides. */
function renderLightNovels() {
  const host = document.getElementById('ln-list');
  if (!host) return;
  host.innerHTML = GUIDES.map((g, i) =>
      '<a class="ln-item" href="' + esc(g.href) + '">'
    + '<span class="ln-no">Guide ' + String(i + 1).padStart(2, '0') + '</span>'
    + '<span class="ln-name">' + esc(g.title) + '</span>'
    + '<span class="ln-copy">' + esc(g.short || g.meta) + '</span>'
    + '<span class="ln-go">Ouvrir'
    + '<svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-right"/></svg>'
    + '</span></a>').join('')
    + '<div class="ln-item is-coming">'
    + '<span class="ln-no">À venir</span>'
    + '<span class="ln-name">Prochain guide</span>'
    + '<span class="ln-copy">Il s’en ajoutera au fil de mes lectures.</span>'
    + '<span class="ln-go">Bientôt</span></div>';
}

/* ── Les 127 jours : le carnet ── */
const FR_MONTHS = ['janvier','février','mars','avril','mai','juin',
  'juillet','août','septembre','octobre','novembre','décembre'];


function renderBible() {
  const log = document.getElementById('bible-log');
  if (!log) return;

  const enToutesLettres = t =>
    Number(t.slice(8)) + ' ' + FR_MONTHS[Number(t.slice(5, 7)) - 1];

  /* Une seule ligne sous le titre : ce que c'est, et sur quoi ça court.
     Les 127 jours doivent rester vérifiables — sans ces deux dates, le
     carnet commence au 9 février et le compte ne tombe pas juste. */
  const range = document.getElementById('bible-range');
  if (range) {
    range.innerHTML = '<span class="bible-what">Mon carnet de lecture</span>'
      + '<span class="bible-span">du ' + esc(enToutesLettres(BIBLE.start))
      + ' au ' + esc(enToutesLettres(BIBLE.end)) + ' '
      + esc(BIBLE.end.slice(0, 4)) + '</span>';
  }

  /* Un livre → sa famille. La table est dans les données ; on l'inverse
     ici plutôt que de répéter la famille sur chaque ligne du carnet. */
  const famille = new Map();
  Object.entries(BIBLE.families).forEach(([cle, livres]) =>
    livres.forEach(l => famille.set(l, cle)));

  /* La légende : elle dit ce que la couleur signifie, et dit une fois
     pour toutes que chaque case est un livre terminé. */
  const leg = document.getElementById('bible-legend');
  if (leg) {
    const bloc = (titre, cles) =>
      '<div class="bib-lgroup"><p class="bib-lname">' + esc(titre) + '</p>'
      + cles.map(c => '<span class="bib-litem">'
          + '<i class="bib-swatch f-' + c + '" aria-hidden="true"></i>'
          + esc(BIBLE.familyNames[c]) + '</span>').join('')
      + '</div>';
    leg.innerHTML =
        '<p class="bib-lintro">La couleur dit à quelle famille appartient le '
      + 'livre. Chaque case marque un livre terminé ce jour-là.</p>'
      + '<div class="bib-lcols">'
      + bloc('Ancien Testament', ['pentateuque', 'historiques', 'poetiques', 'prophetes'])
      + bloc('Nouveau Testament', ['evangiles', 'lettres', 'apocalypse'])
      + '</div>';
  }

  /* Un jour, et tout ce qui s'y est terminé. Les jours où sept livres
     s'achèvent portent sept étiquettes : la grappe se voit sans qu'on
     ait à la compter. */
  const jours = [];
  const pousse = (cle, mois, libelle, nom) => {
    const dernier = jours[jours.length - 1];
    if (dernier && dernier.cle === cle) { dernier.livres.push(nom); return; }
    jours.push({ cle: cle, mois: mois, libelle: libelle, livres: [nom] });
  };

  /* La lecture commence le 31 janvier, mais le carnet ne dit pas quel
     jour ce livre-là s'est terminé : il garde son mois et un tiret. */
  BIBLE.entries.filter(e => !e[1])
    .forEach(([nom]) => pousse('2025-01-x', 0, '—', nom));

  BIBLE.entries.filter(e => e[1])
    .sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0)
    .forEach(([nom, d]) => pousse(d, Number(d.slice(5, 7)) - 1,
      String(Number(d.slice(8))).padStart(2, '0') + ' '
      + FR_MONTHS[Number(d.slice(5, 7)) - 1].slice(0, 4), nom));

  const nbLivres = n => n + (n > 1 ? ' livres' : ' livre');
  const mois = [];
  jours.forEach(j => {
    const dernier = mois[mois.length - 1];
    if (dernier && dernier.m === j.mois) { dernier.jours.push(j); return; }
    mois.push({ m: j.mois, jours: [j] });
  });

  log.innerHTML = mois.map((bloc, i) => {
    const total = bloc.jours.reduce((n, j) => n + j.livres.length, 0);
    return '<section class="bib-month">'
      + '<header class="bib-mhead">'
      + '<span class="bib-mnum">' + String(i + 1).padStart(2, '0') + '</span>'
      + '<h4 class="bib-mtitle">' + FR_MONTHS[bloc.m] + '</h4>'
      + '<span class="bib-mcount">' + nbLivres(total) + '</span></header>'
      + '<div class="bib-days">'
      + bloc.jours.map(j => '<article class="bib-day">'
          + '<span class="bib-date">' + esc(j.libelle) + '</span>'
          + j.livres.map(l => '<span class="bib-book f-'
              + (famille.get(l) || 'apocalypse') + '">' + esc(l) + '</span>').join('')
          + '</article>').join('')
      + '</div></section>';
  }).join('');
}


/* Les années se parcourent depuis la page elle-même : une pastille
   par année, celle qu'on lit en aplat. Une année sans livre reste
   accessible — elle mène à son état vide, qui le dit. */
function renderYearPills(current) {
  const host = document.getElementById('year-pills');
  if (!host) return;
  /* Dans le sens de la lecture : on commence par la première année,
     pas par la dernière. */
  host.innerHTML = YEARS.slice().sort((a, b) => a - b).map(y => {
    const n = booksOfYear(y).length;
    const cur = y === current;
    return '<a class="year-pill' + (cur ? ' is-current' : '')
      + (n ? '' : ' is-empty') + '" href="#lectures-' + y + '"'
      + (cur ? ' aria-current="page"' : '')
      + '><span class="year-pill-y">' + y + '</span>'
      + '<span class="year-pill-n">' + (n || '—') + '</span></a>';
  }).join('');
}

/* ── Belles découvertes ─────────────────────────────────────
   Un objet par carte. Tout est facultatif sauf le nom : une
   trouvaille peut n'être qu'un nom en attendant qu'elle soit
   racontée, et la carte ne montre pas de trou pour autant. */
function findCard(d) {
  const img = d.image
    /* Noms de fichiers libres : espaces et accents passent par l'encodage,
       comme pour les couvertures. */
    ? '<div class="find-shot"><img src="assets/img/decouvertes/' + esc(encodeURIComponent(d.image))
      + '" alt="' + esc(d.name) + '" loading="lazy"'
      + ' onerror="this.parentNode.remove()"></div>'
    : '';
  const link = d.url
    ? '<span class="find-go">Voir'
      + '<svg class="icon icon-xs" aria-hidden="true"><use href="#i-arrow-ur"/></svg>'
      + '</span>'
    : '';
  const body = img
    + (d.kind ? '<p class="find-kind">' + esc(d.kind) + '</p>' : '')
    + '<p class="find-name">' + esc(d.name) + '</p>'
    + (d.note ? '<p class="find-note">' + esc(d.note) + '</p>' : '')
    + link;
  return d.url
    ? '<a class="find is-linked" href="' + esc(d.url)
      + '" target="_blank" rel="noopener">' + body + '</a>'
    : '<article class="find">' + body + '</article>';
}

/* Avec une URL le titre devient un lien externe ; sans, il reste du
   texte. Pas de lien vide, jamais. */
function recoNom(it) {
  return it.url
    ? '<a class="reco-out" href="' + esc(it.url) + '" target="_blank"'
      + ' rel="noopener">' + esc(it.titre)
      + '<svg class="icon icon-xs" aria-hidden="true">'
      + '<use href="#i-arrow-ur"/></svg></a>'
    : esc(it.titre);
}


/* Le mur d'affiches — les entrées qui portent une image.
   Toutes les tuiles ont la même hauteur ; c'est la largeur qui varie,
   pour que chaque visuel garde son format. Voir .reco-wall dans la
   feuille de style : le pourquoi du découpage y est écrit.

   Un seul mur, sans section par année : c'est la pastille qui dit
   l'année, la répéter en en-tête ne dirait rien de plus. */
function recoMur(items, visuel) {
  return items.length ? murHTML(items, visuel) : '';
}


/* L'année sur laquelle un dossier s'ouvre : la plus ancienne, comme
   sa liste. Vide si le dossier n'est pas rangé par année. */
function recoPremiereAnnee(d) {
  const ans = d.items.map(it => it.an).filter(Boolean);
  return ans.length ? String(Math.min(...ans)) : '';
}


function murHTML(items, visuel) {
  return '<ul class="reco-wall">' + items.map(it =>
      '<li' + (it.large ? ' class="is-wide"' : '')
    /* L'année voyage avec la tuile : le filtre n'a pas à relire les
       données pour savoir ce qu'il masque. */
    + ' data-an="' + (it.an || '') + '">'
    + '<span class="reco-shot">'
    + '<img src="assets/img/' + esc(cheminImg(it.image)) + '"'
    + ' alt="' + esc(visuel || 'Couverture') + ' de ' + esc(it.titre) + '" loading="lazy"'
    + ' onload="recoFormat(this)">'
    + (it.etat ? '<b class="reco-etat">' + esc(it.etat) + '</b>' : '')
    + '</span>'
    + '<p class="reco-nom">' + recoNom(it)
    + (it.par ? '<span>' + esc(it.par) + '</span>' : '') + '</p>'
    + (it.pourquoi ? '<p class="reco-note-tuile">' + esc(it.pourquoi) + '</p>' : '')
    + '</li>').join('') + '</ul>';
}


/* Les noms de fichiers sont ceux de Sarindra — espaces, accents,
   apostrophes — et le chemin en compte plusieurs niveaux. On encode
   segment par segment : encoder d'un bloc transformerait les « / »
   en %2F et l'image ne serait plus trouvée. */
function cheminImg(chemin) {
  return chemin.split('/').map(encodeURIComponent).join('/');
}


/* Filet de sécurité : `large` est déclaré à la main dans CONSEILS, et
   c'est le genre de détail qu'on oublie. L'image chargée sait, elle.
   Appelé par l'attribut onload, donc global. */
function recoFormat(img) {
  const tuile = img.closest('li');
  if (tuile) tuile.classList.toggle('is-wide', img.naturalWidth > img.naturalHeight);
}


function renderConseils() {
  const arbre = document.getElementById('reco-tree');
  const vue   = document.getElementById('reco-panel');
  const lead  = document.getElementById('favoris-lead');
  if (lead) {
    lead.textContent = 'Livres, vidéos, séries et ressources que j\u2019ai aimés '
                     + 'et que j\u2019ai envie de partager.';
  }
  if (!arbre || !vue) return;

  /* La colonne ne porte que les dossiers : les années sont dans le
     panneau, en pastilles, juste au-dessus des couvertures qu'elles
     filtrent. Une commande se place près de ce qu'elle commande. */
  arbre.innerHTML =
      '<p class="reco-root">Bibliothèque</p>'
    + '<ul>' + CONSEILS.map((d, i) =>
        '<li><button class="reco-folder' + (i === 0 ? ' active' : '') + '"'
      + ' type="button" data-cible="' + esc(d.id) + '"'
      + ' aria-controls="dossier-' + esc(d.id) + '" aria-selected="' + (i === 0) + '">'
      + '<span class="reco-ico">'
      + '<svg class="icon icon-sm" aria-hidden="true"><use href="#' + esc(d.icone) + '"/></svg>'
      + '</span><span class="reco-nomdoss">' + esc(d.nom) + '</span></button></li>')
      .join('') + '</ul>';


  vue.innerHTML = CONSEILS.map((d, i) =>
      '<article class="reco-card' + (i === 0 ? ' active' : '') + '"'
    + ' id="dossier-' + esc(d.id) + '" data-an="' + recoPremiereAnnee(d) + '">'
    + '<p class="reco-kicker">Ma sélection</p>'
    + '<h4 class="reco-title">' + esc(d.nom) + '</h4>'
    + '<p class="reco-lead">' + esc(d.lead) + '</p>'
    + recoOutils(d)
    + recoMur(d.items.filter(it => it.image), d.visuel)
    + (d.items.some(it => !it.image)
        ? '<ul class="reco-items">' + d.items.filter(it => !it.image).map(it => {
            return '<li><p class="reco-item">' + recoNom(it)
              + (it.par ? '<span> · ' + esc(it.par) + '</span>' : '') + '</p>'
              + (it.pourquoi ? '<p class="reco-why">' + esc(it.pourquoi) + '</p>' : '')
              + '</li>';
          }).join('') + '</ul>'
        : '')
    /* Le site a déjà son bloc « rien ici pour l'instant » : on le
       reprend plutôt que d'en dessiner un second. */
    + (d.items.length ? '' : emptyState(d.icone, 'Sélection à venir',
        'La mise en page est prête : ce dossier s’affichera dès qu’il '
      + 'aura sa première entrée.'))
    + '</article>').join('');

  /* Même mécanique que le sommaire du Refuge : on bascule une classe,
     rien n'est reconstruit. */
  arbre.querySelectorAll('.reco-folder').forEach(b => {
    b.addEventListener('click', () => {
      arbre.querySelectorAll('.reco-folder').forEach(x => {
        x.classList.remove('active');
        x.setAttribute('aria-selected', 'false');
      });
      b.classList.add('active');
      b.setAttribute('aria-selected', 'true');
      vue.querySelectorAll('.reco-card').forEach(c =>
        c.classList.toggle('active', c.id === 'dossier-' + b.dataset.cible));
    });
  });

  /* Année et recherche filtrent le même mur, et s'additionnent :
     on relance donc le même tri dans les deux cas. */
  vue.querySelectorAll('.reco-years .year-pill').forEach(b => {
    b.addEventListener('click', () => {
      const carte = b.closest('.reco-card');
      carte.querySelectorAll('.year-pill').forEach(x => {
        x.classList.remove('is-current');
        x.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('is-current');
      b.setAttribute('aria-pressed', 'true');
      carte.dataset.an = b.dataset.an || '';
      recoFiltrer(carte);
    });
  });
  vue.querySelectorAll('.reco-card').forEach(recoFiltrer);
}




/* Années et recherche. Rien de tout cela n'apparaît sur un dossier
   qu'on embrasse d'un coup d'œil : dix affiches se parcourent plus
   vite qu'elles ne se cherchent. */
/* Les onglets d'année, et rien d'autre. Pas de champ de recherche :
   une année compte treize à dix-neuf titres, tous visibles d'un coup
   — on les parcourt plus vite qu'on ne les cherche. Le compte, lui,
   est déjà porté par l'onglet, comme dans « Mes lectures ».

   Pas de « Tout » non plus : une année est toujours choisie, la
   première par défaut. Les couvertures affichées disent donc toujours
   une année précise, et l'en-tête d'année devient inutile.

   Ce sont les onglets de « Mes lectures », repris tels quels : le
   même geste doit se présenter partout sous la même forme, sinon on
   le réapprend d'une page à l'autre. */
function recoOutils(d) {
  const ans = [...new Set(d.items.filter(it => it.an).map(it => it.an))]
                .sort((a, b) => a - b);
  if (!ans.length) return '';
  return '<div class="reco-years" role="group" aria-label="Filtrer par année">'
    + ans.map((a, i) => {
        const n = d.items.filter(it => it.an === a).length;
        return '<button class="year-pill' + (i === 0 ? ' is-current' : '')
          + '" type="button" data-an="' + a + '"'
          + ' aria-pressed="' + (i === 0) + '">'
          + '<span class="year-pill-y">' + a + '</span>'
          + '<span class="year-pill-n">' + n + '</span></button>';
      }).join('')
    + '</div>';
}


function recoFiltrer(carte) {
  const an = carte.dataset.an || '';
  if (!an) return;
  carte.querySelectorAll('.reco-wall li').forEach(li => {
    li.hidden = li.dataset.an !== an;
  });
}


function renderFinds() {
  const host = document.getElementById('finds');
  const lead = document.getElementById('finds-lead');
  if (!host) return;
  if (lead) {
    lead.textContent = DISCOVERIES.length
      ? 'Des achats que je referais.'
      : '';
  }
  host.innerHTML = DISCOVERIES.length
    ? DISCOVERIES.map(findCard).join('')
    : emptyState('i-spark', 'Bientôt',
        'Cette étagère-là n’est pas encore garnie.');
}


/* Page d'une année : même bloc pour toutes, rempli à la volée. */
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
              'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/* Une étagère se découpe par mois dès qu'un seul livre de l'année porte
   un `month`. Tant qu'aucun ne l'a, on garde la grille simple : mieux
   vaut pas de mois du tout qu'un fourre-tout « mois à retrouver ».
   Les livres sans mois d'une année qui en a se rangent à la fin. */
function shelfHTML(books) {
  if (!books.some(b => b.month)) return books.map(bookCard).join('');

  const parMois = new Map();
  books.forEach(b => {
    const cle = b.month || 0;
    if (!parMois.has(cle)) parMois.set(cle, []);
    parMois.get(cle).push(b);
  });

  return [...parMois.keys()].sort((a, b) => (a || 99) - (b || 99)).map(cle => {
    const lot = parMois.get(cle);
    return '<section class="yr-month">'
      + '<header class="yr-mhead">'
      +   '<span class="yr-mnum">' + (cle ? String(cle).padStart(2, '0') : '—') + '</span>'
      +   '<h3 class="yr-mtitle">' + esc(cle ? MOIS[cle - 1] : 'mois à retrouver') + '</h3>'
      +   '<span class="yr-mcount">' + lot.length
      +     (lot.length > 1 ? ' livres' : ' livre') + '</span>'
      + '</header>'
      + '<div class="yr-books">' + lot.map(bookCard).join('') + '</div>'
      + '</section>';
  }).join('');
}

function renderYear(year) {
  const list = document.getElementById('read-list');
  const title = document.getElementById('year-title');
  const lead = document.getElementById('year-lead');
  if (!list || !title) return;

  const books = booksOfYear(year);
  const n = books.length;
  renderYearPills(year);
  title.textContent = 'Mes lectures de ' + year;
  lead.textContent = n
    ? n + (n > 1 ? ' livres' : ' livre')
      + (year === THIS_YEAR ? ' depuis janvier.' : ' cette année-là.')
    : 'Je n’ai pas encore reconstitué cette année.';
  list.classList.toggle('is-grouped', books.some(b => b.month));
  list.innerHTML = books.length
    ? shelfHTML(books)
    : emptyState('i-book', 'À reconstituer',
        'Les livres de ' + year + ' ne sont pas encore notés. Ils arriveront ici.');
}

/* ════════════════════════════════════════════════════════════
   7. DISPONIBILITÉ — application
   ════════════════════════════════════════════════════════════ */
function applyAvailability() {
  const conf = AVAILABILITY_COPY[AVAILABILITY] || AVAILABILITY_COPY.selective;

  const card = document.getElementById('avail-card');
  const dot  = document.getElementById('avail-dot');
  const text = document.getElementById('avail-text');

  if (card) card.dataset.tone = conf.tone;
  if (text) text.textContent = conf.text;
  if (dot) {
    dot.textContent = conf.label;
    dot.setAttribute('title', 'Updated ' + formatMonth(AVAILABILITY_UPDATED));
  }

  const stamp = document.getElementById('avail-updated');
  if (stamp) stamp.textContent = 'Status updated ' + formatMonth(AVAILABILITY_UPDATED);

  // même source de vérité pour la fiche « At a glance » de la page About
  const fact = document.getElementById('fact-status');
  const factSub = document.getElementById('fact-status-sub');
  if (fact) fact.childNodes[0].nodeValue = conf.label;
  if (factSub) factSub.textContent = 'Updated ' + formatMonth(AVAILABILITY_UPDATED);
}

/* ════════════════════════════════════════════════════════════
   8. FORMULAIRE DE CONTACT — Formspree
   ════════════════════════════════════════════════════════════ */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojkzoae';

function sendMessage(btnEl) {
  const page = document.getElementById('page-contact');
  const q = sel => page.querySelector(sel);

  const nameEl = q('#name'), emailEl = q('#email');
  const subjectEl = q('#subject'), messageEl = q('#message');
  const errBox = q('#form-error'), errBoxMsg = q('#form-error-msg');
  const successEl = q('#form-success'), formBody = q('#contact-form-body');
  const btnText = q('#send-btn-text');

  ['#err-name', '#err-email', '#err-message'].forEach(s => { q(s).textContent = ''; });
  [nameEl, emailEl, messageEl].forEach(el => el.classList.remove('input-error'));
  errBox.hidden = true;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const subject = subjectEl.value.trim();
  const message = messageEl.value.trim();

  let valid = true;
  const fail = (el, errSel, msg) => {
    q(errSel).textContent = msg;
    el.classList.add('input-error');
    valid = false;
  };

  if (!name) fail(nameEl, '#err-name', 'Please enter your name.');
  if (!email) fail(emailEl, '#err-email', 'Please enter your email.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fail(emailEl, '#err-email', 'This email address doesn’t look valid.');
  if (!message) fail(messageEl, '#err-message', 'Please write a message.');

  if (!valid) {
    page.querySelector('.input-error').focus();
    return;
  }

  btnEl.disabled = true;
  btnText.textContent = 'Sending…';

  const restore = msg => {
    errBoxMsg.textContent = msg;
    errBox.hidden = false;
    btnText.textContent = 'Send message';
    btnEl.disabled = false;
  };

  fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, subject: subject || 'Contact from portfolio', message })
  })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        const msg = (data && data.errors && data.errors[0])
          ? data.errors[0].message
          : 'The message could not be sent. Please try again.';
        restore(msg);
        return;
      }
      btnEl.classList.add('is-sent');
      btnText.textContent = 'Message sent';
      setTimeout(() => {
        formBody.hidden = true;
        successEl.hidden = false;
        successEl.querySelector('h4').focus();
      }, 700);
    })
    .catch(() => restore('Connection error. Please try again, or email me directly.'));
}

function resetContactForm() {
  const page = document.getElementById('page-contact');
  page.querySelector('#form-success').hidden = true;
  page.querySelector('#contact-form-body').hidden = false;
  page.querySelector('#form-error').hidden = true;

  ['#name', '#email', '#subject', '#message'].forEach(s => { page.querySelector(s).value = ''; });
  ['#err-name', '#err-email', '#err-message'].forEach(s => { page.querySelector(s).textContent = ''; });

  const btn = page.querySelector('#send-btn');
  btn.disabled = false;
  btn.classList.remove('is-sent');
  page.querySelector('#send-btn-text').textContent = 'Send message';
  page.querySelector('#name').focus();
}

/* ════════════════════════════════════════════════════════════
   9. GRAPHIQUES — palette Petrol & Sand
   ════════════════════════════════════════════════════════════ */
let chartsInitialized = false;

function initCharts() {
  if (chartsInitialized || typeof Chart === 'undefined') return;
  chartsInitialized = true;

  const CYAN = '#0B7699', SLATE = '#173B4D', SAND = '#B5601F';
  const GRID = '#A9C4D1', TICK = '#4E6D7C', INK = '#0A2634';

  Chart.defaults.font.family = "'Instrument Sans', system-ui, sans-serif";
  Chart.defaults.color = TICK;

  const axis = max => ({
    x: { grid: { color: GRID, drawTicks: false }, border: { color: GRID }, ticks: { color: TICK, font: { size: 12 } } },
    y: { grid: { color: GRID, drawTicks: false }, border: { display: false },
         ticks: { color: TICK, font: { size: 11 }, stepSize: 25 }, min: 0, max: max }
  });

  const bar = (el, labels, data, color) => {
    if (!el) return;
    new Chart(el, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Proficiency (%)', data, backgroundColor: color, borderRadius: 0, borderSkipped: false, maxBarThickness: 46 }] },
      options: {
        responsive: true,
        scales: axis(100),
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: INK, padding: 10, cornerRadius: 0, displayColors: false }
        }
      }
    });
  };

  const radarEl = document.getElementById('radarChart');
  if (radarEl) {
    new Chart(radarEl, {
      type: 'radar',
      data: {
        labels: ['Data Engineering', 'Generative AI', 'Analytics / BI', 'Python / Dev', 'Big Data', 'Databases'],
        datasets: [{
          label: 'Proficiency (%)',
          data: [88, 87, 92, 95, 83, 85],
          backgroundColor: 'rgba(11, 118, 153, 0.16)',
          borderColor: '#0A6A8A',
          borderWidth: 2,
          pointBackgroundColor: SAND,
          pointBorderColor: '#F4F9FB',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { color: GRID },
            grid: { color: GRID },
            pointLabels: { color: SLATE, font: { size: 12, weight: '500' } },
            ticks: { color: TICK, backdropColor: 'transparent', stepSize: 25, font: { size: 10 } },
            suggestedMin: 0, suggestedMax: 100
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: INK, padding: 10, cornerRadius: 0, displayColors: false }
        }
      }
    });
  }

  bar(document.getElementById('barChart1'),
      ['Python', 'SQL', 'Flask', 'Java', 'Django'], [95, 88, 85, 75, 70], CYAN);
  bar(document.getElementById('barChart2'),
      ['Power BI', 'OpenAI', 'Kafka', 'Claude Code', 'PySpark'], [92, 90, 88, 85, 80], SLATE);
}

/* ════════════════════════════════════════════════════════════
   10. RÉVÉLATION AU DÉFILEMENT
   Le contenu est visible par défaut ; l'animation n'est ajoutée
   que si le navigateur la supporte et que l'utilisateur ne l'a
   pas désactivée.
   ════════════════════════════════════════════════════════════ */
const ANIM_SELECTOR = [
  '.sec-hd', '.ab-state', '.ab-band', '.ab-quote', '.exp-item', '.edu-card', '.cert-card',
  '.drives-card', '.skill-cat-card', '.skill-bars-card',
  '.proj-card-v2', '.collab-banner', '.contact-form-card', '.contact-info-card',
  '.avail-card', '.loc-card', '.book', '.topic-card'
].join(',');

let revealObserver = null;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initReveal() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
}

function revealIn(root) {
  if (!revealObserver) return;
  root.querySelectorAll(ANIM_SELECTOR).forEach((el, i) => {
    el.classList.add('anim-ready');
    el.classList.remove('visible');
    el.style.transitionDelay = Math.min(i, 8) * 0.05 + 's';
    revealObserver.observe(el);
  });
}

/* ── Compteurs du hero ── */
function animateCounters() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll('.hstat-n').forEach(el => {
    const m = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!m) return;
    const target = parseInt(m[1], 10), suffix = m[2];
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 24));
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(id);
    }, 40);
  });
}

/* ════════════════════════════════════════════════════════════
   11. INIT
   ════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyAvailability();
  renderRefuge();
  renderLightNovels();
  renderFinds();
  renderConseils();
  renderBible();
  initTabs();
  initTabLinks();
  initProjectFilter();
  initReveal();

  document.getElementById('nav-burger').addEventListener('click', toggleMenu);
  document.getElementById('send-btn').addEventListener('click', function () { sendMessage(this); });
  document.getElementById('reset-form-btn').addEventListener('click', resetContactForm);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Le navigateur restaure lui aussi le défilement sur « précédent »,
     mais ici toutes les pages partagent un document : sa mesure ne veut
     rien dire. On la coupe, et on tient la nôtre. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* Le fil d'Ariane remonte d'un cran : c'est un retour, lui aussi.
     Le clic est écouté au niveau du document parce que les fils sont
     redessinés à chaque changement de page. */
  document.addEventListener('click', e => {
    if (e.target.closest && e.target.closest('.crumbs a')) marquerRetour();
  });

  window.addEventListener('hashchange', naviguer);

  /* Avant de quitter le document, on note où on en était. */
  window.addEventListener('pagehide', () => {
    if (pageCourante) POSITIONS[pageCourante] = window.scrollY;
    ecrirePositions();
  });
  /* Page ressortie du cache du navigateur : le script ne repart pas,
     mais le défilement, lui, est à remettre. */
  window.addEventListener('pageshow', e => {
    if (!e.persisted) return;
    const id = currentHashPage();
    if (POSITIONS[id] != null) window.scrollTo({ top: POSITIONS[id], behavior: 'auto' });
  });

  corrigerAdresse();
  const repriseAuChargement = arriveDUnRetour()
    && POSITIONS[currentHashPage()] != null;
  showPage(currentHashPage(),
    { silent: !repriseAuChargement, reprendre: repriseAuChargement });
  if (history.state == null) history.replaceState({ rang: ++rangHistorique }, '');
  ecrirePositions();

  setTimeout(animateCounters, 700);
});
