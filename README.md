# Site ONAC Conseil – onac-conseil.fr

Site du cabinet ONAC Conseil (expert-comptable, Paris 8e) et son blog.

## Comment ça marche

```
Chaque semaine
  Agent rédacteur ──► pull request « Article : … » (article + post LinkedIn)
                          │
              Olivier relit, Ary clique « Merge »
                          │
                          ▼
  GitHub Actions ──► construit le site ──► envoie sur Gandi (SFTP)
                          │
                          ▼
  Make lit /linkedin.xml ──► publie sur la page LinkedIn ONAC Conseil
```

## Arborescence

| Chemin | Rôle |
|---|---|
| `src/index.html` | Page d'accueil (le « one-page » du cabinet) |
| `src/blog/blog.css` | Style des pages du blog |
| `content/blog/*.md` | Articles (un fichier par article) |
| `content/linkedin/*.md` | Post LinkedIn de chaque article (même nom que l'article, sans la date) |
| `scripts/build.mjs` | Génère le site complet dans `dist/` |
| `AGENT.md` | Consignes de l'agent rédacteur (ton, sujets, sources, format) |
| `.github/workflows/deploy.yml` | Mise en ligne automatique sur Gandi |
| `.github/workflows/check.yml` | Vérifie chaque proposition d'article |

Le build génère : l'accueil avec les 3 derniers articles, `/blog/`, une page par article,
`/feed.xml` (RSS), `/linkedin.xml` (flux pour Make), `/sitemap.xml` et `/robots.txt`.

## Modifier le site

- **Le texte de l'accueil** : modifier `src/index.html` et faire un commit sur `main` ; la mise en
  ligne est automatique.
- **Corriger un article** : modifier le fichier dans `content/blog/` (directement sur GitHub,
  bouton crayon) ; la mise en ligne est automatique.
- **Programmer un article** : mettre une date future dans son en-tête ; il sera publié ce jour-là
  à 8h30 heure de Paris. Pour une autre heure, ajouter `time: 12:15` dans l'en-tête (la mise en
  ligne automatique ne passe qu'à 8h32 : pour une autre heure, lancer « Run workflow » à la main).
- **Retirer un article** : supprimer son fichier. Attention, le déploiement n'efface rien sur le
  serveur : supprimer aussi le dossier `blog/<slug>/` sur Gandi via Cyberduck.

## Tester en local

```bash
npm install
npm run build
cd dist && python3 -m http.server 8000   # puis http://localhost:8000
```

## Secrets GitHub (Settings → Secrets and variables → Actions)

| Nom | Valeur |
|---|---|
| `GANDI_SFTP_HOST` | Host sFTP affiché par Gandi (`sftp.sd5.gpaas.net`) |
| `GANDI_SFTP_USER` | Identifiant long affiché par Gandi (`81fa137c-…`) |
| `GANDI_SFTP_TOKEN` | Le jeton d'accès Gandi (à renouveler avant expiration) |
| `GANDI_REMOTE_DIR` | Le dossier où se trouve `index.html` sur le serveur, ex. `vhosts/onac-conseil.fr/htdocs` |
