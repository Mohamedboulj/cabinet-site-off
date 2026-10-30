import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useI18n } from "../../i18n";

export default function Stars({ rating = 5, size = 16, className = "" }) {
  const { t } = useI18n();
  // Arrondi à la demi-étoile : 4,9 s'affiche comme 5 étoiles pleines.
  const shown = Math.round(rating * 2) / 2;
  const full = Math.floor(shown);
  const hasHalf = shown - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div
      className={`flex items-center gap-0.5 text-amber-400 ${className}`}
      role="img"
      aria-label={t.reviews.starsLabel(rating)}
    >
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} size={size} />
      ))}
      {hasHalf && <FaStarHalfAlt size={size} className="rtl:-scale-x-100" />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} size={size} className="text-primary-200" />
      ))}
    </div>
  );
}
