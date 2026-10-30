import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineHeart } from "react-icons/hi";
import { clinic, reviews } from "../data/site";
import { getSatisfaction } from "../utils/reviews";
import { useI18n } from "../i18n";

export default function Hero() {
  const { t } = useI18n();
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    t.clinic.whatsappMessage
  )}`;
  const satisfaction = getSatisfaction(reviews);

  const stats = [
    { icon: HiOutlineHeart, label: t.hero.statSatisfied, value: `${satisfaction}%` },
    { icon: HiOutlineShieldCheck, label: t.hero.statRating, value: `${reviews.rating}/5` },
    { icon: HiOutlineClock, label: t.hero.statSince, value: String(clinic.openedYear) },
  ];

  return (
    <section
      id="accueil"
      className="section-scroll relative overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28"
    >
      {/* Fonds décoratifs */}
      <div className="absolute inset-0 -z-10 bg-surface" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -end-24 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-primary-200/50 blur-3xl animate-blob -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -start-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent-100/60 blur-3xl animate-blob -z-10"
        style={{ animationDelay: "4s" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest rtl:tracking-normal uppercase text-primary-600 bg-white px-3 py-1 rounded-full shadow-soft mb-5">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-bold text-ink leading-[1.1] rtl:leading-[1.3]">
            {t.doctor}
            <span className="block mt-3 text-2xl sm:text-3xl font-semibold text-primary-600">
              {t.hero.subtitle}
            </span>
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-md">
            {t.clinic.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-softer transition-colors duration-200 cursor-pointer"
            >
              <FaWhatsapp size={20} />
              {t.hero.ctaBook}
            </a>
            <a
              href={`tel:${clinic.phoneTel}`}
              className="inline-flex items-center gap-2 bg-white hover:bg-primary-50 text-ink font-semibold px-6 py-3.5 rounded-full shadow-soft border border-line transition-colors duration-200 cursor-pointer"
            >
              <FaPhoneAlt size={16} />
              {t.hero.ctaCall}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-start">
                <Icon className="text-primary-500 mb-1.5" size={22} />
                <div dir="ltr" className="text-xl font-bold text-ink rtl:text-end">
                  {value}
                </div>
                <div className="text-xs text-muted leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative mx-auto max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-br from-ink to-primary-900 shadow-softer border border-line overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center px-6 pb-16">
              <img
                src="/logo-full.png"
                alt={t.brand.logoAlt}
                width="960"
                height="454"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute bottom-5 start-5 end-5 bg-white/90 backdrop-blur rounded-2xl shadow-soft px-4 py-3">
              <p className="text-sm font-semibold text-ink">{t.doctor}</p>
              <p className="text-xs text-muted">{t.clinic.specialty}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
