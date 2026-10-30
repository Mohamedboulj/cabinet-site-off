import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { clinic } from "../data/site";
import { useI18n } from "../i18n";

export default function WhatsAppButton() {
  const { t } = useI18n();
  const [hover, setHover] = useState(false);

  const href = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    t.clinic.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-5 end-5 sm:bottom-7 sm:end-7 z-50 flex items-center gap-3">
      <span
        className={`hidden sm:inline-block bg-white text-ink text-sm font-medium px-4 py-2 rounded-full shadow-soft border border-line transition-all duration-200 ${
          hover
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 rtl:-translate-x-2 pointer-events-none"
        }`}
      >
        {t.whatsapp.tooltip}
      </span>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.aria}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent-500 text-white shadow-softer animate-pulse-ring hover:bg-accent-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}
