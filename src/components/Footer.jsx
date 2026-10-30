import { FaInstagram, FaFacebookF, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { clinic, social, nav } from "../data/site";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    t.clinic.whatsappMessage
  )}`;

  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/logo-mark.png"
              alt=""
              width="640"
              height="343"
              loading="lazy"
              className="h-9 w-auto"
            />
            <span className="text-white font-bold">{clinic.name}</span>
          </div>
          <p className="text-sm leading-relaxed">{t.footer.blurb}</p>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide rtl:tracking-normal">
            {t.footer.navigation}
          </h2>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide rtl:tracking-normal">
            {t.footer.contact}
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <HiOutlineLocationMarker size={18} className="mt-0.5 shrink-0" />
              <address className="not-italic">{t.clinic.address}</address>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt size={13} className="shrink-0" />
              <a
                href={`tel:${clinic.phoneTel}`}
                dir="ltr"
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {clinic.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide rtl:tracking-normal">
            {t.footer.follow}
          </h2>
          <div className="flex items-center gap-3">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.instagramAria}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.facebookAria}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.whatsappAria}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-500 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-white/60">
          © {year} {clinic.name} — {t.doctor}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
