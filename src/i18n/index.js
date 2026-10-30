import { createContext, createElement, useContext } from "react";
import fr from "./fr";
import en from "./en";
import ar from "./ar";

export const locales = { fr, en, ar };
export const defaultLocale = "fr";

// "/en", "/en/", "/en/index.html" → "en" ; "/ar/…" → "ar" ; sinon "fr".
export function localeFromPath(pathname = "/") {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && first !== defaultLocale && locales[first] ? first : defaultLocale;
}

const I18nContext = createContext({
  locale: defaultLocale,
  t: locales[defaultLocale],
  dir: locales[defaultLocale].meta.dir,
});

export function I18nProvider({ locale = defaultLocale, children }) {
  const t = locales[locale] || locales[defaultLocale];
  return createElement(
    I18nContext.Provider,
    { value: { locale: t.meta.code, t, dir: t.meta.dir } },
    children
  );
}

export const useI18n = () => useContext(I18nContext);
