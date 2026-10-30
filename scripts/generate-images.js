// Génère les images statiques de public/ à partir des logos du cabinet
// (assets/logos/*.jpg : teal clair sur fond noir). À relancer si un logo,
// le nom, la spécialité ou le téléphone changent.
//   - logo-full.png / logo-mark.png : logos au fond transparent
//   - favicon.png (64×64) et apple-touch-icon.png (180×180)
//   - og-image.png (1200×630) : aperçu lors des partages Facebook/WhatsApp…
// Usage : npm run images
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logosDir = path.join(root, "assets", "logos");
const publicDir = path.join(root, "public");

// Couleur des logos (#7BCBC9) ; 203 = sa composante la plus claire (vert).
const TEAL = { r: 123, g: 203, b: 201 };
const TEAL_MAX = 203;
// Sous ce niveau de gris, le pixel est du bruit JPEG du fond noir.
const NOISE_FLOOR = 24;

// Logo JPEG (teal sur noir) → PNG teal à fond transparent : la luminosité
// du pixel devient son opacité, ce qui supprime le noir et le halo JPEG.
async function transparentLogo(file) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, o = 0; i < data.length; i += 3, o += 4) {
    const level = Math.max(data[i], data[i + 1], data[i + 2]);
    const alpha = Math.round(
      Math.min(1, Math.max(0, (level - NOISE_FLOOR) / (TEAL_MAX - NOISE_FLOOR))) * 255
    );
    out[o] = TEAL.r;
    out[o + 1] = TEAL.g;
    out[o + 2] = TEAL.b;
    out[o + 3] = alpha;
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toBuffer();
}

const resizeToWidth = (png, width) =>
  sharp(png).resize({ width }).png({ compressionLevel: 9 }).toBuffer();

// Monogramme centré sur une tuile noire (fond d'origine des logos).
async function iconTile(markPng, size, radius) {
  const logo = await resizeToWidth(markPng, Math.round(size * 0.8));
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <rect width="${size}" height="${size}" rx="${radius}" fill="#000"/>
     </svg>`
  );
  return sharp(tile).composite([{ input: logo, gravity: "centre" }]).png().toBuffer();
}

const full = await transparentLogo(path.join(logosDir, "logo-full.jpg"));
const mark = await transparentLogo(path.join(logosDir, "logo-mark.jpg"));

const fullPng = await resizeToWidth(full, 960);
const markPng = await resizeToWidth(mark, 640);
await sharp(fullPng).toFile(path.join(publicDir, "logo-full.png"));
await sharp(markPng).toFile(path.join(publicDir, "logo-mark.png"));

await sharp(await iconTile(mark, 64, 14)).toFile(path.join(publicDir, "favicon.png"));
await sharp(await iconTile(mark, 180, 0)).toFile(path.join(publicDir, "apple-touch-icon.png"));

// ─── Image de partage (Open Graph) : logo complet sur fond sombre ──────────
const font = "Figtree, 'Segoe UI', Arial, sans-serif";
const ogLogoW = 520;
const ogLogo = await resizeToWidth(full, ogLogoW);
const { height: ogLogoH } = await sharp(ogLogo).metadata();
const ogLogoY = 68;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#000000"/>
      <stop offset="1" stop-color="#0C3B38"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <image href="data:image/png;base64,${ogLogo.toString("base64")}"
         x="${(1200 - ogLogoW) / 2}" y="${ogLogoY}" width="${ogLogoW}" height="${ogLogoH}"/>

  <text x="600" y="${ogLogoY + ogLogoH + 86}" text-anchor="middle" font-family="${font}" font-size="64" font-weight="700" fill="#FFFFFF">Dr Mahjouba Boudkour</text>
  <text x="600" y="${ogLogoY + ogLogoH + 142}" text-anchor="middle" font-family="${font}" font-size="38" font-weight="500" fill="#7BCBC9">Médecin généraliste à Rabat</text>

  <rect x="385" y="${ogLogoY + ogLogoH + 176}" width="430" height="64" rx="32" fill="#16A34A"/>
  <text x="600" y="${ogLogoY + ogLogoH + 218}" text-anchor="middle" font-family="${font}" font-size="28" font-weight="600" fill="#fff">RDV : 06 07 35 96 05</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, "og-image.png"));

const dims = async (f) => {
  const m = await sharp(path.join(publicDir, f)).metadata();
  return `${f} ${m.width}×${m.height}`;
};
console.log(
  "✓ Images générées dans public/ :",
  (await Promise.all(
    ["logo-full.png", "logo-mark.png", "favicon.png", "apple-touch-icon.png", "og-image.png"].map(dims)
  )).join(", ")
);
