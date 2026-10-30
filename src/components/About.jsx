import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi2";
import Reveal from "./ui/Reveal";
import { clinic } from "../data/site";
import { useI18n } from "../i18n";

const ICONS = {
  sparkles: HiOutlineSparkles,
  globe: HiOutlineGlobeAlt,
  academic: HiOutlineAcademicCap,
};

export default function About() {
  const { t } = useI18n();

  return (
    <section id="a-propos" className="section-scroll py-20 sm:py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-ink to-primary-900 border border-line shadow-softer flex items-center justify-center p-10">
              <img
                src="/logo-mark.png"
                alt={t.brand.logoAlt}
                width="640"
                height="343"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -end-4 sm:-end-8 bg-white rounded-2xl shadow-soft border border-line px-5 py-4 max-w-[220px]">
              <p className="text-sm font-semibold text-ink">
                {t.about.badgeSince(clinic.openedYear)}
              </p>
              <p className="text-xs text-muted">{t.about.badgeText}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-block text-xs font-semibold tracking-widest rtl:tracking-normal uppercase text-primary-600 bg-white px-3 py-1 rounded-full shadow-soft mb-4">
            {t.about.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight rtl:leading-snug mb-5">
            {t.doctor}
          </h2>
          <p className="text-muted leading-relaxed mb-8">{t.about.body}</p>

          <div className="space-y-5">
            {t.about.points.map(({ icon, title, desc }) => {
              const Icon = ICONS[icon];
              return (
                <div key={icon} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink text-sm sm:text-base">
                      {title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
