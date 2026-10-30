import { HiOutlineLocationMarker, HiOutlineExternalLink } from "react-icons/hi";
import SectionTitle from "./ui/SectionTitle";
import Reveal from "./ui/Reveal";
import { clinic } from "../data/site";
import { useI18n } from "../i18n";

export default function Location() {
  const { t, locale } = useI18n();
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${clinic.lat},${clinic.lng}&z=17&hl=${locale}&output=embed`;

  return (
    <section
      id="localisation"
      className="section-scroll py-20 sm:py-28 bg-surface"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow={t.location.eyebrow}
          title={t.location.title}
          subtitle={t.location.subtitle}
        />

        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 bg-white border border-line rounded-3xl p-4 sm:p-6 shadow-soft overflow-hidden">
            <div className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center mb-4">
                  <HiOutlineLocationMarker size={24} />
                </div>
                <h3 className="font-semibold text-ink mb-1">{clinic.name}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t.clinic.address}
                </p>
              </div>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-3 rounded-full shadow-soft transition-colors duration-200 cursor-pointer"
              >
                {t.location.directions}
                <HiOutlineExternalLink size={16} />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-line min-h-[280px] sm:min-h-[340px]">
              <iframe
                src={mapsEmbedUrl}
                title={t.location.mapTitle(clinic.name)}
                className="w-full h-full min-h-[280px] sm:min-h-[340px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
