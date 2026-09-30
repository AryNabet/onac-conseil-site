// Build du site ONAC Conseil : copie src/ vers dist/ et génère le blog.
// Articles : content/blog/AAAA-MM-JJ-slug.md avec un en-tête (front matter) :
// ---
// title: Titre de l'article
// date: 2026-10-05
// description: Résumé en une ou deux phrases (sert pour Google et les aperçus)
// category: Fiscalité
// ---
// Un article dont la date est dans le futur n'est pas publié avant cette date.

import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'src');
const CONTENT = path.join(ROOT, 'content', 'blog');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://onac-conseil.fr';
const SITE_NAME = 'ONAC Conseil';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const frDate = d => { const [y, m, j] = d.split('-').map(Number); return `${j} ${MONTHS[m - 1]} ${y}`; };
const today = new Date().toISOString().slice(0, 10);

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

function parse(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${path.basename(file)} : en-tête --- manquant`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const k = line.match(/^(\w+):\s*(.*)$/);
    if (k) meta[k[1]] = k[2].replace(/^["']|["']$/g, '').trim();
  }
  for (const f of ['title', 'date', 'description']) {
    if (!meta[f]) throw new Error(`${path.basename(file)} : champ "${f}" manquant`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`${path.basename(file)} : date au format AAAA-MM-JJ attendue`);
  const slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const words = m[2].split(/\s+/).filter(Boolean).length;
  return { ...meta, slug, url: `/blog/${slug}/`, html: marked.parse(m[2]), minutes: Math.max(1, Math.round(words / 220)) };
}

const HEAD = ({ title, description, url, type = 'website', extra = '' }) => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE_URL}${url}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE_URL}${url}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:locale" content="fr_FR">
<link rel="alternate" type="application/rss+xml" title="Blog ${SITE_NAME}" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/blog/blog.css">
${extra}</head>
<body>
<nav class="bnav">
  <a href="/" class="bnav-logo">ONAC <span>Conseil</span></a>
  <ul class="bnav-links">
    <li class="hide-sm"><a href="/#apropos">À propos</a></li>
    <li class="hide-sm"><a href="/#services">Services</a></li>
    <li class="hide-xs"><a href="/blog/" class="active">Blog</a></li>
    <li><a href="/#contact" class="bnav-cta">Rendez-vous</a></li>
  </ul>
</nav>
`;

const FOOT = `<footer class="bfoot">
  <div>© ${new Date().getFullYear()} ${SITE_NAME} · Expert-Comptable · Paris 8e</div>
  <div><a href="/">Accueil</a> · <a href="/blog/">Blog</a> · <a href="/feed.xml">RSS</a> · <a href="/#contact">Contact</a></div>
</footer>
</body>
</html>
`;

const card = (a, cls = 'bcard') => `<a class="${cls}" href="${a.url}">
      <div class="${cls}-meta">${esc(a.category || 'Actualité')} · ${frDate(a.date)}</div>
      <div class="${cls}-title">${esc(a.title)}</div>
      <div class="${cls}-desc">${esc(a.description)}</div>
      ${cls === 'bcard' ? `<div class="bcard-read">Lire l'article · ${a.minutes} min</div>` : ''}
    </a>`;

// ── Build ─────────────────────────────────────────────
fs.rmSync(DIST, { recursive: true, force: true });
copyDir(SRC, DIST);

const files = fs.existsSync(CONTENT) ? fs.readdirSync(CONTENT).filter(f => f.endsWith('.md')) : [];
const all = files.map(f => parse(path.join(CONTENT, f)));
const slugs = new Set();
for (const a of all) { if (slugs.has(a.slug)) throw new Error(`slug en double : ${a.slug}`); slugs.add(a.slug); }
const posts = all.filter(a => a.date <= today).sort((a, b) => b.date.localeCompare(a.date));

// Pages articles
for (const a of posts) {
  const ld = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: a.title, description: a.description, datePublished: a.date,
    author: { '@type': 'Person', name: 'Olivier Nabet' },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: SITE_URL + a.url,
  });
  const html = HEAD({ title: `${a.title} · ${SITE_NAME}`, description: a.description, url: a.url, type: 'article',
    extra: `<meta property="article:published_time" content="${a.date}">\n<script type="application/ld+json">${ld}</script>\n` }) + `
<header class="bhead">
  <div class="bhead-inner">
    <div class="eyebrow">${esc(a.category || 'Actualité')}</div>
    <h1>${esc(a.title)}</h1>
    <p>${esc(a.description)}</p>
    <div class="bhead-meta"><span>${frDate(a.date)}</span><span>${a.minutes} min de lecture</span><span>Par Olivier Nabet</span></div>
  </div>
</header>
<main class="barticle">
  <article class="prose">
${a.html}
  </article>
  <div class="bnote">Cet article a une vocation d'information générale et ne constitue pas un conseil personnalisé. Chaque situation étant particulière, contactez le cabinet pour une analyse adaptée à votre entreprise.</div>
  <div class="bcta">
    <h2>Une question sur votre situation ?</h2>
    <p>Premier échange confidentiel et sans engagement avec le cabinet.</p>
    <a class="btn-gold" href="/#contact">Prendre rendez-vous</a>
  </div>
  <div class="bback"><a href="/blog/">← Tous les articles</a></div>
</main>
` + FOOT;
  fs.mkdirSync(path.join(DIST, 'blog', a.slug), { recursive: true });
  fs.writeFileSync(path.join(DIST, 'blog', a.slug, 'index.html'), html);
}

// Page liste
const list = HEAD({ title: `Blog · ${SITE_NAME} – Expert-Comptable Paris`, description: 'Fiscalité, social, gestion : les analyses du cabinet ONAC Conseil pour les dirigeants et entrepreneurs.', url: '/blog/' }) + `
<header class="bhead">
  <div class="bhead-inner">
    <div class="eyebrow">Le blog du cabinet</div>
    <h1>L'actualité qui compte pour <em>votre entreprise</em></h1>
    <p>Fiscalité, social, gestion : chaque semaine, un point clair sur ce qui change pour les dirigeants et ce qu'il faut en retenir.</p>
  </div>
</header>
<section class="blist">
  ${posts.length ? `<div class="blist-grid">
    ${posts.map(a => card(a)).join('\n    ')}
  </div>` : `<p class="bempty">Les premiers articles arrivent très bientôt.</p>`}
</section>
` + FOOT;
fs.mkdirSync(path.join(DIST, 'blog'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'blog', 'index.html'), list);

// Accueil : 3 derniers articles (section masquée s'il n'y en a aucun)
const latest = posts.length ? `<section class="section" id="blog">
  <div class="eyebrow reveal">Le blog</div>
  <h2 class="section-heading reveal d1">Nos derniers <em>articles</em></h2>
  <div class="latest-grid">
    ${posts.slice(0, 3).map((a, i) => card(a, 'latest-card').replace('class="latest-card"', `class="latest-card reveal d${i + 2}"`)).join('\n    ')}
  </div>
  <div class="latest-more reveal"><a href="/blog/" class="btn-outline">Tous les articles</a></div>
</section>` : '';
const homePath = path.join(DIST, 'index.html');
fs.writeFileSync(homePath, fs.readFileSync(homePath, 'utf8').replace('<!-- BLOG_LATEST -->', latest));

// RSS (utilisé pour la publication LinkedIn)
const rfc = d => new Date(d + 'T08:00:00Z').toUTCString();
fs.writeFileSync(path.join(DIST, 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Blog ${SITE_NAME}</title>
  <link>${SITE_URL}/blog/</link>
  <description>Les analyses du cabinet ONAC Conseil, expert-comptable à Paris.</description>
  <language>fr-FR</language>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.slice(0, 20).map(a => `  <item>
    <title>${esc(a.title)}</title>
    <link>${SITE_URL}${a.url}</link>
    <guid isPermaLink="true">${SITE_URL}${a.url}</guid>
    <pubDate>${rfc(a.date)}</pubDate>
    <description>${esc(a.description)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`);

// Flux LinkedIn : même contenu, mais la description = le post LinkedIn
// (content/linkedin/<slug>.md). Lu par le scénario Make pour publier sur la page entreprise.
const LI = path.join(ROOT, 'content', 'linkedin');
const liPosts = posts.filter(a => fs.existsSync(path.join(LI, `${a.slug}.md`)));
fs.writeFileSync(path.join(DIST, 'linkedin.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>ONAC Conseil – posts LinkedIn</title>
  <link>${SITE_URL}/blog/</link>
  <description>Flux technique pour la publication LinkedIn</description>
${liPosts.slice(0, 20).map(a => `  <item>
    <title>${esc(a.title)}</title>
    <link>${SITE_URL}${a.url}</link>
    <guid isPermaLink="false">li-${a.slug}</guid>
    <pubDate>${rfc(a.date)}</pubDate>
    <description>${esc(fs.readFileSync(path.join(LI, `${a.slug}.md`), 'utf8').trim())}</description>
  </item>`).join('\n')}
</channel>
</rss>
`);

// Sitemap + robots
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc></url>
  <url><loc>${SITE_URL}/blog/</loc></url>
${posts.map(a => `  <url><loc>${SITE_URL}${a.url}</loc><lastmod>${a.date}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`OK : ${posts.length} article(s) publié(s), ${all.length - posts.length} programmé(s) → dist/`);
