import {
  HiOutlineClipboardDocumentList,
  HiOutlineHeart,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { GiStethoscope, GiSyringe } from "react-icons/gi";
import SectionTitle from "./ui/SectionTitle";
import Reveal from "./ui/Reveal";
import { services } from "../data/site";
import { useI18n } from "../i18n";

const ICONS = {
  stethoscope: GiStethoscope,
  heart: HiOutlineHeart,
  clipboard: HiOutlineClipboardDocumentList,
  document: HiOutlineDocumentText,
  syringe: GiSyringe,
  shield: HiOutlineShieldCheck,
};

export default function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="section-scroll py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || HiOutlineHeart;
            const text = t.services.items[s.id];
            return (
              <Reveal key={s.id} delay={i * 0.06}>
                <div className="group h-full bg-surface hover:bg-white border border-line rounded-2xl p-6 shadow-soft hover:shadow-softer transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {text.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {text.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
