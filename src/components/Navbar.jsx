import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { nav, clinic } from "../data/site";
import { locales, useI18n } from "../i18n";

// Sélecteur de langue : chaque langue a sa propre URL (/, /en/, /ar/).
// Au clic on garde la section courante (#hash) pour ne pas perdre sa place.
function LanguageSwitcher() {
  const { t, locale } = useI18n();

  const switchTo = (e, path) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.location.href = path + window.location.hash;
  };

  return (
    <div
      role="group"
      aria-label={t.navbar.language}
      className="flex items-center rounded-full border border-line bg-white/80 p-0.5 text-xs font-semibold"
    >
      {Object.values(locales).map(({ meta }) => {
        const active = meta.code === locale;
        return (
          <a
            key={meta.code}
            href={meta.path}
            lang={meta.htmlLang}
            hrefLang={meta.htmlLang}
            title={meta.name}
            aria-current={active ? "true" : undefined}
            onClick={(e) => switchTo(e, meta.path)}
            className={`px-2.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
              active
                ? "bg-primary-500 text-white"
                : "text-ink hover:bg-primary-50"
            }`}
          >
            {meta.label}
          </a>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    t.clinic.whatsappMessage
  )}`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-soft border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        <a href="#accueil" className="flex items-center gap-2 font-bold text-ink">
          <img
            src="/logo-mark.png"
            alt=""
            width="640"
            height="343"
            className="h-9 w-auto"
          />
          <span className="text-base sm:text-lg leading-tight">
            {clinic.name}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:text-primary-600 transition-colors duration-200 cursor-pointer"
              >
                {t.nav[item.id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.navbar.whatsappAria}
            className="hidden lg:inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-soft transition-colors duration-200 cursor-pointer"
          >
            <FaWhatsapp size={18} />
            {t.navbar.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.navbar.closeMenu : t.navbar.openMenu}
            aria-expanded={open}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full text-ink hover:bg-primary-50 transition-colors cursor-pointer"
          >
            {open ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-line overflow-hidden"
          >
            <ul className="flex flex-col px-4 sm:px-6 py-4 gap-2 text-ink font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 px-2 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer"
                  >
                    {t.nav[item.id]}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 bg-accent-500 text-white font-semibold py-3 rounded-full cursor-pointer"
                >
                  <FaWhatsapp size={18} />
                  {t.navbar.ctaLong}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
