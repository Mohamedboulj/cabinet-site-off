import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineClock, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import SectionTitle from "./ui/SectionTitle";
import Reveal from "./ui/Reveal";
import { clinic } from "../data/site";
import { useI18n } from "../i18n";

export default function Hours() {
  const { t } = useI18n();
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    t.clinic.whatsappMessage
  )}`;

  return (
    <section id="contact" className="section-scroll py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow={t.hours.eyebrow}
          title={t.hours.title}
          subtitle={t.hours.subtitle}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="h-full bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center mb-5">
                <HiOutlineClock size={24} />
              </div>
              <h3 className="font-semibold text-ink text-lg mb-5">
                {t.hours.cardTitle}
              </h3>
              <ul className="space-y-3">
                {clinic.hours.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between text-sm border-b border-line/70 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-muted">{t.hours.days[h.id]}</span>
                    <span dir="ltr" className="font-semibold text-ink">
                      {h.time ?? t.hours.closed}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted mt-5">{t.hours.note}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full bg-primary-500 text-white rounded-3xl p-6 sm:p-8 shadow-softer flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                <HiOutlinePhone size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-5">{t.hours.contactTitle}</h3>

              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-3">
                  <HiOutlineLocationMarker size={20} className="mt-0.5 shrink-0" />
                  <p className="text-sm text-white/90 leading-relaxed">
                    {t.clinic.address}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt size={16} className="mt-1 shrink-0" />
                  <p dir="ltr" className="text-sm text-white/90">
                    {clinic.phoneDisplay}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-3 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <FaWhatsapp size={18} />
                  {t.hours.whatsapp}
                </a>
                <a
                  href={`tel:${clinic.phoneTel}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-primary-50 text-primary-700 font-semibold px-5 py-3 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <FaPhoneAlt size={14} />
                  {t.hours.call}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
