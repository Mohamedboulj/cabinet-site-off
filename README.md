# Cabinet Jouba — Dr Mahjouba Boudkour

Site vitrine moderne pour le cabinet médical du Dr Mahjouba Boudkour (médecin généraliste, Rabat), construit en **React 18 + Vite 5 + Tailwind CSS 3** avec des animations **Framer Motion**.

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build     # build de production dans dist/
npm run lint       # vérification ESLint
```

## Contenu à modifier

**Tout le contenu du site se trouve dans un seul fichier : [`src/data/site.js`](src/data/site.js).**
Aucune modification de composant n'est nécessaire pour mettre à jour :

- `clinic` — nom, adresse, téléphone, numéro WhatsApp, lien et coordonnées Google Maps, horaires.
- `social` — liens Instagram et Facebook (actuellement des placeholders `"#"`, **à remplacer**).
- `services` — les 6 cartes de services proposés.
- `reviews` — note Google, nombre total d'avis et avis affichés. **Ces avis sont des exemples** (marqués dans le fichier) : remplacez-les par les vrais avis Google Maps du cabinet dès qu'ils seront disponibles. Le taux de satisfaction affiché est calculé automatiquement à partir de `reviews.items` (ou vous pouvez fixer `reviews.satisfaction` manuellement).

## SEO

Le build (`npm run build`) **pré-rend la page en HTML statique** : tout le contenu est lisible par Google, Bing et les aperçus de liens sans exécuter de JavaScript. React « hydrate » ensuite la page dans le navigateur.

Générés automatiquement depuis `src/data/site.js` (`seo` et `clinic`) par `scripts/prerender.js` :
- `<title>`, meta description, robots, balise canonical
- Open Graph + Twitter Card (aperçu WhatsApp/Facebook avec `public/og-image.png`)
- Données structurées schema.org `Physician` (adresse, coordonnées GPS, téléphone, horaires, langues, réseaux sociaux)
- `robots.txt` et `sitemap.xml`

**Avant la mise en ligne :**
1. Renseigner `seo.siteUrl` dans `src/data/site.js` (ou `SITE_URL=https://votre-domaine npm run build`). Sans cette URL, canonical, og:url, image OG absolue et sitemap ne sont pas générés (un avertissement s'affiche au build).
2. Vérifier les horaires (`hours` **et** `openingHoursSchema`).
3. Remplacer les liens Instagram/Facebook : ils seront ajoutés automatiquement dans `sameAs`.
4. Après déploiement : déclarer le site dans [Google Search Console](https://search.google.com/search-console), soumettre `sitemap.xml`, et ajouter l'URL du site sur la fiche Google Business Profile du cabinet. Tester avec le [test des résultats enrichis](https://search.google.com/test/rich-results).

Les logos du cabinet sont dans `assets/logos/` (JPEG teal sur fond noir). `npm run images` en tire les logos à fond transparent, le favicon, l'icône iOS et l'image de partage dans `public/` : à relancer si un logo, le nom, la spécialité ou le téléphone changent.

## Structure

```
src/
  data/site.js        ← contenu éditable (voir ci-dessus)
  utils/reviews.js     ← calcul du taux de satisfaction
  components/          ← Navbar, Hero, Services, About, Testimonials,
                          Location (carte Google Maps), Hours (horaires/contact),
                          Footer, WhatsAppButton (bouton flottant)
  components/ui/        ← Reveal (animation), SectionTitle, Stars
```

## Design

Palette "medical teal + health green" et typographie Figtree/Noto Sans, générées via le skill **ui-ux-pro-max** pour un rendu accessible, sobre et rassurant adapté au secteur médical.
