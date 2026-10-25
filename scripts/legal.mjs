// Pages légales du site ONAC Conseil : /mentions-legales/, /confidentialite/, /accessibilite/
// Pour mettre à jour une information, modifier le bloc CABINET ci-dessous, puis la date `updated`
// de la page concernée. Un champ laissé vide ('') n'est pas affiché.

const CABINET = {
  nom: 'ONAC Conseil',
  forme: 'EURL (entreprise unipersonnelle à responsabilité limitée)',
  capital: '8 000 €',
  adresse: '140 boulevard Haussmann, 75008 Paris, France',
  rcs: 'RCS Paris 509 483 319',
  siret: '509 483 319 00034',
  tva: 'FR17 509 483 319',
  telephone: '+33 6 13 41 70 32',
  email: 'Olivier.nabet@onac-conseil.fr',
  dirigeant: 'Olivier Nabet, gérant',

  // Profession réglementée — à compléter avec les numéros figurant sur les lettres de mission
  ordreConseil: "Conseil régional de l'Ordre des experts-comptables Paris Île-de-France",
  ordreNumero: '',          // n° d'inscription au tableau de l'Ordre
  cacNumero: '',            // n° d'inscription sur la liste des commissaires aux comptes (H2A)

  // Assurance responsabilité civile professionnelle (obligatoire pour la profession)
  assureur: '',             // ex. « MMA IARD, 14 boulevard Marie et Alexandre Oyon, 72030 Le Mans »
  couverture: 'France',     // couverture géographique du contrat
};

const C = CABINET;
const line = (label, value) => (value ? `- **${label} :** ${value}\n` : '');

export const LEGAL_PAGES = [
  {
    url: '/mentions-legales/',
    title: 'Mentions légales',
    description: "Mentions légales du site onac-conseil.fr : éditeur, hébergeur, profession réglementée d'expert-comptable et de commissaire aux comptes.",
    updated: '2026-10-25',
    body: `
## Éditeur du site

Le site onac-conseil.fr est édité par :

${line('Dénomination', C.nom)}${line('Forme juridique', C.forme)}${line('Capital social', C.capital)}${line('Siège social', C.adresse)}${line('Immatriculation', C.rcs)}${line('SIRET (siège)', C.siret)}${line('N° de TVA intracommunautaire', C.tva)}${line('Téléphone', C.telephone)}${line('E-mail', `[${C.email}](mailto:${C.email})`)}
**Directeur de la publication :** ${C.dirigeant}.

## Hébergeur

- **Gandi SAS**, société par actions simplifiée au capital de 300 000 €
- Siège social : 63-65 boulevard Masséna, 75013 Paris, France
- RCS Paris 423 093 459
- Téléphone : +33 1 70 37 76 61

## Profession réglementée

### Expertise comptable

${C.nom} est une société d'expertise comptable inscrite au tableau de l'Ordre des experts-comptables, ${C.ordreConseil}${C.ordreNumero ? ` (n° d'inscription : ${C.ordreNumero})` : ''}. Le titre d'expert-comptable est délivré en France.

La profession est régie par l'ordonnance n° 45-2138 du 19 septembre 1945 et par le code de déontologie des professionnels de l'expertise comptable (décret n° 2012-432 du 30 mars 2012), consultables sur [legifrance.gouv.fr](https://www.legifrance.gouv.fr) et sur [experts-comptables.fr](https://www.experts-comptables.fr).

### Commissariat aux comptes

${C.nom} est inscrite sur la liste des commissaires aux comptes tenue par la Haute autorité de l'audit (H2A)${C.cacNumero ? ` sous le n° ${C.cacNumero}` : ''}. Cette activité est régie par le code de commerce (articles L. 821-1 et suivants) et par le code de déontologie de la profession de commissaire aux comptes.

Conformément aux règles d'indépendance, le cabinet n'exerce pas de mission d'expertise comptable auprès des entités dont il certifie les comptes.

${C.assureur ? `### Assurance professionnelle

Responsabilité civile professionnelle souscrite auprès de ${C.assureur}. Couverture géographique : ${C.couverture}.
` : ''}
### Médiation

En cas de différend avec le cabinet, vous pouvez d'abord nous écrire à [${C.email}](mailto:${C.email}). À défaut de solution, vous pouvez saisir gratuitement le service de conciliation du Conseil régional de l'Ordre des experts-comptables Paris Île-de-France ou, si vous êtes un consommateur, le médiateur de la consommation de la profession : Médiateur de la consommation des experts-comptables, 19 rue Cognacq-Jay, 75341 Paris Cedex 07 ([experts-comptables.fr](https://www.experts-comptables.fr)).

## Contenu du site

Les articles publiés sur le blog ont une vocation d'information générale. Ils ne constituent ni une consultation, ni un conseil personnalisé, et ne sauraient engager la responsabilité du cabinet. Toute décision doit être précédée d'une analyse de votre situation, formalisée dans une lettre de mission.

Le cabinet s'efforce de maintenir des informations exactes et à jour, mais ne peut garantir l'absence d'erreur ou d'omission, notamment en cas d'évolution de la réglementation postérieure à la publication.

## Propriété intellectuelle

L'ensemble des contenus du site (textes, mise en page, éléments graphiques, logo) est la propriété d'${C.nom}, sauf mention contraire. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite. Les polices de caractères Cormorant Garamond et DM Sans sont utilisées sous licence SIL Open Font License.

## Liens externes

Le site peut contenir des liens vers des sites tiers (sources officielles notamment). Le cabinet n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.

## Données personnelles

Le traitement des données personnelles collectées sur ce site est décrit dans notre [politique de confidentialité](/confidentialite/).
`,
  },

  {
    url: '/confidentialite/',
    title: 'Politique de confidentialité',
    description: "Comment ONAC Conseil traite les données personnelles collectées sur onac-conseil.fr et comment exercer vos droits (RGPD).",
    updated: '2026-10-25',
    body: `
Cette politique explique quelles données personnelles sont collectées sur le site onac-conseil.fr, pourquoi, et comment exercer vos droits, conformément au règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée.

## Responsable du traitement

${C.nom}, ${C.forme}, ${C.adresse}, représentée par ${C.dirigeant}. Contact : [${C.email}](mailto:${C.email}).

## Données collectées

Le site ne collecte des données personnelles que lorsque vous utilisez le **formulaire de contact** :

- prénom, nom et adresse e-mail (obligatoires) ;
- téléphone et société (facultatifs) ;
- objet et contenu de votre message.

Merci de ne pas transmettre par ce formulaire de documents ou d'informations sensibles (pièces comptables, données de santé, numéros de compte) : un échange sécurisé vous sera proposé si nécessaire.

## Finalités et bases légales

| Finalité | Base légale |
|---|---|
| Répondre à votre demande et, le cas échéant, préparer une proposition de mission | Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD) |
| Conserver la trace de nos échanges | Intérêt légitime du cabinet (art. 6.1.f RGPD) |

Vos données ne sont ni vendues, ni louées, ni utilisées pour vous adresser de la prospection sans votre accord.

## Destinataires

Les données sont destinées exclusivement au cabinet ${C.nom}, tenu au secret professionnel.

Pour l'envoi des messages, le cabinet fait appel à un sous-traitant : **Formspree, Inc.** (États-Unis), qui achemine le contenu du formulaire vers la messagerie du cabinet. Ce prestataire est susceptible de traiter les données hors de l'Union européenne ; ce transfert est encadré par les garanties prévues par le RGPD (clauses contractuelles types de la Commission européenne prévues dans l'accord de traitement de données du prestataire).

Le site est hébergé en France par Gandi SAS (voir les [mentions légales](/mentions-legales/)).

## Durée de conservation

- Demande sans suite : **3 ans** à compter du dernier échange.
- Si une mission est engagée : pendant la durée de la relation, puis selon les durées de conservation légales applicables à la profession.

## Cookies et mesure d'audience

Le site **ne dépose aucun cookie** et n'utilise **aucun outil de mesure d'audience, de publicité ou de réseau social**. Les polices de caractères sont hébergées sur nos propres serveurs : aucune donnée de navigation n'est transmise à des tiers lors de la consultation du site. Aucun bandeau de consentement n'est donc nécessaire.

Comme tout hébergeur, Gandi enregistre des journaux techniques (adresse IP, date et page consultée) pour assurer la sécurité et le bon fonctionnement du service.

## Vos droits

Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données, ainsi que du droit de définir des directives relatives à leur sort après votre décès.

Pour les exercer, écrivez à [${C.email}](mailto:${C.email}) ou à ${C.nom}, ${C.adresse}. Une réponse vous sera apportée dans un délai d'un mois.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL ([cnil.fr](https://www.cnil.fr)).
`,
  },

  {
    url: '/accessibilite/',
    title: 'Accessibilité',
    description: "Déclaration d'accessibilité du site onac-conseil.fr : mesures prises, limites connues et contact.",
    updated: '2026-10-25',
    body: `
${C.nom} souhaite que son site soit utilisable par tous, y compris par les personnes en situation de handicap. Cette démarche est volontaire : elle s'appuie sur le référentiel général d'amélioration de l'accessibilité (RGAA 4.1), qui décline les règles internationales WCAG 2.1.

## État de conformité

Le site n'a pas encore fait l'objet d'un audit d'accessibilité complet par un organisme indépendant. Il ne peut donc pas être déclaré conforme au RGAA. Les mesures ci-dessous ont été mises en place et vérifiées à l'aide d'outils de test automatisés (aucune erreur détectée lors du dernier contrôle, notamment sur les contrastes de couleurs).

## Mesures en place

- **Navigation au clavier** : toutes les pages se parcourent avec la touche Tab ; un lien « Aller au contenu » permet d'éviter le menu ; l'élément actif est signalé par un contour visible ; le menu mobile se ferme avec la touche Échap.
- **Lecteurs d'écran** : langue de la page déclarée, structure de titres hiérarchisée, zones de navigation et de contenu identifiées, boutons nommés, éléments purement décoratifs masqués.
- **Formulaire de contact** : chaque champ a une étiquette visible, les champs obligatoires sont signalés, le remplissage automatique est proposé et la confirmation d'envoi est annoncée aux lecteurs d'écran.
- **Animations** : si vous avez activé l'option « réduire les animations » de votre système (macOS, Windows, iOS, Android), les animations et effets de mouvement du site sont désactivés.
- **Affichage** : le site s'adapte aux écrans de toutes tailles et reste lisible avec un zoom jusqu'à 200 %. Le curseur de la souris n'est jamais masqué.

## Limites connues

- Le site n'a pas encore été testé avec l'ensemble des technologies d'assistance (lecteurs d'écran, commande vocale, plages braille).
- Certains éléments décoratifs animés (particules, défilement de texte) ne sont pas restitués aux lecteurs d'écran : ils ne portent aucune information.
- Les documents ou liens externes vers des sites tiers ne relèvent pas de notre responsabilité.

## Vous rencontrez une difficulté ?

Si vous ne parvenez pas à accéder à un contenu ou à un service du site, contactez-nous : nous vous apporterons l'information par un autre moyen et corrigerons le problème.

- E-mail : [${C.email}](mailto:${C.email})
- Téléphone : ${C.telephone}
- Courrier : ${C.nom}, ${C.adresse}

## Voies de recours

Si vous nous avez signalé un défaut d'accessibilité sans obtenir de réponse satisfaisante, vous pouvez contacter le Défenseur des droits ([defenseurdesdroits.fr](https://www.defenseurdesdroits.fr)).
`,
  },
];
