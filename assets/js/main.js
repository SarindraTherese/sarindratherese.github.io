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
  { name: 'Kindle', kind: 'Liseuse', note: '' },
  { name: 'Vanow', kind: 'Mug', note: '' },
  { name: 'Bablov', kind: 'Tumbler', note: '' },
];


const READINGS = [
  /* ── 2022 ── */
  { year: 2022, title: 'Le guide du lightworker', author: 'Isabelle Cerf', cover: 'le-guide-du-lightworker.jpg' },
  { year: 2022, title: 'Penser comme un millionnaire', cover: 'penser-comme-un-millionnaire.jpg' },
  { year: 2022, title: 'Apprendre à gérer son argent', cover: 'apprendre-a-gerer-son-argent.jpg' },
  { year: 2022, title: 'L\'art de la confiance en soi', cover: 'l-art-de-la-confiance-en-soi.jpg' },
  { year: 2022, title: 'La clé de votre énergie', author: 'Natacha Calestrémé', cover: 'la-cle-de-votre-energie.jpg' },
  { year: 2022, title: 'Le guide détendu des émotions au travail', cover: 'le-guide-detendu-des-emotions-au-travail.jpg' },
  { year: 2022, title: 'L\'obstacle est le chemin', author: 'Ryan Holiday', cover: 'l-obstacle-est-le-chemin.jpg' },
  { year: 2022, title: 'Père riche, père pauvre', author: 'Robert Kiyosaki', cover: 'pere-riche-pere-pauvre.jpg' },
  { year: 2022, title: 'La magie du rangement illustrée', author: 'Marie Kondo', cover: 'la-magie-du-rangement-illustree.jpg' },
  { year: 2022, title: 'The Personal MBA', author: 'Josh Kaufman', cover: 'the-personal-mba.jpg' },
  { year: 2022, title: 'Trouver ma place', cover: 'trouver-ma-place.jpg' },
  { year: 2022, title: 'Ta deuxième vie commence quand tu comprends que tu n\'en as qu\'une', author: 'Raphaëlle Giordano', cover: 'ta-deuxieme-vie-commence-quand-tu-comprends-que-tu-n.jpg' },
  { year: 2022, title: 'Le miracle de la pleine conscience', author: 'Thich Nhat Hanh', cover: 'le-miracle-de-la-pleine-conscience.jpg' },
  { year: 2022, title: 'L\'homme qui voulait être heureux', author: 'Laurent Gounelle', cover: 'l-homme-qui-voulait-etre-heureux.jpg' },
  { year: 2022, title: 'Le pouvoir du moment présent', author: 'Eckhart Tolle', cover: 'le-pouvoir-du-moment-present.jpg' },
  { year: 2022, title: 'La puissance de l\'acceptation', cover: 'la-puissance-de-l-acceptation.jpg' },
  { year: 2022, title: 'L\'Alchimiste', author: 'Paulo Coelho', cover: 'l-alchimiste.jpg' },
  { year: 2022, title: 'Les mots sont des fenêtres', author: 'Marshall Rosenberg', cover: 'les-mots-sont-des-fenetres.jpg' },
  { year: 2022, title: 'Les 5 blessures', author: 'Lise Bourbeau', cover: 'les-5-blessures.jpg' },
  { year: 2022, title: 'Progressez à pas de géant', author: 'Anthony Robbins', cover: 'progressez-a-pas-de-geant.jpg' },
  { year: 2022, title: 'Miracle Morning', author: 'Hal Elrod', cover: 'miracle-morning.jpg' },
  { year: 2022, title: 'Qui es-tu ?', cover: 'qui-es-tu.jpg' },
  { year: 2022, title: 'Devenir super-conscient', author: 'Joe Dispenza', cover: 'devenir-super-conscient.jpg' },
  { year: 2022, title: 'Kilomètre zéro', author: 'Maud Ankaoua', cover: 'kilometre-zero.jpg' },
  { year: 2022, title: 'Communiquer et guérir avec les anges', cover: 'communiquer-et-guerir-avec-les-anges.jpg' },
  { year: 2022, title: 'Révélez la sorcière qui dort en vous', cover: 'revelez-la-sorciere-qui-dort-en-vous.jpg' },
  { year: 2022, title: 'Le livre des esprits', author: 'Allan Kardec', cover: 'le-livre-des-esprits.jpg' },
  { year: 2022, title: 'La prophétie des Andes', author: 'James Redfield', cover: 'la-prophetie-des-andes.jpg' },
  { year: 2022, title: 'Écoute ton corps', author: 'Lise Bourbeau', cover: 'ecoute-ton-corps.jpg' },
  { year: 2022, title: 'Réfléchissez et devenez riche', author: 'Napoleon Hill', cover: 'reflechissez-et-devenez-riche.jpg' },
  { year: 2022, title: 'Les quatre accords toltèques', author: 'Don Miguel Ruiz', cover: 'les-quatre-accords-tolteques.jpg' },
  { year: 2022, title: 'Prendre soin de l\'enfant intérieur', author: 'Thich Nhat Hanh', cover: 'prendre-soin-de-l-enfant-interieur.jpg' },
  { year: 2022, title: 'À la croisée des mondes', author: 'Philip Pullman', cover: 'a-la-croisee-des-mondes.jpg' },
  /* ── 2023 ── */
  { year: 2023, title: 'La Wicca', author: 'Scott Cunningham', cover: 'la-wicca.jpg' },
  { year: 2023, title: 'Trois minutes à méditer', author: 'Christophe André', cover: 'trois-minutes-a-mediter.jpg' },
  { year: 2023, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', cover: 'le-petit-prince.jpg' },
  { year: 2023, title: 'Devenir', author: 'Michelle Obama', cover: 'devenir.jpg' },
  { year: 2023, title: 'Le charme discret de l\'intestin', author: 'Giulia Enders', cover: 'le-charme-discret-de-l-intestin.jpg' },
  { year: 2023, title: 'Transformez votre vie', author: 'Louise Hay', cover: 'transformez-votre-vie.jpg' },
  { year: 2023, title: 'Deep Work', author: 'Cal Newport', cover: 'deep-work.jpg' },
  { year: 2023, title: 'Le livre des médiums', author: 'Allan Kardec', cover: 'le-livre-des-mediums.jpg' },
  { year: 2023, title: 'Oser', author: 'Frédéric Fanget', cover: 'oser.jpg' },
  { year: 2023, title: 'S\'ouvrir à l\'amour et au bonheur', author: 'Don Miguel Ruiz', cover: 's-ouvrir-a-l-amour-et-au-bonheur.jpg' },
  { year: 2023, title: 'Orgueil et préjugés', author: 'Jane Austen', cover: 'orgueil-et-prejuges.jpg' },
  { year: 2023, title: 'Et si c\'était vrai', author: 'Marc Levy', cover: 'et-si-c-etait-vrai.jpg' },
  { year: 2023, title: 'Conversations avec Dieu, tome 1', author: 'Neale Donald Walsch', cover: 'conversations-avec-dieu-tome-1.jpg' },
  { year: 2023, title: 'La confiance en soi, une philosophie', author: 'Charles Pépin', cover: 'la-confiance-en-soi-une-philosophie.jpg' },
  { year: 2023, title: 'Le jour où j\'ai appris à vivre', author: 'Laurent Gounelle', cover: 'le-jour-ou-j-ai-appris-a-vivre.jpg' },
  { year: 2023, title: 'Techniques de visualisation créatrice', author: 'Shakti Gawain', cover: 'techniques-de-visualisation-creatrice.jpg' },
  { year: 2023, title: 'Da Vinci Code', author: 'Dan Brown', cover: 'da-vinci-code.jpg' },
  { year: 2023, title: 'L\'Étranger', author: 'Albert Camus', cover: 'l-etranger.jpg' },
  { year: 2023, title: 'Plus jamais', author: 'Colleen Hoover', cover: 'plus-jamais.jpg' },
  { year: 2023, title: 'Petit traité de vie intérieure', author: 'Frédéric Lenoir', cover: 'petit-traite-de-vie-interieure.jpg' },
  { year: 2023, title: 'Testament des abeilles', author: 'Natacha Calestrémé', cover: 'testament-des-abeilles.jpg' },
  { year: 2023, title: 'Le livre des coïncidences', author: 'Deepak Chopra', cover: 'le-livre-des-coincidences.jpg' },
  { year: 2023, title: 'Conversations avec Dieu, tome 2', author: 'Neale Donald Walsch', cover: 'conversations-avec-dieu-tome-2.jpg' },
  { year: 2023, title: 'Nos étoiles contraires', author: 'John Green', cover: 'nos-etoiles-contraires.jpg' },
  { year: 2023, title: 'Il est grand temps de rallumer les étoiles', author: 'Virginie Grimaldi', cover: 'il-est-grand-temps-de-rallumer-les-etoiles.jpg' },
  { year: 2023, title: 'Onze minutes', author: 'Paulo Coelho', cover: 'onze-minutes.jpg' },
  { year: 2023, title: 'Tremblez mais osez', author: 'Susan Jeffers', cover: 'tremblez-mais-osez.jpg' },
  { year: 2023, title: 'La loi de l\'attraction', author: 'Michael Losier', cover: 'la-loi-de-l-attraction.jpg' },
  { year: 2023, title: 'L\'estime de soi', author: 'Christophe André et François Lelord', cover: 'l-estime-de-soi.jpg' },
  { year: 2023, title: 'N\'ayez pas peur de la vie', cover: 'n-ayez-pas-peur-de-la-vie.jpg' },
  { year: 2023, title: 'Steve Jobs', author: 'Walter Isaacson', cover: 'steve-jobs.jpg' },
  { year: 2023, title: 'Méditer, jour après jour', author: 'Christophe André', cover: 'mediter-jour-apres-jour.jpg' },
  { year: 2023, title: 'La femme parfaite est une connasse', author: 'Anne-Sophie et Marie-Aldine Girard', cover: 'la-femme-parfaite-est-une-connasse.jpg' },
  { year: 2023, title: 'Comment se faire des amis', author: 'Dale Carnegie', cover: 'comment-se-faire-des-amis.jpg' },
  { year: 2023, title: 'La formule de Dieu', author: 'José Rodrigues dos Santos', cover: 'la-formule-de-dieu.jpg' },
  { year: 2023, title: 'La magie de la foi', author: 'Claude Bristol', cover: 'la-magie-de-la-foi.jpg' },
  { year: 2023, title: 'Qui a piqué mon fromage ?', author: 'Spencer Johnson', cover: 'qui-a-pique-mon-fromage.jpg' },
  { year: 2023, title: 'La ferme des animaux', author: 'George Orwell', cover: 'la-ferme-des-animaux.jpg' },
  { year: 2023, title: 'Harry Potter à l\'école des sorciers', author: 'J. K. Rowling', cover: 'harry-potter-a-l-ecole-des-sorciers.jpg' },
  { year: 2023, title: 'Harry Potter et la chambre des secrets', author: 'J. K. Rowling', cover: 'harry-potter-et-la-chambre-des-secrets.jpg' },
  { year: 2023, title: 'Imparfaits, libres et heureux', author: 'Christophe André', cover: 'imparfaits-libres-et-heureux.jpg' },
  { year: 2023, title: 'La vie !', author: 'Louise Hay', cover: 'la-vie.jpg' },
  { year: 2023, title: 'La magie de voir grand', author: 'David Schwartz', cover: 'la-magie-de-voir-grand.jpg' },
  /* ── 2024 ── */
  { year: 2024, title: 'Quand on veut, on peut !', cover: 'quand-on-veut-on-peut.jpg' },
  { year: 2024, title: 'Je pense trop', author: 'Christel Petitcollin', cover: 'je-pense-trop.jpg' },
  { year: 2024, title: 'Il y a quelqu\'un dans la maison', author: 'Stephanie Perkins', cover: 'il-y-a-quelqu-un-dans-la-maison.jpg' },
  { year: 2024, title: 'La tresse', author: 'Laetitia Colombani', cover: 'la-tresse.jpg' },
  { year: 2024, title: 'Les impatientes', author: 'Djaïli Amadou Amal', cover: 'les-impatientes.jpg' },
  { year: 2024, title: 'Plus rien ne pourra me blesser', author: 'David Goggins', cover: 'plus-rien-ne-pourra-me-blesser.jpg' },
  { year: 2024, title: 'Numéro deux', author: 'David Foenkinos', cover: 'numero-deux.jpg' },
  { year: 2024, title: 'Harry Potter et le prisonnier d\'Azkaban', author: 'J. K. Rowling', cover: 'harry-potter-et-le-prisonnier-d-azkaban.jpg' },
  { year: 2024, title: 'Harry Potter et la coupe de feu', author: 'J. K. Rowling', cover: 'harry-potter-et-la-coupe-de-feu.jpg' },
  { year: 2024, title: 'Les hauts de Hurlevent', author: 'Emily Brontë', cover: 'les-hauts-de-hurlevent.jpg' },
  { year: 2024, title: 'Psychologie de la peur', author: 'Christophe André', cover: 'psychologie-de-la-peur.jpg' },
  { year: 2024, title: 'Je revenais des autres', author: 'Mélissa Da Costa', cover: 'je-revenais-des-autres.jpg' },
  { year: 2024, title: 'Le cinquième accord toltèque', author: 'Don Miguel Ruiz', cover: 'le-cinquieme-accord-tolteque.jpg' },
  { year: 2024, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', cover: 'the-subtle-art-of-not-giving-a-f-ck.jpg' },
  { year: 2024, title: 'Antigone', cover: 'antigone.jpg' },
  { year: 2024, title: 'La magie de voir grand', author: 'David Schwartz', cover: 'la-magie-de-voir-grand.jpg' },
  { year: 2024, title: 'Conversations avec Dieu, tome 1', author: 'Neale Donald Walsch', cover: 'conversations-avec-dieu-tome-1.jpg' },
  { year: 2024, title: 'Juste avant le bonheur', author: 'Agnès Ledig', cover: 'juste-avant-le-bonheur.jpg' },
  { year: 2024, title: 'Des fleurs pour Algernon', author: 'Daniel Keyes', cover: 'des-fleurs-pour-algernon.jpg' },
  { year: 2024, title: 'L\'art d\'avoir toujours raison', author: 'Arthur Schopenhauer', cover: 'l-art-d-avoir-toujours-raison.jpg' },
  { year: 2024, title: 'La délicatesse', author: 'David Foenkinos', cover: 'la-delicatesse.jpg' },
  { year: 2024, title: 'The 5 Love Languages', author: 'Gary Chapman', cover: 'the-5-love-languages.jpg' },
  { year: 2024, title: 'L\'art de la simplicité', author: 'Dominique Loreau', cover: 'l-art-de-la-simplicite.jpg' },
  { year: 2024, title: 'Harry Potter et l\'ordre du Phénix', author: 'J. K. Rowling', cover: 'harry-potter-et-l-ordre-du-phenix.jpg' },
  { year: 2024, title: 'Harry Potter et le prince de sang-mêlé', author: 'J. K. Rowling', cover: 'harry-potter-et-le-prince-de-sang-mele.jpg' },
  { year: 2024, title: 'Harry Potter et les reliques de la mort', author: 'J. K. Rowling', cover: 'harry-potter-et-les-reliques-de-la-mort.jpg' },
  { year: 2024, title: 'Toujours plus, + = +', author: 'Léna Situations', cover: 'toujours-plus.jpg' },
  { year: 2024, title: 'Les douleurs fantômes', author: 'Mélissa Da Costa', cover: 'les-douleurs-fantomes.jpg' },
  { year: 2024, title: 'Votre temps est infini', author: 'Fabien Olicard', cover: 'votre-temps-est-infini.jpg' },
  { year: 2024, title: 'Tu comprendras quand tu seras plus grande', author: 'Virginie Grimaldi', cover: 'tu-comprendras-quand-tu-seras-plus-grande.jpg' },
  { year: 2024, title: 'À tout jamais', author: 'Colleen Hoover', cover: 'a-tout-jamais.jpg' },
  { year: 2024, title: 'Le premier jour du reste de ma vie', author: 'Virginie Grimaldi', cover: 'le-premier-jour-du-reste-de-ma-vie.jpg' },
  { year: 2024, title: 'Origine', author: 'Dan Brown', cover: 'origine.jpg' },
  { year: 2024, title: 'Les choses humaines', author: 'Karine Tuil', cover: 'les-choses-humaines.jpg' },
  { year: 2024, title: 'L\'éveil de votre puissance intérieure', author: 'Anthony Robbins', cover: 'l-eveil-de-votre-puissance-interieure.jpg' },
  { year: 2024, title: 'Bilbo le Hobbit', author: 'J. R. R. Tolkien', cover: 'bilbo-le-hobbit.jpg' },
  { year: 2024, title: 'Demandez et vous recevrez', author: 'Pierre Morency', cover: 'demandez-et-vous-recevrez.jpg' },
  { year: 2024, title: 'Les frères Karamazov', author: 'Fiodor Dostoïevski', cover: 'les-freres-karamazov.jpg' },
  { year: 2024, title: 'Ne coupez jamais la poire en deux', author: 'Chris Voss', cover: 'ne-coupez-jamais-la-poire-en-deux.jpg' },
  { year: 2024, title: 'Et n\'oublie pas d\'être heureux', author: 'Christophe André', cover: 'et-n-oublie-pas-d-etre-heureux.jpg' },
  { year: 2024, title: 'Influence et manipulation', author: 'Robert Cialdini', cover: 'influence-et-manipulation.jpg' },
  { year: 2024, title: 'Le prophète', author: 'Khalil Gibran', cover: 'le-prophete.jpg' },
  { year: 2024, title: 'Harry Potter et l\'enfant maudit', author: 'J. K. Rowling', cover: 'harry-potter-et-l-enfant-maudit.jpg' },
  { year: 2024, title: 'Lettres à un jeune poète', author: 'Rainer Maria Rilke', cover: 'lettres-a-un-jeune-poete.jpg' },
  { year: 2024, title: 'Ainsi gèlent les bulles de savon', author: 'Mélissa Da Costa', cover: 'ainsi-gelent-les-bulles-de-savon.jpg' },
  { year: 2024, title: 'La nuit des temps', author: 'René Barjavel', cover: 'la-nuit-des-temps.jpg' },
  { year: 2024, title: 'Attendez-vous à un miracle', cover: 'attendez-vous-a-un-miracle.jpg' },
  { year: 2024, title: 'Tout le bleu du ciel', author: 'Mélissa Da Costa', cover: 'tout-le-bleu-du-ciel.jpg' },
  { year: 2024, title: 'Kama Sutra', cover: 'kama-sutra.jpg' },
  { year: 2024, title: 'November 9', author: 'Colleen Hoover', cover: 'november-9.jpg' },
  { year: 2024, title: 'Le seigneur des anneaux, tome 1 : La communauté de l\'anneau', author: 'J. R. R. Tolkien', cover: 'le-seigneur-des-anneaux-tome-1-la-communaute-de-l-an.jpg' },
  { year: 2024, title: 'Le seigneur des anneaux, tome 2 : Les deux tours', author: 'J. R. R. Tolkien', cover: 'le-seigneur-des-anneaux-tome-2-les-deux-tours.jpg' },
  { year: 2024, title: 'Le seigneur des anneaux, tome 3 : Le retour du roi', author: 'J. R. R. Tolkien', cover: 'le-seigneur-des-anneaux-tome-3-le-retour-du-roi.jpg' },
  { year: 2024, title: 'Écoute ton corps', author: 'Lise Bourbeau', cover: 'ecoute-ton-corps.jpg' },
  { year: 2024, title: 'Cessez d\'être gentil, soyez vrai !', author: 'Thomas d\'Ansembourg', cover: 'cessez-d-etre-gentil-soyez-vrai.jpg' },
  { year: 2024, title: 'Libérez votre cerveau', author: 'Idriss Aberkane', cover: 'liberez-votre-cerveau.jpg' },
  { year: 2024, title: 'Le pouvoir insoupçonné de tes blessures et de tes blocages', cover: 'le-pouvoir-insoupconne-de-tes-blessures-et-de-tes-bl.jpg' },
  { year: 2024, title: 'Plus malin que le diable', author: 'Napoleon Hill', cover: 'plus-malin-que-le-diable.jpg' },
  { year: 2024, title: 'Désenchantées', author: 'Marie Vareille', cover: 'desenchantees.jpg' },
  /* ── 2025 ── */
  { year: 2025, title: 'Affirmez-vous', author: 'Frédéric Fanget', cover: 'affirmez-vous.jpg' },
  { year: 2025, title: 'Le journal d\'Anne Frank', author: 'Anne Frank', cover: 'le-journal-d-anne-frank.jpg' },
  { year: 2025, title: 'Respire', cover: 'respire.jpg' },
  { year: 2025, title: 'Les délices de Tokyo', author: 'Durian Sukegawa', cover: 'les-delices-de-tokyo.jpg' },
  { year: 2025, title: 'Ainsi parlait Zarathoustra', author: 'Friedrich Nietzsche', cover: 'ainsi-parlait-zarathoustra.jpg' },
  { year: 2025, title: 'Les sept maris d\'Evelyn Hugo', author: 'Taylor Jenkins Reid', cover: 'les-sept-maris-d-evelyn-hugo.jpg' },
  { year: 2025, title: 'Le(s) vrai(es) amour(s)', cover: 'le-s-vrai-es-amour-s.jpg' },
  { year: 2025, title: 'Les sirènes de Malibu', author: 'Taylor Jenkins Reid', cover: 'les-sirenes-de-malibu.jpg' },
  { year: 2025, title: 'Ce que j\'aimerais te dire', author: 'Emeric Lebreton', cover: 'ce-que-j-aimerais-te-dire.jpg' },
  { year: 2025, title: 'L\'intelligence émotionnelle, tome 1', author: 'Daniel Goleman', cover: 'l-intelligence-emotionnelle-tome-1.jpg' },
  { year: 2025, title: 'La mort d\'Ivan Ilitch', author: 'Léon Tolstoï', cover: 'la-mort-d-ivan-ilitch.jpg' },
  { year: 2025, title: 'La métamorphose', author: 'Franz Kafka', cover: 'la-metamorphose.jpg' },
  { year: 2025, title: 'Sois heureux', author: 'Pape François', cover: 'sois-heureux.jpg' },
  { year: 2025, title: 'La miséricorde', author: 'Pape François', cover: 'la-misericorde.jpg' },
  { year: 2025, title: 'La force de la prière', author: 'Pape François', cover: 'la-force-de-la-priere.jpg' },
  { year: 2025, title: 'La Bible', cover: 'la-bible.jpg', page: 'bible' },
  { year: 2025, title: 'La joie de l\'Évangile', author: 'Pape François', cover: 'la-joie-de-l-evangile.jpg' },
  { year: 2025, title: 'La peau de chagrin', author: 'Honoré de Balzac', cover: 'la-peau-de-chagrin.jpg' },
  { year: 2025, title: 'La chambre de Giovanni', author: 'James Baldwin', cover: 'la-chambre-de-giovanni.jpg' },
  { year: 2025, title: 'Le dernier jour d\'un condamné', author: 'Victor Hugo', cover: 'le-dernier-jour-d-un-condamne.jpg' },
  { year: 2025, title: 'L\'éducation sentimentale', author: 'Gustave Flaubert', cover: 'l-education-sentimentale.jpg' },
  { year: 2025, title: 'Ho\'oponopono', author: 'Maria-Elisa Hurtado-Graciet', cover: 'ho-oponopono.jpg' },
  { year: 2025, title: 'Fahrenheit 451', author: 'Ray Bradbury', cover: 'fahrenheit-451.jpg' },
  { year: 2025, title: 'Les lois de la nature humaine', author: 'Robert Greene', cover: 'les-lois-de-la-nature-humaine.jpg' },
  { year: 2025, title: 'Vous êtes notre espoir pour demain', author: 'Pape François', cover: 'vous-etes-notre-espoir-pour-demain.jpg' },
  { year: 2025, title: 'Pierre et Jean', author: 'Guy de Maupassant', cover: 'pierre-et-jean.jpg' },
  { year: 2025, title: 'Un temps pour changer', author: 'Pape François', cover: 'un-temps-pour-changer.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 1', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-1.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 2', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-2.jpg' },
  { year: 2025, title: 'En as-tu vraiment besoin ?', author: 'Pierre-Yves McSween', cover: 'en-as-tu-vraiment-besoin.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 3', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-3.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 4', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-4.jpg' },
  { year: 2025, title: 'La vie', author: 'Pape François', cover: 'la-vie.jpg' },
  { year: 2025, title: 'Histoire d\'une âme', author: 'Thérèse de Lisieux', cover: 'histoire-d-une-ame.jpg' },
  { year: 2025, title: 'L\'imitation de Jésus-Christ', author: 'Thomas a Kempis', cover: 'l-imitation-de-jesus-christ.jpg' },
  { year: 2025, title: 'Martin Eden', author: 'Jack London', cover: 'martin-eden.jpg' },
  { year: 2025, title: 'Dieu est jeune', author: 'Pape François', cover: 'dieu-est-jeune.jpg' },
  { year: 2025, title: 'L\'appel de la forêt', author: 'Jack London', cover: 'l-appel-de-la-foret.jpg' },
  { year: 2025, title: 'La dame aux camélias', author: 'Alexandre Dumas fils', cover: 'la-dame-aux-camelias.jpg' },
  { year: 2025, title: 'Prier le chapelet et aimer ça', cover: 'prier-le-chapelet-et-aimer-ca.jpg' },
  { year: 2025, title: 'Commentaire de la Genèse', author: 'Jean Chrysostome', cover: 'commentaire-de-la-genese.jpg' },
  { year: 2025, title: 'Le livre de la vie', author: 'Thérèse d\'Avila', cover: 'le-livre-de-la-vie.jpg' },
  { year: 2025, title: '1984', author: 'George Orwell', cover: '1984.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 5', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-5.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 6', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-6.jpg' },
  { year: 2025, title: 'Les carnets de l\'apothicaire, tome 7', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-7.jpg' },
  { year: 2025, title: 'The Midnight Library', author: 'Matt Haig', cover: 'the-midnight-library.jpg' },
  { year: 2025, title: 'Diary of a Wimpy Kid, tome 1', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-1.jpg' },
  { year: 2025, title: 'Greenlights', author: 'Matthew McConaughey', cover: 'greenlights.jpg' },
  { year: 2025, title: 'Le livre de ma mère', author: 'Albert Cohen', cover: 'le-livre-de-ma-mere.jpg' },
  { year: 2025, title: 'Tuesdays with Morrie', author: 'Mitch Albom', cover: 'tuesdays-with-morrie.jpg' },
  { year: 2025, title: 'Diary of a Wimpy Kid, tome 2 : Rodrick Rules', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-2-rodrick-rules.jpg' },
  { year: 2025, title: 'Thérèse Raquin', author: 'Émile Zola', cover: 'therese-raquin.jpg' },
  { year: 2025, title: 'L\'homme le plus riche de Babylone', author: 'George S. Clason', cover: 'l-homme-le-plus-riche-de-babylone.jpg' },
  { year: 2025, title: 'La pitié dangereuse', author: 'Stefan Zweig', cover: 'la-pitie-dangereuse.jpg' },
  /* ── 2026 ── */
  { year: 2026, title: 'L\'imitation de Jésus-Christ', author: 'Thomas a Kempis', cover: 'l-imitation-de-jesus-christ.jpg' },
  { year: 2026, title: 'The Happiness Project', author: 'Gretchen Rubin', cover: 'the-happiness-project.jpg' },
  { year: 2026, title: 'Atomic Habits', author: 'James Clear', cover: 'atomic-habits.jpg' },
  { year: 2026, title: 'Œuvres complètes', author: 'Jean Chrysostome', cover: 'uvres-completes.jpg' },
  { year: 2026, title: 'Les carnets de l\'apothicaire, tome 8', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-8.jpg' },
  { year: 2026, title: 'Diary of a Wimpy Kid, tome 3 : The Last Straw', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-3-the-last-straw.jpg' },
  { year: 2026, title: 'Les carnets de l\'apothicaire, tome 9', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-9.jpg' },
  { year: 2026, title: 'Les carnets de l\'apothicaire, tome 10', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-10.jpg' },
  { year: 2026, title: 'Les carnets de l\'apothicaire, tome 11', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-11.jpg' },
  { year: 2026, title: 'Les carnets de l\'apothicaire, tome 12', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-12.jpg' },
  { year: 2026, title: 'Les carnets de l\'apothicaire, tome 13', author: 'Natsu Hyuga', cover: 'les-carnets-de-l-apothicaire-tome-13.jpg' },
  { year: 2026, title: 'Kiki\'s Delivery Service', author: 'Eiko Kadono', cover: 'kiki-s-delivery-service.jpg' },
  { year: 2026, title: 'How to Win at Chess', author: 'Levy Rozman', cover: 'how-to-win-at-chess.jpg' },
  { year: 2026, title: 'The Five People You Meet in Heaven', author: 'Mitch Albom', cover: 'the-five-people-you-meet-in-heaven.jpg' },
  { year: 2026, title: 'Nine Days with Saint Joseph', cover: 'nine-days-with-saint-joseph.jpg' },
  { year: 2026, title: 'The Secret', author: 'Rhonda Byrne', cover: 'the-secret.jpg' },
  { year: 2026, title: 'Le joueur d\'échecs', author: 'Stefan Zweig', cover: 'le-joueur-d-echecs.jpg' },
  { year: 2026, title: 'I Will Teach You to Be Rich', author: 'Ramit Sethi', cover: 'i-will-teach-you-to-be-rich.jpg' },
  { year: 2026, title: 'Petit journal : La Miséricorde divine dans mon âme', author: 'Sainte Faustine Kowalska', cover: 'petit-journal-la-misericorde-divine-dans-mon-ame.jpg' },
  { year: 2026, title: 'The Good Life Handbook', author: 'Épictète', cover: 'the-good-life-handbook.jpg' },
  { year: 2026, title: 'Diary of a Wimpy Kid, tome 4 : Dog Days', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-4-dog-days.jpg' },
  { year: 2026, title: 'Diary of a Wimpy Kid, tome 5 : The Ugly Truth', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-5-the-ugly-truth.jpg' },
  { year: 2026, title: 'Pisse-mémé', cover: 'pisse-meme.jpg' },
  { year: 2026, title: 'Diary of a Wimpy Kid, tome 6 : Cabin Fever', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-6-cabin-fever.jpg' },
  { year: 2026, title: 'À l\'est d\'Éden', author: 'John Steinbeck', cover: 'a-l-est-d-eden.jpg' },
  { year: 2026, title: 'The Devil\'s Sons, tome 1', cover: 'the-devil-s-sons-tome-1.jpg' },
  { year: 2026, title: 'Hunter x Hunter, tome 33', author: 'Yoshihiro Togashi', cover: 'hunter-x-hunter-tome-33.jpg' },
  { year: 2026, title: 'Hunter x Hunter, tome 34', author: 'Yoshihiro Togashi', cover: 'hunter-x-hunter-tome-34.jpg' },
  { year: 2026, title: 'Hunter x Hunter, tome 35', author: 'Yoshihiro Togashi', cover: 'hunter-x-hunter-tome-35.jpg' },
  { year: 2026, title: 'Though I Am an Inept Villainess, tome 1', cover: 'though-i-am-an-inept-villainess-tome-1.jpg' },
  { year: 2026, title: 'Though I Am an Inept Villainess, tome 2', cover: 'though-i-am-an-inept-villainess-tome-2.jpg' },
  { year: 2026, title: 'Though I Am an Inept Villainess, tome 3', cover: 'though-i-am-an-inept-villainess-tome-3.jpg' },
  { year: 2026, title: 'Hunter x Hunter, tome 36', author: 'Yoshihiro Togashi', cover: 'hunter-x-hunter-tome-36.jpg' },
  { year: 2026, title: 'Des souris et des hommes', author: 'John Steinbeck', cover: 'des-souris-et-des-hommes.jpg' },
  { year: 2026, title: 'Madame Bovary', author: 'Gustave Flaubert', cover: 'madame-bovary.jpg' },
  { year: 2026, title: 'Diary of a Wimpy Kid, tome 7 : The Third Wheel', author: 'Jeff Kinney', cover: 'diary-of-a-wimpy-kid-tome-7-the-third-wheel.jpg' },
  { year: 2026, title: 'Numérologie', cover: 'numerologie.jpg' },
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

const PAGES = ['home', 'about', 'projects', 'skills', 'refuge', 'bible', 'finds']
  .concat(YEAR_PAGES, ['contact']);
const PAGE_TITLES = Object.assign(
  { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills',
    refuge: "Sarindra's Refuge", bible: '127 jours',
    finds: 'Testé et adopté', contact: 'Contact' },
  Object.fromEntries(YEARS.map(y => ['lectures-' + y, 'Mes lectures de ' + y])));

/* Les sujets du Refuge sont des pages à part ; la barre de navigation
   doit rester allumée sur le Refuge quand on les lit. */
const PAGE_PARENT = Object.assign({ bible: 'refuge', finds: 'refuge' },
  Object.fromEntries(YEAR_PAGES.map(id => [id, 'refuge'])));

/* Toutes les années partagent un même bloc de page. */
function nodeIdFor(id) { return id.startsWith('lectures-') ? 'books' : id; }

function trackVirtualPageView(id) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: id === 'home' ? '/' : '/' + id,
    page_title: 'Sarindra Therese — ' + (PAGE_TITLES[id] || id)
  });
}

function showPage(id, opts) {
  if (!PAGES.includes(id)) id = 'home';
  const options = opts || {};

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + nodeIdFor(id));
  if (!target) return;
  target.classList.add('active');
  if (id.startsWith('lectures-')) renderYear(Number(id.slice(9)));

  document.querySelectorAll('#nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + (PAGE_PARENT[id] || id));
    a.removeAttribute('aria-current');
    if (a.classList.contains('active')) a.setAttribute('aria-current', 'page');
  });

  closeMenu();
  document.title = (id === 'home' ? '' : (PAGE_TITLES[id] || id) + ' — ')
    + 'Sarindra Thérèse Randriambeloson — Data & AI Engineer';

  if (!options.silent) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  if (id === 'skills') setTimeout(animateBars, 200);
  revealIn(target);
  trackVirtualPageView(id);
}

function currentHashPage() {
  return (location.hash || '#home').replace('#', '').split('?')[0];
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
  const src = 'assets/img/livres/' + b.year + '/' + esc(b.cover);
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
function renderTopics() {
  const host = document.getElementById('topics');
  if (!host) return;
  host.innerHTML = topics().map(t =>
      '<a class="topic-card' + (t.empty ? ' is-empty' : '') + '" href="#' + esc(t.page) + '">'
    + '<span class="topic-badge tone-' + t.tone + '">'
    + (t.icon ? '<svg class="icon icon-xs" aria-hidden="true"><use href="#'
        + esc(t.icon) + '"/></svg>' : '')
    + esc(t.badge) + '</span>'
    + '<span class="topic-name">' + esc(t.title) + '</span>'
    + '<span class="topic-meta">' + esc(t.meta) + '</span>'
    + '<span class="topic-go">' + (t.empty ? 'Bientôt' : 'Lire')
    + '<svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-right"/></svg>'
    + '</span></a>').join('');
}

function booksOfYear(y) { return READINGS.filter(r => r.year === y); }

const THIS_YEAR = new Date().getFullYear();

function topics() {
  const bible = {
    /* Ce n'est pas une lecture de plus : c'est un défi mené à son
       terme. D'où le ton sable, seul contre-ton de la palette. */
    badge: 'Défi accompli', tone: 'sand', icon: 'i-check',
    title: 'J’ai lu la Bible en 127 jours',
    meta:  '73 livres · 31 janv. — 7 juin 2025',
    page:  'bible'
  };
  const filled = YEARS.filter(y => booksOfYear(y).length).sort((a, b) => a - b);
  const span = filled.length > 1
    ? filled[0] + ' à ' + filled[filled.length - 1]
    : String(filled[0] || '');
  const lectures = {
    badge: 'Lecture', tone: 'cyan', icon: 'i-book',
    title: 'Mes lectures, année par année',
    meta:  READINGS.length
      ? READINGS.length + ' livres · ' + span
      : 'à venir',
    /* On entre par l'année la plus récente qui a des livres ;
       les pastilles font le reste. */
    page:  'lectures-' + (filled.length ? filled[filled.length - 1] : YEARS[0]),
    empty: READINGS.length === 0
  };
  const finds = {
    badge: 'Objet', tone: 'ink', icon: 'i-spark',
    title: 'Testé et adopté',
    meta:  DISCOVERIES.length
      ? DISCOVERIES.length + (DISCOVERIES.length > 1 ? ' objets' : ' objet')
      : 'à venir',
    page:  'finds',
    empty: DISCOVERIES.length === 0
  };
  return [bible, lectures, finds];
}


/* ── Lecture intégrale : trame des 127 jours + carnet ── */
const FR_MONTHS = ['janvier','février','mars','avril','mai','juin',
  'juillet','août','septembre','octobre','novembre','décembre'];

function dayKey(d) { return d.toISOString().slice(0, 10); }
function parseDay(s) { return new Date(s + 'T00:00:00Z'); }

function bibleStats() {
  const start = parseDay(BIBLE.start), end = parseDay(BIBLE.end);
  const byDay = new Map();
  BIBLE.entries.forEach(([name, d]) => {
    if (!d) return;
    if (!byDay.has(d)) byDay.set(d, []);
    byDay.get(d).push(name);
  });
  const days = [...byDay.keys()].sort();
  let longest = { gap: 0, from: null, to: null };
  for (let i = 1; i < days.length; i++) {
    const gap = Math.round((parseDay(days[i]) - parseDay(days[i - 1])) / 864e5);
    if (gap > longest.gap) longest = { gap, from: days[i - 1], to: days[i] };
  }
  const gridStart = new Date(start.getTime() + 864e5);   // jour 1 = lendemain du départ
  const books = BIBLE.entries.reduce((n, [name]) => n + (BIBLE.grouped[name] || 1), 0);
  return {
    start, end, gridStart, byDay,
    total: Math.round((end - start) / 864e5),
    entries: BIBLE.entries.length,
    books,
    activeDays: byDay.size,
    longest
  };
}

function renderBible() {
  const gridHost = document.getElementById('bible-grid');
  if (!gridHost) return;
  const st = bibleStats();

  /* Les chiffres annoncés sont calculés, jamais écrits en dur. */
  const facts = document.getElementById('bible-facts');
  if (facts) facts.innerHTML = [
    [st.books, 'livres, du premier au dernier'],
    [st.longest.gap, 'jours sans en terminer un, ma plus longue pause']
  ].map(([n, label]) => '<li><b>' + n + '</b> ' + esc(label) + '</li>').join('');

  /* Une phrase de lecture, pas une légende d'encodage. */
  const cap = document.getElementById('bible-cap');
  if (cap) cap.textContent = 'Chaque carré est un jour, de février à juin. Sur '
    + st.total + ' jours, ' + st.activeDays + ' seulement portent un livre terminé. '
    + 'On voit la longue traînée pâle de fin mars à mi-avril — presque trois '
    + 'semaines sans rien finir — et les deux grappes sombres de mai et de juin.';

  /* Trame : une ligne par mois, une colonne par quantième. */
  const rows = [];
  const cur = new Date(Date.UTC(st.gridStart.getUTCFullYear(), st.gridStart.getUTCMonth(), 1));
  while (cur <= st.end) {
    const y = cur.getUTCFullYear(), m = cur.getUTCMonth();
    const len = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    let cells = '';
    for (let day = 1; day <= 31; day++) {
      if (day > len) { cells += '<i class="bcell void"></i>'; continue; }
      const d = new Date(Date.UTC(y, m, day));
      if (d < st.gridStart || d > st.end) { cells += '<i class="bcell out"></i>'; continue; }
      const key = dayKey(d);
      const inGap = st.longest.from && key > st.longest.from && key < st.longest.to;
      const books = st.byDay.get(key) || [];
      const lvl = books.length === 0 ? 0 : books.length === 1 ? 1 : books.length <= 3 ? 2 : 3;
      const label = day + ' ' + FR_MONTHS[m] + ' — ' + (books.length
        ? books.join(', ')
        : 'rien d’achevé');
      cells += '<i class="bcell l' + lvl + (inGap ? ' gap' : '')
        + '" title="' + esc(label) + '"></i>';
    }
    rows.push('<div class="brow"><span class="bmonth">' + FR_MONTHS[m]
      + '</span><div class="bdays">' + cells + '</div></div>');
    cur.setUTCMonth(m + 1);
  }
  gridHost.innerHTML = rows.join('');

  /* Carnet complet, par ordre chronologique. */
  const log = document.getElementById('bible-log');
  if (!log) return;
  const undated = BIBLE.entries.filter(e => !e[1]);
  const dated = BIBLE.entries.filter(e => e[1]).sort((a, b) => a[1] < b[1] ? -1 : 1);
  const groups = new Map();
  dated.forEach(([name, d]) => {
    const key = d.slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push([name, d]);
  });
  const row = ([name, d]) => '<div class="blogrow"><span>' + esc(name) + '</span><span>'
    + (d ? Number(d.slice(8)) + ' ' + FR_MONTHS[Number(d.slice(5, 7)) - 1] : 'date non carnete')
    + '</span></div>';
  log.innerHTML =
      (undated.length ? '<div class="blogmonth"><h4>Sans date <span>1</span></h4>'
        + undated.map(row).join('') + '</div>' : '')
    + [...groups].map(([key, items]) => '<div class="blogmonth"><h4>'
        + FR_MONTHS[Number(key.slice(5)) - 1] + ' <span>' + items.length + '</span></h4>'
        + items.map(row).join('') + '</div>').join('');
}


/* Les années se parcourent depuis la page elle-même : une pastille
   par année, celle qu'on lit en aplat. Une année sans livre reste
   accessible — elle mène à son état vide, qui le dit. */
function renderYearPills(current) {
  const host = document.getElementById('year-pills');
  if (!host) return;
  host.innerHTML = YEARS.map(y => {
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
    ? '<div class="find-shot"><img src="assets/img/decouvertes/' + esc(d.image)
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
  list.innerHTML = books.length
    ? books.map(bookCard).join('')
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
  renderTopics();
  renderFinds();
  renderBible();
  initTabs();
  initTabLinks();
  initProjectFilter();
  initReveal();

  document.getElementById('nav-burger').addEventListener('click', toggleMenu);
  document.getElementById('send-btn').addEventListener('click', function () { sendMessage(this); });
  document.getElementById('reset-form-btn').addEventListener('click', resetContactForm);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  window.addEventListener('hashchange', () => showPage(currentHashPage()));
  showPage(currentHashPage(), { silent: true });

  setTimeout(animateCounters, 700);
});
