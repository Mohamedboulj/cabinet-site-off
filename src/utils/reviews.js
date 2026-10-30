// Calcule un taux de satisfaction (%) à partir des avis si aucune valeur
// manuelle n'est fournie dans src/data/site.js.
export function getSatisfaction(reviews) {
  if (typeof reviews.satisfaction === "number") return reviews.satisfaction;

  const items = reviews.items || [];
  if (items.length > 0) {
    const positive = items.filter((r) => r.rating >= 4).length;
    return Math.round((positive / items.length) * 100);
  }

  if (typeof reviews.rating === "number") {
    return Math.round((reviews.rating / 5) * 100);
  }

  return 0;
}
