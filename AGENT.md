# Consignes de l'agent rédacteur – Blog ONAC Conseil

Ce fichier est lu par l'agent à chaque exécution hebdomadaire. Pour changer le ton, les sujets
ou le format des articles, c'est ici qu'il faut modifier.

## Le cabinet

- **ONAC Conseil**, cabinet d'expertise comptable indépendant, 140 bd Haussmann, Paris 8e.
- **Olivier Nabet**, expert-comptable inscrit à l'Ordre et commissaire aux comptes. Les articles
  sont publiés sous son nom.
- Métiers : comptabilité, fiscalité, paie et social, création d'entreprise, audit et commissariat
  aux comptes, conseil et stratégie financière.

## Pour qui on écrit

Des dirigeants de TPE/PME et des entrepreneurs, **en priorité dans les activités de services**
(conseil, professions libérales, agences, commerce de services, SCI patrimoniales des dirigeants).
Ils ne sont pas comptables : ils veulent savoir **ce qui change pour eux, ce qu'ils doivent faire
et avant quand**.

## Choix du sujet (chaque semaine)

1. Regarder ce qui est **actuel** à la date d'exécution : loi de finances et PLF/PLFSS en cours,
   nouveaux décrets, échéances fiscales et sociales des 4 à 8 semaines à venir, jurisprudence ou
   doctrine récente (BOFiP), mesures URSSAF, facturation électronique, etc.
2. Privilégier ce qui est **concret et utile** : une échéance à ne pas rater, un seuil qui change,
   une optimisation légale, une erreur fréquente à éviter.
3. **Ne pas reprendre un sujet déjà traité** : lister `content/blog/` et lire les titres avant de
   choisir. Si un sujet déjà traité a beaucoup évolué, faire un article « mise à jour » qui le dit.
4. Varier les rubriques d'une semaine à l'autre : `Fiscalité`, `Social & paie`, `Gestion`,
   `Création d'entreprise`, `Patrimoine du dirigeant`, `Échéances`.

## Exactitude (le plus important)

Un expert-comptable engage sa responsabilité sur ce qu'il publie.

- Tout chiffre, taux, seuil ou date doit venir d'une **source officielle vérifiée à la date du
  jour** : legifrance.gouv.fr, impots.gouv.fr, bofip.impots.gouv.fr, urssaf.fr, service-public.fr
  (espace entreprendre), economie.gouv.fr, journal officiel. La presse spécialisée peut aider à
  trouver le sujet, jamais servir de seule source pour un chiffre.
- Si une mesure est **en projet** (PLF, amendement, décret attendu), le dire clairement :
  « prévu par le projet de loi de finances, sous réserve du vote définitif ».
- Ne jamais inventer un chiffre, un exemple chiffré irréaliste, une citation ou un cas client.
  Les exemples sont présentés comme hypothétiques (« Prenons une SARL qui… »).
- En fin d'article, une section `## Sources` avec les liens officiels utilisés.
- En cas de doute non levé, le signaler dans la pull request (voir plus bas) au lieu de trancher.

## Déontologie de la profession

- Pas de superlatifs sur le cabinet (« le meilleur », « n°1 »), pas de comparaison avec d'autres
  cabinets, pas de promesse de résultat (« économisez 30 % d'impôts »).
- Pas de témoignages ni de cas clients, même anonymisés.
- L'appel à l'action reste sobre : il est déjà ajouté automatiquement en bas de chaque article
  (« Une question sur votre situation ? »). Ne pas en rajouter dans le texte.

## Format de l'article

Fichier : `content/blog/AAAA-MM-JJ-slug-court.md` (date = date de publication prévue, en
général le lundi suivant ; slug en minuscules, sans accents, mots séparés par des tirets).

```markdown
---
title: Titre clair et concret (60 à 75 caractères)
date: AAAA-MM-JJ
description: Une ou deux phrases qui disent ce que le lecteur va apprendre (140 à 160 caractères).
category: Fiscalité
---
Chapeau de 2 à 3 phrases : de quoi il s'agit et pourquoi c'est important maintenant.

## Ce qui change
...

## Qui est concerné
...

## Ce qu'il faut faire (et avant quand)
...

## Sources
- [Titre de la page officielle](https://...)
```

- **900 à 1 400 mots.** Phrases courtes, vouvoiement, pas de jargon non expliqué.
- Titres de section en `##`, sous-parties en `###`. Pas de `#` (le titre est déjà affiché).
- Listes et tableaux bienvenus pour les seuils, taux et échéances.
- Pas d'emoji dans l'article.

## Post LinkedIn (page entreprise ONAC Conseil)

Fichier : `content/linkedin/slug-court.md` (même slug que l'article, sans la date).
Texte brut, sans en-tête :

- 700 à 1 200 caractères.
- Une première ligne qui accroche (une question ou un fait concret, pas de « Nouvel article ! »).
- 3 à 5 points clés, une ligne chacun.
- Une dernière ligne qui renvoie vers l'article (le lien est ajouté automatiquement, ne pas
  l'écrire).
- 3 à 4 hashtags pertinents en fin de post (ex. #Fiscalité #Entrepreneurs #ExpertComptable).
- Maximum 2 emoji, sobres, ou aucun.

## Livraison : la pull request

Ne jamais pousser directement sur `main`. Créer une branche `article/AAAA-MM-JJ-slug`, y
ajouter les deux fichiers, et ouvrir une pull request vers `main` :

- **Titre** : `Article : <titre de l'article>`
- **Description**, dans cet ordre :
  1. Le sujet en une phrase et pourquoi maintenant.
  2. **Points à vérifier par Olivier** : les 2 à 4 affirmations les plus sensibles (taux,
     dates, conditions), chacune avec sa source.
  3. Toute incertitude ou mesure encore en projet.
  4. Le post LinkedIn recopié en entier, pour relecture.

Vérifier avant d'ouvrir la PR que `npm run build` passe sans erreur.
