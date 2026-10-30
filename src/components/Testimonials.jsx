import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineExternalLink, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SectionTitle from "./ui/SectionTitle";
import Reveal from "./ui/Reveal";
import Stars from "./ui/Stars";
import { clinic, reviews } from "../data/site";
import { getSatisfaction } from "../utils/reviews";
import { useI18n } from "../i18n";

const AUTOPLAY_MS = 6000;
const SWIPE_MIN_PX = 40;

function SatisfactionRing({ value }) {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div ref={ref} className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#CCFBF1"
          strokeWidth="10"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#16A34A"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span dir="ltr" className="text-3xl sm:text-4xl font-bold text-ink">
          {display}%
        </span>
        <span className="text-[11px] text-muted text-center leading-tight px-4">
          {t.reviews.satisfied}
        </span>
      </div>
    </div>
  );
}

// Nombre d'avis visibles : 3 (≥1024px), 2 (≥640px), 1 sinon.
// Démarre à 3 pour correspondre au HTML pré-rendu, puis s'ajuste au montage.
function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const compute = () =>
      setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return perView;
}

function ReviewCard({ review }) {
  const { t } = useI18n();
  const text = t.reviews.items[review.id];

  return (
    <div className="h-full bg-white border border-line rounded-2xl p-5 shadow-soft flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <Stars rating={review.rating} size={14} />
        <FcGoogle size={18} />
      </div>
      <p className="text-sm text-ink leading-relaxed mb-4 flex-1">
        {t.reviews.quote(text.text)}
      </p>
      <div className="text-xs">
        <span className="block font-semibold text-ink">{text.author}</span>
        <span className="block text-muted mt-0.5">{text.context}</span>
      </div>
    </div>
  );
}

function ReviewsCarousel() {
  const { t, dir } = useI18n();
  const rtl = dir === "rtl";
  const items = reviews.items;
  const perView = usePerView();
  const maxIndex = Math.max(0, items.length - perView);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  // Si la fenêtre est redimensionnée, on reste dans les bornes.
  const current = Math.min(index, maxIndex);

  const goTo = (i) => setIndex(i < 0 ? maxIndex : i > maxIndex ? 0 : i);

  // Défilement automatique, en pause au survol / focus et désactivé si
  // l'utilisateur préfère réduire les animations.
  useEffect(() => {
    if (paused || maxIndex === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const c = Math.min(i, maxIndex);
        return c >= maxIndex ? 0 : c + 1;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_MIN_PX) return;
    // Glisser vers la gauche = avis suivant (inversé en lecture RTL).
    const forward = rtl ? dx > 0 : dx < 0;
    goTo(current + (forward ? 1 : -1));
  };

  const step = (100 / perView) * current * (rtl ? 1 : -1);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t.reviews.carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="overflow-hidden -mx-2.5 py-4 -my-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${step}%)` }}
        >
          {items.map((r, i) => {
            const visible = i >= current && i < current + perView;
            return (
              <div
                key={r.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${items.length}`}
                aria-hidden={visible ? undefined : "true"}
                className="shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 px-2.5"
              >
                <ReviewCard review={r} />
              </div>
            );
          })}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label={t.reviews.prev}
            className="w-10 h-10 rounded-full bg-white border border-line shadow-soft text-ink hover:bg-primary-50 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <HiChevronLeft size={20} className="rtl:rotate-180" />
          </button>

          <div className="flex items-center">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t.reviews.goTo(i + 1)}
                aria-current={i === current ? "true" : undefined}
                className="p-2 cursor-pointer"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary-500" : "w-2.5 bg-primary-200"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label={t.reviews.next}
            className="w-10 h-10 rounded-full bg-white border border-line shadow-soft text-ink hover:bg-primary-50 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <HiChevronRight size={20} className="rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();
  const satisfaction = getSatisfaction(reviews);

  return (
    <section id="avis" className="section-scroll py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow={t.reviews.eyebrow}
          title={t.reviews.title}
          subtitle={t.reviews.subtitle}
        />

        <Reveal>
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 bg-surface border border-line rounded-3xl p-6 sm:p-10 mb-12 shadow-soft">
            <SatisfactionRing value={satisfaction} />

            <div className="flex-1 text-center sm:text-start">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <FcGoogle size={28} />
                <span dir="ltr" className="text-2xl font-bold text-ink">
                  {reviews.rating.toFixed(1)}
                </span>
                <Stars rating={reviews.rating} />
              </div>
              <p className="text-muted mb-4">
                {t.reviews.basedOn}{" "}
                <span className="font-semibold text-ink">
                  {t.reviews.count(reviews.total)}
                </span>{" "}
                {t.reviews.verifiedFor(clinic.name)}
              </p>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-semibold text-sm cursor-pointer"
              >
                {t.reviews.viewAll}
                <HiOutlineExternalLink size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ReviewsCarousel />
        </Reveal>
      </div>
    </section>
  );
}
