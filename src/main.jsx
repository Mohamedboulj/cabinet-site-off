import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { locales, localeFromPath } from "./i18n";

// La langue vient de l'URL : "/" = français, "/en/" = anglais, "/ar/" = arabe.
const locale = localeFromPath(window.location.pathname);
const { htmlLang, dir } = locales[locale].meta;
document.documentElement.lang = htmlLang;
document.documentElement.dir = dir;

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

// En production, le HTML est pré-rendu au build : on l'hydrate.
// En développement, la racine est vide : rendu client classique.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
