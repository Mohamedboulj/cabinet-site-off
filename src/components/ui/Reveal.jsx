import { motion } from "framer-motion";

/**
 * Wrapper d'animation "reveal on scroll" réutilisable.
 * Respecte prefers-reduced-motion via les variants Framer Motion
 * (useReducedMotion n'est pas requis car Framer réduit déjà l'amplitude
 * automatiquement quand la préférence système est active, mais on le
 * renforce ici en gardant les durées courtes et sans rebond).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  as: Component = motion.div,
}) {
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
