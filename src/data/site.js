// ─────────────────────────────────────────────────────────────────────────
// DONNÉES DU SITE (indépendantes de la langue).
// Les textes affichés (FR / EN / AR) sont dans src/i18n/fr.js, en.js, ar.js :
// chaque élément ci-dessous possède un `id` qui renvoie à sa traduction.
// Modifiez ces fichiers pour mettre à jour le site sans toucher aux
// composants React.
// ─────────────────────────────────────────────────────────────────────────

// ─── SEO ────────────────────────────────────────────────────────────────
// TODO : renseigner l'URL définitive du site (ex: "https://www.cabinet-jouba.ma")
// avant la mise en ligne. Elle sert à générer la balise canonical, les liens
// hreflang, l'image Open Graph absolue et le sitemap.xml. Peut aussi être
// passée au build :
//   SITE_URL=https://www.exemple.ma npm run build
// Titre et description (par langue) : voir `seo` dans src/i18n/*.js.
export const seo = {
  siteUrl: "",
  ogImage: "/og-image.png",
};

export const clinic = {
  name: "Cabinet Jouba",
  phoneDisplay: "06 07 35 96 05",
  phoneTel: "+212607359605",
  whatsappNumber: "212607359605", // sans + ni espaces, format wa.me
  mapsUrl:
    "https://www.google.com/maps/place/Dr+Mahjouba+Boudkour+(G%C3%A9n%C3%A9raliste)/@33.991507,-6.8712354,17z",
  lat: 33.991507,
  lng: -6.8712354,
  // Horaires d'ouverture. `time: null` = fermé.
  // Libellés des jours : `hours.days` dans src/i18n/*.js.
  hours: [
    { id: "weekdays", time: "09:00 – 18:00" },
    { id: "saturday", time: "09:00 – 14:00" },
    { id: "sunday", time: null },
  ],
  // Mêmes horaires au format schema.org (données structurées Google).
  // À garder synchronisé avec `hours` ci-dessus.
  openingHoursSchema: ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  openedYear: 2022, // source : annuaire Telecontact
  languages: ["fr", "ar"],
};

// TODO : remplacer "#" par les vraies URLs Instagram / Facebook du cabinet
export const social = {
  instagram: "https://www.instagram.com/cabinet.dr.mahjouba.boudkour",
  facebook: "https://web.facebook.com/p/Cabinet-Jouba-de-m%C3%A9decine-g%C3%A9n%C3%A9rale-61550758126830/?_rdc=1&_rdr#",
};

// Titres et descriptions : `services.items` dans src/i18n/*.js.
export const services = [
  { id: "consultation", icon: "stethoscope" },
  { id: "chronic", icon: "heart" },
  { id: "checkup", icon: "clipboard" },
  { id: "certificates", icon: "document" },
  { id: "vaccination", icon: "syringe" },
  { id: "prevention", icon: "shield" },
];

// ─── AVIS GOOGLE ────────────────────────────────────────────────────────
// Auteur, contexte et texte de chaque avis : `reviews.items` dans
// src/i18n/*.js. `lang` = langue d'origine de l'avis.
// `satisfaction` (en %) peut être défini manuellement, sinon il est calculé
// automatiquement à partir des avis ci-dessous (voir src/utils/reviews.js).
export const reviews = {
  rating: 4.9,
  total: 107, // affiché « +107 avis » (voir `reviews.count` dans src/i18n/*.js)
  satisfaction: null, // ex: 96 — sinon calculé automatiquement
  items: [
    { id: "r1", rating: 5, lang: "en" },
    { id: "r2", rating: 5, lang: "en" },
    { id: "r3", rating: 5, lang: "fr" },
    { id: "r4", rating: 5, lang: "fr" },
    { id: "r5", rating: 5, lang: "fr" },
    { id: "r6", rating: 5, lang: "fr" },
  ],
};

// Libellés : `nav` dans src/i18n/*.js.
export const nav = [
  { id: "home", href: "#accueil" },
  { id: "services", href: "#services" },
  { id: "about", href: "#a-propos" },
  { id: "reviews", href: "#avis" },
  { id: "location", href: "#localisation" },
  { id: "contact", href: "#contact" },
];
