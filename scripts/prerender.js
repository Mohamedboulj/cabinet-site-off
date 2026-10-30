// Pré-rendu statique (SSG) exécuté après `vite build` :
//  1. rend l'application React en HTML pour chaque langue
//     (/ = français, /en/ = anglais, /ar/ = arabe) : contenu indexable sans
//     JavaScript,
//  2. injecte les balises SEO + hreflang + données structurées schema.org,
//  3. génère robots.txt et sitemap.xml.
// Les valeurs viennent de src/data/site.js (données) et src/i18n/*.js (textes).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, seo, clinic, social, locales, defaultLocale } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const siteUrl = (process.env.SITE_URL || seo.siteUrl || "").replace(/\/+$/, "");
if (siteUrl && !/^https?:\/\//.test(siteUrl)) {
  throw new Error(`SITE_URL invalide : "${siteUrl}" (doit commencer par https://)`);
}
const abs = (p) => (siteUrl ? siteUrl + p : null);

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const sameAs = Object.values(social).filter((u) => /^https?:\/\//.test(u));
const all = Object.values(locales);
const ogImage = abs(seo.ogImage);

// Données structurées : fiche médecin / établissement local.
// Pas d'aggregateRating : Google ignore les avis auto-publiés par un
// établissement sur son propre site (et ceux du site sont des exemples).
const buildJsonLd = (t) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  name: t.doctor,
  alternateName: clinic.name,
  description: t.seo.description,
  inLanguage: t.meta.htmlLang,
  medicalSpecialty: "https://schema.org/PrimaryCare",
  ...(siteUrl && { url: abs(t.meta.path), "@id": siteUrl + "/#cabinet" }),
  ...(siteUrl && { image: ogImage, logo: abs("/logo-mark.png") }),
  telephone: clinic.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: t.clinic.streetAddress,
    addressLocality: t.clinic.city,
    addressRegion: "Rabat-Salé-Kénitra",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: clinic.lat, longitude: clinic.lng },
  hasMap: clinic.mapsUrl,
  openingHours: clinic.openingHoursSchema,
  areaServed: { "@type": "City", name: "Rabat" },
  knowsLanguage: clinic.languages,
  ...(sameAs.length && { sameAs }),
});

const buildHeadTags = (t) =>
  [
    `<meta name="description" content="${esc(t.seo.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    siteUrl && `<link rel="canonical" href="${esc(abs(t.meta.path))}" />`,
    // hreflang : une alternative par langue + x-default (français)
    ...(siteUrl
      ? [
          ...all.map(
            (l) =>
              `<link rel="alternate" hreflang="${l.meta.code}" href="${esc(abs(l.meta.path))}" />`
          ),
          `<link rel="alternate" hreflang="x-default" href="${esc(abs(locales[defaultLocale].meta.path))}" />`,
        ]
      : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(clinic.name)}" />`,
    `<meta property="og:locale" content="${t.meta.ogLocale}" />`,
    ...all
      .filter((l) => l.meta.code !== t.meta.code)
      .map((l) => `<meta property="og:locale:alternate" content="${l.meta.ogLocale}" />`),
    `<meta property="og:title" content="${esc(t.seo.title)}" />`,
    `<meta property="og:description" content="${esc(t.seo.description)}" />`,
    siteUrl && `<meta property="og:url" content="${esc(abs(t.meta.path))}" />`,
    ogImage && `<meta property="og:image" content="${esc(ogImage)}" />`,
    ogImage && `<meta property="og:image:width" content="1200" />`,
    ogImage && `<meta property="og:image:height" content="630" />`,
    ogImage && `<meta property="og:image:alt" content="${esc(t.seo.ogAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.seo.description)}" />`,
    ogImage && `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    `<meta name="geo.region" content="MA-RAB" />`,
    `<meta name="geo.placename" content="Rabat" />`,
    `<meta name="geo.position" content="${clinic.lat};${clinic.lng}" />`,
    `<meta name="ICBM" content="${clinic.lat}, ${clinic.lng}" />`,
    `<script type="application/ld+json">${JSON.stringify(buildJsonLd(t)).replace(/</g, "\\u003c")}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");

// 1–2. Une page HTML par langue, à partir du gabarit produit par Vite
const templatePath = path.join(distDir, "index.html");
const template = fs.readFileSync(templatePath, "utf-8");
for (const marker of ["<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`Marqueur ${marker} absent de dist/index.html`);
}

for (const t of all) {
  const html = template
    .replace(
      /<html[^>]*>/,
      `<html lang="${t.meta.htmlLang}"${t.meta.dir === "rtl" ? ' dir="rtl"' : ""}>`
    )
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(t.seo.title)}</title>`)
    .replace("<!--app-head-->", () => buildHeadTags(t))
    .replace("<!--app-html-->", () => render(t.meta.code));

  const outDir = path.join(distDir, t.meta.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
}

// 3. robots.txt + sitemap.xml
const robots = ["User-agent: *", "Allow: /", siteUrl && `\nSitemap: ${siteUrl}/sitemap.xml`]
  .filter(Boolean)
  .join("\n");
fs.writeFileSync(path.join(distDir, "robots.txt"), robots + "\n");

const sitemapPath = path.join(distDir, "sitemap.xml");
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...all.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l.meta.code}" href="${esc(abs(l.meta.path))}"/>`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(locales[defaultLocale].meta.path))}"/>`,
  ].join("\n");
  const urls = all
    .map(
      (l) => `  <url>
    <loc>${esc(abs(l.meta.path))}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`
    )
    .join("\n");
  fs.writeFileSync(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
  );
} else {
  fs.rmSync(sitemapPath, { force: true });
  console.warn(
    "\n⚠  seo.siteUrl n'est pas défini (src/data/site.js) : canonical, hreflang, og:url,\n" +
      "   og:image absolue et sitemap.xml ne sont pas générés.\n" +
      "   Renseignez-le ou lancez : SITE_URL=https://votre-domaine npm run build\n"
  );
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(
  `✓ Pré-rendu SEO terminé (${all.map((l) => l.meta.code).join(", ")})${siteUrl ? ` pour ${siteUrl}` : ""}`
);
