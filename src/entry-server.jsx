// Point d'entrée utilisé uniquement au build (scripts/prerender.js) pour
// générer le HTML statique de chaque langue, lisible par les moteurs de
// recherche.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export { seo, clinic, social, services } from "./data/site";
export { locales, defaultLocale } from "./i18n";

export function render(locale) {
  return renderToString(
    <StrictMode>
      <App locale={locale} />
    </StrictMode>
  );
}
